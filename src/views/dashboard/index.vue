<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-col :span="16">
              <el-image :src="infoUrl" />
            </el-col>
            <el-col :span="7" :offset="1">
              <div style="margin-top: 20px">
                <el-row class="middle-margin-bottom">
                  <div style="font-size: 20px">
                    姓名：{{ name }}
                  </div>
                </el-row>
                <el-row class="middle-margin-bottom">
                  <div style="font-size: 20px">
                    年龄：{{ age }}
                  </div>
                </el-row>
                <el-row class="middle-margin-bottom">
                  <div style="font-size: 20px">
                    性别：{{ sex }}
                  </div>
                </el-row>
                <el-row class="middle-margin-bottom">
                  <div style="font-size: 20px">
                    角色：{{ userType }}
                  </div>
                </el-row>
                <el-row class="middle-margin-bottom">
                  <div style="font-size: 20px">
                    介绍：{{ introduction }}
                  </div>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import infoImg from '@/assets/img/info.png'

export default {
  data() {
    return {
      infoUrl: infoImg
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'userType',
      'age',
      'sex',
      'introduction'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.middle-margin-bottom {
  margin-bottom: 20px;
}
</style>
