<template>
  <div class="relationship-chart">
    <nav class="relationship-chart-nav">
      <div class="legends">
        <template v-for="o in legends">
          <span :key="o.id">
            <i class="circle" :style="`background: ${o.color}`"></i>{{ o.name }}
          </span>
        </template>
      </div>
      <div class="tools">
        <template v-for="o in tools">
          <span :key="o.id"><i :class="o.icon"></i>{{ o.name }}</span>
        </template>
      </div>
    </nav>
    <RelationGraph ref="graphRef" :options="graphOptions" style="flex: 1">
      <template #node="{ node }">
        <div
          class="relationGraph-node"
          @click="handleNodeMouseenter(node, $event)"
          @mouseout="handleNodeMouseleave(node)"
        >
          {{ node.text }}
        </div>
      </template>
    </RelationGraph>
    <div ref="nodeDetailRef" class="node-card">
      <div class="node-card-title">企业卡片</div>
      <h2 class="node-card-name" :title="nodeData.name">{{ nodeData.name }}</h2>
      <span class="node-card-state" :title="nodeData.state">{{ nodeData.state }}</span>
      <div class="node-card-info">基本信息</div>
      <ul>
        <li>
          <span>法定代表人</span>
          <span :title="nodeData.legalPerson">{{ nodeData.legalPerson }}</span>
        </li>
        <li>
          <span>注册资本</span>
          <span :title="nodeData.registeredCapital">{{ nodeData.registeredCapital }}</span>
        </li>
        <li>
          <span>成立日期</span>
          <span :title="nodeData.establishDate">{{ nodeData.establishDate }}</span>
        </li>
        <li>
          <span>企业类型</span><span :title="nodeData.companyType">{{ nodeData.companyType }}</span>
        </li>
        <li>
          <span>注册地址</span><span :title="nodeData.address">{{ nodeData.address }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph'
import demoData from './data.json'
import { debounce } from 'lodash'

const legends = [
  {
    id: 1,
    name: '查询的对象',
    color: 'rgb(255, 108, 82)'
  },
  {
    id: 2,
    name: '自然人',
    color: 'rgb(72, 210, 215)'
  },
  {
    id: 3,
    name: '公司',
    color: 'rgb(50, 108, 251)'
  }
]
const tools = [
  {
    id: 1,
    name: '刷新',
    icon: 'el-icon-refresh'
  },
  {
    id: 2,
    name: '放大',
    icon: 'el-icon-zoom-in'
  },
  {
    id: 3,
    name: '缩小',
    icon: 'el-icon-zoom-out'
  },
  {
    id: 4,
    name: '保存',
    icon: 'el-icon-download'
  },
  {
    id: 5,
    name: '全屏',
    icon: 'el-icon-full-screen'
  }
]
const graphOptions = {
  debug: false,
  defaultNodeBorderWidth: 0, // 节点边框粗细
  defaultNodeColor: 'rgba(238, 178, 94, 1)', // 节点默认背景色
  allowSwitchLineShape: true, // 是否允许切换连线的形状
  allowSwitchJunctionPoint: true, // 是否允许切换节点连接点
  defaultLineShape: 1,
  layout: {
    label: '自动布局',
    layoutName: 'force',
    layoutClassName: 'seeks-layout-force'
  },
  defaultJunctionPoint: 'border'
}

export default {
  name: 'RelationshipChart',
  components: { RelationGraph },
  data() {
    return {
      graphOptions,
      legends,
      tools,
      nodeDetailRef: null, // 节点详情弹窗
      // 示例数据
      nodeData: {
        name: '京东科技控股股份有限公司',
        state: '在营（开业）',
        legalPerson: '曹鹏',
        registeredCapital: '502409.41 万 人民币',
        establishDate: '2012-09-05',
        companyType: '其他股份有限公司(非上市)',
        address: '北京市北京经济技术开发区科创十一街18号C座2层221室'
      }
    }
  },
  mounted() {
    this.nodeDetailRef = this.$refs.nodeDetailRef
    this.setGraphData()
  },
  methods: {
    handleNodeMouseenter: debounce(function (n, e) {
      this.nodeData.name = n.text

      if (this.nodeDetailRef) {
        this.nodeDetailRef.style.top = e.pageY - 50 + 'px'
        this.nodeDetailRef.style.left = e.pageX - 200 + 'px'
        this.nodeDetailRef.style.opacity = 1
        this.nodeDetailRef.style.visibility = 'visible'
      }
    }, 500),
    handleNodeMouseleave: debounce(function (n) {
      this.nodeDetailRef.style.opacity = 0
      this.nodeDetailRef.style.visibility = 'hidden'
    }, 200),
    setGraphData() {
      const __graph_json_data = demoData
      this.$refs.graphRef.setJsonData(__graph_json_data, graphInstance => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.relationship-chart {
  &-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 14px;
    background-color: #f8f8f8;
    border-top: 1px solid #e8e8e8;
    .legends {
      margin-left: 12px;
      span {
        margin-right: 15px;
        .circle {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 6px;
          vertical-align: middle;
        }
      }
    }
    .tools {
      margin-right: 40px;
      span {
        margin-left: 30px;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .relationGraph-node {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: visible;
  }
  .node-card {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: opacity 0.2s ease;
    opacity: 0;
    will-change: transform;
    transform: translateZ(0);
    padding: 10px 15px;
    font-size: 15px;
    &-title {
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 1px solid #dddcdc;
    }
    &-name {
      font-size: 15px;
    }
    &-state {
      padding: 2px;
      padding-left: 8px;
      color: #5fb401;
      font-size: 12px;
      border: 1px solid #5fb401;
      border-radius: 15px;
    }
    &-info {
      position: relative;
      font-size: 12px;
      padding-left: 12px;
      margin: 15px 0 10px 0;
      &::before {
        content: '';
        position: absolute;
        top: 1px;
        left: 0;
        width: 4px;
        height: 15px;
        background: #4d72f0;
        border-radius: 2px;
      }
    }
    ul {
      padding: 0;
      margin: 0;
      font-size: 12px;
      li {
        display: flex;
        span {
          height: 30px;
          line-height: 30px;
          color: #414141;
          padding: 0 10px;
          &:first-child {
            width: 34%;
            background-color: #f4f7fe;
            border: 1px solid #ccc;
            border-bottom: 0;
          }
          &:last-child {
            flex: 1;
            border: 1px solid #ccc;
            border-bottom: 0;
            border-left: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &:last-child {
          span {
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
}
</style>
