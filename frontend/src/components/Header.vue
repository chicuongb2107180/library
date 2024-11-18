<template>
  <header class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Thư viện Cộng đồng</span>
      <div class="d-flex">
        <span class="navbar-text me-3">Mã Đăng Nhập: {{ userLoginId }}</span>
        <button class="btn btn-outline-light" @click="logout">Đăng Xuất</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

// Giả định mã đăng nhập của người dùng
const userLoginId = ref('12345678');

function logout() {
  alert('Bạn đã đăng xuất!');
  // Thực hiện logic đăng xuất nếu cần
}
</script>
