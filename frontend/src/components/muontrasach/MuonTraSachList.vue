<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-8">
        <input
          v-model="searchQuery"
          @keyup="searchSach"
          type="text"
          class="form-control"
          placeholder="Tìm kiếm theo tên đọc giả hoặc tên sách"
        />
      </div>
      <div class="col-md-4">
        <select
          id="statusFilter"
          class="form-select"
          v-model="statusFilter"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="datra">Đã trả</option>
          <option value="dadat">Đã đặt</option>
          <option value="damuon">Đã mượn</option>
        </select>
      </div>
    </div>

    <div style="overflow-x: auto; width: 100%">
      <table
        class="table table-striped"
        style="width: 110%; border-collapse: collapse"
      >
        <thead class="table-dark">
          <tr>
            <th>Mã đọc giả</th>
            <th>Tên đọc giả</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="muontrasach in filteredMuonTraSachs" :key="muontrasach._id">
            <td>{{ muontrasach.msdg.msdg }}</td>
            <td>{{ muontrasach.msdg.holot }} {{ muontrasach.msdg.ten }}</td>
            <td>{{ formatDate(muontrasach.ngaymuon) }}</td>
            <td>{{ formatDate(muontrasach.ngaytra) }}</td>
            <td>{{ muontrasach.masach.masach }}</td>
            <td>{{ muontrasach.masach.tensach }}</td>
            <td
              v-if="muontrasach.trangthai == 'datra'"
              style="color: green"
            >
              Đã trả
            </td>
            <td
              v-else-if="muontrasach.trangthai == 'dadat'"
              style="color: goldenrod"
            >
              Đã đặt
            </td>
            <td v-else style="color: red">Đã mượn</td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="$emit('edit-muontrasach', muontrasach)"
              >
                Sửa
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="confirmDelete(muontrasach._id)"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  muontrasachs: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["delete-muontrasach", "edit-muontrasach"]);

const searchQuery = ref("");
const statusFilter = ref(""); 


const filteredMuonTraSachs = computed(() => {
  return props.muontrasachs.filter((muontrasach) => {
    const readerName = `${muontrasach.msdg.holot} ${muontrasach.msdg.ten}`.toLowerCase();
    const bookTitle = muontrasach.masach.tensach.toLowerCase();
    const matchesSearchQuery =
      readerName.includes(searchQuery.value.toLowerCase()) ||
      bookTitle.includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "" || muontrasach.trangthai === statusFilter.value;

    return matchesSearchQuery && matchesStatus;
  });
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

function confirmDelete(id) {
  if (confirm("Bạn có chắc chắn muốn xóa mượn trả sách này?")) {
    emit("delete-muontrasach", id);
  }
}
</script>
