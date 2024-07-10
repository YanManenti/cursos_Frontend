<script setup lang="ts">
import { Star, Heart, ShoppingCart } from 'lucide-vue-next';
definePageMeta({ auth: false })

const route = useRoute();
const price = ref(100);
const score = ref(4.5);
const reviews = ref(100);

</script>

<template>
    <PageContainer class="container pt-0 gap-2">
        <NuxtImg src="/loginBackground.jpg" alt="Login Background Image"
            class="overflow-hidden h-[40vh] object-cover rounded-3xl object-center" />
        <div class="flex flex-row flex-wrap items-center justify-between w-full pt-4">
            <h1 class="font-bold text-3xl antialiased text-primary">Curso: {{ route.params.id }}</h1>
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
            <p class="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet reprehenderit, officiis
                quis
                est animi ipsa neque adipisci eveniet obcaecati eius odit autem qui velit illum maxime at deleniti
                maiores
                alias?</p>
        </div>
    </PageContainer>
</template>