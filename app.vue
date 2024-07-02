<script setup lang="ts">
import Button from './components/ui/button/Button.vue';
const router = useRouter()
const { loggedIn, user, session, clear } = useUserSession()
const nav = [
  { label: 'Início', to: '/' },
  { label: 'Cursos', to: '/courses' },
  { label: 'Blog', to: '/blog' },
  { label: 'Login', to: '/login' },
  { label: 'Cadastro', to: '/register' },
]

</script>

<template>
  <div dir="routing/pages" :nav="nav" current-route>
    <div class="bg-white flex flex-row max-h-40 items-center justify-between pb-6">
      <div class="flex flex-row items-center gap-x-1">
        <img src="./public/logo.svg" class="max-h-14" />
        <h1 class="font-bold text-4xl antialiased text-[#00b3aa] text-center">IMTESTE</h1>
      </div>
      <div class="flex flex-row items-center gap-x-4">
        <Button :variant="'ghost'" @click="$router.push('/')">
          <p class="font-semibold text-lg">Início</p>
        </Button>
        <Button :variant="'ghost'" @click="$router.push('/courses')">
          <p class="font-semibold text-lg">Cursos</p>
        </Button>
        <Button :variant="'ghost'" @click="$router.push('/blog')">
          <p class="font-semibold text-lg">Blog</p>
        </Button>
      </div>
      <div v-if="loggedIn">
        <div class="flex flex-row items-center gap-x-1">
          <p class="font-semibold text-lg">Bem vindo, {{ user.login }}</p>
          <Button :variant="'ghost'" @click="clear">
            <p class="font-semibold text-base">Sair</p>
          </Button>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-row items-center gap-x-1">
          <Button :variant="'outline'" @click="$router.push('/login')">
            <p class="font-semibold text-base">Login</p>
          </Button>
          <Button :variant="'ghost'" @click="$router.push('/register')">
            <p class="font-semibold text-base">Cadastro</p>
          </Button>
        </div>
      </div>
    </div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
