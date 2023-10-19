const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questoes.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
    // Limpe o conteúdo do elemento 'contentFinish'
    contentFinish.innerHTML = "";

    // Remova a classe 'hidden' da imagem 'covid-questions'
    document.querySelector(".covid-questions").classList.remove("hidden");

    // Remova a imagem de resultado anterior
    document.querySelector(".result-image").src = "";

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
        selectedButton.style.backgroundColor = "green"; 
    } else {
        selectedButton.style.backgroundColor = "red"; 
        const correctButton = answers.querySelector(`button[data-correct="true"]`);
        correctButton.style.backgroundColor = "green";
    }

    document.querySelectorAll(".answer").forEach((item) => {
        item.removeEventListener("click", nextQuestion);
    });

    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            finish();
        }
    }, 1500);
}

function finish() {
    const feedback = document.createElement("div");
    feedback.classList.add("feedback");

    if (questionsCorrect === questions.length) {
        feedback.innerText = `Parabéns, você acertou todas as ${questions.length} questões. Se proteja sempre e cuide de quem você ama!`;
        feedback.classList.add("feedback-congrats");
        document.querySelector(".result-image").src = "../img/congrats.jpg";

    } else if (questionsCorrect >= 7) {
        feedback.innerText = `Você está por dentro do assunto, acertou ${questionsCorrect} de ${questions.length}. Se proteja sempre e cuide de quem você ama.`;
        feedback.classList.add("feedback-positive");
        document.querySelector(".result-image").src = "../img/positive.jpg";

    } else if (questionsCorrect >= 5) {
        feedback.innerText = `Você acertou apenas ${questionsCorrect} de ${questions.length}. Melhor pesquisar mais sobre o assunto para não dar bobeira.`;
        feedback.classList.add("feedback-neutral");
        document.querySelector(".result-image").src = "../img/neutro.jpg";

    } else {
        feedback.innerText = `Coronavírus não é brincadeira. Você acertou apenas ${questionsCorrect} de ${questions.length}. Pesquise mais sobre o assunto e se proteja.`;
        feedback.classList.add("feedback-negative");
        document.querySelector(".result-image").src = "../img/negative.avif";

    }

    document.querySelector(".covid-questions").classList.add("hidden");

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
