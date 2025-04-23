<template>
  <div class="enterpriseDetail">
    <header>
      <h1>企业简介{{ $route.params.id }}</h1>
      <p>{{ companyProfile }}</p>
    </header>
    <main>
      <el-tabs v-model="activeTab">
        <template v-for="(tab, i) in tabs">
          <el-tab-pane :key="i" :label="tab" :name="`${i + 1}`" />
        </template>
      </el-tabs>
      <keep-alive :include="cacheComps">
        <component :is="currentView" :activeTab="activeTab" />
      </keep-alive>
    </main>
  </div>
</template>

<script>
import { companyProfile, tabs, cacheComps, tabCompMAP } from './conf/const'

export default {
  name: 'equityAccessInvestigation-detail',
  components: {
    BasicInfo: () => import('./comp/BasicInfo.vue'),
    STable: () => import('./comp/STable.vue'), // CreditRisks  InvestmentSituation
    IndustryAnalysis: () => import('./comp/IndustryAnalysis.vue'),
    GroupOrganizationChart: () => import('./comp/GroupOrganizationChart.vue'),
    EquityStructureChart: () => import('./comp/EquityStructureChart.vue'),
    RelationshipInvestigation: () => import('./comp/RelationshipInvestigation.vue')
  },
  data() {
    return {
      companyProfile,
      activeTab: '1',
      tabs,
      cacheComps
    }
  },
  computed: {
    currentView() {
      return tabCompMAP[this.activeTab]
    }
  },
  created() {
    console.log(this.$route.name)
  }
}
</script>

<style lang="scss" scoped>
.enterpriseDetail {
  width: 100%;
  height: 100%;
  padding: 8px 25px 0 25px;
  background-color: #fff;
  overflow-y: scroll;
  header {
    h1 {
      color: #333;
      font-size: 22px;
      margin: 0;
      padding-left: 20px;
    }
    p {
      margin: 0;
      padding: 10px 20px;
      font-size: 16px;
      line-height: 1.6;
      text-indent: 2em;
    }
  }
  main {
    padding: 10px 20px;
    background-color: #fff;
    overflow-y: auto;
    .el-tabs {
      ::v-deep .el-tabs__item {
        font-size: 16px;
      }
    }
  }
}
</style>
