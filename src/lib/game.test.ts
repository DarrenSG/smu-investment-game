import { describe, it, expect } from 'vitest'
import { calculateResults, validateAllocation, TOTAL_BUDGET } from './game'

describe('calculateResults', () => {
  it('matches the PDF example (4 players)', () => {
    const result = calculateResults([
      { name: 'Alan', assetA: 50, assetB: 50 },
      { name: 'Barry', assetA: 100, assetB: 0 },
      { name: 'Charles', assetA: 0, assetB: 100 },
      { name: 'Dave', assetA: 10, assetB: 90 },
    ])

    expect(result.totalBPool).toBe(240)
    expect(result.boostedBPool).toBe(360)
    expect(result.perPlayerBShare).toBe(90)

    expect(result.players[0].totalPayout).toBe(140) // Alan: 50 + 90
    expect(result.players[1].totalPayout).toBe(190) // Barry: 100 + 90
    expect(result.players[2].totalPayout).toBe(90)  // Charles: 0 + 90
    expect(result.players[3].totalPayout).toBe(100) // Dave: 10 + 90
  })

  it('handles 2 players', () => {
    const result = calculateResults([
      { name: 'P1', assetA: 60, assetB: 40 },
      { name: 'P2', assetA: 20, assetB: 80 },
    ])

    expect(result.totalBPool).toBe(120)
    expect(result.boostedBPool).toBe(180)
    expect(result.perPlayerBShare).toBe(90)

    expect(result.players[0].totalPayout).toBe(150) // 60 + 90
    expect(result.players[1].totalPayout).toBe(110) // 20 + 90
  })

  it('handles all players investing in Asset A only', () => {
    const result = calculateResults([
      { name: 'P1', assetA: 100, assetB: 0 },
      { name: 'P2', assetA: 100, assetB: 0 },
      { name: 'P3', assetA: 100, assetB: 0 },
    ])

    expect(result.totalBPool).toBe(0)
    expect(result.boostedBPool).toBe(0)
    expect(result.perPlayerBShare).toBe(0)

    result.players.forEach((p) => {
      expect(p.totalPayout).toBe(100)
    })
  })

  it('handles all players investing in Asset B only', () => {
    const result = calculateResults([
      { name: 'P1', assetA: 0, assetB: 100 },
      { name: 'P2', assetA: 0, assetB: 100 },
    ])

    expect(result.totalBPool).toBe(200)
    expect(result.boostedBPool).toBe(300)
    expect(result.perPlayerBShare).toBe(150)

    result.players.forEach((p) => {
      expect(p.totalPayout).toBe(150)
    })
  })

  it('returns correct returnA values (same as invested)', () => {
    const result = calculateResults([
      { name: 'P1', assetA: 75, assetB: 25 },
      { name: 'P2', assetA: 30, assetB: 70 },
    ])

    expect(result.players[0].returnA).toBe(75)
    expect(result.players[1].returnA).toBe(30)
  })

  it('splits B share equally regardless of contribution', () => {
    const result = calculateResults([
      { name: 'P1', assetA: 99, assetB: 1 },
      { name: 'P2', assetA: 0, assetB: 100 },
    ])

    // Both get same B share even though P1 contributed almost nothing
    expect(result.players[0].returnB).toBe(result.players[1].returnB)
  })
})

describe('validateAllocation', () => {
  it('returns null for valid values', () => {
    expect(validateAllocation(0)).toBeNull()
    expect(validateAllocation(50)).toBeNull()
    expect(validateAllocation(100)).toBeNull()
  })

  it('rejects decimals', () => {
    expect(validateAllocation(50.5)).toBe('Must be a whole number')
    expect(validateAllocation(0.1)).toBe('Must be a whole number')
  })

  it('rejects negative numbers', () => {
    expect(validateAllocation(-1)).toBe('Cannot be negative')
    expect(validateAllocation(-50)).toBe('Cannot be negative')
  })

  it('rejects values exceeding budget', () => {
    expect(validateAllocation(101)).toBe(`Cannot exceed $${TOTAL_BUDGET}`)
    expect(validateAllocation(200)).toBe(`Cannot exceed $${TOTAL_BUDGET}`)
  })
})
