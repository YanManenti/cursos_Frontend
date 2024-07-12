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
import { ToastAction } from '@/components/ui/toast'


definePageMeta({ auth: false })

const { toast } = useToast()

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

const fetcher = async (order_by: string, namefilter: string, page: number, limit: number, errorTitle: string, altText: string, errorAction: () => any, errorReturn?: object) => {
    return await $fetch(`http://127.0.0.1:8000/api/courses/search/?order_by=${order_by}&namefilter=${namefilter}&page=${page}&limit=${limit}`)
        .then((res: any) => res)
        .catch((err: any) => {
            toast({
                title: errorTitle,
                description: err.message,
                variant: 'destructive',
                action: h(ToastAction, {
                    altText: altText,
                }, {
                    default: errorAction,
                }),
            });
            return errorReturn ? errorReturn : null;
        });
}

const clearFilters = async () => {
    setNameFilter('');
    setOrder('');
    setPage(0);
    setLimit(15);
    setData(await fetcher(order_by.value, namefilter.value, page.value, limit.value, 'Erro ao buscar cursos', 'Tentar novamente', search));
}

const search = async () => {
    setData(await fetcher(order_by.value, namefilter.value, page.value, limit.value, 'Erro ao buscar cursos', 'Tentar novamente', search))
}

const resData = ref(await fetcher('ordemAlfabetica', '', page.value, limit.value, 'Erro ao buscar cursos', 'Tentar novamente', search));
const setData = (value: any) => {
    resData.value = value;
}

const data = computed(() => resData.value.courses);
const total = computed(() => resData.value.total);

</script>

<template>
    <PageContainer class="container">
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-row gap-2 items-end">
                <div class="flex flex-col w-[55%] gap-1">
                    <label for="search" class="text-sm font-semibold">Nome do Curso</label>
                    <Input id="search" name="search" label="Nome"
                        class="border p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        placeholder="Busque pelo nome do curso" @change="(e: any) => setNameFilter(e.target.value)"
                        :value="namefilter" />
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
                    <template v-for="(current) in data" :key="current.id">
                        <CourseCard :id="current.id" width="w-[26rem] border border-secondary" :title="current.name"
                            :price="current.price" :base64Image="current.background" :score="current.score"
                            :reviews="current.reviews" :onClick="() => $router.push(`/${current.id}`)" />
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