<template>
  <div id="div" style="min-height: 568px;">
    <!--<div id="id_keyboard_province" style="display:none;">-->
    <!--</div>-->
    <div class="show-img">
      <img>
    </div>
    <div class="set-num-desc">
      <p>示例： 川A75B90</p>
    </div>
    <self-keyboard :pAddNum="addNum" :pRemoveNum="removeDomain" :pUsers="users"></self-keyboard>
  </div>
</template>
<script>
  import MtButton from "../../node_modules/mint-ui/packages/button/src/button";
  import selfKeyboard from "./keyboard";
  import {MessageBox, Toast} from 'mint-ui';
  export default {
    components: {MtButton, selfKeyboard},
    data () {
      return {
        users: [{
          carNumber: '',
          openId: ''
        }],
        MaxNum:0,
        disabled:false,
        pass:true,
      }
    },
    methods: {
      addNum(num) {
        let obj = {
          carNumber: num,
          openId: this.common_getCookie('openId')
        }
        this.users[0] = obj;
      },
      // addDomain() {
      //     //添加更多车辆
      //     if (this.users.length < this.MaxNum) {
      //       this.$router.push('/keyboard');
      //     }else {
      //       MessageBox.confirm('添加更多车牌只需三块七!').then(action => {
      //           this.$post(`/wx/makeOrder/1`,{
      //             openId:this.common_getCookie('openId')
      //           }).then(res=>{
      //               console.log(res);
      //               if (res.data.success===true){
      //                 this.onBridgeReady(res.data.data);
      //               }
      //           })
      //       });
      //     }
      // },
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
              this.inquire();
            }else {
              alert("支付失败");
              this.inquire();
            }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      },
      removeDomain(item) {
        //删除车牌
        if(item.carNumber === ''){
          Toast('您还没有添加车牌');
          return
        }
        MessageBox.confirm('确定删除?').then(action => {
          $('.carLicenseMain ul li.active').removeClass('active');
          $('.carLicenseMain ul li').eq(0).nextAll().html('');
          $('.carLicenseMain ul li').eq(0).html('川');
          $('.carLicenseMain ul li').eq(1).addClass('active');
          $('#ulNode').css('color', 'black');
          $('#submitBtn').css('color', 'black').removeAttr('disabled');
          $('#provienceBox').hide();
          $('#textBox').show();
          $('#keyboardBox').show();
          this.$post(`/user/remove`,{
            carNumber:item.carNumber,
            openId:item.openId
          }).then(res=>{
            console.log(res);
            if(res.data.success){
              this.inquire();
            }else {
              Toast('删除失败');
            }
          })
        });
      },
      submitCar(){
        //提交车辆信息
        let regCar1 = /^([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/; //常规汽车车牌
        let regCar2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{6}$/;//新能源汽车车牌
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].openId = this.common_getCookie('openId');
          if (regCar1.test(this.users[i].carNumber) || regCar2.test(this.users[i].carNumber)) {
            this.pass = true;
          } else {
            this.pass = false;
          }
        }
        if (this.pass) {
          if (this.users.length !== 0) {
            //所有输入信息正确后处理的函数
            this.$post(`/user/change`, {
              users: this.users
            }).then(res => {
              console.log(res, '测试');
              if (res.data.success) {
                Toast('操作成功');
              }
            })
          } else {
            Toast('请添加车牌号码');
          }
        } else {
          Toast('请输入正确的车牌号码');
        }
      },
      showNum(){
        let $childrens = $("#ulNode").children();
        let len = $childrens.length;
        let arr = this.users[0].carNumber.split('');
        $childrens.map((index, item) => {
          $(item).text(arr[index]);
        })
        $('#ulNode').css('color', 'gray');
        $('#submitBtn').css('color', 'gray').attr('disabled', 'disdabled');
        $('.carLicenseMain ul li.active').removeClass('active');
        $('#keyboardBox').hide();
        return ""
      },
      inquire(){
        //获取用户车辆信息和权限
        this.$get(`/user/carNumber/list/${this.common_getCookie('openId')}`).then(res=>{
          this.MaxNum = res.data.data.max;
          if(res.data.data.now === 0){
            this.disabled = false;
            this.users = [{
              carNumber: '',
              openId: ''
            }];
            return;
          }
          this.disabled = true;
          this.users = res.data.data.carNumbers;
          this.showNum();
          
        })
      }
    },
    mounted () {
      this.commom_getImg('/clsz.jpg');
      this.inquire();
    },
    watch: {}
  }
</script>
<style scoped>
  .set-num-desc{
    position: relative;
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    color: #888;
    padding: 0 10px;
    background: white;
  }
</style>

