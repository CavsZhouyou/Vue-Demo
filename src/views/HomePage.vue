/*
 * @Author: zhouyou@werun 
 * @Descriptions: 主页
 * @TodoList: 无
 * @Date: 2018-08-25 23:36:42 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:25:45
 */


<template>
  <div id="home-page">
    <a-layout>
      <!-- 侧边导航栏 -->
      <a-layout-sider :trigger="null"
                      collapsible
                      v-model="collapsed"
                      width="270">
        <!-- logo显示 -->
        <div class="logo" />
        <a-menu :defaultSelectedKeys="['1']"
                :defaultOpenKeys="['sub1']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed">
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="laptop" />
              <span class="sub-title">系统管理</span>
            </span>
            <a-menu-item key="1">
              <router-link :to="paths.MES_SYSTEM_LOG_PAGE_PATH">系统日志列表</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="tool" />
              <span class="sub-title">
                机器管理
              </span>
            </span>
            <a-menu-item key="2">
              <router-link :to="paths.MES_MACHINE_LIST_PAGE_PATH">机器列表</router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link :to="paths.MES_MACHINE_ADD_PAGE_PATH">添加机器</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="user" />
              <span class="sub-title">员工管理</span>
            </span>
            <a-menu-item key="4">
              <router-link :to="paths.MES_PERSONNEL_LIST_PAGE_PATH">员工列表</router-link>
            </a-menu-item>
            <a-menu-item key="5">
              <router-link :to="paths.MES_PERSONNEL_ADD_PAGE_PATH">添加员工</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="appstore" />
              <span class="sub-title">办事处管理</span>
            </span>
            <a-menu-item key="6">
              <router-link :to="paths.MES_OFFICE_LIST_PAGE_PATH">办事处列表</router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link :to="paths.MES_OFFICE_ADD_PAGE_PATH ">添加办事处</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub5">
            <span slot="title">
              <a-icon type="copy" />
              <span class="sub-title">基础信息管理</span>
            </span>
            <a-menu-item key="8">
              <router-link :to="paths.MES_DESIGN_SERIES_LIST_PAGE_PATH">设计系列列表</router-link>
            </a-menu-item>
            <a-menu-item key="9">
              <router-link :to="paths.MES_DESIGN_SERIES_ADD_PAGE_PATH">添加设计系列</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <a-row>
            <a-col :span="5">
              <!-- 侧边栏隐藏控制 -->
              <a-icon class="trigger"
                      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                      @click="()=> collapsed = !collapsed" />
            </a-col>
            <a-col :span="3"
                   :offset="15">
              <span class="name">
                欢迎您，{{userName}}！
              </span>
              <a-icon class="logout"
                      type="logout"
                      @click="logout()" />
            </a-col>
          </a-row>

        </a-layout-header>
        <a-layout-content class="content">
          <!-- 路由主体 -->
          <transition name="fade"
                      enter-active-class="fadeInLeft"
                      leave-active-class="fadeOutRight"
                      mode="out-in">
            <router-view />
          </transition>
        </a-layout-content>
        <!-- 网站信息 -->
        <a-layout-footer class="footer">
          Copyright(c) 2005-2014 威海翰宝科技 All Rights Reserved
          <br> 联系电话: 0631-52123456
          <br> 鲁ICP备05003732号
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import * as paths from "../js/router_paths.js";

export default {
  name: "HomePage",
  data() {
    return {
      collapsed: false,

      paths
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  mounted() {
    // 获取字典信息
    this.getDictionaries();
  },
  methods: {
    ...mapActions(["getDictionaries"]),

    /**
     * @description 退出登录
     */
    logout() {
      const self = this;

      this.$confirm({
        title: "确定退出登录吗？",
        onOk() {
          // 清空cookie
          self.$cookie.deleteAllCookies();

          // 返回登录页
          self.$router.push(paths.MES_LOGIN_PAGE_PATH);
          location.reload();
        },
        class: "test"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$red: #f30e5c;
$blue: #1890ff;
$default_size: 14px;
$background_color: #fff;
$logo_url: "../assets/images/logo.png";

.logo {
  margin: 16px;
  height: 60px;

  /* logo 图片 */
  background-color: $background_color;
  background-image: url($logo_url);
  background-position: -10px;
  background-size: 250px 60px;
}

.sub-title {
  font-size: $default_size;
}

/* 覆盖 sidebar 样式 */
.ant-menu-submenu-inline {
  padding-left: 15px;
  text-align: left;
}

/* 覆盖 sidebar 样式 */
.ant-menu-item {
  font-size: $default_size !important;
}

.content {
  margin: 35px;
  padding-top: 10px;
  min-height: 685px;

  background: $background_color;
}
.header {
  height: 80px;
  padding: 0;

  line-height: 80px;

  background: $background_color;
}

.trigger {
  float: left;
  padding: 0 24px;

  line-height: 80px;
  font-size: 18px;

  transition: color 0.3s;

  cursor: pointer;
}

.trigger:hover {
  color: $blue;
}

.logout {
  float: right;

  font-size: 20px;
  line-height: 80px;

  transition: color 0.3s;

  cursor: pointer;
}

.logout:hover {
  color: $red;
}
</style>


