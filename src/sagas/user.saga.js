import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/usuario/${values.id}`,
      method: "get",
      isMock: true,
      mockResult: usersMock.find((u) => u.id === values.id) ?? null,
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
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
      url: `/usuario/${values.id}`,
      method: "get",
      isMock: true,
      mockResult: usersMock.find((u) => u.id === values.id) ?? null,
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `/usuario/${id}`,
      method: "put",
      body: values,
      isMock: true,
      mockResult: {},
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    const index = usersMock.findIndex((u) => u.id === values.id);
    if (index > -1) {
      usersMock.splice(index, 1); // Remove o usuário da lista mocada
    }
    return request({
      url: `/usuario/${values.id}`,
      method: "delete",
      isMock: true,
      mockResult: { id: values.id }
    });
  },
  postSuccess: function* ({ response }) {
    const id = response.data.id;
    yield put(actions.deleteUser.success(id));

    console.log({ user: response.data });
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
  getUser.watcher()
];
