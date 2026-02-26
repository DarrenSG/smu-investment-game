export interface PlayerAllocation {
  name: string
  assetA: number
  assetB: number
}

export interface PlayerResult {
  name: string
  assetA: number
  assetB: number
  returnA: number
  returnB: number
  totalPayout: number
}

export interface GameResult {
  totalBPool: number
  boostedBPool: number
  perPlayerBShare: number
  players: PlayerResult[]
}

export const TOTAL_BUDGET = 100
export const POOL_MULTIPLIER = 1.5

export function calculateResults(players: PlayerAllocation[]): GameResult {
  const numPlayers = players.length
  const totalBPool = players.reduce((sum, p) => sum + p.assetB, 0)
  const boostedBPool = totalBPool * POOL_MULTIPLIER
  const perPlayerBShare = boostedBPool / numPlayers

  const playerResults: PlayerResult[] = players.map((p) => ({
    name: p.name,
    assetA: p.assetA,
    assetB: p.assetB,
    returnA: p.assetA,
    returnB: perPlayerBShare,
    totalPayout: p.assetA + perPlayerBShare,
  }))

  return {
    totalBPool,
    boostedBPool,
    perPlayerBShare,
    players: playerResults,
  }
}

export function validateAllocation(value: number): string | null {
  if (!Number.isInteger(value)) return 'Must be a whole number'
  if (value < 0) return 'Cannot be negative'
  if (value > TOTAL_BUDGET) return `Cannot exceed $${TOTAL_BUDGET}`
  return null
}
