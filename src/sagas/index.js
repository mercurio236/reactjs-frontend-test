import { all } from "redux-saga/effects";
import { sagas as homeSagas } from "./home.saga";
import { sagas as userSagas } from "./user.saga";
import { sagas as zipcodeSagas } from "./searchzipcode.saga";

const sagas = function* () {
  yield all([...homeSagas, ...userSagas, ...zipcodeSagas]);
};

export default sagas;
