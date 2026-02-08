<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>แก้ไขรายการ</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input
                    label="ชื่อรายการ"
                    label-placement="floating"
                    v-model="form.title"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-input
                    label="จำนวนเงิน"
                    type="number"
                    label-placement="floating"
                    v-model.number="form.amount"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-select
                    label="ประเภท"
                    label-placement="floating"
                    v-model="form.type"
                >
                    <ion-select-option value="income">รายรับ</ion-select-option>
                    <ion-select-option value="expense"
                        >รายจ่าย</ion-select-option
                    >
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-input
                    label="หมวดหมู่"
                    label-placement="floating"
                    v-model="form.category"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-textarea
                    label="หมายเหตุ"
                    label-placement="floating"
                    v-model="form.note"
                ></ion-textarea>
            </ion-item>

            <ion-button
                expand="block"
                class="ion-margin-top"
                @click="handleUpdate"
            >
                อัปเดตข้อมูล
            </ion-button>

            <ion-button
                expand="block"
                color="danger"
                class="ion-margin-top"
                @click="handleDelete"
            >
                ลบข้อมูล
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { alertController } from "@ionic/vue";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonButtons,
    IonBackButton,
} from "@ionic/vue";

const route = useRoute();
const router = useRouter();
const expenseId = route.params.id as string;
const form = ref<any>({});

onMounted(async () => {
    const docRef = doc(db, "expenses", expenseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        form.value = docSnap.data();
    }
});

const handleUpdate = async () => {
    const docRef = doc(db, "expenses", expenseId);
    await updateDoc(docRef, {
        title: form.value.title,
        amount: Number(form.value.amount),
        type: form.value.type,
        category: form.value.category,
        note: form.value.note,
    });
    router.back();
};

const handleDelete = async () => {
    const alert = await alertController.create({
        header: "ยืนยันการลบ",
        message: "คุณแน่ใจหรือไม่ที่จะลบรายการนี้?",
        buttons: [
            { text: "ยกเลิก", role: "cancel" },
            {
                text: "ลบ",
                role: "confirm",
                handler: async () => {
                    await deleteDoc(doc(db, "expenses", expenseId));
                    router.back();
                },
            },
        ],
    });
    await alert.present();
};
</script>
