<script>
	import { getAvatarUrl } from '../../vuex/getters';
	export default {
		vuex: {
			getters: {
				avatar_url: getAvatarUrl
			}
		}
	}
</script>

<template>
	<div class="container">
		<div class="welcome">{{ avatar_url ? '欢迎使用' : 'github对于API请求有频率限制，请先登录，以获得更大的使用频率^_^' }}</div>
	</div>
</template>

<style lang="less" scoped>
	.welcome {
    line-height: 24px;
    margin-top: 20px;
    font-size: 18px;
    color: #111;
	}
</style>