import { getFormData } from "../../../util";
import apiInstance from "../../../util/api";

const baseUrl = "/exam-results";
const baseName = "exam-results";

const getAll = async (payload) => {
  const res = await apiInstance.get(baseUrl, { params: payload });
  console.log(baseName, res);

  res.data.data = res.data.data.map((each, index) => {
    let newObj = each;
    newObj.index = index + 1;
    return newObj;
  });

  return res.data;
};

const get = async (payload) => {
  const res = await apiInstance.get(baseUrl + `/${payload._id}`);
  console.log(baseName, res);
  return res.data;
};

const create = async (payload) => {
  const res = await apiInstance.post(baseUrl, getFormData(payload));
  console.log(baseName, res);
  return res.data;
};

const update = async (payload) => {
  const res = await apiInstance.put(baseUrl + `/${payload._id}`, payload);
  console.log(baseName, res);
  return res.data;
};

const remove = async (payload) => {
  const res = await apiInstance.delete(baseUrl + `/${payload._id}`);
  console.log(baseName, res);
  return res.data;
};

const check = async (payload) => {
  console.log(payload)
  const res = await apiInstance.put(baseUrl + `/${payload._id}/check`, getFormData(payload));
  console.log(baseName, res);
  return res.data;
};

const checkInApp = async (payload) => {
  console.log(payload)
  const res = await apiInstance.put(baseUrl + `/${payload._id}/check-in-app`, payload);
  console.log(baseName, res);
  return res.data;
};

export const examResultsApi = {
  getAll,
  get,
  create,
  update,
  remove,
  check,
  checkInApp
};
