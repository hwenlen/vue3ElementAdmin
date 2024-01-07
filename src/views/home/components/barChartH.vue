<template>
  <el-card>
    <template #header>
      <div class="disflex items-center justify-between">
        订单类型统计
        <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
          <el-icon @click="downloadEchart">
            <Download />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <div ref="barChartH" :style="{ height, width }"></div>
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
    default: '560px',
  }
});

const barChartH = ref()

const chartOptons = reactive({
  color: ['#409eff'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    x: '3%',
    y: '10%',
    x2: '9%',
    y2: '6%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    data: ['护士订单', '护理员订单', '商品订单', '护工订单', '平台订单', '设备订单']
  },
  series: [
    {
      data: [
        { name: '护士订单', value: 52 },
        { name: '护理员订单', value: 160 },
        { name: '商品订单', value: 100 },
        { name: '护工订单', value: 68 },
        { name: '平台订单', value: 36 },
        { name: '设备订单', value: 101 }
      ],
      name: '',
      type: 'bar',
      barWidth: '15%',
      label: {
        show: true, // 是否显示
        position: 'right', // 显示位置
        formatter: '{c} 单' // c后面加单位
      },
      itemStyle: {
        borderRadius: [16, 16, 16, 16]
      }
    }
  ]
})

const homechart = ref()
const initChart = () => {
  homechart.value = echarts.init(barChartH.value)
  homechart.value.setOption(chartOptons)
}

setTimeout(() => {
  const data = [
    { name: '护士订单', value: 152 },
    { name: '护理员订单', value: 321 },
    { name: '商品订单', value: 216 },
    { name: '护工订单', value: 301 },
    { name: '平台订单', value: 98 },
    { name: '设备订单', value: 253 }
  ]
  chartOptons.series[0].data = data
  homechart.value.setOption(chartOptons)
}, 5000)

const downloadEchart = () => {
  chartImgDownLoad(homechart.value)
}

onMounted(() => {
  initChart()
})

</script>
<style scoped lang='less'></style>