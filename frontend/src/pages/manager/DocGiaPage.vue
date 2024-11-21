<template>
  <div class="row">
    <div class="col-md-4">
      <DocGiaForm
        :docgia="currentDocGia"
        :editMode="isEditMode"
        @save-docgia="saveDocGia"
        @cancel-edit="resetForm"
      />
    </div>
    <div class="col-md-8">
      <DocGiaList
        :docgias="docgias"
        @edit-docgia="editDocGia"
        @delete-docgia="deleteDocGia"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DocGiaForm from "../../components/docgia/DocGiaForm.vue";
import DocGiaList from "../../components/docgia/DocGiaList.vue";
import docgiaService from "../../services/DocGiaService";

const docgias = ref([]);
const currentDocGia = ref({});
const isEditMode = ref(false);

async function fetchDocGias() {
  docgias.value = await docgiaService.getDocGia();
}

function resetForm() {
  currentDocGia.value = {};
  isEditMode.value = false;
}

async function saveDocGia(docgia) {
  if (isEditMode.value) {
    console.log("docgia", docgia);
    await docgiaService.updateDocGia(docgia._id,docgia);
  } else {
    const newDocGia = await docgiaService.createDocGia(docgia);
    docgias.value.push(newDocGia);
  }
  resetForm();
  fetchDocGias();
}

function editDocGia(docgia) {
  docgia.ngaysinh = new Date(docgia.ngaysinh).toISOString().split("T")[0];
  currentDocGia.value = docgia;
  console.log("currentDocGia", currentDocGia.value);
  isEditMode.value = true;
}

async function deleteDocGia(id) {
  await docgiaService.deleteDocGia(id);
  fetchDocGias();
}

onMounted(fetchDocGias);
</script>
