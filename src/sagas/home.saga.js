import { put } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import { types as routes } from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { request } from "../utils/api";
import { parse } from "date-fns";

function* homeRouteWatcher() {
  yield routeWatcher(routes.HOME, function* () {
    yield put(actions.loadUsers.request());
  });
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => {
    return request({
      url: `/users`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    const sortedUsers = response.data.sort((a, b) => {
      const dateA = parse(a.dataNascimento, "yyyy-MM-dd", new Date());
      const dateB = parse(b.dataNascimento, "yyyy-MM-dd", new Date());
      return dateA - dateB;
    });
    yield put(actions.loadUsers.success(sortedUsers));
  },
  postFailure: function* (error) {
    yield put(actions.loadUsers.failure(error.message));
  },
});

export const sagas = [homeRouteWatcher(), loadUsers.watcher()];
