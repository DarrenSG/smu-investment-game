<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emit = defineEmits<{
  start: [names: string[]]
}>()

const playerCount = ref(2)
const playerNames = ref<string[]>(['Player 1', 'Player 2'])

watch(playerCount, (count) => {
  const names = []
  for (let i = 0; i < count; i++) {
    names.push(playerNames.value[i] || `Player ${i + 1}`)
  }
  playerNames.value = names
})

function setPlayerCount(count: number) {
  playerCount.value = count
}

function startGame() {
  const names = playerNames.value.map((n, i) => n.trim() || `Player ${i + 1}`)
  emit('start', names)
}
</script>

<template>
  <Card class="w-full max-w-lg mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl">Game Setup</CardTitle>
      <CardDescription>
        Choose the number of players and enter their names.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="space-y-2">
        <label class="text-sm font-medium">Number of Players</label>
        <div class="flex gap-2">
          <Button
            v-for="n in [2, 3, 4]"
            :key="n"
            :variant="playerCount === n ? 'default' : 'outline'"
            @click="setPlayerCount(n)"
            class="flex-1"
          >
            {{ n }} Players
          </Button>
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-sm font-medium">Player Names</label>
        <div v-for="(_, i) in playerNames" :key="i" class="flex items-center gap-3">
          <span class="text-sm text-muted-foreground w-6">{{ i + 1 }}.</span>
          <Input
            v-model="playerNames[i]"
            :placeholder="`Player ${i + 1}`"
          />
        </div>
      </div>

      <Button @click="startGame" class="w-full" size="lg">
        Start Game
      </Button>
    </CardContent>
  </Card>
</template>
