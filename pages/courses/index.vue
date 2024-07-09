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
definePageMeta({ auth: false })


const arrayExample = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]);
const itemsPerPage = ref(12);
const blob = new Blob();

const page = ref(1);
const setPage = (value: number) => {
    page.value = value;
}

const computedArray = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return arrayExample.value.slice(start, end);
});

</script>

<template>
    <PageContainer>
        <div class="container flex flex-col gap-4">
            <div class="flex flex-row gap-2 items-end">
                <div class="flex flex-col w-[55%] gap-1">
                    <label for="search" class="text-sm font-semibold">Nome do Curso</label>
                    <Input id="search" name="search" label="Nome"
                        class="border p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        placeholder="Busque pelo nome do curso" />
                </div>

                <div class="flex flex-col w-[25%] gap-1">
                    <label for="filter" class="text-sm font-semibold">Filtros</label>
                    <Select class="h-fit rounded-md" name="filter" id="filter">
                        <SelectTrigger class=" w-full rounded-md">
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
                <Button :variant="'secondary'" class="w-[10%]">Limpar</Button>
                <Button :variant="'default'" class="w-[10%]">Buscar</Button>
            </div>
            <div class="w-full h-fit flex flex-col gap-6">
                <div class="w-full h-fit flex flex-row flex-wrap gap-4 justify-center">
                    <template v-for="(current) in computedArray">
                        <CourseCard :id="current" width="w-[32%] min-w-fit border border-secondary" :title="current"
                            :price="100" :base64Image="blob" :score="3.5" :reviews="200"
                            :onClick="() => console.log('Clicked')" />
                    </template>
                </div>
                <Pagination v-slot="{ page }" :total="arrayExample.length" :items-per-page="itemsPerPage"
                    :sibling-count="1" show-edges :default-page="1">
                    <PaginationList v-slot="{ items }" class="flex items-center gap-1 w-full justify-center">
                        <PaginationFirst @click="setPage(1)" />
                        <PaginationPrev @click="setPage(page - 1)" />

                        <template v-for="(item, index) in items">
                            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'ghost'"
                                    @click="setPage(item.value)">
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis v-else :key="item.type" :index="index" />
                        </template>

                        <PaginationNext @click="setPage(page + 1)" />
                        <PaginationLast @click="setPage(Math.floor(arrayExample.length / itemsPerPage) + 1)" />
                    </PaginationList>
                </Pagination>
            </div>
        </div>
    </PageContainer>
</template>