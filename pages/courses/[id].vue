<script setup lang="ts">
import { useToast } from '@/components/ui/toast';
import { Star, Heart } from 'lucide-vue-next';

type Course = {
    id: number;
    name: string;
    description: string;
    background: string;
    price: number;
    score: number;
    reviews: number;
    interested_list: Array<{
        name: string;
        email: string;
    }>;
};

definePageMeta({ auth: false })
const { status, data, token } = useAuth()
const { toast } = useToast()
const route = useRoute();

const courseData = ref(await $fetch(`http://127.0.0.1:8000/api/courses/${route.params.id}`).then((res: any) => res))
const setCourseData = (value: Course) => {
    courseData.value = value;
}

const title = computed(() => courseData.value.name);
const description = computed(() => courseData.value.description);
const img = computed(() => courseData.value.background);
const price = computed(() => courseData.value.price);
const score = computed(() => courseData.value.score);
const reviews = computed(() => courseData.value.reviews);
const interested = computed(() => courseData.value.interested_list);

const handleInterest = async () => {
    const response = await $fetch(`http://127.0.0.1:8000/api/courses/${route.params.id}/add-interested`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
    })
        .then((res: any) => res)
        .catch((err: any) => {
            toast({
                title: 'Erro ao se interessar',
                description: err.message,
                variant: 'destructive',
            });
        });

    if (response) {
        toast({
            title: 'Interesse registrado',
            description: 'Seu interesse foi registrado com sucesso!',
        });
        setCourseData(response);
    }
};
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
                <Button v-if="status === 'authenticated'" :variant="'ghost'" class="font-bold" @click="handleInterest">
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
        <div class="flex flex-col w-full">
            <h2 class="font-bold text-md antialiased text-secondary">Interessados</h2>
            <div class="flex flex-row gap-2">
                <div v-for="user in interested" class="flex flex-col items-center gap-1 p-4 bg-slate-200 rounded-md">
                    <h3>{{ user.name }}</h3>
                    <p class="text-sm">{{ user.email }}</p>
                </div>
            </div>
        </div>
    </PageContainer>
</template>