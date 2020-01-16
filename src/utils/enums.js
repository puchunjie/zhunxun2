export const ScEnumKeys = {
  shopStateEnum: "shopStateEnum",
  shopTypeEnum: "shopTypeEnum",
  shopBusinessTypeEnum: "shopBusinessTypeEnum",
};
export const ScEnums = {
  shopStateEnum: [
    {value: 0, label: '审核中'},
    {value: 3, label: '已冻结'},
    {value: 4, label: '已驳回'},
	{value: 1, label: '正常'},
	{value: 2, label: '已过期'},
  ] ,
  shopTypeEnum: [
    {value: 0, label: '器乐'},
    {value: 1, label: '舞蹈'},
	{value: 2, label: '声乐'}
  ] ,
  shopBusinessTypeEnum: [
    {value: 0, label: '小微商户'},
    {value: 1, label: '特约商户'}
  ] 
};