<template>
  <div class="card form-card mx-auto">
    <div class="card-header">
      <h5 class="card-title">
        {{ isEditMode ? "Chỉnh sửa Nhà Xuất Bản" : "Thêm Nhà Xuất Bản Mới" }}
      </h5>
    </div>
    <div class="card-body">
      <div v-if="notification.show" :class="`alert alert-${notification.type}`">
        {{ notification.message }}
      </div>

      <form @submit.prevent="saveNhaXuatBan">
        <div class="mb-3">
          <label for="tennxb" class="form-label">Tên Nhà Xuất Bản:</label>
          <input
            v-model="currentNhaXuatBan.tennxb"
            type="text"
            id="tennxb"
            class="form-control"
            :class="{ 'is-invalid': errors.tennxb }"
          />
          <div v-if="errors.tennxb" class="text-danger">
            {{ errors.tennxb }}
          </div>
        </div>
        <div class="mb-3">
          <label for="diachi" class="form-label">Địa chỉ:</label>
          <input
            v-model="currentNhaXuatBan.diachi"
            type="text"
            id="diachi"
            class="form-control"
            :class="{ 'is-invalid': errors.diachi }"
          />
          <div v-if="errors.diachi" class="text-danger">
            {{ errors.diachi }}
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

const notification = useNotificationStore();
const isEditMode = ref(false);
const currentNhaXuatBan = ref({
  tennxb: "",
  diachi: "",
});
const errors = ref({
  tennxb: "",
  diachi: "",
});

const props = defineProps({
  nhaxuatban: {
    type: Object,
    default: () => ({}),
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save-nhaxuatban", "cancel-edit"]);

watch(
  () => props.nhaxuatban,
  (newValue) => {
    currentNhaXuatBan.value = { ...newValue };
    isEditMode.value = props.editMode;
  },
  { immediate: true }
);

// Hàm kiểm tra thông tin nhập
function validateForm() {
  let isValid = true;
  errors.value = {
    tennxb: "",
    diachi: "",
  };

  if (!currentNhaXuatBan.value.tennxb.trim()) {
    errors.value.tennxb = "Tên Nhà Xuất Bản không được để trống.";
    isValid = false;
  }

  if (!currentNhaXuatBan.value.diachi.trim()) {
    errors.value.diachi = "Địa chỉ không được để trống.";
    isValid = false;
  }

  return isValid;
}

// Hàm lưu thông tin
function saveNhaXuatBan() {
  if (validateForm()) {
    emit("save-nhaxuatban", { ...currentNhaXuatBan.value });
    notification.showNotification(
      isEditMode.value
        ? "Cập nhật Nhà Xuất Bản thành công!"
        : "Thêm Nhà Xuất Bản thành công!",
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
