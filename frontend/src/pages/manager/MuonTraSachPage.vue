<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <MuonTraSachForm
          :MuonTraSach="currentMuonTraSach"
          :editMode="isEditMode"
          @save-MuonTraSach="saveMuonTraSach"
          @cancel-edit="cancelEdit"
        />
      </div>
      <div class="col-md-8">
        <MuonTraSachList
          :muontrasachs="muontrasachs"
          @edit-muontrasach="editMuonTraSach"
          @delete-muontrasach="deleteMuonTraSach"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MuonTraSachForm from "../../components/muontrasach/MuonTraSachForm.vue";
import MuonTraSachList from "../../components/muontrasach/MuonTraSachList.vue";
import muontrasachService from "../../services/MuonTraSachService";
import docgiaService from "../../services/DocGiaService";
import sachService from "../../services/SachService";

const muontrasachs = ref([]);
const currentMuonTraSach = ref({
  msdg: "",
  masach: "",
  ngaymuon: new Date().toISOString().split("T")[0],
  ngaytra: new Date().toISOString().split("T")[0],
  trangthai: "damuon",
});
const isEditMode = ref(false);

async function fetchMuonTraSachs() {
  muontrasachs.value = await muontrasachService.get();
  for (let i = 0; i < muontrasachs.value.length; i++) {
    const docgia = await docgiaService.getDocGiaById(muontrasachs.value[i].msdg);
    const sach = await sachService.getById(muontrasachs.value[i].masach);
    muontrasachs.value[i].msdg = docgia;
    muontrasachs.value[i].masach = sach;
  }
}

async function saveMuonTraSach(muontrasach) {
  if (isEditMode.value) {
    await muontrasachService.updateMuonTraSach(muontrasach._id, muontrasach);
  } else {
    await muontrasachService.createMuonTraSach(muontrasach);
  }
  resetForm();
  await fetchMuonTraSachs();
}

function editMuonTraSach(muontrasach) {
  muontrasach.ngaymuon = new Date(muontrasach.ngaymuon).toISOString().split("T")[0];
  muontrasach.ngaytra = new Date(muontrasach.ngaytra).toISOString().split("T")[0];


  currentMuonTraSach.value = {
    ...muontrasach,
    msdg: typeof muontrasach.msdg === "object" ? muontrasach.msdg.msdg : muontrasach.msdg,
    masach: typeof muontrasach.masach === "object" ? muontrasach.masach.masach : muontrasach.masach,
  };
  
  isEditMode.value = true;
}


async function deleteMuonTraSach(id) {
  await muontrasachService.deleteMuonTraSach(id);
  await fetchMuonTraSachs();
}

function resetForm() {
  currentMuonTraSach.value = {
    msdg: "",
    masach: "",
    ngaymuon: new Date().toISOString().split("T")[0],
    ngaytra: new Date().toISOString().split("T")[0],
    trangthai: "damuon",
  };
  isEditMode.value = false;
}

function cancelEdit() {
  resetForm();
}

onMounted(fetchMuonTraSachs);
</script>
