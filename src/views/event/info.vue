<<<<<<< HEAD
<template>
  <div class="app-container">
    <div style="margin-top:50px">
      <el-row>
        <el-col :span="10" offset="3">
        <div class="block" style="margin:20px">
          <el-tree
            :data="treeData"
            node-key="label"
            ref="eventTree"
            show-checkbox
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            style="width:500px"
            @check="show()">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button-group>
                  <el-button
                    type="text"
                    size="mini"
                    icon="el-icon-plus"
                    @click="() => addInfo(data)"
                    style="margin-right:20px">
                    插入
                  </el-button>
                  <el-popconfirm title="确认删除该节点？" @onConfirm="() => remove(node, data)">
                    <el-button
                      type="text"
                      size="mini"
                      slot="reference"
                      icon="el-icon-delete">
                      删除
                    </el-button>
                  </el-popconfirm>
                </el-button-group>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-card class="box-card" style="margin-top:20px;height:450px">
          <div class="block" align="center">
            <el-row style="margin-top:20px;font-size:18px;font-weight:550">事件信息查看</el-row>
            <el-row style="margin-top:30px;font-size:16px;font-weight:500">
              <el-row>选中灾难信息</el-row>
              <el-input type="textarea" v-model="textarea1"></el-input>
            </el-row>
            <el-row style="margin-top:50px;font-size:16px;font-weight:500">
              <el-row>选中备注</el-row>
              <el-input type="textarea" :rows="6" v-model="textarea2"></el-input>
            </el-row>
          </div>
        </el-card>
      </el-col>
      </el-row>
      <el-row
        <el-col :span="17" offset="3">
          <el-card class="box-card">
            <el-row style="font-size:14px">
              <i class="el-icon-chat-line-round" style="margin-right:10px"/>
              插入节点提示：一级节点为灾害类型，二级节点为灾害名称，三级节点为灾害等级
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="新增节点" :visible.sync="dialogFormVisible" style="width:1200px" @close="dialogFormClosed">
      <el-form ref="refForm" :model="form" label-width="130px">
        <el-form-item label="请输入节点名称" prop="name">
          <el-col :span="22">
            <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="comments">
          <el-col :span="22">
            <el-input v-model="form.comments" auto-complete="off" size="small"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="append(form.insert,form.name,form.comments)">确认信息</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: '',
      treeData: [{
        label: '自然灾害',
        disabled: true,
        children: [{
          label: '水灾',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }, {
            label: '二级',
            comments: '测试备注',
            children: []
          }]
        }, {
          label: '火灾',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }, {
            label: '二级',
            comments: '测试备注',
            children: []
          }]
        }]
      }, {
        label: '事故灾难',
        disabled: true,
        children: [{
          label: '公交车侧翻',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }]
        }, {
          label: '工人猝死',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }]
        }]
      }, {
        label: '公共卫生事件',
        disabled: true,
        children: [{
          label: '矿泉水污染',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }]
        }, {
          label: '流感',
          disabled: true,
          children: [{
            label: '一级',
            comments: '测试备注',
            children: []
          }]
        }]
      }],
      dialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label',
        comments: 'comments'
      },
      form: {
        name: '',
        comments: '',
        insert: []
      }
    }
  },
  methods: {
    // 方法
    dialogFormClosed() {
      this.$refs.refForm.resetFields()
    },
    deleteSuccess() {
      this.$message({
        message: '成功删除节点',
        type: 'success'
      })
    },
    addSuccess() {
      this.$message({
        message: '成功添加节点',
        type: 'success'
      })
    },
    addInfo(data) {
      this.dialogFormVisible = true
      this.form.insert = data
    },
    append(data, formLabel, formComments) {
      var newChild
      if (data.children.length === 0 || !data.children[0].children || data.children[0].children.length === 0) {
        newChild = {
          label: formLabel, comments: formComments, children: []
        }
      } else {
        newChild = {
          label: formLabel, comments: formComments, children: [], disabled: true
        }
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.dialogFormVisible = false
      this.addSuccess()
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.label === data.label)
      children.splice(index, 1)
      this.deleteSuccess()
    },
    show() {
      var showtext = ''
      var showcomments = ''
      var currentNode
      currentNode = this.$refs.eventTree.getCheckedNodes(false, true)
      currentNode.forEach((item) => {
        showtext += item.label
        if (!item.children || item.children.length === 0) {
          showcomments += item.comments
        }
      })
      this.textarea1 = showtext
      this.textarea2 = showcomments
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding-right: 8px;
  }
</style>
