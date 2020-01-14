<template>
    <div class="me-container">
		<div class="me-header">
			<image class="portrait" src="../../static/boy.png"></image>
			<div class="me-info">
				<div class="me-name">
					<span class="name">沈先生生</span>
					<span class="shopType">城市服务商</span>
					<span class="level">1级</span> 	
				</div>
				<div class="inst-name">
					上海追寻教育科技有限公司
				</div>
			</div>
		</div>
		<div class="menu-panel">
			<div class="menu-item">
				<span class="label">拓展奖励</span>
				<span class="label">1980.00</span>
			</div>
			<div class="menu-item">
				<span class="label">运营奖励</span>
				<span class="label">200.00</span>
			</div>
			<div class="menu-item">
				<span class="label">增值奖励</span>
				<span class="label">3000.00</span>
			</div>
		</div>
		<div class="links">
		    <div class="link-item" v-for="(link,i) in links" :key="i" @click="goLink(link)">
		        <i class="iconfont icon" :class="link.icon"></i> {{ link.label }}
		        <i class="iconfont arrow iconarrow"></i>
		    </div>
		</div>
		    
		<div class="login-out" @click="logout">退出账户</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        
    },
    data() {
        return {
            
        }
    },
    computed: {
        //...mapGetters(['userinfo', 'isAdimin']),
        links() {
            let arr = [
        			{
        			    label: '我的团队',
        			    icon: 'iconsuplier-team',
        			    path: '/pages/me/team'
        			}, /*{
        			    label: '交接机构',
        			    icon: 'iconsuplier-instchange',
        			    path: '/pages/user/changePwd'
        			}, {
        			    label: '交接团队管理员',
        			    icon: 'iconsuplier-teamchange',
        			    path: '/pages/user/changePwd'
        			}, {
        			    label: '收益提现',
        			    icon: 'iconsuplier-income',
        			    path: '/pages/user/changePwd'
        			}, */{
        			    label: '联系客服',
        			    icon: 'iconsuplier-kefu',
        			    path: '/pages/user/changePwd'
        			}
        		]
            return arr
        }
    },
    methods: {
		...mapActions(['clearUserInfo']),
		goLink(item) {
		    uni.navigateTo({
		        url: item.path
		    });
		},
		logout() {
		    this.clearUserInfo();
		    uni.redirectTo({
		        url: '/pages/login/suplier'
		    });
		}
    },
	onShow() {
		
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page{

}
.me-container {
	.me-header{
		display: flex;
		flex-direction: row;
		background-color: #5b9764;
		padding-bottom: 20upx;
		.portrait{
			width: 146upx;
			height: 146upx;
			left: 26upx;
			top:136upx;
			font-size: 146upx;
			color: rgba(153, 153, 153, 1);
		}
		.me-info{
			.me-name{
				padding-top: 40upx;
				.name{
					color: #FFFFFF;
				}
				.shopType{
					width: 156upx;
					height: 40upx;
					color: rgba(255, 235, 59, 1);
					background-color: rgba(61, 112, 69, 1);
					border-radius: 18upx;
					font-size: 24upx;
					line-height: 150%;
					text-align: center;
					padding: 0rpx 10rpx;
					margin: 0rpx 20rpx;
				}
				.level{
					width: 76upx;
					height: 40upx;
					color: rgba(255, 255, 255, 1);
					background-color: rgba(0, 153, 204, 1);
					border-radius: 18upx;
					font-size: 24upx;
					line-height: 150%;
					text-align: center;
					padding: 0rpx 10rpx;
				}
			}
			.inst-name{
				width: 316upx;
				height: 28upx;
				color: rgba(255, 255, 255, 1);
				font-size: 26upx;
				line-height: 200%;
				text-align: left;
			}
		}
	}
	.links {
	    width: 750upx;
	    background-color: #fff;
	    border-radius: 8upx;
	    overflow: hidden;
	    margin: 20upx auto 0;
	    .link-item {
	        position: relative;
	        padding: 0 20upx 0 90upx;
	        width: 100%;
	        height: 100upx;
	        line-height: 100upx;
	        font-size: 28upx;
	        color: #333;
	        &:not(:last-child) {
	            border-bottom: 1px solid #E6E6E6;
	        }
	        .icon {
	            position: absolute;
	            left: 30upx;
	            font-size: 37upx;
	            color: #333;
	        }
	        .arrow {
	            position: absolute;
	            right: 20upx;
	            font-size: 3 6upx;
	            color: #333;
	        }
	    }
	}
	.login-out {
	    width: 710upx;
	    height: 80upx;
	    line-height: 80upx;
	    text-align: center;
	    background: #FFFFFF;
	    border: 1px solid #5b9764;
	    border-radius: 4upx;
	    margin: 40upx auto 40upx;
	    font-size: 32upx;
	    color: #5b9764;
	}
	.menu-panel{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		margin-top: 20rpx;
		.menu-item{
			width: 33%;
			.label{
				display: inline-block;
				width: 100%;
				text-align: center;
				padding: 20upx;
			}
		}
	}
}

</style>