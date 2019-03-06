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
          <div class="select-wrap">
            <span class="label">Receiver : </span>
              <div class="input-wrap">
                <el-input v-model="receiver" placeholder="Receiver's name" @input='changeReceiver'></el-input>
            </div>
          </div>
          <div class="select-wrap">
            <span class="label">Transaction Type : </span>
              <el-select v-model="transaction" placeholder="Transaction"  @input='changeTransaction'>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="select-wrap" v-if="options2.length">
            <span class="label">Customer Type : </span>
              <el-select v-model="nationality" placeholder="Customer Type"  @input='changeNationality'>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="general-wrap">
          <div class="select-wrap" v-if="options3.length">
            <span class="label">Payment Purpose : </span>
            <el-select v-model="bussiness" placeholder="Payment Purpose"  @input='changeBussiness'>
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="paymentType" placeholder="Payment Type"  v-if="options4.length" @input='changeSpendPurpose'>
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="input-wrap">
              <el-input v-if="'Studying' == paymentType" v-model="paymentForStudy" placeholder="Maximum 25000/Year"></el-input>
              <el-input v-if="'Working' == paymentType" v-model="paymentForWork" placeholder="Maximum 7000/Year"></el-input>
            </div>
          </div>
        </div>

        <div class="transaction-wrap">
          <el-tabs type="card" >
            <el-tab-pane label="Transaction Information" name="second"></el-tab-pane>
          </el-tabs>
          <div class="upload-file">
            <el-row>
              <div v-for="item in proofs" class="upload-btn-wrap">
                <el-button plain @click="handleUploadBtn(item.key)" :disabled=" 0 == item.status" class="marin-left-10 upload-btn">
                  {{item.lable}}
                  <i class="el-icon-loading el-icon--right ready-to-upload" v-if="0 == item.status"></i>
                  <i class="el-icon-upload el-icon--right" v-if="item.status == 1"></i>
                  <i class="el-icon-success el-icon--right success" v-else-if="item.status == 2"></i>
                  <i class="el-icon-error el-icon--right error" v-else-if="item.status == 3"></i>
                </el-button>
                <form enctype="multipart/form-data"  class="not-show">
                  <input type="file" :id="item.key" name='img' @change='checkUploadFile(item.key)'>
                </form>
              </div>
            </el-row>
          </div>
        </div>
    </div>
    <div class="submitStyle">
      <el-button type="danger" :disabled="subFlag" @click='submitClick'>Submit</el-button>
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
        options1: [{
          value: 'Domestic',
          label: 'Domestic'
        }, {
          value: 'Oversea',
          label: 'Oversea'
        }],
        options2:[],
        options3:[],
        options4:[],
        overseaOptions:[{
          value: 'Foreigner',
          label: 'Foreigner'
        },{
          value: 'Vietnamese',
          label: 'Vietnamese'
        }],
        vietnameseOptions:[{
            value: 'Immigration',
            label: 'Immigration'
          },{
            value: 'LivingExpense',
            label: 'Living expense' 
          },{
            value: 'TuitionFee',
            label: 'Tuition fee'
        }],
        livingExpenseOptions:[{
            value: 'Studying',
            label: 'Studying'
          },{
            value: 'Working',
            label: 'Working'
        }],
        transaction:null,
        nationality:null,
        bussiness:null,
        paymentType:null,
        receiver:null,
        paymentForStudy:null,
        paymentForWork:null,
        subFlag:true,
        allTheFiles:{
          passport:{
            key:'passport',
            lable:'Passport',
            status:1,
            result:false,
            checkListTitle:'Passport Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'P WZZZ NM. ',end:'N Họ và',key:'Passport No.',value:''},
              {start:'Full name Ï: "',end:' MS',key:'Full Name',value:''},
              {start:'Vafionaliiy',end:'Ngày sinh',key:'Nationality',value:''},
              {start:'MayiGĐit ',end:'Nơicấp',key:'Date of expiry',value:''}
            ],
            keyWords:['HỘ CHIẾU/PASSPORT']
          },
          certified:{
            key:'certified',
            lable:'Certified/Notarized proof of resettlement',
            status:1,
            result:false,
            checkListTitle:'Certified/Notarized Proof Of Resettlement Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {key:'Surname',value:'',label:'Surname'},
              {key:'Given Name',value:'',label:'GivenName'},
              {key:'USCIS#',value:'',label:'USCIS#'},
              {key:'Card Expires',value:'',label:'CardExpires'},
            ],
            keyWords:[]
          },
          bankStatement:{
            key:'bankStatement',
            lable:'Bank statement',
            status:1,
            result:false,
            checkListTitle:'Bank Statement Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'Branch Number ',end:'Tên chỉ nhánh',key:'Branch No.',value:''},
              {start:'Branch Name ',end:'Số trang 1',key:'Branch Name',value:''},
              {start:'sao kê / Statement Date ',end:'Mã số khách',key:'Statement Date',value:''},
              {start:'Stmt Sheet Number ',end:'Phương thức gửi',key:'Sheet No.',value:''},
            ],
            keyWords:['Bảng sao kê tổng hợp / Composite Statement']
          },
          SellingHouseContract:{
            key:'SellingHouseContract',
            lable:'Selling house contract',
            status:1,
            result:false,
            checkListTitle:'Selling House Contract Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'at02.02.2017._ between ',end:' resident of 422',key:'Vendor',value:''},
              {start:'ONE PART and ',end:' resident of',key:'Buyer',value:''},
              {start:'made at',end:'._ between',key:'Date',value:''},
              {start:'price of VND ',end:' free from all',key:'Price',value:''} 
            ],
            keyWords:['Selling house Contract']
          },
          relationshipProof:{
            key:'relationshipProof',
            lable:'Relationship proof',
            status:1,
            result:false,
            checkListTitle:'Relationship Proof Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'1 ',end:'  ,',key:'Name',value:''},
              {start:'  ,',end:' ,agedabout',key:'Relationship',value:''},
              {start:'agedabout ',end:' years',key:'Age',value:''} 
            ],
            keyWords:['STATEMENT OF RELATLONSHIP']
          },
          visa:{
            key:'visa',
            lable:'Visa',
            status:1,
            result:false,
            checkListTitle:'Visa Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {key:'Surname',value:'',label:'Surname'},
              {key:'Given Name',value:'',label:'GivenName'},
              {key:'Passport No.',value:'',label:'PassportNumber'},
              {key:'Expiration Date',value:'',label:'ExpirationDate'},
            ],
            keyWords:[]
          },
          enrollmentProof:{
            key:'enrollmentProof',
            lable:'Enrollment proof',
            status:1,
            result:false,
            checkListTitle:'Enrollment Proof Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'Street Name: ',end:'Pittsburgh',key:'Name',value:''},
              {start:'Passport: ',end:'United States',key:'Passport No.',value:''},
              {start:'Verification as of ',end:'Degrees Earned',key:'Date',value:''}
            ],
            keyWords:['Enrollment Verification']
          },
          schoolInvoice:{
            key:'schoolInvoice',
            lable:'Invoice from school/university',
            status:1,
            result:false,
            checkListTitle:'Invoice From School/University Check list',
            imgUrl:null,
            uploadType:null,
            showWords:[
              {start:'Term: ',end:' Student Billing',key:'Term',value:''},
              {start:'Student Hame ',end:' StudentID:',key:'Name',value:''},
              {start:'StudentID: ',end:'5tudent',key:'Student ID',value:''},
              {start:'Due Date: ',end:'* PREVIDUS',key:'Due Date',value:''}
            ],
            keyWords:['12/10/2013 Eastern Michigan University']
          }
        },
        proofs:{
          
        },
        header:'Payment Record Management System',
      }
    },
    methods:{
      test(p){
        alert(p)
        // console.log("this.transaction:"+this.transaction)
        // console.log("this.nationality:"+this.nationality)
        // console.log("this.bussiness:"+this.bussiness)
        // console.log("this.paymentType:"+this.paymentType)
      },
      resetData(){
        for(let item in this.allTheFiles){
          this.allTheFiles[item].imgUrl = null
          this.allTheFiles[item].result = null
          this.allTheFiles[item].name = null
          this.allTheFiles[item].status = 1
        }
      },
      checkReceiver(){
        let loginName = localStorage.getItem('loginName')
        if (!loginName) {
          let that = this
          const h = this.$createElement;
          this.$confirm('Session has expired. Please login again.', 'Notice', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          }).then(()=>{
              that.$router.push('/')
          })
        }
        if((!loginName || !this.receiver || loginName != this.receiver) && this.bussiness && 'TuitionFee' != this.bussiness){
          this.proofs.relationshipProof = this.allTheFiles.relationshipProof
        }else{
          delete this.proofs.relationshipProof
        }
      },
      changeReceiver(){
        this.allTheFiles.relationshipProof.imgUrl = null
        this.allTheFiles.relationshipProof.result = null
        this.allTheFiles.relationshipProof.name = null
        this.allTheFiles.relationshipProof.status = 1
        this.checkReceiver()
        this.checkSubmitStatus()
      },
      changeTransaction(){
        this.proofs={}
        this.resetData()
        if ('Oversea' === this.transaction) {
          this.options2 = this.overseaOptions
        }else if('Domestic' === this.transaction){
          //选择了Domestic的情况下, 不用上传任何文件
          this.options2 = []
          this.options3 = []
          this.options4 = []
          this.nationality = null
          this.bussiness = null
          this.paymentType = null
        }
      },
      changeNationality(){
        this.proofs={}
        this.resetData()
        if('Vietnamese' === this.nationality){
          this.options3 = this.vietnameseOptions
        }else if('Foreigner' === this.nationality){
          //选择了Oversea & Foreigner的情况下 , 不用上传任何文件
          this.options3 = []
          this.options4 = []
          this.bussiness = null
          this.paymentType = null

        }
      },
      changeBussiness(){
        this.proofs={}
        this.resetData()
        //选择了Oversea & Vietnamese & Immigration, 需要上传passport/certified/     bankStatement/SellingHouseContract/relationshipProof
        if('Immigration' === this.bussiness){
          this.options4 = []
          this.paymentType = null
          this.proofs.passport = this.allTheFiles.passport
          this.proofs.bankStatement = this.allTheFiles.bankStatement
          this.proofs.SellingHouseContract = this.allTheFiles.SellingHouseContract
          this.checkReceiver()
          this.proofs.certified = this.allTheFiles.certified
        //选择了Oversea & Vietnamese & LivingExpense
        }else if('LivingExpense' === this.bussiness){
          this.options4 = this.livingExpenseOptions
        //选择了Oversea & Vietnamese & TuitionFee, 需要上传passport/visa/enrollmentProof/schoolInvoice
        }else if('TuitionFee' === this.bussiness){
          this.options4 = []
          this.paymentType = null
          this.proofs.passport = this.allTheFiles.passport
          this.proofs.visa = this.allTheFiles.visa
          this.proofs.enrollmentProof = this.allTheFiles.enrollmentProof
          this.proofs.schoolInvoice = this.allTheFiles.schoolInvoice
        }
      },
      changeSpendPurpose(){
        this.proofs={}
        this.resetData()
        //选择了Oversea & Vietnamese & LivingExpense & Working, 需要上传passport/visa/relationshipProof
        if("Working" === this.paymentType){
          this.proofs.passport = this.allTheFiles.passport
          this.proofs.visa = this.allTheFiles.visa
          this.checkReceiver()
        //选择了Oversea & Vietnamese & LivingExpense & Studying,  需要上传passport/visa/enrollmentProof/relationshipProof
        }else if("Studying" === this.paymentType){
          this.proofs.passport = this.allTheFiles.passport
          this.proofs.visa = this.allTheFiles.visa
          this.proofs.enrollmentProof = this.allTheFiles.enrollmentProof
          this.checkReceiver()
        }
      },
      handleUploadBtn(key){
        document.querySelector(`#${key}`).click()
      },
      checkSubmitStatus(){
        if(!this.options3.length){
          return
        }
        let result = 0
        for(let key in this.proofs){
          debugger
          if('bankStatement'== key || 'SellingHouseContract' == key){
            continue
          }
          //如果某文件没有上传
          if(!this.proofs[key].imgUrl){
            result--
          }
        }

        if(this.proofs.bankStatement || this.proofs.bankStatement){
          if((this.proofs.bankStatement && this.proofs.bankStatement.imgUrl) || (this.proofs.SellingHouseContract && this.proofs.SellingHouseContract.imgUrl)){
          console.log('test')
          }else{
            result--
          }
        }
        if(result == 0){
          this.subFlag = false
        }else{
          this.subFlag = true
        }
        

      },
      specialRequest(formdata,fileTyple){
        let that = this
        let _fileTyple = fileTyple
        if('visa' == fileTyple){
          formdata.append('tpl','visa')
        }else{
          formdata.append('tpl','resident')
        }
         this.$axios.post('http://localhost:10001/jtesseract-ocr/template/nocrop',formdata,{
    　　　　headers:{
    　　　　'Content-Type':'multipart/form-data'   
    　　　　}
    　　}).then((res)=>{
          if(res.status == 200){
            debugger
            that.proofs[_fileTyple].status = 2
            that.proofs[_fileTyple].result = true
            that.proofs[_fileTyple].showWords.map(function(item){
              debugger
              item.value = res.data[item.label]
            })
          }else{
            that.proofs[_fileTyple].status = 3
          }
          that.checkSubmitStatus()
        },(err)=>{
          that.proofs[_fileTyple].status = 3
          that.checkSubmitStatus()
        })
      },
      checkUploadFile(fileTyple){
        //this.subFlag = false//cobain
        let inputDom = document.querySelector(`#${fileTyple}`)
        if(!inputDom.value){
          return
        }
        this.proofs[fileTyple].status = 0
        this.proofs[fileTyple].imgUrl = `/images/${inputDom.value.split("\\")[2]}`
        //this.proofs[fileTyple].uploadType = labelMapping.bankStatement
       
        let formDom = inputDom.parentElement
        let formdata = new FormData(formDom)
        if ('visa' == fileTyple || 'certified' == fileTyple) {
          this.specialRequest(formdata,fileTyple)
        }else{
          let that = this
          this.$axios.post(this.requestURL, formdata).then((res)=>{
            if(res.status == 200){
              //var _bodyText = res.bodyText
              let bodyText = res.data
              let checkFlag = false
              for(let index in that.proofs[fileTyple].keyWords){
                if(bodyText.indexOf(that.proofs[fileTyple].keyWords[index]) != -1){
                  checkFlag = true
                }
              }
              if(checkFlag){
                 that.proofs[fileTyple].status = 2
                 that.proofs[fileTyple].result = true
                 that.getCheckList(fileTyple,bodyText)
              }else{
                that.proofs[fileTyple].status = 3
              }
            }else{
                that.proofs[fileTyple].status = 3
            }
            that.checkSubmitStatus()
          }, (err)=>{
             this.proofs[fileTyple].status = 3
          })
        }


      },
      encodeReg(source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
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
      getCheckList(fileType,text){
        debugger
        let that = this
        this.proofs[fileType].showWords.map(function(item){
          debugger
          item.value = that.getInnerString(text,item.start,item.end)
        })
      },
      submitClick(){
        this.$confirm('Do you want to submit?', 'Notice', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }).then(()=>{
let date = new Date()
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;

        let obj = {}
        let key = date.getTime().toString()

        let time = y + '-' + m + '-' + d+' '+h+':'+minute
        obj.status = 'Pending'
        obj.requestDate = time
        obj.transactionNo = key
        obj.proofs = this.proofs 
        obj.showChoice = {}
        if(this.receiver){
           obj.showChoice.receiver = {lable:"Receiver : ",value:this.receiver}
        }
        if(this.transaction){
          obj.showChoice.transaction = {lable:"Transaction Type : ",value:this.transaction}
        }
        if(this.nationality){
          obj.showChoice.nationality = {lable:"Customer Type : ",value:this.nationality}
        }
        if(this.bussiness && this.paymentType){
          obj.showChoice.bussiness = {lable:"Payment Purpose : ",value:`${this.bussiness}--${this.paymentType}`}
        }else if(this.bussiness){
          obj.showChoice.bussiness = {lable:"Payment Purpose : ",value:this.bussiness}
        }
        // if(this.paymentType){
        //   obj.showChoice.paymentType = {lable:"Payment Purpose : ",value:this.paymentType}
        // }
        let payment = localStorage.getItem('payment')
          if(payment){
            payment = JSON.parse(payment)
          }else{
            payment={}
          }
          payment[key] = obj
          localStorage.setItem('payment',JSON.stringify(payment))
          const c = this.$createElement;
          this.$message({
            message: c('p', null, [
              c('i', 'Submit successfully!')
            ])
          });
          this.$router.push('CreatPayment')




          
        })
        
        
      }
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
    justify-content: left;
    padding-left:20px;
    margin-bottom: 20px;
}
.transaction-wrap{
  margin-top: 100px;

}
.upload-file{
    text-align: left;
    padding: 0 20px;
}
#fileInput{
  display: none;
}
.submitStyle{
  position: relative;
  bottom:-60px;
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
.select-wrap{
  margin-right: 20px;
}
.input-wrap{
  float: right;
}
.marin-left-10{
  margin-left: 10px;
}
.upload-btn{
  margin-bottom: 20px;
}
.upload-btn-wrap{
  display: inline-block;
}
.not-show{
  display: none;
}
</style>
