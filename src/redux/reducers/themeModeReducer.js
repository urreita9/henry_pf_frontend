import { SET_THEME_MODE } from "../actions/actions";

const initialState = {
    mode: true,
  };

  const themeModeReducer = (state = initialState, {type, payload}) => {
    switch (type) {
    case SET_THEME_MODE:
        return {
            ...state,
            mode: payload
        }
      default:
        return state;
    }
  };

  export default themeModeReducer;
