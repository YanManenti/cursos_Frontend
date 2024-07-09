<script setup lang="ts">
definePageMeta({ auth: false })

const route = useRoute();

</script>

<template>
    <PageContainer>
        {{ route.params }}
    </PageContainer>
</template>