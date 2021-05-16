<template>
  <div class="app-container">
    <el-row style="margin-top: 1.5%; margin-bottom: 4%">
      <el-col :span="12">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="centerDialogVisible = true"
          style="margin-right: 4%"
          >新增城市信息</el-button
        >
        <!--弹出城市对话框>-->
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
              :model="cityForm"
              label-width="auto"
              label-position="left"
            >
              <el-form-item label="城市名称">
                <el-input v-model="cityForm.name" style="width: 70%" />
              </el-form-item>
              <el-form-item label="所属省份">
                <el-input v-model="cityForm.province" style="width: 70%" />
              </el-form-item>
              <el-form-item label="救援人数">
                <el-input
                  v-model="cityForm.people"
                  style="width: 70%"
                />
              </el-form-item>
              <el-form-item label="救援车辆">
                <el-input v-model="cityForm.cars" style="width: 70%" />
              </el-form-item>
              <el-form-item label="交通情况">
                <el-input v-model="cityForm.traffic" style="width: 70%" />
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleNewCity">确 定</el-button>
            <el-button @click="handleCancle">取 消</el-button>
          </span>
        </el-dialog>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="routeDialogVisible = true"
          >新增交通线路</el-button
        >
        <!--弹出交通线路对话框>-->
        <el-dialog
          title="编辑"
          width="30%"
          :visible.sync="routeDialogVisible"
          center
          :show-close=false
        >
          <span>
            <el-form
              ref="form"
              :model="routeForm"
              label-width="auto"
              label-position="left"
            >
              <el-form-item label="线路名称">
                <el-input v-model="routeForm.name" style="width: 70%" />
              </el-form-item>
              <el-form-item label="线路起点">
                <el-input v-model="routeForm.start" style="width: 70%" />
              </el-form-item>
              <el-form-item label="线路终点">
                <el-input v-model="routeForm.end" style="width: 70%" />
              </el-form-item>
              <el-form-item label="线路长度">
                <el-input v-model="routeForm.extent" style="width: 70%" />
              </el-form-item>
              <el-form-item label="更多信息">
                <el-input type="textarea" :rows="3" v-model="routeForm.extra" style="width: 70%" />
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleNewRoute"
              >确 定</el-button
            >
            <el-button @click="handleCancle">取 消</el-button>
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
      height="100%"
      style="width: 100%; margin-bottom: 6%"
    >
      <el-table-column fixed prop="ID" label="ID" width="80px">
      </el-table-column>
      <el-table-column prop="name" label="城市名称" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.name }}</div>
          <div v-else>
            <el-input v-model="scope.row.name"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="所属省份"
        ><template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.province }}</div>
          <div v-else>
            <el-input v-model="scope.row.province"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="people" label="救援人数">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.people }}</div>
          <div v-else>
            <el-input v-model="scope.row.people"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="cars" label="救援车辆">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.cars }}</div>
          <div v-else>
            <el-input v-model="scope.row.cars"></el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="traffic" label="交通情况"
        ><template slot-scope="scope">
          <div v-if="!scope.row.isEdit">{{ scope.row.traffic }}</div>
          <div v-else>
            <el-input v-model="scope.row.traffic"></el-input>
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
      cityForm: {
        name: "",
        province: "",
        people: "",
        cars: "",
        traffic: "",
        type: "",
      },
      routeForm: {
        name: "",
        start: "",
        end: "",
        extend: "",
        extra: "",
      },
      tableData: [
        {
          ID: "1",
          name: "沈阳",
          province: "辽宁",
          people: "100",
          cars:"200",
          traffic:"通畅",
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
      routeDialogVisible: false,
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
        message: "删除城市成功！",
        type: "success",
      });
    },
    handleCancle() {
      this.routeDialogVisible = false;
      this.centerDialogVisible = false;
      this.clearForm();
    },
    handleNewCity() {
      let newCity = JSON.parse(JSON.stringify(this.cityForm));
      this.getMaxID();
      newCity.ID = this.maxID + 1;
      this.tableData.push(newCity);
      this.centerDialogVisible = false;
      this.$message({
        message: "添加城市成功！",
        type: "success",
      });
      this.clearForm();
    },
    handleNewRoute(){
      this.routeDialogVisible = false;
      this.$message({
        message: "添加路线成功！",
        type: "success",
      });
      this.clearForm();
    },
    getMaxID() {
      // for (tempID in this.tableData.ID) {
      //   if (this.maxID < tempID) {
      //     this.maxID = tempID;
      //   }
      // }

      let idArr = this.tableData.map((el) => el.ID);
      this.maxID = Math.max(...idArr);
    },
    clearForm() {
      this.cityForm.name = "";
      this.cityForm.province = "";
      this.cityForm.people = "";
      this.cityForm.cars = "";
      this.cityForm.traffic = "";
      this.routeForm.name = "";
      this.routeForm.start = "";
      this.routeForm.end = "";
      this.routeForm.extend = "";
      this.routeForm.extra = "";
    },
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
