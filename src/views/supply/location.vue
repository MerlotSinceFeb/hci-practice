<<<<<<< HEAD
<template>
  <div class="app-container" style="margin-left:20px">
    <div class="filter-container" style="margin-top:20px">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible=true">新增物资位置信息</el-button>
    </div>
    <el-table
     ref="singleTable"
     :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
     highlight-current-row
     :default-sort = "{prop: 'ID', order: 'ascending'}"
     @current-change="handleCurrentChange"
     style="width: 100%">
      <el-table-column
       prop="ID"
       label="ID"
       sortable
       width="120"
       align="center"/>
      <el-table-column
       prop="name"
       label="物资存放名称"
       width="150"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.name}}</div>
          <div v-else>
            <el-input v-model="scope.row.name"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="content"
       label="物资内容"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.content}}</div>
          <div v-else>
            <el-input v-model="scope.row.content"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="150">
        <!--eslint-disable-next-line-->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索..."/>
        </template>
        <!--eslint-disable-next-line-->
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="text"
            @click="handleClick(scope.row)">{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button>
          <el-popconfirm title="确认删除吗？" @onConfirm="deleteRow(scope.$index, tableData)">
            <el-button
            size="mini"
            icon="el-icon-delete"
            slot="reference"
            type="text"
            style="color:red"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin:20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        align="center">
      </el-pagination>
    </div>

    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" style="width:1000px" @close="dialogFormClosed">
      <el-form ref="refForm" :model="form" label-width="120px">
        <el-form-item label="物资存放名称" :label-width="formLabelWidth" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物资内容" :label-width="formLabelWidth" prop="content">
          <el-col :span="20">
            <el-input type="textarea" :rows="3" v-model="form.content" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInfo()">确认信息</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        ID: '1',
        name: '求生三件套',
        content: '矿泉水、衣物、干粮'
      }, {
        ID: '2',
        name: '消防器材',
        content: '灭火器'
      }, {
        ID: '3',
        name: '武器',
        content: '步枪'
      }, {
        ID: '4',
        name: '建材',
        content: '混凝土'
      }, {
        ID: '5',
        name: '一般车辆',
        content: '汽车'
      }, {
        ID: '6',
        name: '工程车辆',
        content: '挖掘机、铲车'
      }, {
        ID: '7',
        name: '化学品',
        content: '化学原料'
      }],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
      this.deleteSuccess()
    },
    deleteSuccess() {
      this.$message({
        message: '成功删除信息',
        type: 'success'
      })
    },
    addSuccess() {
      this.$message({
        message: '成功添加信息',
        type: 'success'
      })
    },
    dialogFormClosed() {
      this.$refs.refForm.resetFields()
    },
    getNewID() {
      let newID = 0
      for (var i = 0; i < this.tableData.length; i++) {
        newID = Math.max(parseInt(this.tableData[i].ID), newID)
      }
      return newID + 1
    },
    addInfo() {
      this.tableData.push({
        ID: this.getNewID(),
        name: this.form.name,
        content: this.form.content
      })
      this.dialogFormVisible = false
      this.addSuccess()
    },
    handleClick(row) {
      if (row.isEdit) {
        this.$delete(row, 'isEdit')
      } else {
        this.$set(row, 'isEdit', true)
      }
      console.log(this.tableData)
    },
    handle(row, column, cell, event) {}
  }
}
</script>

<style scoped>

</style>

=======
<template>
  <div class="app-container" style="margin-left:20px">物资位置信息维护页
    <div class="filter-container" style="margin-top:20px">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible=true">新增物资位置信息</el-button>
    </div>
    <el-table
     ref="singleTable"
     :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
     highlight-current-row
     :default-sort = "{prop: 'ID', order: 'ascending'}"
     @current-change="handleCurrentChange"
     style="width: 100%">
      <el-table-column
       prop="ID"
       label="ID"
       sortable
       width="120"
       align="center"/>
      <el-table-column
       prop="name"
       label="物资存放名称"
       width="150"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.name}}</div>
          <div v-else>
            <el-input v-model="scope.row.name"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="content"
       label="物资内容"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.content}}</div>
          <div v-else>
            <el-input v-model="scope.row.content"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="150">
        <!--eslint-disable-next-line-->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索..."/>
        </template>
        <!--eslint-disable-next-line-->
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="text"
            @click="handleClick(scope.row)">{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="text"
            style="color:red"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            @click="deleteSuccess()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin:20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        align="center">
      </el-pagination>
    </div>

    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" style="width:1000px" @close="dialogFormClosed">
      <el-form ref="refForm" :model="form" label-width="120px">
        <el-form-item label="物资存放名称" :label-width="formLabelWidth" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物资内容" :label-width="formLabelWidth" prop="content">
          <el-col :span="20">
            <el-input type="textarea" :rows="3" v-model="form.content" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInfo()">确认信息</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        ID: '1',
        name: '求生三件套',
        content: '矿泉水、衣物、干粮'
      }, {
        ID: '2',
        name: '消防器材',
        content: '灭火器'
      }, {
        ID: '3',
        name: '武器',
        content: '步枪'
      }],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    deleteSuccess() {
      this.$message({
        message: '成功删除信息',
        type: 'success'
      })
    },
    addSuccess() {
      this.$message({
        message: '成功添加信息',
        type: 'success'
      })
    },
    dialogFormClosed() {
      this.$refs.refForm.resetFields()
    },
    getNewID() {
      let newID = 0
      for (var i = 0; i < this.tableData.length; i++) {
        newID = Math.max(parseInt(this.tableData[i].ID), newID)
      }
      return newID + 1
    },
    addInfo() {
      this.tableData.push({
        ID: this.getNewID(),
        name: this.form.name,
        content: this.form.content
      })
      this.dialogFormVisible = false
      this.addSuccess()
    },
    handleClick(row) {
      if (row.isEdit) {
        this.$delete(row, 'isEdit')
      } else {
        this.$set(row, 'isEdit', true)
      }
      console.log(this.tableData)
    },
    handle(row, column, cell, event) {}
  }
}
</script>

<style scoped>

</style>

>>>>>>> f09b16df5edd5ac5c722cbd012244198b4e3494e
