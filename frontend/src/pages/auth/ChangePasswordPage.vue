<template>
  <div class="fullscreen-center">
    <div class="form-card shadow rounded">
      <h2 class="text-center mb-4 text-primary">Đổi Mật Khẩu</h2>
      <form @submit.prevent="handleChangePassword">
        <label for="oldPassword">Mật khẩu cũ</label>
        <div class="mb-3">
          <input
            v-model="oldPassword"
            type="password"
            class="form-control"
            id="oldPassword"
            placeholder="Nhập mật khẩu cũ"
            required
          />
        </div>
        <div class="mb-3">
          <label for="newPassword">Mật khẩu mới</label>
          <input
            v-model="newPassword"
            type="password"
            class="form-control"
            id="newPassword"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>
        <div class=" mb-4">
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-100">
          Đổi Mật Khẩu
        </button>
        <div v-if="errorMessage" class="alert alert-danger mt-4 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AccountService from "@/services/AccountService";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

async function handleChangePassword() {
  try {
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = "Mật khẩu mới và xác nhận mật khẩu không khớp!";
      return;
    }

    console.log(route.params.userId);

    const response = await AccountService.changePassword(
      route.params.userId,
      newPassword.value
    );

    router.push({ name: "Login" });
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.response?.data?.message || "Đổi mật khẩu thất bại!";
  }
}
</script>

<style scoped>
body {
  background-color: #f0f2f5;
}

.fullscreen-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

/* Form card styling */
.form-card {
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
</style>
