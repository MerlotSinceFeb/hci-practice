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
          :show-close="false"
        >
          <span>
            <el-form
              ref="cropForm"
              :model="form"
              label-width="auto"
              label-position="left"
              :rules="rules"
            >
              <el-form-item label="企业名称" prop="name">
                <el-input v-model="form.name" style="width: 70%" />
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" style="width: 70%" />
              </el-form-item>
              <el-form-item label="详细经纬">
                <el-input v-model="form.detail_address" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业法人" prop="legal_entity">
                <el-input v-model="form.legal_entity" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业电话" prop="phone_number">
                <el-input v-model="form.phone_number" style="width: 70%" />
              </el-form-item>
              <el-form-item label="企业类型" prop="type">
                <el-input v-model="form.type" style="width: 70%" />
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleNewCorp()">确 定</el-button>
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
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="text"
              style="color: red"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
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
          name: "东北大学",
          address: "辽宁省沈阳市和平区文化路3巷11号",
          detail_address: "123.424477,41.770971",
          legal_entity: "冯夏庭",
          phone_number: "024-83687392",
          type: "公办学校",
        },
        {
          ID: "2",
          name: "东软睿道",
          address: "辽宁省沈阳市浑南区新秀街2号东软软件园A9座",
          detail_address: "123.446149,41.71128",
          legal_entity: "李印杲",
          phone_number: "400-656-3385",
          type: "私营企业",
        },
        {
          ID: "3",
          name: "晋煤集团",
          address: "山西省晋城市城区北石店",
          detail_address: "112.909482,35.551571",
          legal_entity: "宣宏斌",
          phone_number: "0356-3664145",
          type: "公办企业",
        },
        {
          ID: "4",
          name: "鞍山钢铁集团有限公司",
          address: "鞍山市铁西区启明街道环钢路1号",
          detail_address: "122.986744,41.126644",
          legal_entity: "王义栋",
          phone_number: "0412-6733309",
          type: "公办企业",
        },
        {
          ID: "5",
          name: "渤海钻探",
          address: "天津经济技术开发区第二大街83号",
          detail_address: "117.725755,39.027752",
          legal_entity: "刘光木",
          phone_number: "022-25281919",
          type: "公办企业",
        },
        {
          ID: "6",
          name: "长城特殊钢有限公司",
          address: "四川省江油市江东路",
          detail_address: "104.767539,31.769822",
          legal_entity: "李赤波",
          phone_number: "0816-3653409",
          type: "公办企业",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入企业地址", trigger: "blur" },
        ],
        legal_entity: [
          { required: true, message: "请输入企业法人", trigger: "blur" },
        ],
        phone_number: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入企业类型", trigger: "blur" }],
      },
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
        message: "删除企业成功！",
        type: "success",
      });
    },
    handleCancle() {
      this.centerDialogVisible = false;
      this.clearForm();
    },
    handleNewCorp() {
      this.$refs.cropForm.validate((valid) => {
        if (valid) {
          let newCorp = JSON.parse(JSON.stringify(this.form));
          console.log("fuck")
          this.getMaxID();
          newCorp.ID = this.maxID + 1;
          this.tableData.push(newCorp);
          this.centerDialogVisible = false;
          this.clearForm();
          this.$message({
            message: "新增企业成功！",
            type: "success",
          });
        } else {
          this.$message({
            message: "提交失败，请填写必填项！",
          });
          return false;
        }
      });
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
      this.form.name = "";
      this.form.address = "";
      this.form.detail_address = "";
      this.form.legal_entity = "";
      this.form.phone_number = "";
      this.form.type = "";
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
