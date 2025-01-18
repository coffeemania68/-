const questions = [
    // 신체적 증상 (Physical Symptoms)
    {
        id: 1,
        text: "아침에 일어날 때 피곤함이 가시지 않고 계속된다",
        category: "physical",
        weight: 1.2
    },
    {
        id: 2,
        text: "두통, 어깨통증, 근육통과 같은 신체 통증이 자주 있다",
        category: "physical",
        weight: 1.0
    },
    {
        id: 3,
        text: "불면증이나 과다수면으로 수면패턴이 불규칙하다",
        category: "physical",
        weight: 1.1
    },

    // 정서적 증상 (Emotional Symptoms)
    {
        id: 4,
        text: "작은 일에도 쉽게 짜증이 나고 감정 조절이 어렵다",
        category: "emotional",
        weight: 1.3
    },
    {
        id: 5,
        text: "일에 대한 열정과 의욕이 현저히 감소했다",
        category: "emotional",
        weight: 1.4
    },
    {
        id: 6,
        text: "무기력감과 우울감이 지속적으로 느껴진다",
        category: "emotional",
        weight: 1.5
    },

    // 인지적 증상 (Cognitive Symptoms)
    {
        id: 7,
        text: "업무나 일상적인 일에 집중하기 어렵다",
        category: "cognitive",
        weight: 1.2
    },
    {
        id: 8,
        text: "간단한 결정을 내리는 것도 어렵게 느껴진다",
        category: "cognitive",
        weight: 1.1
    },
    {
        id: 9,
        text: "기억력이 떨어지고 자주 실수를 한다",
        category: "cognitive",
        weight: 1.0
    },

    // 행동적 증상 (Behavioral Symptoms)
    {
        id: 10,
        text: "술, 카페인, 당분 섭취가 늘었다",
        category: "behavioral",
        weight: 1.0
    },
    {
        id: 11,
        text: "다른 사람들과의 만남을 피하게 된다",
        category: "behavioral",
        weight: 1.2
    },
    {
        id: 12,
        text: "일이나 책임을 미루는 경우가 잦아졌다",
        category: "behavioral",
        weight: 1.1
    },

    // 직무 관련 증상 (Work-related Symptoms)
    {
        id: 13,
        text: "일에 대한 성취감이나 보람을 느끼기 어렵다",
        category: "work",
        weight: 1.4
    },
    {
        id: 14,
        text: "업무량이 감당하기 힘들 정도로 느껴진다",
        category: "work",
        weight: 1.3
    },
    {
        id: 15,
        text: "동료나 상사와의 관계가 악화되었다",
        category: "work",
        weight: 1.2
    }
];

const resultLevels = [
    {
        level: "정상",
        range: [0, 30],
        description: "현재 정상적인 스트레스 수준을 유지하고 있습니다. 일상적인 스트레스는 있으나 적절히 관리되고 있는 상태입니다.",
        advice: [
            "현재의 생활 패턴과 스트레스 관리 방식을 유지하세요",
            "규칙적인 운동과 충분한 수면을 지속하세요",
            "주기적인 자기점검을 통해 스트레스 수준을 모니터링하세요"
        ],
        preventiveMeasures: [
            "일과 삶의 균형 유지하기",
            "취미 활동 지속하기",
            "정기적인 휴식 시간 가지기"
        ]
    },
    {
        level: "경계",
        range: [31, 60],
        description: "초기 번아웃 증상이 나타나고 있습니다. 적절한 관리와 주의가 필요한 상태입니다.",
        advice: [
            "업무나 일상생활의 우선순위를 재설정하세요",
            "스트레스 해소를 위한 운동이나 명상을 시작해보세요",
            "필요한 경우 주변에 도움을 요청하세요"
        ],
        preventiveMeasures: [
            "업무 시간 조정하기",
            "스트레스 관리 기법 배우기",
            "충분한 휴식 시간 확보하기"
        ]
    },
    {
        level: "위험",
        range: [61, 80],
        description: "심각한 번아웃 상태입니다. 전문가의 도움과 적극적인 관리가 필요합니다.",
        advice: [
            "전문가 상담을 통한 치료를 고려하세요",
            "당분간 업무나 스트레스 요인을 줄이는 것이 필요합니다",
            "가족이나 친구들과 충분한 대화를 나누세요"
        ],
        preventiveMeasures: [
            "업무량 조절 및 휴식 시간 확대",
            "전문가 상담 정기적으로 받기",
            "스트레스 관리 프로그램 참여"
        ]
    },
    {
        level: "심각",
        range: [81, 100],
        description: "매우 심각한 번아웃 상태입니다. 즉각적인 전문가 개입과 생활패턴 개선이 필요합니다.",
        advice: [
            "즉시 전문가의 도움을 받으세요",
            "필요한 경우 휴직이나 휴가를 고려하세요",
            "일상생활 전반의 재조정이 필요합니다"
        ],
        preventiveMeasures: [
            "즉각적인 업무 중단 고려",
            "전문의 상담 및 치료",
            "생활 패턴 전면 재조정"
        ]
    }
];

const categoryAnalysis = {
    physical: {
        title: "신체적 증상",
        description: "신체적 피로도와 건강 상태를 나타냅니다.",
        recommendations: [
            "규칙적인 운동하기",
            "충분한 수면 취하기",
            "건강한 식습관 유지하기"
        ]
    },
    emotional: {
        title: "정서적 증상",
        description: "감정적 소진과 스트레스 수준을 나타냅니다.",
        recommendations: [
            "명상이나 요가 시작하기",
            "주기적인 감정 일기 쓰기",
            "취미 활동 즐기기"
        ]
    },
    cognitive: {
        title: "인지적 증상",
        description: "집중력과 판단력의 저하 정도를 나타냅니다.",
        recommendations: [
            "업무 우선순위 정하기",
            "집중력 향상 운동하기",
            "충분한 휴식 취하기"
        ]
    },
    behavioral: {
        title: "행동적 증상",
        description: "일상생활에서의 행동 변화를 나타냅니다.",
        recommendations: [
            "규칙적인 생활패턴 만들기",
            "건강한 습관 형성하기",
            "사회적 관계 유지하기"
        ]
    },
    work: {
        title: "직무 관련 증상",
        description: "업무 수행과 관련된 어려움을 나타냅니다.",
        recommendations: [
            "업무 경계 설정하기",
            "효율적인 시간 관리하기",
            "동료와의 소통 늘리기"
        ]
    }
};
