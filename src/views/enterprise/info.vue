<template>
  <div class="app-container">
    <el-row style="margin-top: 1.5%; margin-bottom: 4%">
      <el-col :span="12">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="centerDialogVisible = true"
          >新增企业信息</el-button
        >
        <!--弹出对话框>-->
        <el-dialog
          title="编辑"
          width="30%"
          :visible.sync="centerDialogVisible"
          center
          :show-close=false
        >
          <span>
            <el-form
              ref="form"
              :model="form"
              label-width="auto"
              label-position="left"
            >
              <el-form-item label="企业名称">
                <el-input v-model="form.name" style="width: 70%" />
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="form.address" style="width: 70%" />
              </el-form-item>
              <el-form-item label="详细经纬">
                <el-input v-model="form.detail_address" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业法人">
                <el-input v-model="form.legal_entity" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业电话">
                <el-input v-model="form.phone_number" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业类型">
                <el-input v-model="form.type" style="width: 70%" />
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleNewCorp()"
              >确 定</el-button
            >
            <el-button @click="handleCancle()">取 消</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-table
      ref="singleTable"
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%; margin-bottom: 6%"
    >
      <el-table-column fixed prop="ID" label="ID" width="80px">
      </el-table-column>
      <el-table-column prop="name" label="企业名称" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.name }}</div>
          <div v-else>
            <el-input v-model="scope.row.name"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="详细地址"
        ><template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.address }}</div>
          <div v-else>
            <el-input v-model="scope.row.address"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="detail_address" label="详细经纬">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.detail_address }}</div>
          <div v-else>
            <el-input v-model="scope.row.detail_address"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="legal_entity" label="企业法人">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.legal_entity }}</div>
          <div v-else>
            <el-input v-model="scope.row.legal_entity"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="phone_number" label="企业电话"
        ><template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.phone_number }}</div>
          <div v-else>
            <el-input v-model="scope.row.phone_number"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="企业类型"
        ><template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.type }}</div>
          <div v-else>
            <el-input v-model="scope.row.type"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >{{ scope.row.isEdit ? "完成" : "编辑" }}
          </el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="text"
            style="color: red"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页未实现
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="footer"
    >
    </el-pagination> -->
  </div>
</template>



<script>
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        detail_address: "",
        legal_entity: "",
        phone_number: "",
        type: "",
      },
      tableData: [
        {
          ID: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          ID: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          ID: "3",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          ID: "4",
          name: "王大虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          ID: "5",
          name: "王二虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          ID: "6",
          name: "王三虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          ID: "7",
          name: "王四虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          ID: "8",
          name: "王五虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          ID: "9",
          name: "王六虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
      currentRow: null,
      centerDialogVisible: false,
      maxID: -1,
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      if (row.isEdit) {
        this.$delete(row, "isEdit");
      } else {
        this.$set(row, "isEdit", true);
      }
      console.log(this.tableData);
    },

    handleDelete(index, rows) {
      this.tableData.splice(index, 1);
      this.$message({
          message: '删除企业成功！',
          type: 'success'
        });
    },
    handleCancle(){
      this.centerDialogVisible = false;
      this.clearForm();
    },
    handleNewCorp() {
      let newCorp = JSON.parse(JSON.stringify(this.form));
      this.getMaxID();
      newCorp.ID = this.maxID+1;
      this.tableData.push(newCorp);
      this.centerDialogVisible = false;
       this.$message({
          message: '添加企业成功！',
          type: 'success'
        });
      this.clearForm();
    },
    getMaxID() {
      // for (tempID in this.tableData.ID) {
      //   if (this.maxID < tempID) {
      //     this.maxID = tempID;
      //   }
      // }

      let idArr = this.tableData.map(el => el.ID);
      this.maxID = Math.max(...idArr);
    },
    clearForm(){
      this.form.name = '';
      this.form.address = '';
      this.form.detail_address = '';
      this.form.legal_entity = '';
      this.form.phone_number = '';
      this.form.type = '';
    }
  },
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
}
</style>
