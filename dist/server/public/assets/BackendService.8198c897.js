var Je=Object.defineProperty;var Ve=(r,e,t)=>e in r?Je(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var S=(r,e,t)=>(Ve(r,typeof e!="symbol"?e+"":e,t),t);function Ge(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}),e}var re={exports:{}},Ae=function(e,t){return function(){for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];return e.apply(t,s)}},We=Ae,ne=Object.prototype.toString,se=function(r){return function(e){var t=ne.call(e);return r[t]||(r[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function N(r){return r=r.toLowerCase(),function(t){return se(t)===r}}function ae(r){return Array.isArray(r)}function I(r){return typeof r=="undefined"}function ze(r){return r!==null&&!I(r)&&r.constructor!==null&&!I(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}var Se=N("ArrayBuffer");function Xe(r){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&Se(r.buffer),e}function Qe(r){return typeof r=="string"}function Ke(r){return typeof r=="number"}function Ne(r){return r!==null&&typeof r=="object"}function F(r){if(se(r)!=="object")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}var Ye=N("Date"),Ze=N("File"),et=N("Blob"),tt=N("FileList");function ie(r){return ne.call(r)==="[object Function]"}function rt(r){return Ne(r)&&ie(r.pipe)}function nt(r){var e="[object FormData]";return r&&(typeof FormData=="function"&&r instanceof FormData||ne.call(r)===e||ie(r.toString)&&r.toString()===e)}var st=N("URLSearchParams");function at(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function it(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function oe(r,e){if(!(r===null||typeof r=="undefined"))if(typeof r!="object"&&(r=[r]),ae(r))for(var t=0,n=r.length;t<n;t++)e.call(null,r[t],t,r);else for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&e.call(null,r[s],s,r)}function ee(){var r={};function e(s,a){F(r[a])&&F(s)?r[a]=ee(r[a],s):F(s)?r[a]=ee({},s):ae(s)?r[a]=s.slice():r[a]=s}for(var t=0,n=arguments.length;t<n;t++)oe(arguments[t],e);return r}function ot(r,e,t){return oe(e,function(s,a){t&&typeof s=="function"?r[a]=We(s,t):r[a]=s}),r}function ut(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}function ct(r,e,t,n){r.prototype=Object.create(e.prototype,n),r.prototype.constructor=r,t&&Object.assign(r.prototype,t)}function lt(r,e,t){var n,s,a,o={};e=e||{};do{for(n=Object.getOwnPropertyNames(r),s=n.length;s-- >0;)a=n[s],o[a]||(e[a]=r[a],o[a]=!0);r=Object.getPrototypeOf(r)}while(r&&(!t||t(r,e))&&r!==Object.prototype);return e}function ft(r,e,t){r=String(r),(t===void 0||t>r.length)&&(t=r.length),t-=e.length;var n=r.indexOf(e,t);return n!==-1&&n===t}function dt(r){if(!r)return null;var e=r.length;if(I(e))return null;for(var t=new Array(e);e-- >0;)t[e]=r[e];return t}var ht=function(r){return function(e){return r&&e instanceof r}}(typeof Uint8Array!="undefined"&&Object.getPrototypeOf(Uint8Array)),y={isArray:ae,isArrayBuffer:Se,isBuffer:ze,isFormData:nt,isArrayBufferView:Xe,isString:Qe,isNumber:Ke,isObject:Ne,isPlainObject:F,isUndefined:I,isDate:Ye,isFile:Ze,isBlob:et,isFunction:ie,isStream:rt,isURLSearchParams:st,isStandardBrowserEnv:it,forEach:oe,merge:ee,extend:ot,trim:at,stripBOM:ut,inherits:ct,toFlatObject:lt,kindOf:se,kindOfTest:N,endsWith:ft,toArray:dt,isTypedArray:ht,isFileList:tt},D=y;function he(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var $e=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(D.isURLSearchParams(t))s=t.toString();else{var a=[];D.forEach(t,function(c,f){c===null||typeof c=="undefined"||(D.isArray(c)?f=f+"[]":c=[c],D.forEach(c,function(l){D.isDate(l)?l=l.toISOString():D.isObject(l)&&(l=JSON.stringify(l)),a.push(he(f)+"="+he(l))}))}),s=a.join("&")}if(s){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e},pt=y;function M(){this.handlers=[]}M.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1};M.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};M.prototype.forEach=function(e){pt.forEach(this.handlers,function(n){n!==null&&e(n)})};var mt=M,vt=y,yt=function(e,t){vt.forEach(e,function(s,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(e[t]=s,delete e[a])})},De=y;function T(r,e,t,n,s){Error.call(this),this.message=r,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),n&&(this.request=n),s&&(this.response=s)}De.inherits(T,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Be=T.prototype,Te={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(r){Te[r]={value:r}});Object.defineProperties(T,Te);Object.defineProperty(Be,"isAxiosError",{value:!0});T.from=function(r,e,t,n,s,a){var o=Object.create(Be);return De.toFlatObject(r,o,function(c){return c!==Error.prototype}),T.call(o,r.message,e,t,n,s),o.name=r.name,a&&Object.assign(o,a),o};var P=T,Ce={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},g=y;function bt(r,e){e=e||new FormData;var t=[];function n(a){return a===null?"":g.isDate(a)?a.toISOString():g.isArrayBuffer(a)||g.isTypedArray(a)?typeof Blob=="function"?new Blob([a]):Buffer.from(a):a}function s(a,o){if(g.isPlainObject(a)||g.isArray(a)){if(t.indexOf(a)!==-1)throw Error("Circular reference detected in "+o);t.push(a),g.forEach(a,function(c,f){if(!g.isUndefined(c)){var i=o?o+"."+f:f,l;if(c&&!o&&typeof c=="object"){if(g.endsWith(f,"{}"))c=JSON.stringify(c);else if(g.endsWith(f,"[]")&&(l=g.toArray(c))){l.forEach(function(m){!g.isUndefined(m)&&e.append(i,n(m))});return}}s(c,i)}}),t.pop()}else e.append(o,n(a))}return s(r),e}var _e=bt,X=P,Et=function(e,t,n){var s=n.config.validateStatus;!n.status||!s||s(n.status)?e(n):t(new X("Request failed with status code "+n.status,[X.ERR_BAD_REQUEST,X.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},k=y,wt=k.isStandardBrowserEnv()?function(){return{write:function(t,n,s,a,o,u){var c=[];c.push(t+"="+encodeURIComponent(n)),k.isNumber(s)&&c.push("expires="+new Date(s).toGMTString()),k.isString(a)&&c.push("path="+a),k.isString(o)&&c.push("domain="+o),u===!0&&c.push("secure"),document.cookie=c.join("; ")},read:function(t){var n=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),gt=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},Ot=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},Rt=gt,At=Ot,Pe=function(e,t){return e&&!Rt(t)?At(e,t):t},Q=y,St=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Nt=function(e){var t={},n,s,a;return e&&Q.forEach(e.split(`
`),function(u){if(a=u.indexOf(":"),n=Q.trim(u.substr(0,a)).toLowerCase(),s=Q.trim(u.substr(a+1)),n){if(t[n]&&St.indexOf(n)>=0)return;n==="set-cookie"?t[n]=(t[n]?t[n]:[]).concat([s]):t[n]=t[n]?t[n]+", "+s:s}}),t},pe=y,$t=pe.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),n;function s(a){var o=a;return e&&(t.setAttribute("href",o),o=t.href),t.setAttribute("href",o),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return n=s(window.location.href),function(o){var u=pe.isString(o)?s(o):o;return u.protocol===n.protocol&&u.host===n.host}}():function(){return function(){return!0}}(),te=P,Dt=y;function xe(r){te.call(this,r==null?"canceled":r,te.ERR_CANCELED),this.name="CanceledError"}Dt.inherits(xe,te,{__CANCEL__:!0});var q=xe,Bt=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""},x=y,Tt=Et,Ct=wt,_t=$e,Pt=Pe,xt=Nt,Ut=$t,jt=Ce,O=P,kt=q,Ft=Bt,me=function(e){return new Promise(function(n,s){var a=e.data,o=e.headers,u=e.responseType,c;function f(){e.cancelToken&&e.cancelToken.unsubscribe(c),e.signal&&e.signal.removeEventListener("abort",c)}x.isFormData(a)&&x.isStandardBrowserEnv()&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var l=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(l+":"+m)}var p=Pt(e.baseURL,e.url);i.open(e.method.toUpperCase(),_t(p,e.params,e.paramsSerializer),!0),i.timeout=e.timeout;function fe(){if(!!i){var w="getAllResponseHeaders"in i?xt(i.getAllResponseHeaders()):null,$=!u||u==="text"||u==="json"?i.responseText:i.response,A={data:$,status:i.status,statusText:i.statusText,headers:w,config:e,request:i};Tt(function(z){n(z),f()},function(z){s(z),f()},A),i=null}}if("onloadend"in i?i.onloadend=fe:i.onreadystatechange=function(){!i||i.readyState!==4||i.status===0&&!(i.responseURL&&i.responseURL.indexOf("file:")===0)||setTimeout(fe)},i.onabort=function(){!i||(s(new O("Request aborted",O.ECONNABORTED,e,i)),i=null)},i.onerror=function(){s(new O("Network Error",O.ERR_NETWORK,e,i,i)),i=null},i.ontimeout=function(){var $=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",A=e.transitional||jt;e.timeoutErrorMessage&&($=e.timeoutErrorMessage),s(new O($,A.clarifyTimeoutError?O.ETIMEDOUT:O.ECONNABORTED,e,i)),i=null},x.isStandardBrowserEnv()){var de=(e.withCredentials||Ut(p))&&e.xsrfCookieName?Ct.read(e.xsrfCookieName):void 0;de&&(o[e.xsrfHeaderName]=de)}"setRequestHeader"in i&&x.forEach(o,function($,A){typeof a=="undefined"&&A.toLowerCase()==="content-type"?delete o[A]:i.setRequestHeader(A,$)}),x.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),u&&u!=="json"&&(i.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&i.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(c=function(w){!i||(s(!w||w&&w.type?new kt:w),i.abort(),i=null)},e.cancelToken&&e.cancelToken.subscribe(c),e.signal&&(e.signal.aborted?c():e.signal.addEventListener("abort",c))),a||(a=null);var W=Ft(p);if(W&&["http","https","file"].indexOf(W)===-1){s(new O("Unsupported protocol "+W+":",O.ERR_BAD_REQUEST,e));return}i.send(a)})},Lt=null,v=y,ve=yt,ye=P,It=Ce,Mt=_e,qt={"Content-Type":"application/x-www-form-urlencoded"};function be(r,e){!v.isUndefined(r)&&v.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function Ht(){var r;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(r=me),r}function Jt(r,e,t){if(v.isString(r))try{return(e||JSON.parse)(r),v.trim(r)}catch(n){if(n.name!=="SyntaxError")throw n}return(t||JSON.stringify)(r)}var H={transitional:It,adapter:Ht(),transformRequest:[function(e,t){if(ve(t,"Accept"),ve(t,"Content-Type"),v.isFormData(e)||v.isArrayBuffer(e)||v.isBuffer(e)||v.isStream(e)||v.isFile(e)||v.isBlob(e))return e;if(v.isArrayBufferView(e))return e.buffer;if(v.isURLSearchParams(e))return be(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var n=v.isObject(e),s=t&&t["Content-Type"],a;if((a=v.isFileList(e))||n&&s==="multipart/form-data"){var o=this.env&&this.env.FormData;return Mt(a?{"files[]":e}:e,o&&new o)}else if(n||s==="application/json")return be(t,"application/json"),Jt(e);return e}],transformResponse:[function(e){var t=this.transitional||H.transitional,n=t&&t.silentJSONParsing,s=t&&t.forcedJSONParsing,a=!n&&this.responseType==="json";if(a||s&&v.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(a)throw o.name==="SyntaxError"?ye.from(o,ye.ERR_BAD_RESPONSE,this,null,this.response):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Lt},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};v.forEach(["delete","get","head"],function(e){H.headers[e]={}});v.forEach(["post","put","patch"],function(e){H.headers[e]=v.merge(qt)});var ue=H,Vt=y,Gt=ue,Wt=function(e,t,n){var s=this||Gt;return Vt.forEach(n,function(o){e=o.call(s,e,t)}),e},Ue=function(e){return!!(e&&e.__CANCEL__)},Ee=y,K=Wt,zt=Ue,Xt=ue,Qt=q;function Y(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new Qt}var Kt=function(e){Y(e),e.headers=e.headers||{},e.data=K.call(e,e.data,e.headers,e.transformRequest),e.headers=Ee.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Ee.forEach(["delete","get","head","post","put","patch","common"],function(s){delete e.headers[s]});var t=e.adapter||Xt.adapter;return t(e).then(function(s){return Y(e),s.data=K.call(e,s.data,s.headers,e.transformResponse),s},function(s){return zt(s)||(Y(e),s&&s.response&&(s.response.data=K.call(e,s.response.data,s.response.headers,e.transformResponse))),Promise.reject(s)})},E=y,je=function(e,t){t=t||{};var n={};function s(i,l){return E.isPlainObject(i)&&E.isPlainObject(l)?E.merge(i,l):E.isPlainObject(l)?E.merge({},l):E.isArray(l)?l.slice():l}function a(i){if(E.isUndefined(t[i])){if(!E.isUndefined(e[i]))return s(void 0,e[i])}else return s(e[i],t[i])}function o(i){if(!E.isUndefined(t[i]))return s(void 0,t[i])}function u(i){if(E.isUndefined(t[i])){if(!E.isUndefined(e[i]))return s(void 0,e[i])}else return s(void 0,t[i])}function c(i){if(i in t)return s(e[i],t[i]);if(i in e)return s(void 0,e[i])}var f={url:o,method:o,data:o,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:c};return E.forEach(Object.keys(e).concat(Object.keys(t)),function(l){var m=f[l]||a,p=m(l);E.isUndefined(p)&&m!==c||(n[l]=p)}),n},ke={version:"0.27.2"},Yt=ke.version,R=P,ce={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){ce[r]=function(n){return typeof n===r||"a"+(e<1?"n ":" ")+r}});var we={};ce.transitional=function(e,t,n){function s(a,o){return"[Axios v"+Yt+"] Transitional option '"+a+"'"+o+(n?". "+n:"")}return function(a,o,u){if(e===!1)throw new R(s(o," has been removed"+(t?" in "+t:"")),R.ERR_DEPRECATED);return t&&!we[o]&&(we[o]=!0,console.warn(s(o," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,o,u):!0}};function Zt(r,e,t){if(typeof r!="object")throw new R("options must be an object",R.ERR_BAD_OPTION_VALUE);for(var n=Object.keys(r),s=n.length;s-- >0;){var a=n[s],o=e[a];if(o){var u=r[a],c=u===void 0||o(u,a,r);if(c!==!0)throw new R("option "+a+" must be "+c,R.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new R("Unknown option "+a,R.ERR_BAD_OPTION)}}var er={assertOptions:Zt,validators:ce},Fe=y,tr=$e,ge=mt,Oe=Kt,J=je,rr=Pe,Le=er,B=Le.validators;function C(r){this.defaults=r,this.interceptors={request:new ge,response:new ge}}C.prototype.request=function(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=J(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;n!==void 0&&Le.assertOptions(n,{silentJSONParsing:B.transitional(B.boolean),forcedJSONParsing:B.transitional(B.boolean),clarifyTimeoutError:B.transitional(B.boolean)},!1);var s=[],a=!0;this.interceptors.request.forEach(function(p){typeof p.runWhen=="function"&&p.runWhen(t)===!1||(a=a&&p.synchronous,s.unshift(p.fulfilled,p.rejected))});var o=[];this.interceptors.response.forEach(function(p){o.push(p.fulfilled,p.rejected)});var u;if(!a){var c=[Oe,void 0];for(Array.prototype.unshift.apply(c,s),c=c.concat(o),u=Promise.resolve(t);c.length;)u=u.then(c.shift(),c.shift());return u}for(var f=t;s.length;){var i=s.shift(),l=s.shift();try{f=i(f)}catch(m){l(m);break}}try{u=Oe(f)}catch(m){return Promise.reject(m)}for(;o.length;)u=u.then(o.shift(),o.shift());return u};C.prototype.getUri=function(e){e=J(this.defaults,e);var t=rr(e.baseURL,e.url);return tr(t,e.params,e.paramsSerializer)};Fe.forEach(["delete","get","head","options"],function(e){C.prototype[e]=function(t,n){return this.request(J(n||{},{method:e,url:t,data:(n||{}).data}))}});Fe.forEach(["post","put","patch"],function(e){function t(n){return function(a,o,u){return this.request(J(u||{},{method:e,headers:n?{"Content-Type":"multipart/form-data"}:{},url:a,data:o}))}}C.prototype[e]=t(),C.prototype[e+"Form"]=t(!0)});var nr=C,sr=q;function _(r){if(typeof r!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(s){e=s});var t=this;this.promise.then(function(n){if(!!t._listeners){var s,a=t._listeners.length;for(s=0;s<a;s++)t._listeners[s](n);t._listeners=null}}),this.promise.then=function(n){var s,a=new Promise(function(o){t.subscribe(o),s=o}).then(n);return a.cancel=function(){t.unsubscribe(s)},a},r(function(s){t.reason||(t.reason=new sr(s),e(t.reason))})}_.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};_.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};_.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};_.source=function(){var e,t=new _(function(s){e=s});return{token:t,cancel:e}};var ar=_,ir=function(e){return function(n){return e.apply(null,n)}},or=y,ur=function(e){return or.isObject(e)&&e.isAxiosError===!0},Re=y,cr=Ae,L=nr,lr=je,fr=ue;function Ie(r){var e=new L(r),t=cr(L.prototype.request,e);return Re.extend(t,L.prototype,e),Re.extend(t,e),t.create=function(s){return Ie(lr(r,s))},t}var b=Ie(fr);b.Axios=L;b.CanceledError=q;b.CancelToken=ar;b.isCancel=Ue;b.VERSION=ke.version;b.toFormData=_e;b.AxiosError=P;b.Cancel=b.CanceledError;b.all=function(e){return Promise.all(e)};b.spread=ir;b.isAxiosError=ur;re.exports=b;re.exports.default=b;var d=re.exports,V={exports:{}},dr={},hr=Object.freeze(Object.defineProperty({__proto__:null,default:dr},Symbol.toStringTag,{value:"Module"})),le=Ge(hr);const pr=le,Me=le,mr=le,vr=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function yr(r){const e={};let t=r.toString();t=t.replace(/\r\n?/mg,`
`);let n;for(;(n=vr.exec(t))!=null;){const s=n[1];let a=n[2]||"";a=a.trim();const o=a[0];a=a.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(a=a.replace(/\\n/g,`
`),a=a.replace(/\\r/g,"\r")),e[s]=a}return e}function Z(r){console.log(`[dotenv][DEBUG] ${r}`)}function br(r){return r[0]==="~"?Me.join(mr.homedir(),r.slice(1)):r}function Er(r){let e=Me.resolve(process.cwd(),".env"),t="utf8";const n=Boolean(r&&r.debug),s=Boolean(r&&r.override);r&&(r.path!=null&&(e=br(r.path)),r.encoding!=null&&(t=r.encoding));try{const a=G.parse(pr.readFileSync(e,{encoding:t}));return Object.keys(a).forEach(function(o){Object.prototype.hasOwnProperty.call(process.env,o)?(s===!0&&(process.env[o]=a[o]),n&&Z(s===!0?`"${o}" is already defined in \`process.env\` and WAS overwritten`:`"${o}" is already defined in \`process.env\` and was NOT overwritten`)):process.env[o]=a[o]}),{parsed:a}}catch(a){return n&&Z(`Failed to load ${e} ${a.message}`),{error:a}}}const G={config:Er,parse:yr};V.exports.config=G.config;V.exports.parse=G.parse;V.exports=G;const j={};({}).DOTENV_CONFIG_ENCODING!=null&&(j.encoding={}.DOTENV_CONFIG_ENCODING);({}).DOTENV_CONFIG_PATH!=null&&(j.path={}.DOTENV_CONFIG_PATH);({}).DOTENV_CONFIG_DEBUG!=null&&(j.debug={}.DOTENV_CONFIG_DEBUG);({}).DOTENV_CONFIG_OVERRIDE!=null&&(j.override={}.DOTENV_CONFIG_OVERRIDE);var wr=j;const gr=/^dotenv_config_(encoding|path|debug|override)=(.+)$/;var Or=function(e){return e.reduce(function(t,n){const s=n.match(gr);return s&&(t[s[1]]=s[2]),t},{})};(function(){V.exports.config(Object.assign({},wr,Or(process.argv)))})();class U{constructor(){S(this,"time");S(this,"description");S(this,"duration");S(this,"id");S(this,"client");S(this,"blocktype");this.time=0,this.description="",this.duration=1,this.id=null,this.client="",this.blocktype=null}}const qe={}.PORT||5e3;console.log("port is "+qe);const h=`http://localhost:${qe}/api`;class Ar{static async createUser(e){try{return await d.post(h+"/user",{user:e})}catch{}}static async updateUser(e){try{return await d.put(h+`/user/${e.id}`,{user:e})}catch{}}static async registerUser(e){try{return await d.post(h+"/user/register",{user:e})}catch{}}static async getRandUser(){try{return await d.get("https://randomuser.me/api")}catch{}}static async login(e,t){try{return await d.post(h+"/user/login",{email:e,password:t})}catch{}}static async changePassword(e,t,n){try{return await d.put(h+`/user/${e}/changepassword`,{oldPassword:t,newPassword:n})}catch{}}static async getUsers(){try{return await d.get(h+"/users")}catch{}}static async getOneUser(e){try{return await d.get(h+`/user/${e}`)}catch{}}static async getRandomPassword(e){try{return await d.get(`https://random.justyy.workers.dev/api/random/?cached&n=${e}`)}catch{}}static async getJobStages(){try{return await d.get(h+"/jobstage")}catch(e){console.log(e)}}static async registerVehicle(e,t){try{return await d.post(h+`/user/${e}/vehicle`,{vehicle:t})}catch{}}static async makeAppointment(e,t){try{return await d.post(h+`/user/${e}/appointmentbooking`,{appointment:t})}catch{}}static async getAppointment(e){try{return await d.get(h+`/appointment/${e}`)}catch{}}static async fulfillAppointment(e){try{return await d.post(h+`/appointment/${e}`)}catch{}}static async getAllJobs(){try{return await d.get(h+"/jobs/all")}catch{}}static async getUpcomingJobs(){try{return await d.get(h+"/jobs/upcoming")}catch{}}static async getJob(e){try{return await d.get(h+`/job/${e}`)}catch{}}static async getJobRequests(e){try{return await d.get(h+`/user/${e}/jobrequests`)}catch{}}static async getCustomers(){try{return await d.get(h+"/customs")}catch(e){console.log(e.response)}}static async getMechanics(){try{return await d.get(h+"/mechanics")}catch(e){console.log(e.response)}}static async createJob(e){try{return await d.post(h+"/jobs",{job:e})}catch{}}static async updateJob(e){try{return await d.put(h+`/job/${e.jobNumber}`,{job:e})}catch{}}static async getAppointments(){try{return await d.get(h+"/appointments")}catch{}}static async updateAppointment(e){try{return await d.put(h+`/appointment/${e.id}`,{appointment:e})}catch(t){console.log(t)}}static async getMonthSchedule(e,t=0){const n={month:e,workingDays:[]};try{let s=function(f,i,l){if(!(l>=17||f.hourBlocks.length>9)){if(f.hourBlocks[i]===void 0){for(let m=l;m<17;m++){let p=new U;p.time=m,p.duration=1,f.hourBlocks.splice(i++,0,p)}return}if(f.hourBlocks[i].time===l)l=f.hourBlocks[i].time+f.hourBlocks[i].duration,i++;else{for(let m=l;m<f.hourBlocks[i].time;m++){let p=new U;p.time=m,p.duration=1,f.hourBlocks.splice(i++,0,p)}l=f.hourBlocks[i].time+f.hourBlocks[i].duration,i++}s(f,i,l)}};const a=await d.get(h+`/user/${t}/schedule/${Date.now()}-${e}`);let o=0;switch(e){case 0:o=31;break;case 1:new Date(Date()).getFullYear()%4===0?o=29:o=28;break;case 2:o=31;break;case 3:o=30;break;case 4:o=31;break;case 5:o=30;break;case 6:o=31;break;case 7:o=31;break;case 8:o=30;break;case 9:o=31;break;case 10:o=30;break;case 11:o=31;break;default:if(typeof e!="number")throw new TypeError("Type of Month must be a number");if(e>=12)throw new RangeError("Value of Month must be less than or equal to 11");break}const u=new Date(Date.now());u.setHours(0),u.setMinutes(0),u.setSeconds(0),u.setMilliseconds(0),u.getMonth()===e||(u.setDate(1),u.setMonth(e));for(let f=u.getDate();f<=o;f++){if(u.setDate(f),u.getDay()===6)continue;if(u.getDay()===0)continue;let i={};i.day=f===1?f:u.getDate(),n.workingDays.push(i)}n.workingDays.forEach(f=>{f.hourBlocks=[]});let c=0;return console.log(n),n.workingDays.forEach(f=>{do{if(a.data[c]===void 0)break;const i=new Date(Date.parse(a.data[c].date));if(console.log(i),i.getDay()===0||i.getDay()===6){c++;continue}if(f.day==i.getDate()){if(a.data[c].jobStage!==null){let l=new U;l.blocktype="JOBSTAGE",l.id=a.data[c].id,l.client=a.data[c].jobStage.job.vehicle.owner.firstName+" "+a.data[c].jobStage.job.vehicle.owner.lastName,l.duration=a.data[c].jobStage.duration,l.time=i.getHours(),l.description=a.data[c].jobStage.description,f.hourBlocks.push(l)}else{let l=new U;l.blocktype="APPOINTMENT",l.id=a.data[c].id,l.client=a.data[c].appointment.customer.firstName+" "+a.data[c].appointment.customer.lastName,l.duration=1,l.time=i.getHours(),l.description=a.data[c].appointment.problemDescription,f.hourBlocks.push(l)}c++}else{if(i.getDate()>f.day)break;c++}}while(!0)}),console.log(n),n.workingDays.forEach(f=>{if(f.hourBlocks.length===0)for(let i=8;i<17;i++){let l=new U;l.time=i,l.duration=1,f.hourBlocks.push(l)}else f.hourBlocks.sort((m,p)=>m.time!=null&&p.time!=null?m.time-p.time:-1),s(f,0,8)}),n}catch(s){throw new Error(s)}}static async getUserVehicles(e){try{return await d.get(h+`/user/${e}/vehicle`)}catch(t){console.log(t)}}static async updateUserVehicle(e,t){try{return await d.put(h+`/user/${e}/vehicle`,{vehicle:t})}catch(n){console.log(n)}}static async deleteVehicle(e){try{return await d.delete(h+`/user/${e}/vehicle`)}catch(t){console.log(t)}}static async getActiveJobsForMechanic(e){try{return await d.get(h+`/user/${e}/activejobs`)}catch(t){console.log(t)}}static async writeJobStageToDatabase(e){try{return await d.post(h+"/user/jobstage/create",e)}catch(t){console.log(t)}}static async getShortAppointmentInformation(e){try{return await d.get(h+`/appointments/short/${e}`)}catch(t){console.log(t)}}static async getShortJobStageInformation(e){try{return await d.get(h+`/jobstage/short/${e}`)}catch(t){console.log(t)}}static async getFullJobInformation(e){try{return await d.get(h+`/jobs/${e}/fulljob`)}catch(t){console.log(t)}}static async imageUpload(e,t){try{let n=new FormData;return n.append("image",t),n.append("name",e),d.post("https://api.imgbb.com/1/upload?&key=1a9b57b4a75755ca7918b790b76e5c4e",n,{headers:{"Content-Type":"multipart/form-data"}}).then(a=>a.data)}catch(n){console.log(n)}}}export{Ar as B};