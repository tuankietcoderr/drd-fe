const authSelector = {
  selectIsAuthenticated: state => state.auth.isAuthenticated,
  selectUser: state => state.auth.user,
};

export default authSelector;
