# Site Overview

> 주 1회 업데이트 전제로, 기존 터미널 미감을 **개발 활동 대시보드**로 확장한 개인 사이트.

## 설계 전제

- **업데이트 빈도가 낮음** — 포스트만으로는 2~3주 만에 사이트가 "죽은 듯이" 보이기 쉬움.
- **터미널 미감은 유지** — 기존 자산을 버리지 않음. 다만 이제 "장식"이 아니라 **실제 정보**로 읽히도록 역할 재배치.
- **축적된 데이터가 메인** — 프로젝트 상태·활동 피드·프로필이 항상 노출되는 콘텐츠. 포스트는 부록.
- 결론: 홈을 **블로그 랜딩**에서 **개발자 대시보드**로 재설계.

## 현재 규모

- 6개 라우트, 2개 포스트, 7개 dummy 프로젝트(3 pinned), 10개 dummy 활동 이벤트
- Dummy 데이터는 모두 [TODO.md](TODO.md)와 코드 내 `TODO(dummy):` 마커로 추적 가능

## 페이지 구성

### `/` — Home 대시보드 (활동 중심)

네 개 섹션이 위에서 아래로. 프로필 정체성은 `/about`으로 분리됨 — 홈은 "지금 뭐 하고 있나"에 집중.

1. **`$ ls pinned/`** — 상단 고정 프로젝트 (기본 3개)
   - 상태 뱃지 · 이름 · 언어 · 별 · 한줄 설명이 한 행
   - `pinned: true`로 지정된 항목만 노출
   - 소스: [projects.js](src/lib/data/projects.js)

2. **`$ git log --oneline -6`** — 최근 활동 피드
   - 커밋(`·`) · PR(`↰`) · 릴리스(`★`) · 이슈(`!`) 혼합
   - 소스: [activity.js](src/lib/data/activity.js)

3. **`$ tail -n 3 posts/`** — 최근 포스트 3개
   - 자동으로 `src/content/posts/`의 최신 3개를 집음

4. **`$ help`** — 주요 섹션으로의 네비게이션 링크 한 줄

### `/projects` — 전체 프로젝트 목록
- status / recent-commit / stars / name 4가지 정렬 토글
- 상태 뱃지 색깔로 활성도 한눈에 구분
- 소스: [Projects.svelte](src/routes/Projects.svelte)

### `/projects/:id` — 프로젝트 상세
- 상태 · 이름 · 별 · desc · 메타(LANG/LAST/TAGS/REPO) · 긴 summary · 외부 repo 링크
- 소스: [ProjectDetail.svelte](src/routes/ProjectDetail.svelte)

### `/posts`, `/posts/:slug` — 포스트
- `/posts` — `$ ls posts/` 헤더, `PostRow` 행 리스트, BackLink로 홈 복귀
- `/posts/:slug` — 마크다운 본문 (gray-matter 기반 frontmatter + marked + hljs 파싱시점 하이라이팅)
- Home의 "tail -n 3" 섹션과 동일한 [PostRow](src/lib/components/PostRow.svelte) 컴포넌트 사용

### `/about` — 정체성 중심 페이지
두 개 프롬프트 섹션으로 구성:

1. **`$ neofetch`** — 프로필 블록 ([NeofetchBlock.svelte](src/lib/components/NeofetchBlock.svelte))
   - 이름/위치/역할/에디터/쉘/언어/Uptime/Now + 한줄 태그라인
   - 소스: [profile.js](src/lib/data/profile.js)

2. **`$ cat about.md`** — 본문
   - bio 3문단 · 현재 스택(key-value) · 개발 원칙 · 링크
   - 소스: [About.svelte](src/routes/About.svelte)

## 컨셉: "터미널답게"란 무엇인가

"Hacker 테마" 사이트가 유행한 건 2023~2025년. 지금 기준 **"예쁘지만 빈 집"**으로 읽히기 쉬움. 이 사이트는 그 함정을 피하려고 세 가지 규칙을 뒀음.

### 1. 모든 섹션이 "명령어 결과"로 보인다
- 섹션 헤더는 프롬프트(`$ ls pinned/`, `$ git log ...`)
- `ls`, `git log`, `cat`, `tail` 같은 실제 유닉스 명령이 메타포의 기반
- 내용은 **진짜 의미**가 있어야 하고, 장식성 ASCII 아트는 최소화 (scanline 정도만 허용)

### 2. 상태로 "살아있음"을 표현한다
- 프로젝트 뱃지: `[ACTIVE]` · `[WIP]` · `[STALE]` · `[ARCHIVED]`
- **STALE/ARCHIVED를 일부러 남겨둠** — 모두 ACTIVE면 뱃지 자체가 의미 없음
- 활동 피드의 sigil(`·` / `↰` / `★` / `!`): 텍스트를 읽기 전에 이벤트 종류를 구분

### 3. 포스트가 뜸해도 사이트가 살아있다
- 매주 포스트를 안 써도 activity 피드 2~3줄 추가만으로 "움직이는" 느낌
- 프로필의 `now` 한 줄도 주 단위 갱신 포인트
- 장기적으론 GitHub API 연동으로 자동화 가능 (현재는 수동)

## 데이터 레이어

모든 대시보드 콘텐츠는 순수 JS 데이터로 분리됨 — UI는 이걸 읽기만 함.

| 파일 | 역할 | 스키마 |
|---|---|---|
| [profile.js](src/lib/data/profile.js) | 본인 프로필 | 단일 객체 |
| [projects.js](src/lib/data/projects.js) | 프로젝트 카탈로그 | `Project[]` (JSDoc 정의) |
| [activity.js](src/lib/data/activity.js) | 활동 이벤트 스트림 | `Event[]` (JSDoc 정의) |

이 분리 덕분에 나중에 GitHub API로 교체해도 **UI는 한 줄도 안 바뀜** — 이 세 파일의 export만 fetch 래퍼로 갈아끼우면 됨.

## 유지보수 루틴

**매주 (선택)**
- `profile.js`의 `now` 한 줄 업데이트
- `activity.js`에 새 이벤트 1~3개 추가 (오래된 건 삭제)

**새 프로젝트 만들 때**
- `projects.js`에 `Project` 1개 추가
- `pinned: true`로 올릴지 결정 (홈에 3개 유지 권장)

**새 포스트 올릴 때**
- `src/content/posts/`에 `YYYY_MMDD_SEQ.md` 드롭
- 그 외 아무 것도 안 해도 됨 — 홈의 `tail -n 3` 섹션이 자동 반영

**방치 신호**
- activity 피드 최상단이 "2w ago", "1mo ago"로 밀리기 시작 → **GitHub API 자동화를 고려할 시점**

## 확장 지점

### 새 라우트
[routes.js](src/lib/routes.js) 배열에 `{ pattern, component }` 한 줄. App.svelte는 건드리지 않음.

### 새 테마
- [variables.css](src/styles/variables.css)에 `[data-theme="<id>"]` 블록
- [theme.svelte.js](src/lib/stores/theme.svelte.js)의 `themes` 배열에 `{ id, label }` 한 줄

### 새 이벤트 종류 (sigil 추가 등)
- [activity.js](src/lib/data/activity.js)의 `EventKind` JSDoc 확장
- [ActivityRow.svelte](src/lib/components/ActivityRow.svelte)의 `KIND_SIGIL` 맵에 엔트리 추가

### GitHub API 실제 연동
`activity.js`와 `projects.js`를 각각 fetch 래퍼로 교체. 스키마가 이미 API 응답에 가깝게 맞춰져 있어 교체는 기계적.
- events: `GET /users/{user}/events/public` (60 req/hr unauth)
- repos: `GET /users/{user}/repos` (60 req/hr unauth)

## 한계 / 의식적으로 뺀 것

- **해시 라우팅 (`/#/projects`)** — SEO와 소셜 공유 품질이 약함. 진짜 URL로 가려면 라우터 전면 교체 필요.
- **번들 1.1MB (gzip 354KB)** — 주범은 `highlight.js` 전 언어 기본 등록. 포스트 늘면 필요한 언어만 등록하는 `highlight.js/lib/core` 경로로 갈 가치 있음.
- **`{@html}` XSS** — 자작 콘텐츠 전제라 무방비. 외부 기여 받게 되면 DOMPurify 필요.
- **테스트 0개** — 변경 검증은 수동(dev 서버 + 브라우저).

## 관련 문서

- [CLAUDE.md](CLAUDE.md) — 코드베이스 작업 시 AI가 참고하는 기술 문서 (아키텍처/관례)
- [TODO.md](TODO.md) — dummy 콘텐츠 교체 체크리스트
- 이 문서는 2026-04-24 대시보드 재설계 시점 스냅샷. 구조가 크게 바뀌면 같이 업데이트 필요.
