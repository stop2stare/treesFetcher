import * as types from './mutations';
import Vue from 'vue';
import { saveLocalItem, removeLocalItem } from '../utils';

const githubApi = 'https://api.github.com';

/**
 * 搜索仓库
 */
export const searchRepos = ({ dispatch }, access_token, query) => {
  return Vue.http
    .get(`${githubApi}/search/repositories?q=${query.repo}&page=${query.page}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `token ${access_token}`
      }
    })
    .then(res => {
      dispatch(types.SEARCH_REPOS, res.data);
      return Promise.resolve({ status: true });
    })
    .catch(res => {
      console.error(res);
    });
}

/**
 * 搜索branches
 */
export const fetchBranches = ({ dispatch }, access_token, query) => {
  return Vue.http
    .get(`${githubApi}/repos/${query.owner}/${query.repo}/branches`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `token ${access_token}`
      }
    })
    .then(res => {
      dispatch(types.FETCH_BRANCHES, res.data);
      return Promise.resolve({ status: true });
    })
    .catch(res => {
      console.error(res);
    });
}


/**
 * 登录
 */
export const login = ({ dispatch }, access_token, remember_me) => {
  return Vue.http
    .get(`${githubApi}/user?access_token=${access_token}`)
    .then(res => {
      // 记住用户
      if (remember_me) {
        saveLocalItem('access_token', access_token);
        saveLocalItem('login', res.body.login);
        saveLocalItem('avatar_url', `${res.body.avatar_url}&s=40`);
      }
      dispatch(types.LOGIN, res.body);
      return Promise.resolve({ status: true });
    })
    .catch(res => {
      console.log(res);
    });
}

/**
 * 登出
 */
export const logout = ({ dispatch }) => {
  removeLocalItem('access_token');
  removeLocalItem('avatar_url');
  removeLocalItem('login');
  dispatch(types.LOGOUT);
  return Promise.resolve({status: true});
}
