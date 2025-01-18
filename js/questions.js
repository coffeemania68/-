const questions = [
    {
        id: 1,
        text: "아침에 일어나기가 힘들고 피곤함을 자주 느낀다",
        category: "physical"
    },
    {
        id: 2,
        text: "일에 대한 열정이 예전보다 현저히 줄었다",
        category: "emotional"
    },
    {
        id: 3,
        text: "업무나 일상적인 일들이 부담스럽게 느껴진다",
        category: "workload"
    },
    // ... 추가 질문들
];

const resultLevels = [
    {
        level: "정상",
        range: [0, 30],
        description: "정상적인 스트레스 수준입니다.",
        advice: "현재의 컨디션을 잘 유지하세요."
    },
    {
        level: "경계",
        range: [31, 60],
        description: "가벼운 번아웃 증상이 있습니다.",
        advice: "충분한 휴식과 스트레스 관리가 필요합니다."
    },
    {
        level: "위험",
        range: [61, 100],
        description: "심각한 번아웃 상태입니다.",
        advice: "전문가와의 상담을 권장합니다."
    }
];
