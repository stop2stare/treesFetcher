<script>
	import { logout } from '../../vuex/actions';
	import { getAvatarUrl, getLogin } from '../../vuex/getters';
	import loginDialog from './loginDialog';

	export default {
		data() {
			return {
				search: '',
				dialog: false
			}
		},
		methods: {
			showDialog() {
				this.dialog = true;
			},
			doLogout() {
				this.logout()
					.then(res => {
						this.$router.go('/');
					})
			},
			doSearch() {
				if (this.search) {
					this.$router.go(`/search/repositories?q=${this.search}&p=1`);
				}
			}
		},
		components: {
			loginDialog
		},
		vuex: {
			getters: {
				avatar_url: getAvatarUrl,
				login: getLogin
			},
			actions: {
				logout
			}
		}
	}
</script>

<template>
	<div class="header">
		<div class="container">
			<div class="h_title">treesFetcher</div>
			<div v-if="avatar_url" class="h_search">
				<div class="input">
					<input
						v-model="search" 
						@keyup.enter="doSearch"
						type="search" 
						name="search" 
						placeholder="输入仓库名字"
					>
				</div>
			</div>
			<div v-if="!avatar_url" class="h_login">
				<span class="login_button" @click="showDialog">登录</span>
			</div>
			<div v-if="avatar_url" class="h_avatar">
				<img :alt="login" :src="avatar_url">
			</div>
			<div v-if="avatar_url" class="h_login">
				<span class="login_button" @click="doLogout">登出</span>
			</div>
		</div>
		<login-dialog v-if="dialog" :dialog.sync="dialog"></login-dialog>
	</div>
</template>

<style lang="less" scoped>
	.header {
		height: 50px;
		background-color: #f1f1f1;
		border-bottom: 1px #e0e0e0 solid;
		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.h_title {
			line-height: 50px;
			margin-right: 10px;
			font-size: 16px;
		}
		.h_search {
			flex: 1;
			margin-right: 10px;
			input {
				width: 300px;
				height: 30px;
				line-height: 30px;
				padding: 0 3px;
				font-size: 14px;
				border: 1px #e0e0e0 solid;
				border-radius: 3px;
				outline: none;
			}
		}
		.login_button {
			cursor: pointer;
		}
		.h_avatar {
	    display: block;
	    width: 40px;
	    height: 40px;
	    margin-right: 10px;
	    font-size: 12px;
	    border-radius: 20px;
	    overflow: hidden;
	    cursor: pointer;
	    img {
	    	display: block;
  	    width: 40px;
		    height: 40px;
		    word-wrap: break-word;
	    }
		}
	}
</style>