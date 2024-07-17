<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'
import { useToast } from '@/components/ui/toast/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-vue-next';
import nuxtConfig from '@/nuxt.config';
const runtimeConfig = useRuntimeConfig()

const { status } = useAuth()

useHead({
    title: 'Cursos - IMTESTE',
})

definePageMeta({ auth: false })

const { toast } = useToast()

const fetcher = async (order_by: string, namefilter: string, page: number, limit: number, errorTitle: string, errorReturn?: object) => {
    return await $fetch(`${runtimeConfig.app.apiUrl}/api/courses/search/?order_by=${order_by}&namefilter=${namefilter}&page=${page}&limit=${limit}`)
        .then((res: any) => res)
        .catch((err: any) => {
            toast({
                title: errorTitle,
                description: err.data.detail,
                variant: 'destructive',
            })

            return errorReturn ? errorReturn : null;
        });
}

const order_by = ref('');
const setOrder = (value: string) => {
    order_by.value = value;
}

const namefilter = ref('');
const setNameFilter = (value: string) => {
    namefilter.value = value;
}

const page = ref(0);
const setPage = (value: number) => {
    page.value = value;
}

const limit = ref(15);
const setLimit = (value: number) => {
    limit.value = value;
}

const name = ref('')
const setName = (value: string) => {
    name.value = value
}

const description = ref('')
const setDescription = (value: string) => {
    description.value = value
}

const price = ref(0)
const setPrice = (value: number) => {
    price.value = value
}

const background = ref('')
const setBackground = (value: string) => {
    background.value = value
}



const resData = ref(await fetcher('ordemAlfabetica', '', page.value, limit.value, 'Erro ao buscar cursos'));
const setData = (value: any) => {
    resData.value = value;
}

const search = async () => {
    let order = order_by.value;
    if (order === '' || order === undefined || order === null) {
        order = 'ordemAlfabetica';
    }
    const res = await fetcher(order, namefilter.value, page.value, limit.value, 'Erro ao buscar cursos');
    setData(res);
}

const clearFilters = async () => {
    setNameFilter('');
    setOrder('');
    setPage(0);
    setLimit(15);
    setData(await fetcher('ordemAlfabetica', '', page.value, limit.value, 'Erro ao buscar cursos'));
}

const clearForm = () => {
    setName('');
    setDescription('');
    setPrice(0);
    setBackground('');
}

const register = async () => {
    await $fetch(`${runtimeConfig.app.apiUrl}/api/courses/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            price: price.value,
            background: background.value,
        }),
    }).then((res: any) => {
        if (res) {
            toast({
                title: 'Curso cadastrado',
                description: 'Seu curso foi cadastrado com sucesso!',
            });
            clearForm();
        }
    }).catch((err: any) => {
        toast({
            title: 'Erro ao cadastrar curso',
            description: err.data.detail,
            variant: 'destructive',
        });
    });
    search();
}

const handleDelete = async (id: string) => {
    await $fetch(`${runtimeConfig.app.apiUrl}/api/courses/${id}`, {
        method: 'DELETE',
    }).then((res: any) => {
        if (res) {
            toast({
                title: 'Curso excluído',
                description: 'Seu curso foi excluído com sucesso!',
            });
            clearForm();
        }
    }).catch((err: any) => {
        toast({
            title: 'Erro ao excluir curso',
            description: err.data.detail,
            variant: 'destructive',
        });
    });
    search();
}


const coursesData = computed(() => resData.value.courses);
const total = computed(() => resData.value.total);



</script>

<template>
    <PageContainer class="container">
        <Dialog v-if="status === 'authenticated'">
            <DialogTrigger as-child>
                <Button class="fixed bottom-3 right-3 px-2 py-2">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle class="text-primary">Crie o seu Curso!</DialogTitle>
                    <DialogDescription>
                        Complete as informações abaixo para criar um novo curso.
                    </DialogDescription>
                </DialogHeader>
                <form @submit.prevent="register">
                    <div class="flex flex-col gap-2">
                        <div class="w-full flex flex-col items-center gap-1.5">
                            <label class="font-bold">Background</label>
                            <img v-if="background" :src="background"
                                class="w-full h-fit max-h-80 rounded-md object-cover" />
                            <label for="image_input"
                                class="text-sm border-4 rounded p-2 cursor-pointer hover:text-primary hover:border-primary">Escolher
                                Imagem</label>
                            <input type="file" id="image_input" accept="image/jpeg, image/png, image/jpg"
                                multiple="false" class="hidden"
                                v-on:change="async (e: any) => setBackground(await decodeBase64Image(e.target.files[0]))" />
                        </div>
                        <label for="name" class="font-bold">Nome</label>
                        <Input id="name" name="name" type="text" placeholder="Nome" v-model="name" required />
                        <label for="description" class="font-bold">Descrição</label>
                        <Input id="description" name="description" type="text" placeholder="Descrição"
                            v-model="description" required />
                        <label for="price" class="font-bold">Preço</label>
                        <Input id="price" name="price" type="number" placeholder="Preço" v-model="price" required />

                        <Button type="submit" class="font-bold">
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-row gap-2 items-end">
                <div class="flex flex-col w-[55%] gap-1">
                    <label for="search" class="text-sm font-semibold">Nome do Curso</label>
                    <Input id="search" name="search" label="Nome"
                        class="border p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        placeholder="Busque pelo nome do curso" @change="(e: any) => setNameFilter(e.target.value)"
                        v-model:model-value="namefilter" />
                </div>

                <div class="flex flex-col w-[25%] gap-1">
                    <label for="filter" class="text-sm font-semibold">Filtros</label>
                    <Select class="h-fit rounded-md" name="filter" id="filter"
                        @update:model-value="(e: any) => setOrder(e)" v-model:model-value="order_by">
                        <SelectTrigger
                            class="w-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                            <SelectValue class="text-secondary placeholder:text-black"
                                placeholder="Selecione um Filtro" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="precoCrescente">
                                    Preço Crescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="precoDecrescente">
                                    Preço Decrescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="avaliacaoCrescente">
                                    Avaliação Crescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer"
                                    value="avaliacaoDecrescente">
                                    Avaliação Decrescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="reviewCrescente">
                                    Reviews Crescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="reviewDecrescente">
                                    Reviews Decrescente
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer" value="ordemAlfabetica">
                                    Ordem Alfabética
                                </SelectItem>
                                <SelectItem class="hover:bg-slate-200 hover:cursor-pointer"
                                    value="ordemAlfabeticaReversa">
                                    Ordem Alfabética Inversa
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button :variant="'secondary'" class="w-[10%] font-bold" :onclick="clearFilters">Limpar</Button>
                <Button :variant="'default'" class="w-[10%] font-bold" :onclick="search">Buscar</Button>
            </div>
            <div class="w-full h-fit flex flex-col gap-6">
                <div class="w-full h-fit flex flex-row flex-wrap gap-4 justify-evenly">
                    <template v-model="resData" v-for="(current) in coursesData" :key="current.id">
                        <CourseCard :id="current.id" width="w-[26rem] border border-secondary" :title="current.name"
                            :description="current.description" :price="current.price" :base64Image="current.background"
                            :score="current.score" :reviews="current.reviews"
                            :onClick="() => $router.push(`/${current.id}`)" :onDelete="() => handleDelete(current.id)"
                            @close="() => search()" />
                    </template>
                </div>
                <Pagination v-slot="{ page }" :total="total" :items-per-page="limit" :sibling-count="1" show-edges
                    :default-page="1">
                    <PaginationList v-slot="{ items }" class="flex items-center gap-1 w-full justify-center">
                        <PaginationFirst @click="setPage(0)" />
                        <PaginationPrev @click="setPage(page - 2)" />

                        <template v-for="(item, index) in items">
                            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'ghost'"
                                    @click="setPage(item.value - 1)">
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis v-else :key="item.type" :index="index" />
                        </template>

                        <PaginationNext @click="setPage(page)" />
                        <PaginationLast @click="setPage(Math.floor(total / limit) - 1)" />
                    </PaginationList>
                </Pagination>
            </div>
        </div>
    </PageContainer>
</template>