<template>
  <NuxtPage />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "#app";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(route.path);
});
</script>
