<template>
  <div class="home-page">
    <growCard></growCard>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <barChartH></barChartH>
      </el-col>
      <el-col :span="12">
        <pieChart></pieChart>
        <barChartV style="margin-top: 20px;"></barChartV>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts' setup>
import growCard from './components/growCards.vue'
import barChartH from './components/barChartH.vue'
import barChartV from './components/barChartV.vue'
import pieChart from './components/pieChart.vue'
</script>