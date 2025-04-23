<template>
  <section>
    <p>{{ fixedWord }}</p>
    <nav>基础指标</nav>
    <div class="table-content">
      <JsonTable v-bind="basicIndicators" />
    </div>
    <nav>财务指标</nav>
    <div class="table-content" style="margin-bottom: 30px">
      <el-table v-bind="financialIndex" style="margin-bottom: 30px">
        <el-table-column
          prop="indicatorName"
          label="指标名称"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          v-for="item in financialIndex.columns"
          :key="item.label"
          :label="item.label"
          align="center"
        >
          <el-table-column :prop="item.prop1" label="排名" align="center" />
          <el-table-column :prop="item.prop2" label="四分位排名" align="center" />
        </el-table-column>
      </el-table>
      <el-row :gutter="10">
        <el-col v-for="(item, i) in 3" :key="i" :span="8">
          <ItemWrap :title="chartOptions[i]['name']">
            <Chart :option="chartOptions[i]" />
          </ItemWrap>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { fixedWord } from '../conf/const'
import { basicIndicators, financialIndex } from '../conf/tableConf'
import { basicIndicatorsMap, financialIndexMap } from '../conf/tableData'
import ItemWrap from '@/page/bigScreen/comp/detail/ItemWrap.vue'
import { chartOptions } from '@/page/bigScreen/comp/detail/chartOptions.js'

export default {
  name: 'IndustryAnalysis',
  components: { ItemWrap },
  data() {
    return {
      fixedWord,
      basicIndicators, // 基础指标
      financialIndex, // 财务指标
      chartOptions
    }
  },
  beforeCreate() {
    new Array(17).fill(0).forEach((item, i) =>
      basicIndicators.data.push({
        indicatorName: basicIndicatorsMap[i],
        a: 'XXX',
        b: 'XXX',
        c: 'XXX'
      })
    )
    new Array(7).fill(0).forEach((item, i) =>
      financialIndex.data.push({
        indicatorName: financialIndexMap[i],
        curYRanking: '--',
        curYQuartileRanking: '--',
        lastYRanking: '--',
        lastYQuartileRanking: '--',
        last2YRanking: '--',
        last2YQuartileRanking: '--',
        last3YRanking: '--',
        last3YQuartileRanking: '--',
        last4YRanking: '--',
        last4YQuartileRanking: '--'
      })
    )
  },
  created() {
    console.log('同业分析')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
section {
  p {
    margin: 10px 0;
  }
  nav {
    height: 50px;
    line-height: 50px;
    margin: 10px 0;
    background-color: #f2f2f2;
    color: #000;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
  .table-content {
    padding: 15px;
    background-color: #f0f2f5;
    .el-row {
      height: 400px;
      background-color: #171515;
      .el-col {
        height: 100%;
        padding: 20px !important;
      }
    }
  }
}
</style>
