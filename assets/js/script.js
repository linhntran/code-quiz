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
var main = document.querySelector("#main");

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
        }, 1000)
    }
    run(questionNum);
})

//Runs the quiz
function run(questionNum) {
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
        var check = document.createElement("div");
        check.setAttribute("id", "check");
        if (element.textContent == questions[questionNum].answer) {
            score++;
            check.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            check.textContent = "Wrong!"
        }
    }

    questionNum++;

    //Checks how many questions are left and will continue running until completed
    if (questionNum >= questions.length) {
        finished();
        check.textContent = "End of quiz!";
    } else {
        run(questionNum);
    }
    questionsSection.appendChild(check);
}

//Runs when quiz is completed
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

    //Creates line to ask for initials
    var prompt = document.createElement("label");
    prompt.setAttribute("id", "prompt");
    prompt.textContent = "Enter your initials: ";

    questionsSection.appendChild(prompt);

    //Creates input box for initials
    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    questionsSection.appendChild(userInput);

    //Creates submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submitButton");
    submitButton.setAttribute("id", "submit");
    submitButton.textContent = "Submit";

    questionsSection.appendChild(submitButton);

    //Once "Submit" is clicked, pulls high scores stored in local storge and logs new score
    submitButton.addEventListener("click", function () {
        var initials = userInput.value;

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
    })
}
