// 表格列配置
const getColumns = (column = 4) => {
  const columns = []
  for (let i = 0; i < column / 2; i++) {
    columns.push({ prop: `column${i + 1}`, align: 'left' })
    columns.push({ prop: `value${i + 1}`, align: 'left' })
  }
  return columns
}
/**
 * 处理接口返回的数据，返回无表头的横向表格数据
 * @param {Object} data 接口返回的数据
 * @param {Array} map  数据的键值对
 * @param {Number} column 列数，两列算一个
 * @returns
 */
export const factoryFn = (data, map, column = 3) => {
  if (data === null) data = {}
  const leng = Math.ceil(map.length / column) // 循环次数-向上取整
  // console.log('🚀 ~ leng:', leng)
  const list = []
  for (let i = 0; i < leng; i++) {
    const obj = {}
    for (let j = 0; j < column; j++) {
      const k = i * column + j
      // console.log(map[k])
      obj[`column${j + 1}`] = map[k] ? map[k].name : ''
      obj[`value${j + 1}`] = data[`${map[k] ? map[k].key : ''}`]
    }
    list.push(obj)
  }
  // console.log('🚀 ~ list:', list)
  return list
}

// 注册信息
export const registrationInfoMap = [
  { name: '公司名称', key: '' },
  { name: '', key: '' },
  { name: '曾用名', key: '' },
  { name: '', key: '' },
  { name: '统一社会信用代码', key: '' },
  { name: '法定代表人', key: '' },
  { name: '组织机构代码', key: '' },
  { name: '工商注册号', key: '' },
  { name: '注册资本', key: '' },
  { name: '实收资本（万）', key: '' },
  { name: '所在地', key: '' },
  { name: '注册日期', key: '' },
  { name: '经营状态', key: '' },
  { name: '经营期限', key: '' },
  { name: '企业（机构）类型', key: '' },
  { name: '企业性质', key: '' },
  { name: '注册机关', key: '' },
  { name: '员工人数', key: '' },
  { name: '注册地址', key: '' },
  { name: '经营场所', key: '' },
  { name: '联系电话', key: '' },
  { name: '邮箱', key: '' },
  { name: '校验日期', key: '' },
  { name: '最后年检日期', key: '' },
  { name: '经济行业分类', key: '' },
  { name: '', key: '' },
  { name: '经营（业务）范围', key: '' },
  { name: '', key: '' },
  { name: '一般经营项目', key: '' },
  { name: '', key: '' },
  { name: '主营业务', key: '' },
  { name: '', key: '' }
]

// 空壳公司
export const shellCompanyMap = [
  { name: '企业空壳综合评分', key: '' },
  { name: '', key: '' }, // 代表被合并的行
  { name: '企业空壳评分-财税状况评分', key: '' },
  { name: '企业空壳评分-地址类聚集性评分', key: '' },
  { name: '企业空壳评分-非地址类聚集性评分', key: '' },
  { name: '企业空壳评分-经营状况评分', key: '' },
  { name: '企业空壳评分-资本充足率评分', key: '' }
]

// 基础指标
export const basicIndicatorsMap = [
  '基础信息', // 独占一行
  '成立年限',
  '人员规模',
  '注册资本',
  '产权资质', // 独占一行
  '商标',
  '专利',
  '软件著作权',
  '作品著作权',
  '负面信息', // 独占一行
  '负面舆情数量',
  '近一年负面舆情数量',
  '诉讼案件数量（被告）',
  '诉讼案件数量（原告）',
  '监管处罚',
  '私法涉诉',
  '股权冻结'
]

// 财务指标
export const financialIndexMap = [
  '总资产（万元）',
  '总负债（万元）',
  '净资产（万元）',
  '营业收入（万元）',
  '净利润（万元）',
  '净利润率（万元）',
  '主营业务收入（万元）'
]

// 列颜色配置
const columnColor = '#f2f5fe'
const columnStyleFn = ({ columnIndex }) => {
  const columnIndexArr = [0, 2, 4]
  if (columnIndexArr.includes(columnIndex)) return { 'background-color': columnColor }
}

// 合并行
const mergeTableFn = mergeRow => {
  return ({ rowIndex, columnIndex }) => {
    if (mergeRow.includes(rowIndex) && columnIndex === 1) {
      return { rowspan: 1, colspan: 3 }
    }
  }
}

const getCommonAttrs = mergeRow => {
  return {
    'show-header': false,
    'span-method': mergeTableFn(mergeRow),
    'cell-style': columnStyleFn
  }
}

// 基本信息
export const basicInfo = [
  {
    title: '注册信息',
    tableAttrs: {
      data: [],
      columns: getColumns(4),
      ...getCommonAttrs([0, 1, 12, 13, 14, 15])
    }
  },
  {
    title: '空壳公司评估（评分越高，风险越高）',
    tableAttrs: {
      data: [],
      columns: getColumns(4),
      ...getCommonAttrs([0])
    }
  }
]

// 同行分析
// 基础指标
export const basicIndicators = {
  data: [],
  columns: [
    {
      prop: 'indicatorName',
      label: '指标名称',
      $attrs: {
        showOverflowTooltip: true
      }
    },
    {
      prop: 'a',
      label: '指标值',
      $attrs: {
        showOverflowTooltip: true
      }
    },
    {
      prop: 'b',
      label: '行业排名',
      $attrs: {
        showOverflowTooltip: true
      }
    },
    {
      prop: 'c',
      label: '行业四分位排名',
      $attrs: {
        showOverflowTooltip: true
      }
    }
  ],
  'header-row-style': { 'font-size': '15px' },
  'span-method': ({ rowIndex }) => {
    if ([0, 4, 9].includes(rowIndex)) return { rowspan: 1, colspan: 4 }
  },
  'cell-style': ({ columnIndex, rowIndex }) => {
    const style = {}
    if ([0].includes(columnIndex)) {
      style.color = '#000'
      style.fontWeight = 'bold'
    }
    if ([0, 4, 9].includes(rowIndex)) {
      style.fontSize = '16px'
    }
    return style
  }
}
// 财务指标
export const financialIndex = {
  data: [],
  columns: [
    {
      label: '2025',
      prop1: 'curYRanking',
      prop2: 'curYQuartileRanking'
    },
    {
      label: '2024',
      prop1: 'lastYRanking',
      prop2: 'lastYQuartileRanking'
    },
    {
      label: '2023',
      prop1: 'last2YRanking',
      prop2: 'last2YQuartileRanking'
    },
    {
      label: '2022',
      prop1: 'last3YRanking',
      prop2: 'last3YQuartileRanking'
    },
    {
      label: '2021',
      prop1: 'last4YRanking',
      prop2: 'last4YQuartileRanking'
    }
  ],
  'header-row-style': { 'font-size': '15px' },
  'cell-style': ({ columnIndex }) => {
    if ([0].includes(columnIndex)) return { color: '#000', fontWeight: 'bold' }
  }
}

const changRowStyle = ({ row, rowIndex }) => {
  return { 'font-size': '15px', height: '50px' }
}

const tableStyle = {
  'max-height': '350',
  'header-row-style': { 'font-size': '15px' },
  'row-style': changRowStyle
}

const getPageAttrs = i => {
  return {
    pageAttrs: {
      total: 0,
      page: 1,
      limit: 10
    },
    pageEvents: {
      'update:limit': val => {
        creditRisks[i].pageAttrs.limit = val
      },
      'update:page': val => {
        creditRisks[i].pageAttrs.page = val
      },
      pagination: () => {}
    }
  }
}

// 信用风险
export const creditRisks = [
  {
    title: '经营异常（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '列入日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列入原因',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列入机构',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出原因',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出机构',
          $attrs: {
            showOverflowTooltip: true
          }
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(0)
  },
  {
    title: '严重违法（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '列入日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列入原因',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列入机构',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出原因',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '列出机构',
          $attrs: {
            showOverflowTooltip: true
          }
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(1)
  },
  {
    title: '监管处罚（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '处罚决定日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '被处罚当事人',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '处罚原因',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '处罚决定',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '处罚决定机关',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: '行政处罚决定书'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(2)
  },
  {
    title: '司法诉讼（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '案号',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '立案时间',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '当事人',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '执行法院',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: 'detail'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(3)
  },
  {
    title: '被执行人（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '案号',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '立案时间',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '被执行人',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '执行法院',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: 'detail'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(4)
  },
  {
    title: '失信被执行人（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '案号',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '立案时间',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '执行法院',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '履行情况',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: 'detail'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(5)
  },
  {
    title: '限制高消费（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '案号',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '限消令对象',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '立案时间',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '执行法院',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: 'detail'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(6)
  },
  {
    title: '股权冻结（X条）',
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '执行通知文号',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '冻结股权标的企业',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '被执行人',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '股权数额',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '执行法院',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '公示日期',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          slot: 'detail'
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs(7)
  }
]

const getPageAttrs1 = i => {
  return {
    pageAttrs: {
      total: 0,
      page: 1,
      limit: 10
    },
    pageEvents: {
      'update:limit': val => {
        investmentSituation[i].pageAttrs.limit = val
      },
      'update:page': val => {
        investmentSituation[i].pageAttrs.page = val
      },
      pagination: () => {}
    }
  }
}

// 投资情况
export const investmentSituation = [
  {
    title: '出资人及实控人持股20%以上或作为第一大股东企业名单',
    export: true,
    loading: false,
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '企业名称',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '关联企业名称',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '关联企业分类',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '空壳公司评分',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '主营业务',
          $attrs: {
            showOverflowTooltip: true
          }
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs1(0)
  },
  {
    title: '出资人及其关联企业投资入股金融机构、类金融机构企业名单',
    export: true,
    loading: false,
    tableAttrs: {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      columns: [
        {
          prop: '',
          label: '序号',
          $attrs: {
            type: 'index',
            width: '60'
          }
        },
        {
          prop: '',
          label: '企业名称',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '被投机构名称',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '被投机构分类',
          $attrs: {
            showOverflowTooltip: true
          }
        },
        {
          prop: '',
          label: '投资比例',
          $attrs: {
            showOverflowTooltip: true
          }
        }
      ],
      ...tableStyle
    },
    ...getPageAttrs1(1)
  }
]
