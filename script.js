let questions = [];
let index = 0;
let score = 0;
let answers = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => questions = data);

function showQuestion() {
  let q = questions[index];
  document.getElementById("question-text").innerText = q.question;
  let optBox = document.getElementById("options");
  optBox.innerHTML = "";
  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-primary d-block mb-2";
    btn.innerText = opt;
    btn.onclick = () => answers[index] = opt;
    optBox.appendChild(btn);
  });
}

document.getElementById("start-btn").onclick = () => {
  document.getElementById("startpage").classList.add("d-none");
  document.getElementById("quiz-page").classList.remove("d-none");
  showQuestion();
};

document.getElementById("next-btn").onclick = () => { index++; showQuestion(); };
document.getElementById("prev-btn").onclick = () => { index--; showQuestion(); };

document.getElementById("submit-btn").onclick = () => {
  score = questions.filter((q,i) => q.answer === answers[i]).length;
  document.getElementById("score").innerText = score + "/" + questions.length;
  document.getElementById("quiz-page").classList.add("d-none");
  document.getElementById("result-page").classList.remove("d-none");
};

document.getElementById("retry-btn").onclick = () => location.reload();
