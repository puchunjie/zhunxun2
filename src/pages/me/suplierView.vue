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
    },
    methods: {
		addUser(){
			uni.redirectTo({
			    url: '/pages/login/suplierRegister'
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
		background-color: #ffffff;
		padding: 30upx;
		.portrait{
			width: 146upx;
			height: 146upx;
			left: 26upx;
			top:136upx;
			font-size: 146upx;
			color: rgba(153, 153, 153, 1);
		}
		.me-info{
			padding-top: 34rpx;
			.me-name{
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
				color: #a6a6a6;
				font-size: 26upx;
				line-height: 200%;
				text-align: left;
			}
		}
	}
}

</style>