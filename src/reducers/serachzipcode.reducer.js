import { actions } from "./searchzipcode.actions";

const initialState = {
  zipcode: "",
  loading: false,
  result: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.searchZipCode.REQUEST:
      return {
        ...state,
        zipcode: action.payload,
      };
    case actions.searchZipCode.SUCCESS:
      return{
        ...state,
        result: action.payload
      }
    case actions.searchZipCode.FAILURE:
      return {
        ...state,
        loading: action.type === actions.searchZipCode.REQUEST,
        result:
          action.type === actions.searchZipCode.SUCCESS
            ? action.payload.response.result
            : null,
      };
    default:
      return state;
  }
};

export default reducer;
