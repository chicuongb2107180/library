<template>
  <div>
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Tìm kiếm nhân viên..."
      />
      <button class="btn btn-primary" @click="filterNhanviens">Lọc</button>
    </div>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Mã NV</th>
          <th>Họ tên</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Chức vụ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanvien in filteredNhanviens" :key="nhanvien._id">
          <td>{{ nhanvien.msnv }}</td>
          <td>{{ nhanvien.hoten }}</td>
          <td>{{ nhanvien.diachi }}</td>
          <td>{{ nhanvien.sodienthoai }}</td>
          <td>{{ nhanvien.chucvu }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="editNhanVien(nhanvien)"
            >
              Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDelete(nhanvien._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  nhanviens: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit-nhanvien", "delete-nhanvien"]);

const searchQuery = ref("");

const filteredNhanviens = computed(() => {
  return props.nhanviens.filter((nhanvien) => {
    return (
      nhanvien.hoten.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      nhanvien.sodienthoai.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      nhanvien.chucvu.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

function confirmDelete(id) {
  if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
    emit("delete-nhanvien", id);
  }
}

function filterNhanviens() {
  filteredNhanviens.value = props.nhanviens.filter((nhanvien) => {
    return (
      nhanvien.hoten.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      nhanvien.sodienthoai.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      nhanvien.chucvu.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
}

function editNhanVien(nhanvien) {
  emit("edit-nhanvien", nhanvien);
}

</script>
