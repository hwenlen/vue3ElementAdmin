<template>
  <div class="page-container">
    <el-form size="large">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="流水号">
            <el-input v-model="formData.turnover" placeholder="请输入流水号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收入类型">
            <el-select v-model="formData.type" class="w100p" placeholder="请选择收入类型">
              <el-option v-for="item in state.typeList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户姓名">
            <el-input v-model="formData.name" placeholder="请输入客户姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="disflex justify-end">
          <el-button size="default" @click="reset">重 置</el-button>
          <el-button size="default" type="primary" @click="getList">查 询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="img" label="缩略图" width="100">
        <template #default="scope">
          <img :src="scope.row.img" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="turnover" label="流水号" width="220" />
      <el-table-column prop="name" label="用户姓名" width="100" />
      <el-table-column prop="typeText" label="订单类型" width="100" />
      <el-table-column prop="createTime" label="下单时间" />
      <el-table-column prop="address" label="用户地址" />
    </el-table>

    <div class="table-pagination">
      <el-pagination background layout="sizes, prev, pager, next" :total="state.pageTotal" :page-sizes="[10, 20, 50, 100]"
        @change="pageChange" />
    </div>
  </div>
</template>
<script lang='ts'setup>
import { reactive, onMounted } from 'vue'
import { getOrderTypes, getFundincomeList } from '@/api/list'
import { typeModel, tableItemResultModel } from '@/api/list/type'

const formList = () => ({
  turnover: '',
  type: '',
  name: '',
  pageSize: 10,
  pageNum: 1
});
const formData = reactive(formList());
const state = reactive({
  typeList: Array<typeModel>(),
  tableData: Array<tableItemResultModel>(),
  pageTotal: 0
})

const getTypes = () => {
  getOrderTypes().then(res => {
    state.typeList = res.data
  })
}

const getList = () => {
  getFundincomeList(formData).then(res => {
    if (res.code == 200) {
      state.tableData = res.data.list
      state.pageTotal = res.data.total
    }
  })
}

const pageChange = (currentPage: number, pageSize: number) => {
  formData.pageNum = currentPage
  formData.pageSize = pageSize
  getList()
}

const reset = () => {
  Object.assign(formData, formList())
  getList()
}

onMounted(() => {
  getTypes()
  getList()
})

</script>