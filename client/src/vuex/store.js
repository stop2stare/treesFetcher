import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import * as types from './mutations';
import { getLocalItem } from '../utils';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
	reposList: [],
	total_count: 0,
	avatar_url: getLocalItem('avatar_url') || '',
	access_token: getLocalItem('access_token') || ''
}

const mutations = {
	[types.SEARCH_REPOS](state, data) {
		state.reposList = data.items;
		state.total_count = data.total_count;
	},

	[types.LOGIN](state, data) {
		state.avatar_url = data.avatar_url + '&s=40';
		state.access_token = data.access_token;
	}
}

export default new Vuex.Store({
	state, mutations
});