<template>
	<div class="class-detail-teacher">
		<div class="class-info">
		    <p class="p5">
				{{shop.shopName || ''}}
				<span class="state-btn" v-if="shop.state == 1 && (shop.isSign == 0 || shop.isSign == null) && shop.isOpen == 1" :class="'state'+shop.state">待签约</span>
				<span class="state-btn" v-if="shop.state == 1 && shop.isSign == 1 && shop.isOpen == 1" :class="'state'+shop.state">已签约</span> 
				<span class="state-btn" v-if="shop.state == 1 && (shop.isOpen == 0|| shop.isOpen == null) && (shop.isSign == 0|| shop.isSign == null)" :class="'state'+shop.state">待开通</span> 
				<span class="state-btn" v-if="shop.state == 1 && shop.isOpen == 1 && (shop.isSign == 0|| shop.isSign == null)" :class="'state'+shop.state">已开通</span> 
				<span class="state-btn" v-if="shop.state != 1" :class="'state'+shop.state">{{ shop.state | enumFilter(ScEnumKeys.shopStateEnum) }}</span> 
			</p>
			<p class="p2">
				申请时间：{{shop.createdTimestamp | dateformatYMDHM}}
			</p>
		</div>
		<div class="class-info">
		    <p class="p4">基本信息</p>
		    <p class="p3">
		    	机构类型：
				<span v-if="shop.shopType == 0">器乐</span>
				<span v-if="shop.shopType == 1">舞蹈</span>
				<span v-if="shop.shopType == 2">声乐</span>
		    </p>
			<p class="p3">
				机构号码：{{shop.shopCode || ''}}
			</p>
			<p class="p3">
				机构名称：{{shop.shopName || ''}}
			</p>
			<p class="p3">
				门店名称：{{shop.shopSubName || ''}}
			</p>
			<p class="p3">
				机构地址：{{shop.districtFullName || ''}}
			</p>
			<p class="p3">
				联系人：{{shop.contactName || ''}}
			</p>
			<p class="p3">
				联系电话：{{shop.contactPhone || ''}}
			</p>
			<p class="p3">
				客服电话：{{shop.serviceTel || ''}}
			</p>
			<p class="p3">
				机构门头照片：
				<span v-for="pic in shop.shopPicList">
					<image v-if="pic.picType == 1" class="logo" :src="pic.picUrl"></image>
				</span>
			</p>
			<p class="p3">
				机构内部照片：
				<span v-for="pic in shop.shopPicList">
					<image v-if="pic.picType == 0" class="logo" :src="pic.picUrl"></image>
				</span>
			</p>
		</div>
		<div class="class-info">
		    <p class="p4">商户类型</p>
		    <p class="p3">
		    	商户类型：
				<span v-if="shop.storeType == 0">小微商户</span>
				<span v-if="shop.storeType == 1">特约商户</span>
		    </p>
		</div>
		<div class="class-info">
		    <p class="p4">支付信息</p>
			<!-- <p class="p3">
				经营行业：居民生活/商业服务装饰/设计
			</p> -->
			<p class="p3">
				开户名称：{{shop.shopCard.accountName || ''}}
			</p>
			<p class="p3">
				开户银行：{{shop.shopCard.accountBank || ''}}
			</p>
			<p class="p3">
				开户银行省市编码：{{shop.shopCard.bankAddressCode || ''}}
			</p>
			<p class="p3">
				开户银行全称：{{shop.shopCard.bankName || ''}}
			</p>
			<p class="p3">
				银行账户：{{shop.shopCard.accountNumber || ''}}
			</p>
			<p class="p3">
				身份证人像面照片：
				<image v-if="shop.shopCard.cardCopy != null" class="logo" :src="shop.shopCard.cardCopy"></image>
			</p>
			<p class="p3">
				身份证国徽面照片：
				<image  v-if="shop.shopCard.cardNational != null" class="logo" :src="shop.shopCard.cardNational"></image>
			</p>
			<p class="p3">
				身份证姓名：{{shop.shopCard.cardName || ''}}
			</p>
			<p class="p3">
				身份号码：{{shop.shopCard.cardNumber || ''}}
			</p>
			<p class="p3">
				身份证有效期：{{shop.shopCard.cardValidTime || ''}}
			</p>
			<!--<p class="p3">
				交易费率：{{shop.contactPhone}}
			</p>
			 <p class="p3">
				信用卡支付：：器乐
			</p> -->
		</div>
		<div class="class-info">
		    <p class="p4">缴费情况</p>
			<p class="p3">
				年费缴纳：{{shop.yearPrice | priceFilter}}/年
			</p>
			<p class="p3">
				通过时间：{{shop.checkTime | dateformatYMDHM}}
			</p>
			<p class="p3">
				到期时间：{{shop.validEnd | dateformatYMDHM}}
			</p>
		</div>
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'
import { escape2Html } from '@/utils'
export default {
    data() {
        return {
			shopId:0,
			shop:{},
			agencyIntro:''
        }
    },
    computed: {
		/*...mapGetters(['isAdmin']),
		...mapGetters(['userinfo']),
		richText(){
		    return escape2Html(this.agencyIntro)
		}*/
    },
    methods: {
		getShopDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/shop/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { shopId: this.shopId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.shop = res.data.data;
						if(this.shop != null){
							this.agencyIntro = this.shop.agencyIntro;
							this.shop.logoPic = this.imgUrl + this.shop.logoPic;
							if(this.shop.shopPicList != null && this.shop.shopPicList.length > 0){
								for (let i in this.shop.shopPicList) {
									this.shop.shopPicList[i].picUrl = this.imgUrl + this.shop.shopPicList[i].picUrl;
								}
							}
							if(this.shop.shopPicOutList != null && this.shop.shopPicOutList.length > 0){
								for (let j in this.shop.shopPicOutList) {
									this.shop.shopPicOutList[j].picUrl = this.imgUrl + this.shop.shopPicOutList[j].picUrl;
								}
							}
							if(this.shop.shopCard.cardCopy != null && this.shop.shopCard.cardCopy != ''){
								this.shop.shopCard.cardCopy = this.imgUrl + this.shop.shopCard.cardCopy;
							}
							if(this.shop.shopCard.cardNational != null && this.shop.shopCard.cardNational != ''){
								this.shop.shopCard.cardNational = this.imgUrl + this.shop.shopCard.cardNational;
							}
						}
			        }
			    }
			});
		},
    },
	onLoad(e) {
		this.shopId = e.id;
	},
	onShow() {
		this.getShopDetail();
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page {
    padding: 20upx 20upx 160upx;
}

.class-detail-teacher {
    .class-info {
		margin-top: 20rpx;
        width: 100%;
        border-radius: 8upx;
        background: #fff;
        overflow: hidden;
        padding-bottom: 27upx;
        box-shadow: 0 6upx 6upx 0 rgba(74, 98, 139, 0.15);
		padding: 20rpx;
        .header {
            display: flex;
            width: 100%;
            height: 60upx;
            line-height: 60upx;
            color: #fff;
            background: @dark_green;
            padding: 0 40upx;
            font-size: 26upx;
            justify-content: space-between;
        }
        .body {
            width: 100%;
            padding: 20upx 40upx;
            .class-name {
                position: relative;
                height: 34upx;
                line-height: 34upx;
                color: @dark_green;
                font-size: 30upx;
                font-weight: 500;
                .tag {
                    display: inline-block;
                    padding: 0 19upx;
                    height: 34upx;
                    line-height: 32upx;
                    border: 1upx solid #FF7052;
                    color: #FF7052;
                    font-size: 24upx;
                    margin-left: 20upx;
                    font-weight: normal;
                }
                &:before {
                    left: -30upx;
                    top: 5upx;
                    display: block;
                    position: absolute;
                    content: '';
                    width: 20upx;
                    height: 20upx;
                    border: 2upx solid rgba(204, 204, 204, 1);
                    border-radius: 50%;
                }
            }
            .gp {
                width: 100%;
                height: 26upx;
                font-size: 26upx;
                color: #0A9187;
                line-height: 26upx;
                margin-top: 24upx;
                display: flex;
                .left,
                .right {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .tip {
            position: relative;
            width: 670upx;
            margin: 30upx auto 0;
            padding: 20upx 46upx;
            background: #EDF8F6;
            color: #7FBCB4;
            font-size: 28upx;
            line-height: 34upx;
            &:before {
                left: 21upx;
                top: 23upx;
                display: block;
                position: absolute;
                content: '!';
                width: 20upx;
                height: 20upx;
                border: 2upx solid #7FBCB4;
                border-radius: 50%;
                color: #7FBCB4;
                font-size: 18upx;
                text-align: center;
                line-height: 20upx;
            }
        }
		.bottom-btn {
			margin-top:20rpx;
		}
		.bottom-btn .btn {
			width: 260rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-right: 8rpx;
			border: 1px solid transparent;
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			border-radius: 8rpx;
		}
    }
	
    .student-list {
        width: 100%;
        background: #fff;
        border-radius: 8upx;
        margin-top: 20upx;
        overflow: hidden;
        .item-content{
            padding: 20upx 20upx 0;
            .item{
                width: 100%;
                height: 100upx;
                line-height: 100upx;
                color: @gray_black;
                font-size: 30upx;
                font-weight: 500;
                padding-left: 20upx;
                &:not(:last-child){
                    border-bottom: 1px solid #E6E6E6;
                }
            }
        }
    }
	.tip {
	    float: right;
	    color: #7FBCB4;
	}
}	.p1{
		height:72upx;
		line-height: 72upx;
		font-size:32upx;
		font-family: "微软雅黑";
		color: #333333;
	}
	.p2{
		height:44upx;
		line-height: 44upx;
		font-size:28upx;
		font-family: "微软雅黑";
		color: #8E8E8E;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.p2 img{
		margin-left:60upx;
		width:28upx;
		height:28upx;
	}
	.p3{
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	.p4{
		color:#333333;
		height:72upx;
		line-height: 72upx;
		font-size:32upx;
		font-family: "微软雅黑";
		font-weight: bolder;
	}
	.p5{
		height:120upx;
		line-height: 120upx;
		font-size:36upx;
		text-align: left;
		color: #333333;
		.state0{
			width: 108upx;
			height: 36upx;
			color: #ffffff;
			background-color: #0099cc;
			border-radius: 22upx;
			font-size: 24upx;
			line-height: 150%;
			text-align: center;
			padding: 6upx 10upx;
			margin-left: 20upx;
		}
	}
	.p6{
		text-align: center;
		color: #fff;
		background:#1ABC9C;
		padding-top: 16upx;
		padding-bottom: 16upx;
		border-radius: 10upx;
		font-size: 32upx;
	}
	.logo{
		width:80upx;
		height: 80upx;
		vertical-align: middle;
	}
	.state-btn{
		display: inline-block;
		width: 100upx;
		height: 46upx;
		color: #fff;
		font-size: 24upx;
		border-radius: 36upx;
		text-align: center;
		line-height: 36upx;
		vertical-align: middle;
		margin-left: 10upx;
		&.state{
			background-color: #0099cc;
		}
		&.state0{
			background-color: #0099cc;
		}
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
</style>