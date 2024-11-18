<template>
  <div class="row">
    <div class="col-md-4">
      <NhanVienForm
        :nhanvien="currentNhanVien"
        :editMode="isEditMode"
        @save-nhanvien="saveNhanVien"
        @cancel-edit="cancelEdit"
      />
    </div>
    <div class="col-md-8">
      <NhanVienList
        :nhanviens="nhanviens"
        @edit-nhanvien="editNhanVien"
        @delete-nhanvien="deleteNhanVien"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NhanVienForm from "../../components/nhanvien/NhanVienForm.vue";
import NhanVienList from "../../components/nhanvien/NhanVienList.vue";
import nhanvienService from "../../services/NhanVienService";

// Dữ liệu danh sách nhân viên
const nhanviens = ref([]);

// Dữ liệu nhân viên đang chỉnh sửa hoặc thêm mới
const currentNhanVien = ref({
  msnv: "",
  hoten: "",
  diachi: "",
  sodienthoai: "",
  chucvu: "",
});

const isEditMode = ref(false);

async function fetchNhanViens() {
  nhanviens.value = await nhanvienService.getNhanVien();
}

async function saveNhanVien(nhanvien) {
  if (isEditMode.value) {
    // Cập nhật nhân viên
    await nhanvienService.updateNhanVien(nhanvien._id, nhanvien);
  } else {
    const newNhanVien = await nhanvienService.createNhanVien(nhanvien);
    nhanviens.value.push(newNhanVien);
  }
  resetForm();
  await fetchNhanViens();
}

function editNhanVien(nhanvien) {
  currentNhanVien.value = { ...nhanvien };
  isEditMode.value = true;
}

async function deleteNhanVien(id) {
  await nhanvienService.deleteNhanVien(id);
  await fetchNhanViens();
}

function resetForm() {
  currentNhanVien.value = {
    msnv: "",
    hoten: "",
    diachi: "",
    sodienthoai: "",
    chucvu: "",
  };
  isEditMode.value = false;
}

function cancelEdit() {
  resetForm();
}

onMounted(fetchNhanViens);
</script>
