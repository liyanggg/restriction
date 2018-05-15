"use strict";

webpackJsonp([4], { "9p8h": function p8h(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = n("Au9i");e.default = { data: function data() {
        return { Vip: !0 };
      }, methods: { AddCar: function AddCar() {
          this.$router.push("/CarSet");
        }, AddSet: function AddSet() {
          this.$router.push("/RemindPage");
        }, ChangePhone: function ChangePhone() {
          this.$router.push("/ChangePhone");
        }, AddVip: function AddVip() {
          var t = this;i.MessageBox.confirm("立即充值成为会员？").then(function (e) {
            t.$post("/wx/makeOrder/0", { openId: t.common_getCookie("openId") }).then(function (e) {
              console.log(e), !0 === e.data.success && t.onBridgeReady(e.data.data);
            });
          });
        }, Recharge: function Recharge() {
          var t = this;i.MessageBox.confirm("确定续费一年？").then(function (e) {
            t.$post("/wx/makeOrder/0", { openId: t.common_getCookie("openId") }).then(function (e) {
              console.log(e), !0 === e.data.success && t.onBridgeReady(e.data.data);
            });
          });
        }, onBridgeReady: function onBridgeReady(t) {
          WeixinJSBridge.invoke("getBrandWCPayRequest", { appId: t.appId, timeStamp: t.timeStamp, nonceStr: t.nonceStr, package: t.package, signType: t.signType, paySign: t.paySign }, function (t) {
            "get_brand_wcpay_request:ok" == t.err_msg ? (alert("支付成功"), location.reload()) : alert("支付失败");
          });
        }, getUser: function getUser() {
          "true" == this.common_getCookie("vip") ? this.Vip = !0 : this.Vip = !1;
        } }, mounted: function mounted() {
        this.commom_getImg("/hyfw.png");
      }, watch: {} };
  }, CmKE: function CmKE(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = n("9p8h"),
        a = n.n(i);for (var o in i) {
      "default" !== o && function (t) {
        n.d(e, t, function () {
          return i[t];
        });
      }(o);
    }var s = n("f/Nk"),
        c = n("VU/8")(a.a, s.a, !1, function (t) {
      n("qqab");
    }, "data-v-38dc1354", null);e.default = c.exports;
  }, "f/Nk": function fNk(t, e, n) {
    "use strict";
    e.a = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", [t.Vip ? n("div", { attrs: { id: "div" } }, [t._m(0), t._v(" "), n("div", { staticClass: "box-div" }, [n("div", { staticClass: "div", attrs: { id: "div1" }, on: { click: t.AddCar } }, [n("p", { staticClass: "lable" }, [t._v("车辆添加")])]), t._v(" "), n("div", { staticClass: "div", attrs: { id: "div2" }, on: { click: t.AddSet } }, [n("p", { staticClass: "lable" }, [t._v("提醒设置")])]), t._v(" "), n("div", { staticClass: "div", attrs: { id: "div3" }, on: { click: t.ChangePhone } }, [n("p", { staticClass: "lable" }, [t._v("更换手机号码")])])])]) : t._e()]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "show-img" }, [e("img")]);
      }] };
  }, qqab: function qqab(t, e) {} });