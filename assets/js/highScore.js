var highScore = document.querySelector("#highScore");
var clearScores = document.querySelector("#clearScore");
var back = document.querySelector("#back");

//Gets scores from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

//Goes back to main page
back.addEventListener("click", function () {
    window.location.replace("./index.html");
});

//Clears scores
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});