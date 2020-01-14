<template>
    <view class="login-container">
        <div class="login-form">
			<div class="login-form-group">
			    <div class="label">姓名</div>
			    <div class="value">
			        <input v-model="form.userName" class="mobile" placeholder="请填写姓名" type="text">
			    </div>
			</div>
            <div class="login-form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.mobile" class="mobile" placeholder="请填写手机号码" type="number">
					<getCode class="get-code" :phone="form.mobile" @onSuccess="getYZM"></getCode>
                </div>
            </div>
            <div class="login-form-group">
                <div class="label">验证码</div>
                <div class="value">
                    <input v-model="yzm" placeholder="请填写收到的短信验证码" type="number">
                </div>
            </div>
			<div class="login-form-group">
			    <div class="label">密码</div>
			    <div class="value">
			        <input v-model="form.password" placeholder="填写密码" type="password">
			    </div>
			</div>
        </div>
    
        <div class="submit-btn" @click="submit">添加</div>
    </view>
</template>

<script>
import getCode from '~/getCode'
import { mapGetters, mapActions } from 'vuex'
export default {
	components: {getCode},
	computed: {
		...mapGetters(['userinfo']),
	},
    data() {
        return {
            form: {
                supplierId: '',
				userName: '',
				mobile: '',
				password: ''
            },
			yzm: '',
			yzmtrue:''
        }
    },
    methods: {
		getYZM(data){
			this.yzmtrue = data
		},
        submit() {
			if(this.form.userName == ''){
				uni.showToast({
					title:"请填写姓名",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.mobile == ''){
				uni.showToast({
					title:"请填写手机号",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.yzm == ''){
				uni.showToast({
					title:"请填写短信验证码",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.yzmtrue != this.$md5(this.yzm)){
				uni.showToast({
					title:"验证码错误",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.password == ''){
				uni.showToast({
					title:"请填写密码",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			this.form.supplierId = this.userinfo.supplierId;
            uni.request({
                method: 'POST',
                url: `${this.doMain}/supplier/user/add`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: this.form,
                success: res => {
                    if (res.data.code === 0) {
						uni.showToast({
							title:'添加成功',
							icon: 'none',
							duration: 1000
						})
                        uni.navigateTo({
                        	url:'/pages/me/team'
                        })
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
.login-container .login-form .login-form-group .get-code {
	width: 210rpx;
	height: 38rpx;
	line-height: 38rpx;
	text-align: center;
	border: 1rpx solid #0A9187;
	border-radius: 8rpx;
	font-size: 27rpx;
	color: #0A9187;
	display: inline-block !important;
	padding: 8rpx;
}
.mobile{
	display: inline-block !important;
	width: 260rpx;

}

</style>
