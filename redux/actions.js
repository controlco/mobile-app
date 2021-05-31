export const login = (userData, token) => {
  return {
    type: 'USER_LOGIN',
    payload: {
      email: userData.email,
      token: token,
    },
  };
};

export const signup = userIndex => ({
  type: 'USER_SIGNUP',
  payload: userIndex,
});
