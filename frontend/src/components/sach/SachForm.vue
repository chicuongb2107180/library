<template>
  <div class="card form-card mx-auto">
    <div class="card-header">
      <h5 class="card-title">{{ isEditMode ? "Chỉnh sửa Sách" : "Thêm Sách Mới" }}</h5>
    </div>
    <div class="card-body">
      <div v-if="notification.show" :class="`alert alert-${notification.type}`">
        {{ notification.message }}
      </div>

      <form @submit.prevent="saveSach">
        
        <div class="mb-3">
          <label for="tensach" class="form-label">Tên Sách</label>
          <input
            v-model="currentSach.tensach"
            type="text"
            id="tensach"
            class="form-control"
            :class="{ 'is-invalid': errors.tensach }"
          />
          <div v-if="errors.tensach" class="text-danger">
            {{ errors.tensach }}
          </div>
        </div>
        <div class="mb-3">
          <label for="dongia" class="form-label">Đơn Giá</label>
          <input
            v-model="currentSach.dongia"
            type="number"
            id="dongia"
            class="form-control"
            :class="{ 'is-invalid': errors.dongia }"
          />
          <div v-if="errors.dongia" class="text-danger">
            {{ errors.dongia }}
          </div>
        </div>
        <div class="mb-3">
          <label for="soquyen" class="form-label">Số Quyển</label>
          <input
            v-model="currentSach.soquyen"
            type="number"
            id="soquyen"
            class="form-control"
            :class="{ 'is-invalid': errors.soquyen }"
          />
          <div v-if="errors.soquyen" class="text-danger">
            {{ errors.soquyen }}
          </div>
        </div>
        <div class="mb-3">
          <label for="namxuatban" class="form-label">Năm Xuất Bản</label>
          <input
            v-model="currentSach.namxuatban"
            type="number"
            id="namxuatban"
            class="form-control"
            :class="{ 'is-invalid': errors.namxuatban }"
          />
          <div v-if="errors.namxuatban" class="text-danger">
            {{ errors.namxuatban }}
          </div>
        </div>
        <div class="mb-3">
          <label for="manxb" class="form-label">Nhà Xuất Bản</label>
          <select
            v-model="currentSach.manxb"
            id="manxb"
            class="form-control"
            :class="{ 'is-invalid': errors.manxb }"
          >
            <option value="" disabled>Chọn Nhà Xuất Bản</option>
            <option v-for="nxb in publishers" :key="nxb._id" :value="nxb">
              {{ nxb.tennxb }}
            </option>
          </select>
          <div v-if="errors.manxb" class="text-danger">
            {{ errors.tennxb }}
          </div>
        </div>

        <button type="submit" class="btn btn-success custom-btn">
          {{ isEditMode ? "Cập Nhật" : "Thêm Mới" }}
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
import { ref, watch, onMounted } from "vue";
import { useNotificationStore } from "../../stores/notificationStore";
import NhaXuatBanService from "../../services/NhaXuatBanService";

const notification = useNotificationStore();
const currentSach = ref({
  tensach: "",
  dongia: null,
  soquyen: null,
  namxuatban: null,
  manxb: null,
});
const errors = ref({
  tensach: "",
  dongia: "",
  soquyen: "",
  namxuatban: "",
  manxb: "",
});
const publishers = ref([]);

const props = defineProps({
  sach: {
    type: Object,
    default: () => ({}),
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save-sach", "cancel-edit"]);
const isEditMode = ref(props.editMode);

onMounted(async () => {
  try {
    publishers.value = await NhaXuatBanService.getNhaXuatBan();
    console.log("Danh sách nhà xuất bản:", publishers.value);
  } catch (error) {
    console.error("Lỗi khi tải danh sách nhà xuất bản:", error);
  }
});

watch(
  () => props.sach,
  (newValue) => {
    currentSach.value = { ...newValue };
    isEditMode.value = props.editMode;
  },
  { immediate: true }
);

function validateForm() {
  let isValid = true;
  errors.value = {
    tensach: "",
    dongia: "",
    soquyen: "",
    namxuatban: "",
    manxb: "",
  };

  if (!currentSach.value.tensach.trim()) {
    errors.value.tensach = "Tên sách không được để trống.";
    isValid = false;
  }

  if (currentSach.value.dongia === null || currentSach.value.dongia <= 0) {
    errors.value.dongia = "Đơn giá phải lớn hơn 0.";
    isValid = false;
  }

  if (currentSach.value.soquyen === null || currentSach.value.soquyen <= 0) {
    errors.value.soquyen = "Số quyển phải lớn hơn 0.";
    isValid = false;
  }

  if (
    currentSach.value.namxuatban === null ||
    currentSach.value.namxuatban <= 0
  ) {
    errors.value.namxuatban = "Năm xuất bản phải hợp lệ.";
    isValid = false;
  }


  return isValid;
}

function saveSach() {
  if (validateForm()) {
    const sachToSave = {
      ...currentSach.value,
//       manxb: currentSach.value.manxb._id,
    };
    emit("save-sach", sachToSave);
    notification.showNotification(
      isEditMode.value ? "Cập nhật sách thành công!" : "Thêm sách mới thành công!",
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
