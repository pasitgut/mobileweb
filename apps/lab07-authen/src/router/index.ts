import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { authService } from "@/auth/auth-service"; // Import service

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/login", // เพิ่ม route login
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
        meta: { requiresAuth: true }, // เพิ่ม meta
      },
      // ... tab2, tab3
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Logic Auth Guard
router.beforeEach(async (to) => {
  const user = await authService.getCurrentUser();

  // Login แล้ว ห้ามเข้าหน้า Login อีก
  if (to.path === "/login" && user) {
    return "/tabs/tab1";
  }

  // ถ้าไปหน้าต้องห้าม แล้วยังไม่ Login ให้ไปหน้า Login
  if (to.meta.requiresAuth && !user) {
    return "/login";
  }
  return true;
});

export default router;
