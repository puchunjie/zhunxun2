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
					<span :class="!isMonth && 'grey'" @click="selectDay">日报</span>
					<!-- <span class="grey" >周报</span> -->
					<span :class="isMonth && 'grey'" @click="selectMonth">月报</span>
				</div>
				<div style="width:50%;">
					<dateSelect v-model="dateValue" @bindChange="getStat" v-if="!isMonth" fields="day"></dateSelect>
					<dateSelect v-model="monthValue" @bindChange="getStat" v-if="isMonth" fields="month"></dateSelect>
				</div>
			</div>
			<div class="content-inner">
				<div class="amount">
					<span class="tip">收益总额</span>
					<span class="tipAmount">¥ {{total.totalAmount | priceFilter}}</span>
				</div>
			</div>
			<div class="content-bottom">
				<div class="num">
					<span class="tip">交易笔数</span>
					<span>{{total.orderNum || 0}}笔</span>
				</div>
				<div class="num">
					<span class="tip">交易机构</span>
					<span>{{total.orderShopNum || 0}}个</span>
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
		    <div class="link-item"  v-for="(item,i) in list">
		    	<div>{{item.shopName}}</div>
		    	<div class="name-div">
		    		<span class="name-top"  style="width: 50%;text-align: right;">¥ {{item.totalAmount | priceFilter}}</span>
		    		<span class="name-bottom"  style="width: 50%;text-align: right;">开通奖励 {{item.openReward || 0}}  交易笔数: {{item.orderNum || 0}}</span> 
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
			dateValue:'',
			monthValue:'',
			isMonth:false,
			form:{
				userId: '',
				year:'',
				month:'',
				day:'',
				week:'',
				sort:'totalAmount',
				order:'DESC'
			},
			list:[],
			total:{}
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
		getNowFormatDate() {
			var date = new Date();
			var seperator1 = '-';
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
		getNowFormatMonth() {
			var date = new Date();
			var seperator1 = '-';
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			var currentdate = year + seperator1 + month;
			return currentdate;
		},
		openTo(){
			uni.redirectTo({
			    url: '/pages/performance/performanceTeam'
			});
		},
		selectDay(){
			this.isMonth = false;
			this.getStat();
		},
		selectMonth(){
			this.isMonth = true;
			this.getStat();
		},
		getStat(e){
			this.form.userId = this.userinfo.supplierUserId;
			if(this.isMonth){
				if(e != undefined){
					this.monthValue = e;
				}
				let days = this.monthValue.split('-');
				this.form.year = days[0];
				this.form.month = days[1];
				this.form.day = '';
			}else{
				if(e != undefined){
					this.dateValue = e;
				}
				let days = this.dateValue.split('-');
				this.form.year = days[0];
				this.form.month = days[1];
				this.form.day = days[2];
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/stat/shop`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: this.form,
			    success: res => {
					console.info(res.data.data);
			        if (res.data.code === 0) {
						this.list = res.data.data.stat;
						this.total = res.data.data.total;
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
	onShow() {
		this.dateValue = this.getNowFormatDate();
		this.monthValue = this.getNowFormatMonth();
		this.getStat();
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