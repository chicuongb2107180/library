<template>
  <div class="card form-card mx-auto">
    <div class="card-header">
      <h5 class="card-title">
        {{ isEditMode ? "Chỉnh sửa Độc Giả" : "Thêm Độc Giả Mới" }}
      </h5>
    </div>
    <div class="card-body">
      <div v-if="notification.show" :class="`alert alert-${notification.type}`">
        {{ notification.message }}
      </div>

      <form @submit.prevent="saveDocGia">
        <div class="mb-3">
          <label for="holot" class="form-label fs-6">Họ lót:</label>
          <input
            v-model="currentDocGia.holot"
            type="text"
            id="holot"
            class="form-control form-control-sm"
            required
          />
          <div v-if="errors.holot" class="text-danger">{{ errors.holot }}</div>
        </div>
        <div class="mb-3">
          <label for="ten" class="form-label fs-6">Tên:</label>
          <input
            v-model="currentDocGia.ten"
            type="text"
            id="ten"
            class="form-control form-control-sm"
            required
          />
          <div v-if="errors.ten" class="text-danger">{{ errors.ten }}</div>
        </div>
        <div class="mb-3">
          <label for="ngaysinh" class="form-label fs-6">Ngày sinh:</label>
          <input
            v-model="currentDocGia.ngaysinh"
            type="date"
            id="ngaysinh"
            class="form-control form-control-sm"
          />
          <div v-if="errors.ngaysinh" class="text-danger">
            {{ errors.ngaysinh }}
          </div>
        </div>
        <div class="mb-3">
          <label for="diachi" class="form-label fs-6">Địa chỉ:</label>
          <input
            v-model="currentDocGia.diachi"
            type="text"
            id="diachi"
            class="form-control form-control-sm"
          />
        </div>
        <div class="mb-3">
          <label for="sodienthoai" class="form-label fs-6"
            >Số điện thoại:</label
          >
          <input
            v-model="currentDocGia.sodienthoai"
            type="text"
            id="sodienthoai"
            class="form-control form-control-sm"
          />
          <div v-if="errors.sodienthoai" class="text-danger">
            {{ errors.sodienthoai }}
          </div>
        </div>

        <!-- Nút thêm mới hoặc cập nhật -->
        <button type="submit" class="btn btn-success custom-btn">
          {{ isEditMode ? "Cập nhật" : "Thêm Mới" }}
        </button>

        <!-- Nút hủy khi chỉnh sửa -->
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
const currentDocGia = ref({
  holot: "",
  ten: "",
  ngaysinh: "",
  diachi: "",
  sodienthoai: "",
});
const errors = ref({
  holot: "",
  ten: "",
  ngaysinh: "",
  sodienthoai: "",
});

const props = defineProps({
  docgia: {
    type: Object,
    default: () => ({}),
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save-docgia", "cancel-edit"]);

watch(
  () => props.docgia,
  (newValue) => {
    currentDocGia.value = { ...newValue };
    isEditMode.value = props.editMode;
  },
  { immediate: true }
);

// Kiểm tra lỗi khi nhập thông tin
function validateForm() {
  let isValid = true;
  errors.value = {
    holot: "",
    ten: "",
    ngaysinh: "",
    sodienthoai: "",
  };

  if (!currentDocGia.value.holot.trim()) {
    errors.value.holot = "Họ lót không được để trống.";
    isValid = false;
  }

  if (!currentDocGia.value.ten.trim()) {
    errors.value.ten = "Tên không được để trống.";
    isValid = false;
  }

  if (!currentDocGia.value.ngaysinh) {
    errors.value.ngaysinh = "Ngày sinh không hợp lệ.";
    isValid = false;
  }

  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (
    currentDocGia.value.sodienthoai &&
    !phoneRegex.test(currentDocGia.value.sodienthoai)
  ) {
    errors.value.sodienthoai = "Số điện thoại không hợp lệ.";
    isValid = false;
  }

  return isValid;
}

function saveDocGia() {
  if (validateForm()) {
    emit("save-docgia", { ...currentDocGia.value });
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
