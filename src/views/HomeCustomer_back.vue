<template>
  <div class="home">
    <div class="header">
          {{header}}
    </div>
    <div class="content-body">
        <el-tabs type="card" >
          <el-tab-pane label="General" name="first"></el-tab-pane>
        </el-tabs>
        <div class="general-wrap">
          <span class="label">Transaction : </span>
             <el-select v-model="transactionTypeVal" placeholder="Transaction"  @input='changeVal'>
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="label need-left-margin">Category : </span>
            <el-select v-model="CategoryVal" placeholder="Category"  @input='changeVal'>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="label need-left-margin">Account : </span>
            <el-select v-model="accountVal" placeholder="Account"  @input='changeVal'>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="label need-left-margin">Amount : </span>
            <div class="input-wrap">
              <el-input v-model="amountVal" placeholder="Amount"  @input='changeVal'></el-input>
            </div>

        </div>
        <div class="transaction-wrap">
            <el-tabs type="card" >
              <el-tab-pane label="Transaction Information" name="second"></el-tab-pane>
            </el-tabs>
            <div class="upload-file">
            <el-row>
              <el-button plain @click="selectContract" v-if="Contract" :disabled="contractI == 0">
                Contract
                <i class="el-icon-loading el-icon--right ready-to-upload" v-if="contractI == 0"></i>
                <i class="el-icon-upload el-icon--right" v-if="contractI == 1"></i>
                <i class="el-icon-success el-icon--right success" v-else-if="contractI == 2"></i>
                <i class="el-icon-error el-icon--right error" v-else-if="contractI == 3"></i>
              </el-button>
              <el-button plain @click="selectInvoice" v-if="Invoice" :disabled="invoiceI == 0">
                Invoice
                <i class="el-icon-loading el-icon--right ready-to-upload" v-if="invoiceI == 0"></i>
                <i class="el-icon-upload el-icon--right" v-if="invoiceI == 1"></i>
                <i class="el-icon-success el-icon--right success" v-else-if="invoiceI == 2"></i>
                <i class="el-icon-error el-icon--right error" v-else-if="invoiceI == 3"></i>
              </el-button>
              <el-button plain @click="selectCustom" v-if="Custom" :disabled="declarationI == 0">
                Custom Declaration
                <i class="el-icon-loading el-icon--right ready-to-upload" v-if="declarationI == 0"></i>
                <i class="el-icon-upload el-icon--right" v-if="declarationI == 1"></i>
                <i class="el-icon-success el-icon--right success" v-else-if="declarationI == 2"></i>
                <i class="el-icon-error el-icon--right error" v-else-if="declarationI == 3"></i>
              </el-button>
               <el-button plain @click="selectOthers" v-if="Others" :disabled="othersI == 0">
                Others
                <i class="el-icon-loading el-icon--right ready-to-upload" v-if="othersI == 0"></i>
                <i class="el-icon-upload el-icon--right" v-if="othersI == 1"></i>
                <i class="el-icon-success el-icon--right success" v-else-if="othersI == 2"></i>
                <i class="el-icon-error el-icon--right error" v-else-if="othersI == 3"></i>
              </el-button>
             </el-row>
              </div>
              
              <form id="contractData" enctype="multipart/form-data" v-show='fromHidden'>
                  <input type="file" id='checkContractFile' name='img' @change='checkContractFile'>
              </form>
              <form id="invoiceData" enctype="multipart/form-data" v-show='fromHidden'>
                  <input type="file" id='checkInvoiceFile' name='img' @change='checkInvoiceFile'>
              </form>
              <form id="customData" enctype="multipart/form-data" v-show='fromHidden'>
                <input type="file" id='checkCustomFile' name='img' @change='checkCustomFile'>
              </form>
              <form id="othersData" enctype="multipart/form-data" v-show='fromHidden'>
                <input type="file" id='checkOthersFile' name='img' @change='checkOthersFile'>
              </form>
            </div>
    </div>
    <div class="submitStyle">
      <el-button type="danger" :disabled="subFlag" @click='submitClick'>{{submit}}</el-button>
    </div>
 
   </div>
</template>
<script>
  export default {
    name:'home',
    data (){
      return {
        requestURL:"http://localhost:10001/jtesseract-ocr/ocr/upload?lang=vie",
        //requestURL:"https://openocr.ai-gogo.cn/jtesseract-ocr/ocr/upload",
        submit:'Submit',
        contractI:'1',
        invoiceI:'1',
        declarationI:'1',
        othersI:'1',
        contractObj:{
          hasImg:false,
          name:'',
          result:'',
          imgUrl:null
        },
        invoiceObj:{
          hasImg:false,
          name:'',
          result:'',
          imgUrl:null
        },
        declarationObj:{
          hasImg:false,
          name:'',
          result:'',
          imgUrl:null
        },
        othersObj:{
          hasImg:false,
          name:'',
          result:'',
          imgUrl:null
        },
        header:'Payment Record Management System',
        creat:'payment request',
        options1: [{
          value: 'Goods',
          label: 'Goods'
        }, {
          value: 'Service',
          label: 'Service'
        },{
          value: 'Reimbursement',
          label: 'Reimbursement'
        }],
        options2: [{
          value: 'Reserve',
          label: 'Reserve'
        }, {
          value: 'Offshore',
          label: 'Offshore'
        }],
        options3: [{
          value: 'Domestic',
          label: 'Domestic'
        }, {
          value: 'Cross Border',
          label: 'Cross Border'
        }],
        ammount: '',
        Contract:false,
        Invoice:false,
        Custom:false,
        Others:false,
        transactionTypeVal:'',
        accountVal:'',
        CategoryVal:'',
        amountVal:'',
        selectFileType:'',
        fromHidden:false,
        CustomName:'',
        subFlag:true,
        ContractName:"",
        InvoiceName:"",
        CustomName:"",
        othersName:"",
        progress:'Pending'
      }
    },
    methods:{
      getCheckList(keyWords,content){
          if("contract" == keyWords){
              this.contractObj.checkList = {
                  item1:{
                    key:"No.",
                    value: this.getInnerString(content,"No, ","Date").replace("8","9")
                  },
                   item2:{
                    key:"Date",
                    value: this.getInnerString(content,"Date: ","The Buyer")
                  },
                  item3:{
                    key:"The Buyer",
                    value: this.getInnerString(content,"The Buyer:","The Seller")
                  },
                  item4:{
                    key:"The Seller",
                    value: this.getInnerString(content,"The Seller:","tal: ara-sreari6a")
                  }
              }
          }else if("invoice" == keyWords){
              this.invoiceObj.checkList = {
         /*       let contractNo = this.getInnerString(content,"CONTRACT No, 芦 "," T/C Na +")
                let _contractNo = contractNo.replace("")*/
                item1:{
                    key:"Bill To",
                    value: this.getInnerString(content,"BillTo "," Invoice Number = ")
                },
                item2:{
                  key:"Invoice No.",
                  value: this.getInnerString(content," Invoice Number = ","Room 501")
                },
                item3:{
                  key:"Due Date",
                  value: this.getInnerString(content,"Beijing Due Date ","aa")
                }
              }
          }else if("custom" == keyWords){
              this.declarationObj.checkList = {
                item1:{
                    key:"Note",
                    value: this.getInnerString(content,"Note: ","Email")
                },
                item2:{
                  key:"Email",
                  value: this.getInnerString(content,"Email : ","Call")
                },
                item3:{
                  key:"Call",
                  value: this.getInnerString(content,"Call : ","Registered Office")
                }
              }
          }else if("contractHSBC" == keyWords){
              this.contractObj.checkList = {
                item1:{
                    key:"First Party",
                    value: this.getInnerString(content,"between","(hereinafter")
                },
                item2:{
                  key:"Second Party",
                  value: this.getInnerString(content,"and","{in the following")
                }
              }
          }else if("InvoiceHSBC" == keyWords){
              this.invoiceObj.checkList = {
                item1:{
                    key:"Total",
                    value: this.getInnerString(content,"Total usd ","")
                }
              }
          }else if("othersHSBC" == keyWords){
              this.othersObj.checkList = {
                item1:{
                    key:"To",
                    value: this.getInnerString(content,"to: | "," DATE:")
                },
                item2:{
                  key:"From",
                  value: this.getInnerString(content,"rrom: | ","鈥淸L")
                },
                item3:{
                  key:"Date",
                  value: this.getInnerString(content,"DATE: ",",rrom: | CSI")
                }
              }
          }
      },      
      getInnerString(_source, prefix, postfix) {
        let source = _source.replace(/[\r\n]/g, "")//去除回车和换行
        let regexp = new RegExp(this.encodeReg(prefix) + '.+' + this.encodeReg(postfix), 'g')
        let matches = String(source).match(regexp)
        let formatedMatches = null
        if(matches){
          formatedMatches = matches[0].replace(prefix, '').replace(postfix, '')//默认读取第一个匹配的内容
        }else{
          formatedMatches = ""
        }
        return formatedMatches
      },
      encodeReg(source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
      },
      selectContract(){
        let fileDom = document.querySelector("#checkContractFile")
        fileDom.click()
      },
      submitClick:function(){

        this.$confirm('Do you want to submit?', 'Notice', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }).then(() => {
          if(this.ContractName.indexOf("contract")!= -1 || this.InvoiceName.indexOf("contract")!= -1 || this.CustomName.indexOf("contract")!= -1 || this.othersName.indexOf("contract")!= -1){
            var images1 = 1
          }else{
            var images1 = 0
          }
          if(this.ContractName.indexOf("Invoice")!= -1 || this.InvoiceName.indexOf("Invoice")!= -1 || this.CustomName.indexOf("Invoice")!= -1|| this.othersName.indexOf("Invoice")!= -1){
            var images2 = 1
          }else{
            var images2 = 0
          }
          if(this.ContractName.indexOf("custom")!= -1 || this.InvoiceName.indexOf("custom")!= -1 || this.CustomName.indexOf("custom")!= -1|| this.othersName.indexOf("custom")!= -1){
            var images3 = 1
          }else{
            var images3 = 0
          }
          if(this.ContractName.indexOf("others")!= -1 || this.InvoiceName.indexOf("others")!= -1 || this.CustomName.indexOf("others")!= -1|| this.othersName.indexOf("others")!= -1){
            var images4 = 1
          }else{
            var images4 = 0
          }
          var date = new Date()
          var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;

          var id = date.getTime().toString()
          var time = y + '-' + m + '-' + d+' '+h+':'+minute
          var JSONData = {
            'transactionNo':id,
            "transaction":this.transactionTypeVal,
            "account":this.accountVal,
            "category":this.CategoryVal,
            "amount":this.amountVal,
            "images1":images1,
            "contract":this.contractObj,
            "invoice":this.invoiceObj,
            "declaration":this.declarationObj,
            "other":this.othersObj,
            "images2":images2,
            "images3":images3,
            "images4":images4,
            "status":this.progress,
            "date": time
          }
          var payment = localStorage.getItem('payment')
          if(payment){
            payment = JSON.parse(payment)
          }else{
            payment={}
          }
          payment[id] = JSONData
          localStorage.setItem('payment',JSON.stringify(payment))  
          const h = this.$createElement;
          this.$message({
            message: h('p', null, [
              h('i', 'Submit successfully!')
            ])
          });
          this.$router.push('CreatPayment')
          },()=>{
            console.log("error")
          })


      },
      submitDis:function(){
        if(this.transactionTypeVal=='Cross Border' && this.accountVal=='Offshore' && this.CategoryVal=='Reimbursement'){
          if((this.contractI !='1' && this.contractI !='0') && (this.invoiceI !='1'&& this.invoiceI !='0') && (this.declarationI !='1' && this.declarationI !='0')&& (this.othersI !='1' && this.othersI !='0')){
            this.subFlag = false
          }else{
            this.subFlag = true
          }
         }else if(this.transactionTypeVal=='Cross Border' && this.accountVal=='Reserve' && this.CategoryVal=='Service'){
          if(this.amountVal>10000){
            if((this.contractI !='1' && this.contractI !='0') && (this.invoiceI !='1' && this.invoiceI !='0') ){
              this.subFlag = false
            }else{
              this.subFlag = true
            }
          }else{
            if(this.invoiceI !='1'&& this.invoiceI !='0'){
              this.subFlag = false
            }else{
              this.subFlag = true
            }
          }
        }else{
          if((this.contractI !='1' && this.contractI !='0') && (this.invoiceI !='1'&& this.invoiceI !='0') && (this.declarationI !='1' && this.declarationI !='0')){
            this.subFlag = false
          }else{
            this.subFlag = true
          }
        }
      },
      checkContractFile:function(){
        let _inputDom = document.querySelector('#checkContractFile')
        if(!_inputDom.value){
          return
        }
        this.contractI = '0'
        var Custom = _inputDom.value.split("\\")
        this.ContractName =  Custom[Custom.length-1]
        this.contractObj.imgUrl = '/'+this.ContractName
        let _imageName = this.ContractName.split(".")[0]
        this.contractObj.name = _imageName
        var formdata = new FormData(document.querySelector("#contractData"))
        _inputDom.value = ""
        this.$axios.post(this.requestURL, formdata).then((res)=>{
          if(res.status == 200){
            //var _bodyText = res.bodyText
            var _bodyText = res.data
            if(_imageName == "contractHSBC"){
              this.getCheckList("contractHSBC",_bodyText)
            }else{
              this.getCheckList("contract",_bodyText)
            }
            
            if(_bodyText && (_bodyText.indexOf("The Buyer") != -1 || _bodyText.indexOf("Contract") != -1 )){
              this.contractI = '2'
              this.contractObj.result = "success"
            }else{
              this.contractI = '3'
              this.contractObj.result = "error"
            }
          }else{
              this.contractI = '3'
              this.contractObj.result = "error"
          }
            this.submitDis()
        }, (err)=>{
          this.contractI = '3'
          this.contractObj.result = "error"
        })
      },
      selectInvoice(){
        let fileDom = document.querySelector("#checkInvoiceFile")
        fileDom.click()
      },
      checkInvoiceFile:function(){
        let _inputDom = document.querySelector('#checkInvoiceFile')
        if(!_inputDom.value){
          return
        }
        this.invoiceI='0'
        var Custom = _inputDom.value.split("\\")
        this.InvoiceName =  Custom[Custom.length-1]
        this.invoiceObj.imgUrl = '/'+this.InvoiceName
        let _imageName = this.InvoiceName.split(".")[0]
        this.invoiceObj.name = _imageName
        var formdata = new FormData(document.querySelector("#invoiceData"))
        _inputDom.value = ""
        this.$axios.post(this.requestURL, formdata).then((res)=>{
          if(res.status == 200){
            //var _bodyText = res.bodyText
            var _bodyText = res.data
            if(_imageName == "InvoiceHSBC"){
              this.getCheckList("InvoiceHSBC",_bodyText)
            }else{
              this.getCheckList("invoice",_bodyText)
            }
            if(_bodyText &&(_bodyText.indexOf("Designs Invoice Number") != -1 || _bodyText.indexOf("Invoice"))){
              this.invoiceI='2'
              this.invoiceObj.result = "success"
            }else{
             this.invoiceI='3'
             this.invoiceObj.result = "error"
            }
          }else{
            this.invoiceI='3'
            this.invoiceObj.result = "error"
          }
          this.submitDis()
        }, (err)=>{
          this.invoiceI='3'
          this.invoiceObj.result = "error"
        })
      },
      selectOthers(){
        let fileDom = document.querySelector("#checkOthersFile")
        fileDom.click()
      },
      checkOthersFile:function(){
        let _inputDom = document.querySelector('#checkOthersFile')
        if(!_inputDom.value){
          return
        }
        this.othersI='0'
        var others = _inputDom.value.split("\\")
        this.othersName =  others[others.length-1]
        this.othersObj.imgUrl = '/'+this.othersName
        let _imageName = this.othersName.split(".")[0]
        this.othersObj.name = _imageName
        var formdata = new FormData(document.querySelector("#othersData"))
        _inputDom.value = ""
        this.$axios.post(this.requestURL, formdata).then((res)=>{
          if(res.status == 200){
            //var _bodyText = res.bodyText
            var _bodyText = res.data
            this.getCheckList("othersHSBC",_bodyText)
            //the Ganeral Terms and Conditions
            this.othersI='2'
            this.othersObj.result = "success"
          }else{
            this.othersI='3'
            this.othersObj.result = "error"
          }
          this.submitDis()
        }, (err)=>{
          this.othersI='3'
          this.othersObj.result = "error"
        })
      },
      selectCustom(){
        let fileDom = document.querySelector("#checkCustomFile")
        fileDom.click()
      },
      checkCustomFile:function(){
        let _inputDom = document.querySelector('#checkCustomFile')
        if(!_inputDom.value){
          return
        }
        this.declarationI='0'
        var Custom = _inputDom.value.split("\\")
        this.CustomName =  Custom[Custom.length-1]
        this.declarationObj.imgUrl = '/'+this.CustomName
        let _imageName = this.CustomName.split(".")[0]
        this.declarationObj.name = _imageName
        var formdata = new FormData(document.querySelector("#customData"))
        _inputDom.value = ""
        this.$axios.post(this.requestURL, formdata).then((res)=>{
          if(res.status == 200){
            //var _bodyText = res.bodyText
            var _bodyText = res.data
            this.getCheckList("custom",_bodyText)
            //the Ganeral Terms and Conditions
            if(_bodyText && _bodyText.indexOf("CUSTOMER DECLARATION FORM") != -1 ){
              this.declarationI='2'
              this.declarationObj.result = "success"
            }else{
              this.declarationI='3'
              this.declarationObj.result = "error"
            }
          }else{
            this.declarationI='3'
            this.declarationObj.result = "error"
          }
          this.submitDis()
        }, (err)=>{
          this.declarationI='3'
          this.declarationObj.result = "error"
        })
      },
      changeVal:function(){
        if(this.transactionTypeVal.trim() && this.accountVal.trim() &&this.CategoryVal.trim()){
         if(this.transactionTypeVal=='Cross Border' && this.accountVal=='Offshore' && this.CategoryVal=='Reimbursement'){
            this.Contract=true
            this.Invoice=true
            this.Custom=true
            this.Others=true
         }else if(this.transactionTypeVal=='Cross Border' && this.accountVal=='Reserve' && this.CategoryVal=='Service'){
            if(this.amountVal>10000){
              this.Contract=true
              this.Invoice=true
              this.Custom=false
              this.Others=false
            }else{
              this.Contract=false
              this.Invoice=true
              this.Custom=false
              this.Others=false
            }
          }else{
            this.Contract=true
            this.Invoice=true
            this.Custom=true
            this.Others=false
          }
        }else{
          this.Contract=false
          this.Invoice=false
          this.Custom=false
          this.Others=false
        }
      },
    }
  }
</script>
<style>
.label{
  font-size: 16px;
  margin-right: 5px;
}
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
.disabled{opacity: 0.5}
.general-wrap{
    display: flex;
    align-items: center;
    padding: 0 20px;
}
.transaction-wrap{
  margin-top: 100px;

}
.upload-file{
    display: flex;
    padding: 0 20px;
}
#fileInput{
  display: none;
}
.submitStyle{
  position: relative;
  bottom:-120px;
}
.need-left-margin{
  margin-left: 20px;
}
.el-button{
  margin-right: 10px;
}
.ready-to-upload{
 color: #409EFF;
}
.success{
  color: #039a03;
}
.error{
  color: #e02727;
}
.upload-file button{
  height: 35px;
  width: 300px;
}
</style>
