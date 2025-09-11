# 🌳 코드잇 스프린트 공부의 숲 프로젝트

## 📦 Repository

- **Frontend**: [fs08-studyforest-team1-fe](https://github.com/MinJun916/fs08-studyforest-team1-fe)
- **Backend**: [fs08-studyforest-team1-be](https://github.com/MinJun916/fs08-studyforest-team1-be)

---

## 👥 팀원 구성

- **신민준** (Fullstack | Team Lead | FE Lead | BE Lead) 🧑‍💻 [(개인 Github 링크)]()
- **이유찬** (Frontend) 🎨 [(개인 Github 링크)]()
- **장수인** (Frontend) 🎨 [(개인 Github 링크)]()
- **홍승전** (Frontend) 🎨 [(개인 Github 링크)]()
- **이광체** (Fullstack) 🧑‍💻 [(개인 Github 링크)]()

---

## 📖 프로젝트 소개

최근 몇 년간 올바른 습관의 정착에 대한 사람들의 관심이 높아지고 있고, 그중에서도 **'조금씩 습관을 들이기'**에 대한 이론이 각광받고 있습니다.  
따라서 개인이 학습할 내용을 정리할 **스터디를 만들고**, 하루 동안 수행할 공부를 **관리**하며 **집중 타이머 기능**을 제공하고, 잘 수행할 때마다 **포인트를 제공하는 서비스**를 제작합니다.

- **프로젝트 이름**: 코드잇 스프린트 공부의 숲 프로젝트
- **프로젝트 기간**: 25.08.26 - 25.09.12 ( 2주 )

---

## 🛠 기술 스택

- **Frontend**: JavaScript, React.js, module.scss
- **Backend**: Express.js, PrismaORM
- **Database**: PostgreSQL
- **공통 Tool**: Git & Github, Discord, Notion

---

## 🌿 Git Branch Strategy

우리 팀은 **Git Flow** 브랜치 전략을 사용합니다.  
각 브랜치는 명확한 역할을 가지며, 협업 시 혼동을 줄이고 안정적인 배포를 보장합니다.

---

### 📌 주요 브랜치

- **`main`**
  - 실제 운영(Production) 환경에 배포되는 안정적인 코드만 유지합니다.
  - 항상 배포 가능한 상태를 보장합니다.

- **`develop`**
  - 다음 배포를 준비하는 통합 브랜치입니다.
  - 새로운 기능(feature)들이 합쳐지는 브랜치입니다.

- **`hotfix`**
  - 배포 후 긴급 버그 수정이 필요할 때 사용합니다.
  - `main`에서 분기 → 수정 완료 후 `main`과 `develop`에 병합합니다.

---

### 🌱 개인 브랜치

- **`fe-<name>`**
  - 새로운 기능 개발을 위한 개인 브랜치입니다.
  - `develop`에서 분기 → 작업 완료 후 다시 `develop`에 병합합니다.

---

### 🔄 Workflow

1. `feature/*` 브랜치에서 기능 개발
2. 기능이 완료되면 `develop`으로 병합
3. 테스트가 완료되면 `main`으로 병합 및 배포
4. 운영 중 발생한 긴급 이슈는 `hotfix/*` 브랜치에서 해결

💡 Git Flow 전략을 통해 **안정적인 배포와 효율적인 협업**을 유지합니다.

---

## 🔎 팀원별 구현 기능 상세

### 🧑‍💻 신민준 (Fullstack)

- 구현 기능 상세

### 🎨 이유찬 (Frontend)

- 구현 기능 상세

### 🎨 장수인 (Frontend)

- 구현 기능 상세

### 🎨 홍승전 (Frontend)

- 구현 기능 상세

### 🧑‍💻 이광체 (Fullstack)

- 구현 기능 상세

---

## 📂 파일 구조

```

.
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

---

## 구현 홈페이지

**Frontend**:  
https://fs08-studyforest-team1-fe.vercel.app/

**Backend**(API Document):  
https://studyforest-n1at.onrender.com/api-docs

---

## 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
