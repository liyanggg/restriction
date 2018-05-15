<template>
  <div>
    <div id="div" v-if="Vip">
    <div class="show-img">
      <img>
    </div>
      <div class="box-div">
        <div class="div" id="div1" @click="AddCar">
          <p class="lable">车辆添加</p> 
        </div>
        <!-- <hr /> -->
        <div class="div" id="div2" @click="AddSet">
          <p class="lable">提醒设置</p>
        </div>
        <!-- <hr /> -->
        <div class="div" id="div3" @click="ChangePhone">
          <p class="lable">更换手机号码</p>
        </div>
        <!-- <div class="div" id="div4" @click="Recharge">
          <p class="lable">续费服务</p>
        </div> -->
      </div>
    </div>
    <!-- <div id="divVip" v-if="!Vip">
      <mt-button type="primary" size="large" style="position: absolute;bottom: 0" @click="AddVip">立即充值</mt-button>
    </div> -->
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        Vip:true
      }
    },
    methods: {
      AddCar(){
        //车辆添加
        this.$router.push('/CarSet')
      },
      AddSet(){
        //车辆设置
        this.$router.push('/RemindPage')
      },
      ChangePhone(){
        //更换手机号
        this.$router.push('/ChangePhone')
      },
      AddVip(){
          //成为会员
        MessageBox.confirm('立即充值成为会员？').then(action => {
          this.$post(`/wx/makeOrder/0`,{
            openId:this.common_getCookie('openId')
          }).then(res=>{
            console.log(res);
            if (res.data.success===true){
              this.onBridgeReady(res.data.data);
            }
          })
        });
      },
      Recharge(){
          //续费
        MessageBox.confirm('确定续费一年？').then(action => {
          this.$post(`/wx/makeOrder/0`,{
            openId:this.common_getCookie('openId')
          }).then(res=>{
            console.log(res);
            if (res.data.success===true){
              this.onBridgeReady(res.data.data);
            }
          })
        });
      },
      onBridgeReady(param){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": param.appId,     //公众号名称，由商户传入
            "timeStamp": param.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": param.nonceStr, //随机串
            "package": param.package,
            "signType": param.signType, //微信签名方式：
            "paySign": param.paySign //微信签名
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              alert("支付成功");
              location.reload();
            }else {
              alert("支付失败");
            }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      },
      getUser(){
        if(this.common_getCookie('vip')=='true'){
          this.Vip = true;
        }else {
          this.Vip = false;
        }
      }
    },
    mounted () {
      this.commom_getImg('/hyfw.png');
      // this.getUser();
    },
    watch: {}
  }
</script>
<style scoped>
  /* #divVip{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background-image: url("../assets/vip.jpg");
    background-size: 100% 100%;
  } */
  .box-div{
    height: 100%;
    transform: translateY(35%);
  }
  .box-div hr{
    height: .6px;
    border: none;
  }
  .box-div div{
    position: relative;
    margin: 0.6px 0;
    background: mintcream;
  }
  .box-div .lable{
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 75px;
  }
  #div1::before{
    content: url("../assets/cl.jpg");
    position: absolute;
    left: 0;
    top: -10px;
    -webkit-transform: scale(.7);
    transform: scale(.65);
  }
  #div2::before{
    content: url("../assets/zdy.jpg");
    position: absolute;
    left: 0;
    top: -12px;
    -webkit-transform: scale(.7);
    transform: scale(.65);
  }
  #div3::before{
    content: url("../assets/changePhone.png");
    position: absolute;
    left: 0;
    top: -14px;
    transform: scale(.6);
  }
  .div::after{
    content: url("../assets/right.png");
    position: absolute;
    right: 0;
    top: -10px;
    transform: scale(.55);
  }

</style>

