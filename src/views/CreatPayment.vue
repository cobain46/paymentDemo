<template>
	<div class='home'>
		<div class="header">
          {{header}}
    	</div>
		<div class="paymentRequest">
      		<el-button type="danger" @click='newPayment'>{{paymentRequest}}</el-button>
    	</div>
	</div>
</template>
<script>
export default {
	name:'CreatPayment',
	data(){
		return {
			paymentRequest:'Payment Request',
			header:'Payment Record Management System'
		}
	},
	methods:{
		newPayment:function(){
			this.$router.push('HomeCustomer')
		}
	}
}
</script>
<style>
.header{
  background:#434546;
  line-height: 60px;
  height: 60px;
  width: 100%;
  color:#fff;
  margin:0;
}
.paymentRequest{
	position: relative;
	top:130px;
}
</style>