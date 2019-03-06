<template>
	<div class="home">
		<div class="header">
        	{{header}}
    </div>
    <div class="content">
		  <div class="leftContent">

  <el-col>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="test">
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">Tasks</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
      </div>
       <div class='rightContent'>
            <router-view></router-view>
       </div>
    </div>
    </div>
</template>
<script>
	export default {
		name:'home',
		data (){
			return {
				header:'Payment Record Management System',
				creat:'payment request',
        recordFlag:'pending',
        Flag:''
			}
		},
    created(){
this.$router.push("InProgress")
    },
		methods:{
      test(index,target){
        if(2 == index){
          this.$router.push("InProgress")
        }
      }
		}
	}
</script>
<style scoped>
.home{
  background:#fff;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  text-align: center;
  font-size: 30px;
}
.header{
  background:#434546;
  line-height: 60px;
  height: 60px;
  width: 100%;
  color:#fff;
}
.content{
  display: flex;
  height: 100%;
}
.leftContent{
  flex:1;
  background: #545c64;
}
.rightContent{
    flex: 8;
}
.home .el-menu{
  border:none;
}
</style>
