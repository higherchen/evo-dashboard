<template>
  <section class="db">
    <template v-if="!$route.meta.hidden">
      <!-- header start  -->
      <header class="db-header">
        <router-link class="logo" :to="{path: '/'}">Dashboard</router-link>
        <router-link class="link" :to="{path: '/'}">首页</router-link>
        <div class="user-info" v-if="user.id">
          <el-dropdown trigger="click" style="cursor: pointer; color: #fff">
            <span class="el-dropdown-link">
              <img v-bind:src="avatar"> {{ user.username }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <!-- header end  -->

      <!-- body start  -->
      <div class="db-body">

        <!-- nav menu start -->
        <aside class="db-menu-wrapper">
          <el-menu :unique-opened="true" :default-openeds="openMenu" :default-active="activeMenu" class="db-menu-bar" router>
            <el-submenu :index="item.action" v-for="(item, index) in menu">
              <template slot="title"><i :class="item.iconClass"></i>{{item.name}}</template>
              <el-menu-item-group v-for="(group, idx) in item.groups" :title="group.name">
                <el-menu-item :index="cItem.action" v-for="(cItem, cIndex) in group.children">{{cItem.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </aside>
        <!-- nav menu end -->

        <!-- content start -->
        <div class="db-content-wrapper">
          <section class="db-content">
            <router-view></router-view>
          </section>
        </div>
        <!-- content end -->
      </div>
      <!-- body end  -->
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>

<script>
import { webroot } from 'config';

var menu = require('./menu');

export default {
  data() {
    return {
      avatar: webroot + 'avatar.ico',
      user: {
        id: '',
        username: ''
      },
      menu: [],
      activeMenu: '',
      openMenu: []
    };
  },
  // 初始化
  created() {
    // 构建菜单
    var path = this.$route.path;
    this.activeMenu = path;
    var matches = path.match(/^\/?(\w+)/);
    if (matches) {
      this.openMenu = [matches[0]];
    }
    this.init();
  },
  // 监控
  watch: {
    '$route'(to, from) {
      // 构建菜单
      var path = this.$route.path;
      this.activeMenu = path;
      var matches = path.match(/^\/?(\w+)/);
      if (matches) {
        this.openMenu = [matches[0]];
      }
      this.init();
    }
  },
  methods: {
    init() {
      var data = JSON.parse(localStorage.getItem('user'));
      if (!data) {
        this.$router.push({ path: '/login' });
        return false;
      }

      // 初始化用户产品情况
      this.user.id = data.id;
      this.user.username = data.username;

      // 初始化用户权限
      var auth = {};
      data.items.forEach(function(item) {
        auth[item] = true;
      });
      // 开始构建左侧菜单
      menu = menu.filter(function(item) {
        var groups = item.groups;
        // 二级分类
        groups = groups.filter(function(group) {
          var children = group.children;
          if (children && Array.isArray(children)) {
            // 三级分类筛选
            children = children.filter(function(child) {
              return authValid(child.auth_should, child.auth_must, auth);
            });
            if (children.length <= 0) {
              return false;
            } else {
              group.children = children;
              return true;
            }
          }
        });
        if (groups.length <= 0) {
          return false;
        } else {
          item.groups = groups;
          return true;
        }
      });

      this.menu = menu;
    },
    logout() {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '点击了注销按钮',
          type: 'success'
        });
      }).catch(() => {});
    }
  }
};

/**
 * auth_should array 访问所需权限[or]
 * auth_must array 访问所需权限[and]
 * user_auth array 用户拥有的权限
 */
function authValid(auth_should, auth_must, user_auth) {
  if (!auth_should && !auth_must) return true;

  var i, len;

  // 验证auth_must，只要用户权限有一个不存在，则返回失败
  if (auth_must && auth_must.length > 0) {
    for (i = 0, len = auth_must.length; i < len; i++) {
      if (!user_auth[auth_must[i]]) {
        return false;
      }
    }
  }

  // 验证auth_should，只要用户权限存在其中任何一个，则返回成功
  if (auth_should && auth_should.length > 0) {
    for (i = 0, len = auth_should.length; i < len; i++) {
      if (user_auth[auth_should[i]]) {
        return true;
      }
    }
  }

  return false;
}
</script>

<style lang="scss">
@import './styles/_variables.scss';

.db {
  .el-dropdown-menu {
    margin-top: 20px;
  }
  .db-header {
    width: 100%;
    height: 60px;
    background: #000;
    padding: 13px 20px;
    box-sizing: border-box;
    color: #ffffff;
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;

    .logo{
      font-size: 2.4rem;
    }
    .link{
      font-size: 1.6rem;
      margin-left: 60px;
    }
    .user-info {
      float: right;
      img {
        width: 25px;
        height: 25px;
        vertical-align: -7px;
        margin: 0 0 0 10px;
        cursor: pointer;
      }
    }
  }
  .db-body {
    .db-menu-wrapper {
      position: fixed;
      left: 0;
      top: 60px;
      background-color: #eef1f6;
      height: 91%;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 98;

      .db-menu-bar {
        height: 100%;
        flex-grow: 0;
        width: 150px;
        background-color: #eef1f6;
      }
    }
    .db-content-wrapper {
      width: 100%;
      z-index: 97;
      box-sizing: border-box;
      padding: 60px 0px 0px 150px;

      .db-content {
        padding: 25px;

        .db-content-inner {
          padding: 30px 0px;
        }

        .el-tree {
          border: 1px solid #d1dbe5;

          .el-tree-node__content {
            height: 36px;
          }
        }

        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
          color: #bfcbd9;
          cursor: not-allowed;
          background-image: none;
          background-color: #eef1f6;
          border-color: #d1dbe5;
        }

        .table-expand {
          font-size: 0;

          label {
            width: 120px;
            color: #99a9bf;
          }

          .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
