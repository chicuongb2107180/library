<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="login-card p-5 shadow rounded">
      <h2 class="text-center mb-4 text-primary">Đăng Nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Tên đăng nhập</label>
          <input
            v-model="username"
            type="text"
            class="form-control form-control-lg"
            id="username"
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg"
            id="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100">
          Đăng Nhập
        </button>

        <div v-if="errorMessage" class="alert alert-danger mt-4 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AccountService from "@/services/AccountService";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2"; // Import SweetAlert2

const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  try {
    const response = await AccountService.login({
      username: username.value,
      password: password.value,
    });

    if (response.message === "Password change required") {
      router.push({
        name: "ChangePassword",
        params: { userId: response.id },
      });
    } else {
      authStore.setAuthData({
        token: response.token,
        username: response.username,
        role: response.role,
        userId: response.id,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.id);

      // Show success message with SweetAlert2
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn đã trở lại!",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("docgia");
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    errorMessage.value = error.response?.data?.message || "Đăng nhập thất bại!";
  }
}

onMounted(() => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  if (token && username && role && userId) {
    authStore.setAuthData({
      token,
      username,
      role,
      userId,
    });
  }
});
</script>

<style scoped>
body {
  background-color: #f0f2f5;
}

.login-card {
  max-width: 420px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 30px;
}

h2 {
  font-weight: 600;
  color: #007bff;
}

.form-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.shadow {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.form-control-lg {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 5px;
}
</style>
