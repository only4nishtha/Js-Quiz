const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const userName = document.getElementById("userName");
const welcomeText = document.querySelector("span");
const restartGame = document.getElementById("new");

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

        // color the right answers green
        for (var i = 0; i < 4; i++) {
            if (answerContainer.querySelectorAll('input')[i].value == currentQuestion.answer) {
                answerContainer.querySelectorAll('label')[i].style.color = "lightgreen";
            }
        }

        // if answer is correct
        if (userAnswer === currentQuestion.answer) {
            // add to the number of correct answers
            score++;
        }

        // if answer is wrong or blank
        else {
            // color the wrong answers red
            for (var i = 0; i < 4; i++) {
                if (answerContainers[questionNumber].querySelectorAll('input')[i].checked) {
                    answerContainers[questionNumber].querySelectorAll('label')[i].style.color = "red";
                }
            }
        }
});

// show number of correct answers out of total
resultsContainer.innerHTML = `Wooho! You got ${score} out of ${questions.length} correct!`;
}

// Event listeners

// enter.addEventListener("click", () => {
//     quizContainer.style.display = "none";
//     quizContainer.style.display = "block";
    buildQuiz();
// });

submitButton.addEventListener("click", showResults);

userName.addEventListener("input", () => {
    welcomeText.innerText = userName.value;
});

restartGame.addEventListener("click", () => {
    window.location.reload();
});