(this["webpackJsonpreact-fabricjs-whiteboard"]=this["webpackJsonpreact-fabricjs-whiteboard"]||[]).push([[0],{23:function(e,t,n){e.exports={fileContainer:"PdfReader_fileContainer__2gJs-",pageInfo:"PdfReader_pageInfo__27lCr"}},33:function(e,t,n){e.exports={whiteboard:"Whiteboard_whiteboard__34LM6",toolbar:"Whiteboard_toolbar__34zob"}},37:function(e,t){},39:function(e,t,n){e.exports={app:"app_app__3mk8F"}},45:function(e,t,n){},50:function(e,t){},51:function(e,t){},52:function(e,t){},54:function(e,t){},55:function(e,t){},56:function(e,t){},57:function(e,t){},58:function(e,t){},61:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(38),c=n.n(o),u=n(32),i=n(14),a=n(13),s=n(35),l=n(34),f=n(23),d=n.n(f),b=n(5);l.a.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(l.a.version,"/pdf.worker.js");var j,p,h=function(e){var t=e.fileReaderInfo,n=e.updateFileReaderInfo,r=function(e){n({currentPageNumber:t.currentPageNumber+e})};return Object(b.jsxs)("div",{className:d.a.pdfReader,children:[Object(b.jsx)("div",{className:d.a.fileContainer,children:Object(b.jsx)(s.a,{className:d.a.document,file:t.file,onLoadSuccess:function(e){var t=e.numPages;n({totalPages:t})},onLoadProgress:function(e){var t=e.loaded,n=e.total;return console.log("Loading a document: "+t/n*100+"%")},children:Object(b.jsx)(s.b,{className:"import-pdf-page",onRenderSuccess:function(){var e=document.querySelector(".import-pdf-page canvas").toDataURL();n({currentPage:e})},pageNumber:t.currentPageNumber})})}),Object(b.jsxs)("div",{className:d.a.pageInfo,children:[Object(b.jsxs)("span",{children:["Page ",t.currentPageNumber," of ",t.totalPages||"--"]}),Object(b.jsx)("button",{type:"button",disabled:t.currentPageNumber<=1,onClick:function(){return r(-1)},children:"Previous"}),Object(b.jsx)("button",{type:"button",disabled:t.currentPageNumber>=t.totalPages,onClick:function(){return r(1)},children:"Next"})]})]})},m=n(40),g=n(33),O=n.n(g),v=null,x=!1,C={currentMode:"",currentColor:"#000000",currentWidth:5,fill:!1,group:{}},w={RECTANGLE:"RECTANGLE",TRIANGLE:"TRIANGLE",ELLIPSE:"ELLIPSE",LINE:"LINE",PENCIL:"PENCIL",ERASER:"ERASER"},E=function(e){return function(t){var n=t.e;x=!0;var r=e.getPointer(n);v=new a.fabric.Line([r.x,r.y,r.x,r.y],{strokeWidth:C.currentWidth,stroke:C.currentColor,selectable:!1}),e.add(v),e.requestRenderAll()}},y=function(e){return function(t){var n=t.e;if(x){var r=e.getPointer(n);v.set({x2:r.x,y2:r.y}),v.setCoords(),e.requestRenderAll()}}},P=function(){x=!1},R=function(e){return function(t){var n=t.e;x=!0;var r=e.getPointer(n);j=r.x,p=r.y,v=new a.fabric.Rect({stroke:C.currentColor,strokeWidth:C.currentWidth,fill:C.fill?C.currentColor:"transparent",left:j,top:p,width:0,height:0,selectable:!1}),e.add(v),v.on("mousedown",(function(t){C.currentMode===w.ERASER&&(console.log("\u522a\u9664",t),e.remove(t.target))}))}},N=function(e){return function(t){var n=t.e;if(x){var r=e.getPointer(n);r.x<j&&v.set("left",r.x),r.y<p&&v.set("top",r.y),v.set({width:Math.abs(r.x-j),height:Math.abs(r.y-p)}),v.setCoords(),e.renderAll()}}},A=function(){x=!1},L=function(e){return function(t){var n=t.e;x=!0;var r=e.getPointer(n);j=r.x,p=r.y,v=new a.fabric.Ellipse({stroke:C.currentColor,strokeWidth:C.currentWidth,fill:C.fill?C.currentColor:"transparent",left:j,top:p,cornerSize:7,objectCaching:!1,selectable:!1}),e.add(v)}},k=function(e){return function(t){var n=t.e;if(x){var r=e.getPointer(n);r.x<j&&v.set("left",r.x),r.y<p&&v.set("top",r.y),v.set({rx:Math.abs(r.x-j)/2,ry:Math.abs(r.y-p)/2}),v.setCoords(),e.renderAll()}}},I=function(){x=!1},M=function(e){return function(t){var n=t.e;x=!0,C.currentMode=w.TRIANGLE;var r=e.getPointer(n);j=r.x,p=r.y,v=new a.fabric.Triangle({stroke:C.currentColor,strokeWidth:C.currentWidth,fill:C.fill?C.currentColor:"transparent",left:j,top:p,width:0,height:0,selectable:!1}),e.add(v)}},S=function(e){return function(t){var n=t.e;if(x){var r=e.getPointer(n);r.x<j&&v.set("left",r.x),r.y<p&&v.set("top",r.y),v.set({width:Math.abs(r.x-j),height:Math.abs(r.y-p)}),v.setCoords(),e.renderAll()}}},D=function(){x=!1},W=function(){var e=Object(r.useState)(null),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(null),s=Object(i.a)(c,2),l=s[0],f=(s[1],Object(r.useState)(5)),d=Object(i.a)(f,2),j=d[0],p=d[1],g=Object(r.useState)(!1),v=Object(i.a)(g,2),x=v[0],W=v[1],_=Object(r.useState)({file:"",totalPages:null,currentPageNumber:1,currentPage:""}),T=Object(i.a)(_,2),B=T[0],F=T[1],J=Object(r.useRef)(null),G=(Object(r.useRef)(null),Object(r.useRef)(null)),q=Object(r.useRef)(null);Object(r.useEffect)((function(){o((function(){return function(){var e=new a.fabric.Canvas("canvas",{height:600,width:800});return a.fabric.Object.prototype.transparentCorners=!1,a.fabric.Object.prototype.cornerStyle="circle",a.fabric.Object.prototype.borderColor="#4447A9",a.fabric.Object.prototype.cornerColor="#4447A9",a.fabric.Object.prototype.cornerSize=6,a.fabric.Object.prototype.padding=10,a.fabric.Object.prototype.borderDashArray=[5,5],e}()}))}),[]),Object(r.useEffect)((function(){if(n){var e=n.getCenter();a.fabric.Image.fromURL(B.currentPage,(function(t){t.scaleToHeight(n.height),n.setBackgroundImage(t,n.renderAll.bind(n),{top:e.top,left:e.left,originX:"center",originY:"center"}),n.renderAll()}))}}),[B.currentPage]),Object(r.useEffect)((function(){n&&(U(n),n.loadFromJSON(l),n.renderAll())}),[n]);var U=function(e){e.on("mouse:up",(function(t){JSON.stringify(e.toJSON())}))},z=function(e){F(Object(u.a)(Object(u.a)({},B),e))};return Object(b.jsxs)("div",{className:O.a.whiteboard,children:[Object(b.jsxs)("div",{className:O.a.toolbar,children:[Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){w.currentMode!==w.LINE&&(C.currentMode=w.LINE,e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.on("mouse:down",E(e)),e.on("mouse:move",y(e)),e.on("mouse:up",P),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}(n)},children:"Line"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){C.currentMode!==w.RECTANGLE&&(C.currentMode=w.RECTANGLE,e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.on("mouse:down",R(e)),e.on("mouse:move",N(e)),e.on("mouse:up",A),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}(n)},children:"Rectangle"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){C.currentMode!==w.ELLIPSE&&(C.currentMode=w.ELLIPSE,e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.on("mouse:down",L(e)),e.on("mouse:move",k(e)),e.on("mouse:up",I),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}(n)},children:"Ellipse"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.on("mouse:down",M(e)),e.on("mouse:move",S(e)),e.on("mouse:up",D),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll()}(n)},children:"Triangle"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){C.currentMode!==w.PENCIL&&(e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),C.currentMode=w.PENCIL,e.freeDrawingBrush=new a.fabric.PencilBrush(e),e.freeDrawingBrush.width=parseInt(C.currentWidth,10)||1,e.isDrawingMode=!0)}(n)},children:"Pencil"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.isDrawingMode=!1;var t=new a.fabric.Textbox("text",{left:100,top:100,fill:C.currentColor,editable:!0});e.add(t),e.renderAll()}(n)},children:"Text"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){C.currentMode="",e.isDrawingMode=!1,e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),e.getObjects().map((function(e){return e.set({selectable:!0})})),e.hoverCursor="all-scroll"}(n)},children:"Selection mode"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){C.currentMode!==w.ERASER&&(e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up"),C.currentMode=w.ERASER,e.freeDrawingBrush=new a.fabric.EraserBrush(e),e.freeDrawingBrush.width=C.currentWidth,e.isDrawingMode=!0)}(n)},children:"Eraser"}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){e.getObjects().forEach((function(t){t!==e.backgroundImage&&e.remove(t)}))}(n)},children:"Delete"}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{type:"checkbox",name:"fill",id:"fill",checked:x,onChange:function(e){C.fill=e.target.checked,W((function(){return e.target.checked}))}}),Object(b.jsx)("label",{htmlFor:"fill",children:"fill"})]}),Object(b.jsx)("div",{children:Object(b.jsx)("input",{type:"color",name:"color",id:"color",onChange:function(e){C.currentColor=e.target.value,n.freeDrawingBrush.color=e.target.value}})}),Object(b.jsx)("input",{type:"range",min:1,max:20,step:1,value:j,onChange:function(e){var t=parseInt(e.target.value);C.currentWidth=t,n.freeDrawingBrush.width=t,p((function(){return t}))}}),Object(b.jsxs)("div",{className:"uploadInput",children:[Object(b.jsx)("label",{htmlFor:"uploadImage",children:"+Image"}),Object(b.jsx)("input",{ref:G,accept:"image/*",type:"file",onChange:function(e){var t=new FileReader,r=e.target.files[0];t.addEventListener("load",(function(){a.fabric.Image.fromURL(t.result,(function(e){e.scaleToHeight(n.height),n.add(e)}))})),t.readAsDataURL(r)}})]}),Object(b.jsxs)("div",{className:"uploadInput",children:[Object(b.jsx)("label",{htmlFor:"uploadPDF",children:"+PDF"}),Object(b.jsx)("input",{ref:q,accept:".pdf",type:"file",onChange:function(e){z({file:e.target.files[0],currentPageNumber:1})}})]}),Object(b.jsx)("button",{onClick:function(){return function(e){alert(JSON.stringify(e.toJSON()))}(n)},children:"To Json"}),Object(b.jsx)("button",{onClick:function(){J.current.toBlob((function(e){Object(m.saveAs)(e,"image.png")}))},children:"save as image"})]}),Object(b.jsx)("canvas",{ref:J,id:"canvas"}),Object(b.jsx)("div",{children:Object(b.jsx)(h,{fileReaderInfo:B,updateFileReaderInfo:z})})]})},_=function(){return Object(b.jsx)(W,{})},T=n(39),B=n.n(T),F=function(){return Object(b.jsx)("div",{className:B.a.app,children:Object(b.jsx)(_,{})})};n(45);c.a.render(Object(b.jsx)(F,{}),document.getElementById("root"))}},[[61,1,2]]]);