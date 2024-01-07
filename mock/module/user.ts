
// import Mock from 'mockjs';

const userInfo = {
  userName: 'Admin',
  roleName: '超级管理员',
  userId: 1,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTgwODk1LCJ1c2VySWQiOjU3MzUwNywidGVybWluYWxUeXBlIjoxMDAwOH0'
}

const userList = [
  {
    username: 'Admin',
    password: '123456'
  }
]

export default [
  {
    method: "post",
    url: "/api/login",
    response: (config: any) => {
      const { username, password } = config.query

      const checkUser = userList.find(item => item.username === username && password === item.password);
      if (!checkUser) {
        return {
          code: 1001,
          message: "账号或密码错误",
          data: null
        }
      }

      return {
        code: 200,
        message: "success",
        data: userInfo
      };
    }
  }, {
    method: "post",
    url: "/api/loginout",
    response: () => {
      return {
        code: 200,
        message: "退出成功",
        data: null
      };
    }
  }
]