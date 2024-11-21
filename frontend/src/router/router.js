import { createRouter, createWebHistory } from 'vue-router';
import Swal from 'sweetalert2';
import DocGiaPage from '@/pages/manager/DocGiaPage.vue';
import NhaXuatBanPage from '@/pages/manager/NhaXuatBanPage.vue';
import NhanVienPage from '@/pages/manager/NhanVienPage.vue';
import SachPage from '@/pages/manager/SachPage.vue';
import MuonTraSachPage from '@/pages/manager/MuonTraSachPage.vue';
import ChangePasswordPage from '@/pages/auth/ChangePasswordPage.vue';
import LoginPage from '@/pages/auth/LoginPage.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
        {
                path: '/',
                component: LoginPage,
        },
        {
                path: '/login',
                name: 'Login',
                component: LoginPage,
        },
        {
                path: '/change-password/:userId',
                name: 'ChangePassword',
                component: ChangePasswordPage,
                props: true,
        },
        {
                path: '/docgia',
                name: 'DocGiaPage',
                component: DocGiaPage,
                meta: { requiresAuth: true },
        },
        {
                path: '/nxbs',
                name: 'NhaXuatBanPage',
                component: NhaXuatBanPage,
                meta: { requiresAuth: true },
        },
        {
                path: '/nhanvien',
                name: 'NhanVienPage',
                component: NhanVienPage,
                meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
                path: '/sach',
                name: 'SachPage',
                component: SachPage,
                meta: { requiresAuth: true },
        },
        {
                path: '/muontra',
                name: 'MuonTraSachPage',
                component: MuonTraSachPage,
                meta: { requiresAuth: true },
        },
];

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
});

router.beforeEach((to, from, next) => {
        const authStore = useAuthStore();

        
        if (to.meta.requiresAuth && !authStore.token) {
                Swal.fire({
                        icon: 'warning',
                        title: 'Truy cập bị từ chối',
                        text: 'Bạn cần đăng nhập để truy cập trang này.',
                        confirmButtonText: 'OK',
                }).then(() => {
                        next({ name: 'Login' });
                });
                return; 
        }

        
        if (to.meta.requiresAdmin && authStore.role !== 'admin') {
                Swal.fire({
                        icon: 'error',
                        title: 'Không đủ quyền',
                        text: 'Bạn không có quyền truy cập trang này.',
                        confirmButtonText: 'OK',
                }).then(() => {
                        next({ name: 'Login' });
                });
                return; 
        }

        next(); 
});

export default router;
