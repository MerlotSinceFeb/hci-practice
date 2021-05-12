<template>
  <div class="app-container">
    <el-row style="margin: auto;">
      <div style="width: 95%; margin: auto; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12)">
        <el-row class="custom-row">
          <el-button type="primary" plain>新增</el-button>
          <el-button type="success" plain>修改</el-button>
          <el-button type="info" plain>删除</el-button>
        </el-row>
        <el-row class="custom-row">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
            >
            </el-table-column>
            <el-table-column
              prop="ID"
              label="ID"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="账号"
            >
            </el-table-column>
            <el-table-column
              prop="password"
              label="密码"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
            >
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期"
            >
            </el-table-column>
            <el-table-column
              prop="userType"
              label="账号类型"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="账号状态"
            >
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        ID: '1',
        username: 'admin',
        password: '123456789',
        name: '张三',
        sex: '男',
        birthday: '2021/05/12',
        userType: '超级管理员',
        status: '正常'
      }, {
        ID: '2',
        username: 'worker',
        password: '123456789',
        name: '李四',
        sex: '女',
        birthday: '2021/05/12',
        userType: '工作人员',
        status: '正常'
      }, {
        ID: '3',
        username: 'monitor',
        password: '123456789',
        name: '王五',
        sex: '男',
        birthday: '2021/05/12',
        userType: '指挥人员',
        status: '正常'
      }, {
        ID: '4',
        username: 'expert',
        password: '123456789',
        name: '赵六',
        sex: '女',
        birthday: '2021/05/12',
        userType: '专家人员',
        status: '停用'
      }, {
        ID: '5',
        username: 'expert',
        password: '123456789',
        name: '张麻子',
        sex: '男',
        birthday: '2021/05/12',
        userType: '专家人员',
        status: '正常'
      }, {
        ID: '6',
        username: 'admin',
        password: '123456789',
        name: '黄四郎',
        sex: '男',
        birthday: '2021/05/12',
        userType: '超级管理员',
        status: '正常'
      }],
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

.custom-row{
  padding-bottom: 10px;
}
</style>
