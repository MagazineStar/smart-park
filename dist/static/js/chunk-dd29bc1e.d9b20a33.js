(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd29bc1e"],{"353f":function(e,r,t){"use strict";t("a537")},a537:function(e,r,t){},d9c9:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login_body"},[t("div",{staticClass:"bg"}),t("div",{staticClass:"box"},[t("div",{staticClass:"title"},[e._v("智慧园区-登录")]),t("el-form",{ref:"form",attrs:{model:e.loginForm,rules:e.rules}},[t("el-form-item",{attrs:{label:"账号",prop:"username"}},[t("el-input",{model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{"show-password":""},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}})],1),t("el-form-item",{attrs:{prop:"remember"}},[t("el-checkbox",{model:{value:e.rememberMe,callback:function(r){e.rememberMe=r},expression:"rememberMe"}},[e._v("记住我")])],1),t("el-form-item",[t("el-button",{staticClass:"login_btn",attrs:{type:"primary"},on:{click:function(r){return e.handleLogin()}}},[e._v("登录")])],1)],1)],1)])},o=[],a=t("c7eb"),n=t("1da1"),i=(t("e9c4"),t("14d9"),t("0fd7")),l={name:"Login",data:function(){return{loginForm:{username:"",password:""},rememberMe:!1,rules:{username:[{required:!0,message:"用户名不能为空",tiggers:"bulr"}],password:[{required:!0,message:"密码不能为空",tiggers:"blur"}]}}},created:function(){var e=localStorage.getItem(i["a"]);e&&(this.loginForm.username=JSON.parse(e).username,this.loginForm.password=JSON.parse(e).password,this.rememberMe=!0)},methods:{handleLogin:function(){var e=this;this.$refs.form.validate(function(){var r=Object(n["a"])(Object(a["a"])().mark((function r(t){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,e.$store.dispatch("user/loginAction",e.loginForm);case 4:e.rememberMe?localStorage.setItem(i["a"],JSON.stringify(e.loginForm)):(localStorage.removeItem(i["a"]),e.rememberMe=!1),e.$route.query.redirect?e.$router.push(e.$route.query.redirect):e.$router.push("/");case 6:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}}},u=l,m=(t("353f"),t("2877")),c=Object(m["a"])(u,s,o,!1,null,"29eaadf6",null);r["default"]=c.exports}}]);