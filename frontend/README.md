# 前端解决方案


## 安装nodejs

[nodejs](https://nodejs.org/en/download/)


## VueJs

- VueJs采用[饿了么前端组件库](http://element.eleme.io/)
- 标准安装请参考[官方文档](http://element.eleme.io/#/zh-CN/component/installation)
- 非标准安装请下载对应的项目源码`npm install`
- 非标准安装请参考[案例项目](http://git-whyd.mysoft.com.cn/platform/mysoft-fe/tree/master)，以下介绍非标准安装下的使用


## 项目初始化

```shell
git clone git@git-whyd.mysoft.com.cn:platform/mysoft-fe.git
cd mysoft-fe
npm install
```


## 目录结构

```text
└── frontend                        # 前端代码根目录
    └── build                       # 用于项目构建的配置及脚本
    └── config                      # 基本配置文件
    └── src                         # 应用相关代码
        └── api                     # Api call接口调用
        └── assets                  # 资源目录
        └── components              # 组件目录
        └── pages                   # vue页面目录
        └── styles                  # 样式目录
        └── utils                   # 公共工具
        └── app.js                  # 入口文件
        └── app.vue                 # 基础vue页面
        └── menu.js                 # 菜单配置
        └── routes.js               # 路由配置
        └── style.scss              # 基础样式
    └── package.json                # 前端npm包配置文件
```


## 开发模式

`开发模式`下先将`src/config.js`复制为`src/config-dev.js`，如有必要修改api调用地址`base`及根目录地址`webroot`的值

```shell
cp src/config.js src/config-dev.js
npm run dev
```


## 部署编译模式

```
npm run build
```

1. 编译配置文件为`{root_dir}/config/index.js`
2. 修改配置文件，可修改编译目标路径（默认路径为`{root_dir}/../web/`）


## 菜单标准规范

- 代码

```javascript
var menu = [
  {
    iconClass: 'el-icon-setting', // 一级菜单图标
    name: '配置管理', // 一级菜单显示名称
    action: '/settings', // 一级菜单对应路由地址
    groups: [ // 一级菜单对应二级分组菜单
      {
        name: '人员管理', // 分组名称
        children: [ // 分组菜单项
          {
            name: '产品管理', // 分组菜单项显示名称
            // 先判断auth_must，后判断auth_should
            auth_must: ['product_watch'], // 权限判断-与操作，有一个为false则直接返回，不显示菜单
            auth_should: ['add_product'], // 权限判断-或操作，有一个为true则直接返回，显示菜单
            action: '/settings/products' // 菜单项路由地址
          }
        ]
      }
    ]
  }
];
module.exports = menu;
```

- 实例

![WX20180507-113247@2x](https://ws1.sinaimg.cn/large/006tKfTcgy1fr2mbsxga1j31kw0a9wgb.jpg)


## 路由配置

- 代码

```javascript
import Abstract from './pages/common/abstract';
import Wiki from './pages/common/wiki';
import Playbook from './pages/common/playbook';

let routes = [
  {
    path: '/wiki',
    component: Abstract,
    name: '帮助中心',
    children: [
      {
        path: 'sections',
        component: Wiki,
        name: '文档列表'
      },
      {
        path: 'playbook',
        component: Playbook,
        name: 'Section'
      }
    ]
  }
];
```

- 当使用`import...from`的时候，不用写vue后缀
- 此处定义了3条路由，父级路由`/wiki`、子路由`/wiki/sections`、`/wiki/playbook`
- 当访问路径`匹配`的时候，则会分别访问到组件`Abstract`、`Wiki`、`Playbook`


## 组件规范

- 自定义组件请将代码置于`src/components/`目录
- 组件命名规范`kebab-case (短横线分隔命名)`
- 组件开发必须遵循：
  - 单文件系统，`样式局部作用域`
  - 基本组成结构：`<template/> <script/> <style scoped/>`
  - 组件注册方式：公共组件`全局`注册，其余组件`局部`注册
- 全局注册：入口文件注册
    ```javascript
    // this is vue file
    import Component from './component';
    Vue.component('component_name', Component);
    ```
- 局部注册：
    ```javascript
    // this is vue file
    import Component_1 from './component_1';
    import Component_2 from './component_2';

    export default {
      components: {
        'component_name_1': Component_1,
        'component_name_2': Component_2
      }
    };
    ```
- 组件开发请参考相关[官方文档](https://cn.vuejs.org/v2/guide/components.html)


## 编码规范

  - 这里我们默认采用`eslint-config-elemefe`规范，具体规则见[Github](https://github.com/ElemeFE/eslint-config-elemefe/blob/master/rules.js)
  - Eslint所有规则参考[官网文档](http://eslint.cn/docs/rules/)


## 页面规范

  1. 每一个vue页面必须设置一个`唯一ID`
  2. 引入样式的时候必须使用`<style lang="scss" scoped>`，并在顶级样式设置`ID`，避免样式污染
  
  ```javascript
  <template lang="html">
    <div id="page-1">
      hello world
    </div>
  </template>
  <style lang="scss" scoped>
    #page-1 {
      width: 100%;
    }
  </style>
  ```


## API调用

```javascript
import { call } from '../../api/api'; // 此处引用{root_dir}/src/api/api.js，相对路径

// 参数1：请求地址
// 参数2：请求方法，支持get/post/delete/put/patch
// 参数3：请求参数，对象，可为{}
var params = {};
call('your_api_path', 'get', params).then((ret) => {
  console.log(ret);
});
```

- 在`前后端分离`的情况下，后端要做的只有返回标准的`JSON`字符串
- 在`yii2`中，建议在`web/index.php`中设置`默认返回类型`为JSON

```php
$config = include __DIR__ . '/../config/web.php';

Yii::setAlias("@modules", dirname(__DIR__) .'/modules');

$application = new yii\web\Application($config);
// 默认返回json
$application->response->format = \yii\web\Response::FORMAT_JSON;
$application->run();
```

- `开发模式`下，后端需要添加对跨域请求的支持
- 在`yii2`中，可以在`web/index.php`中添加以下代码

```php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: http://localhost:8080");
header("access-control-allow-credentials: true");
```


### 返回格式标准

- 返回格式
  - `code` 返回码
  - `data` 返回数据
  - `msg` 异常情况错误信息

- 正常返回格式：

```json
{
  "code": 1,
  "data": "Called successfully"
}
```

- 异常返回格式：

```json
{
  "code": 1001,
  "msg": "Data not found"
}
```
