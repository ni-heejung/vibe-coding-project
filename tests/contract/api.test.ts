/**
 * OpenAPI 계약 테스트
 * 실제 API 응답이 OpenAPI 스펙과 일치하는지 검증합니다.
 */

import { describe, test, expect } from '@jest/globals'

describe('API Contract Tests', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000'

  describe('Articles API', () => {
    test('GET /api/articles should return valid response structure', async () => {
      const response = await fetch(`${API_URL}/api/articles`)

      expect(response.status).toBe(200)

      const data = await response.json()

      expect(data).toHaveProperty('articles')
      expect(Array.isArray(data.articles)).toBe(true)
    })
  })

  describe('Authentication API', () => {
    test('POST /api/users should validate required fields', async () => {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: {} }),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data).toHaveProperty('errors')
    })
  })

  describe('User API', () => {
    test('PUT /api/user without auth should return 401', async () => {
      const response = await fetch(`${API_URL}/api/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { bio: 'test' } }),
      })

      expect(response.status).toBe(401)
    })
  })
})
