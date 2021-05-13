<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form  :label-position="left" label-width="auto" :model="queryFrom" size="small" text-align-last: justify class="demo-form-inline">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item  label="接报ID:  ">
              <el-input v-model="queryForm.ID" size="small"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label=" 流程编号:">
              <el-input v-model="queryForm.eventName"  size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="流程创建日期:">
              <el-date-picker
                v-model="value1"
                type="date"
                size="small"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态:">
              <el-input v-model="queryForm.eventName"  size="small" placeholder="请输入"></el-input>
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
              <el-input v-model="queryForm.eventName" size="small"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后更新日期:">
              <el-date-picker
                v-model="value1"
                type="date"
                size="small"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item >
              <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
              <el-button  size="small" @click="onSubmit">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="ID"
      label="ID">
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
      label="代码">
    </el-table-column>
    <el-table-column
      prop="proccessID"
      label="流程编号">
    </el-table-column>
    <el-table-column
      prop="callMan"
      label="报警人">
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
      label="状态">
    </el-table-column>
    <el-table-column
      fixed="right"
      prop="option"
      label="操作">
    </el-table-column>

  </el-table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      queryForm: {
        eventName: '',
        region: ''
      },
      tableData: [{
        ID: '1',
        eventName: '事件1',
        EnterpriseID: '1',
        code: '001',
        proccessID: '1',
        callMan: '甲',
        callManPhone: '13756474658',
        reportTime: '2016-9-21',
        proccessCreater: '办事员A',
        proccessCreateDate: '2016-9-21',
        lastModifyer: '办事员A',
        lastModifyDate: '2016-9-21',
        status: '审批中',
        option: ''
      }]
    }
  }
}
</script>
<style>
</style>
