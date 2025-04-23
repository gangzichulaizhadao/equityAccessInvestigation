<template>
  <div id="sharehold"></div>
</template>

<script>
import { StockTree } from './StockTree.js'

export default {
  name: 'EquityStructureChart',
  data() {
    return {
      treeData: {
        id: 'abc1005',
        name: '山东吠舍科技有限责任公司',
        // 子节点列表
        children: [
          {
            id: 'abc1006',
            name: '山东第一首陀罗科技服务有限公司',
            percent: '100%'
          },
          {
            id: 'abc1007',
            name: '山东第二首陀罗程技术有限公司',
            percent: '100%'
          },
          {
            id: 'abc1008',
            name: '山东第三首陀罗光伏材料有限公司',
            percent: '100%'
          },
          {
            id: 'abc1009',
            name: '山东第四首陀罗科技发展有限公司',
            percent: '100%',
            hasChildren: true
          },
          {
            id: 'abc1014',
            name: '山东第五首陀罗电工科技有限公司',
            percent: '100%',
            hasChildren: true
          },
          {
            id: 'abc1020',
            name: '山东第六首陀罗分析仪器(集团)有限责任公司',
            percent: '100%',
            hasChildren: true
          }
        ],
        // 父节点列表
        parents: [
          {
            id: 'abc2001',
            name: '山东刹帝利集团有限责任公司',
            percent: '60%',
            hasChildren: true
          },
          {
            id: 'abc2002',
            name: '吴小远',
            percent: '40%'
          }
        ]
      },
      tree: null
    }
  },
  mounted() {
    console.log('股权结构图', d3)
    this.tree = new StockTree({
      el: '#sharehold',
      originTreeData: this.treeData,
      nodeClickEvent: this.nodeClickEvent,
      downClickEvent: this.downClickEvent,
      upClickEvent: this.upClickEvent
    })
  },
  methods: {
    nodeClickEvent(e, d) {
      console.log('当前节点的数据：', d)
    },
    // 下级节点展开：异步加载数据，更新树形结构
    downClickEvent(e, d) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        if (d._children) {
          d.children = d._children
          this.tree.update(d)
          return
        }
        d.children = this.generateData(d.depth + 1).map(item => {
          return {
            data: item,
            depth: d.depth + 1,
            height: 0,
            parent: d
          }
        })
      }
      this.tree.update(d)
    },
    // 上级节点展开：异步加载数据，更新树形结构
    upClickEvent(e, d) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        if (d._children) {
          d.children = d._children
          this.tree.update(d)
          return
        }
        d.children = this.generateData(d.depth + 1).map(item => {
          return {
            data: item,
            depth: d.depth + 1,
            height: 0,
            parent: d
          }
        })
      }
      this.tree.update(d)
    },
    // 生成随机数据
    generateData(depth) {
      // 生成1-10的随机数
      const randomNum = Math.floor(Math.random() * 10) + 1
      return new Array(randomNum).fill(1).map(() => {
        // 生成一个随机id
        const uniqueId =
          'id-' + new Date().getTime().toString(36) + '-' + Math.random().toString(36).substr(2, 9)
        return {
          id: uniqueId,
          name: `吴小远-${uniqueId}-${depth}`,
          percent: '40%',
          hasChildren: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#sharehold {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 800px;
  /* border: 1px solid #ccc; */
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
}
</style>

<style lang="scss">
.no-pointer-events {
  pointer-events: none;
}
.company-tooltip {
  position: absolute;
  visibility: hidden;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px;
  transition: opacity 0.4s ease;
  opacity: 0;
  will-change: transform;
  transform: translateZ(0);
}
.enterprise-card {
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
</style>
