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

    calculateTotalScore() {
    let totalScore = 0;
    this.scores.forEach((score, index) => {
        const question = questions[index];
        totalScore += score * question.weight;
    });
    // 100점 만점으로 변환
    return (totalScore / (questions.length * 5)) * 100;
}

// 여기에 getResultLevel 메서드를 추가
    getResultLevel(score) {
        return resultLevels.find(level => 
            score >= level.range[0] && score <= level.range[1]
        );
    }
  
calculateDetailedResult() {
    const categoryScores = {
        physical: 0,
        emotional: 0,
        cognitive: 0,
        behavioral: 0,
        work: 0
    };

        // 카테고리별 점수 계산
        this.scores.forEach((score, index) => {
            const question = questions[index];
            categoryScores[question.category] += score * question.weight;
        });

        // 전체 점수 계산
        const totalScore = this.calculateTotalScore();
        const resultLevel = this.getResultLevel(totalScore);

        // 카테고리별 분석
        const categoryAnalysisResults = {};
        for (let category in categoryScores) {
            const score = categoryScores[category];
            const analysis = categoryAnalysis[category];
            categoryAnalysisResults[category] = {
                score: score,
                title: analysis.title,
                description: analysis.description,
                recommendations: analysis.recommendations
            };
        }

        return {
            totalScore: totalScore,
            resultLevel: resultLevel,
            categoryAnalysis: categoryAnalysisResults,
            recommendations: this.getPersonalizedRecommendations(categoryScores)
        };
    }

    getPersonalizedRecommendations(categoryScores) {
        // 가장 높은 점수의 카테고리 찾기
        const maxCategory = Object.entries(categoryScores).reduce((a, b) => 
            a[1] > b[1] ? a : b
        )[0];

        // 맞춤형 권장사항 생성
        return {
            immediate: categoryAnalysis[maxCategory].recommendations,
            longTerm: resultLevels.find(level => 
                level.range[0] <= this.calculateTotalScore() && 
                level.range[1] >= this.calculateTotalScore()
            ).preventiveMeasures
        };
    }

    showResult() {
        const result = this.calculateDetailedResult();
        this.questionScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');

        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = `
            <h3>번아웃 진단 결과</h3>
            <div class="score-section">
                <h4>총점: ${Math.round(result.totalScore)}점</h4>
                <p class="result-level">${result.resultLevel.level}</p>
                <p class="result-description">${result.resultLevel.description}</p>
            </div>

            <div class="category-analysis">
                <h4>카테고리별 분석</h4>
                ${Object.entries(result.categoryAnalysis).map(([category, data]) => `
                    <div class="category-item">
                        <h5>${data.title}</h5>
                        <p>${data.description}</p>
                        <ul>
                            ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="recommendations">
                <h4>개선 방안</h4>
                <div class="immediate-actions">
                    <h5>즉시 실천할 수 있는 방안</h5>
                    <ul>
                        ${result.recommendations.immediate.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                <div class="long-term-actions">
                    <h5>장기적 개선 방안</h5>
                    <ul>
                        ${result.recommendations.longTerm.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    restartTest() {
        this.currentQuestion = 0;
        this.scores = [];
        this.resultScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.startScreen.classList.add('active');
    }

    shareResult() {
        const result = this.calculateDetailedResult();
        if (navigator.share) {
            navigator.share({
                title: '번아웃 테스트 결과',
                text: `내 번아웃 점수는 ${Math.round(result.totalScore)}점입니다. (${result.resultLevel.level})`,
                url: window.location.href
            });
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new BurnoutTest();
});
