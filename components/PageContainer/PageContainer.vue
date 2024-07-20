<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue'
const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div :class="cn('w-full flex flex-col p-4 md:p-12', props.class)">
        <slot />
    </div>
</template>