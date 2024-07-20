<script setup lang="ts">
import Carousel from '@/components/ui/carousel/Carousel.vue';
import CarouselContent from '@/components/ui/carousel/CarouselContent.vue';
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue';
import CarouselNext from '@/components/ui/carousel/CarouselNext.vue';
import CarouselPrevious from '@/components/ui/carousel/CarouselPrevious.vue';
import { toast } from '@/components/ui/toast';
import { ArrowRight } from 'lucide-vue-next';


const runtimeConfig = useRuntimeConfig()

useHead({
    title: 'IMTESTE',
})

definePageMeta({ auth: false })

const data = await fetch(`http://${runtimeConfig.app.BACK_API}/api/courses/`)
    .then(async (res: any) => {
        const parsed = await res.json();
        if (res.ok) {
            return parsed.courses;
        } else {
            throw new Error(parsed.message, res.status);
        }
    })
    .catch((err: any) => {
        toast({
            title: 'Erro ao carregar cursos',
            description: err.message,
        });
    })

const courses = ref(data);

</script>

<template>
    <div class="w-full md:container flex p-4 md:p-12 flex-col-reverse md:flex-row items-center">
        <div class="w-full md:w-2/4 p-4 flex flex-col justify-evenly gap-4">
            <h1 class="text-2xl md:text-5xl font-bold leading-snug text-secondary">Desbloqueie o Seu Potencial com os
                Nossos
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
        <div class="w-2/4 hidden md:flex p-4">
            <img src="../public/indexImage.svg" />
        </div>

    </div>
    <div class="w-full md:container p-4 md:p-12 flex flex-col md:flex-row items-center">
        <FlatCard width="w-full md:w-1/3" title="Aprendizado Online"
            description="Aprenda a qualquer momento e em qualquer lugar com acesso vitalício" iconName="Signal" />
        <FlatCard width="w-full md:w-1/3" title="Aprenda Habilidades Técnicas e Interpessoais"
            description="Você aprenderá habilidades técnicas e também habilidades interpessoais como colaboração, comunicação, pensamento crítico, etc."
            iconName="BrainCircuit" />
        <FlatCard width="w-full md:w-1/3" title="Certificação Reconhecida"
            description="Receba um certificado reconhecido ao concluir o curso" iconName="Award" />
    </div>
    <div
        class="w-full px-2 py-2 md:px-24 md:py-12 flex flex-col bg-secondary gap-2 md:gap-6 items-center border-t border-gray-300 shadow-inner">
        <div class=" flex flex-row justify-between px-2 md:px-0 w-full md:container">
            <div class="w-fit flex flex-col">
                <h1 class="text-base md:text-3xl font-bold text-white pt-2 md:py-0">
                    Cursos em Destaque
                </h1>

                <span class="text-sm text-white/80 md:hidden">Arraste para ver mais!</span>
            </div>
            <Button :variant="'ghost'" class="text-white hover:text-white hover:font-bold py-0 md:py-2"
                @click="$router.push('/courses')">Ver Todos</Button>
        </div>
        <Carousel class="w-full md:container flex flex-row items-center justify-center py-4 px-0 md:px-4">
            <CarouselContent class="max-w-fit flex flex-row">
                <template v-for="(course) in courses">
                    <CarouselItem class="basis-full md:basis-1/3">
                        <CourseCard :id="course.id" width="w-full" :title="course.name" :price="course.price"
                            :description="course.description" :base64Image="course.background" :score="course.score"
                            :reviews="course.reviews" :onClick="() => $router.push(`/courses/${course.id}`)" />
                    </CarouselItem>
                </template>
            </CarouselContent>
            <CarouselPrevious class="hidden md:flex" />
            <CarouselNext class="hidden md:flex" />
        </Carousel>
    </div>
</template>