import { actions } from "./user.actions";
import { types as routes } from "./routes.actions";

const initialState = {
  id: null,
  data: [],
  loading: false,
  modalShow: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routes.USER:
      return {
        ...initialState,
        id: action.payload.id,
      };
    case actions.loadUser.REQUEST:
      return {
        ...state,
        data: action.payload,
      };
    case actions.loadUser.SUCCESS:
      return {
        ...state,
        user: action.payload.response.data,
      };
    case actions.loadUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUser.REQUEST,
        data:
          action.type === actions.loadUser.SUCCESS
            ? action.payload.response.data
            : [],
      };
    case actions.saveUser.REQUEST:
      return {
        ...state,
        modalCreateUser: false,
      };
    case actions.saveUser.SUCCESS:
      return {
        ...state,
        data: state.data,
      };
    case actions.saveUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.saveUser.REQUEST,
        data:
          action.type === actions.saveUser.SUCCESS
            ? action.payload.response.data
            : [],
      };
    case actions.getUser.REQUEST:
      return {
        ...state,
        id: action.payload.id,
        modalShow: !!action.payload.id,
        user: action.payload,
      };
    case actions.getUser.SUCCESS:
      return {
        ...state,
        user: action.payload,
        modalShow: !!action.payload.id,
      };
    case actions.getUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.getUser.REQUEST,
        data:
          action.type === actions.getUser.SUCCESS
            ? action.payload.response.data
            : [],
      };
    case actions.updateUSer.REQUEST:
      return {
        ...state,
        id: action.payload.id,
        user: action.payload,
      };
    case actions.updateUSer.SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actions.updateUSer.FAILURE:
      return {
        ...state,
        loading: action.type === actions.updateUSer.REQUEST,
        data:
          action.type === actions.updateUSer.SUCCESS
            ? action.payload.response.data
            : [],
      };
    case actions.deleteUser.REQUEST:
      return {
        ...state,
        id: action.payload.id,
      };
    case actions.deleteUser.SUCCESS:
      return {
        ...state,
        data: state.data,
        modalShow: false,
      };
    case actions.deleteUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.deleteUser.REQUEST,
        data:
          action.type === actions.deleteUser.SUCCESS
            ? action.payload.response.data
            : [],
      };
    default:
      return state;
  }
};

export default reducer;
