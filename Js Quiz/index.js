var readlineSync = require("readline-sync");

function welcome() {
    var username = readlineSync.question("What's your name? ");

    console.log("Welcome" + username + "\nTime to Test your Tech Quotient!!");
    game(username);
}

var score = 0;

var highScore = {
    name: "Nishtha",
    scores: 5,
}

// Array of Objects 

var questions = [{
    question: "Which of these tags are all <table> tags?",
    options: {
        a: "<table><head><tfoot>",
        b: "<table><th><td>",
        c: "<table><tr><tt>",
    },
    answer: "b"
},
{
    question: "Which of the following can JavaSript do?",
    options: {
        a: "Js can react to events",
        b: "Js can manipulate HTML elements",
        c: "It can validate date",
        d: "All of the above",
    },
    answer: "d"
},
{
    question: "Which keyword is used to declare variables in JavaScript?",
    options: {
        a: "let",
        b: "int",
        c: "var",
        d: "Both A and C",
    },
    answer: "d"
},
{
    question: "For what value of target attribute does the link open in new window?",
    options: {
        a: "new",
        b: "_blank",
        c: " ",
    },
    answer: "b"
},
{
    question: "JSON stands for?",
    options: {
        a: "JavaScript Object Notation",
        b: "JavaScript Object Network",
        c: "JavaScript Output Name",
    },
    answer: "b"
},
];

function game(username) {
    for(const key in questions){
        var currentQuestion = questions[key];
        play(currentQuestion.question, currentQuestion.answer, currentQuestion.options)
    }
    showScores(username);
}

function play(question, answer, options){
    console.log(question);

    for(const key in options){
        console.log(`${key} : ${options[key]}`);
    }

    var username = readlineSync.question("Choose your Option: ");

    if(username.toLowerCase() === answer) {
        console.log("Right!");
        score++;
    }
    else {
        console.log("Wrong!");
    }

    console.log("*--------------------------*")
    console.log("Current Score: " + score);
    console.log("*--------------------------*")
}

function showScores(username, score){
    console.log("WOHOO!!! You scored: ", score);

    if(highScore.scores <= score){
        highScore.name = username;
        highScore.scores = score;
    }
    console.log("\nCheck out the high scores!");
    console.log(highScore.name + " : " + highScore.scores);
}