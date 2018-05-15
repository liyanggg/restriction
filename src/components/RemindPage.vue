<template>
  <div>
    <div v-if="popupVisible" class="pop-box">
      <div id="popUp">
        <div style="height: 32px"><img id="img" src="../assets/off.svg" alt=""
          @click="cancleRemind" style="margin: 5px"></div>
        <div style="padding: 10px">
          <div style="width: 60%;float: left">
            <input placeholder="请输入图形验证码" v-model="imgCode" style="height: 30px;width: 100%"/>
          </div>
          <div style="width: 40%;float: left;overflow: hidden">
            <img id="imgUrl" :src="imgUrl" @click="getImg" alt="" style="width: 100%;height: 30px;margin: 1px 0px 0px 4px;">
          </div>
          <div style="width: 60%;float: left"><input placeholder="请输入手机号码" v-model="iphone" style="height: 30px;width: 100%"/></div>
          <div style="width: 40%;float: left;line-height: 30px;color: white"><span v-if="message" @click="getMessage" style="font-size: 10px">获取短信验证码</span><span
            v-if="!message" style="font-size: 10px">已发送</span></div>
          <input v-model="smsCode" placeholder="请输入短信验证码" style="width: 100%;height: 30px;margin-top: 1px;border: none;"/>
          <mt-button type="primary" size="large" style="margin: 10px auto;height: 40px" @click="bindingPhone">立即绑定
          </mt-button>
        </div>
      </div>

    </div>
    <div style="width: 95%;margin: 0 auto">
      <div>
      <!-- <router-link to="/VipPage" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      </div>
      <div>
        <div style="margin: 5% auto 0 auto;height: 20px;text-align: left;background-color: white;padding: 2px 10px">
          <span style="color: #A8A8A8;font-size: 12px">请设置提醒时间和提醒方式</span>
          <img src="../assets/date.png" alt="" style="float: right">
        </div>
        <div style="background-color: white;overflow: hidden;margin-top:10px">
          <div style="width: 55%;height: 108px;float: left">
            <mt-picker :slots="slots" :visibleItemCount="3" :itemHeight="36" @change="onValuesChange"></mt-picker>
          </div>
          <div>
            <mt-checklist v-model="checkValueArr" :options="options" @change="onCheckListChange"></mt-checklist>
          </div>
        </div>
        <mt-button  type="primary" size="large" style="margin: 10px auto;height: 40px" @click="Add">确&nbsp;&nbsp;定</mt-button>        
        <div v-if="disabled" class="show-phone" style="display: flex;margin: 15px 0;">
          <div>当前已绑定手机：<span style="color: #26A2FF">{{phone}}</span></div>
          <router-link to="/ChangePhone" slot="left">
              <button>更 换</button>
          </router-link>
        </div>
        <div class="remind-btn" style="display:none">
          <mt-button type="primary" size="large" style="margin: 0 auto"
          @click="popupVisible = true">
            {{phoneState}}
          </mt-button>       
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MtCellSwipe from "../../node_modules/mint-ui/packages/cell-swipe/src/cell-swipe";
  import MtCell from "../../node_modules/mint-ui/packages/cell/src/cell";
  import MtButton from "../../node_modules/mint-ui/packages/button/src/button";
  import MtPopup from "../../node_modules/mint-ui/packages/popup/src/popup";
  import {Toast} from 'mint-ui';
  import MtChecklist from "../../node_modules/mint-ui/packages/checklist/src/checklist";
  export default {
    components: {
      MtChecklist,
      MtPopup,
      MtButton,
      MtCell,
      MtCellSwipe
    },
    data () {
      return {
        slots: [
          {
            flex: 1,
            values: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            className: 'slot1',
            textAlign: 'right',
            defaultIndex: 0
          }, {
            divider: true,
            content: ':',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['00', '15', '30', '45'],
            className: 'slot3',
            textAlign: 'left',
            defaultIndex: 0
          }
        ],
        options: [{
          label: '微信',
          value: '1',
          disabled: false
        }, {
          label: '短信',
          value: '2',
          disabled: false
        }],
        popupVisible: false,
        message: true,
        phone: '',
        remindType: '1',
        checkValueArr: ['1'],
        imgUrl: this.DEFINES.url + '/user/imageCode/'+this.common_getCookie('openId')+'?t=' + Math.random(),
        iphone: '', // 用于绑定时发送验证码的手机号码
        imgCode: '',
        smsCode: '',
        phoneState: '绑定手机',
        disabled: false,
        remindTime:[]
      }
    },
    methods: {
      bindingPhone(){
        //绑定手机处理函数
        if (this.iphone !== '' && this.smsCode !== '') {
          //绑定电话号码
          this.$post(`/user/bindPhone`, {
            openId: this.common_getCookie('openId'),
            option: 0,
            phone: this.iphone,
            smsCode: this.smsCode
          }).then(res => {
            console.log(res);
            if (res.data.success === true) {
              this.popupVisible = false;
              this.phoneState = '已绑定';
              this.disabled = true;
              this.iphone = '';
              this.imgCode = '';
              this.smsCode = '';
              this.getUser();
            }else {
              Toast({
                message: res.data.message,
                position: 'top',
                duration: 3000
              });
            }
          })
        } else {
          Toast({
            message: '信息输入不完整',
            position: 'top',
            duration: 3000
          });
        }
      },
      cancleRemind(){
        let index = this.checkValueArr.indexOf('2');
        this.checkValueArr.splice(index, 1); //取消绑定时，取消短信提醒的勾选状态
        this.popupVisible = false;
        this.message = true;
      },
      onValuesChange(picker, values){
        this.remindTime = values;
      },
      onCheckListChange(curVal){
        if(curVal.length === 2){
          if (!this.phone || this.phone === '') {
            this.popupVisible = true;
            return;
          }
          this.remindType = '3';
        } else if (curVal.length === 0) {
          this.remindType = '0';
        } else if (curVal[0] === '2') {
          if (!this.phone || this.phone === '') {
            this.popupVisible = true;
            return;
          }
          this.remindType = '2';
        } else {
          this.remindType = curVal[0];          
        }
        console.log('onCheckListChange remindType:', this.remindType);
      },
      getMessage(){
        if (this.iphone !== '') {
          let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(this.iphone)) {
            //号码错误
            Toast({
              message: '请输入正确的手机号码',
              position: 'top',
              duration: 3000
            });
          } else {
            //号码正确
            if (this.imgCode !== '') {
              //获取短信验证码的处理函数
              this.$get(`/sms/smsCode/${this.iphone}/${this.imgCode}/${this.common_getCookie('openId')}`).then(res => {
                console.log(res);
                if (res.data.success === true) {
                  this.message = false;
                }else {
                  Toast({
                    message: res.data.message,
                    position: 'top',
                    duration: 3000
                  });
                }
              })
            } else {
              Toast({
                message: '请输入图片验证码',
                position: 'top',
                duration: 3000
              });
            }
          }
        } else {
          Toast({
            message: '请输入手机号码',
            position: 'top',
            duration: 3000
          });
        }
      },
      Add(){
        console.log(this.remindType);
        if(this.remindType === 2 || this.remindType === 3){
          if (!this.phone || this.phone === '') {
            Toast({
              message: '请先绑定手机',
              position: 'top',
              duration: 3000
            });
          }
        } else {
            this.$post(`/user/remindSetting`,{
              openId:this.common_getCookie('openId'),
              remindTime:this.remindTime[0]+','+this.remindTime[1],
              remindType:this.remindType
            }).then(res=>{
              if (res.data.success){
                if (this.remindType === '0') {
                  Toast({
                    message: '已取消微信及短信提醒',
                    position: 'top',
                    duration: 3000
                  });
                }else{
                  Toast({
                    message: '更改成功',
                    position: 'top',
                    duration: 3000
                  });                    
                }
              }
            })
        }
      },
      getUser(){
        //获取用户设置
        this.$get(`/user/bindPhone/${this.common_getCookie('openId')}`).then(res => {
          this.phone = res.data.data.phone;
          this.remindType = res.data.data.remindType;
          if(this.remindType === '0'){
            this.checkValueArr = [];
          } else if(this.remindType === '1'){
            this.checkValueArr = ['1'];
          } else if(this.remindType === '2'){
            this.checkValueArr = ['2'];
          } else {
            this.checkValueArr = ['1', '2'];
          }
          this.slots[0].defaultIndex = parseInt(res.data.data.remindTime[0]);
          if (this.phone && this.phone !== '') {
            this.disabled = true;
            this.phoneState = '已绑定';
          } else {
            this.disabled = false;
            this.phoneState = '绑定手机';
          }
          if (res.data.data.remindTime[1] === '0') {
            this.slots[2].defaultIndex = 0;
          } else if (res.data.data.remindTime[1] === '15') {
            this.slots[2].defaultIndex = 1;
          } else if (res.data.data.remindTime[1] === '30') {
            this.slots[2].defaultIndex = 2;
          } else if (res.data.data.remindTime[1] === '45') {
            this.slots[2].defaultIndex = 3;
          }
        })
      },
      getImg(){
        //切换验证图片
        let img = document.getElementById("imgUrl");
        img.src = this.DEFINES.url + '/user/imageCode/'+this.common_getCookie('openId')+'?t=' + Math.random();
      }
    },
    mounted () {
      this.getUser();
    },
    watch: {}
  }
</script>
<style>
  .show-phone div{
    flex: 1;
    text-align: left;
    background-color: white;
    padding: 5px 10px;
    border-radius: 3px;
  }
  .show-phone button{
    margin-left: 5px;
    padding: 5px 10px;
    color: white;
    border-radius: 3px;
    border: solid 1px #26a2ff;
    background: #26a2ff;
  }
  .pop-box{
    width:100vw;
    height: 100vh;
    position: absolute;
    top:0;
    z-index: 111;
    background-color: rgba(125, 125, 125, 0.40);
  }
  .mint-cell {
    background-color: white;
    width: 30%;
    float: left;
  }
  .mint-checkbox-core{
    border-radius: 20%;
    width: 18px;
    height: 18px;
  }
  .mint-checkbox-label{
    font-size: 18px;
  }

  .mint-cell-wrapper {
    background-image: none;
    padding: 0;
    margin: 0;
    color: #26A2FF;
  }

  .mint-cell:last-child {
    background-image: none;
  }

  .picker-slot {
    font-size: 20px;
  }
  .picker-selected {
    font-size: 36px;
  }
  #popUp {
    width: 80%;
    height: 230px;
    position: absolute;
    top: 30%;
    left: 10%;
    background-color: rgba(125, 125, 125, 0.95);
    border-radius: 5px;
    z-index: 1;
  }

  #img {
    float: right;
  }
</style>

