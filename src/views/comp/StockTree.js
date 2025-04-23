//
export class StockTree {
  constructor(options) {
    const { el, originTreeData, nodeClickEvent, downClickEvent, upClickEvent } = options

    this.originTreeData = originTreeData // 树的源数据
    this.el = el // 宿主元素选择器
    const fun = (e, d) => console.log(d.name)
    this.nodeClickEvent = nodeClickEvent || fun // 节点点击事件
    this.downClickEvent = downClickEvent || fun // 节点点击事件
    this.upClickEvent = upClickEvent || fun // 节点点击事件
    // 一些配置项
    this.config = {
      dx: 200, // 节点的横向距离
      dy: 170, // 节点的纵向距离
      width: 0, // svg的viewBox的宽度
      height: 0, // svg的viewBox的高度
      rectWidth: 170, // 节点的矩形框宽度
      rectHeight: 70 // 节点的矩形框高度
    }
    this.svg = null
    this.gAll = null
    this.gLinks = null
    this.gNodes = null
    this.tree = null // 给树加坐标点的方法
    this.rootOfDown = null // down
    this.rootOfUp = null // up

    this.isOverTooltip = false // 是否在tooltip上
    // this.expandAllNodes()
    this.drawChart({ type: 'fold' })
  }

  // 初始化树结构数据
  drawChart(options) {
    // 宿主元素的d3选择器对象
    let host = d3.select(this.el)
    // 宿主元素的DOM，通过node()获取到其DOM元素对象
    let dom = host.node()
    // 宿主元素的DOMRect
    let domRect = dom.getBoundingClientRect()
    // svg的宽度和高度
    this.config.width = domRect.width
    this.config.height = domRect.height

    let oldSvg = d3.select('svg')
    // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
    if (!oldSvg.empty()) {
      oldSvg.remove()
    }

    const svg = d3
      .create('svg')
      .attr('viewBox', () => {
        let parentsLength = this.originTreeData.parents ? this.originTreeData.parents.length : 0
        return [
          -this.config.width / 2,
          // 如果有父节点，则根节点居中，否则根节点上浮一段距离
          parentsLength > 0 ? -this.config.height / 2 : -this.config.height / 3,
          this.config.width,
          this.config.height
        ]
      })
      .style('user-select', 'none') // 防止拖拽时选中文字，用户不可选中文本
      .style('cursor', 'move')

    // 包括连接线和节点的总集合
    const gAll = svg.append('g').attr('id', 'all')
    svg
      .call(
        d3
          .zoom()
          .scaleExtent([0.2, 5])
          .on('zoom', e => {
            gAll.attr('transform', () => {
              return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
            })
          })
      )
      .on('dblclick.zoom', null) // 取消默认的双击放大事件

    this.gAll = gAll
    // 连接线集合
    this.gLinks = gAll.append('g').attr('id', 'linkGroup')
    // 节点集合
    this.gNodes = gAll.append('g').attr('id', 'nodeGroup')
    // 设置好节点之间距离的tree方法
    this.tree = d3
      .tree()
      .nodeSize([this.config.dx, this.config.dy])
      .separation((a, b) => 1) // 节点之间的间距相同

    this.rootOfDown = d3.hierarchy(this.originTreeData, d => d.children)
    this.rootOfUp = d3.hierarchy(this.originTreeData, d => d.parents)
    console.log('🚀 ~ StockTree ~ drawChart ~ rootOfDown:', this.rootOfDown)
    console.log('🚀 ~ StockTree ~ drawChart ~ rootOfUp:', this.rootOfUp)
    // this.tree(this.rootOfDown)
    // ;[this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach(nodes => {
    //   nodes.forEach(node => {
    //     node._children = node.children || null
    //     if (options.type === 'all') {
    //       //如果是all的话，则表示全部都展开
    //       node.children = node._children
    //     } else if (options.type === 'fold') {
    //       //如果是fold则表示除了父节点全都折叠
    //       // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
    //       if (node.depth) {
    //         node.children = null
    //       }
    //     }
    //   })
    // })

    //箭头(下半部分)
    svg
      .append('marker')
      .attr('id', 'markerOfDown')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', 60) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 10) //标识的大小
      .attr('markerHeight', 10)
      .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
      .attr('fill', '#128bed') //箭头颜色

    //箭头(上半部分)
    svg
      .append('marker')
      .attr('id', 'markerOfUp')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', -55) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 10) //标识的大小
      .attr('markerHeight', 10)
      .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
      .attr('fill', '#128bed') //箭头颜色

    this.svg = svg
    this.update()
    // 将svg置入宿主元素中
    host.append(() => svg.node())
  }

  // 更新数据
  update(source) {
    if (!source) {
      source = {
        x0: 0,
        y0: 0
      }
      // 设置根节点所在的位置（原点）
      this.rootOfDown.x0 = 0
      this.rootOfDown.y0 = 0
      this.rootOfUp.x0 = 0
      this.rootOfUp.y0 = 0
    }

    let nodesOfDown = this.rootOfDown.descendants().reverse()
    let linksOfDown = this.rootOfDown.links()
    let nodesOfUp = this.rootOfUp.descendants().reverse()
    let linksOfUp = this.rootOfUp.links()

    this.tree(this.rootOfDown)
    this.tree(this.rootOfUp)

    // const myTransition = this.svg.transition().duration(500)
    function myTransition(selection) {
      return selection.transition().duration(1000).ease(d3.easePolyOut) // 使用更平滑的缓动函数
    }
    // tooltip
    const tooltip = this.createTooltip()
    const _this = this
    let timeoutId = null // 用于存储定时器ID

    // down
    const node1 = this.gNodes.selectAll('g.nodeOfDownItemGroup').data(nodesOfDown, d => d.data.id)

    const node1Enter = node1
      .enter()
      .append('g')
      .attr('class', 'nodeOfDownItemGroup')
      .attr('transform', d => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')

    // 外层的矩形框
    node1Enter
      .append('rect')
      .attr('width', d => {
        if (d.depth === 0) {
          return (d.data.name.length + 2) * 16
        }
        return this.config.rectWidth
      })
      .attr('height', d => {
        if (d.depth === 0) {
          return 50
        }
        return this.config.rectHeight
      })
      .attr('x', d => {
        if (d.depth === 0) {
          return (-(d.data.name.length + 2) * 16) / 2
        }
        return -this.config.rectWidth / 2
      })
      .attr('y', d => {
        if (d.depth === 0) {
          return -26
        }
        return -this.config.rectHeight / 2
      })
      .attr('rx', 1)
      .attr('stroke-width', 1.5)
      // 外层矩形框颜色
      .attr('stroke', d => {
        if (d.depth === 0) {
          return '#128bed'
        }
        return '#128bed'
      })
      // 内部填充颜色
      .attr('fill', d => {
        if (d.depth === 0) {
          return '#128bed'
        }
        return '#FFFFFF'
      })
      .on('click', (e, d) => {
        this.nodeClickEvent(e, d)
      })

    // 文本主标题
    node1Enter
      .append('text')
      .attr('class', 'main-title')
      .attr('x', d => {
        return 0
      })
      .attr('y', d => {
        if (d.depth === 0) {
          return 5
        }
        return -4
      })
      .attr('text-anchor', d => {
        return 'middle'
      })
      .text(d => {
        if (d.depth === 0) {
          return d.data.name
        } else {
          return d.data.name.length > 11 ? d.data.name.substring(0, 11) : d.data.name
        }
      })
      .attr('fill', d => {
        if (d.depth === 0) {
          return '#FFFFFF'
        }
        return '#000000'
      })
      .style('font-size', d => (d.depth === 0 ? 16 : 14))
      .style('font-family', '黑体')
      .style('font-weight', 'bold')

    // 副标题
    node1Enter
      .append('text')
      .attr('class', 'sub-title')
      .attr('x', d => {
        return 0
      })
      .attr('y', d => {
        return 14
      })
      .attr('text-anchor', d => {
        return 'middle'
      })
      .text(d => {
        if (d.depth !== 0) {
          let subTitle = d.data.name.substring(11)
          if (subTitle.length > 10) {
            return subTitle.substring(0, 10) + '...'
          }
          return subTitle
        }
      })
      .style('font-size', d => 14)
      .style('font-family', '黑体')
      .style('font-weight', 'bold')

    // 控股比例
    node1Enter
      .append('text')
      .attr('class', 'percent no-pointer-events')
      .attr('x', d => {
        return 12
      })
      .attr('y', d => {
        return -50
      })
      .text(d => {
        if (d.depth !== 0) {
          return d.data.percent
        }
      })
      .attr('fill', '#128bed')
      .style('font-family', '黑体')
      .style('font-size', d => 14)
      .style('font-weight', 'bold')

    node1.merge(node1Enter).each(function (d) {
      const nodeGroup = d3.select(this)
      nodeGroup
        .on('mouseenter', () => {
          // 清除之前的定时器
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
          tooltip
            .interrupt() // 中断当前正在进行的过渡动画
            .style('visibility', 'visible')
            .style('opacity', '1')
          _this.updateTooltip(tooltip, d, nodeGroup)
        })
        .on('mouseleave', e => {
          // 设置延时
          timeoutId = setTimeout(() => {
            if (!_this.isOverTooltip) {
              tooltip
                .transition()
                .duration(300)
                .style('opacity', '0')
                .on('end', () => tooltip.style('visibility', 'hidden'))
            }
          }, 100)
        })
    })

    // 增加展开按钮
    const expandBtnG = node1Enter
      .append('g')
      .attr('class', 'expandBtn')
      .attr('transform', d => {
        return `translate(${0},${this.config.rectHeight / 2})`
      })
      .style('display', d => {
        // 如果是根节点，不显示
        if (d.depth === 0) {
          return 'none'
        }
        // 如果没有子节点，则不显示
        if (!d.data.hasChildren) {
          return 'none'
        }
      })
      .on('click', this.downClickEvent)

    expandBtnG.append('circle').attr('r', 8).attr('fill', '#128bed').attr('cy', 8)

    expandBtnG
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('y', 13)
      .style('font-size', 16)
      .style('font-family', '微软雅黑')
      .text(d => {
        return d.children ? '-' : '+'
      })

    // 连接线
    const link1 = this.gLinks
      .selectAll('path.linkOfDownItem')
      .data(linksOfDown, d => d.target.data.id)

    const link1Enter = link1
      .enter()
      .append('path')
      .attr('class', 'linkOfDownItem')
      .attr('d', d => {
        const o = {
          source: { x: source.x0, y: source.y0 },
          target: { x: source.x0, y: source.y0 }
        }
        return this.drawLink(o)
      })
      .attr('fill', 'none')
      .attr('stroke', '#cdcdcd')
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#markerOfDown)')

    // 有元素update更新和元素新增enter的时候
    node1
      .merge(node1Enter)
      .transition(myTransition)
      .attr('transform', d => {
        return `translate(${d.x},${d.y})`
      })
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    link1.merge(link1Enter).transition(myTransition).attr('d', this.drawLink)

    // 有元素消失时
    node1
      .exit()
      .transition(myTransition)
      .remove()
      .attr('transform', d => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    link1
      .exit()
      .transition(myTransition)
      .attr('d', d => {
        const o = {
          source: { x: source.x, y: source.y },
          target: { x: source.x, y: source.y }
        }
        return this.drawLink(o)
      })
      .remove()

    // --------------------------------------------------------
    // up
    nodesOfUp.forEach(node => (node.y = -node.y))

    const node2 = this.gNodes.selectAll('g.nodeOfUpItemGroup').data(nodesOfUp, d => d.data.id)

    const node2Enter = node2
      .enter()
      .append('g')
      .attr('class', 'nodeOfUpItemGroup')
      .attr('transform', d => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')

    // 外层的矩形框
    node2Enter
      .append('rect')
      .attr('width', d => {
        if (d.depth === 0) {
          return (d.data.name.length + 2) * 16
        }
        return this.config.rectWidth
      })
      .attr('height', d => {
        if (d.depth === 0) {
          return 50
        }
        return this.config.rectHeight
      })
      .attr('x', d => {
        if (d.depth === 0) {
          return (-(d.data.name.length + 2) * 16) / 2
        }
        return -this.config.rectWidth / 2
      })
      .attr('y', d => {
        if (d.depth === 0) {
          return -26
        }
        return -this.config.rectHeight / 2
      })
      .attr('rx', 1)
      .attr('stroke-width', 1.5)
      .attr('stroke', d => {
        if (d.depth === 0) {
          return '#128bed'
        }
        return '#128bed'
      })
      .attr('fill', d => {
        if (d.depth === 0) {
          return '#128bed'
        }
        return '#FFFFFF'
      })
      .on('click', (e, d) => {
        this.nodeClickEvent(e, d)
      })

    // 文本主标题
    node2Enter
      .append('text')
      .attr('class', 'main-title')
      .attr('x', d => {
        return 0
      })
      .attr('y', d => {
        if (d.depth === 0) {
          return 5
        }
        return -4
      })
      .attr('text-anchor', d => {
        return 'middle'
      })
      .text(d => {
        if (d.depth === 0) {
          return d.data.name
        } else {
          return d.data.name.length > 11 ? d.data.name.substring(0, 11) : d.data.name
        }
      })
      .attr('fill', d => {
        if (d.depth === 0) {
          return '#FFFFFF'
        }
        return '#000000'
      })
      .style('font-size', d => (d.depth === 0 ? 16 : 14))
      .style('font-family', '黑体')
      .style('font-weight', 'bold')

    // 副标题
    node2Enter
      .append('text')
      .attr('class', 'sub-title')
      .attr('x', d => {
        return 0
      })
      .attr('y', d => {
        return 14
      })
      .attr('text-anchor', d => {
        return 'middle'
      })
      .text(d => {
        if (d.depth !== 0) {
          let subTitle = d.data.name.substring(11)
          if (subTitle.length > 10) {
            return subTitle.substring(0, 10) + '...'
          }
          return subTitle
        }
      })
      .style('font-size', d => 14)
      .style('font-family', '黑体')
      .style('font-weight', 'bold')

    // 控股比例
    node2Enter
      .append('text')
      .attr('class', 'percent no-pointer-events')
      .attr('x', d => {
        return 12
      })
      .attr('y', d => {
        return 60
      })
      .text(d => {
        if (d.depth !== 0) {
          return d.data.percent
        }
      })
      .attr('fill', '#128bed')
      .style('font-family', '黑体')
      .style('font-size', d => 14)
      .style('font-weight', 'bold')

    // 同样在 node2Enter 中添加相同的鼠标事件处理
    node2.merge(node2Enter).each(function (d) {
      const nodeGroup = d3.select(this)

      nodeGroup
        .on('mouseenter', () => {
          // 清除之前的定时器
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
          tooltip
            .interrupt() // 中断当前正在进行的过渡动画
            .style('visibility', 'visible')
            .style('opacity', '1')
          _this.updateTooltip(tooltip, d, nodeGroup)
        })
        .on('mouseleave', e => {
          // 设置延时
          timeoutId = setTimeout(() => {
            if (!_this.isOverTooltip) {
              tooltip
                .transition()
                .duration(300)
                .style('opacity', '0')
                .on('end', () => tooltip.style('visibility', 'hidden'))
            }
          }, 100)
        })
    })

    // 增加展开按钮
    const expandBtnG2 = node2Enter
      .append('g')
      .attr('class', 'expandBtn')
      .attr('transform', d => {
        return `translate(${0},${-this.config.rectHeight / 2})`
      })
      .style('display', d => {
        // 如果是根节点，不显示
        if (d.depth === 0) {
          return 'none'
        }
        // 如果没有子节点，则不显示
        if (!d.data.hasChildren) {
          return 'none'
        }
      })
      .on('click', this.upClickEvent)

    expandBtnG2.append('circle').attr('r', 8).attr('fill', '#128bed').attr('cy', -8)

    expandBtnG2
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('y', -3)
      .style('font-size', 16)
      .style('font-family', '微软雅黑')
      .text(d => {
        return d.children ? '-' : '+'
      })

    // 连接线
    const link2 = this.gLinks.selectAll('path.linkOfUpItem').data(linksOfUp, d => d.target.data.id)

    const link2Enter = link2
      .enter()
      .append('path')
      .attr('class', 'linkOfUpItem')
      .attr('d', d => {
        const o = {
          source: { x: source.x0, y: source.y0 },
          target: { x: source.x0, y: source.y0 }
        }
        return this.drawLink(o)
      })
      .attr('fill', 'none')
      .attr('stroke', '#cdcdcd')
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#markerOfUp)')

    // 有元素update更新和元素新增enter的时候
    node2
      .merge(node2Enter)
      .transition(myTransition)
      .attr('transform', d => {
        return `translate(${d.x},${d.y})`
      })
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    link2.merge(link2Enter).transition(myTransition).attr('d', this.drawLink)

    // 有元素消失时
    node2
      .exit()
      .transition(myTransition)
      .remove()
      .attr('transform', d => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    link2
      .exit()
      .transition(myTransition)
      .attr('d', d => {
        const o = {
          source: { x: source.x, y: source.y },
          target: { x: source.x, y: source.y }
        }
        return this.drawLink(o)
      })
      .remove()
    // ----------------------------------------------------
    // node数据改变的时候更改一下加减号
    const expandButtonsSelection = d3.selectAll('g.expandBtn')

    expandButtonsSelection
      .select('text')
      .transition()
      .text(d => {
        return d.children ? '-' : '+'
      })

    this.rootOfDown.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
    this.rootOfUp.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  // 直角连接线 by wushengyuan
  drawLink({ source, target }) {
    const halfDistance = (target.y - source.y) / 2
    const halfY = source.y + halfDistance
    return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`
  }

  createTooltip() {
    d3.select('.company-tooltip').remove()

    const tooltip = d3.select('body').append('div').attr('class', 'company-tooltip')

    tooltip
      .on('mouseenter', () => {
        this.isOverTooltip = true
        tooltip.style('visibility', 'visible').style('opacity', '1')
      })
      .on('mouseleave', () => {
        this.isOverTooltip = false
        tooltip
          .style('opacity', '0')
          .transition()
          .duration(300)
          .on('end', () => tooltip.style('visibility', 'hidden'))
      })

    return tooltip
  }

  updateTooltip(tooltip, d, nodeGroup) {
    // 获取整个节点组的位置信息，而不是具体的事件目标
    const nodeBBox = nodeGroup.node().getBoundingClientRect()

    // 获取页面滚动位置
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // 计算tooltip的固定位置 - 显示在节点的右侧
    const tooltipX = nodeBBox.right + scrollLeft + 10 // 节点右侧固定偏移10px
    const tooltipY = nodeBBox.top + scrollTop - 10 // 节点顶部固定偏移10px

    const name = d.data.name || ''
    const state = d.data.state || '在营（开业）' || '未知状态'
    const legalPerson = d.data.legalPerson || '未知未知未知未知未知未知未知未'
    const registeredCapital = d.data.registeredCapital || '未知未知未知未知未知未知未知未'
    const establishDate = d.data.establishDate || '未知未知未知未知未知未知未知未'
    const companyType = d.data.companyType || '未知未知未知未知未知未知未知未'
    const address = d.data.address || '未知未知未知未知未知未知未知未'

    tooltip.style('left', tooltipX + 'px').style('top', tooltipY + 'px').html(`
      <div class="enterprise-card">
        <div class="enterprise-card-title">企业卡片</div>
        <h2 class="enterprise-card-name" title="${name}">${name}</h2>
        <span class="enterprise-card-state" title="${state}">${state}</span>
        <div class="enterprise-card-info">基本信息</div>
        <ul>
          <li><span>法定代表人</span><span title="${legalPerson}">${legalPerson}</span></li>
          <li><span>注册资本</span><span title="${registeredCapital}">${registeredCapital}</span></li>
          <li><span>成立日期</span><span title="${establishDate}">${establishDate}</span></li>
          <li><span>企业类型</span><span title="${companyType}">${companyType}</span></li>
          <li><span>注册地址</span><span title="${address}">${address}</span></li>
        </ul>
      </div>
    `)
  }
}
