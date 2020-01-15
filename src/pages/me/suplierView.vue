<template>
    <div class="me-container">
		<div class="me-header">
			<image class="portrait" src="../../static/boy.png"></image>
			<div class="me-info">
				<div class="me-name">
					<span class="name">{{suplierUser.userName}}</span>
					<span class="shopType" v-show="suplierUser.isAdmin == 0">个人服务商</span>
					<span class="shopType" v-show="suplierUser.isAdmin == 1">城市服务商</span>
					<span class="level" v-show="suplierUser.isAdmin == 0">{{suplierUser.userLevel}}级</span> 	
					<span class="level" v-show="suplierUser.isAdmin == 1">{{suplierUser.supplierLevel}}级</span> 
				</div>
				<div class="inst-name">
					{{suplierUser.supplierName}}
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
            suplierUser:null,
			supplierUserId:0
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
		},
		getSuplierUser() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/supplier/user/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {"supplierUserId":this.supplierUserId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.suplierUser = res.data.data;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		}
    },
	onLoad:function(e) {
		this.supplierUserId = e.supplierUserId;
	},
	onShow() {
		this.getSuplierUser();
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