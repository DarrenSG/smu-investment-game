<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { type PlayerAllocation, TOTAL_BUDGET, validateAllocation } from '@/lib/game'

const props = defineProps<{
  playerNames: string[]
}>()

const emit = defineEmits<{
  submit: [allocations: PlayerAllocation[]]
}>()

const allocations = ref<PlayerAllocation[]>([])
const currentIndex = ref(0)
const assetAValue = ref(50)
const error = ref<string | null>(null)

const currentPlayer = computed(() => props.playerNames[currentIndex.value])
const assetBValue = computed(() => TOTAL_BUDGET - assetAValue.value)
const isLastPlayer = computed(() => currentIndex.value === props.playerNames.length - 1)

function onSliderChange(value: number[] | undefined) {
  if (!value) return
  assetAValue.value = value[0]
  error.value = null
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const val = parseInt(target.value, 10)
  if (isNaN(val)) {
    error.value = 'Please enter a valid number'
    return
  }
  const validationError = validateAllocation(val)
  if (validationError) {
    error.value = validationError
    return
  }
  assetAValue.value = val
  error.value = null
}

function submitAllocation() {
  const validationError = validateAllocation(assetAValue.value)
  if (validationError) {
    error.value = validationError
    return
  }

  allocations.value.push({
    name: currentPlayer.value,
    assetA: assetAValue.value,
    assetB: assetBValue.value,
  })

  if (isLastPlayer.value) {
    emit('submit', allocations.value)
  } else {
    currentIndex.value++
    assetAValue.value = 50
    error.value = null
  }
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto space-y-4">
    <div class="flex gap-2 justify-center flex-wrap">
      <Badge
        v-for="(name, i) in playerNames"
        :key="i"
        :variant="i < currentIndex ? 'default' : i === currentIndex ? 'outline' : 'secondary'"
        class="text-sm"
      >
        {{ i < currentIndex ? '&#10003;' : '' }} {{ name }}
      </Badge>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">{{ currentPlayer }}'s Turn</CardTitle>
        <CardDescription>
          Allocate your ${{ TOTAL_BUDGET }} between Asset A (riskless) and Asset B (pooled).
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Asset A (Riskless) &mdash; returned as-is</label>
            <div class="flex items-center gap-4">
              <span class="text-lg font-mono w-12 text-right">${{ assetAValue }}</span>
              <Slider
                :model-value="[assetAValue]"
                :max="TOTAL_BUDGET"
                :min="0"
                :step="1"
                class="flex-1"
                @update:model-value="onSliderChange"
              />
            </div>
            <Input
              type="number"
              :value="assetAValue"
              :min="0"
              :max="TOTAL_BUDGET"
              @change="onInputChange"
              placeholder="Enter amount for Asset A"
            />
            <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
          </div>

          <div class="rounded-lg bg-muted p-4 space-y-1">
            <div class="flex justify-between text-sm">
              <span>Asset A (Riskless)</span>
              <span class="font-mono font-medium">${{ assetAValue }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Asset B (Pooled)</span>
              <span class="font-mono font-medium">${{ assetBValue }}</span>
            </div>
            <hr class="my-2 border-border" />
            <div class="flex justify-between text-sm font-medium">
              <span>Total</span>
              <span class="font-mono">${{ TOTAL_BUDGET }}</span>
            </div>
          </div>
        </div>

        <Button @click="submitAllocation" class="w-full" size="lg">
          {{ isLastPlayer ? 'Submit & View Results' : 'Submit & Next Player' }}
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
