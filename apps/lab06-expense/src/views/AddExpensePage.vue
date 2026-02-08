<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>เพิ่มรายการ</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input
                    label="ชื่อรายการ"
                    label-placement="floating"
                    v-model="title"
                ></ion-input>
            </ion-item>

            <ion-item>
                <ion-input
                    label="จำนวนเงิน"
                    type="number"
                    label-placement="floating"
                    v-model.number="amount"
                ></ion-input>
            </ion-item>

            <ion-item>
                <ion-select
                    label="ประเภท"
                    label-placement="floating"
                    v-model="type"
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
                    v-model="category"
                ></ion-input>
            </ion-item>

            <ion-item>
                <ion-textarea
                    label="หมายเหตุ"
                    label-placement="floating"
                    v-model="note"
                ></ion-textarea>
            </ion-item>

            <ion-button
                expand="block"
                class="ion-margin-top"
                @click="saveExpense"
            >
                บันทึกข้อมูล
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
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
} from "@ionic/vue";

const router = useRouter();
const title = ref("");
const amount = ref<number>(0);
const type = ref<string>("expense");
const category = ref("");
const note = ref("");

const saveExpense = async () => {
    try {
        await addDoc(collection(db, "expenses"), {
            title: title.value,
            amount: Number(amount.value),
            type: type.value,
            category: category.value,
            note: note.value,
            createdAt: new Date(),
        });
        alert("บันทึกสำเร็จ");
        router.replace("/tabs/tab1");
    } catch (e) {
        console.error(e);
    }
};
</script>
