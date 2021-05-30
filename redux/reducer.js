const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userToken: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...prevState,
        userToken: action.payload.token,
        userEmail: action.payload.email,
        isLoggedIn: true,
      };
    case 'USER_SIGNUP':
      return {
        ...prevState,
        userToken: action.payload.token,
        userEmail: action.payload.email,
        isLoggedIn: true,
      };
    default:
      return prevState;
  }
};

export default userReducer;
