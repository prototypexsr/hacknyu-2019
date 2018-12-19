import {
  ADD_USER,
  CLEAR_EMAIL_STATE,
  CLEAR_ERROR,
  CLEAR_NOTIFICATION,
  DELETE_USER,
  LOCATION_CHANGE,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  PASSWORD_EMAIL_FULFILLED,
  PASSWORD_EMAIL_REJECTED,
  REFRESH_WINDOW_DIMENSIONS,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  UPDATE_PASSWORD_FULFILLED,
  UPDATE_PASSWORD_REJECTED
} from "./coreActions";

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = () => {
  return (
    Math.max(window.document.documentElement.clientWidth, window.innerWidth) ||
    0
  );
};

const getViewportHeight = () => {
  return (
    Math.max(
      window.document.documentElement.clientHeight,
      window.innerHeight
    ) || 0
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  user: {},
  errors: {},
  notifications: {},
  passwordEmailSent: false
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFRESH_WINDOW_DIMENSIONS:
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();

      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else return state; //otherwise do not mutate
    case LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload,
        notifications: {
          ...state.notifications,
          login: "Successfully logged in"
        }
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, login: action.payload.message }
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        user: undefined,
        notifications: {
          ...state.notifications,
          logout: "Successfully logged out"
        }
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, logout: action.payload.message }
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, register: action.payload.message }
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        user: action.payload,
        notifications: {
          ...state.notifications,
          register: "New user registered!"
        }
      };
    case PASSWORD_EMAIL_FULFILLED:
      return { ...state, passwordEmailSent: true };
    case PASSWORD_EMAIL_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, passwordEmail: action.payload.message }
      };
    case UPDATE_PASSWORD_FULFILLED:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          updatePassword: "Password successfully updated"
        }
      };
    case UPDATE_PASSWORD_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, updatePassword: action.payload.message }
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        user: undefined
      };
    case CLEAR_EMAIL_STATE:
      return { ...state, passwordEmailSent: false };
    case CLEAR_ERROR:
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return {
        ...state,
        errors: newErrors
      };
    case CLEAR_NOTIFICATION:
      const newNotifications = { ...state.errors };
      delete newNotifications[action.payload];
      return {
        ...state,
        notifications: newNotifications
      };
    default:
      break;
  }

  return state;
};

export default reducer;
