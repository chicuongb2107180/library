<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/">Trang Chủ</router-link>
          </li> -->
          <!-- <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/sach">Sách</router-link>
          </li> -->

          <li class="nav-item" v-if="isDocGia">
            <router-link class="nav-link" to="/">Trang Chủ</router-link>
          </li>
          <li class="nav-item" v-if="isNhanVienOrAdmin">
            <router-link class="nav-link" to="/sach">Sách</router-link>
          </li>
          <li class="nav-item" v-if="isNhanVienOrAdmin">
            <router-link class="nav-link" to="/docgia">Độc Giả</router-link>
          </li>
          <li class="nav-item" v-if="isNhanVienOrAdmin">
            <router-link class="nav-link" to="/muontra">Mượn Trả Sách</router-link>
          </li>
          <li class="nav-item" v-if="isNhanVienOrAdmin">
            <router-link class="nav-link" to="/nxbs">Nhà Xuất Bản</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/nhanvien">Nhân Viên</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();


const isAuthenticated = computed(() => !!authStore.token);


const isDocGia = computed(() => authStore.role === 'docgia'); 
const isNhanVienOrAdmin = computed(() => ['nhanvien', 'admin'].includes(authStore.role)); 
const isAdmin = computed(() => authStore.role === 'admin'); 


function logout() {
  authStore.clearAuthData();
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  router.push('/');
}
</script>

<style scoped>

</style>
