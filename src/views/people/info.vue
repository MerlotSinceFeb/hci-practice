<template>
  <div class="app-container">
    <el-row style="margin: auto;">
      <div class="row-block">
        <el-row class="custom-row">
          <el-button type="primary" @click="openCreateDialog = true">新增</el-button>
          <el-button type="success" @click="openModifyPage">修改</el-button>
          <el-button type="info" @click="removeUser">删除</el-button>
        </el-row>
        <el-row class="custom-row">
          <el-table
            ref="multipleTable"
            :data="userList.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            tooltip-effect="dark"
            border
            height="285"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
            />
            <el-table-column
              prop="ID"
              label="ID"
              width="50px"
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
              layout="prev, pager, next, jumper, ->, total"
              :current-page="currentPage"
              :page-size="1"
              :total="total"
              @current-change="handleCurrentChange"
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
          :rules="rules"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="newUser.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="newUser.password" type="password" auto-complete="off" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="newUser.confirm" type="password" auto-complete="off" placeholder="请再次确认密码" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="newUser.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="newUser.sex" label="男">男</el-radio>
            <el-radio v-model="newUser.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="newUser.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="账号类型" prop="userType">
            <el-select v-model="newUser.userType" placeholder="账号类型">
              <el-option label="超级管理员" value="超级管理员" />
              <el-option label="工作人员" value="工作人员" />
              <el-option label="指挥人员" value="指挥人员" />
              <el-option label="专家人员" value="专家人员" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin: auto">
        <el-button @click="resetCreateUser('newUser')">取 消</el-button>
        <el-button type="primary" :disabled="createUserBtnIsDisable" @click="createUser('newUser')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="账号修改"
      :visible.sync="openModifyDialog"
      width="30%"
      center
    >
      <div>
        <el-form
          ref="changeUser"
          :model="changeUser"
          status-icon
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="用户账号">
            <el-input v-model="changeUser.username" placeholder="请输入姓名" disabled />
          </el-form-item>
          <el-form-item label="当前密码">
            <el-input v-model="changeUser.oldPassword" type="password" auto-complete="off" disabled />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="changeUser.newPassword" type="password" auto-complete="off" placeholder="请输入新密码" />
          </el-form-item>
          <el-form-item label="再次确认" prop="confirmNewPassword">
            <el-input v-model="changeUser.confirm" type="password" auto-complete="off" placeholder="请再次确认新密码" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="changeUser.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="changeUser.sex" label="男">男</el-radio>
            <el-radio v-model="changeUser.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="changeUser.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="账号类型">
            <el-select v-model="changeUser.userType" placeholder="账号类型">
              <el-option label="超级管理员" value="超级管理员" />
              <el-option label="工作人员" value="工作人员" />
              <el-option label="指挥人员" value="指挥人员" />
              <el-option label="专家人员" value="专家人员" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="changeUser.status" placeholder="账号状态">
              <el-option label="正常" value="正常" />
              <el-option label="停用" value="停用" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetModifyUser('changeUser')">取 消</el-button>
        <el-button type="primary" :disabled="modifyUserBtnIsDisable" @click="modifyUser('changeUser')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      total: 0,
      createUserBtnIsDisable: false,
      modifyUserBtnIsDisable: false,
      newUser: {
        ID: '',
        username: '',
        password: '',
        confirm: '',
        name: '',
        sex: '',
        birthday: '',
        userType: '',
        status: ''
      },
      rawUser: {
        ID: '',
        username: '',
        password: '',
        name: '',
        sex: '',
        birthday: '',
        userType: '',
        status: ''
      },
      changeUser: {
        ID: '',
        username: '张三',
        oldPassword: '123456',
        newPassword: '',
        confirm: '',
        name: '',
        sex: '',
        birthday: '2021-05-21',
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
      formPosition: 'right',
      // 表单规则验证器
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码至少为6为字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码至少为6为字符', trigger: 'blur' }
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (this.newUser.confirm === '') {
                callback(new Error('请再次输入密码'))
              } else if (this.newUser.confirm !== this.newUser.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        confirmNewPassword: [
          {
            validator: (rule, value, callback) => {
              if (this.changeUser.confirm === '') {
                callback(new Error('请再次输入新密码'))
              } else if (this.changeUser.confirm !== this.changeUser.newPassword) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        userType: [
          { required: true, message: '请选择账号类型', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.total = Math.ceil(this.userList.length / this.pageSize)
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      console.log(this.pageSize, this.userList.length, this.currentPage)
      this.currentPage = 1
      this.total = Math.ceil(this.userList.length / this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchUser() {
      // 遍历userList列表找到符合条件的记录
      this.userList = this.rawUserList.filter(user => {
        return (this.account.ID === user.ID || this.account.ID.trim() === '') &&
          (this.account.username === user.username || this.account.username.trim() === '') &&
          (this.account.status === user.status || this.account.status.trim() === '') &&
          (this.account.userType === user.userType || this.account.username.trim() === '') &&
          (this.account.birthday === user.birthday || this.account.birthday.trim() === '') &&
          (this.account.sex === user.sex || this.account.sex.trim() === '') &&
          (this.account.name === user.name || this.account.name.trim() === '')
      })
      this.total = Math.ceil(this.userList.length / this.pageSize)
      this.currentPage = 1
      if (this.userList.length === 0) {
        this.$message({
          type: 'warning',
          message: '查询用户失败!'
        })
        return
      }
      this.$message({
        type: 'success',
        message: '查询用户成功!'
      })
    },
    resetUserList() {
      // 重置列表页数据
      this.userList = this.rawUserList
      this.total = Math.ceil(this.userList.length / this.pageSize)
      this.currentPage = 1
      // 清空查询表单数据
      this.account.birthday = ''
      this.account.name = ''
      this.account.sex = ''
      this.account.userType = ''
      this.account.status = ''
      this.account.ID = ''
      this.account.username = ''
    },
    // 重置创建表单
    resetCreateUser(formName) {
      this.$refs[formName].resetFields()
      this.newUser.confirm = ''
      this.openCreateDialog = false
    },
    // 创建用户
    createUser(formName) {
      const userInitStatus = '正常'
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        // 禁用创建按钮
        this.createUserBtnIsDisable = true
        // 补充默认信息
        const id = this.rawUserList[this.rawUserList.length - 1].ID
        this.rawUserList.push({
          ID: String(parseInt(id) + 1),
          status: userInitStatus,
          username: this.newUser.username,
          password: this.newUser.password,
          name: this.newUser.name,
          sex: this.newUser.sex,
          birthday: this.newUser.birthday,
          userType: this.newUser.userType
        })
        this.userList = this.rawUserList
        this.total = Math.ceil(this.userList.length / this.pageSize)

        // 还原控件状态
        this.openCreateDialog = false
        this.createUserBtnIsDisable = false
        this.$refs[formName].resetFields()
        this.newUser.confirm = ''
        // 消息提示
        this.$message({
          type: 'success',
          message: '添加用户成功!'
        })
        return true
      })
    },
    // 打开修改信息框
    openModifyPage() {
      if (this.multipleSelection.length > 1) {
        this.$message({
          type: 'warning',
          message: '请勿选择多条用户信息!'
        })
      } else if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择一条用户信息进行修改!'
        })
      } else {
        // 显示用户信息
        this.changeUser.ID = this.multipleSelection[0].ID
        this.changeUser.username = this.multipleSelection[0].username
        this.changeUser.oldPassword = this.multipleSelection[0].password
        this.changeUser.name = this.multipleSelection[0].name
        this.changeUser.birthday = this.multipleSelection[0].birthday
        this.changeUser.sex = this.multipleSelection[0].sex
        this.changeUser.status = this.multipleSelection[0].status
        this.changeUser.userType = this.multipleSelection[0].userType
        this.openModifyDialog = true
      }
    },
    // 修改用户
    modifyUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        // 禁用修改按钮
        this.modifyUserBtnIsDisable = true
        // 补充修改信息
        this.rawUser.ID = this.changeUser.ID
        this.rawUser.status = this.changeUser.status
        this.rawUser.username = this.changeUser.username
        this.rawUser.password = this.changeUser.newPassword
        this.rawUser.name = this.changeUser.name
        this.rawUser.sex = this.changeUser.sex
        this.rawUser.birthday = this.changeUser.birthday
        this.rawUser.userType = this.changeUser.userType
        // 修改用户信息
        for (let i = 0; i < this.rawUserList.length; i++) {
          if (this.rawUserList[i].ID === this.rawUser.ID) {
            this.rawUserList[i] = this.rawUser
            break
          }
        }
        this.userList = this.rawUserList
        // 还原控件状态
        this.openModifyDialog = false
        this.modifyUserBtnIsDisable = false
        this.$refs[formName].resetFields()
        this.changeUser.confirm = ''
        // 消息提示
        this.$message({
          type: 'success',
          message: '修改用户成功!'
        })
        return true
      })
    },
    // 重置修改表单
    resetModifyUser(formName) {
      this.$refs[formName].resetFields()
      this.changeUser.confirm = ''
      this.openModifyDialog = false
    },
    // 删除用户
    removeUser() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条用户信息!'
        })
        return
      }
      this.$confirm('确定删除选中记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除掉选中的id
        this.multipleSelection.filter(removeUser => {
          this.rawUserList = this.userList.filter(user => {
            return user.ID !== removeUser.ID
          })
        })
        this.rawUserList = this.rawUserList.filter(user => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i].ID === user.ID) {
              return false
            }
          }
          return true
        })
        // 设置列表页数据
        this.userList = this.rawUserList
        this.currentPage = 1
        this.total = Math.ceil(this.userList.length / this.pageSize)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
