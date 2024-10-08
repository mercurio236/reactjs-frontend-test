import { put, select } from "redux-saga/effects";
import asyncFlow from "./asyncHandler";
import { actions } from "../reducers/searchzipcode.actions";
import { request } from "../utils/api";

const searchZipCode = asyncFlow({
  actionGenerator: actions.searchZipCode,
  transform: function* () {
    const zipCodeNumber = yield select((state) => state.zipcode.zipcode);
    return { zipCodeNumber };
  },
  api: (values) => {
    return request({
      url: `https://viacep.com.br/ws/${values.zipCodeNumber}/json/`,
      method: "get",
      isMock: false,
      mockResult: {},
    });
  },
  postSuccess: function* ({ response }) {
    const zipResult = response.data
    yield put(actions.searchZipCode.success(zipResult))
  },
});

export const sagas = [searchZipCode.watcher()];
