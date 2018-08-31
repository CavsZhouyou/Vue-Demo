/*
 * @Author: zhouyou@werun 
 * @Descriptions: 系统日志列表页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:01:23 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 20:22:43
 */

<template>
  <div id="system-log-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="系统日志列表"
                  key="1">
        <!-- 系统日志列表 -->
        <a-table :columns="columns"
                 :rowKey="record => record.id"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="showParam(record.param)">点击查看</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import qs from "qs";
import { mapGetters } from "vuex";
import * as urls from "../js/post_urls.js";

const columns = [
  {
    title: "时间",
    dataIndex: "operationTime",
    width: "20%",
    align: "center"
  },
  {
    title: "请求url",
    dataIndex: "url",
    width: "40%",
    align: "center"
  },
  {
    title: "请求用时",
    dataIndex: "costTime",
    width: "10%",
    align: "center"
  },
  {
    title: "来源ip",
    dataIndex: "ipAddress",
    width: "20%",
    align: "center"
  },
  {
    title: "参数",
    key: "action",
    width: "10%",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "SystemLogListPage",
  data: function() {
    return {
      data: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true
      },
      loading: false,
      columns
    };
  },
  computed: {
    ...mapGetters(["userID"])
  },
  mounted: function() {
    // 获取列表内容
    this.fetch();
  },
  methods: {
    /**
     * @description 点击分页动态更新列表数据
     * @param {Object} pagination 分页对象
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    handleTableChange: function(pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
      this.fetch();
    },

    /**
     * @description 获取列表数据
     */
    fetch: function() {
      const self = this;
      var postData = {
        start: this.pagination.current,
        sort: "operationTime",
        dir: "desc",
        limit: this.pagination.pageSize,
        workerId: this.userID
      };

      this.loading = true;

      self.$axios
        .post(urls.MES_GET_SYSTEM_LOG_URL, qs.stringify(postData))
        .then(function(response) {
          var data = response.data;

          self.loading = false;

          // 更新列表数据
          self.data = data.result;
          self.pagination.total = data.totalCount;
        });
    },

    /**
     * @description 查看参数
     * @param {Object} params 参数信息
     */
    showParam: function(params) {
      this.$info({
        title: "该条记录参数如下",
        content: params,
        onOk() {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-list {
  padding-left: 50px;
  padding-right: 50px;

  text-align: left;
}
</style>


