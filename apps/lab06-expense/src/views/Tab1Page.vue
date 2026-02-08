<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>รายการรับ-จ่าย</ion-title>
                <ion-buttons slot="end">
                    <ion-button router-link="/add">เพิ่มข้อมูล</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-content>
                    <p>รายรับรวม: {{ totalIncome }} บาท</p>
                    <p>รายจ่ายรวม: {{ totalExpense }} บาท</p>
                </ion-card-content>
            </ion-card>

            <ion-list>
                <ion-item
                    v-for="item in expenses"
                    :key="item.id"
                    :router-link="'/edit/' + item.id"
                    button
                >
                    <ion-label>
                        <h2>{{ item.title }}</h2>
                        <p>
                            {{ item.category }} ({{
                                item.type === "income" ? "รายรับ" : "รายจ่าย"
                            }})
                        </p>
                    </ion-label>
                    <ion-note
                        slot="end"
                        :color="item.type === 'income' ? 'success' : 'danger'"
                    >
                        {{ item.amount }}
                    </ion-note>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButtons,
    IonButton,
    IonCard,
    IonCardContent,
} from "@ionic/vue";

const expenses = ref<any[]>([]);

const totalIncome = computed(() =>
    expenses.value
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0),
);
const totalExpense = computed(() =>
    expenses.value
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0),
);

onMounted(() => {
    const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        expenses.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    });
});
</script>
