<script setup lang="ts">
import { Star } from 'lucide-vue-next';
const CourseCardProps = defineProps<{
    width: string
    title: string
    price: number
    base64Image: any
    score: number
    reviews: number
    onClick: () => void
}>()

const containerClass = `${CourseCardProps.width} h-full bg-white rounded-lg shadow-md p-4 cursor-pointer`

const imgSrc = ref(CourseCardProps.base64Image);

const decodeImageProp = () => {
    const reader = new FileReader();
    if (!CourseCardProps.base64Image) return null;
    reader.readAsDataURL(CourseCardProps.base64Image);
    reader.onload = async () => {
        try {
            if (typeof reader.result !== 'string') throw new Error('Error reading file');
            const encodedFile = reader.result?.split(",")[1];
            imgSrc.value = `data:image/${CourseCardProps.base64Image.type};base64,${encodedFile}`;
        } catch {
            console.log('Error reading file');
            imgSrc.value = null;
        }

    };
}

watch(
    () => CourseCardProps.base64Image,
    () => {
        decodeImageProp();
    },
    { immediate: true }
);

</script>

<template>
    <div :class="containerClass" @click="onClick">
        <div class="h-full flex flex-col gap-y-2 justify-between">
            <div class="flex flex-col justify-start gap-y-2">
                <img v-bind:src="imgSrc" class="rounded-lg max-h-40 object-cover" alt="Course image" />
                <h1 class="font-bold text-lg">{{ title }}</h1>
            </div>
            <div class="flex flex-row items-center justify-between ">
                <p class="font-semibold text-lg text-primary">R$ {{ price }}</p>
                <div class="flex flex-row w-fit gap-x-1 items-center">
                    <Star class="w-4 h-4 text-gray-400" fill="#caa02b" />
                    <p class="text-lg text-gray-500">{{ score }}</p>
                    <p class="text-lg text-gray-500">({{ reviews }})</p>
                </div>
            </div>
        </div>
    </div>
</template>