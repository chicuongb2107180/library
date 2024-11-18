<template>
  <div class="row">
    <div class="col-md-4">
      <NhaXuatBanForm
        :nhaxuatban="currentNhaXuatBan"
        :editMode="isEditMode"
        @save-nhaxuatban="saveNhaXuatBan"
        @cancel-edit="cancelEdit"
      />
    </div>
    <div class="col-md-8">
      <NhaXuatBanList
        :nhaxuatbans="nhaxuatbans"
        @edit-nhaxuatban="editNhaXuatBan"
        @delete-nhaxuatban="deleteNhaXuatBan"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NhaXuatBanForm from "../../components/nhaxuatban/NhaXuatBanForm.vue";
import NhaXuatBanList from "../../components/nhaxuatban/NhaXuatBanList.vue";
import nhaxuatbanService from "../../services/NhaXuatBanService";

const nhaxuatbans = ref([]);
const currentNhaXuatBan = ref({ tennxb: "", diachi: "" });
const isEditMode = ref(false);

async function fetchNhaXuatBans() {
  nhaxuatbans.value = await nhaxuatbanService.getNhaXuatBan();
}

function editNhaXuatBan(nxb) {
  currentNhaXuatBan.value = { ...nxb };
  isEditMode.value = true;
}

async function saveNhaXuatBan(nxb) {
  if (isEditMode.value) {
    await nhaxuatbanService.updateNhaXuatBan(nxb._id, nxb);
  } else {
    await nhaxuatbanService.createNhaXuatBan(nxb);
  }
  resetForm();
  await fetchNhaXuatBans();
}

async function deleteNhaXuatBan(id) {
  await nhaxuatbanService.deleteNhaXuatBan(id);
  await fetchNhaXuatBans();
}

function resetForm() {
  currentNhaXuatBan.value = { tennxb: "", diachi: "" };
  isEditMode.value = false;
}

function cancelEdit() {
  resetForm();
}

onMounted(fetchNhaXuatBans);
</script>
