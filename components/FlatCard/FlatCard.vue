<script setup lang="ts">
import * as icons from "lucide-vue-next";

const FlatCardProps = defineProps<{
    width: string
    title: string
    description: string
    iconName: string
}>()
const containerClass = ['flex', 'flex-col', 'items-center', FlatCardProps.width]
//@ts-ignore
const icon = computed(() => icons[FlatCardProps.iconName]);
</script>

<template>
    <div :class="[...containerClass]">
        <div class="w-fit p-4 bg-primary rounded-full">
            <component :is="icon" color="white" />
        </div>
        <div class="w-full p-5 flex flex-col justify-evenly items-center gap-2">
            <h1 class="text-2xl font-bold leading-snug text-secondary text-center">{{ title }}</h1>
            <p class="text-sm text-center">{{ description }}</p>
        </div>

    </div>

</template>