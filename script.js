const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const userName = document.getElementById("userName");
const welcomeText = document.querySelector("span");
const restartGame = document.getElementById("new");
var timer = document.getElementById("timer");

// array of questions
const questions = [{
    question: "\nWhich of these tags are all < table > tags?",
    options: {
        a: "< table > < head > < tfoot >",
        b: "< table > < th > < td >",
        c: "< table > < tr > < tt >",
    },
    answer: "b"
},
{
    question: "\nWhich of the following can JavaSript do?",
    options: {
        a: "Js can react to events",
        b: "Js can manipulate HTML elements",
        c: "It can validate date",
        d: "All of the above",
    },
    answer: "d"
},
{
    question: "\nWhich keyword is used to declare variables in JavaScript?",
    options: {
        a: "let",
        b: "int",
        c: "var",
        d: "Both A and C",
    },
    answer: "d"
},
{
    question: "\nFor what value of target attribute does the link open in new window?",
    options: {
        a: "new",
        b: "_blank",
        c: " ",
    },
    answer: "b"
},
{
    question: "\nJSON stands for?",
    options: {
        a: "JavaScript Object Notation",
        b: "JavaScript Object Network",
        c: "JavaScript Output Name",
    },
    answer: "a"
},
];

//score
var score = 0;

function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for (key in currentQuestion.options) {
            // ...add an HTML radio button
            answers.push(
                `<label>
            <input type="radio" name="question${questionNumber}" value="${key}">
            ${key} :
            ${currentQuestion.options[key]}
            <br />
          </label>`
            );
        }

        console.log(answers);

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
    console.log(output);
}

function showResults() {
    // gather answer containers from our quiz
    resultsContainer.style.height = "20vh";
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let score = 0;

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.answer) {
            // add to the number of correct answers
            score++;

            // color the answers green
            answerContainers[questionNumber].style.color = "#17D482";
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = "red";
        }
    });

    // show number of correct answers out of total
    // resultsContainer.innerHTML = `Wooho! You got ${score} out of ${questions.length} correct!`;
    
    if(score == 0){
        resultsContainer.innerHTML = `<p>Alas! You got ${score} out of ${questions.length} correct!! Work more on your skills. Cheers!</p> ` ;
    }
    if(score == 1){
        resultsContainer.innerHTML = `<p>⭐  Hey! You got ${score} out of ${questions.length} correct!! Little more push. Go for it! </p> ` ;
    }
    if(score == 2){
        resultsContainer.innerHTML = `<p>⭐⭐  Hey! You got ${score} out of ${questions.length} correct!! Little more push. Go for it! </p> ` ;
    }
    if(score == 3){
        resultsContainer.innerHTML = `<p>⭐⭐⭐  Wooho! You got ${score} out of ${questions.length} correct!! Just a little revision. </p> ` ;
    }
    if(score == 4){
        resultsContainer.innerHTML = `<p>⭐⭐⭐⭐  Wooho! You got ${score} out of ${questions.length} correct!! Just a little revision. </p> ` ;
    }
    if(score == 5){
        resultsContainer.innerHTML = `<p>⭐⭐⭐⭐⭐  OMG! You got ${score} out of ${questions.length} correct!!  Ace the advanced level too.` ;
    }
}

// Event listeners
quizContainer.style.color="#602BC1";
resultsContainer.style.color="#E81CEE";
//6DB49B
//9799e9
buildQuiz();
startTimer();

submitButton.addEventListener("click", showResults);

userName.addEventListener("input", () => {
    welcomeText.innerText = userName.value;
});

restartGame.addEventListener("click", () => {
    window.location.reload();
});

// timer
function startTimer() {
    var time = new Date().getTime() + 1000 * 90 ;
    var interval = setInterval(function () {
        var now = new Date().getTime();
        var distance = time - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer.innerHTML = minutes + " : " + seconds;
        if (distance <= 0) {
            clearInterval(interval);
            timer.innerHTML = "00:00";
            window.alert('Time Up!');
            showResults();
        }
    }, 1000);
}