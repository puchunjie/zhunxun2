<template>
	<view class="index-container">
		<div class="search-div">
			<i class="search-icon iconfont iconsousuo"></i>
			<input class="inpt" placeholder="请输入机构号或机构名称" confirm-type="searchShop" @confirm="searchShop" type="text">
		</div>

		<div class="state-filter">
			<div class="state-btn" @click="showFilter">{{stateStr}} <i class="iconfont arrow iconarrow1-copy"></i></div> 
			<span class="totle">{{list.length || 0}}家机构</span>
		</div>

		<div class="add-new" @click="openToAddInst">+ 拓展新机构</div>

		<div class="list-content">
			<div class="list-item" v-for="(item,i) in list" :key="i" @tap="openToShopView" :data-shopId="item.shopId">
				<h3 class="name">{{item.shopName}} 
					<span class="state-btn" v-if="item.state == 1 && (item.isSign == 0 || item.isSign == null) && item.isOpen == 1" :class="'state'+item.state">待签约</span>
					<span class="state-btn" v-if="item.state == 1 && item.isSign == 1 && item.isOpen == 1" :class="'state'+item.state">已签约</span> 
					<span class="state-btn" v-if="item.state == 1 && (item.isOpen == 0|| item.isOpen == null) && (item.isSign == 0|| item.isSign == null)" :class="'state'+item.state">待开通</span> 
					<span class="state-btn" v-if="item.state == 1 && item.isOpen == 1 && (item.isSign == 0|| item.isSign == null)" :class="'state'+item.state">已开通</span> 
					<span class="state-btn" v-if="item.state != 1" :class="'state'+item.state">{{ item.state | enumFilter(ScEnumKeys.shopStateEnum) }}</span> 
				</h3>
				<div class="desc">拓展人：{{item.userName || '无'}} | {{item.createdTimestamp | dateformatYMD}} 申请</div>
				<i class="iconfont iconarrow"></i>
			</div>
			<div class="no-more">———没有更多了————</div>
		</div>


		<div class="modle-warp" v-show="filterShow">
			<div class="inner-warp">
				<div class="states-warp">
					<div class="tit">筛选拓展状态</div>
					<div class="state-list">
						<div class="state-item" :class="{'active': state === item.value}" @click="setCheck(item)" v-for="(item,i) in states" :key="i">{{ item.label }}</div>
					</div>
					<div class="check-all" @click="setALL">
						<i class="iconfont" :class="state === '-1' ? 'iconcheckbox' : 'iconicon-no-checkbox'"></i> 全部状态
					</div>

					<div class="btns">
						<div class="cancel" @click="cancleFitler">取消</div>
						<div class="ok" @click="confirmFitler">确定</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	computed: {
	    ...mapGetters(['userinfo'])
	},
	data() {
		return {
			states: [
			{
				label: '审核中',
				value: 0
			},{
				label: '已冻结',
				value: 3
			},{
				label: '已驳回',
				value: 4
			},{
				label: '待开通',
				value: 20
			},{
				label: '已开通',
				value: 21
			},{
				label: '待签约',
				value: 22
			},{
				label: '已签约',
				value: 23
			}],
			search: '',
			stateStr:'全部状态',
			filterShow: false,
			list:[],
			state:'-1'
		}
	},
	onShow() {
		this.getList();
	},
	methods: {
		showFilter(){
			uni.hideTabBar();
			this.filterShow = true;
		},
		hideFitler(){
			uni.showTabBar();
			this.filterShow = false;
		},
		cancleFitler(){
			this.hideFitler();
			this.state = -1;
		},
		confirmFitler(){
			this.hideFitler();
			this.getList();
		},
		searchShop(e){
			console.log(e);
			this.search = e.detail.value;
			this.getList();
		},
		setCheck(item){
			this.state = item.value;
			this.stateStr = item.label;
			this.getList();
		},
		setALL(){
			this.state = '-1';
			this.stateStr = '全部状态';
			this.getList();
		},
		getList(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/supplier/shop/list`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"supplierUserId":this.userinfo.supplierUserId,
				"search":this.search,
				"stateStr":this.state
				},
				success: res => {
					console.info(res.data.data);
					if (res.data.code === 0) {
						this.list = res.data.data;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		openToAddInst(){
			uni.navigateTo({
				url:`../institution/addInst_1`
			})
		}
	}
}
</script>

<style lang="less">
page {
	
}

.index-container {
	padding: 24upx;

	.search-div{
		position: relative;
		width: 100%;
		height: 80upx;
		background-color: #fff;
		padding: 0 40upx 0 180upx;
		border-radius: 8upx;
		border: 1px solid #e5e5e5;
		.search-icon{
			position: absolute;
			left: 136upx;
			top: 16upx;
			color: #a6a6a6;
			font-size: 40upx;
		}

		.inpt{
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			border: 0;
			padding: 0 10upx;
			outline: none;
			font-size: 30upx;
			color: #999999;
		}
	}

	.state-filter{
		position: relative;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		color: #666;
		font-size: 28upx;
		padding: 0 20upx;

		.state-btn{
			width: 180upx;
			.arrow{
				font-size: 30upx;
				color: #666;
			}
		}

		.totle{
			position: absolute;
			right: 20upx;
			top: 10upx;
		}
	}

	.add-new{
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		color: #fff;
		padding: 0 46upx;
		color: #009900;
		font-size: 32upx;
		background-color: #fff;
		border-radius: 8upx;
	}

	.list-content{
		width: 100%;
		margin-top: 20upx;

		.list-item{
			position: relative;
			background-color: #fff;
			border-radius: 8upx;
			padding: 34upx 46upx 24upx 46upx; 
			margin-bottom: 20upx;
			.name{
				font-size: 32upx;
				color: #333333;
				height: 48upx;
				line-height: 48upx;
				.state-btn{
					display: inline-block;
					width: 100upx;
					height: 36upx;
					color: #fff;
					font-size: 24upx;
					border-radius: 36upx;
					text-align: center;
					line-height: 36upx;
					vertical-align: middle;
					margin-left: 10upx;
					&.state1{
						background-color: #0099cc;
					}
					&.state2{
						background-color: #009900;
					}
					&.state3{
						background-color: #ff8d1a;
					}
				}
			}

			.desc{
				height: 40upx;
				line-height: 40upx;
				color: #666;
				font-size: 26upx;
				margin-top: 16upx;
			}

			.iconfont{
				position: absolute;
				right: 52upx;
				color: #999;
				font-size: 48upx;
				top: 56upx;
			}
		}

		.no-more{
			width: 100%;
			height: 40upx;
			line-height: 40upx;
			color: #a6a6a6;
			font-size: 26upx;
			text-align: center;
			line-height: 40upx;
		}
	}

	.modle-warp{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,.8);
		.inner-warp{
			width: 100%;
			height: 100%;
			position: relative;

			.states-warp{
				width: 674upx;
				background-color: #fff;
				border-radius: 8upx;
				margin: 300upx auto 0;
			}

			.tit{
				text-align: center;
				height: 60upx;
				line-height: 40upx;
				color: #505050;
				font-size: 28upx;
				padding-top: 20upx;
				font-weight: bold;
			}

			.state-list{
				padding: 0 40upx;
				display: flex;
				flex-wrap: wrap;
				.state-item{
					width: 160upx;
					height: 80upx;
					text-align: center;
					line-height: 80upx;
					color: #0099cc;
					border: 1px solid #0099cc;
					border-radius: 8upx;
					margin-top: 32upx;
					&:not(:nth-child(3n)){
						margin-right: 58upx;
					}

					&.active{
						background-color: #0099cc;
						color: #fff;
					}
				}
			}

			.check-all{
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				padding: 0 40upx;
				margin-top: 24upx;
				font-size: 28upx;
				color: #505050;
				.iconfont{
					vertical-align: middle;
					color: #5b9764;
					font-size: 30upx;
					margin-right: 10upx;
				}
			}

			.btns{
				width: 100%;
				height: 96upx;
				line-height: 96upx;
				border-top: 1px solid #e5e5e5;
				display: flex;
				.cancel,.ok{
					width: 50%;
					height: 100%;
					text-align: center;
					font-size: 28upx;
				}

				.cancel{
					border-right: 1px solid #e5e5e5;
					color: #0099cc;
				}

				.ok{
					color: #5b9764;
				}
			}
		}
	}
}
</style>
