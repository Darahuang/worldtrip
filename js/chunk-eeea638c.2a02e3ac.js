(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eeea638c"],{1915:function(e,t,n){"use strict";function a(){window.pageYOffset>100&&window.scrollTo({top:0,behavior:"smooth"})}n.d(t,"a",(function(){return a}))},"3a5e":function(e,t,n){"use strict";var a=n("7a23"),c=Object(a["createElementVNode"])("div",{class:"bubblingG"},[Object(a["createElementVNode"])("span",{id:"bubblingG_1"}),Object(a["createElementVNode"])("span",{id:"bubblingG_2"}),Object(a["createElementVNode"])("span",{id:"bubblingG_3"})],-1);function r(e,t,n,r,i,o){var s=Object(a["resolveComponent"])("Loading",!0);return Object(a["openBlock"])(),Object(a["createBlock"])(s,{active:n.isLoading},{default:Object(a["withCtx"])((function(){return[c]})),_:1},8,["active"])}var i={props:{isLoading:{type:Boolean,default:!1}}},o=n("6b0d"),s=n.n(o);const l=s()(i,[["render",r]]);t["a"]=l},"99af":function(e,t,n){"use strict";var a=n("23e7"),c=n("da84"),r=n("d039"),i=n("e8b5"),o=n("861d"),s=n("7b0b"),l=n("07fa"),d=n("8418"),u=n("65f0"),b=n("1dde"),f=n("b622"),p=n("2d00"),g=f("isConcatSpreadable"),j=9007199254740991,O="Maximum allowed index exceeded",v=c.TypeError,m=p>=51||!r((function(){var e=[];return e[g]=!1,e.concat()[0]!==e})),h=b("concat"),w=function(e){if(!o(e))return!1;var t=e[g];return void 0!==t?!!t:i(e)},L=!m||!h;a({target:"Array",proto:!0,forced:L},{concat:function(e){var t,n,a,c,r,i=s(this),o=u(i,0),b=0;for(t=-1,a=arguments.length;t<a;t++)if(r=-1===t?i:arguments[t],w(r)){if(c=l(r),b+c>j)throw v(O);for(n=0;n<c;n++,b++)n in r&&d(o,b,r[n])}else{if(b>=j)throw v(O);d(o,b++,r)}return o.length=b,o}})},f19d:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),c={class:"container"},r={class:"fw-bold my-4"},i=["innerHTML"];function o(e,t,n,o,s,l){var d=Object(a["resolveComponent"])("Loading");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(d,{isLoading:e.isLoading},null,8,["isLoading"]),Object(a["createElementVNode"])("section",{class:"container-fluid article-banner bg-size-cover bg-position-center",style:Object(a["normalizeStyle"])({"background-image":"url(".concat(e.article.image,")")})},null,4),Object(a["createElementVNode"])("section",c,[Object(a["createElementVNode"])("h2",r,Object(a["toDisplayString"])(e.article.title),1),Object(a["createElementVNode"])("div",{innerHTML:e.article.content},null,8,i)])],64)}var s=n("5530"),l=n("1da1"),d=(n("96cf"),n("99af"),n("1915")),u=n("6c02"),b=n("3a5e"),f={components:{Loading:b["a"]},setup:function(){var e=Object(a["inject"])("Message"),t=Object(a["inject"])("axios"),n=Object(u["d"])(),c=Object(a["reactive"])({article:{},id:"",isLoading:!1});function r(e){return i.apply(this,arguments)}function i(){return i=Object(l["a"])(regeneratorRuntime.mark((function n(a){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r="".concat("https://vue3-course-api.hexschool.io","/api/").concat("starlightselection","/article/").concat(a),c.isLoading=!0,n.prev=2,n.next=5,t.get(r);case 5:i=n.sent,i.data.success?c.article=i.data.article:e("error","".concat(i.data.message)),c.isLoading=!1,Object(d["a"])(),n.next=16;break;case 11:n.prev=11,n.t0=n["catch"](2),e("error","無法取得該貼文，請再次確認!"),c.isLoading=!1,Object(d["a"])();case 16:case"end":return n.stop()}}),n,null,[[2,11]])}))),i.apply(this,arguments)}c.id=n.params.id,r(c.id);var o=Object(a["toRefs"])(c);return Object(s["a"])({},o)}},p=n("6b0d"),g=n.n(p);const j=g()(f,[["render",o]]);t["default"]=j}}]);
//# sourceMappingURL=chunk-eeea638c.2a02e3ac.js.map