#!/usr/bin/env node

/**
 * OpenAPI 스펙에서 계약 테스트 자동 생성
 * specs/openapi.yaml → generated/tests/
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SPEC_PATH = path.join(__dirname, '../specs/openapi.yaml');
const OUTPUT_DIR = path.join(__dirname, '../generated/tests');

function generateTestCase(path, method, operation) {
  const operationId = operation.operationId || `${method}_${path}`;
  const testName = operation.summary || operationId;
  const requiresAuth = operation.security && operation.security.length > 0;

  let code = `describe('${method.toUpperCase()} ${path}', () => {\n`;
  code += `  it('${testName}', async () => {\n`;

  if (requiresAuth) {
    code += `    // TODO: Add authentication token\n`;
    code += `    const token = 'your-jwt-token';\n\n`;
  }

  code += `    const response = await fetch('http://localhost:3000${path}', {\n`;
  code += `      method: '${method.toUpperCase()}',\n`;

  if (requiresAuth) {
    code += `      headers: {\n`;
    code += `        'Authorization': \`Bearer \${token}\`,\n`;
    code += `        'Content-Type': 'application/json',\n`;
    code += `      },\n`;
  }

  if (operation.requestBody) {
    code += `      body: JSON.stringify({\n`;
    code += `        // TODO: Add request body based on schema\n`;
    code += `      }),\n`;
  }

  code += `    });\n\n`;

  // 응답 검증
  const responses = operation.responses || {};
  const successCode = Object.keys(responses).find(code => code.startsWith('2')) || '200';

  code += `    expect(response.status).toBe(${successCode});\n`;

  if (successCode !== '204') {
    code += `    const data = await response.json();\n`;
    code += `    expect(data).toBeDefined();\n`;
  }

  code += `  });\n`;
  code += `});\n\n`;

  return code;
}

async function main() {
  console.log('🔄 테스트 케이스 생성 중...');

  // OpenAPI 스펙 로드
  const spec = yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));
  const paths = spec.paths || {};

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let allTests = `// 🤖 이 파일은 자동 생성되었습니다.\n`;
  allTests += `// Generated from: specs/openapi.yaml\n\n`;
  allTests += `import { describe, it, expect } from '@jest/globals';\n\n`;

  let testCount = 0;

  // 각 경로와 메서드에 대해 테스트 생성
  for (const [pathName, pathItem] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
        console.log(`  ✓ ${method.toUpperCase()} ${pathName}`);
        allTests += generateTestCase(pathName, method, operation);
        testCount++;
      }
    }
  }

  // 파일로 저장
  const outputPath = path.join(OUTPUT_DIR, 'api.test.ts');
  fs.writeFileSync(outputPath, allTests);

  console.log(`✅ 테스트 케이스 생성 완료: ${outputPath}`);
  console.log(`   생성된 테스트: ${testCount}개`);
}

main().catch(console.error);
