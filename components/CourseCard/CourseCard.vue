<script setup lang="ts">
import { Star, X } from 'lucide-vue-next';
const CourseCardProps = defineProps<{
    id: string
    width: string
    title: string
    description: string
    price: number
    base64Image: string
    score: number
    reviews: number
    onClick: () => void
    onDelete?: () => void
}>()

const { status } = useAuth()

const containerClass = `${CourseCardProps.width} h-full bg-white rounded-lg shadow-md p-4 cursor-pointer`

const emit = defineEmits<{
    close: any
}>()

</script>

<template>
    <Dialog>
        <div :class="containerClass" @click="$router.push(`/courses/${id}`)">
            <div class="h-full flex flex-col gap-y-2 justify-between">
                <div class="flex flex-col justify-start gap-y-1">
                    <img v-bind:src="CourseCardProps.base64Image" class="rounded-lg max-h-40 object-cover"
                        alt="Course image" />
                    <div class="w-full h-fit flex justify-between items-center">
                        <h1 class="font-bold text-lg break-normal line-clamp-2">{{ title }}</h1>
                        <DialogTrigger as-child v-if="status === 'authenticated' && CourseCardProps.onDelete">
                            <Button
                                class="w-fit h-fit px-1 py-1 bg-white text-destructive hover:bg-destructive hover:text-white hover:initial"
                                @click.stop>
                                <X class="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="max-w-[300px] md:max-w-[425px] rounded-md">
                            <DialogHeader>
                                <DialogTitle class="text-primary text-left">Excluir Curso</DialogTitle>
                                <DialogDescription class="text-left">
                                    Excluir este curso é uma ação irreversível. Você tem certeza?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose>
                                <Button
                                    class="w-full h-fit px-4 py-2 bg-destructive text-white hover:bg-destructive/80 "
                                    @click="{
                                        CourseCardProps.onDelete?.();
                                        $emit('close');
                                    }">
                                    Excluir</Button>
                            </DialogClose>
                        </DialogContent>
                    </div>
                    <p class="text-sm break-normal line-clamp-2 min-h-10">{{ description }}</p>
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
    </Dialog>
</template>