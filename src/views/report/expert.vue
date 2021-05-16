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
      </template>
    </el-table-column>
  </el-table>
  <div class="judge-window">
  <el-dialog
  title="接报审批"
  :visible.sync="judgeReport"
  width="50%">
  <el-form    label-width="auto">
  <el-form-item label="事件名称:">
    <span>{{ judgeReportForm.eventName }}</span>
  </el-form-item>
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :color="activity.color"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
      <el-form-item label="审批内容:">
  <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
  </el-form-item>
  <el-divider></el-divider>
  <el-form-item label="操作人员:">
    <span>{{ UserInfo.username }}</span>
  </el-form-item>
  <el-form-item label="审批时间:">
    <span>{{ currentTime }}</span>
            <el-divider direction="vertical"></el-divider>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="judgeReportConfirm">确 定</el-button>
    <el-button type="danger" @click="judgeReportDeny">驳回</el-button>
    <el-button @click="judgeReportCancel">取 消</el-button>
  </span>
</el-dialog>

  </div>
  </div>
</template>

<script>
import { getList } from '@/api/table';
export default {
  data() {
    return {
      textarea: '',
      currentIndex: '',
      judgeReportForm: {},
      loading: true,
      currentTime: "",
      UserInfo: {
        username: "赵六"
      },
      judgeReport: false,
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
      }],
      activities: [{
          content: '步骤一',
          color: '#0bbd87',
          timestamp: '步骤一的具体内容'
        }, {
          content: '步骤二',
          timestamp: '步骤一的具体内容'
        }, {
          content: '步骤三',
          timestamp: '步骤一的具体内容'
        }]
    }
  },
  created(){
    this.getList();
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
        proccessCreater: '王五',
        proccessCreateDate: this.currentTime,
        lastModifyer: '王五',
        lastModifyDate: this.currentTime,
        status: '专家介入',
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
        proccessCreater: '王五',
        proccessCreateDate: '2016-9-21',
        lastModifyer: '王五',
        lastModifyDate: '2016-9-21',
        status: '专家介入',
      });
    }
  },
  randomActivity(){
    this.activities=[];
    var num =Math.round(Math.random()*5+2);
    var right = Math.round(num/2);
    for(var i=0;i<num;i++){
      this.activities.push(
        {
          content: '步骤'+i,
          // color: '#0bbd87',
          timestamp: '步骤'+i+'的具体内容'
        }
      );
      if(i==right){
        this.activities[i].color='#0bbd87';
      }
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
    console.log(index,row);
    if (this.tableData[index].status!='专家介入'){
        this.action=true;
    }
    else{
    this.action=false;
    }
    this.currentIndex = index;
    this.generateTime();
    this.judgeReportForm=this.tableData[index];
    this.judgeReport=true;
    this.randomActivity();
  },
  handleDelete(index,row){
    if(this.tableData[index].status=='已通过'){
    this.tableData[index].status='紧急事件';
        this.$message({
          showClose: true,
          message: this.tableData[index].eventName+'已经设为紧急事件',
          type: 'warning'
        });}
    else if(this.tableData[index].status=='紧急事件'){
          this.$message({
          showClose: true,
          message: '操作失败,'+this.tableData[index].eventName+'已是紧急事件',
          type: 'error'
        });
    }
    else{
      this.$message({
          showClose: true,
          message: "接报未通过,无法设为紧急事件",
          type: 'warning'
        });
      }
  },
  judgeReportConfirm(){
    this.$confirm('接报流程将通过', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.judgeReport=false;
    this.tableData[this.currentIndex].status="已通过";
    this.tableData[this.currentIndex].lastModifyDate=this.currentTime;
    this.tableData[this.currentIndex].lastModifyer=this.UserInfo.username;
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
  judgeReportCancel(){
    this.judgeReport=false;
  },
  judgeReportDeny(){
        this.$confirm('接报流程将被驳回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    this.judgeReport=false;
        this.tableData[this.currentIndex].status="已驳回";
            this.tableData[this.currentIndex].lastModifyDate=this.currentTime;
    this.tableData[this.currentIndex].lastModifyer=this.UserInfo.username;
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
  expert(){
            this.$confirm('将申请专家介入', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    this.judgeReport=false;
    this.tableData[this.currentIndex].status="专家介入";
        this.tableData[this.currentIndex].lastModifyDate=this.currentTime;
    this.tableData[this.currentIndex].lastModifyer=this.UserInfo.username;
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


}}
</script>
<style>
</style>