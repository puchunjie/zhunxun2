<template>
    <div class="me-container">
		<div class="me-header">
			<div class="me-name current">
				机构业绩
			</div>
			<div class="me-name" @click="openTo">
				团队业绩
			</div>
		</div>
		<div class="content">
			<div class="content-title">
				<div class="content-type"  style="width:50%;">
					<span>日报</span>
					<span class="grey">周报</span>
					<span class="grey">月报</span>
				</div>
				<div style="width:50%;">
					<dateSelect :value="selectDate" :fields="dateType"></dateSelect>
				</div>
			</div>
			<div class="content-inner">
				<div class="amount">
					<span class="tip">收益总额</span>
					<span class="tipAmount">¥ 3600.00</span>
				</div>
			</div>
			<div class="content-bottom">
				<div class="num">
					<span class="tip">交易笔数</span>
					<span>10笔</span>
				</div>
				<div class="num">
					<span class="tip">交易机构</span>
					<span>1个</span>
				</div>
			</div>
		</div>
		<div class="links">
			<div class="link-item" style="height: 120upx;display:flex;">
				<div class="title-left">
					|机构榜单
				</div>
				<div style="width: 586upx;padding-top: 16rpx;">
					<singleElection value="0" :data="sortArray"></singleElection>
				</div>
			</div>
		    <div class="link-item">
		    	<div>大树音乐</div>
		    	<div class="name-div">
		    		<span class="name-top"  style="width: 50%;text-align: right;">¥ 2300.00</span>
		    		<span class="name-bottom"  style="width: 50%;text-align: right;">开通奖励 500.00  交易笔数: 5</span> 
		    	</div>
		    </div>
			<div class="link-item">
				<div>大树音乐</div>
				<div class="name-div" >
					<span class="name-top"  style="width: 50%;text-align: right;">¥ 2300.00</span>
					<span class="name-bottom"  style="width: 50%;text-align: right;">开通奖励 500.00  交易笔数: 5</span> 
				</div>
			</div>
			<div class="link-item">
				<div>大树音乐</div>
				<div class="name-div" >
					<span class="name-top"  style="width: 50%;text-align: right;">¥ 2300.00</span>
					<span class="name-bottom"  style="width: 50%;text-align: right;">开通奖励 500.00  交易笔数: 5</span> 
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import singleElection from '@/components/singleElection.vue'
import dateSelect from '@/components/dateSelect.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        singleElection,dateSelect
    },
    data() {
        return {
            sortArray:[{
				label:"按交易金额排序",
				value:"0"
			}],
			selectDate:'2020/01/14',
			dateType:'day'
        }
    },
    computed: {
        //...mapGetters(['userinfo', 'isAdimin']),
        links() {
            let arr = [
        			{
        			    label: '王大同',
        			    icon: 'iconsuplier-team',
        			    path: '/pages/user/changePhone'
        			}, {
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
        			}, {
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
		},
		addUser(){
			uni.redirectTo({
			    url: '/pages/login/suplierRegister'
			});
		},
		viewSuplier(){
			uni.redirectTo({
			    url: '/pages/me/suplierView'
			});
		},
		getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
		openTo(){
			uni.redirectTo({
			    url: '/pages/performance/performanceTeam'
			});
		}
    },
	onShow() {
		this.selectDate = this.getNowFormatDate();
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page{

}
.me-container {
	.me-header{
		background-color: #5b9764;
		display: flex;
		.me-name{
			width: 50%;
			text-align: center;
			color: #ffffff;
			height: 100rpx;
			padding-top: 36rpx;
		}
		.current{
			border-bottom: 6rpx solid #fff;
			margin-bottom: 6rpx;
		}
	}
	.content{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.content-type{
			padding-left: 20px;
			padding-top: 40rpx;
		}
		.content-type .grey{
			background-color: #e5e5e5;
		}
		.content-title{
			display: flex;
		}
		.content-title span{
			color: #505050;
			font-size: 11px;
			text-align: center;
			border: 1rpx solid #e5e5e5;
			padding: 10rpx 30rpx;
		}
		.content-inner{
			text-align: center;
			.amount{
				display: flex;
				flex-direction: column;
				padding-top: 70rpx;
				.tipAmount{
					width: 100%;
					height: 49px;
					color: #505050;
					font-size: 33px;
					line-height: 150%;
					text-align: center;
					padding-top: 20rpx;
					margin-bottom: 20px;
				}
			}
		}
		.content-bottom{
			display: flex;
			flex-direction: row;
			padding-bottom: 16px;
			.num{
				width: 50%;
				text-align: center;
				display: flex;
				flex-direction: column;
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
	        padding: 0 20upx 0 20upx;
	        width: 100%;
	        height: 130upx;
	        line-height: 130upx;
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
			.qr{
				right: 60upx;
				position: absolute;
			}
			.portrait{
				width: 120upx;
				height: 120upx;
				border-radius: 12upx;
			}
			.name-div{
				display:inline;
				padding-left: 47%;
			}
			.name-top{
				position: absolute;
				top: -22upx;
				width: 50%;
				text-align: right;
			}
			.name-bottom{
				position: absolute;
				top: 22upx;
				color: #999;
				font-size: 24rpx;
				width: 50%;
				text-align: right;
			}
			.title-left{
				width: 70px;
				left: 10px;
				top: 356px;
				color: rgba(102, 102, 102, 1);
				font-size: 14px;
				font-weight: bold;
			}
	    }
	}
	.addBtn {
	    width: 710upx;
	    height: 100upx;
	    line-height: 100upx;
	    text-align: center;
	    background: #FFFFFF;
	    border-radius: 4upx;
	    margin: 40upx auto 40upx;
	    font-size: 32upx;
	    color: #5b9764;
	}
	.tip{
		width: 100%;
		height: 19px;
		color: rgba(128, 128, 128, 1);
		font-size: 13px;
		line-height: 150%;
		text-align: center;
	}
}
.form-group {
	border: none;
}
.form-group .value .select {
	padding-right: 0upx !important;
}
.form-group .label {
	width: 0upx !important;
}
.form-group .value .arrow {
	right: -35rpx;
}
.me-container .links .link-item .arrow {
	right: -40upx !important;
}

</style>