export const companyProfile = `庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，
  乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。
  (具通：俱)予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，
  横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。
  然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？
  若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空，日星隐曜，山岳潜形，
  商旅不行，樯倾楫摧，薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，
  忧谗畏讥，满目萧然，感极而悲者矣。(隐曜一作：隐耀；淫雨通：霪雨)
  至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，
  岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，
  渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，
  其喜洋洋者矣。嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，
  不以己悲，居庙堂之高则忧其民，处江湖之远则忧其君。是进亦忧，退亦忧。
  然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎！噫！微斯人
  ，吾谁与归？时六年九月十五日。`

// 缓存组件
export const cacheComps = [
  'BasicInfo',
  'STable', // CreditRisks  InvestmentSituation
  'IndustryAnalysis',
  'GroupOrganizationChart',
  'EquityStructureChart',
  'RelationshipInvestigation'
]

// tab
export const tabs = [
  '基本信息', // BasicInfo
  '同行分析', // IndustryAnalysis
  '信用风险', // CreditRisks
  '集团组织结构图', // GroupOrganizationChart
  '股权结构图', // EquityStructureChart
  '投资情况', // InvestmentSituation
  '关系排查' // RelationshipInvestigation
]

// tab和组件的映射关系
export const tabCompMAP = {
  1: 'BasicInfo',
  2: 'IndustryAnalysis',
  3: 'STable', // CreditRisks
  4: 'GroupOrganizationChart',
  5: 'EquityStructureChart',
  6: 'STable', // InvestmentSituation
  7: 'RelationshipInvestigation'
}

export const fixedWord = `根据国民经济行业分类（GB/T4754-2017），
该企业所属门类为金融业，所属行业大类为保险业，所属行业中类为人身保险，
本页面分析按所属行业中类进行分析。`
