<template>
  <el-card>
    <template #header>
      <div class="disflex items-center justify-between">
        年度订单统计
        <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
          <el-icon @click="downloadEchart">
            <Download />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <div ref="barChartV" :style="{ height, width }"></div>
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

const barChartV = ref()

const chartOptons = reactive({
  color: ['#409eff'],
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}单'
  },
  grid: {
    x: '3%',
    y: 36,
    x2: 48,
    y2: '6%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    name: '月份',
    axisLabel: {

    },
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  },
  yAxis: {
    type: 'value',
    name: '单',
    axisLine: {
      show: true
    }
  },
  series: [
    {
      data: [
        { name: '1月', value: '60' },
        { name: '2月', value: '89' },
        { name: '3月', value: '30' },
        { name: '4月', value: '102' },
        { name: '5月', value: '89' },
        { name: '6月', value: '30' },
        { name: '7月', value: '102' },
        { name: '8月', value: '89' },
        { name: '9月', value: '30' },
        { name: '10月', value: '102' },
        { name: '11月', value: '89' },
        { name: '12月', value: '30' },
      ],
      name: '',
      type: 'bar',
      barWidth: '30%',
      label: {
        show: true, // 是否显示
        position: 'top', // 显示位置
        formatter: '{c}'
      }
    }
  ]
})

const homechart = ref()
const initChart = () => {
  homechart.value = echarts.init(barChartV.value)
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