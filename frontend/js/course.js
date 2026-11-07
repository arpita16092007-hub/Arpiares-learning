
// Course information
const courses = {

    "HTML for Beginners": {
        description: "Learn HTML and understand how to create webpages.",
        topics: [
            "Introduction to HTML",
            "HTML document structure",
            "Headings and paragraphs",
            "Links and images",
            "HTML forms"
        ]
    },

    "CSS for Beginners": {
        description: "Learn CSS and understand how to style websites.",
        topics: [
            "Introduction to CSS",
            "CSS selectors",
            "Colors and backgrounds",
            "Margins and padding",
            "CSS layouts"
        ]
    },

    "Python Programming": {
        description: "Learn programming concepts using Python.",
        topics: [
            "Introduction to Python",
            "Variables and data types",
            "Conditional statements",
            "Loops",
            "Functions"
        ]
    }
};

// Get selected course from URL
const params = new URLSearchParams(window.location.search);
const courseName = params.get("course");

// Find selected course
const course = courses[courseName];

// Display course information
if (course) {

    document.getElementById("course-title").textContent = courseName;

    document.getElementById("course-description").textContent =
        course.description;

    const topicList = document.getElementById("course-topics");

    course.topics.forEach(function(topic) {

        const listItem = document.createElement("li");

        listItem.textContent = topic;

        topicList.appendChild(listItem);

    });

} else {

    document.getElementById("course-title").textContent =
        "Course Not Found";

    document.getElementById("course-description").textContent =
        "Please return to the homepage and select a valid course.";

}

// Start learning function
function startLearning() {

    window.location.href =
        "lesson.html?course=" + encodeURIComponent(courseName);

}

// Display current year
document.getElementById("current-year").textContent =
    new Date().getFullYear();
