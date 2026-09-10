# 🚀 AI Sync Club 상세페이지 제작 스킬

AI Sync Club Created by 싱크 License: MIT

상품명, 카테고리, 상품 사진을 바탕으로 모바일 쇼핑몰 상세페이지 기획안과 컷별 이미지 제작안을 만드는 AI Sync Club 공식 Codex 스킬의 수정본입니다. 원본 저장소의 이력과 출처를 유지합니다.

📌 AI Sync Club 커뮤니티 가입하기: https://litt.ly/aisyncclub

- 원본 저장소: https://github.com/aisyncclub/detail_page_codex_skill
- 이 수정본: https://github.com/a52372852-alt/detail_page_codex_skill

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

## 설치 방법

### 1. Codex에 설치하기

터미널에서 아래 명령어를 실행합니다.

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/a52372852-alt/detail_page_codex_skill.git /tmp/detail_page_codex_skill
cp -R /tmp/detail_page_codex_skill/ecommerce-detail-page ~/.codex/skills/ecommerce-detail-page
```

설치가 끝나면 Codex를 재시작합니다. 재시작 후 `상세페이지 만들고 싶어`처럼 말하면 스킬이 자동으로 호출됩니다.

이미 설치되어 있고 최신 버전으로 갱신하고 싶다면 아래처럼 다시 복사하면 됩니다.

```bash
cd /tmp/detail_page_codex_skill
git pull
rm -rf ~/.codex/skills/ecommerce-detail-page
cp -R ecommerce-detail-page ~/.codex/skills/ecommerce-detail-page
```

### 2. Claude Code에 설치하기

Claude Code에서도 같은 스킬 폴더를 사용할 수 있습니다.

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/a52372852-alt/detail_page_codex_skill.git /tmp/detail_page_codex_skill
cp -R /tmp/detail_page_codex_skill/ecommerce-detail-page ~/.claude/skills/ecommerce-detail-page
```

설치 후 Claude Code를 재시작하고 자연어로 호출합니다.

## 사용 방법

Codex에서 자연어로 호출합니다:

```text
상세페이지 만들고 싶어
상세페이지 제작해
칫솔 상세페이지 만들어줘 추천으로
이 상품 사진으로 상세페이지 만들어줘
```

추천 입력 방식:

- 사진이 있으면: 상품 사진을 첨부하고 `이 사진으로 상세페이지 만들어줘`.
- 사진이 없으면: `[상품명] 상세페이지 만들어줘 추천으로`.
- 원하는 스타일이 있으면: `쿠팡 실용형`, `네이버 스토리형`, `프리미엄 감성형` 등을 추가.
- 컷 수가 정해져 있으면: `6컷`, `12컷`, `15컷` 등을 추가.

### 바로 쓸 수 있는 예시

상품명만 가지고 추천 가정으로 기획할 때:

```text
칫솔 상세페이지 만들어줘 추천으로
```

상품 사진을 기준으로 기획할 때:

```text
이 상품 사진으로 상세페이지 만들어줘
```

판매 채널과 스타일을 지정할 때:

```text
쿠팡용 실용 정보형으로 12컷 상세페이지 만들어줘
```

짧은 버전으로 만들 때:

```text
립밤 상세페이지 6컷으로 만들어줘
```

기획안 승인 후 이미지를 만들 때:

```text
이 기획안 그대로 이미지 생성해줘
```

### 작업 흐름

기본 진행 방식:

1. 상품 사진이 있는지 먼저 확인합니다.
2. 사진이 있으면 품질과 구도를 분석하고 컷별 배치를 추천합니다.
3. 필요한 질문은 한 번에 하나씩 선택지로 묻습니다.
4. 먼저 컷별 카피, 이미지 구성, ASCII 레이아웃이 포함된 기획안을 만듭니다.
5. 일관성이 필요한 경우 기준 컷을 먼저 확정한 뒤 독립된 컷을 병렬 생성합니다.
6. 상세페이지 본문 컷의 상단과 하단에 각각 정확히 60픽셀의 흰색 여백을 붙이고 픽셀 단위로 검증합니다.
7. 썸네일이 필요하면 여백 없이 별도 1000x1000 이미지로 생성하고 검증합니다.
8. HTML 검수/다운로드 페이지, ZIP 파일, QA 리포트를 만듭니다.

중요 운영 규칙: 최종 이미지는 승인된 한국어 카피를 정확히 포함해야 합니다. 짧은 문구는 이미지 생성 단계에서 넣을 수 있고, 긴 원문·법정·사양 문구는 결정론적 타이포그래피로 배치합니다. 한글이 깨지거나 빠진 컷은 실패로 처리합니다.

### 이 수정본의 개선 사항

- 상품 구조, 소재 순서, 끝단, 봉제선, 부자재 위치를 `상품 고정 조건`으로 먼저 기록합니다.
- 사용자가 지정한 잘된 컷을 기준 이미지로 삼아 제품, 모델, 배경, 조명 일관성을 유지합니다.
- 정밀도가 필요한 시리즈는 기준 컷을 먼저 확정한 뒤 나머지 독립 컷을 병렬 제작합니다.
- 부분 수정은 대상 컷만 새 버전으로 만들고, 나머지 컷은 그대로 보존합니다.
- 긴 한국어 원문과 법정·사양 문구는 정확한 글자 보존을 위해 결정론적 타이포그래피를 허용합니다.
- 검수 페이지의 `전체 다운로드`를 실제 ZIP 파일 링크로 만들어 브라우저의 다중 다운로드 차단 문제를 피합니다.
- 상세페이지 본문 이미지에는 상단 60px·하단 60px의 빈 순백색 여백을 자동으로 추가하고 검증합니다.
- 썸네일은 상·하단 강제 여백 없이 정확히 1000x1000px로 별도 생성합니다.

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
python3 "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" ecommerce-detail-page
node --check ecommerce-detail-page/scripts/build-image-gallery.mjs
python3 ecommerce-detail-page/scripts/add-white-margins.py --help
python3 ecommerce-detail-page/scripts/make-thumbnail.py --help
```

정확한 여백 처리 스크립트는 Pillow를 사용합니다. 실행 환경에 Pillow가 없다면 `python3 -m pip install -r ecommerce-detail-page/requirements.txt`로 설치합니다.
