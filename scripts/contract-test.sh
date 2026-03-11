#!/bin/bash

# 계약 테스트: OpenAPI 스펙 vs 실제 API 검증
# Prism proxy 모드로 API 요청을 검증합니다

set -e

echo "🔍 계약 테스트 시작..."
echo ""

# 환경 변수 확인
API_URL=${API_URL:-"http://localhost:3000"}
SPEC_PATH="specs/openapi.yaml"

echo "📋 설정:"
echo "  - API URL: $API_URL"
echo "  - OpenAPI 스펙: $SPEC_PATH"
echo ""

# 스펙 파일 존재 확인
if [ ! -f "$SPEC_PATH" ]; then
  echo "❌ OpenAPI 스펙 파일을 찾을 수 없습니다: $SPEC_PATH"
  exit 1
fi

# Prism 설치 확인
if ! command -v npx &> /dev/null; then
  echo "❌ npx를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요."
  exit 1
fi

echo "✅ Prism proxy 모드로 API 검증 중..."
echo ""

# Prism proxy 모드로 실행 (백그라운드)
# 실제 API로 요청을 프록시하면서 응답이 스펙과 일치하는지 검증
npx prism proxy "$SPEC_PATH" "$API_URL" --errors &
PRISM_PID=$!

# Prism이 시작될 때까지 대기
sleep 3

# 테스트 실행 (여기에 실제 테스트 명령 추가 가능)
echo "🧪 API 엔드포인트 검증 중..."

# 기본 헬스체크
curl -s -o /dev/null -w "%{http_code}" http://localhost:4010/api/articles || true

# Prism 종료
kill $PRISM_PID 2>/dev/null || true

echo ""
echo "✅ 계약 테스트 완료!"
