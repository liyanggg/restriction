<template>
<div id="div" style="height:100vh;background-color:#fff5e9">
  <div class="show-img"></div>  
  <table style="margin: 25px 0;">
    <caption>今日<span style="color: red;">({{form.date}})</span><span>限行情况</span></caption>
    <tr>
      <td>限行车牌</td>
      <td><span class="span1">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td>
      <td>{{form.carNumber}}</td>
    </tr>
    <tr>
      <td>限行尾号</td>
      <td><span class="span1">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td>
      <td>{{form.limitNumber}}</td>
    </tr>
    <tr>
      <td>限行时间</td>
      <td><span class="span1">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td>
      <td>{{form.limitTime}}</td>
    </tr>
    <tr>
      <td>限行范围</td>
      <td><span class="span1">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td>
      <td>{{form.limitArea}}</td>
    </tr>
    <tr>
      <td>明日限行</td>
      <td><span class="span1">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td>
      <td>{{form.tln}}</td>
    </tr>
  </table>
</div>
</template>
<script>
  import MtHeader from "../../node_modules/mint-ui/packages/header/src/header";
    export default {
      components: {MtHeader},
      data () {
            return {
              form:{
                carNumber:'',
                date:'',
                limitArea:'',
                limitNumber:'',
                limitTime:''
              }
            }
        },
        methods: {
          inquire(){
            this.$get(`/user/limitInfo/${this.common_getCookie('openId')}`).then(res=>{
              console.log(res);
              this.form.tln = res.data.data.tln;
              this.form.carNumber = res.data.data.carNumber;
              this.form.date = res.data.data.date;
              this.form.limitArea = res.data.data.limitArea;
              this.form.limitNumber = res.data.data.limitNumber;
              this.form.limitTime = res.data.data.limitTime;
            })
          }
        },
        mounted () {
          this.inquire();
        },
        watch: {}
    }
</script>
<style scoped>
  table caption{
    text-align: left;
    padding-left: 15px;
    font-weight: bold;
    font-size: 18px;
    color: rgb(41, 140, 254);
    height: 30px;
  }
  table tr{
    height: 40px;
  }
  table tr td:first-child{
    width: 65px;
    padding-left: 15px;
    color: #66B1FD;
  }
  table tr td:last-child{
    color:  black;
  }
  table tr td{
    border-bottom: white 1px solid;
    text-align: left;  
  }
  .show-img {
    width: 100%;
    height: 28vh;
    background: url("../assets/inqBg.png") no-repeat;
    background-size: 100% 100%;
  }
</style>

