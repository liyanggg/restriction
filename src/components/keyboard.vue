<template>
  <div id="container" style="height:100%;">
    <div id="carLicenseBox">
      <div class="carLicenseMain">
        <ul id="ulNode">
          <li>川</li>
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
          <!-- <div> -->
            <img class="del-num-icon" src="../assets/delete.png" @click="pRemoveNum(pUsers[0])" slot="icon">
          <!-- </div>       -->
        
      </div>
      <button class="submitBtn" id="submitBtn" @click="Add">确定</button>
    </div>
    <div id="keyboardBox">
      <div class="provienceBox" id="provienceBox" style="display: none;">
        <ul>
          <li>京</li>
          <li>津</li>
          <li>渝</li>
          <li>沪</li>
          <li>冀</li>
          <li>晋</li>
          <li>辽</li>
          <li>吉</li>
          <li>黑</li>
          <li>苏</li>
        </ul>
        <ul>
          <li>浙</li>
          <li>皖</li>
          <li>闽</li>
          <li>赣</li>
          <li>鲁</li>
          <li>豫</li>
          <li>鄂</li>
          <li>湘</li>
          <li>粤</li>
          <li>琼</li>
        </ul>
        <ul>
          <li>川</li>
          <li>贵</li>
          <li>云</li>
          <li>陕</li>
          <li>甘</li>
          <li>青</li>
          <li>蒙</li>
          <li>桂</li>
          <li>宁</li>
          <li>新</li>
        </ul>
        <ul>
          <li class="changeContentBtn other">ABC</li>
          <li>藏</li>
          <li>使</li>
          <li>领</li>
          <li>警</li>
          <li>学</li>
          <li>港</li>
          <li>澳</li>
          <li class="deleteBtn other"><img src="../assets/backDeleteImg.jpg"/></li>
        </ul>
      </div>
      <div class="textBox" id="textBox">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>0</li>
        </ul>
        <ul>
          <li>Q</li>
          <li>W</li>
          <li>E</li>
          <li>R</li>
          <li>T</li>
          <li>Y</li>
          <li>U</li>
          <li>I</li>
          <li>O</li>
          <li>P</li>
        </ul>
        <ul>
          <li>A</li>
          <li>S</li>
          <li>D</li>
          <li>F</li>
          <li>G</li>
          <li>H</li>
          <li>J</li>
          <li>K</li>
          <li>L</li>
        </ul>
        <ul>
          <li class="changeContentBtn other">返回</li>
          <li>Z</li>
          <li>X</li>
          <li>C</li>
          <li>V</li>
          <li>B</li>
          <li>N</li>
          <li>M</li>
          <li class="deleteBtn other"><img src="../assets/backDeleteImg.jpg"/></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  import { Toast } from 'mint-ui';
  export default {
    name: 'self-keyboard',
    props: ['pAddNum', 'pRemoveNum', 'pUsers'],
    data () {
      return {
        CarNum: '',
        pass:true
      }
    },
    methods: {
      Add(){
        this.CarNum = '';
        let ulNode = document.getElementById("ulNode");
        //ulNode所有的子结点
        let childrens = ulNode.childNodes;
        let len = childrens.length;
        //循环遍历所有孩子结点，输出用户填入的carNumber
        for (let i = 0; i < len; i++) {
          if (childrens[i].innerHTML !== undefined) {
            this.CarNum += childrens[i].innerHTML;
          }
        }
        let regCar1 = /^([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1})$/; //常规汽车车牌
        if (regCar1.test(this.CarNum)) {
          this.pass = true;
        } else {
          this.pass = false;
        }
        if(!this.pass){
          Toast('请输入正确的车牌');
          return;
        }
        this.$post(`/user/add`,{
          carNumber:this.CarNum,
          openId:this.common_getCookie('openId')
        }).then(res => {
          if(res.data.success){
            $('#ulNode').css('color', 'gray');
            $('#submitBtn').css('color', 'gray').attr('disabled', 'disdabled');
            $('.carLicenseMain ul li.active').removeClass('active');
            $('#keyboardBox').hide();
            this.pAddNum(this.CarNum); //调用父组件方法
            Toast('设置成功');
          } else {
            console.log(res)
            Toast(res.data.message);
          }
        })
      }
    },
    mounted () {
      $(function () {
        var num = 6; 
        //切换键盘
        $('.changeContentBtn').click(function () {
          if ($(this).html() === 'ABC') {
            $('#textBox').show();
            $('#provienceBox').hide();
          } else {
            $('#textBox').hide();
            $('#provienceBox').show();
          }
        });

        //获取当前车牌数字索引
        function getIndex() {
          var index = 0;
          $('.carLicenseMain ul li').each(function () {
            var reg = new RegExp('active');
            if (reg.test($(this).attr('class'))) {
              index = $(this).index();
            }
          });
          return index;
        }

        //自定义键盘处理函数
        function keyboard(num, self) {
          var index = getIndex();
          if (index <= num) {
            if (index === num) {
              $('.carLicenseMain ul li.active').html($(self).html());
            } else {
              $('.carLicenseMain ul li.active').html($(self).html()).removeClass('active').next().addClass('active');
            }
            $('#textBox').show();
            $('#provienceBox').hide();
          }
        }

        //省份键盘点击事件
        $('#provienceBox ul li:not(.other)').click(function () {
          var self = this;
          keyboard(num, self);
        });
        //文本键盘点击事件
        $('#textBox ul li:not(.other)').click(function () {
          var self = this;
          keyboard(num, self);
        });
        //回退按钮点击事件
        $('.deleteBtn').click(function () {
          var index = getIndex();
          if (index === num) {
            if ($('.carLicenseMain ul li.active').html() !== '') {
              $('.carLicenseMain ul li.active').html('');
            } else {
              $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
            }

          } else if (index < num && index > 1) {
            $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
          } else if (index === 1) {
            $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('川');
            $('#textBox').hide();
            $('#provienceBox').show();
          }
        });
      });
    },
    watch: {}
  }
</script>
<style scoped>
  ul li {
    list-style: none;
  }
  .del-num-icon{
    width: 22px;
    height: 22px;
    float: left;
    margin: 8px 3px;
  }
  #container {
    width: 100%;
    height: 50%;
    padding-top: 50px;
    position: relative;
  }

  #carLicenseBox {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
  }

  #carLicenseBox .carLicenseTitle {
    width: 100%;
    height: 40px;
    background-color: #26A2FF;
    text-align: center;
    line-height: 40px;
    color: white;
    font-size: 18px;
  }

  #carLicenseBox .carLicenseMain ul {
    float: left;
    margin: 5px 0;
    overflow:hidden;
  }

  #carLicenseBox .carLicenseMain ul li {
    width: 30px;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    margin: .5px;
    background: white;
  }


  #carLicenseBox .carLicenseMain ul li.active {
    border: 2px solid #26A2FF;
  }

  #carLicenseBox .submitBtn {
    width: 100%;
    height: 35px;
    background-color: #26A2FF;
    border: none;
    border-radius: 6px;
    text-align: center;
    color: white;
    font-size: 20px;
    margin: 0 auto;
  }

  #keyboardBox {
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 999;
  }
  #keyboardBox .provienceBox{
    display: none;
  }
  #keyboardBox .provienceBox, #keyboardBox .textBox {
    width: 100%;
    background-color: #D0D5D9;
    padding-top: 10px;
    padding-bottom: 4px;
  }

  #keyboardBox .provienceBox ul, #keyboardBox .textBox ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }

  #keyboardBox .provienceBox ul:first-of-type, #keyboardBox .textBox ul:first-of-type {
    margin-top: 0px;
  }

  #keyboardBox .provienceBox ul li, #keyboardBox .textBox ul li {
    width: 30px;
    height: 35px;
    border-radius: 6px;
    text-align: center;
    line-height: 35px;
    float: left;
    background-color: #ffffff;
  }

  #keyboardBox .provienceBox ul .changeContentBtn, #keyboardBox .provienceBox ul .deleteBtn, #keyboardBox .textBox ul .changeContentBtn, #keyboardBox .textBox ul .deleteBtn {
    width: 40px;
    height: 40px;
    background-color: #ACB3BB;
    text-align: center;
    line-height: 40px;
  }

  #keyboardBox .provienceBox ul .deleteBtn img, #keyboardBox .textBox ul .deleteBtn img {
    width: 23px;
    height: 16px;
    margin: 0px;
    margin-top: 12px;
  }
</style>

