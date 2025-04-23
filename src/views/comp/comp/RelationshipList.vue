<template>
  <div class="relationship-list">
    <nav class="relationship-list-nav">
      <span>关系列表</span>
      <span><i class="el-icon-download"></i>导出</span>
    </nav>
    <div class="relationship-list-top">
      <span>找到</span>
      <span> {{ total }} </span>
      <span>条关系</span>
    </div>
    <el-collapse accordion>
      <el-collapse-item v-for="(o, i) in lists" :key="o.id" :class="{ single: i % 2 === 0 }">
        <template slot="title">
          <span class="left"> {{ `路径${autoIncrementNum(i)}` }}</span>
          <span class="right">{{ `${autoIncrementNum(i)}站` }}</span>
        </template>
        <RelationshipLine
          v-if="o.relationships && o.relationships.length > 0"
          :relationships="o.relationships"
        />
      </el-collapse-item>
    </el-collapse>
    <pagination
      layout="prev, pager, next"
      :pager-count="5"
      :total="total"
      :page.sync="params.page.current"
      :limit.sync="params.page.size"
      @pagination="pageSearch"
    />
  </div>
</template>

<script>
import RelationshipLine from './RelationshipLine.vue'

export default {
  name: 'RelationshipList',
  components: { RelationshipLine },
  data() {
    return {
      total: 21,
      lists: [],
      fullLists: [
        {
          id: 1,
          relationships: [
            { name: '曹鹏', position: '经理', direction: 'down', color: 'red' },
            {
              name: '京东科技控股股份有限公司',
              position: '监事',
              direction: 'up',
              color: 'blue'
            },
            { name: '张素娟', color: 'orange' }
          ]
        },
        {
          id: 2,
          relationships: [
            {
              name: '京东科技控股股份有限公司',
              position: '投资（10%）',
              direction: 'up',
              color: 'red'
            },
            {
              name: '宿迁明进创元企业管理咨询合伙企业（有限合伙）',
              position: '投资（20%）',
              color: 'blue',
              direction: 'up'
            },
            { name: '刘强东', color: 'orange' }
          ]
        },
        {
          id: 3,
          relationships: [
            {
              name: '京东科技控股股份有限公司',
              position: '投资（10%）',
              direction: 'up',
              color: 'red'
            },
            {
              name: '宿迁明进创元企业管理咨询合伙企业（有限合伙）',
              position: '投资（20%）',
              color: 'blue',
              direction: 'up'
            },
            {
              name: '宿迁明进创元企业管理咨询合伙企业（有限合伙）',
              position: '投资（20%）',
              color: 'blue',
              direction: 'down'
            },
            { name: '刘强东', color: 'orange' }
          ]
        },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 },
        { id: 21 }
      ],
      params: {
        page: {
          current: 1,
          size: 10
        }
      }
    }
  },
  created() {
    this.lists = this.fullLists.filter((o, i) => i < 10)
  },
  methods: {
    pageSearch(obj) {
      const { limit, page } = obj
      if (page === 1) {
        this.lists = this.fullLists.filter((o, i) => i < limit)
      } else {
        this.lists = this.fullLists.filter((o, i) => limit * (page - 1) <= i && i < limit * page)
      }
    },
    autoIncrementNum(i) {
      const {
        page: { current, size }
      } = this.params
      return current === 1 ? i + 1 : i + 1 + (current - 1) * size
    }
  }
}
</script>

<style lang="scss" scoped>
.relationship-list {
  flex: 1;
  filter: blur(0); // 让fiexd定位基于父元素定位
  padding-bottom: 50px;
  &-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 18px;
    background-color: #f8f8f8;
    span:first-child {
      font-weight: bold;
    }
    span:last-child {
      font-size: 14px;
      i {
        margin-right: 5px;
      }
    }
  }
  &-top {
    height: 50px;
    line-height: 50px;
    padding-left: 16px;
    font-size: 14px;
    span {
      color: #1890ff;
    }
  }
  .el-collapse {
    max-height: 550px;
    overflow-y: scroll;
    border: 0;
    .el-collapse-item.single ::v-deep .el-collapse-item__header {
      background-color: #f7f7f7;
    }
    .el-collapse-item ::v-deep {
      position: relative;
      .el-collapse-item__header.is-active {
        border-bottom-color: #1890ff;
      }
    }
    .left {
      margin-left: 14px;
    }
    .right {
      position: absolute;
      top: 0;
      right: 30px;
    }
  }
  .pagination-container {
    position: fixed;
    right: 0;
    bottom: 5px;
    width: 100%;
  }
}
</style>
