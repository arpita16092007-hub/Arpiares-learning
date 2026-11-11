
import sqlite3
import json
from pathlib import Path
from contextlib import contextmanager

# Database file location
DATABASE_PATH = Path(__file__).resolve().parent / "arpiares_learning.db"


# Connect to the database
@contextmanager
def get_db_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


# Create the courses table
def init_db():

    with get_db_connection() as connection:

        connection.execute("""
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                level TEXT NOT NULL,
                topics TEXT NOT NULL
            )
        """)

        # Check whether courses already exist
        count = connection.execute(
            "SELECT COUNT(*) FROM courses"
        ).fetchone()[0]

        # Add initial courses only when the table is empty
        if count == 0:

            initial_courses = [
                (
                    1,
                    "HTML for Beginners",
                    "Learn the basics of HTML.",
                    "Beginner",
                    json.dumps([
                        "Introduction to HTML",
                        "HTML Document Structure",
                        "HTML Headings and Paragraphs"
                    ])
                ),
                (
                    2,
                    "CSS for Beginners",
                    "Learn how to style web pages using CSS.",
                    "Beginner",
                    json.dumps([
                        "Introduction to CSS",
                        "CSS Selectors",
                        "CSS Colors and Backgrounds"
                    ])
                ),
                (
                    3,
                    "Python Programming",
                    "Learn Python programming fundamentals.",
                    "Beginner",
                    json.dumps([
                        "Introduction to Python",
                        "Python Variables",
                        "Python Data Types"
                    ])
                )
            ]

            connection.executemany("""
                INSERT INTO courses
                (id, title, description, level, topics)
                VALUES (?, ?, ?, ?, ?)
            """, initial_courses)
