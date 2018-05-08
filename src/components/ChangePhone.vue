<template>
  <div>
    <!--<router-link to="/VipPage" slot="left">-->
      <!--<mt-button icon="back">返回</mt-button>-->
    <!--</router-link>-->
    <div style="width: 95%;margin: 5% auto 0 auto">
      <div style="text-align: left;background-color: white;padding: 5px 10px;border-radius: 5px">
        当前已绑定手机号码 :&nbsp;&nbsp;<span style="color: #26A2FF">{{phone}}</span>
      </div>
      <div style="margin-top: 10px;overflow: hidden">
        <div style="width: 60%;float: left;overflow: hidden;">
          <input placeholder="请输入图形验证码" v-model="imgCode"
                 style="height: 40px;width: 100%;border: none;border-radius: 5px"/>
        </div>
        <div style="width: 40%;float: left;line-height: 30px;">
          <img id="imgUrl" :src="imgUrl" @click="getImg" alt=""
               style="width: 100%;height: 40px;margin-left:1px;border-radius: 5px">
        </div>
      </div>
      <div style="background-color: white;overflow: hidden;border-radius: 5px">
        <div style="width: 60%;float: left;overflow: hidden;">
          <input type="number" v-model="smsCode" placeholder="请输入短信验证码" style="height: 40px;border: none;width: 100%"/>
        </div>
        <div style="width: 39%;float: left;line-height: 40px;text-align: center;border-left: 1px solid #EEE">
          <span v-if="message" @click="getMessage" style="color: #26A2FF">获取验证码</span>
          <span v-if="!message" style="color: #26A2FF">已发送</span>
        </div>
      </div>
      <div style="margin-top: 10px;border-radius: 5px;overflow: hidden;">
        <input placeholder="请输入新的手机号码" v-model="iphone" style="border: none;height: 40px;width: 100%;border-radius: 5px"/>
      </div>
      <div style="margin-top: 30px">
        <mt-button type="primary" size="large" @click="ChangePhone">确定</mt-button>
      </div>
    </div>
  </div>
</template>
<script>

  import {MessageBox, Toast} from 'mint-ui';
  // import {Toast} from 'mint-ui';
  export default {
    data () {
      return {
        message: true,
        imgUrl: this.DEFINES.url + '/user/imageCode/'+this.common_getCookie('openId')+'?t=' + Math.random(),
        imgCode: '',
        phone: '',
        iphone:'',
        smsCode:''
      }
    },
    methods: {
      ChangePhone(){
          //更改手机号码
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!myreg.test(this.iphone)){
          //号码错误
          Toast({
            message: '请输入正确的手机号码',
            position: 'top',
            duration: 3000
          });
        }else {
          //号码正确
          this.$put(`/user/bindPhone`,{
            openId: this.common_getCookie('openId'),
            phone: this.iphone,
            smsCode: this.smsCode
          }).then(res=>{
              console.log(res);
            if (res.data.success === true) {
              this.iphone = '';
              this.imgCode = '';
              this.smsCode = '';
              this.message = true;
              this.getPhone();
              Toast({
                message: '更改成功',
                position: 'top',
                duration: 3000
              });
            }else {
              Toast({
                message: res.data.message,
                position: 'top',
                duration: 3000
              });
            }
          })
        }
      },
      getImg(){
        //切换验证图片
        let img = document.getElementById("imgUrl");
        img.src = this.DEFINES.url + '/user/imageCode/'+this.common_getCookie('openId')+'?t=' + Math.random();
      },
      getPhone(){
        //获取用户绑定手机号码
        this.$get(`/user/bindPhone/${this.common_getCookie('openId')}`).then(res => {
          console.log(res);
          if(res.data.data.phone === '' || !res.data.data.phone){
            MessageBox.alert('尚未绑定手机<br />请到"提醒设置"绑定').then(action => {
              this.$router.push('/VipPage')
            })
            return;
          }
          this.phone = res.data.data.phone;
        })
      },
      getMessage(){
        if (this.imgCode != '') {
          //获取短信验证码的处理函数
          this.$get(`/sms/smsCodeODB/${this.common_getCookie('openId')}/${this.imgCode}`).then(res => {
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
      },
    },
    mounted () {
      this.getPhone();
    },
    watch: {}
  }
</script>
<style scoped>
  input{
    padding: 0 10px;
  }
</style>

