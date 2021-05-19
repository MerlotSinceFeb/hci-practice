<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form  :label-position="left" label-width="auto" :model="queryForm" size="small" text-align-last: justify class="demo-form-inline">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item  label="接报ID:  ">
              <el-input v-model="queryForm.ID" size="small"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label=" 流程编号:">
              <el-input v-model="queryForm.proccessID"  size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="流程创建日期:">
              <el-date-picker
                v-model="queryForm.proccessCreateDate"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态:">
              <el-input v-model="queryForm.status"  size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" >
          <el-col :span="6">
            <el-form-item label="事件名称:">
              <el-input v-model="queryForm.eventName" size="small"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="流程创建者:">
              <el-input v-model="queryForm.proccessCreater" size="small"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后更新日期:">
              <el-date-picker
                v-model="queryForm.lastModifyDate"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item >
              <el-button type="primary" size="small" @click="query">查询</el-button>
              <el-button  size="small" @click="refreshQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="base-option">
      <el-row class="custom-row">
        <el-button type="primary"  @click="addReport = true">新增</el-button>
    </el-row>
    </div>
    <el-table
    v-loading="loading"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="ID"
      label="ID"
      width="40px">
    </el-table-column>
    <el-table-column
      prop="eventName"
      label="事件名称">
    </el-table-column>
    <el-table-column
      prop="EnterpriseID"
      label="风险企业编号">
    </el-table-column>
    <el-table-column
      prop="code"
      label="代码"
      width="50px"
      >
    </el-table-column>
    <el-table-column
      prop="proccessID"
      label="流程编号"
      width="100px"
      >
    </el-table-column>
    <el-table-column
      prop="callMan"
      label="报警人"
      width="70px"
      >
    </el-table-column>
    <el-table-column
      prop="callManPhone"
      label="报警人联系电话">
    </el-table-column>
    <el-table-column
      prop="reportTime"
      label="接报时间">
    </el-table-column>
    <el-table-column
      prop="proccessCreater"
      label="流程创建人">
    </el-table-column>
    <el-table-column
      prop="proccessCreateDate"
      label="流程创建时间">
    </el-table-column>
    <el-table-column
      prop="lastModifyer"
      label="最后更新者编号">
    </el-table-column>
    <el-table-column
      prop="lastModifyDate"
      label="最后更新时间">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="80px"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      prop="option"
      label="操作"
      width="110px"
      align ="middle"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="medium">查看</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button  style="color:red" type="text" size="medium" @click="handleDelete(scope.$index,scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="add-window">
  <el-dialog
  title="新增接报"
  :visible.sync="addReport"
  width="50%">
<el-form     :rules="rules"  :model="newReport" label-width="auto">
  <el-form-item label="事件名称:" prop="eventName">
    <el-input v-model="newReport.eventName" ></el-input>
  </el-form-item>
    <el-form-item label="风险企业ID:" prop="EnterpriseID">
  <el-autocomplete
  v-model="newReport.EnterpriseID"
  :fetch-suggestions="querySearchAsync1"
  placeholder="请输入内容"
></el-autocomplete>
  </el-form-item>
    <el-form-item label="代码:" prop="code">
    <el-autocomplete
  v-model="newReport.code"
  :fetch-suggestions="querySearchAsync2"
  placeholder="请输入内容"
></el-autocomplete>
  </el-form-item>
    <el-form-item label="流程ID:" prop="proccessID">
    <el-autocomplete
  v-model="newReport.proccessID"
  :fetch-suggestions="querySearchAsync3"
  placeholder="请输入内容"
></el-autocomplete>
  </el-form-item>
    <el-form-item label="报警人:" prop="callMan">
    <el-input v-model="newReport.callMan" ></el-input>
  </el-form-item>
    <el-form-item label="报警人联系方式:" prop="callManPhone">
    <el-input v-model="newReport.callManPhone" ></el-input>
  </el-form-item>
    <el-form-item label="接报日期:"  prop="reportTime">
    <el-date-picker
      v-model="newReport.reportTime"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
  </el-form-item>
  <el-divider></el-divider>
  <el-form-item label="操作人员:">
    <span>{{ UserInfo.username }}</span>
  </el-form-item>
  <el-form-item label="创建时间:">
    <span>{{ currentTime }}</span>
            <el-divider direction="vertical"></el-divider>
    <el-button type="primary" @click="generateTime">获取时间</el-button>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitNewReport">确 定</el-button>
    <el-button @click="addReport = false">取 消</el-button>
  </span>
</el-dialog>
  </div>

<el-dialog title="接报信息" :visible.sync="dialogFormVisible">
<el-form       :model="reportinfo" label-width="auto">
  <el-form-item label="事件名称:" prop="eventName">
    <span>{{reportinfo.eventName}}</span>
  </el-form-item>
    <el-form-item label="风险企业ID:" prop="EnterpriseID">
    <span>{{reportinfo.EnterpriseID}}</span>
  </el-form-item>
    <el-form-item label="代码:" prop="code">
    <span>{{reportinfo.code}}</span>
  </el-form-item>
    <el-form-item label="流程ID:" prop="proccessID">
    <span>{{reportinfo.proccessID}}</span>
  </el-form-item>
    <el-form-item label="报警人:" prop="callMan">
    <span>{{reportinfo.callMan}}</span>
  </el-form-item>
    <el-form-item label="报警人联系方式:" prop="callManPhone">
    <span>{{reportinfo.callManPhone}}</span>
  </el-form-item>
    <el-form-item label="接报日期:"  prop="reportTime">
    <span>{{reportinfo.reportTime}}</span>
  </el-form-item>
  <el-divider></el-divider>
  <el-form-item label="操作人员:">
    <span>{{ UserInfo.username }}</span>
  </el-form-item>
  <el-form-item label="创建时间:">
    <span>{{reportinfo.proccessCreateDate}}</span>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table';
export default {
  data() {
    return {
      suggest1: [],
      suggest2: [],
      suggest3: [],
      dialogFormVisible: false,
      reportinfo: {},
      loading: true,
      currentTime: "",
      UserInfo: {
        username: "李四"
      },
      addReport: false,
      queryForm: {
        eventName: '',
        ID: '',
        proccessID: '',
        proccessCreateDate: '',
        lastModifyDate: '',
        proccessCreater: ''
      },
      newReport: {
        eventName: '',
        EnterpriseID: '',
        code: '',
        proccessID: '',
        callMan: '',
        reportTime: '',
        callManPhone: ''
      },
      rules: {
          eventName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max:16, message: '长度在16 个字符以内', trigger: 'blur' }
        ],
        EnterpriseID: [
          { required: true,  message: '请输入合法的企业ID', trigger: 'blur' }
        ],
        code: [
          { required: true,  message: '请输入合法的编码', trigger: 'blur' }
        ],
        proccessID: [
          { required: true, message: '请输入合法的流程ID', trigger: 'blur' }
        ],
        callMan: [
          { required: true, message: '请输入报警人', trigger: 'blur' },
        ],
        reportTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        callManPhone: [
          { required: true, message: '请输入报警人联系方式', trigger: 'blur' },
          { min: 1, max:16, message: '请输入合法的联系方式', trigger: 'blur' }
          ]},
      tableData: [{
        ID: '1',
        eventName: '事件1',
        EnterpriseID: '1',
        code: '001',
        proccessID: '1',
        callMan: '甲',
        callManPhone: '13756474658',
        reportTime: '2016-9-20',
        proccessCreater: '办事员A',
        proccessCreateDate: '2016-9-21',
        lastModifyer: '办事员A',
        lastModifyDate: '2016-9-21',
        status: '审批中',
      }]
    }
  },
  created(){
    this.getList();
    this.getSuggestion();
  },
methods: {
  generateTime(){
    this.currentTime=this.getFormatDate();
  },
  getFormatDate() {
	var date = new Date();
	var seperator = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var nowDate = date.getDate();
	if(month >=1 && month <=9) {
		month = "0" + month;
	}
	if(nowDate >=0 && nowDate <=9) {
		nowDate = "0" + nowDate;
	}
	var newDate = year + seperator + month + seperator + nowDate;
	return newDate;
},
  getNewID(){
    let newID = 0;
    for(var i = 0;i < this.tableData.length;i++){
      newID = Math.max(parseInt(this.tableData[i].ID),newID);
    }
    return newID+1;
  },
  submitNewReport(){

    this.tableData.push({
        ID: this.getNewID(),
        eventName: this.newReport.eventName,
        EnterpriseID: this.newReport.EnterpriseID,
        code: this.newReport.code,
        proccessID: this.newReport.proccessID,
        callMan: this.newReport.callMan,
        callManPhone: this.newReport.callManPhone,
        reportTime: this.newReport.reportTime,
        proccessCreater: this.UserInfo.username,
        proccessCreateDate: this.currentTime,
        lastModifyer: this.UserInfo.username,
        lastModifyDate: this.currentTime,
        status: '审批中',
    });
    this.newReportRefresh();
    this.$message({
          showClose: true,
          message: '接报创建成功',
          type: 'success'
        });
    this.addReport = false;
  },
  newReportRefresh(){
    this.newReport= {
        eventName: '',
        EnterpriseID: '',
        code: '',
        proccessID: '',
        callMan: '',
        callManPhone: '',
        reportTime: ''
      }
    this.currentTime="";
  },
  randomList(num){
    this.tableData=[];
    for( var i = 0; i < num; i++){
      this.tableData.push({
        ID: this.getNewID(),
        eventName: '接报事件' + Math.round(Math.random()*80+20),
        EnterpriseID: Math.round(Math.random()*80+20),
        code: Math.round(Math.random()*80+20),
        proccessID: Math.round(Math.random()*80+20),
        callMan: '市民'+Math.round(Math.random()*10),
        callManPhone: '137564746'+Math.round(Math.random()*80+19),
        reportTime: '2016-9-20',
        proccessCreater: this.UserInfo.username,
        proccessCreateDate: '2016-9-21',
        lastModifyer: this.UserInfo.username,
        lastModifyDate: '2016-9-21',
        status: '审批中',
      });
    }
  },
  getList(){
    this.loading=true;
    this.randomList(10);
    this.loading=false;
  },
  query(){
    this.loading=true;
    this.randomList(5);
    this.loading=false;
  },
  refreshQuery(){
    this.queryForm= {
        eventName: '',
        ID: '',
        proccessID: '',
        proccessCreateDate: '',
        lastModifyDate: '',
        proccessCreater: ''
      }
  },
  handleClick(index,row){
    this.dialogFormVisible = true
    this.reportinfo=this.tableData[index];
    console.log(index,row);
  },
handleDelete(index,row){
          this.$confirm('该操作将删除接报', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });

  },  
getSuggestion(){
  for(var i = 0; i < 100;i++){
    this.suggest1.push({
      "value":i+''
    });
        this.suggest2.push({
      "value":i+''
    });
        this.suggest3.push({
      "value":i+''
    });
  }
},
      querySearchAsync1(queryString, cb) {
        var suggestions = this.suggest1;
        var results = queryString ? suggestions.filter(this.createStateFilter(queryString)) : suggestions;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000* Math.random());
      },
          querySearchAsync2(queryString, cb) {
        var suggestions = this.suggest2;
        var results = queryString ? suggestions.filter(this.createStateFilter(queryString)) : suggestions;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000* Math.random());
      },
          querySearchAsync3(queryString, cb) {
        var suggestions = this.suggest3;
        var results = queryString ? suggestions.filter(this.createStateFilter(queryString)) : suggestions;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000* Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
}}
</script>
<style>
</style>
