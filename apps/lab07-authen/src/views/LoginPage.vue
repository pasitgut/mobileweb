<template>
    <ion-page>
        <ion-header
            ><ion-toolbar><ion-title>Login</ion-title></ion-toolbar></ion-header
        >
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input
                    v-model="email"
                    label="Email"
                    type="email"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-input
                    v-model="password"
                    label="Password"
                    type="password"
                ></ion-input>
            </ion-item>
            <ion-button expand="block" @click="doLoginEmail"
                >Login Email</ion-button
            >

            <div class="ion-text-center ion-margin-vertical">OR</div>

            <ion-button expand="block" color="danger" @click="doLoginGoogle"
                >Login Google</ion-button
            >

            <div class="ion-text-center ion-margin-vertical">OR</div>

            <ion-item>
                <ion-input
                    v-model="phoneNumber"
                    label="Phone (+66...)"
                    type="tel"
                ></ion-input>
            </ion-item>
            <div id="recaptcha-container"></div>
            <ion-button expand="block" color="success" @click="doLoginPhone"
                >Login Phone (OTP)</ion-button
            >
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/auth/auth-service";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
} from "@ionic/vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const phoneNumber = ref("+66");

const doLoginEmail = async () => {
    try {
        await authService.loginWithEmailPassword({
            email: email.value,
            password: password.value,
        });
        router.replace("/tabs/tab1");
    } catch (e) {
        alert(e);
    }
};

const doLoginGoogle = async () => {
    try {
        await authService.loginWithGoogle();
        router.replace("/tabs/tab1");
    } catch (e) {
        alert(e);
    }
};

const doLoginPhone = async () => {
    // Logic การรับ OTP และ confirmPhoneCode ตาม Flow ในเอกสาร
    // ขั้นแรก startPhoneLogin -> รับ verificationId
    // ขั้นสอง prompt ให้ User กรอก OTP -> confirmPhoneCode
};
</script>
