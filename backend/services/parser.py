# ---------------------------------------------------
# UNIVERSAL RESUME PARSER (TEXT + SCANNED + IMAGE)
# ---------------------------------------------------

import os
import re
import fitz  # PyMuPDF
import pytesseract

from PIL import Image
from nltk.tokenize import sent_tokenize

from services.skill_ontology import SKILL_ONTOLOGY
from services.semantic_engine import normalize_skills
from services.embedding_matcher import detect_semantic_skills


# ---------------------------------------------------
# TESSERACT PATH (Windows)
# ---------------------------------------------------
pytesseract.pytesseract.tesseract_cmd = \
r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# ---------------------------------------------------
# 1️⃣ TEXT PDF EXTRACTION
# ---------------------------------------------------
def extract_text_from_pdf(file_path):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    return text


# ---------------------------------------------------
# 2️⃣ OCR EXTRACTION (PDF → IMAGE → TEXT)
# ---------------------------------------------------
def extract_text_using_ocr(file_path):

    print("⚠️ OCR FALLBACK ACTIVATED")

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:

        pix = page.get_pixmap(dpi=300)

        img = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        text += pytesseract.image_to_string(img)

    return text


# ---------------------------------------------------
# 3️⃣ IMAGE RESUME OCR
# ---------------------------------------------------
def extract_text_from_image(file_path):

    print("🖼️ IMAGE OCR ACTIVATED")

    img = Image.open(file_path)

    text = pytesseract.image_to_string(img)

    return text


# ---------------------------------------------------
# 4️⃣ CLEAN TEXT
# ---------------------------------------------------
def clean_text(text):

    text = text.lower()
    text = re.sub(r'\s+', ' ', text)

    return text


# ---------------------------------------------------
# 5️⃣ BUILD SKILL DATABASE
# ---------------------------------------------------
def build_skill_database():

    skill_db = []

    for role in SKILL_ONTOLOGY.values():

        for category in role.values():

            skill_db.extend(category)

    return list(set(skill_db))


# ---------------------------------------------------
# 6️⃣ KEYWORD SKILL MATCH
# ---------------------------------------------------
def extract_keyword_skills(sentences):

    skill_db = build_skill_database()

    found = []

    for sentence in sentences:

        for skill in skill_db:

            if skill.lower() in sentence:
                found.append(skill)

    return list(set(found))


# ---------------------------------------------------
# 7️⃣ EXPERIENCE EXTRACTION
# ---------------------------------------------------
def extract_experience(text):

    pattern = r'(\d+)\+?\s*(years|year)'

    matches = re.findall(pattern, text)

    if matches:
        return max([int(m[0]) for m in matches])

    return 0


# ---------------------------------------------------
# 8️⃣ MASTER PARSER
# ---------------------------------------------------
def parse_resume(file_path, role=None):

    print("\n========== PARSER START ==========")
    print("File:", file_path)

    ext = file_path.split(".")[-1].lower()

    # ---------------------------------------------------
    # STEP 1 — TEXT EXTRACTION
    # ---------------------------------------------------
    if ext == "pdf":

        raw_text = extract_text_from_pdf(file_path)

        print("PDF TEXT LENGTH:", len(raw_text))

        # OCR fallback if empty
        if len(raw_text.strip()) < 50:

            raw_text = extract_text_using_ocr(file_path)

    elif ext in ["png", "jpg", "jpeg"]:

        raw_text = extract_text_from_image(file_path)

    else:
        raw_text = ""

    print("FINAL TEXT LENGTH:", len(raw_text))

    if len(raw_text.strip()) == 0:

        print("❌ NO TEXT EXTRACTED")
        return {
            "skills": [],
            "experience": 0
        }

    # ---------------------------------------------------
    # STEP 2 — CLEAN
    # ---------------------------------------------------
    cleaned = clean_text(raw_text)

    # ---------------------------------------------------
    # STEP 3 — SENTENCE TOKENIZE
    # ---------------------------------------------------
    sentences = sent_tokenize(cleaned)

    # ---------------------------------------------------
    # STEP 4 — SKILL EXTRACTION
    # ---------------------------------------------------
    keyword_skills = extract_keyword_skills(sentences)

    semantic_skills = detect_semantic_skills(sentences)

    combined = list(set(keyword_skills + semantic_skills))

    normalized = normalize_skills(combined)

    print("SKILLS FOUND:", normalized)

    # ---------------------------------------------------
    # STEP 5 — EXPERIENCE
    # ---------------------------------------------------
    experience = extract_experience(cleaned)

    print("EXPERIENCE:", experience)

    print("========== PARSER END ==========\n")

    return {

        "skills": normalized,
        "experience": experience
    }
