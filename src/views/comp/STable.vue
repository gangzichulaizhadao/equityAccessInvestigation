<template>
  <section>
    <div v-for="(item, i) in lists" :key="i" class="table">
      <!-- 表格顶部 -->
      <div class="table-title">
        <span class="table-title-left">{{ item.title }}</span>
        <div class="table-title-right" v-if="item.export">
          <el-button type="primary" :loading="item.loading" size="small" @click="exportFn(item)">
            导出
          </el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table-content">
        <JsonTable ref="tableRef" v-bind="item.tableAttrs">
          <el-table-column slot="detail" align="center" label="详情">
            <template slot-scope="{ row }">
              <span class="detail" @click="handleDetail(row, item)">
                查看详情
              </span>
            </template>
          </el-table-column>
        </JsonTable>
        <pagination v-if="item.pageAttrs" v-bind="item.pageAttrs" v-on="item.pageEvents" />
      </div>
    </div>
  </section>
</template>

<script>
import { creditRisks, investmentSituation } from '../conf/tableConf'

const map = {
  3: 'creditRisks', // 信用风险
  6: 'investmentSituation' // 投资情况
}

export default {
  name: 'STable',
  props: {
    activeTab: {
      type: String,
      default: '1'
    }
  },
  computed: {
    lists() {
      return this[map[this.activeTab]]
    }
  },
  data() {
    return {
      creditRisks,
      investmentSituation
    }
  },
  watch: {
    activeTab: {
      async handler(val) {},
      immediate: true
    }
  },
  // beforeCreate() {
  //   initTimeAndPage()
  // },
  created() {
    console.log(11111, 11111)
  },
  methods: {
    exportFn(item) {
      item.loading = true
      setTimeout(() => {
        item.loading = false
      }, 2000)
    },
    //
    tableClassName(item) {
      return {
        negativeRisk:
          (this.activeTab === '3' || this.activeTab === '6') && item.tableAttrs.data.length >= 10
      }
    },
    handleDetail() {}
  }
}
</script>

<style lang="scss" scoped>
section {
  .table {
    margin-bottom: 30px;
    &-title {
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 2px solid #41a3ff;
      &-left {
        padding-top: 6px;
        color: #41a3ff;
        font-size: 16px;
      }
      &-right {
        color: #333;
        font-size: 16px;
        span {
          vertical-align: middle;
        }
        .el-select {
          width: 95px;
          ::v-deep .el-input {
            font-size: 15px;
          }
        }
      }
    }
    &-content {
      padding: 15px;
      background-color: #f0f2f5;
      .el-table.negativeRisk {
        ::v-deep .el-table__body-wrapper {
          padding-bottom: 42px;
        }
      }
      .pagination-container {
        padding: 10px 20px 10px 0;
      }
      .detail {
        color: green;
        cursor: pointer;
      }
    }
  }
}
</style>
