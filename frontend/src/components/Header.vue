<template>
  <header class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Thư viện Cộng đồng</span>
      <div class="d-flex">
        <span v-if="isAuthenticated" class="navbar-text me-3">
          Mã Đăng Nhập: {{ userLoginId }}
        </span>
        <button
          v-if="!isAuthenticated"
          class="btn btn-outline-light"
          @click="goToLogin"
        >
          Đăng Nhập
        </button>
        <button
          v-if="isAuthenticated"
          class="btn btn-outline-light no-border-btn"
          @click="logout"
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.token);

const userLoginId = ref(authStore.username || "Chưa đăng nhập");

watch(
  () => authStore.username,
  (newUsername) => {
    userLoginId.value = newUsername || "Chưa đăng nhập";
  }
);

function logout() {
  Swal.fire({
    title: "Thông Báo",
    text: "Bạn đã đăng xuất!",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
  }).then(() => {
    authStore.clearAuthData();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    router.push("/");
  });
}

function goToLogin() {
  router.push("/login");
}
</script>

<style scoped>
.no-border-btn {
  border: none;
  background-color: transparent;
  color: white;
}

.no-border-btn:hover {
  background-color: transparent;
  color: #ddd;
}
</style>
