<script setup lang="ts">

const { status, data, lastRefreshedAt, token } = useAuth()

if (status && status.value === 'unauthenticated') {
    navigateTo('/login')
}

// Eu tive que usar o método acima pq o definePageMeta não está funcionando?
//
// definePageMeta({
//      auth: { authenticatedOnly: true, navigateUnauthenticatedTo: '/login'}
// })

useHead({
    title: 'Profile - IMTESTE',
})


</script>

<template>
    <PageContainer class=" gap-1">
        <h1 class="font-bold text-2xl text-black">APENAS USUÁRIOS LOGADOS PODEM VER ESTA PÁGINA</h1>
        <h3 class="font-semibold text-lg text-secondary">STATUS</h3>
        <p>{{ status }}</p>
        <h3 class="font-semibold text-lg text-secondary">DATA</h3>
        <p>{{ data || 'no session data present, are you logged in?' }}</p>
        <h3 class="font-semibold text-lg text-secondary">LAST REFRESHED AT</h3>
        <p>{{ lastRefreshedAt || 'no refresh happened' }}</p>
        <h3 class="font-semibold text-lg text-secondary">JWT TOKEN</h3>
        <p class="break-all">{{ token || 'no token present, are you logged in?' }}</p>
    </PageContainer>
</template>