<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div class="space-y-1">
          <label for="username" class="block text-sm font-medium"
            >Username</label
          >
          <input
            v-model="form.username"
            id="username"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p v-if="errors.username" class="text-red-500 text-sm">
            {{ errors.username }}
          </p>
        </div>

        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { ref } from "vue";
import { useRouter } from "#app";

const router = useRouter();

interface Form {
  username: string;
  password: string;
}

const form = ref<Form>({
  username: "",
  password: "",
});

const errors = ref<Record<string, string>>({});

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(4, "Password must be at least 4 characters"),
});

async function login() {
  try {
    await schema.validate(form.value, { abortEarly: false });

    const res = await $fetch("/api/login", {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      router.push("/home");
    }
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        validationErrors[e.path] = e.message;
      });
      errors.value = validationErrors;
    } else {
      alert(err.statusMessage || "Login failed");
    }
  }
}
</script>
