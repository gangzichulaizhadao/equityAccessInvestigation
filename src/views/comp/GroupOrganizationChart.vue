<template>
  <div id="group-chart" ref="chartContainer"></div>
</template>

<script>
import { GroupChart } from './GroupChart.js'

export default {
  name: 'GroupOrganizationChart',
  data() {
    return {
      treeData: {
        name: '京东科技控股股份有限公司',
        type: '目标企业',
        parents: [
          {
            name: '宿迁聚合数字企业管理有限公司',
            type: '集团公司',
            percent: '90.10%',
            parents: [
              {
                name: '宿迁瀚宇科技有限公司',
                type: '集团公司',
                percent: '41.7392%'
              }
            ]
          }
        ],
        children: [
          {
            name: '北京科技北京信息科技有限公司',
            type: '集团公司',
            percent: '100%'
          },
          {
            name: '南迈博北京互联网技术有限公司',
            percent: '100%'
          },
          {
            name: '南京大数据电子商务有限公司',
            type: '集团公司',
            percent: '100%'
          },
          {
            name: '京东银联科技有限公司',
            percent: '100%',
            hasChildren: true
          },
          {
            name: '天津新京电投资管理有限公司',
            percent: '100%',
            hasChildren: true
          },
          {
            name: '西安合众互联网金融资产管理中心有限公司',
            type: '集团公司',
            percent: '100%'
          },
          {
            name: '京东城市（北京）数字科技有限公司',
            type: '集团公司',
            percent: '100%',
            hasChildren: true
          },
          {
            name: '南迈博北京互联网科技有限公司',
            type: '集团公司',
            percent: '100%'
          },
          {
            name: '京东城市（重庆）科技有限公司',
            type: '集团公司',
            percent: '51%',
            hasChildren: true
          },
          {
            name: '北京汇泰科技有限公司',
            type: '集团公司',
            percent: '51%'
          }
        ]
      }
    }
  },
  mounted() {
    this.tree = new GroupChart({
      el: '#group-chart',
      originTreeData: this.treeData,
      // nodeClickEvent: this.nodeClickEvent,
      downClickEvent: this.downClickEvent
      // upClickEvent: this.upClickEvent
    })
  },
  methods: {
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
          hasChildren: true,
          type: '集团公司'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#group-chart {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 800px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
}
</style>
