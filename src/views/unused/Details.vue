<template>
  <div class="main">
    <div class="mainheader">
      <div>Payment 201801163791</div>
    </div>
    <div class="mainbody">
      <!-- UserInfo -->
      <div class="mainbody-top">
        <!-- Transaction -->
         <div>
          <div>transaction:</div>

          </div>
          <!-- Category -->
          <div>
            <div>Category:</div>

          </div>
          <!-- Account -->
          <div>
            <div>Account:</div>

          </div>
          <!-- Amount -->
          <div>
            <div>Amount:</div>

          </div>
      </div>
      <!-- UserUploadFile -->
      <div>
        <div>Upload file list:</div>
        <div>

        </div>
      </div>

    </div>
    <div class="mainfooter">
      <div>Approve</div>
      <div>Reject</div>
    </div>
  </div>

</template>

<script>
    export default {
        name:"Details",
        data (){
          return {
            msg: 'Details'
          }
        }
    }
</script>

<style scoped>
  div{
    color:#000
  }

</style>
