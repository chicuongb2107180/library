<template>
  <div>
    <!-- Tìm kiếm và Lọc Độc Giả -->
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Tìm kiếm độc giả..."
      />
      <button class="btn btn-primary" @click="filterDocGias">Lọc</button>
    </div>

    <!-- Bảng Thông Tin Độc Giả -->
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Mã số</th>
          <th>Họ lót</th>
          <th>Tên</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docgia in filteredDocGias" :key="docgia._id">
          <td>{{ docgia.msdg }}</td>
          <td>{{ docgia.holot }}</td>
          <td>{{ docgia.ten }}</td>
          <td>{{ formatDate(docgia.ngaysinh) }}</td>
          <td>{{ docgia.diachi }}</td>
          <td>{{ docgia.sodienthoai }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2 action-btn"
              @click="$emit('edit-docgia', docgia)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm action-btn"
              @click="confirmDelete(docgia._id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNotificationStore } from "../../stores/notificationStore";

const emit = defineEmits(["delete-docgia", "edit-docgia"]);
const notification = useNotificationStore();

const props = defineProps({
  docgias: {
    type: Array,
    default: () => [],
  },
});

const searchQuery = ref("");

const filteredDocGias = computed(() => {
  if (!searchQuery.value) return props.docgias;
  return props.docgias.filter((docgia) =>
    `${docgia.holot} ${docgia.ten}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

function formatDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function confirmDelete(id) {
  if (window.confirm("Bạn có chắc chắn muốn xóa độc giả này?")) {
    emit("delete-docgia", id);
    notification.showNotification("Xóa độc giả thành công!", "success");
  } else {
    notification.showNotification("Hủy bỏ xóa độc giả!", "info");
  }
}
</script>
