<template>
    <view class="login-container">
        <div class="login-form">
			<div class="tip">请出示小程序码 扫一扫添加团队成员</div>
			<image :src="pic" class="pic"></image>
			<div class="tip">请使用最新版微信</div>
        </div>
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	computed: {
		...mapGetters(['userinfo']),
	},
    data() {
        return {
			pic: ''   
        }
    },
	onShow() {
		this.getPic();
	},
    methods: {
        getPic() {
            uni.request({
                method: 'POST',
                url: `${this.doMain}/supplier/pic`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {supplierId:this.userinfo.supplierId},
                success: res => {
                    if (res.data.code === 0) {
                        this.pic = this.imgUrl + res.data.data;
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
@import url('./login.less');
page{
	background-color: #F2F2F2;
}
.login-container{
	text-align: center;
}
.login-form{
	background-color: #ffffff;
	width: 670upx !important;
	padding: 40upx !important;
	margin-top: 40upx;
	margin-left: 40upx;
	border-radius: 18upx;
}
.tip{
	display: position;
	height: 19px;
	left: 89px;
	top: 116px;
	color: rgba(166, 166, 166, 1);
	font-size: 13px;
	line-height: 150%;
	text-align: center;
}
.pic{
	width:400upx;
	height:400upx;
}
</style>
