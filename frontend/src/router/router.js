import { createRouter, createWebHistory } from 'vue-router';
import DocGiaPage from '@/pages/manager/DocGiaPage.vue';
import NhaXuatBanPage from '@/pages/manager/NhaXuatBanPage.vue';
import NhanVienPage from '@/pages/manager/NhanVienPage.vue';
const routes = [
        {
                path: '/docgia',
                name: 'DocGiaPage',
                component: DocGiaPage,
        },
        {
                path: '/nxbs',
                name: 'NhaXuatBanPage',
                component: NhaXuatBanPage,
                
        },
        {
                path: '/nhanvien',
                name: 'NhanVienPage',
                component: NhanVienPage,
        },
];


const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
});

export default router;
