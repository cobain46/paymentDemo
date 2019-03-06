<template>
<div class="table-wrap">
  <el-table
    :data="tableData"
    style="width: 100%;"
    :default-sort= "{prop: 'transactionNo', order: 'descending'}"
    empty-text = "No record">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item :label="item.lable" v-for="item in props.row.showChoice">
            <span>{{ item.value }}</span>
          </el-form-item>
          <div class="file-list-wrap">
          <el-form-item label="Upload file list">
            <div v-for="item2 in props.row.proofs">
              <label>{{item2.lable}}</label>
              <div class="image-containers-wrap">
                <div class="image-container">
                  <div class="contract-check-list not-show">
                    <h5>{{item2.checkListTitle}}</h5>
                    <div style="display: flex;justify-content: space-around">
                      <div v-for="obj in item2.showWords">
                        <label>{{obj.key}} : </label>
                        <i>{{obj.value}}</i>
                      </div>
                    </div>
                  </div>
                  <div class="contract-wrap">
                    <img :src="item2.imgUrl" @click="showImg">
                    <span>
                      <i class="el-icon-success el-input__icon success-tip" v-if="item2.result"></i>
                      <i class="el-icon-error el-input__icon error-tip" v-else></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          </div>
          <div v-show='props.row.status == "Pending"' id="button-wrap">
            <el-form-item label="">
              <el-button type="success" plain @click="approve(props.row)">Approve</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button type="info" plain @click="reject(props.row)">Reject</el-button>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="Request No."
      prop="transactionNo">
    </el-table-column>
    <el-table-column
      label="Request Date"
      prop="requestDate"
      >
    </el-table-column>
    <el-table-column
      label="Status"
      prop="status">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
    export default {
        name:"InProgress",
        data (){
          return {
            tableData:[],
          }
        },
        created () {
          //alert(0)
          let _str = localStorage.getItem("payment")
          let _obj = JSON.parse(_str)

          for(let item in _obj){
            for(let obj in _obj[item].proofs){
              if(!_obj[item].proofs[obj].imgUrl){
                delete _obj[item].proofs[obj]
              }
            }
            this.tableData.push(_obj[item])
            debugger
          }
        },
        methods : {
          approve (item){
            item.status = "Approved"
            let transactionNo = item.transactionNo
            let dataInStorage = JSON.parse(localStorage.getItem('payment'))
            dataInStorage[transactionNo].status = "Approved"
            let objStr = JSON.stringify(dataInStorage)
            localStorage.setItem('payment',objStr)
            window.location.reload()
          },
          reject (item){
            item.status = "Rejected"
            let transactionNo = item.transactionNo
            let dataInStorage = JSON.parse(localStorage.getItem('payment'))
            dataInStorage[transactionNo].status = "Rejected"
            let objStr = JSON.stringify(dataInStorage)
            localStorage.setItem('payment',objStr)
            window.location.reload()
          },
          showImg (event) {
            let _dom = event.currentTarget
            let _height = _dom.height
            let _width = _dom.width
            _dom.toggleAttribute("enlarge")
            if(_dom.hasAttribute("enlarge")){
              _dom.setAttribute("class","enlarge")
              let zoomHeight = 1080*_height/_width
              _dom.style.height = zoomHeight+"px"
              _dom.style.width = "1080px"
              _dom.parentElement.previousElementSibling.setAttribute("class","contract-check-list")
            }else{
             let zoomWidth = 1080*110/_height
              _dom.style.width = zoomWidth+"px"
              _dom.style.height = "110px"
               _dom.parentElement.previousElementSibling.setAttribute("class","contract-check-list not-show")
            }

          }
        }
    }
</script>

<style scoped>
.table-wrap{
  height: 580px;
  overflow: scroll;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

.image-container{
  position: relative;
  margin-right: 20px;
}
.image-container img{
  cursor: pointer;
  height: 110px;
}
.image-container span{
  position: absolute;
  right: -15px;
  top: -25px;
}
.image-container span i{
  font-size: 20px;
}
.error-tip{
  color: #ff0000;
}
.success-tip{
  color: #008000
}
.image-containers-wrap{
  position: relative;
  /*display: flex;*/
}
#masker{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
  z-index: 99;
}
.enlarge{

}
.contract-wrap{
  position: relative;
  display: inline-block;
}
#button-wrap button{
  height: 35px;
  width: 300px;
}
.contract-check-list{
  width: 1100px;
  padding: 0 20px 20px 20px;
  background: #f9f9f9;
}
.contract-check-list h5{
  text-align: center;
}
.not-show{
  display: none;
}
</style>
