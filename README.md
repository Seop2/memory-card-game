# 🃏 Memory Card Game

동물 카드 10쌍을 60초 안에 모두 맞추는 메모리 매칭 게임입니다.
Next.js 16(App Router)과 Zustand로 만들었고, 점수와 이동 횟수를 기준으로 로컬 랭킹을 기록합니다.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

## Demo

[Play Memory Game](https://memory-card-game-nine-nu.vercel.app/)

## Features

- 카드 20장(동물 10쌍) 매칭 게임, 제한시간 60초
- 두 장씩 뒤집어 비교 → 일치 시 점수 획득, 불일치 시 1초 후 자동으로 다시 뒤집힘
- 실시간 점수 / 남은 시간 / 이동 횟수 표시
- 게임 종료 시 이름을 입력해 랭킹에 기록 저장
- `localStorage` 기반 랭킹 보드 — 점수 우선, 동점 시 이동 횟수가 적은 순으로 정렬 (상위 10개 유지)
- 모바일 대응 네비게이션(햄버거 메뉴)

## Tech Stack

| 구분 | 사용 기술 |
| --- | --- |
| Framework | Next.js 16 (App Router, React Compiler) |
| UI | React 19 |
| 상태 관리 | Zustand (+ `persist` 미들웨어로 랭킹 저장) |
| 스타일 | CSS Modules |
| 테스트 | Vitest, jsdom |
| Lint | ESLint (`eslint-config-next`) |

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

```bash
# 프로덕션 빌드
npm run build
npm start

# 테스트 실행
npm test          # 1회 실행
npm run test:watch # watch 모드

# 린트
npm run lint
```

## Project Structure

```
src/
├─ app/
│  ├─ (landing)/   # 홈 - 게임 소개 및 플레이 영상
│  ├─ play/        # 게임 플레이 페이지
│  └─ rank/        # 랭킹 페이지
├─ components/
│  ├─ play/        # Card, Game, Timer, Score, GameOverModal 등 게임 UI
│  └─ button/       # 모바일 메뉴 버튼
├─ store/
│  ├─ gameStore.js  # 카드 상태, 매칭 로직, 타이머 등 게임 핵심 로직
│  └─ rankStore.js  # 랭킹 저장/정렬 (localStorage persist)
├─ lib/             # 날짜 포맷, 카드 덱 셔플 등 순수 유틸 함수
└─ data/            # 카드에 사용되는 동물 목록
```

게임 로직이 궁금하다면 `src/store/gameStore.js`부터 보시는 걸 추천합니다 — 카드 뒤집기, 매칭 판정, 타이머가 전부 여기서 zustand 스토어로 관리됩니다.

## License

Individual portfolio project.
