<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div
      v-if="user"
      class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
    >
      <!-- Header -->
      <div class="bg-blue-600 px-6 py-4 text-white">
        <h1 class="text-2xl font-bold">Selamat Datang</h1>
        <p class="opacity-90">Anda berhasil login</p>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6">
        <!-- Info User -->
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl"
          >
            {{ user.username.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-lg font-semibold">{{ user.username }}</h2>
            <p class="text-sm text-gray-500">
              Role: <span class="capitalize">{{ user.role }}</span>
            </p>
          </div>
        </div>

        <!-- Admin Button -->
        <div v-if="user.role === 'admin'" class="mt-4">
          <button
            @click="goToAdmin"
            class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Ke Halaman Admin
          </button>
        </div>

        <!-- Logout Button -->
        <button
          @click="logout"
          class="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "#app";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch("/api/check-session");
    user.value = data.user ?? null;

    if (!user.value) {
      router.push("/");
    }
  } catch (err) {
    console.error("Error saat cek session:", err);

    if (err?.response?._data?.data?.redirect) {
      const redirectPath = err.response._data.data.redirect;
      router.push(redirectPath);
    } else {
      router.push("/");
    }
  }
});

async function logout() {
  await $fetch("/api/logout", { method: "POST" });
  router.push("/");
}

function goToAdmin() {
  router.push("/admin");
}
</script>
