<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <UFormGroup label="Username" :error="errors.username">
          <UInput v-model="form.username" />
        </UFormGroup>

        <UFormGroup label="Password" :error="errors.password">
          <UInput v-model="form.password" type="password" />
        </UFormGroup>

        <UButton type="submit" block>Login</UButton>
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
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

async function login() {
  try {
    await schema.validate(form.value, { abortEarly: false });

    const res = await $fetch("/api/login", {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      router.push("/");
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
