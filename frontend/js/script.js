
// 1. Display a welcome message
console.log("Welcome to ARPIARES Learning!");

// 2. Create a function
function showWelcomeMessage() {
    alert("Welcome to ARPIARES Learning!");
}

// 3. Create a function to change heading
function changeHeading() {
    document.getElementById("welcome-heading").textContent =
        "Your Learning Journey Starts Here!";
}

// 4. Display current year in the footer
document.getElementById("current-year").textContent =
    new Date().getFullYear();

// Explore Course Function
function exploreCourse(courseName) {

    window.location.href =
        "course.html?course=" + encodeURIComponent(courseName);

}
