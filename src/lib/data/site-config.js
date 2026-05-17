/**
 * 사이트 메인 화면(Home)을 위한 설정 및 데이터 파일입니다.
 * 이 파일만 수정하면 홈페이지의 문구와 프로젝트 목록이 자동으로 변경됩니다.
 */

export const siteConfig = {
    // 1. 메인 화면 최상단(Hero Section)에 나타날 문구들
    hero: {
        // 내가 쓰고 싶은 1~3줄의 소개 글 (배열 형태로 줄바꿈을 관리)
        introText: [
            "레트로 게임의 추억을 잊지 못합니다.",
            "어릴 시절 밤을 새면서 했던 단색 모니터 속의 그 게임들...",
            "30년도 훨씬 지난 지금에야, 다시 그때의 그 느낌을 만들어 볼 여유가 생겼습니다."
        ],
        // 깃허브 및 기타 소셜 링크
        links: [
            {
                name: "GitHub",
                url: "https://github.com/smgal",
                icon: "@smgal" // 화면에 보여질 텍스트
            },
            // 아이디어: 원하신다면 여기에 LinkedIn, Email, Blog, X(Twitter) 등을 추가할 수 있습니다.
            // {
            //     name: "Email",
            //     url: "mailto:your-email@example.com",
            //     icon: "Contact Me"
            // }
        ]
    },

    // 2. 주요 프로젝트 목록 (Featured Projects)
    // - 이미지 크기 가이드: 원활한 UI 구성을 위해 16:9 비율(예: 800x450px) 권장
    // - 이미지 파일 위치: public/assets/ 폴더에 이미지를 넣고 "/assets/파일명.png" 형태로 작성하세요.
    featuredProjects: [
        {
            id: "hadar2026",
            title: "Hadar2026",
            description: "2026년에 시작하는 '또 다른 지식의 성전' 복각 프로젝트",
            imageUrl: "https://github.com/user-attachments/assets/126ebcd9-76ee-4b64-88f7-0b16420d2168", // 임시 혹은 외부 URL도 가능
            repoUrl: "https://github.com/smgal/Hadar2026",
            tags: ["Flutter", "Retro", "Game"]
        },
        {
            id: "muarae2026",
            title: "MuArae2026",
            description: "2005년 Delphi/Pascal로 제작된 AVEJ 게임을 Rust + Bevy Engine으로 포팅하는 프로젝트",
            imageUrl: "https://github.com/user-attachments/assets/67a1b0f3-56c8-4971-b0c4-533bea7e9326", // 16:9 비율의 이미지를 여기에 맞춰주세요.
            repoUrl: "https://github.com/smgal/MuArae2026",
            tags: ["Rust", "Bevy Engine", "Porting"]
        }
    ]
};
