(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f950806"],{"0481":function(e,t,r){"use strict";var a=r("23e7"),s=r("a2bf"),i=r("7b0b"),n=r("07fa"),o=r("5926"),c=r("65f0");a({target:"Array",proto:!0},{flat:function(){var e=arguments.length?arguments[0]:void 0,t=i(this),r=n(t),a=c(t,0);return a.length=s(a,t,t,r,0,void 0===e?1:o(e)),a}})},4069:function(e,t,r){var a=r("44d2");a("flat")},"412f":function(e,t,r){"use strict";r("836d")},"836d":function(e,t,r){},8593:function(e,t,r){"use strict";r.d(t,"g",(function(){return s})),r.d(t,"i",(function(){return i})),r.d(t,"f",(function(){return n})),r.d(t,"h",(function(){return o})),r.d(t,"b",(function(){return c})),r.d(t,"j",(function(){return l})),r.d(t,"d",(function(){return u})),r.d(t,"e",(function(){return d})),r.d(t,"a",(function(){return f})),r.d(t,"c",(function(){return m}));var a=r("b775");function s(){return Object(a["a"])({url:"/park/sys/role",method:"GET"})}function i(){return Object(a["a"])({url:"/park/sys/permision/all/tree",method:"GET"})}function n(e){return Object(a["a"])({url:"/park/sys/role/".concat(e),method:"GET"})}function o(e,t){return Object(a["a"])({url:"/park/sys/roleUser/".concat(e),method:"GET",params:t})}function c(e){return Object(a["a"])({url:"/park/sys/role",method:"POST",data:e})}function l(e){return Object(a["a"])({url:"/park/sys/role",method:"PUT",data:e})}function u(e){return Object(a["a"])({url:"/park/sys/role/".concat(e),method:"DELETE"})}function d(e){return Object(a["a"])({url:"/park/sys/user",params:e})}function f(e){return Object(a["a"])({url:"/park/sys/user",method:"POST",data:e})}function m(e){return Object(a["a"])({url:"/park/sys/user/".concat(e),method:"DELETE"})}},a2bf:function(e,t,r){"use strict";var a=r("e8b5"),s=r("07fa"),i=r("3511"),n=r("0366"),o=function(e,t,r,c,l,u,d,f){var m,v,p=l,h=0,b=!!d&&n(d,f);while(h<c)h in r&&(m=b?b(r[h],h,t):r[h],u>0&&a(m)?(v=s(m),p=o(e,t,m,v,p,u-1)-1):(i(p+1),e[p]=m),p++),h++;return p};e.exports=o},b031:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"add-role"},[r("header",{staticClass:"add-header"},[r("div",{staticClass:"left"},[r("span",{staticClass:"arrow",on:{click:function(t){return e.$router.back()}}},[r("i",{staticClass:"el-icon-arrow-left"}),e._v("返回")]),r("span",[e._v("|")]),r("span",[e._v(e._s(e.id?"编辑角色":"添加角色"))])]),r("div",{staticClass:"right"},[e._v(" 黑马程序员 ")])]),r("main",{staticClass:"add-main"},[r("div",{staticClass:"step-container"},[r("el-steps",{attrs:{direction:"vertical",active:e.activeStep}},[r("el-step",{attrs:{title:"角色信息"}}),r("el-step",{attrs:{title:"权限信息"}}),r("el-step",{attrs:{title:"检查并完成"}})],1)],1),r("div",{directives:[{name:"show",rawName:"v-show",value:1===e.activeStep,expression:"activeStep === 1"}],staticClass:"form-container"},[r("div",{staticClass:"title"},[e._v("角色信息")]),r("div",{staticClass:"form"},[r("el-form",{ref:"roleForm",staticClass:"form-box",attrs:{model:e.roleForm,rules:e.roleRules}},[r("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[r("el-input",{model:{value:e.roleForm.roleName,callback:function(t){e.$set(e.roleForm,"roleName",t)},expression:"roleForm.roleName"}})],1),r("el-form-item",{attrs:{label:"角色描述",prop:"remark"}},[r("el-input",{model:{value:e.roleForm.remark,callback:function(t){e.$set(e.roleForm,"remark",t)},expression:"roleForm.remark"}})],1)],1)],1)]),r("div",{directives:[{name:"show",rawName:"v-show",value:2===e.activeStep,expression:"activeStep === 2"}],staticClass:"form-container"},[r("div",{staticClass:"title"},[e._v("权限配置")]),r("div",{staticClass:"tree-wrapper"},e._l(e.treeList,(function(t){return r("div",{key:t.id,staticClass:"tree-item"},[r("div",{staticClass:"tree-title"},[e._v(e._s(t.title))]),r("el-tree",{ref:"tree",refInFor:!0,attrs:{data:t.children,"show-checkbox":"","default-expand-all":"","node-key":"id","check-strictly":"",props:e.defaultProps}})],1)})),0)]),r("div",{directives:[{name:"show",rawName:"v-show",value:3===e.activeStep,expression:"activeStep === 3"}],staticClass:"form-container"},[r("div",{staticClass:"title"},[e._v("检查并完成")]),r("div",{staticClass:"form"},[r("div",{staticClass:"info"},[r("div",{staticClass:"form-item"},[e._v("角色名称："+e._s(e.roleForm.roleName))]),r("div",{staticClass:"form-item"},[e._v("角色描述："+e._s(e.roleForm.remark))]),r("div",{staticClass:"form-item"},[e._v("角色权限：")]),r("div",{staticClass:"tree-wrapper"},e._l(e.treeList,(function(t){return r("div",{key:t.id,staticClass:"tree-item"},[r("div",{staticClass:"tree-title"},[e._v(e._s(t.title))]),r("el-tree",{ref:"disabledTree",refInFor:!0,attrs:{data:t.children,"show-checkbox":"","check-strictly":"","default-expand-all":"","node-key":"id","highlight-current":!1,props:{label:"title",disabled:function(){return!0}}}})],1)})),0)])])])]),r("footer",{staticClass:"add-footer"},[r("div",{staticClass:"btn-container"},[r("el-button",{directives:[{name:"show",rawName:"v-show",value:1!==e.activeStep,expression:"activeStep !== 1"}],on:{click:e.prev}},[e._v("上一步")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:3!==e.activeStep,expression:"activeStep !== 3"}],attrs:{type:"primary"},on:{click:e.next}},[e._v("下一步")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:3===e.activeStep,expression:"activeStep === 3"}],attrs:{type:"primary"},on:{click:e.confirmAdd}},[e._v(e._s(e.id?"确认编辑":"确认添加"))])],1)])])},s=[],i=r("c7eb"),n=r("1da1"),o=(r("d3b7"),r("159b"),r("14d9"),r("0481"),r("4069"),r("8593")),c={data:function(){return{activeStep:1,roleForm:{roleName:"",remark:"",perms:[]},roleRules:{roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"}],remark:[{required:!0,message:"请输入描述名称",trigger:"blur"}]},treeList:[],defaultProps:{label:"title"}}},computed:{id:function(){return this.$route.query.id}},created:function(){this.getTreeList(),this.id&&this.getRoleDetail()},methods:{getRoleDetail:function(){var e=this;return Object(n["a"])(Object(i["a"])().mark((function t(){var r,a;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["f"])(e.id);case 2:r=t.sent,e.roleForm=r.data,a=e.$refs.tree,a.forEach((function(t,r){t.setCheckedKeys(e.roleForm.perms[r])}));case 6:case"end":return t.stop()}}),t)})))()},confirmAdd:function(){var e=this;return Object(n["a"])(Object(i["a"])().mark((function t(){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=7;break}return delete e.roleForm.userTotal,t.next=4,Object(o["j"])(e.roleForm);case 4:e.$message.success("编辑角色成功"),t.next=10;break;case 7:return t.next=9,Object(o["b"])(e.roleForm);case 9:e.$message.success("添加角色成功");case 10:e.$router.back();case 11:case"end":return t.stop()}}),t)})))()},getTreeList:function(){var e=this;return Object(n["a"])(Object(i["a"])().mark((function t(){var r;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["i"])();case 2:r=t.sent,e.treeList=r.data;case 4:case"end":return t.stop()}}),t)})))()},prev:function(){this.activeStep--},next:function(){var e=this;if(1===this.activeStep)this.$refs.roleForm.validate((function(t){t&&e.activeStep++}));else if(2===this.activeStep){var t=this.$refs.tree;if(this.roleForm.perms=[],t.forEach((function(t){e.roleForm.perms.push(t.getCheckedKeys())})),this.roleForm.perms.flat().length<=0)return void this.$message.warning("还未勾选权限信息");var r=this.$refs.disabledTree;r.forEach((function(t,r){t.setCheckedKeys(e.roleForm.perms[r])})),this.activeStep++}}}},l=c,u=(r("412f"),r("2877")),d=Object(u["a"])(l,a,s,!1,null,"280a02cb",null);t["default"]=d.exports}}]);