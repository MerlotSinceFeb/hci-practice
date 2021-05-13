const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userType: state => state.user.userType,
  age: state => state.user.age,
  sex: state => state.user.sex,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes
}
export default getters
