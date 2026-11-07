
// ========================================
// 1. LESSON DATA
// ========================================

const lessonData = {

    "HTML for Beginners": [
        {
            title: "Introduction to HTML",
            content: "HTML stands for HyperText Markup Language. It is used to create the structure of webpages."
        },
        {
            title: "HTML Document Structure",
            content: "An HTML document contains elements such as html, head, title and body. These elements organise a webpage."
        },
        {
            title: "HTML Headings and Paragraphs",
            content: "HTML provides heading tags from h1 to h6. The paragraph tag p is used to display text."
        }
    ],

    "CSS for Beginners": [
        {
            title: "Introduction to CSS",
            content: "CSS stands for Cascading Style Sheets. It is used to style webpages."
        },
        {
            title: "CSS Selectors",
            content: "CSS selectors help us select HTML elements so we can apply styles to them."
        },
        {
            title: "CSS Colors and Backgrounds",
            content: "CSS allows us to change text colors, background colors and other visual properties."
        }
    ],

    "Python Programming": [
        {
            title: "Introduction to Python",
            content: "Python is a popular programming language used in web development, automation and artificial intelligence."
        },
        {
            title: "Python Variables",
            content: "Variables are used to store information. For example, name = 'Arpita' stores text in a variable."
        },
        {
            title: "Python Data Types",
            content: "Python has different data types, including integers, floats, strings and booleans."
        }
    ]

};


// ========================================
// 2. GET SELECTED COURSE
// ========================================

const params = new URLSearchParams(window.location.search);

const courseName = params.get("course");

const lessons = lessonData[courseName];

let currentLesson = 0;


// ========================================
// 3. LOAD SAVED PROGRESS
// ========================================

const storageKey = "completed_" + courseName;

function loadCompletedLessons() {

    try {

        const savedData = JSON.parse(
            localStorage.getItem(storageKey)
        );

        if (!Array.isArray(savedData)) {
            return [];
        }

        // Keep only valid, unique lesson numbers
        return [...new Set(
            savedData.filter(index =>
                Number.isInteger(index) &&
                index >= 0 &&
                lessons &&
                index < lessons.length
            )
        )];

    } catch (error) {

        console.error("Could not load lesson progress:", error);

        return [];

    }

}

let completedLessons = lessons ? loadCompletedLessons() : [];


// ========================================
// 4. SAVE COMPLETED LESSONS
// ========================================

function saveCompletedLessons() {

    try {

        localStorage.setItem(
            storageKey,
            JSON.stringify(completedLessons)
        );

    } catch (error) {

        console.error("Could not save lesson progress:", error);

        document.getElementById("lesson-status").textContent =
            "Progress could not be saved in this browser.";

    }

}


// ========================================
// 5. UPDATE COURSE PROGRESS
// ========================================

function updateProgress() {

    if (!lessons || lessons.length === 0) {
        return;
    }

    const totalLessons = lessons.length;

    const completedCount = completedLessons.length;

    const percentage = Math.round(
        (completedCount / totalLessons) * 100
    );

    // Update progress bar
    document.getElementById("progress-fill").style.width =
        percentage + "%";

    // Update progress text
    document.getElementById("progress-text").textContent =
        percentage + "% Completed (" +
        completedCount + "/" +
        totalLessons + " lessons)";

}


// ========================================
// 6. DISPLAY CURRENT LESSON
// ========================================

function displayLesson() {

    if (!lessons || lessons.length === 0) {

        document.getElementById("lesson-course-title").textContent =
            "Course Not Found";

        document.getElementById("lesson-title").textContent =
            "Lesson Unavailable";

        document.getElementById("lesson-content").textContent =
            "Please select a valid course.";

        document.getElementById("lesson-status").textContent = "";

        document.getElementById("lesson-number").textContent = "";

        document.getElementById("previous-button").disabled = true;

        document.getElementById("next-button").disabled = true;

        document.getElementById("progress-fill").style.width = "0%";

        document.getElementById("progress-text").textContent =
            "0% Completed";

        return;

    }

    const lesson = lessons[currentLesson];

    // Display course name
    document.getElementById("lesson-course-title").textContent =
        courseName;

    // Display lesson title
    document.getElementById("lesson-title").textContent =
        lesson.title;

    // Display lesson content
    document.getElementById("lesson-content").textContent =
        lesson.content;

    // Display lesson number
    document.getElementById("lesson-number").textContent =
        "Lesson " + (currentLesson + 1) +
        " of " + lessons.length;

    // Check completion status
    const isCompleted =
        completedLessons.includes(currentLesson);

    document.getElementById("lesson-status").textContent =
        isCompleted
            ? "Lesson Completed!"
            : "Not completed yet.";

    // Update progress
    updateProgress();

    // Control navigation buttons
    document.getElementById("previous-button").disabled =
        currentLesson === 0;

    document.getElementById("next-button").disabled =
        currentLesson === lessons.length - 1;

}


// ========================================
// 7. GO TO NEXT LESSON
// ========================================

function nextLesson() {

    if (currentLesson < lessons.length - 1) {

        currentLesson++;

        displayLesson();

    }

}


// ========================================
// 8. GO TO PREVIOUS LESSON
// ========================================

function previousLesson() {

    if (currentLesson > 0) {

        currentLesson--;

        displayLesson();

    }

}


// ========================================
// 9. MARK LESSON AS COMPLETE
// ========================================

function markComplete() {

    if (!lessons) {
        return;
    }

    // Add lesson only if it is not already completed
    if (!completedLessons.includes(currentLesson)) {

        completedLessons.push(currentLesson);

        saveCompletedLessons();

    }

    // Refresh status and progress
    displayLesson();

}


// ========================================
// 10. DISPLAY CURRENT YEAR
// ========================================

document.getElementById("current-year").textContent =
    new Date().getFullYear();


// ========================================
// 11. DISPLAY FIRST LESSON
// ========================================

displayLesson();
