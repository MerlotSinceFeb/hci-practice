<template>
  <div class="app-container">
    <el-row style="margin: auto;">
      <div class="row-block">
        <el-row class="custom-row">
          <el-button type="primary" plain @click="openCreateDialog = true">新增</el-button>
          <el-button type="success" plain @click="openModifyDialog = true">修改</el-button>
          <el-button type="info" plain>删除</el-button>
        </el-row>
        <el-row class="custom-row">
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            border
            height="330"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
            />
            <el-table-column
              prop="ID"
              label="ID"
            />
            <el-table-column
              prop="username"
              label="账号"
            />
            <el-table-column
              prop="password"
              label="密码"
            />
            <el-table-column
              prop="name"
              label="姓名"
            />
            <el-table-column
              prop="sex"
              label="性别"
            />
            <el-table-column
              prop="birthday"
              label="出生日期"
            />
            <el-table-column
              prop="userType"
              label="账号类型"
            />
            <el-table-column
              prop="status"
              label="账号状态"
            />
          </el-table>
        </el-row>
        <el-row>
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <div class="row-block" style="margin-top: 10px">
        <el-divider content-position="left">组合条件搜索</el-divider>
        <el-form
          :model="account"
          class="demo-form-inline"
          :label-position="formPosition"
          label-width="80px"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="ID">
                <el-input v-model="account.ID" placeholder="ID" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账号">
                <el-input v-model="account.username" placeholder="账号" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名">
                <el-input v-model="account.name" placeholder="姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别">
                <el-radio v-model="account.sex" label="男">男</el-radio>
                <el-radio v-model="account.sex" label="女">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="账号类型">
                <el-select v-model="account.userType" placeholder="账号类型">
                  <el-option label="超级管理员" value="超级管理员" />
                  <el-option label="工作人员" value="工作人员" />
                  <el-option label="指挥人员" value="指挥人员" />
                  <el-option label="专家人员" value="专家人员" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账号状态">
                <el-select v-model="account.status" placeholder="账号状态">
                  <el-option label="正常" value="正常" />
                  <el-option label="停用" value="停用" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期">
                <el-date-picker
                  v-model="account.birthday"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="searchUser">查询</el-button>
                <el-button type="success" @click="resetUserList">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-row>
    <el-dialog
      title="账号注册"
      :visible.sync="openCreateDialog"
      width="30%"
      center
    >
      <div>
        <el-form
          ref="newUser"
          :model="newUser"
          status-icon
          label-width="80px"
        >
          <el-form-item label="账号">
            <el-input v-model="newUser.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="newUser.password" type="password" auto-complete="off" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="newUser.confirm" type="password" auto-complete="off" placeholder="请再次确认密码" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="newUser.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="newUser.sex" label="男">男</el-radio>
            <el-radio v-model="newUser.sex" label="女">女</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin: auto">
        <el-button @click="openCreateDialog = false">取 消</el-button>
        <el-button type="primary" @click="createUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="账号修改"
      :visible.sync="openModifyDialog"
      width="30%"
      center
    >
      <span>待添加</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openModifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="modifyUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        ID: '',
        username: '',
        password: '',
        confirm: '',
        name: '',
        sex: '',
        birthday: '',
        userType: '',
        status: '正常'
      },
      openCreateDialog: false,
      openModifyDialog: false,
      userList: [{
        ID: '1',
        username: 'admin',
        password: '123456789',
        name: '张三',
        sex: '男',
        birthday: '2021-05-12',
        userType: '超级管理员',
        status: '正常'
      }, {
        ID: '2',
        username: 'worker',
        password: '123456789',
        name: '李四',
        sex: '女',
        birthday: '2021-05-12',
        userType: '工作人员',
        status: '正常'
      }, {
        ID: '3',
        username: 'monitor',
        password: '123456789',
        name: '王五',
        sex: '男',
        birthday: '2021-05-12',
        userType: '指挥人员',
        status: '正常'
      }, {
        ID: '4',
        username: 'expert',
        password: '123456789',
        name: '赵六',
        sex: '女',
        birthday: '2021-05-12',
        userType: '专家人员',
        status: '停用'
      }, {
        ID: '5',
        username: 'expert01',
        password: '123456789',
        name: '张麻子',
        sex: '男',
        birthday: '2021-05-12',
        userType: '专家人员',
        status: '正常'
      }, {
        ID: '6',
        username: 'admin',
        password: '123456789',
        name: '黄四郎',
        sex: '男',
        birthday: '2021-05-11',
        userType: '超级管理员',
        status: '正常'
      }],
      rawUserList: [{
        ID: '1',
        username: 'admin',
        password: '123456789',
        name: '张三',
        sex: '男',
        birthday: '2021-05-12',
        userType: '超级管理员',
        status: '正常'
      }, {
        ID: '2',
        username: 'worker',
        password: '123456789',
        name: '李四',
        sex: '女',
        birthday: '2021-05-12',
        userType: '工作人员',
        status: '正常'
      }, {
        ID: '3',
        username: 'monitor',
        password: '123456789',
        name: '王五',
        sex: '男',
        birthday: '2021-05-12',
        userType: '指挥人员',
        status: '正常'
      }, {
        ID: '4',
        username: 'expert',
        password: '123456789',
        name: '赵六',
        sex: '女',
        birthday: '2021-05-12',
        userType: '专家人员',
        status: '停用'
      }, {
        ID: '5',
        username: 'expert01',
        password: '123456789',
        name: '张麻子',
        sex: '男',
        birthday: '2021-05-12',
        userType: '专家人员',
        status: '正常'
      }, {
        ID: '6',
        username: 'admin',
        password: '123456789',
        name: '黄四郎',
        sex: '男',
        birthday: '2021-05-11',
        userType: '超级管理员',
        status: '正常'
      }],
      multipleSelection: [],
      account: {
        ID: '',
        username: '',
        name: '',
        sex: '',
        birthday: '',
        userType: '',
        status: ''
      },
      formPosition: 'right'
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchUser() {
      // 遍历userList列表找到符合条件的记录
      this.userList = this.rawUserList.filter(user => {
        return this.account.ID === user.ID || this.account.username === user.username ||
          this.account.status === user.status || this.account.userType === user.userType ||
          this.account.birthday === user.birthday || this.account.sex === user.sex ||
          this.account.name === user.name
      })
    },
    resetUserList() {
      // 重置列表页数据
      this.userList = this.rawUserList
      // 清空查询表单数据
      this.account.birthday = ''
      this.account.name = ''
      this.account.sex = ''
      this.account.userType = ''
      this.account.status = ''
      this.account.ID = ''
      this.account.username = ''
    },
    createUser() {
      this.openCreateDialog = false
    },
    modifyUser() {
      this.openModifyDialog = false
    }
  }
}
</script>

<style scoped>

.custom-row {
  padding-bottom: 10px;
}

.row-block {
  width: 95%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.center-block {
  width: 95%;
  margin: auto;
}
</style>
