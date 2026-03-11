#!/bin/bash

# OpenAPI 스펙에서 모든 코드 생성
# Usage: npm run generate:all

set -e

echo "🚀 OpenAPI 코드 생성 시작..."
echo ""

# 1. 스펙 검증
echo "📋 1/4: OpenAPI 스펙 검증 중..."
npm run spec:validate
echo ""

# 2. TypeScript 타입 생성
echo "📦 2/4: TypeScript 타입 생성 중..."
npm run generate:types
echo ""

# 3. API 클라이언트 생성
echo "🔧 3/4: API 클라이언트 생성 중..."
npm run generate:client
echo ""

# 4. Zod 스키마 생성
echo "✅ 4/4: Zod 스키마 생성 중..."
npm run generate:zod
echo ""

echo "✨ 모든 코드 생성 완료!"
echo ""
echo "생성된 파일:"
echo "  - generated/types/api.d.ts (TypeScript 타입)"
echo "  - generated/api-client/ (API 클라이언트 SDK)"
echo "  - generated/zod/schemas.ts (Zod 검증 스키마)"
echo ""
