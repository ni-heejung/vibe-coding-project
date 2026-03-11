#!/usr/bin/env node

/**
 * OpenAPI 스펙에서 Zod 스키마 자동 생성
 * specs/openapi.yaml → generated/zod/
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SPEC_PATH = path.join(__dirname, '../specs/openapi.yaml');
const OUTPUT_DIR = path.join(__dirname, '../generated/zod');

// OpenAPI 타입을 Zod 타입으로 매핑
const typeMapping = {
  string: 'z.string()',
  integer: 'z.number().int()',
  number: 'z.number()',
  boolean: 'z.boolean()',
  array: 'z.array',
  object: 'z.object',
};

function generateZodSchema(name, schema) {
  const properties = schema.properties || {};
  const required = schema.required || [];

  let code = `export const ${name}Schema = z.object({\n`;

  for (const [propName, propSchema] of Object.entries(properties)) {
    const isRequired = required.includes(propName);
    const type = propSchema.type;
    const format = propSchema.format;

    let zodType = typeMapping[type] || 'z.any()';

    // 특수 포맷 처리
    if (format === 'email') zodType = 'z.string().email()';
    if (format === 'uri') zodType = 'z.string().url()';
    if (format === 'date-time') zodType = 'z.string().datetime()';
    if (format === 'uuid') zodType = 'z.string().uuid()';

    // 검증 규칙 추가
    if (propSchema.minLength) zodType += `.min(${propSchema.minLength})`;
    if (propSchema.maxLength) zodType += `.max(${propSchema.maxLength})`;
    if (propSchema.minimum) zodType += `.min(${propSchema.minimum})`;
    if (propSchema.maximum) zodType += `.max(${propSchema.maximum})`;

    // nullable 처리
    if (propSchema.nullable) zodType += '.nullable()';

    // optional 처리
    if (!isRequired) zodType += '.optional()';

    code += `  ${propName}: ${zodType},\n`;
  }

  code += '});\n\n';

  // TypeScript 타입 추론 추가
  code += `export type ${name} = z.infer<typeof ${name}Schema>;\n\n`;

  return code;
}

async function main() {
  console.log('🔄 Zod 스키마 생성 중...');

  // OpenAPI 스펙 로드
  const spec = yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));
  const schemas = spec.components?.schemas || {};

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 각 스키마에 대해 Zod 코드 생성
  let allSchemas = `import { z } from 'zod';\n\n`;
  allSchemas += `// 🤖 이 파일은 자동 생성되었습니다. 수정하지 마세요.\n`;
  allSchemas += `// Generated from: specs/openapi.yaml\n\n`;

  for (const [schemaName, schema] of Object.entries(schemas)) {
    console.log(`  ✓ ${schemaName}`);
    allSchemas += generateZodSchema(schemaName, schema);
  }

  // 파일로 저장
  const outputPath = path.join(OUTPUT_DIR, 'schemas.ts');
  fs.writeFileSync(outputPath, allSchemas);

  console.log(`✅ Zod 스키마 생성 완료: ${outputPath}`);
  console.log(`   생성된 스키마: ${Object.keys(schemas).length}개`);
}

main().catch(console.error);
