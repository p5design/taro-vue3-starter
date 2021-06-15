// 权限处理，必备的信息
import { get, set, remove } from "@/utils/storage";

const TOKEN_KEY = "token_id"; // 通用属性
const SITE_KEY = "site_id"; // walnut特有

const USER_ID = "user_id";
const USER_AVATAR = "user_avatar";
const USER_NICKNAME = "user_nickname";
const USER_PHONE = "user_phone";

const USER_INFO = "user_info";
const USER_ROLE = "user_role";
const USER_ROLETITLE = "user_roletitle";
const USER_ACTIONS = "user_actions";

// 判断是否登陆
export function isLogin() {
  let token = getToken();
  let avatar = getUserAvatar();
  let phone = getUserPhone();
  // 拿到了token，也获取了用户信息
  if (token && avatar && phone) {
    return true;
  }
  return false;
}

// token
export function getToken() {
  return get(TOKEN_KEY);
}
export function setToken(token) {
  return set(TOKEN_KEY, token);
}
export function removeToken() {
  return remove(TOKEN_KEY);
}

// 用户
export function getUserInfo() {
  return get(USER_INFO);
}
export function getUserId() {
  return get(USER_ID);
}
export function getUserAvatar() {
  return get(USER_AVATAR);
}
export function getUserNickname() {
  return get(USER_NICKNAME);
}
export function getUserPhone() {
  return get(USER_PHONE);
}
export function getRole() {
  return get(USER_ROLE);
}
export function getRoleTitle() {
  return get(USER_ROLETITLE);
}
export function getRoleActions() {
  return get(USER_ACTIONS);
}
export function setUserId(uId) {
  set(USER_ID, uId);
}

export function setUserInfo(uInfo, uId, uAvatar, uNickname) {
  set(USER_INFO, uInfo);
  set(USER_ID, uId);
  set(USER_AVATAR, uAvatar);
  set(USER_NICKNAME, uNickname);
}

export function setUserPhone(uPhone) {
  set(USER_PHONE, uPhone);
}

export function setUserRole(role, roleTitle, actions) {
  set(USER_ROLE, role);
  set(USER_ROLETITLE, roleTitle);
  set(USER_ACTIONS, actions);
}
export function hasRoleAction(action) {
  let actions = get(USER_ACTIONS) || [];
  return actions.indexOf(action) != -1;
}
export function removeUserInfo() {
  remove(USER_INFO);
  remove(USER_ID);
  remove(USER_AVATAR);
  remove(USER_NICKNAME);
  remove(USER_PHONE);
  remove(USER_ROLE);
  remove(USER_ROLETITLE);
  remove(USER_ACTIONS);
}

// 设置登录信息
export function setLoginInfo(token, uInfo) {
  // token
  if (token) {
    setToken(token);
  }
  if (uInfo.phone) {
    setUserPhone(uInfo.phone);
  }
  // 用户信息
  let uId = uInfo.id;
  let uAvatar = uInfo.avatar || "";
  let uNickname = uInfo.nickname || "";
  setUserInfo(uInfo, uId, uAvatar, uNickname);
}

// walnut特有
// site
export function getSite() {
  return get(SITE_KEY);
}
export function setSite(siteId) {
  return set(SITE_KEY, siteId);
}
export function removeSite() {
  return remove(SITE_KEY);
}
