#!/bin/bash

# README 자동 업데이트 스크립트
# 프로젝트 상태를 분석하여 README의 특정 섹션을 업데이트합니다.

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
README_FILE="$PROJECT_DIR/README.md"

# 현재 날짜
CURRENT_DATE=$(date +"%Y-%m-%d")

# package.json에서 버전 정보 추출
VERSION=$(node -p "require('$PROJECT_DIR/package.json').version" 2>/dev/null || echo "0.1.0")

# 의존성 버전 추출
NEXT_VERSION=$(node -p "require('$PROJECT_DIR/package.json').dependencies.next.replace('^', '')" 2>/dev/null || echo "14.0")

# 테스트 파일 수 계산
E2E_TEST_COUNT=$(ls -1 "$PROJECT_DIR/e2e/tests/"*.spec.ts 2>/dev/null | wc -l)
UNIT_TEST_COUNT=$(find "$PROJECT_DIR/src" -name "*.test.ts" 2>/dev/null | wc -l)

# src 파일 수 계산
SRC_FILES=$(find "$PROJECT_DIR/src" -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | wc -l)

# 최근 커밋 정보
LAST_COMMIT=$(git -C "$PROJECT_DIR" log -1 --format="%h - %s" 2>/dev/null || echo "N/A")

echo "Project Status:"
echo "  - Version: $VERSION"
echo "  - Next.js: $NEXT_VERSION"
echo "  - Source files: $SRC_FILES"
echo "  - E2E tests: $E2E_TEST_COUNT"
echo "  - Unit tests: $UNIT_TEST_COUNT"
echo "  - Last commit: $LAST_COMMIT"
echo "  - Updated: $CURRENT_DATE"

echo "README status check complete"
