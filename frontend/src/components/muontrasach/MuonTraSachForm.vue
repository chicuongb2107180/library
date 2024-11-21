<template>
  <div class="card form-card mx-auto">
    <div class="card-header">
      <h5 class="card-title">
        {{ isEditMode ? "Chỉnh sửa mượn trả sách" : "Thêm mượn trả sách" }}
      </h5>
    </div>
    <div class="card-body">
      <div v-if="notification.show" :class="`alert alert-${notification.type}`">
        {{ notification.message }}
      </div>

      <form @submit.prevent="saveMuonTraSach">
        <div class="mb-3">
          <label for="msdg" class="form-label fs-6">Mã số đọc giả:</label>
          <input
            v-model="currentMuonTraSach.msdg"
            type="text"
            id="msdg"
            class="form-control form-control-sm"
            required
          />
          <div v-if="errors.msdg" class="text-danger">{{ errors.msdg }}</div>
        </div>
        <div class="mb-3">
          <label for="ngaymuon" class="form-label fs-6">Ngày mượn:</label>
          <input
            v-model="currentMuonTraSach.ngaymuon"
            type="date"
            id="ngaymuon"
            class="form-control form-control-sm"
          />
          <div v-if="errors.ngaymuon" class="text-danger">
            {{ errors.ngaymuon }}
          </div>
        </div>
        <div class="mb-3">
          <label for="ngaytra" class="form-label fs-6">Ngày trả:</label>
          <input
            v-model="currentMuonTraSach.ngaytra"
            type="date"
            id="ngaytra"
            class="form-control form-control-sm"
          />
          <div v-if="errors.ngaytra" class="text-danger">
            {{ errors.ngaytra }}
          </div>
        </div>
        <div class="mb-3">
          <label for="masach" class="form-label fs-6">Mã sách:</label>
          <input
            v-model="currentMuonTraSach.masach"
            type="text"
            id="masach"
            class="form-control form-control-sm"
          />
          <div v-if="errors.masach" class="text-danger">
            {{ errors.masach }}
          </div>
        </div>
        <div class="mb-3">
          <label for="trangthai" class="form-label">Trạng thái:</label>
          <select
            v-model="currentMuonTraSach.trangthai"
            id="trangthai"
            class="form-select form-select-sm"
          >
            <option value="damuon">Đã mượn</option>
            <option value="dadat">Đã đặt</option>
            <option value="datra">Đã trả</option>
          </select>
          <div v-if="errors.trangthai" class="text-danger">
            {{ errors.trangthai }}
          </div>
        </div>

        <button type="submit" class="btn btn-success custom-btn">
          {{ isEditMode ? "Cập nhật" : "Thêm Mới" }}
        </button>

        <button
          type="button"
          class="btn btn-secondary ms-2 custom-btn"
          @click="$emit('cancel-edit')"
          v-if="isEditMode"
        >
          Hủy
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useNotificationStore } from "../../stores/notificationStore";
import docgiaService from "../../services/DocGiaService";
import sachService from "../../services/SachService";

const notification = useNotificationStore();
const isEditMode = ref(false);
const currentMuonTraSach = ref({
  msdg: "",
  ngaymuon: "",
  ngaytra: "",
  masach: "",
  trangthai: "damuon",
});
const errors = ref({
  msdg: "",
  ngaymuon: "",
  ngaytra: "",
  masach: "",
  trangthai: "",
});

const props = defineProps({
  MuonTraSach: {
    type: Object,
    default: () => ({}),
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save-MuonTraSach", "cancel-edit"]);

watch(
  () => props.MuonTraSach,
  (newValue) => {
    currentMuonTraSach.value = { ...newValue };
    isEditMode.value = props.editMode;
  },
  { immediate: true }
);

async function validateForm() {
  let isValid = true;
  errors.value = {
    msdg: "",
    ngaymuon: "",
    ngaytra: "",
    trangthai: "",
    masach: "",
  };

  
  if (!currentMuonTraSach.value.msdg || typeof currentMuonTraSach.value.msdg !== "string") {
    errors.value.msdg = "Mã số đọc giả không được để trống!";
    isValid = false;
  } else if (currentMuonTraSach.value.msdg.length !== 8) {
    errors.value.msdg = "Mã số đọc giả phải có 8 ký tự!";
    isValid = false;
  } else {
    
    const docgia = await docgiaService.getDocGiaByMaDocGia(currentMuonTraSach.value.msdg);
    if (!docgia) {
      errors.value.msdg = "Mã số đọc giả không tồn tại!";
      isValid = false;
    } else {
      currentMuonTraSach.value.msdg = docgia._id; 
    }
  }

  
  if (!currentMuonTraSach.value.masach || typeof currentMuonTraSach.value.masach !== "string") {
    errors.value.masach = "Mã sách không được để trống!";
    isValid = false;
  } else if (currentMuonTraSach.value.masach.length !== 9) {
    errors.value.masach = "Mã sách phải có 9 ký tự!";
    isValid = false;
  } else {
    const sach = await sachService.getMasach(currentMuonTraSach.value.masach);
    if (!sach) {
      errors.value.masach = "Mã sách không tồn tại!";
      isValid = false;
    } else {
      currentMuonTraSach.value.masach = sach._id; 
    }
  }

  if (!currentMuonTraSach.value.ngaymuon) {
    errors.value.ngaymuon = "Ngày mượn không được để trống!";
    isValid = false;
  }

  if (!currentMuonTraSach.value.ngaytra) {
    errors.value.ngaytra = "Ngày trả không được để trống!";
    isValid = false;
  }

  return isValid;
}


async function saveMuonTraSach() {
  if (await validateForm()) {
    emit("save-MuonTraSach", { ...currentMuonTraSach.value });
    notification.showNotification(
      isEditMode.value ? "Cập nhật thành công!" : "Thêm mới thành công!",
      "success"
    );
  } else {
    notification.showNotification(
      "Vui lòng kiểm tra lại các trường thông tin!",
      "danger"
    );
  }
}
</script>
