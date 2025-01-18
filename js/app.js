class BurnoutTest {
    constructor() {
        this.currentQuestion = 0;
        this.scores = [];
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.questionScreen = document.getElementById('question-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionText = document.getElementById('question-text');
        this.progressBar = document.querySelector('.progress');
    }

    addEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startTest());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartTest());
        document.getElementById('share-btn').addEventListener('click', () => this.shareResult());
        
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleAnswer(e));
        });
    }

    startTest() {
        this.startScreen.classList.remove('active');
        this.startScreen.classList.add('hidden');
        this.questionScreen.classList.remove('hidden');
        this.questionScreen.classList.add('active');
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        this.questionText.textContent = question.text;
        this.updateProgress();
    }

    handleAnswer(e) {
        const score = parseInt(e.target.dataset.value);
        this.scores.push(score);

        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    calculateResult() {
        const totalScore = this.scores.reduce((a, b) => a + b, 0);
        const maxScore = questions.length * 5;
        return (totalScore / maxScore) * 100;
    }

    showResult() {
        const score = this.calculateResult();
        const result = this.getResultLevel(score);

        this.questionScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');

        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = `
            <h3>당신의 번아웃 점수는 ${Math.round(score)}점 입니다.</h3>
            <p class="result-level">${result.level}</p>
            <p class="result-description">${result.description}</p>
            <p class="result-advice">${result.advice}</p>
        `;
    }

    getResultLevel(score) {
        return resultLevels.find(level => 
            score >= level.range[0] && score <= level.range[1]
        );
    }

    restartTest() {
        this.currentQuestion = 0;
        this.scores = [];
        this.resultScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.startScreen.classList.add('active');
    }

    shareResult() {
        // 공유 기능 구현
        if (navigator.share) {
            navigator.share({
                title: '번아웃 테스트 결과',
                text: `내 번아웃 점수는 ${Math.round(this.calculateResult())}점입니다.`,
                url: window.location.href
            });
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new BurnoutTest();
});
