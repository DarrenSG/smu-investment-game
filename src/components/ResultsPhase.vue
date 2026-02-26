<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { type GameResult } from '@/lib/game'

defineProps<{
  result: GameResult
}>()

const emit = defineEmits<{
  playAgain: []
}>()

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto space-y-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Game Results</CardTitle>
        <CardDescription>
          Here's how the investment pool performed.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm text-muted-foreground">Total Asset B Pool</p>
            <p class="text-2xl font-bold font-mono">{{ formatCurrency(result.totalBPool) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm text-muted-foreground">After +50% Increase</p>
            <p class="text-2xl font-bold font-mono">{{ formatCurrency(result.boostedBPool) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm text-muted-foreground">Each Player's B Share</p>
            <p class="text-2xl font-bold font-mono">{{ formatCurrency(result.perPlayerBShare) }}</p>
          </div>
        </div>

        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead class="text-right">Asset A</TableHead>
              <TableHead class="text-right">Asset B</TableHead>
              <TableHead class="text-right">Return (A)</TableHead>
              <TableHead class="text-right">Return (B)</TableHead>
              <TableHead class="text-right font-bold">Total Payout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="player in result.players" :key="player.name">
              <TableCell class="font-medium">{{ player.name }}</TableCell>
              <TableCell class="text-right font-mono">{{ formatCurrency(player.assetA) }}</TableCell>
              <TableCell class="text-right font-mono">{{ formatCurrency(player.assetB) }}</TableCell>
              <TableCell class="text-right font-mono">{{ formatCurrency(player.returnA) }}</TableCell>
              <TableCell class="text-right font-mono">{{ formatCurrency(player.returnB) }}</TableCell>
              <TableCell class="text-right font-mono font-bold">{{ formatCurrency(player.totalPayout) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Button @click="emit('playAgain')" variant="outline" class="w-full" size="lg">
      Play Again
    </Button>
  </div>
</template>
