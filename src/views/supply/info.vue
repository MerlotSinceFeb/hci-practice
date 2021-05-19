<template>
  <div class="app-container" style="margin-left:20px">
    <div class="filter-container" style="margin-top:20px">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible=true">新增物资基本信息</el-button>
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
       label="物资ID"
       sortable
       width="120"
       align="center"/>
      <el-table-column
       prop="name"
       label="物资名称"
       width="120"
       align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.name }}</div>
          <div v-else>
            <el-input v-model="scope.row.name"></el-input>
          </div>
        </template>
      </el-table-column>
       <el-table-column
       prop="quantity"
       label="物资数量"
       sortable
       width="120"
       align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.quantity }}</div>
          <div v-else>
            <el-input v-model="scope.row.quantity"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="type"
       label="物资类型"
       align="center"/>
      <el-table-column
       prop="checker"
       label="清点人"
       align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.checker}}</div>
          <div v-else>
            <el-input v-model="scope.row.checker"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="checkerPhone"
       label="清点人电话"
       align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.checkerPhone }}</div>
          <div v-else>
            <el-input v-model="scope.row.checkerPhone"></el-input>
          </div>
        </template>
      </el-table-column>
       <el-table-column
       prop="code"
       label="物资编号"
       sortable
       align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.code }}</div>
          <div v-else>
            <el-input v-model="scope.row.code"></el-input>
          </div>
        </template>
      </el-table-column>
       <el-table-column
       prop="date"
       label="清点时间"
       align="center"/>
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

    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" style="width:1500px" @close="dialogFormClosed">
      <el-form :rules="rules" ref="refForm" :inline="true" :model="form" label-width="100px">
        <el-form-item label="物资名称" :label-width="formLabelWidth" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物资数量" :label-width="formLabelWidth" prop="quantity">
          <el-col :span="20">
            <el-input v-model="form.quantity" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择物资类型">
            <el-option label="食品" value="食品"/>
            <el-option label="器械" value="器械"/>
          </el-select>
        </el-form-item>
        <el-form-item label="物资编号" :label-width="formLabelWidth" prop="code">
          <el-col :span="20">
            <el-input v-model="form.code" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物资清点人" :label-width="formLabelWidth" prop="checker">
          <el-col :span="20">
            <el-input v-model="form.checker" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="清点人电话" :label-width="formLabelWidth" prop="checkerPhone">
          <el-col :span="20">
            <el-input v-model="form.checkerPhone" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="清点时间" :label-width="formLabelWidth" prop="date">
          <el-col :span="20">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确认信息</el-button>
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
        name: '矿泉水',
        quantity: '100',
        type: '食品',
        checker: '张三',
        checkerPhone: '12345678',
        code: '101',
        date: '2021-05-11'
      }, {
        ID: '2',
        name: '方便面',
        quantity: '100',
        type: '食品',
        checker: '张三',
        checkerPhone: '12345678',
        code: '102',
        date: '2021-05-11'
      }, {
        ID: '3',
        name: '铁锹',
        quantity: '100',
        type: '器械',
        checker: '李四',
        checkerPhone: '12345687',
        code: '141',
        date: '2021-05-11'
      }, {
        ID: '4',
        name: '十字镐',
        quantity: '56',
        type: '器械',
        checker: '李四',
        checkerPhone: '12345687',
        code: '142',
        date: '2021-05-11'
      }, {
        ID: '5',
        name: '钻头',
        quantity: '70',
        type: '器械',
        checker: '李四',
        checkerPhone: '12345687',
        code: '143',
        date: '2021-05-11'
      }, {
        ID: '6',
        name: '炸药',
        quantity: '84',
        type: '器械',
        checker: '李四',
        checkerPhone: '12345687',
        code: '144',
        date: '2021-05-11'
      }, {
        ID: '7',
        name: '干粮',
        quantity: '106',
        type: '食品',
        checker: '李四',
        checkerPhone: '12345687',
        code: '103',
        date: '2021-05-11'
      }],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        quantity: '',
        type: '',
        checker: '',
        checkerPhone: '',
        code: '',
        date: ''
      },
      rules: {
          name: [
            { required: true, message: '请输入物资名称', trigger: 'blur' }
          ],
          quantity: [
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          checker: [
            { required: true, message: '请输入清点人名称', trigger: 'blur' }
          ],
          checkerPhone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
    }
  },
  methods: {
    // methods
    // final version
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
    editSuccess() {
      this.$message({
        message: '成功编辑信息',
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
    submitForm() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.addInfo()
        } else {
          return false;
        }
      });
    },    
    addInfo() {
      this.tableData.push({
        ID: this.getNewID(),
        name: this.form.name,
        quantity: this.form.quantity,
        type: this.form.type,
        checker: this.form.checker,
        checkerPhone: this.form.checkerPhone,
        code: this.form.code,
        date: this.form.date
      })
      this.dialogFormVisible = false
      this.addSuccess()
    },
    handleClick(row) {
      if (row.isEdit) {
        this.$delete(row, 'isEdit')
        this.editSuccess()
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