let questions = [];
let current = 0;
let answers = [];

const startPage = document.getElementById("startpage");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const scoreSpan = document.getElementById("score");
const feedback = document.getElementById("feedback");

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showScores();
  });

// Show last and best score
function showScores() {
  document.getElementById("lastscore").innerText =
    localStorage.getItem("lastScore") ? `Last: ${localStorage.getItem("lastScore")}` : "";
  document.getElementById("bestscore").innerText =
    localStorage.getItem("bestScore") ? `Best: ${localStorage.getItem("bestScore")}` : "";
}

// Show current question
function showQuestion() {
  let q = questions[current];
  questionText.innerText = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-primary d-block mb-2";
    btn.innerText = opt;

    // highlight if already chosen
    if (answers[current] === opt) btn.classList.add("active");

    btn.onclick = () => {
      answers[current] = opt;
      Array.from(optionsBox.children).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };

    optionsBox.appendChild(btn);
  });

  document.getElementById("prev-btn").style.display = current ? "inline-block" : "none";
  document.getElementById("next-btn").style.display = current < questions.length - 1 ? "inline-block" : "none";
  document.getElementById("submit-btn").classList.toggle("d-none", current !== questions.length - 1);
}

// Start quiz
document.getElementById("start-btn").onclick = () => {
  startPage.classList.add("d-none");
  quizPage.classList.remove("d-none");
  showQuestion();
};

// Next / Previous
document.getElementById("next-btn").onclick = () => { current++; showQuestion(); };
document.getElementById("prev-btn").onclick = () => { current--; showQuestion(); };

// Submit quiz
document.getElementById("submit-btn").onclick = () => {
  let score = questions.filter((q,i) => q.answer === answers[i]).length;
  scoreSpan.innerText = `${score} / ${questions.length}`;
  feedback.innerText = score === questions.length ? "Excellent!" :
           score >= questions.length/2 ? "Good job!" : "Keep practicing!";

  localStorage.setItem("lastScore", score);
  let best = localStorage.getItem("bestScore");
  if (!best || score > best) localStorage.setItem("bestScore", score);

  quizPage.classList.add("d-none");
  resultPage.classList.remove("d-none");
};

// Retry quiz
document.getElementById("retry-btn").onclick = () => location.reload();
