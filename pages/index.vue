<script setup lang="ts">
definePageMeta({ auth: false })
import Carousel from '@/components/ui/carousel/Carousel.vue';
import CarouselContent from '@/components/ui/carousel/CarouselContent.vue';
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue';
import CarouselNext from '@/components/ui/carousel/CarouselNext.vue';
import CarouselPrevious from '@/components/ui/carousel/CarouselPrevious.vue';
import { ArrowRight } from 'lucide-vue-next';

const data = await $fetch('http://127.0.0.1:8000/api/courses/').then((res: any) => res.courses);

const courses = ref(data);

</script>

<template>
    <div class="container flex p-12">
        <div class="w-2/4 p-4 flex flex-col justify-evenly">
            <h1 class="text-5xl font-bold leading-snug text-secondary">Desbloqueie o Seu Potencial com os Nossos
                Cursos
            </h1>
            <p class="text-sm">Encontrar um emprego após a graduação pode ser fácil com o nosso curso online, que
                lhe ensinarão o processo de busca de emprego, incluindo networking, habilidades de entrevista e
                negociação de ofertas de emprego. Comece sua carreira com o pé direito com a nossa orientação
                especializada.</p>
            <Button class="flex gap-2 w-fit h-fit items-center bg-primary" @click="$router.push('/courses')">
                <p class="font-bold">Descubra o seu Curso</p>
                <ArrowRight class="w-6 h-6" />
            </Button>
        </div>
        <div class="w-2/4 p-4">
            <img src="../public/indexImage.svg" />
        </div>

    </div>
    <div class="container p-12 flex flex-row">
        <FlatCard width="w-1/3" title="Aprendizado Online"
            description="Aprenda a qualquer momento e em qualquer lugar com acesso vitalício" iconName="Signal" />
        <FlatCard width="w-1/3" title="Aprenda Habilidades Técnicas e Interpessoais"
            description="Você aprenderá habilidades técnicas e também habilidades interpessoais como colaboração, comunicação, pensamento crítico, etc."
            iconName="BrainCircuit" />
        <FlatCard width="w-1/3" title="Certificação Reconhecida"
            description="Receba um certificado reconhecido ao concluir o curso" iconName="Award" />
    </div>
    <div class="w-full px-24 py-12 flex flex-col bg-secondary gap-6 items-center border-t border-gray-300 shadow-inner">
        <div class="container flex flex-row justify-between">
            <h1 class="text-3xl font-bold text-white">Cursos em Destaque</h1>
            <Button :variant="'ghost'" class="text-white hover:text-white hover:font-bold"
                @click="$router.push('/courses')">Ver Todos</Button>
        </div>
        <Carousel class="container flex flex-row items-center justify-center p-4">
            <CarouselContent class="max-w-fit flex flex-row">
                <template v-for="(course) in courses">
                    <CarouselItem class="basis-1/3">
                        <CourseCard :id="course.id" width="w-full" :title="course.name" :price="course.price"
                            :base64Image="course.background" :score="course.score" :reviews="course.reviews"
                            :onClick="() => $router.push(`/courses/${course.id}`)" />
                    </CarouselItem>
                </template>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
</template>