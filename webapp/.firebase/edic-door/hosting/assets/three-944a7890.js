import{Y as d,r as l,j as e,Z as m,i as h,T as b,W as f}from"./index-b21141a2.js";import{s as p}from"./ApiKeyRepo-64196767.js";import{T as a}from"./TextField-c96afb7e.js";import{B as v}from"./Button-4e9fbf2f.js";import"./isMuiElement-dd8295d7.js";const o={name:"",description:"",lastCalled:null};function D(){const u=d(),[t,i]=l.useState(o),[r,n]=l.useState(""),c=()=>{if(!t.name||!t.description||!r){alert("Please fill in all fields");return}p(r,t).then(()=>{alert("Device added successfully"),i(o),n("")}).catch(console.warn)};return e.jsxDEV(m,{maxWidth:u.themeStretch?!1:"xl",children:e.jsxDEV(h,{sx:{padding:4},children:[e.jsxDEV(b,{variant:"h4",gutterBottom:!0,children:"Add Device"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:46,columnNumber:9},this),e.jsxDEV(a,{fullWidth:!0,label:"Device ID",value:r,onChange:s=>n(s.target.value),margin:"normal"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:49,columnNumber:9},this),e.jsxDEV(a,{fullWidth:!0,label:"Name",value:t.name,onChange:s=>i({...t,name:s.target.value}),margin:"normal"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:56,columnNumber:9},this),e.jsxDEV(a,{fullWidth:!0,label:"Description",value:t.description,onChange:s=>i({...t,description:s.target.value}),margin:"normal"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:63,columnNumber:9},this),e.jsxDEV(v,{variant:"contained",color:"primary",onClick:c,children:"Add Device"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:70,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:45,columnNumber:7},this)},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/sections/three/view.tsx",lineNumber:44,columnNumber:5},this)}function j(){return e.jsxDEV(e.Fragment,{children:[e.jsxDEV(f,{children:e.jsxDEV("title",{children:" Dashboard: Add Devices"},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/pages/dashboard/three.tsx",lineNumber:11,columnNumber:9},this)},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/pages/dashboard/three.tsx",lineNumber:10,columnNumber:7},this),e.jsxDEV(D,{},void 0,!1,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/pages/dashboard/three.tsx",lineNumber:14,columnNumber:7},this)]},void 0,!0,{fileName:"/Users/tanelden/Documents/GitHub/liftauth/edic-door/webapp/src/pages/dashboard/three.tsx",lineNumber:9,columnNumber:5},this)}export{j as default};