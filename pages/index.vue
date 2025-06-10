<template>
  <div v-if="!checkingSession">
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "~/components/LoginForm.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "#app";

const router = useRouter();
const route = useRoute();
const checkingSession = ref(true);

onMounted(async () => {
  try {
    const data = await $fetch("/api/check-session");
    if (data.user) {
      router.push("/home");
      return;
    }
  } catch (err) {
  } finally {
    checkingSession.value = false;
  }
});
</script>
