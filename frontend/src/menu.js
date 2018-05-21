/**
 * iocnClass 表示icon图标
 * name 表示名称
 * action 表示路由hash地址
 * children 表示子分类
 * auth_should 表示需要验证的权限(类型array)，逻辑关系OR
 * auth_must 标识需要验证的权限（类型array），逻辑关系AND
 **/
var menu = [
  {
    iconClass: 'el-icon-setting',
    name: '一级菜单',
    action: '/home',
    groups: [
      {
        name: '一级菜单组',
        children: [
          {
            name: '菜单项-1',
            auth_should: ['item_1', 'item_4'],
            action: '/home/page1'
          },
          {
            name: '菜单项-2',
            auth_must: ['item_1', 'item_4'],
            action: '/home/page2'
          },
          {
            name: '菜单项-3',
            auth_must: ['item_1'],
            auth_should: ['item_2', 'item_4'],
            action: '/home/page3'
          }
        ]
      }
    ]
  }
];

module.exports = menu;
