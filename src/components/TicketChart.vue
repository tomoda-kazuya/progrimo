<template>
  <div class="chart-container">
    <Bar :data="ticketChartData" :options="ticketChartOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
);

const ticketData = defineProps<{
  ticketData: { label: string; estimated: number; actual: number }[];
}>();

const ticketChartData = ref({
  labels: ticketData.ticketData.map(item => item.label),
  datasets: [
    {
      label: '見積もり',
      data: ticketData.ticketData.map(item => item.estimated),
      borderRadius: 12,
      backgroundColor: '#005BAC', // 青
    },
    {
      label: '実績',
      data: ticketData.ticketData.map(item => item.actual),
      borderRadius: 12,
      backgroundColor: '#00A3E0', // 水色
    },
  ],
});

const ticketChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>
