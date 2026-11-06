# ARPIARES Learning – Project Architecture

## 1. Introduction

ARPIARES Learning is an AI-Powered Learning Management System. It combines course management, student progress tracking, quizzes and AI-generated flashcards.

The project has two main parts:

- Track A – Learning Management System (LMS)
- Track B – AI Quiz and Flashcard Generator

## 2. Technology Architecture

### Frontend
**Technologies:** HTML, CSS and JavaScript

The frontend is the part of the application users see and interact with.

Responsibilities:
- Display the website.
- Show login and registration pages.
- Display courses and lessons.
- Show quizzes, flashcards and results.
- Send user requests to the backend.

### Backend
**Technology:** Python with FastAPI

The backend handles the application's main logic.

Responsibilities:
- Process login and registration requests.
- Manage courses and lessons.
- Track student progress.
- Check quiz answers and calculate scores.
- Connect the frontend to the database.

### Database
**Technology:** SQLite

The database stores application information.

Information to store:
- User accounts.
- Courses and lessons.
- Student enrolments.
- Lesson completion records.
- Quiz questions and results.
- Flashcards and practice history.

### AI Component
**Technology:** Free and open-source AI tools, depending on hardware and availability.

Responsibilities:
- Analyse study notes.
- Generate practice questions.
- Create flashcards.
- Provide explanations for answers.

AI features will be integrated after the basic LMS works.

## 3. How the Application Works

1. A student opens the website.
2. The student registers or logs in.
3. The frontend sends the request to the backend.
4. The backend processes the request.
5. The backend reads or updates information in SQLite.
6. The backend sends a response to the frontend.
7. The frontend displays the result to the student.

## 4. Basic Architecture Flow

Student
↓
Frontend (HTML, CSS, JavaScript)
↓
Backend (Python + FastAPI)
↓
Database (SQLite)

The AI component will connect to the backend when the quiz and flashcard features are developed.

## 5. Project Development Order

1. Create the basic frontend.
2. Add website styling and interactions.
3. Develop backend APIs.
4. Connect SQLite database.
5. Implement login and registration.
6. Develop course and lesson management.
7. Add progress tracking and quizzes.
8. Integrate AI quiz and flashcard generation.
9. Test and improve the application.

## 6. Important Development Principle

Build and test each feature step by step. First make the basic application work, then add advanced features.

All selected tools and services must be free to use for this project.