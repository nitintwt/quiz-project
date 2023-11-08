const questions = [
	{
		question: "Which is largest animal in the world?",
		answers: [
			{ text: "Shark", correct: false },
			{ text: "Blue whale", correct: true },
			{ text: "Elephant", correct: false },
			{ text: "Giraffe", correct: false },
		],
	},
	{
		question: "Which is the smallest country in the world?",
		answers: [
			{ text: "Vatican city", correct: true },
			{ text: "Bhutan", correct: false },
			{ text: "Nepal", correct: false },
			{ text: "Sri lanka", correct: false },
		],
	},
	{
		question: "Which is the largest desert in the world?",
		answers: [
			{ text: "Kalahari", correct: false },
			{ text: "Gobi", correct: false },
			{ text: "Sahara", correct: false },
			{ text: "Antartica", correct: true },
		],
	},
	{
		question: "Which is the smallest continent in the world?",
		answers: [
			{ text: "Asia", correct: false },
			{ text: "Australia", correct: true },
			{ text: "Arctic", correct: false },
			{ text: "Africa", correct: false },
		],
	},
]

const question = document.getElementById('question');
const option = document.getElementById('option');
const nextButton = document.getElementById('nextButton');

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
	currentQuestionIndex = 0;  // initializes the quiz by resetting the index to 0
	score = 0;  // initializes the score to 0
	nextButton.innerHTML = "Next";
	showQuestion(); // display the first question
}
function showQuestion() {
	resetState();  //Resets the quiz state by hiding the 'Next' button and removing previous answer buttons.
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	question.innerHTML = questionNo + "." + currentQuestion.question;

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		option.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}
function resetState() {
	nextButton.style.display = "none";
	while (option.firstChild) {
		option.removeChild(option.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(option.children).forEach((button) => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	question.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});
startQuiz();