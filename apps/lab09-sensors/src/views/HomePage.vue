<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lab09 Sensors</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <div v-if="!state || state.status === 'IDLE'" class="ion-text-center">
        <div style="margin: 40px 0;">
          <ion-icon name="fitness-outline" style="font-size: 100px; color: #3880ff;"></ion-icon>
          <h2>เตรียมพร้อมกายบริหาร</h2>
          <p>ถือโทรศัพท์ในแนวตั้ง เริ่มจากแขนแนบลำตัว</p>
        </div>
        <ion-button expand="block" size="large" @click="start">Start</ion-button>
      </div>

      <div v-else-if="state.status === 'RUNNING'">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 6rem; color: #3880ff; margin: 0;">
            {{ state.repDisplay }}
          </h1>
          <h3 :style="{ color: state.stats.lastMessage === 'OK' ? '#2dd36f' : '#eb445a' }">
            {{ state.stats.lastMessage }}
          </h3>
        </div>

        <div style="background: #e0e0e0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>กำลังบันทึกการเคลื่อนไหว...</strong></p>
          <p>คะแนนปัจจุบัน: {{ state.stats.score }}</p>
        </div>

        <ion-button expand="block" color="danger" @click="stop">Stop</ion-button>
      </div>

      <div v-else-if="state.status === 'STOPPED'">
        <div style="background: #f4f5f8; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 2px solid #3880ff;">
          <h2 style="color: #3880ff; text-align: center;">สรุปผลการฝึก</h2>
          <hr>
          <div style="font-size: 1.2rem; line-height: 2;">
            <p><strong>รอบทั้งหมด:</strong> {{ state.stats.repsTotal }} ครั้ง</p>
            <p><strong>รอบที่ถูกต้อง:</strong> <span style="color: #2dd36f;">{{ state.stats.repsOk }}</span></p>
            <p><strong>รอบที่ผิดพลาด:</strong> <span style="color: #eb445a;">{{ state.stats.repsBad }}</span></p>
            <p><strong>คะแนนรวม:</strong> {{ state.stats.score }}</p>
            <p><strong>ความเร็วเฉลี่ย:</strong> {{ state.stats.avgRepMs }} ms</p>
            <p><strong>ความแม่นยำ:</strong> {{ percentCorrect }}%</p>
          </div>
        </div>

        <ion-button expand="block" @click="start">เริ่มใหม่ (Restart)</ion-button>
        <ion-button expand="block" fill="clear" @click="resetToIdle" style="margin-top: 10px;">กลับหน้าแรก</ion-button>
      </div>

    </ion-content>

    <ion-footer class="ion-padding">
      <p style="text-align: center; margin: 0;">
        663380200-7 นายพสิษฐ์ ผลวิเศษพรสุข
      </p>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";

import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonFooter, IonIcon
} from "@ionic/vue";

const state = ref<WorkoutState | null>(null);
const engine = new ArmWorkoutEngine();
const motion = new MotionService();
const tts = new TtsService();

const percentCorrect = computed(() => {
  if (!state.value || state.value.stats.repsTotal === 0) return 0;
  return Math.round((state.value.stats.repsOk / state.value.stats.repsTotal) * 100);
});

onMounted(() => {
  engine.onChange((s) => (state.value = s));
});

async function start() {
  try {
    await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
  } catch (e) {
    console.warn("TTS Error:", e);
  }
  engine.start(); 
  try {
    await motion.start((s) => engine.process(s));
  } catch (e) {
    console.error("Motion Sensor Error:", e);
  }
}

async function stop() {
  await motion.stop();
  engine.stop();
  try {
    await tts.speak("จบการฝึกปฏิบัติ สถิติของคุณคือ " + state.value?.stats.repsOk + " รอบที่ถูกต้อง");
  } catch (e) {}
}

function resetToIdle() {
  // รีเซ็ตหน้าจอกลับไปที่ IDLE โดยไม่ต้องเริ่มใหม่ทันที
  if(state.value) state.value.status = 'IDLE';
}
</script>