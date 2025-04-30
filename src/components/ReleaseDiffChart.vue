<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Line } from 'vue-chartjs'; // vue-chartjs から Line コンポーネントをインポート
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';  // 必要なチャートJSの要素をインポート
import type { ChartData } from 'chart.js';  // ChartData を型としてインポート
import annotationPlugin from 'chartjs-plugin-annotation';  // annotation プラグインのインポート

// Chart.js のプラグインを登録
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,  // 追加: PointElement の登録
  ArcElement,    // 必要に応じて ArcElement も追加
  CategoryScale,
  LinearScale,
  annotationPlugin // プラグインを最後に登録
);

// Props の定義（ここでは予実差を含むデータを受け取る）
const props = defineProps<{
  releaseData: { label: string, estimated: number, actual: number }[];
}>();

// 予実差（%）を計算する関数
const calculateDifference = (estimated: number, actual: number) => {
  if (estimated === 0) return 0;  // ゼロ割り防止
  return ((actual - estimated) / estimated) * 100;
};

// チャートデータ
const chartData = ref<ChartData<'line'>>({
  labels: props.releaseData.map(item => item.label),
  datasets: [
    {
      type: "line",
      label: '予実差 (%)',
      data: props.releaseData.map(item => calculateDifference(item.estimated, item.actual)),
      borderColor: '#005BAC',
      borderWidth: 2,
      fill: false,
      tension: 0.4,  // 曲線のなめらかさを調整
    },
  ],
});

// チャートオプション
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      min: -50,
      max: 50,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: {
    annotation: {
      annotations: [
        {
          type: "line" as const,
          yMin: 30,
          yMax: 30,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            content: '30% 差',
            enabled: true,
            position: 'center' as const,
            color: 'red',
            font: {
              size: 12,
            },
          },
        },
      ],
    },
  },
});

</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
  overflow: hidden;    /* コンテナからはみ出さないようにする */
}
</style>
