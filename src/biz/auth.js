// 权限处理，必备的信息
import { get, set, remove } from "@/utils/storage";

// TOKEN
const TOKEN = "TOKEN"; //
const TOKEN_TMP = "token_tmp"; // 临时token
const SITE_ID = "site_id"; // walnut特有

// 用户
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
  let nickname = getUserNickname();
  // 拿到了token，也获取了用户信息
  if (token && avatar && nickname) {
    return true;
  }
  return false;
}

// token
export function getToken() {
  return get(TOKEN);
}
export function setToken(token) {
  return set(TOKEN, token);
}
export function removeToken() {
  return remove(TOKEN);
}

export function getTokenTmp() {
  return get(TOKEN_TMP);
}
export function setTokenTmp(token) {
  return set(TOKEN_TMP, token);
}
export function removeTokenTmp() {
  return remove(TOKEN_TMP);
}

// site
export function getSite() {
  return get(SITE_ID);
}
export function setSite(siteId) {
  return set(SITE_ID, siteId);
}
export function removeSite() {
  return remove(SITE_ID);
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

// 清理用户信息缓存
export function removeUserInfo() {
  remove(USER_ID);

  remove(USER_AVATAR);
  remove(USER_NICKNAME);
  remove(USER_PHONE);
  remove(USER_INFO);

  remove(USER_ROLE);
  remove(USER_ROLETITLE);
  remove(USER_ACTIONS);
}

// 角色与权限
export function setUserRole(role, roleTitle, actions) {
  set(USER_ROLE, role);
  set(USER_ROLETITLE, roleTitle);
  set(USER_ACTIONS, actions);
}

export function hasRoleAction(action) {
  let actions = get(USER_ACTIONS) || [];
  return actions.indexOf(action) != -1;
}

// 设置登录信息
export function setLoginInfo(token, uInfo) {
  // token
  if (token) {
    setToken(token);
  }
  // 根据业务自行修改 对应的key
  let avatar = uInfo.avatarUrl || "";
  let nickname = uInfo.nickName || "";
  let phone = uInfo.phone || "";
  let id = uInfo.uid || "";

  // 缓存
  set(USER_ID, id);
  set(USER_AVATAR, avatar);
  set(USER_NICKNAME, nickname);
  set(USER_PHONE, phone);
  set(USER_INFO, {
    id,
    phone,
    nickname,
    avatar,
  });
}
