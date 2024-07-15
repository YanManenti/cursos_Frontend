<script setup lang="ts">

useHead({
  title: 'IMTESTE',
  meta: [
    {
      name: 'description',
      content: 'IMTESTE - Aprenda com os melhores cursos online'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ]
})

import Toaster from '@/components/ui/toast/Toaster.vue'

const { data, signOut } = useAuth()

const avatar = ref('')
const setAvatar = (value: string) => {
  avatar.value = value
}

// TRANSFORM DATA.AVATAR USING DECODEBASE64IMAGE

watch(data, async () => {
  if (data.value) {
    const avatarString = await $fetch(`http://127.0.0.1:8000/api/users/avatar/${data.value.subject.id}`).then((res: any) => res)
    setAvatar(avatarString.avatar)
  }
})

const nav = [
  { label: 'Início', to: '/' },
  { label: 'Cursos', to: '/courses' },
  { label: 'Blog', to: '/blog' },
  { label: 'Login', to: '/login' },
  { label: 'Cadastro', to: '/register' },
]

</script>

<template>
  <Toaster />
  <div dir="routing/pages" :nav="nav" current-route>
    <div class="bg-white flex flex-row max-h-40 items-center justify-between p-12">
      <div class="flex flex-row items-center gap-x-1">
        <img src="./public/logo.svg" class="max-h-14" />
        <h1 class="font-bold text-4xl antialiased text-primary text-center">IMTESTE</h1>
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
      <div v-if="data">
        <div class="flex flex-row items-center gap-x-2">
          <p class="font-semibold text-lg">Bem vindo, {{ data.subject.name }}</p>
          <img :src="avatar" class="w-14 h-14 rounded-full object-cover" />
          <Button :variant="'ghost'" @click="signOut()">
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
