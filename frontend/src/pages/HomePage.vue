<template>
  <div class="home-container">
    <!-- Tiêu đề chào mừng -->
    <header class="welcome-section text-center py-5">
      <h1>Chào Mừng Đến Với Thư Viện Cộng Đồng</h1>
      <p class="lead">Khám Phá Kho Tàng Sách Phong Phú Cùng Nhiều Chức Năng Hữu Ích!</p>
    </header>

    <!-- Nút Khám Phá Sách -->
    <section class="explore-section text-center py-5">
      <h2>Khám Phá Sách</h2>
      <button class="btn btn-primary btn-lg">
        Khám Phá
      </button>
    </section>

    <!-- Thông tin thư viện -->
    <section class="info-section py-5">
      <div class="container">
        <h2 class="text-center mb-4">Về Thư Viện</h2>
        <p class="text-center">
          Thư Viện Cộng Đồng là nơi bạn có thể tìm kiếm và đọc các cuốn sách yêu thích, tham gia các hoạt động
          văn hóa, giáo dục, và cùng nhau phát triển trí thức. Thư viện mở cửa cho mọi đối tượng độc giả.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<style scoped>
.home-container {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.welcome-section {
  background-color: #f1f1f1; /* Nền sáng, dễ chịu */
  color: #333; /* Màu chữ tối nhẹ */
  padding: 60px 15px;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #00796b; /* Xanh đậm nhẹ */
}

.welcome-section p {
  font-size: 1.2rem;
  color: #555; /* Màu xám đậm, dễ đọc */
}

.explore-section {
  background-color: #b0bec5; /* Xanh xám nhẹ, không quá chói */
  color: white;
  padding: 60px 15px;
}

.explore-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.explore-section button {
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #607d8b; 
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.explore-section button:hover {
  background-color: #455a64; 
}

.info-section {
  background-color: #ffffff; 
  color: #555;
  padding: 60px 15px;
}

.info-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.info-section p {
  font-size: 1.1rem;
  color: #666;
}
</style>
