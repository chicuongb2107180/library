<template>
  <div class="card form-card mx-auto">
    <div class="card-header">
      <h5 class="card-title">
        {{ isEditMode ? "Chỉnh sửa Nhân Viên" : "Thêm Nhân Viên Mới" }}
      </h5>
    </div>
    <div class="card-body">
      <div v-if="notification.show" :class="`alert alert-${notification.type}`">
        {{ notification.message }}
      </div>

      <form @submit.prevent="saveNhanVien">
        <div class="mb-3">
          <label for="hoten" class="form-label">Họ tên</label>
          <input
            type="text"
            class="form-control"
            id="hoten"
            v-model="currentNhanVien.hoten"
            :class="{ 'is-invalid': errors.hoten }"
          />
          <div v-if="errors.hoten" class="text-danger">{{ errors.hoten }}</div>
        </div>
        <div class="mb-3">
          <label for="diachi" class="form-label">Địa chỉ</label>
          <input
            type="text"
            class="form-control"
            id="diachi"
            v-model="currentNhanVien.diachi"
            :class="{ 'is-invalid': errors.diachi }"
          />
          <div v-if="errors.diachi" class="text-danger">
            {{ errors.diachi }}
          </div>
        </div>
        <div class="mb-3">
          <label for="sodienthoai" class="form-label">Số điện thoại</label>
          <input
            type="text"
            class="form-control"
            id="sodienthoai"
            v-model="currentNhanVien.sodienthoai"
            :class="{ 'is-invalid': errors.sodienthoai }"
          />
          <div v-if="errors.sodienthoai" class="text-danger">
            {{ errors.sodienthoai }}
          </div>
        </div>
        <div class="mb-3">
          <label for="chucvu" class="form-label">Chức vụ</label>
          <input
            type="text"
            class="form-control"
            id="chucvu"
            v-model="currentNhanVien.chucvu"
            :class="{ 'is-invalid': errors.chucvu }"
          />
          <div v-if="errors.chucvu" class="text-danger">
            {{ errors.chucvu }}
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
const currentNhanVien = ref({
  hoten: "",
  diachi: "",
  sodienthoai: "",
  chucvu: "",
});
const errors = ref({
  hoten: "",
  diachi: "",
  sodienthoai: "",
  chucvu: "",
});

const props = defineProps({
  nhanvien: {
    type: Object,
    default: () => ({}),
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save-nhanvien", "cancel-edit"]);

watch(
  () => props.nhanvien,
  (newValue) => {
    currentNhanVien.value = { ...newValue };
    isEditMode.value = props.editMode;
  },
  { immediate: true }
);

// Hàm kiểm tra thông tin nhập
function validateForm() {
  let isValid = true;
  errors.value = {
    hoten: "",
    diachi: "",
    sodienthoai: "",
    chucvu: "",
  };

  if (!currentNhanVien.value.hoten.trim()) {
    errors.value.hoten = "Họ tên không được để trống.";
    isValid = false;
  }

  if (!currentNhanVien.value.diachi.trim()) {
    errors.value.diachi = "Địa chỉ không được để trống.";
    isValid = false;
  }

  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (
    currentNhanVien.value.sodienthoai &&
    !phoneRegex.test(currentNhanVien.value.sodienthoai)
  ) {
    errors.value.sodienthoai = "Số điện thoại không hợp lệ.";
    isValid = false;
  }

  if (!currentNhanVien.value.chucvu.trim()) {
    errors.value.chucvu = "Chức vụ không được để trống.";
    isValid = false;
  }

  return isValid;
}


function saveNhanVien() {
  if (validateForm()) {
    emit("save-nhanvien", { ...currentNhanVien.value });
    notification.showNotification(
      isEditMode.value
        ? "Cập nhật Nhân Viên thành công!"
        : "Thêm Nhân Viên thành công!",
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
