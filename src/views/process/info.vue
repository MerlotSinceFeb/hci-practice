<template>
  <div class="app-container" style="margin-left:20px">流程信息维护页
    <div class="filter-container" style="margin-top:20px">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible=true">新增流程信息</el-button>
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
       label="名称"
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
       prop="type"
       label="类型"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.type }}</div>
          <div v-else>
            <el-input v-model="scope.row.type"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="typeCode"
       sortable
       label="类型编码"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.typeCode }}</div>
          <div v-else>
            <el-input v-model="scope.row.typeCode"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
       prop="content"
       label="内容"
       align="center">
       <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.content }}</div>
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
      <el-form ref="refForm" :model="form" label-width="80px">
        <el-form-item label="模板名称" :label-width="formLabelWidth" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="模板类型" :label-width="formLabelWidth" prop="type">
          <el-col :span="20">
            <el-input v-model="form.type" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类型编码" :label-width="formLabelWidth" prop="typeCode">
          <el-col :span="20">
            <el-input v-model="form.typeCode" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="模板内容" :label-width="formLabelWidth" prop="content">
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
        name: '模板一',
        type: '自然灾害水旱灾害一级',
        typeCode: '000001',
        content: '处理模板一 测试用'
      }, {
        ID: '2',
        name: '模板二',
        type: '自然灾害水旱灾害一级',
        typeCode: '000002',
        content: '处理模板二 测试用'
      }, {
        ID: '3',
        name: '模板三',
        type: '自然灾害水旱灾害一级',
        typeCode: '000003',
        content: '测试'
      }, {
        ID: '4',
        name: '模板四',
        type: '自然灾害水旱灾害一级',
        typeCode: '000004',
        content: '测试'
      }, {
        ID: '5',
        name: '模板五',
        type: '自然灾害水旱灾害一级',
        typeCode: '000005',
        content: '测试'
      }],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        type: '',
        typeCode: '',
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
        type: this.form.type,
        typeCode: this.form.typeCode,
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
