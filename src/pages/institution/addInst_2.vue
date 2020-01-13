<template>
    <view class="addinst-container">
		<image class="step" src="../../static/step2.png"></image>
        <div class="addinst-form">
			<div class="form-title">商户类型</div>
			<singleElection title="商户类型" v-model="form.shopbusinessType" ScEnumKey="shopBusinessTypeEnum"></singleElection>
			<div class="query-btn">
				<div class="btn" @click="submit" :data-type="1">下一步</div>
			</div>
        </div>
    
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import singleElection from '~/singleElection.vue'
import citySelect from '@/components/citySelect.vue'
import dateSelect from '@/components/dateSelect.vue'
import upload from '@/components/upload.vue'
export default {
    components: { citySelect, dateSelect, upload, singleElection },
	computed: {
	    ...mapGetters(['isAdmin']),
		...mapGetters(['userinfo']),
	},
    data() {
        return {
            form: {
                shopName: '',
                stopTime: '',
                openTime: '',
                shopAddress: '',
                provinceId: 0,
                cityId: 0,
                districtId: 0,
				creatorId:'',
				logoImg:'',
            },
			viewMode:false
        }
    },
    methods: {
        ...mapActions(['setUserInfo']),
        topChange(imgs) {
            this.form.logoImg = imgs;
			this.viewMode = true
        },
		innerChange(imgs) {
		    this.form.logoImg = imgs;
			this.viewMode = true
		},
        submit() {
			/*this.form.creatorId = this.userinfo.teacherId;
			console.info(this.form);
            uni.request({
                method: 'POST',
                url: `${this.doMain}/shop/teacher/addShopV2`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: this.form,
                success: res => {
                    if (res.data.code === 0) {
                        this.setUserInfo(res.data.data)
                        uni.switchTab({
                            url: '/pages/index/index'
                        });
                    }
                }
            });*/
			uni.navigateTo({
				url:'/pages/institution/addInst_3'
			});
        },
        cityOnConfirm(data) {
            this.form.provinceId = data.value[0];
            this.form.cityId = data.value[1];
            this.form.districtId = data.value[2];
        },
		bindStartTimeChange: function(e) {
			this.form.openTime = e.detail.value
		},
		bindStopTimeChange: function(e) {
			this.form.stopTime = e.detail.value
		},
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
