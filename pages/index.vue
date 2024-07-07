<script setup lang="ts">
definePageMeta({ auth: false })
import { ArrowRight } from 'lucide-vue-next';
</script>

<template>
    <div class="container flex">
        <div class="w-2/4 p-8 flex flex-col justify-evenly">
            <h1 class="text-5xl font-bold leading-snug text-[#187571]">Desbloqueie o Seu Potencial com os Nossos
                Cursos
            </h1>
            <p class="text-sm">Encontrar um emprego após a graduação pode ser fácil com o nosso curso online, que
                lhe ensinarão o processo de busca de emprego, incluindo networking, habilidades de entrevista e
                negociação de ofertas de emprego. Comece sua carreira com o pé direito com a nossa orientação
                especializada.</p>
            <Button class="flex gap-2 w-fit h-fit items-center bg-[#00b3aa]">
                <p class="font-bold">Procure o seu Curso</p>
                <ArrowRight class="w-6 h-6" />
            </Button>
        </div>
        <div class="w-2/4 p-8">
            <img src="../public/indexImage.svg" />
        </div>
    </div>
</template>