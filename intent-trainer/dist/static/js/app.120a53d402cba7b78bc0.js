webpackJsonp([1],{0:function(t,e){},"0x+N":function(t,e){},"3z5P":function(t,e,n){"use strict";function o(t){n("97nM")}var r=n("IOPY"),i=n("DPiK"),s=n("VU/8"),a=o,c=s(r.a,i.a,!1,a,"data-v-4c82ae2f",null);e.a=c.exports},"97nM":function(t,e){},DPiK:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",[t._v("\n    Page: "+t._s(this.$store.state.ticketPagination.number)+"\n    "),n("el-button",{on:{click:t.previousPage}},[t._v("Previous page")]),t._v(" "),n("el-button",{on:{click:t.firstPage}},[t._v("First page")]),t._v(" "),n("el-button",{on:{click:t.nextPage}},[t._v("Next page")])],1),t._v(" "),n("table",{staticClass:"table table-hover"},[t._m(0),t._v(" "),n("tbody",t._l(this.$store.state.tickets,function(e){return e?n("tr",[n("td",[n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(n){t.intentCorrectionPage(e)}}},[t._v("Wrong")])]),t._v(" "),n("td",[t._v(t._s(e.merchant_ticket_number))]),t._v(" "),n("td",[t._v(t._s(e.created_at))]),t._v(" "),n("td",[t._v(t._s(e.subject))]),t._v(" "),n("td",[t._v(t._s(e.description))]),t._v(" "),n("td",[t._v(t._s(e.predicted_intent?e.predicted_intent.intent_name:""))]),t._v(" "),n("td",[t._v(t._s(e.corrected_intent?e.corrected_intent.intent_name:""))]),t._v(" "),n("td",[t._v(t._s(e.confidence)+"%")]),t._v(" "),n("td",[n("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(n){t.markAsCorrect(e)}}},[t._v("Correct")])])]):t._e()}))])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th"),t._v(" "),n("th",[t._v("Ticket Id")]),t._v(" "),n("th",[t._v("Created at")]),t._v(" "),n("th",[t._v("Subject")]),t._v(" "),n("th",[t._v("Description")]),t._v(" "),n("th",[t._v("Predict Intent")]),t._v(" "),n("th",[t._v("Correct Intent")]),t._v(" "),n("th",[t._v("Confidence")]),t._v(" "),n("th")])])}],i={render:o,staticRenderFns:r};e.a=i},IOPY:function(t,e,n){"use strict";var o=n("7+uW"),r=n("c+8m"),i=n.n(r),s=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),a=this&&this.__decorate||function(t,e,n,o){var r,i=arguments.length,s=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(i<3?r(s):i>3?r(e,n,s):r(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s},c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.snackbar_tkt="",e}return s(e,t),e.prototype.firstPage=function(){this.$store.commit("setPage",{number:1,size:20}),this.$store.commit("refreshTickets")},e.prototype.nextPage=function(){this.$store.commit("setPage",{number:this.$store.state.ticketPagination.number+1,size:20}),this.$store.commit("refreshTickets")},e.prototype.previousPage=function(){this.$store.state.ticketPagination.number<2||(this.$store.commit("setPage",{number:this.$store.state.ticketPagination.number-1,size:20}),this.$store.commit("refreshTickets"))},e.prototype.onClick=function(){console.log("a non-vuex method has been called")},e.prototype.intentCorrectionPage=function(t){this.$router.push({name:"MarkCorrectIntent",params:{ticket_id:t.reference_id}})},e.prototype.markAsCorrect=function(t){var e=this;e.$store.state.client.jsonApi.update("ticket",{id:t.reference_id,corrected_intent:t.predicted_intent}).then(function(t){console.log("update ticket response",t),e.$store.commit("refreshTickets")})},e.prototype.showSnackbar=function(t){this.snackbar_tkt=t;var e=document.getElementById("snackbar");e.className="show",setTimeout(function(){e.className=e.className.replace("show","")},3e3)},e.prototype.mounted=function(){this.$store.commit("refreshTickets")},e=a([i()({})],e)}(o.default);e.a=c},Lpdu:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-dialog",{attrs:{title:"Call-Up Trainer Login",visible:t.dialogVisible,width:"30%","close-on-press-escape":!1,"show-close":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-form",{staticClass:"auth-form",attrs:{model:t.authForm}},[n("el-form-item",{attrs:{label:"Username"}},[n("el-input",{attrs:{placeholder:"Email"},model:{value:t.authForm.username,callback:function(e){t.$set(t.authForm,"username",e)},expression:"authForm.username"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Password"}},[n("el-input",{attrs:{type:"password"},model:{value:t.authForm.password,callback:function(e){t.$set(t.authForm,"password",e)},expression:"authForm.password"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:t.tryLogin}},[t._v("Login")])],1)],1),t._v(" "),t.$store.state.user.token?n("el-menu",{staticClass:"el-menu-demo",attrs:{mode:"horizontal"}},[n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[t._v("User "+t._s(t.userProfile.email))]),t._v(" "),n("el-menu-item",{attrs:{index:"2-1"},on:{click:t.logout}},[t._v("Logout")])],2)],1):t._e(),t._v(" "),t.$store.state.user.token?n("router-view"):t._e()],1)},r=[],i={render:o,staticRenderFns:r};e.a=i},M93x:function(t,e,n){"use strict";function o(t){n("0x+N")}var r=n("edak"),i=n("Lpdu"),s=n("VU/8"),a=o,c=s(r.a,i.a,!1,a,null,null);e.a=c.exports},"P/YC":function(t,e,n){"use strict";var o=n("7+uW"),r=n("c+8m"),i=n.n(r),s=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),a=this&&this.__decorate||function(t,e,n,o){var r,i=arguments.length,s=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(i<3?r(s):i>3?r(e,n,s):r(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s},c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ticketId="",e.ticket={},e.correctIntent={},e.correctIntentName="",e}return s(e,t),e.prototype.chooseIntent=function(t){this.correctIntentName=t.intent_name},e.prototype.cancelUpdate=function(){this.$router.push({name:"TicketTable"})},e.prototype.alterIntent=function(t){var e=this;console.log("choosen Intent object"),console.log(t),e.correctIntent=t,console.log("todo intent patch call with correctIntent"),console.log("update on server"),e.$store.state.client.jsonApi.update("ticket",{id:e.$route.params.ticket_id,corrected_intent:e.correctIntent}).then(function(t){console.log("update ticket response",t),e.$store.commit("refreshTickets"),e.$router.push({name:"TicketTable"})})},e.prototype.setIntent=function(){for(var t=this,e=0,n=t.$store.state.intents;e<n.length;e++){var o=n[e];if(console.log("intents:"+o.intent_name+"\n"),this.correctIntentName==o.intent_name)return void t.alterIntent(o)}console.log("this looks like a new intent to me :)"),t.$store.state.client.jsonApi.create("intent",{intent_name:t.correctIntentName}).then(function(e){console.log("new intent creation response",e),t.alterIntent(e.data),t.$store.commit("refreshIntents")})},e.prototype.mounted=function(){var t=this;this.ticketId=this.$route.params.ticket_id,console.log("loaded mark correct intent",this.ticketId,this.$store.state),this.$store.state.client.jsonApi.find("ticket",this.ticketId,{included_relations:"intent"}).then(function(e){console.log(e.data),t.ticket=e.data,console.log("loaded ticket",e.data)})},e=a([i()({name:"LinkComponent"})],e)}(o.default);e.a=c},TyVi:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticStyle:{"text-align":"center","padding-top":"30px"}},[t._v("\n    What is the correct intent?\n    "),n("br"),t._v(" "),n("h4",[t._v(t._s(t.ticket.description))])]),t._v(" "),n("div",{staticClass:"centroid"},[n("div",{staticClass:"btn-matrix"},t._l(this.$store.state.intents,function(e){return n("button",{staticClass:"btn btn-outline-success",attrs:{type:"button"},on:{click:function(n){t.chooseIntent(e)}}},[t._v("\n        "+t._s(e.intent_name)+"\n      ")])}))]),t._v(" "),n("div",{staticClass:"centroid"},[n("el-form",[n("el-form-item",[n("el-input",{staticClass:"form-control",attrs:{type:"text",id:"intent_value",placeholder:"correct intent"},model:{value:t.correctIntentName,callback:function(e){t.correctIntentName=e},expression:"correctIntentName"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.setIntent}},[t._v("Update")]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:t.cancelUpdate}},[t._v("Cancel")])],1)],1)],1)])},r=[],i={render:o,staticRenderFns:r};e.a=i},"V/Al":function(t,e,n){"use strict";var o=n("7+uW"),r=n("NYxO"),i=n("MFtw");n.n(i);o.default.use(r.a);var s=window.localStorage.getItem("token"),a=new i.DaptinClient("http://intent-trainer.callup.ai:8080",!1);a.worldManager.loadModels().then(function(){s&&(a.jsonApi.findAll("ticket",{included_relations:"intent",page:u.ticketPagination}).then(function(t){console.log("all tickets",t.data),u.tickets=t.data}),a.jsonApi.findAll("intent",{page:{size:500,number:1}}).then(function(t){console.log("all intents",t.data),u.intents=t.data}))});var c={reverse:function(t){return t.links.reverse()},logout:function(t){t.user={}},refreshTickets:function(t){t.user.token&&a.jsonApi.findAll("ticket",{included_relations:"intent",page:t.ticketPagination,sort:"-created_at"}).then(function(e){console.log("all tickets",e.data),t.tickets=e.data})},refreshIntents:function(t){t.user.token&&a.jsonApi.findAll("intent",{page:{size:500,number:1}}).then(function(e){console.log("all intents",e.data),t.intents=e.data})},setPage:function(t,e){console.log("new pagge",e),t.ticketPagination=e}},l={},u={links:[{url:"https://vuejs.org",description:"Core Docs"}],tickets:[],intents:[],client:a,user:{token:s},ticketPagination:{size:20,number:1}};e.a=new r.a.Store({state:u,mutations:c,actions:l})},cV3b:function(t,e){},edak:function(t,e,n){"use strict";var o=n("7+uW"),r=n("c+8m"),i=n.n(r),s=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),a=this&&this.__decorate||function(t,e,n,o){var r,i=arguments.length,s=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(i<3?r(s):i>3?r(e,n,s):r(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s},c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dialogVisible=!1,e.userProfile={},e.name="app",e.authForm={username:"",password:""},e}return s(e,t),e.prototype.tryLogin=function(){console.log("login",this.authForm),this.$store.state.client.actionManager.doAction("user","signin",{email:this.authForm.username,password:this.authForm.password}).then(function(t){console.log("sign in action response",t)})},e.prototype.logout=function(){window.localStorage.clear(),this.$store.commit("logout"),this.dialogVisible=!0},e.prototype.showLogin=function(){console.log("show login dialog"),this.dialogVisible=!0},e.prototype.mounted=function(){if(console.log("mounted app",this.$store.state.user.token),this.$store.state.user.token||(this.dialogVisible=!0),this.$store.state.user.token){var t=JSON.parse(window.localStorage.getItem("user"));this.userProfile=t}},e=a([i.a],e)}(o.default);e.a=c},l8pk:function(t,e,n){"use strict";function o(t){n("cV3b")}var r=n("P/YC"),i=n("TyVi"),s=n("VU/8"),a=o,c=s(r.a,i.a,!1,a,"data-v-9a5cb6a0",null);e.a=c.exports},tvR6:function(t,e){},x35b:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),r=n("M93x"),i=n("yDEt"),s=n("V/Al"),a=n("zL8q"),c=n.n(a),l=n("tvR6");n.n(l);o.default.use(c.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:i.a,store:s.a,template:"<App/>",components:{App:r.a}})},yDEt:function(t,e,n){"use strict";var o=n("7+uW"),r=n("/ocq"),i=n("3z5P"),s=n("l8pk");o.default.use(r.a);var a={routes:[{path:"/",name:"TicketTable",component:i.a},{path:"/mark_correct_intent/:ticket_id",name:"MarkCorrectIntent",component:s.a,props:!0}]};e.a=new r.a(a)}},["x35b"]);
//# sourceMappingURL=app.120a53d402cba7b78bc0.js.map