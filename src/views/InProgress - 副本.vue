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
          <el-form-item label="Transaction:">
            <span>{{ props.row.transaction }}</span>
          </el-form-item>
          <el-form-item label="Category:">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="Account:">
            <span>{{ props.row.account }}</span>
          </el-form-item>
          <el-form-item label="Amount:">
            <span>{{ props.row.amount }}</span>
          </el-form-item>
          <div class="file-list-wrap">
          <el-form-item label="Upload file list">
            <div class="image-containers-wrap">
            <label v-if='"contract" == props.row.contract.name || "Invoice" == props.row.contract.name ||"custom" == props.row.contract.name || "contractHSBC" == props.row.contract.name || "InvoiceHSBC" == props.row.contract.name || "othersHSBC" == props.row.contract.name || "customLack" == props.row.contract.name || "contractLack" == props.row.contract.name'>Contract : </label>
            <div class="image-container">
              <div class="contract-check-list not-show">
                <h5>Contract Check list</h5>
                <div style="display: flex;justify-content: space-around">
                  <div v-for="item in props.row.contract.checkList">
                      <label>{{item.key}} : </label>
                      <i>{{item.value}}</i>
                  </div>
                </div>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contract" == props.row.contract.name'>
                <img src="../assets/contract.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "Invoice" == props.row.contract.name'>
                <img src="../assets/Invoice.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "custom" == props.row.contract.name'>
                 <img src="../assets/custom.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
 
               <div class="contract-wrap" v-if='1 == props.row.images1 && "contractLack" == props.row.contract.name'>
                <img src="../assets/contractLack.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "customLack" == props.row.contract.name'>
                 <img src="../assets/customLack.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contractHSBC" == props.row.contract.name'>
                 <img src="../assets/contractHSBC.jpg" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
              <div class="contract-wrap" v-if='1 == props.row.images2 && "InvoiceHSBC" == props.row.contract.name'>
                 <img src="../assets/InvoiceHSBC.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
              <div class="contract-wrap" v-if='1 == props.row.images4 && "othersHSBC" == props.row.contract.name'>
                 <img src="../assets/othersHSBC.jpg" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.contract.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
            </div>

            <label v-if='"contract" == props.row.invoice.name || "Invoice" == props.row.invoice.name ||"custom" == props.row.invoice.name || "contractHSBC" == props.row.invoice.name || "InvoiceHSBC" == props.row.invoice.name || "othersHSBC" == props.row.invoice.name || "contractLack" == props.row.invoice.name || "customLack" == props.row.invoice.name'>Invoice : </label>
            <div class="image-container">
              <div class="contract-check-list not-show">
                <h5>Invoice Check list</h5>
                <div style="display: flex;justify-content: space-around">
                  <div v-for="item in props.row.invoice.checkList">
                      <label>{{item.key}} : </label>
                      <i>{{item.value}}</i>
                  </div>
                </div>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contract" == props.row.invoice.name'>
                <img src="../assets/contract.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "Invoice" == props.row.invoice.name'>
                <img src="../assets/Invoice.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "custom" == props.row.invoice.name'>
                 <img src="../assets/custom.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contractLack" == props.row.invoice.name'>
                <img src="../assets/contractLack.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "customLack" == props.row.invoice.name'>
                 <img src="../assets/customLack.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>



               <div class="contract-wrap" v-if='1 == props.row.images1 && "contractHSBC" == props.row.invoice.name'>
                <img src="../assets/contractHSBC.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "InvoiceHSBC" == props.row.invoice.name'>
                <img src="../assets/InvoiceHSBC.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images4 && "othersHSBC" == props.row.invoice.name'>
                 <img src="../assets/othersHSBC.jpg" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.invoice.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
            </div>





            <label v-if='"contract" == props.row.declaration.name || "Invoice" == props.row.declaration.name ||"custom" == props.row.declaration.name ||"contractHSBC" == props.row.declaration.name ||"InvoiceHSBC" == props.row.declaration.name ||"othersHSBC" == props.row.declaration.name || "customLack" == props.row.declaration.name || "contractLack" == props.row.declaration.name'>Declaration : </label>
            <div class="image-container">
              <div class="contract-check-list not-show">
                <h5>Customer Declaration Check list</h5>
                <div style="display: flex;justify-content: space-around">
                  <div v-for="item in props.row.declaration.checkList">
                      <label>{{item.key}} : </label>
                      <i>{{item.value}}</i>
                  </div>
                </div>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contract" == props.row.declaration.name'>
                <img src="../assets/contract.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "Invoice" == props.row.declaration.name'>
                <img src="../assets/Invoice.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "custom" == props.row.declaration.name'>
                 <img src="../assets/custom.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 


                <div class="contract-wrap" v-if='1 == props.row.images1 && "contractLack" == props.row.declaration.name'>
                <img src="../assets/contractLack.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "customLack" == props.row.declaration.name'>
                 <img src="../assets/customLack.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contractHSBC" == props.row.declaration.name'>
                <img src="../assets/contractHSBC.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "InvoiceHSBC" == props.row.declaration.name'>
                <img src="../assets/InvoiceHSBC.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images4 && "othersHSBC" == props.row.declaration.name'>
                 <img src="../assets/othersHSBC.jpg" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.declaration.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
            </div>



        <label v-if='"contract" == props.row.other.name || "Invoice" == props.row.other.name ||"custom" == props.row.other.name || "contractHSBC" == props.row.other.name || "InvoiceHSBC" == props.row.other.name || "othersHSBC" == props.row.other.name || "customLack" == props.row.other.name || "contractLack" == props.row.other.name'>Others : </label>
            <div class="image-container">
              <div class="contract-check-list not-show">
                <h5>Customer Declaration Check list</h5>
                <div style="display: flex;justify-content: space-around">
                  <div v-for="item in props.row.other.checkList">
                      <label>{{item.key}} : </label>
                      <i>{{item.value}}</i>
                  </div>
                </div>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contract" == props.row.other.name'>
                <img src="../assets/contract.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "Invoice" == props.row.other.name'>
                <img src="../assets/Invoice.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "custom" == props.row.other.name'>
                 <img src="../assets/custom.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 


                <div class="contract-wrap" v-if='1 == props.row.images1 && "contractLack" == props.row.other.name'>
                <img src="../assets/contractLack.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images3 && "customLack" == props.row.other.name'>
                 <img src="../assets/customLack.png" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div> 
              <div class="contract-wrap" v-if='1 == props.row.images1 && "contractHSBC" == props.row.other.name'>
                <img src="../assets/contractHSBC.jpg" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images2 && "InvoiceHSBC" == props.row.other.name'>
                <img src="../assets/InvoiceHSBC.png" @click="showImg">
                <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
              </div>
              <div class="contract-wrap" v-if='1 == props.row.images4 && "othersHSBC" == props.row.other.name'>
                 <img src="../assets/othersHSBC.jpg" @click="showImg">
                 <span>
                  <i class="el-icon-success el-input__icon success-tip" v-if='"success" == props.row.other.result'></i>
                  <i class="el-icon-error el-input__icon error-tip" v-else></i>
                </span>
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
      prop="date"
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
            tableData5: [{
              id: '12987122',
              date: "1999-08-07",
              status: "pedding",
              transactionNo: "57358784354878",
              transaction: "6544444458787",
              category: "国内",
              account: "人民币",
              amount: "100块",
              test:"logo.png",
              imgList:{
                name1:"logo.png",
                name2:"",
                name3:""
              }
            },
            {
              id: '12987122',
              date: "1999-08-07",
              status: "pedding",
              transactionNo: "57358784354878",
              transaction: "6544444458787",
              category: "国内",
              account: "人民币",
              amount: "100块",
              imgList:{
                name1:"logo.png",
                name2:"",
                name3:""
              }
            },
            {
              id: '12987122',
              date: "1999-08-07",
              status: "pedding",
              transactionNo: "57358784354878",
              transaction: "6544444458787",
              category: "国内",
              account: "人民币",
              amount: "100块",
              imgList:{
                name1:"logo.png",
                name2:"",
                name3:""
              }
            }]
          }
        },
        created () {
          //alert(0)
          let _str = localStorage.getItem("payment")
          let _obj = JSON.parse(_str)
          for(let item in _obj){
            this.tableData.push(_obj[item])
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
