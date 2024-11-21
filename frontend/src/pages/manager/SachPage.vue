<template>
  <div class="row">
    <!-- Form quản lý Sách -->
    <div class="col-md-4">
      <SachForm
        :sach="currentSach"
        :editMode="isEditMode"
        @save-sach="saveSach"
        @cancel-edit="cancelEdit"
      />
    </div>

    <!-- Danh sách Sách -->
    <div class="col-md-8">
      <SachList
        :sachs="sachs"
        @edit-sach="editSach"
        @delete-sach="deleteSach"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SachForm from "../../components/sach/SachForm.vue";
import SachList from "../../components/sach/SachList.vue";
import SachService from "../../services/SachService";
import nhaxuatbanService from "../../services/NhaXuatBanService";
;


const sachs = ref([]);
const currentSach = ref({
  masach: "",
  tensach: "",
  dongia: 0,
  soquyen: 0,
  namxuatban: new Date().getFullYear(),
  manxb: {},
});
const isEditMode = ref(false);

async function fetchSachs() {
  try {
    sachs.value = await SachService.getAll();
    sachs.value.forEach(async (sach) => {
      const nxb = await nhaxuatbanService.getNhaXuatBanById(sach.manxb);
      sach.manxb = nxb;
    });
  } catch (error) {
    console.error("Lỗi khi tải danh sách sách:", error);
  }
}

async function saveSach(sach) {
  try {
    const sachToSave = {
      ...sach,
      manxb: sach.manxb._id,
    };
    console.log("Sách cần lưu:", sachToSave);
    console.log(sachToSave);
    if (isEditMode.value) {
      await SachService.update(sach._id, sachToSave);
    } else {
      await SachService.create(sachToSave);
    }
    resetForm();
    fetchSachs();
  } catch (error) {
    console.error("Lỗi khi lưu sách:", error);
  }
}


function editSach(sach) {
  currentSach.value = { ...sach };
  isEditMode.value = true;
}

async function deleteSach(id) {
  if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
    try {
      await SachService.delete(id);
      fetchSachs();
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
    }
  }
}

function resetForm() {
  currentSach.value = {
    masach: "",
    tensach: "",
    dongia: 0,
    soquyen: 0,
    namxuatban: new Date().getFullYear(),
    manxb: {},
  };
  isEditMode.value = false;
}

function cancelEdit() {
  resetForm();
}

onMounted(fetchSachs);
</script>
