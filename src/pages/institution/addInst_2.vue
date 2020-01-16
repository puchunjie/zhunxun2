<template>
    <view class="addinst-container">
		<image class="step" src="../../static/step2.png"></image>
        <div class="addinst-form">
			<div class="form-title">商户类型</div>
			<singleElection title="商户类型" v-model="storeType" ScEnumKey="shopBusinessTypeEnum"></singleElection>
			<div class="query-btn">
				<div class="btn" @click="submit" :data-type="1">下一步</div>
			</div>
        </div>
    </view>
</template>

<script>
import singleElection from '~/singleElection.vue'
export default {
    components: { singleElection },
    data() {
        return {
            storeType:0
        }
    },
	onLoad(e) {
		this.shopId= e.id
	},
    methods: {
        submit() {
            uni.request({
                method: 'POST',
                url: `${this.doMain}/shop/modifyshopstoretype`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {"shopId":this.shopId,"storeType":this.storeType},
                success: res => {
                    if (res.data.code === 0) {
                       uni.navigateTo({
                       	url:'/pages/institution/addInst_3?id='+this.shopId
                       });
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
    }
}
</script>

<style lang="less">
//@import url('./addInst.less');
@import url("../../styles/base.less");
.addinst-container{
	width: 750upx;
	height: 1200upx;
	left: 0px;
	color: @bg_color_green;
	background-color: @bg_color_green;
	font-size: 26upx;
	line-height: 150%;
	text-align: center;
	.step{
		width: 547rpx;
		height: 56rpx;
		left: 101rpx;
		top: 14rpx;
		position: absolute;
	}
	.addinst-form{
		position:absolute;
		width: 710upx;
		height: 300upx;
		left: 40upx;
		top: 98upx;
		color: #505050;
		background-color: #ffffff;
		font-size: 28upx;
		line-height: 150%;
		text-align: center;
		.form-title{
			position:relative;
			width: 120upx;
			height: 64upx;
			left: 30upx;
			top: 32upx;
			color: rgba(80, 80, 80, 1);
			font-size: 30upx;
			line-height: 150%;
			text-align: left;
			font-weight: bold;
		}
		.block{
			display:block !important;
		}
		.form-group {
		    display      : flex;
		    flex-wrap    : nowrap;
		    width        : 100%;
		    min-height   : 110upx;
		    border-bottom: 1px solid @line_gray;
		    font-size    : 30upx;
		    color        : @base_black;
		    .label {
		        width      : 170upx;
		        height     : 44upx;
		        line-height: 44upx;
				padding: 32rpx 0 0 0rpx;
				.require{
					color: red;
				}
				.tip{
					color:#a6a6a6
				}
				
		    }
			.block{
				display: block;
				width: 100%;
				height: 100rpx;
			}
		    .value {
		        flex       : 1;
		        line-height: 44upx;
				text-align: left;
		        input {
		            display  : block;
		            border   : none;
		            margin   : 0;
		            padding  : 0;
		            font-size: 30upx;
		        }
		    }
		}
		.btn{
			width: 668rpx;
			height: 80rpx;
			left: 22rpx;
			top: 20rpx;
			color: #ffffff;
			background-color: #0099cc;
			border-radius: 4rpx;
			font-size: 26rpx;
			line-height: 80rpx;
			text-align: center;
			position: relative;
		}
	}
}

</style>
