const tokens = {
  admin: {
    token: 'admin-token'
  },
  worker: {
    token: 'worker-token'
  },
  monitor: {
    token: 'monitor-token'
  },
  expert: {
    token: 'expert-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '张三传奇的一生！',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '张三',
    userType: '超级管理员',
    age: '30',
    sex: '男'
  },
  'worker-token': {
    roles: ['worker'],
    introduction: '从事环境应急管理工作2年，工作热情高涨！',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '李四',
    userType: '工作人员',
    age: '26',
    sex: '女'
  },
  'monitor-token': {
    roles: ['monitor'],
    introduction: '在环境应急研究所工作，是环境应急方面的老手。',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '王五',
    userType: '指挥人员',
    age: '35',
    sex: '男'
  },
  'expert-token': {
    roles: ['expert'],
    introduction: '在东北大学冶金专业担任教授，经常处理棘手的环境事件。',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '赵六',
    userType: '专家人员',
    age: '40',
    sex: '男'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
