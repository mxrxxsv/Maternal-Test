

const questions = [
    {
        question: "Fatal head reaches the pelvic floor, the head bends forward onto the chest",
        options: ["Flexion", "Internal Rotation", "Descent", "Extension"],
        answer: 0,
        clues: []
    },
    {
        question: "The head extends, and the foremost parts of the head, the face and chin, are born.",
        options: ["Flexion", "Internal Rotation", "Descent", "Extension"],
        answer: 3,
        clues: []
    },
    {
        question: "head rotates from the anteroposterior position it assumed to enter the outlet back to the diagonal or transverse position of the early part of labor",
        options: ["Expulsion", "Internal Rotation", "External Rotation", "Extension"],
        answer: 2,
        clues: []
    },
    {
        question: "Once the shoulders are born, the rest of the baby is born easily and smoothly because of its smaller size. This movement, called expulsion, is the end of the pelvic division of labor",
        options: ["Expulsion", "Internal Rotation", "External Rotation", "Extension"],
        answer: 0,
        clues: []
    },
    {
        question: "downward movement of the biparietal diameter of the fetal head to within the pelvic inlet. Full descent occurs when the fetal head extrudes beyond the dilated cervix and touches the posterior vaginal floor.",
        options: ["Expulsion", "Extension", "Descent", "Flexion"],
        answer: 2,
        clues: []
    },
    {
        question: "The head flexes as it touches the pelvic floor, and the occiput rotates to bring the head into the best relationship to the outlet of the pelvis ",
        options: ["Expulsion", "Internal Rotation", "Descent", "External Rotation"],
        answer: 1,
        clues: []
    },
   
];

let currentQuestion = 0;
let score = 0;
let level = 0;
let timer;

function displayQuestion() {
    const currentQ = questions[currentQuestion];
    document.getElementById('question').textContent = currentQ.question;
    const clueImagesContainer = document.getElementById('clueImages');
    clueImagesContainer.innerHTML = '';
    currentQ.clues.forEach(clue => {
        const clueImage = document.createElement('img');
        clueImage.src = clue;
        clueImage.classList.add('clue-image');
        clueImagesContainer.appendChild(clueImage);
    });
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, idx) => {
        const optElement = document.createElement('div');
        optElement.classList.add('option');
        optElement.textContent = `${String.fromCharCode(97 + idx)}. ${opt}`;
        optElement.setAttribute('data-option', idx);
        optElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optElement);
    });
}

function selectOption(event) {
    clearInterval(timer);
    const selectedOption = parseInt(event.target.getAttribute('data-option'));
    const correctOption = questions[currentQuestion].answer;
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.removeEventListener('click', selectOption));
    options[correctOption].classList.add('correct');
    if (selectedOption === correctOption) {
        event.target.classList.add('correct');
        score += 10;
    } else {
        event.target.classList.add('incorrect');
    }
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById('testNumber').textContent = `${(score + 10) / 10}/6`;
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.querySelectorAll('.option').forEach(opt => opt.removeEventListener('click', selectOption));
            document.getElementById('nextButton').style.display = 'block';
        }
    }, 1000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function startGame() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    shuffle(questions);
    displayQuestion();
    startTimer();
}


function endQuiz() {
    document.getElementById('scoreTable').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('questionBox').innerHTML = `<h2> ♡ Congratulations! Quiz completed! ♡ </h2><p>Your final score is: ${score}</p>`;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('.options-container').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('scoreTable').style.display = 'block';
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('testNumber').textContent = `${currentQuestion}/20`;
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'none';
    clearInterval(timer);
}