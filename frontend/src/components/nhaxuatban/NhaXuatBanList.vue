<template>
  <div>
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Tìm kiếm Nhà Xuất Bản..."
      />
      <button class="btn btn-primary" @click="filterNhaXuatBans">Lọc</button>
    </div>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Mã NXB</th>
          <th>Tên Nhà Xuất Bản</th>
          <th>Địa chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhaxuatban in filteredNhaXuatBans" :key="nhaxuatban._id">
          <td>{{ nhaxuatban.manxb }}</td>
          <td>{{ nhaxuatban.tennxb }}</td>
          <td>{{ nhaxuatban.diachi }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="$emit('edit-nhaxuatban', nhaxuatban)"
            >
              Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDelete(nhaxuatban._id)"
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
  nhaxuatbans: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit-nhaxuatban", "delete-nhaxuatban"]);

const searchQuery = ref("");

const filteredNhaXuatBans = computed(() => {
  if (!searchQuery.value) return props.nhaxuatbans;
  return props.nhaxuatbans.filter((nxb) =>
    nxb.tennxb.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function confirmDelete(id) {
  if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
    emit("delete-nhaxuatban", id);
  }
}
</script>
