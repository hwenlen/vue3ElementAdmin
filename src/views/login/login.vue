<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h4>欢迎登录后台管理系统</h4>
        </div>
      </template>
      <el-form label-position="right" :model="formData" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input size="large" placeholder="请输入账号" v-model="formData.username">
            <template #prepend><el-icon>
                <User />
              </el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" type="password" v-model="formData.password">
            <template #prepend><el-icon>
                <Lock />
              </el-icon></template>
          </el-input>
        </el-form-item>
        <el-button size="large" type="primary" @click="handleSubmit(loginForm)">登录</el-button>
      </el-form>
      <template #footer>账号：Admin， 密码：123456</template>
    </el-card>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/module/user';
import type { FormInstance } from 'element-plus'

const $router = useRouter()

const formData = reactive({
  username: 'Admin',
  password: '123456'
})

const rules = {
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
}

const loginForm = ref()
const userStore = useUserStore()
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      userStore.handleLogin(formData).then(() => {
        $router.push({
          path: '/'
        })
      }).catch(err => {
        ElMessage.error(err)
      })
    }
  })
}

</script>
<style scoped lang='less'>
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #3058dc 0%, #b76590 45%, #5f5dc0 80%, #b76590 100%); // background: linear-gradient(to top right, #6bcc97 0%, #c37e4a 45%, #3bffed 100%);
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-card {
  position: absolute;
  left: 50%;
  top: 20%;
  width: 380px;
  margin-left: -190px;

  :deep(.el-button) {
    width: 100%;

    .el-input-group__prepend {
      padding: 0 10px;
    }
  }

  :deep(.el-input-group__prepend) {
    padding: 0 10px;
  }
}
</style>