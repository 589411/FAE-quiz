const questions = [
    {
        question: "如果你在探索新星球時遇到敵意生物，你的第一反應是？",
        options: [
            { text: "嘗試溝通，尋找和平解決方案", scores: { "星際通訊官": 2, "醫療專家": 1 } },
            { text: "立即戰術撤退，並分析對方行動模式", scores: { "科學家": 2, "指揮官": 1 } },
            { text: "下令隊員進行戰術包圍，伺機反擊", scores: { "戰鬥指揮官": 2, "指揮官": 1 } }
        ]
    },
    {
        question: "在星際戰爭中，你最希望擔任哪種角色？",
        options: [
            { text: "戰術指揮，制定進攻與防禦計畫", scores: { "指揮官": 2, "戰鬥指揮官": 1 } },
            { text: "戰場前線，帶領部隊作戰", scores: { "戰鬥指揮官": 2, "指揮官": 1 } },
            { text: "技術支援，遠程駭入敵方系統", scores: { "科學家": 2, "星際通訊官": 1 } },
            { text: "後勤支援，提供治療與補給", scores: { "醫療專家": 2, "星際通訊官": 1 } }
        ]
    },
    {
        question: "你的艦隊即將進入未知的蟲洞，你的決定是？",
        options: [
            { text: "下令觀察一段時間，再決定是否進入", scores: { "指揮官": 2, "科學家": 1 } },
            { text: "立刻進行能量掃描，分析潛在風險", scores: { "科學家": 2, "指揮官": 1 } },
            { text: "準備作戰，防範可能的敵對勢力", scores: { "戰鬥指揮官": 2, "指揮官": 1 } },
            { text: "試圖尋找外星人留下的線索，確認是否安全", scores: { "星際通訊官": 2, "科學家": 1 } }
        ]
    },
    {
        question: "在一場激烈的太空戰鬥中，你的首要目標是？",
        options: [
            { text: "指揮整體戰略，確保勝利", scores: { "指揮官": 2, "戰鬥指揮官": 1 } },
            { text: "親自駕駛戰艦，與敵方正面交鋒", scores: { "戰鬥指揮官": 2, "指揮官": 1 } },
            { text: "尋找敵方弱點，發動精準攻擊", scores: { "科學家": 2, "星際通訊官": 1 } },
            { text: "保障隊員生命，提供支援與恢復", scores: { "醫療專家": 2, "星際通訊官": 1 } }
        ]
    },
    {
        question: "你的團隊在太空殖民地遭遇生存危機，你的解決方案是？",
        options: [
            { text: "制定緊急應對方案，組織資源分配", scores: { "指揮官": 2, "戰鬥指揮官": 1 } },
            { text: "保護倖存者，擊退威脅", scores: { "戰鬥指揮官": 2, "指揮官": 1 } },
            { text: "研發技術解決資源短缺問題", scores: { "科學家": 2, "醫療專家": 1 } },
            { text: "聯繫外部文明，尋求援助", scores: { "星際通訊官": 2, "醫療專家": 1 } }
        ]
    }
];

const characterInfo = {
    "指揮官": {
        title: "指揮官 (Commander)",
        description: "睿智領航，決策果斷，引領星際探索。",
        descriptionEn: "Wise navigator, decisive leader, guiding space exploration.",
        image: "images/commander.jpg"
    },
    "戰鬥指揮官": {
        title: "戰鬥指揮官 (Tactical Commander)",
        description: "鋼鐵意志，戰術專精，掌控宇宙戰場。",
        descriptionEn: "Iron will, tactical mastery, commanding cosmic battlefields.",
        image: "images/tactical-commander.jpg"
    },
    "醫療專家": {
        title: "醫療專家 (Medic Specialist)",
        description: "科技醫療，守護生命，戰場中的希望。",
        descriptionEn: "Tech-driven healing, life protector, hope on the battlefield.",
        image: "images/medic.jpg"
    },
    "科學家": {
        title: "科學家 (Astro-Scientist)",
        description: "智慧求索，解密宇宙，開啟未知未來。",
        descriptionEn: "Knowledge seeker, decoding the cosmos, unlocking the future.",
        image: "images/scientist.jpg"
    },
    "星際通訊官": {
        title: "星際通訊官 (Interstellar Diplomat)",
        description: "語言專家，和平使者，宇宙文明橋樑。",
        descriptionEn: "Linguistic expert, peace envoy, bridge between civilizations.",
        image: "images/diplomat.jpg"
    }
};

let currentQuestion = 0;
const scores = {
    "指揮官": 0,
    "戰鬥指揮官": 0,
    "醫療專家": 0,
    "科學家": 0,
    "星際通訊官": 0
};

function displayQuestion() {
    const quizSection = document.getElementById('quiz-section');
    const question = questions[currentQuestion];

    let html = `
        <div class="question-container">
            <h3>問題 ${currentQuestion + 1}/5</h3>
            <p class="question">${question.question}</p>
            <div class="options">
    `;

    question.options.forEach((option, index) => {
        html += `
            <div class="option" onclick="selectOption(${index})">
                ${option.text}
            </div>
        `;
    });

    html += `</div></div>`;

    if (currentQuestion === questions.length - 1) {
        html += '<button class="btn btn-primary w-100" onclick="showResult()">查看結果</button>';
    } else {
        html += '<button class="btn btn-primary w-100" onclick="nextQuestion()">下一題</button>';
    }

    quizSection.innerHTML = html;
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');

    const questionScores = questions[currentQuestion].options[index].scores;
    for (const [character, score] of Object.entries(questionScores)) {
        scores[character] += score;
    }
}

function nextQuestion() {
    const selected = document.querySelector('.option.selected');
    if (!selected) {
        alert('請選擇一個選項');
        return;
    }
    currentQuestion++;
    displayQuestion();
}

function showResult() {
    const selected = document.querySelector('.option.selected');
    if (!selected) {
        alert('請選擇一個選項');
        return;
    }

    const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const character = characterInfo[winner];

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('character-title').textContent = character.title;
    document.getElementById('character-description').textContent = character.description;
    document.getElementById('character-description-en').textContent = character.descriptionEn;
    document.getElementById('character-image').src = character.image;
}

// Start the quiz when the page loads
window.onload = displayQuestion;
