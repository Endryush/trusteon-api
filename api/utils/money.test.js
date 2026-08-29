import { describe, expect, it } from 'vitest'
import { getCommissionRate, roundMoney, splitCommission } from './money.js'
import { parsePagination } from './pagination.js'
import { AUTHOR_STATUS_TRANSITIONS, BUYER_STATUS_TRANSITIONS, ALL_STATUS_ID } from '../enums/status.enum.js'
import { updateUserSchema } from '../schemas/user.schema.js'

describe('money', () => {
  it('splits commission into two-decimal amounts', () => {
    const result = splitCommission(100, 0.15)
    expect(result.commission).toBe(15)
    expect(result.authorAmount).toBe(85)
    expect(result.rate).toBe(0.15)
  })

  it('keeps author plus commission equal to the rounded total', () => {
    const result = splitCommission(10.1, 0.15)
    expect(result.commission).toBe(1.52)
    expect(result.authorAmount).toBe(8.58)
    expect(result.commission + result.authorAmount).toBe(10.1)
  })

  it('falls back to 15% for invalid rates', () => {
    const previous = process.env.COMMISSION_RATE
    process.env.COMMISSION_RATE = 'not-a-number'
    expect(getCommissionRate()).toBe(0.15)
    process.env.COMMISSION_RATE = previous
  })
})

describe('pagination', () => {
  it('applies defaults and a max page size', () => {
    expect(parsePagination({})).toEqual({ page: 1, pageSize: 20, limit: 20, offset: 0 })
    expect(parsePagination({ page: '2', pageSize: '200' })).toMatchObject({ page: 2, pageSize: 50, offset: 50 })
  })
})

describe('order status machine', () => {
  it('only lets the buyer approve', () => {
    expect(AUTHOR_STATUS_TRANSITIONS[ALL_STATUS_ID.WAITING_APPROVE]).toBeUndefined()
    expect(BUYER_STATUS_TRANSITIONS[ALL_STATUS_ID.WAITING_APPROVE]).toContain(ALL_STATUS_ID.APPROVED)
  })
})

describe('user update schema', () => {
  it('rejects reputation and password', () => {
    const result = updateUserSchema.safeParse({
      name: 'Ana',
      userReputation: 99,
      password: 'secret1'
    })
    expect(result.success).toBe(false)
  })
})
