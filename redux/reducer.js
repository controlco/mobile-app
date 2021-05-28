import {combineReducers} from 'redux';

const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  userLastname: null,
  userToken: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    default:
      return prevState;
  }
};

export default combineReducers({
  user: userReducer,
});
