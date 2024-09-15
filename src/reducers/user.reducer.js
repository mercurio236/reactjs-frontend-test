import { actions } from "./user.actions";
import { types as routes } from "./routes.actions";

const initialState = {
  id: null,
  data: [],
  loading: false,
  modalShow: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routes.USER:
      return {
        ...initialState,
        id: action.payload.id,
      };
    case actions.loadUser.REQUEST:
    case actions.loadUser.SUCCESS:
    case actions.loadUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUser.REQUEST,
        data:
          action.type === actions.loadUser.SUCCESS
            ? action.payload.response.data
            : [],
      };
    case actions.getUser.REQUEST:
      return {
        id: action.payload.id,
        modalShow: !!action.payload.id
      };
    case actions.getUser.SUCCESS:
    case actions.getUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.getUser.REQUEST,
        data:
          action.type === actions.getUser.SUCCESS
            ? action.payload.response.data
            : []
      };
    case actions.deleteUser.REQUEST:
      return {
        ...state,
        id: action.payload.id,
      };
    case actions.deleteUser.SUCCESS:
      return{
        ...state,
        data: [state.data].filter(user => user.id !== action.payload.id),
        modalShow: false
      }
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
