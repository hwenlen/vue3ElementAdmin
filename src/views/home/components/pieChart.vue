<template>
  <el-card>
    <template #header>
      <div class="disflex items-center justify-between">
        工作人员统计
        <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
          <el-icon @click="downloadEchart">
            <Download />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <div ref="pieChart" :style="{ height, width }"></div>
  </el-card>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue';
import * as echarts from 'echarts'
import { chartImgDownLoad } from '@/libs/utils'
defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '220px',
  }
});

const pieChart = ref()

const chartOptons = reactive({
  color: ['#409EFF', '#36cfc9', '#ff7a45', '#73d13d'],
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    y: '90%',
    x: 'center',
    icon: 'circle',
    orient: 'vertical',
    textStyle: {
      color: '#333',
      fontSize: 13
    }
  },
  series: [
    {
      data: [
        { name: '护士', value: '60' },
        { name: '护理员', value: '89' },
        { name: '商家', value: '30' },
        { name: '护工', value: '102' },
      ],
      name: '',
      type: 'pie',
      radius: ['25%', '60%'],
      top: '-15%',
      label: {
        formatter: '{b} : {c}'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 8,
      },
    }
  ]
})

const homechart = ref()
const initChart = () => {
  homechart.value = echarts.init(pieChart.value)
  homechart.value.setOption(chartOptons)
}

const downloadEchart = () => {
  chartImgDownLoad(homechart.value)
}

onMounted(() => {
  initChart()
})

</script>
<style scoped lang='less'></style>