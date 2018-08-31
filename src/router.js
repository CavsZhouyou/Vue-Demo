/*
 * @Author: zhouyou@werun 
 * @Descriptions: 页面路由配置文件
 * @Date: 2018-08-25 21:01:37 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 20:42:19
 */


import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import SystemLogListPage from './views/SystemLogListPage';
import MachineAddPage from './views/MachineAddPage';
import MachineModifyPage from './views/MachineModifyPage';
import MachineListPage from './views/MachineListPage';
import PersonnelListPage from './views/PersonnelListPage';
import PersonnelAddPage from './views/PersonnelAddPage';
import PersonnelModifyPage from './views/PersonnelModifyPage';
import OfficeAddPage from './views/OfficeAddPage';
import OfficeModifyPage from './views/OfficeModifyPage';
import OfficeListPage from './views/OfficeListPage';
import DesignSeriesListPage from './views/DesignSeriesListPage';
import DesignSeriesAddPage from './views/DesignSeriesAddPage';


Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  }, {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
    children: [{
        path: "/",
        name: "SystemLogListPage",
        component: SystemLogListPage,
      }, {
        path: "MachineListPage",
        name: "MachineListPage",
        component: MachineListPage,
      }, {
        path: "MachineAddPage",
        name: "MachineAddPage",
        component: MachineAddPage,
      },
      {
        path: "MachineModifyPage",
        name: "MachineModifyPage",
        component: MachineModifyPage,
      },
      {
        path: "PersonnelListPage",
        name: "PersonnelListPage",
        component: PersonnelListPage,
      },
      {
        path: "PersonnelAddPage",
        name: "PersonnelAddPage",
        component: PersonnelAddPage,
      }, {
        path: "PersonnelModifyPage",
        name: "PersonnelModifyPage",
        component: PersonnelModifyPage,
      },
      {
        path: "OfficeAddPage",
        name: "OfficeAddPage",
        component: OfficeAddPage,
      },
      {
        path: "OfficeModifyPage",
        name: "OfficeModifyPage",
        component: OfficeModifyPage,
      },
      {
        path: "OfficeListPage",
        name: "OfficeListPage",
        component: OfficeListPage
      },
      {
        path: "DesignSeriesAddPage",
        name: "DesignSeriesAddPage",
        component: DesignSeriesAddPage
      },
      {
        path: "DesignSeriesListPage",
        name: "DesignSeriesListPage",
        component: DesignSeriesListPage
      }
    ]
  }]
})