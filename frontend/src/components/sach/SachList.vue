<template>
  <div>
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Tìm kiếm Sách..."
      />
      <button class="btn btn-primary">Tìm kiếm</button>
    </div>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Đơn Giá</th>
          <th>Số Quyển</th>
          <th>Năm XB</th>
          <th>Nhà Xuất Bản</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sach in filteredSachs" :key="sach._id">
          <td>{{ sach.masach }}</td>
          <td>{{ sach.tensach }}</td>
          <td>{{ sach.dongia }}</td>
          <td>{{ sach.soquyen }}</td>
          <td>{{ sach.namxuatban }}</td>
          <td>{{ sach.manxb.tennxb }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="$emit('edit-sach', sach)"
            >
              Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDelete(sach._id)"
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
  sachs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit-sach", "delete-sach"]);

const searchQuery = ref("");


const filteredSachs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  

  if (!query) return props.sachs;


  return props.sachs.filter((sach) => {
    const bookTitle = sach.tensach?.toLowerCase() || "";
    const publisherName = sach.manxb?.name?.toLowerCase() || "";
    return bookTitle.includes(query) || publisherName.includes(query);
  });
});

function confirmDelete(id) {
  if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
    emit("delete-sach", id);
  }
}
</script>
