from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from models.resume import Resume

router = APIRouter(prefix="/ranking", tags=["Ranking"])


# ==============================
# GET RANKING BY JOB OPENING
# ==============================
@router.get("/opening/{opening_id}")
def get_ranking_by_opening(opening_id: int, db: Session = Depends(get_db)):

    resumes = (
        db.query(Resume)
        .filter(Resume.opening_id == opening_id)
        .order_by(Resume.score.desc()) # 🔥 CORE RANKING
        .all()
    )

    result = []

    rank = 1

    for r in resumes:
        result.append({
            "id": r.id,
            "rank": rank,
            "email": r.email,
            "score": r.score,
            "skill_match": r.skill_match,
            "experience_match": r.experience_match,
            "status": r.status,
            "missing_skills": r.missing_skills,
            "rag_explanation": r.rag_explanation
        })
        rank += 1

    return result