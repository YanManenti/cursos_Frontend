<script setup lang="ts">
import { Star, Heart } from 'lucide-vue-next';
definePageMeta({ auth: false })

const route = useRoute();

const data = await $fetch(`http://127.0.0.1:8000/api/courses/${route.params.id}`).then((res: any) => res);

const title = computed(() => data.name);
const description = computed(() => data.description);
const img = computed(() => data.background);
const price = computed(() => data.price);
const score = computed(() => data.score);
const reviews = computed(() => data.reviews);

</script>

<template>
    <PageContainer class="container pt-0 gap-2">
        <NuxtImg :src="img" alt="Login Background Image"
            class="overflow-hidden h-[40vh] object-cover rounded-3xl object-center" />
        <div class="flex flex-row flex-wrap items-center justify-between w-full pt-4">
            <h1 class="font-bold text-3xl antialiased text-primary">{{ title }}</h1>
            <div class="flex flex-row">
                <Button :variant="'secondary'" class="font-bold"> Comprar
                </Button>
                <Button :variant="'ghost'" class="font-bold">
                    <Heart class="w-10 h-10 text-red-600 fill-red-600 hover:text-red-600/80 hover:fill-red-600" />
                </Button>
            </div>
        </div>
        <div class="flex flex-col items-start">
            <p class="text-lg text-gray-500">R$ {{ price }}</p>
            <div class="flex flex-row w-fit gap-x-1 items-center">
                <Star class="w-4 h-4 text-gray-400" fill="#caa02b" />
                <p class="text-lg text-gray-500">{{ score }}</p>
                <p class="text-lg text-gray-500">({{ reviews }})</p>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <h2 class="font-bold text-md antialiased text-secondary">Descrição</h2>
            <p class="text-sm">{{ description }}</p>
        </div>
    </PageContainer>
</template>