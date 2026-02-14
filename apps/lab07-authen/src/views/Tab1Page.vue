<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>User Profile</ion-title>
                <ion-buttons slot="end">
                    <ion-button color="danger" @click="doLogout">
                        <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
                        Logout
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="ion-padding">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">User Profile</ion-title>
                </ion-toolbar>
            </ion-header>

            <div v-if="user">
                <ion-card>
                    <ion-card-header class="ion-text-center">
                        <div v-if="user.photoUrl" class="avatar-container">
                            <img
                                :src="user.photoUrl"
                                alt="Profile Photo"
                                class="avatar-img"
                            />
                        </div>
                        <ion-card-title>{{
                            user.displayName || "Guest User"
                        }}</ion-card-title>
                        <ion-card-subtitle v-if="user.email">{{
                            user.email
                        }}</ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-list>
                            <ion-item>
                                <ion-label>
                                    <h2>UID</h2>
                                    <p class="ion-text-wrap">{{ user.uid }}</p>
                                </ion-label>
                            </ion-item>

                            <ion-item v-if="user.email">
                                <ion-label>
                                    <h2>Email</h2>
                                    <p>{{ user.email }}</p>
                                </ion-label>
                            </ion-item>

                            <ion-item v-if="user.phoneNumber">
                                <ion-label>
                                    <h2>Phone Number</h2>
                                    <p>{{ user.phoneNumber }}</p>
                                </ion-label>
                            </ion-item>

                            <ion-item v-if="user.photoUrl">
                                <ion-label>
                                    <h2>Photo URL</h2>
                                    <p class="ion-text-wrap">
                                        {{ user.photoUrl }}
                                    </p>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </div>

            <div v-else class="ion-text-center ion-padding mt-5">
                <ion-spinner></ion-spinner>
                <p>Loading user data...</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/auth/auth-service";
import { AuthUser } from "@/auth/auth-interface"; // ต้องแน่ใจว่า path นี้ถูกต้อง
import { logOutOutline } from "ionicons/icons";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonIcon,
    IonSpinner,
} from "@ionic/vue";

const router = useRouter();
const user = ref<AuthUser | null>(null);

// ดึงข้อมูล User เมื่อหน้าโหลดเสร็จ
onMounted(async () => {
    try {
        user.value = await authService.getCurrentUser();
        console.log("Current User:", user.value);
    } catch (error) {
        console.error("Error getting user:", error);
    }
});

// ฟังก์ชัน Logout
const doLogout = async () => {
    try {
        await authService.logout();
        router.replace("/login"); // กลับไปหน้า Login
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
</script>

<style scoped>
.avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--ion-color-primary);
}

.mt-5 {
    margin-top: 50px;
}
</style>
