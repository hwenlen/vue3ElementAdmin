<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>订单详情</span>
      </div>
    </template>
    <el-form size="large" label-width="200">
      <el-row :gutter="40">
        <el-col :span="15">
          <el-form-item label="流水号">
            <p>{{ formData.turnover }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="下单时间">
            {{ formData.createTime }}
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="用户姓名">
            <el-input v-model="formData.name" placeholder="请输入用户姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="订单类型">
            <el-input v-model="formData.type" placeholder="请输入订单类型" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="用户地址">
            <el-input v-model="formData.address" placeholder="请输入用户地址" />
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="订单内容">
            <wangEditor v-model="formData.content"></wangEditor>
          </el-form-item>
        </el-col>

        <el-col :span="18">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script lang='ts' setup>
import { reactive, onMounted } from "vue";
import wangEditor from '@/components/wangEditor/index.vue'

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    formData.content = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1000);
});
const onSubmit = () => {
  console.log(formData)
};

const onCancel = () => { }

const formData = reactive({
  turnover: 'XrIlkWO6HRlRBK7WYw',
  type: '护理员订单',
  name: '刘德华',
  createTime: '2004-08-19 16:24:11',
  address: '宁夏回族自治区 石嘴山市 惠农区',
  content: ''
});

</script>