"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[363],{4236:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>I,contentTitle:()=>N,default:()=>z,frontMatter:()=>X,metadata:()=>T,toc:()=>M});var s=r(5893),t=r(1151),d=r(7294),a=r(6905),l=r(2924),i=r(6550),c=r(3997),o=r(7145),u=r(6055),h=r(7413);function A(e){return d.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,d.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:r}=e;return(0,d.useMemo)((()=>{const e=n??function(e){return A(e).map((e=>{let{props:{value:n,label:r,attributes:s,default:t}}=e;return{value:n,label:r,attributes:s,default:t}}))}(r);return function(e){const n=(0,u.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function m(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function x(e){let{queryString:n=!1,groupId:r}=e;const s=(0,i.k6)(),t=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,o._X)(t),(0,d.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(s.location.search);n.set(t,e),s.replace({...s.location,search:n.toString()})}),[t,s])]}function j(e){const{defaultValue:n,queryString:r=!1,groupId:s}=e,t=p(e),[a,l]=(0,d.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=r.find((e=>e.default))??r[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:t}))),[i,o]=x({queryString:r,groupId:s}),[u,A]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,t]=(0,h.Nk)(r);return[s,(0,d.useCallback)((e=>{r&&t.set(e)}),[r,t])]}({groupId:s}),j=(()=>{const e=i??u;return m({value:e,tabValues:t})?e:null})();(0,c.Z)((()=>{j&&l(j)}),[j]);return{selectedValue:a,selectValue:(0,d.useCallback)((e=>{if(!m({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);l(e),o(e),A(e)}),[o,A,t]),tabValues:t}}var f=r(573);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function g(e){let{className:n,block:r,selectedValue:t,selectValue:d,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,l.o5)(),u=e=>{const n=e.currentTarget,r=c.indexOf(n),s=i[r].value;s!==t&&(o(n),d(s))},h=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;n=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;n=c[r]??c[c.length-1];break}}n?.focus()};return(0,s.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},n),children:i.map((e=>{let{value:n,label:r,attributes:d}=e;return(0,s.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>c.push(e),onKeyDown:h,onClick:u,...d,className:(0,a.Z)("tabs__item",b.tabItem,d?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function v(e){let{lazy:n,children:r,selectedValue:t}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===t));return e?(0,d.cloneElement)(e,{className:"margin-top--md"}):null}return(0,s.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,d.cloneElement)(e,{key:n,hidden:e.props.value!==t})))})}function w(e){const n=j(e);return(0,s.jsxs)("div",{className:(0,a.Z)("tabs-container",b.tabList),children:[(0,s.jsx)(g,{...n,...e}),(0,s.jsx)(v,{...n,...e})]})}function V(e){const n=(0,f.Z)();return(0,s.jsx)(w,{...e,children:A(e.children)},String(n))}const q={tabItem:"tabItem_Ymn6"};function y(e){let{children:n,hidden:r,className:t}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.Z)(q.tabItem,t),hidden:r,children:n})}const X={title:"\u57fa\u672c\u64cd\u4f5c",sidebar_position:15,description:"\u57fa\u672c\u64cd\u4f5c"},N=void 0,T={id:"docs/sider/guides/step4",title:"\u57fa\u672c\u64cd\u4f5c",description:"\u57fa\u672c\u64cd\u4f5c",source:"@site/docs/docs/sider/guides/step4.md",sourceDirName:"docs/sider/guides",slug:"/docs/sider/guides/step4",permalink:"/docs/docs/sider/guides/step4",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:15,frontMatter:{title:"\u57fa\u672c\u64cd\u4f5c",sidebar_position:15,description:"\u57fa\u672c\u64cd\u4f5c"},sidebar:"oswSidebar",previous:{title:"\u5feb\u901f\u90e8\u7f72",permalink:"/docs/docs/sider/guides/step2"},next:{title:"\u8fdb\u9636\u6307\u5357",permalink:"/docs/category/\u8fdb\u9636\u6307\u5357"}},I={},M=[{value:"\u6dfb\u52a0\u57df\u540d",id:"\u6dfb\u52a0\u57df\u540d",level:2},{value:"\u4fee\u6539\u57df\u540dNS\u8bb0\u5f55",id:"\u4fee\u6539\u57df\u540dns\u8bb0\u5f55",level:3},{value:"\u6dfb\u52a0\u57df\u540d",id:"\u6dfb\u52a0\u57df\u540d-1",level:3},{value:"\u8bb0\u5f55\u89e3\u6790",id:"\u8bb0\u5f55\u89e3\u6790",level:2},{value:"\u89e3\u6790\u914d\u7f6e",id:"\u89e3\u6790\u914d\u7f6e",level:3},{value:"\u8bb0\u5f55\u89e3\u6790",id:"\u8bb0\u5f55\u89e3\u6790-1",level:3},{value:"\u89e3\u6790\u793a\u4f8b",id:"\u89e3\u6790\u793a\u4f8b",level:2},{value:"MX\u8bb0\u5f55",id:"mx\u8bb0\u5f55",level:3},{value:"TXT\u8bb0\u5f55",id:"txt\u8bb0\u5f55",level:3},{value:"api\u89e3\u6790\u63a5\u53e3",id:"api\u89e3\u6790\u63a5\u53e3",level:2},{value:"token\u4ea7\u751f",id:"token\u4ea7\u751f",level:3},{value:"API\u89e3\u6790",id:"api\u89e3\u6790",level:3},{value:"json\u5b57\u4e32\u65b9\u5f0f",id:"json\u5b57\u4e32\u65b9\u5f0f",level:4},{value:"http Header\u65b9\u5f0f",id:"http-header\u65b9\u5f0f",level:4},{value:"\u5ba2\u6237\u7aef\u65b9\u5f0f",id:"\u5ba2\u6237\u7aef\u65b9\u5f0f",level:4}];function P(e){const n={admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u57df\u540d\u81ea\u52a9\u5e73\u53f0\u4ee5",(0,s.jsx)(n.code,{children:"mm-dns.com"}),"\u4e3a\u4f8b\uff0c\u6d4b\u8bd5\u5e10\u53f7",(0,s.jsx)(n.code,{children:"demo/demo1111mm"}),"\u3002\u7528\u6237\u53ef\u81ea\u884c\u6ce8\u518c\u5e10\u53f7\u6d4b\u8bd5"]}),"\n",(0,s.jsxs)(n.li,{children:["\u57df\u540d\u81ea\u52a9\u5e73\u53f0\u7684NS\u8bb0\u5f55\u4e3a",(0,s.jsx)(n.code,{children:"ns1.mm-dns.com"}),"\u3001",(0,s.jsx)(n.code,{children:"ns2.mm-dns.com"}),"\u4f9b\u7528\u6237\u89e3\u6790ns\u8bb0\u5f55\u4f7f\u7528\u3002"]}),"\n",(0,s.jsxs)(n.li,{children:["\u88ab\u89e3\u6790\u57df\u540d\u4ee5",(0,s.jsx)(n.code,{children:"daatu.com"}),"\u4e3a\u6d4b\u8bd5\u5bf9\u50cf\u3002"]}),"\n"]})}),"\n",(0,s.jsx)(n.h2,{id:"\u6dfb\u52a0\u57df\u540d",children:"\u6dfb\u52a0\u57df\u540d"}),"\n",(0,s.jsx)(n.h3,{id:"\u4fee\u6539\u57df\u540dns\u8bb0\u5f55",children:"\u4fee\u6539\u57df\u540dNS\u8bb0\u5f55"}),"\n",(0,s.jsxs)(n.p,{children:["\u9700\u8981\u5728\u57df\u540d\u6ce8\u518c\u5546\u5e73\u53f0\u4fee\u6539\u81ea\u5df1\u57df\u540d\u7684NS\u8bb0\u5f55\u3002",(0,s.jsx)(n.br,{}),"\n","\u6d4b\u8bd5\u57df\u540ddaatu.com\u7684\u6ce8\u518c\u5e73\u53f0\u4e3a\u963f\u91cc\u4e91\uff0c\u4fee\u6539\u5176ns\u8bb0\u5f55\u503c\u4e3a",(0,s.jsx)(n.code,{children:"ns1.mm-dns.com"}),"\u3001",(0,s.jsx)(n.code,{children:"ns2.mm-dns.com"}),",\u64cd\u4f5c\u5982\u4e0b",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.img,{alt:"Alt text",src:r(4166).Z+"",width:"900",height:"407"})]}),"\n",(0,s.jsx)(n.p,{children:"dns\u4fee\u6539\u540e\u670924-48\u5c0f\u65f6\u5168\u7403dns\u751f\u6548\u65f6\u95f4\u3002\u9700\u8010\u5fc3\u7b49\u5f85\u3002"}),"\n",(0,s.jsx)(n.h3,{id:"\u6dfb\u52a0\u57df\u540d-1",children:"\u6dfb\u52a0\u57df\u540d"}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u57df\u540d\u4fee\u6539ns\u8bb0\u5f55\u5168\u7403\u751f\u6548\u540e\uff0c\u7528\u6237\u53ef\u4ee5\u5c06\u81ea\u5df1\u7684\u57df\u540d\u6dfb\u52a0\u5230\u57df\u540d\u81ea\u52a9\u5e73\u53f0,\u4ee5\u4fbf\u7531\u57df\u540d\u81ea\u52a9\u5e73\u53f0\u63d0\u4f9b\u8bb0\u5f55\u89e3\u6790\u3002\r\n\u5982\u4e0b\uff1a\r\n",(0,s.jsx)(n.img,{alt:"Alt text",src:r(4102).Z+"",width:"1073",height:"494"})]}),"\n",(0,s.jsx)(n.p,{children:"\u67e5\u770b\u7ed3\u679c(\u6dfb\u52a0\u540e\u970024-48\u5c0f\u65f6\u5168\u7403\u751f\u6548),\u82e5\u80fd\u5728\u4efb\u610f\u4e00\u53f0DNS\u670d\u52a1\u5668\u4e0a\u67e5\u5230\u5982\u4e0b\u8bb0\u5f55\uff0c\u8bf4\u660e\u5df2\u751f\u6548\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dos",children:"C:\\Users\\Administrator>nslookup -qt=soa daatu.com 8.8.8.8\r\n\u670d\u52a1\u5668:  dns.google\r\nAddress:  8.8.8.8\r\n\r\n\u975e\u6743\u5a01\u5e94\u7b54:\r\ndaatu.com\r\n        primary name server = ns1.mm-dns.com\r\n        responsible mail addr = info.daatu.com\r\n        serial  = 2024060100\r\n        refresh = 86400 (1 day)\r\n        retry   = 86400 (1 day)\r\n        expire  = 86400 (1 day)\r\n        default TTL = 86400 (1 day)\r\n\r\nC:\\Users\\Administrator>nslookup -qt=ns daatu.com 8.8.8.8\r\n\u670d\u52a1\u5668:  dns.google\r\nAddress:  8.8.8.8\r\n\r\n\u975e\u6743\u5a01\u5e94\u7b54:\r\ndaatu.com       nameserver = ns2.mm-dns.com\r\ndaatu.com       nameserver = ns1.mm-dns.com\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u91c7\u7528\u5982\u4e0a\u64cd\u4f5c\uff0c\u7528\u6237\u53ef\u6dfb\u52a0\u81ea\u5df1\u65e0\u9650\u591a\u57df\u540d\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u8bb0\u5f55\u89e3\u6790",children:"\u8bb0\u5f55\u89e3\u6790"}),"\n",(0,s.jsx)(n.h3,{id:"\u89e3\u6790\u914d\u7f6e",children:"\u89e3\u6790\u914d\u7f6e"}),"\n",(0,s.jsxs)(n.p,{children:["\u89e3\u6790\u914d\u7f6e\uff0c\u7531\u540e\u53f0",(0,s.jsx)(n.code,{children:"app.conf"}),"\u914d\u7f6e\u6587\u4ef6\u4e2d\u7684\u5982\u4e0b\u53c2\u6570\u51b3\u5b9a\uff0c\u7ba1\u7406\u5458\u53ef\u6839\u636e\u9700\u8981\u81ea\u7531\u914d\u7f6e\u3002"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"domaintypes"}),",\u57df\u540d\u7c7b\u578b\u3002",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:'domaintypes=".com .net .org .cn .io .top .com.cn .tech .info"'})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"recordtypes"}),"\uff0c\u8bb0\u5f55\u7c7b\u578b\uff0c\u4e0d\u652f\u6301",(0,s.jsx)(n.code,{children:"NS"}),"\u8bb0\u5f55\u3002",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:'recordtypes="A MX CNAME TXT AAAA"'})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"ttl"}),"\uff0c\u8bb0\u5f55\u5728\u7528\u6237\u7aef",(0,s.jsx)(n.code,{children:"cache"}),"\u4e2d\u7684\u751f\u6548\u65f6\u95f4,\u5982\u4e0b\u683c\u5f0f,\u6700\u5c0f1\u79d2\u3002",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:'ttl="1 1sec,5 5sec,30 30sec,60 1min,300 5min,1800 30min,3600 1h,43200 12h,86400 24h"'})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'...\r\n\r\n# \u6570\u7ec4\u914d\u7f6e\u65b9\u5f0f\r\n# \u57df\u540d\u7c7b\u578b\r\ndomaintypes=".com .net .org .cn .io .top .com.cn .tech .info"\r\n\r\n# \u89e3\u6790\u8bb0\u5f55\uff0c\u6682\u4e0d\u652f\u6301ns\u89e3\u6790\r\nrecordtypes="A MX CNAME TXT AAAA"   \r\n\r\n# TTL(\u5fc5\u987b\u6709\u6309\u7167\u5982\u4e0b\u683c\u5f0f\u4e66\u5199)\r\nttl="1 1sec,5 5sec,30 30sec,60 1min,300 5min,1800 30min,3600 1h,43200 12h,86400 24h"\r\n\r\n...\n'})}),"\n",(0,s.jsx)(n.h3,{id:"\u8bb0\u5f55\u89e3\u6790-1",children:"\u8bb0\u5f55\u89e3\u6790"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Alt text",src:r(9834).Z+"",width:"1026",height:"785"})}),"\n",(0,s.jsx)(n.p,{children:"\u6d4b\u8bd5"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dos",children:"C:\\Users\\Administrator>nslookup -qt=a www.daatu.com 8.8.8.8\r\n\u670d\u52a1\u5668:  dns.google\r\nAddress:  8.8.8.8\r\n\r\n\u975e\u6743\u5a01\u5e94\u7b54:\r\n\u540d\u79f0:    www.daatu.com\r\nAddress:  1.1.1.1\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u91c7\u7528webadmin\u65b9\u5f0f\uff0c\u901a\u5e38\u7528\u4e8e\u57df\u540d\u7684\u56fa\u5b9a\u503c\u89e3\u6790\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u89e3\u6790\u793a\u4f8b",children:"\u89e3\u6790\u793a\u4f8b"}),"\n",(0,s.jsx)(n.h3,{id:"mx\u8bb0\u5f55",children:"MX\u8bb0\u5f55"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Alt text",src:r(7458).Z+"",width:"648",height:"109"})}),"\n",(0,s.jsx)(n.h3,{id:"txt\u8bb0\u5f55",children:"TXT\u8bb0\u5f55"}),"\n",(0,s.jsx)(n.h2,{id:"api\u89e3\u6790\u63a5\u53e3",children:"api\u89e3\u6790\u63a5\u53e3"}),"\n",(0,s.jsx)(n.p,{children:"\u7f16\u7a0b\u5f0f\u89e3\u6790\uff0c\u4e3b\u8981\u5e94\u5bf9\u5404\u7c7b\u52a8\u6001\u89e3\u6790\uff0c\u9700\u63d0\u4f9b\u6709\u6548token\u624d\u53ef\u4ee5\u6b63\u786e\u89e3\u6790\uff0c\u6bcf\u4e00\u6761\u8bb0\u5f55\u90fd\u6709\u72ec\u7acb\u4e14\u552f\u4e00\u7684token\u503c\u3002"}),"\n",(0,s.jsx)(n.h3,{id:"token\u4ea7\u751f",children:"token\u4ea7\u751f"}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u6dfb\u52a0\u8bb0\u5f55\u65f6\u4ea7\u751f\uff0c\u5982\u4e0b\r\n",(0,s.jsx)(n.img,{alt:"Alt text",src:r(3618).Z+"",width:"556",height:"720"}),"\r\n\u5728\u8bb0\u5f55oa.daatu.com\u89e3\u6790\u4e3a\u4f8b,\u5982\u4e0b\uff0c\u590d\u5236token\r\n",(0,s.jsx)(n.img,{alt:"Alt text",src:r(2180).Z+"",width:"1444",height:"358"})]}),"\n",(0,s.jsx)(n.h3,{id:"api\u89e3\u6790",children:"API\u89e3\u6790"}),"\n",(0,s.jsx)(n.p,{children:"bind-webadmin\u63d0\u4f9b3\u79cd\u529e\u6cd5\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0capi\u89e3\u6790\u65f6\u7684url\u4e3a",(0,s.jsx)(n.code,{children:"https://mm-dns.com"}),"\u6216",(0,s.jsx)(n.code,{children:"https://api.mm-dns.com"}),".",(0,s.jsx)(n.br,{}),"\n","\u4f46\u7531\u4e8e",(0,s.jsx)(n.code,{children:"mm-dns.com"}),"\u6b63\u5904\u4e8e\u5907\u6848\u4e2d\uff0c\u6682\u65f6\u91c7\u7528ip\u65b9\u5f0f\u6d4b\u8bd5\u3002\u5373",(0,s.jsx)(n.code,{children:"http://47.115.43.179:9090"})]}),"\n",(0,s.jsx)(n.h4,{id:"json\u5b57\u4e32\u65b9\u5f0f",children:"json\u5b57\u4e32\u65b9\u5f0f"}),"\n",(0,s.jsx)(n.p,{children:"\u6b64\u65b9\u5f0f\u53ef\u89e3\u6790\u4efb\u4f55\u7c7b\u578b\u7684\u8bb0\u5f55\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'curl -i -XPOST "http://47.115.43.179:9090/updatejson" -d \'{\r\n  "data":"9.9.9.9",\r\n  "token":"5HXU...qaQAFDcnhezso"\r\n}\r\n\'\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u5176\u4e2d"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"data\u4e3a\u89e3\u6790\u8bb0\u5f55\u7684\u89e3\u6790\u503c\uff0c\u6b64\u65f6\u53ef\u4ee5\u5904\u7406\u4efb\u4f55\u89e3\u6790\u7c7b\u578b\u7684\u89e3\u6790\u503c\u3002"}),"\n",(0,s.jsx)(n.li,{children:"token\u4e3a\u89e3\u6790\u8bb0\u5f55\u7684toke\u503c"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u4f8b\u5982"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# curl -XPOST "http://47.115.43.179:9090/updatejson" -d \'{\r\n  "data":"9.9.9.9",\r\n  "token":"5HXU...qaQAFDcnhezso"\r\n}\r\n\'\r\n# \u8fd4\u56de\r\n{"info":"ok"}\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u89e3\u6790\u6548\u679c\u68c0\u9a8c"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dos",children:"C:\\Users\\Administrator>nslookup -qt=a oa.daatu.com 8.8.8.8\r\n\u670d\u52a1\u5668:  dns.google\r\nAddress:  8.8.8.8\r\n\r\n\u975e\u6743\u5a01\u5e94\u7b54:\r\n\u540d\u79f0:    oa.daatu.com\r\nAddress:  9.9.9.9\n"})}),"\n",(0,s.jsx)(n.h4,{id:"http-header\u65b9\u5f0f",children:"http Header\u65b9\u5f0f"}),"\n",(0,s.jsx)(n.p,{children:"http\u65b9\u5f0f\uff0c\u53ea\u9002\u5e94\u4e8eA\u8bb0\u5f55\uff0c\u81ea\u52a8\u67e5\u627e\u516c\u7f51IP\u5e76\u66f4\u65b0\u3002\u7528\u6237\u53ef\u5199\u6392\u7a0b\u66f4\u65b0\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# curl \\\r\n-H "token:5HXU...qaQAFDcnhezso" \\\r\n-XGET "http://47.115.43.179:9090/updateheader"\r\n\r\n# \u8fd4\u56de\r\n{"info":"ok"}\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u6d4b\u8bd5\u7ed3\u679c"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dos",children:"C:\\Users\\Administrator>nslookup -qt=a oa.daatu.com 8.8.8.8\r\n\u670d\u52a1\u5668:  dns.google\r\nAddress:  8.8.8.8\r\n\r\n\u975e\u6743\u5a01\u5e94\u7b54:\r\n\u540d\u79f0:    oa.daatu.com\r\nAddress:  119.136.197.11\n"})}),"\n",(0,s.jsx)(n.h4,{id:"\u5ba2\u6237\u7aef\u65b9\u5f0f",children:"\u5ba2\u6237\u7aef\u65b9\u5f0f"}),"\n",(0,s.jsxs)(n.p,{children:["Download Bind-Webadmin client\r\n",(0,s.jsx)("a",{href:"/download/client_for_linux.zip",children:"Linux"})," and ",(0,s.jsx)("a",{href:"/download/client_for_win11.zip",children:"windows"})]}),"\n",(0,s.jsx)(n.p,{children:"\u6bcf5\u79d2\u81ea\u52a8\u8bc6\u522b\u7528\u6237\u5f53\u524dip\u662f\u5426\u6709\u53d8\u5316\uff0c\u82e5\u6709\u53d8\u5316\uff0c\u5c31\u66f4\u65b0\u8bb0\u5f55(\u516c\u7f51IP\u6216\u7528\u6237\u672c\u5730IP)\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u914d\u7f6e\u6587\u4ef6\u540d\u79f0\uff1aconf.json. \u914d\u7f6e\u6587\u4ef6\u4e0e\u66f4\u65b0\u7a0b\u5e8f\u5728\u540c\u4e00\u76ee\u5f55"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# cat conf.json\r\n{\r\n    "public":true,\r\n    "token":"5HXU...qaQAFDcnhezso",\r\n    "rate": 2,\r\n    "srhost":"http://47.115.43.179:9090",\r\n    "getip":"http://47.115.43.179:9090/ip"\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u53c2\u6570\u8bf4\u660e"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"public,\u662f\u5426\u66f4\u65b0\u516c\u7f51ip\u6216\u662f\u7528\u6237\u672c\u673a\u672c\u5730ip"}),"\n",(0,s.jsx)(n.li,{children:"token,\u89e3\u6790\u8bb0\u5f55\u7684\u6388\u6743token"}),"\n",(0,s.jsx)(n.li,{children:"rate,\u5fc3\u8df3\u5468\u671f\uff0c\u8868\u793a\u591a\u5c11\u79d2\u91cd\u65b0\u9a8c\u6d4b\u4e00\u4e0b\u7f51\u7edc\u3002\u9ed8\u8ba42\u79d2\u6d4b\u4e00\u6b21\u3002"}),"\n",(0,s.jsx)(n.li,{children:"srhost,\u66f4\u65b0\u89e3\u6790\u7684DNS\u670d\u52a1\u5668"}),"\n",(0,s.jsxs)(n.li,{children:["getip,\u83b7\u53d6\u672c\u5730\u516c\u7f51ip\u7684api,\u53ef\u91c7\u7528\u7b2c\u4e09\u65b9(\u5982",(0,s.jsx)(n.code,{children:"https://ipinfo.io/ip"}),")\u6216\u81ea\u5efa\u670d\u52a1\u3002"]}),"\n"]}),"\n","\n",(0,s.jsxs)(V,{children:[(0,s.jsx)(y,{value:"windwos",label:"windwos",default:!0,children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dos",children:"wget https://www.bind-webadmin.com/download/client_for_win11.zip\r\n...\r\n.\\client -d\n"})})}),(0,s.jsx)(y,{value:"linux",label:"linux",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# wget https://www.bind-webadmin.com/download/client_for_linux.zip\r\n# unzip client_for_linux.zip\r\n# mv client /usr/local\r\n# tree /usr/local/client\r\n/usr/local/client\r\n\u251c\u2500\u2500 client\r\n\u2514\u2500\u2500 conf.json\r\n# cd /usr/local/client\r\n# chmod +x client\r\n# ./client -d\n"})})})]})]})}function z(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(P,{...e})}):P(e)}},4166:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/1717902123806-0a84fa0301487972bfc07006af9d5b15.png"},4102:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/1717902691805-bc12a16e2da2a09da02fb75499eaf9d6.png"},9834:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/1717904399084-80005ea11e3bc48b748579b9feb6ab05.png"},3618:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/1717905094995-6adca5beca650cb7df1c04b1b7cf704e.png"},2180:(e,n,r)=>{r.d(n,{Z:()=>s});const s=r.p+"assets/images/1717905223734-09ce8e78be7ec6f5b0dbdfdae8a78e9f.png"},7458:(e,n,r)=>{r.d(n,{Z:()=>s});const s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAogAAABtCAIAAACtPQf1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABCpSURBVHhe7d1fSFTpH8dx/f1m1MJI1IQiFIIIobA/BLEXEhIYFF3shcQiEsK2oARFduONthfdZBiEF1usRCxeBAUbBS2ILO3NghS7JEgIwURtq7ausrpoTsvv03wfz+8447gz9u8Zfb8g9zzPPB6P53zP9/s8Z6Y2Py8vr7y8XF8BAMAn9x/3XwAA4AEKMwAAHqEwAwDgEQozAAAeoTADAOARCjMAAB6hMAMA4BEKMwAAHqEwAwDgEQozAAAeoTADAOARCjMAAB6hMAMA4BEKMwAAHsn0f/sYiURKS0tLSkqKiopc12Kzs7OTk5MTExPxeNx1AQCALGVUmFWVq6qqpqenVXrn5uZc72KFhYUq28XFxbFYjNoMAMDK/Fd/1q9fb410VLnn5+dHR0ffvHnjulLopZmZmWg0um7dOm24XgAAkI2M3mPWUlhrZddY1tTUlAa7xodx+PDh+/fvnzx50rUB5KD29vYHDx5wIyfRCdFp0cnRtr7+vFh/f78SoI0M03fdunVr3759rr2gr6/PdmWuXLnidpR+V5J0acLfFd5bEg0T217myIO93blzJ/WAYTIqzEVFRemeYCfRsHRvQn9alHPAH8rIMj4+vmvXLteFhIMHDxYUFNj2hQsXDoQ8ffp0eHhYecxeDaj6Njc3R6NR106wAr9t2zbXTigrKxscHLS9HTp0KHVXouuiV10j0dTxtLa2qlOltK6uLrWcq0d1d//+/a6d/shVlauqqmxvsVjs7Nmz7huwGJ/KBvCxKd3r608//bR9+/Z067Y1SNW0uLh4yceTeqm0tPTevXuuvUBVWV9VMq1pNLihoeH27dtjY2Oua8HLly/dVhr19fX6+vfff1vz4cOHX331lb5q+9GjR/F4vLKy0l4yunxtbW0DAwOqvq5rseDIddFVlbVWtr2pR/161YYhLDcKs66oIs8egBw/ftz1LszUrD94MBIebM9PdO3b29tLSko0r7RhiubgqYsGLLmYDj+NsQc44R8XPJmxH3fx4kV7SXsODoAndTnKQkLXVFdQ11GhElz64LrrQouN14CgH5nQQvm3335TYX79+vXevXtd79qmvHH06NFffvlF58R1hWglPTIykrrG/SLBNRZcvXpVC2KdXtdO0P5V9V0jDcVwbW2t4ty1Fzty5MjExIR27toJOiT9LC2RXTtFuiMfHx/Xb5rJ3wlag3KgMCueOjo6YrGYPRUpKCgIPq2mW1ozNXV2dnaq0+Z6Gv/kyRN1tra2at6nYFIkKW40D+3t7T127JjN15anSlxXV6fdaj/6Lu1HIauJ4fDw8NuDOHBAGy0tLfpZNn7Pnj1dXV0aX1FR0d3dfffuXY15/vy5gtIGILdEIpEdO3acOXNGV7+mpkaXXtc3iCgNuHTpktKc4kSBoWXfzZs3U1MPlqS7ZsuWLY8fP9adqPt6586d7oW17cSJE9PT099//71rhwSLTtd+B0qAy6wZmpqaVES1MnbtBI20Gaq2UycBywsfuV1uJUZLm0rXypaJUUiWG4VZxTgIyhs3bgSPWVRubaamnDg2NrZ582ZtqwyfO3dOGxYHZWVlb4dmQz9R0aOSb6lWO7x8+bImAfq5169ftzE6Hh1VUJhtsB2G6rFNKoeGhpS7gzHIIfF4XLMrhZBoSmfvkIUjSttKVYqTL7/8UrksaRmBZSgjR6NRnUBtqzwrcfOwQQVM0zslN9debNeuXUsuOrOiE66qrIgV7aqxsTGpNmuWqXwVpLiAYlvLaH2XtrN9MpR05KdOndLko6enR/eOEmPqk3aYHCjM5eXlr1+/Hh8fd+0QXdrgqXX4Yw59fX3WGf48QuY2bdqkovvq1SvXTlDVV0hZNpF0z2H+SHAN5D5dcV33Jd+Z06RQL6nGpOYyLENLZC2VLDs3NzeXlJTYQ4g1S6WuoaFBq9IlS6+ynD1gcO33QaGr9UP4k3cq0nV1dTYZdV0pVFZVSjO/WEseudbcNjm4du1aapqFyYHCrCun66diac3KyspIJKINXfWOjg7d23aZg48eqCqrNFrn4OCgdWZlyaKr1Jy0/J2fnyeq1jLlMoWEgtPeQ0EmVIS0RO7t7bU7VDS3rqqqCt9Za83evXsVSPaQWfMVzVq0HXyCwc7MMvVyxcLTTRVpHYPmSTqGzs5O+0RO8EGclVn+yPVbK81+iN9rFciBwvzs2TNV4mCaFvx1gvC6Vne7vV2hUFB4WcBpWze8NlKpcge5oKmpyd60VlM5QrGoWInFYsFfDFD+PX369KNHjzTsxIkTb78/8YZQ8DgOa5Bi4/PPP9cK4/bt27W1tRYq+Fep6Vh3lm5kuxnXJq1f3SQl8ckYrUqViIJ3c1Uy5+bmwmesvb19BR821Pivv/7atrUHJUyd+SDpaTXsjiDxkR37RI46lf0uXrwYfNfWrVttBfz2o48LU4d0Uo88oINRgtUkgBS6pIwK8+zsbGFhoWssS8M02DXek/v373d1dVVXV+sqyosXL+w9ZvWPjIzYFK+trc06dZnVtLlnd3e3FrWJffx/sKJQsWjPHu1hWrDDMEXk8PCwAlQDGhsbNSDpMFTXz58/T1StTQqhlpYW+4SqKLQUgdTmf6XzpryvWW/4xtGdpTPJxyTTKSsrGxoaco1389lnn1n6UlFUNtOZdy+kp3XRnj177LsU4d99950C3r32b1KPXKXddqXUOjAwYJ8QQqqM/q1sza3y8/NHR0ddOz1btvKWPgAAK5PRv5U9NzenihuNRuPxeLp/LltrZc2PNmzY8Pvvv//zzz+uFwAAZIP/7SMAAB7JtDADAICPIAc+lQ0AwNpBYQYAwCMUZgAAPEJhBgDAIxRmAAA8QmEGAMAjFGYAADxCYQYAwCMUZgAAPEJhBgDAIxRmAAA8QmEGAMAjFGYAADxCYQYAwCMUZgAAPEJhBgDAIxRmAAA8QmEGAMAj+fqze/duawAAgE/rbWEuLy+3BgAA+LR4lA0AgEcozAAAeITCDACARyjMAAB4hMIMAIBHKMwAAHiEwgwAgEcozAAAeITCDACARyjMAAB4hMIMAIBHKMwAAHiEwgwAgEcozAAAeITCDACARyjMAAB4hMIMAIBHKMwAAHgkX3/Ky8utsYxIJFJaWlpSUlJUVOS6FpudnZ2cnJyYmIjH464LAABkKaPCrKpcVVU1PT2t0js3N+d6FyssLFTZLi4ujsVi1GYAAFbmv/qzfv16a6Sjyj0/Pz86OvrmzRvXlUIvzczMRKPRdevWacP1AgCAbGT0HrOWwloru8aypqamNNg1PozDhw/fv3//5MmTrg18MPv27btz587PCx48eEDgvSM7paIN17XgypUrdoZ1j/f396vpXsjLa29vXyMnX791+BcPR2C4/wMhu3oio8JcVFSU7gl2Eg1L9yb0p0XAIVsqBj09PbFY7MCCCxcuNDQ09PX1uRFYkfn5+fXr19fX17t2gu7Q6upq29atOjAwoKY61VRx0slX59WrV23AqmTTkf3797t2wtmzZ6enp/Xrd3Z26oQoJt0LPiG7vnd8KhtYgrJMXV1db2/vqVOnXFeiYBw6dEgbH2HtsopFo9F4PL5z507XTjhy5MjfCdbUHGhsbKypqUnbJ06c0Ncffvgh8crqpNrW1tam6cjTp09dV6KztLT0xx9/1LZib3h4OOmkYbXKjcIcfp5z/Phx17swx7T+4OFYeLBe1RglWc00S0pKmpubbZgWPUFuTTfd07fYTsQmquEfZ3tWp/24ixcv2kvac3AAPPnMXQcPHlQe1BItuOj6euvWLV1cJcotW7Zoww1F9h4/fqySE9wdOpk6pTrJ1jQ6zxUVFbr1tm/ffvfu3YcPH7oXViOb82k64toJe/fuff36dfCL20mztBPQ+VG2+eabb4KEEyQue7RjAWwZzFJT0iOfIF/Jv2bX1M4Pml3t25Vd9aupX7sNhgVjVqUcKMy60h0dHcETxYKCguDTagpczTHtOU/wcEzjnzx5os7W1lZNwDUTV3pVxE9OTmoBdOzYsUzucMWKFkzarfaj79J+FASa0ipZvz2IAwe00dLSYsEqe/bs6erq0nilku7ubuURjXn+/Lnyuw1ADrHLeu/ePW3oKluM6auWeupX/MzNzW3atCkxFivx559/joyMBHeH7lyd2/BiUXTb6i7TDauRq/sh9jtSzlH9Voj++uuvqo5aVWtbWUv9qogqbDdv3qytrVUGswx56dIl+0bJNrumdn7o7BqJRHbs2HHmzBmNrKmp0TBl2iC32w5Xn9wozAoXZUlr3rhxI/y8S7Sh4BsbG9u8ebO2FSjnzp3ThkJEAVdWVvZ2aDb0ExUcij/tVk3t8PLly4pI/dzr16/bGB2PjspCR2ywHYbqseWRoaGh4uLiYAxyhYquLpw2dO3m5+ftIeqrV68mJiYyyTvIRLD+s9tNa6B0nzBdwS28pijnWF7SKZ2enrZH3wpU5Sv7q7BKRwpdrYZVnpOePejkZ5Vdl+zMil3uzLNrPB63YxZFiGq2vlHbK8vtuSIHCrNiS/PB8fFx1w7RlQsewmzbts315uX19fVZZ9InKTKkvKywUCJ27QSFoIJeAWFNHY+OKvWvgP+R4BrIcbq+WhzbRde2okIbQdnGu7BqoUWP1YZHjx65FxZotbd9+/Zvv/02/NB7jZuZmVkyE5pnz56pvOmra4eo4m7dujX12UO22TVdys3cirOrXtWYly9fuvaqlgOFWZdQF1KX05qVlZWRSEQbCpGOjg7Fx9tnHwcOBM/BVJVVGq1zcHDQOrOyZFgoIJKWv1pLJYUXVgdNyZUCNIvX9Q2v6uxV1RLN1m2+j3dh79bX19erYCSdT53wo0ePqv/atWv6qu3wrbdGJKW+Xbt2BdPEbClop6amNNFRMLuuhKyy65Kd2SK7ZiIHCrMmgIqV4O2EgwcPKpK0EZ55KdoqKiq0oUurC2yzKm1XVVVpI5Uqt16yOGhqarK3VdTUZPDKlSsKfWXeuro6C2LN1k+fPq0ZvYbZB0RFG9FodGU3Cfw3NDSkAFDsqSp0dnZ2d3cPDAwotJSVysrKwh/Vxorp9tFNtHHjxuBRasBuNHu2aV+DW2/tsIcK9tF05aLq6mqFpb2Ulfb2dqW7CxcuKJhtb8pp/f39+ppVdl2yM9VHzq7B7+Laq0JGhXl2drawsNA1lqVhGuwa74mm0l1dXQpK5UR58eKFvQuifsVZc3OzOtva2qxT11LNY8eO6auSqaZdiX38f7CCQyFit3pPT094h2HKvMPDw8rIGtDY2KgBSYehyDt//jyFebVSFlMAKKM9fvxYi4Pa2trLly8rrrT9xRdfuEF4N3a3jo2NJS2XddpramqCd0NtmHpWWfLNxKVLl2w6qFykqaG9v5sVnTSVQO1Bp1F5T3sLfyo7q+y6ZGe4n+z6vmT0b2VrZpSfnz86Oura6dkcSneaNYGcpoymBKRc5tp5eYODgyyXAXxQWfxPLP7666+pqal0/wSY1sobN27csGFDjP+JBQAAK8X/9hEAAI9kWpgBAMBHkAOfygYAYO2gMAMA4BEKMwAAHqEwAwDgEQozAAAeoTADAOARCjMAAB6hMAMA4BEKMwAAHqEwAwDgEQozAAAeoTADAOARCjMAAB6hMAMA4BEKMwAAHqEwAwDgEQozAAAeoTADAOCRfP3ZvXu3NQAAAAAAAAAAAAAASCsv739vT2OnVOxbGQAAAABJRU5ErkJggg=="},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>a});var s=r(7294);const t={},d=s.createContext(t);function a(e){const n=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(d.Provider,{value:n},e.children)}}}]);