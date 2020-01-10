<template>
    <view class="login-container">
        <div class="holder"></div>
    
        <div class="login-form">
            <div class="login-form-group">
                <div class="label">账号</div>
                <div class="value">
                    <input v-model="form.mobilePhone" placeholder="请填写手机号码" type="number">
                </div>
            </div>
            <div class="login-form-group">
                <div class="label">密码</div>
                <div class="value">
                    <input v-model="form.passWord" placeholder="填写密码" type="password">
                </div>
            </div>
        </div>
    
        <div class="submit-btn" @click="submit">登录</div>
        <p class="link" @click="goLoginYZM">用验证码登录</p>
    
    </view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            form: {
                mobilePhone: '',
                passWord: ''
            }
        }
    },
    methods: {
        ...mapActions(['setUserInfo', 'setIsAdmin']),
		goLoginYZM(){
		    uni.redirectTo({ url: '/pages/login/teacherYZM' })
		},
		onShow(){
			//从本地取账号和密码
			this.form.mobilePhone = uni.getStorageSync('mobilePhone');
			this.form.passWord = uni.getStorageSync('passWord');
		},
        submit() {
			if(this.form.mobilePhone == ''){
				uni.showToast({
					title:"请填写手机号",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.passWord == ''){
				uni.showToast({
					title:"请填写密码",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			//保存账号和密码进本地
			uni.setStorageSync('mobilePhone',this.form.mobilePhone);
			uni.setStorageSync('passWord',this.form.passWord);
            uni.request({
                method: 'POST',
                url: `${this.doMain}/supplier/user/login`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: this.form,
                success: res => {
                    if (res.data.code === 0) {
						let suplierUser = res.data.data;
						this.setUserInfo(suplierUser);
						if(suplierUser.setIsAdmin() === 1){
							this.setIsAdmin(true);
						}else{
							this.setIsAdmin(false);
						}
                        uni.switchTab({
                            url: '/pages/index/index'
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
@import url('./login.less');
</style>
