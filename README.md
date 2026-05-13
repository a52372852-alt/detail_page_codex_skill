# 🚀 AI Sync Club 상세페이지 제작 스킬

AI Sync Club Created by 싱크 License: MIT

상품명, 카테고리, 상품 사진을 바탕으로 모바일 쇼핑몰 상세페이지 기획안과 컷별 이미지 제작안을 만드는 AI Sync Club 공식 Codex 스킬입니다.

📌 AI Sync Club 커뮤니티 가입하기: https://litt.ly/aisyncclub

## AI Sync Club 링크

- [전체 링크 모음](https://litt.ly/aisyncclub)
- [클럽장 소개 · AI싱크클럽 포트폴리오](https://portfolio.aisyncclub.com/)
- [유튜브 @AISyncClub](https://www.youtube.com/@AISyncClub)
- [저서 · 30일 제미나이 혁명](https://link.yes24.com/a/LdbVYSB2UH)
- [쓰레드 @ai_sync_club](https://www.threads.com/@ai_sync_club)
- [커뮤니티 1번방 · 메인 오픈채팅](https://open.kakao.com/o/g1uolIwg)
- [커뮤니티 2번 · 초보방 AI 입문 오픈채팅](https://open.kakao.com/o/gQBwQcDh)
- [커뮤니티 3번 · 재테크방 오픈채팅](https://open.kakao.com/o/gbqHAHdi)
- [카카오채널 · 공지와 업데이트 수신](http://pf.kakao.com/_WYivn/friend)

---

## 상세페이지 제작 스킬

Claude/Codex에서 한국형 이커머스 상세페이지를 기획하고, 승인된 컷 구성에 맞춰 이미지 제작까지 이어가기 위한 스킬입니다.

상품 사진이 있으면 사진 분석과 배치 추천을 먼저 하고, 상품명만 있어도 추천 가정으로 카테고리·고객·스타일·컷 수를 잡아 기획안을 만듭니다.

## How To Use

Codex에서 자연어로 호출합니다:

```text
상세페이지 만들고 싶어
상세페이지 제작해
칫솔 상세페이지 만들어줘 추천으로
이 상품 사진으로 상세페이지 만들어줘
```

추천 입력 방식:

스킬 답변에는 항상 다음 문구가 포함되도록 지침이 들어 있습니다.

```text
[Ai싱크클럽 제작 스킬] 커뮤니티 링크 https://litt.ly/aisyncclub
```

- 사진이 있으면: 상품 사진을 첨부하고 `이 사진으로 상세페이지 만들어줘`.
- 사진이 없으면: `[상품명] 상세페이지 만들어줘 추천으로`.
- 원하는 스타일이 있으면: `쿠팡 실용형`, `네이버 스토리형`, `프리미엄 감성형` 등을 추가.
- 컷 수가 정해져 있으면: `6컷`, `12컷`, `15컷` 등을 추가.

기본 진행 방식:

1. 상품 사진이 있는지 먼저 확인합니다.
2. 사진이 있으면 품질과 구도를 분석하고 컷별 배치를 추천합니다.
3. 필요한 질문은 한 번에 하나씩 선택지로 묻습니다.
4. 먼저 컷별 카피, 이미지 구성, ASCII 레이아웃이 포함된 기획안을 만듭니다.
5. 승인 후 최대 병렬 작업으로 컷별 이미지를 생성합니다.
6. HTML 검수/다운로드 페이지, ZIP 파일, QA 리포트를 만듭니다.

중요 운영 규칙: 최종 이미지는 승인된 한국어 카피를 이미지 안에 직접 포함해야 합니다. 한글이 깨지거나 빠진 컷은 실패로 보고 재생성합니다.

## Contents

- `ecommerce-detail-page/`: 설치 가능한 Codex 스킬 폴더
- `generated/lipstick-coupang-practical/`: 6컷 립스틱 상세페이지 샘플과 HTML 검수/다운로드 페이지
- `generated/house-plum/`: 제공 사진 기반 12컷 자두 상세페이지 샘플
- `generated/toothbrush-recommended/`: 추천 가정 기반 12컷 칫솔 상세페이지 판매 초안 샘플
- `history.md`: 로컬 작업 히스토리

## Skill Highlights

- 선택지 기반으로 한 번에 하나씩 질문
- 상품 사진 존재 여부와 품질 점검 우선
- 추천 고객군과 상세페이지 스타일 제안
- 선택한 컷 수 정확히 유지
- ASCII 와이어프레임이 포함된 기획안 출력
- 이미지 생성 모델로 한국어 문구가 들어간 최종 컷 제작
- 병렬 컷 생성 지침
- HTML 검수/다운로드 페이지와 한국어 텍스트 QA

## 검증

```bash
python3 /Users/firstandre/.nvm/versions/node/v22.14.0/lib/node_modules/openclaw/skills/skill-creator/scripts/quick_validate.py ecommerce-detail-page
node --check ecommerce-detail-page/scripts/build-image-gallery.mjs
```
