<template>
	<div class="login">
    <div class="logo-wrap">
      <img src="../assets/logo.png" class="logo">
    </div> 
    <div class="login-wrap need-margin">
       <!-- <img src="../assets/logo.png" class="logo"> -->
      <div class="login-content">
        <el-input
          placeholder="Account"
          v-model="account"
          clearable>
        </el-input>
        <el-input
          placeholder="Password"
          v-model="password"
          clearable>
        </el-input>
        <div class="check-box">
          <el-checkbox v-model="checked">I AM STAFF</el-checkbox>
        </div>
        <button type="button" @click="clickLogin">Login</button>
      </div>
    </div>
    <div class="footer"></div>
	</div>
</template>
<script>
	export default {
		name:'login',
		data () {
			return {
        checked:false,
				account:'',
      	password:''
			}
		},
		methods:{
			clickLogin(){ 
        if (this.account && this.password) {
         if(this.checked){//staff 登陆
            this.$router.push('Home')
          }else{//customer登陆
            let name = this.account
            localStorage.setItem('loginName',name)
            this.$router.push('CreatPayment')
          }
        }else{
           const h = this.$createElement;
          this.$message({
            message: h('p', null, [
              h('i', 'Please input your account and password!')
            ])
          });
        }
    	}
		}
	}
</script>
<style>
.login{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(../assets/background.jpg);
 /*background: url(C://Users/new/Desktop/imagesForDemo/image1.jpg);*/
  display: flex;
/* align-items: center;
  justify-content: center;*/
  flex-direction: column;
}
.logo-wrap{
  text-align: center;
  flex:1;
  margin-top: 30px;
}
.login-wrap{
  display: flex;
  text-align: center;
  flex: 4;
  justify-content: center;
  align-items: center;
  
}
.login-content{
 width: 300px;
}
.login-content input{
  background: transparent !important;
  outline: none !important;
  border: none !important;
  color: #fff !important;
  border-bottom: 1px solid #fff !important;
  margin-bottom: 15px !important;
}
.logo{
  height: 30px;
}
.login-content button{
  height: 35px;
  width: 300px;
  background: #afbcdc;
  color: #fff;
  margin-top: 30px;
}
.footer{
  flex: 1.2;
}
.check-box{
  display: flex;
}
.el-checkbox{
  color: #cdd3e0 !important;
}
</style>
