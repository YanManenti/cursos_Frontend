<script setup lang="ts">
definePageMeta({ auth: false })
import Carousel from '@/components/ui/carousel/Carousel.vue';
import CarouselContent from '@/components/ui/carousel/CarouselContent.vue';
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue';
import CarouselNext from '@/components/ui/carousel/CarouselNext.vue';
import CarouselPrevious from '@/components/ui/carousel/CarouselPrevious.vue';
import { ArrowRight } from 'lucide-vue-next';
import getEncodedBase64Image from '@/utils/getEncodedBase64Image.js';

const name = ref();

const setName = (newName: string) => {
    name.value = newName;
}


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
            <Button class="flex gap-2 w-fit h-fit items-center bg-primary">
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

    <input type="file" id="image_input" accept="image/jpeg, image/png, image/jpg" multiple="false"
        v-on:change="(e) => getEncodedBase64Image(e, setName)" />


    <div
        class="container px-24 py-12 flex flex-col bg-secondary gap-6 items-center border-t border-gray-300 shadow-inner">
        <div class="w-full flex flex-row justify-between">
            <h1 class="text-3xl font-bold text-white">Cursos em Destaque</h1>
            <Button :variant="'ghost'" class="text-white hover:text-white hover:font-bold"
                @click="$router.push('/courses')">Ver Todos</Button>
        </div>
        <Carousel class="flex flex-row items-center justify-center p-4">
            <CarouselContent class="max-w-fit flex flex-row">
                <CarouselItem class="basis-1/3">
                    <CourseCard id="1" width="w-full" title="Curso de Desenvolvimento Web" :price="100.30"
                        :base64Image="name" :score="4.5" :reviews="100" :onClick="() => console.log('Clicked')" />
                </CarouselItem>
                <CarouselItem class="basis-1/3">
                    <CourseCard id="2" width="w-full" title="Curso para Iniciantes em Programação" :price="50.20"
                        :base64Image="name" :score="4.0" :reviews="50" :onClick="() => console.log('Clicked')" />
                </CarouselItem>
                <CarouselItem class="basis-1/3">
                    <CourseCard id="3" width="w-full" title="Curso de Desenvolvimento de Aplicativos Móveis"
                        :price="150" :base64Image="name" :score="4.8" :reviews="200"
                        :onClick="() => console.log('Clicked')" />
                </CarouselItem>
                <CarouselItem class="basis-1/3">
                    <CourseCard id="4" width="w-full" title="Curso de Desenvolvimento Web 2" :price="100"
                        :base64Image="name" :score="3.5" :reviews="200" :onClick="() => console.log('Clicked')" />
                </CarouselItem>
                <CarouselItem class="basis-1/3">
                    <CourseCard id="5" width="w-full" title="Curso de Desenvolvimento Web 3" :price="100"
                        :base64Image="name" :score="4.5" :reviews="100" :onClick="() => console.log('Clicked')" />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
</template>