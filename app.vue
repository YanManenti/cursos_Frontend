<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

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
    },
    {
      name: 'Cache-Control',
      content: 'no-store, must-revalidate'
    },
    {
      name: 'Pragma',
      content: 'no-cache'
    },

  ]
})

import Toaster from '@/components/ui/toast/Toaster.vue'
import { toast } from './components/ui/toast';

const { status, data, signOut } = useAuth()

const avatar = ref(data.value ? await fetch(`http://${runtimeConfig.app.BACK_API}/api/users/avatar/${data.value.subject.id}`).then(async (res: any) => await res.json().then((data: any) => data.avatar)) : '')
const setAvatar = (value: string) => {
  avatar.value = value
}

watch(data, async () => {
  if (data.value) {
    await fetch(`http://${runtimeConfig.app.BACK_API}/api/users/avatar/${data.value.subject.id}`)
      .then(async (res: any) => {
        const parsed = await res.json();
        if (res.ok) {
          setAvatar(parsed.avatar)
        } else {
          throw new Error(parsed.message, res.status);
        }
      })
      .catch((err: any) => {
        toast({
          title: 'Erro ao carregar avatar',
          description: err.message,
        });
      })
  } else {
    setAvatar('')
  }
})

const nav = [
  { label: 'Início', to: '/' },
  { label: 'Cursos', to: '/courses' },
  { label: 'Blog', to: '/blog' },
  { label: 'Login', to: '/login' },
  { label: 'Cadastro', to: '/register' },
  { label: 'Perfil', to: '/profile' }
]

</script>

<template>
  <Toaster />
  <div dir="routing/pages" :nav="nav" current-route class="md:container">
    <div class="bg-white flex flex-col md:flex-row max-h-fit items-center justify-between p-4 md:p-12">
      <div class="flex flex-row items-center gap-x-1">
        <img src="./public/logo.svg" class="max-h-14" />
        <h1 class="font-bold text-4xl antialiased text-primary text-center">IMTESTE</h1>
      </div>
      <div class="flex flex-row items-center gap-x-4">
        <Button :variant="'ghost'" @click="$router.push('/')">
          <p class="font-semibold text-sm md:text-lg">Início</p>
        </Button>
        <Button :variant="'ghost'" @click="$router.push('/courses')">
          <p class="font-semibold text-sm md:text-lg">Cursos</p>
        </Button>
        <Button :variant="'ghost'" @click="$router.push('/blog')">
          <p class="font-semibold text-sm md:text-lg">Blog</p>
        </Button>
      </div>
      <div v-if="status === 'authenticated'">
        <div class="flex flex-row items-center gap-x-2">
          <p class="font-semibold text-sm md:text-lg text-right">Bem vindo, {{ data.subject.name }}</p>
          <NuxtImg :src="avatar" class="w-14 h-14 rounded-full object-cover cursor-pointer"
            @click="async () => await navigateTo('/profile')" />
          <Button :variant="'ghost'" @click="() => signOut({ callbackUrl: '/', external: true })">
            <p class="font-semibold text-sm md:text-base">Sair</p>
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
