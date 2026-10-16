var Xy=Object.defineProperty;var Yy=(Et,zt,Sr)=>zt in Et?Xy(Et,zt,{enumerable:!0,configurable:!0,writable:!0,value:Sr}):Et[zt]=Sr;var ys=(Et,zt,Sr)=>Yy(Et,typeof zt!="symbol"?zt+"":zt,Sr);(function(){"use strict";/*!
 * ONNX Runtime Web v1.24.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Et=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Sr=Object.getOwnPropertyNames,Em=Object.prototype.hasOwnProperty,zm=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),W=(e,t)=>()=>(e&&(t=e(e=0)),t),Tr=(e,t)=>{for(var r in t)Et(e,r,{get:t[r],enumerable:!0})},Cm=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Sr(t))!Em.call(e,i)&&i!==r&&Et(e,i,{get:()=>t[i],enumerable:!(n=zt(t,i))||n.enumerable});return e},Nr=e=>Cm(Et({},"__esModule",{value:!0}),e),Br,Pt,ir,ws,bs,$s=W(()=>{Br=new Map,Pt=[],ir=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=Br.get(e);if(n===void 0)Br.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let i=Pt.indexOf(e);i!==-1&&Pt.splice(i,1);for(let a=0;a<Pt.length;a++)if(Br.get(Pt[a]).priority<=r){Pt.splice(a,0,e);return}Pt.push(e)}return}throw new TypeError("not a valid backend")},ws=async e=>{let t=Br.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},bs=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?Pt:r,i,a=[],s=new Set;for(let l of n){let d=await ws(l);typeof d=="string"?a.push({name:l,err:d}):(i||(i=d),i===d&&s.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,d)=>d==="executionProviders"?u:Reflect.get(l,d)})]}}),Am=W(()=>{$s()}),vs,Om=W(()=>{vs="1.24.1"}),ei,Be,xs=W(()=>{Om(),ei="warning",Be={wasm:{},webgl:{},webgpu:{},versions:{common:vs},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ei=e}},get logLevel(){return ei}},Object.defineProperty(Be,"logLevel",{enumerable:!0})}),ke,Mm=W(()=>{xs(),ke=Be}),ks,Ss,Rm=W(()=>{ks=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let p=a*i,h=0,m=p,_=p*2,y=-1;s==="RGBA"?(h=0,m=p,_=p*2,y=p*3):s==="RGB"?(h=0,m=p,_=p*2):s==="RBG"&&(h=0,_=p,m=p*2);for(let w=0;w<a;w++)for(let k=0;k<i;k++){let v=(e.data[h++]-d[0])*l[0],b=(e.data[m++]-d[1])*l[1],T=(e.data[_++]-d[2])*l[2],S=y===-1?255:(e.data[y++]-d[3])*l[3];n.fillStyle="rgba("+v+","+b+","+T+","+S+")",n.fillRect(k,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ss=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let i,a,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],s=e.dims[3]):(i=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let h=a*i;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,_=0,y=1,w=2,k=3,v=0,b=h,T=h*2,S=-1;u==="RGBA"?(v=0,b=h,T=h*2,S=h*3):u==="RGB"?(v=0,b=h,T=h*2):u==="RBG"&&(v=0,T=h,b=h*2),n=r.createImageData(i,a);for(let E=0;E<a*i;_+=m,y+=m,w+=m,k+=m,E++)n.data[_]=(e.data[v++]-p[0])*d[0],n.data[y]=(e.data[b++]-p[1])*d[1],n.data[w]=(e.data[T++]-p[2])*d[2],n.data[k]=S===-1?255:(e.data[S++]-p[3])*d[3]}else throw new Error("Can not access image data");return n}}),pn,Ts,Is,Es,zs,Cs,Nm=W(()=>{ri(),pn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,i=t.norm??{mean:255,bias:0},a,s;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?s=[i.bias,i.bias,i.bias,i.bias]:s=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*n,p=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),h=4,m=0,_=1,y=2,w=3,k=0,v=d,b=d*2,T=-1;u==="RGB"&&(h=3,m=0,_=1,y=2,w=-1),l==="RGBA"?T=d*3:l==="RBG"?(k=0,b=d,v=d*2):l==="BGR"&&(b=0,v=d,k=d*2);for(let S=0;S<d;S++,m+=h,y+=h,_+=h,w+=h)p[k++]=(e[m]+s[0])/a[0],p[v++]=(e[_]+s[1])/a[1],p[b++]=(e[y]+s[2])/a[2],T!==-1&&w!==-1&&(p[T++]=(e[w]+s[3])/a[3]);return l==="RGBA"?new Ze("float32",p,[1,4,r,n]):new Ze("float32",p,[1,3,r,n])},Ts=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=l();p.width=e.width,p.height=e.height;let h=d(p);if(h!=null){let m=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=_}else u.tensorFormat="RGBA",u.height=m,u.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,m).data}else throw new Error("Can not access image data")}else if(n){let p,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,h=t.resizedWidth):(p=e.height,h=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=p,u.width=h,t!==void 0){let m=l();m.width=h,m.height=p;let _=d(m);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,p).data;else throw new Error("Can not access image data")}else s=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=l();p.width=e.width,p.height=e.height;let h=d(p);if(h!=null){let m=e.height,_=e.width;return h.drawImage(e,0,0,_,m),s=h.getImageData(0,0,_,m).data,u.height=m,u.width=_,pn(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((p,h)=>{let m=l(),_=d(m);if(!e||!_)return h();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{m.width=y.width,m.height=y.height,_.drawImage(y,0,0,m.width,m.height);let w=_.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,p(pn(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return pn(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Is=(e,t)=>{let{width:r,height:n,download:i,dispose:a}=t,s=[1,n,r,4];return new Ze({location:"texture",type:"float32",texture:e,dims:s,download:i,dispose:a})},Es=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:a}=t;return new Ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:a})},zs=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:a}=t;return new Ze({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:a})},Cs=(e,t,r)=>new Ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),ar,Dr,ti,As,Bm=W(()=>{ar=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Dr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ti=!1,As=()=>{if(!ti){ti=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(ar.set("int64",BigInt64Array),Dr.set(BigInt64Array,"int64")),t&&(ar.set("uint64",BigUint64Array),Dr.set(BigUint64Array,"uint64")),n?(ar.set("float16",r),Dr.set(r,"float16")):ar.set("float16",Uint16Array)}}}),Os,Ms,Dm=W(()=>{ri(),Os=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Ms=(e,t)=>{switch(e.location){case"cpu":return new Ze(e.type,e.data,t);case"cpu-pinned":return new Ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ze({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ze,ri=W(()=>{Rm(),Nm(),Bm(),Dm(),Ze=class{constructor(e,t,r){As();let n,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=ar.get(n);if(!s)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint64"&&n!=="int8"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(n=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=ar.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${n} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")n="string",s=e;else if(l==="boolean")n="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",s=Uint8Array.from(e);else{let l=Dr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Os(i);if(this.cpuData&&a!==this.cpuData.length&&!((n==="uint4"||n==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=a}static async fromImage(e,t){return Ts(e,t)}static fromTexture(e,t){return Is(e,t)}static fromGpuBuffer(e,t){return Es(e,t)}static fromMLTensor(e,t){return zs(e,t)}static fromPinnedBuffer(e,t,r){return Cs(e,t,r)}toDataURL(e){return ks(this,e)}toImageData(e){return Ss(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ms(this,e)}}}),st,Rs=W(()=>{ri(),st=Ze}),Pr,ni,ot,et,Ut,Lt,Ns=W(()=>{xs(),Pr=(e,t)=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeStamp(`${e}::ORT::${t}`)},ni=(e,t)=>{var i;let r=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],n=!1;for(let a=0;a<r.length;a++){if(n&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Pr("CPU",s);return}r[a].includes("TRACE_FUNC")&&(n=!0)}},ot=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||ni("BEGIN",e)},et=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||ni("END",e)},Ut=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.time(`ORT::${e}`)},Lt=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeEnd(`ORT::${e}`)}}),Bs,Pm=W(()=>{$s(),Rs(),Ns(),Bs=class Tm{constructor(t){this.handler=t}async run(t,r,n){ot(),Ut("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof st||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof st)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);i[d]=null}if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,p=Object.getOwnPropertyNames(r);for(let h of this.outputNames)if(p.indexOf(h)!==-1){let m=r[h];(m===null||m instanceof st)&&(d=!0,s=!1,i[h]=m)}if(d){if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)i[d]=null;let u=await this.handler.run(t,i,a),l={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let p=u[d];p instanceof st?l[d]=p:l[d]=new st(p.type,p.data,p.dims)}return Lt("InferenceSession.run"),et(),l}async release(){return this.handler.dispose()}static async create(t,r,n,i){ot(),Ut("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,h=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(m=t.byteLength-h,typeof n=="number"){if(m=n,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||h+m>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-h}].`);if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(p,h,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await bs(s),d=await u.createInferenceSessionHandler(a,l);return Lt("InferenceSession.create"),et(),new Tm(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ii,Um=W(()=>{Pm(),ii=Bs}),Lm=W(()=>{}),Fm=W(()=>{}),Wm=W(()=>{}),qm=W(()=>{}),Ds={};Tr(Ds,{InferenceSession:()=>ii,TRACE:()=>Pr,TRACE_EVENT_BEGIN:()=>Ut,TRACE_EVENT_END:()=>Lt,TRACE_FUNC_BEGIN:()=>ot,TRACE_FUNC_END:()=>et,Tensor:()=>st,env:()=>ke,registerBackend:()=>ir});var tt=W(()=>{Am(),Mm(),Um(),Rs(),Lm(),Fm(),Ns(),Wm(),qm()}),ai=W(()=>{}),Ps={};Tr(Ps,{default:()=>Us});var si,oi,Us,Gm=W(()=>{var e;bh(),sr(),hi(),si="ort-wasm-proxy-worker",oi=((e=globalThis.self)==null?void 0:e.name)===si,oi&&(self.onmessage=t=>{let{type:r,in:n}=t.data;try{switch(r){case"init-wasm":gi(n.wasm).then(()=>{Ia(n).then(()=>{postMessage({type:r})},i=>{postMessage({type:r,err:i})})},i=>{postMessage({type:r,err:i})});break;case"init-ep":{let{epName:i,env:a}=n;Ea(a,i).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:i}=n,a=An(i);postMessage({type:r,out:a});break}case"create":{let{model:i,options:a}=n;Ca(i,a).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":Aa(n),postMessage({type:r});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:u,options:l}=n;Ma(i,a,s,u,new Array(u.length).fill(null),l).then(d=>{d.some(p=>p[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:d},Na([...s,...d]))},d=>{postMessage({type:r,err:d})});break}case"end-profiling":Ra(n),postMessage({type:r});break;default:}}catch(i){postMessage({type:r,err:i})}}),Us=oi?null:t=>new Worker(t??Xe,{type:"module",name:si})}),Ls={};Tr(Ls,{default:()=>Ws});async function Fs(e={}){var km,Sm;var t=e,r=!!globalThis.window,n=!!globalThis.WorkerGlobalScope,i=n&&((km=self.name)==null?void 0:km.startsWith("em-pthread"));t.mountExternalData=(o,c)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Zc||(t.Zc=new Map)).set(o,c)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let a=o=>async(...c)=>{var g;try{if(t.$c)throw Error("Session already started");let f=t.$c={Nd:c[0],errors:[]},x=await o(...c);if(t.$c!==f)throw Error("Session mismatch");(g=t.gd)==null||g.flush();let I=f.errors;if(0<I.length){let C=await Promise.all(I);if(C=C.filter(N=>N),0<C.length)throw Error(C.join(`
`))}return x}finally{t.$c=null}};t.jsepInit=(o,c)=>{if(o==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=c;let g=t.gd;t.jsepRegisterBuffer=(f,x,I,C)=>g.registerBuffer(f,x,I,C),t.jsepGetBuffer=f=>g.getBuffer(f),t.jsepCreateDownloader=(f,x,I)=>g.createDownloader(f,x,I),t.jsepOnCreateSession=f=>{g.onCreateSession(f)},t.jsepOnReleaseSession=f=>{g.onReleaseSession(f)},t.jsepOnRunStart=f=>g.onRunStart(f),t.Ld=(f,x)=>{g.upload(f,x)}}else if(o==="webnn"){let g=c[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=f=>g.onRunStart(f),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=f=>{g.onReleaseSession(f)},t.webnnCreateMLTensorDownloader=(f,x)=>g.createMLTensorDownloader(f,x),t.webnnRegisterMLTensor=(f,x,I,C)=>g.registerMLTensor(f,x,I,C),t.webnnCreateMLContext=f=>g.createMLContext(f),t.webnnRegisterMLConstant=(f,x,I,C,N,H)=>g.registerMLConstant(f,x,I,C,N,t.Zc,H),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let s=()=>{let o=c=>(...g)=>{let f=Tt;return g=c(...g),Tt!=f?new Promise((x,I)=>{as={resolve:x,reject:I}}):g};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=o(t[c])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var u,l,d=(o,c)=>{throw c},p=self.location.href,h="";if(r||n){try{h=new URL(".",p).href}catch{}n&&(l=o=>{var c=new XMLHttpRequest;return c.open("GET",o,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),u=async o=>{if(A(o))return new Promise((g,f)=>{var x=new XMLHttpRequest;x.open("GET",o,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?g(x.response):f(x.status)},x.onerror=f,x.send(null)});var c=await fetch(o,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var m,_,y,w,k,v,b=console.log.bind(console),T=console.error.bind(console),S=b,E=T,z=!1,A=o=>o.startsWith("file://");function $(){Ke.buffer!=D.buffer&&P()}if(i){let o=function(c){try{var g=c.data,f=g.Uc;if(f==="load"){let x=[];self.onmessage=I=>x.push(I),v=()=>{postMessage({Uc:"loaded"});for(let I of x)o(I);self.onmessage=o};for(let I of g.Ad)t[I]&&!t[I].proxy||(t[I]=(...C)=>{postMessage({Uc:"callHandler",zd:I,args:C})},I=="print"&&(S=t[I]),I=="printErr"&&(E=t[I]));Ke=g.Vd,P(),_=g.Wd,Ce(),Yn()}else if(f==="run"){(function(x){var I=($(),F)[x+52>>>2>>>0];x=($(),F)[x+56>>>2>>>0],Mf(I,I-x),ce(I)})(g.Tc),ds(g.Tc,0,0,1,0,0),en(),rs(g.Tc),M||(If(),M=!0);try{jt(g.Pd,g.dd)}catch(x){if(x!="unwind")throw x}}else g.target!=="setimmediate"&&(f==="checkMailbox"?M&&Vn():f&&(E(`worker: received unknown command ${f}`),E(g)))}catch(x){throw Ef(),x}};var M=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=o}var D,q,G,V,O,F,j,X,ne,L,ge,U=!1;function P(){var o=Ke.buffer;t.HEAP8=D=new Int8Array(o),G=new Int16Array(o),t.HEAPU8=q=new Uint8Array(o),V=new Uint16Array(o),t.HEAP32=O=new Int32Array(o),t.HEAPU32=F=new Uint32Array(o),j=new Float32Array(o),X=new Float64Array(o),ne=new BigInt64Array(o),L=new BigUint64Array(o)}function Q(){U=!0,i?v():Dt.tb()}function K(o){throw E(o="Aborted("+o+")"),z=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),k==null||k(o),o}function le(){return{a:{ma:cy,hb:dy,g:vt,J:rn,f:Pn,o:Un,h:ee,ha:_e,b:Ie,T:ue,Ia:it,n:mt,_:nn,Ya:Qt,Ea:an,Ga:Oe,Za:Je,Wa:kt,Pa:St,Va:Zt,ka:Xt,Fa:Yt,Ca:Jt,Xa:sn,Da:Ge,cb:Ln,ea:Ya,xa:Ja,va:r_,da:i_,O:a_,H:s_,wa:o_,Z:f_,ya:m_,Sa:g_,Aa:y_,Ja:w_,ta:b_,fa:$_,Ra:rs,$a:v_,R:T_,s:A_,c:es,ib:O_,y:M_,M:R_,D:N_,m:B_,t:df,jb:D_,I:P_,S:U_,j:L_,v:F_,r:W_,l:q_,Ma:G_,Na:V_,Oa:H_,Ka:ff,La:mf,ua:gf,eb:K_,bb:Z_,u:X_,aa:Y_,ga:J_,ab:Q_,V:ey,_a:ty,Ba:ry,F:j_,U:ny,la:Zn,za:ay,gb:iy,fb:sy,Ta:bf,Ua:$f,Ha:Fe,$:vf,ja:xf,Qa:kf,ia:Sf,lb:Ky,na:Fy,mb:jy,oa:Ly,G:Ay,d:my,q:hy,w:py,B:Sy,pb:Dy,K:Ey,x:_y,pa:Py,X:Wy,ba:By,nb:Hy,ob:Vy,ra:Oy,qa:Ny,qb:My,N:zy,Y:Uy,e:gy,A:yy,k:fy,kb:Qy,p:by,z:$y,C:wy,E:vy,L:Ty,rb:Cy,Q:qy,ca:Iy,W:Gy,sb:ky,sa:xy,P:Ry,i:uy,a:Ke,db:Le}}}async function Ce(){function o(f,x){var I=Dt=f.exports;f={};for(let[C,N]of Object.entries(I))typeof N=="function"?(I=x_(N),f[C]=I):f[C]=N;return Dt=f,Dt=function(){var C=Dt,N=Z=>de=>Z(de)>>>0,H=Z=>()=>Z()>>>0;return(C=Object.assign({},C)).ub=N(C.ub),C.Yb=H(C.Yb),C._b=N(C._b),C.mc=N(C.mc),C.nc=H(C.nc),C.rc=N(C.rc),C}(),br.push(Dt.$b),Tf=(f=Dt).ub,If=f.vb,t._OrtInit=f.wb,t._OrtGetLastError=f.xb,t._OrtCreateSessionOptions=f.yb,t._OrtAppendExecutionProvider=f.zb,t._OrtAddFreeDimensionOverride=f.Ab,t._OrtAddSessionConfigEntry=f.Bb,t._OrtReleaseSessionOptions=f.Cb,t._OrtCreateSession=f.Db,t._OrtReleaseSession=f.Eb,t._OrtGetInputOutputCount=f.Fb,t._OrtGetInputOutputMetadata=f.Gb,t._OrtFree=f.Hb,t._OrtCreateTensor=f.Ib,t._OrtGetTensorData=f.Jb,t._OrtReleaseTensor=f.Kb,t._OrtCreateRunOptions=f.Lb,t._OrtAddRunConfigEntry=f.Mb,t._OrtReleaseRunOptions=f.Nb,t._OrtCreateBinding=f.Ob,t._OrtBindInput=f.Pb,t._OrtBindOutput=f.Qb,t._OrtClearBoundOutputs=f.Rb,t._OrtReleaseBinding=f.Sb,t._OrtRunWithBinding=f.Tb,t._OrtRun=f.Ub,t._OrtEndProfiling=f.Vb,t._JsepOutput=f.Wb,t._JsepGetNodeName=f.Xb,Xn=f.Yb,It=t._free=f.Zb,ln=t._malloc=f._b,ds=f.bc,Ef=f.cc,zf=f.dc,Cf=f.ec,cs=f.fc,Af=f.gc,Of=f.hc,he=f.ic,dn=f.jc,Mf=f.kc,ce=f.lc,ps=f.mc,pe=f.nc,Rf=f.oc,hs=f.pc,Nf=f.qc,Bf=f.rc,Df=f.sc,fs=f.tc,Pf=f.uc,Uf=f.vc,Lf=f.wc,Ff=f.xc,Wf=f.yc,qf=f.zc,Gf=f.Ac,Vf=f.Bc,Hf=f.Cc,jf=f.Dc,Kf=f.Ec,Qf=f.Fc,Zf=f.Gc,Xf=f.Hc,Yf=f.Ic,Jf=f.Jc,em=f.Kc,tm=f.Lc,rm=f.Mc,nm=f.Nc,im=f.Oc,am=f.Pc,sm=f.Rc,om=f.Sc,um=f.bd,lm=f.cd,dm=f.hd,cm=f.kd,pm=f.ld,hm=f.md,fm=f.nd,mm=f.od,gm=f.pd,_m=f.qd,ym=f.rd,wm=f.wd,bm=f.Rd,$m=f.Sd,vm=f.Td,xm=f.Ud,_=x,Dt}var c,g=le();return t.instantiateWasm?new Promise(f=>{t.instantiateWasm(g,(x,I)=>{f(o(x,I))})}):i?o(new WebAssembly.Instance(_,le()),_):(ge??(ge=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",self.location.href).href,self.location.href).href),c=await async function(f){var x=ge;if(!m&&!A(x))try{var I=fetch(x,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,f)}catch(C){E(`wasm streaming compile failed: ${C}`),E("falling back to ArrayBuffer instantiation")}return async function(C,N){try{var H=await async function(Z){if(!m)try{var de=await u(Z);return new Uint8Array(de)}catch{}if(Z==ge&&m)Z=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";Z=l(Z)}return Z}(C);return await WebAssembly.instantiate(H,N)}catch(Z){E(`failed to asynchronously prepare wasm: ${Z}`),K(Z)}}(x,f)}(g),o(c.instance,c.module))}class je{constructor(c){ys(this,"name","ExitStatus");this.message=`Program terminated with exit(${c})`,this.status=c}}var rt=o=>{o.terminate(),o.onmessage=()=>{}},ft=[],Re=0,Pe=null,nt=o=>{Ue.length==0&&($t(),tn(Ue[0]));var c=Ue.pop();if(!c)return 6;Ne.push(c),Mt[o.Tc]=c,c.Tc=o.Tc;var g={Uc:"run",Pd:o.Od,dd:o.dd,Tc:o.Tc};return c.postMessage(g,o.ud),0},ve=0,ie=(o,c,...g)=>{var f,x=16*g.length,I=pe(),C=ps(x),N=C>>>3;for(f of g)typeof f=="bigint"?(($(),ne)[N++>>>0]=1n,($(),ne)[N++>>>0]=f):(($(),ne)[N++>>>0]=0n,($(),X)[N++>>>0]=f);return o=zf(o,0,x,C,c),ce(I),o};function Le(o){if(i)return ie(0,1,o);if(y=o,!(0<ve)){for(var c of Ne)rt(c);for(c of Ue)rt(c);Ue=[],Ne=[],Mt={},z=!0}d(0,new je(o))}function Ht(o){if(i)return ie(1,0,o);Fe(o)}var Fe=o=>{if(y=o,i)throw Ht(o),"unwind";Le(o)},Ue=[],Ne=[],br=[],Mt={},Jr=o=>{var c=o.Tc;delete Mt[c],Ue.push(o),Ne.splice(Ne.indexOf(o),1),o.Tc=0,Cf(c)};function en(){br.forEach(o=>o())}var tn=o=>new Promise(c=>{o.onmessage=x=>{var I=x.data;if(x=I.Uc,I.ad&&I.ad!=Xn()){var C=Mt[I.ad];C?C.postMessage(I,I.ud):E(`Internal error! Worker sent a message "${x}" to target pthread ${I.ad}, but that thread no longer exists!`)}else x==="checkMailbox"?Vn():x==="spawnThread"?nt(I):x==="cleanupThread"?Gn(()=>{Jr(Mt[I.Qd])}):x==="loaded"?(o.loaded=!0,c(o)):I.target==="setimmediate"?o.postMessage(I):x==="uncaughtException"?o.onerror(I.error):x==="callHandler"?t[I.zd](...I.args):x&&E(`worker sent an unknown command ${x}`)},o.onerror=x=>{throw E(`worker sent an error! ${x.filename}:${x.lineno}: ${x.message}`),x};var g,f=[];for(g of[])t.propertyIsEnumerable(g)&&f.push(g);o.postMessage({Uc:"load",Ad:f,Vd:Ke,Wd:_})});function $t(){var o=new Worker((()=>{let c=URL;return self.location.href>"file:"&&self.location.href<"file;"?new c("ort.bundle.min.mjs",self.location.href):new URL(self.location.href)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Ue.push(o)}var Ke,jt=(o,c)=>{ve=0,o=fs(o,c),0<ve?y=o:cs(o)},Kt=[],Rt=0;function vt(o){var c=new Mr(o>>>=0);return($(),D)[c.Vc+12>>>0]==0&&($r(c,!0),Rt--),Nt(c,!1),Kt.push(c),Bf(o)}var xt=0,rn=()=>{he(0,0);var o=Kt.pop();Rf(o.ed),xt=0};function $r(o,c){c=c?1:0,($(),D)[o.Vc+12>>>0]=c}function Nt(o,c){c=c?1:0,($(),D)[o.Vc+13>>>0]=c}class Mr{constructor(c){this.ed=c,this.Vc=c-24}}var Rr=o=>{var c=xt;if(!c)return dn(0),0;var g=new Mr(c);($(),F)[g.Vc+16>>>2>>>0]=c;var f=($(),F)[g.Vc+4>>>2>>>0];if(!f)return dn(0),c;for(var x of o){if(x===0||x===f)break;if(Nf(x,f,g.Vc+16))return dn(x),c}return dn(f),c};function Pn(){return Rr([])}function Un(o){return Rr([o>>>0])}function ee(o,c,g,f){return Rr([o>>>0,c>>>0,g>>>0,f>>>0])}var _e=()=>{var o=Kt.pop();o||K("no exception to throw");var c=o.ed;throw($(),D)[o.Vc+13>>>0]==0&&(Kt.push(o),Nt(o,!0),$r(o,!1),Rt++),hs(c),xt=c};function Ie(o,c,g){var f=new Mr(o>>>=0);throw c>>>=0,g>>>=0,($(),F)[f.Vc+16>>>2>>>0]=0,($(),F)[f.Vc+4>>>2>>>0]=c,($(),F)[f.Vc+8>>>2>>>0]=g,hs(o),Rt++,xt=o}var ue=()=>Rt;function Ae(o,c,g,f){return i?ie(2,1,o,c,g,f):it(o,c,g,f)}function it(o,c,g,f){if(o>>>=0,c>>>=0,g>>>=0,f>>>=0,!globalThis.SharedArrayBuffer)return 6;var x=[];return i&&x.length===0?Ae(o,c,g,f):(o={Od:g,Tc:o,dd:f,ud:x},i?(o.Uc="spawnThread",postMessage(o,x),0):nt(o))}function mt(o){throw xt||(xt=o>>>0),xt}var fe=globalThis.TextDecoder&&new TextDecoder,We=(o,c,g,f)=>{if(g=c+g,f)return g;for(;o[c]&&!(c>=g);)++c;return c},vr=(o,c=0,g,f)=>{if(16<(g=We(o,c>>>=0,g,f))-c&&o.buffer&&fe)return fe.decode(o.buffer instanceof ArrayBuffer?o.subarray(c,g):o.slice(c,g));for(f="";c<g;){var x=o[c++];if(128&x){var I=63&o[c++];if((224&x)==192)f+=String.fromCharCode((31&x)<<6|I);else{var C=63&o[c++];65536>(x=(240&x)==224?(15&x)<<12|I<<6|C:(7&x)<<18|I<<12|C<<6|63&o[c++])?f+=String.fromCharCode(x):(x-=65536,f+=String.fromCharCode(55296|x>>10,56320|1023&x))}}else f+=String.fromCharCode(x)}return f},se=(o,c,g)=>(o>>>=0)?vr(($(),q),o,c,g):"";function nn(o,c,g){return i?ie(3,1,o,c,g):0}function Qt(o,c){if(i)return ie(4,1,o,c)}function an(o,c){if(i)return ie(5,1,o,c)}function Oe(o,c,g){if(i)return ie(6,1,o,c,g)}function Je(o,c,g){return i?ie(7,1,o,c,g):0}function kt(o,c){if(i)return ie(8,1,o,c)}function St(o,c,g){if(i)return ie(9,1,o,c,g)}function Zt(o,c,g,f){if(i)return ie(10,1,o,c,g,f)}function Xt(o,c,g,f){if(i)return ie(11,1,o,c,g,f)}function Yt(o,c,g,f){if(i)return ie(12,1,o,c,g,f)}function Jt(o){if(i)return ie(13,1,o)}function sn(o,c){if(i)return ie(14,1,o,c)}function Ge(o,c,g){if(i)return ie(15,1,o,c,g)}var Ln=()=>K(""),Qe=o=>{o>>>=0;for(var c="";;){var g=($(),q)[o++>>>0];if(!g)return c;c+=String.fromCharCode(g)}},Bt={},on={},er=class extends Error{constructor(o){super(o),this.name="BindingError"}};function gt(o,c,g={}){return function(f,x,I={}){var C=x.name;if(!f)throw new er(`type "${C}" must have a positive integer typeid pointer`);if(on.hasOwnProperty(f)){if(I.Bd)return;throw new er(`Cannot register type '${C}' twice`)}on[f]=x,Bt.hasOwnProperty(f)&&(x=Bt[f],delete Bt[f],x.forEach(N=>N()))}(o,c,g)}var Fn=(o,c,g)=>{switch(c){case 1:return g?f=>($(),D)[f>>>0]:f=>($(),q)[f>>>0];case 2:return g?f=>($(),G)[f>>>1>>>0]:f=>($(),V)[f>>>1>>>0];case 4:return g?f=>($(),O)[f>>>2>>>0]:f=>($(),F)[f>>>2>>>0];case 8:return g?f=>($(),ne)[f>>>3>>>0]:f=>($(),L)[f>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${o}`)}};function Ya(o,c,g,f,x){o>>>=0,g>>>=0,c=Qe(c>>>0);let I=C=>C;if(f=f===0n){let C=8*g;I=N=>BigInt.asUintN(C,N),x=I(x)}gt(o,{name:c,Qc:I,Xc:(C,N)=>(typeof N=="number"&&(N=BigInt(N)),N),Wc:Fn(c,g,!f),Yc:null})}function Ja(o,c,g,f){gt(o>>>=0,{name:c=Qe(c>>>0),Qc:function(x){return!!x},Xc:function(x,I){return I?g:f},Wc:function(x){return this.Qc(($(),q)[x>>>0])},Yc:null})}var Wn=[],xr=[0,1,,1,null,1,!0,1,!1,1];function es(o){9<(o>>>=0)&&--xr[o+1]==0&&(xr[o]=void 0,Wn.push(o))}var at=o=>{if(!o)throw new er(`Cannot use deleted val. handle = ${o}`);return xr[o]},_t=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Wn.pop()||xr.length;return xr[c]=o,xr[c+1]=1,c}};function ts(o){return this.Qc(($(),F)[o>>>2>>>0])}var t_={name:"emscripten::val",Qc:o=>{var c=at(o);return es(o),c},Xc:(o,c)=>_t(c),Wc:ts,Yc:null};function r_(o){return gt(o>>>0,t_)}var n_=(o,c)=>{switch(c){case 4:return function(g){return this.Qc(($(),j)[g>>>2>>>0])};case 8:return function(g){return this.Qc(($(),X)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${o}`)}};function i_(o,c,g){g>>>=0,gt(o>>>=0,{name:c=Qe(c>>>0),Qc:f=>f,Xc:(f,x)=>x,Wc:n_(c,g),Yc:null})}function a_(o,c,g,f,x){o>>>=0,g>>>=0,c=Qe(c>>>0);let I=N=>N;if(f===0){var C=32-8*g;I=N=>N<<C>>>C,x=I(x)}gt(o,{name:c,Qc:I,Xc:(N,H)=>H,Wc:Fn(c,g,f!==0),Yc:null})}function s_(o,c,g){function f(I){var C=($(),F)[I>>>2>>>0];return I=($(),F)[I+4>>>2>>>0],new x(($(),D).buffer,I,C)}var x=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];gt(o>>>=0,{name:g=Qe(g>>>0),Qc:f,Wc:f},{Bd:!0})}var tr=(o,c,g)=>{var f=($(),q);if(c>>>=0,0<g){var x=c;g=c+g-1;for(var I=0;I<o.length;++I){var C=o.codePointAt(I);if(127>=C){if(c>=g)break;f[c++>>>0]=C}else if(2047>=C){if(c+1>=g)break;f[c++>>>0]=192|C>>6,f[c++>>>0]=128|63&C}else if(65535>=C){if(c+2>=g)break;f[c++>>>0]=224|C>>12,f[c++>>>0]=128|C>>6&63,f[c++>>>0]=128|63&C}else{if(c+3>=g)break;f[c++>>>0]=240|C>>18,f[c++>>>0]=128|C>>12&63,f[c++>>>0]=128|C>>6&63,f[c++>>>0]=128|63&C,I++}}f[c>>>0]=0,o=c-x}else o=0;return o},qn=o=>{for(var c=0,g=0;g<o.length;++g){var f=o.charCodeAt(g);127>=f?c++:2047>=f?c+=2:55296<=f&&57343>=f?(c+=4,++g):c+=3}return c};function o_(o,c){gt(o>>>=0,{name:c=Qe(c>>>0),Qc(g){var f=($(),F)[g>>>2>>>0];return f=se(g+4,f,!0),It(g),f},Xc(g,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var x=typeof f=="string";if(!(x||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1))throw new er("Cannot pass non-string to std::string");var I=x?qn(f):f.length,C=ln(4+I+1),N=C+4;return($(),F)[C>>>2>>>0]=I,x?tr(f,N,I+1):($(),q).set(f,N>>>0),g!==null&&g.push(It,C),C},Wc:ts,Yc(g){It(g)}})}var af=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,u_=(o,c,g)=>{if(o>>>=1,16<(c=We(($(),V),o,c/2,g))-o&&af)return af.decode(($(),V).slice(o,c));for(g="";o<c;++o){var f=($(),V)[o>>>0];g+=String.fromCharCode(f)}return g},l_=(o,c,g)=>{if(g??(g=2147483647),2>g)return 0;var f=c;g=(g-=2)<2*o.length?g/2:o.length;for(var x=0;x<g;++x){var I=o.charCodeAt(x);($(),G)[c>>>1>>>0]=I,c+=2}return($(),G)[c>>>1>>>0]=0,c-f},d_=o=>2*o.length,c_=(o,c,g)=>{var f="";o>>>=2;for(var x=0;!(x>=c/4);x++){var I=($(),F)[o+x>>>0];if(!I&&!g)break;f+=String.fromCodePoint(I)}return f},p_=(o,c,g)=>{if(c>>>=0,g??(g=2147483647),4>g)return 0;var f=c;g=f+g-4;for(var x=0;x<o.length;++x){var I=o.codePointAt(x);if(65535<I&&x++,($(),O)[c>>>2>>>0]=I,(c+=4)+4>g)break}return($(),O)[c>>>2>>>0]=0,c-f},h_=o=>{for(var c=0,g=0;g<o.length;++g)65535<o.codePointAt(g)&&g++,c+=4;return c};function f_(o,c,g){if(o>>>=0,c>>>=0,g=Qe(g>>>=0),c===2)var f=u_,x=l_,I=d_;else f=c_,x=p_,I=h_;gt(o,{name:g,Qc:C=>{var N=($(),F)[C>>>2>>>0];return N=f(C+4,N*c,!0),It(C),N},Xc:(C,N)=>{if(typeof N!="string")throw new er(`Cannot pass non-string to C++ string type ${g}`);var H=I(N),Z=ln(4+H+c);return($(),F)[Z>>>2>>>0]=H/c,x(N,Z+4,H+c),C!==null&&C.push(It,Z),Z},Wc:ts,Yc(C){It(C)}})}function m_(o,c){gt(o>>>=0,{Cd:!0,name:c=Qe(c>>>0),Qc:()=>{},Xc:()=>{}})}function g_(o){ds(o>>>0,!n,1,!r,131072,!1),en()}var Gn=o=>{if(!z)try{if(o(),!(0<ve))try{i?Xn()&&cs(y):Fe(y)}catch(c){c instanceof je||c=="unwind"||d(0,c)}}catch(c){c instanceof je||c=="unwind"||d(0,c)}},__=!Atomics.waitAsync||((Sm=globalThis.navigator)==null?void 0:Sm.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function rs(o){o>>>=0,__||(Atomics.waitAsync(($(),O),o>>>2,o).value.then(Vn),o+=128,Atomics.store(($(),O),o>>>2,1))}var Vn=()=>Gn(()=>{var o=Xn();o&&(rs(o),Of())});function y_(o,c){(o>>>=0)==c>>>0?setTimeout(Vn):i?postMessage({ad:o,Uc:"checkMailbox"}):(o=Mt[o])&&o.postMessage({Uc:"checkMailbox"})}var ns=[];function w_(o,c,g,f,x){for(c>>>=0,x>>>=0,ns.length=0,g=x>>>3,f=x+f>>>3;g<f;){var I;I=($(),ne)[g++>>>0]?($(),ne)[g++>>>0]:($(),X)[g++>>>0],ns.push(I)}return(c?ms[c]:ly[o])(...ns)}var b_=()=>{ve=0};function $_(o){o>>>=0,i?postMessage({Uc:"cleanupThread",Qd:o}):Jr(Mt[o])}function v_(o){}var Hn=o=>{try{o()}catch(c){K(c)}};function x_(o){var c=(...g)=>{jn.push(o);try{return o(...g)}finally{z||(jn.pop(),Tt&&rr===1&&jn.length===0&&(rr=0,ve+=1,Hn($m),typeof Fibers<"u"&&Fibers.ce()))}};return uf.set(o,c),c}var rr=0,Tt=null,sf=0,jn=[],is=new Map,of=new Map,uf=new Map,k_=0,as=null,S_=[],lf=o=>function(c){if(!z){if(rr===0){var g=!1,f=!1;c((x=0)=>{if(!z&&(sf=x,g=!0,f)){rr=2,Hn(()=>vm(Tt)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),x=!1;try{var I=function(){var H=($(),O)[Tt+8>>>2>>>0];return H=of.get(H),H=uf.get(H),--ve,H()}()}catch(H){I=H,x=!0}var C=!1;if(!Tt){var N=as;N&&(as=null,(x?N.reject:N.resolve)(I),C=!0)}if(x&&!C)throw I}}),f=!0,g||(rr=1,Tt=function(){var x=ln(65548),I=x+12;if(($(),F)[x>>>2>>>0]=I,($(),F)[x+4>>>2>>>0]=I+65536,I=jn[0],!is.has(I)){var C=k_++;is.set(I,C),of.set(C,I)}return I=is.get(I),($(),O)[x+8>>>2>>>0]=I,x}(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),Hn(()=>bm(Tt)))}else rr===2?(rr=0,Hn(xm),It(Tt),Tt=null,S_.forEach(Gn)):K(`invalid state: ${rr}`);return sf}}(c=>{o().then(c)});function T_(o){return o>>>=0,lf(async()=>{var c=await at(o);return _t(c)})}var ss=[],I_=o=>{var c=ss.length;return ss.push(o),c},E_=(o,c)=>{for(var g=Array(o),f=0;f<o;++f){var x=f,I=($(),F)[c+4*f>>>2>>>0],C=on[I];if(C===void 0)throw o=`parameter ${f}`,I=Tf(I),c=Qe(I),It(I),new er(`${o} has unknown type ${c}`);g[x]=C}return g},z_=(o,c,g)=>{var f=[];return o=o(f,g),f.length&&(($(),F)[c>>>2>>>0]=_t(f)),o},C_={},Kn=o=>{var c=C_[o];return c===void 0?Qe(o):c};function A_(o,c,g){var[f,...x]=E_(o,c>>>0);c=f.Xc.bind(f);var I=x.map(H=>H.Wc.bind(H));o--;var C={toValue:at};switch(o=I.map((H,Z)=>{var de=`argFromPtr${Z}`;return C[de]=H,`${de}(args${Z?"+"+8*Z:""})`}),g){case 0:var N="toValue(handle)";break;case 2:N="new (toValue(handle))";break;case 3:N="";break;case 1:C.getStringOrSymbol=Kn,N="toValue(handle)[getStringOrSymbol(methodName)]"}return N+=`(${o})`,f.Cd||(C.toReturnWire=c,C.emval_returnValue=z_,N=`return emval_returnValue(toReturnWire, destructorsRef, ${N})`),N=`return function (handle, methodName, destructorsRef, args) {
  ${N}
  }`,g=new Function(Object.keys(C),N)(...Object.values(C)),N=`methodCaller<(${x.map(H=>H.name)}) => ${f.name}>`,I_(Object.defineProperty(g,"name",{value:N}))}function O_(o,c){return c>>>=0,(o=at(o>>>0))==at(c)}function M_(o){return(o>>>=0)?(o=Kn(o),_t(globalThis[o])):_t(globalThis)}function R_(o){return o=Kn(o>>>0),_t(t[o])}function N_(o,c){return c>>>=0,o=at(o>>>0),c=at(c),_t(o[c])}function B_(o){9<(o>>>=0)&&(xr[o+1]+=1)}function df(o,c,g,f,x){return ss[o>>>0](c>>>0,g>>>0,f>>>0,x>>>0)}function D_(o,c,g,f,x){return df(o>>>0,c>>>0,g>>>0,f>>>0,x>>>0)}function P_(){return _t([])}function U_(o){o=at(o>>>0);for(var c=Array(o.length),g=0;g<o.length;g++)c[g]=o[g];return _t(c)}function L_(o){return _t(Kn(o>>>0))}function F_(){return _t({})}function W_(o){for(var c=at(o>>>=0);c.length;){var g=c.pop();c.pop()(g)}es(o)}function q_(o,c,g){c>>>=0,g>>>=0,o=at(o>>>0),c=at(c),g=at(g),o[c]=g}function G_(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),($(),O)[c>>>2>>>0]=o.getUTCSeconds(),($(),O)[c+4>>>2>>>0]=o.getUTCMinutes(),($(),O)[c+8>>>2>>>0]=o.getUTCHours(),($(),O)[c+12>>>2>>>0]=o.getUTCDate(),($(),O)[c+16>>>2>>>0]=o.getUTCMonth(),($(),O)[c+20>>>2>>>0]=o.getUTCFullYear()-1900,($(),O)[c+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),O)[c+28>>>2>>>0]=o}var cf=o=>o%4==0&&(o%100!=0||o%400==0),pf=[0,31,60,91,121,152,182,213,244,274,305,335],hf=[0,31,59,90,120,151,181,212,243,273,304,334];function V_(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),($(),O)[c>>>2>>>0]=o.getSeconds(),($(),O)[c+4>>>2>>>0]=o.getMinutes(),($(),O)[c+8>>>2>>>0]=o.getHours(),($(),O)[c+12>>>2>>>0]=o.getDate(),($(),O)[c+16>>>2>>>0]=o.getMonth(),($(),O)[c+20>>>2>>>0]=o.getFullYear()-1900,($(),O)[c+24>>>2>>>0]=o.getDay();var g=(cf(o.getFullYear())?pf:hf)[o.getMonth()]+o.getDate()-1|0;($(),O)[c+28>>>2>>>0]=g,($(),O)[c+36>>>2>>>0]=-60*o.getTimezoneOffset(),g=new Date(o.getFullYear(),6,1).getTimezoneOffset();var f=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(g!=f&&o.getTimezoneOffset()==Math.min(f,g)),($(),O)[c+32>>>2>>>0]=o}function H_(o){o>>>=0;var c=new Date(($(),O)[o+20>>>2>>>0]+1900,($(),O)[o+16>>>2>>>0],($(),O)[o+12>>>2>>>0],($(),O)[o+8>>>2>>>0],($(),O)[o+4>>>2>>>0],($(),O)[o>>>2>>>0],0),g=($(),O)[o+32>>>2>>>0],f=c.getTimezoneOffset(),x=new Date(c.getFullYear(),6,1).getTimezoneOffset(),I=new Date(c.getFullYear(),0,1).getTimezoneOffset(),C=Math.min(I,x);return 0>g?($(),O)[o+32>>>2>>>0]=+(x!=I&&C==f):0<g!=(C==f)&&(x=Math.max(I,x),c.setTime(c.getTime()+6e4*((0<g?C:x)-f))),($(),O)[o+24>>>2>>>0]=c.getDay(),g=(cf(c.getFullYear())?pf:hf)[c.getMonth()]+c.getDate()-1|0,($(),O)[o+28>>>2>>>0]=g,($(),O)[o>>>2>>>0]=c.getSeconds(),($(),O)[o+4>>>2>>>0]=c.getMinutes(),($(),O)[o+8>>>2>>>0]=c.getHours(),($(),O)[o+12>>>2>>>0]=c.getDate(),($(),O)[o+16>>>2>>>0]=c.getMonth(),($(),O)[o+20>>>2>>>0]=c.getYear(),o=c.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function ff(o,c,g,f,x,I,C){return i?ie(16,1,o,c,g,f,x,I,C):-52}function mf(o,c,g,f,x,I){if(i)return ie(17,1,o,c,g,f,x,I)}var un={},j_=()=>performance.timeOrigin+performance.now();function gf(o,c){if(i)return ie(18,1,o,c);if(un[o]&&(clearTimeout(un[o].id),delete un[o]),!c)return 0;var g=setTimeout(()=>{delete un[o],Gn(()=>Af(o,performance.timeOrigin+performance.now()))},c);return un[o]={id:g,be:c},0}function K_(o,c,g,f){o>>>=0,c>>>=0,g>>>=0,f>>>=0;var x=new Date().getFullYear(),I=new Date(x,0,1).getTimezoneOffset();x=new Date(x,6,1).getTimezoneOffset();var C=Math.max(I,x);($(),F)[o>>>2>>>0]=60*C,($(),O)[c>>>2>>>0]=+(I!=x),o=(c=N=>{var H=Math.abs(N);return`UTC${0<=N?"-":"+"}${String(Math.floor(H/60)).padStart(2,"0")}${String(H%60).padStart(2,"0")}`})(I),c=c(x),x<I?(tr(o,g,17),tr(c,f,17)):(tr(o,f,17),tr(c,g,17))}var Q_=()=>Date.now();function Z_(o,c,g){return g>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),($(),ne)[g>>>3>>>0]=BigInt(o),0):28}var os=[],_f=(o,c)=>{os.length=0;for(var g;g=($(),q)[o++>>>0];){var f=g!=105;c+=(f&=g!=112)&&c%8?4:0,os.push(g==112?($(),F)[c>>>2>>>0]:g==106?($(),ne)[c>>>3>>>0]:g==105?($(),O)[c>>>2>>>0]:($(),X)[c>>>3>>>0]),c+=f?8:4}return os};function X_(o,c,g){return o>>>=0,c=_f(c>>>0,g>>>0),ms[o](...c)}function Y_(o,c,g){return o>>>=0,c=_f(c>>>0,g>>>0),ms[o](...c)}var J_=()=>{};function ey(o,c){return E(se(o>>>0,c>>>0))}var ty=()=>{throw ve+=1,"unwind"};function ry(){return 4294901760}var ny=()=>navigator.hardwareConcurrency,kr={},Qn=o=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+c[1]:0},yf=o=>{for(var c of o)(o=Qn(c))&&(kr[o]=c)};function iy(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),yf(o),kr.sd=Qn(o[3]),kr.Md=o,kr.sd}function Zn(o){if(!(o=kr[o>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(o))o=c[1];else{if(!(c=/^(.+?)@/.exec(o)))return 0;o=c[1]}It(Zn.td??0),c=qn(o)+1;var g=ln(c);return g&&tr(o,g,c),Zn.td=g,Zn.td}function ay(o){o>>>=0;var c=($(),q).length;if(o<=c||4294901760<o)return!1;for(var g=1;4>=g;g*=2){var f=c*(1+.2/g);f=Math.min(f,o+100663296);e:{f=(Math.min(4294901760,65536*Math.ceil(Math.max(o,f)/65536))-Ke.buffer.byteLength+65535)/65536|0;try{Ke.grow(f),P();var x=1;break e}catch{}x=void 0}if(x)return!0}return!1}function sy(o,c,g){if(o>>>=0,c>>>=0,kr.sd==o)var f=kr.Md;else(f=Error().stack.toString().split(`
`))[0]=="Error"&&f.shift(),yf(f);for(var x=3;f[x]&&Qn(f[x])!=o;)++x;for(o=0;o<g&&f[o+x];++o)($(),O)[c+4*o>>>2>>>0]=Qn(f[o+x]);return o}var us,ls={},wf=()=>{var f;if(!us){var o,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((f=globalThis.navigator)==null?void 0:f.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in ls)ls[o]===void 0?delete c[o]:c[o]=ls[o];var g=[];for(o in c)g.push(`${o}=${c[o]}`);us=g}return us};function bf(o,c){if(i)return ie(19,1,o,c);o>>>=0,c>>>=0;var g,f=0,x=0;for(g of wf()){var I=c+f;($(),F)[o+x>>>2>>>0]=I,f+=tr(g,I,1/0)+1,x+=4}return 0}function $f(o,c){if(i)return ie(20,1,o,c);o>>>=0,c>>>=0;var g=wf();for(var f of(($(),F)[o>>>2>>>0]=g.length,o=0,g))o+=qn(f)+1;return($(),F)[c>>>2>>>0]=o,0}function vf(o){return i?ie(21,1,o):52}function xf(o,c,g,f){return i?ie(22,1,o,c,g,f):52}function kf(o,c,g,f){return i?ie(23,1,o,c,g,f):70}var oy=[null,[],[]];function Sf(o,c,g,f){if(i)return ie(24,1,o,c,g,f);c>>>=0,g>>>=0,f>>>=0;for(var x=0,I=0;I<g;I++){var C=($(),F)[c>>>2>>>0],N=($(),F)[c+4>>>2>>>0];c+=8;for(var H=0;H<N;H++){var Z=o,de=($(),q)[C+H>>>0],ye=oy[Z];de===0||de===10?((Z===1?S:E)(vr(ye)),ye.length=0):ye.push(de)}x+=N}return($(),F)[f>>>2>>>0]=x,0}function uy(o){return o>>>0}i||function(){for(var o=t.numThreads-1;o--;)$t();ft.push(async()=>{var c=async function(){if(!i)return Promise.all(Ue.map(tn))}();Re++,await c,--Re==0&&Pe&&(c=Pe,Pe=null,c())})}(),i||(Ke=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),P()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>pe(),t.stackRestore=o=>ce(o),t.stackAlloc=o=>ps(o),t.setValue=function(o,c,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":($(),D)[o>>>0]=c;break;case"i16":($(),G)[o>>>1>>>0]=c;break;case"i32":($(),O)[o>>>2>>>0]=c;break;case"i64":($(),ne)[o>>>3>>>0]=BigInt(c);break;case"float":($(),j)[o>>>2>>>0]=c;break;case"double":($(),X)[o>>>3>>>0]=c;break;case"*":($(),F)[o>>>2>>>0]=c;break;default:K(`invalid type for setValue: ${g}`)}},t.getValue=function(o,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return($(),D)[o>>>0];case"i16":return($(),G)[o>>>1>>>0];case"i32":return($(),O)[o>>>2>>>0];case"i64":return($(),ne)[o>>>3>>>0];case"float":return($(),j)[o>>>2>>>0];case"double":return($(),X)[o>>>3>>>0];case"*":return($(),F)[o>>>2>>>0];default:K(`invalid type for getValue: ${c}`)}},t.UTF8ToString=se,t.stringToUTF8=tr,t.lengthBytesUTF8=qn;var Tf,If,Xn,It,ln,ds,Ef,zf,Cf,cs,Af,Of,he,dn,Mf,ce,ps,pe,Rf,hs,Nf,Bf,Df,fs,Pf,Uf,Lf,Ff,Wf,qf,Gf,Vf,Hf,jf,Kf,Qf,Zf,Xf,Yf,Jf,em,tm,rm,nm,im,am,sm,om,um,lm,dm,cm,pm,hm,fm,mm,gm,_m,ym,wm,bm,$m,vm,xm,Dt,ly=[Le,Ht,Ae,nn,Qt,an,Oe,Je,kt,St,Zt,Xt,Yt,Jt,sn,Ge,ff,mf,gf,bf,$f,vf,xf,kf,Sf],ms={927244:(o,c,g,f,x)=>{if(t===void 0||!t.Zc)return 1;if((o=se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Zc.get(o)))return 2;if(c=Number(c>>>0),g=Number(g>>>0),f=Number(f>>>0),c+g>o.byteLength)return 3;try{let I=o.subarray(c,c+g);switch(x){case 0:($(),q).set(I,f>>>0);break;case 1:t.Xd?t.Xd(f,I):t.Ld(f,I);break;default:return 4}return 0}catch{return 4}},928068:(o,c,g)=>{t.xd(o,($(),q).subarray(c>>>0,c+g>>>0))},928132:()=>t.Zd(),928174:o=>{t.vd(o)},928211:()=>{t.Ed()},928242:()=>{t.Fd()},928271:()=>{t.Jd()},928296:o=>t.Dd(o),928329:o=>t.Hd(o),928361:(o,c,g)=>{t.jd(Number(o),Number(c),Number(g),!0)},928424:(o,c,g)=>{t.jd(Number(o),Number(c),Number(g))},928481:()=>typeof wasmOffsetConverter<"u",928538:o=>{t.ac("Abs",o,void 0)},928589:o=>{t.ac("Neg",o,void 0)},928640:o=>{t.ac("Floor",o,void 0)},928693:o=>{t.ac("Ceil",o,void 0)},928745:o=>{t.ac("Reciprocal",o,void 0)},928803:o=>{t.ac("Sqrt",o,void 0)},928855:o=>{t.ac("Exp",o,void 0)},928906:o=>{t.ac("Erf",o,void 0)},928957:o=>{t.ac("Sigmoid",o,void 0)},929012:(o,c,g)=>{t.ac("HardSigmoid",o,{alpha:c,beta:g})},929091:o=>{t.ac("Log",o,void 0)},929142:o=>{t.ac("Sin",o,void 0)},929193:o=>{t.ac("Cos",o,void 0)},929244:o=>{t.ac("Tan",o,void 0)},929295:o=>{t.ac("Asin",o,void 0)},929347:o=>{t.ac("Acos",o,void 0)},929399:o=>{t.ac("Atan",o,void 0)},929451:o=>{t.ac("Sinh",o,void 0)},929503:o=>{t.ac("Cosh",o,void 0)},929555:o=>{t.ac("Asinh",o,void 0)},929608:o=>{t.ac("Acosh",o,void 0)},929661:o=>{t.ac("Atanh",o,void 0)},929714:o=>{t.ac("Tanh",o,void 0)},929766:o=>{t.ac("Not",o,void 0)},929817:(o,c,g)=>{t.ac("Clip",o,{min:c,max:g})},929886:o=>{t.ac("Clip",o,void 0)},929938:(o,c)=>{t.ac("Elu",o,{alpha:c})},929996:o=>{t.ac("Gelu",o,void 0)},930048:o=>{t.ac("Relu",o,void 0)},930100:(o,c)=>{t.ac("LeakyRelu",o,{alpha:c})},930164:(o,c)=>{t.ac("ThresholdedRelu",o,{alpha:c})},930234:(o,c)=>{t.ac("Cast",o,{to:c})},930292:o=>{t.ac("Add",o,void 0)},930343:o=>{t.ac("Sub",o,void 0)},930394:o=>{t.ac("Mul",o,void 0)},930445:o=>{t.ac("Div",o,void 0)},930496:o=>{t.ac("Pow",o,void 0)},930547:o=>{t.ac("Equal",o,void 0)},930600:o=>{t.ac("Greater",o,void 0)},930655:o=>{t.ac("GreaterOrEqual",o,void 0)},930717:o=>{t.ac("Less",o,void 0)},930769:o=>{t.ac("LessOrEqual",o,void 0)},930828:(o,c,g,f,x)=>{t.ac("ReduceMean",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931003:(o,c,g,f,x)=>{t.ac("ReduceMax",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931177:(o,c,g,f,x)=>{t.ac("ReduceMin",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931351:(o,c,g,f,x)=>{t.ac("ReduceProd",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931526:(o,c,g,f,x)=>{t.ac("ReduceSum",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931700:(o,c,g,f,x)=>{t.ac("ReduceL1",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},931873:(o,c,g,f,x)=>{t.ac("ReduceL2",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},932046:(o,c,g,f,x)=>{t.ac("ReduceLogSum",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},932223:(o,c,g,f,x)=>{t.ac("ReduceSumSquare",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},932403:(o,c,g,f,x)=>{t.ac("ReduceLogSumExp",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},932583:o=>{t.ac("Where",o,void 0)},932636:(o,c,g)=>{t.ac("Transpose",o,{perm:c?Array.from(($(),O).subarray(Number(c)>>>0,Number(g)>>>0)):[]})},932760:(o,c,g,f)=>{t.ac("DepthToSpace",o,{blocksize:c,mode:se(g),format:f?"NHWC":"NCHW"})},932893:(o,c,g,f)=>{t.ac("DepthToSpace",o,{blocksize:c,mode:se(g),format:f?"NHWC":"NCHW"})},933026:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te,nr)=>{t.ac("ConvTranspose",o,{format:H?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[x],pads:[I,C],strides:[N],wIsConst:()=>!!($(),D)[Z>>>0],outputPadding:de?Array.from(($(),O).subarray(Number(de)>>>0,Number(ye)>>>0)):[],outputShape:xe?Array.from(($(),O).subarray(Number(xe)>>>0,Number(Te)>>>0)):[],activation:se(nr)})},933459:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:Array.from(($(),O).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),group:f,kernelShape:Array.from(($(),O).subarray(Number(x)>>>0,2+(Number(x)>>>0)>>>0)),pads:Array.from(($(),O).subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(($(),O).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!($(),D)[H>>>0],outputPadding:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],outputShape:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[],activation:se(Te)})},934120:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te,nr)=>{t.ac("ConvTranspose",o,{format:H?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[x],pads:[I,C],strides:[N],wIsConst:()=>!!($(),D)[Z>>>0],outputPadding:de?Array.from(($(),O).subarray(Number(de)>>>0,Number(ye)>>>0)):[],outputShape:xe?Array.from(($(),O).subarray(Number(xe)>>>0,Number(Te)>>>0)):[],activation:se(nr)})},934553:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:Array.from(($(),O).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),group:f,kernelShape:Array.from(($(),O).subarray(Number(x)>>>0,2+(Number(x)>>>0)>>>0)),pads:Array.from(($(),O).subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(($(),O).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!($(),D)[H>>>0],outputPadding:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],outputShape:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[],activation:se(Te)})},935214:(o,c)=>{t.ac("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},935305:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("AveragePool",o,{format:Te?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[],kernel_shape:N?Array.from(($(),O).subarray(Number(N)>>>0,Number(H)>>>0)):[],pads:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],strides:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[]})},935784:(o,c)=>{t.ac("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},935875:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("AveragePool",o,{format:Te?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[],kernel_shape:N?Array.from(($(),O).subarray(Number(N)>>>0,Number(H)>>>0)):[],pads:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],strides:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[]})},936354:(o,c)=>{t.ac("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},936441:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("MaxPool",o,{format:Te?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[],kernel_shape:N?Array.from(($(),O).subarray(Number(N)>>>0,Number(H)>>>0)):[],pads:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],strides:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[]})},936916:(o,c)=>{t.ac("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},937003:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te)=>{t.ac("MaxPool",o,{format:Te?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[],kernel_shape:N?Array.from(($(),O).subarray(Number(N)>>>0,Number(H)>>>0)):[],pads:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],strides:ye?Array.from(($(),O).subarray(Number(ye)>>>0,Number(xe)>>>0)):[]})},937478:(o,c,g,f,x)=>{t.ac("Gemm",o,{alpha:c,beta:g,transA:f,transB:x})},937582:o=>{t.ac("MatMul",o,void 0)},937636:(o,c,g,f)=>{t.ac("ArgMax",o,{keepDims:!!c,selectLastIndex:!!g,axis:f})},937744:(o,c,g,f)=>{t.ac("ArgMin",o,{keepDims:!!c,selectLastIndex:!!g,axis:f})},937852:(o,c)=>{t.ac("Softmax",o,{axis:c})},937915:(o,c)=>{t.ac("Concat",o,{axis:c})},937975:(o,c,g,f,x)=>{t.ac("Split",o,{axis:c,numOutputs:g,splitSizes:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},938131:o=>{t.ac("Expand",o,void 0)},938185:(o,c)=>{t.ac("Gather",o,{axis:Number(c)})},938256:(o,c)=>{t.ac("GatherElements",o,{axis:Number(c)})},938335:(o,c)=>{t.ac("GatherND",o,{batch_dims:Number(c)})},938414:(o,c,g,f,x,I,C,N,H,Z,de)=>{t.ac("Resize",o,{antialias:c,axes:g?Array.from(($(),O).subarray(Number(g)>>>0,Number(f)>>>0)):[],coordinateTransformMode:se(x),cubicCoeffA:I,excludeOutside:C,extrapolationValue:N,keepAspectRatioPolicy:se(H),mode:se(Z),nearestMode:se(de)})},938776:(o,c,g,f,x,I,C)=>{t.ac("Slice",o,{starts:c?Array.from(($(),O).subarray(Number(c)>>>0,Number(g)>>>0)):[],ends:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[],axes:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[]})},939040:o=>{t.ac("Tile",o,void 0)},939092:(o,c,g)=>{t.ac("InstanceNormalization",o,{epsilon:c,format:g?"NHWC":"NCHW"})},939206:(o,c,g)=>{t.ac("InstanceNormalization",o,{epsilon:c,format:g?"NHWC":"NCHW"})},939320:o=>{t.ac("Range",o,void 0)},939373:(o,c)=>{t.ac("Einsum",o,{equation:se(c)})},939454:(o,c,g,f,x)=>{t.ac("Pad",o,{mode:c,value:g,pads:f?Array.from(($(),O).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},939597:(o,c,g,f,x,I)=>{t.ac("BatchNormalization",o,{epsilon:c,momentum:g,spatial:!!x,trainingMode:!!f,format:I?"NHWC":"NCHW"})},939766:(o,c,g,f,x,I)=>{t.ac("BatchNormalization",o,{epsilon:c,momentum:g,spatial:!!x,trainingMode:!!f,format:I?"NHWC":"NCHW"})},939935:(o,c,g)=>{t.ac("CumSum",o,{exclusive:Number(c),reverse:Number(g)})},940032:(o,c,g)=>{t.ac("DequantizeLinear",o,{axis:c,blockSize:g})},940122:(o,c,g,f,x)=>{t.ac("GridSample",o,{align_corners:c,mode:se(g),padding_mode:se(f),format:x?"NHWC":"NCHW"})},940292:(o,c,g,f,x)=>{t.ac("GridSample",o,{align_corners:c,mode:se(g),padding_mode:se(f),format:x?"NHWC":"NCHW"})},940462:(o,c)=>{t.ac("ScatterND",o,{reduction:se(c)})},940547:(o,c,g,f,x,I,C,N,H)=>{t.ac("Attention",o,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:x,doRotary:I,qkvHiddenSizes:C?Array.from(($(),O).subarray(Number(N)>>>0,Number(N)+C>>>0)):[],pastPresentShareBuffer:!!H})},940819:o=>{t.ac("BiasAdd",o,void 0)},940874:o=>{t.ac("BiasSplitGelu",o,void 0)},940935:o=>{t.ac("FastGelu",o,void 0)},940991:(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te,nr,gs)=>{t.ac("Conv",o,{format:ye?"NHWC":"NCHW",auto_pad:c,dilations:g?Array.from(($(),O).subarray(Number(g)>>>0,Number(f)>>>0)):[],group:x,kernel_shape:I?Array.from(($(),O).subarray(Number(I)>>>0,Number(C)>>>0)):[],pads:N?Array.from(($(),O).subarray(Number(N)>>>0,Number(H)>>>0)):[],strides:Z?Array.from(($(),O).subarray(Number(Z)>>>0,Number(de)>>>0)):[],w_is_const:()=>!!($(),D)[Number(xe)>>>0],activation:se(Te),activation_params:nr?Array.from(($(),j).subarray(Number(nr)>>>0,Number(gs)>>>0)):[]})},941575:o=>{t.ac("Gelu",o,void 0)},941627:(o,c,g,f,x,I,C,N,H)=>{t.ac("GroupQueryAttention",o,{numHeads:c,kvNumHeads:g,scale:f,softcap:x,doRotary:I,rotaryInterleaved:C,smoothSoftmax:N,localWindowSize:H})},941844:(o,c,g,f)=>{t.ac("LayerNormalization",o,{axis:c,epsilon:g,simplified:!!f})},941955:(o,c,g,f)=>{t.ac("LayerNormalization",o,{axis:c,epsilon:g,simplified:!!f})},942066:(o,c,g,f,x,I)=>{t.ac("MatMulNBits",o,{k:c,n:g,accuracyLevel:f,bits:x,blockSize:I})},942193:(o,c,g,f,x,I)=>{t.ac("MultiHeadAttention",o,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:x,doRotary:I})},942352:(o,c)=>{t.ac("QuickGelu",o,{alpha:c})},942416:(o,c,g,f,x)=>{t.ac("RotaryEmbedding",o,{interleaved:!!c,numHeads:g,rotaryEmbeddingDim:f,scale:x})},942555:(o,c,g)=>{t.ac("SkipLayerNormalization",o,{epsilon:c,simplified:!!g})},942657:(o,c,g)=>{t.ac("SkipLayerNormalization",o,{epsilon:c,simplified:!!g})},942759:(o,c,g,f)=>{t.ac("GatherBlockQuantized",o,{gatherAxis:c,quantizeAxis:g,blockSize:f})},942880:o=>{t.Id(o)},942914:(o,c)=>t.Kd(Number(o),Number(c),t.$c.Nd,t.$c.errors)};function dy(o,c,g){return lf(async()=>{await t.Gd(Number(o),Number(c),Number(g))})}function cy(){return typeof wasmOffsetConverter<"u"}function py(o,c,g,f){var x=pe();try{return Vf(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function hy(o,c,g){var f=pe();try{return Ff(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;he(1,0)}}function fy(o,c,g){var f=pe();try{Df(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;he(1,0)}}function my(o,c){var g=pe();try{return fs(o,c)}catch(f){if(ce(g),f!==f+0)throw f;he(1,0)}}function gy(o){var c=pe();try{Pf(o)}catch(g){if(ce(c),g!==g+0)throw g;he(1,0)}}function _y(o,c,g,f,x,I,C){var N=pe();try{return qf(o,c,g,f,x,I,C)}catch(H){if(ce(N),H!==H+0)throw H;he(1,0)}}function yy(o,c){var g=pe();try{Hf(o,c)}catch(f){if(ce(g),f!==f+0)throw f;he(1,0)}}function wy(o,c,g,f,x,I){var C=pe();try{Uf(o,c,g,f,x,I)}catch(N){if(ce(C),N!==N+0)throw N;he(1,0)}}function by(o,c,g,f){var x=pe();try{Gf(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function $y(o,c,g,f,x){var I=pe();try{Lf(o,c,g,f,x)}catch(C){if(ce(I),C!==C+0)throw C;he(1,0)}}function vy(o,c,g,f,x,I,C){var N=pe();try{Kf(o,c,g,f,x,I,C)}catch(H){if(ce(N),H!==H+0)throw H;he(1,0)}}function xy(o,c,g,f,x,I,C){var N=pe();try{Qf(o,c,g,f,x,I,C)}catch(H){if(ce(N),H!==H+0)throw H;he(1,0)}}function ky(o,c,g,f,x,I,C,N){var H=pe();try{Jf(o,c,g,f,x,I,C,N)}catch(Z){if(ce(H),Z!==Z+0)throw Z;he(1,0)}}function Sy(o,c,g,f,x){var I=pe();try{return jf(o,c,g,f,x)}catch(C){if(ce(I),C!==C+0)throw C;he(1,0)}}function Ty(o,c,g,f,x,I,C,N){var H=pe();try{em(o,c,g,f,x,I,C,N)}catch(Z){if(ce(H),Z!==Z+0)throw Z;he(1,0)}}function Iy(o,c,g,f,x,I,C,N,H,Z,de,ye){var xe=pe();try{Zf(o,c,g,f,x,I,C,N,H,Z,de,ye)}catch(Te){if(ce(xe),Te!==Te+0)throw Te;he(1,0)}}function Ey(o,c,g,f,x,I){var C=pe();try{return Xf(o,c,g,f,x,I)}catch(N){if(ce(C),N!==N+0)throw N;he(1,0)}}function zy(o,c,g){var f=pe();try{return tm(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;return he(1,0),0n}}function Cy(o,c,g,f,x,I,C,N,H){var Z=pe();try{Wf(o,c,g,f,x,I,C,N,H)}catch(de){if(ce(Z),de!==de+0)throw de;he(1,0)}}function Ay(o){var c=pe();try{return rm(o)}catch(g){if(ce(c),g!==g+0)throw g;he(1,0)}}function Oy(o,c,g){var f=pe();try{return nm(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;he(1,0)}}function My(o,c){var g=pe();try{return wm(o,c)}catch(f){if(ce(g),f!==f+0)throw f;return he(1,0),0n}}function Ry(o,c,g,f,x){var I=pe();try{im(o,c,g,f,x)}catch(C){if(ce(I),C!==C+0)throw C;he(1,0)}}function Ny(o){var c=pe();try{return am(o)}catch(g){if(ce(c),g!==g+0)throw g;return he(1,0),0n}}function By(o,c,g,f,x,I){var C=pe();try{return cm(o,c,g,f,x,I)}catch(N){if(ce(C),N!==N+0)throw N;he(1,0)}}function Dy(o,c,g,f,x,I){var C=pe();try{return pm(o,c,g,f,x,I)}catch(N){if(ce(C),N!==N+0)throw N;he(1,0)}}function Py(o,c,g,f,x,I,C,N){var H=pe();try{return Yf(o,c,g,f,x,I,C,N)}catch(Z){if(ce(H),Z!==Z+0)throw Z;he(1,0)}}function Uy(o,c,g,f,x){var I=pe();try{return hm(o,c,g,f,x)}catch(C){if(ce(I),C!==C+0)throw C;return he(1,0),0n}}function Ly(o,c,g,f){var x=pe();try{return fm(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function Fy(o,c,g,f){var x=pe();try{return mm(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function Wy(o,c,g,f,x,I,C,N,H,Z,de,ye){var xe=pe();try{return gm(o,c,g,f,x,I,C,N,H,Z,de,ye)}catch(Te){if(ce(xe),Te!==Te+0)throw Te;he(1,0)}}function qy(o,c,g,f,x,I,C,N,H,Z,de){var ye=pe();try{lm(o,c,g,f,x,I,C,N,H,Z,de)}catch(xe){if(ce(ye),xe!==xe+0)throw xe;he(1,0)}}function Gy(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te,nr,gs){var Zy=pe();try{dm(o,c,g,f,x,I,C,N,H,Z,de,ye,xe,Te,nr,gs)}catch(_s){if(ce(Zy),_s!==_s+0)throw _s;he(1,0)}}function Vy(o,c,g,f){var x=pe();try{return _m(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function Hy(o,c,g,f,x){var I=pe();try{return ym(o,c,g,f,x)}catch(C){if(ce(I),C!==C+0)throw C;he(1,0)}}function jy(o,c,g){var f=pe();try{return sm(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;he(1,0)}}function Ky(o,c,g){var f=pe();try{return om(o,c,g)}catch(x){if(ce(f),x!==x+0)throw x;he(1,0)}}function Qy(o,c,g,f){var x=pe();try{um(o,c,g,f)}catch(I){if(ce(x),I!==I+0)throw I;he(1,0)}}function Yn(){if(0<Re)Pe=Yn;else if(i)w==null||w(t),Q();else{for(var o=ft;0<o.length;)o.shift()(t);0<Re?Pe=Yn:(t.calledRun=!0,z||(Q(),w==null||w(t)))}}return i||(Dt=await Ce(),Yn()),t.PTR_SIZE=4,U?t:new Promise((o,c)=>{w=o,k=c})}var Ws,qs,Vm=W(()=>{var e,t;Ws=Fs,qs=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),qs&&Fs()}),ui,li,Gs,Xe,Vs,hn,Hs,js,di,Ks,ci,Qs,pi,Zs,hi=W(()=>{ai(),ui=typeof location>"u"?void 0:location.origin,li=self.location.href>"file:"&&self.location.href<"file;",Gs=()=>{{if(li){let e=URL;return new URL(new e("ort.bundle.min.mjs",self.location.href).href,ui).href}return self.location.href}},Xe=Gs(),Vs=()=>{if(Xe&&!Xe.startsWith("blob:"))return Xe.substring(0,Xe.lastIndexOf("/")+1)},hn=(e,t)=>{try{let r=t??Xe;return(r?new URL(e,r):new URL(e)).origin===ui}catch{return!1}},Hs=(e,t)=>{let r=t??Xe;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},js=(e,t)=>`${t??"./"}${e}`,di=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Ks=async e=>(await import(e)).default,ci=(Gm(),Nr(Ps)).default,Qs=async()=>{if(!Xe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(hn(Xe))return[void 0,ci()];let e=await di(Xe);return[e,ci(e)]},pi=(Vm(),Nr(Ls)).default,Zs=async(e,t,r,n)=>{let i=pi&&!(e||t);if(i)if(Xe)i=hn(Xe);else if(n&&!r)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,pi];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??Hs(a,t),u=r&&s&&!hn(s,t),l=u?await di(s):s??js(a,t);return[u?l:void 0,await Ks(l)]}}}),fi,fn,Ur,mi,Xs,Ys,Js,gi,Se,sr=W(()=>{hi(),fn=!1,Ur=!1,mi=!1,Xs=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ys=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Js=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},gi=async e=>{if(fn)return Promise.resolve();if(Ur)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(mi)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ur=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Js())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ys())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=Xs();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,s=i==null?void 0:i.mjs,u=(s==null?void 0:s.href)??s,l=i==null?void 0:i.wasm,d=(l==null?void 0:l.href)??l,p=e.wasmBinary,[h,m]=await Zs(u,a,r>1,!!p||!!d),_=!1,y=[];if(t>0&&y.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),y.push(new Promise((w,k)=>{let v={numThreads:r};if(p)v.wasmBinary=p;else if(d||a)v.locateFile=b=>d??a+b;else if(u&&u.indexOf("blob:")!==0)v.locateFile=b=>new URL(b,u).href;else if(h){let b=Vs();b&&(v.locateFile=T=>b+T)}m(v).then(b=>{Ur=!1,fn=!0,fi=b,w(),h&&URL.revokeObjectURL(h)},b=>{Ur=!1,mi=!0,k(b)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Se=()=>{if(fn&&fi)return fi;throw new Error("WebAssembly is not initialized yet.")}}),ut,mn,$e,_i=W(()=>{sr(),ut=(e,t)=>{let r=Se(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},mn=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([i,a])=>{let s=t?t+i:i;if(typeof a=="object")mn(a,s+".",r,n);else if(typeof a=="string"||typeof a=="number")n(s,a.toString());else if(typeof a=="boolean")n(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Se(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetLastError(i,i+n);let a=Number(t.getValue(i,n===4?"i32":"i64")),s=t.getValue(i+n,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),eo,Hm=W(()=>{sr(),_i(),eo=e=>{let t=Se(),r=0,n=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=ut(e.tag,n)),r=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),r===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&mn(e.extra,"",new WeakSet,(s,u)=>{let l=ut(s,n),d=ut(u,n);t._OrtAddRunConfigEntry(r,l,d)!==0&&$e(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),a}}}),to,ro,no,Lr,io,ao,jm=W(()=>{sr(),_i(),to=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ro=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},no=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Lr=(e,t,r,n)=>{let i=ut(t,n),a=ut(r,n);Se()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${r}.`)},io=async(e,t,r)=>{let n=t.executionProviders;for(let i of n){let a=typeof i=="string"?i:i.name,s=[];switch(a){case"webnn":if(a="WEBNN",typeof i!="string"){let h=i==null?void 0:i.deviceType;h&&Lr(e,"deviceType",h,r)}break;case"webgpu":if(a="JS",typeof i!="string"){let h=i;if(h!=null&&h.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);Lr(e,"preferredLayout",h.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=ut(a,r),l=s.length,d=0,p=0;if(l>0){d=Se()._malloc(l*Se().PTR_SIZE),r.push(d),p=Se()._malloc(l*Se().PTR_SIZE),r.push(p);for(let h=0;h<l;h++)Se().setValue(d+h*Se().PTR_SIZE,s[h][0],"*"),Se().setValue(p+h*Se().PTR_SIZE,s[h][1],"*")}await Se()._OrtAppendExecutionProvider(e,u,d,p,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},ao=async e=>{let t=Se(),r=0,n=[],i=e||{};no(i);try{let a=to(i.graphOptimizationLevel??"all"),s=ro(i.executionMode??"sequential"),u=typeof i.logId=="string"?ut(i.logId,n):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=i.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let p=typeof i.optimizedModelFilePath=="string"?ut(i.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,s,!!i.enableProfiling,0,u,l,d,p),r===0&&$e("Can't create session options."),i.executionProviders&&await io(r,i,n),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Lr(r,"enableGraphCapture",i.enableGraphCapture.toString(),n)}if(i.freeDimensionOverrides)for(let[h,m]of Object.entries(i.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let _=ut(h,n);t._OrtAddFreeDimensionOverride(r,_,m)!==0&&$e(`Can't set a free dimension override: ${h} - ${m}.`)}return i.extra!==void 0&&mn(i.extra,"",new WeakSet,(h,m)=>{Lr(r,h,m,n)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&$e("Can't release session options."),n.forEach(s=>t._free(s)),a}}}),or,Ct,ur,gn,_n,yi,wi,bi,re=W(()=>{or=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ct=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},ur=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return r>0?Math.ceil(n*r):void 0},gn=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},_n=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},yi=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",wi=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",bi=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),$i,so=W(()=>{ai(),$i=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let l=Math.ceil(n/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await i.read();if(u)break;let d=l.byteLength;new Uint8Array(a,s,d).set(l),s+=d}return new Uint8Array(a,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),oo,uo,lo,co,vi,po,me,At=W(()=>{re(),oo=["V","I","W","E","F"],uo=(e,t)=>{console.log(`[${oo[e]},${new Date().toISOString()}]${t}`)},vi=(e,t)=>{lo=e,co=t},po=(e,t)=>{let r=_n(e),n=_n(lo);r>=n&&uo(r,typeof t=="function"?t():t)},me=(...e)=>{co&&po(...e)}}),ho,Ir,R,yn,fo,mo,go,ae=W(()=>{ho=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ir=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(n===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(n<2||i<2)return;let u=ho.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=n-u<0?1:e[n-u],d=i-u<0?1:t[i-u];if(l!==d&&l>1&&d>1)return;let p=Math.max(l,d);if(l&&d)s[a-u]=Math.max(l,d);else{if(p>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(e[r-i]!==1&&e[r-i]!==t[n-i])return!1;return!0}},R=class Jn{static size(t){return Jn.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let i=new Array(n),a=n-1;for(;a>=0;){if(t[a]%r===0){i[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,r/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Jn.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Jn.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let i=1;for(let a=r;a<n;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let i=r-3;i>=0;--i)n[i]=n[i+1]*t[i+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((i,a)=>i+r[a]+r[a+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,i)=>n===r[i])}},yn=class cn{static adjustPoolAttributes(t,r,n,i,a,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)cn.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],n[l],i[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,n,i,a,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return cn.computeShapeHelper(t,r,l,n,i,a,s,u),l}static computeConvOutputShape(t,r,n,i,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return cn.computeShapeHelper(!1,t,l,n,i,a,s,u),l}static computeShapeHelper(t,r,n,i,a,s,u,l){if(t)for(let d=0;d<r.length-2;d++)n.push(1);else for(let d=0;d<r.length-2;d++)n.push(cn.adjustPadAndReturnShape(r[d+2],i[d],a[d],s[d],u,d,d+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,i,a,s,u,l){let d=n*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[u]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+r-1)/r-1)*r+i-t;return a[s]=Math.floor(l==="SAME_LOWER"?(p+1)/2:p/2),a[u]=p-a[s],Math.floor((t+p-i)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[u]-d)/r+1)}},fo=class{static getShapeOfGemmResult(e,t,r,n,i){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(n?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Ir.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},mo=-34028234663852886e22,go=34028234663852886e22}),xi,_o=W(()=>{re(),xi=(e,t)=>new(gn(t))(e)}),ki,Si,Ti,yo,Ii,wo,Ei,zi,Ci,bo,$o,Km=W(()=>{re(),At(),ki=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Si=(e,t)=>{if(t==="int32")return e;let r=ki.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,a=new(gn(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let s=new Int32Array(i);for(let u=0;u<i;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ti=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let i=BigInt64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(n.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(n.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(n,Number);return new Uint8Array(i.buffer)}case"uint8":{if(n.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(n,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},yo=1,Ii=()=>yo++,wo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ei=(e,t)=>{let r=ki.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,i)=>n*i)*r/8):0},zi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ei(this.dataType,this.tensorShape)}destroy(){me("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ti(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,i)=>n===r[i])}setIsDataConverted(e){this.isDataConverted=e}},Ci=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!(a!=null&&a.input.dataTypes.includes(t))){if(s=wo.get(t),!s||(a==null?void 0:a.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);me("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Ei(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Si(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else me("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let n=(t=this.wrapper)!=null&&t.isDataConverted?Ti(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(n):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},bo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Ii();return this.tensorTrackersById.set(e,new Ci(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){me("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){me("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),a=Ii(),s=new zi({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(a,new Ci(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,n,i,a,s){let u=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(u,t,r)){me("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}me("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:n,writable:i,readable:a});return new zi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},$o=(...e)=>new bo(...e)}),Fr,vo,xo,Qm=W(()=>{re(),sr(),_o(),Km(),At(),Fr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),vo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((i,a)=>i===n[a]&&e[i]===t[i])},xo=class{constructor(e){this.tensorManager=$o(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,vi(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){me("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){me("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)me("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(n=>n.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:n}),n}}else if(e===void 0){let r=this.mlContextCache.findIndex(n=>n.options===void 0&&n.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:n}),n}}let t=this.mlContextCache.findIndex(r=>vo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let n=this.mlContextCache.findIndex(i=>i.mlContext===t);n!==-1&&this.mlContextCache.splice(n,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){me("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let a=Fr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,n,i)}async createTemporaryTensor(e,t,r){me("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=Fr.get(t);if(!n)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Se().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");me("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return xi(r,t)}}registerMLTensor(e,t,r,n){let i=Fr.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,i,n);return me("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,r,n,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+r).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":if(s){let h=Si(new Uint8Array(d),"int64");p=new Int32Array(h.buffer),i.dataType="int32"}else p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return me("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),n.constant(i,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let n=Fr.get(or(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof n>"u"?!1:r?!!(i!=null&&i.input.dataTypes.includes(n)):!!(i!=null&&i.output.dataTypes.includes(n))}flush(){}}}),Ai=W(()=>{}),Oi,wn,bn,ko,So,Mi,Ri,To,Io,Zm=W(()=>{At(),Ai(),Oi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),wn=[],bn=e=>Math.ceil(Number(e)/16)*16,ko=e=>{for(let t=0;t<wn.length;t++){let r=wn[t];if(e<=r)return r}return Math.ceil(e/16)*16},So=1,Mi=()=>So++,Ri=async(e,t,r,n)=>{let i=bn(r),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},To=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Oi)wn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,a=bn(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,n,i)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),u.destroy(),me("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=bn(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=Mi();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),me("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=ko(e),n,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let u=(i?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?n=u.pop():n=this.backend.device.createBuffer({size:r,usage:t}):n=this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let s={id:Mi(),type:0,buffer:n};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),me("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return me("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Ri(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Oi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(me("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Io=(...e)=>new To(...e)}),Eo,be,ze=W(()=>{Eo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},be=e=>new Eo(e)}),Er,$n,Me,qe,te,Ee,Ni,zr,Ft,J,Wr,B,Y,zo,Bi,Co,Ao,oe=W(()=>{re(),ae(),Er=64,$n=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Me=(e,t=1)=>{let r=$n(e,t);return typeof r=="string"?r:r[0]},qe=(e,t=1)=>{let r=$n(e,t);return typeof r=="string"?r:r[1]},te=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:R.computeStrides(r)})}),t},Ee=e=>e%4===0?4:e%2===0?2:1,Ni=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,zr=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ft=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,J=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Wr=(e,t,r,n,i)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=$n(t,i),p=typeof d=="string"?d:d[1],h=typeof d=="string"?d:d[0],m={indices:l,value:p,storage:h,tensor:t},_=U=>typeof U=="string"?U:`${U}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",k=`${w}${e}_shape`,v=`${w}${e}_strides`,b="";for(let U=0;U<s-1;U++)b+=`
    let dim${U} = current / ${J(v,U,s)};
    let rest${U} = current % ${J(v,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;b+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=U=>(y.offsetToIndices=!0,s<2?U:`o2i_${e}(${U})`),E=[];if(s>=2)for(let U=s-1;U>=0;U--)E.push(`${J(v,U,s)} * (indices[${U}])`);let z=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=U=>(y.indicesToOffset=!0,s<2?U:`i2o_${e}(${U})`),$=(...U)=>s===0?"0u":`${m.indices}(${U.map(_).join(",")})`,M=(U,P)=>s<2?`${U}`:`${J(U,P,s)}`,D=(U,P,Q)=>s<2?`${U}=${Q};`:`${J(U,P,s)}=${Q};`,q={},G=(U,P)=>{y.broadcastedIndicesToOffset=!0;let Q=`${P.name}broadcastedIndicesTo${e}Offset`;if(Q in q)return`${Q}(${U})`;let K=[];for(let le=s-1;le>=0;le--){let Ce=P.indicesGet("outputIndices",le+P.rank-s);K.push(`${M(v,le)} * (${Ce} % ${M(k,le)})`)}return q[Q]=`fn ${Q}(outputIndices: ${P.type.indices}) -> u32 {
             return ${K.length>0?K.join("+"):"0u"};
           }`,`${Q}(${U})`},V=(U,P)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${P};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${P}), select(0u, 0xFFFFFFFFu, ${P} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${P}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${P}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),O=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),F=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${p} {
    return ${O(`i2o_${e}(indices)`)};
  }`,j=s<2?"":(()=>{let U=u.map(Q=>`d${Q}: u32`).join(", "),P=u.map(Q=>`d${Q}`).join(", ");return`
  fn get_${e}(${U}) -> ${p} {
    return get_${e}ByIndices(${$(P)});
  }`})(),X=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let P=U.map(_).join(",");return s===0?O("0u"):s===1?O(P[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${P})`)},ne=U=>s<2?O(U):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${U})`),L=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${p}) {
    ${V(`i2o_${e}(indices)`,"value")}
  }`,ge=s<2?"":(()=>{let U=u.map(Q=>`d${Q}: u32`).join(", "),P=u.map(Q=>`d${Q}`).join(", ");return`
  fn set_${e}(${U}, value: ${p}) {
    set_${e}ByIndices(${$(P)}, value);
  }`})();return{impl:()=>{let U=[],P=!1;return y.offsetToIndices&&(U.push(T),P=!0),y.indicesToOffset&&(U.push(z),P=!0),y.broadcastedIndicesToOffset&&(Object.values(q).forEach(Q=>U.push(Q)),P=!0),y.set&&(U.push(ge),P=!0),y.setByIndices&&(U.push(L),P=!0),y.get&&(U.push(j),P=!0),y.getByIndices&&(U.push(F),P=!0),!a&&P&&U.unshift(`const ${k} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${R.computeStrides(r).join(",")});`),U.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:A,broadcastedIndicesToOffset:G,indices:$,indicesGet:M,indicesSet:D,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let P=U[s];if(typeof P!="string")throw new Error("value must be string");let Q=U.slice(0,s).map(_).join(",");return s===0?V("0u",P):s===1?V(Q[0],P):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${Q}, ${P})`)},setByOffset:V,setByIndices:(U,P)=>s<2?V(U,P):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${P});`),get:X,getByOffset:O,getByIndices:ne,usage:n,name:e,strides:v,shape:k,rank:s}},B=(e,t,r,n=1)=>Wr(e,t,r,"input",n),Y=(e,t,r,n=1)=>Wr(e,t,r,"output",n),zo=(e,t,r)=>Wr(e,t,r,"atomicOutput",1),Bi=(e,t,r,n=1)=>Wr(e,t,r,"internal",n),Co=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Er){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],n=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",n=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let i=n==null||n===1?r:`vec${n}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ao=(e,t)=>new Co(e,t)}),Oo,Di,Mo,Ro,No,Bo,Ye,Do,Po,Wt=W(()=>{re(),ae(),ze(),oe(),Oo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Di=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Mo=(e,t)=>R.sortBasedOnPerm(e,Di(e.length,t)),Ro=(e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},No=(e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)e[i]!==1&&r.push(e[i]),e[t[i]]!==1&&n.push(t[i]);return{newShape:r,newPerm:n}},Bo=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Ye=(e,t)=>{let r=e.dataType,n=e.dims.length,i=Di(n,t),a=Mo(e.dims,i),s=e.dims,u=a,l=n<2||Bo(i,e.dims),d;if(l)return d=y=>{let w=B("input",r,s,4),k=Y("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(w,k)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:d};let{newShape:p,newPerm:h}=No(e.dims,i),m=R.areEqual(h,[2,3,1]),_=R.areEqual(h,[3,1,2]);if(p.length===2||m||_){s=m?[p[0],p[1]*p[2]]:_?[p[0]*p[1],p[2]]:p,u=[s[1],s[0]];let y=16;return d=w=>{let k=B("a",r,s.length),v=Y("output",r,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(k,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${y+1}>, ${y}>;
  ${w.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${k.getByIndices(`${k.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:w},...te(s,u)]}},getShaderSource:d}}return d=y=>{let w=B("a",r,s.length),k=Y("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(w,k)}

  ${Ro(i,n,w,k)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...te(s,u)]}},getShaderSource:d}},Do=(e,t)=>{Oo(e.inputs,t.perm),e.compute(Ye(e.inputs[0],t.perm))},Po=e=>be({perm:e.perm})}),Uo,Lo,Fo,Wo,qo,Go,Vo,Ho,jo,Ko,lt,Qo,Zo,Xo,Yo,Jo,eu,tu,ru,nu,iu,Xm=W(()=>{re(),ae(),oe(),Ui(),Wt(),Uo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Lo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Fo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Wo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qo=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Go=(e,t)=>{let r=[],n=e.length;for(let a=0;a<n;a++)t.indexOf(a)===-1&&r.push(e[a]);let i=t.map(a=>e[a]);return[r,i]},Vo=(e,t)=>{let r=e.length+t.length,n=[],i=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?n.push(e[i++]):n.push(1);return n},Ho=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},jo=(e,t)=>{let r=[];if(!Ho(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Ko=(e,t,r,n,i,a,s)=>{let u=r[0].dims,l=R.size(a),d=R.size(s),p=B("_A",r[0].dataType,u),h=Y("output",i,a),m=64;l===1&&(m=256);let _=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(p,h)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Fo[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${Uo[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Lo[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${n==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${Wo[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},lt=(e,t,r,n)=>{let i=e.inputs.length===1?r:Pi(e.inputs,r),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,y)=>y));let s=R.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],d=jo(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Ye(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=qo(u.length,l.dims.length));let[p,h]=Go(l.dims,u),m=p;i.keepDims&&(m=Vo(p,s)),e.compute(Ko(t,i.cacheKey,[l],n,e.inputs[0].dataType,m,h),{inputs:[l]})},Qo=(e,t)=>{lt(e,"ReduceMeanShared",t,"mean")},Zo=(e,t)=>{lt(e,"ReduceL1Shared",t,"l1")},Xo=(e,t)=>{lt(e,"ReduceL2Shared",t,"l2")},Yo=(e,t)=>{lt(e,"ReduceLogSumExpShared",t,"logSumExp")},Jo=(e,t)=>{lt(e,"ReduceMaxShared",t,"max")},eu=(e,t)=>{lt(e,"ReduceMinShared",t,"min")},tu=(e,t)=>{lt(e,"ReduceProdShared",t,"prod")},ru=(e,t)=>{lt(e,"ReduceSumShared",t,"sum")},nu=(e,t)=>{lt(e,"ReduceSumSquareShared",t,"sumSquare")},iu=(e,t)=>{lt(e,"ReduceLogSumShared",t,"logSum")}}),dt,au,vn,Pi,ct,su,ou,uu,lu,du,cu,pu,hu,fu,mu,pt,gu,_u,yu,wu,bu,$u,vu,xu,ku,Su,Ui=W(()=>{re(),ae(),ze(),oe(),Xm(),dt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},au=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],vn=(e,t,r,n,i,a,s=!1,u=!1)=>{let l=[],d=r[0].dims,p=d.length,h=R.normalizeAxes(i,p),m=!u&&h.length===0;d.forEach((w,k)=>{m||h.indexOf(k)>=0?s&&l.push(1):l.push(w)});let _=l.length,y=R.size(l);return{name:e,shaderCache:t,getShaderSource:w=>{let k=[],v=B("_A",r[0].dataType,p),b=Y("output",a,_),T=n(v,b,h),S=T[2];for(let E=0,z=0;E<p;E++)m||h.indexOf(E)>=0?(s&&z++,S=`for(var j${E}: u32 = 0; j${E} < ${d[E]}; j${E}++) {
                  ${T[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${S}
                }`):(k.push(`${v.indicesSet("input_indices",E,b.indicesGet("output_indices",z))};`),z++);return`

        ${w.registerUniform("output_size","u32").declareVariables(v,b)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${k.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${S}
          ${T[3]}
          ${T.length===4?b.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...te(d,l)]})}},Pi=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),be({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ct=(e,t,r,n)=>{let i=e.inputs,a=i.length===1?r:Pi(i,r);e.compute(vn(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?au:n,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},su=(e,t)=>{dt(e.inputs),ct(e,"ReduceLogSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ou=(e,t)=>{dt(e.inputs),ct(e,"ReduceL1",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},uu=(e,t)=>{dt(e.inputs),ct(e,"ReduceL2",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lu=(e,t)=>{dt(e.inputs),ct(e,"ReduceLogSumExp",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},du=(e,t)=>{dt(e.inputs),ct(e,"ReduceMax",t,(r,n,i)=>{let a=[];for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},cu=(e,t)=>{dt(e.inputs),ct(e,"ReduceMean",t,(r,n,i)=>{let a=1;for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${a});`]})},pu=(e,t)=>{dt(e.inputs),ct(e,"ReduceMin",t,(r,n,i)=>{let a=[];for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},hu=(e,t)=>{dt(e.inputs),ct(e,"ReduceProd",t,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},fu=(e,t)=>{dt(e.inputs),ct(e,"ReduceSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},mu=(e,t)=>{dt(e.inputs),ct(e,"ReduceSumSquare",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},pt=(e,t,r)=>{if(t.length===0)return r;let n=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?n*=e[a]:i*=e[a];return i<32&&n>1024},gu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cu(e,t):Qo(e,t)},_u=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ou(e,t):Zo(e,t)},yu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?uu(e,t):Xo(e,t)},wu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lu(e,t):Yo(e,t)},bu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?du(e,t):Jo(e,t)},$u=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pu(e,t):eu(e,t)},vu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hu(e,t):tu(e,t)},xu=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fu(e,t):ru(e,t)},ku=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):nu(e,t)},Su=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?su(e,t):iu(e,t)}}),Li,Tu,Iu,Fi,Ym=W(()=>{re(),ze(),Ui(),Li=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Tu=(e,t)=>{Li(e.inputs);let r=(n,i,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(vn("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Iu=(e,t)=>{Li(e.inputs);let r=(n,i,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(vn("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Fi=e=>be(e)}),Eu,xn,zu,Cu,Au,qr,Ou,Mu,Wi=W(()=>{re(),ae(),Ai(),oe(),Eu=(e,t)=>{let r=e[0],n=e[1],i=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],p=r.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=i.dims[0]/3,m=h,_=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=d;if(h!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==h+m+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(m!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let k=y+w,v=-1,b=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:k,maxSequenceLength:v,inputHiddenSize:p,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},xn=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,zu=(e,t,r,n,i,a,s,u)=>{let l=Ee(s?1:a),d=64,p=a/l;p<d&&(d=32);let h=Math.ceil(a/l/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:p},{type:12,data:h}],_=Me(e.dataType,l),y=qe(1,l),w=["type"];s&&w.push("type"),u&&w.push("type");let k=v=>{let b=Y("x",e.dataType,e.dims,l),T=[b],S=s?B("seq_lens",s.dataType,s.dims):void 0;S&&T.push(S);let E=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;E&&T.push(E);let z=qe(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(A).declareVariables(...T)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${xn(S,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${_};${l}`,inputDependencies:w},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*r},programUniforms:m})}},Cu=(e,t,r,n,i,a,s,u,l)=>{let d=s+a.kvSequenceLength,p=[a.batchSize,a.numHeads,a.sequenceLength,d],h=e>1&&n,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,m,d,a.headSize]:void 0,y=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,k=Ee(a.headSize),v=a.headSize/k,b=12,T={x:Math.ceil(d/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},S=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:y}],E=h&&n&&R.size(n.dims)>0,z=["type","type"];E&&z.push("type"),i&&z.push("type"),u&&z.push("type"),l&&z.push("type");let A=[{dims:p,dataType:t.dataType,gpuDataType:0}];h&&A.push({dims:_,dataType:t.dataType,gpuDataType:0});let $=M=>{let D=B("q",t.dataType,t.dims,k),q=B("key",r.dataType,r.dims,k),G=[D,q];if(E){let L=B("past_key",n.dataType,n.dims,k);G.push(L)}i&&G.push(B("attention_bias",i.dataType,i.dims));let V=u?B("seq_lens",u.dataType,u.dims):void 0;V&&G.push(V);let O=l?B("total_sequence_length_input",l.dataType,l.dims):void 0;O&&G.push(O);let F=Y("output",t.dataType,p),j=[F];h&&j.push(Y("present_key",t.dataType,_,k));let X=qe(1,k),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${D.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${D.type.storage}, ${b*b}>;
  ${M.registerUniforms(ne).declareVariables(...G,...j)}
  ${M.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${xn(V,O,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${X}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${X}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${F.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${i!==void 0};${n!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:S}),getShaderSource:$}},Au=(e,t,r,n,i,a,s=void 0,u=void 0)=>{let l=a+i.kvSequenceLength,d=i.nReps?i.nReps:1,p=i.vHiddenSize*d,h=e>1&&n,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=h?[i.batchSize,m,l,i.headSize]:void 0,y=[i.batchSize,i.sequenceLength,p],w=12,k={x:Math.ceil(i.vHeadSize/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},v=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:p},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:d}],b=h&&n&&R.size(n.dims)>0,T=["type","type"];b&&T.push("type"),s&&T.push("type"),u&&T.push("type");let S=[{dims:y,dataType:t.dataType,gpuDataType:0}];h&&S.push({dims:_,dataType:t.dataType,gpuDataType:0});let E=z=>{let A=B("probs",t.dataType,t.dims),$=B("v",r.dataType,r.dims),M=[A,$];b&&M.push(B("past_value",n.dataType,n.dims));let D=s?B("seq_lens",s.dataType,s.dims):void 0;s&&M.push(D);let q=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;u&&M.push(q);let G=[Y("output",t.dataType,y)];h&&G.push(Y("present_value",t.dataType,_));let V=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${A.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${A.type.value}, ${w*w}>;
  ${z.registerUniforms(V).declareVariables(...M,...G)}
  ${z.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${xn(D,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:S,dispatchGroup:k,programUniforms:v}),getShaderSource:E}},qr=(e,t,r,n,i,a,s,u,l,d,p=void 0,h=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=m>1?d.pastSequenceLength:0,y=_+d.kvSequenceLength,w=l&&R.size(l.dims)>0?l:void 0,k=[t,r];m>1&&s&&R.size(s.dims)>0&&k.push(s),w&&k.push(w),p&&k.push(p),h&&k.push(h);let v=e.compute(Cu(m,t,r,s,w,d,_,p,h),{inputs:k,outputs:m>1?[-1,1]:[-1]})[0];e.compute(zu(v,d.batchSize,d.numHeads,_,d.sequenceLength,y,p,h),{inputs:p&&h?[v,p,h]:[v],outputs:[]});let b=[v,n];m>1&&u&&R.size(u.dims)>0&&b.push(u),p&&b.push(p),h&&b.push(h),e.compute(Au(m,v,n,u,d,_,p,h),{inputs:b,outputs:m>1?[0,2]:[0]})},Ou=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=h=>{let m=Y("output_q",l[0].dataType,r),_=Y("output_k",l[0].dataType,r),y=Y("output_v",l[0].dataType,r),w=B("input",l[0].dataType,l[0].dims),k=B("weight",l[1].dataType,l[1].dims),v=B("bias",l[2].dataType,l[2].dims),b=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${h.registerUniforms(T).declareVariables(w,k,v,m,_,y)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},Mu=(e,t)=>{let r=Eu(e.inputs,t),[n,i,a]=Ou(e,r);return qr(e,n,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ru,Nu,Bu,Du,Jm=W(()=>{tt(),re(),ae(),ze(),oe(),Ru=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,i,a)=>{let s=i.length;if(s!==n.length)throw new Error(`${a}: num dimensions != ${s}`);i.forEach((u,l)=>{if(u!==n[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Nu=(e,t)=>{let{epsilon:r,spatial:n,format:i}=t,a=e[0].dims,s=n?Ee(a[a.length-1]):1,u=i==="NHWC"&&a.length>1?s:1,l=R.size(a)/s,d=n,p=d?a.length:a,h=B("x",e[0].dataType,e[0].dims,s),m=B("scale",e[1].dataType,e[1].dims,u),_=B("bias",e[2].dataType,e[2].dims,u),y=B("inputMean",e[3].dataType,e[3].dims,u),w=B("inputVar",e[4].dataType,e[4].dims,u),k=Y("y",e[0].dataType,p,s),v=()=>{let T="";if(n)T=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(i==="NCHW")T=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let S=1;S<m.rank;S++)T+=`cIndices[${S}] = outputIndices[${S}];`;T+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return T},b=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(h,m,_,y,w,k)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...te(a)]:[{type:12,data:l}]})}},Bu=e=>be(e),Du=(e,t)=>{let{inputs:r,outputCount:n}=e,i=Bu({...t,outputCount:n});if(ke.webgpu.validateInputContent&&Ru(r,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Nu(r,i))}}),Pu,Uu,Lu,eg=W(()=>{ae(),oe(),Pu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Uu=e=>{let t=e[0].dims,r=e[0].dims[2],n=R.size(t)/4,i=e[0].dataType,a=B("input",i,t,4),s=B("bias",i,[r],4),u=B("residual",i,t,4),l=Y("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(a,s,u,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Lu=e=>{Pu(e.inputs),e.compute(Uu(e.inputs))}}),Fu,we,Wu,qu,Gu,Vu,Hu,ju,Ku,Qu,Zu,Xu,Yu,Ju,el,tl,Gr,rl,kn,nl,il,al,sl,ol,ul,ll,dl,cl,pl,hl,fl,ml,gl,_l,yl,qi,wl,Gi,Vi,bl,$l,vl,xl,kl,Sl,Hi=W(()=>{re(),ae(),ze(),oe(),Fu=(e,t,r,n,i,a,s)=>{let u=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let d=B("inputData",r,[u],4),p=Y("outputData",n,[u],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(d,p)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},we=(e,t,r,n,i,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:d=>Fu(d,R.size(e.dims),e.dataType,a,r,n,u),getRunData:d=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(R.size(d[0].dims)/64/4)},programUniforms:l})}},Wu=e=>{e.compute(we(e.inputs[0],"Abs","abs"))},qu=e=>{e.compute(we(e.inputs[0],"Acos","acos"))},Gu=e=>{e.compute(we(e.inputs[0],"Acosh","acosh"))},Vu=e=>{e.compute(we(e.inputs[0],"Asin","asin"))},Hu=e=>{e.compute(we(e.inputs[0],"Asinh","asinh"))},ju=e=>{e.compute(we(e.inputs[0],"Atan","atan"))},Ku=e=>{e.compute(we(e.inputs[0],"Atanh","atanh"))},Qu=e=>be(e),Zu=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(we(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Xu=e=>{let t,r,n=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return be({min:t,max:r})},Yu=(e,t)=>{let r=t||Xu(e.inputs),n=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Ju=e=>{e.compute(we(e.inputs[0],"Ceil","ceil"))},el=e=>{e.compute(we(e.inputs[0],"Cos","cos"))},tl=e=>{e.compute(we(e.inputs[0],"Cosh","cosh"))},Gr=e=>be(e),rl=(e,t)=>{let r=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},kn=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,nl=e=>{let t=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,kn(t)))},il=e=>{e.compute(we(e.inputs[0],"Exp","exp"))},al=e=>{e.compute(we(e.inputs[0],"Floor","floor"))},sl=e=>{let t=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,kn(t)))},ol=(e,t)=>{let r=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},ul=e=>{e.compute(we(e.inputs[0],"Not",t=>`!${t}`))},ll=e=>{e.compute(we(e.inputs[0],"Neg",t=>`-${t}`))},dl=e=>{e.compute(we(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},cl=e=>{let t=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},pl=e=>{e.compute(we(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},hl=e=>be(e),fl=(e,t)=>{let r=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},ml=e=>{e.compute(we(e.inputs[0],"Sin","sin"))},gl=e=>{e.compute(we(e.inputs[0],"Sinh","sinh"))},_l=e=>{e.compute(we(e.inputs[0],"Sqrt","sqrt"))},yl=e=>{e.compute(we(e.inputs[0],"Tan","tan"))},qi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,wl=e=>{e.compute(we(e.inputs[0],"Tanh",qi))},Gi=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${qi("v")};
}
`,Vi=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,bl=e=>{let t=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"FastGelu",Vi,Gi(t),void 0,e.inputs[0].dataType))},$l=(e,t)=>{let r=qe(e.inputs[0].dataType);return e.compute(we(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},vl=e=>{e.compute(we(e.inputs[0],"Log","log"))},xl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,kl=e=>`quick_gelu_impl(${e})`,Sl=(e,t)=>{let r=qe(e.inputs[0].dataType);e.compute(we(e.inputs[0],"QuickGelu",kl,xl(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Tl,Il,El,tg=W(()=>{ae(),oe(),Hi(),Tl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Il=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=B("input",e[0].dataType,e[0].dims,4),n=B("bias",e[0].dataType,[e[0].dims[2]],4),i=Y("output",e[0].dataType,t,4),a=R.size(t)/4,s=Me(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,n,i)}

  ${kn(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},El=e=>{Tl(e.inputs),e.compute(Il(e.inputs))}}),zl,Cl,ht,Al,Ol,Ml,Rl,Nl,Bl,Dl,Pl,Ul,Ll,rg=W(()=>{re(),ae(),oe(),zl=(e,t,r,n,i,a,s,u,l,d,p,h)=>{let m,_;typeof u=="string"?m=_=(b,T)=>`${u}((${b}),(${T}))`:typeof u=="function"?m=_=u:(m=u.scalar,_=u.vector);let y=Y("outputData",p,n.length,4),w=B("aData",l,t.length,4),k=B("bData",d,r.length,4),v;if(i)if(a){let b=R.size(t)===1,T=R.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;b||T?v=y.setByOffset("global_idx",_(b?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||S?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",_(w.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(T,S,E="")=>{let z=`aData[indexA${S}][componentA${S}]`,A=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${y.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${w.broadcastedIndicesToOffset(`outputIndices${S}`,y)};
            let offsetB${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,y)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${T}[${S}] = ${E}(${m(z,A)});
          `};p===9?v=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,k,y)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Cl=(e,t,r,n,i,a,s=r.dataType)=>{let u=r.dims.map(Number),l=n.dims.map(Number),d=!R.areEqual(u,l),p=u,h=R.size(u),m=!1,_=!1,y=[d];if(d){let w=Ir.calcShape(u,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");p=w.slice(),h=R.size(p);let k=R.size(u)===1,v=R.size(l)===1,b=u.length>0&&u[u.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;y.push(k),y.push(v),y.push(b),y.push(T);let S=1;for(let E=1;E<p.length;E++){let z=u[u.length-E],A=l[l.length-E];if(z===A)S*=z;else break}S%4===0?(_=!0,m=!0):(k||v||b||T)&&(m=!0)}else m=!0;return y.push(m),{name:e,shaderCache:{hint:t+y.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>zl(w,u,l,p,m,d,_,i,r.dataType,n.dataType,s,a),getRunData:()=>({outputs:[{dims:p,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(p)/4)},...te(u,l,p)]})}},ht=(e,t,r,n,i,a)=>{e.compute(Cl(t,i??"",e.inputs[0],e.inputs[1],r,n,a))},Al=e=>{ht(e,"Add",(t,r)=>`${t}+${r}`)},Ol=e=>{ht(e,"Div",(t,r)=>`${t}/${r}`)},Ml=e=>{ht(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Rl=e=>{ht(e,"Mul",(t,r)=>`${t}*${r}`)},Nl=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ht(e,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Bl=e=>{ht(e,"Sub",(t,r)=>`${t}-${r}`)},Dl=e=>{ht(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Pl=e=>{ht(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Ul=e=>{ht(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Ll=e=>{ht(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Fl,Wl,ql,Gl,Vl,Hl,ng=W(()=>{re(),ae(),ze(),oe(),Fl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],i=n.dataType,a=n.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==i)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==n.dims[d])throw new Error("non concat dimensions must match")})}})},Wl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,ql=(e,t)=>{let r=e.length,n=[];for(let i=0;i<r;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));r===1?n.push(a):i===0?n.push(`if (inputIndex == ${i}u) { ${a} }`):i===r-1?n.push(`else { ${a} }`):n.push(`else if (inputIndex == ${i}) { ${a} }`)}return n.join(`
`)},Gl=(e,t,r,n)=>{let i=R.size(r),a=new Array(e.length),s=new Array(e.length),u=0,l=[],d=[],p=[{type:12,data:i}];for(let w=0;w<e.length;++w)u+=e[w].dims[t],a[w]=u,d.push(e[w].dims.length),s[w]=B(`input${w}`,n,d[w]),l.push("rank"),p.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)p.push(...te(e[w].dims));p.push(...te(r));let h=Y("output",n,r.length),m=h.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),y=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)w.registerUniform(`sizeInConcatAxis${k}`,"u32");return w.declareVariables(...s,h)})()}

  ${Wl(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${ql(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:y}},Vl=(e,t)=>{let r=e.inputs,n=r[0].dims,i=R.normalizeAxis(t.axis,n.length);Fl(r,i);let a=n.slice();a[i]=r.reduce((u,l)=>u+(l.dims.length>i?l.dims[i]:0),0);let s=r.filter(u=>R.size(u.dims)>0);e.compute(Gl(s,i,a,r[0].dataType),{inputs:s})},Hl=e=>be({axis:e.axis})}),lr,dr,cr,ji,pr=W(()=>{re(),ae(),lr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},dr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},cr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},ji=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,n]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=(e==null?void 0:e.activation_params)||[mo,go];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),De,jl,Ki=W(()=>{De=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},jl=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Kl,ig=W(()=>{Kl=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Vr,Qi,Zi=W(()=>{re(),ae(),oe(),pr(),Vr=(e,t,r,n,i)=>{let a=n-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${J(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,J(i,u+a,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Qi=(e,t,r,n,i=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],d=u[u.length-1],p=s[s.length-1],h=Ee(d),m=Ee(p),_=Ee(l),y=R.size(r)/h/_,w=e.length>2,k=n?n.slice(0,-2):r.slice(0,-2),v=[R.size(k),l,d],b=[{type:12,data:y},{type:12,data:l},{type:12,data:d},{type:12,data:p}];dr(t,b),b.push(...te(k,s,u)),w&&b.push(...te(e[2].dims)),b.push(...te(v));let T=S=>{let E=Bi("batch_dims",e[0].dataType,k.length),z=B("a",e[0].dataType,s.length,m),A=B("b",e[1].dataType,u.length,h),$=Y("output",e[0].dataType,v.length,h),M=Me($.type.tensor),D=lr(t,$.type.value,M),q=[z,A],G="";if(w){let F=i?h:1;q.push(B("bias",e[2].dataType,e[2].dims.length,F)),G=`${i?`value += bias[col / ${F}];`:`value += ${$.type.value}(bias[row + i]);`}`}let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];cr(t,V);let O=()=>{let F=`var a_data: ${z.type.value};`;for(let j=0;j<m;j++)F+=`
              let b_data${j} = b[(b_offset + (k + ${j}) * uniforms.N + col) / ${h}];`;for(let j=0;j<_;j++){F+=`a_data = a[(a_offset + (row + ${j}) * uniforms.K + k) / ${m}];`;for(let X=0;X<m;X++)F+=`
            values[${j}] = fma(${A.type.value}(a_data${m===1?"":`[${X}]`}), b_data${X}, values[${j}]);
`}return F};return`
  ${S.registerUniforms(V).registerInternalVariables(E).declareVariables(...q,$)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${Vr("a_indices",z,z.rank-2,E.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${Vr("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${O()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${G}
      ${D}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${m};${_};${i}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:b}),getShaderSource:T}}}),Ql,Zl,Xi,Yi,Xl,Ji,Yl,Sn,ea=W(()=>{re(),ae(),oe(),pr(),Zi(),Ki(),Ql=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Zl=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Xi=(e,t,r="f32",n,i=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=i?l:a,h=i?a:l,m=p/t[0],_=a/t[1];if(!((i&&m===4&&e[1]===4||!i&&(m===3||m===4))&&p%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${p/m}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Ql(i,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Zl(i,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Yi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Xl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ji=(e,t,r="f32",n,i=!1,a=32,s=!1,u=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],h=i?d:a,m=i?a:d;if(!(m%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=m/t[1],y=h/t[0],w=a/t[1],k=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Yi(i,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Yi(i,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Xl(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${p}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Yl=(e,t,r,n,i=!1)=>{let[a,s,u,l]=n,d=Me(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${De(e,d)} {
      var value = ${De(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Vr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${De(e,d)} {
      var value = ${De(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${Vr("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${De(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${De(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Sn=(e,t,r,n,i=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),d=u.slice(0,-2),p=n?n.slice(0,-2):r.slice(0,-2),h=R.size(p),m=s[s.length-2],_=s[s.length-1],y=u[u.length-1],w=_%4===0&&y%4===0,k=m<=8?[4,1,1]:[4,4,1],v=[8,8,1],b=[Math.ceil(y/v[0]/k[0]),Math.ceil(m/v[1]/k[1]),Math.ceil(h/v[2]/k[2])],T=w?4:1,S=[...l,m,_/T],E=S.length,z=[...d,_,y/T],A=z.length,$=[h,m,y/T],M=[{type:6,data:m},{type:6,data:y},{type:6,data:_}];dr(t,M),M.push(...te(p,S,z));let D=["rank","rank"],q=e.length>2;q&&(M.push(...te(e[2].dims)),D.push("rank")),M.push(...te($));let G=V=>{let O=p.length,F=Bi("batchDims",e[0].dataType,O,1),j=Me(e[0].dataType),X=B("a",e[0].dataType,E,T),ne=B("b",e[1].dataType,A,T),L=Y("result",e[0].dataType,$.length,T),ge=[X,ne];if(q){let le=i?T:1;ge.push(B("bias",e[2].dataType,e[2].dims.length,le))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];cr(t,U);let P=Me(L.type.tensor),Q=lr(t,L.type.value,P),K=Yl(T,q,Q,[F,X,ne,L],i);return`
  ${V.registerUniforms(U).registerInternalVariables(F).declareVariables(...ge,L)}
  ${K}
  ${w?Xi(k,v,j,F):Ji(k,v,j,F)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${w};${i}`,inputDependencies:D},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:M}),getShaderSource:G}}}),Jl,ed,ag=W(()=>{re(),At(),oe(),pr(),Ki(),ig(),ea(),Jl=(e,t,r,n,i=!1,a,s=4,u=4,l=4,d="f32")=>{let p=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},h=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=e?"row":"col",v=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${De(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${w}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(s)}
    }
    return resData;`,T=e?t&&n?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${De(s,d)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${De(s,d)}(0.0);`,S=e?n&&r?h(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${De(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${De(u,d)}(0.0);`,E=De(l,d),z=De(e?s:u,d),A=De(e?u:s,d),$=lr(a,E,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?T:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${jl(i)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ed=(e,t,r,n,i,a,s,u,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],h=r[0],m=d?r[2]:r[3],_=d?r[1]:r[2],y=d?r[3]:r[1],w=d&&(p%4===0||p%3===0)&&y%4===0,k=d?y:m*_,v=d?m*_:y,b=[8,8,1],T=n<=8?[4,1,1]:[4,4,1],S=[Math.ceil(k/b[0]/T[0]),Math.ceil(v/b[1]/T[1]),Math.ceil(h/b[2]/T[2])];me("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let E=w?d&&p%4!==0?3:4:1,z=b[1]*T[1],A=b[0]*T[0],$=Math.max(b[0]*E,b[1]),M=n%z===0,D=i%A===0,q=a%$===0,G=w?[E,4,4]:[1,1,1],V=[{type:6,data:n},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];dr(t,V),V.push(...te(e[0].dims,e[1].dims));let O=["rank","rank"];s&&(V.push(...te(e[2].dims)),O.push("rank")),V.push(...te(r));let F=j=>{let X=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];cr(t,X);let ne=w?4:1,L=Me(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${L}>`:L}) {
        result[flatIndex] = ${w?`vec4<${L}>`:L}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${L}>`:L}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,U=B("x",e[0].dataType,e[0].dims.length,E===3?1:E),P=B("w",e[1].dataType,e[1].dims.length,ne),Q=[U,P],K=Y("result",e[0].dataType,r.length,ne);if(s){let le=B("bias",e[2].dataType,e[2].dims.length,ne);Q.push(le),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${L}>`:L} {
          return bias[coords.${d?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Kl("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${j.registerUniforms(X).declareVariables(...Q,K)}
        ${ge}
        ${Jl(d,M,D,q,s,t,G[0],G[1],G[2],L)}
        ${w?Xi(T,b,L,void 0,!d,$):Ji(T,b,L,void 0,!d,$,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${w};${M};${D};${q};${z};${A};${$}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:V}),getShaderSource:F}}}),td,ta,Hr,rd,ra,nd,id,ad,sg=W(()=>{re(),At(),ae(),oe(),pr(),Ki(),td=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ta=e=>typeof e=="number"?[e,e,e]:e,Hr=(e,t)=>t<=1?e:e+(e-1)*(t-1),rd=(e,t,r,n=1)=>{let i=Hr(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)},ra=(e,t,r,n,i)=>{i==null&&(i=rd(e,t[0],n[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*i>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*i)/n[s]+1));return a},nd=(e,t,r,n,i,a,s,u,l,d)=>{let p,h,m,_;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=ra([t,r,n,1],[u,l,d],1,[i,a,s],e);h=y[0],m=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((w,k,v)=>w===v[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=ra([t,r,n,1],[u,l,d],1,[i,a,s],e[0]);h=y[0],m=y[1],_=y[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/i),m=Math.ceil(r/a),_=Math.ceil(n/s);let y=(h-1)*i+u-t,w=(m-1)*a+l-r,k=(_-1)*s+d-n,v=Math.floor(y/2),b=y-v,T=Math.floor(w/2),S=w-T,E=Math.floor(k/2),z=k-E;p={top:T,bottom:S,left:E,right:z,front:v,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:h,outHeight:m,outWidth:_}},id=(e,t,r,n,i,a=!1,s="channelsLast")=>{let u,l,d,p,h;if(s==="channelsLast")[u,l,d,p,h]=e;else if(s==="channelsFirst")[u,h,l,d,p]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,_,y,w]=t,[k,v,b]=ta(r),[T,S,E]=ta(n),z=Hr(_,T),A=Hr(y,S),$=Hr(w,E),{padInfo:M,outDepth:D,outHeight:q,outWidth:G}=nd(i,l,d,p,k,v,b,z,A,$),V=a?m*h:m,O=[0,0,0,0,0];return s==="channelsFirst"?O=[u,V,D,q,G]:s==="channelsLast"&&(O=[u,D,q,G,V]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:d,inWidth:p,inChannels:h,outDepth:D,outHeight:q,outWidth:G,outChannels:V,padInfo:M,strideDepth:k,strideHeight:v,strideWidth:b,filterDepth:_,filterHeight:y,filterWidth:w,effectiveFilterDepth:z,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:T,dilationHeight:S,dilationWidth:E,inShape:e,outShape:O,filterShape:t}},ad=(e,t,r,n,i,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],l={x:r.map((k,v)=>v)},d=[Math.ceil(td(l.x.map(k=>r[k]))/u[0]),1,1];me("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=1,h=R.size(r),m=[{type:12,data:h},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];dr(t,m),m.push(...te(e[0].dims,e[1].dims));let _=["rank","rank"],y=e.length===3;y&&(m.push(...te(e[2].dims)),_.push("rank")),m.push(...te(r));let w=k=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];cr(t,v);let b=1,T=Me(e[0].dataType),S=B("x",e[0].dataType,e[0].dims.length,p),E=B("W",e[1].dataType,e[1].dims.length,b),z=[S,E],A=Y("result",e[0].dataType,r.length,b),$="";if(y){let q=B("bias",e[2].dataType,e[2].dims.length,b);z.push(q),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${T} {
          return bias[${s?J("coords",4,5):J("coords",1,5)}];
        }`}let M=De(p,T),D=lr(t,M,T);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${k.registerUniforms(v).declareVariables(...z,A)}
          ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${J("coords",0,S.rank)};
              let d2 = ${s?J("coords",S.rank-1,S.rank):J("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?J("coords",1,S.rank):J("coords",2,S.rank)},
              ${s?J("coords",2,S.rank):J("coords",3,S.rank)},
              ${s?J("coords",3,S.rank):J("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?J("uniforms.x_shape",1,S.rank):J("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?J("uniforms.x_shape",2,S.rank):J("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?J("uniforms.x_shape",3,S.rank):J("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?J("uniforms.x_shape",4,S.rank):J("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${y?"value = value + getBiasByOutputCoords(coords)":""};
              ${D}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${y}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:w}}}),sd,od,og=W(()=>{re(),ae(),oe(),pr(),sd=(e,t,r,n)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],p=d/t.group,h=l&&p>=4?Ee(d):1,m=R.size(r)/h,_=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];dr(t,_),_.push(...te(s,[u[0],u[1],u[2],u[3]/h]));let y=i?["rank","rank","rank"]:["rank","rank"];_.push(...te([r[0],r[1],r[2],r[3]/h]));let w=k=>{let v=Y("output",e[0].dataType,r.length,h),b=Me(v.type.tensor),T=lr(t,v.type.value,b),S=B("x",e[0].dataType,s.length),E=B("w",e[1].dataType,u.length,h),z=[S,E];i&&z.push(B("b",e[2].dataType,e[2].dims,h));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];cr(t,A);let $=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(A).declareVariables(...z,v)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${$}
    ${a}
    ${T}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:w}},od=(e,t,r,n)=>{let i=e.length>2,a=Ee(r[3]),s=Ee(r[2]),u=R.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],p=[r[0],r[1],r[2],r[3]/a],h=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];dr(t,h),h.push(...te(l,d,p));let m=(s-1)*t.strides[1]+d[1],_=y=>{let w=Y("output",e[0].dataType,p.length,a),k=Me(w.type.tensor),v=lr(t,w.type.value,k),b=B("x",e[0].dataType,l.length,a),T=B("w",e[1].dataType,d.length,a),S=[b,T];i&&S.push(B("b",e[2].dataType,e[2].dims,a));let E=i?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return cr(t,z),`
  ${y.registerUniforms(z).declareVariables(...S,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${m}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${m};${d[0]};${d[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:_}}}),ud,Tn,ld,In,na,ia,dd,cd,aa,ug=W(()=>{ae(),ag(),sg(),ea(),og(),pr(),Zi(),Wt(),ud=(e,t,r,n,i,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,d=t[0],p=t.slice(2).map((m,_)=>m+(m-1)*(r[_]-1)),h=u.map((m,_)=>m+n[_]+n[_+l]).map((m,_)=>Math.floor((m-p[_]+i[_])/i[_]));return h.splice(0,0,s),h.splice(a?3:1,0,d),h},Tn=[2,3,1,0],ld=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},In=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let n=e.pads.slice();yn.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},na=e=>{let t=ji(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:n,format:r,dilations:i,group:a,kernelShape:s,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},ia=(e,t,r,n)=>{let i=r.format==="NHWC",a=ud(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,i);if(r.group!==1){let z=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(Ye(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),z.push(A)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(od(z,r,a,n),{inputs:z}):e.compute(sd(z,r,a,n),{inputs:z});return}let s=t.length===3,u=t[0].dims[i?1:2],l=t[0].dims[i?2:3],d=t[0].dims[i?3:1],p=t[1].dims[2],h=t[1].dims[3],m=a[i?1:2],_=a[i?2:3],y=a[i?3:1],w=i&&p===u&&h===l&&r.pads[0]===0&&r.pads[1]===0;if(w||p===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=a[0],A,$,M,D=[];if(i){let V=e.kernelCustomData.wT??e.compute(Ye(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=V),w){let O=u*l*d;A=t[0].reshape([1,z,O]),$=V.reshape([1,O,y]),M=[1,z,y]}else A=t[0].reshape([z,u*l,d]),$=V.reshape([1,d,y]),M=[z,m*_,y];D.push(A),D.push($)}else A=t[0].reshape([z,d,u*l]),$=t[1].reshape([1,y,d]),M=[z,y,m*_],D.push($),D.push(A);s&&D.push(t[2]);let q=M[2],G=D[0].dims[D[0].dims.length-1];q<8&&G<8?e.compute(Qi(D,r,a,M,i,n),{inputs:D}):e.compute(Sn(D,r,a,M,i,n),{inputs:D});return}let k=!0,v=e.kernelCustomData.wT??e.compute(Ye(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let b=[t[0],v];s&&b.push(t[2]);let T=i?m*_:y,S=i?y:m*_,E=p*h*d;e.compute(ed(b,r,a,T,S,E,s,k,n),{inputs:b})},dd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=In({...t,pads:i,strides:a,dilations:s,kernelShape:u},n);ia(e,n,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},cd=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",i=In(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=id(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,n);e.compute(ad(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},aa=(e,t)=>{if(ld(e.inputs,t),e.inputs[0].dims.length===3)dd(e,t);else if(e.inputs[0].dims.length===5)cd(e,e.inputs,t);else{let r=In(t,e.inputs);ia(e,e.inputs,r)}}}),pd,lg=W(()=>{re(),At(),ae(),oe(),pd=(e,t,r)=>{let n=e.length>2,i=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,d=u[3],p=a?Ee(l):1,h=a&&d===1&&l>=4,m=h?Math.floor(l/4)*4:Math.floor(l/p)*p,_=l-m,y=a?Ee(d):1,w=a?d===1?p:y:1,k=R.size(i)/y,v=[Math.ceil(k/64),1,1];me("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let b=["rank","rank"],T=[t.strides[0],t.strides[1]],S=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],E=[t.dilations[0],t.dilations[1]],z=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:k},{type:12,data:T},{type:12,data:S},{type:12,data:E},{type:12,data:z},{type:6,data:A},{type:12,data:m},{type:12,data:l},{type:12,data:d},...te(e[0].dims,e[1].dims)];n&&($.push(...te(e[2].dims)),b.push("rank")),$.push(...te(i));let M=D=>{let q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Me(e[0].dataType),V=a?1:2,O=a?2:3,F=a?3:1,j=B("W",e[1].dataType,e[1].dims.length,w),X=B("Dy",e[0].dataType,e[0].dims.length,p),ne=[X,j];n&&ne.push(B("bias",e[2].dataType,[i[F]].length,y));let L=Y("result",e[0].dataType,i.length,y),ge=()=>{let Q="";if(h)p===4?Q+=`
        let xValue = ${X.getByOffset("x_offset")};
        let wValue = ${j.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${X.getByOffset("x_offset")}, ${X.getByOffset("x_offset + 1u")}), vec4<${G}>(${j.getByOffset("w_offset")}, ${j.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${X.getByOffset("x_offset")}, ${X.getByOffset("x_offset + 1u")}, ${X.getByOffset("x_offset + 2u")}, ${X.getByOffset("x_offset + 3u")}), vec4<${G}>(${j.getByOffset("w_offset")}, ${j.getByOffset("w_offset + 1u")}, ${j.getByOffset("w_offset + 2u")}, ${j.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Q+=`
                  let xValue = ${a?X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):X.get("batch","inputChannel","idyR","idyC")};
        `,p===1)Q+=`
          let w_offset = ${j.indicesToOffset(`${j.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${j.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let K=0;K<p;K++)Q+=`
            let wValue${K} = ${j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${K}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${K}] * wValue${K};`;return Q},U=()=>{if(_===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let Q="";if(p===1){Q+="dotProd = dotProd";for(let K=0;K<_;K++)Q+=`
            + ${X.getByOffset(`x_offset + ${K}`)} * ${j.getByOffset(`w_offset + ${K}`)}`;Q+=";"}else if(p===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);Q+=`
          let xValue = ${X.getByOffset("x_offset")};
          let wValue = ${j.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Q},P=`
            let outputIndices = ${L.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${L.indicesGet("outputIndices",0)};
            let d1 = ${L.indicesGet("outputIndices",F)};
            let r = ${L.indicesGet("outputIndices",V)};
            let c = ${L.indicesGet("outputIndices",O)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${L.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${G}(dyRCorner) + ${G}(wR)) / ${G}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${V}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${G}(dyCCorner) + ${G}(wC)) / ${G}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${O}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${X.indicesToOffset(`${X.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${j.indicesToOffset(`${j.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:p}) {
                  ${ge()}
                  inputChannel = inputChannel + ${h?4:p};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${y}]`:""};
            ${L.setByOffset("global_idx","value")};
          `;return`
    ${D.registerUniforms(q).declareVariables(...ne,L)}
      ${D.mainStart()}
      ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${P}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${w}${y}${h}${_}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:M}}}),hd,fd,md,sa,gd,_d,oa,yd,wd,dg=W(()=>{lg(),pr(),Wt(),hd=(e,t,r,n,i,a)=>(e-1)*t+r+(n-1)*i+1-a,fd=(e,t,r,n,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=a,r[i]=e-a):t==="SAME_LOWER"&&(r[n]=e-a,r[i]=a)},md=(e,t,r,n,i,a,s,u,l,d)=>{let p=e.length-2,h=d.length===0;l.length<p&&l.push(...Array(p-l.length).fill(0));let m=e[0],_=t[u?3:1]*i;for(let y=0,w=e.length-p-(u?1:0);y<p;++y,++w){let k=e[w],v=h?k*s[y]:d[y],b=hd(k,s[y],a[y],t[w],r[y],v);fd(b,n,a,y,y+p),h&&d.push(s[y]*(k-1)+l[y]+(t[w]-1)*r[y]+1-a[y]-a[y+p])}d.splice(0,0,m),d.splice(u?3:1,0,_)},sa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,m)=>h*m,1)===0){r.length=0;for(let h=2;h<t[1].dims.length;++h)r.push(t[1].dims[h])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let d=e.strides.slice();if(d.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;d=new Array(h).fill(1)}md(u,r,l,e.autoPad,e.group,i,d,n,s,a);let p=Object.assign({},e);return Object.assign(p,{kernelShape:r,pads:i,outputPadding:s,outputShape:a,dilations:l,strides:d}),p},gd=e=>{let t=ji(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group,s=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst(),p=e.outputPadding,h=e.outputShape;return{autoPad:n,format:r,dilations:i,group:a,kernelShape:s,outputPadding:p,outputShape:h,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},_d=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},oa=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(Ye(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(pd(a,r,n),{inputs:a})},yd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let d=sa({...t,pads:u,strides:s,dilations:a,kernelShape:i,outputPadding:l},n);oa(e,n,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},wd=(e,t)=>{if(_d(e.inputs,t),e.inputs[0].dims.length===3)yd(e,t);else{let r=sa(t,e.inputs);oa(e,e.inputs,r)}}}),bd,$d,vd,cg=W(()=>{re(),ae(),ze(),oe(),bd=(e,t,r,n)=>{let i=R.size(t),a=t.length,s=B("input",e,a),u=Y("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=R.normalizeAxis(l,a),p=h=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=J("uniforms.input_shape","uniforms.axis",a),y=n.reverse?m+(n.exclusive?" + 1":""):"0",w=n.reverse?_:m+(n.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:d},...te(t,t)]}),getShaderSource:p}},$d=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,i=e.inputs[1];e.compute(bd(n,r,i,t),{inputs:[0]})},vd=e=>{let t=e.exclusive===1,r=e.reverse===1;return be({exclusive:t,reverse:r})}}),xd,kd,Sd,Td,Id,pg=W(()=>{re(),ae(),ze(),oe(),xd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},kd=(e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)i.push(r.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},Sd=(e,t)=>{let r,n,i,a,s,u,l=t.format==="NHWC",d=t.blocksize,p=t.mode==="DCR";l?([r,n,i,a]=e.dims,s=p?[r,n,i,d,d,a/d**2]:[r,n,i,a/d**2,d,d],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=p?[r,d,d,a/d**2,n,i]:[r,a/d**2,d,d,n,i],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),m=h.dims.length,_=e.dataType,y=B("a",_,m),w=Y("output",_,m),k=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,w)}

  ${kd(u,m,y,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let b=l?[r,n*d,i*d,a/d**2]:[r,a/d**2,n*d,i*d],T=R.size(b),S=h.dims,E=R.sortBasedOnPerm(S,u);return{outputs:[{dims:b,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...te(S,E)]}},getShaderSource:k}},Td=(e,t)=>{xd(e.inputs),e.compute(Sd(e.inputs[0],t))},Id=e=>be({blocksize:e.blocksize,mode:e.mode,format:e.format})}),En,jr,ua,Ed,zd,Cd,Ad,la,Od,Md,Rd,hg=W(()=>{re(),ae(),ze(),oe(),En="[a-zA-Z]|\\.\\.\\.",jr="("+En+")+",ua="^"+jr+"$",Ed="("+jr+",)*"+jr,zd="^"+Ed+"$",Cd=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Ad=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(zd)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let u=e[s].dims.slice();if(!a.match(RegExp(ua)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,u,s);this.lhs.push(l)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!n.match(RegExp(jr)))throw new Error("Invalid RHS");(i=n.match(RegExp(En,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(n!==void 0){if(n.dimValue!==t&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(ua))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(En,"g")),d=new Cd(n);return l==null||l.forEach((p,h)=>{if(p==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<s.length;_++){let y=String.fromCharCode(48+_);d.addSymbol(y,h+_),this.addSymbol(y,r[u++],n)}}else d.addSymbol(p,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,r[u++],n)}),d}},la=e=>e+"_max",Od=(e,t,r,n)=>{let i=e.map(d=>d.length).map((d,p)=>B(`input${p}`,t,d)),a=R.size(n),s=Y("output",t,n.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let p=[],h="var prod = 1.0;",m="var sum = 0.0;",_="sum += prod;",y=[],w=[],k=[],v=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,E)=>{var z;if(r.rhs.symbolToIndices.has(E)){let A=(z=r.rhs.symbolToIndices.get(E))==null?void 0:z[0];A!==void 0&&r.lhs.forEach(($,M)=>{if(S.inputIndices.includes(M)){let D=$.symbolToIndices.get(E);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(q=>{p.push(`${i[M].indicesSet(`input${M}Indices`,q,s.indicesGet("outputIndices",A))}`)})}})}else r.lhs.forEach((A,$)=>{if(S.inputIndices.includes($)){let M=A.symbolToIndices.get(E);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(D=>{y.push(`${i[$].indicesSet(`input${$}Indices`,D,`${E}`)}`)}),v.push(`prod *= ${i[$].getByIndices(`input${$}Indices`)};`)}}),w.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${la(E)}; ${E}++) {`),k.push("}")});let T=b?[...p,`let sum = ${i.map((S,E)=>S.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...p,m,...w,...y,h,...v,_,...k];return`
            ${d.registerUniforms(u.map(S=>({name:`${la(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((S,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(h=>r.symbolToInfo.has(h)).map(h=>{var m;return{type:12,data:((m=r.symbolToInfo.get(h))==null?void 0:m.dimValue)||0}});d.push({type:12,data:a});let p=e.map((h,m)=>[...te(h)]).reduce((h,m)=>h.concat(m),d);return p.push(...te(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}},getShaderSource:l}},Md=(e,t)=>{let r=new Ad(e.inputs,t.equation),n=r.outputDims,i=e.inputs.map((a,s)=>a.dims);e.compute(Od(i,e.inputs[0].dataType,r,n))},Rd=e=>{let t=e.equation.replace(/\s+/g,"");return be({equation:t})}}),Nd,da,Bd,Dd,Pd,fg=W(()=>{re(),ae(),oe(),Nd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&r[n]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},da=(e,t)=>{let r=e.length-t.length,n=[];for(let i=0;i<r;++i)n.push(e[i]);for(let i=0;i<t.length;++i)n.push(t[i]===1?e[i+r]:t[i]);return n},Bd=(e,t)=>e.length>t.length?da(e,t):da(t,e),Dd=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Bd(t,r),i=e[0].dataType,a=i===9||R.size(t)===1,s=i===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||n.length>0&&n[n.length-1]%4===0?4:1,l=Math.ceil(R.size(n)/u),d=h=>{let m=B("input",i,t.length,s),_=Y("output",i,n.length,u),y;if(i===9){let w=(k,v,b="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${m.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${k}[${v}] = ${b}(${m.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(m,_)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},p=[{type:12,data:l},...te(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p})}},Pd=e=>{Nd(e.inputs),e.compute(Dd(e.inputs),{inputs:[0]})}}),Ud,Ld,mg=W(()=>{re(),ae(),oe(),Hi(),Ud=e=>{let t=e[0].dataType,r=R.size(e[0].dims),n=R.size(e[1].dims),i=n%4===0,a=s=>{let u=B("x",t,[1],4),l=B("bias",t,[1],4),d=Y("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,m=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(p).declareVariables(u,l,d)}

    ${Gi(qe(t))}

    ${s.mainStart(Er)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Vi("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Er/4)}})}},Ld=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?bl(e):e.compute(Ud(e.inputs))}}),Fd,Wd,qd,Gd,gg=W(()=>{re(),ae(),ze(),oe(),Fd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Wd=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,a=R.normalizeAxis(t.axis,i),s=r.slice(0);s.splice(a,1,...n);let u=r[a],l=e[0].dataType===9?4:1,d=Math.ceil(R.size(s)/l),p=[{type:12,data:d},{type:6,data:u},{type:12,data:a},...te(e[0].dims,e[1].dims,s)],h=m=>{let _=B("data",e[0].dataType,e[0].dims.length,l),y=B("inputIndices",e[1].dataType,e[1].dims.length),w=Y("output",e[0].dataType,s.length,l),k=b=>{let T=n.length,S=`var indicesIndices${b}  = ${y.type.indices}(0);`;for(let E=0;E<T;E++)S+=`${T>1?`indicesIndices${b}[${E}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${E}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${y.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${_.type.indices};
        `;for(let E=0,z=0;E<i;E++)E===a?(S+=`${i>1?`dataIndices${b}[${E}]`:`dataIndices${b}`} = u32(idx${b});`,z+=T):(S+=`${i>1?`dataIndices${b}[${E}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${z}]`:`outputIndices${b}`};`,z++);return S},v;if(e[0].dataType===9){let b=(T,S,E="")=>`
          let outputIndices${S} = ${w.offsetToIndices(`outputOffset + ${S}u`)};
          ${k(S)};
          let offset${S} = ${_.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${T}[${S}] = ${E}(${_.getByOffset(`index${S}`)}[component${S}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,w)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:h}},qd=e=>be({axis:e.axis}),Gd=(e,t)=>{let r=e.inputs;Fd(r),e.compute(Wd(e.inputs,t))}}),Vd,Hd,jd,_g=W(()=>{re(),ae(),oe(),Vd=(e,t,r,n,i,a,s,u,l)=>{let d=[{type:12,data:a},{type:12,data:n},{type:12,data:i},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],p=[a];d.push(...te(t.dims,p));let h=m=>{let _=B("indices_data",t.dataType,t.dims.length),y=Y("input_slice_offsets_data",12,1,1),w=[_,y],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(k).declareVariables(...w)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},Hd=(e,t)=>{let r=e.inputs,n=r[0].dims,i=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=R.sizeToDimension(a,a.length-1),l=R.sizeFromDimension(n,t.batchDims+s),d=R.sizeToDimension(n,t.batchDims),p=R.sizeFromDimension(n,t.batchDims),h=u/d,m=new Array(s),_=l;for(let S=0;S<s;++S)m[s-1-S]=_,_*=n[t.batchDims+s-1-S];let y=Vd(e,r[1],m,t.batchDims,n,u,h,p,s),w=t.batchDims+s;if(w>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=a.slice(0,-1).concat(n.slice(w)),v=R.size(k),b=[{type:12,data:v},{type:12,data:l},...te(r[0].dims,y.dims,k)],T=S=>{let E=B("data",r[0].dataType,r[0].dims.length),z=B("slice_offsets",12,y.dims.length),A=Y("output",r[0].dataType,k.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,z,A)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:i}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:b}),getShaderSource:T},{inputs:[r[0],y]})},jd=e=>({batchDims:e.batch_dims,cacheKey:""})}),Kd,Qd,Zd,Xd,yg=W(()=>{re(),ae(),ze(),oe(),Kd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((u,l)=>l===r?Math.ceil(u/n)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Qd=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,a=R.normalizeAxis(t.gatherAxis,i),s=R.normalizeAxis(t.quantizeAxis,i),u=r.slice(0);u.splice(a,1,...n);let l=R.size(u),d=e[2].dataType,p=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...te(...e.map((_,y)=>_.dims),u)],m=_=>{let y=B("data",e[0].dataType,e[0].dims.length),w=B("inputIndices",e[1].dataType,e[1].dims.length),k=B("scales",e[2].dataType,e[2].dims.length),v=e.length>3?B("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=Y("output",d,u.length),T=[y,w,k];v&&T.push(v);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(S).declareVariables(...T,b)}
        ${_.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${k.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${k.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${k.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${qe(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:m}},Zd=(e,t)=>{let r=e.inputs;Kd(r,t),e.compute(Qd(e.inputs,t))},Xd=e=>be({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Yd,Jd,ec,tc,wg=W(()=>{re(),ae(),ze(),oe(),Yd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Jd=(e,t)=>{let r=e[0].dims,n=e[0].dataType,i=r.length,a=e[1].dims,s=e[1].dataType,u=R.normalizeAxis(t.axis,i),l=r[u],d=a.slice(0),p=R.size(d),h=B("input",n,i),m=B("indicesInput",s,a.length),_=Y("output",n,d.length),y=[{type:12,data:p},{type:6,data:l},{type:12,data:u}];return y.push(...te(r,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:y}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,_)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},ec=e=>be({axis:e.axis}),tc=(e,t)=>{let r=e.inputs;Yd(r),e.compute(Jd(e.inputs,t))}}),rc,nc,ic,ac,bg=W(()=>{re(),ae(),oe(),rc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},nc=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,a,s]=fo.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[i,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(a/l),p=Math.ceil(i/l),h=!0,m=R.size(u),_=[{type:12,data:h?d:m},{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...te(e[2].dims)),y.push("rank")),_.push(...te(u));let w=v=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",S=B("a",e[0].dataType,e[0].dims),E=B("b",e[1].dataType,e[1].dims),z=S.type.value,A=null,$=[S,E];e.length===3&&(A=B("c",e[2].dataType,e[2].dims.length),$.push(A));let M=Y("output",e[0].dataType,u.length);$.push(M);let D=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(D).declareVariables(...$)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${T}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${z}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=v=>{let b=B("a",e[0].dataType,e[0].dims),T=B("b",e[1].dataType,e[1].dims),S=null,E=[b,T];e.length===3&&(S=B("c",e[2].dataType,e[2].dims.length),E.push(S));let z=Y("output",e[0].dataType,u.length);E.push(z);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",M="";t.transA&&t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let D=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${$}
      }
      workgroupBarrier();
    }

    ${D}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:_}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:w}},ic=e=>{let t=e.transA,r=e.transB,n=e.alpha,i=e.beta;return{transA:t,transB:r,alpha:n,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},ac=(e,t)=>{rc(e.inputs),e.compute(nc(e.inputs,t))}}),yt,Ot,hr,fr,sc,oc,uc,lc,dc,cc,pc,hc,fc,mc,$g=W(()=>{re(),ae(),ze(),oe(),[yt,Ot,hr,fr]=[0,1,2,3],sc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},oc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,uc=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,lc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,dc=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,cc=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${yt}] = batch;
     indices[${Ot}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${hr}] = u32(r);
            indices[${fr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${hr}] = u32(clamp(r, 0, H - 1));
          indices[${fr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${hr}] = gs_reflect(r, border[1], border[3]);
          indices[${fr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,pc=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${yt}], indices[${Ot}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${yt}], indices[${Ot}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${yt}], indices[${Ot}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${yt}], indices[${Ot}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${yt}], indices[${Ot}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${yt}], indices[${Ot}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,hc=(e,t)=>{let r=B("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=B("grid",e[1].dataType,n.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[yt,Ot,hr,fr]=[0,3,1,2]);let s=Y("output",e[0].dataType,a.length),u=r.type.value,l=R.size(a),d=[{type:12,data:l},...te(e[0].dims,n,a)],p=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(r,i,s)}
  ${oc}
  ${uc(u)}
  ${lc(t)}
  ${dc(t)}
  ${cc(r,u,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${hr}]);
      let W_in = i32(uniforms.x_shape[${fr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${yt}], indices[${hr}], indices[${fr}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${pc(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let m=R.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:p}},fc=(e,t)=>{sc(e.inputs),e.compute(hc(e.inputs,t))},mc=e=>be({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ve,gc,_c,ca,yc,Kr,wc,bc=W(()=>{re(),ae(),ze(),Ai(),Wi(),oe(),Wt(),Ve=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,gc=(e,t)=>{let r=e[0],n=Ve(e,1),i=Ve(e,2),a=Ve(e,3),s=Ve(e,4),u=Ve(e,5),l=Ve(e,6),d=Ve(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],h=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=h,y=0,w=0,k=Math.floor(m/t.numHeads);if(l&&d&&R.size(l.dims)&&R.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],w=l.dims[2]}else if(l&&R.size(l.dims)||d&&R.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(n&&R.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&R.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=y+_,T=0;if(s&&R.size(s.dims)>0){T=8;let A=s.dims;throw A.length===1?A[0]===p?T=1:A[0]===3*p+2&&(T=3):A.length===2&&A[0]===p&&A[1]===b&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,E=m;if(i&&R.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(_!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=i.dims[2]}else{if(_!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=i.dims[1]*i.dims[3],S=!0}}let z=!1;if(s&&R.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&R.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:h,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:b,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:m,vHiddenSize:E,headSize:k,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:z,passPastInKv:S,qkvFormat:v}},_c=e=>be({...e}),ca=be({perm:[0,2,1,3]}),yc=(e,t,r,n,i,a,s)=>{let u=[n,i,a],l=R.size(u),d=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],p=h=>{let m=Y("qkv_with_bias",t.dataType,u),_=B("qkv",t.dataType,u),y=B("bias",r.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(w).declareVariables(_,y,m)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,r],outputs:[-1]})[0]},Kr=(e,t,r,n,i,a,s,u)=>{let l=a;if(s&&R.size(s.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=yc(e,a,s,t,n,r*i,u),l=l.reshape([t,n,r,i]),r===1||n===1?l:e.compute(Ye(l,ca.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,n,r,i])),r===1||n===1?l:e.compute(Ye(l,ca.perm),{inputs:[l],outputs:[-1]})[0]},wc=(e,t)=>{let r=gc(e.inputs,t),n=e.inputs[0],i=Ve(e.inputs,1),a=Ve(e.inputs,2),s=Ve(e.inputs,3),u=Ve(e.inputs,4),l=Ve(e.inputs,5),d=Ve(e.inputs,6),p=Ve(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let h=i&&a&&i.dims.length===4&&a.dims.length===4,m=Kr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(h)return qr(e,m,i,a,u,void 0,d,p,l,r);if(!i||!a)throw new Error("key and value must be provided");let _=Kr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,s,r.hiddenSize),y=Kr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);qr(e,m,_,y,u,void 0,d,p,l,r)}}),$c,vc,xc,kc,pa,Sc,Tc,Ic=W(()=>{re(),ae(),ze(),oe(),$c=e=>{if(!e||e.length<1)throw new Error("too few inputs")},vc=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),n=r.length),be({numOutputs:n,axis:t.axis,splitSizes:r})},xc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${J("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,kc=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(i):n===0?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},pa=(e,t)=>{let r=e[0].dims,n=R.size(r),i=e[0].dataType,a=R.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=B("input",i,r.length),l=new Array(t.numOutputs),d=[],p=[],h=0,m=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){h+=t.splitSizes[y],l[y]=h;let w=r.slice();w[a]=t.splitSizes[y],p.push(w),s[y]=Y(`output${y}`,i,w.length),d.push({dims:p[y],dataType:e[0].dataType})}m.push({type:12,data:l},...te(r,...p));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${xc(l.length)}
  ${kc(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${J("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},Sc=(e,t)=>{$c(e.inputs);let r=e.inputs.length===1?t:vc(e.inputs,t);e.compute(pa(e.inputs,r),{inputs:[0]})},Tc=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return be({axis:t,numOutputs:n,splitSizes:r})}}),Ec,zn,zc,Cc=W(()=>{re(),ae(),ze(),oe(),Ec=(e,t)=>{let[r,n,i,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!R.areEqual(n.dims,[])&&!R.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!R.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],p=i.dims[0],h=R.sizeFromDimension(r.dims,1)/d,m=u===0?i.dims[1]*2:h/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(d!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(m/2!==i.dims[1]&&u/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(d>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},zn=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:a}=t,s=e[0].dims[0],u=R.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,p=e[2].dims[1],h=i===0?p*2:d/n,m=new Array(s,l,d/h,h-p),_=R.computeStrides(m),y=[{type:1,data:a},{type:12,data:m},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,d,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,h,l*h,1]}):[],...te(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=k=>{let v=B("input",e[0].dataType,e[0].dims.length),b=B("position_ids",e[1].dataType,e[1].dims.length),T=B("cos_cache",e[2].dataType,e[2].dims.length),S=B("sin_cache",e[3].dataType,e[3].dims.length),E=Y("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${k.declareVariables(v,b,T,S,E)}

        ${k.mainStart(Er)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",Y("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:be({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(m)/Er)},programUniforms:y})}},zc=(e,t)=>{Ec(e.inputs,t),e.compute(zn(e.inputs,t))}}),Ac,Oc,ha,Mc,Rc,vg=W(()=>{ze(),re(),Wi(),bc(),Ic(),Wt(),Cc(),oe(),Ac=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],d=r.dims[1],p=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],h=d,m=0,_=!n||n.dims.length===0,y=Math.floor(_?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);_&&(p=y*t.numHeads);let w=a&&a.dims.length!==0,k=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&k){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=a.dims[2]}else if(w||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');h=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let b=0,T=!1,S=t.kvNumHeads?y*t.kvNumHeads:p;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(h!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=i.dims[2]}else{if(h!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=i.dims[1]*i.dims[3],T=!0}}let E=e.length>4?e[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:S,headSize:y,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:v}},Oc=be({perm:[0,2,1,3]}),ha=(e,t,r)=>{let n=t,i=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(Ye(n,Oc.perm),{inputs:[n],outputs:[-1]})[0]),n},Mc=(e,t,r,n)=>{let i=7,a=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],d=p=>{let h=B("seq_lens",r.dataType,r.dims),m=B("total_seq_lens",n.dataType,n.dims),_=Y("pos_ids",i,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(h,m,_)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d}},Rc=(e,t)=>{var S;let r=Ac(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((S=e.inputs[1])==null?void 0:S.dims.length)===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=be({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[m,_,y]=!i&&!a?e.compute(pa([n],h),{inputs:[n],outputs:[-1,-1,-1]}):[n,i,a],w,k;if(t.doRotary){let E=e.compute(Mc(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],z=e.inputs[7],A=e.inputs[8],$=be({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),M=[m,E,z,A],D=[-1];w=e.compute(zn(M,$),{inputs:M,outputs:D})[0],M.splice(0,1,_);let q=be({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});k=e.compute(zn(M,q),{inputs:M,outputs:D})[0]}let v=Kr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:m,void 0,0),b=ha(e,t.doRotary?k:_,r),T=ha(e,y,r);qr(e,v,b,T,void 0,void 0,s,u,void 0,r,l,d)}}),fa,Nc,Bc,Dc,xg=W(()=>{re(),ae(),Wt(),oe(),fa=(e,t,r,n,i,a,s,u)=>{let l=Ee(a),d=l===1?"f32":`vec${l}f`,p=l===1?"vec2f":`mat2x${l}f`,h=i*s,m=64;h===1&&(m=256);let _=[i,s,a/l],y=[i,s,2],w=["rank","type","type"],k=[];k.push(...te(_,y));let v=b=>{let T=B("x",t.dataType,3,l),S=B("scale",r.dataType,r.dims),E=B("bias",n.dataType,n.dims),z=Y("output",1,3,2),A=[T,S,E,z];return`
  var<workgroup> workgroup_shared : array<${p}, ${m}>;
  const workgroup_size = ${m}u;
  ${b.declareVariables(...A)}
  ${b.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ft("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ft("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${m}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:h},programUniforms:k}),getShaderSource:v},{inputs:[t,r,n],outputs:[-1]})[0]},Nc=(e,t,r)=>{let n=t[0].dims,i=n,a=2,s=n[0],u=n[1],l=R.sizeFromDimension(n,a),d=Ee(l),p=R.size(i)/d,h=fa(e,t[0],t[1],t[2],s,l,u,r.epsilon),m=[s,u,l/d],_=[s,u],y=["type","none"],w=k=>{let v=B("x",t[0].dataType,m.length,d),b=B("scale_shift",1,_.length,2),T=Y("output",t[0].dataType,m.length,d),S=[v,b,T];return`
  ${k.registerUniform("output_size","u32").declareVariables(...S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...te(m,_,m)]}),getShaderSource:w},{inputs:[t[0],h]})},Bc=(e,t,r)=>{let n=t[0].dims,i=n,a=n[0],s=n[n.length-1],u=R.sizeFromDimension(n,1)/s,l=Ee(s),d=R.size(i)/l,p=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],h=["type","type"],m=!1,_=[0,n.length-1];for(let v=0;v<n.length-2;v++)m=m||n[v+1]!==1,_.push(v+1);m=m&&n[n.length-1]!==1;let y=m?e.compute(Ye(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(v,b)=>n[_[b]])),w=fa(e,y,t[1],t[2],a,u,s,r.epsilon),k=v=>{let b=Me(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,S=A=>{let $=A===0?"x":"y",M=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${b}(${M}(scale.${$}))`;case 2:return`vec2<${b}>(${M}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${b}>(${M}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=B("input",t[0].dataType,t[0].dims,l),z=Y("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:k},{inputs:[t[0],w]})},Dc=(e,t)=>{t.format==="NHWC"?Bc(e,e.inputs,t):Nc(e,e.inputs,t)}}),Pc,Uc,Lc,kg=W(()=>{re(),ae(),oe(),Pc=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Uc=(e,t,r)=>{let n=t.simplified,i=e[0].dims,a=e[1],s=!n&&e[2],u=i,l=R.normalizeAxis(t.axis,i.length),d=R.sizeToDimension(i,l),p=R.sizeFromDimension(i,l),h=R.size(a.dims),m=s?R.size(s.dims):0;if(h!==p||s&&m!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${m}`);let _=[];for(let E=0;E<i.length;++E)E<l?_.push(i[E]):_.push(1);let y=Ee(p),w=["type","type"],k=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/y)},{type:1,data:t.epsilon}];s&&w.push("type");let v=r>1,b=r>2,T=E=>{let z=Me(e[0].dataType),A=[B("x",e[0].dataType,e[0].dims,y),B("scale",a.dataType,a.dims,y)];s&&A.push(B("bias",s.dataType,s.dims,y)),A.push(Y("output",e[0].dataType,u,y)),v&&A.push(Y("mean_data_output",1,_)),b&&A.push(Y("inv_std_output",1,_));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms($).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ni("f32",y)};
    var mean_square_vector = ${Ni("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${zr(z,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ft("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ft("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${zr(z,y,"x[j + offset]")};
      let f32scale = ${zr(z,y,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${zr(z,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:u,dataType:e[0].dataType}];return v&&S.push({dims:_,dataType:1}),b&&S.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:w},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:k}),getShaderSource:T}},Lc=(e,t)=>{Pc(e.inputs),e.compute(Uc(e.inputs,t,e.outputCount))}}),Fc,Wc,Sg=W(()=>{ae(),Zi(),ea(),Fc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Wc=e=>{Fc(e.inputs);let t=Ir.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Qi(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=R.size(e.inputs[0].dims.slice(0,-2)),s=R.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&s===1){let u=e.inputs[0].reshape([1,a,n]),l=e.inputs[1].reshape([1,n,r]),d=[1,a,r],p=[u,l];e.compute(Sn(p,{activation:""},t,d),{inputs:p})}else e.compute(Sn(e.inputs,{activation:""},t))}}}),qc,Gc,Vc,Hc,jc,Tg=W(()=>{re(),ae(),ze(),oe(),qc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!R.areEqual(s.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(R.size(u)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(R.size(l)!==d)throw new Error("zeroPoints input size error.")}},Gc=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],a=t.k,s=t.n,u=r.slice(0,n-2),l=R.size(u),d=e[1].dims[2]/4,p=e[0].dataType,h=Ee(t.k),m=Ee(d),_=Ee(s),y=u.concat([i,s]),w=i>1&&s/_%2===0?2:1,k=R.size(y)/_/w,v=64,b=[],T=[l,i,a/h],S=R.convertShape(e[1].dims).slice();S.splice(-1,1,d/m),b.push(...te(T)),b.push(...te(S)),b.push(...te(e[2].dims)),e.length===4&&b.push(...te(R.convertShape(e[3].dims)));let E=[l,i,s/_];b.push(...te(E));let z=A=>{let $=T.length,M=B("a",e[0].dataType,$,h),D=B("b",12,S.length,m),q=B("scales",e[2].dataType,e[2].dims.length),G=[M,D,q],V=e.length===4?B("zero_points",12,e[3].dims.length):void 0;V&&G.push(V);let O=E.length,F=Y("output",e[0].dataType,O,_),j=Me(e[0].dataType),X=(()=>{switch(h){case 1:return`array<${j}, 8>`;case 2:return`mat4x2<${j}>`;case 4:return`mat2x4<${j}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ne=()=>{let U=`
          // reuse a data
            var input_offset = ${M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`)};
            var a_data: ${X};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${M.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let P=0;P<_*w;P++)U+=`
            b_value = ${m===1?`b${P}_data`:`b${P}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${X}(${Array.from({length:4},(Q,K)=>`${j}(b_value_lower[${K}]), ${j}(b_value_upper[${K}])`).join(", ")});
            b_dequantized_values = ${h===1?`${X}(${Array.from({length:8},(Q,K)=>`(b_quantized_values[${K}] - ${V?`zero_point${P}`:"zero_point"}) * scale${P}`).join(", ")});`:`(b_quantized_values - ${X}(${Array(8).fill(`${V?`zero_point${P}`:"zero_point"}`).join(",")})) * scale${P};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(P/_)}]${_>1?`[${P%_}]`:""} += ${Array.from({length:8/h},(Q,K)=>`${h===1?`a_data[${K}] * b_dequantized_values[${K}]`:`dot(a_data[${K}], b_dequantized_values[${K}])`}`).join(" + ")};
          `;return U},L=()=>{let U=`
            var col_index = col * ${_};
            ${V?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            `;for(let P=0;P<_*w;P++)U+=`
            let scale${P} = ${q.getByOffset("col_index * nBlocksPerCol + block")};
            ${V?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${V.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${P} = ${j}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},ge=()=>{let U=`col_index = col * ${_};`;for(let P=0;P<_*w;P++)U+=`
            let b${P}_data = ${D.getByIndices(`${D.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${X};
            var b_dequantized_values: ${X};`,U};return`
        var<workgroup> workgroup_shared: array<${F.type.value}, ${w*v}>;
        ${A.declareVariables(...G,F)}
        ${A.mainStart([v,1,1])}
          let output_indices = ${F.offsetToIndices(`(global_idx / ${v}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${L()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${ge()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${ne()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${F.type.value} = ${F.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${F.setByIndices(`${F.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${m};${_};${w};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:p}],dispatchGroup:{x:k},programUniforms:b}),getShaderSource:z}},Vc=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],a=t.k,s=t.n,u=r.slice(0,n-2),l=R.size(u),d=e[1].dims[2]/4,p=e[0].dataType,h=Ee(t.k),m=Ee(d),_=u.concat([i,s]),y=128,w=s%8===0?8:s%4===0?4:1,k=y/w,v=k*m*8,b=v/h,T=v/t.blockSize,S=R.size(_)/w,E=[],z=[l,i,a/h],A=R.convertShape(e[1].dims).slice();A.splice(-1,1,d/m),E.push(...te(z)),E.push(...te(A)),E.push(...te(e[2].dims)),e.length===4&&E.push(...te(R.convertShape(e[3].dims)));let $=[l,i,s];E.push(...te($));let M=D=>{let q=z.length,G=B("a",e[0].dataType,q,h),V=B("b",12,A.length,m),O=B("scales",e[2].dataType,e[2].dims.length),F=[G,V,O],j=e.length===4?B("zero_points",12,e[3].dims.length):void 0;j&&F.push(j);let X=$.length,ne=Y("output",e[0].dataType,X),L=Me(e[0].dataType),ge=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${L}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${L}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${L}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${L}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${k}>, ${w}>;
        ${D.declareVariables(...F,ne)}
        ${D.mainStart([k,w,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${G.getByIndices(`${G.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${G.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${j?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${L}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${V.getByIndices(`${V.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${ge()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${L}>(${Array.from({length:4},(U,P)=>`${L}(b_value_lower[${P}]), ${L}(b_value_upper[${P}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${L}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,P)=>`${`dot(a_data${P}, b_dequantized_values[${P}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${k}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${m};${k};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:p}],dispatchGroup:{x:S},programUniforms:E}),getShaderSource:M}},Hc=(e,t)=>{qc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Vc(e.inputs,t)):e.compute(Gc(e.inputs,t))},jc=e=>be(e)}),Kc,Qc,Zc,Xc,Yc,Jc,ep,tp,rp,Ig=W(()=>{re(),ae(),oe(),Kc=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Qc=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
            k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${J("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${J("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Zc=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${J("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${J("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Xc=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${J("uniforms.x_shape",i,t)})) {
                  k = i32(${J("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Yc=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${J("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${J("uniforms.x_shape",i,t)})) {
                  k -= i32(${J("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Jc=(e,t,r)=>{switch(r.mode){case 0:return Qc(e,t,r.pads.length);case 1:return Zc(e,t,r.pads.length);case 2:return Xc(e,t,r.pads.length);case 3:return Yc(e,t,r.pads.length);default:throw new Error("Invalid mode")}},ep=(e,t)=>{let r=R.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,i=R.size(r),a=[{type:12,data:i},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...te(e[0].dims,r));let u=["rank"],l=d=>{let p=Y("output",e[0].dataType,r.length),h=B("x",e[0].dataType,n.length),m=h.type.value,_=Jc(p,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(y).declareVariables(h,p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(r)/64)},programUniforms:a}),getShaderSource:l}},tp=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+i]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:n,pads:s}}else return t},rp=(e,t)=>{Kc(e.inputs);let r=tp(e.inputs,t);e.compute(ep(e.inputs,r),{inputs:[0]})}}),Qr,ma,ga,_a,ya,np,ip,wa,ba,ap,sp,$a,op,up,va,lp,dp,cp,pp,Eg=W(()=>{tt(),re(),ae(),oe(),Qr=e=>{if(ke.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ma=(e,t,r)=>{let n=t.format==="NHWC",i=e.dims.slice();n&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],d=t.pads.slice();yn.adjustPoolAttributes(r,i,s,u,l,d);let p=yn.computePoolOutputShape(r,i,u,l,s,d,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let m=p.slice();return m.push(m.splice(1,1)[0]),[h,n?m:p]},ga=(e,t)=>{let r=t.format==="NHWC",n=R.size(e),i=R.size(t.kernelShape),a=[{type:12,data:n},{type:12,data:i}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],h=!!(d+p);a.push({type:12,data:u},{type:12,data:l},{type:12,data:d},{type:12,data:p}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];m=!!(w+k),a.push({type:12,data:_},{type:12,data:y},{type:12,data:w},{type:12,data:k}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=R.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,p)=>d+p);return[a,s,!!l,!1,!1]}},_a=(e,t,r,n,i,a,s,u,l,d,p,h)=>{let m=i.format==="NHWC",_=t.type.value,y=Y("output",t.type.tensor,n);if(i.kernelShape.length<=2){let w="",k="",v="",b=r-(m?2:1);if(p?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,i.kernelShape.length===2){let T=r-(m?3:2);h?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${k}
              ${w}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=i.kernelShape.length,k=i.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${J("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${J("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${J("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${J("uniforms.pads","j - 2u",k)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},ya=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,np=e=>`${ya(e)};${e.countIncludePad}`,ip=e=>`${ya(e)};${e.storageOrder};${e.dilations}`,wa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ba=(e,t,r,n)=>{let[i,a]=ma(t,n,r),s=B("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",d="";i.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,h,m,_,y]=ga(a,i);p.push(...te(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${m};${_};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:p}),getShaderSource:k=>_a(k,s,t.dims.length,a.length,i,l,d,0,h,m,_,y)}},ap=e=>{let t=e.count_include_pad!==0,r=wa(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:np(n)}},sp=(e,t)=>{Qr(e.inputs),e.compute(ba("AveragePool",e.inputs[0],!1,t))},$a={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},op=e=>{let t=e.format;return{format:t,...$a,cacheKey:t}},up=(e,t)=>{Qr(e.inputs),e.compute(ba("GlobalAveragePool",e.inputs[0],!0,t))},va=(e,t,r,n)=>{let[i,a]=ma(t,n,r),s=`
      value = max(x_val, value);
    `,u="",l=B("x",t.dataType,t.dims.length),d=["rank"],[p,h,m,_,y]=ga(a,i);return p.push(...te(t.dims,a)),{name:e,shaderCache:{hint:`${n.cacheKey};${m};${_};${y}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:p}),getShaderSource:w=>_a(w,l,t.dims.length,a.length,i,s,u,t.dataType===10?-65504:-1e5,h,m,_,y)}},lp=(e,t)=>{Qr(e.inputs),e.compute(va("MaxPool",e.inputs[0],!1,t))},dp=e=>{let t=e.storage_order,r=e.dilations,n=wa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:r,...n,cacheKey:""};return{...i,cacheKey:ip(i)}},cp=e=>{let t=e.format;return{format:t,...$a,cacheKey:t}},pp=(e,t)=>{Qr(e.inputs),e.compute(va("GlobalMaxPool",e.inputs[0],!0,t))}}),hp,fp,mp,gp,zg=W(()=>{re(),ae(),ze(),oe(),hp=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},fp=(e,t)=>{let r=R.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,i=n===3,a=e[0].dims,s=e[1].dataType,u=R.size(a),l=n===3||n===2,d=l?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,h=e.length>2?e[2]:void 0,m=h?l?[Math.ceil(R.size(h.dims)/4)]:h.dims:void 0,_=p.length===0||p.length===1&&p[0]===1,y=_===!1&&p.length===1,w=Ee(u),k=_&&(!l||w===4),v=k?w:1,b=k&&!l?w:1,T=B("input",l?12:n,d.length,b),S=B("scale",s,p.length),E=h?B("zero_point",l?12:n,m.length):void 0,z=Y("output",s,a.length,v),A=[T,S];E&&A.push(E);let $=[d,p];h&&$.push(m);let M=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...te(...$,a)],D=q=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(G).declareVariables(...A,z)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${S.getByOffset("0")}`:y?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?_?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:y?l?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:D,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:M})}},mp=(e,t)=>{hp(e.inputs,t),e.compute(fp(e.inputs,t))},gp=e=>be({axis:e.axis,blockSize:e.blockSize})}),_p,yp,wp,Cg=W(()=>{tt(),re(),oe(),_p=(e,t,r)=>{let n=e===t,i=e<t&&r<0,a=e>t&&r>0;if(n||i||a)throw new Error("Range these inputs' contents are invalid.")},yp=(e,t,r,n)=>{let i=Math.abs(Math.ceil((t-e)/r)),a=[i],s=i,u=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...te(a)],l=d=>{let p=Y("output",n,a.length),h=p.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${d.registerUniforms(m).declareVariables(p)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},wp=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),ke.webgpu.validateInputContent&&_p(t,r,n),e.compute(yp(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),bp,$p,vp,xp,Ag=W(()=>{re(),ae(),ze(),oe(),bp=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${i}bitcast<${n}>(oldValue) + (${r})${a}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${i}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${i}min(bitcast<${n}>(oldValue), (${r}))${a}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},$p=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r,a=1,s=Math.ceil(R.sizeToDimension(n,n.length-1)/a),u=n[n.length-1],l=R.sizeFromDimension(r,u),d=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...te(e[1].dims,e[2].dims,i)],p=h=>{let m=B("indices",e[1].dataType,e[1].dims.length),_=B("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?zo("output",e[0].dataType,i.length):Y("output",e[0].dataType,i.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,_,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${bp(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:p}},vp=e=>be({reduction:e.reduction}),xp=(e,t)=>{e.compute($p(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),kp,Sp,Tp,xa,Ip,Ep,zp,Cp,Ap,Op,Mp,Rp,ka,Np,Bp,Dp,Pp,Up,Lp,Fp,Og=W(()=>{re(),ae(),ze(),oe(),kp=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Sp=(e,t,r)=>{t.every(i=>i>=0&&i<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((i,a)=>n[i]=e[a]),n},Tp=(e,t,r,n,i,a)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(p=>a.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(p=>n.push(p)),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");kp(n,t),t.axes.length>0&&Sp(n,t.axes,d).forEach((p,h)=>n[h]=p)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(p=>i.push(Number(p))),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof i<"u"&&n.length>0&&i.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},xa=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Ip=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${xa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${xa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Ep=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",zp=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),i=e.length===0?n:e.slice();return t.length>0?(t.forEach((a,s)=>{n[a]=i[s],n[s+r]=i[t.length+s]}),n):i},Cp=(e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(a=>i.push(a)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((a,s)=>i[a]=r[s])}else r.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,s)=>Math.round(a*t[s]))}return i},Ap=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=n),r.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(n,0,t.length),i.forEach((a,s)=>i[s]=Math.round(a*t[s]))),i},Op=(e,t,r,n,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${J("uniforms.scales","i",n)};
        var roi_low = ${J("uniforms.roi","i",i)};
        var roi_hi = ${J("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${J("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Mp=(e,t,r,n,i,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${J("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${J("uniforms.roi","i",a)};
          var roi_hi = ${J("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${J("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Rp=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${J("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ka=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Np=(e,t,r,n,i)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${ka(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${n?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Bp=(e,t,r,n,i,a,s,u,l,d)=>{let p=r.length===2,[h,m]=p?[0,1]:[2,3],_=e.type.value,y=w=>{let k=w===h?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${_} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${_} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[w]},
        ${n[w]}, ${r[w]}, ${a[w]}, ${a[w]} + ${r.length});
        var fractOriginalIdx: ${_} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${l};
        }
        var data: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${_} = originalIdx + ${_}(i);
          if (${k} < 0 || ${k} >= ${r[w]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${k} = max(0, min(${k}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${k})`)};
          data[i + 1] = ${w===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${y(h)};
    ${y(m)};
  fn getCubicInterpolationCoefs(s: ${_}) -> array<${_}, 4> {
    var absS = abs(s);
    var coeffs: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${_} = 1.0 - absS;
    var twoMinusAbsS: ${_} = 2.0 - absS;
    var onePlusAbsS: ${_} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${_}, 4>, coefs: array<${_}, 4>) -> ${_} {
    var coefsSum: ${_} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${_} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Dp=(e,t,r,n,i)=>{let[a,s,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${ka(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${n?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Pp=(e,t,r,n,i,a)=>{let s=e.dims,u=zp(a,t.axes,s.length),l=Cp(s,n,i,t.axes),d=n.slice();n.length===0&&(d=s.map((b,T)=>b===0?1:l[T]/b),t.keepAspectRatioPolicy!=="stretch"&&(l=Ap(s,d,t)));let p=Y("output",e.dataType,l.length),h=B("input",e.dataType,s.length),m=R.size(l),_=s.length===l.length&&s.every((b,T)=>b===l[T]),y=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,k=h.type.value,v=b=>`
      ${_?"":`
      ${Ip(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Rp(h,s)};
              ${Ep(t.nearestMode,r,k)};
              ${Mp(h,p,s,l,d.length,u.length,y)};
              `;case"linear":return`
              ${Op(p,s,l,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Np(h,p,s,y,w)}`;if(s.length===3||s.length===5)return`${Dp(h,p,s,y,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Bp(h,p,s,l,d,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(h,p)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${i.length>0?i:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:u},...te(s,l)]})}},Up=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Lp=(e,t)=>{let r=[],n=[],i=[],a=Up(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Tp(e.inputs,t,a,r,n,i),e.compute(Pp(e.inputs[0],t,a,r,n,i),{inputs:[0]})},Fp=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return be({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),Wp,qp,Gp,Mg=W(()=>{re(),ae(),oe(),Wp=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},qp=(e,t,r,n)=>{let i=t.simplified,a=e[0].dims,s=R.size(a),u=a,l=s,d=a.slice(-1)[0],p=n?a.slice(0,-1).concat(1):[],h=!i&&e.length>3,m=e.length>4,_=n&&r>1,y=n&&r>2,w=r>3,k=64,v=Ee(d),b=[{type:12,data:l},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],T=E=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[B("x",e[0].dataType,e[0].dims,v),B("skip",e[1].dataType,e[1].dims,v),B("gamma",e[2].dataType,e[2].dims,v)];h&&A.push(B("beta",e[3].dataType,e[3].dims,v)),m&&A.push(B("bias",e[4].dataType,e[4].dims,v)),A.push(Y("output",e[0].dataType,u,v)),_&&A.push(Y("mean_output",1,p)),y&&A.push(Y("inv_std_output",1,p)),w&&A.push(Y("input_skip_bias_sum",e[0].dataType,u,v));let $=Me(e[0].dataType),M=Me(1,v);return`

      ${E.registerUniforms(z).declareVariables(...A)}
      var<workgroup> sum_shared : array<${M}, ${k}>;
      var<workgroup> sum_squared_shared : array<${M}, ${k}>;

      ${E.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":$+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${zr($,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Ft("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ft("square_sum",v)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:u,dataType:e[0].dataType}];return r>1&&S.push({dims:p,dataType:1}),r>2&&S.push({dims:p,dataType:1}),r>3&&S.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${y};${w}`,inputDependencies:e.map((E,z)=>"type")},getShaderSource:T,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:b})}},Gp=(e,t)=>{Wp(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(qp(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Vp,Zr,Hp,Sa,jp,Kp,Qp,Zp,Rg=W(()=>{re(),ae(),ze(),oe(),Vp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Zr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Hp=(e,t)=>{if(e.length>1){let r=Zr(e,1),n=Zr(e,2),i=Zr(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),be({starts:r,ends:n,axes:i})}else return t},Sa=(e,t,r,n,i)=>{let a=e;return e<0&&(a+=r[n[t]]),i[t]<0?Math.max(0,Math.min(a,r[n[t]]-1)):Math.max(0,Math.min(a,r[n[t]]))},jp=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${J("uniforms.input_shape","i",r.length)};
            let steps_i = ${J("uniforms.steps","i",r.length)};
            let signs_i = ${J("uniforms.signs","i",r.length)};
            let starts_i = ${J("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Kp=(e,t)=>{let r=e[0].dims,n=R.size(r),i=t.axes.length>0?R.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=Zr(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let s=t.starts.map((v,b)=>Sa(v,b,r,i,a)),u=t.ends.map((v,b)=>Sa(v,b,r,i,a));if(i.length!==s.length||i.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let v=0;v<r.length;++v)i.includes(v)||(s.splice(v,0,0),u.splice(v,0,r[v]),a.splice(v,0,1));let l=a.map(v=>Math.sign(v));a.forEach((v,b,T)=>{if(v<0){let S=(u[b]-s[b])/v,E=s[b],z=E+S*a[b];s[b]=z,u[b]=E,T[b]=-v}});let d=r.slice(0);i.forEach((v,b)=>{d[v]=Math.ceil((u[v]-s[v])/a[v])});let p={dims:d,dataType:e[0].dataType},h=Y("output",e[0].dataType,d.length),m=B("input",e[0].dataType,e[0].dims.length),_=R.size(d),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...te(e[0].dims,d)],k=v=>`
      ${v.registerUniforms(y).declareVariables(m,h)}
        ${jp(m,h,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:w})}},Qp=(e,t)=>{Vp(e.inputs,t);let r=Hp(e.inputs,t);e.compute(Kp(e.inputs,r),{inputs:[0]})},Zp=e=>{let t=e.starts,r=e.ends,n=e.axes;return be({starts:t,ends:r,axes:n})}}),Xp,Yp,Jp,eh,Ng=W(()=>{re(),ae(),ze(),Wt(),oe(),Xp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Yp=(e,t)=>{let r=e.inputs[0],n=r.dims,i=R.size(n),a=n.length,s=R.normalizeAxis(t.axis,a),u=s<n.length-1,l,d=[];u?(d=Array.from({length:a},(A,$)=>$),d[s]=a-1,d[a-1]=s,l=e.compute(Ye(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let p=l.dims,h=p[a-1],m=i/h,_=Ee(h),y=h/_,w=64;m===1&&(w=256);let k=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,v=B("x",l.dataType,l.dims,_),b=Y("result",l.dataType,l.dims,_),T=v.type.value,S=Me(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=A=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(v,b)}
      ${A.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${k("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${Ft("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Ye(z,d),{inputs:[z]})},Jp=(e,t)=>{Xp(e.inputs),Yp(e,t)},eh=e=>be({axis:e.axis})}),Ta,th,rh,nh,ih,Bg=W(()=>{re(),ae(),oe(),Ta=e=>Array.from(e.getBigInt64Array(),Number),th=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ta(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},rh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},nh=(e,t)=>{let r=e[0].dims,n=t??Ta(e[1]),i=rh(r,n),a=R.size(i),s=e[0].dataType,u=B("input",s,r.length),l=Y("output",s,i.length),d=p=>`
      const inputShape = ${u.indices(...r)};
      ${p.registerUniform("output_size","u32").declareVariables(u,l)}
      ${p.mainStart()}
      ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...te(e[0].dims,i)]}),getShaderSource:d}},ih=e=>{th(e.inputs),e.compute(nh(e.inputs),{inputs:[0]})}}),ah,sh,oh,Dg=W(()=>{re(),ae(),oe(),ah=(e,t,r,n,i)=>{let a=Y("output_data",i,r.length,4),s=B("a_data",t[1].dataType,t[1].dims.length,4),u=B("b_data",t[2].dataType,t[2].dims.length,4),l=B("c_data",t[0].dataType,t[0].dims.length,4),d,p=(h,m,_)=>`select(${m}, ${h}, ${_})`;if(!n)d=a.setByOffset("global_idx",p(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(m,_,y="")=>{let w=`a_data[index_a${_}][component_a${_}]`,k=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${m}[${_}] = ${y}(${p(w,k,v)});
          `};i===9?d=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},sh=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,a=!(R.areEqual(t,r)&&R.areEqual(r,n)),s=t,u=R.size(t);if(a){let d=Ir.calcShape(Ir.calcShape(t,r,!1),n,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=R.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>ah(d,e,s,a,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...te(n,t,r,s)]})}},oh=e=>{e.compute(sh(e.inputs))}}),uh,Pg=W(()=>{Ym(),Wi(),Jm(),eg(),tg(),rg(),ng(),ug(),dg(),cg(),pg(),hg(),fg(),mg(),gg(),_g(),yg(),wg(),bg(),$g(),vg(),xg(),kg(),Sg(),Tg(),bc(),Ig(),Eg(),zg(),Cg(),Ag(),Ui(),Og(),Cc(),Mg(),Rg(),Ng(),Ic(),Bg(),Wt(),Hi(),Dg(),uh=new Map([["Abs",[Wu]],["Acos",[qu]],["Acosh",[Gu]],["Add",[Al]],["ArgMax",[Iu,Fi]],["ArgMin",[Tu,Fi]],["Asin",[Vu]],["Asinh",[Hu]],["Atan",[ju]],["Atanh",[Ku]],["Attention",[Mu]],["AveragePool",[sp,ap]],["BatchNormalization",[Du]],["BiasAdd",[Lu]],["BiasSplitGelu",[El]],["Cast",[Zu,Qu]],["Ceil",[Ju]],["Clip",[Yu]],["Concat",[Vl,Hl]],["Conv",[aa,na]],["ConvTranspose",[wd,gd]],["Cos",[el]],["Cosh",[tl]],["CumSum",[$d,vd]],["DepthToSpace",[Td,Id]],["DequantizeLinear",[mp,gp]],["Div",[Ol]],["Einsum",[Md,Rd]],["Elu",[rl,Gr]],["Equal",[Ml]],["Erf",[nl]],["Exp",[il]],["Expand",[Pd]],["FastGelu",[Ld]],["Floor",[al]],["FusedConv",[aa,na]],["Gather",[Gd,qd]],["GatherElements",[tc,ec]],["GatherBlockQuantized",[Zd,Xd]],["GatherND",[Hd,jd]],["Gelu",[sl]],["Gemm",[ac,ic]],["GlobalAveragePool",[up,op]],["GlobalMaxPool",[pp,cp]],["Greater",[Dl]],["GreaterOrEqual",[Ul]],["GridSample",[fc,mc]],["GroupQueryAttention",[Rc]],["HardSigmoid",[fl,hl]],["InstanceNormalization",[Dc]],["LayerNormalization",[Lc]],["LeakyRelu",[ol,Gr]],["Less",[Pl]],["LessOrEqual",[Ll]],["Log",[vl]],["MatMul",[Wc]],["MatMulNBits",[Hc,jc]],["MaxPool",[lp,dp]],["Mul",[Rl]],["MultiHeadAttention",[wc,_c]],["Neg",[ll]],["Not",[ul]],["Pad",[rp]],["Pow",[Nl]],["QuickGelu",[Sl,Gr]],["Range",[wp]],["Reciprocal",[dl]],["ReduceMin",[$u]],["ReduceMean",[gu]],["ReduceMax",[bu]],["ReduceSum",[xu]],["ReduceProd",[vu]],["ReduceL1",[_u]],["ReduceL2",[yu]],["ReduceLogSum",[Su]],["ReduceLogSumExp",[wu]],["ReduceSumSquare",[ku]],["Relu",[cl]],["Resize",[Lp,Fp]],["RotaryEmbedding",[zc]],["ScatterND",[xp,vp]],["Sigmoid",[pl]],["Sin",[ml]],["Sinh",[gl]],["Slice",[Qp,Zp]],["SkipLayerNormalization",[Gp]],["Split",[Sc,Tc]],["Sqrt",[_l]],["Softmax",[Jp,eh]],["Sub",[Bl]],["Tan",[yl]],["Tanh",[wl]],["ThresholdedRelu",[$l,Gr]],["Tile",[ih]],["Transpose",[Do,Po]],["Where",[oh]]])}),lh,Ug=W(()=>{tt(),At(),oe(),lh=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){ot(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),et(e.programInfo.name)}dispose(){}build(e,t){ot(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&n.push(`enable ${d.extension};`)});let i=Ao(t,this.backend.device.limits),a=e.getShaderSource(i),s=`${n.join(`
`)}
${i.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});me("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return et(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,n=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let a=t*r*n,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),dh={};Tr(dh,{WebGpuBackend:()=>fh});var ch,ph,hh,fh,Lg=W(()=>{tt(),re(),At(),_o(),Zm(),Pg(),Ug(),ch=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${i}`);break}case"rank":{let a=e[n].dims.length;r.push(`${i};${a}`);break}case"dims":{let a=e[n].dims.join(",");r.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},ph=(e,t,r)=>{var i,a;let n=e.name;return(i=e.shaderCache)!=null&&i.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${ch(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,n},hh=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},fh=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=a=>t.features.has(a)&&r.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n),this.adapterInfo=new hh(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Io(this),this.programManager=new lh(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,vi(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ot(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var n;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],s=a.kernelId,u=this.kernels.get(s),l=u.kernelType,d=u.kernelName,p=a.programName,h=a.inputTensorViews,m=a.outputTensorViews,_=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),k=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(k))throw new RangeError("incorrect timestamp range");if((n=this.env.webgpu.profiling)!=null&&n.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(v=>({dims:v.dims,dataType:Ct(v.dataType)})),outputsMetadata:m.map(v=>({dims:v.dims,dataType:Ct(v.dataType)})),kernelId:s,kernelType:l,kernelName:d,programName:p,startTime:w,endTime:k});else{let v="";h.forEach((T,S)=>{v+=`input[${S}]: [${T.dims}] | ${Ct(T.dataType)}, `});let b="";m.forEach((T,S)=>{b+=`output[${S}]: [${T.dims}] | ${Ct(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${d}|${p}" ${v}${b}start time: ${w} ns, execution time: ${k-w} ns`)}Pr("GPU",`${p}::${_}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),et()}run(e,t,r,n,i,a){ot(e.name);let s=[];for(let b=0;b<t.length;++b){let T=t[b].data;if(T===0)continue;let S=this.gpuDataManager.get(T);if(!S)throw new Error(`no GPU data for input: ${T}`);s.push(S)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=r.length===0?u.map((b,T)=>T):r;if(p.length!==u.length)throw new Error(`Output size ${p.length} must be equal to ${u.length}.`);let h=[],m=[];for(let b=0;b<u.length;++b){if(!Number.isInteger(p[b])||p[b]<-3||p[b]>=a)throw new Error(`Invalid output index: ${p[b]}`);if(p[b]===-3)continue;let T=p[b]===-1,S=p[b]===-2,E=T||S?i(u[b].dataType,u[b].dims):n(p[b],u[b].dataType,u[b].dims);if(h.push(E),E.data===0)continue;let z=this.gpuDataManager.get(E.data);if(!z)throw new Error(`no GPU data for output: ${E.data}`);if(T&&this.temporaryData.push(z),S){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(z)}m.push(z)}if(s.length!==t.length||m.length!==h.length){if(m.length===0)return et(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(d){let b=0,T=[];d.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let M=A.type===10?2:4,D,q;A.type===10?(q=$.length>4?16:$.length>2?8:$.length*M,D=$.length>4?16:M*$.length):(q=$.length<=2?$.length*M:16,D=16),b=Math.ceil(b/q)*q,T.push(b);let G=A.type===10?8:4;b+=$.length>4?Math.ceil($.length/G)*D:$.length*M});let S=16;b=Math.ceil(b/S)*S;let E=new ArrayBuffer(b);d.forEach((A,$)=>{let M=T[$],D=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,M,D.length).set(D);else if(A.type===12)new Uint32Array(E,M,D.length).set(D);else if(A.type===10)new Uint16Array(E,M,D.length).set(D);else if(A.type===1)new Float32Array(E,M,D.length).set(D);else throw new Error(`Unsupported uniform type: ${Ct(A.type)}`)});let z=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,E,0,b),this.gpuDataManager.release(z.id),_={offset:0,size:b,buffer:z.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),w=y[1]===1&&y[2]===1,k=ph(e,t,w),v=this.programManager.getArtifact(k);if(v||(v=this.programManager.build(e,y),this.programManager.setArtifact(k,v),me("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let b=0;b<d.length;b++){let T=d[b],S=T.type,E=typeof T.data=="number"?1:T.data.length,[z,A]=v.uniformVariablesInfo[b];if(S!==z||E!==A)throw new Error(`Uniform variable ${b} mismatch: expect type ${z} with size ${A}, got type ${S} with size ${E} in program "${v.programInfo.name}".`)}}if(me("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(v,s,m,y,_),et(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=uh.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw new Error(`kernel not created: ${e}`);let i=n.kernelType,a=n.kernelName,s=n.kernelEntry,u=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),me("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),s=this.gpuDataManager.registerExternalBuffer(r,n,a);return i.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await Ri(this,e,t);return xi(n.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){me("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){me("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){me("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let i=this.getComputePassEncoder(),a=e[n];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),mh={};Tr(mh,{init:()=>_h});var Cn,gh,_h,Fg=W(()=>{re(),At(),ae(),Qm(),Cn=class Im{constructor(t,r,n,i){this.module=t,this.dataType=r,this.data=n,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new Im(this.module,this.dataType,this.data,t)}},gh=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,a=n===4?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,a));let s=Number(e.getValue(n*i++,a));this.outputCount=Number(e.getValue(n*i++,a)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,a));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(n*i++,a)),p=Number(e.getValue(n*i++,"*")),h=Number(e.getValue(n*i++,a)),m=[];for(let _=0;_<h;_++)m.push(Number(e.getValue(n*i++,a)));u.push(new Cn(e,d,p,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(u=>typeof u=="number"?this.inputs[u]:u))??this.inputs,n=(t==null?void 0:t.outputs)??[],i=(u,l,d)=>new Cn(this.module,l,this.output(u,d),d),a=(u,l)=>{let d=ur(u,l);if(!d)throw new Error(`Unsupported data type: ${u}`);let p=d>0?this.backend.gpuDataManager.create(d).id:0;return new Cn(this.module,u,p,l)};return this.backend.run(e,r,n,i,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let n=this.module.PTR_SIZE,i=n===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*n);this.module.setValue(a,t.length,i);for(let s=0;s<t.length;s++)this.module.setValue(a+n*(s+1),t[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(n){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},_h=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Lg(),Nr(dh)).WebGpuBackend,s=new a;await s.initialize(r,n),i("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,d,p=!1)=>{if(p)me("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(u),Number(l));else{me("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let h=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(d));s.upload(Number(l),h)}},async(u,l,d)=>{me("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${d}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(u,l,d)=>s.createKernel(u,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,d,p)=>{me("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${u}, contextDataOffset=${l}`);let h=new gh(t,s,Number(l));return s.computeKernel(Number(u),h,p)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new xo(r);i("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,l,d,p)=>a.ensureTensor(s,u,l,d,p),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),yh,Ia,Ea,qt,wh,za,An,Ca,Aa,Oa,Ma,Ra,Na,bh=W(()=>{tt(),Hm(),jm(),re(),sr(),_i(),so(),yh=(e,t)=>{Se()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},Ia=async e=>{yh(e.wasm.numThreads,_n(e.logLevel))},Ea=async(e,t)=>{var n,i;(i=(n=Se()).asyncInit)==null||i.call(n);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:s}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(Fg(),Nr(mh)).init;t==="webgpu"&&await a("webgpu",Se(),e,r),t==="webnn"&&await a("webnn",Se(),e)}},qt=new Map,wh=e=>{let t=Se(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,i,i+n)!==0&&$e("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+n,a))]}finally{t.stackRestore(r)}},za=(e,t)=>{let r=Se(),n=r.stackSave(),i=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&$e("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));i=Number(r.getValue(s+a,"*"));let l=r.HEAP32[i/4];if(l===0)return[u,0];let d=r.HEAPU32[i/4+1],p=[];for(let h=0;h<d;h++){let m=Number(r.getValue(i+8+h*a,"*"));p.push(m!==0?r.UTF8ToString(m):Number(r.getValue(i+8+(h+d)*a,"*")))}return[u,l,p]}finally{r.stackRestore(n),i!==0&&r._OrtFree(i)}},An=e=>{let t=Se(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Ca=async(e,t)=>{var h,m,_,y;let r,n,i=Se();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=An(e);let a=0,s=0,u=0,l=[],d=[],p=[];try{if([s,l]=await ao(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let $=[];for(let M of t.externalData){let D=typeof M=="string"?M:M.path;$.push($i(typeof M=="string"?M:M.data).then(q=>{i.mountExternalData(D,q)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof $!="string"){let M=$,D=M==null?void 0:M.context,q=M==null?void 0:M.gpuDevice,G=M==null?void 0:M.deviceType,V=M==null?void 0:M.powerPreference;D?i.currentContext=D:q?i.currentContext=await i.webnnCreateMLContext(q):i.currentContext=await i.webnnCreateMLContext({deviceType:G,powerPreference:V})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(r,n,s),(h=i.webgpuOnCreateSession)==null||h.call(i,a),a===0&&$e("Can't create a session."),(m=i.jsepOnCreateSession)==null||m.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[w,k]=wh(a),v=!!(t!=null&&t.enableGraphCapture),b=[],T=[],S=[],E=[],z=[];for(let $=0;$<w;$++){let[M,D,q]=za(a,$);M===0&&$e("Can't get an input name."),d.push(M);let G=i.UTF8ToString(M);b.push(G),S.push(D===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:Ct(D),shape:q})}for(let $=0;$<k;$++){let[M,D,q]=za(a,$+w);M===0&&$e("Can't get an output name."),p.push(M);let G=i.UTF8ToString(M);T.push(G),E.push(D===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:Ct(D),shape:q});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){z.push("gpu-buffer");continue}let V=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((_=t==null?void 0:t.preferredOutputLocation)==null?void 0:_[G])??"cpu",O=i.webnnIsGraphOutput;if(V==="cpu"&&O&&O(a,G)){z.push("ml-tensor-cpu-output");continue}if(V!=="cpu"&&V!=="cpu-pinned"&&V!=="gpu-buffer"&&V!=="ml-tensor")throw new Error(`Not supported preferred output location: ${V}.`);if(v&&V!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${V}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);z.push(V)}}let A=null;return z.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(u=i._OrtCreateBinding(a),u===0&&$e("Can't create IO binding."),A={handle:u,outputPreferredLocations:z,outputPreferredLocationsEncoded:z.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>bi($))}),qt.set(a,[a,d,p,A,v,!1]),[a,b,T,S,E]}catch(w){throw d.forEach(k=>i._OrtFree(k)),p.forEach(k=>i._OrtFree(k)),u!==0&&i._OrtReleaseBinding(u)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),w}finally{i._free(r),s!==0&&i._OrtReleaseSessionOptions(s)!==0&&$e("Can't release session options."),l.forEach(w=>i._free(w)),(y=i.unmountExternalData)==null||y.call(i)}},Aa=e=>{var l,d,p;let t=Se(),r=qt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,i,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(d=t.webnnOnReleaseSession)==null||d.call(t,e),(p=t.webgpuOnReleaseSession)==null||p.call(t,e),i.forEach(h=>t._OrtFree(h)),a.forEach(h=>t._OrtFree(h)),t._OrtReleaseSession(n)!==0&&$e("Can't release session."),qt.delete(e)},Oa=async(e,t,r,n,i,a,s=!1)=>{if(!e){t.push(0);return}let u=Se(),l=u.PTR_SIZE,d=e[0],p=e[1],h=e[3],m=h,_,y;if(d==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let v=e[2].gpuBuffer;y=ur(or(d),p);{let b=u.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=b(n,a,v,y)}}else if(h==="ml-tensor"){let v=e[2].mlTensor;y=ur(or(d),p);let b=u.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=b(n,v,or(d),p)}else{let v=e[2];if(Array.isArray(v)){y=l*v.length,_=u._malloc(y),r.push(_);for(let b=0;b<v.length;b++){if(typeof v[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);u.setValue(_+b*l,ut(v[b],r),"*")}}else{let b=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(d!=="string"&&b&&T){let S=u.UTF8ToString(i);if(b(n,S)||T(n,S)){let E=or(d);y=ur(E,p),m="ml-tensor";let z=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!z||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await z(n,E,p);A($,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),_=$}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}}let w=u.stackSave(),k=u.stackAlloc(4*p.length);try{p.forEach((b,T)=>u.setValue(k+T*l,b,l===4?"i32":"i64"));let v=u._OrtCreateTensor(or(d),_,y,k,p.length,bi(m));v===0&&$e(`Can't create tensor for input/output. session=${n}, index=${a}.`),t.push(v)}finally{u.stackRestore(w)}},Ma=async(e,t,r,n,i,a)=>{var G,V,O,F;let s=Se(),u=s.PTR_SIZE,l=qt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],h=l[2],m=l[3],_=l[4],y=l[5],w=t.length,k=n.length,v=0,b=[],T=[],S=[],E=[],z=[],A=s.stackSave(),$=s.stackAlloc(w*u),M=s.stackAlloc(w*u),D=s.stackAlloc(k*u),q=s.stackAlloc(k*u);try{[v,b]=eo(a),Ut("wasm prepareInputOutputTensor");for(let L=0;L<w;L++)await Oa(r[L],T,E,e,p[t[L]],t[L],_);for(let L=0;L<k;L++)await Oa(i[L],S,E,e,h[n[L]],w+n[L],_);Lt("wasm prepareInputOutputTensor");for(let L=0;L<w;L++)s.setValue($+L*u,T[L],"*"),s.setValue(M+L*u,p[t[L]],"*");for(let L=0;L<k;L++)s.setValue(D+L*u,S[L],"*"),s.setValue(q+L*u,h[n[L]],"*");if(m&&!y){let{handle:L,outputPreferredLocations:ge,outputPreferredLocationsEncoded:U}=m;if(p.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${p.length}).`);Ut("wasm bindInputsOutputs");for(let P=0;P<w;P++){let Q=t[P];await s._OrtBindInput(L,p[Q],T[P])!==0&&$e(`Can't bind input[${P}] for session=${e}.`)}for(let P=0;P<k;P++){let Q=n[P];(G=i[P])!=null&&G[3]?(z.push(S[P]),s._OrtBindOutput(L,h[Q],S[P],0)!==0&&$e(`Can't bind pre-allocated output[${P}] for session=${e}.`)):s._OrtBindOutput(L,h[Q],0,U[Q])!==0&&$e(`Can't bind output[${P}] to ${ge[P]} for session=${e}.`)}Lt("wasm bindInputsOutputs"),qt.set(e,[d,p,h,m,_,!0])}(V=s.jsepOnRunStart)==null||V.call(s,d),(O=s.webnnOnRunStart)==null||O.call(s,d);let j;m?j=await s._OrtRunWithBinding(d,m.handle,k,D,v):j=await s._OrtRun(d,M,$,w,q,k,D,v),j!==0&&$e("failed to call OrtRun().");let X=[],ne=[];Ut("wasm ProcessOutputTensor");for(let L=0;L<k;L++){let ge=Number(s.getValue(D+L*u,"*"));if(ge===S[L]||z.includes(S[L])){X.push(i[L]),ge!==S[L]&&s._OrtReleaseTensor(ge)!==0&&$e("Can't release tensor.");continue}let U=s.stackSave(),P=s.stackAlloc(4*u),Q=!1,K,le=0;try{s._OrtGetTensorData(ge,P,P+u,P+2*u,P+3*u)!==0&&$e(`Can't access output tensor data on index ${L}.`);let Ce=u===4?"i32":"i64",je=Number(s.getValue(P,Ce));le=s.getValue(P+u,"*");let rt=s.getValue(P+u*2,"*"),ft=Number(s.getValue(P+u*3,Ce)),Re=[];for(let ve=0;ve<ft;ve++)Re.push(Number(s.getValue(rt+ve*u,Ce)));s._OrtFree(rt)!==0&&$e("Can't free memory for tensor dims.");let Pe=Re.reduce((ve,ie)=>ve*ie,1);K=Ct(je);let nt=m==null?void 0:m.outputPreferredLocations[n[L]];if(K==="string"){if(nt==="gpu-buffer"||nt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ve=[];for(let ie=0;ie<Pe;ie++){let Le=s.getValue(le+ie*u,"*"),Ht=s.getValue(le+(ie+1)*u,"*"),Fe=ie===Pe-1?void 0:Ht-Le;ve.push(s.UTF8ToString(Le,Fe))}X.push([K,Re,ve,"cpu"])}else if(nt==="gpu-buffer"&&Pe>0){let ve=s.jsepGetBuffer;if(!ve)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ie=ve(le),Le=ur(je,Pe);if(Le===void 0||!yi(K))throw new Error(`Unsupported data type: ${K}`);Q=!0,X.push([K,Re,{gpuBuffer:ie,download:s.jsepCreateDownloader(ie,Le,K),dispose:()=>{s._OrtReleaseTensor(ge)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(nt==="ml-tensor"&&Pe>0){let ve=s.webnnEnsureTensor,ie=s.webnnIsGraphInputOutputTypeSupported;if(!ve||!ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(ur(je,Pe)===void 0||!wi(K))throw new Error(`Unsupported data type: ${K}`);if(!ie(e,K,!1))throw new Error(`preferredLocation "ml-tensor" for ${K} output is not supported by current WebNN Context.`);let Le=await ve(e,le,je,Re,!1);Q=!0,X.push([K,Re,{mlTensor:Le,download:s.webnnCreateMLTensorDownloader(le,K),dispose:()=>{s.webnnReleaseTensorId(le),s._OrtReleaseTensor(ge)}},"ml-tensor"])}else if(nt==="ml-tensor-cpu-output"&&Pe>0){let ve=s.webnnCreateMLTensorDownloader(le,K)(),ie=X.length;Q=!0,ne.push((async()=>{let Le=[ie,await ve];return s.webnnReleaseTensorId(le),s._OrtReleaseTensor(ge),Le})()),X.push([K,Re,[],"cpu"])}else{let ve=gn(K),ie=new ve(Pe);new Uint8Array(ie.buffer,ie.byteOffset,ie.byteLength).set(s.HEAPU8.subarray(le,le+ie.byteLength)),X.push([K,Re,ie,"cpu"])}}finally{s.stackRestore(U),K==="string"&&le&&s._free(le),Q||s._OrtReleaseTensor(ge)}}m&&!_&&(s._OrtClearBoundOutputs(m.handle)!==0&&$e("Can't clear bound outputs."),qt.set(e,[d,p,h,m,_,!1]));for(let[L,ge]of await Promise.all(ne))X[L][2]=ge;return Lt("wasm ProcessOutputTensor"),X}finally{(F=s.webnnOnRunEnd)==null||F.call(s,d),s.stackRestore(A),T.forEach(j=>s._OrtReleaseTensor(j)),S.forEach(j=>s._OrtReleaseTensor(j)),E.forEach(j=>s._free(j)),v!==0&&s._OrtReleaseRunOptions(v),b.forEach(j=>s._free(j))}},Ra=e=>{let t=Se(),r=qt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},Na=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}}),Gt,He,Cr,Xr,Yr,On,Ba,Mn,mr,gr,$h,vh,xh,kh,Sh,Th,Ih,Eh,zh=W(()=>{tt(),bh(),sr(),hi(),Gt=()=>!!ke.wasm.proxy&&typeof document<"u",Cr=!1,Xr=!1,Yr=!1,Mn=new Map,mr=(e,t)=>{let r=Mn.get(e);r?r.push(t):Mn.set(e,[t])},gr=()=>{if(Cr||!Xr||Yr||!He)throw new Error("worker not ready")},$h=e=>{switch(e.data.type){case"init-wasm":Cr=!1,e.data.err?(Yr=!0,Ba[1](e.data.err)):(Xr=!0,Ba[0]()),On&&(URL.revokeObjectURL(On),On=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Mn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},vh=async()=>{if(!Xr){if(Cr)throw new Error("multiple calls to 'initWasm()' detected.");if(Yr)throw new Error("previous call to 'initWasm()' failed.");if(Cr=!0,Gt())return new Promise((e,t)=>{He==null||He.terminate(),Qs().then(([r,n])=>{try{He=n,He.onerror=a=>t(a),He.onmessage=$h,Ba=[e,t];let i={type:"init-wasm",in:ke};!i.in.wasm.wasmPaths&&(r||li)&&(i.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",self.location.href).href,self.location.href).href}),He.postMessage(i),On=r}catch(i){t(i)}},t)});try{await gi(ke.wasm),await Ia(ke),Xr=!0}catch(e){throw Yr=!0,e}finally{Cr=!1}}},xh=async e=>{if(Gt())return gr(),new Promise((t,r)=>{mr("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:ke}};He.postMessage(n)});await Ea(ke,e)},kh=async e=>Gt()?(gr(),new Promise((t,r)=>{mr("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};He.postMessage(n,[e.buffer])})):An(e),Sh=async(e,t)=>{if(Gt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return gr(),new Promise((r,n)=>{mr("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),He.postMessage(i,a)})}else return Ca(e,t)},Th=async e=>{if(Gt())return gr(),new Promise((t,r)=>{mr("release",[t,r]);let n={type:"release",in:e};He.postMessage(n)});Aa(e)},Ih=async(e,t,r,n,i,a)=>{if(Gt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return gr(),new Promise((s,u)=>{mr("run",[s,u]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:a}};He.postMessage(d,Na(l))})}else return Ma(e,t,r,n,i,a)},Eh=async e=>{if(Gt())return gr(),new Promise((t,r)=>{mr("end-profiling",[t,r]);let n={type:"end-profiling",in:e};He.postMessage(n)});Ra(e)}}),Da,Ch,Ah,Wg=W(()=>{tt(),zh(),re(),ai(),so(),Da=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Ch=e=>{switch(e[3]){case"cpu":return new st(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!yi(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return st.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!wi(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return st.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},Ah=class{async fetchModelAndCopyToWasmMemory(e){return kh(await $i(e))}async loadModel(e,t){ot();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Sh(r,t),et()}async dispose(){return Th(this.sessionId)}async run(e,t,r){ot();let n=[],i=[];Object.entries(e).forEach(h=>{let m=h[0],_=h[1],y=this.inputNames.indexOf(m);if(y===-1)throw new Error(`invalid input '${m}'`);n.push(_),i.push(y)});let a=[],s=[];Object.entries(t).forEach(h=>{let m=h[0],_=h[1],y=this.outputNames.indexOf(m);if(y===-1)throw new Error(`invalid output '${m}'`);a.push(_),s.push(y)});let u=n.map((h,m)=>Da(h,()=>`input "${this.inputNames[i[m]]}"`)),l=a.map((h,m)=>h?Da(h,()=>`output "${this.outputNames[s[m]]}"`):null),d=await Ih(this.sessionId,i,u,s,l,r),p={};for(let h=0;h<d.length;h++)p[this.outputNames[s[h]]]=a[h]??Ch(d[h]);return et(),p}startProfiling(){}endProfiling(){Eh(this.sessionId)}}}),Oh={};Tr(Oh,{OnnxruntimeWebAssemblyBackend:()=>Ua,initializeFlags:()=>Pa,wasmBackend:()=>Mh});var Pa,Ua,Mh,qg=W(()=>{tt(),zh(),Wg(),Pa=()=>{(typeof ke.wasm.initTimeout!="number"||ke.wasm.initTimeout<0)&&(ke.wasm.initTimeout=0);let e=ke.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ke.wasm.simd=!1),typeof ke.wasm.proxy!="boolean"&&(ke.wasm.proxy=!1),typeof ke.wasm.trace!="boolean"&&(ke.wasm.trace=!1),typeof ke.wasm.numThreads!="number"||!Number.isInteger(ke.wasm.numThreads)||ke.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ke.wasm.numThreads=1;else{let t=typeof navigator>"u"?zm("node:os").cpus().length:navigator.hardwareConcurrency;ke.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ua=class{async init(e){Pa(),await vh(),await xh(e)}async createInferenceSessionHandler(e,t){let r=new Ah;return await r.loadModel(e,t),r}},Mh=new Ua});tt(),tt(),tt();var Gg="1.24.1",Vg=Ds;{let e=(qg(),Nr(Oh)).wasmBackend;ir("webgpu",e,5),ir("webnn",e,5),ir("cpu",e,10),ir("wasm",e,10)}Object.defineProperty(ke.versions,"web",{value:Gg,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Hg=Object.freeze({__proto__:null,get InferenceSession(){return ii},get TRACE(){return Pr},get TRACE_EVENT_BEGIN(){return Ut},get TRACE_EVENT_END(){return Lt},get TRACE_FUNC_BEGIN(){return ot},get TRACE_FUNC_END(){return et},get Tensor(){return st},default:Vg,get env(){return ke},get registerBackend(){return ir}});async function Rh({backend:e="webgpu",wasmPaths:t,numThreads:r}={}){var i,a,s,u;let n;try{const l=await Promise.resolve().then(function(){return Hg});n=l.default||l,console.log("[Parakeet.js] ORT structure:",{hasDefault:!!l.default,hasEnv:!!n.env,hasWasm:!!((i=n.env)!=null&&i.wasm),hasWebgpu:!!((a=n.env)!=null&&a.webgpu),keys:Object.keys(n).slice(0,10)}),n.env||(console.log("[Parakeet.js] Trying alternative access patterns..."),console.log("[Parakeet.js] ortModule keys:",Object.keys(l)),l.ort&&(n=l.ort,console.log("[Parakeet.js] Found ort in ortModule.ort")))}catch(l){throw console.error("[Parakeet.js] Failed to import onnxruntime-web:",l),new Error("Failed to load ONNX Runtime Web. Please check your network connection.")}if(!n||!n.env)throw new Error("ONNX Runtime Web loaded but env is not available. This might be a bundling issue.");if(!n.env.wasm.wasmPaths){const d=((s=n.env.versions)==null?void 0:s.common)||"1.24.1";(u=n.env.versions)!=null&&u.common||console.warn("Parakeet.js: Could not auto-detect onnxruntime-web version. Using fallback version; set ort.env.wasm.wasmPaths manually for best results."),n.env.wasm.wasmPaths=`https://cdn.jsdelivr.net/npm/onnxruntime-web@${d}/dist/`}if((e==="wasm"||e==="webgpu")&&(typeof SharedArrayBuffer<"u"?(n.env.wasm.numThreads=r||navigator.hardwareConcurrency||4,n.env.wasm.simd=!0,console.log(`[Parakeet.js] WASM configured with ${n.env.wasm.numThreads} threads, SIMD enabled`)):(console.warn("[Parakeet.js] SharedArrayBuffer not available - using single-threaded WASM"),n.env.wasm.numThreads=1),n.env.wasm.proxy=!1),e==="webgpu"){const l="gpu"in navigator;if(console.log(`[Parakeet.js] WebGPU supported: ${l}`),l)try{console.log("[Parakeet.js] WebGPU will be initialized automatically when creating session")}catch(d){console.warn("[Parakeet.js] WebGPU initialization failed:",d),console.warn("[Parakeet.js] Falling back to WASM"),e="wasm"}else console.warn("[Parakeet.js] WebGPU not supported – falling back to WASM"),e="wasm"}return typeof globalThis<"u"&&(globalThis.ort=n),n}async function jg(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch ${e}: ${t.status}`);return t.text()}class La{constructor(t){this.id2token=t,this.blankToken="<blk>",this.blankId=t.findIndex(r=>r==="<blk>"),this.blankId===-1&&(console.warn("[ParakeetTokenizer] Blank token <blk> not found in vocabulary, defaulting to 1024"),this.blankId=1024),this.sanitizedTokens=this.id2token.map(r=>r&&r.replace(/\u2581/g," "))}static async fromUrl(t){const n=(await jg(t)).split(/\r?\n/).filter(Boolean),i=[];for(const a of n){const[s,u]=a.split(/\s+/),l=parseInt(u,10);if(isNaN(l)||!s){console.warn(`[ParakeetTokenizer] Skipping invalid vocab line: ${JSON.stringify(a)}`);continue}i[l]=s}return new La(i)}decode(t){const r=[];for(const i of t){if(i===this.blankId)continue;const a=this.sanitizedTokens[i];a!==void 0&&r.push(a)}let n=r.join("");return n=n.replace(/^\s+/,""),n=n.replace(/\s+(?=[^\w\s])/g,""),n=n.replace(/\s+/g," "),n.trim()}}class Kg{constructor(t,r={}){this.modelUrl=t,this.opts=r,this.opts.enableGraphCapture===void 0&&(this.opts.enableGraphCapture=this.opts.backend==="wasm"),this.session=null,this.ort=null,this._sessionPromise=null}async _ensureSession(){if(!this.session){if(this._sessionPromise){await this._sessionPromise;return}this._sessionPromise=(async()=>{this.ort=await Rh(this.opts);const t=this.opts.enableGraphCapture?{enableProfiling:this.opts.enableProfiling||!1,enableGraphCapture:!0}:{enableProfiling:this.opts.enableProfiling||!1},r=async()=>{try{return await this.ort.InferenceSession.create(this.modelUrl,t)}catch(n){const i=(n.message||"")+"";if(t.enableGraphCapture&&i.includes("graph capture"))return console.warn("[Preprocessor] Graph capture unsupported, retrying without it"),await this.ort.InferenceSession.create(this.modelUrl,{...t,enableGraphCapture:!1});throw n}};this.session=await r()})();try{await this._sessionPromise}catch(t){throw this._sessionPromise=null,t}finally{this.session&&(this._sessionPromise=null)}}}async process(t){var m,_,y,w;await this._ensureSession();let r;t instanceof Float32Array?r=t.byteOffset===0&&t.buffer.byteLength===t.byteLength?t:new Float32Array(t):r=new Float32Array(t);const n=new this.ort.Tensor("float32",r,[1,r.length]),i=new BigInt64Array([BigInt(r.length)]),a=new this.ort.Tensor("int64",i,[1]),s={waveforms:n,waveforms_lens:a},u=await this.session.run(s),l=u.features,d=u.features_lens,p=new Float32Array(l.data),h=Number(d.data[0]);return(m=n.dispose)==null||m.call(n),(_=a.dispose)==null||_.call(a),(y=l.dispose)==null||y.call(l),(w=d.dispose)==null||w.call(d),{features:p,length:h}}}const Qg=16e3,wt=512,Fa=400,_r=160,Zg=.97,Xg=2**-24,bt=(wt>>1)+1,Rn=Math.SQRT1_2,Nh=new Map,Bh=new Map;let Wa=null;const qa=200/3,Nn=1e3,Ga=Nn/qa,Dh=Math.log(6.4)/27;function Ph(e){return e>=Nn?Ga+Math.log(e/Nn)/Dh:e/qa}function Yg(e){return e>=Ga?Nn*Math.exp(Dh*(e-Ga)):e*qa}function Jg(e){const r=Qg/2,n=new Float64Array(bt);for(let p=0;p<bt;p++)n[p]=r*p/(bt-1);const i=Ph(0),a=Ph(r),s=e+2,u=new Float64Array(s);for(let p=0;p<s;p++)u[p]=Yg(i+(a-i)*p/(s-1));const l=new Float64Array(s-1);for(let p=0;p<s-1;p++)l[p]=u[p+1]-u[p];const d=new Float32Array(e*bt);for(let p=0;p<e;p++){const h=2/(u[p+2]-u[p]),m=p*bt;for(let _=0;_<bt;_++){const y=(n[_]-u[p])/l[p],w=(u[p+2]-n[_])/l[p+1];d[m+_]=Math.max(0,Math.min(y,w))*h}}return d}function e0(e){let t=Nh.get(e);return t||(t=Jg(e),Nh.set(e,t)),t}function t0(){const e=new Float64Array(wt),t=wt-Fa>>1;for(let r=0;r<Fa;r++)e[t+r]=.5*(1-Math.cos(2*Math.PI*r/(Fa-1)));return e}function r0(){return Wa||(Wa=t0()),Wa}function Uh(e){const t=Bh.get(e);if(t)return t;const r=Math.log2(e);if(1<<r!==e)throw new Error(`FFT size must be power-of-two. Received: ${e}`);const n=e>>1,i=new Float64Array(n),a=new Float64Array(n);for(let l=0;l<n;l++){const d=-2*Math.PI*l/e;i[l]=Math.cos(d),a[l]=Math.sin(d)}const s=new Uint32Array(e);for(let l=0;l<e;l++){let d=l,p=0;for(let h=0;h<r;h++)p=p<<1|d&1,d>>=1;s[l]=p}const u={cos:i,sin:a,bitrev:s};return Bh.set(e,u),u}function n0(e,t,r,n){if(n.bitrev&&n.bitrev.length===r){const i=n.bitrev;for(let a=0;a<r;a++){const s=i[a];if(a<s){let u=e[a];e[a]=e[s],e[s]=u,u=t[a],t[a]=t[s],t[s]=u}}}else{let i=0;for(let a=0;a<r-1;a++){if(a<i){let u=e[a];e[a]=e[i],e[i]=u,u=t[a],t[a]=t[i],t[i]=u}let s=r>>1;for(;s<=i;)i-=s,s>>=1;i+=s}}for(let i=0;i<r;i+=2){const a=i,s=i+1,u=e[s],l=t[s];e[s]=e[a]-u,t[s]=t[a]-l,e[a]+=u,t[a]+=l}for(let i=0;i<r;i+=4){const a=i,s=i+2,u=e[s],l=t[s];e[s]=e[a]-u,t[s]=t[a]-l,e[a]+=u,t[a]+=l;const d=i+1,p=i+3,h=t[p],m=-e[p];e[p]=e[d]-h,t[p]=t[d]-m,e[d]+=h,t[d]+=m}for(let i=0;i<r;i+=8){{const a=i,s=i+4,u=e[s],l=t[s];e[s]=e[a]-u,t[s]=t[a]-l,e[a]+=u,t[a]+=l}{const a=Rn,s=-Rn,u=i+1,l=u+4,d=e[l]*a-t[l]*s,p=e[l]*s+t[l]*a;e[l]=e[u]-d,t[l]=t[u]-p,e[u]+=d,t[u]+=p}{const a=i+2,s=a+4,u=t[s],l=-e[s];e[s]=e[a]-u,t[s]=t[a]-l,e[a]+=u,t[a]+=l}{const a=-Rn,s=-Rn,u=i+3,l=u+4,d=e[l]*a-t[l]*s,p=e[l]*s+t[l]*a;e[l]=e[u]-d,t[l]=t[u]-p,e[u]+=d,t[u]+=p}}for(let i=16;i<=r;i<<=1){const a=i>>1,s=r/i;for(let u=0;u<r;u+=i)for(let l=0;l<a;l++){const d=l*s,p=n.cos[d],h=n.sin[d],m=u+l,_=m+a,y=e[_]*p-t[_]*h,w=e[_]*h+t[_]*p;e[_]=e[m]-y,t[_]=t[m]-w,e[m]+=y,t[m]+=w}}}class Ar{constructor(t={}){this.nMels=t.nMels||128,this.melFilterbank=e0(this.nMels),this.hannWindow=r0(),this.twiddles=Uh(wt),this.twiddlesHalf=Uh(wt>>1),this._fftRe=new Float64Array(wt>>1),this._fftIm=new Float64Array(wt>>1),this._powerBuf=new Float32Array(bt),this._paddedBuffer=null,this.fbBounds=new Int32Array(this.nMels*2);for(let r=0;r<this.nMels;r++){const n=r*bt;let i=-1,a=-1;for(let s=0;s<bt;s++)this.melFilterbank[n+s]>0&&(i===-1&&(i=s),a=s);i===-1&&(i=0,a=-1),this.fbBounds[r*2]=i,this.fbBounds[r*2+1]=a+1}}process(t){const{rawMel:r,nFrames:n,featuresLen:i}=this.computeRawMel(t);return i===0?{features:new Float32Array(0),length:0}:{features:this.normalizeFeatures(r,n,i),length:i}}computeRawMel(t,r=0,n=null){const i=t.length;if(i===0)return{rawMel:n?n.subarray(0,0):new Float32Array(0),nFrames:0,featuresLen:0};const a=wt>>1,s=i+2*a;let u=!1;if(!this._paddedBuffer||this._paddedBuffer.length<s){const $=Math.ceil(s*1.2);this._paddedBuffer=new Float64Array($),u=!0}const l=this._paddedBuffer;l[a]=Math.fround(t[0]);for(let $=1;$<i;$++)l[a+$]=Math.fround(t[$]-Zg*t[$-1]);u||l.fill(0,a+i,s);const d=Math.floor((s-wt)/_r)+1,p=Math.floor(i/_r);if(p===0)return{rawMel:new Float32Array(0),nFrames:0,featuresLen:0};const h=this.nMels*d;let m;if(n&&n.length>=h){if(m=n.subarray(0,h),r>0)for(let $=0;$<this.nMels;$++)m.fill(0,$*d,$*d+r)}else m=new Float32Array(h);const _=this._fftRe,y=this._fftIm,w=this._powerBuf,k=this.hannWindow,v=this.melFilterbank,b=this.nMels,T=this.twiddles,S=this.twiddlesHalf,E=this.fbBounds,z=wt>>1,A=z>>1;for(let $=r;$<d;$++){const M=$*_r;for(let O=0;O<z;O++){const F=O<<1;_[O]=l[M+F]*k[F],y[O]=l[M+F+1]*k[F+1]}n0(_,y,z,S);const D=_[0],q=y[0];w[0]=(D+q)*(D+q),w[z]=(D-q)*(D-q);for(let O=1;O<A;O++){const F=_[O],j=y[O],X=_[z-O],ne=y[z-O],L=.5*(F+X),ge=.5*(j-ne),U=.5*(j+ne),P=-.5*(F-X),Q=T.cos[O],K=T.sin[O],le=U*Q-P*K,Ce=U*K+P*Q,je=L+le,rt=ge+Ce;w[O]=je*je+rt*rt;const ft=L-le,Re=ge-Ce;w[z-O]=ft*ft+Re*Re}const G=_[A],V=y[A];w[A]=G*G+V*V;for(let O=0;O<b;O++){let F=0;const j=O*bt,X=E[O*2],ne=E[O*2+1];for(let L=X;L<ne;L++)F+=w[L]*v[j+L];m[O*d+$]=Math.log(F+Xg)}}return{rawMel:m,nFrames:d,featuresLen:p}}normalizeFeatures(t,r,n,i=null){const a=this.nMels,s=a*n;let u;i&&i.length>=s?u=i.subarray(0,s):u=new Float32Array(s);for(let l=0;l<a;l++){const d=l*r,p=l*n;let h=0;for(let w=0;w<n;w++)h+=t[d+w];const m=h/n;let _=0;for(let w=0;w<n;w++){const k=t[d+w]-m;_+=k*k}const y=n>1?1/(Math.sqrt(_/(n-1))+1e-5):0;for(let w=0;w<n;w++)u[p+w]=(t[d+w]-m)*y}return u}}class Lh{constructor(t={}){this.preprocessor=new Ar({nMels:t.nMels||128}),this.nMels=this.preprocessor.nMels,this.boundaryFrames=t.boundaryFrames||3,this._cachedRawMel=null,this._cachedNFrames=0,this._cachedAudioLen=0,this._cachedFeaturesLen=0,this._rawBuffers=[null,null],this._bufIdx=0,this._featuresBuffer=null}reset(){this._cachedRawMel=null,this._cachedNFrames=0,this._cachedAudioLen=0,this._cachedFeaturesLen=0,this._bufIdx=0}process(t,r=0){const n=t.length;if(n===0)return{features:new Float32Array(0),length:0,cached:!1,cachedFrames:0,newFrames:0};const i=r>0&&this._cachedRawMel!==null&&r<=this._cachedAudioLen,a=Math.floor(n/_r)+1,s=this.nMels*a;let u=this._rawBuffers[this._bufIdx];if(!u||u.length<s){const k=Math.ceil(s*1.2);u=new Float32Array(k),this._rawBuffers[this._bufIdx]=u}const l=Math.floor(n/_r),d=this.nMels*l;if(!this._featuresBuffer||this._featuresBuffer.length<d){const k=Math.ceil(d*1.2);this._featuresBuffer=new Float32Array(k)}if(!i){const{rawMel:k,nFrames:v,featuresLen:b}=this.preprocessor.computeRawMel(t,0,u),T=this.preprocessor.normalizeFeatures(k,v,b,this._featuresBuffer);return this._cachedRawMel=k,this._cachedNFrames=v,this._cachedAudioLen=n,this._cachedFeaturesLen=b,this._bufIdx^=1,{features:new Float32Array(T),length:b,cached:!1,cachedFrames:0,newFrames:b}}const p=Math.floor(r/_r),h=Math.max(0,Math.min(p-this.boundaryFrames,this._cachedFeaturesLen)),{rawMel:m,nFrames:_,featuresLen:y}=this.preprocessor.computeRawMel(t,h,u);if(h>0&&this._cachedRawMel)for(let k=0;k<this.nMels;k++){const v=k*this._cachedNFrames,b=k*_;m.set(this._cachedRawMel.subarray(v,v+h),b)}const w=this.preprocessor.normalizeFeatures(m,_,y,this._featuresBuffer);return this._cachedRawMel=m,this._cachedNFrames=_,this._cachedAudioLen=n,this._cachedFeaturesLen=y,this._bufIdx^=1,{features:new Float32Array(w),length:y,cached:!0,cachedFrames:h,newFrames:y-h}}clear(){this.reset()}}const i0={HOP_LENGTH:_r},a0=180,s0=20,o0=180,u0=90,l0=10,Vt=1e-6,d0=.15,Fh=1,c0=.2,Wh=.5;function p0(e){if(!(e instanceof Float32Array||e instanceof Float64Array))throw new TypeError("ParakeetModel.transcribeLongAudio expected audio to be Float32Array or Float64Array.");for(let t=0;t<e.length;++t)if(!Number.isFinite(e[t]))throw new Error(`ParakeetModel.transcribeLongAudio expected finite audio samples; found ${e[t]} at index ${t}.`)}function h0(e){const t=Number(e);return!Number.isFinite(t)||t<=0?0:Math.max(s0,Math.min(o0,t))}function f0(e){return{audioDurationS:e,preprocess_ms:0,encode_ms:0,decode_ms:0,tokenize_ms:0,total_ms:0,cached_frames:0,new_frames:0,hasMetrics:!1,hasMelCache:!1}}function yr(e,t,r){typeof r=="number"&&Number.isFinite(r)&&(e[t]+=r)}function qh(e,t){!t||typeof t!="object"||(e.hasMetrics=!0,yr(e,"preprocess_ms",t.preprocess_ms),yr(e,"encode_ms",t.encode_ms),yr(e,"decode_ms",t.decode_ms),yr(e,"tokenize_ms",t.tokenize_ms),yr(e,"total_ms",t.total_ms),t.mel_cache&&typeof t.mel_cache=="object"&&(e.hasMelCache=!0,yr(e,"cached_frames",t.mel_cache.cached_frames),yr(e,"new_frames",t.mel_cache.new_frames)))}function Va(e){if(!(e!=null&&e.hasMetrics))return null;const t=e.total_ms>0?e.total_ms:e.preprocess_ms+e.encode_ms+e.decode_ms+e.tokenize_ms,r={preprocess_ms:e.preprocess_ms,encode_ms:e.encode_ms,decode_ms:e.decode_ms,tokenize_ms:e.tokenize_ms,total_ms:t,rtf:t>0?e.audioDurationS/(t/1e3):0};return e.hasMelCache&&(r.mel_cache={cached_frames:e.cached_frames,new_frames:e.new_frames}),r}function Ha(e){let t="";for(const r of e){const n=(r==null?void 0:r.text)??"";n&&(t?/^[,.;:!?)}\]]+$/.test(n)?t+=n:t+=` ${n}`:t=n)}return t}function Gh(e){return e.map(t=>({text:t.text,timestamp:[t.start_time,t.end_time]}))}function Vh(e){return String(e??"").normalize("NFKC").toLowerCase().replace(/^[("'“‘\[{]+/g,"").replace(/[.,!?;:)"'”’\]}]+$/g,"").trim()}function Hh(e){return String(e??"").normalize("NFKC").toLowerCase().trim()}function wr(e){const t=[];for(const r of e){const n=t.at(-1),i=Vh(n==null?void 0:n.text),a=Vh(r==null?void 0:r.text);if(n&&i===a&&(i.length>0||Hh(n.text)===Hh(r.text))&&r.start_time<n.end_time){const s=n.end_time-n.start_time;r.end_time-r.start_time>s&&(t[t.length-1]=r);continue}t.push(r)}return t}const m0=/[!?…](?:["')\]]+)?$/u,g0=/\.(?:["')\]]+)?$/u,_0=/["')\]]+$/gu,y0=/^[("'“‘\[{]+/u,w0=/^(?:[A-Z]\.){2,}$/,b0=/^[A-Z]\.$/,$0=/^(?:[IVXLCDM]+)\.$/i,v0=/^\d+\.$/,x0=3,k0=new Set(["mr.","mrs.","ms.","dr.","prof.","sr.","jr.","vs.","etc.","e.g.","i.e."]);function S0(e){return String(e??"").replace(_0,"")}function T0(e){const t=String(e??"").replace(y0,"");return/^[A-Z]/.test(t)}function I0(e,t,r=0){if(!t)return!1;if(r>=x0)return!0;const n=String((e==null?void 0:e.text)??"");if(!n)return!1;if(m0.test(n))return!0;if(!g0.test(n))return!1;const i=S0(n),a=i.toLowerCase();return k0.has(a)||w0.test(i)||b0.test(i)||$0.test(i)||v0.test(i)?!1:T0(t.text)}function jh(e){if(!Array.isArray(e)||e.length===0)return[];const t=[];let r=[];for(let n=0;n<e.length;++n){const i=e[n];r.push(i);const a=e[n+1]??null,s=a?Math.max(0,a.start_time-i.end_time):0;I0(i,a,s)&&(t.push({words:r,text:Ha(r),timestamp:[r[0].start_time,r[r.length-1].end_time]}),r=[])}return r.length>0&&t.push({words:r,text:Ha(r),timestamp:[r[0].start_time,r[r.length-1].end_time]}),t}function Kh(e,t=""){return!Array.isArray(e)||e.length===0?t?[{text:t,timestamp:[0,0]}]:[]:jh(e).map(r=>({text:r.text,timestamp:r.timestamp}))}function E0(e){return e.flatMap(t=>t.words)}function z0(e,t){const r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0)return wr(n);if(n.length===0)return wr(r);const i=r[0].start_time;return n[0].start_time<=i+Vt?wr(n):wr([...r,...n])}function Qh(e){return String(e??"").normalize("NFKC").replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/\s+/g," ").trim().toLowerCase()}function C0(e,t){const r=Qh(t.text);return r?e.some(n=>Qh(n.text)===r&&Math.abs(n.timestamp[1]-t.timestamp[1])<d0):!1}function Zh(e,t){C0(e,t)||e.push(t)}function A0(e,t){let r=e,n=Wh+1;for(let i=0;i<t.length-1;++i){const a=t[i],s=t[i+1],u=a.end_time,l=s.start_time;if(!(l-u<c0))for(const p of[u,l]){if(p+Vt<e)continue;const h=p-e;h<=Wh&&h<n&&(r=p,n=h)}}return r}async function O0({audio:e,samplingRate:t,chunkLengthS:r,baseTimeOffset:n,transcribeWindow:i}){const a=e.length/t,s=Math.min(l0,Math.max(0,r-1)),u=Math.max(1,r-s),l=Math.max(4,Math.ceil(Math.max(0,a-r)/Fh)+2),d=[];let p=[],h="",m=0,_=!1;for(let v=0;v<l&&m<a-Vt;++v){const b=Math.min(a,m+r),T=Math.max(0,Math.min(e.length-1,Math.floor(m*t))),S=Math.max(T+1,Math.min(e.length,Math.ceil(b*t))),E=e.subarray(T,S),z=b>=a-Vt,A=await i(E,n+m);h=A.text??h;const $=Array.isArray(A.words)?A.words:[],M=_?z0(p,$):wr($),D=jh(M);if(z){for(const G of D)Zh(d,G);p=[];break}if(D.length>1){const G=D[D.length-1],V=G.timestamp[0],O=Math.max(0,V-n);if(O>=m+Fh-Vt){const F=D.slice(0,-1);for(const X of F)Zh(d,X);p=wr(G.words);const j=Math.min(a,Math.max(0,A0(V,M)-n));if(_=j>O+Vt,j>m+Vt){m=j;continue}}}p=M,_=!0;const q=Math.min(a,m+u);if(q<=m+Vt)break;m=q}const y=wr([...E0(d),...p]),w=y.length>0?Ha(y):String(h??"").trim(),k=Kh(y,w);return{text:w,words:y,chunks:k}}async function M0(e,t,r=16e3,n={}){if(p0(t),typeof r!="number"||!Number.isFinite(r)||r<=0)throw new Error("ParakeetModel.transcribeLongAudio expected `sampleRate` to be a positive finite number.");const{returnTimestamps:i=!1,chunkLengthS:a=0,timeOffset:s=0,...u}=n;if(typeof s!="number"||!Number.isFinite(s)||s<0)throw new Error("ParakeetModel.transcribeLongAudio expected `timeOffset` to be a finite non-negative number.");const l=i==="word",d=i===!0||l,p=h0(a),h=t.length/r,m=p<=0&&h>a0,_=p>0?p:m?u0:0,y=f0(h),w=async(T,S)=>{const E=await e.transcribe(T,r,{...u,_skipAudioValidation:!0,returnTimestamps:!0,timeOffset:S});return qh(y,E.metrics),{text:E.utterance_text??"",words:Array.isArray(E.words)?E.words:[]}};if(_>0){const T=await O0({audio:t,samplingRate:r,chunkLengthS:_,baseTimeOffset:s,transcribeWindow:w}),S={text:T.text,metrics:Va(y)};return d&&(S.words=T.words,S.chunks=l?Gh(T.words):T.chunks),S}const k=await e.transcribe(t,r,{...u,_skipAudioValidation:!0,returnTimestamps:d,timeOffset:s});qh(y,k.metrics);const v=k.utterance_text??"";if(!d)return{text:v,metrics:Va(y)};const b=Array.isArray(k.words)?k.words:[];return{text:v,words:b,chunks:l?Gh(b):Kh(b,v),metrics:Va(y)}}function R0(e,t){if(!(e instanceof Float32Array||e instanceof Float64Array))return e;let r=null,n=0;for(let i=0;i<e.length;++i)Number.isFinite(e[i])||(r||(r=e.slice()),r[i]=0,n+=1);return r?(console.warn(`[Parakeet.js] ${t} received ${n} non-finite audio sample(s); replacing them with 0 for compatibility.`),r):e}function N0(e,t){return Number.isFinite(e)?e:(console.warn(`[Parakeet.js] ${t} received non-finite timeOffset; using 0 for compatibility.`),0)}class ja{constructor({tokenizer:t,encoderSession:r,joinerSession:n,preprocessor:i,ort:a,subsampling:s=8,windowStride:u=.01,normalizer:l=m=>m,onnxPreprocessor:d=null,nMels:p,maxIncrementalCacheSize:h=50}){this.tokenizer=t,this.encoderSession=r,this.joinerSession=n,this.preprocessor=i,this.ort=a,this._onnxPreprocessor=d,this._jsPreprocessor=i instanceof Ar?i:null,this._incrementalMel=i instanceof Ar?new Lh({nMels:i.nMels}):null,this.blankId=t.blankId,this.predHidden=640,this.predLayers=2,this.maxTokensPerStep=10;const m=this.predLayers,_=this.predHidden,y=m*1*_,w=new Float32Array(y);this._combState1=new a.Tensor("float32",w,[m,1,_]),this._combState2=new a.Tensor("float32",w.slice(),[m,1,_]),this._normalizer=l,this.subsampling=s,this.windowStride=u,this._nMels=p||128,this._targetIdArray=new Int32Array(1),this._targetTensor=new a.Tensor("int32",this._targetIdArray,[1,1]),this._targetLenArray=new Int32Array([1]),this._targetLenTensor=new a.Tensor("int32",this._targetLenArray,[1]),this._encoderFrameBuffer=null,this._encoderFrameTensor=null,this._incrementalCache=new Map,this.maxIncrementalCacheSize=h,this._warnedMissingDecoderStates=!1,this._warnedMissingDurationLogits=!1}static async fromUrls(t){const{encoderUrl:r,decoderUrl:n,tokenizerUrl:i,preprocessorUrl:a,encoderDataUrl:s,decoderDataUrl:u,filenames:l,backend:d="webgpu-hybrid",wasmPaths:p,subsampling:h=8,windowStride:m=.01,verbose:_=!1,enableProfiling:y=!1,enableGraphCapture:w,cpuThreads:k=void 0,preprocessorBackend:v="js",nMels:b}=t,T=v==="js";if(console.log(`[Parakeet.js] Preprocessor backend requested: '${v}' → ${T?"JS (mel.js)":"ONNX"}`),!r||!n||!i||!a&&!T)throw new Error('fromUrls requires encoderUrl, decoderUrl, tokenizerUrl and preprocessorUrl (preprocessorUrl not needed if preprocessorBackend="js")');let S=d;d.startsWith("webgpu")&&(S="webgpu");const E=await Rh({backend:S,wasmPaths:p,numThreads:k}),A={executionProviders:[],graphOptimizationLevel:"all",executionMode:"parallel",enableCpuMemArena:!0,enableMemPattern:!0,enableProfiling:y,enableGraphCapture:!!w&&d==="webgpu-strict",logSeverityLevel:_?0:2};d==="webgpu-hybrid"?A.executionProviders=[{name:"webgpu",deviceType:"gpu",powerPreference:"high-performance"},"wasm"]:d==="webgpu-strict"?A.executionProviders=[{name:"webgpu",deviceType:"gpu",powerPreference:"high-performance"}]:d==="wasm"&&(A.executionProviders=["wasm"]),console.log(`[Parakeet.js] Creating ONNX sessions with execution mode '${d}'. Providers:`,A.executionProviders),_&&console.log("[Parakeet.js] Verbose logging enabled for ONNX Runtime.");const $={...A};s&&(l!=null&&l.encoder)&&($.externalData=[{data:s,path:l.encoder+".data"}]);const M={...A};u&&(l!=null&&l.decoder)&&(M.externalData=[{data:u,path:l.decoder+".data"}]),d.startsWith("webgpu")&&(M.executionProviders=["wasm"]);async function D(P,Q){try{return await E.InferenceSession.create(P,Q)}catch(K){const le=(K.message||"")+"";if(Q.enableGraphCapture&&le.includes("graph capture")){console.warn("[Parakeet] Graph-capture unsupported for this model/backend; retrying without it");const Ce={...Q,enableGraphCapture:!1};return await E.InferenceSession.create(P,Ce)}throw K}}const q=La.fromUrl(i),G=b||128,V=new Ar({nMels:G});let O=null;!T&&a?(O=new Kg(a,{backend:"wasm",wasmPaths:p,enableProfiling:y,enableGraphCapture:!1,numThreads:k}),console.log(`[Parakeet.js] ONNX preprocessor session created (${G} mel bins)`)):!T&&!a&&console.warn("[Parakeet.js] ONNX preprocessor requested but no URL provided — falling back to JS");const F=T?V:O||V,j=Promise.resolve(F);console.log(`[Parakeet.js] Active preprocessor: ${(F===V?"js":"onnx")==="js"?"JS (mel.js) — no ONNX preprocessor needed":"ONNX (nemo128.onnx)"}, ${G} mel bins`);let ne,L;d==="webgpu-hybrid"?(ne=await D(r,$),L=await D(n,M)):[ne,L]=await Promise.all([D(r,$),D(n,M)]);const[ge,U]=await Promise.all([q,j]);try{const P=new Float32Array(1600);await U.process(P),_&&console.log("[Parakeet.js] Preprocessor warmed up")}catch(P){console.warn("[Parakeet.js] Preprocessor warm-up failed (non-fatal):",P.message)}return new ja({tokenizer:ge,encoderSession:ne,joinerSession:L,preprocessor:U,ort:E,subsampling:h,windowStride:m,onnxPreprocessor:O!==U?O:null,nMels:G})}async _runCombinedStep(t,r,n=null){const i=typeof r=="number"?r:this.blankId;this._targetIdArray[0]=i;const a=(n==null?void 0:n.state1)||this._combState1,s=(n==null?void 0:n.state2)||this._combState2,u={encoder_outputs:t,targets:this._targetTensor,target_length:this._targetLenTensor,input_states_1:a,input_states_2:s},l=await this.joinerSession.run(u),d=l.outputs,p=l.output_states_1,h=l.output_states_2,m=new Set;for(const E of Object.values(l))!E||typeof E.dispose!="function"||m.has(E)||(m.add(E),!(E===d||E===p||E===h)&&E.dispose());const _=this.tokenizer.id2token.length,y=E=>{var $;($=d==null?void 0:d.dispose)==null||$.call(d);const z=new Set,A=M=>{var D;if(M)for(const q of[M.state1,M.state2])!q||q===this._combState1||q===this._combState2||z.has(q)||(z.add(q),(D=q.dispose)==null||D.call(q))};throw A({state1:p,state2:h}),A(n),new Error(E)};(!d||!d.data||typeof d.data.subarray!="function")&&y("ParakeetModel decoder output did not include a valid `outputs` tensor.");const w=d.data;w.length<_&&y(`ParakeetModel decoder output is too small (${w.length}) for vocab size ${_}.`);const k=w.length,v=w.subarray(0,_),b=w.subarray(_,k);(!p||!h)&&!this._warnedMissingDecoderStates&&(this._warnedMissingDecoderStates=!0,console.warn("[Parakeet.js] Decoder output did not include both decoder state tensors; reusing the previous state for compatibility.")),b.length===0&&!this._warnedMissingDurationLogits&&(this._warnedMissingDurationLogits=!0,console.warn("[Parakeet.js] Decoder output did not include TDT duration logits; defaulting duration step to 0 for compatibility."));let T=0;if(b.length){let E=-1/0;for(let z=0;z<b.length;++z)b[z]>E&&(E=b[z],T=z)}return{tokenLogits:v,step:T,newState:{state1:p||a,state2:h||s},_logitsTensor:d}}_snapshotDecoderState(t){if(!t)return null;const r=t.state1,n=t.state2;return{s1:new Float32Array(r.data),s2:new Float32Array(n.data),dims1:r.dims.slice(),dims2:n.dims.slice()}}_restoreDecoderState(t){if(!t)return null;const r=new this.ort.Tensor("float32",new Float32Array(t.s1),t.dims1),n=new this.ort.Tensor("float32",new Float32Array(t.s2),t.dims2);return{state1:r,state2:n}}async computeFeatures(t,r=16e3,n={}){const{prefixSamples:i=0,_skipAudioValidation:a=!1}=n,s=a?t:R0(t,"ParakeetModel.computeFeatures");if(this._incrementalMel&&i>0){const p=this._incrementalMel.process(s,i),h=p.length;return{features:p.features,T:h,melBins:this._nMels,cached:p.cached,cachedFrames:p.cachedFrames,newFrames:p.newFrames}}const{features:u,length:l}=await this.preprocessor.process(s),d=u.length/this._nMels;return{features:u,T:d,melBins:this._nMels,validLength:l}}setPreprocessorBackend(t){if(t==="onnx"){if(!this._onnxPreprocessor)throw new Error("ONNX preprocessor not available. Load model with preprocessorUrl to enable ONNX backend.");this.preprocessor=this._onnxPreprocessor,this._incrementalMel=null,console.log("[Parakeet.js] Switched to ONNX preprocessor")}else if(t==="js")this._jsPreprocessor||(this._jsPreprocessor=new Ar({nMels:128})),this.preprocessor=this._jsPreprocessor,this._incrementalMel=new Lh({nMels:this._jsPreprocessor.nMels}),console.log("[Parakeet.js] Switched to JS preprocessor (incremental caching enabled)");else throw new Error(`Unknown preprocessor backend: ${t}. Use 'js' or 'onnx'.`)}getPreprocessorBackend(){return this.preprocessor instanceof Ar?"js":"onnx"}resetMelCache(){this._incrementalMel&&this._incrementalMel.reset()}clearIncrementalCache(){this._incrementalCache.clear()}_disposeDecoderState(t,r=null){var n,i,a,s;t&&(t.state1&&t.state1!==this._combState1&&t.state1!==(r==null?void 0:r.state1)&&((i=(n=t.state1).dispose)==null||i.call(n)),t.state2&&t.state2!==this._combState2&&t.state2!==(r==null?void 0:r.state2)&&((s=(a=t.state2).dispose)==null||s.call(a)))}getFrameTimeStride(){return this.subsampling*this.windowStride}frameToTime(t,r=0){return r+t*this.getFrameTimeStride()}getStreamingConstants(){return{subsampling:this.subsampling,windowStride:this.windowStride,frameTimeStride:this.getFrameTimeStride(),melBins:this._nMels,blankId:this.blankId,maxTokensPerStep:this.maxTokensPerStep}}async transcribe(t,r=16e3,n={}){var Mr,Rr,Pn,Un;const{returnTimestamps:i=!1,returnConfidences:a=!1,temperature:s=1,debug:u=!1,enableProfiling:l=!0,skipCMVN:d=!1,frameStride:p=1,previousDecoderState:h=null,returnDecoderState:m=!1,timeOffset:_=0,returnTokenIds:y=!1,returnFrameIndices:w=!1,returnLogProbs:k=!1,returnTdtSteps:v=!1,prefixSamples:b=0,precomputedFeatures:T=null,_skipAudioValidation:S=!1}=n,E=N0(_,"ParakeetModel.transcribe"),z=u||l;let A,$=0,M=0,D=0,q=0;z&&(A=performance.now());let G,V,O,F,j,X=T?"mel-worker":this.getPreprocessorBackend();if(T)G=T.features,V=T.T,O=T.melBins,F={},console.log(`[Parakeet] Preprocessor: mel-worker (precomputed ${V} frames × ${O} mel bins, 0 ms)`);else if(z){const ee=performance.now();({features:G,T:V,melBins:O,validLength:j,...F}=await this.computeFeatures(t,r,{prefixSamples:b,_skipAudioValidation:S})),$=performance.now()-ee;const _e=F!=null&&F.cached?` (cached: ${F.cachedFrames} frames, new: ${F.newFrames} frames)`:"";console.log(`[Parakeet] Preprocessor: ${X}, ${V} frames × ${O} mel bins, ${$.toFixed(1)} ms${_e}`)}else({features:G,T:V,melBins:O,validLength:j,...F}=await this.computeFeatures(t,r,{prefixSamples:b,_skipAudioValidation:S}));if(!G||!G.length||V<=0||O<=0)return{utterance_text:"",words:[],tokens:[],confidence_scores:{overall_log_prob:null,frame:null,frame_avg:null},metrics:z?{preprocess_ms:+$.toFixed(1),encode_ms:0,decode_ms:0,tokenize_ms:0,total_ms:+(performance.now()-A).toFixed(1),rtf:0}:null,is_final:!(n!=null&&n.incremental)};const ne=t?t.length/r:V*i0.HOP_LENGTH/r,L=new this.ort.Tensor("float32",G,[1,O,V]),ge=j??V,U=new this.ort.Tensor("int64",BigInt64Array.from([BigInt(ge)]),[1]);let P;try{if(z){const ee=performance.now(),_e=await this.encoderSession.run({audio_signal:L,length:U});M=performance.now()-ee,P=_e.outputs??Object.values(_e)[0]}else{const ee=await this.encoderSession.run({audio_signal:L,length:U});P=ee.outputs??Object.values(ee)[0]}}finally{(Mr=L.dispose)==null||Mr.call(L),(Rr=U.dispose)==null||Rr.call(U)}const[,Q,K]=P.dims;let le;if(P.dims.length===3&&P.dims[0]===1&&P.dims[1]===Q&&P.dims[2]===K){le=new Float32Array(K*Q);const ee=P.data;for(let _e=0;_e<K;_e++){const Ie=_e*Q;let ue=0;for(;ue<=Q-8;ue+=8){const Ae=ue*K+_e;le[Ie+ue]=ee[Ae],le[Ie+ue+1]=ee[Ae+K],le[Ie+ue+2]=ee[Ae+2*K],le[Ie+ue+3]=ee[Ae+3*K],le[Ie+ue+4]=ee[Ae+4*K],le[Ie+ue+5]=ee[Ae+5*K],le[Ie+ue+6]=ee[Ae+6*K],le[Ie+ue+7]=ee[Ae+7*K]}for(;ue<Q;ue++)le[Ie+ue]=ee[ue*K+_e]}}else console.warn("[Parakeet] Unexpected encoder output format:",P.dims),le=new Float32Array(P.data);(Pn=P.dispose)==null||Pn.call(P),(!this._encoderFrameBuffer||this._encoderFrameBuffer.length!==Q)&&(this._encoderFrameBuffer=new Float32Array(Q),this._encoderFrameTensor=new this.ort.Tensor("float32",this._encoderFrameBuffer,[1,Q,1]));const Ce=[],je=[],rt=[],ft=new Map;let Re=0;const Pe=[],nt=[],ve=[],ie=this.subsampling*this.windowStride;let Le=0,Ht=E,Fe=null;h&&(Fe=this._restoreDecoderState(h),u&&console.log("[Parakeet] Restored decoder state from previous chunk"));let Ue=0;const Ne=n.incremental;if(Ne&&Ne.cacheKey){Ue=Math.max(0,Math.min(K,Math.floor(((Ne.prefixSeconds||0)+1e-6)/ie)));const ee=this._incrementalCache.get(Ne.cacheKey);ee&&ee.prefixFrames===Ue&&ee.D===Q&&(Le=Ue,Ht=E+Ue*ie,Fe=this._restoreDecoderState(ee.state),u&&console.log(`[Parakeet] Incremental cache hit: skipping ${Ue}/${K} frames (${(Ue/K*100).toFixed(0)}%)`),this._incrementalCache.delete(Ne.cacheKey),this._incrementalCache.set(Ne.cacheKey,ee))}let br=0;const Mt=z?performance.now():0;let Jr=Le>0||Ue===0;for(let ee=Le;ee<K;){const _e=ee*Q;this._encoderFrameBuffer.set(le.subarray(_e,_e+Q));const Ie=Ce.length?Ce[Ce.length-1]:this.blankId,{tokenLogits:ue,step:Ae,newState:it,_logitsTensor:mt}=await this._runCombinedStep(this._encoderFrameTensor,Ie,Fe);let fe=-1/0,We=0;const vr=ue.length;let se=0;for(;se<vr%8;se++)ue[se]>fe&&(fe=ue[se],We=se);for(;se<vr;se+=8){const Oe=ue[se],Je=ue[se+1],kt=ue[se+2],St=ue[se+3],Zt=ue[se+4],Xt=ue[se+5],Yt=ue[se+6],Jt=ue[se+7];Oe>fe&&(fe=Oe,We=se),Je>fe&&(fe=Je,We=se+1),kt>fe&&(fe=kt,We=se+2),St>fe&&(fe=St,We=se+3),Zt>fe&&(fe=Zt,We=se+4),Xt>fe&&(fe=Xt,We=se+5),Yt>fe&&(fe=Yt,We=se+6),Jt>fe&&(fe=Jt,We=se+7)}let nn=fe;s!==1&&(nn=fe/s);let Qt=1,an=0;if(a||k){const Oe=1/s;let Je=0,kt=0,St=0,Zt=0,Xt=0,Yt=0,Jt=0,sn=0,Ge=0;const Ln=ue.length;for(;Ge<=Ln-8;Ge+=8){const Bt=(ue[Ge]-fe)*Oe,on=(ue[Ge+1]-fe)*Oe,er=(ue[Ge+2]-fe)*Oe,gt=(ue[Ge+3]-fe)*Oe,Fn=(ue[Ge+4]-fe)*Oe,Ya=(ue[Ge+5]-fe)*Oe,Ja=(ue[Ge+6]-fe)*Oe,Wn=(ue[Ge+7]-fe)*Oe;Je+=Math.exp(Bt),kt+=Math.exp(on),St+=Math.exp(er),Zt+=Math.exp(gt),Xt+=Math.exp(Fn),Yt+=Math.exp(Ya),Jt+=Math.exp(Ja),sn+=Math.exp(Wn)}let Qe=Je+kt+St+Zt+Xt+Yt+Jt+sn;for(;Ge<Ln;Ge++)Qe+=Math.exp((ue[Ge]-fe)*Oe);if(Qt=1/Qe,an=fe*Oe-nn-Math.log(Qe),a){const Bt=ft.get(ee);Bt?(Bt.sum+=Qt,Bt.count+=1):ft.set(ee,{sum:Qt,count:1}),Re+=Math.log(Qt)}}if((Un=mt==null?void 0:mt.dispose)==null||Un.call(mt),We!==this.blankId){if(this._disposeDecoderState(Fe,it),Fe=it,Ce.push(We),w&&Pe.push(ee),k&&nt.push(an),v&&ve.push(Ae),i){const Oe=Ae>0?Ae:1,Je=Math.min(K,ee+Math.max(1,Oe)),kt=Ht+ee*ie,St=Ht+Je*ie;je.push([kt,St])}a&&rt.push(Qt),br+=1}else this._disposeDecoderState(it,Fe);if(Ae>0?(ee+=Ae,br=0):(We===this.blankId||br>=this.maxTokensPerStep)&&(ee+=p,br=0),Ne&&Ne.cacheKey&&!Jr&&ee>=Ue){const Oe=this._snapshotDecoderState(Fe);if(!this._incrementalCache.has(Ne.cacheKey)&&this._incrementalCache.size>=this.maxIncrementalCacheSize){const Je=this._incrementalCache.keys().next().value;u&&console.log(`[Parakeet] Incremental cache full (${this.maxIncrementalCacheSize}); evicting oldest entry: ${Je}`),this._incrementalCache.delete(Je)}this._incrementalCache.has(Ne.cacheKey)&&this._incrementalCache.delete(Ne.cacheKey),this._incrementalCache.set(Ne.cacheKey,{state:Oe,prefixFrames:Ue,D:Q}),Jr=!0}}z&&(D=performance.now()-Mt);let en;z&&(en=performance.now());const tn=this._normalizer(this.tokenizer.decode(Ce));if(z&&(q=performance.now()-en),!i&&!a){if(z){const Ie=performance.now()-A,ue=ne/(Ie/1e3);console.log(`[Perf] RTF: ${ue.toFixed(2)}x (audio ${ne.toFixed(2)} s, time ${(Ie/1e3).toFixed(2)} s)`),console.table({Preprocess:`${$.toFixed(1)} ms`,Encode:`${M.toFixed(1)} ms`,Decode:`${D.toFixed(1)} ms`,Tokenize:`${q.toFixed(1)} ms`,Total:`${Ie.toFixed(1)} ms`})}const ee=z?{preprocess_ms:+$.toFixed(1),encode_ms:+M.toFixed(1),decode_ms:+D.toFixed(1),tokenize_ms:+q.toFixed(1),total_ms:+(performance.now()-A).toFixed(1),rtf:+(ne/((performance.now()-A)/1e3)).toFixed(2),preprocessor_backend:X,mel_cache:F!=null&&F.cached?{cached_frames:F.cachedFrames,new_frames:F.newFrames}:null}:null,_e={utterance_text:tn,words:[],metrics:ee,is_final:!h};return m&&(_e.decoderState=this._snapshotDecoderState(Fe)),y&&(_e.tokenIds=Ce.slice()),w&&(_e.frameIndices=Pe.slice()),k&&(_e.logProbs=nt.slice()),v&&(_e.tdtSteps=ve.slice()),this._disposeDecoderState(Fe,h),_e}const $t=[],Ke=[];let jt="",Kt=0,Rt=0,vt=[];if(Ce.forEach((ee,_e)=>{const Ie=this.tokenizer.id2token[ee];if(Ie===this.tokenizer.blankToken)return;const ue=Ie.startsWith("▁"),Ae=ue?Ie.slice(1):Ie,it=je[_e]||[null,null],mt=rt[_e],fe={token:Ae,raw_token:Ie,is_word_start:ue};if(i&&(fe.start_time=+it[0].toFixed(3),fe.end_time=+it[1].toFixed(3)),a&&(fe.confidence=+mt.toFixed(4)),Ke.push(fe),ue){if(jt){const We=vt.length?vt.reduce((vr,se)=>vr+se,0)/vt.length:0;$t.push({text:jt,start_time:+Kt.toFixed(3),end_time:+Rt.toFixed(3),confidence:+We.toFixed(4)})}jt=Ae,i&&(Kt=it[0],Rt=it[1]),vt=a?[mt]:[]}else jt+=Ae,i&&(Rt=it[1]),a&&vt.push(mt)}),jt){const ee=vt.length?vt.reduce((_e,Ie)=>_e+Ie,0)/vt.length:0;$t.push({text:jt,start_time:+Kt.toFixed(3),end_time:+Rt.toFixed(3),confidence:+ee.toFixed(4)})}const xt=$t.length&&a?$t.reduce((ee,_e)=>ee+_e.confidence,0)/$t.length:null,rn=Ke.length&&a?Ke.reduce((ee,_e)=>ee+(_e.confidence||0),0)/Ke.length:null;if(z){const ee=performance.now()-A,_e=ne/(ee/1e3);console.log(`[Perf] RTF: ${_e.toFixed(2)}x (audio ${ne.toFixed(2)} s, time ${(ee/1e3).toFixed(2)} s)`),console.table({Preprocess:`${$.toFixed(1)} ms`,Encode:`${M.toFixed(1)} ms`,Decode:`${D.toFixed(1)} ms`,Tokenize:`${q.toFixed(1)} ms`,Total:`${ee.toFixed(1)} ms`})}const $r=Array.from(ft.entries()).sort((ee,_e)=>ee[0]-_e[0]).map(([,ee])=>ee.sum/ee.count),Nt={utterance_text:tn,words:$t,tokens:Ke,confidence_scores:a?{token:rt.map(ee=>+ee.toFixed(4)),token_avg:+(rn==null?void 0:rn.toFixed(4)),word:$t.map(ee=>ee.confidence),word_avg:+(xt==null?void 0:xt.toFixed(4)),frame:$r.map(ee=>+ee.toFixed(4)),frame_avg:$r.length?+($r.reduce((ee,_e)=>ee+_e,0)/$r.length).toFixed(4):null,overall_log_prob:+Re.toFixed(6)}:{overall_log_prob:null,frame:null,frame_avg:null},metrics:z?{preprocess_ms:+$.toFixed(1),encode_ms:+M.toFixed(1),decode_ms:+D.toFixed(1),tokenize_ms:+q.toFixed(1),total_ms:+(performance.now()-A).toFixed(1),rtf:+(ne/((performance.now()-A)/1e3)).toFixed(2),preprocessor_backend:X,mel_cache:F!=null&&F.cached?{cached_frames:F.cachedFrames,new_frames:F.newFrames}:null}:null,is_final:!Ne&&!h};return m&&(Nt.decoderState=this._snapshotDecoderState(Fe)),y&&(Nt.tokenIds=Ce.slice()),w&&(Nt.frameIndices=Pe.slice()),k&&(Nt.logProbs=nt.map(ee=>+ee.toFixed(6))),v&&(Nt.tdtSteps=ve.slice()),this._disposeDecoderState(Fe,h),Nt}createStreamingTranscriber(t={}){return new B0(this,t)}async transcribeLongAudio(t,r=16e3,n={}){return M0(this,t,r,n)}endProfiling(){var i,a,s,u,l,d;try{(i=this.encoderSession)==null||i.endProfiling()}catch{}try{(a=this.joinerSession)==null||a.endProfiling()}catch{}const t=(l=(u=(s=this.ort)==null?void 0:s.env)==null?void 0:u.wasm)==null?void 0:l.FS;if(!t)return console.warn("[Parakeet] Profiling FS not accessible"),null;const r=t.readdir("/tmp").filter(p=>p.startsWith("profile_")&&p.endsWith(".json"));if(!r.length)return console.warn("[Parakeet] No profiling files found. Was profiling enabled?"),null;const n={};for(const p of r)try{const h=t.readFile("/tmp/"+p,{encoding:"utf8"}),m=JSON.parse(h);let _=0,y=0;for(const w of m)if(w.cat==="Node"){const k=(d=w.args)==null?void 0:d.provider;k==="webgpu"?_+=w.dur:k&&(y+=w.dur)}n[p]={gpu_us:_,cpu_us:y,total_us:_+y}}catch(h){console.warn("[Parakeet] Failed to parse profile file",p,h)}return console.table(n),n}}class B0{constructor(t,r={}){this.model=t,this.opts={returnTimestamps:r.returnTimestamps??!0,returnConfidences:r.returnConfidences??!1,returnTokenIds:r.returnTokenIds??!1,sampleRate:r.sampleRate??16e3,debug:r.debug??!1},this._decoderState=null,this._currentOffset=0,this._totalWords=[],this._totalTokenIds=[],this._chunkCount=0,this._isFinalized=!1,this._metrics={preprocess_ms:0,encode_ms:0,decode_ms:0,tokenize_ms:0,total_ms:0,cached_frames:0,new_frames:0},this._hasMetrics=!1,this._hasMelCacheMetrics=!1}_accumulateMetrics(t){if(!(!t||typeof t!="object")){this._hasMetrics=!0;for(const r of["preprocess_ms","encode_ms","decode_ms","tokenize_ms","total_ms"])typeof t[r]=="number"&&Number.isFinite(t[r])&&(this._metrics[r]+=t[r]);t.mel_cache&&typeof t.mel_cache=="object"&&(this._hasMelCacheMetrics=!0,typeof t.mel_cache.cached_frames=="number"&&Number.isFinite(t.mel_cache.cached_frames)&&(this._metrics.cached_frames+=t.mel_cache.cached_frames),typeof t.mel_cache.new_frames=="number"&&Number.isFinite(t.mel_cache.new_frames)&&(this._metrics.new_frames+=t.mel_cache.new_frames))}}_getCumulativeMetrics(){if(!this._hasMetrics)return null;const t=this._metrics.total_ms>0?this._metrics.total_ms:this._metrics.preprocess_ms+this._metrics.encode_ms+this._metrics.decode_ms+this._metrics.tokenize_ms,r={preprocess_ms:this._metrics.preprocess_ms,encode_ms:this._metrics.encode_ms,decode_ms:this._metrics.decode_ms,tokenize_ms:this._metrics.tokenize_ms,total_ms:t,rtf:t>0?this._currentOffset/(t/1e3):0};return this._hasMelCacheMetrics&&(r.mel_cache={cached_frames:this._metrics.cached_frames,new_frames:this._metrics.new_frames}),r}async processChunk(t){var i;if(this._isFinalized)throw new Error("Streamer is finalized. Create a new instance to process more audio.");const r=t.length/this.opts.sampleRate,n=await this.model.transcribe(t,this.opts.sampleRate,{returnTimestamps:this.opts.returnTimestamps,returnConfidences:this.opts.returnConfidences,returnTokenIds:this.opts.returnTokenIds,previousDecoderState:this._decoderState,returnDecoderState:!0,timeOffset:this._currentOffset});return this._decoderState=n.decoderState,this._currentOffset+=r,this._chunkCount++,this._accumulateMetrics(n.metrics),n.words&&n.words.length>0&&this._totalWords.push(...n.words),this.opts.returnTokenIds&&n.tokenIds&&this._totalTokenIds.push(...n.tokenIds),this.opts.debug&&console.log(`[Streamer] Chunk ${this._chunkCount}: "${n.utterance_text}" (${((i=n.words)==null?void 0:i.length)||0} words, offset: ${this._currentOffset.toFixed(2)}s)`),{chunkText:n.utterance_text,chunkWords:n.words||[],text:this._totalWords.map(a=>a.text).join(" "),words:this._totalWords.slice(),totalDuration:this._currentOffset,chunkCount:this._chunkCount,is_final:!1,...this.opts.returnTokenIds?{tokenIds:this._totalTokenIds.slice()}:{},...this.opts.returnConfidences&&n.confidence_scores?{confidence_scores:n.confidence_scores}:{},metrics:this._getCumulativeMetrics()}}finalize(){return this._isFinalized=!0,{text:this._totalWords.map(t=>t.text).join(" "),words:this._totalWords.slice(),totalDuration:this._currentOffset,chunkCount:this._chunkCount,is_final:!0,...this.opts.returnTokenIds?{tokenIds:this._totalTokenIds.slice()}:{},metrics:this._getCumulativeMetrics()}}reset(){this._decoderState=null,this._currentOffset=0,this._totalWords=[],this._totalTokenIds=[],this._chunkCount=0,this._isFinalized=!1,this._metrics={preprocess_ms:0,encode_ms:0,decode_ms:0,tokenize_ms:0,total_ms:0,cached_frames:0,new_frames:0},this._hasMetrics=!1,this._hasMelCacheMetrics=!1}getState(){return{hasDecoderState:this._decoderState!==null,currentOffset:this._currentOffset,wordCount:this._totalWords.length,chunkCount:this._chunkCount,isFinalized:this._isFinalized}}}const Bn={"parakeet-tdt-0.6b-v2":{repoId:"ysdede/parakeet-tdt-0.6b-v2-onnx",displayName:"Parakeet TDT 0.6B v2 (English)",languages:["en"],defaultLanguage:"en",vocabSize:1025,featuresSize:128,preprocessor:"nemo128",subsampling:8,predHidden:640,predLayers:2},"parakeet-tdt-0.6b-v3":{repoId:"ysdede/parakeet-tdt-0.6b-v3-onnx",displayName:"Parakeet TDT 0.6B v3 (Multilingual)",languages:["en","fr","de","es","it","pt","nl","pl","ru","uk","ja","ko","zh"],defaultLanguage:"en",vocabSize:4097,featuresSize:128,preprocessor:"nemo128",subsampling:8,predHidden:640,predLayers:2}};function D0(e){if(Bn[e])return Bn[e];for(const[t,r]of Object.entries(Bn))if(r.repoId===e)return r;return null}const P0="parakeet-cache-db",Or="file-store";let Ka=null;const Dn=new Map,Xh={int8:".int8.onnx",fp16:".fp16.onnx",fp32:".onnx"};function Qa(e,t){const r=Xh[t];if(!r)throw new Error(`[Hub] Unknown quantization '${t}'; expected one of: ${Object.keys(Xh).join(", ")}`);return`${e}${r}`}function Yh(e){return String(e||"").split("/").map(t=>encodeURIComponent(t)).join("/")}function Za(e){return typeof e!="string"?"":e.replace(/^\.\//,"").replace(/\\/g,"/")}function Jh(e){return Array.isArray(e)?e.filter(t=>(t==null?void 0:t.type)==="file"&&typeof(t==null?void 0:t.path)=="string").map(t=>Za(t.path)):e&&typeof e=="object"&&Array.isArray(e.siblings)?e.siblings.map(t=>Za(t==null?void 0:t.rfilename)).filter(Boolean):[]}function Xa(e,t){if(!e)return!1;const r=Za(t);return e.some(n=>n===r||n.endsWith(`/${r}`))}async function U0(e,t="main"){const r=`${e}@${t}`;if(Dn.has(r))return Dn.get(r);const n=Yh(e),i=encodeURIComponent(t),a=`https://huggingface.co/api/models/${n}/tree/${i}?recursive=1`,s=`https://huggingface.co/api/models/${n}?revision=${i}`;try{const u=await fetch(a);if(!u.ok)throw new Error(`Failed to list repo files from tree API: ${u.status}`);const l=Jh(await u.json());return Dn.set(r,l),l}catch(u){console.warn("[Hub] Could not fetch repo tree listing; trying model metadata listing",u)}try{const u=await fetch(s);if(!u.ok)throw new Error(`Failed to list repo files from metadata API: ${u.status}`);const l=Jh(await u.json());return Dn.set(r,l),l}catch(u){return console.warn("[Hub] Could not fetch repo file list – falling back to optimistic fetch",u),null}}function ef(){return Ka||(Ka=new Promise((e,t)=>{const r=indexedDB.open(P0,1);r.onerror=()=>t("Error opening IndexedDB"),r.onsuccess=()=>e(r.result),r.onupgradeneeded=n=>{const i=n.target.result;i.objectStoreNames.contains(Or)||i.createObjectStore(Or)}})),Ka}async function L0(e){const t=await ef();return new Promise((r,n)=>{const s=t.transaction([Or],"readonly").objectStore(Or).get(e);s.onerror=()=>n("Error reading from DB"),s.onsuccess=()=>r(s.result)})}async function F0(e,t){const r=await ef();return new Promise((n,i)=>{const u=r.transaction([Or],"readwrite").objectStore(Or).put(t,e);u.onerror=()=>i("Error writing to DB"),u.onsuccess=()=>n(u.result)})}async function tf(e,t,r={}){const{revision:n="main",subfolder:i="",progress:a}=r,s=encodeURIComponent(n),u=i?i.split("/").map(S=>encodeURIComponent(S)).join("/"):"",l=t.split("/").map(S=>encodeURIComponent(S)).join("/"),d="https://huggingface.co",p=[Yh(e),"resolve",s];u&&p.push(u),p.push(l);const h=`${d}/${p.join("/")}`,m=`hf-${e}-${n}-${i}-${t}`;if(typeof indexedDB<"u")try{const S=await L0(m);if(S)return console.log(`[Hub] Using cached ${t} from IndexedDB`),URL.createObjectURL(S)}catch(S){console.warn("[Hub] IndexedDB cache check failed:",S)}console.log(`[Hub] Downloading ${t} from ${e}...`);const _=await fetch(h);if(!_.ok)throw new Error(`Failed to download ${t}: ${_.status} ${_.statusText}`);const y=_.headers.get("content-length"),w=y?parseInt(y,10):0;let k=0;const v=_.body.getReader(),b=[];for(;;){const{done:S,value:E}=await v.read();if(S)break;b.push(E),k+=E.length,a&&w>0&&a({loaded:k,total:w,file:t})}const T=new Blob(b,{type:_.headers.get("content-type")||"application/octet-stream"});if(typeof indexedDB<"u")try{await F0(m,T),console.log(`[Hub] Cached ${t} in IndexedDB`)}catch(S){console.warn("[Hub] Failed to cache in IndexedDB:",S)}return URL.createObjectURL(T)}function rf(e,t){const r=e==="encoder"?"encoder-model":"decoder_joint-model";return{name:e,key:e==="encoder"?"encoderUrl":"decoderUrl",baseName:r,quant:t,filename:Qa(r,t)}}function nf(e,t,r){if(e.quant!=="fp16"||r===null)return;const n=Qa(e.baseName,"fp16"),i=Qa(e.baseName,"fp32");if(!Xa(r,n))throw Xa(r,i)?new Error(`[Hub] ${e.name} FP16 file is missing in ${t} (found ${i} instead). Requested quantization is strict; choose encoderQuant/decoderQuant='fp32' explicitly.`):new Error(`[Hub] Missing ${e.name} model in ${t}: requested ${n}.`)}function W0(e,t,r,n=!1){const i=[{key:e.encoder.key,name:e.encoder.filename,componentName:"encoder",optional:!1},{key:e.decoder.key,name:e.decoder.filename,componentName:"decoder",optional:!1},{key:"tokenizerUrl",name:"vocab.txt",optional:!1}];return t!=="js"?(i.push({key:"preprocessorUrl",name:`${r}.onnx`,optional:!1}),n&&console.log(`[Hub] Preprocessor: ONNX — will download ${r}.onnx`)):n&&console.log(`[Hub] Preprocessor: JS (mel.js) — skipping ${r}.onnx download`),i}function q0(e,t){const r=[{key:"encoderDataUrl",name:`${e.encoder.filename}.data`,optional:!0},{key:"decoderDataUrl",name:`${e.decoder.filename}.data`,optional:!0}];return t===null?[]:r.filter(n=>Xa(t,n.name))}async function G0(e,t={}){const r=D0(e),n=(r==null?void 0:r.repoId)||e,i=(r==null?void 0:r.preprocessor)||"nemo128",{encoderQuant:a="int8",decoderQuant:s="int8",preprocessor:u=i,preprocessorBackend:l="js",backend:d="webgpu",progress:p,verbose:h=!1}=t;let m=a;d.startsWith("webgpu")&&m==="int8"&&(console.warn("[Hub] Forcing encoder to fp32 on WebGPU (int8 unsupported)"),m="fp32");const _={encoder:rf("encoder",m),decoder:rf("decoder",s)},y=await U0(n,t.revision||"main");nf(_.encoder,n,y),nf(_.decoder,n,y);const w=W0(_,l,u,h),k={urls:{},filenames:{encoder:_.encoder.filename,decoder:_.decoder.filename},quantisation:{encoder:_.encoder.quant,decoder:_.decoder.quant},modelConfig:r||null,preprocessorBackend:l};for(const b of w)try{k.urls[b.key]=await tf(n,b.name,{...t,progress:p})}catch(T){if(!b.componentName)throw T;const S=_[b.componentName];throw S.quant==="fp16"?new Error(`[Hub] ${S.name} FP16 download failed (${b.name}). Requested quantization is strict; choose encoderQuant/decoderQuant='fp32' explicitly. Original error: ${T.message||T}`):T}const v=q0(_,y);for(const b of v)try{k.urls[b.key]=await tf(n,b.name,{...t,progress:p})}catch{console.warn(`[Hub] Optional external data file not found: ${b.name}. This is expected if the model is small.`),k.urls[b.key]=null}return k}function V0(e){return(e==null?void 0:e.encoderQuant)==="fp16"||(e==null?void 0:e.decoderQuant)==="fp16"}function H0(e){const r=String((e==null?void 0:e.backend)||"").startsWith("webgpu"),n=(e==null?void 0:e.decoderQuant)==="fp16";return r&&n?"Decoder runs on WASM in WebGPU modes; try decoderQuant: 'int8' or 'fp32'.":"Try encoderQuant/decoderQuant: 'fp32' (or 'int8' where supported)."}async function j0(e,t={}){var a;const r=((a=Bn[e])==null?void 0:a.repoId)||e,n=await G0(r,t),i={...n.urls,filenames:n.filenames,preprocessorBackend:n.preprocessorBackend,...t};try{return await ja.fromUrls(i)}catch(s){if(!V0(t))throw s;const u=H0(t),l=(s==null?void 0:s.message)||String(s);throw console.warn(`[fromHub] FP16 compile/session load failed. ${u}`,s),new Error(`[fromHub] FP16 compile/session load failed. ${u} Original error: ${l}`,{cause:s})}}const K0="parakeet-tdt-0.6b-v2",Q0={backend:"wasm",encoderQuant:"int8",decoderQuant:"int8",cpuThreads:1};class Z0{constructor(t){ys(this,"promise",null);this.load=t}getInstance(t){return this.promise||(this.promise=this.load(t).catch(r=>{throw this.promise=null,r})),this.promise}}const X0=10*60*1e3;async function Y0(e,{getInstance:t,post:r},n=X0){let i;const a=new Promise((s,u)=>{i=setTimeout(()=>{u(new Error(`Timed out after ${Math.round(n/6e4)} minutes. This usually means the worker stalled (e.g. a multi-threading initialization problem) rather than that transcription is just slow — try reloading the extension.`))},n)});try{const s=await Promise.race([t(l=>{l.total>0&&r({type:"progress",file:l.file,loaded:l.loaded,total:l.total,progress:l.loaded/l.total*100})}),a]);if(e.type==="load-model"){r({type:"model-ready"});return}const u=await Promise.race([s.transcribeLongAudio(e.audio,16e3,{returnTimestamps:!0}),a]);r({type:"complete",text:u.text})}catch(s){r({type:"error",message:s instanceof Error?s.message:String(s)})}finally{i!==void 0&&clearTimeout(i)}}ke.wasm.wasmPaths={wasm:new URL("../ort/ort-wasm-simd-threaded.jsep.wasm",self.location.href).href},console.log("[Verbatim diag] crossOriginIsolated:",self.crossOriginIsolated,"| SharedArrayBuffer available:",typeof SharedArrayBuffer<"u","| hardwareConcurrency:",navigator.hardwareConcurrency);const J0=new Z0(e=>j0(K0,{...Q0,progress:e}));function e_(e){self.postMessage(e)}self.onmessage=e=>{Y0(e.data,{getInstance:t=>J0.getInstance(t),post:e_})}})();
