import{d as v,n as E,f as h,h as I,x as C,r as P,o as i,c as u,a as e,t as F,y as M,w as m,p as c,j as l,l as f,m as b,q as g,b as B,z as R,A as N}from"./index.09770567.js";import{B as S}from"./BackendService.8198c897.js";import{V as x}from"./Validation.efea6428.js";const A={class:"flex items-center justify-center bg-gray-100"},q={class:"px-4 py-4 mx-4 mt-4 text-left bg-white shadow-lg w-6/12"},L={class:"text-xl font-bold text-center my-4"},$={class:"flex flex-col space-y-4"},j=e("label",{class:"block",for:"first_name"},"First Name",-1),z=e("label",{class:"block",for:"last_name"},"Last Name",-1),D=e("label",{class:"block",for:"email"},"Email ",-1),T=e("label",{class:"block",for:"phone_number"},"Phone Number ",-1),G=e("label",{class:"block"},"Password ",-1),H=e("label",{class:"block"}," Confirm Password",-1),J={class:"mt-6 text-grey-dark"},K=N(" Already have an account? "),O=N(" Log in "),Y=v({__name:"RegisterForm",props:{header:String},emits:["registered"],setup(w,{emit:y}){const _=w;v({name:"RegisterForm"});const t=E();let n=h(""),p=h(""),r=I(()=>({firstNameEntered:!x.isEmpty(t.User.firstName),lastNameEntered:!x.isEmpty(t.User.lastName),emailIsValid:x.validEmail(t.User.email),passwordIsMatch:n.value===p.value,phoneNumberValid:x.validPhoneNumber(t.User.phoneNumber)}));const d=h(!1);function U(){return r.value.emailIsValid&&r.value.firstNameEntered&&r.value.lastNameEntered&&r.value.passwordIsMatch}async function k(){if(U()){t.changeAttr("password",n.value);const o=await S.registerUser(t.User);if(console.log(o==null?void 0:o.data),o!=null&&o.data.registered){const s=o==null?void 0:o.data.createdUser.id;y("registered",s)}}else d.value=!0}return C(()=>{t.$reset()}),(o,s)=>{const V=P("router-link");return i(),u("div",A,[e("div",q,[e("h3",L,F(_.header),1),e("form",{onSubmit:s[6]||(s[6]=M(()=>{},["prevent"]))},[e("div",$,[e("div",null,[j,m(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=a=>l(t).User.firstName=a),id:"first_name",name:"firstName",placeholder:"First Name",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(t).User.firstName]]),d.value?(i(),u("span",{key:0,class:f(`text-xs text-red-400 px-2 ${l(r).firstNameEntered?"hidden":"block"}`)},"First Name is Required",2)):b("",!0)]),e("div",null,[z,m(e("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=a=>l(t).User.lastName=a),id:"last_name",name:"lastName",placeholder:"Name",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(t).User.lastName]]),d.value?(i(),u("span",{key:0,class:f(`text-xs text-red-400 px-2 ${l(r).lastNameEntered?"hidden":"block"}`)},"Last Name is Required",2)):b("",!0)]),e("div",null,[D,m(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=a=>l(t).User.email=a),id:"email",name:"email",placeholder:"Email",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(t).User.email]]),d.value?(i(),u("span",{key:0,class:f(`text-xs text-red-400 px-2 ${l(r).emailIsValid?"hidden":"block"}`)},"*Invalid Email",2)):b("",!0)]),e("div",null,[T,m(e("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=a=>l(t).User.phoneNumber=a),id:"phone_number",name:"phoneNumber",placeholder:"Phone Number",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(t).User.phoneNumber]]),d.value?(i(),u("span",{key:0,class:f(`text-xs text-red-400 px-2 ${l(r).phoneNumberValid?"hidden":"block"}`)},"Phone Number Format Invalid",2)):b("",!0)]),e("div",null,[G,m(e("input",{type:"password","onUpdate:modelValue":s[4]||(s[4]=a=>g(n)?n.value=a:n=a),placeholder:"Password",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(n)]])]),e("div",null,[H,m(e("input",{type:"password","onUpdate:modelValue":s[5]||(s[5]=a=>g(p)?p.value=a:p=a),placeholder:"Password",class:"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"},null,512),[[c,l(p)]]),d.value?(i(),u("span",{key:0,class:f([l(r).passwordIsMatch?"hidden":"block","text-xs","text-red-400"])},"Password must be same!",2)):b("",!0)])]),e("div",{class:"flex"},[e("button",{onClick:k,class:"w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"},"Create Account")]),e("div",J,[K,B(V,{to:"/login",class:"text-blue-600 hover:underline"},{default:R(()=>[O]),_:1})])],32)])])}}});export{Y as _};