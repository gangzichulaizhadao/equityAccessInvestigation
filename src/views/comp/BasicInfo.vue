<template>
  <section>
    <div v-for="(item, i) in basicInfo" :key="i" class="table">
      <!-- 表格顶部 -->
      <div class="table-title">
        <span class="table-title-left">{{ item.title }}</span>
      </div>
      <!-- 表格 -->
      <div class="table-content">
        <JsonTable v-bind="item.tableAttrs" />
      </div>
    </div>
  </section>
</template>

<script>
import { basicInfo } from '../conf/tableConf'
import { factoryFn, registrationInfoMap, shellCompanyMap } from '../conf/tableData'

export default {
  name: 'BasicInfo',
  data() {
    return {
      basicInfo
    }
  },
  created() {
    console.log('基本信息')
    const list = factoryFn({}, registrationInfoMap, 2)
    const list1 = factoryFn({}, shellCompanyMap, 2)
    this.basicInfo[0].tableAttrs.data = list
    this.basicInfo[1].tableAttrs.data = list1
  },
  methods: {}
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
    }
    &-content {
      padding: 15px;
      background-color: #f0f2f5;
    }
  }
}
</style>
