/*
 * @Author: zhouyou@werun 
 * @Descriptions: 接口请求路径管理文件 
 * @TodoList: 无
 * @Date: 2018-08-29 18:37:59 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 20:05:51
 */

/** Dictionary */
export const MES_GET_DIC_LIST_URL = "/mes/common/getDicListByParentCode";
export const MES_GET_WORKER_ROLE_URL = "/mes/manager/worker/getWorkerRoleDictionary";
export const MES_GET_OFFICE_PAGE_URL = "/mes/manager/basicInfo/getOfficePage";
export const MES_GET_PROVINCE_LIST_URL = "/mes/address/getProvinceListByCountryId";


/** LoginPage */
export const MES_LOGIN_URL = "/mes/manager/worker/login";


/** SystemLogListPage */
export const MES_GET_SYSTEM_LOG_URL = "/mes/manager/system/getSystemLog";


/** Machine Page */
export const MES_GET_MACHINE_PAGE_URL = "/mes/manager/machine/getMachinePage";
export const MES_DELETE_MACHINE_URL = "/mes/manager/machine/deleteMachine";
export const MES_ADD_MACHINE_URL = "/mes/manager/machine/addMachine";
export const MES_MODIFY_MACHINE_URL = "/mes/manager/machine/modifyMachineInfoById";
export const MES_GET_MACHINE_INFO_URL = "/mes/manager/machine/getMachineInfoById";


/** Personnel page */
export const MES_GET_ALL_WORKERS_URL = "/mes/manager/worker/getAllWorkers";
export const MES_DELETE_WORKER_URL = "/mes/manager/worker/deleteWorkerById";
export const MES_ADD_WORKER_URL = "/mes/manager/worker/addWorker";
export const MES_IMPORT_INFO_URL = "/mes/manager/worker/importInfo";
export const MES_MODIFY_WORKER_URL = "/mes/manager/worker/modifyWorkerInfo";
export const MES_GET_WORKER_INFO_URL = "/mes/worker/getByNumber";


/** Office Page */
export const MES_DELETE_OFFICE_URL = "/mes/manager/basicInfo/deleteOffice";
export const MES_ADD_OFFICE_URL = "/mes/manager/basicInfo/addOffice";
export const MES_MODIFY_OFFICE_URL = "/mes/manager/basicInfo/modifyOffice";
export const MES_GET_CITY_LIST_URL = "/mes/address/getCityListByProvinceId";


/** Design Series Page */
export const MES_GET_DESIGN_SERIES_URL = "/mes/manager/basicInfo/getDesignSeriesPageByParentCode";
export const MES_DELETE_DESIGN_SERIES_URL = "/mes/manager/basicInfo/deleteDesignSeries";
export const MES_ADD_DESIGN_SERIES_URL = "/mes/manager/basicInfo/addDesignSeries";