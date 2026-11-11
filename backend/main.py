
from fastapi import FastAPI, HTTPException
import json

from database import get_db_connection, init_db


# Initialize the database
init_db()


# Create the FastAPI application
app = FastAPI(
    title="ARPIARES Learning API",
    description="Backend API for ARPIARES Learning",
    version="1.0.0"
)


# Convert database row into a Python dictionary
def format_course(course):

    course_data = dict(course)

    course_data["topics"] = json.loads(
        course_data["topics"]
    )

    return course_data


# Home route
@app.get("/")
def home():
    return {
        "message": "Welcome to ARPIARES Learning!",
        "status": "Backend is running successfully"
    }


# Health check route
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# Get all courses from SQLite
@app.get("/courses")
def get_courses():

    with get_db_connection() as connection:

        courses = connection.execute(
            "SELECT * FROM courses ORDER BY id"
        ).fetchall()

    return [format_course(course) for course in courses]


# Get one course by ID
@app.get("/courses/{course_id}")
def get_course(course_id: int):

    with get_db_connection() as connection:

        course = connection.execute(
            "SELECT * FROM courses WHERE id = ?",
            (course_id,)
        ).fetchone()

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return format_course(course)
