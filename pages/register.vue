<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { useToast } from '@/components/ui/toast';

const { signIn } = useAuth()

const router = useRouter()

const { toast } = useToast()

useHead({
    title: 'Cadastro - IMTESTE',
})


definePageMeta({
    auth: {
        unauthenticatedOnly: true,
    }
})

const name = ref('')
const setName = (value: string) => {
    name.value = value
}
const email = ref('')
const setEmail = (value: string) => {
    email.value = value
}

const password = ref('')
const setPassword = (value: string) => {
    password.value = value
}

const avatar = ref('')
const setAvatar = (value: string) => {
    avatar.value = value
}

const clear = () => {
    setName('')
    setEmail('')
    setPassword('')
    setAvatar('')
}

const register = async () => {
    if (!name.value || !email.value || !password.value || !avatar.value) {
        toast({
            title: 'Erro ao cadastrar',
            description: 'Preencha todos os campos',
            variant: 'destructive',
        })
        return
    }
    if (password.value.length < 8) {
        toast({
            title: 'Erro ao cadastrar',
            description: 'A senha deve ter no mínimo 8 caracteres',
            variant: 'destructive',
        })
        return
    }
    if (!/[A-Z]/.test(password.value)) {
        toast({
            title: 'Erro ao cadastrar',
            description: 'A senha deve ter no mínimo 1 letra maiúscula',
            variant: 'destructive',
        })
        return
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value)) {
        toast({
            title: 'Erro ao cadastrar',
            description: 'A senha deve ter no mínimo 1 caractere especial',
            variant: 'destructive',
        })
        return
    }
    if (!/[0-9]/.test(password.value)) {
        toast({
            title: 'Erro ao cadastrar',
            description: 'A senha deve ter no mínimo 1 número',
            variant: 'destructive',
        })
        return
    }
    await $fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
            avatar: avatar.value,
        }),
    }).then(async (res: any) => {
        if (res.id) {
            await signIn({ email: email.value, password: password.value })
                .then(() => {
                    clear();
                    router.push('/');
                })
                .catch((err: any) => {
                    toast({
                        title: 'Erro ao logar',
                        description: err.message,
                        variant: 'destructive',
                    })
                })
        }
    }).then(() => {
        toast({
            title: 'Cadastro realizado com sucesso',
            description: 'Você foi cadastrado com sucesso!',
        })
        clear();
    }).catch((err: any) => {
        console.log(err);
        toast({
            title: 'Erro ao cadastrar',
            description: err.data.detail,
            variant: 'destructive',
        })
    })
}

</script>

<template>
    <PageContainer class="flex flex-row justify-center md:items-center md:justify-between lg:justify-center pt-0">
        <div class="p-12 w-[28rem]">
            <h1 class="font-bold text-2xl antialiased text-primary">Cadastre-se</h1>
            <p class="text-sm py-2 text-gray-400">Bem-vindo ao IMTESTE! Começe sua jornada
                de aprendizado e
                conquiste novos conhecimentos. Aproveite ao máximo nossos cursos e recursos exclusivos!</p>
            <form @submit.prevent="register">
                <div class="flex flex-col gap-2">
                    <div class="w-full flex flex-col items-center gap-1.5">
                        <label class="font-bold">Avatar</label>
                        <img v-if="avatar" :src="avatar" class="w-20 h-20 rounded-full object-cover" />
                        <label for="image_input"
                            class="text-sm border-4 rounded p-2 cursor-pointer hover:text-primary hover:border-primary">Escolher
                            Imagem</label>
                        <input type="file" id="image_input" accept="image/jpeg, image/png, image/jpg" multiple="false"
                            class="hidden"
                            v-on:change="async (e: any) => setAvatar(await decodeBase64Image(e.target.files[0]))" />
                    </div>
                    <label for="name" class="font-bold">Name</label>
                    <Input id="name" name="name" type="text" placeholder="Name" v-model="name" required />
                    <label for="email" class="font-bold">Email</label>
                    <Input id="email" name="email" type="email" placeholder="Email" v-model="email" required />
                    <label for="password" class="font-bold">Password</label>
                    <Input id="password" name="password" type="password" placeholder="Password" v-model="password"
                        required />
                    <div class="flex flex-col gap-y-1">
                        <p class="text-sm text-gray-400">* Mínimo 8 caracteres.</p>
                        <p class="text-sm text-gray-400">* Mínimo 1 letra maiúscula.</p>
                        <p class="text-sm text-gray-400">* Mínimo 1 caractere especial.</p>
                        <p class="text-sm text-gray-400">* Mínimo 1 número.</p>
                    </div>
                    <Button type="submit" class="font-bold">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
        <NuxtImg src="/signinBackground.jpg" alt="Login Background Image"
            class="overflow-hidden hidden md:block h-[76vh] object-cover rounded-3xl" />
    </PageContainer>
</template>