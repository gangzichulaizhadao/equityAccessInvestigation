<template>
  <div class="transfer">
    <!-- left -->
    <section class="transfer-pane">
      <nav class="transfer-pane__tools">
        <el-input placeholder="输入企业名称" v-model="enterpriseName" @input.native="searchFn" />
      </nav>
      <main class="transfer-pane__body" v-loading="loading">
        <div v-for="(o, i) in searchList" :key="i" class="search-item" :class="selected(o)">
          <span :title="o.fullName">{{ o.fullName }}</span>
          <i class="el-icon-circle-plus-outline" @click="add(o)"></i>
        </div>
      </main>
    </section>
    <!-- right -->
    <section class="transfer-pane">
      <nav class="transfer-pane__tools">
        <span>添加列表 {{ selectedList.length }}/10</span>
      </nav>
      <main class="transfer-pane__body">
        <div
          v-for="(o, i) in selectedList"
          :key="i"
          class="selected-item"
          :class="{ single: i % 2 === 0 }"
        >
          <span :title="o.fullName">{{ o.fullName }}</span>
          <i class="el-icon-error" @click="remove(o)"></i>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { debounce } from '@/util/util'

export default {
  name: 'Transfer',
  data() {
    return {
      enterpriseName: '',
      loading: false,
      searchList: [], // 搜索列表
      selectedList: [] // 已选列表
    }
  },
  methods: {
    // 初始化
    init(list) {
      this.selectedList = list || []
    },
    // 搜索
    searchFn: debounce(function () {
      this.loading = true
      setTimeout(() => {
        this.searchList = [
          { fullName: '华为（Huawei）' },
          { fullName: '腾讯（Tencent）' },
          { fullName: '阿里巴巴（Alibaba）' },
          { fullName: '字节跳动（ByteDance）' },
          { fullName: '百度（Baidu）' },
          { fullName: '京东（JD.com）' },
          { fullName: '小米（Xiaomi）' },
          { fullName: '中国平安（Ping An）' },
          { fullName: '美的（Midea）' },
          { fullName: '格力（Gree）' },
          { fullName: '比亚迪（BYD）' },
          { fullName: '美团（Meituan）' },
          { fullName: '拼多多（Pinduoduo）' },
          { fullName: '联想（Lenovo）' },
          { fullName: '中国移动（China Mobile）' },
          { fullName: '京东科技控股股份有限公司京东科技控股股份有限公司' }
        ]
        this.loading = false
      }, 1000)
    }, 500),
    // 添加
    add(o) {
      if (this.selectedList.length >= 10) {
        this.$message.warning('最多添加10条数据')
        return
      }
      if (this.selectedList.some(item => item.fullName === o.fullName)) {
        return
      }
      this.selectedList.push(o)
      this.$emit('transferList', this.selectedList)
    },
    // 删除
    remove(o) {
      this.selectedList = this.selectedList.filter(item => item.fullName !== o.fullName)
      this.$emit('transferList', this.selectedList)
    },
    // 左侧的列表是否选中
    selected(o) {
      return this.selectedList.some(item => item.fullName === o.fullName) ? 'selected' : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.transfer {
  display: flex;
  height: 380px;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  .transfer-pane {
    flex: 1;
    padding: 10px;
    &:first-child {
      border-right: 1px solid #dcdfe6;
    }
    .transfer-pane__tools {
      height: 32px;
      margin-bottom: 8px;
    }
    .transfer-pane__body {
      position: relative;
      height: calc(100% - 40px);
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      overflow: auto;
      .selected-item.single {
        background-color: #f7f7f7;
      }
      .search-item {
        &.selected {
          i {
            color: #f2f3f4;
          }
        }
        &:hover {
          background-color: #f5f8fd;
        }
      }
      .search-item,
      .selected-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        padding: 0px 12px;
        span {
          max-width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        i {
          font-size: 16px;
          color: #4e67bb;
        }
      }
    }
  }
}
</style>
