<script setup lang="ts">
import { ref } from 'vue'
import SetupPhase from '@/components/SetupPhase.vue'
import InputPhase from '@/components/InputPhase.vue'
import ResultsPhase from '@/components/ResultsPhase.vue'
import { type PlayerAllocation, type GameResult, calculateResults } from '@/lib/game'

type GamePhase = 'setup' | 'input' | 'results'

const phase = ref<GamePhase>('setup')
const playerNames = ref<string[]>([])
const gameResult = ref<GameResult | null>(null)

function onStart(names: string[]) {
  playerNames.value = names
  phase.value = 'input'
}

function onSubmit(allocations: PlayerAllocation[]) {
  gameResult.value = calculateResults(allocations)
  phase.value = 'results'
}

function onPlayAgain() {
  phase.value = 'setup'
  playerNames.value = []
  gameResult.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight">Investment Game</h1>
        <p class="text-muted-foreground mt-2">
          A decision-making game exploring how individual choices affect collective outcomes.
        </p>
      </header>

      <SetupPhase v-if="phase === 'setup'" @start="onStart" />
      <InputPhase v-else-if="phase === 'input'" :player-names="playerNames" @submit="onSubmit" />
      <ResultsPhase v-else-if="phase === 'results' && gameResult" :result="gameResult" @play-again="onPlayAgain" />
    </div>
  </div>
</template>
