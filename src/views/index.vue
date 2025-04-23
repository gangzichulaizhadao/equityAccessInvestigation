<template>
  <div class="equityAccess">
    <el-row>
      <el-col :span="8" :offset="8" class="title">
        <h2 style="text-align: center">股权准入排查</h2>
      </el-col>
      <el-col :span="8" :offset="8" class="search">
        <!-- <JsonSelect v-model="value" filterable remote :remote-method="remoteMethod" :options="[]" /> -->
        <el-input v-model="value" placeholder="请输入企业名称/统一社会信用代码" />
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
      <el-col class="imgage">
        <div class="img"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'equityAccessInvestigation',
  data() {
    return {
      value: null
    }
  },
  methods: {
    remoteMethod() {},
    search() {
      this.$router.push(`/equityAccessInvestigation/detail/${this.value}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.equityAccess {
  .title {
    h2 {
      text-align: center;
    }
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgage {
    text-align: center;
    .img {
      margin-top: 50px;
      // width: 100%;
      height: 500px;
      background: url('/images/search_new.png') no-repeat center;
      background-size: contain;
    }
  }
}
</style>
