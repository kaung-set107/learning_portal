import apiInstance from "../../../util/api";

const baseUrl = "/entrance-tests";
const baseName = "entrance-tests";

const getAll = async (payload) => {
  console.log(payload)
  const res = await apiInstance.get(baseUrl, {params: payload});
  console.log(baseName, res);
  return res.data;
};

const get = async (payload) => {
  const res = await apiInstance.get(baseUrl + `/${payload._id}`);
  console.log(baseName, res);
  return res.data;
};

const create = async (payload) => {
  const res = await apiInstance.post(baseUrl, payload);
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

export const entranceTestsApi = {
  getAll,
  get,
  create,
  update,
  remove,
};
