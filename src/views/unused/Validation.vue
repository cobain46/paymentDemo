<template>
  <div class="header">
    <div class="header_details">
      payment-201811261371
    </div>
    <br/>
    <div class="body">
      <div class="body-left">
        <div class="text-left">Credit Card bill</div>
        <div>上传图片显示区域</div>
        <div>*Click above icon review file</div>
      </div>
      <div class="body-right">
        <div class="text-right">Compliance Requirement</div>
        <div>上传文件规则展示</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">Approve</div>
      <div class="footer-right">Reject</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Validation",
        data(){
          return {
            msg: 'Validation'
          }
        }
    }
</script>

<style scoped>
  .header{
    width: 70%;
    text-align: center;
  }
  div{
    color:#fff
  }
  .body-left{
    width: 50%;
    height: 300px;
    background-color: #C5E9F3;
    float: left;
    text-align: center;
  }
  .body-right{
    width: 50%;
    height: 300px;
    background-color: #F7575d;
    float: right;
    text-align: center;
  }
  .footer{
    clear: both;
    height: 100px;
    background-color: #8080FF
  }
  .footer-left{
    width: 50%;
    height: 150px;
    float: left;
    text-align: center;
  }
  .footer-right{
    width: 50%;
    height: 150px;
    float: right;
    text-align: center;
  }
  .text-left,.text-right{
    padding-top:10px;
  }
</style>
