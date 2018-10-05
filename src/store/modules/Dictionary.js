/*
 * @Author: zhouyou@werun 
 * @Descriptions: 作为预加载的字典信息 
 * @TodoList: 无
 * @Date: 2018-08-27 20:10:57 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:03:58
 */

import qs from "qs";
import axios from '../../js/axios';
import * as types from '../mutation_type';
import * as urls from "../../js/post_urls.js";



const HomePage = {
  state: {
    processList: [],
    machineTypeList: [],
    userRoleList: [],
    officeList: [],
    sexList: [],
    provinceList: [{
      value: "0",
      label: "正在加载",
      isLeaf: false
    }],
    designSeriesList: [],

  },
  mutations: {
    [types.GET_PROCESS_LIST](state, processList) {
      state.processList = processList;
    },
    [types.GET_MACHINE_TYPE_LIST](state, machineTypeList) {
      state.machineTypeList = machineTypeList;
    },
    [types.GET_USER_ROLE_LIST](state, userRoleList) {
      state.userRoleList = userRoleList;
    },
    [types.GET_OFFICE_LIST](state, officeList) {
      state.officeList = officeList;
    },
    [types.GET_SEX_LIST](state, sexList) {
      state.sexList = sexList;
    },
    [types.GET_PROVINCE_LIST](state, provinceList) {
      state.provinceList = provinceList;
    },
    [types.GET_DESIGN_SERIES_LIST](state, designSeriesList) {
      state.designSeriesList = designSeriesList;
    },
  },
  actions: {

    /**
     * @description 获取所属流程字典码
     */
    getProcessList({
      commit,
      state
    }) {
      let postData = {
        workerId: 1,
        parentCode: "17000000"
      };

      axios
        .post(urls.MES_GET_DIC_LIST_URL, qs.stringify(postData))
        .then(function (response) {
          let data = response.data;

          if (data.success) {
            // 赋值所属流程字典码
            commit(types.GET_PROCESS_LIST, data.data);
          }
        });

    },


    /**
     * @description 获取产品字典码
     */
    getMachineTypeList({
      commit,
      state
    }) {
      const self = this;
      let postData = {
        workerId: 1,
        parentCode: "05010000"
      };

      axios
        .post(urls.MES_GET_DIC_LIST_URL, qs.stringify(postData))
        .then(function (response) {
          let data = response.data;

          if (data.success) {
            // 赋值产品字典码
            commit(types.GET_MACHINE_TYPE_LIST, data.data);
          }
        });

    },

    /**
     * @description 获取角色字典码
     */
    getUserRoleList({
      commit,
      state
    }) {
      let postData = {
        workerId: 1,
      };

      axios
        .post(urls.MES_GET_WORKER_ROLE_URL, qs.stringify(postData))
        .then(function (response) {
          let data = response.data;

          if (data.success) {
            // 赋值角色字典码
            commit(types.GET_USER_ROLE_LIST, data.data);
          }
        });

    },

    /**
     * @description 获取办事处字典码
     */
    getOfficeList({
      commit,
      state
    }) {
      let postData = {
        workerId: 1,
      };

      axios
        .post(urls.MES_GET_OFFICE_PAGE_URL, qs.stringify(postData))
        .then(function (response) {
          let data = response.data;

          // 赋值办事字典码
          commit(types.GET_OFFICE_LIST, data.result);

        });

    },

    /**
     * @description 获取性别字典码
     */
    getSexList({
      commit,
      state
    }) {
      let sexList = [{
        dicCode: '男',
        dicName: '男'
      }, {
        dicCode: '女',
        dicName: '女'
      }]

      // 赋值性别字典码
      commit(types.GET_SEX_LIST, sexList);

    },

    /**
     * @description 获取省份字典码
     */
    getProvinceList({
      commit,
      state
    }) {
      let postData = {
        workerId: 1,
        countryId: 1
      };

      axios
        .post(urls.MES_GET_PROVINCE_LIST_URL, qs.stringify(postData))
        .then(function (response) {
          let data = response.data,
            provinceList = [];

          if (data.success) {

            // 格式化数据
            data.data.addressList.forEach(function (item, index) {
              let province = {
                value: "",
                label: "",
                isLeaf: false,
              };
              province.value = item.id.toString();
              province.label = item.name;
              provinceList.push(province);
            });

            // 赋值省份字典码
            commit(types.GET_PROVINCE_LIST, provinceList);
          }
        });

    },


    /**
     * @description 获取设计系列字典码
     */
    getDesignSeriesList({
      commit,
      state
    }) {
      let designSeriesList = [{
        dicCode: '01000000',
        dicName: '威尔顿'
      }, {
        dicCode: '02000000',
        dicName: '阿克明'
      }, {
        dicCode: '03000000',
        dicName: '簇绒'
      }]

      // 赋值设计系列字典码
      commit(types.GET_DESIGN_SERIES_LIST, designSeriesList);

    },

    /**
     * @description 获取所有字典信息
     */
    getDictionaries({
      dispatch,
      state
    }) {
      dispatch("getProcessList");
      dispatch("getMachineTypeList");
      dispatch("getUserRoleList");
      dispatch("getOfficeList");
      dispatch("getSexList");
      dispatch("getProvinceList");
      dispatch("getDesignSeriesList");
    }
  },
  getters: {
    processList: state => state.processList,
    machineTypeList: state => state.machineTypeList,
    userRoleList: state => state.userRoleList,
    officeList: state => state.officeList,
    sexList: state => state.sexList,
    provinceList: state => state.provinceList,
    designSeriesList: state => state.designSeriesList,
  }
}


export default HomePage;