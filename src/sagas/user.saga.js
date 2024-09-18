import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import { actions as reloadHome } from "../reducers/home.actions";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const updateUSer = asyncFlow({
  actionGenerator: actions.updateUSer,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: (values) => {
    return request({
      url: `/users/${values.id}`,
      method: "put",
      body: values
    });
  },
  postSuccess: function* ({ response }) {
    yield put(actions.updateUSer.success(response.data));
  },
  postFailure: function* (error) {
    yield put(actions.updateUSer.failure(error.message));
  },
});

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/users/${values.id}`,
      method: "get"
    });
  },
  postSuccess: function* ({ response }) {
    yield put(routeActions.loadUser.success(response.data));
  },
  postFailure: function* (error) {
    yield put(actions.loadUser.failure(error.message));
  },
});

const getUser = asyncFlow({
  actionGenerator: actions.getUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/users/${values.id}`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    yield put(actions.getUser.success(response.data));
  },
  postFailure: function* (error) {
    yield put(actions.getUser.failure(error.message));
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  api: (values) => {
    return request({
      url: `/users`,
      method: "post",
      body: values,
    });
  },
  postSuccess: function* (response) {
    yield put(actions.saveUser.success(response.data));
    yield put(reloadHome.loadUsers.request());
  },
  postFailure: function* (error) {
    yield put(actions.saveUser.failure(error.message));
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/users/${values.id}`,
      method: "delete",
    });
  },
  postSuccess: function* ({ response }) {
    const id = response.data.id;
    yield put(actions.deleteUser.success(id));
    yield put(reloadHome.loadUsers.request());
  },
  postFailure: function* (error) {
    yield put(actions.deleteUser.failure(error.message));
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
  getUser.watcher(),
  updateUSer.watcher()
];
