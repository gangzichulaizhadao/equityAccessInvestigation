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
      obj[`value${j + 1}`] =  map[k] ? map[k].key : ''
      //data[`${map[k] ? map[k].key : ''}`]
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
