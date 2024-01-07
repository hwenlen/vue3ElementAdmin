<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="card, index in growCardList" :key="card.id">
      <el-card>
        <template #header>
          <div class="disflex items-center justify-between">
            <h4>{{ card.title }}</h4>
            <el-tag :type="card.tagType">{{ card.action }}</el-tag>
          </div>
        </template>
        <div class="card-content disflex items-center justify-between">
          <img :src="card.icon" />
          <div class="num disflex items-end">
            <template v-if="card.unit == '元'">
              {{ Math.round(countOutput[index].value).toLocaleString() }}
            </template>
            <template v-else>
              {{ Math.round(countOutput[index].value) }}
            </template>
            <span class="unit">{{ card.unit }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'

const growCardList = [
  {
    id: 1,
    title: '年订单',
    value: 1806,
    action: '年',
    icon: '/src/assets/images/home/icon1.png',
    unit: '单',
    tagType: 'success'
  }, {
    id: 2,
    title: '月订单',
    value: 136,
    action: '月',
    icon: '/src/assets/images/home/icon2.png',
    unit: '单',
    tagType: ''
  }, {
    id: 3,
    title: '年收入',
    value: 87526,
    action: '年',
    icon: '/src/assets/images/home/icon3.png',
    unit: '元',
    tagType: 'warning'
  }, {
    id: 4,
    title: '月收入',
    value: 8965,
    action: '月',
    icon: '/src/assets/images/home/icon4.png',
    unit: '元',
    tagType: 'success'
  }
]

const countOutput = growCardList.map((item) => {
  const count = ref(0)
  const output = useTransition(count, {
    duration: 3000,
    transition: TransitionPresets.easeOutExpo
  })
  count.value = Number(item.value)
  return output
})
</script>
<style scoped lang='less'>
:deep(.el-card__header) {
  padding: 14px;
}

.card-content {
  padding: 0 36px 0 18px;

  img {
    width: 50px;
    height: 50px;
  }

  .num {
    font-size: 28px;
  }

  .unit {
    font-size: 14px;
    color: #999;
    transform: translateY(-4px);
    margin-left: 4px;
  }
}
</style>