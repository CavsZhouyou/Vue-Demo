/*
 * @Author: zhouyou@werun 
 * @Descriptions: 员工信息编辑页面 
 * @TodoList: 
 *   1. 如果员工角色为办事处员工，后端未返回所属办事处的id
 * @Date: 2018-08-26 23:09:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 21:21:00
 */


<template>
  <div id="personnel-modify-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="员工信息修改"
                  key="1">
        <!-- 员工信息修改表单 -->
        <a-form id="modify-personnel-form"
                @submit="modifyPersonnel()"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='姓名：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="name"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入姓名！' }]}">
            <a-input placeholder="请输入姓名"
                     v-model="name" />
          </a-form-item>
          <a-form-item label='年龄：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="age"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入年龄！' }]}">
            <a-input-number class="age"
                            :min="18"
                            :max="100"
                            placeholder="请输入年龄"
                            v-model="age" />
          </a-form-item>
          <a-form-item label='性别：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="sex"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择性别！' }]}">
            <a-select placeholder='请选择性别'
                      v-model="sex">
              <a-select-option v-for="(item, index) in sexList"
                               :key="index"
                               :value='item.dicCode'>{{item.dicName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label='入职时间：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="registerTime"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择入职时间！' }]}">
            <a-date-picker class="date"
                           placeholder="请选择入职时间"
                           v-model="registerTime" />
          </a-form-item>
          <a-form-item label='员工号：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="number"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入员工号！' }]}">
            <a-input placeholder="请输入员工号"
                     v-model="number" />
          </a-form-item>
          <a-form-item label='重置密码：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="password">
            <a-input type="password"
                     placeholder="请输入密码"
                     v-model="password" />
          </a-form-item>
          <a-form-item label='角色：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="roleCode"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择角色！' }]}">
            <a-select placeholder='请选择角色'
                      v-model="roleCode">
              <a-select-option v-for="(item, index) in userRoleList"
                               :key="index"
                               :value='item.roleCode'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-if="isOfficeShow"
                       label='所属办事处：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="officeId"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择所属办事处！' }]}">
            <a-select placeholder='请选择所属办事处'
                      v-model="officeId">
              <a-select-option v-for="(item, index) in officeList"
                               :key="index"
                               :value='item.id'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button class="commit"
                      type='primary'
                      htmlType='submit'
                      :loading="loading">
              确认修改
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>


<script>
import qs from "qs";
import moment from "moment";
import { mapGetters } from "vuex";
import { hex_md5 } from "../js/md5.js";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

const OFFICE_CODE = "04000000",
  PORTRAIT_URL = "http://p2p4htzmu.bkt.clouddn.com/images.png";

export default {
  name: "PersonnelModifyPage",
  data: function() {
    return {
      name: "",
      number: "",
      roleCode: "",
      officeId: "",
      sex: "",
      age: "",
      password: "",
      registerTime: "",

      id: "",

      fileList: [],

      loading: false,
      officeShow: false
    };
  },
  computed: {
    ...mapGetters(["userID", "userRoleList", "officeList", "sexList"]),

    /**
     * @description 判断角色是否为办事处员工
     */
    isOfficeShow: function() {
      return this.roleCode == OFFICE_CODE;
    }
  },
  mounted: function() {
    // 获取员工信息
    this.getPersonnelData();
  },
  methods: {
    /**
     * @description 获取员工信息
     */
    getPersonnelData: function() {
      const self = this;
      var postData = {
        number: this.$route.query.number,
        workerId: this.userID
      };

      this.$axios
        .post(urls.MES_GET_WORKER_INFO_URL, qs.stringify(postData))
        .then(function(response) {
          var data = response.data;

          if (data.success) {
            // 获取员工信息
            self.id = data.data.id;
            self.name = data.data.name;
            self.number = data.data.number;
            self.roleCode = data.data.roles[0].roleCode;
            self.sex = data.data.sex;
            self.age = data.data.age;
            self.registerTime = moment(data.data.registerTime); // 格式日期后传入表单

            // 更新表单数据
            self.setPersonnelFormData();
          }
        });
    },

    /**
     * @description 设置表单数据
     */
    setPersonnelFormData: function() {
      this.form.setFieldsValue({
        name: this.name,
        number: this.number,
        roleCode: this.roleCode,
        // officeId: this.officeId, // 因为后端未返回，所以暂时注释掉
        sex: this.sex,
        age: this.age,
        registerTime: this.registerTime
      });
    },

    /**
     * @description 修改员工信息
     */
    modifyPersonnel: function() {
      event.preventDefault();

      const self = this;
      var postData = {
        id: this.id,
        name: this.name,
        number: this.number,
        roleCode: this.roleCode,
        officeId: this.officeId,
        sex: this.sex,
        age: this.age,
        password: this.password == "" ? "" : hex_md5(this.password),
        portrait: PORTRAIT_URL,
        workerId: this.userID
        //registerTime: this.registerTime,
      };

      this.form.validateFields(function(error, values) {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要修改此员工信息吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_MODIFY_WORKER_URL, qs.stringify(postData))
                .then(function(response) {
                  var data = response.data;

                  if (data.success) {
                    self.$message.success("修改成功！");
                    self.$router.push(paths.MES_PERSONNEL_LIST_PAGE_PATH);
                  } else {
                    self.$message.error("修改失败！");
                    self.loading = false;
                  }
                });
            }
          });
        }
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

#modify-personnel-form {
  margin-top: 25px;
}

.age {
  width: 100%;
}

.date {
  width: 100%;
}

.commit {
  width: 100%;
}
</style>

