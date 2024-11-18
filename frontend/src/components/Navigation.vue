<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in links" :key="link.text">
            <a class="nav-link" :href="link.href">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const links = [
  { text: 'Sách', href: '#' },
  { text: 'Độc Giả', href: '#' },
  { text: 'Mượn Trả Sách', href: '#' },
  { text: 'Nhà Xuất Bản', href: '#' },
  { text: 'Tài Khoản', href: '#' },
  { text: 'Nhân Viên', href: '#' }
];
</script>
