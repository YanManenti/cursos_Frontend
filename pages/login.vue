<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';

const { signIn, token, data, status, lastRefreshedAt } = useAuth()

watch(token, () => {
    console.log('Token changed:', token)
})

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
    }
})

const email = ref('')

const password = ref('')

</script>

<template>
    <PageContainer class="flex flex-row justify-center md:items-center md:justify-between lg:justify-center pt-0">
        <div class="p-12 w-[28rem]">
            <h1 class="font-bold text-2xl antialiased text-primary">Login</h1>
            <p class="text-sm py-2 text-gray-400">Bem-vindo de volta ao IMTESTE! Continue sua jornada
                de aprendizado e
                conquiste novos conhecimentos. Aproveite ao máximo nossos cursos e recursos exclusivos!</p>
            <p>Status: {{ status }}</p>
            <p>Data: {{ data || 'no session data present, are you logged in?' }}</p>
            <p>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</p>
            <p class="text-sm">JWT token: {{ token || 'no token present, are you logged in?' }}</p>
            <form @submit.prevent="signIn({ email, password })">
                <div class="flex flex-col gap-2">
                    <label for="email" class="font-bold">Email</label>
                    <Input id="email" name="email" type="text" placeholder="Email" v-model="email" required />
                    <label for="password" class="font-bold">Password</label>
                    <Input id="password" name="password" type="password" placeholder="Password" v-model="password"
                        required />
                    <Button type="submit" class="font-bold">
                        Entrar
                    </Button>
                </div>
            </form>
        </div>
        <NuxtImg src="/loginBackground.jpg" alt="Login Background Image"
            class="overflow-hidden hidden md:block h-[76vh] object-cover rounded-3xl" />
    </PageContainer>
</template>