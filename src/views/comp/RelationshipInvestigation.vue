<template>
  <div class="relationship-chart">
    <nav class="relationship-chart-nav">
      <div class="relationship-chart-nav-title">出资人关系挖掘</div>
      <!-- 已选被投企业 -->
      <div class="relationship-chart-nav-selectEnterprise" v-if="!!params.enterpriseName">
        <span class="tip">已选被投企业</span>
        <el-tag closable @close="closeTag">{{ params.enterpriseName }}</el-tag>
      </div>
      <!-- 已选其他出资人 -->
      <div class="relationship-chart-nav-selectInvestor" v-if="params.investorList.length > 0">
        <span class="tip">已选其他出资人</span>
        <el-tag
          v-for="(o, i) in params.investorList"
          :key="i"
          disable-transitions
          closable
          @close="closeTag(o)"
          >{{ o.fullName }}</el-tag
        >
      </div>
      <el-button type="primary" @click="handleAddInvestedCompany">添加被投企业</el-button>
      <el-button type="primary" @click="handleAddInvestor">添加其他出资人</el-button>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </nav>
    <main class="relationship-chart-main">
      <aside class="relationship-chart-main-aside">
        <RelationshipList />
      </aside>
      <section class="relationship-chart-main-section">
        <RelationshipChart />
      </section>
    </main>
    <EnterpriseDialog
      ref="EnterpriseDialogRef"
      @addEnterprise="name => (params.enterpriseName = name)"
    />
    <InvestorDialog ref="InvestorDialogRef" @investorList="list => (params.investorList = list)" />
  </div>
</template>

<script>
import RelationshipChart from './comp/RelationshipChart.vue'
import RelationshipList from './comp/RelationshipList.vue'
import EnterpriseDialog from './comp/EnterpriseDialog.vue'
import InvestorDialog from './comp/InvestorDialog.vue'

export default {
  name: 'RelationshipInvestigation',
  components: { RelationshipChart, RelationshipList, EnterpriseDialog, InvestorDialog },
  data() {
    return {
      params: {
        enterpriseName: '',
        investorList: []
      }
    }
  },
  created() {
    console.log('关系排查')
  },
  methods: {
    handleAddInvestedCompany() {
      this.$refs.EnterpriseDialogRef.openDialog()
    },
    handleAddInvestor() {
      this.$refs.InvestorDialogRef.openDialog([...this.params.investorList])
    },
    handleSearch() {
      console.log('搜索', this.params)
    },
    closeTag(o) {
      if (o.fullName && typeof o === 'object') {
        const i = this.params.investorList.findIndex(item => item.fullName === o.fullName)
        this.params.investorList.splice(i, 1)
      } else {
        this.params.enterpriseName = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.relationship-chart {
  height: 100%;
  width: 100%;
  margin-bottom: 15px;
  &-nav {
    padding: 0 0 10px 5px;
    margin-bottom: 10px;
    border-bottom: 2px solid #66b1ff;
    &-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    &-selectInvestor {
      .el-tag {
        margin-right: 10px;
        // color: #fff;
        // border: 0;
      }
    }
    &-selectEnterprise,
    &-selectInvestor {
      margin-bottom: 6px;
      height: 38px;
      line-height: 38px;
      .tip {
        margin-right: 10px;
        color: #999;
        font-size: 14px;
      }
    }
  }
  &-main {
    display: flex;
    width: 100%;
    height: 700px;
    border-right: 1px solid #e8e8e8;
    &-aside {
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 100%;
      border: 1px solid #e8e8e8;
      overflow: hidden;
    }
    &-section {
      display: flex;
      flex-direction: column;
      flex: 1;
      border-bottom: 1px solid #e8e8e8;
      overflow: hidden;
    }
  }
}
</style>
