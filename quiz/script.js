const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questoes.js"

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
};

    function nextQuestion(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.getAttribute("data-correct") === "true";
    
        if (isCorrect) {
            questionsCorrect++;
        } else {
            selectedButton.style.backgroundColor = "red";
            const correctButton = answers.querySelector(`button[data-correct="true"]`);
            correctButton.style.backgroundColor = "green";
        }
    
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            finish();
        }
    }
    

function finish() {
    const feedback = document.createElement("div");
    feedback.classList.add("feedback");
    if (questionsCorrect === questions.length) {
        feedback.innerText = `Parabéns, você acertou todas as ${questions.length} questões!`;
    } else {
        feedback.innerText = `Poxa, você só acertou ${questionsCorrect} de ${questions.length} questões. Vamos refazer?`;
    }

    content.style.display = "none";
    contentFinish.style.display = "flex";
    contentFinish.appendChild(feedback);
}


function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
        </button>
        `;

        answers.appendChild(div);
    });
    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();