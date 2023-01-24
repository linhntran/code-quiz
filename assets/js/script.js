//Questions and answers
var questions = [
    {
        question: "What does CSS stand for?",
        choices: ["a. Colorful Style Sheets", "b. Creative Style Sheets", "c. Cascading Style Sheet", "d. Computer Style Sheets"],
        answer: "c. Cascading Style Sheet"
    }, {
        question: "What does HTML stand for?",
        choices: ["a. Hyperlinks and Text Markup Language", "b. Hypo Text Markup Language", "c. Hyper Text Markup Language", "d. Home Tool Markup Langauage"],
        answer: "c. Hyper Text Markup Language",
    }, {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
        answer: "d. <script>"
    }, {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c. quotes"
    }, {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "b. other arrays"
    }, {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    }, {
        question: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    }, {
        question: "How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
        answer: "a. //This is a comment"
    }, {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        choices: ["a. In the <body> section", "b. In the <head> section", "c. In the <footer> section", "d. You don't need to, it is automatically linked"],
        answer: "b. In the <head> section"
    }, {
        question: "Which property is used to change the background color?",
        choices: ["a. color", "b. bg", "c. bgcolor", "d. background-color"],
        answer: "d. background-color"
    },
];

var score = 0;
var questionNum = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#start");
var questionsSection = document.querySelector("#questionsSection");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 75;
var interval = 0;
var penalty = 10;
var answers = document.createElement("li");

timer.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(interval);
                finished();
                currentTime.textContent = "Time's up!"
            }
        }, 1000);
    }
    render(questionNum);
});

function render(questionNum) {
    questionsSection.innerHTML = "";
    answers.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var currentQuestion = questions[questionNum].question;
        var currentChoices = questions[questionNum].choices;
        questionsSection.textContent = currentQuestion;
    }

    currentChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsSection.appendChild(answers);
        answers.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Checks if answers are correct
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionNum].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect"
        }
    }

    questionNum++;

    if (questionNum >= questions.length) {
        finished();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionNum);
    }
    questionsSection.appendChild(createDiv);
}

function finished() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsSection.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsSection.appendChild(createP);

    //Timer
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsSection.appendChild(createP2);
    }

    //
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsSection.appendChild(createLabel);

    //
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsSection.appendChild(createInput);

    //
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsSection.appendChild(createSubmit);

    //
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("Please enter your initials.");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            } 
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./highScore.html");
        }
    });
}
