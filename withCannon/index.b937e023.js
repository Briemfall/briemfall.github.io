/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */let e,t,i,n,r,a,s,o;const l={ROTATE:0,DOLLY:1,PAN:2},h={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},c="srgb",u="srgb-linear",d="display-p3",p="300 es";/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */class f{addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let i=this._listeners;void 0===i[e]&&(i[e]=[]),-1===i[e].indexOf(t)&&i[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let i=this._listeners;return void 0!==i[e]&&-1!==i[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let i=this._listeners,n=i[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners,i=t[e.type];if(void 0!==i){e.target=this;// Make a copy, in case listeners are removed while iterating.
let t=i.slice(0);for(let i=0,n=t.length;i<n;i++)t[i].call(this,e);e.target=null}}}const m=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],g=Math.PI/180,v=180/Math.PI;// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function y(){let e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,i=4294967295*Math.random()|0,n=4294967295*Math.random()|0,r=m[255&e]+m[e>>8&255]+m[e>>16&255]+m[e>>24&255]+"-"+m[255&t]+m[t>>8&255]+"-"+m[t>>16&15|64]+m[t>>24&255]+"-"+m[63&i|128]+m[i>>8&255]+"-"+m[i>>16&255]+m[i>>24&255]+m[255&n]+m[n>>8&255]+m[n>>16&255]+m[n>>24&255];// .toLowerCase() here flattens concatenated strings to save heap memory space.
return r.toLowerCase()}function x(e,t,i){return Math.max(t,Math.min(i,e))}function _(e){return(e&e-1)==0&&0!==e}function w(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function b(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("Invalid component type.")}}function M(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(4294967295*e);case Uint16Array:return Math.round(65535*e);case Uint8Array:return Math.round(255*e);case Int32Array:return Math.round(2147483647*e);case Int16Array:return Math.round(32767*e);case Int8Array:return Math.round(127*e);default:throw Error("Invalid component type.")}}class S{constructor(e=0,t=0){S.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return(// assumes min < max, componentwise
this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this)}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){// computes the angle in radians with respect to the positive x-axis
let e=Math.atan2(-this.y,-this.x)+Math.PI;return e}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(0===t)return Math.PI/2;let i=this.dot(e)/t;// clamp, to handle numerical problems
return Math.acos(x(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class E{constructor(e,t,i,n,r,a,s,o,l){E.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],void 0!==e&&this.set(e,t,i,n,r,a,s,o,l)}set(e,t,i,n,r,a,s,o,l){let h=this.elements;return h[0]=e,h[1]=n,h[2]=s,h[3]=t,h[4]=r,h[5]=o,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],s=i[3],o=i[6],l=i[1],h=i[4],c=i[7],u=i[2],d=i[5],p=i[8],f=n[0],m=n[3],g=n[6],v=n[1],y=n[4],x=n[7],_=n[2],w=n[5],b=n[8];return r[0]=a*f+s*v+o*_,r[3]=a*m+s*y+o*w,r[6]=a*g+s*x+o*b,r[1]=l*f+h*v+c*_,r[4]=l*m+h*y+c*w,r[7]=l*g+h*x+c*b,r[2]=u*f+d*v+p*_,r[5]=u*m+d*y+p*w,r[8]=u*g+d*x+p*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],s=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*s*l-i*r*h+i*s*o+n*r*l-n*a*o}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],s=e[5],o=e[6],l=e[7],h=e[8],c=h*a-s*l,u=s*o-h*r,d=l*r-a*o,p=t*c+i*u+n*d;if(0===p)return this.set(0,0,0,0,0,0,0,0,0);let f=1/p;return e[0]=c*f,e[1]=(n*l-h*i)*f,e[2]=(s*i-n*a)*f,e[3]=u*f,e[4]=(h*t-n*o)*f,e[5]=(n*r-s*t)*f,e[6]=d*f,e[7]=(i*o-l*t)*f,e[8]=(a*t-i*r)*f,this}transpose(){let e;let t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,s){let o=Math.cos(r),l=Math.sin(r);return this.set(i*o,i*l,-i*(o*a+l*s)+a+e,-n*l,n*o,-n*(-l*a+o*s)+s+t,0,0,1),this}//
scale(e,t){return this.premultiply(T.makeScale(e,t)),this}rotate(e){return this.premultiply(T.makeRotation(-e)),this}translate(e,t){return this.premultiply(T.makeTranslation(e,t)),this}// for 2D Transforms
makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){// counterclockwise
let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}//
equals(e){let t=this.elements,i=e.elements;for(let e=0;e<9;e++)if(t[e]!==i[e])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const T=/*@__PURE__*/new E;function A(e){// assumes larger values usually on last
for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;// account for PRIMITIVE_RESTART_FIXED_INDEX, #24565
return!1}function R(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array;const C={};function P(e){e in C||(C[e]=!0,console.warn(e))}function L(e){return e<.04045?.0773993808*e:Math.pow(.9478672986*e+.0521327014,2.4)}function N(e){return e<.0031308?12.92*e:1.055*Math.pow(e,.41666)-.055}/**
 * Matrices converting P3 <-> Rec. 709 primaries, without gamut mapping
 * or clipping. Based on W3C specifications for sRGB and Display P3,
 * and ICC specifications for the D50 connection space. Values in/out
 * are _linear_ sRGB and _linear_ Display P3.
 *
 * Note that both sRGB and Display P3 use the sRGB transfer functions.
 *
 * Reference:
 * - http://www.russellcottrell.com/photo/matrixCalculator.htm
 */const I=/*@__PURE__*/new E().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-.0000001,1e-7,.9105199]),U=/*@__PURE__*/new E().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),D={[u]:e=>e,[c]:e=>e.convertSRGBToLinear(),[d]:function(e){// Display P3 uses the sRGB transfer functions
return e.convertSRGBToLinear().applyMatrix3(U)}},O={[u]:e=>e,[c]:e=>e.convertLinearToSRGB(),[d]:function(e){// Display P3 uses the sRGB transfer functions
return e.applyMatrix3(I).convertLinearToSRGB()}},z={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(legacyMode){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!legacyMode},get workingColorSpace(){return u},set workingColorSpace(colorSpace){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(e,t,i){if(!1===this.enabled||t===i||!t||!i)return e;let n=D[t],r=O[i];if(void 0===n||void 0===r)throw Error(`Unsupported color space conversion, "${t}" to "${i}".`);return r(n(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)}};class B{static getDataURL(t){let i;if(/^data:/i.test(t.src)||"undefined"==typeof HTMLCanvasElement)return t.src;if(t instanceof HTMLCanvasElement)i=t;else{void 0===e&&(e=R("canvas")),e.width=t.width,e.height=t.height;let n=e.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=e}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(e){if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap){let t=R("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let e=0;e<r.length;e++)r[e]=255*L(r[e]/255);return i.putImageData(n,0,0),t}if(!e.data)return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e;{let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(255*L(t[e]/255)):t[e]=L(t[e]);return{data:t,width:e.width,height:e.height}}}}let F=0;class V{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:F++}),this.uuid=y(),this.data=e,this.version=0}set needsUpdate(e){!0===e&&this.version++}toJSON(e){let t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.images[this.uuid])return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(null!==n){let e;if(Array.isArray(n)){// cube texture
e=[];for(let t=0,i=n.length;t<i;t++)n[t].isDataTexture?e.push(H(n[t].image)):e.push(H(n[t]))}else e=H(n);i.url=e}return t||(e.images[this.uuid]=i),i}}function H(e){return"undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap?B.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let W=0;class k extends f{constructor(e=k.DEFAULT_IMAGE,t=k.DEFAULT_MAPPING,i=1001,n=1001,r=1006,a=1008,s=1023,o=1009,l=k.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:W++}),this.uuid=y(),this.name="",this.source=new V(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=o,this.offset=new S(0,0),this.repeat=new S(1,1),this.center=new S(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new E,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,"string"==typeof h?this.colorSpace=h:(P("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=3001===h?c:""),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.textures[this.uuid])return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(300!==this.mapping)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:1===Math.abs(Math.floor(e.x)%2)?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:1===Math.abs(Math.floor(e.y)%2)?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){!0===e&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return P("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===c?3001:3e3}set encoding(e){P("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=3001===e?c:""}}k.DEFAULT_IMAGE=null,k.DEFAULT_MAPPING=300,k.DEFAULT_ANISOTROPY=1;class G{constructor(e=0,t=0,i=0,n=1){G.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=void 0!==e.w?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
// q is assumed to be normalized
this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n;let r=e.elements,a=r[0],s=r[4],o=r[8],l=r[1],h=r[5],c=r[9],u=r[2],d=r[6],p=r[10];if(.01>Math.abs(s-l)&&.01>Math.abs(o-u)&&.01>Math.abs(c-d)){// singularity found
// first check for identity matrix which must have +1 for all terms
// in leading diagonal and zero in other terms
if(.1>Math.abs(s+l)&&.1>Math.abs(o+u)&&.1>Math.abs(c+d)&&.1>Math.abs(a+h+p-3))return(// this singularity is identity matrix so angle = 0
this.set(1,0,0,0),this);// zero angle, arbitrary axis
let e=(a+1)/2,r=(h+1)/2,f=(p+1)/2,m=(s+l)/4,g=(o+u)/4,v=(c+d)/4;return e>r&&e>f?e<.01?(t=0,i=.707106781,n=.707106781):(i=m/(t=Math.sqrt(e)),n=g/t):r>f?r<.01?(t=.707106781,i=0,n=.707106781):(t=m/(i=Math.sqrt(r)),n=v/i):f<.01?(t=.707106781,i=.707106781,n=0):(t=g/(n=Math.sqrt(f)),i=v/n),this.set(t,i,n,Math.PI),this;// return 180 deg rotation
}// as we have reached here there are no singularities so we can handle normally
let f=Math.sqrt((d-c)*(d-c)+(o-u)*(o-u)+(l-s)*(l-s));// used to normalize
return .001>Math.abs(f)&&(f=1),// prevent divide by zero, should not happen if matrix is orthogonal and should be
// caught by singularity test above, but I've left it in just in case
this.x=(d-c)/f,this.y=(o-u)/f,this.z=(l-s)/f,this.w=Math.acos((a+h+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return(// assumes min < max, componentwise
this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this)}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}/*
 In options, we can specify:
 * Texture parameters for an auto-generated target texture
 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
*/class q extends f{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new G(0,0,e,t),this.scissorTest=!1,this.viewport=new G(0,0,e,t),void 0!==i.encoding&&(// @deprecated, r152
P("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=3001===i.encoding?c:""),this.texture=new k({width:e,height:t,depth:1},i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=void 0!==i.generateMipmaps&&i.generateMipmaps,this.texture.internalFormat=void 0!==i.internalFormat?i.internalFormat:null,this.texture.minFilter=void 0!==i.minFilter?i.minFilter:1006,this.depthBuffer=void 0===i.depthBuffer||i.depthBuffer,this.stencilBuffer=void 0!==i.stencilBuffer&&i.stencilBuffer,this.depthTexture=void 0!==i.depthTexture?i.depthTexture:null,this.samples=void 0!==i.samples?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;// ensure image object is not shared, see #20328
let t=Object.assign({},e.texture.image);return this.texture.source=new V(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,null!==e.depthTexture&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class j extends q{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class X extends k{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Y{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,s){// fuzz-free, array-based Quaternion SLERP operation
let o=i[n+0],l=i[n+1],h=i[n+2],c=i[n+3],u=r[a+0],d=r[a+1],p=r[a+2],f=r[a+3];if(0===s){e[t+0]=o,e[t+1]=l,e[t+2]=h,e[t+3]=c;return}if(1===s){e[t+0]=u,e[t+1]=d,e[t+2]=p,e[t+3]=f;return}if(c!==f||o!==u||l!==d||h!==p){let e=1-s,t=o*u+l*d+h*p+c*f,i=t>=0?1:-1,n=1-t*t;// Skip the Slerp for tiny steps to avoid numeric problems:
if(n>Number.EPSILON){let r=Math.sqrt(n),a=Math.atan2(r,t*i);e=Math.sin(e*a)/r,s=Math.sin(s*a)/r}let r=s*i;// Normalize in case we just did a lerp:
if(o=o*e+u*r,l=l*e+d*r,h=h*e+p*r,c=c*e+f*r,e===1-s){let e=1/Math.sqrt(o*o+l*l+h*h+c*c);o*=e,l*=e,h*=e,c*=e}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=c}static multiplyQuaternionsFlat(e,t,i,n,r,a){let s=i[n],o=i[n+1],l=i[n+2],h=i[n+3],c=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=s*p+h*c+o*d-l*u,e[t+1]=o*p+h*u+l*c-s*d,e[t+2]=l*p+h*d+s*u-o*c,e[t+3]=h*p-s*c-o*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){let i=e._x,n=e._y,r=e._z,a=e._order,s=Math.cos,o=Math.sin,l=s(i/2),h=s(n/2),c=s(r/2),u=o(i/2),d=o(n/2),p=o(r/2);switch(a){case"XYZ":this._x=u*h*c+l*d*p,this._y=l*d*c-u*h*p,this._z=l*h*p+u*d*c,this._w=l*h*c-u*d*p;break;case"YXZ":this._x=u*h*c+l*d*p,this._y=l*d*c-u*h*p,this._z=l*h*p-u*d*c,this._w=l*h*c+u*d*p;break;case"ZXY":this._x=u*h*c-l*d*p,this._y=l*d*c+u*h*p,this._z=l*h*p+u*d*c,this._w=l*h*c-u*d*p;break;case"ZYX":this._x=u*h*c-l*d*p,this._y=l*d*c+u*h*p,this._z=l*h*p-u*d*c,this._w=l*h*c+u*d*p;break;case"YZX":this._x=u*h*c+l*d*p,this._y=l*d*c+u*h*p,this._z=l*h*p-u*d*c,this._w=l*h*c-u*d*p;break;case"XZY":this._x=u*h*c-l*d*p,this._y=l*d*c-u*h*p,this._z=l*h*p+u*d*c,this._w=l*h*c+u*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return!1!==t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
// assumes axis is normalized
let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
let t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],s=t[5],o=t[9],l=t[2],h=t[6],c=t[10],u=i+s+c;if(u>0){let e=.5/Math.sqrt(u+1);this._w=.25/e,this._x=(h-o)*e,this._y=(r-l)*e,this._z=(a-n)*e}else if(i>s&&i>c){let e=2*Math.sqrt(1+i-s-c);this._w=(h-o)/e,this._x=.25*e,this._y=(n+a)/e,this._z=(r+l)/e}else if(s>c){let e=2*Math.sqrt(1+s-i-c);this._w=(r-l)/e,this._x=(n+a)/e,this._y=.25*e,this._z=(o+h)/e}else{let e=2*Math.sqrt(1+c-i-s);this._w=(a-n)/e,this._x=(r+l)/e,this._y=(o+h)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){// assumes direction vectors vFrom and vTo are normalized
let i=e.dot(t)+1;return i<Number.EPSILON?(// vFrom and vTo point in opposite directions
i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0):(this._x=0,this._y=-e.z,this._z=e.y)):(// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x),this._w=i,this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(x(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);return 0===i||this.slerp(e,Math.min(1,t/i)),this}identity(){return this.set(0,0,0,1)}invert(){// quaternion is assumed to have unit length
return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return 0===e?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
let i=e._x,n=e._y,r=e._z,a=e._w,s=t._x,o=t._y,l=t._z,h=t._w;return this._x=i*h+a*s+n*l-r*o,this._y=n*h+a*o+r*s-i*l,this._z=r*h+a*l+i*o-n*s,this._w=a*h-i*s-n*o-r*l,this._onChangeCallback(),this}slerp(e,t){if(0===t)return this;if(1===t)return this.copy(e);let i=this._x,n=this._y,r=this._z,a=this._w,s=a*e._w+i*e._x+n*e._y+r*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;let o=1-s*s;if(o<=Number.EPSILON){let e=1-t;return this._w=e*a+t*this._w,this._x=e*i+t*this._x,this._y=e*n+t*this._y,this._z=e*r+t*this._z,this.normalize(),this._onChangeCallback(),this}let l=Math.sqrt(o),h=Math.atan2(l,s),c=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=a*c+this._w*u,this._x=i*c+this._x*u,this._y=n*c+this._y*u,this._z=r*c+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){// Derived from http://planning.cs.uiuc.edu/node198.html
// Note, this source uses w, x, y, z ordering,
// so we swap the order below.
let e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,i=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return void 0===i&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(J.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(J.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,s=e.z,o=e.w,l=o*t+a*n-s*i,h=o*i+s*t-r*n,c=o*n+r*i-a*t,u=-r*t-a*i-s*n;return(// calculate result * inverse quat
this.x=l*o+-(u*r)+-(h*s)- -(c*a),this.y=h*o+-(u*a)+-(c*r)- -(l*s),this.z=c*o+-(u*s)+-(l*a)- -(h*r),this)}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){// input: THREE.Matrix4 affine matrix
// vector interpreted as a direction
let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return(// assumes min < max, componentwise
this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this)}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}// TODO lengthSquared?
lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,r=e.z,a=t.x,s=t.y,o=t.z;return this.x=n*o-r*s,this.y=r*a-i*o,this.z=i*s-n*a,this}projectOnVector(e){let t=e.lengthSq();if(0===t)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return K.copy(this).projectOnVector(e),this.sub(K)}reflect(e){// reflect incident vector off plane orthogonal to normal
// normal is assumed to have unit length
return this.sub(K.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(0===t)return Math.PI/2;let i=this.dot(e)/t;// clamp, to handle numerical problems
return Math.acos(x(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){// Derived from https://mathworld.wolfram.com/SpherePointPicking.html
let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const K=/*@__PURE__*/new Z,J=/*@__PURE__*/new Y;class Q{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ee.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ee.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ee.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(// Computes the world-axis-aligned bounding box of an object (including its children),
// accounting for both the object's, and children's, world transforms
e.updateWorldMatrix(!1,!1),void 0!==e.boundingBox)null===e.boundingBox&&e.computeBoundingBox(),et.copy(e.boundingBox),et.applyMatrix4(e.matrixWorld),this.union(et);else{let i=e.geometry;if(void 0!==i){if(t&&void 0!==i.attributes&&void 0!==i.attributes.position){let t=i.attributes.position;for(let i=0,n=t.count;i<n;i++)ee.fromBufferAttribute(t,i).applyMatrix4(e.matrixWorld),this.expandByPoint(ee)}else null===i.boundingBox&&i.computeBoundingBox(),et.copy(i.boundingBox),et.applyMatrix4(e.matrixWorld),this.union(et)}}let i=e.children;for(let e=0,n=i.length;e<n;e++)this.expandByObject(i[e],t);return this}containsPoint(e){return!(e.x<this.min.x)&&!(e.x>this.max.x)&&!(e.y<this.min.y)&&!(e.y>this.max.y)&&!(e.z<this.min.z)&&!(e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){// This can potentially have a divide by zero if the box
// has a size dimension of 0.
return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){// using 6 splitting planes to rule out intersections.
return!(e.max.x<this.min.x)&&!(e.min.x>this.max.x)&&!(e.max.y<this.min.y)&&!(e.min.y>this.max.y)&&!(e.max.z<this.min.z)&&!(e.min.z>this.max.z)}intersectsSphere(e){// If that point is inside the sphere, the AABB and sphere intersect.
return(// Find the point on the AABB closest to the sphere center.
this.clampPoint(e.center,ee),ee.distanceToSquared(e.center)<=e.radius*e.radius)}intersectsPlane(e){// We compute the minimum and maximum dot product values. If those values
// are on the same side (back or front) of the plane, then there is no intersection.
let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;// compute box center and extents
this.getCenter(el),eh.subVectors(this.max,el),// translate triangle to aabb origin
ei.subVectors(e.a,el),en.subVectors(e.b,el),er.subVectors(e.c,el),// compute edge vectors for triangle
ea.subVectors(en,ei),es.subVectors(er,en),eo.subVectors(ei,er);// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
let t=[0,-ea.z,ea.y,0,-es.z,es.y,0,-eo.z,eo.y,ea.z,0,-ea.x,es.z,0,-es.x,eo.z,0,-eo.x,-ea.y,ea.x,0,-es.y,es.x,0,-eo.y,eo.x,0];return!!(ed(t,ei,en,er,eh)&&ed(// test 3 face normals from the aabb
t=[1,0,0,0,1,0,0,0,1],ei,en,er,eh))&&(// finally testing the face normal of the triangle
// use already existing triangle edge vectors here
ec.crossVectors(ea,es),ed(t=[ec.x,ec.y,ec.z],ei,en,er,eh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ee).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(ee).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(// NOTE: I am using a binary pattern to specify all 2^3 combinations below
$[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $=[/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z,/*@__PURE__*/new Z],ee=/*@__PURE__*/new Z,et=/*@__PURE__*/new Q,ei=/*@__PURE__*/new Z,en=/*@__PURE__*/new Z,er=/*@__PURE__*/new Z,ea=/*@__PURE__*/new Z,es=/*@__PURE__*/new Z,eo=/*@__PURE__*/new Z,el=/*@__PURE__*/new Z,eh=/*@__PURE__*/new Z,ec=/*@__PURE__*/new Z,eu=/*@__PURE__*/new Z;function ed(e,t,i,n,r){for(let a=0,s=e.length-3;a<=s;a+=3){eu.fromArray(e,a);// project the aabb onto the separating axis
let s=r.x*Math.abs(eu.x)+r.y*Math.abs(eu.y)+r.z*Math.abs(eu.z),o=t.dot(eu),l=i.dot(eu),h=n.dot(eu);// actual test, basically see if either of the most extreme of the triangle points intersects r
if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>s)// the axis is separating and we can exit
return!1}return!0}const ep=/*@__PURE__*/new Q,ef=/*@__PURE__*/new Z,em=/*@__PURE__*/new Z;class eg{constructor(e=new Z,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;void 0!==t?i.copy(t):ep.setFromPoints(e).getCenter(i);let n=0;for(let t=0,r=e.length;t<r;t++)n=Math.max(n,i.distanceToSquared(e[t]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?// Empty sphere produces empty bounding box
e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius)),e}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ef.subVectors(e,this.center);let t=ef.lengthSq();if(t>this.radius*this.radius){// calculate the minimal sphere
let e=Math.sqrt(t),i=(e-this.radius)*.5;this.center.addScaledVector(ef,i/e),this.radius+=i}return this}union(e){return e.isEmpty()||(this.isEmpty()?this.copy(e):!0===this.center.equals(e.center)?this.radius=Math.max(this.radius,e.radius):(em.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ef.copy(e.center).add(em)),this.expandByPoint(ef.copy(e.center).sub(em)))),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ev=/*@__PURE__*/new Z,ey=/*@__PURE__*/new Z,ex=/*@__PURE__*/new Z,e_=/*@__PURE__*/new Z,ew=/*@__PURE__*/new Z,eb=/*@__PURE__*/new Z,eM=/*@__PURE__*/new Z;class eS{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ev)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ev.subVectors(e,this.origin).dot(this.direction);return(// point behind the ray
t<0?this.origin.distanceToSquared(e):(ev.copy(this.origin).addScaledVector(this.direction,t),ev.distanceToSquared(e)))}distanceSqToSegment(e,t,i,n){let r,a,s,o;// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteDistRaySegment.h
// It returns the min distance between the ray and the segment
// defined by v0 and v1
// It can also set two optional targets :
// - The closest point on the ray
// - The closest point on the segment
ey.copy(e).add(t).multiplyScalar(.5),ex.copy(t).sub(e).normalize(),e_.copy(this.origin).sub(ey);let l=.5*e.distanceTo(t),h=-this.direction.dot(ex),c=e_.dot(this.direction),u=-e_.dot(ex),d=e_.lengthSq(),p=Math.abs(1-h*h);if(p>0){if(// The ray and segment are not parallel.
r=h*u-c,a=h*c-u,o=l*p,r>=0){if(a>=-o){if(a<=o){// region 0
// Minimum at interior points of ray and segment.
let e=1/p;r*=e,a*=e,s=r*(r+h*a+2*c)+a*(h*r+a+2*u)+d}else s=-(r=Math.max(0,-(h*// region 1
(a=l)+c)))*r+a*(a+2*u)+d}else s=-(r=Math.max(0,-(h*// region 5
(a=-l)+c)))*r+a*(a+2*u)+d}else a<=-o?(a=// region 4
(r=Math.max(0,-(-h*l+c)))>0?-l:Math.min(Math.max(-l,-u),l),s=-r*r+a*(a+2*u)+d):a<=o?(// region 3
r=0,s=(a=Math.min(Math.max(-l,-u),l))*(a+2*u)+d):(a=// region 2
(r=Math.max(0,-(h*l+c)))>0?l:Math.min(Math.max(-l,-u),l),s=-r*r+a*(a+2*u)+d)}else // Ray and segment are parallel.
a=h>0?-l:l,s=-(r=Math.max(0,-(h*a+c)))*r+a*(a+2*u)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,r),n&&n.copy(ey).addScaledVector(ex,a),s}intersectSphere(e,t){ev.subVectors(e.center,this.origin);let i=ev.dot(this.direction),n=ev.dot(ev)-i*i,r=e.radius*e.radius;if(n>r)return null;let a=Math.sqrt(r-n),s=i-a,o=i+a;return(// test to see if t1 is behind the ray - if so, return null
o<0?null:s<0?this.at(o,t):this.at(s,t))}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(0===t)return(// line is coplanar, return origin
0===e.distanceToPoint(this.origin)?0:null);let i=-(this.origin.dot(e.normal)+e.constant)/t;// Return if the ray never intersects the plane
return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return null===i?null:this.at(i,t)}intersectsPlane(e){// check if the ray lies on the plane first
let t=e.distanceToPoint(this.origin);if(0===t)return!0;let i=e.normal.dot(this.direction);return i*t<0}intersectBox(e,t){let i,n,r,a,s,o;let l=1/this.direction.x,h=1/this.direction.y,c=1/this.direction.z,u=this.origin;return(l>=0?(i=(e.min.x-u.x)*l,n=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,n=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>n)?null:((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),c>=0?(s=(e.min.z-u.z)*c,o=(e.max.z-u.z)*c):(s=(e.max.z-u.z)*c,o=(e.min.z-u.z)*c),i>o||s>n)?null:((s>i||i!=i)&&(i=s),(o<n||n!=n)&&(n=o),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return null!==this.intersectBox(e,ev)}intersectTriangle(e,t,i,n,r){let a;// Compute the offset origin, edges, and normal.
// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
ew.subVectors(t,e),eb.subVectors(i,e),eM.crossVectors(ew,eb);// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
let s=this.direction.dot(eM);if(s>0){if(n)return null;a=1}else{if(!(s<0))return null;a=-1,s=-s}e_.subVectors(this.origin,e);let o=a*this.direction.dot(eb.crossVectors(e_,eb));// b1 < 0, no intersection
if(o<0)return null;let l=a*this.direction.dot(ew.cross(e_));// b2 < 0, no intersection
if(l<0||o+l>s)return null;// Line intersects triangle, check if ray does.
let h=-a*e_.dot(eM);return(// t < 0, no intersection
h<0?null:this.at(h/s,r))}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class eE{constructor(e,t,i,n,r,a,s,o,l,h,c,u,d,p,f,m){eE.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],void 0!==e&&this.set(e,t,i,n,r,a,s,o,l,h,c,u,d,p,f,m)}set(e,t,i,n,r,a,s,o,l,h,c,u,d,p,f,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=n,g[1]=r,g[5]=a,g[9]=s,g[13]=o,g[2]=l,g[6]=h,g[10]=c,g[14]=u,g[3]=d,g[7]=p,g[11]=f,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new eE().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){// this method does not support reflection matrices
let t=this.elements,i=e.elements,n=1/eT.setFromMatrixColumn(e,0).length(),r=1/eT.setFromMatrixColumn(e,1).length(),a=1/eT.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),s=Math.sin(i),o=Math.cos(n),l=Math.sin(n),h=Math.cos(r),c=Math.sin(r);if("XYZ"===e.order){let e=a*h,i=a*c,n=s*h,r=s*c;t[0]=o*h,t[4]=-o*c,t[8]=l,t[1]=i+n*l,t[5]=e-r*l,t[9]=-s*o,t[2]=r-e*l,t[6]=n+i*l,t[10]=a*o}else if("YXZ"===e.order){let e=o*h,i=o*c,n=l*h,r=l*c;t[0]=e+r*s,t[4]=n*s-i,t[8]=a*l,t[1]=a*c,t[5]=a*h,t[9]=-s,t[2]=i*s-n,t[6]=r+e*s,t[10]=a*o}else if("ZXY"===e.order){let e=o*h,i=o*c,n=l*h,r=l*c;t[0]=e-r*s,t[4]=-a*c,t[8]=n+i*s,t[1]=i+n*s,t[5]=a*h,t[9]=r-e*s,t[2]=-a*l,t[6]=s,t[10]=a*o}else if("ZYX"===e.order){let e=a*h,i=a*c,n=s*h,r=s*c;t[0]=o*h,t[4]=n*l-i,t[8]=e*l+r,t[1]=o*c,t[5]=r*l+e,t[9]=i*l-n,t[2]=-l,t[6]=s*o,t[10]=a*o}else if("YZX"===e.order){let e=a*o,i=a*l,n=s*o,r=s*l;t[0]=o*h,t[4]=r-e*c,t[8]=n*c+i,t[1]=c,t[5]=a*h,t[9]=-s*h,t[2]=-l*h,t[6]=i*c+n,t[10]=e-r*c}else if("XZY"===e.order){let e=a*o,i=a*l,n=s*o,r=s*l;t[0]=o*h,t[4]=-c,t[8]=l*h,t[1]=e*c+r,t[5]=a*h,t[9]=i*c-n,t[2]=n*c-i,t[6]=s*h,t[10]=r*c+e}return(// bottom row
t[3]=0,t[7]=0,t[11]=0,// last column
t[12]=0,t[13]=0,t[14]=0,t[15]=1,this)}makeRotationFromQuaternion(e){return this.compose(eR,e,eC)}lookAt(e,t,i){let n=this.elements;return eN.subVectors(e,t),0===eN.lengthSq()&&(eN.z=1),eN.normalize(),eP.crossVectors(i,eN),0===eP.lengthSq()&&(1===Math.abs(i.z)?eN.x+=1e-4:eN.z+=1e-4,eN.normalize(),eP.crossVectors(i,eN)),eP.normalize(),eL.crossVectors(eN,eP),n[0]=eP.x,n[4]=eL.x,n[8]=eN.x,n[1]=eP.y,n[5]=eL.y,n[9]=eN.y,n[2]=eP.z,n[6]=eL.z,n[10]=eN.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],s=i[4],o=i[8],l=i[12],h=i[1],c=i[5],u=i[9],d=i[13],p=i[2],f=i[6],m=i[10],g=i[14],v=i[3],y=i[7],x=i[11],_=i[15],w=n[0],b=n[4],M=n[8],S=n[12],E=n[1],T=n[5],A=n[9],R=n[13],C=n[2],P=n[6],L=n[10],N=n[14],I=n[3],U=n[7],D=n[11],O=n[15];return r[0]=a*w+s*E+o*C+l*I,r[4]=a*b+s*T+o*P+l*U,r[8]=a*M+s*A+o*L+l*D,r[12]=a*S+s*R+o*N+l*O,r[1]=h*w+c*E+u*C+d*I,r[5]=h*b+c*T+u*P+d*U,r[9]=h*M+c*A+u*L+d*D,r[13]=h*S+c*R+u*N+d*O,r[2]=p*w+f*E+m*C+g*I,r[6]=p*b+f*T+m*P+g*U,r[10]=p*M+f*A+m*L+g*D,r[14]=p*S+f*R+m*N+g*O,r[3]=v*w+y*E+x*C+_*I,r[7]=v*b+y*T+x*P+_*U,r[11]=v*M+y*A+x*L+_*D,r[15]=v*S+y*R+x*N+_*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],s=e[5],o=e[9],l=e[13],h=e[2],c=e[6],u=e[10],d=e[14],p=e[3],f=e[7],m=e[11],g=e[15];//TODO: make this more efficient
//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
return p*(+r*o*c-n*l*c-r*s*u+i*l*u+n*s*d-i*o*d)+f*(+t*o*d-t*l*u+r*a*u-n*a*d+n*l*h-r*o*h)+m*(+t*l*c-t*s*d-r*a*c+i*a*d+r*s*h-i*l*h)+g*(-n*s*h-t*o*c+t*s*u+n*a*c-i*a*u+i*o*h)}transpose(){let e;let t=this.elements;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],s=e[5],o=e[6],l=e[7],h=e[8],c=e[9],u=e[10],d=e[11],p=e[12],f=e[13],m=e[14],g=e[15],v=c*m*l-f*u*l+f*o*d-s*m*d-c*o*g+s*u*g,y=p*u*l-h*m*l-p*o*d+a*m*d+h*o*g-a*u*g,x=h*f*l-p*c*l+p*s*d-a*f*d-h*s*g+a*c*g,_=p*c*o-h*f*o-p*s*u+a*f*u+h*s*m-a*c*m,w=t*v+i*y+n*x+r*_;if(0===w)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/w;return e[0]=v*b,e[1]=(f*u*r-c*m*r-f*n*d+i*m*d+c*n*g-i*u*g)*b,e[2]=(s*m*r-f*o*r+f*n*l-i*m*l-s*n*g+i*o*g)*b,e[3]=(c*o*r-s*u*r-c*n*l+i*u*l+s*n*d-i*o*d)*b,e[4]=y*b,e[5]=(h*m*r-p*u*r+p*n*d-t*m*d-h*n*g+t*u*g)*b,e[6]=(p*o*r-a*m*r-p*n*l+t*m*l+a*n*g-t*o*g)*b,e[7]=(a*u*r-h*o*r+h*n*l-t*u*l-a*n*d+t*o*d)*b,e[8]=x*b,e[9]=(p*c*r-h*f*r-p*i*d+t*f*d+h*i*g-t*c*g)*b,e[10]=(a*f*r-p*s*r+p*i*l-t*f*l-a*i*g+t*s*g)*b,e[11]=(h*s*r-a*c*r-h*i*l+t*c*l+a*i*d-t*s*d)*b,e[12]=_*b,e[13]=(h*f*n-p*c*n+p*i*u-t*f*u-h*i*m+t*c*m)*b,e[14]=(p*s*n-a*f*n-p*i*o+t*f*o+a*i*m-t*s*m)*b,e[15]=(a*c*n-h*s*n+h*i*o-t*c*o-a*i*u+t*s*u)*b,this}scale(e){let t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){// Based on http://www.gamedev.net/reference/articles/article1199.asp
let i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,s=e.y,o=e.z,l=r*a,h=r*s;return this.set(l*a+i,l*s-n*o,l*o+n*s,0,l*s+n*o,h*s+i,h*o-n*a,0,l*o-n*s,h*o+n*a,r*o*o+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,r=t._x,a=t._y,s=t._z,o=t._w,l=r+r,h=a+a,c=s+s,u=r*l,d=r*h,p=r*c,f=a*h,m=a*c,g=s*c,v=o*l,y=o*h,x=o*c,_=i.x,w=i.y,b=i.z;return n[0]=(1-(f+g))*_,n[1]=(d+x)*_,n[2]=(p-y)*_,n[3]=0,n[4]=(d-x)*w,n[5]=(1-(u+g))*w,n[6]=(m+v)*w,n[7]=0,n[8]=(p+y)*b,n[9]=(m-v)*b,n[10]=(1-(u+f))*b,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements,r=eT.set(n[0],n[1],n[2]).length(),a=eT.set(n[4],n[5],n[6]).length(),s=eT.set(n[8],n[9],n[10]).length(),o=this.determinant();o<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],// scale the rotation part
eA.copy(this);let l=1/r,h=1/a,c=1/s;return eA.elements[0]*=l,eA.elements[1]*=l,eA.elements[2]*=l,eA.elements[4]*=h,eA.elements[5]*=h,eA.elements[6]*=h,eA.elements[8]*=c,eA.elements[9]*=c,eA.elements[10]*=c,t.setFromRotationMatrix(eA),i.x=r,i.y=a,i.z=s,this}makePerspective(e,t,i,n,r,a,s=2e3){let o,l;let h=this.elements;if(2e3===s)o=-(a+r)/(a-r),l=-2*a*r/(a-r);else if(2001===s)o=-a/(a-r),l=-a*r/(a-r);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return h[0]=2*r/(t-e),h[4]=0,h[8]=(t+e)/(t-e),h[12]=0,h[1]=0,h[5]=2*r/(i-n),h[9]=(i+n)/(i-n),h[13]=0,h[2]=0,h[6]=0,h[10]=o,h[14]=l,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,i,n,r,a,s=2e3){let o,l;let h=this.elements,c=1/(t-e),u=1/(i-n),d=1/(a-r);if(2e3===s)o=(a+r)*d,l=-2*d;else if(2001===s)o=r*d,l=-1*d;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return h[0]=2*c,h[4]=0,h[8]=0,h[12]=-((t+e)*c),h[1]=0,h[5]=2*u,h[9]=0,h[13]=-((i+n)*u),h[2]=0,h[6]=0,h[10]=l,h[14]=-o,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let e=0;e<16;e++)if(t[e]!==i[e])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const eT=/*@__PURE__*/new Z,eA=/*@__PURE__*/new eE,eR=/*@__PURE__*/new Z(0,0,0),eC=/*@__PURE__*/new Z(1,1,1),eP=/*@__PURE__*/new Z,eL=/*@__PURE__*/new Z,eN=/*@__PURE__*/new Z,eI=/*@__PURE__*/new eE,eU=/*@__PURE__*/new Y;class eD{constructor(e=0,t=0,i=0,n=eD.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
let n=e.elements,r=n[0],a=n[4],s=n[8],o=n[1],l=n[5],h=n[9],c=n[2],u=n[6],d=n[10];switch(t){case"XYZ":this._y=Math.asin(x(s,-1,1)),.9999999>Math.abs(s)?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-x(h,-1,1)),.9999999>Math.abs(h)?(this._y=Math.atan2(s,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-c,r),this._z=0);break;case"ZXY":this._x=Math.asin(x(u,-1,1)),.9999999>Math.abs(u)?(this._y=Math.atan2(-c,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-x(c,-1,1)),.9999999>Math.abs(c)?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(x(o,-1,1)),.9999999>Math.abs(o)?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-c,r)):(this._x=0,this._y=Math.atan2(s,d));break;case"XZY":this._z=Math.asin(-x(a,-1,1)),.9999999>Math.abs(a)?(this._x=Math.atan2(u,l),this._y=Math.atan2(s,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,!0===i&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return eI.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eI,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return(// WARNING: this discards revolution information -bhouston
eU.setFromEuler(this),this.setFromQuaternion(eU,e))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],void 0!==e[3]&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}eD.DEFAULT_ORDER="XYZ";class eO{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let ez=0;const eB=/*@__PURE__*/new Z,eF=/*@__PURE__*/new Y,eV=/*@__PURE__*/new eE,eH=/*@__PURE__*/new Z,eW=/*@__PURE__*/new Z,ek=/*@__PURE__*/new Z,eG=/*@__PURE__*/new Y,eq=/*@__PURE__*/new Z(1,0,0),ej=/*@__PURE__*/new Z(0,1,0),eX=/*@__PURE__*/new Z(0,0,1),eY={type:"added"},eZ={type:"removed"};class eK extends f{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ez++}),this.uuid=y(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=eK.DEFAULT_UP.clone();let e=new Z,t=new eD,i=new Y,n=new Z(1,1,1);t._onChange(function(){i.setFromEuler(t,!1)}),i._onChange(function(){t.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new eE},normalMatrix:{value:new E}}),this.matrix=new eE,this.matrixWorld=new eE,this.matrixAutoUpdate=eK.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=eK.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new eO,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){// assumes axis is normalized
this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){// assumes q is normalized
this.quaternion.copy(e)}rotateOnAxis(e,t){return(// rotate object on axis in object space
// axis is assumed to be normalized
eF.setFromAxisAngle(e,t),this.quaternion.multiply(eF),this)}rotateOnWorldAxis(e,t){return(// rotate object on axis in world space
// axis is assumed to be normalized
// method assumes no rotated parent
eF.setFromAxisAngle(e,t),this.quaternion.premultiply(eF),this)}rotateX(e){return this.rotateOnAxis(eq,e)}rotateY(e){return this.rotateOnAxis(ej,e)}rotateZ(e){return this.rotateOnAxis(eX,e)}translateOnAxis(e,t){return(// translate object by distance along axis in object space
// axis is assumed to be normalized
eB.copy(e).applyQuaternion(this.quaternion),this.position.add(eB.multiplyScalar(t)),this)}translateX(e){return this.translateOnAxis(eq,e)}translateY(e){return this.translateOnAxis(ej,e)}translateZ(e){return this.translateOnAxis(eX,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(eV.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?eH.copy(e):eH.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),eW.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?eV.lookAt(eW,eH,this.up):eV.lookAt(eH,eW,this.up),this.quaternion.setFromRotationMatrix(eV),n&&(eV.extractRotation(n.matrixWorld),eF.setFromRotationMatrix(eV),this.quaternion.premultiply(eF.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?console.error("THREE.Object3D.add: object can't be added as a child of itself.",e):e&&e.isObject3D?(null!==e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(eY)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return -1!==t&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eZ)),this}removeFromParent(){let e=this.parent;return null!==e&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return(// adds object as a child of this, while maintaining the object's world transform
// Note: This method does not support scene graphs having non-uniformly-scaled nodes(s)
this.updateWorldMatrix(!0,!1),eV.copy(this.matrixWorld).invert(),null!==e.parent&&(e.parent.updateWorldMatrix(!0,!1),eV.multiply(e.parent.matrixWorld)),e.applyMatrix4(eV),this.add(e),e.updateWorldMatrix(!1,!0),this)}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let n=this.children[i],r=n.getObjectByProperty(e,t);if(void 0!==r)return r}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectsByProperty(e,t);r.length>0&&(i=i.concat(r))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eW,e,ek),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eW,eG,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(!1===this.visible)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;null!==t&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);// update children
let t=this.children;for(let i=0,n=t.length;i<n;i++){let n=t[i];(!0===n.matrixWorldAutoUpdate||!0===e)&&n.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let i=this.parent;// update children
if(!0===e&&null!==i&&!0===i.matrixWorldAutoUpdate&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===t){let e=this.children;for(let t=0,i=e.length;t<i;t++){let i=e[t];!0===i.matrixWorldAutoUpdate&&i.updateWorldMatrix(!1,!0)}}}toJSON(e){// meta is a string when called from JSON.stringify
let t=void 0===e||"string"==typeof e,i={};t&&(// initialize meta obj
e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});// standard Object3D serialization
let n={};//
function r(t,i){return void 0===t[i.uuid]&&(t[i.uuid]=i.toJSON(e)),i.uuid}if(n.uuid=this.uuid,n.type=this.type,""!==this.name&&(n.name=this.name),!0===this.castShadow&&(n.castShadow=!0),!0===this.receiveShadow&&(n.receiveShadow=!0),!1===this.visible&&(n.visible=!1),!1===this.frustumCulled&&(n.frustumCulled=!1),0!==this.renderOrder&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),!1===this.matrixAutoUpdate&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(n.instanceColor=this.instanceColor.toJSON())),this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&!0!==this.environment.isRenderTargetTexture&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);let t=this.geometry.parameters;if(void 0!==t&&void 0!==t.shapes){let i=t.shapes;if(Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let n=i[t];r(e.shapes,n)}else r(e.shapes,i)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),void 0!==this.material){if(Array.isArray(this.material)){let t=[];for(let i=0,n=this.material.length;i<n;i++)t.push(r(e.materials,this.material[i]));n.material=t}else n.material=r(e.materials,this.material)}//
if(this.children.length>0){n.children=[];for(let t=0;t<this.children.length;t++)n.children.push(this.children[t].toJSON(e).object)}//
if(this.animations.length>0){n.animations=[];for(let t=0;t<this.animations.length;t++){let i=this.animations[t];n.animations.push(r(e.animations,i))}}if(t){let t=a(e.geometries),n=a(e.materials),r=a(e.textures),s=a(e.images),o=a(e.shapes),l=a(e.skeletons),h=a(e.animations),c=a(e.nodes);t.length>0&&(i.geometries=t),n.length>0&&(i.materials=n),r.length>0&&(i.textures=r),s.length>0&&(i.images=s),o.length>0&&(i.shapes=o),l.length>0&&(i.skeletons=l),h.length>0&&(i.animations=h),c.length>0&&(i.nodes=c)}return i.object=n,i;// extract data from the cache hash
// remove metadata on each item
// and return as array
function a(e){let t=[];for(let i in e){let n=e[i];delete n.metadata,t.push(n)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),!0===t)for(let t=0;t<e.children.length;t++){let i=e.children[t];this.add(i.clone())}return this}}eK.DEFAULT_UP=/*@__PURE__*/new Z(0,1,0),eK.DEFAULT_MATRIX_AUTO_UPDATE=!0,eK.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const eJ=/*@__PURE__*/new Z,eQ=/*@__PURE__*/new Z,e$=/*@__PURE__*/new Z,e0=/*@__PURE__*/new Z,e1=/*@__PURE__*/new Z,e2=/*@__PURE__*/new Z,e3=/*@__PURE__*/new Z,e4=/*@__PURE__*/new Z,e5=/*@__PURE__*/new Z,e6=/*@__PURE__*/new Z;let e7=!1;class e8{constructor(e=new Z,t=new Z,i=new Z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),eJ.subVectors(e,t),n.cross(eJ);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}// static/instance method to calculate barycentric coordinates
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
static getBarycoord(e,t,i,n,r){eJ.subVectors(n,t),eQ.subVectors(i,t),e$.subVectors(e,t);let a=eJ.dot(eJ),s=eJ.dot(eQ),o=eJ.dot(e$),l=eQ.dot(eQ),h=eQ.dot(e$),c=a*l-s*s;// collinear or singular triangle
if(0===c)// not sure if this is the best idea, maybe should be returning undefined
return r.set(-2,-1,-1);let u=1/c,d=(l*o-s*h)*u,p=(a*h-s*o)*u;// barycentric coordinates must always sum to 1
return r.set(1-d-p,p,d)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,e0),e0.x>=0&&e0.y>=0&&e0.x+e0.y<=1}static getUV(e,t,i,n,r,a,s,o){return!1===e7&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),e7=!0),this.getInterpolation(e,t,i,n,r,a,s,o)}static getInterpolation(e,t,i,n,r,a,s,o){return this.getBarycoord(e,t,i,n,e0),o.setScalar(0),o.addScaledVector(r,e0.x),o.addScaledVector(a,e0.y),o.addScaledVector(s,e0.z),o}static isFrontFacing(e,t,i,n){// strictly front facing
return eJ.subVectors(i,t),eQ.subVectors(e,t),0>eJ.cross(eQ).dot(n)}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return eJ.subVectors(this.c,this.b),eQ.subVectors(this.a,this.b),.5*eJ.cross(eQ).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return e8.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return e8.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return!1===e7&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),e7=!0),e8.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return e8.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return e8.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return e8.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i,n;let r=this.a,a=this.b,s=this.c;// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
// under the accompanying license; see chapter 5.1.5 for detailed explanation.
// basically, we're distinguishing which of the voronoi regions of the triangle
// the point lies in with the minimum amount of redundant computation.
e1.subVectors(a,r),e2.subVectors(s,r),e4.subVectors(e,r);let o=e1.dot(e4),l=e2.dot(e4);if(o<=0&&l<=0)return t.copy(r);e5.subVectors(e,a);let h=e1.dot(e5),c=e2.dot(e5);if(h>=0&&c<=h)return t.copy(a);let u=o*c-h*l;if(u<=0&&o>=0&&h<=0)// edge region of AB; barycentric coords (1-v, v, 0)
return i=o/(o-h),t.copy(r).addScaledVector(e1,i);e6.subVectors(e,s);let d=e1.dot(e6),p=e2.dot(e6);if(p>=0&&d<=p)return t.copy(s);let f=d*l-o*p;if(f<=0&&l>=0&&p<=0)// edge region of AC; barycentric coords (1-w, 0, w)
return n=l/(l-p),t.copy(r).addScaledVector(e2,n);let m=h*p-d*c;if(m<=0&&c-h>=0&&d-p>=0)// edge region of BC; barycentric coords (0, 1-w, w)
return e3.subVectors(s,a),n=(c-h)/(c-h+(d-p)),t.copy(a).addScaledVector(e3,n);// edge region of BC
// face region
let g=1/(m+f+u);return(// u = va * denom
i=f*g,n=u*g,t.copy(r).addScaledVector(e1,i).addScaledVector(e2,n))}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let e9=0;class te extends f{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e9++}),this.uuid=y(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(void 0!==e)for(let t in e){let i=e[t];if(void 0===i){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(void 0===n){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=void 0===e||"string"==typeof e;t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};// TODO: Copied from Object3D.toJSON
function n(e){let t=[];for(let i in e){let n=e[i];delete n.metadata,t.push(n)}return t}if(// standard Material serialization
i.uuid=this.uuid,i.type=this.type,""!==this.name&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),void 0!==this.roughness&&(i.roughness=this.roughness),void 0!==this.metalness&&(i.metalness=this.metalness),void 0!==this.sheen&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),void 0!==this.sheenRoughness&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&1!==this.emissiveIntensity&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),void 0!==this.specularIntensity&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),void 0!==this.shininess&&(i.shininess=this.shininess),void 0!==this.clearcoat&&(i.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),void 0!==this.iridescence&&(i.iridescence=this.iridescence),void 0!==this.iridescenceIOR&&(i.iridescenceIOR=this.iridescenceIOR),void 0!==this.iridescenceThicknessRange&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),void 0!==this.anisotropy&&(i.anisotropy=this.anisotropy),void 0!==this.anisotropyRotation&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,void 0!==this.combine&&(i.combine=this.combine)),void 0!==this.envMapIntensity&&(i.envMapIntensity=this.envMapIntensity),void 0!==this.reflectivity&&(i.reflectivity=this.reflectivity),void 0!==this.refractionRatio&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),void 0!==this.transmission&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),void 0!==this.thickness&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),void 0!==this.attenuationDistance&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),void 0!==this.attenuationColor&&(i.attenuationColor=this.attenuationColor.getHex()),void 0!==this.size&&(i.size=this.size),null!==this.shadowSide&&(i.shadowSide=this.shadowSide),void 0!==this.sizeAttenuation&&(i.sizeAttenuation=this.sizeAttenuation),1!==this.blending&&(i.blending=this.blending),0!==this.side&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),!0===this.transparent&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,void 0!==this.rotation&&0!==this.rotation&&(i.rotation=this.rotation),!0===this.polygonOffset&&(i.polygonOffset=!0),0!==this.polygonOffsetFactor&&(i.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(i.polygonOffsetUnits=this.polygonOffsetUnits),void 0!==this.linewidth&&1!==this.linewidth&&(i.linewidth=this.linewidth),void 0!==this.dashSize&&(i.dashSize=this.dashSize),void 0!==this.gapSize&&(i.gapSize=this.gapSize),void 0!==this.scale&&(i.scale=this.scale),!0===this.dithering&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),!0===this.alphaHash&&(i.alphaHash=this.alphaHash),!0===this.alphaToCoverage&&(i.alphaToCoverage=this.alphaToCoverage),!0===this.premultipliedAlpha&&(i.premultipliedAlpha=this.premultipliedAlpha),!0===this.forceSinglePass&&(i.forceSinglePass=this.forceSinglePass),!0===this.wireframe&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(i.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(i.wireframeLinejoin=this.wireframeLinejoin),!0===this.flatShading&&(i.flatShading=this.flatShading),!1===this.visible&&(i.visible=!1),!1===this.toneMapped&&(i.toneMapped=!1),!1===this.fog&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),t){let t=n(e.textures),r=n(e.images);t.length>0&&(i.textures=t),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(null!==t){let e=t.length;i=Array(e);for(let n=0;n!==e;++n)i[n]=t[n].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){!0===e&&this.version++}}const tt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},tn={h:0,s:0,l:0};function tr(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*6*(2/3-i):e}class ta{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){return void 0===t&&void 0===i?e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e):this.setRGB(e,t,i),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=c){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,z.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=z.workingColorSpace){return this.r=e,this.g=t,this.b=i,z.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=z.workingColorSpace){if(// h,s,l ranges are in 0.0 - 1.0
e=(e%1+1)%1,t=x(t,0,1),i=x(i,0,1),0===t)this.r=this.g=this.b=i;else{let n=i<=.5?i*(1+t):i+t-i*t,r=2*i-n;this.r=tr(r,n,e+1/3),this.g=tr(r,n,e),this.b=tr(r,n,e-1/3)}return z.toWorkingColorSpace(this,n),this}setStyle(e,t=c){let i;function n(t){void 0!==t&&1>parseFloat(t)&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;let a=i[1],s=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return(// rgb(255,0,0) rgba(255,0,0,0.5)
n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t));if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return(// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t));break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return(// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t));break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){// hex color
let n=i[1],r=n.length;if(3===r)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(6===r)return this.setHex(parseInt(n,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=c){// color keywords
let i=tt[e.toLowerCase()];return void 0!==i?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=L(e.r),this.g=L(e.g),this.b=L(e.b),this}copyLinearToSRGB(e){return this.r=N(e.r),this.g=N(e.g),this.b=N(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=c){return z.fromWorkingColorSpace(ts.copy(this),e),65536*Math.round(x(255*ts.r,0,255))+256*Math.round(x(255*ts.g,0,255))+Math.round(x(255*ts.b,0,255))}getHexString(e=c){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=z.workingColorSpace){let i,n;// h,s,l ranges are in 0.0 - 1.0
z.fromWorkingColorSpace(ts.copy(this),t);let r=ts.r,a=ts.g,s=ts.b,o=Math.max(r,a,s),l=Math.min(r,a,s),h=(l+o)/2;if(l===o)i=0,n=0;else{let e=o-l;switch(n=h<=.5?e/(o+l):e/(2-o-l),o){case r:i=(a-s)/e+(a<s?6:0);break;case a:i=(s-r)/e+2;break;case s:i=(r-a)/e+4}i/=6}return e.h=i,e.s=n,e.l=h,e}getRGB(e,t=z.workingColorSpace){return z.fromWorkingColorSpace(ts.copy(this),t),e.r=ts.r,e.g=ts.g,e.b=ts.b,e}getStyle(e=c){z.fromWorkingColorSpace(ts.copy(this),e);let t=ts.r,i=ts.g,n=ts.b;return e!==c?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*i)},${Math.round(255*n)})`}offsetHSL(e,t,i){return this.getHSL(ti),ti.h+=e,ti.s+=t,ti.l+=i,this.setHSL(ti.h,ti.s,ti.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){var i,n,r;this.getHSL(ti),e.getHSL(tn);let a=(i=ti.h,(1-t)*i+t*tn.h),s=(n=ti.s,(1-t)*n+t*tn.s),o=(r=ti.l,(1-t)*r+t*tn.l);return this.setHSL(a,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ts=/*@__PURE__*/new ta;ta.NAMES=tt;class to extends te{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ta(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tl=/*@__PURE__*/new Z,th=/*@__PURE__*/new S;class tc{constructor(e,t,i=!1){if(Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=void 0!==e?e.length/t:0,this.normalized=i,this.usage=35044,this.updateRange={offset:0,count:-1},this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){!0===e&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(2===this.itemSize)for(let t=0,i=this.count;t<i;t++)th.fromBufferAttribute(this,t),th.applyMatrix3(e),this.setXY(t,th.x,th.y);else if(3===this.itemSize)for(let t=0,i=this.count;t<i;t++)tl.fromBufferAttribute(this,t),tl.applyMatrix3(e),this.setXYZ(t,tl.x,tl.y,tl.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)tl.fromBufferAttribute(this,t),tl.applyMatrix4(e),this.setXYZ(t,tl.x,tl.y,tl.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tl.fromBufferAttribute(this,t),tl.applyNormalMatrix(e),this.setXYZ(t,tl.x,tl.y,tl.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tl.fromBufferAttribute(this,t),tl.transformDirection(e),this.setXYZ(t,tl.x,tl.y,tl.z);return this}set(e,t=0){return(// Matching BufferAttribute constructor, do not normalize the array.
this.array.set(e,t),this)}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=b(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=M(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=b(t,this.array)),t}setX(e,t){return this.normalized&&(t=M(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=b(t,this.array)),t}setY(e,t){return this.normalized&&(t=M(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=b(t,this.array)),t}setZ(e,t){return this.normalized&&(t=M(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=b(t,this.array)),t}setW(e,t){return this.normalized&&(t=M(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=M(t,this.array),i=M(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=M(t,this.array),i=M(i,this.array),n=M(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=M(t,this.array),i=M(i,this.array),n=M(n,this.array),r=M(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return""!==this.name&&(e.name=this.name),35044!==this.usage&&(e.usage=this.usage),(0!==this.updateRange.offset||-1!==this.updateRange.count)&&(e.updateRange=this.updateRange),e}}class tu extends tc{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class td extends tc{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class tp extends tc{constructor(e,t,i){super(new Float32Array(e),t,i)}}let tf=0;const tm=/*@__PURE__*/new eE,tg=/*@__PURE__*/new eK,tv=/*@__PURE__*/new Z,ty=/*@__PURE__*/new Q,tx=/*@__PURE__*/new Q,t_=/*@__PURE__*/new Z;class tw extends f{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=y(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(A(e)?td:tu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return void 0!==this.attributes[e]}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;void 0!==t&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(void 0!==i){let t=new E().getNormalMatrix(e);i.applyNormalMatrix(t),i.needsUpdate=!0}let n=this.attributes.tangent;return void 0!==n&&(n.transformDirection(e),n.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}applyQuaternion(e){return tm.makeRotationFromQuaternion(e),this.applyMatrix4(tm),this}rotateX(e){return(// rotate geometry around world x-axis
tm.makeRotationX(e),this.applyMatrix4(tm),this)}rotateY(e){return(// rotate geometry around world y-axis
tm.makeRotationY(e),this.applyMatrix4(tm),this)}rotateZ(e){return(// rotate geometry around world z-axis
tm.makeRotationZ(e),this.applyMatrix4(tm),this)}translate(e,t,i){return(// translate geometry
tm.makeTranslation(e,t,i),this.applyMatrix4(tm),this)}scale(e,t,i){return(// scale geometry
tm.makeScale(e,t,i),this.applyMatrix4(tm),this)}lookAt(e){return tg.lookAt(e),tg.updateMatrix(),this.applyMatrix4(tg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tv).negate(),this.translate(tv.x,tv.y,tv.z),this}setFromPoints(e){let t=[];for(let i=0,n=e.length;i<n;i++){let n=e[i];t.push(n.x,n.y,n.z||0)}return this.setAttribute("position",new tp(t,3)),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Q);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(void 0!==e)// process morph attributes if present
{if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,i=t.length;e<i;e++){let i=t[e];ty.setFromBufferAttribute(i),this.morphTargetsRelative?(t_.addVectors(this.boundingBox.min,ty.min),this.boundingBox.expandByPoint(t_),t_.addVectors(this.boundingBox.max,ty.max),this.boundingBox.expandByPoint(t_)):(this.boundingBox.expandByPoint(ty.min),this.boundingBox.expandByPoint(ty.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new eg);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Z,1/0);return}if(e){// first, find the center of the bounding sphere
let i=this.boundingSphere.center;// process morph attributes if present
if(ty.setFromBufferAttribute(e),t)for(let e=0,i=t.length;e<i;e++){let i=t[e];tx.setFromBufferAttribute(i),this.morphTargetsRelative?(t_.addVectors(ty.min,tx.min),ty.expandByPoint(t_),t_.addVectors(ty.max,tx.max),ty.expandByPoint(t_)):(ty.expandByPoint(tx.min),ty.expandByPoint(tx.max))}ty.getCenter(i);// second, try to find a boundingSphere with a radius smaller than the
// boundingSphere of the boundingBox: sqrt(3) smaller in the best case
let n=0;for(let t=0,r=e.count;t<r;t++)t_.fromBufferAttribute(e,t),n=Math.max(n,i.distanceToSquared(t_));// process morph attributes if present
if(t)for(let r=0,a=t.length;r<a;r++){let a=t[r],s=this.morphTargetsRelative;for(let t=0,r=a.count;t<r;t++)t_.fromBufferAttribute(a,t),s&&(tv.fromBufferAttribute(e,t),t_.add(tv)),n=Math.max(n,i.distanceToSquared(t_))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;// based on http://www.terathon.com/code/tangent.html
// (per vertex tangents)
if(null===e||void 0===t.position||void 0===t.normal||void 0===t.uv){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,n=t.position.array,r=t.normal.array,a=t.uv.array,s=n.length/3;!1===this.hasAttribute("tangent")&&this.setAttribute("tangent",new tc(new Float32Array(4*s),4));let o=this.getAttribute("tangent").array,l=[],h=[];for(let e=0;e<s;e++)l[e]=new Z,h[e]=new Z;let c=new Z,u=new Z,d=new Z,p=new S,f=new S,m=new S,g=new Z,v=new Z,y=this.groups;0===y.length&&(y=[{start:0,count:i.length}]);for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,s=t.count;for(let e=r,t=r+s;e<t;e+=3)!function(e,t,i){c.fromArray(n,3*e),u.fromArray(n,3*t),d.fromArray(n,3*i),p.fromArray(a,2*e),f.fromArray(a,2*t),m.fromArray(a,2*i),u.sub(c),d.sub(c),f.sub(p),m.sub(p);let r=1/(f.x*m.y-m.x*f.y);isFinite(r)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(r),v.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(r),l[e].add(g),l[t].add(g),l[i].add(g),h[e].add(v),h[t].add(v),h[i].add(v))}(i[e+0],i[e+1],i[e+2])}let x=new Z,_=new Z,w=new Z,b=new Z;function M(e){w.fromArray(r,3*e),b.copy(w);let t=l[e];// Gram-Schmidt orthogonalize
x.copy(t),x.sub(w.multiplyScalar(w.dot(t))).normalize(),// Calculate handedness
_.crossVectors(b,t);let i=_.dot(h[e]);o[4*e]=x.x,o[4*e+1]=x.y,o[4*e+2]=x.z,o[4*e+3]=i<0?-1:1}for(let e=0,t=y.length;e<t;++e){let t=y[e],n=t.start,r=t.count;for(let e=n,t=n+r;e<t;e+=3)M(i[e+0]),M(i[e+1]),M(i[e+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(void 0!==t){let i=this.getAttribute("normal");if(void 0===i)i=new tc(new Float32Array(3*t.count),3),this.setAttribute("normal",i);else for(let e=0,t=i.count;e<t;e++)i.setXYZ(e,0,0,0);let n=new Z,r=new Z,a=new Z,s=new Z,o=new Z,l=new Z,h=new Z,c=new Z;// indexed elements
if(e)for(let u=0,d=e.count;u<d;u+=3){let d=e.getX(u+0),p=e.getX(u+1),f=e.getX(u+2);n.fromBufferAttribute(t,d),r.fromBufferAttribute(t,p),a.fromBufferAttribute(t,f),h.subVectors(a,r),c.subVectors(n,r),h.cross(c),s.fromBufferAttribute(i,d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,f),s.add(h),o.add(h),l.add(h),i.setXYZ(d,s.x,s.y,s.z),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let e=0,s=t.count;e<s;e+=3)n.fromBufferAttribute(t,e+0),r.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),h.subVectors(a,r),c.subVectors(n,r),h.cross(c),i.setXYZ(e+0,h.x,h.y,h.z),i.setXYZ(e+1,h.x,h.y,h.z),i.setXYZ(e+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)t_.fromBufferAttribute(e,t),t_.normalize(),e.setXYZ(t,t_.x,t_.y,t_.z)}toNonIndexed(){function e(e,t){let i=e.array,n=e.itemSize,r=e.normalized,a=new i.constructor(t.length*n),s=0,o=0;for(let r=0,l=t.length;r<l;r++){s=e.isInterleavedBufferAttribute?t[r]*e.data.stride+e.offset:t[r]*n;for(let e=0;e<n;e++)a[o++]=i[s++]}return new tc(a,n,r)}//
if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new tw,i=this.index.array,n=this.attributes;// attributes
for(let r in n){let a=n[r],s=e(a,i);t.setAttribute(r,s)}// morph attributes
let r=this.morphAttributes;for(let n in r){let a=[],s=r[n];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e(n,i);a.push(r)}t.morphAttributes[n]=a}t.morphTargetsRelative=this.morphTargetsRelative;// groups
let a=this.groups;for(let e=0,i=a.length;e<i;e++){let i=a[e];t.addGroup(i.start,i.count,i.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(// standard BufferGeometry serialization
e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),void 0!==this.parameters){let t=this.parameters;for(let i in t)void 0!==t[i]&&(e[i]=t[i]);return e}// for simplicity the code assumes attributes are not shared across geometries, see #15811
e.data={attributes:{}};let t=this.index;null!==t&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let t in i){let n=i[t];e.data.attributes[t]=n.toJSON(e.data)}let n={},r=!1;for(let t in this.morphAttributes){let i=this.morphAttributes[t],a=[];for(let t=0,n=i.length;t<n;t++){let n=i[t];a.push(n.toJSON(e.data))}a.length>0&&(n[t]=a,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let s=this.boundingSphere;return null!==s&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){// reset
this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;// used for storing cloned, shared data
let t={};// name
this.name=e.name;// index
let i=e.index;null!==i&&this.setIndex(i.clone(t));// attributes
let n=e.attributes;for(let e in n){let i=n[e];this.setAttribute(e,i.clone(t))}// morph attributes
let r=e.morphAttributes;for(let e in r){let i=[],n=r[e];for(let e=0,r=n.length;e<r;e++)i.push(n[e].clone(t));this.morphAttributes[e]=i}this.morphTargetsRelative=e.morphTargetsRelative;// groups
let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}// bounding box
let s=e.boundingBox;null!==s&&(this.boundingBox=s.clone());// bounding sphere
let o=e.boundingSphere;return null!==o&&(this.boundingSphere=o.clone()),// draw range
this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,// user data
this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tb=/*@__PURE__*/new eE,tM=/*@__PURE__*/new eS,tS=/*@__PURE__*/new eg,tE=/*@__PURE__*/new Z,tT=/*@__PURE__*/new Z,tA=/*@__PURE__*/new Z,tR=/*@__PURE__*/new Z,tC=/*@__PURE__*/new Z,tP=/*@__PURE__*/new Z,tL=/*@__PURE__*/new S,tN=/*@__PURE__*/new S,tI=/*@__PURE__*/new S,tU=/*@__PURE__*/new Z,tD=/*@__PURE__*/new Z,tO=/*@__PURE__*/new Z,tz=/*@__PURE__*/new Z,tB=/*@__PURE__*/new Z;class tF extends eK{constructor(e=new tw,t=new to){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),void 0!==e.morphTargetInfluences&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),void 0!==e.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry,t=e.morphAttributes,i=Object.keys(t);if(i.length>0){let e=t[i[0]];if(void 0!==e){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let t=0,i=e.length;t<i;t++){let i=e[t].name||String(t);this.morphTargetInfluences.push(0),this.morphTargetDictionary[i]=t}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let s=this.morphTargetInfluences;if(r&&s){tP.set(0,0,0);for(let i=0,n=r.length;i<n;i++){let n=s[i],o=r[i];0!==n&&(tC.fromBufferAttribute(o,e),a?tP.addScaledVector(tC,n):tP.addScaledVector(tC.sub(t),n))}t.add(tP)}return t}raycast(e,t){let i=this.geometry,n=this.material,r=this.matrixWorld;if(void 0!==n){if(null===i.boundingSphere&&i.computeBoundingSphere(),tS.copy(i.boundingSphere),tS.applyMatrix4(r),// check distance from ray origin to bounding sphere
tM.copy(e.ray).recast(e.near),!1===tS.containsPoint(tM.origin)&&(null===tM.intersectSphere(tS,tE)||tM.origin.distanceToSquared(tE)>(e.far-e.near)**2)||(// convert ray to local space of mesh
tb.copy(r).invert(),tM.copy(e.ray).applyMatrix4(tb),null!==i.boundingBox&&!1===tM.intersectsBox(i.boundingBox)))return;// test for intersections with geometry
this._computeIntersections(e,t,tM)}}_computeIntersections(e,t,i){let n;let r=this.geometry,a=this.material,s=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,c=r.attributes.normal,u=r.groups,d=r.drawRange;if(null!==s){// indexed buffer geometry
if(Array.isArray(a))for(let r=0,o=u.length;r<o;r++){let o=u[r],p=a[o.materialIndex],f=Math.max(o.start,d.start),m=Math.min(s.count,Math.min(o.start+o.count,d.start+d.count));for(let r=f;r<m;r+=3){let a=s.getX(r),u=s.getX(r+1),d=s.getX(r+2);(n=tV(this,p,e,i,l,h,c,a,u,d))&&(n.faceIndex=Math.floor(r/3),n.face.materialIndex=o.materialIndex,t.push(n))}}else{let r=Math.max(0,d.start),o=Math.min(s.count,d.start+d.count);for(let u=r;u<o;u+=3){let r=s.getX(u),o=s.getX(u+1),d=s.getX(u+2);(n=tV(this,a,e,i,l,h,c,r,o,d))&&(n.faceIndex=Math.floor(u/3),t.push(n))}}}else if(void 0!==o){// non-indexed buffer geometry
if(Array.isArray(a))for(let r=0,s=u.length;r<s;r++){let s=u[r],p=a[s.materialIndex],f=Math.max(s.start,d.start),m=Math.min(o.count,Math.min(s.start+s.count,d.start+d.count));for(let r=f;r<m;r+=3){let a=r,o=r+1,u=r+2;(n=tV(this,p,e,i,l,h,c,a,o,u))&&(n.faceIndex=Math.floor(r/3),n.face.materialIndex=s.materialIndex,t.push(n))}}else{let r=Math.max(0,d.start),s=Math.min(o.count,d.start+d.count);for(let o=r;o<s;o+=3){let r=o,s=o+1,u=o+2;(n=tV(this,a,e,i,l,h,c,r,s,u))&&(n.faceIndex=Math.floor(o/3),t.push(n))}}}}}function tV(e,t,i,n,r,a,s,o,l,h){e.getVertexPosition(o,tT),e.getVertexPosition(l,tA),e.getVertexPosition(h,tR);let c=function(e,t,i,n,r,a,s,o){if(null===(1===t.side?n.intersectTriangle(s,a,r,!0,o):n.intersectTriangle(r,a,s,0===t.side,o)))return null;tB.copy(o),tB.applyMatrix4(e.matrixWorld);let l=i.ray.origin.distanceTo(tB);return l<i.near||l>i.far?null:{distance:l,point:tB.clone(),object:e}}(e,t,i,n,tT,tA,tR,tz);if(c){r&&(tL.fromBufferAttribute(r,o),tN.fromBufferAttribute(r,l),tI.fromBufferAttribute(r,h),c.uv=e8.getInterpolation(tz,tT,tA,tR,tL,tN,tI,new S)),a&&(tL.fromBufferAttribute(a,o),tN.fromBufferAttribute(a,l),tI.fromBufferAttribute(a,h),c.uv1=e8.getInterpolation(tz,tT,tA,tR,tL,tN,tI,new S),c.uv2=c.uv1),s&&(tU.fromBufferAttribute(s,o),tD.fromBufferAttribute(s,l),tO.fromBufferAttribute(s,h),c.normal=e8.getInterpolation(tz,tT,tA,tR,tU,tD,tO,new Z),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));let e={a:o,b:l,c:h,normal:new Z,materialIndex:0};e8.getNormal(tT,tA,tR,e.normal),c.face=e}return c}class tH extends tw{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let s=this;// segments
n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);// buffers
let o=[],l=[],h=[],c=[],u=0,d=0;function p(e,t,i,n,r,a,p,f,m,g,v){let y=a/m,x=p/g,_=a/2,w=p/2,b=f/2,M=m+1,S=g+1,E=0,T=0,A=new Z;// generate vertices, normals and uvs
for(let a=0;a<S;a++){let s=a*x-w;for(let o=0;o<M;o++){let u=o*y-_;// set values to correct vector component
A[e]=u*n,A[t]=s*r,A[i]=b,// now apply vector to vertex buffer
l.push(A.x,A.y,A.z),// set values to correct vector component
A[e]=0,A[t]=0,A[i]=f>0?1:-1,// now apply vector to normal buffer
h.push(A.x,A.y,A.z),// uvs
c.push(o/m),c.push(1-a/g),// counters
E+=1}}// indices
// 1. you need three indices to draw a single face
// 2. a single segment consists of two faces
// 3. so we need to generate six (2*3) indices per segment
for(let e=0;e<g;e++)for(let t=0;t<m;t++){let i=u+t+M*e,n=u+t+M*(e+1),r=u+(t+1)+M*(e+1),a=u+(t+1)+M*e;// faces
o.push(i,n,a),o.push(n,r,a),// increase counter
T+=6}// add a group to the geometry. this will ensure multi material support
s.addGroup(d,T,v),// calculate new start value for groups
d+=T,// update total number of vertices
u+=E}// build each side of the box geometry
p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,n,a,2),p("x","z","y",1,-1,e,i,-t,n,a,3),p("x","y","z",1,-1,e,t,i,n,r,4),p("x","y","z",-1,-1,e,t,-i,n,r,5),// build geometry
this.setIndex(o),this.setAttribute("position",new tp(l,3)),this.setAttribute("normal",new tp(h,3)),this.setAttribute("uv",new tp(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tH(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}/**
 * Uniform Utilities
 */function tW(e){let t={};for(let i in e)for(let n in t[i]={},e[i]){let r=e[i][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][n]=null):t[i][n]=r.clone():Array.isArray(r)?t[i][n]=r.slice():t[i][n]=r}return t}function tk(e){let t={};for(let i=0;i<e.length;i++){let n=tW(e[i]);for(let e in n)t[e]=n[e]}return t}function tG(e){return null===e.getRenderTarget()?e.outputColorSpace:u}// Legacy
const tq={clone:tW,merge:tk};class tj extends te{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader="void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1// set to use shader texture LOD
},// When rendered geometry doesn't include these attributes but the material does,
// use these default values in WebGL. This avoids errors when buffer data is missing.
this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,void 0!==e&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tW(e.uniforms),this.uniformsGroups=function(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);for(let i in t.glslVersion=this.glslVersion,t.uniforms={},this.uniforms){let n=this.uniforms[i],r=n.value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let e in this.extensions)!0===this.extensions[e]&&(i[e]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class tX extends eK{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new eE,this.projectionMatrix=new eE,this.projectionMatrixInverse=new eE,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class tY extends tX{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=null===e.view?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}/**
	 * Sets the FOV by focal length in respect to the current .filmGauge.
	 *
	 * The default film gauge is 35, so that the focal length can be specified for
	 * a 35mm (full frame) camera.
	 *
	 * Values for focal length and film gauge must have the same unit.
	 */setFocalLength(e){/** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */let t=.5*this.getFilmHeight()/e;this.fov=2*v*Math.atan(t),this.updateProjectionMatrix()}/**
	 * Calculates the focal length from the current .fov and .filmGauge.
	 */getFocalLength(){let e=Math.tan(.5*g*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*v*Math.atan(Math.tan(.5*g*this.fov)/this.zoom)}getFilmWidth(){// film not completely covered in portrait format (aspect < 1)
return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){// film not completely covered in landscape format (aspect > 1)
return this.filmGauge/Math.max(this.aspect,1)}/**
	 * Sets an offset in a larger frustum. This is useful for multi-window or
	 * multi-monitor/multi-machine setups.
	 *
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
	 * the monitors are in grid like this
	 *
	 *   +---+---+---+
	 *   | A | B | C |
	 *   +---+---+---+
	 *   | D | E | F |
	 *   +---+---+---+
	 *
	 * then for each monitor you would call it like this
	 *
	 *   const w = 1920;
	 *   const h = 1080;
	 *   const fullWidth = w * 3;
	 *   const fullHeight = h * 2;
	 *
	 *   --A--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	 *   --B--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
	 *   --C--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
	 *   --D--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
	 *   --E--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
	 *   --F--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
	 *
	 *   Note there is no reason monitors have to be the same size or in a grid.
	 */setViewOffset(e,t,i,n,r,a){this.aspect=e/t,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*g*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n,a=this.view;if(null!==this.view&&this.view.enabled){let e=a.fullWidth,s=a.fullHeight;r+=a.offsetX*n/e,t-=a.offsetY*i/s,n*=a.width/e,i*=a.height/s}let s=this.filmOffset;0!==s&&(r+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,null!==this.view&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class tZ extends eK{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null;let n=new tY(-90,1,e,t);n.layers=this.layers,this.add(n);let r=new tY(-90,1,e,t);r.layers=this.layers,this.add(r);let a=new tY(-90,1,e,t);a.layers=this.layers,this.add(a);let s=new tY(-90,1,e,t);s.layers=this.layers,this.add(s);let o=new tY(-90,1,e,t);o.layers=this.layers,this.add(o);let l=new tY(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,s,o]=t;for(let e of t)this.remove(e);if(2e3===e)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(2001===e)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){null===this.parent&&this.updateMatrixWorld();let i=this.renderTarget;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[n,r,a,s,o,l]=this.children,h=e.getRenderTarget(),c=e.xr.enabled;e.xr.enabled=!1;let u=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,n),e.setRenderTarget(i,1),e.render(t,r),e.setRenderTarget(i,2),e.render(t,a),e.setRenderTarget(i,3),e.render(t,s),e.setRenderTarget(i,4),e.render(t,o),i.texture.generateMipmaps=u,e.setRenderTarget(i,5),e.render(t,l),e.setRenderTarget(h),e.xr.enabled=c,i.texture.needsPMREMUpdate=!0}}class tK extends k{constructor(e,t,i,n,r,a,s,o,l,h){super(e=void 0!==e?e:[],t=void 0!==t?t:301,i,n,r,a,s,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tJ extends j{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];void 0!==t.encoding&&(// @deprecated, r152
P("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=3001===t.encoding?c:""),this.texture=new tK(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),// By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by WebGL (and three.js)
// in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
// in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.
// three.js uses a right-handed coordinate system. So environment maps used in three.js appear to have px and nx swapped
// and the flag isRenderTargetTexture controls this conversion. The flip is not required when using WebGLCubeRenderTarget.texture
// as a cube texture (this is detected when isRenderTargetTexture is set to true for cube textures).
this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=void 0!==t.generateMipmaps&&t.generateMipmaps,this.texture.minFilter=void 0!==t.minFilter?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:/* glsl */`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:/* glsl */`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new tH(5,5,5),r=new tj({name:"CubemapFromEquirect",uniforms:tW(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;let a=new tF(n,r),s=t.minFilter;1008===t.minFilter&&(t.minFilter=1006);let o=new tZ(1,10,this);return o.update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){let r=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,n);e.setRenderTarget(r)}}const tQ=/*@__PURE__*/new Z,t$=/*@__PURE__*/new Z,t0=/*@__PURE__*/new E;class t1{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,// normal is assumed to be normalized
this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=tQ.subVectors(i,t).cross(t$.subVectors(e,t)).normalize();return(// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
this.setFromNormalAndCoplanarPoint(n,e),this)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){// Note: will lead to a divide by zero if the plane is invalid.
let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(tQ),n=this.normal.dot(i);if(0===n)return(// line is coplanar, return origin
0===this.distanceToPoint(e.start)?t.copy(e.start):null);let r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||t0.getNormalMatrix(e),n=this.coplanarPoint(tQ).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const t2=/*@__PURE__*/new eg,t3=/*@__PURE__*/new Z;class t4{constructor(e=new t1,t=new t1,i=new t1,n=new t1,r=new t1,a=new t1){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(n),s[4].copy(r),s[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3){let i=this.planes,n=e.elements,r=n[0],a=n[1],s=n[2],o=n[3],l=n[4],h=n[5],c=n[6],u=n[7],d=n[8],p=n[9],f=n[10],m=n[11],g=n[12],v=n[13],y=n[14],x=n[15];if(i[0].setComponents(o-r,u-l,m-d,x-g).normalize(),i[1].setComponents(o+r,u+l,m+d,x+g).normalize(),i[2].setComponents(o+a,u+h,m+p,x+v).normalize(),i[3].setComponents(o-a,u-h,m-p,x-v).normalize(),i[4].setComponents(o-s,u-c,m-f,x-y).normalize(),2e3===t)i[5].setComponents(o+s,u+c,m+f,x+y).normalize();else if(2001===t)i[5].setComponents(s,c,f,y).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(void 0!==e.boundingSphere)null===e.boundingSphere&&e.computeBoundingSphere(),t2.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;null===t.boundingSphere&&t.computeBoundingSphere(),t2.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(t2)}intersectsSprite(e){return t2.center.set(0,0,0),t2.radius=.7071067811865476,t2.applyMatrix4(e.matrixWorld),this.intersectsSphere(t2)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let e=0;e<6;e++){let r=t[e].distanceToPoint(i);if(r<n)return!1}return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(// corner at max distance
t3.x=n.normal.x>0?e.max.x:e.min.x,t3.y=n.normal.y>0?e.max.y:e.min.y,t3.z=n.normal.z>0?e.max.z:e.min.z,0>n.distanceToPoint(t3))return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(0>t[i].distanceToPoint(e))return!1;return!0}clone(){return new this.constructor().copy(this)}}function t5(){let e=null,t=!1,i=null,n=null;function r(t,a){i(t,a),n=e.requestAnimationFrame(r)}return{start:function(){!0!==t&&null!==i&&(n=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(e){i=e},setContext:function(t){e=t}}}function t6(e,t){let i=t.isWebGL2,n=new WeakMap;return{get://
function(e){return e.isInterleavedBufferAttribute&&(e=e.data),n.get(e)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let i=n.get(t);i&&(e.deleteBuffer(i.buffer),n.delete(t))},update:function(t,r){if(t.isGLBufferAttribute){let e=n.get(t);(!e||e.version<t.version)&&n.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version});return}t.isInterleavedBufferAttribute&&(t=t.data);let a=n.get(t);void 0===a?n.set(t,function(t,n){let r;let a=t.array,s=t.usage,o=e.createBuffer();if(e.bindBuffer(n,o),e.bufferData(n,a,s),t.onUploadCallback(),a instanceof Float32Array)r=e.FLOAT;else if(a instanceof Uint16Array){if(t.isFloat16BufferAttribute){if(i)r=e.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.")}else r=e.UNSIGNED_SHORT}else if(a instanceof Int16Array)r=e.SHORT;else if(a instanceof Uint32Array)r=e.UNSIGNED_INT;else if(a instanceof Int32Array)r=e.INT;else if(a instanceof Int8Array)r=e.BYTE;else if(a instanceof Uint8Array)r=e.UNSIGNED_BYTE;else if(a instanceof Uint8ClampedArray)r=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:o,type:r,bytesPerElement:a.BYTES_PER_ELEMENT,version:t.version}}(t,r)):a.version<t.version&&(!function(t,n,r){let a=n.array,s=n.updateRange;e.bindBuffer(r,t),-1===s.count?e.bufferSubData(r,0,a):(i?e.bufferSubData(r,s.offset*a.BYTES_PER_ELEMENT,a,s.offset,s.count):e.bufferSubData(r,s.offset*a.BYTES_PER_ELEMENT,a.subarray(s.offset,s.offset+s.count)),s.count=-1),n.onUploadCallback()}(a.buffer,t,r),a.version=t.version)}}}class t7 extends tw{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let r=e/2,a=t/2,s=Math.floor(i),o=Math.floor(n),l=s+1,h=o+1,c=e/s,u=t/o,d=[],p=[],f=[],m=[];for(let e=0;e<h;e++){let t=e*u-a;for(let i=0;i<l;i++){let n=i*c-r;p.push(n,-t,0),f.push(0,0,1),m.push(i/s),m.push(1-e/o)}}for(let e=0;e<o;e++)for(let t=0;t<s;t++){let i=t+l*e,n=t+l*(e+1),r=t+1+l*(e+1),a=t+1+l*e;d.push(i,n,a),d.push(n,r,a)}this.setIndex(d),this.setAttribute("position",new tp(p,3)),this.setAttribute("normal",new tp(f,3)),this.setAttribute("uv",new tp(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t7(e.width,e.height,e.widthSegments,e.heightSegments)}}const t8={alphahash_fragment:"#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",alphahash_pars_fragment:"#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",alphamap_fragment:"#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",alphatest_fragment:"#ifdef USE_ALPHATEST\n	if ( diffuseColor.a < alphaTest ) discard;\n#endif",alphatest_pars_fragment:"#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",aomap_fragment:"#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",aomap_pars_fragment:"#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",begin_vertex:"vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",beginnormal_vertex:"vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",bsdfs:"float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",iridescence_fragment:"#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = dFdx( surf_pos.xyz );\n		vec3 vSigmaY = dFdy( surf_pos.xyz );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n		plane = clippingPlanes[ i ];\n		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n	}\n	#pragma unroll_loop_end\n	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n		bool clipped = true;\n		#pragma unroll_loop_start\n		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n		}\n		#pragma unroll_loop_end\n		if ( clipped ) discard;\n	#endif\n#endif",clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",color_fragment:"#if defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n	diffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR )\n	varying vec3 vColor;\n#endif",color_pars_vertex:"#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n	varying vec3 vColor;\n#endif",color_vertex:"#if defined( USE_COLOR_ALPHA )\n	vColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n	vColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n	vColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.xyz *= instanceColor.xyz;\n#endif",common:"#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\nstruct GeometricContext {\n	vec3 position;\n	vec3 normal;\n	vec3 viewDir;\n#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal;\n#endif\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n	mat3 tmp;\n	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n	return tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n	return dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_v0 0.339\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_v1 0.276\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_v4 0.046\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_v5 0.016\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_v6 0.0038\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif",defaultnormal_vertex:"vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n	mat3 m = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n	transformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:"vec4 LinearToLinear( in vec4 value ) {\n	return value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",envmap_fragment:"#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 envColor = vec4( 0.0 );\n	#endif\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif",envmap_common_pars_fragment:"#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform float flipEnvMap;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",envmap_physical_pars_fragment:"#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",fog_vertex:"#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",fog_fragment:"#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",fog_pars_fragment:"#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",gradientmap_pars_fragment:"#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",lightmap_fragment:"#ifdef USE_LIGHTMAP\n	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n	reflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",lights_lambert_fragment:"LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",lights_lambert_pars_fragment:"varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",lights_pars_begin:"uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	#if defined ( LEGACY_LIGHTS )\n		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n		}\n		return 1.0;\n	#else\n		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n		if ( cutoffDistance > 0.0 ) {\n			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n		}\n		return distanceFalloff;\n	#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometry.position;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometry.position;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif",lights_toon_fragment:"ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",lights_toon_pars_fragment:"varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_phong_pars_fragment:"varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	anisotropyV /= material.anisotropy;\n	material.anisotropy = saturate( material.anisotropy );\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;\n#endif",lights_physical_pars_fragment:"struct PhysicalMaterial {\n	vec3 diffuseColor;\n	float roughness;\n	vec3 specularColor;\n	float specularF90;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		float v = 0.5 / ( gv + gl );\n		return saturate(v);\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColor;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n	return saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n	vec4 r = roughness * c0 + c1;\n	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n	return fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometry.normal;\n		vec3 viewDir = geometry.viewDir;\n		vec3 position = geometry.position;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n	#endif\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n	#endif\n	vec3 totalScattering = singleScattering + multiScattering;\n	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n	reflectedLight.indirectSpecular += radiance * singleScattering;\n	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",lights_fragment_begin:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n	geometry.clearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometry.viewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometry, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometry, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, geometry, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n		iblIrradiance += getIBLIrradiance( geometry.normal );\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometry.viewDir, geometry.normal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",logdepthbuf_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n	#ifdef USE_LOGDEPTHBUF_EXT\n		varying float vFragDepth;\n		varying float vIsPerspective;\n	#else\n		uniform float logDepthBufFC;\n	#endif\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n	#ifdef USE_LOGDEPTHBUF_EXT\n		vFragDepth = 1.0 + gl_Position.w;\n		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n	#else\n		if ( isPerspectiveMatrix( projectionMatrix ) ) {\n			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n			gl_Position.z *= gl_Position.w;\n		}\n	#endif\n#endif",map_fragment:"#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n	\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",map_pars_fragment:"#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",map_particle_fragment:"#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",map_particle_pars_fragment:"#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",morphcolor_vertex:"#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	#ifdef MORPHTARGETS_TEXTURE\n		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n		}\n	#else\n		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n	#endif\n#endif",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n	uniform float morphTargetBaseInfluence;\n	#ifdef MORPHTARGETS_TEXTURE\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n		uniform sampler2DArray morphTargetsTexture;\n		uniform ivec2 morphTargetsTextureSize;\n		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n			int y = texelIndex / morphTargetsTextureSize.x;\n			int x = texelIndex - y * morphTargetsTextureSize.x;\n			ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n			return texelFetch( morphTargetsTexture, morphUV, 0 );\n		}\n	#else\n		#ifndef USE_MORPHNORMALS\n			uniform float morphTargetInfluences[ 8 ];\n		#else\n			uniform float morphTargetInfluences[ 4 ];\n		#endif\n	#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	#ifdef MORPHTARGETS_TEXTURE\n		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n		}\n	#else\n		transformed += morphTarget0 * morphTargetInfluences[ 0 ];\n		transformed += morphTarget1 * morphTargetInfluences[ 1 ];\n		transformed += morphTarget2 * morphTargetInfluences[ 2 ];\n		transformed += morphTarget3 * morphTargetInfluences[ 3 ];\n		#ifndef USE_MORPHNORMALS\n			transformed += morphTarget4 * morphTargetInfluences[ 4 ];\n			transformed += morphTarget5 * morphTargetInfluences[ 5 ];\n			transformed += morphTarget6 * morphTargetInfluences[ 6 ];\n			transformed += morphTarget7 * morphTargetInfluences[ 7 ];\n		#endif\n	#endif\n#endif",normal_fragment_begin:"float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 geometryNormal = normal;",normal_fragment_maps:"#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",normal_pars_fragment:"#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",normal_pars_vertex:"#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",normal_vertex:"#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif",normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",clearcoat_normal_fragment_begin:"#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = geometryNormal;\n#endif",clearcoat_normal_fragment_maps:"#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",clearcoat_pars_fragment:"#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",iridescence_pars_fragment:"#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",opaque_fragment:"#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n	vec4 r = vec4( fract( v * PackFactors ), v );\n	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n	return packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return ( near * far ) / ( ( far - near ) * depth - far );\n}",premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",project_vertex:"vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",dithering_fragment:"#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",dithering_pars_fragment:"#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		struct SpotLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n	}\n	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n		return unpackRGBATo2Half( texture2D( shadow, uv ) );\n	}\n	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n		float occlusion = 1.0;\n		vec2 distribution = texture2DDistribution( shadow, uv );\n		float hard_shadow = step( compare , distribution.x );\n		if (hard_shadow != 1.0 ) {\n			float distance = compare - distribution.x ;\n			float variance = max( 0.00000, distribution.y * distribution.y );\n			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n		}\n		return occlusion;\n	}\n	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		float shadow = 1.0;\n		shadowCoord.xyz /= shadowCoord.w;\n		shadowCoord.z += shadowBias;\n		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n		if ( frustumTest ) {\n		#if defined( SHADOWMAP_TYPE_PCF )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			float dx2 = dx0 / 2.0;\n			float dy2 = dy0 / 2.0;\n			float dx3 = dx1 / 2.0;\n			float dy3 = dy1 / 2.0;\n			shadow = (\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 17.0 );\n		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx = texelSize.x;\n			float dy = texelSize.y;\n			vec2 uv = shadowCoord.xy;\n			vec2 f = fract( uv * shadowMapSize + 0.5 );\n			uv -= f * texelSize;\n			shadow = (\n				texture2DCompare( shadowMap, uv, shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n						  f.x ),\n					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n						  f.x ),\n					 f.y )\n			) * ( 1.0 / 9.0 );\n		#elif defined( SHADOWMAP_TYPE_VSM )\n			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#else\n			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#endif\n		}\n		return shadow;\n	}\n	vec2 cubeToUV( vec3 v, float texelSizeY ) {\n		vec3 absV = abs( v );\n		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n		absV *= scaleToCube;\n		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n		vec2 planar = v.xy;\n		float almostATexel = 1.5 * texelSizeY;\n		float almostOne = 1.0 - almostATexel;\n		if ( absV.z >= almostOne ) {\n			if ( v.z > 0.0 )\n				planar.x = 4.0 - v.x;\n		} else if ( absV.x >= almostOne ) {\n			float signX = sign( v.x );\n			planar.x = v.z * signX + 2.0 * signX;\n		} else if ( absV.y >= almostOne ) {\n			float signY = sign( v.y );\n			planar.x = v.x + 2.0 * signY + 2.0;\n			planar.y = v.z * signY - 2.0;\n		}\n		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n	}\n	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n		vec3 lightToPosition = shadowCoord.xyz;\n		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;\n		vec3 bd3D = normalize( lightToPosition );\n		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n			return (\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n			) * ( 1.0 / 9.0 );\n		#else\n			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n		#endif\n	}\n#endif",shadowmap_pars_vertex:"#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",shadowmap_vertex:"#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",shadowmask_pars_fragment:"float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",skinbase_vertex:"#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	uniform int boneTextureSize;\n	mat4 getBoneMatrix( const in float i ) {\n		float j = i * 4.0;\n		float x = mod( j, float( boneTextureSize ) );\n		float y = floor( j / float( boneTextureSize ) );\n		float dx = 1.0 / float( boneTextureSize );\n		float dy = 1.0 / float( boneTextureSize );\n		y = dy * ( y + 0.5 );\n		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n		mat4 bone = mat4( v1, v2, v3, v4 );\n		return bone;\n	}\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",skinnormal_vertex:"#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",tonemapping_pars_fragment:"#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",transmission_fragment:"#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",transmission_pars_fragment:"#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n		vec3 refractedRayExit = position + transmissionRay;\n		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n		vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n		refractionCoords += 1.0;\n		refractionCoords /= 2.0;\n		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",uv_pars_fragment:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",uv_pars_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",uv_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",background_vert:"varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",background_frag:"uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",backgroundCube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",backgroundCube_frag:"#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",cube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <skinbase_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",depth_frag:"#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( 1.0 );\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#endif\n}",distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <skinbase_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = packDepthToRGBA( dist );\n}",equirect_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",meshlambert_vert:"#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",meshlambert_frag:"#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",meshmatcap_vert:"#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",meshmatcap_frag:"#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",meshnormal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",meshnormal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",meshphysical_vert:"#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",meshphysical_frag:"#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",meshtoon_vert:"#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",meshtoon_frag:"#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",shadow_vert:"#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}",sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n	vec2 scale;\n	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"},t9={common:{diffuse:{value:/*@__PURE__*/new ta(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:/*@__PURE__*/new E},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new E},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:/*@__PURE__*/new E}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:/*@__PURE__*/new E}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:/*@__PURE__*/new E}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:/*@__PURE__*/new E},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:/*@__PURE__*/new E},normalScale:{value:/*@__PURE__*/new S(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:/*@__PURE__*/new E},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:/*@__PURE__*/new E}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:/*@__PURE__*/new E}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:/*@__PURE__*/new E}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:/*@__PURE__*/new ta(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:/*@__PURE__*/new ta(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new E},alphaTest:{value:0},uvTransform:{value:/*@__PURE__*/new E}},sprite:{diffuse:{value:/*@__PURE__*/new ta(16777215)},opacity:{value:1},center:{value:/*@__PURE__*/new S(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:/*@__PURE__*/new E},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new E},alphaTest:{value:0}}},ie={basic:{uniforms:/*@__PURE__*/tk([t9.common,t9.specularmap,t9.envmap,t9.aomap,t9.lightmap,t9.fog]),vertexShader:t8.meshbasic_vert,fragmentShader:t8.meshbasic_frag},lambert:{uniforms:/*@__PURE__*/tk([t9.common,t9.specularmap,t9.envmap,t9.aomap,t9.lightmap,t9.emissivemap,t9.bumpmap,t9.normalmap,t9.displacementmap,t9.fog,t9.lights,{emissive:{value:/*@__PURE__*/new ta(0)}}]),vertexShader:t8.meshlambert_vert,fragmentShader:t8.meshlambert_frag},phong:{uniforms:/*@__PURE__*/tk([t9.common,t9.specularmap,t9.envmap,t9.aomap,t9.lightmap,t9.emissivemap,t9.bumpmap,t9.normalmap,t9.displacementmap,t9.fog,t9.lights,{emissive:{value:/*@__PURE__*/new ta(0)},specular:{value:/*@__PURE__*/new ta(1118481)},shininess:{value:30}}]),vertexShader:t8.meshphong_vert,fragmentShader:t8.meshphong_frag},standard:{uniforms:/*@__PURE__*/tk([t9.common,t9.envmap,t9.aomap,t9.lightmap,t9.emissivemap,t9.bumpmap,t9.normalmap,t9.displacementmap,t9.roughnessmap,t9.metalnessmap,t9.fog,t9.lights,{emissive:{value:/*@__PURE__*/new ta(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}// temporary
}]),vertexShader:t8.meshphysical_vert,fragmentShader:t8.meshphysical_frag},toon:{uniforms:/*@__PURE__*/tk([t9.common,t9.aomap,t9.lightmap,t9.emissivemap,t9.bumpmap,t9.normalmap,t9.displacementmap,t9.gradientmap,t9.fog,t9.lights,{emissive:{value:/*@__PURE__*/new ta(0)}}]),vertexShader:t8.meshtoon_vert,fragmentShader:t8.meshtoon_frag},matcap:{uniforms:/*@__PURE__*/tk([t9.common,t9.bumpmap,t9.normalmap,t9.displacementmap,t9.fog,{matcap:{value:null}}]),vertexShader:t8.meshmatcap_vert,fragmentShader:t8.meshmatcap_frag},points:{uniforms:/*@__PURE__*/tk([t9.points,t9.fog]),vertexShader:t8.points_vert,fragmentShader:t8.points_frag},dashed:{uniforms:/*@__PURE__*/tk([t9.common,t9.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:t8.linedashed_vert,fragmentShader:t8.linedashed_frag},depth:{uniforms:/*@__PURE__*/tk([t9.common,t9.displacementmap]),vertexShader:t8.depth_vert,fragmentShader:t8.depth_frag},normal:{uniforms:/*@__PURE__*/tk([t9.common,t9.bumpmap,t9.normalmap,t9.displacementmap,{opacity:{value:1}}]),vertexShader:t8.meshnormal_vert,fragmentShader:t8.meshnormal_frag},sprite:{uniforms:/*@__PURE__*/tk([t9.sprite,t9.fog]),vertexShader:t8.sprite_vert,fragmentShader:t8.sprite_frag},background:{uniforms:{uvTransform:{value:/*@__PURE__*/new E},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:t8.background_vert,fragmentShader:t8.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:t8.backgroundCube_vert,fragmentShader:t8.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:t8.cube_vert,fragmentShader:t8.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:t8.equirect_vert,fragmentShader:t8.equirect_frag},distanceRGBA:{uniforms:/*@__PURE__*/tk([t9.common,t9.displacementmap,{referencePosition:{value:/*@__PURE__*/new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:t8.distanceRGBA_vert,fragmentShader:t8.distanceRGBA_frag},shadow:{uniforms:/*@__PURE__*/tk([t9.lights,t9.fog,{color:{value:/*@__PURE__*/new ta(0)},opacity:{value:1}}]),vertexShader:t8.shadow_vert,fragmentShader:t8.shadow_frag}};ie.physical={uniforms:/*@__PURE__*/tk([ie.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:/*@__PURE__*/new E},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:/*@__PURE__*/new E},clearcoatNormalScale:{value:/*@__PURE__*/new S(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:/*@__PURE__*/new E},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:/*@__PURE__*/new E},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:/*@__PURE__*/new E},sheen:{value:0},sheenColor:{value:/*@__PURE__*/new ta(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:/*@__PURE__*/new E},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:/*@__PURE__*/new E},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:/*@__PURE__*/new E},transmissionSamplerSize:{value:/*@__PURE__*/new S},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:/*@__PURE__*/new E},attenuationDistance:{value:0},attenuationColor:{value:/*@__PURE__*/new ta(0)},specularColor:{value:/*@__PURE__*/new ta(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:/*@__PURE__*/new E},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:/*@__PURE__*/new E},anisotropyVector:{value:/*@__PURE__*/new S},anisotropyMap:{value:null},anisotropyMapTransform:{value:/*@__PURE__*/new E}}]),vertexShader:t8.meshphysical_vert,fragmentShader:t8.meshphysical_frag};const it={r:0,b:0,g:0};function ii(e,t,i,n,r,a,s){let o,l;let h=new ta(0),u=!0===a?0:1,d=null,p=0,f=null;function m(t,i){t.getRGB(it,tG(e)),n.buffers.color.setClear(it.r,it.g,it.b,i,s)}return{getClearColor:function(){return h},setClearColor:function(e,t=1){h.set(e),m(h,u=t)},getClearAlpha:function(){return u},setClearAlpha:function(e){m(h,u=e)},render:function(a,g){let v=!1,y=!0===g.isScene?g.background:null;if(y&&y.isTexture){let e=g.backgroundBlurriness>0;// use PMREM if the user wants to blur the background
y=(e?i:t).get(y)}null===y?m(h,u):y&&y.isColor&&(m(y,1),v=!0);let x=e.xr.getEnvironmentBlendMode();"additive"===x?n.buffers.color.setClear(0,0,0,1,s):"alpha-blend"===x&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||v)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),y&&(y.isCubeTexture||306===y.mapping)?(void 0===l&&((l=new tF(new tH(1,1,1),new tj({name:"BackgroundCubeMaterial",uniforms:tW(ie.backgroundCube.uniforms),vertexShader:ie.backgroundCube.vertexShader,fragmentShader:ie.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1}))).geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(e,t,i){this.matrixWorld.copyPosition(i.matrixWorld)},// add "envMap" material property so the renderer can evaluate it like for built-in materials
Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&!1===y.isRenderTargetTexture?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=y.colorSpace!==c,(d!==y||p!==y.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,d=y,p=y.version,f=e.toneMapping),l.layers.enableAll(),// push to the pre-sorted opaque render list
a.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(void 0===o&&((o=new tF(new t7(2,2),new tj({name:"BackgroundMaterial",uniforms:tW(ie.background.uniforms),vertexShader:ie.background.vertexShader,fragmentShader:ie.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1}))).geometry.deleteAttribute("normal"),// add "map" material property so the renderer can evaluate it like for built-in materials
Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,o.material.toneMapped=y.colorSpace!==c,!0===y.matrixAutoUpdate&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||p!==y.version||f!==e.toneMapping)&&(o.material.needsUpdate=!0,d=y,p=y.version,f=e.toneMapping),o.layers.enableAll(),// push to the pre-sorted opaque render list
a.unshift(o,o.geometry,o.material,0,0,null))}}}function ir(e,t,i,n){let r=e.getParameter(e.MAX_VERTEX_ATTRIBS),a=n.isWebGL2?null:t.get("OES_vertex_array_object"),s=n.isWebGL2||null!==a,o={},l=p(null),h=l,c=!1;function u(t){return n.isWebGL2?e.bindVertexArray(t):a.bindVertexArrayOES(t)}function d(t){return n.isWebGL2?e.deleteVertexArray(t):a.deleteVertexArrayOES(t)}function p(e){let t=[],i=[],n=[];for(let e=0;e<r;e++)t[e]=0,i[e]=0,n[e]=0;return{// for backward compatibility on non-VAO support browser
geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:i,attributeDivisors:n,object:e,attributes:{},index:null}}function f(){let e=h.newAttributes;for(let t=0,i=e.length;t<i;t++)e[t]=0}function m(e){g(e,0)}function g(i,r){let a=h.newAttributes,s=h.enabledAttributes,o=h.attributeDivisors;if(a[i]=1,0===s[i]&&(e.enableVertexAttribArray(i),s[i]=1),o[i]!==r){let a=n.isWebGL2?e:t.get("ANGLE_instanced_arrays");a[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](i,r),o[i]=r}}function v(){let t=h.newAttributes,i=h.enabledAttributes;for(let n=0,r=i.length;n<r;n++)i[n]!==t[n]&&(e.disableVertexAttribArray(n),i[n]=0)}function y(t,i,n,r,a,s,o){!0===o?e.vertexAttribIPointer(t,i,n,a,s):e.vertexAttribPointer(t,i,n,r,a,s)}function x(){_(),c=!0,h!==l&&u((h=l).object)}// for backward-compatibility
function _(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:function(r,l,d,x,_){let w=!1;if(s){let t=function(t,i,r){let s=!0===r.wireframe,l=o[t.id];void 0===l&&(l={},o[t.id]=l);let h=l[i.id];void 0===h&&(h={},l[i.id]=h);let c=h[s];return void 0===c&&(c=p(n.isWebGL2?e.createVertexArray():a.createVertexArrayOES()),h[s]=c),c}(x,d,l);h!==t&&u((h=t).object),(w=function(e,t,i,n){let r=h.attributes,a=t.attributes,s=0,o=i.getAttributes();for(let t in o){let i=o[t];if(i.location>=0){let i=r[t],n=a[t];if(void 0===n&&("instanceMatrix"===t&&e.instanceMatrix&&(n=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(n=e.instanceColor)),void 0===i||i.attribute!==n||n&&i.data!==n.data)return!0;s++}}return h.attributesNum!==s||h.index!==n}(r,x,d,_))&&function(e,t,i,n){let r={},a=t.attributes,s=0,o=i.getAttributes();for(let t in o){let i=o[t];if(i.location>=0){let i=a[t];void 0===i&&("instanceMatrix"===t&&e.instanceMatrix&&(i=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(i=e.instanceColor));let n={};n.attribute=i,i&&i.data&&(n.data=i.data),r[t]=n,s++}}h.attributes=r,h.attributesNum=s,h.index=n}(r,x,d,_)}else{let e=!0===l.wireframe;(h.geometry!==x.id||h.program!==d.id||h.wireframe!==e)&&(h.geometry=x.id,h.program=d.id,h.wireframe=e,w=!0)}null!==_&&i.update(_,e.ELEMENT_ARRAY_BUFFER),(w||c)&&(c=!1,function(r,a,s,o){if(!1===n.isWebGL2&&(r.isInstancedMesh||o.isInstancedBufferGeometry)&&null===t.get("ANGLE_instanced_arrays"))return;f();let l=o.attributes,h=s.getAttributes(),c=a.defaultAttributeValues;for(let t in h){let a=h[t];if(a.location>=0){let s=l[t];if(void 0===s&&("instanceMatrix"===t&&r.instanceMatrix&&(s=r.instanceMatrix),"instanceColor"===t&&r.instanceColor&&(s=r.instanceColor)),void 0!==s){let t=s.normalized,l=s.itemSize,h=i.get(s);// TODO Attribute may not be available on context restore
if(void 0===h)continue;let c=h.buffer,u=h.type,d=h.bytesPerElement,p=!0===n.isWebGL2&&(u===e.INT||u===e.UNSIGNED_INT||1013===s.gpuType);if(s.isInterleavedBufferAttribute){let i=s.data,n=i.stride,h=s.offset;if(i.isInstancedInterleavedBuffer){for(let e=0;e<a.locationSize;e++)g(a.location+e,i.meshPerAttribute);!0!==r.isInstancedMesh&&void 0===o._maxInstanceCount&&(o._maxInstanceCount=i.meshPerAttribute*i.count)}else for(let e=0;e<a.locationSize;e++)m(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<a.locationSize;e++)y(a.location+e,l/a.locationSize,u,t,n*d,(h+l/a.locationSize*e)*d,p)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<a.locationSize;e++)g(a.location+e,s.meshPerAttribute);!0!==r.isInstancedMesh&&void 0===o._maxInstanceCount&&(o._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<a.locationSize;e++)m(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<a.locationSize;e++)y(a.location+e,l/a.locationSize,u,t,l*d,l/a.locationSize*e*d,p)}}else if(void 0!==c){let i=c[t];if(void 0!==i)switch(i.length){case 2:e.vertexAttrib2fv(a.location,i);break;case 3:e.vertexAttrib3fv(a.location,i);break;case 4:e.vertexAttrib4fv(a.location,i);break;default:e.vertexAttrib1fv(a.location,i)}}}}v()}(r,l,d,x),null!==_&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i.get(_).buffer))},reset:x,resetDefaultState:_,dispose:function(){for(let e in x(),o){let t=o[e];for(let e in t){let i=t[e];for(let e in i)d(i[e].object),delete i[e];delete t[e]}delete o[e]}},releaseStatesOfGeometry:function(e){if(void 0===o[e.id])return;let t=o[e.id];for(let e in t){let i=t[e];for(let e in i)d(i[e].object),delete i[e];delete t[e]}delete o[e.id]},releaseStatesOfProgram:function(e){for(let t in o){let i=o[t];if(void 0===i[e.id])continue;let n=i[e.id];for(let e in n)d(n[e].object),delete n[e];delete i[e.id]}},initAttributes:f,enableAttribute:m,disableUnusedAttributes:v}}function ia(e,t,i,n){let r;let a=n.isWebGL2;//
this.setMode=function(e){r=e},this.render=function(t,n){e.drawArrays(r,t,n),i.update(n,r,1)},this.renderInstances=function(n,s,o){let l,h;if(0!==o){if(a)l=e,h="drawArraysInstanced";else if(l=t.get("ANGLE_instanced_arrays"),h="drawArraysInstancedANGLE",null===l){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}l[h](r,n,s,o),i.update(s,r,o)}}}function is(e,t,i){let n;function r(t){if("highp"===t){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";t="mediump"}return"mediump"===t&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a="undefined"!=typeof WebGL2RenderingContext&&"WebGL2RenderingContext"===e.constructor.name,s=void 0!==i.precision?i.precision:"highp",o=r(s);o!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",o,"instead."),s=o);let l=a||t.has("WEBGL_draw_buffers"),h=!0===i.logarithmicDepthBuffer,c=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),u=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),g=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,x=a||t.has("OES_texture_float"),_=a?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:function(){if(void 0!==n)return n;if(!0===t.has("EXT_texture_filter_anisotropic")){let i=t.get("EXT_texture_filter_anisotropic");n=e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n},getMaxPrecision:r,precision:s,logarithmicDepthBuffer:h,maxTextures:c,maxVertexTextures:u,maxTextureSize:d,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:m,maxVaryings:g,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:x,floatVertexTextures:y&&x,maxSamples:_}}function io(e){let t=this,i=null,n=0,r=!1,a=!1,s=new t1,o=new E,l={value:null,needsUpdate:!1};function h(e,i,n,r){let a=null!==e?e.length:0,h=null;if(0!==a){if(h=l.value,!0!==r||null===h){let t=n+4*a,r=i.matrixWorldInverse;o.getNormalMatrix(r),(null===h||h.length<t)&&(h=new Float32Array(t));for(let t=0,i=n;t!==a;++t,i+=4)s.copy(e[t]).applyMatrix4(r,o),s.normal.toArray(h,i),h[i+3]=s.constant}l.value=h,l.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,h}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let i=0!==e.length||t||// enable state of previous frame - the clipping code has to
// run another frame in order to reset the state:
0!==n||r;return r=t,n=e.length,i},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){i=h(e,t,0)},this.setState=function(s,o,c){let u=s.clippingPlanes,d=s.clipIntersection,p=s.clipShadows,f=e.get(s);if(r&&null!==u&&0!==u.length&&(!a||p)){let e=a?0:n,t=4*e,r=f.clippingState||null;l.value=r,r=h(u,o,t,c);for(let e=0;e!==t;++e)r[e]=i[e];f.clippingState=r,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=e}else // there's no local clipping
a?h(null):(l.value!==i&&(l.value=i,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0)}}function il(e){let t=new WeakMap;function i(e,t){return 303===t?e.mapping=301:304===t&&(e.mapping=302),e}function n(e){let i=e.target;i.removeEventListener("dispose",n);let r=t.get(i);void 0!==r&&(t.delete(i),r.dispose())}return{get:function(r){if(r&&r.isTexture&&!1===r.isRenderTargetTexture){let a=r.mapping;if(303===a||304===a){if(t.has(r)){let e=t.get(r).texture;return i(e,r.mapping)}{let a=r.image;if(!a||!(a.height>0))return null;{let s=new tJ(a.height/2);return s.fromEquirectangularTexture(e,r),t.set(r,s),r.addEventListener("dispose",n),i(s.texture,r.mapping)}}}}return r},dispose:function(){t=new WeakMap}}}class ih extends tX{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=null===e.view?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-e,a=i+e,s=n+t,o=n-t;if(null!==this.view&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=e*this.view.offsetX,a=r+e*this.view.width,s-=t*this.view.offsetY,o=s-t*this.view.height}this.projectionMatrix.makeOrthographic(r,a,s,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,null!==this.view&&(t.object.view=Object.assign({},this.view)),t}}// The standard deviations (radians) associated with the extra mips. These are
// chosen to approximate a Trowbridge-Reitz distribution function times the
// geometric shadowing function. These sigma values squared must match the
// variance #defines in cube_uv_reflection_fragment.glsl.js.
const ic=[.125,.215,.35,.446,.526,.582],iu=/*@__PURE__*/new ih,id=/*@__PURE__*/new ta;let ip=null;// Golden Ratio
const im=(1+Math.sqrt(5))/2,ig=1/im,iv=[/*@__PURE__*/new Z(1,1,1),/*@__PURE__*/new Z(-1,1,1),/*@__PURE__*/new Z(1,1,-1),/*@__PURE__*/new Z(-1,1,-1),/*@__PURE__*/new Z(0,im,ig),/*@__PURE__*/new Z(0,im,-ig),/*@__PURE__*/new Z(ig,0,im),/*@__PURE__*/new Z(-ig,0,im),/*@__PURE__*/new Z(im,ig,0),/*@__PURE__*/new Z(-im,ig,0)];/**
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map
 * (PMREM) from a cubeMap environment texture. This allows different levels of
 * blur to be quickly accessed based on material roughness. It is packed into a
 * special CubeUV format that allows us to perform custom interpolation so that
 * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
 * chain, it only goes down to the LOD_MIN level (above), and then creates extra
 * even more filtered 'mips' at the same LOD_MIN resolution, associated with
 * higher roughness levels. In this way we maintain resolution to smoothly
 * interpolate diffuse lighting while limiting sampling computation.
 *
 * Paper: Fast, Accurate Image-Based Lighting
 * https://drive.google.com/file/d/15y8r_UpKlU9SvV4ILb0C3qCPecS8pvLz/view
*/class iy{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}/**
	 * Generates a PMREM from a supplied Scene, which can be faster than using an
	 * image if networking bandwidth is low. Optional sigma specifies a blur radius
	 * in radians to be applied to the scene before PMREM generation. Optional near
	 * and far planes ensure the scene is rendered in its entirety (the cubeCamera
	 * is placed at the origin).
	 */fromScene(e,t=0,i=.1,n=100){ip=this._renderer.getRenderTarget(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}/**
	 * Generates a PMREM from an equirectangular texture, which can be either LDR
	 * or HDR. The ideal input image size is 1k (1024 x 512),
	 * as this matches best with the 256 x 256 cubemap output.
	 */fromEquirectangular(e,t=null){return this._fromTexture(e,t)}/**
	 * Generates a PMREM from an cubemap texture, which can be either LDR
	 * or HDR. The ideal input cube size is 256 x 256,
	 * as this matches best with the 256 x 256 cubemap output.
	 */fromCubemap(e,t=null){return this._fromTexture(e,t)}/**
	 * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
	 * your texture's network fetch for increased concurrency.
	 */compileCubemapShader(){null===this._cubemapMaterial&&(this._cubemapMaterial=ib(),this._compileMaterial(this._cubemapMaterial))}/**
	 * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
	 * your texture's network fetch for increased concurrency.
	 */compileEquirectangularShader(){null===this._equirectMaterial&&(this._equirectMaterial=iw(),this._compileMaterial(this._equirectMaterial))}/**
	 * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
	 * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
	 * one of them will cause any others to also become unusable.
	 */dispose(){this._dispose(),null!==this._cubemapMaterial&&this._cubemapMaterial.dispose(),null!==this._equirectMaterial&&this._equirectMaterial.dispose()}// private interface
_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){null!==this._blurMaterial&&this._blurMaterial.dispose(),null!==this._pingPongRenderTarget&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ip),e.scissorTest=!1,i_(e,0,0,e.width,e.height)}_fromTexture(e,t){301===e.mapping||302===e.mapping?this._setSize(0===e.image.length?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ip=this._renderer.getRenderTarget();let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:u,depthBuffer:!1},n=ix(e,t,i);if(null===this._pingPongRenderTarget||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){null!==this._pingPongRenderTarget&&this._dispose(),this._pingPongRenderTarget=ix(e,t,i);let{_lodMax:n}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(e){let t=[],i=[],n=[],r=e,a=e-4+1+ic.length;for(let s=0;s<a;s++){let a=Math.pow(2,r);i.push(a);let o=1/a;s>e-4?o=ic[s-e+4-1]:0===s&&(o=0),n.push(o);let l=1/(a-2),h=-l,c=1+l,u=[h,h,c,h,c,c,h,h,c,c,h,c],d=new Float32Array(108),p=new Float32Array(72),f=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,i=e>2?0:-1,n=[t,i,0,t+2/3,i,0,t+2/3,i+1,0,t,i,0,t+2/3,i+1,0,t,i+1,0];d.set(n,18*e),p.set(u,12*e);let r=[e,e,e,e,e,e];f.set(r,6*e)}let m=new tw;m.setAttribute("position",new tc(d,3)),m.setAttribute("uv",new tc(p,2)),m.setAttribute("faceIndex",new tc(f,1)),t.push(m),r>4&&r--}return{lodPlanes:t,sizeLods:i,sigmas:n}}(n)),this._blurMaterial=function(e,t,i){let n=new Float32Array(20),r=new Z(0,1,0),a=new tj({name:"SphericalGaussianBlur",defines:{n:20,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:iM(),fragmentShader:/* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1});return a}(n,e,t)}return n}_compileMaterial(e){let t=new tF(this._lodPlanes[0],e);this._renderer.compile(t,iu)}_sceneToCubeUV(e,t,i,n){let r=new tY(90,1,t,i),a=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],o=this._renderer,l=o.autoClear,h=o.toneMapping;o.getClearColor(id),o.toneMapping=0,o.autoClear=!1;let c=new to({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),u=new tF(new tH,c),d=!1,p=e.background;p?p.isColor&&(c.color.copy(p),e.background=null,d=!0):(c.color.copy(id),d=!0);for(let t=0;t<6;t++){let i=t%3;0===i?(r.up.set(0,a[t],0),r.lookAt(s[t],0,0)):1===i?(r.up.set(0,0,a[t]),r.lookAt(0,s[t],0)):(r.up.set(0,a[t],0),r.lookAt(0,0,s[t]));let l=this._cubeSize;i_(n,i*l,t>2?l:0,l,l),o.setRenderTarget(n),d&&o.render(u,r),o.render(e,r)}u.geometry.dispose(),u.material.dispose(),o.toneMapping=h,o.autoClear=l,e.background=p}_textureToCubeUV(e,t){let i=this._renderer,n=301===e.mapping||302===e.mapping;n?(null===this._cubemapMaterial&&(this._cubemapMaterial=ib()),this._cubemapMaterial.uniforms.flipEnvMap.value=!1===e.isRenderTargetTexture?-1:1):null===this._equirectMaterial&&(this._equirectMaterial=iw());let r=n?this._cubemapMaterial:this._equirectMaterial,a=new tF(this._lodPlanes[0],r),s=r.uniforms;s.envMap.value=e;let o=this._cubeSize;i_(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(a,iu)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let t=1;t<this._lodPlanes.length;t++){let i=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),n=iv[(t-1)%iv.length];this._blur(e,t-1,t,i,n)}t.autoClear=i}/**
	 * This is a two-pass Gaussian blur for a cubemap. Normally this is done
	 * vertically and horizontally, but this breaks down on a cube. Here we apply
	 * the blur latitudinally (around the poles), and then longitudinally (towards
	 * the poles) to approximate the orthogonally-separable blur. It is least
	 * accurate at the poles, but still does a decent job.
	 */_blur(e,t,i,n,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,s){let o=this._renderer,l=this._blurMaterial;"latitudinal"!==a&&"longitudinal"!==a&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new tF(this._lodPlanes[n],l),c=l.uniforms,u=this._sizeLods[i]-1,d=isFinite(r)?Math.PI/(2*u):2*Math.PI/39,p=r/d,f=isFinite(r)?1+Math.floor(3*p):20;f>20&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);let m=[],g=0;for(let e=0;e<20;++e){let t=e/p,i=Math.exp(-t*t/2);m.push(i),0===e?g+=i:e<f&&(g+=2*i)}for(let e=0;e<m.length;e++)m[e]=m[e]/g;c.envMap.value=e.texture,c.samples.value=f,c.weights.value=m,c.latitudinal.value="latitudinal"===a,s&&(c.poleAxis.value=s);let{_lodMax:v}=this;c.dTheta.value=d,c.mipInt.value=v-i;let y=this._sizeLods[n],x=3*y*(n>v-4?n-v+4:0),_=4*(this._cubeSize-y);i_(t,x,_,3*y,2*y),o.setRenderTarget(t),o.render(h,iu)}}function ix(e,t,i){let n=new j(e,t,i);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function i_(e,t,i,n,r){e.viewport.set(t,i,n,r),e.scissor.set(t,i,n,r)}function iw(){return new tj({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:iM(),fragmentShader:/* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ib(){return new tj({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:iM(),fragmentShader:/* glsl */`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function iM(){return/* glsl */`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function iS(e){let t=new WeakMap,i=null;function n(e){let i=e.target;i.removeEventListener("dispose",n);let r=t.get(i);void 0!==r&&(t.delete(i),r.dispose())}return{get:function(r){if(r&&r.isTexture){let a=r.mapping,s=303===a||304===a,o=301===a||302===a;// equirect/cube map to cubeUV conversion
if(s||o){if(r.isRenderTargetTexture&&!0===r.needsPMREMUpdate){r.needsPMREMUpdate=!1;let n=t.get(r);return null===i&&(i=new iy(e)),n=s?i.fromEquirectangular(r,n):i.fromCubemap(r,n),t.set(r,n),n.texture}if(t.has(r))return t.get(r).texture;{let a=r.image;if(!(s&&a&&a.height>0||o&&a&&function(e){let t=0;for(let i=0;i<6;i++)void 0!==e[i]&&t++;return 6===t}(a)))return null;{null===i&&(i=new iy(e));let a=s?i.fromEquirectangular(r):i.fromCubemap(r);return t.set(r,a),r.addEventListener("dispose",n),a.texture}}}}return r},dispose:function(){t=new WeakMap,null!==i&&(i.dispose(),i=null)}}}function iE(e){let t={};function i(i){let n;if(void 0!==t[i])return t[i];switch(i){case"WEBGL_depth_texture":n=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=e.getExtension(i)}return t[i]=n,n}return{has:function(e){return null!==i(e)},init:function(e){e.isWebGL2?i("EXT_color_buffer_float"):(i("WEBGL_depth_texture"),i("OES_texture_float"),i("OES_texture_half_float"),i("OES_texture_half_float_linear"),i("OES_standard_derivatives"),i("OES_element_index_uint"),i("OES_vertex_array_object"),i("ANGLE_instanced_arrays")),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture")},get:function(e){let t=i(e);return null===t&&console.warn("THREE.WebGLRenderer: "+e+" extension not supported."),t}}}function iT(e,t,i,n){let r={},a=new WeakMap;function s(e){let o=e.target;for(let e in null!==o.index&&t.remove(o.index),o.attributes)t.remove(o.attributes[e]);for(let e in o.morphAttributes){let i=o.morphAttributes[e];for(let e=0,n=i.length;e<n;e++)t.remove(i[e])}o.removeEventListener("dispose",s),delete r[o.id];let l=a.get(o);l&&(t.remove(l),a.delete(o)),n.releaseStatesOfGeometry(o),!0===o.isInstancedBufferGeometry&&delete o._maxInstanceCount,//
i.memory.geometries--}function o(e){let i=[],n=e.index,r=e.attributes.position,s=0;if(null!==n){let e=n.array;s=n.version;for(let t=0,n=e.length;t<n;t+=3){let n=e[t+0],r=e[t+1],a=e[t+2];i.push(n,r,r,a,a,n)}}else{if(void 0===r)return;let e=r.array;s=r.version;for(let t=0,n=e.length/3-1;t<n;t+=3){let e=t+0,n=t+1,r=t+2;i.push(e,n,n,r,r,e)}}let o=new(A(i)?td:tu)(i,1);o.version=s;// Updating index buffer in VAO now. See WebGLBindingStates
//
let l=a.get(e);l&&t.remove(l),//
a.set(e,o)}return{get:function(e,t){return!0===r[t.id]||(t.addEventListener("dispose",s),r[t.id]=!0,i.memory.geometries++),t},update:function(i){let n=i.attributes;// Updating index buffer in VAO now. See WebGLBindingStates.
for(let i in n)t.update(n[i],e.ARRAY_BUFFER);// morph targets
let r=i.morphAttributes;for(let i in r){let n=r[i];for(let i=0,r=n.length;i<r;i++)t.update(n[i],e.ARRAY_BUFFER)}},getWireframeAttribute:function(e){let t=a.get(e);if(t){let i=e.index;null!==i&&t.version<i.version&&o(e)}else o(e);return a.get(e)}}}function iA(e,t,i,n){let r,a,s;let o=n.isWebGL2;//
this.setMode=function(e){r=e},this.setIndex=function(e){a=e.type,s=e.bytesPerElement},this.render=function(t,n){e.drawElements(r,n,a,t*s),i.update(n,r,1)},this.renderInstances=function(n,l,h){let c,u;if(0!==h){if(o)c=e,u="drawElementsInstanced";else if(c=t.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",null===c){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}c[u](r,l,a,n*s,h),i.update(l,r,h)}}}function iR(e){let t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function(){t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(i,n,r){switch(t.calls++,n){case e.TRIANGLES:t.triangles+=r*(i/3);break;case e.LINES:t.lines+=r*(i/2);break;case e.LINE_STRIP:t.lines+=r*(i-1);break;case e.LINE_LOOP:t.lines+=r*i;break;case e.POINTS:t.points+=r*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function iC(e,t){return e[0]-t[0]}function iP(e,t){return Math.abs(t[1])-Math.abs(e[1])}function iL(e,t,i){let n={},r=new Float32Array(8),a=new WeakMap,s=new G,o=[];for(let e=0;e<8;e++)o[e]=[e,0];return{update:function(l,h,c){let u=l.morphTargetInfluences;if(!0===t.isWebGL2){// instead of using attributes, the WebGL 2 code path encodes morph targets
// into an array of data textures. Each layer represents a single morph target.
let n=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,r=void 0!==n?n.length:0,o=a.get(h);if(void 0===o||o.count!==r){void 0!==o&&o.texture.dispose();let e=void 0!==h.morphAttributes.position,i=void 0!==h.morphAttributes.normal,n=void 0!==h.morphAttributes.color,l=h.morphAttributes.position||[],c=h.morphAttributes.normal||[],u=h.morphAttributes.color||[],d=0;!0===e&&(d=1),!0===i&&(d=2),!0===n&&(d=3);let p=h.attributes.position.count*d,f=1;p>t.maxTextureSize&&(f=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let m=new Float32Array(p*f*4*r),g=new X(m,p,f,r);g.type=1015,g.needsUpdate=!0;// fill buffer
let v=4*d;for(let t=0;t<r;t++){let r=l[t],a=c[t],o=u[t],h=p*f*4*t;for(let t=0;t<r.count;t++){let l=t*v;!0===e&&(s.fromBufferAttribute(r,t),m[h+l+0]=s.x,m[h+l+1]=s.y,m[h+l+2]=s.z,m[h+l+3]=0),!0===i&&(s.fromBufferAttribute(a,t),m[h+l+4]=s.x,m[h+l+5]=s.y,m[h+l+6]=s.z,m[h+l+7]=0),!0===n&&(s.fromBufferAttribute(o,t),m[h+l+8]=s.x,m[h+l+9]=s.y,m[h+l+10]=s.z,m[h+l+11]=4===o.itemSize?s.w:1)}}o={count:r,texture:g,size:new S(p,f)},a.set(h,o),h.addEventListener("dispose",function e(){g.dispose(),a.delete(h),h.removeEventListener("dispose",e)})}//
let l=0;for(let e=0;e<u.length;e++)l+=u[e];let d=h.morphTargetsRelative?1:1-l;c.getUniforms().setValue(e,"morphTargetBaseInfluence",d),c.getUniforms().setValue(e,"morphTargetInfluences",u),c.getUniforms().setValue(e,"morphTargetsTexture",o.texture,i),c.getUniforms().setValue(e,"morphTargetsTextureSize",o.size)}else{// When object doesn't have morph target influences defined, we treat it as a 0-length array
// This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences
let t=void 0===u?0:u.length,i=n[h.id];if(void 0===i||i.length!==t){// initialise list
i=[];for(let e=0;e<t;e++)i[e]=[e,0];n[h.id]=i}// Collect influences
for(let e=0;e<t;e++){let t=i[e];t[0]=e,t[1]=u[e]}i.sort(iP);for(let e=0;e<8;e++)e<t&&i[e][1]?(o[e][0]=i[e][0],o[e][1]=i[e][1]):(o[e][0]=Number.MAX_SAFE_INTEGER,o[e][1]=0);o.sort(iC);let a=h.morphAttributes.position,s=h.morphAttributes.normal,l=0;for(let e=0;e<8;e++){let t=o[e],i=t[0],n=t[1];i!==Number.MAX_SAFE_INTEGER&&n?(a&&h.getAttribute("morphTarget"+e)!==a[i]&&h.setAttribute("morphTarget"+e,a[i]),s&&h.getAttribute("morphNormal"+e)!==s[i]&&h.setAttribute("morphNormal"+e,s[i]),r[e]=n,l+=n):(a&&!0===h.hasAttribute("morphTarget"+e)&&h.deleteAttribute("morphTarget"+e),s&&!0===h.hasAttribute("morphNormal"+e)&&h.deleteAttribute("morphNormal"+e),r[e]=0)}// GLSL shader uses formula baseinfluence * base + sum(target * influence)
// This allows us to switch between absolute morphs and relative morphs without changing shader code
// When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
let d=h.morphTargetsRelative?1:1-l;c.getUniforms().setValue(e,"morphTargetBaseInfluence",d),c.getUniforms().setValue(e,"morphTargetInfluences",r)}}}}function iN(e,t,i,n){let r=new WeakMap;function a(e){let t=e.target;t.removeEventListener("dispose",a),i.remove(t.instanceMatrix),null!==t.instanceColor&&i.remove(t.instanceColor)}return{update:function(s){let o=n.render.frame,l=s.geometry,h=t.get(s,l);if(r.get(h)!==o&&(t.update(h),r.set(h,o)),s.isInstancedMesh&&(!1===s.hasEventListener("dispose",a)&&s.addEventListener("dispose",a),r.get(s)!==o&&(i.update(s.instanceMatrix,e.ARRAY_BUFFER),null!==s.instanceColor&&i.update(s.instanceColor,e.ARRAY_BUFFER),r.set(s,o))),s.isSkinnedMesh){let e=s.skeleton;r.get(e)!==o&&(e.update(),r.set(e,o))}return h},dispose:function(){r=new WeakMap}}}/**
 * Uniforms of a program.
 * Those form a tree structure with a special top-level container for the root,
 * which you get by calling 'new WebGLUniforms( gl, program )'.
 *
 *
 * Properties of inner nodes including the top-level container:
 *
 * .seq - array of nested uniforms
 * .map - nested uniforms by name
 *
 *
 * Methods of all nodes except the top-level container:
 *
 * .setValue( gl, value, [textures] )
 *
 * 		uploads a uniform value(s)
 *  	the 'textures' parameter is needed for sampler uniforms
 *
 *
 * Static methods of the top-level container (textures factorizations):
 *
 * .upload( gl, seq, values, textures )
 *
 * 		sets uniforms in 'seq' to 'values[id].value'
 *
 * .seqWithValue( seq, values ) : filteredSeq
 *
 * 		filters 'seq' entries with corresponding entry in values
 *
 *
 * Methods of the top-level container (textures factorizations):
 *
 * .setValue( gl, name, value, textures )
 *
 * 		sets uniform with  name 'name' to 'value'
 *
 * .setOptional( gl, obj, prop )
 *
 * 		like .set for an optional property of the object
 *
 */const iI=/*@__PURE__*/new k,iU=/*@__PURE__*/new X,iD=/*@__PURE__*/new class extends k{constructor(e=null,t=1,i=1,n=1){// We're going to add .setXXX() methods for setting properties later.
// Users can still set in DataTexture3D directly.
//
//	const texture = new THREE.DataTexture3D( data, width, height, depth );
// 	texture.anisotropy = 16;
//
// See #14839
super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},iO=/*@__PURE__*/new tK,iz=[],iB=[],iF=new Float32Array(16),iV=new Float32Array(9),iH=new Float32Array(4);// Flattening for arrays of vectors and matrices
function iW(e,t,i){let n=e[0];if(n<=0||n>0)return e;// unoptimized: ! isNaN( firstElem )
// see http://jacksondunstan.com/articles/983
let r=t*i,a=iz[r];if(void 0===a&&(a=new Float32Array(r),iz[r]=a),0!==t){n.toArray(a,0);for(let n=1,r=0;n!==t;++n)r+=i,e[n].toArray(a,r)}return a}function ik(e,t){if(e.length!==t.length)return!1;for(let i=0,n=e.length;i<n;i++)if(e[i]!==t[i])return!1;return!0}function iG(e,t){for(let i=0,n=t.length;i<n;i++)e[i]=t[i]}// Texture unit allocation
function iq(e,t){let i=iB[t];void 0===i&&(i=new Int32Array(t),iB[t]=i);for(let n=0;n!==t;++n)i[n]=e.allocateTextureUnit();return i}// --- Setters ---
// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.
// Single scalar
function ij(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}// Single float vector (from flat array or THREE.VectorN)
function iX(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ik(i,t))return;e.uniform2fv(this.addr,t),iG(i,t)}}function iY(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(void 0!==t.r)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(ik(i,t))return;e.uniform3fv(this.addr,t),iG(i,t)}}function iZ(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ik(i,t))return;e.uniform4fv(this.addr,t),iG(i,t)}}// Single matrix (from flat array or THREE.MatrixN)
function iK(e,t){let i=this.cache,n=t.elements;if(void 0===n){if(ik(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),iG(i,t)}else{if(ik(i,n))return;iH.set(n),e.uniformMatrix2fv(this.addr,!1,iH),iG(i,n)}}function iJ(e,t){let i=this.cache,n=t.elements;if(void 0===n){if(ik(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),iG(i,t)}else{if(ik(i,n))return;iV.set(n),e.uniformMatrix3fv(this.addr,!1,iV),iG(i,n)}}function iQ(e,t){let i=this.cache,n=t.elements;if(void 0===n){if(ik(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),iG(i,t)}else{if(ik(i,n))return;iF.set(n),e.uniformMatrix4fv(this.addr,!1,iF),iG(i,n)}}// Single integer / boolean
function i$(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}// Single integer / boolean vector (from flat array or THREE.VectorN)
function i0(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ik(i,t))return;e.uniform2iv(this.addr,t),iG(i,t)}}function i1(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(ik(i,t))return;e.uniform3iv(this.addr,t),iG(i,t)}}function i2(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ik(i,t))return;e.uniform4iv(this.addr,t),iG(i,t)}}// Single unsigned integer
function i3(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}// Single unsigned integer vector (from flat array or THREE.VectorN)
function i4(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ik(i,t))return;e.uniform2uiv(this.addr,t),iG(i,t)}}function i5(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(ik(i,t))return;e.uniform3uiv(this.addr,t),iG(i,t)}}function i6(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ik(i,t))return;e.uniform4uiv(this.addr,t),iG(i,t)}}// Single texture (2D / Cube)
function i7(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture2D(t||iI,r)}function i8(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture3D(t||iD,r)}function i9(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTextureCube(t||iO,r)}function ne(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture2DArray(t||iU,r)}// Array of scalars
function nt(e,t){e.uniform1fv(this.addr,t)}// Array of vectors (from flat array or array of THREE.VectorN)
function ni(e,t){let i=iW(t,this.size,2);e.uniform2fv(this.addr,i)}function nn(e,t){let i=iW(t,this.size,3);e.uniform3fv(this.addr,i)}function nr(e,t){let i=iW(t,this.size,4);e.uniform4fv(this.addr,i)}// Array of matrices (from flat array or array of THREE.MatrixN)
function na(e,t){let i=iW(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function ns(e,t){let i=iW(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function no(e,t){let i=iW(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}// Array of integer / boolean
function nl(e,t){e.uniform1iv(this.addr,t)}// Array of integer / boolean vectors (from flat array)
function nh(e,t){e.uniform2iv(this.addr,t)}function nc(e,t){e.uniform3iv(this.addr,t)}function nu(e,t){e.uniform4iv(this.addr,t)}// Array of unsigned integer
function nd(e,t){e.uniform1uiv(this.addr,t)}// Array of unsigned integer vectors (from flat array)
function np(e,t){e.uniform2uiv(this.addr,t)}function nf(e,t){e.uniform3uiv(this.addr,t)}function nm(e,t){e.uniform4uiv(this.addr,t)}// Array of textures (2D / 3D / Cube / 2DArray)
function ng(e,t,i){let n=this.cache,r=t.length,a=iq(i,r);ik(n,a)||(e.uniform1iv(this.addr,a),iG(n,a));for(let e=0;e!==r;++e)i.setTexture2D(t[e]||iI,a[e])}function nv(e,t,i){let n=this.cache,r=t.length,a=iq(i,r);ik(n,a)||(e.uniform1iv(this.addr,a),iG(n,a));for(let e=0;e!==r;++e)i.setTexture3D(t[e]||iD,a[e])}function ny(e,t,i){let n=this.cache,r=t.length,a=iq(i,r);ik(n,a)||(e.uniform1iv(this.addr,a),iG(n,a));for(let e=0;e!==r;++e)i.setTextureCube(t[e]||iO,a[e])}function nx(e,t,i){let n=this.cache,r=t.length,a=iq(i,r);ik(n,a)||(e.uniform1iv(this.addr,a),iG(n,a));for(let e=0;e!==r;++e)i.setTexture2DArray(t[e]||iU,a[e])}// --- Uniform Classes ---
class n_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=// Helper to pick the right setter for the singular case
function(e){switch(e){case 5126:return ij;// FLOAT
case 35664:return iX;// _VEC2
case 35665:return iY;// _VEC3
case 35666:return iZ;// _VEC4
case 35674:return iK;// _MAT2
case 35675:return iJ;// _MAT3
case 35676:return iQ;// _MAT4
case 5124:case 35670:return i$;// INT, BOOL
case 35667:case 35671:return i0;// _VEC2
case 35668:case 35672:return i1;// _VEC3
case 35669:case 35673:return i2;// _VEC4
case 5125:return i3;// UINT
case 36294:return i4;// _VEC2
case 36295:return i5;// _VEC3
case 36296:return i6;// _VEC4
case 35678:case 36198:case 36298:case 36306:case 35682:return i7;case 35679:case 36299:case 36307:return i8;case 35680:case 36300:case 36308:case 36293:return i9;case 36289:case 36303:case 36311:case 36292:return ne}}(t.type);// this.path = activeInfo.name; // DEBUG
}}class nw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=// Helper to pick the right setter for a pure (bottom-level) array
function(e){switch(e){case 5126:return nt;// FLOAT
case 35664:return ni;// _VEC2
case 35665:return nn;// _VEC3
case 35666:return nr;// _VEC4
case 35674:return na;// _MAT2
case 35675:return ns;// _MAT3
case 35676:return no;// _MAT4
case 5124:case 35670:return nl;// INT, BOOL
case 35667:case 35671:return nh;// _VEC2
case 35668:case 35672:return nc;// _VEC3
case 35669:case 35673:return nu;// _VEC4
case 5125:return nd;// UINT
case 36294:return np;// _VEC2
case 36295:return nf;// _VEC3
case 36296:return nm;// _VEC4
case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return ny;case 36289:case 36303:case 36311:case 36292:return nx}}(t.type);// this.path = activeInfo.name; // DEBUG
}}class nb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let a=n[r];a.setValue(e,t[a.id],i)}}}// --- Top-level ---
// Parser - builds up the property tree from the path strings
const nM=/(\w+)(\])?(\[|\.)?/g;// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.
function nS(e,t){e.seq.push(t),e.map[t.id]=t}// Root Container
class nE{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let i=e.getActiveUniform(t,n),r=e.getUniformLocation(t,i.name);!function(e,t,i){let n=e.name,r=n.length;for(// reset RegExp object, because of the early exit of a previous run
nM.lastIndex=0;;){let a=nM.exec(n),s=nM.lastIndex,o=a[1],l="]"===a[2],h=a[3];if(l&&(o|=0),void 0===h||"["===h&&s+2===r){// bare name or "pure" bottom-level array "[0]" suffix
nS(i,void 0===h?new n_(o,e,t):new nw(o,e,t));break}{// step into inner node / create it in case it doesn't exist
let e=i.map,t=e[o];void 0===t&&nS(i,t=new nb(o)),i=t}}}(i,r,this)}}setValue(e,t,i,n){let r=this.map[t];void 0!==r&&r.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];void 0!==n&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){let a=t[r],s=i[a.id];!1!==s.needsUpdate&&a.setValue(e,s.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,r=e.length;n!==r;++n){let r=e[n];r.id in t&&i.push(r)}return i}}function nT(e,t,i){let n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),n}let nA=0;function nR(e,t,i){let n=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(n&&""===r)return"";let a=/ERROR: 0:(\d+)/.exec(r);if(!a)return r;{// --enable-privileged-webgl-extension
// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );
let n=parseInt(a[1]);return i.toUpperCase()+"\n\n"+r+"\n\n"+function(e,t){let i=e.split("\n"),n=[],r=Math.max(t-6,0),a=Math.min(t+6,i.length);for(let e=r;e<a;e++){let r=e+1;n.push(`${r===t?">":" "} ${r}: ${i[e]}`)}return n.join("\n")}(e.getShaderSource(t),n)}}function nC(e){return""!==e}function nP(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nL(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}// Resolve Includes
const nN=/^[ \t]*#include +<([\w\d./]+)>/gm;function nI(e){return e.replace(nN,nD)}const nU=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function nD(e,t){let i=t8[t];if(void 0===i){let e=nU.get(t);if(void 0!==e)i=t8[e],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,e);else throw Error("Can not resolve #include <"+t+">")}return nI(i)}// Unroll Loops
const nO=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nz(e){return e.replace(nO,nB)}function nB(e,t,i,n){let r="";for(let e=parseInt(t);e<parseInt(i);e++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+e+" ]").replace(/UNROLLED_LOOP_INDEX/g,e);return r}//
function nF(e){let t="precision "+e.precision+" float;\nprecision "+e.precision+" int;";return"highp"===e.precision?t+="\n#define HIGH_PRECISION":"mediump"===e.precision?t+="\n#define MEDIUM_PRECISION":"lowp"===e.precision&&(t+="\n#define LOW_PRECISION"),t}function nV(e,t,i,n){let r,a,s,o,l,h;// TODO Send this event to Three.js DevTools
// console.log( 'WebGLProgram', cacheKey );
let d=e.getContext(),f=i.defines,m=i.vertexShader,g=i.fragmentShader,v=(l="SHADOWMAP_TYPE_BASIC",1===i.shadowMapType?l="SHADOWMAP_TYPE_PCF":2===i.shadowMapType?l="SHADOWMAP_TYPE_PCF_SOFT":3===i.shadowMapType&&(l="SHADOWMAP_TYPE_VSM"),l),y=function(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:t="ENVMAP_TYPE_CUBE_UV"}return t}(i),x=(h="ENVMAP_MODE_REFLECTION",i.envMap&&302===i.envMapMode&&(h="ENVMAP_MODE_REFRACTION"),h),_=function(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD"}return t}(i),w=function(e){let t=e.envMapCubeUVHeight;if(null===t)return null;let i=Math.log2(t)-2;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:1/t,maxMip:i}}(i),b=i.isWebGL2?"":function(e){let t=[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||"physical"===e.shaderID?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""];return t.filter(nC).join("\n")}(i),M=function(e){let t=[];for(let i in e){let n=e[i];!1!==n&&t.push("#define "+i+" "+n)}return t.join("\n")}(f),S=d.createProgram(),E=i.glslVersion?"#version "+i.glslVersion+"\n":"";i.isRawShaderMaterial?((r=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(nC).join("\n")).length>0&&(r+="\n"),(a=[b,"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(nC).join("\n")).length>0&&(a+="\n")):(r=[nF(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",//
i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",//
i.vertexTangents&&!1===i.flatShading?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&!1===i.flatShading?"#define USE_MORPHNORMALS":"",i.morphColors&&i.isWebGL2?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+v:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif","\n"].filter(nC).join("\n"),a=[b,nF(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+y:"",i.envMap?"#define "+x:"",i.envMap?"#define "+_:"",w?"#define CUBEUV_TEXEL_WIDTH "+w.texelWidth:"",w?"#define CUBEUV_TEXEL_HEIGHT "+w.texelHeight:"",w?"#define CUBEUV_MAX_MIP "+w.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&!1===i.flatShading?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+v:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",0!==i.toneMapping?"#define TONE_MAPPING":"",0!==i.toneMapping?t8.tonemapping_pars_fragment:"",0!==i.toneMapping?function(e,t){let i;switch(t){case 1:i="Linear";break;case 2:i="Reinhard";break;case 3:i="OptimizedCineon";break;case 4:i="ACESFilmic";break;case 5:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",t8.colorspace_pars_fragment,function(e,t){let i=function(e){switch(e){case u:return["Linear","( value )"];case c:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),["Linear","( value )"]}}(t);return"vec4 "+e+"( vec4 value ) { return LinearTo"+i[0]+i[1]+"; }"}("linearToOutputTexel",i.outputColorSpace),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"","\n"].filter(nC).join("\n")),m=nL(m=nP(m=nI(m),i),i),g=nL(g=nP(g=nI(g),i),i),m=nz(m),g=nz(g),i.isWebGL2&&!0!==i.isRawShaderMaterial&&(// GLSL 3.0 conversion for built-in materials and ShaderMaterial
E="#version 300 es\n",r="precision mediump sampler2DArray;\n#define attribute in\n#define varying out\n#define texture2D texture\n"+r,a=["#define varying in",i.glslVersion===p?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===p?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+a);let T=E+r+m,A=E+a+g,R=nT(d,d.VERTEX_SHADER,T),C=nT(d,d.FRAGMENT_SHADER,A);// check for link errors
if(d.attachShader(S,R),d.attachShader(S,C),void 0!==i.index0AttributeName?d.bindAttribLocation(S,0,i.index0AttributeName):!0===i.morphTargets&&d.bindAttribLocation(S,0,"position"),d.linkProgram(S),e.debug.checkShaderErrors){let t=d.getProgramInfoLog(S).trim(),i=d.getShaderInfoLog(R).trim(),n=d.getShaderInfoLog(C).trim(),s=!0,o=!0;if(!1===d.getProgramParameter(S,d.LINK_STATUS)){if(s=!1,"function"==typeof e.debug.onShaderError)e.debug.onShaderError(d,S,R,C);else{// default error reporting
let e=nR(d,R,"vertex"),i=nR(d,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+d.getError()+" - VALIDATE_STATUS "+d.getProgramParameter(S,d.VALIDATE_STATUS)+"\n\nProgram Info Log: "+t+"\n"+e+"\n"+i)}}else""!==t?console.warn("THREE.WebGLProgram: Program Info Log:",t):(""===i||""===n)&&(o=!1);o&&(this.diagnostics={runnable:s,programLog:t,vertexShader:{log:i,prefix:r},fragmentShader:{log:n,prefix:a}})}return(// Clean up
// Crashes in iOS9 and iOS10. #18402
// gl.detachShader( program, glVertexShader );
// gl.detachShader( program, glFragmentShader );
d.deleteShader(R),d.deleteShader(C),this.getUniforms=function(){return void 0===s&&(s=new nE(d,S)),s},this.getAttributes=function(){return void 0===o&&(o=function(e,t){let i={},n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let n=e.getActiveAttrib(t,r),a=n.name,s=1;n.type===e.FLOAT_MAT2&&(s=2),n.type===e.FLOAT_MAT3&&(s=3),n.type===e.FLOAT_MAT4&&(s=4),// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );
i[a]={type:n.type,location:e.getAttribLocation(t,a),locationSize:s}}return i}(d,S)),o},// free resource
this.destroy=function(){n.releaseStatesOfProgram(this),d.deleteProgram(S),this.program=void 0},//
this.type=i.shaderType,this.name=i.shaderName,this.id=nA++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=C,this)}let nH=0;class nW{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return!1===a.has(n)&&(a.add(n),n.usedTimes++),!1===a.has(r)&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,0===e.usedTimes&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return void 0===i&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return void 0===i&&(i=new nk(e),t.set(e,i)),i}}class nk{constructor(e){this.id=nH++,this.code=e,this.usedTimes=0}}function nG(e,t,i,n,r,a,s){let o=new eO,l=new nW,h=[],d=r.isWebGL2,p=r.logarithmicDepthBuffer,f=r.vertexTextures,m=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(e){return 0===e?"uv":`uv${e}`}return{getParameters:function(a,o,h,y,x){let _,w,b,M;let S=y.fog,E=x.geometry,T=a.isMeshStandardMaterial?y.environment:null,A=(a.isMeshStandardMaterial?i:t).get(a.envMap||T),R=A&&306===A.mapping?A.image.height:null,C=g[a.type];null!==a.precision&&(m=r.getMaxPrecision(a.precision))!==a.precision&&console.warn("THREE.WebGLProgram.getParameters:",a.precision,"not supported, using",m,"instead.");//
let P=E.morphAttributes.position||E.morphAttributes.normal||E.morphAttributes.color,L=void 0!==P?P.length:0,N=0;if(void 0!==E.morphAttributes.position&&(N=1),void 0!==E.morphAttributes.normal&&(N=2),void 0!==E.morphAttributes.color&&(N=3),C){let e=ie[C];_=e.vertexShader,w=e.fragmentShader}else _=a.vertexShader,w=a.fragmentShader,l.update(a),b=l.getVertexShaderID(a),M=l.getFragmentShaderID(a);let I=e.getRenderTarget(),U=!0===x.isInstancedMesh,D=!!a.map,O=!!a.matcap,z=!!A,B=!!a.aoMap,F=!!a.lightMap,V=!!a.bumpMap,H=!!a.normalMap,W=!!a.displacementMap,k=!!a.emissiveMap,G=!!a.metalnessMap,q=!!a.roughnessMap,j=a.anisotropy>0,X=a.clearcoat>0,Y=a.iridescence>0,Z=a.sheen>0,K=a.transmission>0,J=j&&!!a.anisotropyMap,Q=X&&!!a.clearcoatMap,$=X&&!!a.clearcoatNormalMap,ee=X&&!!a.clearcoatRoughnessMap,et=Y&&!!a.iridescenceMap,ei=Y&&!!a.iridescenceThicknessMap,en=Z&&!!a.sheenColorMap,er=Z&&!!a.sheenRoughnessMap,ea=!!a.specularMap,es=!!a.specularColorMap,eo=!!a.specularIntensityMap,el=K&&!!a.transmissionMap,eh=K&&!!a.thicknessMap,ec=!!a.gradientMap,eu=!!a.alphaMap,ed=a.alphaTest>0,ep=!!a.alphaHash,ef=!!a.extensions,em=!!E.attributes.uv1,eg=!!E.attributes.uv2,ev=!!E.attributes.uv3,ey=0;a.toneMapped&&(null===I||!0===I.isXRRenderTarget)&&(ey=e.toneMapping);let ex={isWebGL2:d,shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:_,fragmentShader:w,defines:a.defines,customVertexShaderID:b,customFragmentShaderID:M,isRawShaderMaterial:!0===a.isRawShaderMaterial,glslVersion:a.glslVersion,precision:m,instancing:U,instancingColor:U&&null!==x.instanceColor,supportsVertexTextures:f,outputColorSpace:null===I?e.outputColorSpace:!0===I.isXRRenderTarget?I.texture.colorSpace:u,map:D,matcap:O,envMap:z,envMapMode:z&&A.mapping,envMapCubeUVHeight:R,aoMap:B,lightMap:F,bumpMap:V,normalMap:H,displacementMap:f&&W,emissiveMap:k,normalMapObjectSpace:H&&1===a.normalMapType,normalMapTangentSpace:H&&0===a.normalMapType,metalnessMap:G,roughnessMap:q,anisotropy:j,anisotropyMap:J,clearcoat:X,clearcoatMap:Q,clearcoatNormalMap:$,clearcoatRoughnessMap:ee,iridescence:Y,iridescenceMap:et,iridescenceThicknessMap:ei,sheen:Z,sheenColorMap:en,sheenRoughnessMap:er,specularMap:ea,specularColorMap:es,specularIntensityMap:eo,transmission:K,transmissionMap:el,thicknessMap:eh,gradientMap:ec,opaque:!1===a.transparent&&1===a.blending,alphaMap:eu,alphaTest:ed,alphaHash:ep,combine:a.combine,//
mapUv:D&&v(a.map.channel),aoMapUv:B&&v(a.aoMap.channel),lightMapUv:F&&v(a.lightMap.channel),bumpMapUv:V&&v(a.bumpMap.channel),normalMapUv:H&&v(a.normalMap.channel),displacementMapUv:W&&v(a.displacementMap.channel),emissiveMapUv:k&&v(a.emissiveMap.channel),metalnessMapUv:G&&v(a.metalnessMap.channel),roughnessMapUv:q&&v(a.roughnessMap.channel),anisotropyMapUv:J&&v(a.anisotropyMap.channel),clearcoatMapUv:Q&&v(a.clearcoatMap.channel),clearcoatNormalMapUv:$&&v(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(a.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&v(a.iridescenceMap.channel),iridescenceThicknessMapUv:ei&&v(a.iridescenceThicknessMap.channel),sheenColorMapUv:en&&v(a.sheenColorMap.channel),sheenRoughnessMapUv:er&&v(a.sheenRoughnessMap.channel),specularMapUv:ea&&v(a.specularMap.channel),specularColorMapUv:es&&v(a.specularColorMap.channel),specularIntensityMapUv:eo&&v(a.specularIntensityMap.channel),transmissionMapUv:el&&v(a.transmissionMap.channel),thicknessMapUv:eh&&v(a.thicknessMap.channel),alphaMapUv:eu&&v(a.alphaMap.channel),//
vertexTangents:!!E.attributes.tangent&&(H||j),vertexColors:a.vertexColors,vertexAlphas:!0===a.vertexColors&&!!E.attributes.color&&4===E.attributes.color.itemSize,vertexUv1s:em,vertexUv2s:eg,vertexUv3s:ev,pointsUvs:!0===x.isPoints&&!!E.attributes.uv&&(D||eu),fog:!!S,useFog:!0===a.fog,fogExp2:S&&S.isFogExp2,flatShading:!0===a.flatShading,sizeAttenuation:!0===a.sizeAttenuation,logarithmicDepthBuffer:p,skinning:!0===x.isSkinnedMesh,morphTargets:void 0!==E.morphAttributes.position,morphNormals:void 0!==E.morphAttributes.normal,morphColors:void 0!==E.morphAttributes.color,morphTargetsCount:L,morphTextureStride:N,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&h.length>0,shadowMapType:e.shadowMap.type,toneMapping:ey,useLegacyLights:e._useLegacyLights,decodeVideoTexture:D&&!0===a.map.isVideoTexture&&a.map.colorSpace===c,premultipliedAlpha:a.premultipliedAlpha,doubleSided:2===a.side,flipSided:1===a.side,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionDerivatives:ef&&!0===a.extensions.derivatives,extensionFragDepth:ef&&!0===a.extensions.fragDepth,extensionDrawBuffers:ef&&!0===a.extensions.drawBuffers,extensionShaderTextureLOD:ef&&!0===a.extensions.shaderTextureLOD,rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),customProgramCacheKey:a.customProgramCacheKey()};return ex},getProgramCacheKey:function(t){let i=[];if(t.shaderID?i.push(t.shaderID):(i.push(t.customVertexShaderID),i.push(t.customFragmentShaderID)),void 0!==t.defines)for(let e in t.defines)i.push(e),i.push(t.defines[e]);return!1===t.isRawShaderMaterial&&(i.push(t.precision),i.push(t.outputColorSpace),i.push(t.envMapMode),i.push(t.envMapCubeUVHeight),i.push(t.mapUv),i.push(t.alphaMapUv),i.push(t.lightMapUv),i.push(t.aoMapUv),i.push(t.bumpMapUv),i.push(t.normalMapUv),i.push(t.displacementMapUv),i.push(t.emissiveMapUv),i.push(t.metalnessMapUv),i.push(t.roughnessMapUv),i.push(t.anisotropyMapUv),i.push(t.clearcoatMapUv),i.push(t.clearcoatNormalMapUv),i.push(t.clearcoatRoughnessMapUv),i.push(t.iridescenceMapUv),i.push(t.iridescenceThicknessMapUv),i.push(t.sheenColorMapUv),i.push(t.sheenRoughnessMapUv),i.push(t.specularMapUv),i.push(t.specularColorMapUv),i.push(t.specularIntensityMapUv),i.push(t.transmissionMapUv),i.push(t.thicknessMapUv),i.push(t.combine),i.push(t.fogExp2),i.push(t.sizeAttenuation),i.push(t.morphTargetsCount),i.push(t.morphAttributeCount),i.push(t.numDirLights),i.push(t.numPointLights),i.push(t.numSpotLights),i.push(t.numSpotLightMaps),i.push(t.numHemiLights),i.push(t.numRectAreaLights),i.push(t.numDirLightShadows),i.push(t.numPointLightShadows),i.push(t.numSpotLightShadows),i.push(t.numSpotLightShadowsWithMaps),i.push(t.shadowMapType),i.push(t.toneMapping),i.push(t.numClippingPlanes),i.push(t.numClipIntersection),i.push(t.depthPacking),o.disableAll(),t.isWebGL2&&o.enable(0),t.supportsVertexTextures&&o.enable(1),t.instancing&&o.enable(2),t.instancingColor&&o.enable(3),t.matcap&&o.enable(4),t.envMap&&o.enable(5),t.normalMapObjectSpace&&o.enable(6),t.normalMapTangentSpace&&o.enable(7),t.clearcoat&&o.enable(8),t.iridescence&&o.enable(9),t.alphaTest&&o.enable(10),t.vertexColors&&o.enable(11),t.vertexAlphas&&o.enable(12),t.vertexUv1s&&o.enable(13),t.vertexUv2s&&o.enable(14),t.vertexUv3s&&o.enable(15),t.vertexTangents&&o.enable(16),t.anisotropy&&o.enable(17),i.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.skinning&&o.enable(4),t.morphTargets&&o.enable(5),t.morphNormals&&o.enable(6),t.morphColors&&o.enable(7),t.premultipliedAlpha&&o.enable(8),t.shadowMapEnabled&&o.enable(9),t.useLegacyLights&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),i.push(o.mask),i.push(e.outputColorSpace)),i.push(t.customProgramCacheKey),i.join()},getUniforms:function(e){let t;let i=g[e.type];if(i){let e=ie[i];t=tq.clone(e.uniforms)}else t=e.uniforms;return t},acquireProgram:function(t,i){let n;// Check if code has been already compiled
for(let e=0,t=h.length;e<t;e++){let t=h[e];if(t.cacheKey===i){n=t,++n.usedTimes;break}}return void 0===n&&(n=new nV(e,i,t,a),h.push(n)),n},releaseProgram:function(e){if(0==--e.usedTimes){// Remove from unordered set
let t=h.indexOf(e);h[t]=h[h.length-1],h.pop(),// Free WebGL resources
e.destroy()}},releaseShaderCache:function(e){l.remove(e)},// Exposed for resource monitoring & error feedback via renderer.info:
programs:h,dispose:function(){l.dispose()}}}function nq(){let e=new WeakMap;return{get:function(t){let i=e.get(t);return void 0===i&&(i={},e.set(t,i)),i},remove:function(t){e.delete(t)},update:function(t,i,n){e.get(t)[i]=n},dispose:function(){e=new WeakMap}}}function nj(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function nX(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function nY(){let e=[],t=0,i=[],n=[],r=[];function a(i,n,r,a,s,o){let l=e[t];return void 0===l?(l={id:i.id,object:i,geometry:n,material:r,groupOrder:a,renderOrder:i.renderOrder,z:s,group:o},e[t]=l):(l.id=i.id,l.object=i,l.geometry=n,l.material=r,l.groupOrder=a,l.renderOrder=i.renderOrder,l.z=s,l.group=o),t++,l}return{opaque:i,transmissive:n,transparent:r,init:function(){t=0,i.length=0,n.length=0,r.length=0},push:function(e,t,s,o,l,h){let c=a(e,t,s,o,l,h);s.transmission>0?n.push(c):!0===s.transparent?r.push(c):i.push(c)},unshift:function(e,t,s,o,l,h){let c=a(e,t,s,o,l,h);s.transmission>0?n.unshift(c):!0===s.transparent?r.unshift(c):i.unshift(c)},finish:function(){// Clear references from inactive renderItems in the list
for(let i=t,n=e.length;i<n;i++){let t=e[i];if(null===t.id)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}},sort:function(e,t){i.length>1&&i.sort(e||nj),n.length>1&&n.sort(t||nX),r.length>1&&r.sort(t||nX)}}}function nZ(){let e=new WeakMap;return{get:function(t,i){let n;let r=e.get(t);return void 0===r?(n=new nY,e.set(t,[n])):i>=r.length?(n=new nY,r.push(n)):n=r[i],n},dispose:function(){e=new WeakMap}}}function nK(){let e={};return{get:function(t){let i;if(void 0!==e[t.id])return e[t.id];switch(t.type){case"DirectionalLight":i={direction:new Z,color:new ta};break;case"SpotLight":i={position:new Z,direction:new Z,color:new ta,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Z,color:new ta,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Z,skyColor:new ta,groundColor:new ta};break;case"RectAreaLight":i={color:new ta,position:new Z,halfWidth:new Z,halfHeight:new Z}}return e[t.id]=i,i}}}let nJ=0;function nQ(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function n$(e,t){let i=new nK,n=function(){let e={};return{get:function(t){let i;if(void 0!==e[t.id])return e[t.id];switch(t.type){case"DirectionalLight":case"SpotLight":i={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new S};break;case"PointLight":i={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new S,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=i,i}}}(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let e=0;e<9;e++)r.probe.push(new Z);let a=new Z,s=new eE,o=new eE;return{setup:function(a,s){let o=0,l=0,h=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,u=0,d=0,p=0,f=0,m=0,g=0,v=0,y=0,x=0;// ordering : [shadow casting + map texturing, map texturing, shadow casting, none ]
a.sort(nQ);// artist-friendly light intensity scaling factor
let _=!0===s?Math.PI:1;for(let e=0,t=a.length;e<t;e++){let t=a[e],s=t.color,w=t.intensity,b=t.distance,M=t.shadow&&t.shadow.map?t.shadow.map.texture:null;if(t.isAmbientLight)o+=s.r*w*_,l+=s.g*w*_,h+=s.b*w*_;else if(t.isLightProbe)for(let e=0;e<9;e++)r.probe[e].addScaledVector(t.sh.coefficients[e],w);else if(t.isDirectionalLight){let e=i.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*_),t.castShadow){let e=t.shadow,i=n.get(t);i.shadowBias=e.bias,i.shadowNormalBias=e.normalBias,i.shadowRadius=e.radius,i.shadowMapSize=e.mapSize,r.directionalShadow[c]=i,r.directionalShadowMap[c]=M,r.directionalShadowMatrix[c]=t.shadow.matrix,m++}r.directional[c]=e,c++}else if(t.isSpotLight){let e=i.get(t);e.position.setFromMatrixPosition(t.matrixWorld),e.color.copy(s).multiplyScalar(w*_),e.distance=b,e.coneCos=Math.cos(t.angle),e.penumbraCos=Math.cos(t.angle*(1-t.penumbra)),e.decay=t.decay,r.spot[d]=e;let a=t.shadow;if(t.map&&(r.spotLightMap[y]=t.map,y++,// make sure the lightMatrix is up to date
// TODO : do it if required only
a.updateMatrices(t),t.castShadow&&x++),r.spotLightMatrix[d]=a.matrix,t.castShadow){let e=n.get(t);e.shadowBias=a.bias,e.shadowNormalBias=a.normalBias,e.shadowRadius=a.radius,e.shadowMapSize=a.mapSize,r.spotShadow[d]=e,r.spotShadowMap[d]=M,v++}d++}else if(t.isRectAreaLight){let e=i.get(t);e.color.copy(s).multiplyScalar(w),e.halfWidth.set(.5*t.width,0,0),e.halfHeight.set(0,.5*t.height,0),r.rectArea[p]=e,p++}else if(t.isPointLight){let e=i.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*_),e.distance=t.distance,e.decay=t.decay,t.castShadow){let e=t.shadow,i=n.get(t);i.shadowBias=e.bias,i.shadowNormalBias=e.normalBias,i.shadowRadius=e.radius,i.shadowMapSize=e.mapSize,i.shadowCameraNear=e.camera.near,i.shadowCameraFar=e.camera.far,r.pointShadow[u]=i,r.pointShadowMap[u]=M,r.pointShadowMatrix[u]=t.shadow.matrix,g++}r.point[u]=e,u++}else if(t.isHemisphereLight){let e=i.get(t);e.skyColor.copy(t.color).multiplyScalar(w*_),e.groundColor.copy(t.groundColor).multiplyScalar(w*_),r.hemi[f]=e,f++}}p>0&&(t.isWebGL2?(// WebGL 2
r.rectAreaLTC1=t9.LTC_FLOAT_1,r.rectAreaLTC2=t9.LTC_FLOAT_2):!0===e.has("OES_texture_float_linear")?(r.rectAreaLTC1=t9.LTC_FLOAT_1,r.rectAreaLTC2=t9.LTC_FLOAT_2):!0===e.has("OES_texture_half_float_linear")?(r.rectAreaLTC1=t9.LTC_HALF_1,r.rectAreaLTC2=t9.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=o,r.ambient[1]=l,r.ambient[2]=h;let w=r.hash;(w.directionalLength!==c||w.pointLength!==u||w.spotLength!==d||w.rectAreaLength!==p||w.hemiLength!==f||w.numDirectionalShadows!==m||w.numPointShadows!==g||w.numSpotShadows!==v||w.numSpotMaps!==y)&&(r.directional.length=c,r.spot.length=d,r.rectArea.length=p,r.point.length=u,r.hemi.length=f,r.directionalShadow.length=m,r.directionalShadowMap.length=m,r.pointShadow.length=g,r.pointShadowMap.length=g,r.spotShadow.length=v,r.spotShadowMap.length=v,r.directionalShadowMatrix.length=m,r.pointShadowMatrix.length=g,r.spotLightMatrix.length=v+y-x,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=x,w.directionalLength=c,w.pointLength=u,w.spotLength=d,w.rectAreaLength=p,w.hemiLength=f,w.numDirectionalShadows=m,w.numPointShadows=g,w.numSpotShadows=v,w.numSpotMaps=y,r.version=nJ++)},setupView:function(e,t){let i=0,n=0,l=0,h=0,c=0,u=t.matrixWorldInverse;for(let t=0,d=e.length;t<d;t++){let d=e[t];if(d.isDirectionalLight){let e=r.directional[i];e.direction.setFromMatrixPosition(d.matrixWorld),a.setFromMatrixPosition(d.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(u),i++}else if(d.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(d.matrixWorld),e.position.applyMatrix4(u),e.direction.setFromMatrixPosition(d.matrixWorld),a.setFromMatrixPosition(d.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(u),l++}else if(d.isRectAreaLight){let e=r.rectArea[h];e.position.setFromMatrixPosition(d.matrixWorld),e.position.applyMatrix4(u),// extract local rotation of light to derive width/height half vectors
o.identity(),s.copy(d.matrixWorld),s.premultiply(u),o.extractRotation(s),e.halfWidth.set(.5*d.width,0,0),e.halfHeight.set(0,.5*d.height,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),h++}else if(d.isPointLight){let e=r.point[n];e.position.setFromMatrixPosition(d.matrixWorld),e.position.applyMatrix4(u),n++}else if(d.isHemisphereLight){let e=r.hemi[c];e.direction.setFromMatrixPosition(d.matrixWorld),e.direction.transformDirection(u),c++}}},state:r}}function n0(e,t){let i=new n$(e,t),n=[],r=[];return{init:function(){n.length=0,r.length=0},state:{lightsArray:n,shadowsArray:r,lights:i},setupLights:function(e){i.setup(n,e)},setupLightsView:function(e){i.setupView(n,e)},pushLight:function(e){n.push(e)},pushShadow:function(e){r.push(e)}}}function n1(e,t){let i=new WeakMap;return{get:function(n,r=0){let a;let s=i.get(n);return void 0===s?(a=new n0(e,t),i.set(n,[a])):r>=s.length?(a=new n0(e,t),s.push(a)):a=s[r],a},dispose:function(){i=new WeakMap}}}class n2 extends te{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class n3 extends te{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function n4(e,t,i){let n=new t4,r=new S,a=new S,s=new G,o=new n2({depthPacking:3201}),l=new n3,h={},c=i.maxTextureSize,u={0:1,1:0,2:2},d=new tj({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new S},radius:{value:4}},vertexShader:"void main() {\n	gl_Position = vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( squared_mean - mean * mean );\n	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new tw;f.setAttribute("position",new tc(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new tF(f,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;function y(t,i,n,r){let a=null,s=!0===n.isPointLight?t.customDistanceMaterial:t.customDepthMaterial;if(void 0!==s)a=s;else if(a=!0===n.isPointLight?l:o,e.localClippingEnabled&&!0===i.clipShadows&&Array.isArray(i.clippingPlanes)&&0!==i.clippingPlanes.length||i.displacementMap&&0!==i.displacementScale||i.alphaMap&&i.alphaTest>0||i.map&&i.alphaTest>0){// in this case we need a unique material instance reflecting the
// appropriate state
let e=a.uuid,t=i.uuid,n=h[e];void 0===n&&(n={},h[e]=n);let r=n[t];void 0===r&&(r=a.clone(),n[t]=r),a=r}if(a.visible=i.visible,a.wireframe=i.wireframe,3===r?a.side=null!==i.shadowSide?i.shadowSide:i.side:a.side=null!==i.shadowSide?i.shadowSide:u[i.side],a.alphaMap=i.alphaMap,a.alphaTest=i.alphaTest,a.map=i.map,a.clipShadows=i.clipShadows,a.clippingPlanes=i.clippingPlanes,a.clipIntersection=i.clipIntersection,a.displacementMap=i.displacementMap,a.displacementScale=i.displacementScale,a.displacementBias=i.displacementBias,a.wireframeLinewidth=i.wireframeLinewidth,a.linewidth=i.linewidth,!0===n.isPointLight&&!0===a.isMeshDistanceMaterial){let t=e.properties.get(a);t.light=n}return a}this.render=function(i,o,l){if(!1===g.enabled||!1===g.autoUpdate&&!1===g.needsUpdate||0===i.length)return;let h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.state;// Set GL state for depth map.
x.setBlending(0),x.buffers.color.setClear(1,1,1,1),x.buffers.depth.setTest(!0),x.setScissorTest(!1);// check for shadow map type changes
let _=3!==v&&3===this.type,w=3===v&&3!==this.type;// render depth map
for(let h=0,u=i.length;h<u;h++){let u=i[h],f=u.shadow;if(void 0===f){console.warn("THREE.WebGLShadowMap:",u,"has no shadow.");continue}if(!1===f.autoUpdate&&!1===f.needsUpdate)continue;r.copy(f.mapSize);let g=f.getFrameExtents();if(r.multiply(g),a.copy(f.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(a.x=Math.floor(c/g.x),r.x=a.x*g.x,f.mapSize.x=a.x),r.y>c&&(a.y=Math.floor(c/g.y),r.y=a.y*g.y,f.mapSize.y=a.y)),null===f.map||!0===_||!0===w){let e=3!==this.type?{minFilter:1003,magFilter:1003}:{};null!==f.map&&f.map.dispose(),f.map=new j(r.x,r.y,e),f.map.texture.name=u.name+".shadowMap",f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let v=f.getViewportCount();for(let i=0;i<v;i++){let r=f.getViewport(i);s.set(a.x*r.x,a.y*r.y,a.x*r.z,a.y*r.w),x.viewport(s),f.updateMatrices(u,i),n=f.getFrustum(),function i(r,a,s,o,l){if(!1===r.visible)return;let h=r.layers.test(a.layers);if(h&&(r.isMesh||r.isLine||r.isPoints)&&(r.castShadow||r.receiveShadow&&3===l)&&(!r.frustumCulled||n.intersectsObject(r))){r.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,r.matrixWorld);let i=t.update(r),n=r.material;if(Array.isArray(n)){let t=i.groups;for(let a=0,h=t.length;a<h;a++){let h=t[a],c=n[h.materialIndex];if(c&&c.visible){let t=y(r,c,o,l);e.renderBufferDirect(s,null,i,t,r,h)}}}else if(n.visible){let t=y(r,n,o,l);e.renderBufferDirect(s,null,i,t,r,null)}}let c=r.children;for(let e=0,t=c.length;e<t;e++)i(c[e],a,s,o,l)}(o,l,f.camera,u,this.type)}!0!==f.isPointLightShadow&&3===this.type&&function(i,n){let a=t.update(m);d.defines.VSM_SAMPLES!==i.blurSamples&&(d.defines.VSM_SAMPLES=i.blurSamples,p.defines.VSM_SAMPLES=i.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),null===i.mapPass&&(i.mapPass=new j(r.x,r.y)),// vertical pass
d.uniforms.shadow_pass.value=i.map.texture,d.uniforms.resolution.value=i.mapSize,d.uniforms.radius.value=i.radius,e.setRenderTarget(i.mapPass),e.clear(),e.renderBufferDirect(n,null,a,d,m,null),// horizontal pass
p.uniforms.shadow_pass.value=i.mapPass.texture,p.uniforms.resolution.value=i.mapSize,p.uniforms.radius.value=i.radius,e.setRenderTarget(i.map),e.clear(),e.renderBufferDirect(n,null,a,p,m,null)}(f,l),f.needsUpdate=!1}v=this.type,g.needsUpdate=!1,e.setRenderTarget(h,u,f)}}function n5(e,t,i){let n=i.isWebGL2,r=new function(){let t=!1,i=new G,n=null,r=new G(0,0,0,0);return{setMask:function(i){n===i||t||(e.colorMask(i,i,i,i),n=i)},setLocked:function(e){t=e},setClear:function(t,n,a,s,o){!0===o&&(t*=s,n*=s,a*=s),i.set(t,n,a,s),!1===r.equals(i)&&(e.clearColor(t,n,a,s),r.copy(i))},reset:function(){t=!1,n=null,r.set(-1,0,0,0)}}},a=new function(){let t=!1,i=null,n=null,r=null;return{setTest:function(t){t?F(e.DEPTH_TEST):V(e.DEPTH_TEST)},setMask:function(n){i===n||t||(e.depthMask(n),i=n)},setFunc:function(t){if(n!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:default:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL)}n=t}},setLocked:function(e){t=e},setClear:function(t){r!==t&&(e.clearDepth(t),r=t)},reset:function(){t=!1,i=null,n=null,r=null}}},s=new function(){let t=!1,i=null,n=null,r=null,a=null,s=null,o=null,l=null,h=null;return{setTest:function(i){t||(i?F(e.STENCIL_TEST):V(e.STENCIL_TEST))},setMask:function(n){i===n||t||(e.stencilMask(n),i=n)},setFunc:function(t,i,s){(n!==t||r!==i||a!==s)&&(e.stencilFunc(t,i,s),n=t,r=i,a=s)},setOp:function(t,i,n){(s!==t||o!==i||l!==n)&&(e.stencilOp(t,i,n),s=t,o=i,l=n)},setLocked:function(e){t=e},setClear:function(t){h!==t&&(e.clearStencil(t),h=t)},reset:function(){t=!1,i=null,n=null,r=null,a=null,s=null,o=null,l=null,h=null}}},o=new WeakMap,l=new WeakMap,h={},c={},u=new WeakMap,d=[],p=null,f=!1,m=null,g=null,v=null,y=null,x=null,_=null,w=null,b=!1,M=null,S=null,E=null,T=null,A=null,R=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),C=!1,P=e.getParameter(e.VERSION);-1!==P.indexOf("WebGL")?C=parseFloat(/^WebGL (\d)/.exec(P)[1])>=1:-1!==P.indexOf("OpenGL ES")&&(C=parseFloat(/^OpenGL ES (\d)/.exec(P)[1])>=2);let L=null,N={},I=e.getParameter(e.SCISSOR_BOX),U=e.getParameter(e.VIEWPORT),D=new G().fromArray(I),O=new G().fromArray(U);function z(t,i,r,a){let s=new Uint8Array(4),o=e.createTexture();// 4 is required to match default unpack alignment of 4.
e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)n&&(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)?e.texImage3D(i,0,e.RGBA,1,1,a,0,e.RGBA,e.UNSIGNED_BYTE,s):e.texImage2D(i+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,s);return o}let B={};//
function F(t){!0!==h[t]&&(e.enable(t),h[t]=!0)}function V(t){!1!==h[t]&&(e.disable(t),h[t]=!1)}B[e.TEXTURE_2D]=z(e.TEXTURE_2D,e.TEXTURE_2D,1),B[e.TEXTURE_CUBE_MAP]=z(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(B[e.TEXTURE_2D_ARRAY]=z(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),B[e.TEXTURE_3D]=z(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),// init
r.setClear(0,0,0,1),a.setClear(1),s.setClear(0),F(e.DEPTH_TEST),a.setFunc(3),q(!1),j(1),F(e.CULL_FACE),k(0);let H={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(n)H[103]=e.MIN,H[104]=e.MAX;else{let e=t.get("EXT_blend_minmax");null!==e&&(H[103]=e.MIN_EXT,H[104]=e.MAX_EXT)}let W={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA};function k(t,i,n,r,a,s,o,l){if(0===t){!0===f&&(V(e.BLEND),f=!1);return}if(!1===f&&(F(e.BLEND),f=!0),5!==t){if(t!==m||l!==b){if((100!==g||100!==x)&&(e.blendEquation(e.FUNC_ADD),g=100,x=100),l)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",t)}v=null,y=null,_=null,w=null,m=t,b=l}return}// custom blending
a=a||i,s=s||n,o=o||r,(i!==g||a!==x)&&(e.blendEquationSeparate(H[i],H[a]),g=i,x=a),(n!==v||r!==y||s!==_||o!==w)&&(e.blendFuncSeparate(W[n],W[r],W[s],W[o]),v=n,y=r,_=s,w=o),m=t,b=!1}//
function q(t){M!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),M=t)}function j(t){0!==t?(F(e.CULL_FACE),t!==S&&(1===t?e.cullFace(e.BACK):2===t?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):V(e.CULL_FACE),S=t}function X(t,i,n){t?(F(e.POLYGON_OFFSET_FILL),(T!==i||A!==n)&&(e.polygonOffset(i,n),T=i,A=n)):V(e.POLYGON_OFFSET_FILL)}return{buffers:{color:r,depth:a,stencil:s},enable:F,disable:V,bindFramebuffer:function(t,i){return c[t]!==i&&(e.bindFramebuffer(t,i),c[t]=i,n&&(t===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=i),t===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=i)),!0)},drawBuffers:function(n,r){let a=d,s=!1;if(n){if(void 0===(a=u.get(r))&&(a=[],u.set(r,a)),n.isWebGLMultipleRenderTargets){let t=n.texture;if(a.length!==t.length||a[0]!==e.COLOR_ATTACHMENT0){for(let i=0,n=t.length;i<n;i++)a[i]=e.COLOR_ATTACHMENT0+i;a.length=t.length,s=!0}}else a[0]!==e.COLOR_ATTACHMENT0&&(a[0]=e.COLOR_ATTACHMENT0,s=!0)}else a[0]!==e.BACK&&(a[0]=e.BACK,s=!0);s&&(i.isWebGL2?e.drawBuffers(a):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(a))},useProgram:function(t){return p!==t&&(e.useProgram(t),p=t,!0)},setBlending:k,setMaterial:function(t,i){2===t.side?V(e.CULL_FACE):F(e.CULL_FACE);let n=1===t.side;i&&(n=!n),q(n),1===t.blending&&!1===t.transparent?k(0):k(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.premultipliedAlpha),a.setFunc(t.depthFunc),a.setTest(t.depthTest),a.setMask(t.depthWrite),r.setMask(t.colorWrite);let o=t.stencilWrite;s.setTest(o),o&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),X(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),!0===t.alphaToCoverage?F(e.SAMPLE_ALPHA_TO_COVERAGE):V(e.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:q,setCullFace:j,setLineWidth:function(t){t!==E&&(C&&e.lineWidth(t),E=t)},setPolygonOffset:X,setScissorTest:function(t){t?F(e.SCISSOR_TEST):V(e.SCISSOR_TEST)},activeTexture:// texture
function(t){void 0===t&&(t=e.TEXTURE0+R-1),L!==t&&(e.activeTexture(t),L=t)},bindTexture:function(t,i,n){void 0===n&&(n=null===L?e.TEXTURE0+R-1:L);let r=N[n];void 0===r&&(r={type:void 0,texture:void 0},N[n]=r),(r.type!==t||r.texture!==i)&&(L!==n&&(e.activeTexture(n),L=n),e.bindTexture(t,i||B[t]),r.type=t,r.texture=i)},unbindTexture:function(){let t=N[L];void 0!==t&&void 0!==t.type&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)},compressedTexImage2D:function(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},compressedTexImage3D:function(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texImage2D:function(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texImage3D:function(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},updateUBOMapping:function(t,i){let n=l.get(i);void 0===n&&(n=new WeakMap,l.set(i,n));let r=n.get(t);void 0===r&&(r=e.getUniformBlockIndex(i,t.name),n.set(t,r))},uniformBlockBinding:function(t,i){let n=l.get(i),r=n.get(t);o.get(i)!==r&&(// bind shader specific block index to global block point
e.uniformBlockBinding(i,r,t.__bindingPointIndex),o.set(i,r))},texStorage2D:function(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texStorage3D:function(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texSubImage2D:function(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texSubImage3D:function(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},compressedTexSubImage2D:function(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},compressedTexSubImage3D:function(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},scissor://
function(t){!1===D.equals(t)&&(e.scissor(t.x,t.y,t.z,t.w),D.copy(t))},viewport:function(t){!1===O.equals(t)&&(e.viewport(t.x,t.y,t.z,t.w),O.copy(t))},reset://
function(){// reset state
e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),!0===n&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),// reset internals
h={},L=null,N={},c={},u=new WeakMap,d=[],p=null,f=!1,m=null,g=null,v=null,y=null,x=null,_=null,w=null,b=!1,M=null,S=null,E=null,T=null,A=null,D.set(0,0,e.canvas.width,e.canvas.height),O.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),s.reset()}}}function n6(e,t,i,n,r,a,s){let o;let l=r.isWebGL2,h=r.maxTextures,p=r.maxCubemapSize,f=r.maxTextureSize,m=r.maxSamples,g=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,v="undefined"!=typeof navigator&&/OculusBrowser/g.test(navigator.userAgent),y=new WeakMap,x=new WeakMap,b=!1;try{b="undefined"!=typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}catch(e){// Ignore any errors
}function M(e,t){// Use OffscreenCanvas when available. Specially needed in web workers
return b?new OffscreenCanvas(e,t):R("canvas")}function S(e,t,i,n){let r=1;// only perform resize if necessary
if((e.width>n||e.height>n)&&(r=n/Math.max(e.width,e.height)),r<1||!0===t){// only perform resize for certain image types
if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap){let n=t?w:Math.floor,a=n(r*e.width),s=n(r*e.height);void 0===o&&(o=M(a,s));// cube textures can't reuse the same canvas
let l=i?M(a,s):o;l.width=a,l.height=s;let h=l.getContext("2d");return h.drawImage(e,0,0,a,s),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+a+"x"+s+")."),l}"data"in e&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+").")}return e}function E(e){return _(e.width)&&_(e.height)}function T(e,t){return e.generateMipmaps&&t&&1003!==e.minFilter&&1006!==e.minFilter}function A(t){e.generateMipmap(t)}function C(i,n,r,a,s=!1){if(!1===l)return n;if(null!==i){if(void 0!==e[i])return e[i];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+i+"'")}let o=n;return n===e.RED&&(r===e.FLOAT&&(o=e.R32F),r===e.HALF_FLOAT&&(o=e.R16F),r===e.UNSIGNED_BYTE&&(o=e.R8)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(o=e.R8UI),r===e.UNSIGNED_SHORT&&(o=e.R16UI),r===e.UNSIGNED_INT&&(o=e.R32UI),r===e.BYTE&&(o=e.R8I),r===e.SHORT&&(o=e.R16I),r===e.INT&&(o=e.R32I)),n===e.RG&&(r===e.FLOAT&&(o=e.RG32F),r===e.HALF_FLOAT&&(o=e.RG16F),r===e.UNSIGNED_BYTE&&(o=e.RG8)),n===e.RGBA&&(r===e.FLOAT&&(o=e.RGBA32F),r===e.HALF_FLOAT&&(o=e.RGBA16F),r===e.UNSIGNED_BYTE&&(o=a===c&&!1===s?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT_4_4_4_4&&(o=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(o=e.RGB5_A1)),(o===e.R16F||o===e.R32F||o===e.RG16F||o===e.RG32F||o===e.RGBA16F||o===e.RGBA32F)&&t.get("EXT_color_buffer_float"),o}function P(e,t,i){return!0===T(e,i)||e.isFramebufferTexture&&1003!==e.minFilter&&1006!==e.minFilter?Math.log2(Math.max(t.width,t.height))+1:void 0!==e.mipmaps&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}// Fallback filters for non-power-of-2 textures
function L(t){return 1003===t||1004===t||1005===t?e.NEAREST:e.LINEAR}//
function N(e){let t=e.target;t.removeEventListener("dispose",N),//
function(e){let t=n.get(e);if(void 0===t.__webglInit)return;// check if it's necessary to remove the WebGLTexture object
let i=e.source,r=x.get(i);if(r){let n=r[t.__cacheKey];n.usedTimes--,0===n.usedTimes&&U(e),0===Object.keys(r).length&&x.delete(i)}n.remove(e)}(t),t.isVideoTexture&&y.delete(t)}function I(t){let i=t.target;i.removeEventListener("dispose",I),function(t){let i=t.texture,r=n.get(t),a=n.get(i);if(void 0!==a.__webglTexture&&(e.deleteTexture(a.__webglTexture),s.memory.textures--),t.depthTexture&&t.depthTexture.dispose(),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(r.__webglFramebuffer[t]))for(let i=0;i<r.__webglFramebuffer[t].length;i++)e.deleteFramebuffer(r.__webglFramebuffer[t][i]);else e.deleteFramebuffer(r.__webglFramebuffer[t]);r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer[t])}else{if(Array.isArray(r.__webglFramebuffer))for(let t=0;t<r.__webglFramebuffer.length;t++)e.deleteFramebuffer(r.__webglFramebuffer[t]);else e.deleteFramebuffer(r.__webglFramebuffer);if(r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer),r.__webglMultisampledFramebuffer&&e.deleteFramebuffer(r.__webglMultisampledFramebuffer),r.__webglColorRenderbuffer)for(let t=0;t<r.__webglColorRenderbuffer.length;t++)r.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(r.__webglColorRenderbuffer[t]);r.__webglDepthRenderbuffer&&e.deleteRenderbuffer(r.__webglDepthRenderbuffer)}if(t.isWebGLMultipleRenderTargets)for(let t=0,r=i.length;t<r;t++){let r=n.get(i[t]);r.__webglTexture&&(e.deleteTexture(r.__webglTexture),s.memory.textures--),n.remove(i[t])}n.remove(i),n.remove(t)}(i)}function U(t){let i=n.get(t);e.deleteTexture(i.__webglTexture);let r=t.source,a=x.get(r);delete a[i.__cacheKey],s.memory.textures--}//
let D=0;//
function O(t,r){let a=n.get(t);if(t.isVideoTexture&&function(e){let t=s.render.frame;// Check the last frame we updated the VideoTexture
y.get(e)!==t&&(y.set(e,t),e.update())}(t),!1===t.isRenderTargetTexture&&t.version>0&&a.__version!==t.version){let e=t.image;if(null===e)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(!1===e.complete)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(a,t,r);return}}i.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+r)}let z={1e3:e.REPEAT,1001:e.CLAMP_TO_EDGE,1002:e.MIRRORED_REPEAT},F={1003:e.NEAREST,1004:e.NEAREST_MIPMAP_NEAREST,1005:e.NEAREST_MIPMAP_LINEAR,1006:e.LINEAR,1007:e.LINEAR_MIPMAP_NEAREST,1008:e.LINEAR_MIPMAP_LINEAR},V={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function H(i,a,s){if(s?(e.texParameteri(i,e.TEXTURE_WRAP_S,z[a.wrapS]),e.texParameteri(i,e.TEXTURE_WRAP_T,z[a.wrapT]),(i===e.TEXTURE_3D||i===e.TEXTURE_2D_ARRAY)&&e.texParameteri(i,e.TEXTURE_WRAP_R,z[a.wrapR]),e.texParameteri(i,e.TEXTURE_MAG_FILTER,F[a.magFilter]),e.texParameteri(i,e.TEXTURE_MIN_FILTER,F[a.minFilter])):(e.texParameteri(i,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(i,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(i===e.TEXTURE_3D||i===e.TEXTURE_2D_ARRAY)&&e.texParameteri(i,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(1001!==a.wrapS||1001!==a.wrapT)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(i,e.TEXTURE_MAG_FILTER,L(a.magFilter)),e.texParameteri(i,e.TEXTURE_MIN_FILTER,L(a.minFilter)),1003!==a.minFilter&&1006!==a.minFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),a.compareFunction&&(e.texParameteri(i,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(i,e.TEXTURE_COMPARE_FUNC,V[a.compareFunction])),!0===t.has("EXT_texture_filter_anisotropic")){let s=t.get("EXT_texture_filter_anisotropic");1003!==a.magFilter&&(1005===a.minFilter||1008===a.minFilter)&&(1015!==a.type||!1!==t.has("OES_texture_float_linear"))&&(!1!==l||1016!==a.type||!1!==t.has("OES_texture_half_float_linear"))&&(a.anisotropy>1||n.get(a).__currentAnisotropy)&&(e.texParameterf(i,s.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,r.getMaxAnisotropy())),n.get(a).__currentAnisotropy=a.anisotropy)}}function W(t,i){let n=!1;void 0===t.__webglInit&&(t.__webglInit=!0,i.addEventListener("dispose",N));// create Source <-> WebGLTextures mapping if necessary
let r=i.source,a=x.get(r);void 0===a&&(a={},x.set(r,a));// check if there is already a WebGLTexture object for the given texture parameters
let o=function(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}(i);if(o!==t.__cacheKey){void 0===a[o]&&(// create new entry
a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,// when a new instance of WebGLTexture was created, a texture upload is required
// even if the image contents are identical
n=!0),a[o].usedTimes++;// every time the texture cache key changes, it's necessary to check if an instance of
// WebGLTexture can be deleted in order to avoid a memory leak.
let r=a[t.__cacheKey];void 0!==r&&(a[t.__cacheKey].usedTimes--,0===r.usedTimes&&U(i)),// store references to cache key and WebGLTexture object
t.__cacheKey=o,t.__webglTexture=a[o].texture}return n}function k(t,r,s){let o=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(o=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(o=e.TEXTURE_3D);let h=W(t,r),c=r.source;i.bindTexture(o,t.__webglTexture,e.TEXTURE0+s);let u=n.get(c);if(c.version!==u.__version||!0===h){let t;i.activeTexture(e.TEXTURE0+s),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE);let n=!l&&(1001!==r.wrapS||1001!==r.wrapT||1003!==r.minFilter&&1006!==r.minFilter)&&!1===E(r.image),d=S(r.image,n,!1,f);d=Z(r,d);let p=E(d)||l,m=a.convert(r.format,r.colorSpace),g=a.convert(r.type),v=C(r.internalFormat,m,g,r.colorSpace,r.isVideoTexture);H(o,r,p);let y=r.mipmaps,x=l&&!0!==r.isVideoTexture,_=void 0===u.__version||!0===h,w=P(r,d,p);if(r.isDepthTexture)// populate depth texture with dummy data
v=e.DEPTH_COMPONENT,l?v=1015===r.type?e.DEPTH_COMPONENT32F:1014===r.type?e.DEPTH_COMPONENT24:1020===r.type?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT16:1015===r.type&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),1026===r.format&&v===e.DEPTH_COMPONENT&&1012!==r.type&&1014!==r.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),r.type=1014,g=a.convert(r.type)),1027===r.format&&v===e.DEPTH_COMPONENT&&(// Depth stencil textures need the DEPTH_STENCIL internal format
// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
v=e.DEPTH_STENCIL,1020!==r.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),r.type=1020,g=a.convert(r.type))),_&&(x?i.texStorage2D(e.TEXTURE_2D,1,v,d.width,d.height):i.texImage2D(e.TEXTURE_2D,0,v,d.width,d.height,0,m,g,null));else if(r.isDataTexture){// use manually created mipmaps if available
// if there are no manual mipmaps
// set 0 level mipmap and then use GL to generate other mipmap levels
if(y.length>0&&p){x&&_&&i.texStorage2D(e.TEXTURE_2D,w,v,y[0].width,y[0].height);for(let n=0,r=y.length;n<r;n++)t=y[n],x?i.texSubImage2D(e.TEXTURE_2D,n,0,0,t.width,t.height,m,g,t.data):i.texImage2D(e.TEXTURE_2D,n,v,t.width,t.height,0,m,g,t.data);r.generateMipmaps=!1}else x?(_&&i.texStorage2D(e.TEXTURE_2D,w,v,d.width,d.height),i.texSubImage2D(e.TEXTURE_2D,0,0,0,d.width,d.height,m,g,d.data)):i.texImage2D(e.TEXTURE_2D,0,v,d.width,d.height,0,m,g,d.data)}else if(r.isCompressedTexture){if(r.isCompressedArrayTexture){x&&_&&i.texStorage3D(e.TEXTURE_2D_ARRAY,w,v,y[0].width,y[0].height,d.depth);for(let n=0,a=y.length;n<a;n++)t=y[n],1023!==r.format?null!==m?x?i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,n,0,0,0,t.width,t.height,d.depth,m,t.data,0,0):i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,n,v,t.width,t.height,d.depth,0,t.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):x?i.texSubImage3D(e.TEXTURE_2D_ARRAY,n,0,0,0,t.width,t.height,d.depth,m,g,t.data):i.texImage3D(e.TEXTURE_2D_ARRAY,n,v,t.width,t.height,d.depth,0,m,g,t.data)}else{x&&_&&i.texStorage2D(e.TEXTURE_2D,w,v,y[0].width,y[0].height);for(let n=0,a=y.length;n<a;n++)t=y[n],1023!==r.format?null!==m?x?i.compressedTexSubImage2D(e.TEXTURE_2D,n,0,0,t.width,t.height,m,t.data):i.compressedTexImage2D(e.TEXTURE_2D,n,v,t.width,t.height,0,t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):x?i.texSubImage2D(e.TEXTURE_2D,n,0,0,t.width,t.height,m,g,t.data):i.texImage2D(e.TEXTURE_2D,n,v,t.width,t.height,0,m,g,t.data)}}else if(r.isDataArrayTexture)x?(_&&i.texStorage3D(e.TEXTURE_2D_ARRAY,w,v,d.width,d.height,d.depth),i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,d.width,d.height,d.depth,m,g,d.data)):i.texImage3D(e.TEXTURE_2D_ARRAY,0,v,d.width,d.height,d.depth,0,m,g,d.data);else if(r.isData3DTexture)x?(_&&i.texStorage3D(e.TEXTURE_3D,w,v,d.width,d.height,d.depth),i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,d.width,d.height,d.depth,m,g,d.data)):i.texImage3D(e.TEXTURE_3D,0,v,d.width,d.height,d.depth,0,m,g,d.data);else if(r.isFramebufferTexture){if(_){if(x)i.texStorage2D(e.TEXTURE_2D,w,v,d.width,d.height);else{let t=d.width,n=d.height;for(let r=0;r<w;r++)i.texImage2D(e.TEXTURE_2D,r,v,t,n,0,m,g,null),t>>=1,n>>=1}}}else // regular Texture (image, video, canvas)
// use manually created mipmaps if available
// if there are no manual mipmaps
// set 0 level mipmap and then use GL to generate other mipmap levels
if(y.length>0&&p){x&&_&&i.texStorage2D(e.TEXTURE_2D,w,v,y[0].width,y[0].height);for(let n=0,r=y.length;n<r;n++)t=y[n],x?i.texSubImage2D(e.TEXTURE_2D,n,0,0,m,g,t):i.texImage2D(e.TEXTURE_2D,n,v,m,g,t);r.generateMipmaps=!1}else x?(_&&i.texStorage2D(e.TEXTURE_2D,w,v,d.width,d.height),i.texSubImage2D(e.TEXTURE_2D,0,0,0,m,g,d)):i.texImage2D(e.TEXTURE_2D,0,v,m,g,d);T(r,p)&&A(o),u.__version=c.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}// Render targets
// Setup storage for target texture and bind it to correct framebuffer
function G(t,r,s,o,l,h){let c=a.convert(s.format,s.colorSpace),u=a.convert(s.type),d=C(s.internalFormat,c,u,s.colorSpace),p=n.get(r);if(!p.__hasExternalTextures){let t=Math.max(1,r.width>>h),n=Math.max(1,r.height>>h);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?i.texImage3D(l,h,d,t,n,r.depth,0,c,u,null):i.texImage2D(l,h,d,t,n,0,c,u,null)}i.bindFramebuffer(e.FRAMEBUFFER,t),Y(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,o,l,n.get(s).__webglTexture,0,X(r)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,o,l,n.get(s).__webglTexture,h),i.bindFramebuffer(e.FRAMEBUFFER,null)}// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
function q(t,i,n){if(e.bindRenderbuffer(e.RENDERBUFFER,t),i.depthBuffer&&!i.stencilBuffer){let r=e.DEPTH_COMPONENT16;if(n||Y(i)){let t=i.depthTexture;t&&t.isDepthTexture&&(1015===t.type?r=e.DEPTH_COMPONENT32F:1014===t.type&&(r=e.DEPTH_COMPONENT24));let n=X(i);Y(i)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,n,r,i.width,i.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,n,r,i.width,i.height)}else e.renderbufferStorage(e.RENDERBUFFER,r,i.width,i.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t)}else if(i.depthBuffer&&i.stencilBuffer){let r=X(i);n&&!1===Y(i)?e.renderbufferStorageMultisample(e.RENDERBUFFER,r,e.DEPTH24_STENCIL8,i.width,i.height):Y(i)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,r,e.DEPTH24_STENCIL8,i.width,i.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,i.width,i.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,t)}else{let t=!0===i.isWebGLMultipleRenderTargets?i.texture:[i.texture];for(let r=0;r<t.length;r++){let s=t[r],o=a.convert(s.format,s.colorSpace),l=a.convert(s.type),h=C(s.internalFormat,o,l,s.colorSpace),c=X(i);n&&!1===Y(i)?e.renderbufferStorageMultisample(e.RENDERBUFFER,c,h,i.width,i.height):Y(i)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,c,h,i.width,i.height):e.renderbufferStorage(e.RENDERBUFFER,h,i.width,i.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}// Setup GL resources for a non-texture depth buffer
function j(t){let r=n.get(t),a=!0===t.isWebGLCubeRenderTarget;if(t.depthTexture&&!r.__autoAllocateDepthBuffer){if(a)throw Error("target.depthTexture not supported in Cube render targets");!// Setup resources for a Depth Texture for a FBO (needs an extension)
function(t,r){let a=r&&r.isWebGLCubeRenderTarget;if(a)throw Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(e.FRAMEBUFFER,t),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(r.depthTexture).__webglTexture&&r.depthTexture.image.width===r.width&&r.depthTexture.image.height===r.height||(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),O(r.depthTexture,0);let s=n.get(r.depthTexture).__webglTexture,o=X(r);if(1026===r.depthTexture.format)Y(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,s,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,s,0);else if(1027===r.depthTexture.format)Y(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,s,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,s,0);else throw Error("Unknown depthTexture format")}(r.__webglFramebuffer,t)}else if(a){r.__webglDepthbuffer=[];for(let n=0;n<6;n++)i.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[n]),r.__webglDepthbuffer[n]=e.createRenderbuffer(),q(r.__webglDepthbuffer[n],t,!1)}else i.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer=e.createRenderbuffer(),q(r.__webglDepthbuffer,t,!1);i.bindFramebuffer(e.FRAMEBUFFER,null)}function X(e){return Math.min(m,e.samples)}function Y(e){let i=n.get(e);return l&&e.samples>0&&!0===t.has("WEBGL_multisampled_render_to_texture")&&!1!==i.__useRenderToTexture}function Z(e,i){let n=e.colorSpace,r=e.format,a=e.type;return!0===e.isCompressedTexture||!0===e.isVideoTexture||1035===e.format||n!==u&&""!==n&&(n===c||n===d?!1===l?!0===t.has("EXT_sRGB")&&1023===r?(e.format=1035,// it's not possible to generate mips in WebGL 1 with this extension
e.minFilter=1006,e.generateMipmaps=!1):i=B.sRGBToLinear(i):(1023!==r||1009!==a)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",n)),i}//
this.allocateTextureUnit=function(){let e=D;return e>=h&&console.warn("THREE.WebGLTextures: Trying to use "+e+" texture units while this GPU supports only "+h),D+=1,e},this.resetTextureUnits=function(){D=0},this.setTexture2D=O,this.setTexture2DArray=function(t,r){let a=n.get(t);if(t.version>0&&a.__version!==t.version){k(a,t,r);return}i.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+r)},this.setTexture3D=function(t,r){let a=n.get(t);if(t.version>0&&a.__version!==t.version){k(a,t,r);return}i.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+r)},this.setTextureCube=function(t,r){let s=n.get(t);if(t.version>0&&s.__version!==t.version){(function(t,r,s){if(6!==r.image.length)return;let o=W(t,r),h=r.source;i.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let c=n.get(h);if(h.version!==c.__version||!0===o){let t;i.activeTexture(e.TEXTURE0+s),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE);let n=r.isCompressedTexture||r.image[0].isCompressedTexture,u=r.image[0]&&r.image[0].isDataTexture,d=[];for(let e=0;e<6;e++)n||u?d[e]=u?r.image[e].image:r.image[e]:d[e]=S(r.image[e],!1,!0,p),d[e]=Z(r,d[e]);let f=d[0],m=E(f)||l,g=a.convert(r.format,r.colorSpace),v=a.convert(r.type),y=C(r.internalFormat,g,v,r.colorSpace),x=l&&!0!==r.isVideoTexture,_=void 0===c.__version||!0===o,w=P(r,f,m);if(H(e.TEXTURE_CUBE_MAP,r,m),n){x&&_&&i.texStorage2D(e.TEXTURE_CUBE_MAP,w,y,f.width,f.height);for(let n=0;n<6;n++){t=d[n].mipmaps;for(let a=0;a<t.length;a++){let s=t[a];1023!==r.format?null!==g?x?i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a,0,0,s.width,s.height,g,s.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a,y,s.width,s.height,0,s.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):x?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a,0,0,s.width,s.height,g,v,s.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a,y,s.width,s.height,0,g,v,s.data)}}}else{t=r.mipmaps,x&&_&&(t.length>0&&w++,i.texStorage2D(e.TEXTURE_CUBE_MAP,w,y,d[0].width,d[0].height));for(let n=0;n<6;n++)if(u){x?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,0,0,d[n].width,d[n].height,g,v,d[n].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,y,d[n].width,d[n].height,0,g,v,d[n].data);for(let r=0;r<t.length;r++){let a=t[r],s=a.image[n].image;x?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r+1,0,0,s.width,s.height,g,v,s.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r+1,y,s.width,s.height,0,g,v,s.data)}}else{x?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,0,0,g,v,d[n]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,y,g,v,d[n]);for(let r=0;r<t.length;r++){let a=t[r];x?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r+1,0,0,g,v,a.image[n]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r+1,y,g,v,a.image[n])}}}T(r,m)&&A(e.TEXTURE_CUBE_MAP),c.__version=h.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version})(s,t,r);return}i.bindTexture(e.TEXTURE_CUBE_MAP,s.__webglTexture,e.TEXTURE0+r)},this.rebindTextures=// rebind framebuffer with external textures
function(t,i,r){let a=n.get(t);void 0!==i&&G(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),void 0!==r&&j(t)},this.setupRenderTarget=// Set up GL resources for the render target
function(t){let o=t.texture,h=n.get(t),c=n.get(o);t.addEventListener("dispose",I),!0!==t.isWebGLMultipleRenderTargets&&(void 0===c.__webglTexture&&(c.__webglTexture=e.createTexture()),c.__version=o.version,s.memory.textures++);let u=!0===t.isWebGLCubeRenderTarget,d=!0===t.isWebGLMultipleRenderTargets,p=E(t)||l;// Setup framebuffer
if(u){h.__webglFramebuffer=[];for(let t=0;t<6;t++)if(l&&o.mipmaps&&o.mipmaps.length>0){h.__webglFramebuffer[t]=[];for(let i=0;i<o.mipmaps.length;i++)h.__webglFramebuffer[t][i]=e.createFramebuffer()}else h.__webglFramebuffer[t]=e.createFramebuffer()}else{if(l&&o.mipmaps&&o.mipmaps.length>0){h.__webglFramebuffer=[];for(let t=0;t<o.mipmaps.length;t++)h.__webglFramebuffer[t]=e.createFramebuffer()}else h.__webglFramebuffer=e.createFramebuffer();if(d){if(r.drawBuffers){let i=t.texture;for(let t=0,r=i.length;t<r;t++){let r=n.get(i[t]);void 0===r.__webglTexture&&(r.__webglTexture=e.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.")}if(l&&t.samples>0&&!1===Y(t)){let n=d?o:[o];h.__webglMultisampledFramebuffer=e.createFramebuffer(),h.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,h.__webglMultisampledFramebuffer);for(let i=0;i<n.length;i++){let r=n[i];h.__webglColorRenderbuffer[i]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,h.__webglColorRenderbuffer[i]);let s=a.convert(r.format,r.colorSpace),o=a.convert(r.type),l=C(r.internalFormat,s,o,r.colorSpace,!0===t.isXRRenderTarget),c=X(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,c,l,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+i,e.RENDERBUFFER,h.__webglColorRenderbuffer[i])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(h.__webglDepthRenderbuffer=e.createRenderbuffer(),q(h.__webglDepthRenderbuffer,t,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}// Setup color buffer
if(u){i.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),H(e.TEXTURE_CUBE_MAP,o,p);for(let i=0;i<6;i++)if(l&&o.mipmaps&&o.mipmaps.length>0)for(let n=0;n<o.mipmaps.length;n++)G(h.__webglFramebuffer[i][n],t,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,n);else G(h.__webglFramebuffer[i],t,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);T(o,p)&&A(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(d){let r=t.texture;for(let a=0,s=r.length;a<s;a++){let s=r[a],o=n.get(s);i.bindTexture(e.TEXTURE_2D,o.__webglTexture),H(e.TEXTURE_2D,s,p),G(h.__webglFramebuffer,t,s,e.COLOR_ATTACHMENT0+a,e.TEXTURE_2D,0),T(s,p)&&A(e.TEXTURE_2D)}i.unbindTexture()}else{let n=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l?n=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),i.bindTexture(n,c.__webglTexture),H(n,o,p),l&&o.mipmaps&&o.mipmaps.length>0)for(let i=0;i<o.mipmaps.length;i++)G(h.__webglFramebuffer[i],t,o,e.COLOR_ATTACHMENT0,n,i);else G(h.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0,n,0);T(o,p)&&A(n),i.unbindTexture()}t.depthBuffer&&j(t)},this.updateRenderTargetMipmap=function(t){let r=E(t)||l,a=!0===t.isWebGLMultipleRenderTargets?t.texture:[t.texture];for(let s=0,o=a.length;s<o;s++){let o=a[s];if(T(o,r)){let r=t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,a=n.get(o).__webglTexture;i.bindTexture(r,a),A(r),i.unbindTexture()}}},this.updateMultisampleRenderTarget=function(t){if(l&&t.samples>0&&!1===Y(t)){let r=t.isWebGLMultipleRenderTargets?t.texture:[t.texture],a=t.width,s=t.height,o=e.COLOR_BUFFER_BIT,l=[],h=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=n.get(t),u=!0===t.isWebGLMultipleRenderTargets;// If MRT we need to remove FBO attachments
if(u)for(let t=0;t<r.length;t++)i.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,c.__webglMultisampledFramebuffer),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglFramebuffer);for(let i=0;i<r.length;i++){l.push(e.COLOR_ATTACHMENT0+i),t.depthBuffer&&l.push(h);let d=void 0!==c.__ignoreDepthValues&&c.__ignoreDepthValues;if(!1===d&&(t.depthBuffer&&(o|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&(o|=e.STENCIL_BUFFER_BIT)),u&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,c.__webglColorRenderbuffer[i]),!0===d&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[h]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[h])),u){let t=n.get(r[i]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,s,0,0,a,s,o,e.NEAREST),v&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,l)}// If MRT since pre-blit we removed the FBO we need to reconstruct the attachments
if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<r.length;t++){i.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,c.__webglColorRenderbuffer[t]);let a=n.get(r[t]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglMultisampledFramebuffer)}},this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Y}function n7(e,t,i){let n=i.isWebGL2;return{convert:function(i,r=""){let a;let s=r===c||r===d?1:0;if(1009===i)return e.UNSIGNED_BYTE;if(1017===i)return e.UNSIGNED_SHORT_4_4_4_4;if(1018===i)return e.UNSIGNED_SHORT_5_5_5_1;if(1010===i)return e.BYTE;if(1011===i)return e.SHORT;if(1012===i)return e.UNSIGNED_SHORT;if(1013===i)return e.INT;if(1014===i)return e.UNSIGNED_INT;if(1015===i)return e.FLOAT;if(1016===i)return n?e.HALF_FLOAT:null!==(a=t.get("OES_texture_half_float"))?a.HALF_FLOAT_OES:null;if(1021===i)return e.ALPHA;if(1023===i)return e.RGBA;if(1024===i)return e.LUMINANCE;if(1025===i)return e.LUMINANCE_ALPHA;if(1026===i)return e.DEPTH_COMPONENT;if(1027===i)return e.DEPTH_STENCIL;// WebGL 1 sRGB fallback
if(1035===i)return null!==(a=t.get("EXT_sRGB"))?a.SRGB_ALPHA_EXT:null;// WebGL2 formats.
if(1028===i)return e.RED;if(1029===i)return e.RED_INTEGER;if(1030===i)return e.RG;if(1031===i)return e.RG_INTEGER;if(1033===i)return e.RGBA_INTEGER;// S3TC
if(33776===i||33777===i||33778===i||33779===i){if(1===s){if(null===(a=t.get("WEBGL_compressed_texture_s3tc_srgb")))return null;if(33776===i)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(33777===i)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(33778===i)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(33779===i)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(null===(a=t.get("WEBGL_compressed_texture_s3tc")))return null;if(33776===i)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(33777===i)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(33778===i)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(33779===i)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}}// PVRTC
if(35840===i||35841===i||35842===i||35843===i){if(null===(a=t.get("WEBGL_compressed_texture_pvrtc")))return null;if(35840===i)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(35841===i)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(35842===i)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(35843===i)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}// ETC1
if(36196===i)return null!==(a=t.get("WEBGL_compressed_texture_etc1"))?a.COMPRESSED_RGB_ETC1_WEBGL:null;// ETC2
if(37492===i||37496===i){if(null===(a=t.get("WEBGL_compressed_texture_etc")))return null;if(37492===i)return 1===s?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(37496===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}// ASTC
if(37808===i||37809===i||37810===i||37811===i||37812===i||37813===i||37814===i||37815===i||37816===i||37817===i||37818===i||37819===i||37820===i||37821===i){if(null===(a=t.get("WEBGL_compressed_texture_astc")))return null;if(37808===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(37809===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(37810===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(37811===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(37812===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(37813===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(37814===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(37815===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(37816===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(37817===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(37818===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(37819===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(37820===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(37821===i)return 1===s?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}// BPTC
if(36492===i||36494===i||36495===i){if(null===(a=t.get("EXT_texture_compression_bptc")))return null;if(36492===i)return 1===s?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(36494===i)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(36495===i)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}// RGTC
if(36283===i||36284===i||36285===i||36286===i){if(null===(a=t.get("EXT_texture_compression_rgtc")))return null;if(36492===i)return a.COMPRESSED_RED_RGTC1_EXT;if(36284===i)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(36285===i)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(36286===i)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return(//
1020===i?n?e.UNSIGNED_INT_24_8:null!==(a=t.get("WEBGL_depth_texture"))?a.UNSIGNED_INT_24_8_WEBGL:null:void 0!==e[i]?e[i]:null)}}}class n8 extends tY{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class n9 extends eK{constructor(){super(),this.isGroup=!0,this.type="Group"}}const re={type:"move"};class rt{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return null===this._hand&&(this._hand=new n9,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return null===this._targetRay&&(this._targetRay=new n9,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return null===this._grip&&(this._grip=new n9,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return null!==this._targetRay&&this._targetRay.dispatchEvent(e),null!==this._grip&&this._grip.dispatchEvent(e),null!==this._hand&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),null!==this._targetRay&&(this._targetRay.visible=!1),null!==this._grip&&(this._grip.visible=!1),null!==this._hand&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null,s=this._targetRay,o=this._grip,l=this._hand;if(e&&"visible-blurred"!==t.session.visibilityState){if(l&&e.hand){for(let n of(a=!0,e.hand.values())){// Update the joints groups with the XRJoint poses
let e=t.getJointPose(n,i),r=this._getHandJoint(l,n);null!==e&&(r.matrix.fromArray(e.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,r.jointRadius=e.radius),r.visible=null!==e}// Custom events
// Check pinchz
let n=l.joints["index-finger-tip"],r=l.joints["thumb-tip"],s=n.position.distanceTo(r.position);l.inputState.pinching&&s>.025?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&s<=.015&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else null!==o&&e.gripSpace&&null!==(r=t.getPose(e.gripSpace,i))&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1);null!==s&&(null===(n=t.getPose(e.targetRaySpace,i))&&null!==r&&(n=r),null!==n&&(s.matrix.fromArray(n.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,n.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(n.linearVelocity)):s.hasLinearVelocity=!1,n.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(n.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(re)))}return null!==s&&(s.visible=null!==n),null!==o&&(o.visible=null!==r),null!==l&&(l.visible=null!==a),this}// private method
_getHandJoint(e,t){if(void 0===e.joints[t.jointName]){let i=new n9;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ri extends k{constructor(e,t,i,n,r,a,s,o,l,h){if(1026!==(h=void 0!==h?h:1026)&&1027!==h)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===i&&1026===h&&(i=1014),void 0===i&&1027===h&&(i=1020),super(null,n,r,a,s,o,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=void 0!==s?s:1003,this.minFilter=void 0!==o?o:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return null!==this.compareFunction&&(t.compareFunction=this.compareFunction),t}}class rn extends f{constructor(e,t){super();let i=this,n=null,r=1,a=null,s="local-floor",o=1,l=null,h=null,c=null,u=null,d=null,p=null,f=t.getContextAttributes(),m=null,g=null,y=[],x=[],_=new tY;_.layers.enable(1),_.viewport=new G;let w=new tY;w.layers.enable(2),w.viewport=new G;let b=[_,w],M=new n8;M.layers.enable(1),M.layers.enable(2);let S=null,E=null;//
function T(e){let t=x.indexOf(e.inputSource);if(-1===t)return;let i=y[t];void 0!==i&&(i.update(e.inputSource,e.frame,l||a),i.dispatchEvent({type:e.type,data:e.inputSource}))}function A(){n.removeEventListener("select",T),n.removeEventListener("selectstart",T),n.removeEventListener("selectend",T),n.removeEventListener("squeeze",T),n.removeEventListener("squeezestart",T),n.removeEventListener("squeezeend",T),n.removeEventListener("end",A),n.removeEventListener("inputsourceschange",R);for(let e=0;e<y.length;e++){let t=x[e];null!==t&&(x[e]=null,y[e].disconnect(t))}S=null,E=null,// restore framebuffer/rendering state
e.setRenderTarget(m),d=null,u=null,c=null,n=null,g=null,//
I.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}function R(e){// Notify disconnected
for(let t=0;t<e.removed.length;t++){let i=e.removed[t],n=x.indexOf(i);n>=0&&(x[n]=null,y[n].disconnect(i))}// Notify connected
for(let t=0;t<e.added.length;t++){let i=e.added[t],n=x.indexOf(i);if(-1===n){// Assign input source a controller that currently has no input source
for(let e=0;e<y.length;e++){if(e>=x.length){x.push(i),n=e;break}if(null===x[e]){x[e]=i,n=e;break}}// If all controllers do currently receive input we ignore new ones
if(-1===n)break}let r=y[n];r&&r.connect(i)}}//
this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=y[e];return void 0===t&&(t=new rt,y[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=y[e];return void 0===t&&(t=new rt,y[e]=t),t.getGripSpace()},this.getHand=function(e){let t=y[e];return void 0===t&&(t=new rt,y[e]=t),t.getHandSpace()},this.setFramebufferScaleFactor=function(e){r=e,!0===i.isPresenting&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(e){s=e,!0===i.isPresenting&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return null!==u?u:d},this.getBinding=function(){return c},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(h){if(null!==(n=h)){if(m=e.getRenderTarget(),n.addEventListener("select",T),n.addEventListener("selectstart",T),n.addEventListener("selectend",T),n.addEventListener("squeeze",T),n.addEventListener("squeezestart",T),n.addEventListener("squeezeend",T),n.addEventListener("end",A),n.addEventListener("inputsourceschange",R),!0!==f.xrCompatible&&await t.makeXRCompatible(),void 0===n.renderState.layers||!1===e.capabilities.isWebGL2){let i={antialias:void 0!==n.renderState.layers||f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,t,i),n.updateRenderState({baseLayer:d}),g=new j(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let i=null,a=null,s=null;f.depth&&(s=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,i=f.stencil?1027:1026,a=f.stencil?1020:1014);let o={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:r};u=(c=new XRWebGLBinding(n,t)).createProjectionLayer(o),n.updateRenderState({layers:[u]}),g=new j(u.textureWidth,u.textureHeight,{format:1023,type:1009,depthTexture:new ri(u.textureWidth,u.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,i),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0});let l=e.properties.get(g);l.__ignoreDepthValues=u.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await n.requestReferenceSpace(s),I.setContext(n),I.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(null!==n)return n.environmentBlendMode};//
let C=new Z,P=new Z;function L(e,t){null===t?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(null===n)return;M.near=w.near=_.near=e.near,M.far=w.far=_.far=e.far,(S!==M.near||E!==M.far)&&(// Note that the new renderState won't apply until the next frame. See #18320
n.updateRenderState({depthNear:M.near,depthFar:M.far}),S=M.near,E=M.far);let t=e.parent,i=M.cameras;L(M,t);for(let e=0;e<i.length;e++)L(i[e],t);2===i.length?/**
		 * Assumes 2 cameras that are parallel and share an X-axis, and that
		 * the cameras' projection and world matrices have already been set.
		 * And that near and far planes are identical for both cameras.
		 * Visualization of this technique: https://computergraphics.stackexchange.com/a/4765
		 */function(e,t,i){C.setFromMatrixPosition(t.matrixWorld),P.setFromMatrixPosition(i.matrixWorld);let n=C.distanceTo(P),r=t.projectionMatrix.elements,a=i.projectionMatrix.elements,s=r[14]/(r[10]-1),o=r[14]/(r[10]+1),l=(r[9]+1)/r[5],h=(r[9]-1)/r[5],c=(r[8]-1)/r[0],u=(a[8]+1)/a[0],d=n/(-c+u),p=-(d*c);// TODO: Better way to apply this offset?
t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(p),e.translateZ(d),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert();// Find the union of the frustum values of the cameras and scale
// the values so that the near plane's position does not change in world space,
// although must now be relative to the new union camera.
let f=s+d,m=o+d,g=s*c-p,v=s*u+(n-p),y=l*o/m*f,x=h*o/m*f;e.projectionMatrix.makePerspective(g,v,y,x,f,m),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}(M,_,w):M.projectionMatrix.copy(_.projectionMatrix),null===t?e.matrix.copy(M.matrixWorld):(e.matrix.copy(t.matrixWorld),e.matrix.invert(),e.matrix.multiply(M.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(M.projectionMatrix),e.projectionMatrixInverse.copy(M.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=2*v*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)},this.getCamera=function(){return M},this.getFoveation=function(){if(null!==u||null!==d)return o},this.setFoveation=function(e){// 0 = no foveation = full resolution
// 1 = maximum foveation = the edges render at lower resolution
o=e,null!==u&&(u.fixedFoveation=e),null!==d&&void 0!==d.fixedFoveation&&(d.fixedFoveation=e)};// Animation Loop
let N=null,I=new t5;I.setAnimationLoop(function(t,n){if(h=n.getViewerPose(l||a),p=n,null!==h){let t=h.views;null!==d&&(e.setRenderTargetFramebuffer(g,d.framebuffer),e.setRenderTarget(g));let i=!1;// check if it's necessary to rebuild cameraXR's camera list
t.length!==M.cameras.length&&(M.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(null!==d)a=d.getViewport(r);else{let t=c.getViewSubImage(u,r);a=t.viewport,0===n&&(e.setRenderTargetTextures(g,t.colorTexture,u.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(g))}let s=b[n];void 0===s&&((s=new tY).layers.enable(n),s.viewport=new G,b[n]=s),s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.projectionMatrix.fromArray(r.projectionMatrix),s.projectionMatrixInverse.copy(s.projectionMatrix).invert(),s.viewport.set(a.x,a.y,a.width,a.height),0===n&&(M.matrix.copy(s.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),!0===i&&M.cameras.push(s)}}//
for(let e=0;e<y.length;e++){let t=x[e],i=y[e];null!==t&&void 0!==i&&i.update(t,n,l||a)}N&&N(t,n),n.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:n}),p=null}),this.setAnimationLoop=function(e){N=e},this.dispose=function(){}}}function rr(e,t){function i(e,t){!0===e.matrixAutoUpdate&&e.updateMatrix(),t.value.copy(e.matrix)}function n(n,r){n.opacity.value=r.opacity,r.color&&n.diffuse.value.copy(r.color),r.emissive&&n.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(n.map.value=r.map,i(r.map,n.mapTransform)),r.alphaMap&&(n.alphaMap.value=r.alphaMap,i(r.alphaMap,n.alphaMapTransform)),r.bumpMap&&(n.bumpMap.value=r.bumpMap,i(r.bumpMap,n.bumpMapTransform),n.bumpScale.value=r.bumpScale,1===r.side&&(n.bumpScale.value*=-1)),r.normalMap&&(n.normalMap.value=r.normalMap,i(r.normalMap,n.normalMapTransform),n.normalScale.value.copy(r.normalScale),1===r.side&&n.normalScale.value.negate()),r.displacementMap&&(n.displacementMap.value=r.displacementMap,i(r.displacementMap,n.displacementMapTransform),n.displacementScale.value=r.displacementScale,n.displacementBias.value=r.displacementBias),r.emissiveMap&&(n.emissiveMap.value=r.emissiveMap,i(r.emissiveMap,n.emissiveMapTransform)),r.specularMap&&(n.specularMap.value=r.specularMap,i(r.specularMap,n.specularMapTransform)),r.alphaTest>0&&(n.alphaTest.value=r.alphaTest);let a=t.get(r).envMap;if(a&&(n.envMap.value=a,n.flipEnvMap.value=a.isCubeTexture&&!1===a.isRenderTargetTexture?-1:1,n.reflectivity.value=r.reflectivity,n.ior.value=r.ior,n.refractionRatio.value=r.refractionRatio),r.lightMap){n.lightMap.value=r.lightMap;// artist-friendly light intensity scaling factor
let t=!0===e._useLegacyLights?Math.PI:1;n.lightMapIntensity.value=r.lightMapIntensity*t,i(r.lightMap,n.lightMapTransform)}r.aoMap&&(n.aoMap.value=r.aoMap,n.aoMapIntensity.value=r.aoMapIntensity,i(r.aoMap,n.aoMapTransform))}return{refreshFogUniforms:function(t,i){i.color.getRGB(t.fogColor.value,tG(e)),i.isFog?(t.fogNear.value=i.near,t.fogFar.value=i.far):i.isFogExp2&&(t.fogDensity.value=i.density)},refreshMaterialUniforms:function(e,r,a,s,o){r.isMeshBasicMaterial?n(e,r):r.isMeshLambertMaterial?n(e,r):r.isMeshToonMaterial?(n(e,r),r.gradientMap&&(e.gradientMap.value=r.gradientMap)):r.isMeshPhongMaterial?(n(e,r),e.specular.value.copy(r.specular),e.shininess.value=Math.max(r.shininess,1e-4)):r.isMeshStandardMaterial?(n(e,r),function(e,n){e.metalness.value=n.metalness,n.metalnessMap&&(e.metalnessMap.value=n.metalnessMap,i(n.metalnessMap,e.metalnessMapTransform)),e.roughness.value=n.roughness,n.roughnessMap&&(e.roughnessMap.value=n.roughnessMap,i(n.roughnessMap,e.roughnessMapTransform));let r=t.get(n).envMap;r&&(e.envMapIntensity.value=n.envMapIntensity)}(e,r),r.isMeshPhysicalMaterial&&(e.ior.value=r.ior,r.sheen>0&&(e.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),e.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(e.sheenColorMap.value=r.sheenColorMap,i(r.sheenColorMap,e.sheenColorMapTransform)),r.sheenRoughnessMap&&(e.sheenRoughnessMap.value=r.sheenRoughnessMap,i(r.sheenRoughnessMap,e.sheenRoughnessMapTransform))),r.clearcoat>0&&(e.clearcoat.value=r.clearcoat,e.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(e.clearcoatMap.value=r.clearcoatMap,i(r.clearcoatMap,e.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,i(r.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(e.clearcoatNormalMap.value=r.clearcoatNormalMap,i(r.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),1===r.side&&e.clearcoatNormalScale.value.negate())),r.iridescence>0&&(e.iridescence.value=r.iridescence,e.iridescenceIOR.value=r.iridescenceIOR,e.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(e.iridescenceMap.value=r.iridescenceMap,i(r.iridescenceMap,e.iridescenceMapTransform)),r.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=r.iridescenceThicknessMap,i(r.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),r.transmission>0&&(e.transmission.value=r.transmission,e.transmissionSamplerMap.value=o.texture,e.transmissionSamplerSize.value.set(o.width,o.height),r.transmissionMap&&(e.transmissionMap.value=r.transmissionMap,i(r.transmissionMap,e.transmissionMapTransform)),e.thickness.value=r.thickness,r.thicknessMap&&(e.thicknessMap.value=r.thicknessMap,i(r.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=r.attenuationDistance,e.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(e.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(e.anisotropyMap.value=r.anisotropyMap,i(r.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=r.specularIntensity,e.specularColor.value.copy(r.specularColor),r.specularColorMap&&(e.specularColorMap.value=r.specularColorMap,i(r.specularColorMap,e.specularColorMapTransform)),r.specularIntensityMap&&(e.specularIntensityMap.value=r.specularIntensityMap,i(r.specularIntensityMap,e.specularIntensityMapTransform)))):r.isMeshMatcapMaterial?(n(e,r),r.matcap&&(e.matcap.value=r.matcap)):r.isMeshDepthMaterial?n(e,r):r.isMeshDistanceMaterial?(n(e,r),function(e,i){let n=t.get(i).light;e.referencePosition.value.setFromMatrixPosition(n.matrixWorld),e.nearDistance.value=n.shadow.camera.near,e.farDistance.value=n.shadow.camera.far}(e,r)):r.isMeshNormalMaterial?n(e,r):r.isLineBasicMaterial?(e.diffuse.value.copy(r.color),e.opacity.value=r.opacity,r.map&&(e.map.value=r.map,i(r.map,e.mapTransform)),r.isLineDashedMaterial&&(e.dashSize.value=r.dashSize,e.totalSize.value=r.dashSize+r.gapSize,e.scale.value=r.scale)):r.isPointsMaterial?(e.diffuse.value.copy(r.color),e.opacity.value=r.opacity,e.size.value=r.size*a,e.scale.value=.5*s,r.map&&(e.map.value=r.map,i(r.map,e.uvTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,i(r.alphaMap,e.alphaMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest)):r.isSpriteMaterial?(e.diffuse.value.copy(r.color),e.opacity.value=r.opacity,e.rotation.value=r.rotation,r.map&&(e.map.value=r.map,i(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,i(r.alphaMap,e.alphaMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest)):r.isShadowMaterial?(e.color.value.copy(r.color),e.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1);// #15581
}}}function ra(e,t,i,n){let r={},a={},s=[],o=i.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(e){let t={boundary:0,storage:0// bytes
};return"number"==typeof e?(// float/int
t.boundary=4,t.storage=4):e.isVector2?(// vec2
t.boundary=8,t.storage=8):e.isVector3||e.isColor?(// vec3
t.boundary=16,t.storage=12):e.isVector4?(// vec4
t.boundary=16,t.storage=16):e.isMatrix3?(// mat3 (in STD140 a 3x3 matrix is represented as 3x4)
t.boundary=48,t.storage=48):e.isMatrix4?(// mat4
t.boundary=64,t.storage=64):e.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",e),t}function h(t){let i=t.target;i.removeEventListener("dispose",h);let n=s.indexOf(i.__bindingPointIndex);s.splice(n,1),e.deleteBuffer(r[i.id]),delete r[i.id],delete a[i.id]}return{bind:function(e,t){let i=t.program;n.uniformBlockBinding(e,i)},update:function(i,c){let u=r[i.id];void 0===u&&(function(e){// determine total buffer size according to the STD140 layout
// Hint: STD140 is the only supported layout in WebGL 2
let t=e.uniforms,i=0,n=0;for(let e=0,r=t.length;e<r;e++){let r=t[e],a={boundary:0,storage:0// bytes
},s=Array.isArray(r.value)?r.value:[r.value];for(let e=0,t=s.length;e<t;e++){let t=s[e],i=l(t);a.boundary+=i.boundary,a.storage+=i.storage}//
if(// the following two properties will be used for partial buffer updates
r.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),r.__offset=i,e>0){n=i%16;let e=16-n;// check for chunk overflow
0!==n&&e-a.boundary<0&&(// add padding and adjust offset
i+=16-n,r.__offset=i)}i+=a.storage}// ensure correct final padding
(n=i%16)>0&&(i+=16-n),//
e.__size=i,e.__cache={}}(i),u=function(t){// the setup of an UBO is independent of a particular shader program but global
let i=function(){for(let e=0;e<o;e++)if(-1===s.indexOf(e))return s.push(e),e;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();t.__bindingPointIndex=i;let n=e.createBuffer(),r=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,i,n),n}(i),r[i.id]=u,i.addEventListener("dispose",h));// ensure to update the binding points/block indices mapping for this program
let d=c.program;n.updateUBOMapping(i,d);// update UBO once per frame
let p=t.render.frame;a[i.id]!==p&&(function(t){let i=r[t.id],n=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,i);for(let t=0,i=n.length;t<i;t++){let i=n[t];// partly update the buffer if necessary
if(!0===function(e,t,i){let n=e.value;if(void 0===i[t]){// cache entry does not exist so far
if("number"==typeof n)i[t]=n;else{let e=Array.isArray(n)?n:[n],r=[];for(let t=0;t<e.length;t++)r.push(e[t].clone());i[t]=r}return!0}// compare current value with cached entry
if("number"==typeof n){if(i[t]!==n)return i[t]=n,!0}else{let e=Array.isArray(i[t])?i[t]:[i[t]],r=Array.isArray(n)?n:[n];for(let t=0;t<e.length;t++){let i=e[t];if(!1===i.equals(r[t]))return i.copy(r[t]),!0}}return!1}(i,t,a)){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let s=n[a],o=l(s);"number"==typeof s?(i.__data[0]=s,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):s.isMatrix3?(// manually converting 3x3 to 3x4
i.__data[0]=s.elements[0],i.__data[1]=s.elements[1],i.__data[2]=s.elements[2],i.__data[3]=s.elements[0],i.__data[4]=s.elements[3],i.__data[5]=s.elements[4],i.__data[6]=s.elements[5],i.__data[7]=s.elements[0],i.__data[8]=s.elements[6],i.__data[9]=s.elements[7],i.__data[10]=s.elements[8],i.__data[11]=s.elements[0]):(s.toArray(i.__data,r),r+=o.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}e.bindBuffer(e.UNIFORM_BUFFER,null)}(i),a[i.id]=p)},dispose:function(){for(let t in r)e.deleteBuffer(r[t]);s=[],r={},a={}}}}class rs{constructor(e={}){let t,i,n,r,a,s,o,l,h,d,p,f,m,g,v,y,x,_,b,M,E,T,A,C,P;let{canvas:L=function(){let e=R("canvas");return e.style.display="block",e}(),context:N=null,depth:I=!0,stencil:U=!0,alpha:D=!1,antialias:O=!1,premultipliedAlpha:z=!0,preserveDrawingBuffer:B=!1,powerPreference:F="default",failIfMajorPerformanceCaveat:V=!1}=e;this.isWebGLRenderer=!0,t=null!==N?N.getContextAttributes().alpha:D;let H=new Uint32Array(4),W=new Int32Array(4),k=null,q=null,X=[],Y=[];// public properties
this.domElement=L,// Debug configuration container
this.debug={/**
			 * Enables error checking and reporting when shader programs are being compiled
			 * @type {boolean}
			 */checkShaderErrors:!0,/**
			 * Callback for custom error reporting.
			 * @type {?Function}
			 */onShaderError:null},// clearing
this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,// scene graph
this.sortObjects=!0,// user-defined clipping
this.clippingPlanes=[],this.localClippingEnabled=!1,// physically based shading
this.outputColorSpace=c,// physical lights
this._useLegacyLights=!1,// tone mapping
this.toneMapping=0,this.toneMappingExposure=1;// internal properties
let K=this,J=!1,Q=0,$=0,ee=null,et=-1,ei=null,en=new G,er=new G,ea=null,es=new ta(0),eo=0,el=L.width,eh=L.height,ec=1,eu=null,ed=null,ep=new G(0,0,el,eh),ef=new G(0,0,el,eh),em=!1,eg=new t4,ev=!1,ey=!1,ex=null,e_=new eE,ew=new S,eb=new Z,eM={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function eS(){return null===ee?ec:1}// initialize
let eT=N;function eA(e,t){for(let i=0;i<e.length;i++){let n=e[i],r=L.getContext(n,t);if(null!==r)return r}return null}try{if("setAttribute"in L&&L.setAttribute("data-engine","three.js r156"),// event listeners must be registered before WebGL context is created, see #12753
L.addEventListener("webglcontextlost",eP,!1),L.addEventListener("webglcontextrestored",eL,!1),L.addEventListener("webglcontextcreationerror",eN,!1),null===eT){let e=["webgl2","webgl","experimental-webgl"];if(!0===K.isWebGL1Renderer&&e.shift(),eT=eA(e,{alpha:!0,depth:I,stencil:U,antialias:O,premultipliedAlpha:z,preserveDrawingBuffer:B,powerPreference:F,failIfMajorPerformanceCaveat:V}),null===eT){if(eA(e))throw Error("Error creating WebGL context with your selected attributes.");throw Error("Error creating WebGL context.")}}"undefined"!=typeof WebGLRenderingContext&&eT instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),void 0===eT.getShaderPrecisionFormat&&(eT.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(e){throw console.error("THREE.WebGLRenderer: "+e.message),e}function eR(){i=new iE(eT),n=new is(eT,i,e),i.init(n),A=new n7(eT,i,n),r=new n5(eT,i,n),a=new iR(eT),s=new nq,o=new n6(eT,i,r,s,n,A,a),l=new il(K),h=new iS(K),d=new t6(eT,n),C=new ir(eT,i,d,n),p=new iT(eT,d,a,C),f=new iN(eT,p,d,a),M=new iL(eT,n,o),x=new io(s),m=new nG(K,l,h,i,n,C,x),g=new rr(K,s),v=new nZ,y=new n1(i,n),b=new ii(K,l,h,r,f,t,z),_=new n4(K,f,n),P=new ra(eT,a,n,r),E=new ia(eT,i,a,n),T=new iA(eT,i,a,n),a.programs=m.programs,K.capabilities=n,K.extensions=i,K.properties=s,K.renderLists=v,K.shadowMap=_,K.state=r,K.info=a}eR();// xr
let eC=new rn(K,eT);// Events
function eP(e){e.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),J=!0}function eL(){console.log("THREE.WebGLRenderer: Context Restored."),J=!1;let e=a.autoReset,t=_.enabled,i=_.autoUpdate,n=_.needsUpdate,r=_.type;eR(),a.autoReset=e,_.enabled=t,_.autoUpdate=i,_.needsUpdate=n,_.type=r}function eN(e){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",e.statusMessage)}function eI(e){let t=e.target;t.removeEventListener("dispose",eI),function(e){let t=s.get(e).programs;void 0!==t&&(t.forEach(function(e){m.releaseProgram(e)}),e.isShaderMaterial&&m.releaseShaderCache(e))}(t),s.remove(t)}this.xr=eC,// API
this.getContext=function(){return eT},this.getContextAttributes=function(){return eT.getContextAttributes()},this.forceContextLoss=function(){let e=i.get("WEBGL_lose_context");e&&e.loseContext()},this.forceContextRestore=function(){let e=i.get("WEBGL_lose_context");e&&e.restoreContext()},this.getPixelRatio=function(){return ec},this.setPixelRatio=function(e){void 0!==e&&(ec=e,this.setSize(el,eh,!1))},this.getSize=function(e){return e.set(el,eh)},this.setSize=function(e,t,i=!0){if(eC.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}el=e,eh=t,L.width=Math.floor(e*ec),L.height=Math.floor(t*ec),!0===i&&(L.style.width=e+"px",L.style.height=t+"px"),this.setViewport(0,0,e,t)},this.getDrawingBufferSize=function(e){return e.set(el*ec,eh*ec).floor()},this.setDrawingBufferSize=function(e,t,i){el=e,eh=t,ec=i,L.width=Math.floor(e*i),L.height=Math.floor(t*i),this.setViewport(0,0,e,t)},this.getCurrentViewport=function(e){return e.copy(en)},this.getViewport=function(e){return e.copy(ep)},this.setViewport=function(e,t,i,n){e.isVector4?ep.set(e.x,e.y,e.z,e.w):ep.set(e,t,i,n),r.viewport(en.copy(ep).multiplyScalar(ec).floor())},this.getScissor=function(e){return e.copy(ef)},this.setScissor=function(e,t,i,n){e.isVector4?ef.set(e.x,e.y,e.z,e.w):ef.set(e,t,i,n),r.scissor(er.copy(ef).multiplyScalar(ec).floor())},this.getScissorTest=function(){return em},this.setScissorTest=function(e){r.setScissorTest(em=e)},this.setOpaqueSort=function(e){eu=e},this.setTransparentSort=function(e){ed=e},// Clearing
this.getClearColor=function(e){return e.copy(b.getClearColor())},this.setClearColor=function(){b.setClearColor.apply(b,arguments)},this.getClearAlpha=function(){return b.getClearAlpha()},this.setClearAlpha=function(){b.setClearAlpha.apply(b,arguments)},this.clear=function(e=!0,t=!0,i=!0){let n=0;if(e){// check if we're trying to clear an integer target
let e=!1;if(null!==ee){let t=ee.texture.format;e=1033===t||1031===t||1029===t}// use the appropriate clear functions to clear the target if it's a signed
// or unsigned integer target
if(e){let e=ee.texture.type,t=b.getClearColor(),i=b.getClearAlpha(),n=t.r,r=t.g,a=t.b;1009===e||1014===e||1012===e||1020===e||1017===e||1018===e?(H[0]=n,H[1]=r,H[2]=a,H[3]=i,eT.clearBufferuiv(eT.COLOR,0,H)):(W[0]=n,W[1]=r,W[2]=a,W[3]=i,eT.clearBufferiv(eT.COLOR,0,W))}else n|=eT.COLOR_BUFFER_BIT}t&&(n|=eT.DEPTH_BUFFER_BIT),i&&(n|=eT.STENCIL_BUFFER_BIT),eT.clear(n)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},//
this.dispose=function(){L.removeEventListener("webglcontextlost",eP,!1),L.removeEventListener("webglcontextrestored",eL,!1),L.removeEventListener("webglcontextcreationerror",eN,!1),v.dispose(),y.dispose(),s.dispose(),l.dispose(),h.dispose(),f.dispose(),C.dispose(),P.dispose(),m.dispose(),eC.dispose(),eC.removeEventListener("sessionstart",eD),eC.removeEventListener("sessionend",eO),ex&&(ex.dispose(),ex=null),ez.stop()},// Buffer rendering
this.renderBufferDirect=function(e,t,i,a,c,f){let m;null===t&&(t=eM);let v=c.isMesh&&0>c.matrixWorld.determinant(),y=function(e,t,i,a,c){var d;!0!==t.isScene&&(t=eM),o.resetTextureUnits();let p=t.fog,f=a.isMeshStandardMaterial?t.environment:null,m=null===ee?K.outputColorSpace:!0===ee.isXRRenderTarget?ee.texture.colorSpace:u,v=(a.isMeshStandardMaterial?h:l).get(a.envMap||f),y=!0===a.vertexColors&&!!i.attributes.color&&4===i.attributes.color.itemSize,_=!!i.attributes.tangent&&(!!a.normalMap||a.anisotropy>0),w=!!i.morphAttributes.position,b=!!i.morphAttributes.normal,S=!!i.morphAttributes.color,E=0;a.toneMapped&&(null===ee||!0===ee.isXRRenderTarget)&&(E=K.toneMapping);let T=i.morphAttributes.position||i.morphAttributes.normal||i.morphAttributes.color,A=void 0!==T?T.length:0,R=s.get(a),C=q.state.lights;if(!0===ev&&(!0===ey||e!==ei)){let t=e===ei&&a.id===et;// we might want to call this function with some ClippingGroup
// object instead of the material, once it becomes feasible
// (#8465, #8379)
x.setState(a,e,t)}//
let L=!1;a.version===R.__version?R.needsLights&&R.lightsStateVersion!==C.state.version?L=!0:R.outputColorSpace!==m?L=!0:c.isInstancedMesh&&!1===R.instancing?L=!0:c.isInstancedMesh||!0!==R.instancing?c.isSkinnedMesh&&!1===R.skinning?L=!0:c.isSkinnedMesh||!0!==R.skinning?c.isInstancedMesh&&!0===R.instancingColor&&null===c.instanceColor?L=!0:c.isInstancedMesh&&!1===R.instancingColor&&null!==c.instanceColor?L=!0:R.envMap!==v?L=!0:!0===a.fog&&R.fog!==p?L=!0:void 0!==R.numClippingPlanes&&(R.numClippingPlanes!==x.numPlanes||R.numIntersection!==x.numIntersection)?L=!0:R.vertexAlphas!==y?L=!0:R.vertexTangents!==_?L=!0:R.morphTargets!==w?L=!0:R.morphNormals!==b?L=!0:R.morphColors!==S?L=!0:R.toneMapping!==E?L=!0:!0===n.isWebGL2&&R.morphTargetsCount!==A&&(L=!0):L=!0:L=!0:(L=!0,R.__version=a.version);//
let N=R.currentProgram;!0===L&&(N=eH(a,t,c));let I=!1,U=!1,D=!1,O=N.getUniforms(),z=R.uniforms;if(r.useProgram(N.program)&&(I=!0,U=!0,D=!0),a.id!==et&&(et=a.id,U=!0),I||ei!==e){// common camera uniforms
O.setValue(eT,"projectionMatrix",e.projectionMatrix),O.setValue(eT,"viewMatrix",e.matrixWorldInverse);let t=O.map.cameraPosition;void 0!==t&&t.setValue(eT,eb.setFromMatrixPosition(e.matrixWorld)),n.logarithmicDepthBuffer&&O.setValue(eT,"logDepthBufFC",2/(Math.log(e.far+1)/Math.LN2)),(a.isMeshPhongMaterial||a.isMeshToonMaterial||a.isMeshLambertMaterial||a.isMeshBasicMaterial||a.isMeshStandardMaterial||a.isShaderMaterial)&&O.setValue(eT,"isOrthographic",!0===e.isOrthographicCamera),ei!==e&&(ei=e,// lighting uniforms depend on the camera so enforce an update
// now, in case this material supports lights - or later, when
// the next material that does gets activated:
U=!0,D=!0)}// skinning and morph target uniforms must be set even if material didn't change
// auto-setting of texture unit for bone and morph texture must go before other textures
// otherwise textures used for skinning and morphing can take over texture units reserved for other material textures
if(c.isSkinnedMesh){O.setOptional(eT,c,"bindMatrix"),O.setOptional(eT,c,"bindMatrixInverse");let e=c.skeleton;e&&(n.floatVertexTextures?(null===e.boneTexture&&e.computeBoneTexture(),O.setValue(eT,"boneTexture",e.boneTexture,o),O.setValue(eT,"boneTextureSize",e.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let B=i.morphAttributes;// UBOs
if((void 0!==B.position||void 0!==B.normal||void 0!==B.color&&!0===n.isWebGL2)&&M.update(c,i,N),(U||R.receiveShadow!==c.receiveShadow)&&(R.receiveShadow=c.receiveShadow,O.setValue(eT,"receiveShadow",c.receiveShadow)),a.isMeshGouraudMaterial&&null!==a.envMap&&(z.envMap.value=v,z.flipEnvMap.value=v.isCubeTexture&&!1===v.isRenderTargetTexture?-1:1),U&&(O.setValue(eT,"toneMappingExposure",K.toneMappingExposure),R.needsLights&&(d=D,z.ambientLightColor.needsUpdate=d,z.lightProbe.needsUpdate=d,z.directionalLights.needsUpdate=d,z.directionalLightShadows.needsUpdate=d,z.pointLights.needsUpdate=d,z.pointLightShadows.needsUpdate=d,z.spotLights.needsUpdate=d,z.spotLightShadows.needsUpdate=d,z.rectAreaLights.needsUpdate=d,z.hemisphereLights.needsUpdate=d),p&&!0===a.fog&&g.refreshFogUniforms(z,p),g.refreshMaterialUniforms(z,a,ec,eh,ex),nE.upload(eT,R.uniformsList,z,o)),a.isShaderMaterial&&!0===a.uniformsNeedUpdate&&(nE.upload(eT,R.uniformsList,z,o),a.uniformsNeedUpdate=!1),a.isSpriteMaterial&&O.setValue(eT,"center",c.center),// common matrices
O.setValue(eT,"modelViewMatrix",c.modelViewMatrix),O.setValue(eT,"normalMatrix",c.normalMatrix),O.setValue(eT,"modelMatrix",c.matrixWorld),a.isShaderMaterial||a.isRawShaderMaterial){let e=a.uniformsGroups;for(let t=0,i=e.length;t<i;t++)if(n.isWebGL2){let i=e[t];P.update(i,N),P.bind(i,N)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return N}(e,t,i,a,c);r.setMaterial(a,v);//
let _=i.index,w=1;if(!0===a.wireframe){if(void 0===(_=p.getWireframeAttribute(i)))return;w=2}//
let b=i.drawRange,S=i.attributes.position,A=b.start*w,R=(b.start+b.count)*w;null!==f&&(A=Math.max(A,f.start*w),R=Math.min(R,(f.start+f.count)*w)),null!==_?(A=Math.max(A,0),R=Math.min(R,_.count)):null!=S&&(A=Math.max(A,0),R=Math.min(R,S.count));let L=R-A;if(L<0||L===1/0)return;//
C.setup(c,a,y,i,_);let N=E;//
if(null!==_&&(m=d.get(_),(N=T).setIndex(m)),c.isMesh)!0===a.wireframe?(r.setLineWidth(a.wireframeLinewidth*eS()),N.setMode(eT.LINES)):N.setMode(eT.TRIANGLES);else if(c.isLine){let e=a.linewidth;void 0===e&&(e=1),r.setLineWidth(e*eS()),c.isLineSegments?N.setMode(eT.LINES):c.isLineLoop?N.setMode(eT.LINE_LOOP):N.setMode(eT.LINE_STRIP)}else c.isPoints?N.setMode(eT.POINTS):c.isSprite&&N.setMode(eT.TRIANGLES);if(c.isInstancedMesh)N.renderInstances(A,L,c.count);else if(i.isInstancedBufferGeometry){let e=void 0!==i._maxInstanceCount?i._maxInstanceCount:1/0,t=Math.min(i.instanceCount,e);N.renderInstances(A,L,t)}else N.render(A,L)},// Compile
this.compile=function(e,t){function i(e,t,i){!0===e.transparent&&2===e.side&&!1===e.forceSinglePass?(e.side=1,e.needsUpdate=!0,eH(e,t,i),e.side=0,e.needsUpdate=!0,eH(e,t,i),e.side=2):eH(e,t,i)}(q=y.get(e)).init(),Y.push(q),e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(q.pushLight(e),e.castShadow&&q.pushShadow(e))}),q.setupLights(K._useLegacyLights),e.traverse(function(t){let n=t.material;if(n){if(Array.isArray(n))for(let r=0;r<n.length;r++){let a=n[r];i(a,e,t)}else i(n,e,t)}}),Y.pop(),q=null};// Animation Loop
let eU=null;function eD(){ez.stop()}function eO(){ez.start()}let ez=new t5;function eB(e,t,a,s){let l=e.opaque,h=e.transmissive,c=e.transparent;q.setupLightsView(a),!0===ev&&x.setGlobalState(K.clippingPlanes,a),h.length>0&&function(e,t,r,a){let s=n.isWebGL2;null===ex&&(ex=new j(1,1,{generateMipmaps:!0,type:i.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:s?4:0})),K.getDrawingBufferSize(ew),s?ex.setSize(ew.x,ew.y):ex.setSize(w(ew.x),w(ew.y));//
let l=K.getRenderTarget();K.setRenderTarget(ex),K.getClearColor(es),(eo=K.getClearAlpha())<1&&K.setClearColor(16777215,.5),K.clear();// Turn off the features which can affect the frag color for opaque objects pass.
// Otherwise they are applied twice in opaque objects pass and transmission objects pass.
let h=K.toneMapping;K.toneMapping=0,eF(e,r,a),o.updateMultisampleRenderTarget(ex),o.updateRenderTargetMipmap(ex);let c=!1;for(let e=0,i=t.length;e<i;e++){let i=t[e],n=i.object,s=i.geometry,o=i.material,l=i.group;if(2===o.side&&n.layers.test(a.layers)){let e=o.side;o.side=1,o.needsUpdate=!0,eV(n,r,a,s,o,l),o.side=e,o.needsUpdate=!0,c=!0}}!0===c&&(o.updateMultisampleRenderTarget(ex),o.updateRenderTargetMipmap(ex)),K.setRenderTarget(l),K.setClearColor(es,eo),K.toneMapping=h}(l,h,t,a),s&&r.viewport(en.copy(s)),l.length>0&&eF(l,t,a),h.length>0&&eF(h,t,a),c.length>0&&eF(c,t,a),// Ensure depth buffer writing is enabled so it can be cleared on next render
r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),r.setPolygonOffset(!1)}function eF(e,t,i){let n=!0===t.isScene?t.overrideMaterial:null;for(let r=0,a=e.length;r<a;r++){let a=e[r],s=a.object,o=a.geometry,l=null===n?a.material:n,h=a.group;s.layers.test(i.layers)&&eV(s,t,i,o,l,h)}}function eV(e,t,i,n,r,a){e.onBeforeRender(K,t,i,n,r,a),e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),r.onBeforeRender(K,t,i,n,e,a),!0===r.transparent&&2===r.side&&!1===r.forceSinglePass?(r.side=1,r.needsUpdate=!0,K.renderBufferDirect(i,t,n,r,e,a),r.side=0,r.needsUpdate=!0,K.renderBufferDirect(i,t,n,r,e,a),r.side=2):K.renderBufferDirect(i,t,n,r,e,a),e.onAfterRender(K,t,i,n,r,a)}function eH(e,t,i){!0!==t.isScene&&(t=eM);let n=s.get(e),r=q.state.lights,a=q.state.shadowsArray,o=r.state.version,c=m.getParameters(e,r.state,a,t,i),u=m.getProgramCacheKey(c),d=n.programs;// always update environment and fog - changing these trigger an getProgram call, but it's possible that the program doesn't change
n.environment=e.isMeshStandardMaterial?t.environment:null,n.fog=t.fog,n.envMap=(e.isMeshStandardMaterial?h:l).get(e.envMap||n.environment),void 0===d&&(// new material
e.addEventListener("dispose",eI),d=new Map,n.programs=d);let p=d.get(u);if(void 0!==p){if(n.currentProgram===p&&n.lightsStateVersion===o)return eW(e,c),p}else c.uniforms=m.getUniforms(e),e.onBuild(i,c,K),e.onBeforeCompile(c,K),p=m.acquireProgram(c,u),d.set(u,p),n.uniforms=c.uniforms;let f=n.uniforms;(e.isShaderMaterial||e.isRawShaderMaterial)&&!0!==e.clipping||(f.clippingPlanes=x.uniform),eW(e,c),// store the light setup it was created for
n.needsLights=e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&!0===e.lights,n.lightsStateVersion=o,n.needsLights&&(// wire up the material to this renderer's lighting state
f.ambientLightColor.value=r.state.ambient,f.lightProbe.value=r.state.probe,f.directionalLights.value=r.state.directional,f.directionalLightShadows.value=r.state.directionalShadow,f.spotLights.value=r.state.spot,f.spotLightShadows.value=r.state.spotShadow,f.rectAreaLights.value=r.state.rectArea,f.ltc_1.value=r.state.rectAreaLTC1,f.ltc_2.value=r.state.rectAreaLTC2,f.pointLights.value=r.state.point,f.pointLightShadows.value=r.state.pointShadow,f.hemisphereLights.value=r.state.hemi,f.directionalShadowMap.value=r.state.directionalShadowMap,f.directionalShadowMatrix.value=r.state.directionalShadowMatrix,f.spotShadowMap.value=r.state.spotShadowMap,f.spotLightMatrix.value=r.state.spotLightMatrix,f.spotLightMap.value=r.state.spotLightMap,f.pointShadowMap.value=r.state.pointShadowMap,f.pointShadowMatrix.value=r.state.pointShadowMatrix);let g=p.getUniforms(),v=nE.seqWithValue(g.seq,f);return n.currentProgram=p,n.uniformsList=v,p}function eW(e,t){let i=s.get(e);i.outputColorSpace=t.outputColorSpace,i.instancing=t.instancing,i.instancingColor=t.instancingColor,i.skinning=t.skinning,i.morphTargets=t.morphTargets,i.morphNormals=t.morphNormals,i.morphColors=t.morphColors,i.morphTargetsCount=t.morphTargetsCount,i.numClippingPlanes=t.numClippingPlanes,i.numIntersection=t.numClipIntersection,i.vertexAlphas=t.vertexAlphas,i.vertexTangents=t.vertexTangents,i.toneMapping=t.toneMapping}ez.setAnimationLoop(function(e){eU&&eU(e)}),"undefined"!=typeof self&&ez.setContext(self),this.setAnimationLoop=function(e){eU=e,eC.setAnimationLoop(e),null===e?ez.stop():ez.start()},eC.addEventListener("sessionstart",eD),eC.addEventListener("sessionend",eO),// Rendering
this.render=function(e,t){if(void 0!==t&&!0!==t.isCamera){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(!0===J)return;!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),null===t.parent&&!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),!0===eC.enabled&&!0===eC.isPresenting&&(!0===eC.cameraAutoUpdate&&eC.updateCamera(t),t=eC.getCamera()),!0===e.isScene&&e.onBeforeRender(K,e,t,ee),(q=y.get(e,Y.length)).init(),Y.push(q),e_.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),eg.setFromProjectionMatrix(e_),ey=this.localClippingEnabled,ev=x.init(this.clippingPlanes,ey),(k=v.get(e,X.length)).init(),X.push(k),function e(t,i,n,r){if(!1===t.visible)return;let a=t.layers.test(i.layers);if(a){if(t.isGroup)n=t.renderOrder;else if(t.isLOD)!0===t.autoUpdate&&t.update(i);else if(t.isLight)q.pushLight(t),t.castShadow&&q.pushShadow(t);else if(t.isSprite){if(!t.frustumCulled||eg.intersectsSprite(t)){r&&eb.setFromMatrixPosition(t.matrixWorld).applyMatrix4(e_);let e=f.update(t),i=t.material;i.visible&&k.push(t,e,i,n,eb.z,null)}}else if((t.isMesh||t.isLine||t.isPoints)&&(!t.frustumCulled||eg.intersectsObject(t))){let e=f.update(t),i=t.material;if(r&&(void 0!==t.boundingSphere?(null===t.boundingSphere&&t.computeBoundingSphere(),eb.copy(t.boundingSphere.center)):(null===e.boundingSphere&&e.computeBoundingSphere(),eb.copy(e.boundingSphere.center)),eb.applyMatrix4(t.matrixWorld).applyMatrix4(e_)),Array.isArray(i)){let r=e.groups;for(let a=0,s=r.length;a<s;a++){let s=r[a],o=i[s.materialIndex];o&&o.visible&&k.push(t,e,o,n,eb.z,s)}}else i.visible&&k.push(t,e,i,n,eb.z,null)}}let s=t.children;for(let t=0,a=s.length;t<a;t++)e(s[t],i,n,r)}(e,t,0,K.sortObjects),k.finish(),!0===K.sortObjects&&k.sort(eu,ed),//
this.info.render.frame++,!0===ev&&x.beginShadows();let i=q.state.shadowsArray;if(_.render(i,e,t),!0===ev&&x.endShadows(),!0===this.info.autoReset&&this.info.reset(),//
b.render(k,e),// render scene
q.setupLights(K._useLegacyLights),t.isArrayCamera){let i=t.cameras;for(let t=0,n=i.length;t<n;t++){let n=i[t];eB(k,e,n,n.viewport)}}else eB(k,e,t);null!==ee&&(// resolve multisample renderbuffers to a single-sample texture if necessary
o.updateMultisampleRenderTarget(ee),// Generate mipmap if we're using any kind of mipmap filtering
o.updateRenderTargetMipmap(ee)),!0===e.isScene&&e.onAfterRender(K,e,t),// _gl.finish();
C.resetDefaultState(),et=-1,ei=null,Y.pop(),q=Y.length>0?Y[Y.length-1]:null,X.pop(),k=X.length>0?X[X.length-1]:null},this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(e,t,n){s.get(e.texture).__webglTexture=t,s.get(e.depthTexture).__webglTexture=n;let r=s.get(e);r.__hasExternalTextures=!0,r.__hasExternalTextures&&(r.__autoAllocateDepthBuffer=void 0===n,r.__autoAllocateDepthBuffer||!0!==i.has("WEBGL_multisampled_render_to_texture")||(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),r.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(e,t){let i=s.get(e);i.__webglFramebuffer=t,i.__useDefaultFramebuffer=void 0===t},this.setRenderTarget=function(e,t=0,i=0){ee=e,Q=t,$=i;let a=!0,l=null,h=!1,c=!1;if(e){let u=s.get(e);void 0!==u.__useDefaultFramebuffer?(// We need to make sure to rebind the framebuffer.
r.bindFramebuffer(eT.FRAMEBUFFER,null),a=!1):void 0===u.__webglFramebuffer?o.setupRenderTarget(e):u.__hasExternalTextures&&o.rebindTextures(e,s.get(e.texture).__webglTexture,s.get(e.depthTexture).__webglTexture);let d=e.texture;(d.isData3DTexture||d.isDataArrayTexture||d.isCompressedArrayTexture)&&(c=!0);let p=s.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(l=Array.isArray(p[t])?p[t][i]:p[t],h=!0):l=n.isWebGL2&&e.samples>0&&!1===o.useMultisampledRTT(e)?s.get(e).__webglMultisampledFramebuffer:Array.isArray(p)?p[i]:p,en.copy(e.viewport),er.copy(e.scissor),ea=e.scissorTest}else en.copy(ep).multiplyScalar(ec).floor(),er.copy(ef).multiplyScalar(ec).floor(),ea=em;let u=r.bindFramebuffer(eT.FRAMEBUFFER,l);if(u&&n.drawBuffers&&a&&r.drawBuffers(e,l),r.viewport(en),r.scissor(er),r.setScissorTest(ea),h){let n=s.get(e.texture);eT.framebufferTexture2D(eT.FRAMEBUFFER,eT.COLOR_ATTACHMENT0,eT.TEXTURE_CUBE_MAP_POSITIVE_X+t,n.__webglTexture,i)}else if(c){let n=s.get(e.texture),r=t||0;eT.framebufferTextureLayer(eT.FRAMEBUFFER,eT.COLOR_ATTACHMENT0,n.__webglTexture,i||0,r)}et=-1},this.readRenderTargetPixels=function(e,t,a,o,l,h,c){if(!(e&&e.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let u=s.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==c&&(u=u[c]),u){r.bindFramebuffer(eT.FRAMEBUFFER,u);try{let r=e.texture,s=r.format,c=r.type;if(1023!==s&&A.convert(s)!==eT.getParameter(eT.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let u=1016===c&&(i.has("EXT_color_buffer_half_float")||n.isWebGL2&&i.has("EXT_color_buffer_float"));if(1009!==c&&A.convert(c)!==eT.getParameter(eT.IMPLEMENTATION_COLOR_READ_TYPE)&&// Edge and Chrome Mac < 52 (#9513)
!(1015===c&&(n.isWebGL2||i.has("OES_texture_float")||i.has("WEBGL_color_buffer_float")))&&// Chrome Mac >= 52 and Firefox
!u){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)
t>=0&&t<=e.width-o&&a>=0&&a<=e.height-l&&eT.readPixels(t,a,o,l,A.convert(s),A.convert(c),h)}finally{// restore framebuffer of current render target if necessary
let e=null!==ee?s.get(ee).__webglFramebuffer:null;r.bindFramebuffer(eT.FRAMEBUFFER,e)}}},this.copyFramebufferToTexture=function(e,t,i=0){let n=Math.pow(2,-i),a=Math.floor(t.image.width*n),s=Math.floor(t.image.height*n);o.setTexture2D(t,0),eT.copyTexSubImage2D(eT.TEXTURE_2D,i,0,0,e.x,e.y,a,s),r.unbindTexture()},this.copyTextureToTexture=function(e,t,i,n=0){let a=t.image.width,s=t.image.height,l=A.convert(i.format),h=A.convert(i.type);o.setTexture2D(i,0),// As another texture upload may have changed pixelStorei
// parameters, make sure they are correct for the dstTexture
eT.pixelStorei(eT.UNPACK_FLIP_Y_WEBGL,i.flipY),eT.pixelStorei(eT.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),eT.pixelStorei(eT.UNPACK_ALIGNMENT,i.unpackAlignment),t.isDataTexture?eT.texSubImage2D(eT.TEXTURE_2D,n,e.x,e.y,a,s,l,h,t.image.data):t.isCompressedTexture?eT.compressedTexSubImage2D(eT.TEXTURE_2D,n,e.x,e.y,t.mipmaps[0].width,t.mipmaps[0].height,l,t.mipmaps[0].data):eT.texSubImage2D(eT.TEXTURE_2D,n,e.x,e.y,l,h,t.image),0===n&&i.generateMipmaps&&eT.generateMipmap(eT.TEXTURE_2D),r.unbindTexture()},this.copyTextureToTexture3D=function(e,t,i,n,a=0){let s;if(K.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let l=e.max.x-e.min.x+1,h=e.max.y-e.min.y+1,c=e.max.z-e.min.z+1,u=A.convert(n.format),d=A.convert(n.type);if(n.isData3DTexture)o.setTexture3D(n,0),s=eT.TEXTURE_3D;else if(n.isDataArrayTexture)o.setTexture2DArray(n,0),s=eT.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}eT.pixelStorei(eT.UNPACK_FLIP_Y_WEBGL,n.flipY),eT.pixelStorei(eT.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),eT.pixelStorei(eT.UNPACK_ALIGNMENT,n.unpackAlignment);let p=eT.getParameter(eT.UNPACK_ROW_LENGTH),f=eT.getParameter(eT.UNPACK_IMAGE_HEIGHT),m=eT.getParameter(eT.UNPACK_SKIP_PIXELS),g=eT.getParameter(eT.UNPACK_SKIP_ROWS),v=eT.getParameter(eT.UNPACK_SKIP_IMAGES),y=i.isCompressedTexture?i.mipmaps[0]:i.image;eT.pixelStorei(eT.UNPACK_ROW_LENGTH,y.width),eT.pixelStorei(eT.UNPACK_IMAGE_HEIGHT,y.height),eT.pixelStorei(eT.UNPACK_SKIP_PIXELS,e.min.x),eT.pixelStorei(eT.UNPACK_SKIP_ROWS,e.min.y),eT.pixelStorei(eT.UNPACK_SKIP_IMAGES,e.min.z),i.isDataTexture||i.isData3DTexture?eT.texSubImage3D(s,a,t.x,t.y,t.z,l,h,c,u,d,y.data):i.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),eT.compressedTexSubImage3D(s,a,t.x,t.y,t.z,l,h,c,u,y.data)):eT.texSubImage3D(s,a,t.x,t.y,t.z,l,h,c,u,d,y),eT.pixelStorei(eT.UNPACK_ROW_LENGTH,p),eT.pixelStorei(eT.UNPACK_IMAGE_HEIGHT,f),eT.pixelStorei(eT.UNPACK_SKIP_PIXELS,m),eT.pixelStorei(eT.UNPACK_SKIP_ROWS,g),eT.pixelStorei(eT.UNPACK_SKIP_IMAGES,v),0===a&&n.generateMipmaps&&eT.generateMipmap(s),r.unbindTexture()},this.initTexture=function(e){e.isCubeTexture?o.setTextureCube(e,0):e.isData3DTexture?o.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?o.setTexture2DArray(e,0):o.setTexture2D(e,0),r.unbindTexture()},this.resetState=function(){Q=0,$=0,ee=null,r.reset(),C.reset()},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===c?3001:3e3}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=3001===e?c:u}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}(class extends rs{}).prototype.isWebGL1Renderer=!0;/**
 * Extensible curve object.
 *
 * Some common of curve methods:
 * .getPoint( t, optionalTarget ), .getTangent( t, optionalTarget )
 * .getPointAt( u, optionalTarget ), .getTangentAt( u, optionalTarget )
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This following curves inherit from THREE.Curve:
 *
 * -- 2D curves --
 * THREE.ArcCurve
 * THREE.CubicBezierCurve
 * THREE.EllipseCurve
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.SplineCurve
 *
 * -- 3D curves --
 * THREE.CatmullRomCurve3
 * THREE.CubicBezierCurve3
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath.
 *
 **/class ro{constructor(){this.type="Curve",this.arcLengthDivisions=200}// Virtual base class method to overwrite and implement in subclasses
//	- t [0 .. 1]
getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}// Get point at relative position in curve according to arc length
// - u [0 .. 1]
getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}// Get sequence of points using getPoint( t )
getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}// Get sequence of points using getPointAt( u )
getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}// Get total curve arc length
getLength(){let e=this.getLengths();return e[e.length-1]}// Get list of cumulative segment lengths
getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)t.push(r+=(i=this.getPoint(a/e)).distanceTo(n)),n=i;return this.cacheArcLengths=t,t;// { sums: cache, sum: sum }; Sum is in the last element.
}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
getUtoTmapping(e,t){let i;let n=this.getLengths(),r=0,a=n.length;i=t||e*n[a-1];// binary search for the index with largest value smaller than target u distance
let s=0,o=a-1,l;for(;s<=o;)if((l=n[r=Math.floor(s+(o-s)/2)]-i)<0)s=r+1;else if(l>0)o=r-1;else{o=r;break;// DONE
}if(n[r=o]===i)return r/(a-1);// we could get finer grain at lengths, or use simple interpolation between two points
let h=n[r],c=n[r+1],u=(r+(i-h)/(c-h))/(a-1);return u}// Returns a unit vector tangent at t
// In case any sub curve does not implement its tangent derivation,
// 2 points a small delta apart will be used to find its gradient
// which seems to give a reasonable approximation
getTangent(e,t){let i=e-1e-4,n=e+1e-4;i<0&&(i=0),n>1&&(n=1);let r=this.getPoint(i),a=this.getPoint(n),s=t||(r.isVector2?new S:new Z);return s.copy(a).sub(r).normalize(),s}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){// see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
let i=new Z,n=[],r=[],a=[],s=new Z,o=new eE;// compute the tangent vectors for each segment on the curve
for(let t=0;t<=e;t++){let i=t/e;n[t]=this.getTangentAt(i,new Z)}// select an initial normal vector perpendicular to the first tangent vector,
// and in the direction of the minimum tangent xyz component
r[0]=new Z,a[0]=new Z;let l=Number.MAX_VALUE,h=Math.abs(n[0].x),c=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=l&&(l=h,i.set(1,0,0)),c<=l&&(l=c,i.set(0,1,0)),u<=l&&i.set(0,0,1),s.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],s),a[0].crossVectors(n[0],r[0]);// compute the slowly-varying normal and binormal vectors for each segment on the curve
for(let t=1;t<=e;t++){if(r[t]=r[t-1].clone(),a[t]=a[t-1].clone(),s.crossVectors(n[t-1],n[t]),s.length()>Number.EPSILON){s.normalize();let e=Math.acos(x(n[t-1].dot(n[t]),-1,1));// clamp for floating pt errors
r[t].applyMatrix4(o.makeRotationAxis(s,e))}a[t].crossVectors(n[t],r[t])}// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same
if(!0===t){let t=Math.acos(x(r[0].dot(r[e]),-1,1));t/=e,n[0].dot(s.crossVectors(r[0],r[e]))>0&&(t=-t);for(let i=1;i<=e;i++)// twist a little...
r[i].applyMatrix4(o.makeRotationAxis(n[i],t*i)),a[i].crossVectors(n[i],r[i])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rl extends ro{constructor(e=0,t=0,i=1,n=1,r=0,a=2*Math.PI,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=s,this.aRotation=o}getPoint(e,t){let i=t||new S,n=2*Math.PI,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;// ensures that deltaAngle is 0 .. 2 PI
for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(r=a?0:n),!0!==this.aClockwise||a||(r===n?r=-n:r-=n);let s=this.aStartAngle+e*r,o=this.aX+this.xRadius*Math.cos(s),l=this.aY+this.yRadius*Math.sin(s);if(0!==this.aRotation){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),i=o-this.aX,n=l-this.aY;// Rotate the point about the center of the ellipse.
o=i*e-n*t+this.aX,l=i*t+n*e+this.aY}return i.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}/**
 * Centripetal CatmullRom Curve - which is useful for avoiding
 * cusps and self-intersections in non-uniform catmull rom curves.
 * http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
 *
 * curve.type accepts centripetal(default), chordal and catmullrom
 * curve.tension is used for catmullrom which defaults to 0.5
 *//*
Based on an optimized c++ solution in
 - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
 - http://ideone.com/NoEbVM

This CubicPoly class could be used for reusing some variables and calculations,
but for three.js curve use, it could be possible inlined and flatten into a single function call
which can be placed in CurveUtils.
*/function rh(){let e=0,t=0,i=0,n=0;/*
	 * Compute coefficients for a cubic polynomial
	 *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
	 * such that
	 *   p(0) = x0, p(1) = x1
	 *  and
	 *   p'(0) = t0, p'(1) = t1.
	 */function r(r,a,s,o){e=r,t=s,i=-3*r+3*a-2*s-o,n=2*r-2*a+s+o}return{initCatmullRom:function(e,t,i,n,a){r(t,i,a*(i-e),a*(n-t))},initNonuniformCatmullRom:function(e,t,i,n,a,s,o){// compute tangents when parameterized in [t1,t2]
let l=(t-e)/a-(i-e)/(a+s)+(i-t)/s,h=(i-t)/s-(n-t)/(s+o)+(n-i)/o;r(t,i,// rescale tangents for parametrization in [0,1]
l*=s,h*=s)},calc:function(r){let a=r*r;return e+t*r+i*a+n*(a*r)}}}//
const rc=/*@__PURE__*/new Z,ru=/*@__PURE__*/new rh,rd=/*@__PURE__*/new rh,rp=/*@__PURE__*/new rh;/**
 * Bezier Curves formulas obtained from
 * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 */function rf(e,t,i,n,r){let a=(n-t)*.5,s=(r-i)*.5,o=e*e;return(2*i-2*n+a+s)*(e*o)+(-3*i+3*n-2*a-s)*o+a*e+i}function rm(e,t,i,n){return(//
function(e,t){let i=1-e;return i*i*t}(e,t)+2*(1-e)*e*i+e*e*n)}function rg(e,t,i,n,r){return(//
function(e,t){let i=1-e;return i*i*i*t}(e,t)+function(e,t){let i=1-e;return 3*i*i*e*t}(e,i)+3*(1-e)*e*e*n+e*e*e*r)}class rv extends ro{constructor(e=new S,t=new S,i=new S,n=new S){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new S){let i=this.v0,n=this.v1,r=this.v2,a=this.v3;return t.set(rg(e,i.x,n.x,r.x,a.x),rg(e,i.y,n.y,r.y,a.y)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ry extends ro{constructor(e=new S,t=new S){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new S){return 1===e?t.copy(this.v2):(t.copy(this.v2).sub(this.v1),t.multiplyScalar(e).add(this.v1)),t}// Line curve is linear, so we can overwrite default getPointAt
getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rx extends ro{constructor(e=new S,t=new S,i=new S){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new S){let i=this.v0,n=this.v1,r=this.v2;return t.set(rm(e,i.x,n.x,r.x),rm(e,i.y,n.y,r.y)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class r_ extends ro{constructor(e=new Z,t=new Z,i=new Z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Z){let i=this.v0,n=this.v1,r=this.v2;return t.set(rm(e,i.x,n.x,r.x),rm(e,i.y,n.y,r.y),rm(e,i.z,n.z,r.z)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rw extends ro{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new S){let i=this.points,n=(i.length-1)*e,r=Math.floor(n),a=n-r,s=i[0===r?r:r-1],o=i[r],l=i[r>i.length-2?i.length-1:r+1],h=i[r>i.length-3?i.length-1:r+2];return t.set(rf(a,s.x,o.x,l.x,h.x),rf(a,s.y,o.y,l.y,h.y)),t}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(new S().fromArray(i))}return this}}var rb=/*#__PURE__*/Object.freeze({__proto__:null,ArcCurve:class extends rl{constructor(e,t,i,n,r,a){super(e,t,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}},CatmullRomCurve3:class extends ro{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new Z){let i,n;let r=this.points,a=r.length,s=(a-(this.closed?0:1))*e,o=Math.floor(s),l=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:0===l&&o===a-1&&(o=a-2,l=1),this.closed||o>0?i=r[(o-1)%a]:(// extrapolate first point
rc.subVectors(r[0],r[1]).add(r[0]),i=rc);let h=r[o%a],c=r[(o+1)%a];if(this.closed||o+2<a?n=r[(o+2)%a]:(// extrapolate last point
rc.subVectors(r[a-1],r[a-2]).add(r[a-1]),n=rc),"centripetal"===this.curveType||"chordal"===this.curveType){// init Centripetal / Chordal Catmull-Rom
let e="chordal"===this.curveType?.5:.25,t=Math.pow(i.distanceToSquared(h),e),r=Math.pow(h.distanceToSquared(c),e),a=Math.pow(c.distanceToSquared(n),e);r<1e-4&&(r=1),t<1e-4&&(t=r),a<1e-4&&(a=r),ru.initNonuniformCatmullRom(i.x,h.x,c.x,n.x,t,r,a),rd.initNonuniformCatmullRom(i.y,h.y,c.y,n.y,t,r,a),rp.initNonuniformCatmullRom(i.z,h.z,c.z,n.z,t,r,a)}else"catmullrom"===this.curveType&&(ru.initCatmullRom(i.x,h.x,c.x,n.x,this.tension),rd.initCatmullRom(i.y,h.y,c.y,n.y,this.tension),rp.initCatmullRom(i.z,h.z,c.z,n.z,this.tension));return t.set(ru.calc(l),rd.calc(l),rp.calc(l)),t}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(new Z().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}},CubicBezierCurve:rv,CubicBezierCurve3:class extends ro{constructor(e=new Z,t=new Z,i=new Z,n=new Z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new Z){let i=this.v0,n=this.v1,r=this.v2,a=this.v3;return t.set(rg(e,i.x,n.x,r.x,a.x),rg(e,i.y,n.y,r.y,a.y),rg(e,i.z,n.z,r.z,a.z)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},EllipseCurve:rl,LineCurve:ry,LineCurve3:class extends ro{constructor(e=new Z,t=new Z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new Z){return 1===e?t.copy(this.v2):(t.copy(this.v2).sub(this.v1),t.multiplyScalar(e).add(this.v1)),t}// Line curve is linear, so we can overwrite default getPointAt
getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},QuadraticBezierCurve:rx,QuadraticBezierCurve3:r_,SplineCurve:rw});/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/class rM extends ro{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){// Add a line curve if start and end of lines are not connected
let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new ry(t,e))}// To get accurate point with reference to
// entire path distance at time t,
// following has to be done:
// 1. Length of each sub path have to be known
// 2. Locate and identify type of curve
// 3. Get t for the curve
// 4. Return curve.getPointAt(t')
getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),r=0;// To think about boundaries points.
for(;r<n.length;){if(n[r]>=i){let e=n[r]-i,a=this.curves[r],s=a.getLength(),o=0===s?0:1-e/s;return a.getPointAt(o,t)}r++}return null;// loop where sum != 0, sum > d , sum+1 <d
}// We cannot use the default THREE.Curve getPoint() with getLength() because in
// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
// getPoint() depends on getLength
getLength(){let e=this.getCurveLengths();return e[e.length-1]}// cacheLengths must be recalculated.
updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}// Compute lengths and cache them
// We cannot overwrite getLengths() because UtoT mapping uses it.
getCurveLengths(){// We use cache values if curves and cache array are same length
if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;// Get length of sub-curve
// Push sums into cached array
let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)e.push(t+=this.curves[i].getLength());return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t;let i=[];for(let n=0,r=this.curves;n<r.length;n++){let a=r[n],s=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(s);for(let e=0;e<o.length;e++){let n=o[e];t&&t.equals(n)||(i.push(n),t=n);// ensures no consecutive points are duplicates
}}return this.autoClose&&i.length>1&&!i[i.length-1].equals(i[0])&&i.push(i[0]),i}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let i=e.curves[t];this.curves.push(new rb[i.type]().fromJSON(i))}return this}}class rS extends rM{constructor(e){super(),this.type="Path",this.currentPoint=new S,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new ry(this.currentPoint.clone(),new S(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let r=new rx(this.currentPoint.clone(),new S(e,t),new S(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,a){let s=new rv(this.currentPoint.clone(),new S(e,t),new S(i,n),new S(r,a));return this.curves.push(s),this.currentPoint.set(r,a),this}splineThru(e/*Array of Vector*/){let t=[this.currentPoint.clone()].concat(e),i=new rw(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,a){let s=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+s,t+o,i,n,r,a),this}absarc(e,t,i,n,r,a){return this.absellipse(e,t,i,i,n,r,a),this}ellipse(e,t,i,n,r,a,s,o){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,n,r,a,s,o),this}absellipse(e,t,i,n,r,a,s,o){let l=new rl(e,t,i,n,r,a,s,o);if(this.curves.length>0){// if a previous curve is present, attempt to join
let e=l.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class rE extends tw{constructor(e=[new S(0,-.5),new S(.5,0),new S(0,.5)],t=12,i=0,n=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:n},t=Math.floor(t),// clamp phiLength so it's in range of [ 0, 2PI ]
n=x(n,0,2*Math.PI);// buffers
let r=[],a=[],s=[],o=[],l=[],h=1/t,c=new Z,u=new S,d=new Z,p=new Z,f=new Z,m=0,g=0;// pre-compute normals for initial "meridian"
for(let t=0;t<=e.length-1;t++)switch(t){case 0:m=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,d.x=1*g,d.y=-m,d.z=0*g,f.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(f.x,f.y,f.z);break;default:m=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,d.x=1*g,d.y=-m,d.z=0*g,p.copy(d),d.x+=f.x,d.y+=f.y,d.z+=f.z,d.normalize(),o.push(d.x,d.y,d.z),f.copy(p)}// generate vertices, uvs and normals
for(let r=0;r<=t;r++){let d=i+r*h*n,p=Math.sin(d),f=Math.cos(d);for(let i=0;i<=e.length-1;i++){// vertex
c.x=e[i].x*p,c.y=e[i].y,c.z=e[i].x*f,a.push(c.x,c.y,c.z),// uv
u.x=r/t,u.y=i/(e.length-1),s.push(u.x,u.y);// normal
let n=o[3*i+0]*p,h=o[3*i+1],d=o[3*i+0]*f;l.push(n,h,d)}}// indices
for(let i=0;i<t;i++)for(let t=0;t<e.length-1;t++){let n=t+i*e.length,a=n+e.length,s=n+e.length+1,o=n+1;// faces
r.push(n,a,o),r.push(s,o,a)}// build geometry
this.setIndex(r),this.setAttribute("position",new tp(a,3)),this.setAttribute("uv",new tp(s,2)),this.setAttribute("normal",new tp(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rE(e.points,e.segments,e.phiStart,e.phiLength)}}class rT extends rE{constructor(e=1,t=1,i=4,n=8){let r=new rS;r.absarc(0,-t/2,e,1.5*Math.PI,0),r.absarc(0,t/2,e,0,.5*Math.PI),super(r.getPoints(i),n),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:n}}static fromJSON(e){return new rT(e.radius,e.length,e.capSegments,e.radialSegments)}}class rA extends tw{constructor(e=1,t=32,i=0,n=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);// buffers
let r=[],a=[],s=[],o=[],l=new Z,h=new S;// center point
a.push(0,0,0),s.push(0,0,1),o.push(.5,.5);for(let r=0,c=3;r<=t;r++,c+=3){let u=i+r/t*n;// vertex
l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),// normal
s.push(0,0,1),// uvs
h.x=(a[c]/e+1)/2,h.y=(a[c+1]/e+1)/2,o.push(h.x,h.y)}// indices
for(let e=1;e<=t;e++)r.push(e,e+1,0);// build geometry
this.setIndex(r),this.setAttribute("position",new tp(a,3)),this.setAttribute("normal",new tp(s,3)),this.setAttribute("uv",new tp(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rA(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class rR extends tw{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,s=0,o=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:s,thetaLength:o};let l=this;n=Math.floor(n),r=Math.floor(r);// buffers
let h=[],c=[],u=[],d=[],p=0,f=[],m=i/2,g=0;function v(i){// save the index of the first center vertex
let r=p,a=new S,f=new Z,v=0,y=!0===i?e:t,x=!0===i?1:-1;// first we generate the center vertex data of the cap.
// because the geometry needs one set of uvs per face,
// we must generate a center vertex per face/segment
for(let e=1;e<=n;e++)// vertex
c.push(0,m*x,0),// normal
u.push(0,x,0),// uv
d.push(.5,.5),// increase index
p++;// save the index of the last center vertex
let _=p;// now we generate the surrounding vertices, normals and uvs
for(let e=0;e<=n;e++){let t=e/n,i=t*o+s,r=Math.cos(i),l=Math.sin(i);// vertex
f.x=y*l,f.y=m*x,f.z=y*r,c.push(f.x,f.y,f.z),// normal
u.push(0,x,0),// uv
a.x=.5*r+.5,a.y=.5*l*x+.5,d.push(a.x,a.y),// increase index
p++}// generate indices
for(let e=0;e<n;e++){let t=r+e,n=_+e;!0===i?h.push(n,n+1,t):h.push(n+1,n,t),v+=3}// add a group to the geometry. this will ensure multi material support
l.addGroup(g,v,!0===i?1:2),// calculate new start value for groups
g+=v}// generate geometry
(function(){let a=new Z,v=new Z,y=0,x=(t-e)/i;// generate vertices, normals and uvs
for(let l=0;l<=r;l++){let h=[],g=l/r,y=g*(t-e)+e;for(let e=0;e<=n;e++){let t=e/n,r=t*o+s,l=Math.sin(r),f=Math.cos(r);// vertex
v.x=y*l,v.y=-g*i+m,v.z=y*f,c.push(v.x,v.y,v.z),// normal
a.set(l,x,f).normalize(),u.push(a.x,a.y,a.z),// uv
d.push(t,1-g),// save index of vertex in respective row
h.push(p++)}// now save vertices of the row in our index array
f.push(h)}// generate indices
for(let e=0;e<n;e++)for(let t=0;t<r;t++){// we use the index array to access the correct indices
let i=f[t][e],n=f[t+1][e],r=f[t+1][e+1],a=f[t][e+1];// faces
h.push(i,n,a),h.push(n,r,a),// update group counter
y+=6}// add a group to the geometry. this will ensure multi material support
l.addGroup(g,y,0),// calculate new start value for groups
g+=y})(),!1===a&&(e>0&&v(!0),t>0&&v(!1)),// build geometry
this.setIndex(h),this.setAttribute("position",new tp(c,3)),this.setAttribute("normal",new tp(u,3)),this.setAttribute("uv",new tp(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rR(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rC extends rR{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,s=2*Math.PI){super(0,e,t,i,n,r,a,s),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:s}}static fromJSON(e){return new rC(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rP extends tw{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};// default buffer data
let r=[],a=[];function s(e){r.push(e.x,e.y,e.z)}function o(t,i){let n=3*t;i.x=e[n+0],i.y=e[n+1],i.z=e[n+2]}function l(e,t,i,n){n<0&&1===e.x&&(a[t]=e.x-1),0===i.x&&0===i.z&&(a[t]=n/2/Math.PI+.5)}// Angle around the Y axis, counter-clockwise when looking from above.
function h(e){return Math.atan2(e.z,-e.x)}// the subdivision creates the vertex buffer data
// helper functions
(function(e){let i=new Z,n=new Z,r=new Z;// iterate over all faces and apply a subdivision with the given detail value
for(let a=0;a<t.length;a+=3)// get the vertices of the face
o(t[a+0],i),o(t[a+1],n),o(t[a+2],r),// perform subdivision
function(e,t,i,n){let r=n+1,a=[];// construct all of the vertices for this subdivision
for(let n=0;n<=r;n++){a[n]=[];let s=e.clone().lerp(i,n/r),o=t.clone().lerp(i,n/r),l=r-n;for(let e=0;e<=l;e++)0===e&&n===r?a[n][e]=s:a[n][e]=s.clone().lerp(o,e/l)}// construct all of the faces
for(let e=0;e<r;e++)for(let t=0;t<2*(r-e)-1;t++){let i=Math.floor(t/2);t%2==0?(s(a[e][i+1]),s(a[e+1][i]),s(a[e][i])):(s(a[e][i+1]),s(a[e+1][i+1]),s(a[e+1][i]))}}(i,n,r,e)})(n),// all vertices should lie on a conceptual sphere with a given radius
function(e){let t=new Z;// iterate over the entire buffer and apply the radius to each vertex
for(let i=0;i<r.length;i+=3)t.x=r[i+0],t.y=r[i+1],t.z=r[i+2],t.normalize().multiplyScalar(e),r[i+0]=t.x,r[i+1]=t.y,r[i+2]=t.z}(i),// finally, create the uv data
function(){let e=new Z;for(let t=0;t<r.length;t+=3){e.x=r[t+0],e.y=r[t+1],e.z=r[t+2];let i=h(e)/2/Math.PI+.5,n=Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))/Math.PI+.5;a.push(i,1-n)}(function(){let e=new Z,t=new Z,i=new Z,n=new Z,s=new S,o=new S,c=new S;for(let u=0,d=0;u<r.length;u+=9,d+=6){e.set(r[u+0],r[u+1],r[u+2]),t.set(r[u+3],r[u+4],r[u+5]),i.set(r[u+6],r[u+7],r[u+8]),s.set(a[d+0],a[d+1]),o.set(a[d+2],a[d+3]),c.set(a[d+4],a[d+5]),n.copy(e).add(t).add(i).divideScalar(3);let p=h(n);l(s,d+0,e,p),l(o,d+2,t,p),l(c,d+4,i,p)}})(),function(){// handle case when face straddles the seam, see #3269
for(let e=0;e<a.length;e+=6){// uv data of a single face
let t=a[e+0],i=a[e+2],n=a[e+4],r=Math.max(t,i,n),s=Math.min(t,i,n);// 0.9 is somewhat arbitrary
r>.9&&s<.1&&(t<.2&&(a[e+0]+=1),i<.2&&(a[e+2]+=1),n<.2&&(a[e+4]+=1))}}()}(),// build non-indexed geometry
this.setAttribute("position",new tp(r,3)),this.setAttribute("normal",new tp(r.slice(),3)),this.setAttribute("uv",new tp(a,2)),0===n?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rP(e.vertices,e.indices,e.radius,e.details)}}class rL extends rP{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=1/i,r=[// (±1, ±1, ±1)
-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,// (0, ±1/φ, ±φ)
0,-n,-i,0,-n,i,0,n,-i,0,n,i,// (±1/φ, ±φ, 0)
-n,-i,0,-n,i,0,n,-i,0,n,i,0,// (±φ, 0, ±1/φ)
-i,0,-n,i,0,-n,-i,0,n,i,0,n];super(r,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new rL(e.radius,e.detail)}}class rN extends rS{constructor(e){super(e),this.uuid=y(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}// get points of shape and holes (keypoints based on segments parameter)
extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let i=e.holes[t];this.holes.push(new rS().fromJSON(i))}return this}}/**
 * Port from https://github.com/mapbox/earcut (v2.2.4)
 */const rI={triangulate:function(e,t,i=2){let n,r,a,s,o,l,h;let c=t&&t.length,u=c?t[0]*i:e.length,d=rU(e,0,u,i,!0),p=[];if(!d||d.next===d.prev)return p;// if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
if(c&&(d=// link every hole into the outer loop, producing a single-ring polygon without holes
function(e,t,i,n){let r,a,s,o,l;let h=[];for(r=0,a=t.length;r<a;r++)s=t[r]*n,o=r<a-1?t[r+1]*n:e.length,(l=rU(e,s,o,n,!1))===l.next&&(l.steiner=!0),h.push(// find the leftmost node of a polygon ring
function(e){let t=e,i=e;do(t.x<i.x||t.x===i.x&&t.y<i.y)&&(i=t),t=t.next;while(t!==e)return i}(l));// process holes from left to right
for(h.sort(rO),r=0;r<h.length;r++)i=// find a bridge between vertices that connects hole with an outer ring and link it
function(e,t){let i=// David Eberly's algorithm for finding a bridge between hole and outer polygon
function(e,t){let i=t,n=-1/0,r,a=e.x,s=e.y;// find a segment intersected by a ray from the hole's leftmost point to the left;
// segment's endpoint with lesser x will be potential connection point
do{if(s<=i.y&&s>=i.next.y&&i.next.y!==i.y){let e=i.x+(s-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(e<=a&&e>n&&(n=e,r=i.x<i.next.x?i:i.next,e===a))return r;// hole touches outer segment; pick leftmost endpoint
}i=i.next}while(i!==t)if(!r)return null;// look for points inside the triangle of hole point, segment intersection and endpoint;
// if there are no points found, we have a valid connection;
// otherwise choose the point of the minimum angle with the ray as connection point
let o=r,l=r.x,h=r.y,c=1/0,u;i=r;do{var d,p;a>=i.x&&i.x>=l&&a!==i.x&&rB(s<h?a:n,s,l,h,s<h?n:a,s,i.x,i.y)&&(u=Math.abs(s-i.y)/(a-i.x),rG(i,e)&&(u<c||u===c&&(i.x>r.x||i.x===r.x&&(d=r,p=i,0>rF(d.prev,d,p.prev)&&0>rF(p.next,d,d.next))))&&(r=i,c=u)),i=i.next}while(i!==o)return r}(e,t);if(!i)return t;let n=rq(i,e);return(// filter collinear points around the cuts
rD(n,n.next),rD(i,i.next))}(h[r],i);return i}(e,t,d,i)),e.length>80*i){n=a=e[0],r=s=e[1];for(let t=i;t<u;t+=i)o=e[t],l=e[t+1],o<n&&(n=o),l<r&&(r=l),o>a&&(a=o),l>s&&(s=l);h=0!==// minX, minY and invSize are later used to transform coords into integers for z-order calculation
(h=Math.max(a-n,s-r))?32767/h:0}return(// main ear slicing loop which triangulates a polygon (given as a linked list)
function e(t,i,n,r,a,s,o){if(!t)return;// interlink polygon nodes in z-order
!o&&s&&// interlink polygon nodes in z-order
function(e,t,i,n){let r=e;do 0===r.z&&(r.z=rz(r.x,r.y,t,i,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e)r.prevZ.nextZ=null,r.prevZ=null,// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function(e){let t,i,n,r,a,s,o,l,h=1;do{for(i=e,e=null,a=null,s=0;i;){for(s++,n=i,o=0,t=0;t<h&&(o++,n=n.nextZ);t++);for(l=h;o>0||l>0&&n;)0!==o&&(0===l||!n||i.z<=n.z)?(r=i,i=i.nextZ,o--):(r=n,n=n.nextZ,l--),a?a.nextZ=r:e=r,r.prevZ=a,a=r;i=n}a.nextZ=null,h*=2}while(s>1)}(r)}(t,r,a,s);let l=t,h,c;// iterate through ears, slicing them one by one
for(;t.prev!==t.next;){if(h=t.prev,c=t.next,s?function(e,t,i,n){let r=e.prev,a=e.next;if(rF(r,e,a)>=0)return!1;// reflex, can't be an ear
let s=r.x,o=e.x,l=a.x,h=r.y,c=e.y,u=a.y,d=s<o?s<l?s:l:o<l?o:l,p=h<c?h<u?h:u:c<u?c:u,f=s>o?s>l?s:l:o>l?o:l,m=h>c?h>u?h:u:c>u?c:u,g=rz(d,p,t,i,n),v=rz(f,m,t,i,n),y=e.prevZ,x=e.nextZ;// look for points inside the triangle in both directions
for(;y&&y.z>=g&&x&&x.z<=v;){if(y.x>=d&&y.x<=f&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&rB(s,h,o,c,l,u,y.x,y.y)&&rF(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=f&&x.y>=p&&x.y<=m&&x!==r&&x!==a&&rB(s,h,o,c,l,u,x.x,x.y)&&rF(x.prev,x,x.next)>=0))return!1;x=x.nextZ}// look for remaining points in decreasing z-order
for(;y&&y.z>=g;){if(y.x>=d&&y.x<=f&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&rB(s,h,o,c,l,u,y.x,y.y)&&rF(y.prev,y,y.next)>=0)return!1;y=y.prevZ}// look for remaining points in increasing z-order
for(;x&&x.z<=v;){if(x.x>=d&&x.x<=f&&x.y>=p&&x.y<=m&&x!==r&&x!==a&&rB(s,h,o,c,l,u,x.x,x.y)&&rF(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}(t,r,a,s):// check whether a polygon node forms a valid ear with adjacent nodes
function(e){let t=e.prev,i=e.next;if(rF(t,e,i)>=0)return!1;// reflex, can't be an ear
// now make sure we don't have other points inside the potential ear
let n=t.x,r=e.x,a=i.x,s=t.y,o=e.y,l=i.y,h=n<r?n<a?n:a:r<a?r:a,c=s<o?s<l?s:l:o<l?o:l,u=n>r?n>a?n:a:r>a?r:a,d=s>o?s>l?s:l:o>l?o:l,p=i.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=c&&p.y<=d&&rB(n,s,r,o,a,l,p.x,p.y)&&rF(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}(t)){// cut off the triangle
i.push(h.i/n|0),i.push(t.i/n|0),i.push(c.i/n|0),rX(t),// skipping the next vertex leads to less sliver triangles
t=c.next,l=c.next;continue}// if we looped through the whole remaining polygon and can't find any more ears
if((t=c)===l){// try filtering points and slicing again
o?1===o?e(t=// go through all polygon nodes and cure small local self-intersections
function(e,t,i){let n=e;do{let r=n.prev,a=n.next.next;!rV(r,a)&&rH(r,n,n.next,a)&&rG(r,a)&&rG(a,r)&&(t.push(r.i/i|0),t.push(n.i/i|0),t.push(a.i/i|0),// remove two nodes involved
rX(n),rX(n.next),n=e=a),n=n.next}while(n!==e)return rD(n)}(rD(t),i,n),i,n,r,a,s,2):2===o&&// try splitting polygon into two and triangulate them independently
function(t,i,n,r,a,s){// look for a valid diagonal that divides the polygon into two
let o=t;do{let t=o.next.next;for(;t!==o.prev;){var l,h;if(o.i!==t.i&&(l=o,h=t,l.next.i!==h.i&&l.prev.i!==h.i&&!// check if a polygon diagonal intersects any polygon segments
function(e,t){let i=e;do{if(i.i!==e.i&&i.next.i!==e.i&&i.i!==t.i&&i.next.i!==t.i&&rH(i,i.next,e,t))return!0;i=i.next}while(i!==e)return!1}(l,h)&&// dones't intersect other edges
(rG(l,h)&&rG(h,l)&&// check if the middle point of a polygon diagonal is inside the polygon
function(e,t){let i=e,n=!1,r=(e.x+t.x)/2,a=(e.y+t.y)/2;do i.y>a!=i.next.y>a&&i.next.y!==i.y&&r<(i.next.x-i.x)*(a-i.y)/(i.next.y-i.y)+i.x&&(n=!n),i=i.next;while(i!==e)return n}(l,h)&&// locally visible
(rF(l.prev,l,h.prev)||rF(l,h.prev,h))||// does not create opposite-facing sectors
rV(l,h)&&rF(l.prev,l,l.next)>0&&rF(h.prev,h,h.next)>0))){// split the polygon in two by the diagonal
let l=rq(o,t);// filter colinear points around the cuts
o=rD(o,o.next),l=rD(l,l.next),// run earcut on each half
e(o,i,n,r,a,s,0),e(l,i,n,r,a,s,0);return}t=t.next}o=o.next}while(o!==t)}(t,i,n,r,a,s):e(rD(t),i,n,r,a,s,1);break}}}(d,p,i,n,r,h,0),p)}};// create a circular doubly linked list from polygon points in the specified winding order
function rU(e,t,i,n,r){let a,s;if(r===function(e,t,i,n){let r=0;for(let a=t,s=i-n;a<i;a+=n)r+=(e[s]-e[a])*(e[a+1]+e[s+1]),s=a;return r}(e,t,i,n)>0)for(a=t;a<i;a+=n)s=rj(a,e[a],e[a+1],s);else for(a=i-n;a>=t;a-=n)s=rj(a,e[a],e[a+1],s);return s&&rV(s,s.next)&&(rX(s),s=s.next),s}// eliminate colinear or duplicate points
function rD(e,t){if(!e)return e;t||(t=e);let i=e,n;do if(n=!1,!i.steiner&&(rV(i,i.next)||0===rF(i.prev,i,i.next))){if(rX(i),(i=t=i.prev)===i.next)break;n=!0}else i=i.next;while(n||i!==t)return t}function rO(e,t){return e.x-t.x}// z-order of a point given coords and inverse of the longer side of data bbox
function rz(e,t,i,n,r){return(e=((e=((e=((e=(// coords are transformed into non-negative 15-bit integer range
(e=(e-i)*r|0)|e<<8)&16711935)|e<<4)&252645135)|e<<2)&858993459)|e<<1)&1431655765)|(t=((t=((t=((t=((t=(t-n)*r|0)|t<<8)&16711935)|t<<4)&252645135)|t<<2)&858993459)|t<<1)&1431655765)<<1}// check if a point lies within a convex triangle
function rB(e,t,i,n,r,a,s,o){return(r-s)*(t-o)>=(e-s)*(a-o)&&(e-s)*(n-o)>=(i-s)*(t-o)&&(i-s)*(a-o)>=(r-s)*(n-o)}// signed area of a triangle
function rF(e,t,i){return(t.y-e.y)*(i.x-t.x)-(t.x-e.x)*(i.y-t.y)}// check if two points are equal
function rV(e,t){return e.x===t.x&&e.y===t.y}// check if two segments intersect
function rH(e,t,i,n){let r=rk(rF(e,t,i)),a=rk(rF(e,t,n)),s=rk(rF(i,n,e)),o=rk(rF(i,n,t));return!!(r!==a&&s!==o||0===r&&rW(e,i,t)||0===a&&rW(e,n,t)||0===s&&rW(i,e,n)||0===o&&rW(i,t,n))}// for collinear points p, q, r, check if point q lies on segment pr
function rW(e,t,i){return t.x<=Math.max(e.x,i.x)&&t.x>=Math.min(e.x,i.x)&&t.y<=Math.max(e.y,i.y)&&t.y>=Math.min(e.y,i.y)}function rk(e){return e>0?1:e<0?-1:0}// check if a polygon diagonal is locally inside the polygon
function rG(e,t){return 0>rF(e.prev,e,e.next)?rF(e,t,e.next)>=0&&rF(e,e.prev,t)>=0:0>rF(e,t,e.prev)||0>rF(e,e.next,t)}// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function rq(e,t){let i=new rY(e.i,e.x,e.y),n=new rY(t.i,t.x,t.y),r=e.next,a=t.prev;return e.next=t,t.prev=e,i.next=r,r.prev=i,n.next=i,i.prev=n,a.next=n,n.prev=a,n}// create a node and optionally link it with previous one (in a circular doubly linked list)
function rj(e,t,i,n){let r=new rY(e,t,i);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function rX(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function rY(e,t,i){// vertex index in coordinates array
this.i=e,// vertex coordinates
this.x=t,this.y=i,// previous and next vertex nodes in a polygon ring
this.prev=null,this.next=null,// z-order curve value
this.z=0,// previous and next nodes in z-order
this.prevZ=null,this.nextZ=null,// indicates whether this is a steiner point
this.steiner=!1}class rZ{// calculate area of the contour polygon
static area(e){let t=e.length,i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return .5*i}static isClockWise(e){return 0>rZ.area(e)}static triangulateShape(e,t){let i=[],n=[],r=[];// flat array of vertices like [ x0,y0, x1,y1, x2,y2, ... ]
rK(e),rJ(i,e);//
let a=e.length;t.forEach(rK);for(let e=0;e<t.length;e++)n.push(a),a+=t[e].length,rJ(i,t[e]);//
let s=rI.triangulate(i,n);//
for(let e=0;e<s.length;e+=3)r.push(s.slice(e,e+3));return r}}function rK(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function rJ(e,t){for(let i=0;i<t.length;i++)e.push(t[i].x),e.push(t[i].y)}/**
 * Creates extruded geometry from a path shape.
 *
 * parameters = {
 *
 *  curveSegments: <int>, // number of points on the curves
 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segments of extrude spline too
 *  depth: <float>, // Depth to extrude the shape
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into the original shape bevel goes
 *  bevelSize: <float>, // how far from shape outline (including bevelOffset) is bevel
 *  bevelOffset: <float>, // how far from shape outline does bevel start
 *  bevelSegments: <int>, // number of bevel layers
 *
 *  extrudePath: <THREE.Curve> // curve to extrude shape along
 *
 *  UVGenerator: <Object> // object that provides UV generator functions
 *
 * }
 */class rQ extends tw{constructor(e=new rN([new S(.5,.5),new S(-.5,.5),new S(-.5,-.5),new S(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],r=[];for(let a=0,s=e.length;a<s;a++){let s=e[a];!// functions
function(e){let a,s,o,l;let h=[],c=void 0!==t.curveSegments?t.curveSegments:12,u=void 0!==t.steps?t.steps:1,d=void 0!==t.depth?t.depth:1,p=void 0===t.bevelEnabled||t.bevelEnabled,f=void 0!==t.bevelThickness?t.bevelThickness:.2,m=void 0!==t.bevelSize?t.bevelSize:f-.1,g=void 0!==t.bevelOffset?t.bevelOffset:0,v=void 0!==t.bevelSegments?t.bevelSegments:3,y=t.extrudePath,x=void 0!==t.UVGenerator?t.UVGenerator:r$,_,w=!1;y&&(_=y.getSpacedPoints(u),w=!0,p=!1,// SETUP TNB variables
// TODO1 - have a .isClosed in spline?
a=y.computeFrenetFrames(u,!1),// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);
s=new Z,o=new Z,l=new Z),p||(v=0,f=0,m=0,g=0);// Variables initialization
let b=e.extractPoints(c),M=b.shape,E=b.holes,T=!rZ.isClockWise(M);if(T){M=M.reverse();// Maybe we should also check if holes are in the opposite direction, just to be safe ...
for(let e=0,t=E.length;e<t;e++){let t=E[e];rZ.isClockWise(t)&&(E[e]=t.reverse())}}let A=rZ.triangulateShape(M,E),R=M;for(let e=0,t=E.length;e<t;e++){let t=E[e];M=M.concat(t)}function C(e,t,i){return t||console.error("THREE.ExtrudeGeometry: vec does not exist"),e.clone().addScaledVector(t,i)}let P=M.length,L=A.length;// Find directions for point movement
function N(e,t,i){let n,r,a;// good reading for geometry algorithms (here: line-line intersection)
// http://geomalgorithms.com/a05-_intersect-1.html
let s=e.x-t.x,o=e.y-t.y,l=i.x-e.x,h=i.y-e.y,c=s*s+o*o,u=s*h-o*l;if(Math.abs(u)>Number.EPSILON){// not collinear
// length of vectors for normalizing
let u=Math.sqrt(c),d=Math.sqrt(l*l+h*h),p=t.x-o/u,f=t.y+s/u,m=i.x-h/d,g=i.y+l/d,v=((m-p)*h-(g-f)*l)/(s*h-o*l);// vector from inPt to intersection point
n=p+s*v-e.x,r=f+o*v-e.y;// Don't normalize!, otherwise sharp corners become ugly
//  but prevent crazy spikes
let y=n*n+r*r;if(y<=2)return new S(n,r);a=Math.sqrt(y/2)}else{// handle special case of collinear edges
let e=!1;// assumes: opposite
s>Number.EPSILON?l>Number.EPSILON&&(e=!0):s<-Number.EPSILON?l<-Number.EPSILON&&(e=!0):Math.sign(o)===Math.sign(h)&&(e=!0),e?(// console.log("Warning: lines are a straight sequence");
n=-o,r=s,a=Math.sqrt(c)):(// console.log("Warning: lines are a straight spike");
n=s,r=o,a=Math.sqrt(c/2))}return new S(n/a,r/a)}let I=[];for(let e=0,t=R.length,i=t-1,n=e+1;e<t;e++,i++,n++)i===t&&(i=0),n===t&&(n=0),//  (j)---(i)---(k)
// console.log('i,j,k', i, j , k)
I[e]=N(R[e],R[i],R[n]);let U=[],D,O=I.concat();for(let e=0,t=E.length;e<t;e++){let t=E[e];D=[];for(let e=0,i=t.length,n=i-1,r=e+1;e<i;e++,n++,r++)n===i&&(n=0),r===i&&(r=0),//  (j)---(i)---(k)
D[e]=N(t[e],t[n],t[r]);U.push(D),O=O.concat(D)}// Loop bevelSegments, 1 for the front, 1 for the back
for(let e=0;e<v;e++){//for ( b = bevelSegments; b > 0; b -- ) {
let t=e/v,i=f*Math.cos(t*Math.PI/2),n=m*Math.sin(t*Math.PI/2)+g;// contract shape
for(let e=0,t=R.length;e<t;e++){let t=C(R[e],I[e],n);F(t.x,t.y,-i)}// expand holes
for(let e=0,t=E.length;e<t;e++){let t=E[e];D=U[e];for(let e=0,r=t.length;e<r;e++){let r=C(t[e],D[e],n);F(r.x,r.y,-i)}}}let z=m+g;// Back facing vertices
for(let e=0;e<P;e++){let t=p?C(M[e],O[e],z):M[e];w?(// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );
o.copy(a.normals[0]).multiplyScalar(t.x),s.copy(a.binormals[0]).multiplyScalar(t.y),l.copy(_[0]).add(o).add(s),F(l.x,l.y,l.z)):F(t.x,t.y,0)}// Add stepped vertices...
// Including front facing vertices
for(let e=1;e<=u;e++)for(let t=0;t<P;t++){let i=p?C(M[t],O[t],z):M[t];w?(// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );
o.copy(a.normals[e]).multiplyScalar(i.x),s.copy(a.binormals[e]).multiplyScalar(i.y),l.copy(_[e]).add(o).add(s),F(l.x,l.y,l.z)):F(i.x,i.y,d/u*e)}// Add bevel segments planes
//for ( b = 1; b <= bevelSegments; b ++ ) {
for(let e=v-1;e>=0;e--){let t=e/v,i=f*Math.cos(t*Math.PI/2),n=m*Math.sin(t*Math.PI/2)+g;// contract shape
for(let e=0,t=R.length;e<t;e++){let t=C(R[e],I[e],n);F(t.x,t.y,d+i)}// expand holes
for(let e=0,t=E.length;e<t;e++){let t=E[e];D=U[e];for(let e=0,r=t.length;e<r;e++){let r=C(t[e],D[e],n);w?F(r.x,r.y+_[u-1].y,_[u-1].x+i):F(r.x,r.y,d+i)}}}function B(e,t){let r=e.length;for(;--r>=0;){let a=r,s=r-1;s<0&&(s=e.length-1);//console.log('b', i,j, i-1, k,vertices.length);
for(let e=0,r=u+2*v;e<r;e++){let r=P*e,o=P*(e+1),l=t+a+r,h=t+s+r,c=t+s+o,u=t+a+o;!function(e,t,r,a){H(e),H(t),H(a),H(t),H(r),H(a);let s=n.length/3,o=x.generateSideWallUV(i,n,s-6,s-3,s-2,s-1);W(o[0]),W(o[1]),W(o[3]),W(o[1]),W(o[2]),W(o[3])}(l,h,c,u)}}}function F(e,t,i){h.push(e),h.push(t),h.push(i)}function V(e,t,r){H(e),H(t),H(r);let a=n.length/3,s=x.generateTopUV(i,n,a-3,a-2,a-1);W(s[0]),W(s[1]),W(s[2])}function H(e){n.push(h[3*e+0]),n.push(h[3*e+1]),n.push(h[3*e+2])}function W(e){r.push(e.x),r.push(e.y)}/* Faces */// Top and bottom faces
/////  Internal functions
(function(){let e=n.length/3;if(p){let e=0*P;// steps + 1
// Bottom faces
for(let t=0;t<L;t++){let i=A[t];V(i[2]+e,i[1]+e,i[0]+e)}e=P*(u+2*v);// Top faces
for(let t=0;t<L;t++){let i=A[t];V(i[0]+e,i[1]+e,i[2]+e)}}else{// Bottom faces
for(let e=0;e<L;e++){let t=A[e];V(t[2],t[1],t[0])}// Top faces
for(let e=0;e<L;e++){let t=A[e];V(t[0]+P*u,t[1]+P*u,t[2]+P*u)}}i.addGroup(e,n.length/3-e,0)})(),// Sides faces
// Create faces for the z-sides of the shape
function(){let e=n.length/3,t=0;B(R,0),t+=R.length;for(let e=0,i=E.length;e<i;e++){let i=E[e];B(i,t),//, true
t+=i.length}i.addGroup(e,n.length/3-e,1)}()}(s)}// build geometry
this.setAttribute("position",new tp(n,3)),this.setAttribute("uv",new tp(r,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return function(e,t,i){if(i.shapes=[],Array.isArray(e))for(let t=0,n=e.length;t<n;t++){let n=e[t];i.shapes.push(n.uuid)}else i.shapes.push(e.uuid);return i.options=Object.assign({},t),void 0!==t.extrudePath&&(i.options.extrudePath=t.extrudePath.toJSON()),i}(t,i,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let r=t[e.shapes[n]];i.push(r)}let n=e.options.extrudePath;return void 0!==n&&(e.options.extrudePath=new rb[n.type]().fromJSON(n)),new rQ(i,e.options)}}const r$={generateTopUV:function(e,t,i,n,r){let a=t[3*i],s=t[3*i+1],o=t[3*n],l=t[3*n+1],h=t[3*r],c=t[3*r+1];return[new S(a,s),new S(o,l),new S(h,c)]},generateSideWallUV:function(e,t,i,n,r,a){let s=t[3*i],o=t[3*i+1],l=t[3*i+2],h=t[3*n],c=t[3*n+1],u=t[3*n+2],d=t[3*r],p=t[3*r+1],f=t[3*r+2],m=t[3*a],g=t[3*a+1],v=t[3*a+2];return Math.abs(o-c)<Math.abs(s-h)?[new S(s,1-l),new S(h,1-u),new S(d,1-f),new S(m,1-v)]:[new S(o,1-l),new S(c,1-u),new S(p,1-f),new S(g,1-v)]}};class r0 extends rP{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1];super(n,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r0(e.radius,e.detail)}}class r1 extends rP{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r1(e.radius,e.detail)}}class r2 extends tw{constructor(e=.5,t=1,i=32,n=1,r=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);// buffers
let s=[],o=[],l=[],h=[],c=e,u=(t-e)/n,d=new Z,p=new S;// generate vertices, normals and uvs
for(let e=0;e<=n;e++){for(let e=0;e<=i;e++){// values are generate from the inside of the ring to the outside
let n=r+e/i*a;// vertex
d.x=c*Math.cos(n),d.y=c*Math.sin(n),o.push(d.x,d.y,d.z),// normal
l.push(0,0,1),// uv
p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,h.push(p.x,p.y)}// increase the radius for next row of vertices
c+=u}// indices
for(let e=0;e<n;e++){let t=e*(i+1);for(let e=0;e<i;e++){let n=e+t,r=n+i+1,a=n+i+2,o=n+1;// faces
s.push(n,r,o),s.push(r,a,o)}}// build geometry
this.setIndex(s),this.setAttribute("position",new tp(o,3)),this.setAttribute("normal",new tp(l,3)),this.setAttribute("uv",new tp(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r2(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class r3 extends tw{constructor(e=new rN([new S(0,.5),new S(-.5,-.5),new S(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};// buffers
let i=[],n=[],r=[],a=[],s=0,o=0;// allow single and array values for "shapes" parameter
if(!1===Array.isArray(e))l(e);else for(let t=0;t<e.length;t++)l(e[t]),this.addGroup(s,o,t),s+=o,o=0;// helper functions
function l(e){let s=n.length/3,l=e.extractPoints(t),h=l.shape,c=l.holes;// check direction of vertices
!1===rZ.isClockWise(h)&&(h=h.reverse());for(let e=0,t=c.length;e<t;e++){let t=c[e];!0===rZ.isClockWise(t)&&(c[e]=t.reverse())}let u=rZ.triangulateShape(h,c);// join vertices of inner and outer paths to a single array
for(let e=0,t=c.length;e<t;e++){let t=c[e];h=h.concat(t)}// vertices, normals, uvs
for(let e=0,t=h.length;e<t;e++){let t=h[e];n.push(t.x,t.y,0),r.push(0,0,1),a.push(t.x,t.y)}// indices
for(let e=0,t=u.length;e<t;e++){let t=u[e],n=t[0]+s,r=t[1]+s,a=t[2]+s;i.push(n,r,a),o+=3}}// build geometry
this.setIndex(i),this.setAttribute("position",new tp(n,3)),this.setAttribute("normal",new tp(r,3)),this.setAttribute("uv",new tp(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return function(e,t){if(t.shapes=[],Array.isArray(e))for(let i=0,n=e.length;i<n;i++){let n=e[i];t.shapes.push(n.uuid)}else t.shapes.push(e.uuid);return t}(t,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let r=t[e.shapes[n]];i.push(r)}return new r3(i,e.curveSegments)}}class r4 extends tw{constructor(e=1,t=32,i=16,n=0,r=2*Math.PI,a=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:s},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let o=Math.min(a+s,Math.PI),l=0,h=[],c=new Z,u=new Z,d=[],p=[],f=[],m=[];// generate vertices, normals and uvs
for(let d=0;d<=i;d++){let g=[],v=d/i,y=0;0===d&&0===a?y=.5/t:d===i&&o===Math.PI&&(y=-.5/t);for(let i=0;i<=t;i++){let o=i/t;// vertex
c.x=-e*Math.cos(n+o*r)*Math.sin(a+v*s),c.y=e*Math.cos(a+v*s),c.z=e*Math.sin(n+o*r)*Math.sin(a+v*s),p.push(c.x,c.y,c.z),// normal
u.copy(c).normalize(),f.push(u.x,u.y,u.z),// uv
m.push(o+y,1-v),g.push(l++)}h.push(g)}// indices
for(let e=0;e<i;e++)for(let n=0;n<t;n++){let t=h[e][n+1],r=h[e][n],s=h[e+1][n],l=h[e+1][n+1];(0!==e||a>0)&&d.push(t,r,l),(e!==i-1||o<Math.PI)&&d.push(r,s,l)}// build geometry
this.setIndex(d),this.setAttribute("position",new tp(p,3)),this.setAttribute("normal",new tp(f,3)),this.setAttribute("uv",new tp(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r4(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class r5 extends rP{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r5(e.radius,e.detail)}}class r6 extends tw{constructor(e=1,t=.4,i=12,n=48,r=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r},i=Math.floor(i),n=Math.floor(n);// buffers
let a=[],s=[],o=[],l=[],h=new Z,c=new Z,u=new Z;// generate vertices, normals and uvs
for(let a=0;a<=i;a++)for(let d=0;d<=n;d++){let p=d/n*r,f=a/i*Math.PI*2;// vertex
c.x=(e+t*Math.cos(f))*Math.cos(p),c.y=(e+t*Math.cos(f))*Math.sin(p),c.z=t*Math.sin(f),s.push(c.x,c.y,c.z),// normal
h.x=e*Math.cos(p),h.y=e*Math.sin(p),u.subVectors(c,h).normalize(),o.push(u.x,u.y,u.z),// uv
l.push(d/n),l.push(a/i)}// generate indices
for(let e=1;e<=i;e++)for(let t=1;t<=n;t++){// indices
let i=(n+1)*e+t-1,r=(n+1)*(e-1)+t-1,s=(n+1)*(e-1)+t,o=(n+1)*e+t;// faces
a.push(i,r,o),a.push(r,s,o)}// build geometry
this.setIndex(a),this.setAttribute("position",new tp(s,3)),this.setAttribute("normal",new tp(o,3)),this.setAttribute("uv",new tp(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r6(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class r7 extends tw{constructor(e=1,t=.4,i=64,n=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:n,p:r,q:a},i=Math.floor(i),n=Math.floor(n);// buffers
let s=[],o=[],l=[],h=[],c=new Z,u=new Z,d=new Z,p=new Z,f=new Z,m=new Z,g=new Z;// generate vertices, normals and uvs
for(let s=0;s<=i;++s){// the radian "u" is used to calculate the position on the torus curve of the current tubular segment
let y=s/i*r*Math.PI*2;// now we calculate two points. P1 is our current position on the curve, P2 is a little farther ahead.
// these points are used to create a special "coordinate space", which is necessary to calculate the correct vertex positions
v(y,r,a,e,d),v(y+.01,r,a,e,p),// calculate orthonormal basis
m.subVectors(p,d),g.addVectors(p,d),f.crossVectors(m,g),g.crossVectors(f,m),// normalize B, N. T can be ignored, we don't use it
f.normalize(),g.normalize();for(let e=0;e<=n;++e){// now calculate the vertices. they are nothing more than an extrusion of the torus curve.
// because we extrude a shape in the xy-plane, there is no need to calculate a z-value.
let r=e/n*Math.PI*2,a=-t*Math.cos(r),p=t*Math.sin(r);// now calculate the final vertex position.
// first we orient the extrusion with our basis vectors, then we add it to the current position on the curve
c.x=d.x+(a*g.x+p*f.x),c.y=d.y+(a*g.y+p*f.y),c.z=d.z+(a*g.z+p*f.z),o.push(c.x,c.y,c.z),// normal (P1 is always the center/origin of the extrusion, thus we can use it to calculate the normal)
u.subVectors(c,d).normalize(),l.push(u.x,u.y,u.z),// uv
h.push(s/i),h.push(e/n)}}// generate indices
for(let e=1;e<=i;e++)for(let t=1;t<=n;t++){// indices
let i=(n+1)*(e-1)+(t-1),r=(n+1)*e+(t-1),a=(n+1)*e+t,o=(n+1)*(e-1)+t;// faces
s.push(i,r,o),s.push(r,a,o)}// this function calculates the current position on the torus curve
function v(e,t,i,n,r){let a=i/t*e,s=Math.cos(a);r.x=n*(2+s)*.5*Math.cos(e),r.y=n*(2+s)*Math.sin(e)*.5,r.z=n*Math.sin(a)*.5}// build geometry
this.setIndex(s),this.setAttribute("position",new tp(o,3)),this.setAttribute("normal",new tp(l,3)),this.setAttribute("uv",new tp(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r7(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class r8 extends tw{constructor(e=new r_(new Z(-1,-1,0),new Z(-1,1,0),new Z(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};let a=e.computeFrenetFrames(t,r);// expose internals
this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;// helper variables
let s=new Z,o=new Z,l=new S,h=new Z,c=[],u=[],d=[],p=[];function f(r){// we use getPointAt to sample evenly distributed points from the given path
h=e.getPointAt(r/t,h);// retrieve corresponding normal and binormal
let l=a.normals[r],d=a.binormals[r];// generate normals and vertices for the current segment
for(let e=0;e<=n;e++){let t=e/n*Math.PI*2,r=Math.sin(t),a=-Math.cos(t);// normal
o.x=a*l.x+r*d.x,o.y=a*l.y+r*d.y,o.z=a*l.z+r*d.z,o.normalize(),u.push(o.x,o.y,o.z),// vertex
s.x=h.x+i*o.x,s.y=h.y+i*o.y,s.z=h.z+i*o.z,c.push(s.x,s.y,s.z)}}// create buffer data
// functions
(function(){for(let e=0;e<t;e++)f(e);// if the geometry is not closed, generate the last row of vertices and normals
// at the regular position on the given path
//
// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)
f(!1===r?t:0),// uvs are generated in a separate function.
// this makes it easy compute correct values for closed geometries
function(){for(let e=0;e<=t;e++)for(let i=0;i<=n;i++)l.x=e/t,l.y=i/n,d.push(l.x,l.y)}(),// finally create faces
function(){for(let e=1;e<=t;e++)for(let t=1;t<=n;t++){let i=(n+1)*(e-1)+(t-1),r=(n+1)*e+(t-1),a=(n+1)*e+t,s=(n+1)*(e-1)+t;// faces
p.push(i,r,s),p.push(r,a,s)}}()})(),// build geometry
this.setIndex(p),this.setAttribute("position",new tp(c,3)),this.setAttribute("normal",new tp(u,3)),this.setAttribute("uv",new tp(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){// This only works for built-in curves (e.g. CatmullRomCurve3).
// User defined curves or instances of CurvePath will not be deserialized.
return new r8(new rb[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}// same as Array.prototype.slice, but also works on typed arrays
function r9(e,t,i){return at(e)?new e.constructor(e.subarray(t,void 0!==i?i:e.length)):e.slice(t,i)}// converts an array to a specific type
function ae(e,t,i){return e&&// let 'undefined' and 'null' pass
(i||e.constructor!==t)?"number"==typeof t.BYTES_PER_ELEMENT?new t(e):Array.prototype.slice.call(e):e}function at(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}/**
 * Abstract base class of interpolants over parametric samples.
 *
 * The parameter domain is one dimensional, typically the time or a path
 * along a curve defined by the data.
 *
 * The sample values can have any dimensionality and derived classes may
 * apply special interpretations to the data.
 *
 * This class provides the interval seek in a Template Method, deferring
 * the actual interpolation to derived classes.
 *
 * Time complexity is O(1) for linear access crossing at most two points
 * and O(log N) for random access, where N is the number of positions.
 *
 * References:
 *
 * 		http://www.oodesign.com/template-method-pattern.html
 *
 */class ai{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=void 0!==n?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],r=t[i-1];e:{t:{let a;i:{//- See http://jsperf.com/comparison-to-undefined/3
//- slower code:
//-
//- 				if ( t >= t1 || t1 === undefined ) {
n:if(!(e<n)){for(let a=i+2;;){if(void 0===n){if(e<r)break n;return(// after end
i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1))}if(i===a)break;// this loop
if(r=n,e<(n=t[++i]))break t}// prepare binary search on the right side of the index
a=t.length;break i}//- slower code:
//-					if ( t < t0 || t0 === undefined ) {
if(!(e>=r)){// looping?
let s=t[1];e<s&&(i=2,r=s);// linear reverse scan
for(let a=i-2;;){if(void 0===r)return(// before start
this._cachedIndex=0,this.copySampleValue_(0));if(i===a)break;// this loop
if(n=r,e>=(r=t[--i-1]))break t}// prepare binary search on the left side of the index
a=i,i=0;break i}break e}// linear scan
// binary search
for(;i<a;){let n=i+a>>>1;e<t[n]?a=n:i=n+1}// check boundary cases, again
if(n=t[i],void 0===(r=t[i-1]))return this._cachedIndex=0,this.copySampleValue_(0);if(void 0===n)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}// seek
this._cachedIndex=i,this.intervalChanged_(i,r,n)}// validate_interval
return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){// copies a sample value to the result buffer
let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let e=0;e!==n;++e)t[e]=i[r+e];return t}// Template methods for derived classes:
interpolate_(){throw Error("call to abstract method");// implementations shall return this.resultBuffer
}intervalChanged_(){// empty
}}/**
 * Fast and simple cubic spline interpolant.
 *
 * It was derived from a Hermitian construction setting the first derivative
 * at each sample position to the linear slope between neighboring positions
 * over their parameter interval.
 */class an extends ai{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,i){let n=this.parameterPositions,r=e-2,a=e+1,s=n[r],o=n[a];if(void 0===s)switch(this.getSettings_().endingStart){case 2401:// f'(t0) = 0
r=e,s=2*t-i;break;case 2402:// use the other end of the curve
r=n.length-2,s=t+n[r]-n[r+1];break;default:// f''(t0) = 0 a.k.a. Natural Spline
r=e,s=i}if(void 0===o)switch(this.getSettings_().endingEnd){case 2401:// f'(tN) = 0
a=e,o=2*i-t;break;case 2402:// use the other end of the curve
a=1,o=i+n[1]-n[0];break;default:// f''(tN) = 0, a.k.a. Natural Spline
a=e-1,o=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-s),this._weightNext=l/(o-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,h=this._offsetPrev,c=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(i-t)/(n-t),f=p*p,m=f*p,g=-u*m+2*u*f-u*p,v=(1+u)*m+(-1.5-2*u)*f+(-.5+u)*p+1,y=(-1-d)*m+(1.5+d)*f+.5*p,x=d*m-d*f;// combine data linearly
for(let e=0;e!==s;++e)r[e]=g*a[h+e]+v*a[l+e]+y*a[o+e]+x*a[c+e];return r}}class ar extends ai{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,h=(i-t)/(n-t),c=1-h;for(let e=0;e!==s;++e)r[e]=a[l+e]*c+a[o+e]*h;return r}}/**
 *
 * Interpolant that evaluates to the sample value at the position preceding
 * the parameter.
 */class aa extends ai{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e/*, t0, t, t1 */){return this.copySampleValue_(e-1)}}class as{constructor(e,t,i,n){if(void 0===e)throw Error("THREE.KeyframeTrack: track name is undefined");if(void 0===t||0===t.length)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ae(t,this.TimeBufferType),this.values=ae(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}// Serialization (in static context, because of constructor invocation
// and automatic invocation of .toJSON):
static toJSON(e){let t;let i=e.constructor;// derived classes can define a static toJSON method
if(i.toJSON!==this.toJSON)t=i.toJSON(e);else{// by default, we assume the data can be serialized as-is
t={name:e.name,times:ae(e.times,Array),values:ae(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(t.interpolation=i)}return t.type=e.ValueTypeName,t}InterpolantFactoryMethodDiscrete(e){return new aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ar(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new an(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth}if(void 0===t){let t="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant){// fall back to default, unless the default itself is messed up
if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);// fatal, in this case
}return console.warn("THREE.KeyframeTrack:",t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}// move all keyframes either forwards or backwards in time
shift(e){if(0!==e){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}// scale all keyframe times by a factor (useful for frame <-> seconds conversions)
scale(e){if(1!==e){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}// removes keyframes before and after animation without changing any values within the range [startTime, endTime].
// IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
trim(e,t){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<e;)++r;for(;-1!==a&&i[a]>t;)--a;if(++a,0!==r||a!==n){r>=a&&(r=(a=Math.max(a,1))-1);let e=this.getValueSize();this.times=r9(i,r,a),this.values=r9(this.values,r*e,a*e)}return this}// ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,r=i.length;0===r&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let t=0;t!==r;t++){let n=i[t];if("number"==typeof n&&isNaN(n)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,t,n),e=!1;break}if(null!==a&&a>n){console.error("THREE.KeyframeTrack: Out of order keys.",this,t,n,a),e=!1;break}a=n}if(void 0!==n&&at(n))for(let t=0,i=n.length;t!==i;++t){let i=n[t];if(isNaN(i)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,t,i),e=!1;break}}return e}// removes equivalent sequential keys as common in morph target sequences
// (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
optimize(){// times or values may be shared with other tracks, so overwriting is unsafe
let e=r9(this.times),t=r9(this.values),i=this.getValueSize(),n=2302===this.getInterpolation(),r=e.length-1,a=1;for(let s=1;s<r;++s){let r=!1,o=e[s],l=e[s+1];// remove adjacent keyframes scheduled at the same time
if(o!==l&&(1!==s||o!==e[0])){if(n)r=!0;else{// remove unnecessary keyframes same as their neighbors
let e=s*i,n=e-i,a=e+i;for(let s=0;s!==i;++s){let i=t[e+s];if(i!==t[n+s]||i!==t[a+s]){r=!0;break}}}}// in-place compaction
if(r){if(s!==a){e[a]=e[s];let n=s*i,r=a*i;for(let e=0;e!==i;++e)t[r+e]=t[n+e]}++a}}// flush last keyframe (compaction looks ahead)
if(r>0){e[a]=e[r];for(let e=r*i,n=a*i,s=0;s!==i;++s)t[n+s]=t[e+s];++a}return a!==e.length?(this.times=r9(e,0,a),this.values=r9(t,0,a*i)):(this.times=e,this.values=t),this}clone(){let e=r9(this.times,0),t=r9(this.values,0),i=this.constructor,n=new i(this.name,e,t);return(// Interpolant argument to constructor is not saved, so copy the factory method directly.
n.createInterpolant=this.createInterpolant,n)}}as.prototype.TimeBufferType=Float32Array,as.prototype.ValueBufferType=Float32Array,as.prototype.DefaultInterpolation=2301;/**
 * A Track of Boolean keyframe values.
 */class ao extends as{}ao.prototype.ValueTypeName="bool",ao.prototype.ValueBufferType=Array,ao.prototype.DefaultInterpolation=2300,ao.prototype.InterpolantFactoryMethodLinear=void 0,ao.prototype.InterpolantFactoryMethodSmooth=void 0,/**
 * A Track of keyframe values that represent color.
 */(class extends as{}).prototype.ValueTypeName="color",/**
 * A Track of numeric keyframe values.
 */(class extends as{}).prototype.ValueTypeName="number";/**
 * Spherical linear unit quaternion interpolant.
 */class al extends ai{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,s=this.valueSize,o=(i-t)/(n-t),l=e*s;for(let e=l+s;l!==e;l+=4)Y.slerpFlat(r,0,a,l-s,a,l,o);return r}}/**
 * A Track of quaternion keyframe values.
 */class ah extends as{InterpolantFactoryMethodLinear(e){return new al(this.times,this.values,this.getValueSize(),e)}}ah.prototype.ValueTypeName="quaternion",// ValueBufferType is inherited
ah.prototype.DefaultInterpolation=2301,ah.prototype.InterpolantFactoryMethodSmooth=void 0;/**
 * A Track that interpolates Strings
 */class ac extends as{}ac.prototype.ValueTypeName="string",ac.prototype.ValueBufferType=Array,ac.prototype.DefaultInterpolation=2300,ac.prototype.InterpolantFactoryMethodLinear=void 0,ac.prototype.InterpolantFactoryMethodSmooth=void 0,/**
 * A Track of vectored keyframe values.
 */(class extends as{}).prototype.ValueTypeName="vector";class au extends eK{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ta(e),this.intensity=t}dispose(){// Empty here in base class; some subclasses override.
}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,void 0!==this.groundColor&&(t.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(t.object.distance=this.distance),void 0!==this.angle&&(t.object.angle=this.angle),void 0!==this.decay&&(t.object.decay=this.decay),void 0!==this.penumbra&&(t.object.penumbra=this.penumbra),void 0!==this.shadow&&(t.object.shadow=this.shadow.toJSON()),t}}const ad=/*@__PURE__*/new eE,ap=/*@__PURE__*/new Z,af=/*@__PURE__*/new Z;class am{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new S(512,512),this.map=null,this.mapPass=null,this.matrix=new eE,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new t4,this._frameExtents=new S(1,1),this._viewportCount=1,this._viewports=[new G(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;ap.setFromMatrixPosition(e.matrixWorld),t.position.copy(ap),af.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(af),t.updateMatrixWorld(),ad.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ad),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ad)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return 0!==this.bias&&(e.bias=this.bias),0!==this.normalBias&&(e.normalBias=this.normalBias),1!==this.radius&&(e.radius=this.radius),(512!==this.mapSize.x||512!==this.mapSize.y)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ag extends am{constructor(){super(new ih(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}// Characters [].:/ are reserved for track binding syntax.
const av="\\[\\]\\.:\\/",ay=RegExp("["+av+"]","g"),ax="[^"+av+"]",a_="[^"+av.replace("\\.","")+"]",aw=/*@__PURE__*//((?:WC+[\/:])*)/.source.replace("WC",ax),ab=/*@__PURE__*//(WCOD+)?/.source.replace("WCOD",a_),aM=/*@__PURE__*//(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ax),aS=/*@__PURE__*//\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ax),aE=RegExp("^"+aw+ab+aM+aS+"$"),aT=["material","materials","bones","map"];// Note: This class uses a State pattern on a per-method basis:
// 'bind' sets 'this.getValue' / 'setValue' and shadows the
// prototype version of these methods with one that represents
// the bound state. When the property is not found, the methods
// become no-ops.
class aA{constructor(e,t,i){this.path=t,this.parsedPath=i||aA.parseTrackName(t),this.node=aA.findNode(e,this.parsedPath.nodeName),this.rootNode=e,// initial state of these methods that calls 'bind'
this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new aA.Composite(e,t,i):new aA(e,t,i)}/**
	 * Replaces spaces with underscores and removes unsupported characters from
	 * node names, to ensure compatibility with parseTrackName().
	 *
	 * @param {string} name Node name to be sanitized.
	 * @return {string}
	 */static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ay,"")}static parseTrackName(e){let t=aE.exec(e);if(null===t)throw Error("PropertyBinding: Cannot parse trackName: "+e);let i={// directoryName: matches[ 1 ], // (tschw) currently unused
nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(void 0!==n&&-1!==n){let e=i.nodeName.substring(n+1);// Object names must be checked against an allowlist. Otherwise, there
// is no way to parse 'foo.bar.baz': 'baz' must be a property, but
// 'bar' could be the objectName, or part of a nodeName (which can
// include '.' characters).
-1!==aT.indexOf(e)&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=e)}if(null===i.propertyName||0===i.propertyName.length)throw Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(void 0===t||""===t||"."===t||-1===t||t===e.name||t===e.uuid)return e;// search into skeleton bones.
if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(void 0!==i)return i}// search into node subtree.
if(e.children){let i=function(e){for(let n=0;n<e.length;n++){let r=e[n];if(r.name===t||r.uuid===t)return r;let a=i(r.children);if(a)return a}return null},n=i(e.children);if(n)return n}return null}// these are used to "bind" a nonexistent property
_getValue_unavailable(){}_setValue_unavailable(){}// Getters
_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}// Direct
_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}// EntireArray
_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}// ArrayElement
_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}// HasToFromArray
_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}// create getter / setter pair for a property in the scene graph
bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,r=t.propertyIndex;// ensure there is a value node
if(e||(e=aA.findNode(this.rootNode,t.nodeName),this.node=e),// set fail state so we can just 'return' on error
this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let n=t.objectIndex;// special cases were we need to reach deeper into the hierarchy to get the face materials....
switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}// potential future optimization: skip this if propertyIndex is already an integer
// and convert the integer string to a true integer.
e=e.skeleton.bones;// support resolving morphTarget names into indices.
for(let t=0;t<e.length;t++)if(e[t].name===n){n=t;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(void 0===e[i]){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(void 0!==n){if(void 0===e[n]){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[n]}}// resolve property
let a=e[n];if(void 0===a){let i=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+i+"."+n+" but it wasn't found.",e);return}// determine versioning scheme
let s=this.Versioning.None;this.targetObject=e,void 0!==e.needsUpdate?s=this.Versioning.NeedsUpdate:void 0!==e.matrixWorldNeedsUpdate&&(s=this.Versioning.MatrixWorldNeedsUpdate);// determine how the property gets bound
let o=this.BindingType.Direct;if(void 0!==r){// access a sub element of the property array (only primitives are supported right now)
if("morphTargetInfluences"===n){// potential optimization, skip this if propertyIndex is already an integer, and convert the integer string to a true integer.
// support resolving morphTarget names into indices.
if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}void 0!==e.morphTargetDictionary[r]&&(r=e.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else void 0!==a.fromArray&&void 0!==a.toArray?(// must use copy for Object3D.Euler/Quaternion
o=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(o=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;// select getter / setter
this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][s]}unbind(){this.node=null,// back to the prototype version of getValue / setValue
// note: avoiding to mutate the shape of 'this' via 'delete'
this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}aA.Composite=class{constructor(e,t,i){let n=i||aA.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();// bind all binding
let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];// and only call .getValue on the first
void 0!==n&&n.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},aA.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},aA.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},aA.prototype.GetterByBindingType=[aA.prototype._getValue_direct,aA.prototype._getValue_array,aA.prototype._getValue_arrayElement,aA.prototype._getValue_toArray],aA.prototype.SetterByBindingTypeAndVersioning=[[// Direct
aA.prototype._setValue_direct,aA.prototype._setValue_direct_setNeedsUpdate,aA.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[// EntireArray
aA.prototype._setValue_array,aA.prototype._setValue_array_setNeedsUpdate,aA.prototype._setValue_array_setMatrixWorldNeedsUpdate],[// ArrayElement
aA.prototype._setValue_arrayElement,aA.prototype._setValue_arrayElement_setNeedsUpdate,aA.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[// HasToFromArray
aA.prototype._setValue_fromArray,aA.prototype._setValue_fromArray_setNeedsUpdate,aA.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],new Float32Array(1);/**
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */class aR{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}// restrict phi to be between EPS and PI-EPS
makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(x(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"156"}})),"undefined"!=typeof window&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="156");/**
 * A 3x3 matrix.
 * Authored by {@link http://github.com/schteppe/ schteppe}
 */class aC{/**
   * A vector of length 9, containing all matrix elements.
   *//**
   * @param elements A vector of length 9, containing all matrix elements.
   */constructor(e){void 0===e&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}/**
   * Sets the matrix to identity
   * @todo Should perhaps be renamed to `setIdentity()` to be more clear.
   * @todo Create another function that immediately creates an identity matrix eg. `eye()`
   */identity(){let e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}/**
   * Set all elements to zero
   */setZero(){let e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}/**
   * Sets the matrix diagonal elements from a Vec3
   */setTrace(e){let t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}/**
   * Gets the matrix diagonal elements
   */getTrace(e){void 0===e&&(e=new aL);let t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}/**
   * Matrix-Vector multiplication
   * @param v The vector to multiply with
   * @param target Optional, target to save the result in.
   */vmult(e,t){void 0===t&&(t=new aL);let i=this.elements,n=e.x,r=e.y,a=e.z;return t.x=i[0]*n+i[1]*r+i[2]*a,t.y=i[3]*n+i[4]*r+i[5]*a,t.z=i[6]*n+i[7]*r+i[8]*a,t}/**
   * Matrix-scalar multiplication
   */smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}/**
   * Matrix multiplication
   * @param matrix Matrix to multiply with from left side.
   */mmult(e,t){void 0===t&&(t=new aC);let i=this.elements,n=e.elements,r=t.elements,a=i[0],s=i[1],o=i[2],l=i[3],h=i[4],c=i[5],u=i[6],d=i[7],p=i[8],f=n[0],m=n[1],g=n[2],v=n[3],y=n[4],x=n[5],_=n[6],w=n[7],b=n[8];return r[0]=a*f+s*v+o*_,r[1]=a*m+s*y+o*w,r[2]=a*g+s*x+o*b,r[3]=l*f+h*v+c*_,r[4]=l*m+h*y+c*w,r[5]=l*g+h*x+c*b,r[6]=u*f+d*v+p*_,r[7]=u*m+d*y+p*w,r[8]=u*g+d*x+p*b,t}/**
   * Scale each column of the matrix
   */scale(e,t){void 0===t&&(t=new aC);let i=this.elements,n=t.elements;for(let t=0;3!==t;t++)n[3*t+0]=e.x*i[3*t+0],n[3*t+1]=e.y*i[3*t+1],n[3*t+2]=e.z*i[3*t+2];return t}/**
   * Solve Ax=b
   * @param b The right hand side
   * @param target Optional. Target vector to save in.
   * @return The solution x
   * @todo should reuse arrays
   */solve(e,t){let i,n,r,a;void 0===t&&(t=new aL);let s=[];for(i=0;i<12;i++)s.push(0);for(i=0;i<3;i++)for(n=0;n<3;n++)s[i+4*n]=this.elements[i+3*n];s[3]=e.x,s[7]=e.y,s[11]=e.z;let o=3,l=o;do{if(0===s[(i=l-o)+4*i])// the pivot is null, swap lines
{for(n=i+1;n<l;n++)if(0!==s[i+4*n]){r=4;do // do ligne( i ) = ligne( i ) + ligne( k )
a=4-r,s[a+4*i]+=s[a+4*n];while(--r)break}}if(0!==s[i+4*i])for(n=i+1;n<l;n++){let e=s[i+4*n]/s[i+4*i];r=4;do s[// do ligne( k ) = ligne( k ) - multiplier * ligne( i )
(a=4-r)+4*n]=a<=i?0:s[a+4*n]-s[a+4*i]*e;while(--r)}}while(--o)// Get the solution
if(t.z=s[11]/s[10],t.y=(s[7]-s[6]*t.z)/s[5],t.x=(s[3]-s[2]*t.z-s[1]*t.y)/s[0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}/**
   * Get an element in the matrix by index. Index starts at 0, not 1!!!
   * @param value If provided, the matrix element will be set to this value.
   */e(e,t,i){if(void 0===i)return this.elements[t+3*e];this.elements[t+3*e]=i}/**
   * Copy another matrix into this matrix object.
   */copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}/**
   * Returns a string representation of the matrix.
   */toString(){let e="";for(let t=0;t<9;t++)e+=this.elements[t]+",";return e}/**
   * reverse the matrix
   * @param target Target matrix to save in.
   * @return The solution x
   */reverse(e){let t,i,n,r;for(void 0===e&&(e=new aC),t=0;t<3;t++)for(i=0;i<3;i++)aP[t+6*i]=this.elements[t+3*i];aP[3]=1,aP[9]=0,aP[15]=0,aP[4]=0,aP[10]=1,aP[16]=0,aP[5]=0,aP[11]=0,aP[17]=1;let a=3,s=a;do{if(0===aP[(t=s-a)+6*t])// the pivot is null, swap lines
{for(i=t+1;i<s;i++)if(0!==aP[t+6*i]){n=6;do // do line( i ) = line( i ) + line( k )
r=6-n,aP[r+6*t]+=aP[r+6*i];while(--n)break}}if(0!==aP[t+6*t])for(i=t+1;i<s;i++){let e=aP[t+6*i]/aP[t+6*t];n=6;do aP[// do line( k ) = line( k ) - multiplier * line( i )
(r=6-n)+6*i]=r<=t?0:aP[r+6*i]-aP[r+6*t]*e;while(--n)}}while(--a)// eliminate the upper left triangle of the matrix
t=2;do{i=t-1;do{let e=aP[t+6*i]/aP[t+6*t];n=6;do aP[(r=6-n)+6*i]=aP[r+6*i]-aP[r+6*t]*e;while(--n)}while(i--)}while(--t)// operations on the diagonal
t=2;do{let e=1/aP[t+6*t];n=6;do aP[(r=6-n)+6*t]=aP[r+6*t]*e;while(--n)}while(t--)t=2;do{i=2;do{if(isNaN(r=aP[3+i+6*t])||r===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(t,i,r)}while(i--)}while(t--)return e}/**
   * Set the matrix from a quaterion
   */setRotationFromQuaternion(e){let t=e.x,i=e.y,n=e.z,r=e.w,a=t+t,s=i+i,o=n+n,l=t*a,h=t*s,c=t*o,u=i*s,d=i*o,p=n*o,f=r*a,m=r*s,g=r*o,v=this.elements;return v[0]=1-(u+p),v[1]=h-g,v[2]=c+m,v[3]=h+g,v[4]=1-(l+p),v[5]=d-f,v[6]=c-m,v[7]=d+f,v[8]=1-(l+u),this}/**
   * Transpose the matrix
   * @param target Optional. Where to store the result.
   * @return The target Mat3, or a new Mat3 if target was omitted.
   */transpose(e){let t;void 0===e&&(e=new aC);let i=this.elements,n=e.elements;return n[0]=i[0],n[4]=i[4],n[8]=i[8],t=i[1],n[1]=i[3],n[3]=t,t=i[2],n[2]=i[6],n[6]=t,t=i[5],n[5]=i[7],n[7]=t,e}}const aP=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];/**
 * 3-dimensional vector
 * @example
 *     const v = new Vec3(1, 2, 3)
 *     console.log('x=' + v.x) // x=1
 */class aL{constructor(e,t,i){void 0===e&&(e=0),void 0===t&&(t=0),void 0===i&&(i=0),this.x=e,this.y=t,this.z=i}/**
   * Vector cross product
   * @param target Optional target to save in.
   */cross(e,t){void 0===t&&(t=new aL);let i=e.x,n=e.y,r=e.z,a=this.x,s=this.y,o=this.z;return t.x=s*r-o*n,t.y=o*i-a*r,t.z=a*n-s*i,t}/**
   * Set the vectors' 3 elements
   */set(e,t,i){return this.x=e,this.y=t,this.z=i,this}/**
   * Set all components of the vector to zero.
   */setZero(){this.x=this.y=this.z=0}/**
   * Vector addition
   */vadd(e,t){if(!t)return new aL(this.x+e.x,this.y+e.y,this.z+e.z);t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z}/**
   * Vector subtraction
   * @param target Optional target to save in.
   */vsub(e,t){if(!t)return new aL(this.x-e.x,this.y-e.y,this.z-e.z);t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z}/**
   * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
   *
   * See {@link https://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf Umeå University Lecture}
   */crossmat(){return new aC([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}/**
   * Normalize the vector. Note that this changes the values in the vector.
    * @return Returns the norm of the vector
   */normalize(){let e=this.x,t=this.y,i=this.z,n=Math.sqrt(e*e+t*t+i*i);if(n>0){let e=1/n;this.x*=e,this.y*=e,this.z*=e}else // Make something up
this.x=0,this.y=0,this.z=0;return n}/**
   * Get the version of this vector that is of length 1.
   * @param target Optional target to save in
   * @return Returns the unit vector
   */unit(e){void 0===e&&(e=new aL);let t=this.x,i=this.y,n=this.z,r=Math.sqrt(t*t+i*i+n*n);return r>0?(r=1/r,e.x=t*r,e.y=i*r,e.z=n*r):(e.x=1,e.y=0,e.z=0),e}/**
   * Get the length of the vector
   */length(){let e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)}/**
   * Get the squared length of the vector.
   */lengthSquared(){return this.dot(this)}/**
   * Get distance from this point to another point
   */distanceTo(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,s=e.z;return Math.sqrt((r-t)*(r-t)+(a-i)*(a-i)+(s-n)*(s-n))}/**
   * Get squared distance from this point to another point
   */distanceSquared(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,s=e.z;return(r-t)*(r-t)+(a-i)*(a-i)+(s-n)*(s-n)}/**
   * Multiply all the components of the vector with a scalar.
   * @param target The vector to save the result in.
   */scale(e,t){void 0===t&&(t=new aL);let i=this.x,n=this.y,r=this.z;return t.x=e*i,t.y=e*n,t.z=e*r,t}/**
   * Multiply the vector with an other vector, component-wise.
   * @param target The vector to save the result in.
   */vmul(e,t){return void 0===t&&(t=new aL),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}/**
   * Scale a vector and add it to this vector. Save the result in "target". (target = this + vector * scalar)
   * @param target The vector to save the result in.
   */addScaledVector(e,t,i){return void 0===i&&(i=new aL),i.x=this.x+e*t.x,i.y=this.y+e*t.y,i.z=this.z+e*t.z,i}/**
   * Calculate dot product
   * @param vector
   */dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return 0===this.x&&0===this.y&&0===this.z}/**
   * Make the vector point in the opposite direction.
   * @param target Optional target to save in
   */negate(e){return void 0===e&&(e=new aL),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}/**
   * Compute two artificial tangents to the vector
   * @param t1 Vector object to save the first tangent in
   * @param t2 Vector object to save the second tangent in
   */tangents(e,t){let i=this.length();if(i>0){let n=1/i;aN.set(this.x*n,this.y*n,this.z*n),.9>Math.abs(aN.x)?aI.set(1,0,0):aI.set(0,1,0),aN.cross(aI,e),aN.cross(e,t)}else // The normal length is zero, make something up
e.set(1,0,0),t.set(0,1,0)}/**
   * Converts to a more readable format
   */toString(){return`${this.x},${this.y},${this.z}`}/**
   * Converts to an array
   */toArray(){return[this.x,this.y,this.z]}/**
   * Copies value of source to this vector.
   */copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}/**
   * Do a linear interpolation between two vectors
   * @param t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
   */lerp(e,t,i){let n=this.x,r=this.y,a=this.z;i.x=n+(e.x-n)*t,i.y=r+(e.y-r)*t,i.z=a+(e.z-a)*t}/**
   * Check if a vector equals is almost equal to another one.
   */almostEquals(e,t){return void 0===t&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}/**
   * Check if a vector is almost zero
   */almostZero(e){return void 0===e&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}/**
   * Check if the vector is anti-parallel to another vector.
   * @param precision Set to zero for exact comparisons
   */isAntiparallelTo(e,t){return this.negate(aU),aU.almostEquals(e,t)}/**
   * Clone the vector
   */clone(){return new aL(this.x,this.y,this.z)}}aL.ZERO=new aL(0,0,0),aL.UNIT_X=new aL(1,0,0),aL.UNIT_Y=new aL(0,1,0),aL.UNIT_Z=new aL(0,0,1);const aN=new aL,aI=new aL,aU=new aL;/**
 * Axis aligned bounding box class.
 */class aD{/**
   * The lower bound of the bounding box
   *//**
   * The upper bound of the bounding box
   */constructor(e){void 0===e&&(e={}),this.lowerBound=new aL,this.upperBound=new aL,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}/**
   * Set the AABB bounds from a set of points.
   * @param points An array of Vec3's.
   * @return The self object
   */setFromPoints(e,t,i,n){let r=this.lowerBound,a=this.upperBound;r.copy(e[0]),i&&i.vmult(r,r),a.copy(r);for(let t=1;t<e.length;t++){let n=e[t];i&&(i.vmult(n,aO),n=aO),n.x>a.x&&(a.x=n.x),n.x<r.x&&(r.x=n.x),n.y>a.y&&(a.y=n.y),n.y<r.y&&(r.y=n.y),n.z>a.z&&(a.z=n.z),n.z<r.z&&(r.z=n.z)}// Add offset
return t&&(t.vadd(r,r),t.vadd(a,a)),n&&(r.x-=n,r.y-=n,r.z-=n,a.x+=n,a.y+=n,a.z+=n),this}/**
   * Copy bounds from an AABB to this AABB
   * @param aabb Source to copy from
   * @return The this object, for chainability
   */copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}/**
   * Clone an AABB
   */clone(){return new aD().copy(this)}/**
   * Extend this AABB so that it covers the given AABB too.
   */extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}/**
   * Returns true if the given AABB overlaps this AABB.
   */overlaps(e){let t=this.lowerBound,i=this.upperBound,n=e.lowerBound,r=e.upperBound,a=n.x<=i.x&&i.x<=r.x||t.x<=r.x&&r.x<=i.x,s=n.y<=i.y&&i.y<=r.y||t.y<=r.y&&r.y<=i.y,o=n.z<=i.z&&i.z<=r.z||t.z<=r.z&&r.z<=i.z;return a&&s&&o}volume(){let e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}/**
   * Returns true if the given AABB is fully contained in this AABB.
   */contains(e){let t=this.lowerBound,i=this.upperBound,n=e.lowerBound,r=e.upperBound;//      |---------|
// |---------------|
// l1              u1
return t.x<=n.x&&i.x>=r.x&&t.y<=n.y&&i.y>=r.y&&t.z<=n.z&&i.z>=r.z}getCorners(e,t,i,n,r,a,s,o){let l=this.lowerBound,h=this.upperBound;e.copy(l),t.set(h.x,l.y,l.z),i.set(h.x,h.y,l.z),n.set(l.x,h.y,h.z),r.set(h.x,l.y,h.z),a.set(l.x,h.y,l.z),s.set(l.x,l.y,h.z),o.copy(h)}/**
   * Get the representation of an AABB in another frame.
   * @return The "target" AABB object.
   */toLocalFrame(e,t){let i=az[0],n=az[1],r=az[2],a=az[3],s=az[4],o=az[5],l=az[6],h=az[7];this.getCorners(i,n,r,a,s,o,l,h);// Transform them to new local frame
for(let t=0;8!==t;t++){let i=az[t];e.pointToLocal(i,i)}return t.setFromPoints(az)}/**
   * Get the representation of an AABB in the global frame.
   * @return The "target" AABB object.
   */toWorldFrame(e,t){let i=az[0],n=az[1],r=az[2],a=az[3],s=az[4],o=az[5],l=az[6],h=az[7];this.getCorners(i,n,r,a,s,o,l,h);// Transform them to new local frame
for(let t=0;8!==t;t++){let i=az[t];e.pointToWorld(i,i)}return t.setFromPoints(az)}/**
   * Check if the AABB is hit by a ray.
   */overlapsRay(e){let{direction:t,from:i}=e,n=1/t.x,r=1/t.y,a=1/t.z,s=(this.lowerBound.x-i.x)*n,o=(this.upperBound.x-i.x)*n,l=(this.lowerBound.y-i.y)*r,h=(this.upperBound.y-i.y)*r,c=(this.lowerBound.z-i.z)*a,u=(this.upperBound.z-i.z)*a,d=Math.min(Math.min(Math.max(s,o),Math.max(l,h)),Math.max(c,u));// const t = 0
return!(d<0||Math.max(Math.max(Math.min(s,o),Math.min(l,h)),Math.min(c,u))>d)}}const aO=new aL,az=[new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL];/**
 * Collision "matrix".
 * It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 */class aB{/**
   * The matrix storage.
   */constructor(){this.matrix=[]}/**
   * Get an element
   */get(e,t){let{index:i}=e,{index:n}=t;if(n>i){let e=n;n=i,i=e}return this.matrix[(i*(i+1)>>1)+n-1]}/**
   * Set an element
   */set(e,t,i){let{index:n}=e,{index:r}=t;if(r>n){let e=r;r=n,n=e}this.matrix[(n*(n+1)>>1)+r-1]=i?1:0}/**
   * Sets all elements to zero
   */reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}/**
   * Sets the max number of objects
   */setNumObjects(e){this.matrix.length=e*(e-1)>>1}}/**
 * Base class for objects that dispatches events.
 */class aF{/**
   * Add an event listener
   * @return The self object, for chainability.
   */addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let i=this._listeners;return void 0===i[e]&&(i[e]=[]),i[e].includes(t)||i[e].push(t),this}/**
   * Check if an event listener is added
   */hasEventListener(e,t){if(void 0===this._listeners)return!1;let i=this._listeners;return!!(void 0!==i[e]&&i[e].includes(t))}/**
   * Check if any event listener of the given type is added
   */hasAnyEventListener(e){if(void 0===this._listeners)return!1;let t=this._listeners;return void 0!==t[e]}/**
   * Remove an event listener
   * @return The self object, for chainability.
   */removeEventListener(e,t){if(void 0===this._listeners)return this;let i=this._listeners;if(void 0===i[e])return this;let n=i[e].indexOf(t);return -1!==n&&i[e].splice(n,1),this}/**
   * Emit an event.
   * @return The self object, for chainability.
   */dispatchEvent(e){if(void 0===this._listeners)return this;let t=this._listeners,i=t[e.type];if(void 0!==i){e.target=this;for(let t=0,n=i.length;t<n;t++)i[t].call(this,e)}return this}}/**
 * A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
 * @param x Multiplier of the imaginary basis vector i.
 * @param y Multiplier of the imaginary basis vector j.
 * @param z Multiplier of the imaginary basis vector k.
 * @param w Multiplier of the real part.
 * @see http://en.wikipedia.org/wiki/Quaternion
 */class aV{constructor(e,t,i,n){void 0===e&&(e=0),void 0===t&&(t=0),void 0===i&&(i=0),void 0===n&&(n=1),this.x=e,this.y=t,this.z=i,this.w=n}/**
   * Set the value of the quaternion.
   */set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}/**
   * Convert to a readable format
   * @return "x,y,z,w"
   */toString(){return`${this.x},${this.y},${this.z},${this.w}`}/**
   * Convert to an Array
   * @return [x, y, z, w]
   */toArray(){return[this.x,this.y,this.z,this.w]}/**
   * Set the quaternion components given an axis and an angle in radians.
   */setFromAxisAngle(e,t){let i=Math.sin(.5*t);return this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(.5*t),this}/**
   * Converts the quaternion to [ axis, angle ] representation.
   * @param targetAxis A vector object to reuse for storing the axis.
   * @return An array, first element is the axis and the second is the angle in radians.
   */toAxisAngle(e){void 0===e&&(e=new aL),this.normalize();let t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(// test to avoid divide by zero, s is always positive due to sqrt
// if s close to zero then direction of axis not important
e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]}/**
   * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
   */setFromVectors(e,t){if(e.isAntiparallelTo(t))e.tangents(aH,aW),this.setFromAxisAngle(aH,Math.PI);else{let i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}/**
   * Multiply the quaternion with an other quaternion.
   */mult(e,t){void 0===t&&(t=new aV);let i=this.x,n=this.y,r=this.z,a=this.w,s=e.x,o=e.y,l=e.z,h=e.w;return t.x=i*h+a*s+n*l-r*o,t.y=n*h+a*o+r*s-i*l,t.z=r*h+a*l+i*o-n*s,t.w=a*h-i*s-n*o-r*l,t}/**
   * Get the inverse quaternion rotation.
   */inverse(e){void 0===e&&(e=new aV);let t=this.x,i=this.y,n=this.z,r=this.w;this.conjugate(e);let a=1/(t*t+i*i+n*n+r*r);return e.x*=a,e.y*=a,e.z*=a,e.w*=a,e}/**
   * Get the quaternion conjugate
   */conjugate(e){return void 0===e&&(e=new aV),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}/**
   * Normalize the quaternion. Note that this changes the values of the quaternion.
   */normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return 0===e?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}/**
   * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
   * @author unphased, https://github.com/unphased
   */normalizeFast(){let e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return 0===e?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}/**
   * Multiply the quaternion by a vector
   */vmult(e,t){void 0===t&&(t=new aL);let i=e.x,n=e.y,r=e.z,a=this.x,s=this.y,o=this.z,l=this.w,h=l*i+s*r-o*n,c=l*n+o*i-a*r,u=l*r+a*n-s*i,d=-a*i-s*n-o*r;return t.x=h*l+-(d*a)+-(c*o)- -(u*s),t.y=c*l+-(d*s)+-(u*a)- -(h*o),t.z=u*l+-(d*o)+-(h*s)- -(c*a),t}/**
   * Copies value of source to this quaternion.
   * @return this
   */copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}/**
   * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: https://www.euclideanspace.com/maths/standards/index.htm
   * @param order Three-character string, defaults to "YZX"
   */toEuler(e,t){let i,n,r;void 0===t&&(t="YZX");let a=this.x,s=this.y,o=this.z,l=this.w;if("YZX"===t){let e=a*s+o*l;if(e>.499&&(// singularity at north pole
i=2*Math.atan2(a,l),n=Math.PI/2,r=0),e<-.499&&(// singularity at south pole
i=-2*Math.atan2(a,l),n=-Math.PI/2,r=0),void 0===i){let t=o*o;i=Math.atan2(2*s*l-2*a*o,1-2*(s*s)-2*t),n=Math.asin(2*e),r=Math.atan2(2*a*l-2*s*o,1-2*(a*a)-2*t)}}else throw Error(`Euler order ${t} not supported yet.`);e.y=i,e.z=n,e.x=r}/**
   * Set the quaternion components given Euler angle representation.
   *
   * @param order The order to apply angles: 'XYZ' or 'YXZ' or any other combination.
   *
   * See {@link https://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors MathWorks} reference
   */setFromEuler(e,t,i,n){void 0===n&&(n="XYZ");let r=Math.cos(e/2),a=Math.cos(t/2),s=Math.cos(i/2),o=Math.sin(e/2),l=Math.sin(t/2),h=Math.sin(i/2);return"XYZ"===n?(this.x=o*a*s+r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s-o*l*h):"YXZ"===n?(this.x=o*a*s+r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s+o*l*h):"ZXY"===n?(this.x=o*a*s-r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s-o*l*h):"ZYX"===n?(this.x=o*a*s-r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s+o*l*h):"YZX"===n?(this.x=o*a*s+r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s-o*l*h):"XZY"===n&&(this.x=o*a*s-r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s+o*l*h),this}clone(){return new aV(this.x,this.y,this.z,this.w)}/**
   * Performs a spherical linear interpolation between two quat
   *
   * @param toQuat second operand
   * @param t interpolation amount between the self quaternion and toQuat
   * @param target A quaternion to store the result in. If not provided, a new one will be created.
   * @returns {Quaternion} The "target" object
   */slerp(e,t,i){let n,r,a,s,o;void 0===i&&(i=new aV);let l=this.x,h=this.y,c=this.z,u=this.w,d=e.x,p=e.y,f=e.z,m=e.w;return(r=l*d+h*p+c*f+u*m)<0&&(r=-r,d=-d,p=-p,f=-f,m=-m),1-r>1e-6?(a=Math.sin(// standard case (slerp)
n=Math.acos(r)),s=Math.sin((1-t)*n)/a,o=Math.sin(t*n)/a):(// "from" and "to" quaternions are very close
//  ... so we can do a linear interpolation
s=1-t,o=t),i.x=s*l+o*d,i.y=s*h+o*p,i.z=s*c+o*f,i.w=s*u+o*m,i}/**
   * Rotate an absolute orientation quaternion given an angular velocity and a time step.
   */integrate(e,t,i,n){void 0===n&&(n=new aV);let r=e.x*i.x,a=e.y*i.y,s=e.z*i.z,o=this.x,l=this.y,h=this.z,c=this.w,u=.5*t;return n.x+=u*(r*c+a*h-s*l),n.y+=u*(a*c+s*o-r*h),n.z+=u*(s*c+r*l-a*o),n.w+=u*(-r*o-a*l-s*h),n}}const aH=new aL,aW=new aL;/**
 * ShapeType
 *//**
 * Base class for shapes
 */class ak{/**
   * Identifier of the Shape.
   *//**
   * The type of this shape. Must be set to an int > 0 by subclasses.
   *//**
   * The local bounding sphere radius of this shape.
   *//**
   * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
   * @default true
   *//**
   * @default 1
   *//**
   * @default -1
   *//**
   * Optional material of the shape that regulates contact properties.
   *//**
   * The body to which the shape is added to.
   *//**
   * All the Shape types.
   */constructor(e){void 0===e&&(e={}),this.id=ak.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=!e.collisionResponse||e.collisionResponse,this.collisionFilterGroup=void 0!==e.collisionFilterGroup?e.collisionFilterGroup:1,this.collisionFilterMask=void 0!==e.collisionFilterMask?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}/**
   * Computes the bounding sphere radius.
   * The result is stored in the property `.boundingSphereRadius`
   */updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}/**
   * Get the volume of this shape
   */volume(){throw`volume() not implemented for shape type ${this.type}`}/**
   * Calculates the inertia in the local frame for this shape.
   * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
   */calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}/**
   * @todo use abstract for these kind of methods
   */calculateWorldAABB(e,t,i,n){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}ak.idCounter=0,ak.types={/** SPHERE */SPHERE:1,/** PLANE */PLANE:2,/** BOX */BOX:4,/** COMPOUND */COMPOUND:8,/** CONVEXPOLYHEDRON */CONVEXPOLYHEDRON:16,/** HEIGHTFIELD */HEIGHTFIELD:32,/** PARTICLE */PARTICLE:64,/** CYLINDER */CYLINDER:128,/** TRIMESH */TRIMESH:256};/**
 * Transformation utilities.
 */class aG{/**
   * position
   *//**
   * quaternion
   */constructor(e){void 0===e&&(e={}),this.position=new aL,this.quaternion=new aV,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}/**
   * Get a global point in local transform coordinates.
   */pointToLocal(e,t){return aG.pointToLocalFrame(this.position,this.quaternion,e,t)}/**
   * Get a local point in global transform coordinates.
   */pointToWorld(e,t){return aG.pointToWorldFrame(this.position,this.quaternion,e,t)}/**
   * vectorToWorldFrame
   */vectorToWorldFrame(e,t){return void 0===t&&(t=new aL),this.quaternion.vmult(e,t),t}/**
   * pointToLocalFrame
   */static pointToLocalFrame(e,t,i,n){return void 0===n&&(n=new aL),i.vsub(e,n),t.conjugate(aq),aq.vmult(n,n),n}/**
   * pointToWorldFrame
   */static pointToWorldFrame(e,t,i,n){return void 0===n&&(n=new aL),t.vmult(i,n),n.vadd(e,n),n}/**
   * vectorToWorldFrame
   */static vectorToWorldFrame(e,t,i){return void 0===i&&(i=new aL),e.vmult(t,i),i}/**
   * vectorToLocalFrame
   */static vectorToLocalFrame(e,t,i,n){return void 0===n&&(n=new aL),t.w*=-1,t.vmult(i,n),t.w*=-1,n}}const aq=new aV;/**
 * A set of polygons describing a convex shape.
 *
 * The shape MUST be convex for the code to work properly. No polygons may be coplanar (contained
 * in the same 3D plane), instead these should be merged into one polygon.
 *
 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
 * @author schteppe / https://github.com/schteppe
 * @see https://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
 *
 * @todo Move the clipping functions to ContactGenerator?
 * @todo Automatically merge coplanar polygons in constructor.
 * @example
 *     const convexShape = new CANNON.ConvexPolyhedron({ vertices, faces })
 *     const convexBody = new CANNON.Body({ mass: 1, shape: convexShape })
 *     world.addBody(convexBody)
 */class aj extends ak{/** vertices *//**
   * Array of integer arrays, indicating which vertices each face consists of
   *//** faceNormals *//** worldVertices *//** worldVerticesNeedsUpdate *//** worldFaceNormals *//** worldFaceNormalsNeedsUpdate *//**
   * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
   *//** uniqueEdges *//**
   * @param vertices An array of Vec3's
   * @param faces Array of integer arrays, describing which vertices that is included in each face.
   */constructor(e){void 0===e&&(e={});let{vertices:t=[],faces:i=[],normals:n=[],axes:r,boundingSphereRadius:a}=e;super({type:ak.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=i,this.faceNormals=n,0===this.faceNormals.length&&this.computeNormals(),a?this.boundingSphereRadius=a:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}/**
   * Computes uniqueEdges
   */computeEdges(){let e=this.faces,t=this.vertices,i=this.uniqueEdges;i.length=0;let n=new aL;for(let r=0;r!==e.length;r++){let a=e[r],s=a.length;for(let e=0;e!==s;e++){let r=(e+1)%s;t[a[e]].vsub(t[a[r]],n),n.normalize();let o=!1;for(let e=0;e!==i.length;e++)if(i[e].almostEquals(n)||i[e].almostEquals(n)){o=!0;break}o||i.push(n.clone())}}}/**
   * Compute the normals of the faces.
   * Will reuse existing Vec3 objects in the `faceNormals` array if they exist.
   */computeNormals(){this.faceNormals.length=this.faces.length;// Generate normals
for(let e=0;e<this.faces.length;e++){// Check so all vertices exists for this face
for(let t=0;t<this.faces[e].length;t++)if(!this.vertices[this.faces[e][t]])throw Error(`Vertex ${this.faces[e][t]} not found!`);let t=this.faceNormals[e]||new aL;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;let i=this.vertices[this.faces[e][0]];if(0>t.dot(i)){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let t=0;t<this.faces[e].length;t++)console.warn(`.vertices[${this.faces[e][t]}] = Vec3(${this.vertices[this.faces[e][t]].toString()})`)}}}/**
   * Compute the normal of a face from its vertices
   */getFaceNormal(e,t){let i=this.faces[e],n=this.vertices[i[0]],r=this.vertices[i[1]],a=this.vertices[i[2]];aj.computeNormal(n,r,a,t)}/**
   * Get face normal given 3 vertices
   */static computeNormal(e,t,i,n){let r=new aL,a=new aL;t.vsub(e,a),i.vsub(t,r),r.cross(a,n),n.isZero()||n.normalize()}/**
   * @param minDist Clamp distance
   * @param result The an array of contact point objects, see clipFaceAgainstHull
   */clipAgainstHull(e,t,i,n,r,a,s,o,l){let h=new aL,c=-1,u=-Number.MAX_VALUE;for(let e=0;e<i.faces.length;e++){h.copy(i.faceNormals[e]),r.vmult(h,h);let t=h.dot(a);t>u&&(u=t,c=e)}let d=[];for(let e=0;e<i.faces[c].length;e++){let t=i.vertices[i.faces[c][e]],a=new aL;a.copy(t),r.vmult(a,a),n.vadd(a,a),d.push(a)}c>=0&&this.clipFaceAgainstHull(a,e,t,d,s,o,l)}/**
   * Find the separating axis between this hull and another
   * @param target The target vector to save the axis in
   * @return Returns false if a separation is found, else true
   */findSeparatingAxis(e,t,i,n,r,a,s,o){let l=new aL,h=new aL,c=new aL,u=new aL,d=new aL,p=new aL,f=Number.MAX_VALUE;if(this.uniqueAxes)for(let s=0;s!==this.uniqueAxes.length;s++){// Get world axis
i.vmult(this.uniqueAxes[s],l);let o=this.testSepAxis(l,e,t,i,n,r);if(!1===o)return!1;o<f&&(f=o,a.copy(l))}else{let o=s?s.length:this.faces.length;// Test face normals from hullA
for(let h=0;h<o;h++){let o=s?s[h]:h;// Get world face normal
l.copy(this.faceNormals[o]),i.vmult(l,l);let c=this.testSepAxis(l,e,t,i,n,r);if(!1===c)return!1;c<f&&(f=c,a.copy(l))}}if(e.uniqueAxes)for(let s=0;s!==e.uniqueAxes.length;s++){r.vmult(e.uniqueAxes[s],h);let o=this.testSepAxis(h,e,t,i,n,r);if(!1===o)return!1;o<f&&(f=o,a.copy(h))}else{// Test face normals from hullB
let s=o?o.length:e.faces.length;for(let l=0;l<s;l++){let s=o?o[l]:l;h.copy(e.faceNormals[s]),r.vmult(h,h);let c=this.testSepAxis(h,e,t,i,n,r);if(!1===c)return!1;c<f&&(f=c,a.copy(h))}}// Test edges
for(let s=0;s!==this.uniqueEdges.length;s++){// Get world edge
i.vmult(this.uniqueEdges[s],u);for(let s=0;s!==e.uniqueEdges.length;s++)if(// Get world edge 2
r.vmult(e.uniqueEdges[s],d),u.cross(d,p),!p.almostZero()){p.normalize();let s=this.testSepAxis(p,e,t,i,n,r);if(!1===s)return!1;s<f&&(f=s,a.copy(p))}}return n.vsub(t,c),c.dot(a)>0&&a.negate(a),!0}/**
   * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
   * @return The overlap depth, or FALSE if no penetration.
   */testSepAxis(e,t,i,n,r,a){aj.project(this,e,i,n,aX),aj.project(t,e,r,a,aY);let s=aX[0],o=aX[1],l=aY[0],h=aY[1];if(s<h||l<o)return!1;// Separated
let c=s-h,u=l-o;return c<u?c:u}/**
   * calculateLocalInertia
   */calculateLocalInertia(e,t){// Approximate with box inertia
// Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
let i=new aL,n=new aL;this.computeLocalAABB(n,i);let r=i.x-n.x,a=i.y-n.y,s=i.z-n.z;t.x=1/12*e*(2*a*2*a+2*s*2*s),t.y=1/12*e*(2*r*2*r+2*s*2*s),t.z=1/12*e*(2*a*2*a+2*r*2*r)}/**
   * @param face_i Index of the face
   */getPlaneConstantOfFace(e){let t=this.faces[e],i=this.faceNormals[e],n=this.vertices[t[0]],r=-i.dot(n);return r}/**
   * Clip a face against a hull.
   * @param worldVertsB1 An array of Vec3 with vertices in the world frame.
   * @param minDist Distance clamping
   * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
   */clipFaceAgainstHull(e,t,i,n,r,a,s){let o=new aL,l=new aL,h=new aL,c=new aL,u=new aL,d=new aL,p=new aL,f=new aL,m=[],g=-1,v=Number.MAX_VALUE;for(let t=0;t<this.faces.length;t++){o.copy(this.faceNormals[t]),i.vmult(o,o);let n=o.dot(e);n<v&&(v=n,g=t)}if(g<0)return;// Get the face and construct connected faces
let y=this.faces[g];y.connectedFaces=[];for(let e=0;e<this.faces.length;e++)for(let t=0;t<this.faces[e].length;t++)-1!==/* Sharing a vertex*/y.indexOf(this.faces[e][t])&&/* Not the one we are looking for connections from */e!==g&&/* Not already added */-1===y.connectedFaces.indexOf(e)&&y.connectedFaces.push(e);// Clip the polygon to the back of the planes of all faces of hull A,
// that are adjacent to the witness face
let x=y.length;for(let e=0;e<x;e++){let r=this.vertices[y[e]],a=this.vertices[y[(e+1)%x]];r.vsub(a,l),h.copy(l),i.vmult(h,h),t.vadd(h,h),c.copy(this.faceNormals[g]),i.vmult(c,c),t.vadd(c,c),h.cross(c,u),u.negate(u),d.copy(r),i.vmult(d,d),t.vadd(d,d);let s=y.connectedFaces[e];p.copy(this.faceNormals[s]);let o=this.getPlaneConstantOfFace(s);f.copy(p),i.vmult(f,f);let v=o-f.dot(t);// Clip face against our constructed plane
for(this.clipFaceAgainstPlane(n,m,f,v);n.length;)n.shift();for(;m.length;)n.push(m.shift())}// only keep contact points that are behind the witness face
p.copy(this.faceNormals[g]);let _=this.getPlaneConstantOfFace(g);f.copy(p),i.vmult(f,f);let w=_-f.dot(t);for(let e=0;e<n.length;e++){let t=f.dot(n[e])+w;// ???
if(t<=r&&(console.log(`clamped: depth=${t} to minDist=${r}`),t=r),t<=a){let i=n[e];if(t<=1e-6){let e={point:i,normal:f,depth:t};s.push(e)}}}}/**
   * Clip a face in a hull against the back of a plane.
   * @param planeConstant The constant in the mathematical plane equation
   */clipFaceAgainstPlane(e,t,i,n){let r,a;let s=e.length;if(s<2)return t;let o=e[e.length-1],l=e[0];r=i.dot(o)+n;for(let h=0;h<s;h++){if(l=e[h],a=i.dot(l)+n,r<0){if(a<0){// Start < 0, end < 0, so output lastVertex
let e=new aL;e.copy(l),t.push(e)}else{// Start < 0, end >= 0, so output intersection
let e=new aL;o.lerp(l,r/(r-a),e),t.push(e)}}else if(a<0){// Start >= 0, end < 0 so output intersection and end
let e=new aL;o.lerp(l,r/(r-a),e),t.push(e),t.push(l)}o=l,r=a}return t}/**
   * Updates `.worldVertices` and sets `.worldVerticesNeedsUpdate` to false.
   */computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new aL);let i=this.vertices,n=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)t.vmult(i[r],n[r]),e.vadd(n[r],n[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){let i=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let n=0;n<this.vertices.length;n++){let r=i[n];r.x<e.x?e.x=r.x:r.x>t.x&&(t.x=r.x),r.y<e.y?e.y=r.y:r.y>t.y&&(t.y=r.y),r.z<e.z?e.z=r.z:r.z>t.z&&(t.z=r.z)}}/**
   * Updates `worldVertices` and sets `worldVerticesNeedsUpdate` to false.
   */computeWorldFaceNormals(e){let t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new aL);let i=this.faceNormals,n=this.worldFaceNormals;for(let r=0;r!==t;r++)e.vmult(i[r],n[r]);this.worldFaceNormalsNeedsUpdate=!1}/**
   * updateBoundingSphereRadius
   */updateBoundingSphereRadius(){// Assume points are distributed with local (0,0,0) as center
let e=0,t=this.vertices;for(let i=0;i!==t.length;i++){let n=t[i].lengthSquared();n>e&&(e=n)}this.boundingSphereRadius=Math.sqrt(e)}/**
   * calculateWorldAABB
   */calculateWorldAABB(e,t,i,n){let r,a,s,o,l,h;let c=this.vertices,u=new aL;for(let i=0;i<c.length;i++)u.copy(c[i]),t.vmult(u,u),e.vadd(u,u),(void 0===r||u.x<r)&&(r=u.x),(void 0===o||u.x>o)&&(o=u.x),(void 0===a||u.y<a)&&(a=u.y),(void 0===l||u.y>l)&&(l=u.y),(void 0===s||u.z<s)&&(s=u.z),(void 0===h||u.z>h)&&(h=u.z);i.set(r,a,s),n.set(o,l,h)}/**
   * Get approximate convex volume
   */volume(){return 4*Math.PI*this.boundingSphereRadius/3}/**
   * Get an average of all the vertices positions
   */getAveragePointLocal(e){void 0===e&&(e=new aL);let t=this.vertices;for(let i=0;i<t.length;i++)e.vadd(t[i],e);return e.scale(1/t.length,e),e}/**
   * Transform all local points. Will change the .vertices
   */transformAllPoints(e,t){let i=this.vertices.length,n=this.vertices;if(t){// Rotate vertices
for(let e=0;e<i;e++){let i=n[e];t.vmult(i,i)}// Rotate face normals
for(let e=0;e<this.faceNormals.length;e++){let i=this.faceNormals[e];t.vmult(i,i)}/*
            // Rotate edges
            for(let i=0; i<this.uniqueEdges.length; i++){
                const v = this.uniqueEdges[i];
                quat.vmult(v,v);
            }*/}// Apply offset
if(e)for(let t=0;t<i;t++){let i=n[t];i.vadd(e,i)}}/**
   * Checks whether p is inside the polyhedra. Must be in local coords.
   * The point lies outside of the convex hull of the other points if and only if the direction
   * of all the vectors from it to those other points are on less than one half of a sphere around it.
   * @param p A point given in local coordinates
   */pointIsInside(e){let t=this.vertices,i=this.faces,n=this.faceNormals,r=new aL;this.getAveragePointLocal(r);for(let a=0;a<this.faces.length;a++){let s=n[a],o=t[i[a][0]],l=new aL;e.vsub(o,l);let h=s.dot(l),c=new aL;r.vsub(o,c);let u=s.dot(c);if(h<0&&u>0||h>0&&u<0)return!1;// Encountered some other sign. Exit.
}// If we got here, all dot products were of the same sign.
return -1}/**
   * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis.
   * Results are saved in the array maxmin.
   * @param result result[0] and result[1] will be set to maximum and minimum, respectively.
   */static project(e,t,i,n,r){let a=e.vertices.length,s=0,o=0,l=e.vertices;aK.setZero(),aG.vectorToLocalFrame(i,n,t,aZ),aG.pointToLocalFrame(i,n,aK,aK);let h=aK.dot(aZ);o=s=l[0].dot(aZ);for(let e=1;e<a;e++){let t=l[e].dot(aZ);t>s&&(s=t),t<o&&(o=t)}if((o-=h)>(s-=h)){// Inconsistent - swap
let e=o;o=s,s=e}// Output
r[0]=s,r[1]=o}}const aX=[],aY=[];new aL;const aZ=new aL,aK=new aL;/**
 * A 3d box shape.
 * @example
 *     const size = 1
 *     const halfExtents = new CANNON.Vec3(size, size, size)
 *     const boxShape = new CANNON.Box(halfExtents)
 *     const boxBody = new CANNON.Body({ mass: 1, shape: boxShape })
 *     world.addBody(boxBody)
 */class aJ extends ak{/**
   * The half extents of the box.
   *//**
   * Used by the contact generator to make contacts with other convex polyhedra for example.
   */constructor(e){super({type:ak.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}/**
   * Updates the local convex polyhedron representation used for some collisions.
   */updateConvexPolyhedronRepresentation(){let e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,n=[new aL(-e,-t,-i),new aL(e,-t,-i),new aL(e,t,-i),new aL(-e,t,-i),new aL(-e,-t,i),new aL(e,-t,i),new aL(e,t,i),new aL(-e,t,i)],r=[new aL(0,0,1),new aL(0,1,0),new aL(1,0,0)],a=new aj({vertices:n,faces:[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]// +x
],axes:r});this.convexPolyhedronRepresentation=a,a.material=this.material}/**
   * Calculate the inertia of the box.
   */calculateLocalInertia(e,t){return void 0===t&&(t=new aL),aJ.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,i){i.x=1/12*t*(2*e.y*2*e.y+2*e.z*2*e.z),i.y=1/12*t*(2*e.x*2*e.x+2*e.z*2*e.z),i.z=1/12*t*(2*e.y*2*e.y+2*e.x*2*e.x)}/**
   * Get the box 6 side normals
   * @param sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
   * @param quat Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
   */getSideNormals(e,t){let i=this.halfExtents;if(e[0].set(i.x,0,0),e[1].set(0,i.y,0),e[2].set(0,0,i.z),e[3].set(-i.x,0,0),e[4].set(0,-i.y,0),e[5].set(0,0,-i.z),void 0!==t)for(let i=0;i!==e.length;i++)t.vmult(e[i],e[i]);return e}/**
   * Returns the volume of the box.
   */volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}/**
   * updateBoundingSphereRadius
   */updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}/**
   * forEachWorldCorner
   */forEachWorldCorner(e,t,i){let n=this.halfExtents,r=[[n.x,n.y,n.z],[-n.x,n.y,n.z],[-n.x,-n.y,n.z],[-n.x,-n.y,-n.z],[n.x,-n.y,-n.z],[n.x,n.y,-n.z],[-n.x,n.y,-n.z],[n.x,-n.y,n.z]];for(let n=0;n<r.length;n++)aQ.set(r[n][0],r[n][1],r[n][2]),t.vmult(aQ,aQ),e.vadd(aQ,aQ),i(aQ.x,aQ.y,aQ.z)}/**
   * calculateWorldAABB
   */calculateWorldAABB(e,t,i,n){let r=this.halfExtents;a$[0].set(r.x,r.y,r.z),a$[1].set(-r.x,r.y,r.z),a$[2].set(-r.x,-r.y,r.z),a$[3].set(-r.x,-r.y,-r.z),a$[4].set(r.x,-r.y,-r.z),a$[5].set(r.x,r.y,-r.z),a$[6].set(-r.x,r.y,-r.z),a$[7].set(r.x,-r.y,r.z);let a=a$[0];t.vmult(a,a),e.vadd(a,a),n.copy(a),i.copy(a);for(let r=1;r<8;r++){let a=a$[r];t.vmult(a,a),e.vadd(a,a);let s=a.x,o=a.y,l=a.z;s>n.x&&(n.x=s),o>n.y&&(n.y=o),l>n.z&&(n.z=l),s<i.x&&(i.x=s),o<i.y&&(i.y=o),l<i.z&&(i.z=l)}// Get each axis max
// min.set(Infinity,Infinity,Infinity);
// max.set(-Infinity,-Infinity,-Infinity);
// this.forEachWorldCorner(pos,quat,function(x,y,z){
//     if(x > max.x){
//         max.x = x;
//     }
//     if(y > max.y){
//         max.y = y;
//     }
//     if(z > max.z){
//         max.z = z;
//     }
//     if(x < min.x){
//         min.x = x;
//     }
//     if(y < min.y){
//         min.y = y;
//     }
//     if(z < min.z){
//         min.z = z;
//     }
// });
}}const aQ=new aL,a$=[new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL],a0={/** DYNAMIC */DYNAMIC:1,/** STATIC */STATIC:2,/** KINEMATIC */KINEMATIC:4},a1={/** AWAKE */AWAKE:0,/** SLEEPY */SLEEPY:1,/** SLEEPING */SLEEPING:2};/**
 * BodySleepState
 *//**
 * Base class for all body types.
 * @example
 *     const shape = new CANNON.Sphere(1)
 *     const body = new CANNON.Body({
 *       mass: 1,
 *       shape,
 *     })
 *     world.addBody(body)
 */class a2 extends aF{/**
   * Dispatched after two bodies collide. This event is dispatched on each
   * of the two bodies involved in the collision.
   * @event collide
   * @param body The body that was involved in the collision.
   * @param contact The details of the collision.
   *//**
   * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
   *//**
   * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
   *//**
   * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
   *//**
   * AWAKE
   *//**
   * SLEEPY
   *//**
   * SLEEPING
   *//**
   * Dispatched after a sleeping body has woken up.
   * @event wakeup
   *//**
   * Dispatched after a body has gone in to the sleepy state.
   * @event sleepy
   *//**
   * Dispatched after a body has fallen asleep.
   * @event sleep
   */constructor(e){void 0===e&&(e={}),super(),this.id=a2.idCounter++,this.index=-1,this.world=null,this.vlambda=new aL,this.collisionFilterGroup="number"==typeof e.collisionFilterGroup?e.collisionFilterGroup:1,this.collisionFilterMask="number"==typeof e.collisionFilterMask?e.collisionFilterMask:-1,this.collisionResponse="boolean"!=typeof e.collisionResponse||e.collisionResponse,this.position=new aL,this.previousPosition=new aL,this.interpolatedPosition=new aL,this.initPosition=new aL,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new aL,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new aL,this.force=new aL;let t="number"==typeof e.mass?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping="number"==typeof e.linearDamping?e.linearDamping:.01,this.type=t<=0?a2.STATIC:a2.DYNAMIC,typeof e.type==typeof a2.STATIC&&(this.type=e.type),this.allowSleep=void 0===e.allowSleep||e.allowSleep,this.sleepState=a2.AWAKE,this.sleepSpeedLimit=void 0!==e.sleepSpeedLimit?e.sleepSpeedLimit:.1,this.sleepTimeLimit=void 0!==e.sleepTimeLimit?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new aL,this.quaternion=new aV,this.initQuaternion=new aV,this.previousQuaternion=new aV,this.interpolatedQuaternion=new aV,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new aL,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new aL,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new aL,this.invInertia=new aL,this.invInertiaWorld=new aC,this.invMassSolve=0,this.invInertiaSolve=new aL,this.invInertiaWorldSolve=new aC,this.fixedRotation=void 0!==e.fixedRotation&&e.fixedRotation,this.angularDamping=void 0!==e.angularDamping?e.angularDamping:.01,this.linearFactor=new aL(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new aL(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new aD,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new aL,this.isTrigger=!!e.isTrigger,e.shape&&this.addShape(e.shape),this.updateMassProperties()}/**
   * Wake the body up.
   */wakeUp(){let e=this.sleepState;this.sleepState=a2.AWAKE,this.wakeUpAfterNarrowphase=!1,e===a2.SLEEPING&&this.dispatchEvent(a2.wakeupEvent)}/**
   * Force body sleep
   */sleep(){this.sleepState=a2.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}/**
   * Called every timestep to update internal sleep timer and change sleep state if needed.
   * @param time The world time in seconds
   */sleepTick(e){if(this.allowSleep){let t=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),n=this.sleepSpeedLimit**2;t===a2.AWAKE&&i<n?(this.sleepState=a2.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(a2.sleepyEvent)):t===a2.SLEEPY&&i>n?this.wakeUp():t===a2.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(a2.sleepEvent))}}/**
   * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
   */updateSolveMassProperties(){this.sleepState===a2.SLEEPING||this.type===a2.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}/**
   * Convert a world point to local body frame.
   */pointToLocalFrame(e,t){return void 0===t&&(t=new aL),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}/**
   * Convert a world vector to local body frame.
   */vectorToLocalFrame(e,t){return void 0===t&&(t=new aL),this.quaternion.conjugate().vmult(e,t),t}/**
   * Convert a local body point to world frame.
   */pointToWorldFrame(e,t){return void 0===t&&(t=new aL),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}/**
   * Convert a local body point to world frame.
   */vectorToWorldFrame(e,t){return void 0===t&&(t=new aL),this.quaternion.vmult(e,t),t}/**
   * Add a shape to the body with a local offset and orientation.
   * @return The body object, for chainability.
   */addShape(e,t,i){let n=new aL,r=new aV;return t&&n.copy(t),i&&r.copy(i),this.shapes.push(e),this.shapeOffsets.push(n),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}/**
   * Remove a shape from the body.
   * @return The body object, for chainability.
   */removeShape(e){let t=this.shapes.indexOf(e);return -1===t?console.warn("Shape does not belong to the body"):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null),this}/**
   * Update the bounding radius of the body. Should be done if any of the shapes are changed.
   */updateBoundingRadius(){let e=this.shapes,t=this.shapeOffsets,i=e.length,n=0;for(let r=0;r!==i;r++){let i=e[r];i.updateBoundingSphereRadius();let a=t[r].length(),s=i.boundingSphereRadius;a+s>n&&(n=a+s)}this.boundingRadius=n}/**
   * Updates the .aabb
   */updateAABB(){let e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,n=e.length,r=this.quaternion,a=this.aabb;for(let s=0;s!==n;s++){let n=e[s];// Get shape world position
r.vmult(t[s],a3),a3.vadd(this.position,a3),r.mult(i[s],a4),n.calculateWorldAABB(a3,a4,a5.lowerBound,a5.upperBound),0===s?a.copy(a5):a.extend(a5)}this.aabbNeedsUpdate=!1}/**
   * Update `.inertiaWorld` and `.invInertiaWorld`
   */updateInertiaWorld(e){let t=this.invInertia;(t.x!==t.y||t.y!==t.z||e)&&(a6.setRotationFromQuaternion(this.quaternion),a6.transpose(a7),a6.scale(t,a6),a6.mmult(a7,this.invInertiaWorld))}/**
   * Apply force to a point of the body. This could for example be a point on the Body surface.
   * Applying force this way will add to Body.force and Body.torque.
   * @param force The amount of force to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */applyForce(e,t){// Needed?
void 0===t&&(t=new aL),this.type===a2.DYNAMIC&&(this.sleepState===a2.SLEEPING&&this.wakeUp(),t.cross(e,a8),this.force.vadd(e,this.force),this.torque.vadd(a8,this.torque))}/**
   * Apply force to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */applyLocalForce(e,t){void 0===t&&(t=new aL),this.type===a2.DYNAMIC&&(this.vectorToWorldFrame(e,a9),this.vectorToWorldFrame(t,se),this.applyForce(a9,se))}/**
   * Apply torque to the body.
   * @param torque The amount of torque to add.
   */applyTorque(e){this.type===a2.DYNAMIC&&(this.sleepState===a2.SLEEPING&&this.wakeUp(),// Add rotational force
this.torque.vadd(e,this.torque))}/**
   * Apply impulse to a point of the body. This could for example be a point on the Body surface.
   * An impulse is a force added to a body during a short period of time (impulse = force * time).
   * Impulses will be added to Body.velocity and Body.angularVelocity.
   * @param impulse The amount of impulse to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */applyImpulse(e,t){if(void 0===t&&(t=new aL),this.type!==a2.DYNAMIC)return;this.sleepState===a2.SLEEPING&&this.wakeUp();// Compute point position relative to the body center
let i=t;// Compute produced central impulse velocity
st.copy(e),st.scale(this.invMass,st),this.velocity.vadd(st,this.velocity),i.cross(e,si),/*
     rotVelo.x *= this.invInertia.x;
     rotVelo.y *= this.invInertia.y;
     rotVelo.z *= this.invInertia.z;
     */this.invInertiaWorld.vmult(si,si),this.angularVelocity.vadd(si,this.angularVelocity)}/**
   * Apply locally-defined impulse to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */applyLocalImpulse(e,t){void 0===t&&(t=new aL),this.type===a2.DYNAMIC&&(this.vectorToWorldFrame(e,sn),this.vectorToWorldFrame(t,sr),this.applyImpulse(sn,sr))}/**
   * Should be called whenever you change the body shape or mass.
   */updateMassProperties(){this.invMass=this.mass>0?1/this.mass:0;let e=this.inertia,t=this.fixedRotation;this.updateAABB(),sa.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),aJ.calculateInertia(sa,this.mass,e),this.invInertia.set(e.x>0&&!t?1/e.x:0,e.y>0&&!t?1/e.y:0,e.z>0&&!t?1/e.z:0),this.updateInertiaWorld(!0)}/**
   * Get world velocity of a point in the body.
   * @param worldPoint
   * @param result
   * @return The result vector.
   */getVelocityAtWorldPoint(e,t){let i=new aL;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}/**
   * Move the body forward in time.
   * @param dt Time step
   * @param quatNormalize Set to true to normalize the body quaternion
   * @param quatNormalizeFast If the quaternion should be normalized using "fast" quaternion normalization
   */integrate(e,t,i){if(// Save previous position
this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===a2.DYNAMIC||this.type===a2.KINEMATIC)||this.sleepState===a2.SLEEPING)return;let n=this.velocity,r=this.angularVelocity,a=this.position,s=this.force,o=this.torque,l=this.quaternion,h=this.invMass,c=this.invInertiaWorld,u=this.linearFactor,d=h*e;n.x+=s.x*d*u.x,n.y+=s.y*d*u.y,n.z+=s.z*d*u.z;let p=c.elements,f=this.angularFactor,m=o.x*f.x,g=o.y*f.y,v=o.z*f.z;r.x+=e*(p[0]*m+p[1]*g+p[2]*v),r.y+=e*(p[3]*m+p[4]*g+p[5]*v),r.z+=e*(p[6]*m+p[7]*g+p[8]*v),a.x+=n.x*e,a.y+=n.y*e,a.z+=n.z*e,l.integrate(this.angularVelocity,e,this.angularFactor,l),t&&(i?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}a2.idCounter=0,a2.COLLIDE_EVENT_NAME="collide",a2.DYNAMIC=a0.DYNAMIC,a2.STATIC=a0.STATIC,a2.KINEMATIC=a0.KINEMATIC,a2.AWAKE=a1.AWAKE,a2.SLEEPY=a1.SLEEPY,a2.SLEEPING=a1.SLEEPING,a2.wakeupEvent={type:"wakeup"},a2.sleepyEvent={type:"sleepy"},a2.sleepEvent={type:"sleep"};const a3=new aL,a4=new aV,a5=new aD,a6=new aC,a7=new aC;new aC;const a8=new aL,a9=new aL,se=new aL,st=new aL,si=new aL,sn=new aL,sr=new aL,sa=new aL;/**
 * Base class for broadphase implementations
 * @author schteppe
 */class ss{/**
   * The world to search for collisions in.
   *//**
   * If set to true, the broadphase uses bounding boxes for intersection tests, else it uses bounding spheres.
   *//**
   * Set to true if the objects in the world moved.
   */constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}/**
   * Get the collision pairs from the world
   * @param world The world to search in
   * @param p1 Empty array to be filled with body objects
   * @param p2 Empty array to be filled with body objects
   */collisionPairs(e,t,i){throw Error("collisionPairs not implemented for this BroadPhase class!")}/**
   * Check if a body pair needs to be intersection tested at all.
   */needBroadphaseCollision(e,t){return(e.collisionFilterGroup&t.collisionFilterMask)!=0&&(t.collisionFilterGroup&e.collisionFilterMask)!=0&&((e.type&a2.STATIC)==0&&e.sleepState!==a2.SLEEPING||(t.type&a2.STATIC)==0&&t.sleepState!==a2.SLEEPING)}/**
   * Check if the bounding volumes of two bodies intersect.
   */intersectionTest(e,t,i,n){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,n):this.doBoundingSphereBroadphase(e,t,i,n)}/**
   * Check if the bounding spheres of two bodies are intersecting.
   * @param pairs1 bodyA is appended to this array if intersection
   * @param pairs2 bodyB is appended to this array if intersection
   */doBoundingSphereBroadphase(e,t,i,n){t.position.vsub(e.position,so);let r=(e.boundingRadius+t.boundingRadius)**2,a=so.lengthSquared();a<r&&(i.push(e),n.push(t))}/**
   * Check if the bounding boxes of two bodies are intersecting.
   */doBoundingBoxBroadphase(e,t,i,n){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),n.push(t))}/**
   * Removes duplicate pairs from the pair arrays.
   */makePairsUnique(e,t){let i=e.length;for(let n=0;n!==i;n++)sh[n]=e[n],sc[n]=t[n];e.length=0,t.length=0;for(let e=0;e!==i;e++){let t=sh[e].id,i=sc[e].id,n=t<i?`${t},${i}`:`${i},${t}`;sl[n]=e,sl.keys.push(n)}for(let i=0;i!==sl.keys.length;i++){let i=sl.keys.pop(),n=sl[i];e.push(sh[n]),t.push(sc[n]),delete sl[i]}}/**
   * To be implemented by subcasses
   */setWorld(e){}/**
   * Check if the bounding spheres of two bodies overlap.
   */static boundingSphereCheck(e,t){let i=new aL;// bsc_dist;
e.position.vsub(t.position,i);let n=e.shapes[0],r=t.shapes[0];return Math.pow(n.boundingSphereRadius+r.boundingSphereRadius,2)>i.lengthSquared()}/**
   * Returns all the bodies within the AABB.
   */aabbQuery(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}// Temp objects
const so=new aL;new aL,new aV,new aL;const sl={keys:[]},sh=[],sc=[];new aL,new aL,new aL;/**
 * Naive broadphase implementation, used in lack of better ones.
 *
 * The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 _(which is bad)_
 */class su extends ss{/**
   * @todo Remove useless constructor
   */constructor(){super()}/**
   * Get all the collision pairs in the physics world
   */collisionPairs(e,t,i){let n,r;let a=e.bodies,s=a.length;for(let e=0;e!==s;e++)for(let s=0;s!==e;s++)n=a[e],r=a[s],this.needBroadphaseCollision(n,r)&&this.intersectionTest(n,r,t,i)}/**
   * Returns all the bodies within an AABB.
   * @param result An array to store resulting bodies in.
   */aabbQuery(e,t,i){void 0===i&&(i=[]);for(let n=0;n<e.bodies.length;n++){let r=e.bodies[n];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(t)&&i.push(r)}return i}}/**
 * Storage for Ray casting data
 */class sd{/**
   * rayFromWorld
   *//**
   * rayToWorld
   *//**
   * hitNormalWorld
   *//**
   * hitPointWorld
   *//**
   * hasHit
   *//**
   * shape
   *//**
   * body
   *//**
   * The index of the hit triangle, if the hit shape was a trimesh
   *//**
   * Distance to the hit. Will be set to -1 if there was no hit
   *//**
   * If the ray should stop traversing the bodies
   */constructor(){this.rayFromWorld=new aL,this.rayToWorld=new aL,this.hitNormalWorld=new aL,this.hitPointWorld=new aL,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}/**
   * Reset all result data.
   */reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}/**
   * abort
   */abort(){this.shouldStop=!0}/**
   * Set result data.
   */set(e,t,i,n,r,a,s){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(n),this.shape=r,this.body=a,this.distance=s}}/**
 * RAY_MODES
 */const sp={/** CLOSEST */CLOSEST:1,/** ANY */ANY:2,/** ALL */ALL:4};/**
 * RayMode
 */t=ak.types.SPHERE,i=ak.types.PLANE,n=ak.types.BOX,r=ak.types.CYLINDER,a=ak.types.CONVEXPOLYHEDRON,s=ak.types.HEIGHTFIELD,o=ak.types.TRIMESH;/**
 * A line in 3D space that intersects bodies and return points.
 */class sf{/**
   * from
   *//**
   * to
   *//**
   * direction
   *//**
   * The precision of the ray. Used when checking parallelity etc.
   * @default 0.0001
   *//**
   * Set to `false` if you don't want the Ray to take `collisionResponse` flags into account on bodies and shapes.
   * @default true
   *//**
   * If set to `true`, the ray skips any hits with normal.dot(rayDirection) < 0.
   * @default false
   *//**
   * collisionFilterMask
   * @default -1
   *//**
   * collisionFilterGroup
   * @default -1
   *//**
   * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
   * @default RAY.ANY
   *//**
   * Current result object.
   *//**
   * Will be set to `true` during intersectWorld() if the ray hit anything.
   *//**
   * User-provided result callback. Will be used if mode is Ray.ALL.
   *//**
   * CLOSEST
   *//**
   * ANY
   *//**
   * ALL
   */get[t](){return this._intersectSphere}get[i](){return this._intersectPlane}get[n](){return this._intersectBox}get[r](){return this._intersectConvex}get[a](){return this._intersectConvex}get[s](){return this._intersectHeightfield}get[o](){return this._intersectTrimesh}constructor(e,t){void 0===e&&(e=new aL),void 0===t&&(t=new aL),this.from=e.clone(),this.to=t.clone(),this.direction=new aL,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=sf.ANY,this.result=new sd,this.hasHit=!1,this.callback=e=>{}}/**
   * Do itersection against all bodies in the given World.
   * @return True if the ray hit anything, otherwise false.
   */intersectWorld(e,t){return this.mode=t.mode||sf.ANY,this.result=t.result||new sd,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=void 0!==t.collisionFilterMask?t.collisionFilterMask:-1,this.collisionFilterGroup=void 0!==t.collisionFilterGroup?t.collisionFilterGroup:-1,this.checkCollisionResponse=void 0===t.checkCollisionResponse||t.checkCollisionResponse,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(sm),sg.length=0,e.broadphase.aabbQuery(e,sm,sg),this.intersectBodies(sg),this.hasHit}/**
   * Shoot a ray at a body, get back information about the hit.
   * @deprecated @param result set the result property of the Ray instead.
   */intersectBody(e,t){t&&(this.result=t,this.updateDirection());let i=this.checkCollisionResponse;if((!i||e.collisionResponse)&&(this.collisionFilterGroup&e.collisionFilterMask)!=0&&(e.collisionFilterGroup&this.collisionFilterMask)!=0)for(let t=0,n=e.shapes.length;t<n;t++){let n=e.shapes[t];if((!i||n.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[t],s_),e.quaternion.vmult(e.shapeOffsets[t],sx),sx.vadd(e.position,sx),this.intersectShape(n,s_,sx,e),this.result.shouldStop))break;// Skip
}}/**
   * Shoot a ray at an array bodies, get back information about the hit.
   * @param bodies An array of Body objects.
   * @deprecated @param result set the result property of the Ray instead.
   *
   */intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let t=0,i=e.length;!this.result.shouldStop&&t<i;t++)this.intersectBody(e[t])}/**
   * Updates the direction vector.
   */updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,i,n){let r=this.from,a=function(e,t,i){// v0 is vector from from to position
i.vsub(e,sH);let n=sH.dot(t);// intersect = direction*dot + from
t.scale(n,sW),sW.vadd(e,sW);let r=i.distanceTo(sW);return r}(r,this.direction,i);// Checking boundingSphere
if(a>e.boundingSphereRadius)return;let s=this[e.type];s&&s.call(this,e,t,i,n,e)}_intersectBox(e,t,i,n,r){return this._intersectConvex(e.convexPolyhedronRepresentation,t,i,n,r)}_intersectPlane(e,t,i,n,r){let a=this.from,s=this.to,o=this.direction,l=new aL(0,0,1);t.vmult(l,l);let h=new aL;a.vsub(i,h);let c=h.dot(l);s.vsub(i,h);let u=h.dot(l);if(c*u>0||a.distanceTo(s)<c)return;let d=l.dot(o);if(Math.abs(d)<this.precision)return;let p=new aL,f=new aL,m=new aL;a.vsub(i,p);let g=-l.dot(p)/d;o.scale(g,f),a.vadd(f,m),this.reportIntersection(l,m,r,n,-1)}/**
   * Get the world AABB of the ray.
   */getAABB(e){let{lowerBound:t,upperBound:i}=e,n=this.to,r=this.from;t.x=Math.min(n.x,r.x),t.y=Math.min(n.y,r.y),t.z=Math.min(n.z,r.z),i.x=Math.max(n.x,r.x),i.y=Math.max(n.y,r.y),i.z=Math.max(n.z,r.z)}_intersectHeightfield(e,t,i,n,r){let a,s,o,l;e.data,e.elementSize,sA.from.copy(this.from),sA.to.copy(this.to),aG.pointToLocalFrame(i,t,sA.from,sA.from),aG.pointToLocalFrame(i,t,sA.to,sA.to),sA.updateDirection(),a=s=0,o=l=e.data.length-1;let h=new aD;sA.getAABB(h),e.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,sR,!0),a=Math.max(a,sR[0]),s=Math.max(s,sR[1]),e.getIndexOfPosition(h.upperBound.x,h.upperBound.y,sR,!0),o=Math.min(o,sR[0]+1),l=Math.min(l,sR[1]+1);for(let c=a;c<o;c++)for(let a=s;a<l;a++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(c,a,h),h.overlapsRay(sA)){if(// Lower triangle
e.getConvexTrianglePillar(c,a,!1),aG.pointToWorldFrame(i,t,e.pillarOffset,sT),this._intersectConvex(e.pillarConvex,t,sT,n,r,sE),this.result.shouldStop)return;// Upper triangle
e.getConvexTrianglePillar(c,a,!0),aG.pointToWorldFrame(i,t,e.pillarOffset,sT),this._intersectConvex(e.pillarConvex,t,sT,n,r,sE)}}}_intersectSphere(e,t,i,n,r){let a=this.from,s=this.to,o=e.radius,l=(s.x-a.x)**2+(s.y-a.y)**2+(s.z-a.z)**2,h=2*((s.x-a.x)*(a.x-i.x)+(s.y-a.y)*(a.y-i.y)+(s.z-a.z)*(a.z-i.z)),c=(a.x-i.x)**2+(a.y-i.y)**2+(a.z-i.z)**2-o**2,u=h**2-4*l*c;if(!(u<0)){if(0===u)// single intersection point
a.lerp(s,u,sC),sC.vsub(i,sP),sP.normalize(),this.reportIntersection(sP,sC,r,n,-1);else{let e=(-h-Math.sqrt(u))/(2*l),t=(-h+Math.sqrt(u))/(2*l);if(e>=0&&e<=1&&(a.lerp(s,e,sC),sC.vsub(i,sP),sP.normalize(),this.reportIntersection(sP,sC,r,n,-1)),this.result.shouldStop)return;t>=0&&t<=1&&(a.lerp(s,t,sC),sC.vsub(i,sP),sP.normalize(),this.reportIntersection(sP,sC,r,n,-1))}}}_intersectConvex(e,t,i,n,r,a){let s=a&&a.faceList||null,o=e.faces,l=e.vertices,h=e.faceNormals,c=this.direction,u=this.from,d=this.to,p=u.distanceTo(d),f=s?s.length:o.length,m=this.result;// Checking faces
for(let e=0;!m.shouldStop&&e<f;e++){let a=s?s[e]:e,d=o[a],f=h[a];// note: this works regardless of the direction of the face normal
// Get plane point in world coordinates...
sN.copy(l[d[0]]),t.vmult(sN,sN),sN.vadd(i,sN),sN.vsub(u,sN),t.vmult(f,sL);let g=c.dot(sL);// Bail out if ray and plane are parallel
if(Math.abs(g)<this.precision)continue;// calc distance to plane
let v=sL.dot(sN)/g;// if negative distance, then plane is behind ray
if(!(v<0)){// if (dot < 0) {
// Intersection point is from + direction * scalar
c.scale(v,sw),sw.vadd(u,sw),sb.copy(l[d[0]]),t.vmult(sb,sb),i.vadd(sb,sb);for(let e=1;!m.shouldStop&&e<d.length-1;e++){// Transform 3 vertices to world coords
sM.copy(l[d[e]]),sS.copy(l[d[e+1]]),t.vmult(sM,sM),t.vmult(sS,sS),i.vadd(sM,sM),i.vadd(sS,sS);let s=sw.distanceTo(u);(sf.pointInTriangle(sw,sb,sM,sS)||sf.pointInTriangle(sw,sM,sb,sS))&&!(s>p)&&this.reportIntersection(sL,sw,r,n,a)}// }
}}}/**
   * @todo Optimize by transforming the world to local space first.
   * @todo Use Octree lookup
   */_intersectTrimesh(e,t,i,n,r,a){let s=e.indices;e.vertices;let o=this.from,l=this.to,h=this.direction;sV.position.copy(i),sV.quaternion.copy(t),aG.vectorToLocalFrame(i,t,h,sU),aG.pointToLocalFrame(i,t,o,sD),aG.pointToLocalFrame(i,t,l,sO),sO.x*=e.scale.x,sO.y*=e.scale.y,sO.z*=e.scale.z,sD.x*=e.scale.x,sD.y*=e.scale.y,sD.z*=e.scale.z,sO.vsub(sD,sU),sU.normalize();let c=sD.distanceSquared(sO);e.tree.rayQuery(this,sV,sF);for(let a=0,o=sF.length;!this.result.shouldStop&&a!==o;a++){let o=sF[a];e.getNormal(o,sI),// note: this works regardless of the direction of the face normal
// Get plane point in world coordinates...
e.getVertex(s[3*o],sb),sb.vsub(sD,sN);let l=sU.dot(sI),h=sI.dot(sN)/l;// Bail out if ray and plane are parallel
if(h<0)continue;// Intersection point is from + direction * scalar
sU.scale(h,sw),sw.vadd(sD,sw),e.getVertex(s[3*o+1],sM),e.getVertex(s[3*o+2],sS);let u=sw.distanceSquared(sD);(sf.pointInTriangle(sw,sM,sb,sS)||sf.pointInTriangle(sw,sb,sM,sS))&&!(u>c)&&(// transform intersectpoint and normal to world
aG.vectorToWorldFrame(t,sI,sz),aG.pointToWorldFrame(i,t,sw,sB),this.reportIntersection(sz,sB,r,n,o))}sF.length=0}/**
   * @return True if the intersections should continue
   */reportIntersection(e,t,i,n,r){let a=this.from,s=this.to,o=a.distanceTo(t),l=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(l.hitFaceIndex=void 0!==r?r:-1,this.mode){case sf.ALL:this.hasHit=!0,l.set(a,s,e,t,i,n,o),l.hasHit=!0,this.callback(l);break;case sf.CLOSEST:// Store if closer than current closest
(o<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(a,s,e,t,i,n,o));break;case sf.ANY:// Report and stop.
this.hasHit=!0,l.hasHit=!0,l.set(a,s,e,t,i,n,o),l.shouldStop=!0}}/**
   * As per "Barycentric Technique" as named
   * {@link https://www.blackpawn.com/texts/pointinpoly/default.html here} but without the division
   */static pointInTriangle(e,t,i,n){let r,a;n.vsub(t,sH),i.vsub(t,sv),e.vsub(t,sy);let s=sH.dot(sH),o=sH.dot(sv),l=sH.dot(sy),h=sv.dot(sv),c=sv.dot(sy);return(r=h*l-o*c)>=0&&(a=s*c-o*l)>=0&&r+a<s*h-o*o}}sf.CLOSEST=sp.CLOSEST,sf.ANY=sp.ANY,sf.ALL=sp.ALL;const sm=new aD,sg=[],sv=new aL,sy=new aL,sx=new aL,s_=new aV,sw=new aL,sb=new aL,sM=new aL,sS=new aL;new aL,new sd;const sE={faceList:[0]},sT=new aL,sA=new sf,sR=[],sC=new aL,sP=new aL,sL=new aL;new aL,new aL;const sN=new aL,sI=new aL,sU=new aL,sD=new aL,sO=new aL,sz=new aL,sB=new aL;new aD;const sF=[],sV=new aG,sH=new aL,sW=new aL;class sk{/**
   * Extend an options object with default values.
   * @param options The options object. May be falsy: in this case, a new object is created and returned.
   * @param defaults An object containing default values.
   * @return The modified options object.
   */static defaults(e,t){for(let i in void 0===e&&(e={}),t)i in e||(e[i]=t[i]);return e}}/**
 * Constraint base class
 */class sG{/**
   * Equations to be solved in this constraint.
   *//**
   * Body A.
   *//**
   * Body B.
   *//**
   * Set to false if you don't want the bodies to collide when they are connected.
   */constructor(e,t,i){void 0===i&&(i={}),i=sk.defaults(i,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=e,this.bodyB=t,this.id=sG.idCounter++,this.collideConnected=i.collideConnected,i.wakeUpBodies&&(e&&e.wakeUp(),t&&t.wakeUp())}/**
   * Update all the equations with data.
   */update(){throw Error("method update() not implmemented in this Constraint subclass!")}/**
   * Enables all equations in the constraint.
   */enable(){let e=this.equations;for(let t=0;t<e.length;t++)e[t].enabled=!0}/**
   * Disables all equations in the constraint.
   */disable(){let e=this.equations;for(let t=0;t<e.length;t++)e[t].enabled=!1}}sG.idCounter=0;/**
 * An element containing 6 entries, 3 spatial and 3 rotational degrees of freedom.
 */class sq{/**
   * spatial
   *//**
   * rotational
   */constructor(){this.spatial=new aL,this.rotational=new aL}/**
   * Multiply with other JacobianElement
   */multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}/**
   * Multiply with two vectors
   */multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}/**
 * Equation base class.
 *
 * `a`, `b` and `eps` are {@link https://www8.cs.umu.se/kurser/5DV058/VT15/lectures/SPOOKlabnotes.pdf SPOOK} parameters that default to `0.0`. See {@link https://github.com/schteppe/cannon.js/issues/238#issuecomment-147172327 this exchange} for more details on Cannon's physics implementation.
 */class sj{/**
   * Minimum (read: negative max) force to be applied by the constraint.
   *//**
   * Maximum (read: positive max) force to be applied by the constraint.
   *//**
   * SPOOK parameter
   *//**
   * SPOOK parameter
   *//**
   * SPOOK parameter
   *//**
   * A number, proportional to the force added to the bodies.
   */constructor(e,t,i,n){void 0===i&&(i=-1e6),void 0===n&&(n=1e6),this.id=sj.idCounter++,this.minForce=i,this.maxForce=n,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new sq,this.jacobianElementB=new sq,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}/**
   * Recalculates a, b, and eps.
   *
   * The Equation constructor sets typical SPOOK parameters as such:
   * * `stiffness` = 1e7
   * * `relaxation` = 4
   * * `timeStep`= 1 / 60, _note the hardcoded refresh rate._
   */setSpookParams(e,t,i){this.a=4/(i*(1+4*t)),this.b=4*t/(1+4*t),this.eps=4/(i*i*e*(1+4*t))}/**
   * Computes the right hand side of the SPOOK equation
   */computeB(e,t,i){let n=this.computeGW(),r=this.computeGq(),a=this.computeGiMf();return-r*e-n*t-a*i}/**
   * Computes G*q, where q are the generalized body coordinates
   */computeGq(){let e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.position,a=n.position;return e.spatial.dot(r)+t.spatial.dot(a)}/**
   * Computes G*W, where W are the body velocities
   */computeGW(){let e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.velocity,a=n.velocity,s=i.angularVelocity,o=n.angularVelocity;return e.multiplyVectors(r,s)+t.multiplyVectors(a,o)}/**
   * Computes G*Wlambda, where W are the body velocities
   */computeGWlambda(){let e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.vlambda,a=n.vlambda,s=i.wlambda,o=n.wlambda;return e.multiplyVectors(r,s)+t.multiplyVectors(a,o)}/**
   * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
   */computeGiMf(){let e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.force,a=i.torque,s=n.force,o=n.torque,l=i.invMassSolve,h=n.invMassSolve;return r.scale(l,sX),s.scale(h,sY),i.invInertiaWorldSolve.vmult(a,sZ),n.invInertiaWorldSolve.vmult(o,sK),e.multiplyVectors(sX,sZ)+t.multiplyVectors(sY,sK)}/**
   * Computes G*inv(M)*G'
   */computeGiMGt(){let e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.invMassSolve,a=n.invMassSolve,s=i.invInertiaWorldSolve,o=n.invInertiaWorldSolve,l=r+a;return s.vmult(e.rotational,sJ),l+=sJ.dot(e.rotational),o.vmult(t.rotational,sJ),l+=sJ.dot(t.rotational)}/**
   * Add constraint velocity to the bodies.
   */addToWlambda(e){let t=this.jacobianElementA,i=this.jacobianElementB,n=this.bi,r=this.bj;// v_lambda += inv(M) * delta_lamba * G
n.vlambda.addScaledVector(n.invMassSolve*e,t.spatial,n.vlambda),r.vlambda.addScaledVector(r.invMassSolve*e,i.spatial,r.vlambda),n.invInertiaWorldSolve.vmult(t.rotational,sQ),n.wlambda.addScaledVector(e,sQ,n.wlambda),r.invInertiaWorldSolve.vmult(i.rotational,sQ),r.wlambda.addScaledVector(e,sQ,r.wlambda)}/**
   * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
   */computeC(){return this.computeGiMGt()+this.eps}}sj.idCounter=0;const sX=new aL,sY=new aL,sZ=new aL,sK=new aL,sJ=new aL,sQ=new aL;/**
 * Contact/non-penetration constraint equation
 */class s$ extends sj{/**
   * "bounciness": u1 = -e*u0
   *//**
   * World-oriented vector that goes from the center of bi to the contact point.
   *//**
   * World-oriented vector that starts in body j position and goes to the contact point.
   *//**
   * Contact normal, pointing out of body i.
   */constructor(e,t,i){void 0===i&&(i=1e6),super(e,t,0,i),this.restitution=0,this.ri=new aL,this.rj=new aL,this.ni=new aL}computeB(e){let t=this.a,i=this.b,n=this.bi,r=this.bj,a=this.ri,s=this.rj,o=n.velocity,l=n.angularVelocity;n.force,n.torque;let h=r.velocity,c=r.angularVelocity;r.force,r.torque;let u=this.jacobianElementA,d=this.jacobianElementB,p=this.ni;a.cross(p,s0),s.cross(p,s1),// G = [ -ni  -rixn  ni  rjxn ]
p.negate(u.spatial),s0.negate(u.rotational),d.spatial.copy(p),d.rotational.copy(s1),s2.copy(r.position),s2.vadd(s,s2),s2.vsub(n.position,s2),s2.vsub(a,s2);let f=p.dot(s2),m=this.restitution+1,g=m*h.dot(p)-m*o.dot(p)+c.dot(s1)-l.dot(s0),v=this.computeGiMf();// Compute iteration
return-f*t-g*i-e*v}/**
   * Get the current relative velocity in the contact point.
   */getImpactVelocityAlongNormal(){return this.bi.position.vadd(this.ri,s5),this.bj.position.vadd(this.rj,s6),this.bi.getVelocityAtWorldPoint(s5,s3),this.bj.getVelocityAtWorldPoint(s6,s4),s3.vsub(s4,s7),this.ni.dot(s7)}}const s0=new aL,s1=new aL,s2=new aL,s3=new aL,s4=new aL,s5=new aL,s6=new aL,s7=new aL;// Temp vectors
/**
 * Connects two bodies at given offset points.
 * @example
 *     const bodyA = new Body({ mass: 1 })
 *     const bodyB = new Body({ mass: 1 })
 *     bodyA.position.set(-1, 0, 0)
 *     bodyB.position.set(1, 0, 0)
 *     bodyA.addShape(shapeA)
 *     bodyB.addShape(shapeB)
 *     world.addBody(bodyA)
 *     world.addBody(bodyB)
 *     const localPivotA = new Vec3(1, 0, 0)
 *     const localPivotB = new Vec3(-1, 0, 0)
 *     const constraint = new PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB)
 *     world.addConstraint(constraint)
 */class s8 extends sG{/**
   * Pivot, defined locally in bodyA.
   *//**
   * Pivot, defined locally in bodyB.
   *//**
   * @param pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
   * @param bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
   * @param pivotB The point relative to the center of mass of bodyB which bodyB is constrained to.
   * @param maxForce The maximum force that should be applied to constrain the bodies.
   */constructor(e,t,i,n,r){void 0===t&&(t=new aL),void 0===n&&(n=new aL),void 0===r&&(r=1e6),super(e,i),this.pivotA=t.clone(),this.pivotB=n.clone();let a=this.equationX=new s$(e,i),s=this.equationY=new s$(e,i),o=this.equationZ=new s$(e,i);this.equations.push(a,s,o),a.minForce=s.minForce=o.minForce=-r,a.maxForce=s.maxForce=o.maxForce=r,a.ni.set(1,0,0),s.ni.set(0,1,0),o.ni.set(0,0,1)}update(){let e=this.bodyA,t=this.bodyB,i=this.equationX,n=this.equationY,r=this.equationZ;e.quaternion.vmult(this.pivotA,i.ri),t.quaternion.vmult(this.pivotB,i.rj),n.ri.copy(i.ri),n.rj.copy(i.rj),r.ri.copy(i.ri),r.rj.copy(i.rj)}}new aL,new aL;/**
 * Rotational constraint. Works to keep the local vectors orthogonal to each other in world space.
 */class s9 extends sj{/**
   * World oriented rotational axis.
   *//**
   * World oriented rotational axis.
   *//**
   * maxAngle
   */constructor(e,t,i){void 0===i&&(i={});let n=void 0!==i.maxForce?i.maxForce:1e6;super(e,t,-n,n),this.axisA=i.axisA?i.axisA.clone():new aL(1,0,0),this.axisB=i.axisB?i.axisB.clone():new aL(0,1,0),this.maxAngle=Math.PI/2}computeB(e){let t=this.a,i=this.b,n=this.axisA,r=this.axisB,a=this.jacobianElementA,s=this.jacobianElementB;n.cross(r,oe),r.cross(n,ot),// gdot = (nj x ni) * wi + (ni x nj) * wj
// G = [0 njxni 0 nixnj]
// W = [vi wi vj wj]
a.rotational.copy(ot),s.rotational.copy(oe);let o=Math.cos(this.maxAngle)-n.dot(r),l=this.computeGW(),h=this.computeGiMf();return-o*t-l*i-e*h}}const oe=new aL,ot=new aL;new aL,new aL,new aL,new aL;/**
 * Rotational motor constraint. Tries to keep the relative angular velocity of the bodies to a given value.
 */class oi extends sj{/**
   * World oriented rotational axis.
   *//**
   * World oriented rotational axis.
   *//**
   * Motor velocity.
   */constructor(e,t,i){void 0===i&&(i=1e6),super(e,t,-i,i),this.axisA=new aL,this.axisB=new aL,this.targetVelocity=0}computeB(e){this.a;let t=this.b;this.bi,this.bj;let i=this.axisA,n=this.axisB,r=this.jacobianElementA,a=this.jacobianElementB;// gdot = axisA * wi - axisB * wj
// gdot = G * W = G * [vi wi vj wj]
// =>
// G = [0 axisA 0 -axisB]
r.rotational.copy(i),n.negate(a.rotational);let s=this.computeGW()-this.targetVelocity,o=this.computeGiMf();return-s*t-e*o}}/**
 * Hinge constraint. Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
 */class on extends s8{/**
   * Rotation axis, defined locally in bodyA.
   *//**
   * Rotation axis, defined locally in bodyB.
   */constructor(e,t,i){void 0===i&&(i={});let n=void 0!==i.maxForce?i.maxForce:1e6,r=i.pivotA?i.pivotA.clone():new aL,a=i.pivotB?i.pivotB.clone():new aL;super(e,r,t,a,n);let s=this.axisA=i.axisA?i.axisA.clone():new aL(1,0,0);s.normalize();let o=this.axisB=i.axisB?i.axisB.clone():new aL(1,0,0);o.normalize(),this.collideConnected=!!i.collideConnected;let l=this.rotationalEquation1=new s9(e,t,i),h=this.rotationalEquation2=new s9(e,t,i),c=this.motorEquation=new oi(e,t,n);c.enabled=!1,// Equations to be fed to the solver
this.equations.push(l,h,c)}/**
   * enableMotor
   */enableMotor(){this.motorEquation.enabled=!0}/**
   * disableMotor
   */disableMotor(){this.motorEquation.enabled=!1}/**
   * setMotorSpeed
   */setMotorSpeed(e){this.motorEquation.targetVelocity=e}/**
   * setMotorMaxForce
   */setMotorMaxForce(e){this.motorEquation.maxForce=e,this.motorEquation.minForce=-e}/**
   * update
   */update(){let e=this.bodyA,t=this.bodyB,i=this.motorEquation,n=this.rotationalEquation1,r=this.rotationalEquation2,a=this.axisA,s=this.axisB;super.update(),e.quaternion.vmult(a,or),t.quaternion.vmult(s,oa),or.tangents(n.axisA,r.axisA),n.axisB.copy(oa),r.axisB.copy(oa),this.motorEquation.enabled&&(e.quaternion.vmult(this.axisA,i.axisA),t.quaternion.vmult(this.axisB,i.axisB))}}const or=new aL,oa=new aL;/**
 * Constrains the slipping in a contact along a tangent
 */class os extends sj{// Tangent
/**
   * @param slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
   */constructor(e,t,i){super(e,t,-i,i),this.ri=new aL,this.rj=new aL,this.t=new aL}computeB(e){this.a;let t=this.b;this.bi,this.bj;let i=this.ri,n=this.rj,r=this.t;i.cross(r,oo),n.cross(r,ol);// And remember, this is a pure velocity constraint, g is always zero!
let a=this.jacobianElementA,s=this.jacobianElementB;r.negate(a.spatial),oo.negate(a.rotational),s.spatial.copy(r),s.rotational.copy(ol);let o=this.computeGW(),l=this.computeGiMf();return-o*t-e*l}}const oo=new aL,ol=new aL;/**
 * Defines what happens when two materials meet.
 * @todo Refactor materials to materialA and materialB
 */class oh{/**
   * Identifier of this material.
   *//**
   * Participating materials.
   *//**
   * Friction coefficient.
   * @default 0.3
   *//**
   * Restitution coefficient.
   * @default 0.3
   *//**
   * Stiffness of the produced contact equations.
   * @default 1e7
   *//**
   * Relaxation time of the produced contact equations.
   * @default 3
   *//**
   * Stiffness of the produced friction equations.
   * @default 1e7
   *//**
   * Relaxation time of the produced friction equations
   * @default 3
   */constructor(e,t,i){i=sk.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=oh.idCounter++,this.materials=[e,t],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}oh.idCounter=0;/**
 * Defines a physics material.
 */class oc{/**
   * Material name.
   * If options is a string, name will be set to that string.
   * @todo Deprecate this
   *//** Material id. *//**
   * Friction for this material.
   * If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   *//**
   * Restitution for this material.
   * If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   */constructor(e){void 0===e&&(e={});let t="";// Backwards compatibility fix
"string"==typeof e&&(//console.warn(`Passing a string to MaterialOptions is deprecated, and has no effect`)
t=e,e={}),this.name=t,this.id=oc.idCounter++,this.friction=void 0!==e.friction?e.friction:-1,this.restitution=void 0!==e.restitution?e.restitution:-1}}oc.idCounter=0,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new sf,new aL,new aL,new aL,new aL(1,0,0),new aL(0,1,0),new aL(0,0,1),new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL;/**
 * Spherical shape
 * @example
 *     const radius = 1
 *     const sphereShape = new CANNON.Sphere(radius)
 *     const sphereBody = new CANNON.Body({ mass: 1, shape: sphereShape })
 *     world.addBody(sphereBody)
 */class ou extends ak{/**
   * The radius of the sphere.
   *//**
   *
   * @param radius The radius of the sphere, a non-negative number.
   */constructor(e){if(super({type:ak.types.SPHERE}),this.radius=void 0!==e?e:1,this.radius<0)throw Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}/** calculateLocalInertia */calculateLocalInertia(e,t){void 0===t&&(t=new aL);let i=2*e*this.radius*this.radius/5;return t.x=i,t.y=i,t.z=i,t}/** volume */volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(e,t,i,n){let r=this.radius,a=["x","y","z"];for(let t=0;t<a.length;t++){let s=a[t];i[s]=e[s]-r,n[s]=e[s]+r}}}const od=new aL,op=new aL;new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aL;const of=[],om=new aL,og=new aL,ov=new aL,oy=new aL,ox=new aL,o_=new aL,ow=new aL,ob=new aL,oM=new aL;new aL,new aD,new aL,new aD,new aL,new aL,new aL,new aL,new aL,new aL,new aL,new aD,new aL,new aG,new aD;/**
 * Constraint equation solver base class.
 */class oS{/**
   * All equations to be solved
   *//**
   * @todo remove useless constructor
   */constructor(){this.equations=[]}/**
   * Should be implemented in subclasses!
   * @todo use abstract
   * @return number of iterations performed
   */solve(e,t){return 0}/**
   * Add an equation
   */addEquation(e){!e.enabled||e.bi.isTrigger||e.bj.isTrigger||this.equations.push(e)}/**
   * Remove an equation
   */removeEquation(e){let t=this.equations,i=t.indexOf(e);-1!==i&&t.splice(i,1)}/**
   * Add all equations
   */removeAllEquations(){this.equations.length=0}}/**
 * Constraint equation Gauss-Seidel solver.
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 */class oE extends oS{/**
   * The number of solver iterations determines quality of the constraints in the world.
   * The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
   *//**
   * When tolerance is reached, the system is assumed to be converged.
   *//**
   * @todo remove useless constructor
   */constructor(){super(),this.iterations=10,this.tolerance=1e-7}/**
   * Solve
   * @return number of iterations performed
   */solve(e,t){let i,n,r,a,s,o=0,l=this.iterations,h=this.tolerance*this.tolerance,c=this.equations,u=c.length,d=t.bodies,p=d.length;if(0!==u)for(let e=0;e!==p;e++)d[e].updateSolveMassProperties();oA.length=u,oR.length=u,oT.length=u;for(let t=0;t!==u;t++){let i=c[t];oT[t]=0,oR[t]=i.computeB(e),oA[t]=1/i.computeC()}if(0!==u){// Reset vlambda
for(let e=0;e!==p;e++){let t=d[e],i=t.vlambda,n=t.wlambda;i.set(0,0,0),n.set(0,0,0)}// Iterate over equations
for(o=0;o!==l;o++){// Accumulate the total error for each iteration.
a=0;for(let e=0;e!==u;e++){let t=c[e];// Compute iteration
i=oR[e],n=oA[e],s=oT[e],r=n*(i-t.computeGWlambda()-t.eps*s),s+r<t.minForce?r=t.minForce-s:s+r>t.maxForce&&(r=t.maxForce-s),oT[e]+=r,a+=r>0?r:-r,t.addToWlambda(r)}// If the total error is small enough - stop iterate
if(a*a<h)break}// Add result to velocity
for(let e=0;e!==p;e++){let t=d[e],i=t.velocity,n=t.angularVelocity;t.vlambda.vmul(t.linearFactor,t.vlambda),i.vadd(t.vlambda,i),t.wlambda.vmul(t.angularFactor,t.wlambda),n.vadd(t.wlambda,n)}// Set the `.multiplier` property of each equation
let t=c.length,f=1/e;for(;t--;)c[t].multiplier=oT[t]*f}return o}}// Just temporary number holders that we want to reuse each iteration.
const oT=[],oA=[],oR=[];a2.STATIC;/**
 * For pooling objects that can be reused.
 */class oC{constructor(){this.objects=[],this.type=Object}/**
   * Release an object after use
   */release(){let e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}/**
   * Get an object
   */get(){return 0===this.objects.length?this.constructObject():this.objects.pop()}/**
   * Construct an object. Should be implemented in each subclass.
   */constructObject(){throw Error("constructObject() not implemented in this Pool subclass yet!")}/**
   * @return Self, for chaining
   */resize(e){let t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}/**
 * Vec3Pool
 */class oP extends oC{constructor(){super(...arguments),this.type=aL}/**
   * Construct a vector
   */constructObject(){return new aL}}// Naming rule: based of the order in SHAPE_TYPES,
// the first part of the method is formed by the
// shape type that comes before, in the second part
// there is the shape type that comes after in the SHAPE_TYPES list
const oL={sphereSphere:ak.types.SPHERE,spherePlane:ak.types.SPHERE|ak.types.PLANE,boxBox:ak.types.BOX|ak.types.BOX,sphereBox:ak.types.SPHERE|ak.types.BOX,planeBox:ak.types.PLANE|ak.types.BOX,convexConvex:ak.types.CONVEXPOLYHEDRON,sphereConvex:ak.types.SPHERE|ak.types.CONVEXPOLYHEDRON,planeConvex:ak.types.PLANE|ak.types.CONVEXPOLYHEDRON,boxConvex:ak.types.BOX|ak.types.CONVEXPOLYHEDRON,sphereHeightfield:ak.types.SPHERE|ak.types.HEIGHTFIELD,boxHeightfield:ak.types.BOX|ak.types.HEIGHTFIELD,convexHeightfield:ak.types.CONVEXPOLYHEDRON|ak.types.HEIGHTFIELD,sphereParticle:ak.types.PARTICLE|ak.types.SPHERE,planeParticle:ak.types.PLANE|ak.types.PARTICLE,boxParticle:ak.types.BOX|ak.types.PARTICLE,convexParticle:ak.types.PARTICLE|ak.types.CONVEXPOLYHEDRON,cylinderCylinder:ak.types.CYLINDER,sphereCylinder:ak.types.SPHERE|ak.types.CYLINDER,planeCylinder:ak.types.PLANE|ak.types.CYLINDER,boxCylinder:ak.types.BOX|ak.types.CYLINDER,convexCylinder:ak.types.CONVEXPOLYHEDRON|ak.types.CYLINDER,heightfieldCylinder:ak.types.HEIGHTFIELD|ak.types.CYLINDER,particleCylinder:ak.types.PARTICLE|ak.types.CYLINDER,sphereTrimesh:ak.types.SPHERE|ak.types.TRIMESH,planeTrimesh:ak.types.PLANE|ak.types.TRIMESH};/**
 * Helper class for the World. Generates ContactEquations.
 * @todo Sphere-ConvexPolyhedron contacts
 * @todo Contact reduction
 * @todo should move methods to prototype
 */class oN{/**
   * Internal storage of pooled contact points.
   *//**
   * Pooled vectors.
   */get[oL.sphereSphere](){return this.sphereSphere}get[oL.spherePlane](){return this.spherePlane}get[oL.boxBox](){return this.boxBox}get[oL.sphereBox](){return this.sphereBox}get[oL.planeBox](){return this.planeBox}get[oL.convexConvex](){return this.convexConvex}get[oL.sphereConvex](){return this.sphereConvex}get[oL.planeConvex](){return this.planeConvex}get[oL.boxConvex](){return this.boxConvex}get[oL.sphereHeightfield](){return this.sphereHeightfield}get[oL.boxHeightfield](){return this.boxHeightfield}get[oL.convexHeightfield](){return this.convexHeightfield}get[oL.sphereParticle](){return this.sphereParticle}get[oL.planeParticle](){return this.planeParticle}get[oL.boxParticle](){return this.boxParticle}get[oL.convexParticle](){return this.convexParticle}get[oL.cylinderCylinder](){return this.convexConvex}get[oL.sphereCylinder](){return this.sphereConvex}get[oL.planeCylinder](){return this.planeConvex}get[oL.boxCylinder](){return this.boxConvex}get[oL.convexCylinder](){return this.convexConvex}get[oL.heightfieldCylinder](){return this.heightfieldCylinder}get[oL.particleCylinder](){return this.particleCylinder}get[oL.sphereTrimesh](){return this.sphereTrimesh}get[oL.planeTrimesh](){return this.planeTrimesh}//   return this.convexTrimesh
// }
constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new oP,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}/**
   * Make a contact object, by using the internal pool or creating a new one.
   */createContactEquation(e,t,i,n,r,a){let s;this.contactPointPool.length?((s=this.contactPointPool.pop()).bi=e,s.bj=t):s=new s$(e,t),s.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&n.collisionResponse;let o=this.currentContactMaterial;s.restitution=o.restitution,s.setSpookParams(o.contactEquationStiffness,o.contactEquationRelaxation,this.world.dt);let l=i.material||e.material,h=n.material||t.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(s.restitution=l.restitution*h.restitution),s.si=r||i,s.sj=a||n,s}createFrictionEquationsFromContact(e,t){let i=e.bi,n=e.bj,r=e.si,a=e.sj,s=this.world,o=this.currentContactMaterial,l=o.friction,h=r.material||i.material,c=a.material||n.material;if(h&&c&&h.friction>=0&&c.friction>=0&&(l=h.friction*c.friction),l>0){// Create 2 tangent equations
// Users may provide a force different from global gravity to use when computing contact friction.
let r=l*(s.frictionGravity||s.gravity).length(),a=i.invMass+n.invMass;a>0&&(a=1/a);let h=this.frictionEquationPool,c=h.length?h.pop():new os(i,n,r*a),u=h.length?h.pop():new os(i,n,r*a);return c.bi=u.bi=i,c.bj=u.bj=n,c.minForce=u.minForce=-r*a,c.maxForce=u.maxForce=r*a,c.ri.copy(e.ri),c.rj.copy(e.rj),u.ri.copy(e.ri),u.rj.copy(e.rj),e.ni.tangents(c.t,u.t),c.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,s.dt),u.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,s.dt),c.enabled=u.enabled=e.enabled,t.push(c,u),!0}return!1}/**
   * Take the average N latest contact point on the plane.
   */createFrictionFromAverage(e){// The last contactEquation
let t=this.result[this.result.length-1];// Create the result: two "average" friction equations
if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||1===e)return;let i=this.frictionResult[this.frictionResult.length-2],n=this.frictionResult[this.frictionResult.length-1];oI.setZero(),oU.setZero(),oD.setZero();let r=t.bi;t.bj;for(let i=0;i!==e;i++)(t=this.result[this.result.length-1-i]).bi!==r?(oI.vadd(t.ni,oI),oU.vadd(t.ri,oU),oD.vadd(t.rj,oD)):(oI.vsub(t.ni,oI),oU.vadd(t.rj,oU),oD.vadd(t.ri,oD));let a=1/e;oU.scale(a,i.ri),oD.scale(a,i.rj),n.ri.copy(i.ri),n.rj.copy(i.rj),oI.normalize(),oI.tangents(i.t,n.t)}/**
   * Generate all contacts between a list of body pairs
   * @param p1 Array of body indices
   * @param p2 Array of body indices
   * @param result Array to store generated contacts
   * @param oldcontacts Optional. Array of reusable contact objects
   */getContacts(e,t,i,n,r,a,s){// Save old contact objects
this.contactPointPool=r,this.frictionEquationPool=s,this.result=n,this.frictionResult=a;for(let n=0,r=e.length;n!==r;n++){// Get current collision bodies
let r=e[n],a=t[n],s=null;r.material&&a.material&&(s=i.getContactMaterial(r.material,a.material)||null);let o=r.type&a2.KINEMATIC&&a.type&a2.STATIC||r.type&a2.STATIC&&a.type&a2.KINEMATIC||r.type&a2.KINEMATIC&&a.type&a2.KINEMATIC;for(let e=0;e<r.shapes.length;e++){r.quaternion.mult(r.shapeOrientations[e],oB),r.quaternion.vmult(r.shapeOffsets[e],oO),oO.vadd(r.position,oO);let t=r.shapes[e];for(let e=0;e<a.shapes.length;e++){// Compute world transform of shapes
a.quaternion.mult(a.shapeOrientations[e],oF),a.quaternion.vmult(a.shapeOffsets[e],oz),oz.vadd(a.position,oz);let n=a.shapes[e];if(!(t.collisionFilterMask&n.collisionFilterGroup&&n.collisionFilterMask&t.collisionFilterGroup)||oO.distanceTo(oz)>t.boundingSphereRadius+n.boundingSphereRadius)continue;// Get collision material
let l=null;t.material&&n.material&&(l=i.getContactMaterial(t.material,n.material)||null),this.currentContactMaterial=l||s||i.defaultContactMaterial;let h=t.type|n.type,c=this[h];c&&(t.type<n.type?c.call(this,t,n,oO,oz,oB,oF,r,a,t,n,o):c.call(this,n,t,oz,oO,oF,oB,a,r,t,n,o))&&o&&(// Register overlap
i.shapeOverlapKeeper.set(t.id,n.id),i.bodyOverlapKeeper.set(r.id,a.id))}}}}sphereSphere(e,t,i,n,r,a,s,o,l,h,c){if(c)return i.distanceSquared(n)<(e.radius+t.radius)**2;// We will have only one contact in this case
let u=this.createContactEquation(s,o,e,t,l,h);// Contact normal
n.vsub(i,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(e.radius,u.ri),u.rj.scale(-t.radius,u.rj),u.ri.vadd(i,u.ri),u.ri.vsub(s.position,u.ri),u.rj.vadd(n,u.rj),u.rj.vsub(o.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(e,t,i,n,r,a,s,o,l,h,c){// We will have one contact in this case
let u=this.createContactEquation(s,o,e,t,l,h);// Contact normal
if(u.ni.set(0,0,1),a.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),// Vector from sphere center to contact point
u.ni.scale(e.radius,u.ri),i.vsub(n,o4),u.ni.scale(u.ni.dot(o4),o5),o4.vsub(o5,u.rj),-o4.dot(u.ni)<=e.radius){if(c)return!0;// Make it relative to the body
let e=u.ri,t=u.rj;e.vadd(i,e),e.vsub(s.position,e),t.vadd(n,t),t.vsub(o.position,t),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(e,t,i,n,r,a,s,o,l,h,c){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,n,r,a,s,o,e,t,c)}sphereBox(e,t,i,n,r,a,s,o,l,h,c){let u=this.v3pool;// we refer to the box as body j
i.vsub(n,o9),t.getSideNormals(ln,a);let d=e.radius,p=!1,f=null,m=0,g=0,v=0,y=null;for(let e=0,t=ln.length;e!==t&&!1===p;e++){le.copy(ln[e]);let t=le.length();le.normalize();// The normal/distance dot product tells which side of the plane we are
let i=o9.dot(le);if(i<t+d&&i>0){lt.copy(ln[(e+1)%3]),li.copy(ln[(e+2)%3]);let n=lt.length(),r=li.length();lt.normalize(),li.normalize();let a=o9.dot(lt),s=o9.dot(li);if(a<n&&a>-n&&s<r&&s>-r){let e=Math.abs(i-t-d);if((null===y||e<y)&&(y=e,g=a,v=s,f=t,la.copy(le),ls.copy(lt),lo.copy(li),m++,c))return!0}}}if(m){p=!0;let r=this.createContactEquation(s,o,e,t,l,h);la.scale(-d,r.ri),r.ni.copy(la),r.ni.negate(r.ni),la.scale(f,la),ls.scale(g,ls),la.vadd(ls,la),lo.scale(v,lo),la.vadd(lo,r.rj),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.vadd(n,r.rj),r.rj.vsub(o.position,r.rj),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}// Check corners
let x=u.get();for(let r=0;2!==r&&!p;r++)for(let a=0;2!==a&&!p;a++)for(let u=0;2!==u&&!p;u++)if(x.set(0,0,0),r?x.vadd(ln[0],x):x.vsub(ln[0],x),a?x.vadd(ln[1],x):x.vsub(ln[1],x),u?x.vadd(ln[2],x):x.vsub(ln[2],x),// World position of corner
n.vadd(x,lr),lr.vsub(i,lr),lr.lengthSquared()<d*d){if(c)return!0;p=!0;let r=this.createContactEquation(s,o,e,t,l,h);r.ri.copy(lr),r.ri.normalize(),r.ni.copy(r.ri),r.ri.scale(d,r.ri),r.rj.copy(x),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.vadd(n,r.rj),r.rj.vsub(o.position,r.rj),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}u.release(x),x=null;let _=u.get(),w=u.get(),b=u.get(),M=u.get(),S=u.get(),E=ln.length;for(let r=0;r!==E&&!p;r++)for(let a=0;a!==E&&!p;a++)if(r%3!=a%3){// Get edge tangent
ln[a].cross(ln[r],_),_.normalize(),ln[r].vadd(ln[a],w),b.copy(i),b.vsub(w,b),b.vsub(n,b);let u=b.dot(_);// distance from edge center to sphere center in the tangent direction
_.scale(u,M);// Find the third side orthogonal to this one
let f=0;for(;f===r%3||f===a%3;)f++;// vec from edge center to sphere projected to the plane orthogonal to the edge tangent
S.copy(i),S.vsub(M,S),S.vsub(w,S),S.vsub(n,S);let m=Math.abs(u),g=S.length();if(m<ln[f].length()&&g<d){if(c)return!0;p=!0;let r=this.createContactEquation(s,o,e,t,l,h);w.vadd(M,r.rj),r.rj.copy(r.rj),S.negate(r.ni),r.ni.normalize(),r.ri.copy(r.rj),r.ri.vadd(n,r.ri),r.ri.vsub(i,r.ri),r.ri.normalize(),r.ri.scale(d,r.ri),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.vadd(n,r.rj),r.rj.vsub(o.position,r.rj),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}}u.release(_,w,b,M,S)}planeBox(e,t,i,n,r,a,s,o,l,h,c){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,i,n,r,a,s,o,e,t,c)}convexConvex(e,t,i,n,r,a,s,o,l,h,c,u,d){if(!(i.distanceTo(n)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,r,n,a,lb,u,d)){let u=[];e.clipAgainstHull(i,r,t,n,a,lb,-100,100,u);let d=0;for(let r=0;r!==u.length;r++){if(c)return!0;let a=this.createContactEquation(s,o,e,t,l,h),p=a.ri,f=a.rj;lb.negate(a.ni),u[r].normal.negate(lM),lM.scale(u[r].depth,lM),u[r].point.vadd(lM,p),f.copy(u[r].point),p.vsub(i,p),f.vsub(n,f),p.vadd(i,p),p.vsub(s.position,p),f.vadd(n,f),f.vsub(o.position,f),this.result.push(a),d++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(a,this.frictionResult)}this.enableFrictionReduction&&d&&this.createFrictionFromAverage(d)}}sphereConvex(e,t,i,n,r,a,s,o,l,h,c){let u=this.v3pool;i.vsub(n,ll);let d=t.faceNormals,p=t.faces,f=t.vertices,m=e.radius,g=!1;for(let r=0;r!==f.length;r++){let u=f[r];// World position of corner
if(a.vmult(u,ld),n.vadd(ld,ld),ld.vsub(i,lu),lu.lengthSquared()<m*m){if(c)return!0;g=!0;let r=this.createContactEquation(s,o,e,t,l,h);r.ri.copy(lu),r.ri.normalize(),r.ni.copy(r.ri),r.ri.scale(m,r.ri),ld.vsub(n,r.rj),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.vadd(n,r.rj),r.rj.vsub(o.position,r.rj),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult);return}}// Check side (plane) intersections
for(let r=0,v=p.length;r!==v&&!1===g;r++){let v=d[r],y=p[r];a.vmult(v,lp),a.vmult(f[y[0]],lf),lf.vadd(n,lf),lp.scale(-m,lm),i.vadd(lm,lm),lm.vsub(lf,lg);let x=lg.dot(lp);if(i.vsub(lf,lv),x<0&&lv.dot(lp)>0){// Intersects plane. Now check if the sphere is inside the face polygon
let r=[];// Face vertices, in world coords
for(let e=0,t=y.length;e!==t;e++){let t=u.get();a.vmult(f[y[e]],t),n.vadd(t,t),r.push(t)}if(function(e,t,i){let n=null,r=e.length;for(let a=0;a!==r;a++){let s=e[a];// Get edge to the next vertex
e[(a+1)%r].vsub(s,o6),o6.cross(t,o7),i.vsub(s,o8);let o=o7.dot(o8);// If all such dot products have same sign, we are inside the polygon.
if(null!==n&&(!(o>0)||!0!==n)&&(!(o<=0)||!1!==n))return!1;// Encountered some other sign. Exit.
null===n&&(n=o>0)}// If we got here, all dot products were of the same sign.
return!0}(r,lp,i)){// Is the sphere center in the face polygon?
if(c)return!0;g=!0;let a=this.createContactEquation(s,o,e,t,l,h);lp.scale(-m,a.ri),lp.negate(a.ni);let d=u.get();lp.scale(-x,d);let p=u.get();lp.scale(-m,p),i.vsub(n,a.rj),a.rj.vadd(p,a.rj),a.rj.vadd(d,a.rj),a.rj.vadd(n,a.rj),a.rj.vsub(o.position,a.rj),a.ri.vadd(i,a.ri),a.ri.vsub(s.position,a.ri),u.release(d),u.release(p),this.result.push(a),this.createFrictionEquationsFromContact(a,this.frictionResult);for(let e=0,t=r.length;e!==t;e++)u.release(r[e]);return;// We only expect *one* face contact
}for(let d=0;d!==y.length;d++){// Get two world transformed vertices
let p=u.get(),g=u.get();a.vmult(f[y[(d+1)%y.length]],p),a.vmult(f[y[(d+2)%y.length]],g),n.vadd(p,p),n.vadd(g,g),g.vsub(p,lh),lh.unit(lc);let v=u.get(),x=u.get();i.vsub(p,x);let _=x.dot(lc);lc.scale(_,v),v.vadd(p,v);let w=u.get();// AND if p is in between v1 and v2
if(v.vsub(i,w),_>0&&_*_<lh.lengthSquared()&&w.lengthSquared()<m*m){// Collision if the edge-sphere distance is less than the radius
// Edge contact!
if(c)return!0;let a=this.createContactEquation(s,o,e,t,l,h);v.vsub(n,a.rj),v.vsub(i,a.ni),a.ni.normalize(),a.ni.scale(m,a.ri),a.rj.vadd(n,a.rj),a.rj.vsub(o.position,a.rj),a.ri.vadd(i,a.ri),a.ri.vsub(s.position,a.ri),this.result.push(a),this.createFrictionEquationsFromContact(a,this.frictionResult);for(let e=0,t=r.length;e!==t;e++)u.release(r[e]);u.release(p),u.release(g),u.release(v),u.release(w),u.release(x);return}u.release(p),u.release(g),u.release(v),u.release(w),u.release(x)}// Release world vertices
for(let e=0,t=r.length;e!==t;e++)u.release(r[e])}}}planeConvex(e,t,i,n,r,a,s,o,l,h,c){lx.set(0,0,1),r.vmult(lx,lx);let u=0;for(let r=0;r!==t.vertices.length;r++){// Get world convex vertex
ly.copy(t.vertices[r]),a.vmult(ly,ly),n.vadd(ly,ly),ly.vsub(i,l_);let d=lx.dot(l_);if(d<=0){if(c)return!0;let r=this.createContactEquation(s,o,e,t,l,h);// Get vertex position projected on plane
lx.scale(lx.dot(l_),lw),ly.vsub(lw,lw),lw.vsub(i,r.ri),r.ni.copy(lx),// rj is now just the vector from the convex center to the vertex
ly.vsub(n,r.rj),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.vadd(n,r.rj),r.rj.vsub(o.position,r.rj),this.result.push(r),u++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(r,this.frictionResult)}}this.enableFrictionReduction&&u&&this.createFrictionFromAverage(u)}boxConvex(e,t,i,n,r,a,s,o,l,h,c){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o,e,t,c)}sphereHeightfield(e,t,i,n,r,a,s,o,l,h,c){let u=t.data,d=e.radius,p=t.elementSize;aG.pointToLocalFrame(n,a,i,lO);let f=Math.floor((lO.x-d)/p)-1,m=Math.ceil((lO.x+d)/p)+1,g=Math.floor((lO.y-d)/p)-1,v=Math.ceil((lO.y+d)/p)+1;if(m<0||v<0||f>u.length||g>u[0].length)return;f<0&&(f=0),m<0&&(m=0),g<0&&(g=0),v<0&&(v=0),f>=u.length&&(f=u.length-1),m>=u.length&&(m=u.length-1),v>=u[0].length&&(v=u[0].length-1),g>=u[0].length&&(g=u[0].length-1);let y=[];t.getRectMinMax(f,g,m,v,y);let x=y[0],_=y[1];if(lO.z-d>_||lO.z+d<x)return;let w=this.result;for(let l=f;l<m;l++)for(let h=g;h<v;h++){let u=w.length,d=!1;if(t.getConvexTrianglePillar(l,h,!1),aG.pointToWorldFrame(n,a,t.pillarOffset,lz),i.distanceTo(lz)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(d=this.sphereConvex(e,t.pillarConvex,i,lz,r,a,s,o,e,t,c)),c&&d||(// Upper triangle
t.getConvexTrianglePillar(l,h,!0),aG.pointToWorldFrame(n,a,t.pillarOffset,lz),i.distanceTo(lz)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(d=this.sphereConvex(e,t.pillarConvex,i,lz,r,a,s,o,e,t,c)),c&&d))return!0;let p=w.length-u;if(p>2)return;/*
          // Skip all but 1
          for (let k = 0; k < numContacts - 1; k++) {
              result.pop();
          }
        */}}boxHeightfield(e,t,i,n,r,a,s,o,l,h,c){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o,e,t,c)}convexHeightfield(e,t,i,n,r,a,s,o,l,h,c){let u=t.data,d=t.elementSize,p=e.boundingSphereRadius;aG.pointToLocalFrame(n,a,i,lI);let f=Math.floor((lI.x-p)/d)-1,m=Math.ceil((lI.x+p)/d)+1,g=Math.floor((lI.y-p)/d)-1,v=Math.ceil((lI.y+p)/d)+1;if(m<0||v<0||f>u.length||g>u[0].length)return;f<0&&(f=0),m<0&&(m=0),g<0&&(g=0),v<0&&(v=0),f>=u.length&&(f=u.length-1),m>=u.length&&(m=u.length-1),v>=u[0].length&&(v=u[0].length-1),g>=u[0].length&&(g=u[0].length-1);let y=[];t.getRectMinMax(f,g,m,v,y);let x=y[0],_=y[1];if(!(lI.z-p>_)&&!(lI.z+p<x))for(let l=f;l<m;l++)for(let h=g;h<v;h++){let u=!1;// Lower triangle
if(t.getConvexTrianglePillar(l,h,!1),aG.pointToWorldFrame(n,a,t.pillarOffset,lU),i.distanceTo(lU)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(u=this.convexConvex(e,t.pillarConvex,i,lU,r,a,s,o,null,null,c,lD,null)),c&&u||(// Upper triangle
t.getConvexTrianglePillar(l,h,!0),aG.pointToWorldFrame(n,a,t.pillarOffset,lU),i.distanceTo(lU)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(u=this.convexConvex(e,t.pillarConvex,i,lU,r,a,s,o,null,null,c,lD,null)),c&&u))return!0}}sphereParticle(e,t,i,n,r,a,s,o,l,h,c){lA.set(0,0,1),n.vsub(i,lA);let u=lA.lengthSquared();if(u<=e.radius*e.radius){if(c)return!0;let i=this.createContactEquation(o,s,t,e,l,h);lA.normalize(),i.rj.copy(lA),i.rj.scale(e.radius,i.rj),i.ni.copy(lA),i.ni.negate(i.ni),i.ri.set(0,0,0),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}planeParticle(e,t,i,n,r,a,s,o,l,h,c){lS.set(0,0,1),s.quaternion.vmult(lS,lS),n.vsub(s.position,lE);let u=lS.dot(lE);if(u<=0){if(c)return!0;let i=this.createContactEquation(o,s,t,e,l,h);i.ni.copy(lS),i.ni.negate(i.ni),i.ri.set(0,0,0),lS.scale(lS.dot(n),lT),n.vsub(lT,lT),// rj is now the projected world position minus plane position
i.rj.copy(lT),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}boxParticle(e,t,i,n,r,a,s,o,l,h,c){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o,e,t,c)}convexParticle(e,t,i,n,r,a,s,o,l,h,c){let u=-1,d=null;if(lC.copy(n),lC.vsub(i,lC),r.conjugate(lR),lR.vmult(lC,lC),e.pointIsInside(lC)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,r),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(r);// For each world polygon in the polyhedra
for(let t=0,i=e.faces.length;t!==i;t++){// Construct world face vertices
let i=[e.worldVertices[e.faces[t][0]]],r=e.worldFaceNormals[t];n.vsub(i[0],lL);let a=-r.dot(lL);if(null===d||Math.abs(a)<Math.abs(d)){if(c)return!0;d=a,u=t,lP.copy(r)}}if(-1!==u){// Setup contact
let r=this.createContactEquation(o,s,t,e,l,h);lP.scale(d,lN),lN.vadd(n,lN),lN.vsub(i,lN),r.rj.copy(lN),//projectedToFace.copy(r.rj);
//qj.vmult(r.rj,r.rj);
lP.negate(r.ni),r.ri.set(0,0,0);let a=r.ri,c=r.rj;a.vadd(n,a),a.vsub(o.position,a),c.vadd(i,c),c.vsub(s.position,c),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,i,n,r,a,s,o,l,h,c){return this.convexHeightfield(t,e,n,i,a,r,o,s,l,h,c)}particleCylinder(e,t,i,n,r,a,s,o,l,h,c){return this.convexParticle(t,e,n,i,a,r,o,s,l,h,c)}sphereTrimesh(e,t,i,n,r,a,s,o,l,h,c){aG.pointToLocalFrame(n,a,i,oJ);let u=e.radius;o2.lowerBound.set(oJ.x-u,oJ.y-u,oJ.z-u),o2.upperBound.set(oJ.x+u,oJ.y+u,oJ.z+u),t.getTrianglesInAABB(o2,o3);let d=e.radius*e.radius;for(let r=0;r<o3.length;r++)for(let u=0;u<3;u++)if(t.getVertex(t.indices[3*o3[r]+u],oq),oq.vsub(oJ,oG),oG.lengthSquared()<=d){if(// Safe up
oj.copy(oq),aG.pointToWorldFrame(n,a,oj,oq),oq.vsub(i,oG),c)return!0;let r=this.createContactEquation(s,o,e,t,l,h);r.ni.copy(oG),r.ni.normalize(),r.ri.copy(r.ni),r.ri.scale(e.radius,r.ri),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),r.rj.copy(oq),r.rj.vsub(o.position,r.rj),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}// Check all edges
for(let r=0;r<o3.length;r++)for(let u=0;u<3;u++){t.getVertex(t.indices[3*o3[r]+u],oX),t.getVertex(t.indices[3*o3[r]+(u+1)%3],oY),oY.vsub(oX,oZ),oJ.vsub(oY,oQ);let d=oQ.dot(oZ);oJ.vsub(oX,oQ);let p=oQ.dot(oZ);if(p>0&&d<0){// Now check the orthogonal distance from edge to sphere center
oJ.vsub(oX,oQ),oK.copy(oZ),oK.normalize(),p=oQ.dot(oK),oK.scale(p,oQ),oQ.vadd(oX,oQ);let r=oQ.distanceTo(oJ);if(r<e.radius){if(c)return!0;let r=this.createContactEquation(s,o,e,t,l,h);oQ.vsub(oJ,r.ni),r.ni.normalize(),r.ni.scale(e.radius,r.ri),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),aG.pointToWorldFrame(n,a,oQ,oQ),oQ.vsub(o.position,r.rj),aG.vectorToWorldFrame(a,r.ni,r.ni),aG.vectorToWorldFrame(a,r.ri,r.ri),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}}}for(let r=0,u=o3.length;r!==u;r++){t.getTriangleVertices(o3[r],o$,o0,o1),t.getNormal(o3[r],ok),oJ.vsub(o$,oQ);let u=oQ.dot(ok);if(ok.scale(u,oQ),oJ.vsub(oQ,oQ),u=oQ.distanceTo(oJ),sf.pointInTriangle(oQ,o$,o0,o1)&&u<e.radius){if(c)return!0;let r=this.createContactEquation(s,o,e,t,l,h);oQ.vsub(oJ,r.ni),r.ni.normalize(),r.ni.scale(e.radius,r.ri),r.ri.vadd(i,r.ri),r.ri.vsub(s.position,r.ri),aG.pointToWorldFrame(n,a,oQ,oQ),oQ.vsub(o.position,r.rj),aG.vectorToWorldFrame(a,r.ni,r.ni),aG.vectorToWorldFrame(a,r.ri,r.ri),this.result.push(r),this.createFrictionEquationsFromContact(r,this.frictionResult)}}o3.length=0}planeTrimesh(e,t,i,n,r,a,s,o,l,h,c){// Make contacts!
let u=new aL;oV.set(0,0,1),r.vmult(oV,oV);for(let r=0;r<t.vertices.length/3;r++){// Get world vertex from trimesh
t.getVertex(r,u);let d=new aL;d.copy(u),aG.pointToWorldFrame(n,a,d,u),u.vsub(i,oH);let p=oV.dot(oH);if(p<=0){if(c)return!0;let i=this.createContactEquation(s,o,e,t,l,h);i.ni.copy(oV),oV.scale(oH.dot(oV),oW),u.vsub(oW,oW),i.ri.copy(oW),i.ri.vsub(s.position,i.ri),i.rj.copy(u),i.rj.vsub(o.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}}}const oI=new aL,oU=new aL,oD=new aL,oO=new aL,oz=new aL,oB=new aV,oF=new aV,oV=new aL,oH=new aL,oW=new aL,ok=new aL,oG=new aL;new aL;const oq=new aL,oj=new aL,oX=new aL,oY=new aL,oZ=new aL,oK=new aL,oJ=new aL,oQ=new aL,o$=new aL,o0=new aL,o1=new aL,o2=new aD,o3=[],o4=new aL,o5=new aL,o6=new aL,o7=new aL,o8=new aL,o9=new aL,le=new aL,lt=new aL,li=new aL,ln=[new aL,new aL,new aL,new aL,new aL,new aL],lr=new aL,la=new aL,ls=new aL,lo=new aL,ll=new aL,lh=new aL,lc=new aL,lu=new aL,ld=new aL,lp=new aL,lf=new aL,lm=new aL,lg=new aL,lv=new aL;new aL,new aL;const ly=new aL,lx=new aL,l_=new aL,lw=new aL,lb=new aL,lM=new aL,lS=new aL,lE=new aL,lT=new aL,lA=new aL,lR=new aV,lC=new aL;new aL;const lP=new aL,lL=new aL,lN=new aL,lI=new aL,lU=new aL,lD=[0],lO=new aL,lz=new aL;class lB{/**
   * @todo Remove useless constructor
   */constructor(){this.current=[],this.previous=[]}/**
   * getKey
   */getKey(e,t){if(t<e){let i=t;t=e,e=i}return e<<16|t}/**
   * set
   */set(e,t){// Insertion sort. This way the diff will have linear complexity.
let i=this.getKey(e,t),n=this.current,r=0;for(;i>n[r];)r++;if(i!==n[r]){for(let e=n.length-1;e>=r;e--)n[e+1]=n[e];n[r]=i}// Pair was already added
}/**
   * tick
   */tick(){let e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}/**
   * getDiff
   */getDiff(e,t){let i=this.current,n=this.previous,r=i.length,a=n.length,s=0;for(let t=0;t<r;t++){let r=i[t];for(;r>n[s];)s++;r===n[s]||lF(e,r)}s=0;for(let e=0;e<a;e++){let r=n[e];for(;r>i[s];)s++;i[s]===r||lF(t,r)}}}function lF(e,t){e.push((4294901760&t)>>16,65535&t)}const lV=(e,t)=>e<t?`${e}-${t}`:`${t}-${e}`;/**
 * TupleDictionary
 */class lH{constructor(){this.data={keys:[]}}/** get */get(e,t){let i=lV(e,t);return this.data[i]}/** set */set(e,t,i){let n=lV(e,t);// Check if key already exists
this.get(e,t)||this.data.keys.push(n),this.data[n]=i}/** delete */delete(e,t){let i=lV(e,t),n=this.data.keys.indexOf(i);-1!==n&&this.data.keys.splice(n,1),delete this.data[i]}/** reset */reset(){let e=this.data,t=e.keys;for(;t.length>0;){let i=t.pop();delete e[i]}}}new aD;const lW=new sf,lk=globalThis.performance||{};// performance.now() fallback on Date.now()
if(!lk.now){let e=Date.now();lk.timing&&lk.timing.navigationStart&&(e=lk.timing.navigationStart),lk.now=()=>Date.now()-e}new aL;// Reusable event objects to save memory.
const lG={type:"postStep"},lq={type:"preStep"},lj={type:a2.COLLIDE_EVENT_NAME,body:null,contact:null},lX=[],lY=[],lZ=[],lK=[],lJ=[],lQ=[],l$={type:"beginContact",bodyA:null,bodyB:null},l0={type:"endContact",bodyA:null,bodyB:null},l1={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},l2={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},l3={type:"change"},l4={type:"start"},l5={type:"end"},l6=new eS,l7=new t1,l8=Math.cos(70*g);// Dispatched before the world steps forward in time.
(function e(t,i,n){function r(s,o){if(!i[s]){if(!t[s]){var l=void 0;if(!o&&l)return l(s,!0);if(a)return a(s,!0);throw Error("Cannot find module '"+s+"'")}var h=i[s]={exports:{}};t[s][0].call(h.exports,function(e){return r(t[s][1][e]||e)},h,h.exports,e,t,i,n)}return i[s].exports}for(var a=void 0,s=0;s<n.length;s++)r(n[s]);return r})({1:[function(e,t,i){t.exports={name:"cannon",version:"0.6.2",description:"A lightweight 3D physics engine written in JavaScript.",homepage:"https://github.com/schteppe/cannon.js",author:"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",keywords:["cannon.js","cannon","physics","engine","3d"],main:"./build/cannon.js",engines:{node:"*"},repository:{type:"git",url:"https://github.com/schteppe/cannon.js.git"},bugs:{url:"https://github.com/schteppe/cannon.js/issues"},licenses:[{type:"MIT"}],devDependencies:{jshint:"latest","uglify-js":"latest",nodeunit:"^0.9.0",grunt:"~0.4.0","grunt-contrib-jshint":"~0.1.1","grunt-contrib-nodeunit":"^0.4.1","grunt-contrib-concat":"~0.1.3","grunt-contrib-uglify":"^0.5.1","grunt-browserify":"^2.1.4","grunt-contrib-yuidoc":"^0.5.2",browserify:"*"},dependencies:{}}},{}],2:[function(e,t,i){// Export classes
t.exports={version:e("../package.json").version,AABB:e("./collision/AABB"),ArrayCollisionMatrix:e("./collision/ArrayCollisionMatrix"),Body:e("./objects/Body"),Box:e("./shapes/Box"),Broadphase:e("./collision/Broadphase"),Constraint:e("./constraints/Constraint"),ContactEquation:e("./equations/ContactEquation"),Narrowphase:e("./world/Narrowphase"),ConeTwistConstraint:e("./constraints/ConeTwistConstraint"),ContactMaterial:e("./material/ContactMaterial"),ConvexPolyhedron:e("./shapes/ConvexPolyhedron"),Cylinder:e("./shapes/Cylinder"),DistanceConstraint:e("./constraints/DistanceConstraint"),Equation:e("./equations/Equation"),EventTarget:e("./utils/EventTarget"),FrictionEquation:e("./equations/FrictionEquation"),GSSolver:e("./solver/GSSolver"),GridBroadphase:e("./collision/GridBroadphase"),Heightfield:e("./shapes/Heightfield"),HingeConstraint:e("./constraints/HingeConstraint"),LockConstraint:e("./constraints/LockConstraint"),Mat3:e("./math/Mat3"),Material:e("./material/Material"),NaiveBroadphase:e("./collision/NaiveBroadphase"),ObjectCollisionMatrix:e("./collision/ObjectCollisionMatrix"),Pool:e("./utils/Pool"),Particle:e("./shapes/Particle"),Plane:e("./shapes/Plane"),PointToPointConstraint:e("./constraints/PointToPointConstraint"),Quaternion:e("./math/Quaternion"),Ray:e("./collision/Ray"),RaycastVehicle:e("./objects/RaycastVehicle"),RaycastResult:e("./collision/RaycastResult"),RigidVehicle:e("./objects/RigidVehicle"),RotationalEquation:e("./equations/RotationalEquation"),RotationalMotorEquation:e("./equations/RotationalMotorEquation"),SAPBroadphase:e("./collision/SAPBroadphase"),SPHSystem:e("./objects/SPHSystem"),Shape:e("./shapes/Shape"),Solver:e("./solver/Solver"),Sphere:e("./shapes/Sphere"),SplitSolver:e("./solver/SplitSolver"),Spring:e("./objects/Spring"),Trimesh:e("./shapes/Trimesh"),Vec3:e("./math/Vec3"),Vec3Pool:e("./utils/Vec3Pool"),World:e("./world/World")}},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(e,t,i){var n=e("../math/Vec3");/**
 * Axis aligned bounding box class.
 * @class AABB
 * @constructor
 * @param {Object} [options]
 * @param {Vec3}   [options.upperBound]
 * @param {Vec3}   [options.lowerBound]
 */function r(e){e=e||{},/**
     * The lower bound of the bounding box.
     * @property lowerBound
     * @type {Vec3}
     */this.lowerBound=new n,e.lowerBound&&this.lowerBound.copy(e.lowerBound),/**
     * The upper bound of the bounding box.
     * @property upperBound
     * @type {Vec3}
     */this.upperBound=new n,e.upperBound&&this.upperBound.copy(e.upperBound)}e("../utils/Utils"),t.exports=r;var a=new n;/**
 * Set the AABB bounds from a set of points.
 * @method setFromPoints
 * @param {Array} points An array of Vec3's.
 * @param {Vec3} position
 * @param {Quaternion} quaternion
 * @param {number} skinSize
 * @return {AABB} The self object
 */r.prototype.setFromPoints=function(e,t,i,n){var r=this.lowerBound,s=this.upperBound;// Set to the first point
r.copy(e[0]),i&&i.vmult(r,r),s.copy(r);for(var o=1;o<e.length;o++){var l=e[o];i&&(i.vmult(l,a),l=a),l.x>s.x&&(s.x=l.x),l.x<r.x&&(r.x=l.x),l.y>s.y&&(s.y=l.y),l.y<r.y&&(r.y=l.y),l.z>s.z&&(s.z=l.z),l.z<r.z&&(r.z=l.z)}return t&&(t.vadd(r,r),t.vadd(s,s)),n&&(r.x-=n,r.y-=n,r.z-=n,s.x+=n,s.y+=n,s.z+=n),this},/**
 * Copy bounds from an AABB to this AABB
 * @method copy
 * @param  {AABB} aabb Source to copy from
 * @return {AABB} The this object, for chainability
 */r.prototype.copy=function(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this},/**
 * Clone an AABB
 * @method clone
 */r.prototype.clone=function(){return new r().copy(this)},/**
 * Extend this AABB so that it covers the given AABB too.
 * @method extend
 * @param  {AABB} aabb
 */r.prototype.extend=function(e){// Extend lower bound
var t=e.lowerBound.x;this.lowerBound.x>t&&(this.lowerBound.x=t);// Upper
var i=e.upperBound.x;this.upperBound.x<i&&(this.upperBound.x=i);// Extend lower bound
var t=e.lowerBound.y;this.lowerBound.y>t&&(this.lowerBound.y=t);// Upper
var i=e.upperBound.y;this.upperBound.y<i&&(this.upperBound.y=i);// Extend lower bound
var t=e.lowerBound.z;this.lowerBound.z>t&&(this.lowerBound.z=t);// Upper
var i=e.upperBound.z;this.upperBound.z<i&&(this.upperBound.z=i)},/**
 * Returns true if the given AABB overlaps this AABB.
 * @method overlaps
 * @param  {AABB} aabb
 * @return {Boolean}
 */r.prototype.overlaps=function(e){var t=this.lowerBound,i=this.upperBound,n=e.lowerBound,r=e.upperBound;//      l2        u2
//      |---------|
// |--------|
// l1       u1
return(n.x<=i.x&&i.x<=r.x||t.x<=r.x&&r.x<=i.x)&&(n.y<=i.y&&i.y<=r.y||t.y<=r.y&&r.y<=i.y)&&(n.z<=i.z&&i.z<=r.z||t.z<=r.z&&r.z<=i.z)},/**
 * Returns true if the given AABB is fully contained in this AABB.
 * @method contains
 * @param {AABB} aabb
 * @return {Boolean}
 */r.prototype.contains=function(e){var t=this.lowerBound,i=this.upperBound,n=e.lowerBound,r=e.upperBound;//      l2        u2
//      |---------|
// |---------------|
// l1              u1
return t.x<=n.x&&i.x>=r.x&&t.y<=n.y&&i.y>=r.y&&t.z<=n.z&&i.z>=r.z},/**
 * @method getCorners
 * @param {Vec3} a
 * @param {Vec3} b
 * @param {Vec3} c
 * @param {Vec3} d
 * @param {Vec3} e
 * @param {Vec3} f
 * @param {Vec3} g
 * @param {Vec3} h
 */r.prototype.getCorners=function(e,t,i,n,r,a,s,o){var l=this.lowerBound,h=this.upperBound;e.copy(l),t.set(h.x,l.y,l.z),i.set(h.x,h.y,l.z),n.set(l.x,h.y,h.z),r.set(h.x,l.y,l.z),a.set(l.x,h.y,l.z),s.set(l.x,l.y,h.z),o.copy(h)};var s=[new n,new n,new n,new n,new n,new n,new n,new n];/**
 * Get the representation of an AABB in another frame.
 * @method toLocalFrame
 * @param  {Transform} frame
 * @param  {AABB} target
 * @return {AABB} The "target" AABB object.
 */r.prototype.toLocalFrame=function(e,t){var i=s[0],n=s[1],r=s[2],a=s[3],o=s[4],l=s[5],h=s[6],c=s[7];// Get corners in current frame
this.getCorners(i,n,r,a,o,l,h,c);// Transform them to new local frame
for(var u=0;8!==u;u++){var d=s[u];e.pointToLocal(d,d)}return t.setFromPoints(s)},/**
 * Get the representation of an AABB in the global frame.
 * @method toWorldFrame
 * @param  {Transform} frame
 * @param  {AABB} target
 * @return {AABB} The "target" AABB object.
 */r.prototype.toWorldFrame=function(e,t){var i=s[0],n=s[1],r=s[2],a=s[3],o=s[4],l=s[5],h=s[6],c=s[7];// Get corners in current frame
this.getCorners(i,n,r,a,o,l,h,c);// Transform them to new local frame
for(var u=0;8!==u;u++){var d=s[u];e.pointToWorld(d,d)}return t.setFromPoints(s)}},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(e,t,i){/**
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 * @class ArrayCollisionMatrix
 * @constructor
 */function n(){/**
     * The matrix storage
     * @property matrix
     * @type {Array}
     */this.matrix=[]}t.exports=n,/**
 * Get an element
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */n.prototype.get=function(e,t){if(e=e.index,(t=t.index)>e){var i=t;t=e,e=i}return this.matrix[(e*(e+1)>>1)+t-1]},/**
 * Set an element
 * @method set
 * @param {Number} i
 * @param {Number} j
 * @param {Number} value
 */n.prototype.set=function(e,t,i){if(e=e.index,(t=t.index)>e){var n=t;t=e,e=n}this.matrix[(e*(e+1)>>1)+t-1]=i?1:0},/**
 * Sets all elements to zero
 * @method reset
 */n.prototype.reset=function(){for(var e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0},/**
 * Sets the max number of objects
 * @method setNumObjects
 * @param {Number} n
 */n.prototype.setNumObjects=function(e){this.matrix.length=e*(e-1)>>1}},{}],5:[function(e,t,i){var n=e("../objects/Body"),r=e("../math/Vec3"),a=e("../math/Quaternion");/**
 * Base class for broadphase implementations
 * @class Broadphase
 * @constructor
 * @author schteppe
 */function s(){/**
    * The world to search for collisions in.
    * @property world
    * @type {World}
    */this.world=null,/**
     * If set to true, the broadphase uses bounding boxes for intersection test, else it uses bounding spheres.
     * @property useBoundingBoxes
     * @type {Boolean}
     */this.useBoundingBoxes=!1,/**
     * Set to true if the objects in the world moved.
     * @property {Boolean} dirty
     */this.dirty=!0}e("../shapes/Shape"),e("../shapes/Plane"),t.exports=s,/**
 * Get the collision pairs from the world
 * @method collisionPairs
 * @param {World} world The world to search in
 * @param {Array} p1 Empty array to be filled with body objects
 * @param {Array} p2 Empty array to be filled with body objects
 */s.prototype.collisionPairs=function(e,t,i){throw Error("collisionPairs not implemented for this BroadPhase class!")};/**
 * Check if a body pair needs to be intersection tested at all.
 * @method needBroadphaseCollision
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {bool}
 */var o=n.STATIC|n.KINEMATIC;s.prototype.needBroadphaseCollision=function(e,t){return(e.collisionFilterGroup&t.collisionFilterMask)!=0&&(t.collisionFilterGroup&e.collisionFilterMask)!=0&&((e.type&o)==0&&e.sleepState!==n.SLEEPING||(t.type&o)==0&&t.sleepState!==n.SLEEPING)},/**
 * Check if the bounding volumes of two bodies intersect.
 * @method intersectionTest
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {array} pairs1
 * @param {array} pairs2
  */s.prototype.intersectionTest=function(e,t,i,n){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,n):this.doBoundingSphereBroadphase(e,t,i,n)};/**
 * Check if the bounding spheres of two bodies are intersecting.
 * @method doBoundingSphereBroadphase
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Array} pairs1 bodyA is appended to this array if intersection
 * @param {Array} pairs2 bodyB is appended to this array if intersection
 */var l=new r;new r,new a,new r,s.prototype.doBoundingSphereBroadphase=function(e,t,i,n){t.position.vsub(e.position,l);var r=Math.pow(e.boundingRadius+t.boundingRadius,2);l.norm2()<r&&(i.push(e),n.push(t))},/**
 * Check if the bounding boxes of two bodies are intersecting.
 * @method doBoundingBoxBroadphase
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Array} pairs1
 * @param {Array} pairs2
 */s.prototype.doBoundingBoxBroadphase=function(e,t,i,n){e.aabbNeedsUpdate&&e.computeAABB(),t.aabbNeedsUpdate&&t.computeAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),n.push(t))};/**
 * Removes duplicate pairs from the pair arrays.
 * @method makePairsUnique
 * @param {Array} pairs1
 * @param {Array} pairs2
 */var h={keys:[]},c=[],u=[];s.prototype.makePairsUnique=function(e,t){for(var i=e.length,n=0;n!==i;n++)c[n]=e[n],u[n]=t[n];e.length=0,t.length=0;for(var n=0;n!==i;n++){var r=c[n].id,a=u[n].id,s=r<a?r+","+a:a+","+r;h[s]=n,h.keys.push(s)}for(var n=0;n!==h.keys.length;n++){var s=h.keys.pop(),o=h[s];e.push(c[o]),t.push(u[o]),delete h[s]}},/**
 * To be implemented by subcasses
 * @method setWorld
 * @param {World} world
 */s.prototype.setWorld=function(e){};/**
 * Check if the bounding spheres of two bodies overlap.
 * @method boundingSphereCheck
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {boolean}
 */var d=new r;s.boundingSphereCheck=function(e,t){return e.position.vsub(t.position,d),Math.pow(e.shape.boundingSphereRadius+t.shape.boundingSphereRadius,2)>d.norm2()},/**
 * Returns all the bodies within the AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param  {array} result An array to store resulting bodies in.
 * @return {array}
 */s.prototype.aabbQuery=function(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(e,t,i){t.exports=s;var n=e("./Broadphase"),r=e("../math/Vec3"),a=e("../shapes/Shape");/**
 * Axis aligned uniform grid broadphase.
 * @class GridBroadphase
 * @constructor
 * @extends Broadphase
 * @todo Needs support for more than just planes and spheres.
 * @param {Vec3} aabbMin
 * @param {Vec3} aabbMax
 * @param {Number} nx Number of boxes along x
 * @param {Number} ny Number of boxes along y
 * @param {Number} nz Number of boxes along z
 */function s(e,t,i,a,s){n.apply(this),this.nx=i||10,this.ny=a||10,this.nz=s||10,this.aabbMin=e||new r(100,100,100),this.aabbMax=t||new r(-100,-100,-100);var o=this.nx*this.ny*this.nz;if(o<=0)throw"GridBroadphase: Each dimension's n must be >0";this.bins=[],this.binLengths=[],this.bins.length=o,this.binLengths.length=o;for(var l=0;l<o;l++)this.bins[l]=[],this.binLengths[l]=0}s.prototype=new n,s.prototype.constructor=s;/**
 * Get all the collision pairs in the physics world
 * @method collisionPairs
 * @param {World} world
 * @param {Array} pairs1
 * @param {Array} pairs2
 */var o=new r;new r,s.prototype.collisionPairs=function(e,t,i){var n=e.numObjects(),r=e.bodies,s=this.aabbMax,l=this.aabbMin,h=this.nx,c=this.ny,u=this.nz,d=c*u,p=s.x,f=s.y,m=s.z,g=l.x,v=l.y,y=l.z,x=h/(p-g),_=c/(f-v),w=u/(m-y),b=(p-g)/h,M=(f-v)/c,S=(m-y)/u,E=.5*Math.sqrt(b*b+M*M+S*S),T=a.types,A=T.SPHERE,R=T.PLANE;T.BOX,T.COMPOUND,T.CONVEXPOLYHEDRON;// Reset bins
for(var C=this.bins,P=this.binLengths,L=this.bins.length,N=0;N!==L;N++)P[N]=0;var I=Math.ceil,l=Math.min,s=Math.max;function U(e,t,i,n,r,a,s){var o=(e-g)*x|0,l=(t-v)*_|0,p=(i-y)*w|0,f=I((n-g)*x),m=I((r-v)*_),b=I((a-y)*w);o<0?o=0:o>=h&&(o=h-1),l<0?l=0:l>=c&&(l=c-1),p<0?p=0:p>=u&&(p=u-1),f<0?f=0:f>=h&&(f=h-1),m<0?m=0:m>=c&&(m=c-1),b<0?b=0:b>=u&&(b=u-1),o*=d,l*=u,p*=1,f*=d,m*=u,b*=1;for(var M=o;M<=f;M+=d)for(var S=l;S<=m;S+=u)for(var E=p;E<=b;E+=1){var T=M+S+E;C[T][P[T]++]=s}}// Put all bodies into the bins
for(var N=0;N!==n;N++){var D=r[N],O=D.shape;switch(O.type){case A:// Put in bin
// check if overlap with other bins
var z=D.position.x,B=D.position.y,F=D.position.z,V=O.radius;U(z-V,B-V,F-V,z+V,B+V,F+V,D);break;case R:O.worldNormalNeedsUpdate&&O.computeWorldNormal(D.quaternion);var H=O.worldNormal,W=g+.5*b-D.position.x,k=v+.5*M-D.position.y,G=y+.5*S-D.position.z;o.set(W,k,G);for(var q=0,j=0;q!==h;q++,j+=d,o.y=k,o.x+=b)for(var X=0,Y=0;X!==c;X++,Y+=u,o.z=G,o.y+=M)for(var Z=0,K=0;Z!==u;Z++,K+=1,o.z+=S)if(o.dot(H)<E){var J=j+Y+K;C[J][P[J]++]=D}break;default:D.aabbNeedsUpdate&&D.computeAABB(),U(D.aabb.lowerBound.x,D.aabb.lowerBound.y,D.aabb.lowerBound.z,D.aabb.upperBound.x,D.aabb.upperBound.y,D.aabb.upperBound.z,D)}}// Check each bin
for(var N=0;N!==L;N++){var Q=P[N];//Skip bins with no potential collisions
if(Q>1)// Do N^2 broadphase inside
for(var $=C[N],q=0;q!==Q;q++)for(var D=$[q],X=0;X!==q;X++){var ee=$[X];this.needBroadphaseCollision(D,ee)&&this.intersectionTest(D,ee,t,i)}}//	for (var zi = 0, zoff=0; zi < nz; zi++, zoff+= zstep) {
//		console.log("layer "+zi);
//		for (var yi = 0, yoff=0; yi < ny; yi++, yoff += ystep) {
//			var row = '';
//			for (var xi = 0, xoff=0; xi < nx; xi++, xoff += xstep) {
//				var idx = xoff + yoff + zoff;
//				row += ' ' + binLengths[idx];
//			}
//			console.log(row);
//		}
//	}
this.makePairsUnique(t,i)}},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(e,t,i){t.exports=a;var n=e("./Broadphase"),r=e("./AABB");/**
 * Naive broadphase implementation, used in lack of better ones.
 * @class NaiveBroadphase
 * @constructor
 * @description The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
 * @extends Broadphase
 */function a(){n.apply(this)}a.prototype=new n,a.prototype.constructor=a,/**
 * Get all the collision pairs in the physics world
 * @method collisionPairs
 * @param {World} world
 * @param {Array} pairs1
 * @param {Array} pairs2
 */a.prototype.collisionPairs=function(e,t,i){var n,r,a,s,o=e.bodies,l=o.length;// Naive N^2 ftw!
for(n=0;n!==l;n++)for(r=0;r!==n;r++)a=o[n],s=o[r],this.needBroadphaseCollision(a,s)&&this.intersectionTest(a,s,t,i)},new r,/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param {array} result An array to store resulting bodies in.
 * @return {array}
 */a.prototype.aabbQuery=function(e,t,i){i=i||[];for(var n=0;n<e.bodies.length;n++){var r=e.bodies[n];r.aabbNeedsUpdate&&r.computeAABB(),r.aabb.overlaps(t)&&i.push(r)}return i}},{"./AABB":3,"./Broadphase":5}],8:[function(e,t,i){/**
 * Records what objects are colliding with each other
 * @class ObjectCollisionMatrix
 * @constructor
 */function n(){/**
     * The matrix storage
     * @property matrix
     * @type {Object}
     */this.matrix={}}t.exports=n,/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */n.prototype.get=function(e,t){if(e=e.id,(t=t.id)>e){var i=t;t=e,e=i}return e+"-"+t in this.matrix},/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Number} value
 */n.prototype.set=function(e,t,i){if(e=e.id,(t=t.id)>e){var n=t;t=e,e=n}i?this.matrix[e+"-"+t]=!0:delete this.matrix[e+"-"+t]},/**
 * Empty the matrix
 * @method reset
 */n.prototype.reset=function(){this.matrix={}},/**
 * Set max number of objects
 * @method setNumObjects
 * @param {Number} n
 */n.prototype.setNumObjects=function(e){}},{}],9:[function(e,t,i){t.exports=h;var n=e("../math/Vec3"),r=e("../math/Quaternion"),a=e("../math/Transform");e("../shapes/ConvexPolyhedron"),e("../shapes/Box");var s=e("../collision/RaycastResult"),o=e("../shapes/Shape"),l=e("../collision/AABB");/**
 * A line in 3D space that intersects bodies and return points.
 * @class Ray
 * @constructor
 * @param {Vec3} from
 * @param {Vec3} to
 */function h(e,t){/**
     * @property {Vec3} from
     */this.from=e?e.clone():new n,/**
     * @property {Vec3} to
     */this.to=t?t.clone():new n,/**
     * @private
     * @property {Vec3} _direction
     */this._direction=new n,/**
     * The precision of the ray. Used when checking parallelity etc.
     * @property {Number} precision
     */this.precision=1e-4,/**
     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
     * @property {Boolean} checkCollisionResponse
     */this.checkCollisionResponse=!0,/**
     * If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
     * @property {Boolean} skipBackfaces
     */this.skipBackfaces=!1,/**
     * @property {number} collisionFilterMask
     * @default -1
     */this.collisionFilterMask=-1,/**
     * @property {number} collisionFilterGroup
     * @default -1
     */this.collisionFilterGroup=-1,/**
     * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
     * @property {number} mode
     */this.mode=h.ANY,/**
     * Current result object.
     * @property {RaycastResult} result
     */this.result=new s,/**
     * Will be set to true during intersectWorld() if the ray hit anything.
     * @property {Boolean} hasHit
     */this.hasHit=!1,/**
     * Current, user-provided result callback. Will be used if mode is Ray.ALL.
     * @property {Function} callback
     */this.callback=function(e){}}h.prototype.constructor=h,h.CLOSEST=1,h.ANY=2,h.ALL=4;var c=new l,u=[];/**
 * Do itersection against all bodies in the given World.
 * @method intersectWorld
 * @param  {World} world
 * @param  {object} options
 * @return {Boolean} True if the ray hit anything, otherwise false.
 */h.prototype.intersectWorld=function(e,t){return this.mode=t.mode||h.ANY,this.result=t.result||new s,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=void 0!==t.collisionFilterMask?t.collisionFilterMask:-1,this.collisionFilterGroup=void 0!==t.collisionFilterGroup?t.collisionFilterGroup:-1,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||function(){},this.hasHit=!1,this.result.reset(),this._updateDirection(),this.getAABB(c),u.length=0,e.broadphase.aabbQuery(e,c,u),this.intersectBodies(u),this.hasHit};var d=new n,p=new n;function f(e,t,i,n){n.vsub(t,U),i.vsub(t,d),e.vsub(t,p);var r,a,s=U.dot(U),o=U.dot(d),l=U.dot(p),h=d.dot(d),c=d.dot(p);return(r=h*l-o*c)>=0&&(a=s*c-o*l)>=0&&r+a<s*h-o*o}/*
 * As per "Barycentric Technique" as named here http://www.blackpawn.com/texts/pointinpoly/default.html But without the division
 */h.pointInTriangle=f;/**
 * Shoot a ray at a body, get back information about the hit.
 * @method intersectBody
 * @private
 * @param {Body} body
 * @param {RaycastResult} [result] Deprecated - set the result property of the Ray instead.
 */var m=new n,g=new r;h.prototype.intersectBody=function(e,t){t&&(this.result=t,this._updateDirection());var i=this.checkCollisionResponse;if((!i||e.collisionResponse)&&(this.collisionFilterGroup&e.collisionFilterMask)!=0&&(e.collisionFilterGroup&this.collisionFilterMask)!=0)for(var n=0,r=e.shapes.length;n<r;n++){var a=e.shapes[n];if((!i||a.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[n],g),e.quaternion.vmult(e.shapeOffsets[n],m),m.vadd(e.position,m),this.intersectShape(a,g,m,e),this.result._shouldStop))break;// Skip
}},/**
 * @method intersectBodies
 * @param {Array} bodies An array of Body objects.
 * @param {RaycastResult} [result] Deprecated
 */h.prototype.intersectBodies=function(e,t){t&&(this.result=t,this._updateDirection());for(var i=0,n=e.length;!this.result._shouldStop&&i<n;i++)this.intersectBody(e[i])},/**
 * Updates the _direction vector.
 * @private
 * @method _updateDirection
 */h.prototype._updateDirection=function(){this.to.vsub(this.from,this._direction),this._direction.normalize()},/**
 * @method intersectShape
 * @private
 * @param {Shape} shape
 * @param {Quaternion} quat
 * @param {Vec3} position
 * @param {Body} body
 */h.prototype.intersectShape=function(e,t,i,n){if(!(function(e,t,i){// v0 is vector from from to position
i.vsub(e,U);var n=U.dot(t);return(// intersect = direction*dot + from
t.mult(n,D),D.vadd(e,D),i.distanceTo(D))}(this.from,this._direction,i)>e.boundingSphereRadius)){var r=this[e.type];r&&r.call(this,e,t,i,n)}},new n,new n;var v=new n,y=new n,x=new n,_=new n;new n,new s,/**
 * @method intersectBox
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */h.prototype.intersectBox=function(e,t,i,n){return this.intersectConvex(e.convexPolyhedronRepresentation,t,i,n)},h.prototype[o.types.BOX]=h.prototype.intersectBox,/**
 * @method intersectPlane
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */h.prototype.intersectPlane=function(e,t,i,r){var a=this.from,s=this.to,o=this._direction,l=new n(0,0,1);t.vmult(l,l);var h=new n;a.vsub(i,h);var c=h.dot(l);if(s.vsub(i,h),!(c*h.dot(l)>0||a.distanceTo(s)<c)){var u=l.dot(o);if(!(Math.abs(u)<this.precision)){var d=new n,p=new n,f=new n;a.vsub(i,d);var m=-l.dot(d)/u;o.scale(m,p),a.vadd(p,f),this.reportIntersection(l,f,e,r,-1)}}},h.prototype[o.types.PLANE]=h.prototype.intersectPlane,/**
 * Get the world AABB of the ray.
 * @method getAABB
 * @param  {AABB} aabb
 */h.prototype.getAABB=function(e){var t=this.to,i=this.from;e.lowerBound.x=Math.min(t.x,i.x),e.lowerBound.y=Math.min(t.y,i.y),e.lowerBound.z=Math.min(t.z,i.z),e.upperBound.x=Math.max(t.x,i.x),e.upperBound.y=Math.max(t.y,i.y),e.upperBound.z=Math.max(t.z,i.z)};var w={faceList:[0]};/**
 * @method intersectHeightfield
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */h.prototype.intersectHeightfield=function(e,t,i,r){e.data,e.elementSize;var s=new n,o=new h(this.from,this.to);a.pointToLocalFrame(i,t,o.from,o.from),a.pointToLocalFrame(i,t,o.to,o.to);// Get the index of the data points to test against
var l=[],c=null,u=null,d=null,p=null,f=e.getIndexOfPosition(o.from.x,o.from.y,l,!1);if(f&&(c=l[0],u=l[1],d=l[0],p=l[1]),(f=e.getIndexOfPosition(o.to.x,o.to.y,l,!1))&&((null===c||l[0]<c)&&(c=l[0]),(null===d||l[0]>d)&&(d=l[0]),(null===u||l[1]<u)&&(u=l[1]),(null===p||l[1]>p)&&(p=l[1])),null!==c){var m=[];e.getRectMinMax(c,u,d,p,m),m[0],m[1];// // Bail out if the ray can't touch the bounding box
// // TODO
// var aabb = new AABB();
// this.getAABB(aabb);
// if(aabb.intersects()){
//     return;
// }
for(var g=c;g<=d;g++)for(var v=u;v<=p;v++){if(this.result._shouldStop||(// Lower triangle
e.getConvexTrianglePillar(g,v,!1),a.pointToWorldFrame(i,t,e.pillarOffset,s),this.intersectConvex(e.pillarConvex,t,s,r,w),this.result._shouldStop))return;// Upper triangle
e.getConvexTrianglePillar(g,v,!0),a.pointToWorldFrame(i,t,e.pillarOffset,s),this.intersectConvex(e.pillarConvex,t,s,r,w)}}},h.prototype[o.types.HEIGHTFIELD]=h.prototype.intersectHeightfield;var b=new n,M=new n;/**
 * @method intersectSphere
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */h.prototype.intersectSphere=function(e,t,i,n){var r=this.from,a=this.to,s=e.radius,o=Math.pow(a.x-r.x,2)+Math.pow(a.y-r.y,2)+Math.pow(a.z-r.z,2),l=2*((a.x-r.x)*(r.x-i.x)+(a.y-r.y)*(r.y-i.y)+(a.z-r.z)*(r.z-i.z)),h=Math.pow(l,2)-4*o*(Math.pow(r.x-i.x,2)+Math.pow(r.y-i.y,2)+Math.pow(r.z-i.z,2)-Math.pow(s,2));if(!(h<0)){if(0===h)// single intersection point
r.lerp(a,h,b),b.vsub(i,M),M.normalize(),this.reportIntersection(M,b,e,n,-1);else{var c=(-l-Math.sqrt(h))/(2*o),u=(-l+Math.sqrt(h))/(2*o);if(c>=0&&c<=1&&(r.lerp(a,c,b),b.vsub(i,M),M.normalize(),this.reportIntersection(M,b,e,n,-1)),this.result._shouldStop)return;u>=0&&u<=1&&(r.lerp(a,u,b),b.vsub(i,M),M.normalize(),this.reportIntersection(M,b,e,n,-1))}}},h.prototype[o.types.SPHERE]=h.prototype.intersectSphere;var S=new n;new n,new n;var E=new n;/**
 * @method intersectConvex
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param {object} [options]
 * @param {array} [options.faceList]
 */h.prototype.intersectConvex=function(e,t,i,n,r){for(var a=r&&r.faceList||null,s=e.faces,o=e.vertices,l=e.faceNormals,h=this._direction,c=this.from,u=this.to,d=c.distanceTo(u),p=a?a.length:s.length,m=this.result,g=0;!m._shouldStop&&g<p;g++){var w=a?a[g]:g,b=s[w],M=l[w];// determine if ray intersects the plane of the face
// note: this works regardless of the direction of the face normal
// Get plane point in world coordinates...
E.copy(o[b[0]]),t.vmult(E,E),E.vadd(i,E),// ...but make it relative to the ray from. We'll fix this later.
E.vsub(c,E),// Get plane normal
t.vmult(M,S);// If this dot product is negative, we have something interesting
var T=h.dot(S);// Bail out if ray and plane are parallel
if(!(Math.abs(T)<this.precision)){// calc distance to plane
var A=S.dot(E)/T;// if negative distance, then plane is behind ray
if(!(A<0)){// if (dot < 0) {
// Intersection point is from + direction * scalar
h.mult(A,v),v.vadd(c,v),// a is the point we compare points b and c with.
y.copy(o[b[0]]),t.vmult(y,y),i.vadd(y,y);for(var R=1;!m._shouldStop&&R<b.length-1;R++){// Transform 3 vertices to world coords
x.copy(o[b[R]]),_.copy(o[b[R+1]]),t.vmult(x,x),t.vmult(_,_),i.vadd(x,x),i.vadd(_,_);var C=v.distanceTo(c);(f(v,y,x,_)||f(v,x,y,_))&&!(C>d)&&this.reportIntersection(S,v,e,n,w)}}}// }
}},h.prototype[o.types.CONVEXPOLYHEDRON]=h.prototype.intersectConvex;var T=new n,A=new n,R=new n,C=new n,P=new n,L=new n;new l;var N=[],I=new a;/**
 * @method intersectTrimesh
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param {object} [options]
 * @todo Optimize by transforming the world to local space first.
 * @todo Use Octree lookup
 */h.prototype.intersectTrimesh=function(e,t,i,n,r){r&&r.faceList;// Checking faces
var s=e.indices;e.vertices,e.faceNormals;var o=this.from,l=this.to,h=this._direction;I.position.copy(i),I.quaternion.copy(t),// Transform ray to local space!
a.vectorToLocalFrame(i,t,h,A),//body.vectorToLocalFrame(direction, localDirection);
a.pointToLocalFrame(i,t,o,R),//body.pointToLocalFrame(from, localFrom);
a.pointToLocalFrame(i,t,l,C);//body.pointToLocalFrame(to, localTo);
var c=R.distanceSquared(C);e.tree.rayQuery(this,I,N);for(var u=0,d=N.length;!this.result._shouldStop&&u!==d;u++){var p=N[u];e.getNormal(p,T),// determine if ray intersects the plane of the face
// note: this works regardless of the direction of the face normal
// Get plane point in world coordinates...
e.getVertex(s[3*p],y),// ...but make it relative to the ray from. We'll fix this later.
y.vsub(R,E);// Get plane normal
// quat.vmult(normal, normal);
// If this dot product is negative, we have something interesting
var m=A.dot(T),g=T.dot(E)/m;// if negative distance, then plane is behind ray
if(!(g<0)){// Intersection point is from + direction * scalar
A.scale(g,v),v.vadd(R,v),// Get triangle vertices
e.getVertex(s[3*p+1],x),e.getVertex(s[3*p+2],_);var w=v.distanceSquared(R);(f(v,x,y,_)||f(v,y,x,_))&&!(w>c)&&(// transform intersectpoint and normal to world
a.vectorToWorldFrame(t,T,P),//body.vectorToWorldFrame(normal, worldNormal);
a.pointToWorldFrame(i,t,v,L),//body.pointToWorldFrame(intersectPoint, worldIntersectPoint);
this.reportIntersection(P,L,e,n,p))}}N.length=0},h.prototype[o.types.TRIMESH]=h.prototype.intersectTrimesh,/**
 * @method reportIntersection
 * @private
 * @param  {Vec3} normal
 * @param  {Vec3} hitPointWorld
 * @param  {Shape} shape
 * @param  {Body} body
 * @return {boolean} True if the intersections should continue
 */h.prototype.reportIntersection=function(e,t,i,n,r){var a=this.from,s=this.to,o=a.distanceTo(t),l=this.result;// Skip back faces?
if(!(this.skipBackfaces&&e.dot(this._direction)>0))switch(l.hitFaceIndex=void 0!==r?r:-1,this.mode){case h.ALL:this.hasHit=!0,l.set(a,s,e,t,i,n,o),l.hasHit=!0,this.callback(l);break;case h.CLOSEST:// Store if closer than current closest
(o<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(a,s,e,t,i,n,o));break;case h.ANY:// Report and stop.
this.hasHit=!0,l.hasHit=!0,l.set(a,s,e,t,i,n,o),l._shouldStop=!0}};var U=new n,D=new n},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(e,t,i){var n=e("../math/Vec3");/**
 * Storage for Ray casting data.
 * @class RaycastResult
 * @constructor
 */function r(){/**
	 * @property {Vec3} rayFromWorld
	 */this.rayFromWorld=new n,/**
	 * @property {Vec3} rayToWorld
	 */this.rayToWorld=new n,/**
	 * @property {Vec3} hitNormalWorld
	 */this.hitNormalWorld=new n,/**
	 * @property {Vec3} hitPointWorld
	 */this.hitPointWorld=new n,/**
	 * @property {boolean} hasHit
	 */this.hasHit=!1,/**
	 * The hit shape, or null.
	 * @property {Shape} shape
	 */this.shape=null,/**
	 * The hit body, or null.
	 * @property {Body} body
	 */this.body=null,/**
	 * The index of the hit triangle, if the hit shape was a trimesh.
	 * @property {number} hitFaceIndex
	 * @default -1
	 */this.hitFaceIndex=-1,/**
	 * Distance to the hit. Will be set to -1 if there was no hit.
	 * @property {number} distance
	 * @default -1
	 */this.distance=-1,/**
	 * If the ray should stop traversing the bodies.
	 * @private
	 * @property {Boolean} _shouldStop
	 * @default false
	 */this._shouldStop=!1}t.exports=r,/**
 * Reset all result data.
 * @method reset
 */r.prototype.reset=function(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1},/**
 * @method abort
 */r.prototype.abort=function(){this._shouldStop=!0},/**
 * @method set
 * @param {Vec3} rayFromWorld
 * @param {Vec3} rayToWorld
 * @param {Vec3} hitNormalWorld
 * @param {Vec3} hitPointWorld
 * @param {Shape} shape
 * @param {Body} body
 * @param {number} distance
 */r.prototype.set=function(e,t,i,n,r,a,s){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(n),this.shape=r,this.body=a,this.distance=s}},{"../math/Vec3":30}],11:[function(e,t,i){e("../shapes/Shape");var n=e("../collision/Broadphase");/**
 * Sweep and prune broadphase along one axis.
 *
 * @class SAPBroadphase
 * @constructor
 * @param {World} [world]
 * @extends Broadphase
 */function r(e){n.apply(this),/**
     * List of bodies currently in the broadphase.
     * @property axisList
     * @type {Array}
     */this.axisList=[],/**
     * The world to search in.
     * @property world
     * @type {World}
     */this.world=null,/**
     * Axis to sort the bodies along. Set to 0 for x axis, and 1 for y axis. For best performance, choose an axis that the bodies are spread out more on.
     * @property axisIndex
     * @type {Number}
     */this.axisIndex=0;var t=this.axisList;this._addBodyHandler=function(e){t.push(e.body)},this._removeBodyHandler=function(e){var i=t.indexOf(e.body);-1!==i&&t.splice(i,1)},e&&this.setWorld(e)}t.exports=r,r.prototype=new n,/**
 * Change the world
 * @method setWorld
 * @param  {World} world
 */r.prototype.setWorld=function(e){// Clear the old axis array
this.axisList.length=0;// Add all bodies from the new world
for(var t=0;t<e.bodies.length;t++)this.axisList.push(e.bodies[t]);// Remove old handlers, if any
e.removeEventListener("addBody",this._addBodyHandler),e.removeEventListener("removeBody",this._removeBodyHandler),// Add handlers to update the list of bodies.
e.addEventListener("addBody",this._addBodyHandler),e.addEventListener("removeBody",this._removeBodyHandler),this.world=e,this.dirty=!0},/**
 * @static
 * @method insertionSortX
 * @param  {Array} a
 * @return {Array}
 */r.insertionSortX=function(e){for(var t=1,i=e.length;t<i;t++){for(var n=e[t],r=t-1;r>=0&&!(e[r].aabb.lowerBound.x<=n.aabb.lowerBound.x);r--)e[r+1]=e[r];e[r+1]=n}return e},/**
 * @static
 * @method insertionSortY
 * @param  {Array} a
 * @return {Array}
 */r.insertionSortY=function(e){for(var t=1,i=e.length;t<i;t++){for(var n=e[t],r=t-1;r>=0&&!(e[r].aabb.lowerBound.y<=n.aabb.lowerBound.y);r--)e[r+1]=e[r];e[r+1]=n}return e},/**
 * @static
 * @method insertionSortZ
 * @param  {Array} a
 * @return {Array}
 */r.insertionSortZ=function(e){for(var t=1,i=e.length;t<i;t++){for(var n=e[t],r=t-1;r>=0&&!(e[r].aabb.lowerBound.z<=n.aabb.lowerBound.z);r--)e[r+1]=e[r];e[r+1]=n}return e},/**
 * Collect all collision pairs
 * @method collisionPairs
 * @param  {World} world
 * @param  {Array} p1
 * @param  {Array} p2
 */r.prototype.collisionPairs=function(e,t,i){var n,a,s=this.axisList,o=s.length,l=this.axisIndex;// Look through the list
for(this.dirty&&(this.sortList(),this.dirty=!1),n=0;n!==o;n++){var h=s[n];for(a=n+1;a<o;a++){var c=s[a];if(this.needBroadphaseCollision(h,c)){if(!r.checkBounds(h,c,l))break;this.intersectionTest(h,c,t,i)}}}},r.prototype.sortList=function(){// Update AABBs
for(var e=this.axisList,t=this.axisIndex,i=e.length,n=0;n!==i;n++){var a=e[n];a.aabbNeedsUpdate&&a.computeAABB()}// Sort the list
0===t?r.insertionSortX(e):1===t?r.insertionSortY(e):2===t&&r.insertionSortZ(e)},/**
 * Check if the bounds of two bodies overlap, along the given SAP axis.
 * @static
 * @method checkBounds
 * @param  {Body} bi
 * @param  {Body} bj
 * @param  {Number} axisIndex
 * @return {Boolean}
 */r.checkBounds=function(e,t,i){0===i?(n=e.position.x,r=t.position.x):1===i?(n=e.position.y,r=t.position.y):2===i&&(n=e.position.z,r=t.position.z);var n,r,a=e.boundingRadius;return r-t.boundingRadius<n+a},/**
 * Computes the variance of the body positions and estimates the best
 * axis to use. Will automatically set property .axisIndex.
 * @method autoDetectAxis
 */r.prototype.autoDetectAxis=function(){for(var e=0,t=0,i=0,n=0,r=0,a=0,s=this.axisList,o=s.length,l=1/o,h=0;h!==o;h++){var c=s[h],u=c.position.x;e+=u,t+=u*u;var d=c.position.y;i+=d,n+=d*d;var p=c.position.z;r+=p,a+=p*p}var f=t-e*e*l,m=n-i*i*l,g=a-r*r*l;f>m?f>g?this.axisIndex=0:this.axisIndex=2:m>g?this.axisIndex=1:this.axisIndex=2},/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param {array} result An array to store resulting bodies in.
 * @return {array}
 */r.prototype.aabbQuery=function(e,t,i){i=i||[],this.dirty&&(this.sortList(),this.dirty=!1);var n=this.axisIndex,r="x";1===n&&(r="y"),2===n&&(r="z");var a=this.axisList;t.lowerBound[r],t.upperBound[r];for(var s=0;s<a.length;s++){var o=a[s];o.aabbNeedsUpdate&&o.computeAABB(),o.aabb.overlaps(t)&&i.push(o)}return i}},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(e,t,i){t.exports=o,e("./Constraint");var n=e("./PointToPointConstraint"),r=e("../equations/ConeEquation"),a=e("../equations/RotationalEquation");e("../equations/ContactEquation");var s=e("../math/Vec3");/**
 * @class ConeTwistConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA]
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */function o(e,t,i){var o=void 0!==(i=i||{}).maxForce?i.maxForce:1e6,l=i.pivotA?i.pivotA.clone():new s,h=i.pivotB?i.pivotB.clone():new s;this.axisA=i.axisA?i.axisA.clone():new s,this.axisB=i.axisB?i.axisB.clone():new s,n.call(this,e,l,t,h,o),this.collideConnected=!!i.collideConnected,this.angle=void 0!==i.angle?i.angle:0;/**
     * @property {ConeEquation} coneEquation
     */var c=this.coneEquation=new r(e,t,i),u=this.twistEquation=new a(e,t,i);this.twistAngle=void 0!==i.twistAngle?i.twistAngle:0,// Make the cone equation push the bodies toward the cone axis, not outward
c.maxForce=0,c.minForce=-o,// Make the twist equation add torque toward the initial position
u.maxForce=0,u.minForce=-o,this.equations.push(c,u)}o.prototype=new n,o.constructor=o,new s,new s,o.prototype.update=function(){var e=this.bodyA,t=this.bodyB,i=this.coneEquation,r=this.twistEquation;n.prototype.update.call(this),// Update the axes to the cone constraint
e.vectorToWorldFrame(this.axisA,i.axisA),t.vectorToWorldFrame(this.axisB,i.axisB),// Update the world axes in the twist constraint
this.axisA.tangents(r.axisA,r.axisA),e.vectorToWorldFrame(r.axisA,r.axisA),this.axisB.tangents(r.axisB,r.axisB),t.vectorToWorldFrame(r.axisB,r.axisB),i.angle=this.angle,r.maxAngle=this.twistAngle}},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(e,t,i){t.exports=r;var n=e("../utils/Utils");/**
 * Constraint base class
 * @class Constraint
 * @author schteppe
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {boolean} [options.collideConnected=true]
 * @param {boolean} [options.wakeUpBodies=true]
 */function r(e,t,i){i=n.defaults(i,{collideConnected:!0,wakeUpBodies:!0}),/**
     * Equations to be solved in this constraint
     * @property equations
     * @type {Array}
     */this.equations=[],/**
     * @property {Body} bodyA
     */this.bodyA=e,/**
     * @property {Body} bodyB
     */this.bodyB=t,/**
     * @property {Number} id
     */this.id=r.idCounter++,/**
     * Set to true if you want the bodies to collide when they are connected.
     * @property collideConnected
     * @type {boolean}
     */this.collideConnected=i.collideConnected,i.wakeUpBodies&&(e&&e.wakeUp(),t&&t.wakeUp())}/**
 * Update all the equations with data.
 * @method update
 */r.prototype.update=function(){throw Error("method update() not implmemented in this Constraint subclass!")},/**
 * Enables all equations in the constraint.
 * @method enable
 */r.prototype.enable=function(){for(var e=this.equations,t=0;t<e.length;t++)e[t].enabled=!0},/**
 * Disables all equations in the constraint.
 * @method disable
 */r.prototype.disable=function(){for(var e=this.equations,t=0;t<e.length;t++)e[t].enabled=!1},r.idCounter=0},{"../utils/Utils":53}],14:[function(e,t,i){t.exports=a;var n=e("./Constraint"),r=e("../equations/ContactEquation");/**
 * Constrains two bodies to be at a constant distance from each others center of mass.
 * @class DistanceConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} [distance] The distance to keep. If undefined, it will be set to the current distance between bodyA and bodyB
 * @param {Number} [maxForce=1e6]
 * @extends Constraint
 */function a(e,t,i,a){n.call(this,e,t),void 0===i&&(i=e.position.distanceTo(t.position)),void 0===a&&(a=1e6),/**
     * @property {number} distance
     */this.distance=i;/**
     * @property {ContactEquation} distanceEquation
     */var s=this.distanceEquation=new r(e,t);this.equations.push(s),// Make it bidirectional
s.minForce=-a,s.maxForce=a}a.prototype=new n,a.prototype.update=function(){var e=this.bodyA,t=this.bodyB,i=this.distanceEquation,n=.5*this.distance,r=i.ni;t.position.vsub(e.position,r),r.normalize(),r.mult(n,i.ri),r.mult(-n,i.rj)}},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(e,t,i){t.exports=o,e("./Constraint");var n=e("./PointToPointConstraint"),r=e("../equations/RotationalEquation"),a=e("../equations/RotationalMotorEquation");e("../equations/ContactEquation");var s=e("../math/Vec3");/**
 * Hinge constraint. Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
 * @class HingeConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA] A point defined locally in bodyA. This defines the offset of axisA.
 * @param {Vec3} [options.axisA] An axis that bodyA can rotate around, defined locally in bodyA.
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */function o(e,t,i){var o=void 0!==(i=i||{}).maxForce?i.maxForce:1e6,l=i.pivotA?i.pivotA.clone():new s,h=i.pivotB?i.pivotB.clone():new s;n.call(this,e,l,t,h,o),(this.axisA=i.axisA?i.axisA.clone():new s(1,0,0)).normalize(),(this.axisB=i.axisB?i.axisB.clone():new s(1,0,0)).normalize();/**
     * @property {RotationalEquation} rotationalEquation1
     */var c=this.rotationalEquation1=new r(e,t,i),u=this.rotationalEquation2=new r(e,t,i),d=this.motorEquation=new a(e,t,o);d.enabled=!1,// Equations to be fed to the solver
this.equations.push(c,u,d)}o.prototype=new n,o.constructor=o,/**
 * @method enableMotor
 */o.prototype.enableMotor=function(){this.motorEquation.enabled=!0},/**
 * @method disableMotor
 */o.prototype.disableMotor=function(){this.motorEquation.enabled=!1},/**
 * @method setMotorSpeed
 * @param {number} speed
 */o.prototype.setMotorSpeed=function(e){this.motorEquation.targetVelocity=e},/**
 * @method setMotorMaxForce
 * @param {number} maxForce
 */o.prototype.setMotorMaxForce=function(e){this.motorEquation.maxForce=e,this.motorEquation.minForce=-e};var l=new s,h=new s;o.prototype.update=function(){var e=this.bodyA,t=this.bodyB,i=this.motorEquation,r=this.rotationalEquation1,a=this.rotationalEquation2,s=this.axisA,o=this.axisB;n.prototype.update.call(this),// Get world axes
e.quaternion.vmult(s,l),t.quaternion.vmult(o,h),l.tangents(r.axisA,a.axisA),r.axisB.copy(h),a.axisB.copy(h),this.motorEquation.enabled&&(e.quaternion.vmult(this.axisA,i.axisA),t.quaternion.vmult(this.axisB,i.axisB))}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(e,t,i){t.exports=s,e("./Constraint");var n=e("./PointToPointConstraint"),r=e("../equations/RotationalEquation");e("../equations/RotationalMotorEquation"),e("../equations/ContactEquation");var a=e("../math/Vec3");/**
 * Lock constraint. Will remove all degrees of freedom between the bodies.
 * @class LockConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */function s(e,t,i){var s=void 0!==(i=i||{}).maxForce?i.maxForce:1e6,o=new a,l=new a,h=new a;e.position.vadd(t.position,h),h.scale(.5,h),t.pointToLocalFrame(h,l),e.pointToLocalFrame(h,o),n.call(this,e,o,t,l,s);/**
     * @property {RotationalEquation} rotationalEquation1
     */var c=this.rotationalEquation1=new r(e,t,i),u=this.rotationalEquation2=new r(e,t,i),d=this.rotationalEquation3=new r(e,t,i);this.equations.push(c,u,d)}s.prototype=new n,s.constructor=s,new a,new a,s.prototype.update=function(){var e=this.bodyA,t=this.bodyB,i=(this.motorEquation,this.rotationalEquation1),r=this.rotationalEquation2,s=this.rotationalEquation3;n.prototype.update.call(this),e.vectorToWorldFrame(a.UNIT_X,i.axisA),t.vectorToWorldFrame(a.UNIT_Y,i.axisB),e.vectorToWorldFrame(a.UNIT_Y,r.axisA),t.vectorToWorldFrame(a.UNIT_Z,r.axisB),e.vectorToWorldFrame(a.UNIT_Z,s.axisA),t.vectorToWorldFrame(a.UNIT_X,s.axisB)}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(e,t,i){t.exports=s;var n=e("./Constraint"),r=e("../equations/ContactEquation"),a=e("../math/Vec3");/**
 * Connects two bodies at given offset points.
 * @class PointToPointConstraint
 * @extends Constraint
 * @constructor
 * @param {Body} bodyA
 * @param {Vec3} pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param {Body} bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
 * @param {Vec3} pivotB See pivotA.
 * @param {Number} maxForce The maximum force that should be applied to constrain the bodies.
 *
 * @example
 *     var bodyA = new Body({ mass: 1 });
 *     var bodyB = new Body({ mass: 1 });
 *     bodyA.position.set(-1, 0, 0);
 *     bodyB.position.set(1, 0, 0);
 *     bodyA.addShape(shapeA);
 *     bodyB.addShape(shapeB);
 *     world.addBody(bodyA);
 *     world.addBody(bodyB);
 *     var localPivotA = new Vec3(1, 0, 0);
 *     var localPivotB = new Vec3(-1, 0, 0);
 *     var constraint = new PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB);
 *     world.addConstraint(constraint);
 */function s(e,t,i,s,o){n.call(this,e,i),o=void 0!==o?o:1e6,/**
     * Pivot, defined locally in bodyA.
     * @property {Vec3} pivotA
     */this.pivotA=t?t.clone():new a,/**
     * Pivot, defined locally in bodyB.
     * @property {Vec3} pivotB
     */this.pivotB=s?s.clone():new a;/**
     * @property {ContactEquation} equationX
     */var l=this.equationX=new r(e,i),h=this.equationY=new r(e,i),c=this.equationZ=new r(e,i);// Equations to be fed to the solver
this.equations.push(l,h,c),// Make the equations bidirectional
l.minForce=h.minForce=c.minForce=-o,l.maxForce=h.maxForce=c.maxForce=o,l.ni.set(1,0,0),h.ni.set(0,1,0),c.ni.set(0,0,1)}s.prototype=new n,s.prototype.update=function(){var e=this.bodyA,t=this.bodyB,i=this.equationX,n=this.equationY,r=this.equationZ;// Rotate the pivots to world space
e.quaternion.vmult(this.pivotA,i.ri),t.quaternion.vmult(this.pivotB,i.rj),n.ri.copy(i.ri),n.rj.copy(i.rj),r.ri.copy(i.ri),r.rj.copy(i.rj)}},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(e,t,i){t.exports=a;var n=e("../math/Vec3");e("../math/Mat3");var r=e("./Equation");/**
 * Cone equation. Works to keep the given body world vectors aligned, or tilted within a given angle from each other.
 * @class ConeEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA] Local axis in A
 * @param {Vec3} [options.axisB] Local axis in B
 * @param {Vec3} [options.angle] The "cone angle" to keep
 * @param {number} [options.maxForce=1e6]
 * @extends Equation
 */function a(e,t,i){var a=void 0!==(i=i||{}).maxForce?i.maxForce:1e6;r.call(this,e,t,-a,a),this.axisA=i.axisA?i.axisA.clone():new n(1,0,0),this.axisB=i.axisB?i.axisB.clone():new n(0,1,0),/**
     * The cone angle to keep
     * @property {number} angle
     */this.angle=void 0!==i.angle?i.angle:0}a.prototype=new r,a.prototype.constructor=a;var s=new n,o=new n;a.prototype.computeB=function(e){var t=this.a,i=this.b,n=this.axisA,r=this.axisB,a=this.jacobianElementA,l=this.jacobianElementB;return(// Caluclate cross products
n.cross(r,s),r.cross(n,o),// The angle between two vector is:
// cos(theta) = a * b / (length(a) * length(b) = { len(a) = len(b) = 1 } = a * b
// g = a * b
// gdot = (b x a) * wi + (a x b) * wj
// G = [0 bxa 0 axb]
// W = [vi wi vj wj]
a.rotational.copy(o),l.rotational.copy(s),-(Math.cos(this.angle)-n.dot(r))*t-this.computeGW()*i-e*this.computeGiMf())}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(e,t,i){t.exports=a;var n=e("./Equation"),r=e("../math/Vec3");/**
 * Contact/non-penetration constraint equation
 * @class ContactEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @extends Equation
 */function a(e,t,i){i=void 0!==i?i:1e6,n.call(this,e,t,0,i),/**
     * @property restitution
     * @type {Number}
     */this.restitution=0,/**
     * World-oriented vector that goes from the center of bi to the contact point.
     * @property {Vec3} ri
     */this.ri=new r,/**
     * World-oriented vector that starts in body j position and goes to the contact point.
     * @property {Vec3} rj
     */this.rj=new r,/**
     * Contact normal, pointing out of body i.
     * @property {Vec3} ni
     */this.ni=new r}e("../math/Mat3"),a.prototype=new n,a.prototype.constructor=a;var s=new r,o=new r,l=new r;// Temp vectors
a.prototype.computeB=function(e){var t=this.a,i=this.b,n=this.bi,r=this.bj,a=this.ri,h=this.rj,c=n.velocity,u=n.angularVelocity,d=(n.force,n.torque,r.velocity),p=r.angularVelocity,f=(r.force,r.torque,this.jacobianElementA),m=this.jacobianElementB,g=this.ni;// Caluclate cross products
a.cross(g,s),h.cross(g,o),// g = xj+rj -(xi+ri)
// G = [ -ni  -rixn  ni  rjxn ]
g.negate(f.spatial),s.negate(f.rotational),m.spatial.copy(g),m.rotational.copy(o),// Calculate the penetration vector
l.copy(r.position),l.vadd(h,l),l.vsub(n.position,l),l.vsub(a,l);var v=g.dot(l),y=this.restitution+1;return-v*t-(y*d.dot(g)-y*c.dot(g)+p.dot(o)-u.dot(s))*i-e*this.computeGiMf()};var h=new r,c=new r,u=new r,d=new r,p=new r;/**
 * Get the current relative velocity in the contact point.
 * @method getImpactVelocityAlongNormal
 * @return {number}
 */a.prototype.getImpactVelocityAlongNormal=function(){return this.bi.position.vadd(this.ri,u),this.bj.position.vadd(this.rj,d),this.bi.getVelocityAtWorldPoint(u,h),this.bj.getVelocityAtWorldPoint(d,c),h.vsub(c,p),this.ni.dot(p)}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(e,t,i){t.exports=a;var n=e("../math/JacobianElement"),r=e("../math/Vec3");/**
 * Equation base class
 * @class Equation
 * @constructor
 * @author schteppe
 * @param {Body} bi
 * @param {Body} bj
 * @param {Number} minForce Minimum (read: negative max) force to be applied by the constraint.
 * @param {Number} maxForce Maximum (read: positive max) force to be applied by the constraint.
 */function a(e,t,i,r){this.id=a.id++,/**
     * @property {number} minForce
     */this.minForce=void 0===i?-1e6:i,/**
     * @property {number} maxForce
     */this.maxForce=void 0===r?1e6:r,/**
     * @property bi
     * @type {Body}
     */this.bi=e,/**
     * @property bj
     * @type {Body}
     */this.bj=t,/**
     * SPOOK parameter
     * @property {number} a
     */this.a=0,/**
     * SPOOK parameter
     * @property {number} b
     */this.b=0,/**
     * SPOOK parameter
     * @property {number} eps
     */this.eps=0,/**
     * @property {JacobianElement} jacobianElementA
     */this.jacobianElementA=new n,/**
     * @property {JacobianElement} jacobianElementB
     */this.jacobianElementB=new n,/**
     * @property {boolean} enabled
     * @default true
     */this.enabled=!0,// Set typical spook params
this.setSpookParams(1e7,4,1/60)}a.prototype.constructor=a,a.id=0,/**
 * Recalculates a,b,eps.
 * @method setSpookParams
 */a.prototype.setSpookParams=function(e,t,i){this.a=4/(i*(1+4*t)),this.b=4*t/(1+4*t),this.eps=4/(i*i*e*(1+4*t))},/**
 * Computes the RHS of the SPOOK equation
 * @method computeB
 * @return {Number}
 */a.prototype.computeB=function(e,t,i){var n=this.computeGW();return-this.computeGq()*e-n*t-this.computeGiMf()*i},/**
 * Computes G*q, where q are the generalized body coordinates
 * @method computeGq
 * @return {Number}
 */a.prototype.computeGq=function(){var e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.position,a=n.position;return e.spatial.dot(r)+t.spatial.dot(a)};var s=new r;/**
 * Computes G*W, where W are the body velocities
 * @method computeGW
 * @return {Number}
 */a.prototype.computeGW=function(){var e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.velocity,a=n.velocity,o=i.angularVelocity||s,l=n.angularVelocity||s;return e.multiplyVectors(r,o)+t.multiplyVectors(a,l)},/**
 * Computes G*Wlambda, where W are the body velocities
 * @method computeGWlambda
 * @return {Number}
 */a.prototype.computeGWlambda=function(){var e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.vlambda,a=n.vlambda,o=i.wlambda||s,l=n.wlambda||s;return e.multiplyVectors(r,o)+t.multiplyVectors(a,l)};/**
 * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
 * @method computeGiMf
 * @return {Number}
 */var o=new r,l=new r,h=new r,c=new r;a.prototype.computeGiMf=function(){var e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.force,a=i.torque,s=n.force,u=n.torque,d=i.invMassSolve,p=n.invMassSolve;return i.invInertiaWorldSolve?i.invInertiaWorldSolve.vmult(a,h):h.set(0,0,0),n.invInertiaWorldSolve?n.invInertiaWorldSolve.vmult(u,c):c.set(0,0,0),r.mult(d,o),s.mult(p,l),e.multiplyVectors(o,h)+t.multiplyVectors(l,c)};/**
 * Computes G*inv(M)*G'
 * @method computeGiMGt
 * @return {Number}
 */var u=new r;a.prototype.computeGiMGt=function(){var e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,n=this.bj,r=i.invMassSolve,a=n.invMassSolve,s=i.invInertiaWorldSolve,o=n.invInertiaWorldSolve,l=r+a;return s&&(s.vmult(e.rotational,u),l+=u.dot(e.rotational)),o&&(o.vmult(t.rotational,u),l+=u.dot(t.rotational)),l};var d=new r;new r,new r,new r,new r,new r,/**
 * Add constraint velocity to the bodies.
 * @method addToWlambda
 * @param {Number} deltalambda
 */a.prototype.addToWlambda=function(e){var t=this.jacobianElementA,i=this.jacobianElementB,n=this.bi,r=this.bj;// Add to linear velocity
// v_lambda += inv(M) * delta_lamba * G
t.spatial.mult(n.invMassSolve*e,d),n.vlambda.vadd(d,n.vlambda),i.spatial.mult(r.invMassSolve*e,d),r.vlambda.vadd(d,r.vlambda),n.invInertiaWorldSolve&&(n.invInertiaWorldSolve.vmult(t.rotational,d),d.mult(e,d),n.wlambda.vadd(d,n.wlambda)),r.invInertiaWorldSolve&&(r.invInertiaWorldSolve.vmult(i.rotational,d),d.mult(e,d),r.wlambda.vadd(d,r.wlambda))},/**
 * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
 * @method computeInvC
 * @param  {Number} eps
 * @return {Number}
 */a.prototype.computeC=function(){return this.computeGiMGt()+this.eps}},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(e,t,i){t.exports=a;var n=e("./Equation"),r=e("../math/Vec3");/**
 * Constrains the slipping in a contact along a tangent
 * @class FrictionEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
 * @extends Equation
 */function a(e,t,i){n.call(this,e,t,-i,i),this.ri=new r,this.rj=new r,this.t=new r}e("../math/Mat3"),a.prototype=new n,a.prototype.constructor=a;var s=new r,o=new r;a.prototype.computeB=function(e){this.a;var t=this.b,i=(this.bi,this.bj,this.ri),n=this.rj,r=this.t;// Caluclate cross products
i.cross(r,s),n.cross(r,o);// G = [-t -rixt t rjxt]
// And remember, this is a pure velocity constraint, g is always zero!
var a=this.jacobianElementA,l=this.jacobianElementB;return r.negate(a.spatial),s.negate(a.rotational),l.spatial.copy(r),l.rotational.copy(o),-this.computeGW()*t-e*this.computeGiMf()}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(e,t,i){t.exports=a;var n=e("../math/Vec3");e("../math/Mat3");var r=e("./Equation");/**
 * Rotational constraint. Works to keep the local vectors orthogonal to each other in world space.
 * @class RotationalEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {number} [options.maxForce]
 * @extends Equation
 */function a(e,t,i){var a=void 0!==(i=i||{}).maxForce?i.maxForce:1e6;r.call(this,e,t,-a,a),this.axisA=i.axisA?i.axisA.clone():new n(1,0,0),this.axisB=i.axisB?i.axisB.clone():new n(0,1,0),this.maxAngle=Math.PI/2}a.prototype=new r,a.prototype.constructor=a;var s=new n,o=new n;a.prototype.computeB=function(e){var t=this.a,i=this.b,n=this.axisA,r=this.axisB,a=this.jacobianElementA,l=this.jacobianElementB;return(// Caluclate cross products
n.cross(r,s),r.cross(n,o),// g = ni * nj
// gdot = (nj x ni) * wi + (ni x nj) * wj
// G = [0 njxni 0 nixnj]
// W = [vi wi vj wj]
a.rotational.copy(o),l.rotational.copy(s),-(Math.cos(this.maxAngle)-n.dot(r))*t-this.computeGW()*i-e*this.computeGiMf())}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(e,t,i){t.exports=a;var n=e("../math/Vec3");e("../math/Mat3");var r=e("./Equation");/**
 * Rotational motor constraint. Tries to keep the relative angular velocity of the bodies to a given value.
 * @class RotationalMotorEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} maxForce
 * @extends Equation
 */function a(e,t,i){i=void 0!==i?i:1e6,r.call(this,e,t,-i,i),/**
     * World oriented rotational axis
     * @property {Vec3} axisA
     */this.axisA=new n,/**
     * World oriented rotational axis
     * @property {Vec3} axisB
     */this.axisB=new n,/**
     * Motor velocity
     * @property {Number} targetVelocity
     */this.targetVelocity=0}a.prototype=new r,a.prototype.constructor=a,a.prototype.computeB=function(e){this.a;var t=this.b,i=(this.bi,this.bj,this.axisA),n=this.axisB,r=this.jacobianElementA,a=this.jacobianElementB;return(// g = 0
// gdot = axisA * wi - axisB * wj
// gdot = G * W = G * [vi wi vj wj]
// =>
// G = [0 axisA 0 -axisB]
r.rotational.copy(i),n.negate(a.rotational),-(this.computeGW()-this.targetVelocity)*t-e*this.computeGiMf())}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(e,t,i){var n=e("../utils/Utils");/**
 * Defines what happens when two materials meet.
 * @class ContactMaterial
 * @constructor
 * @param {Material} m1
 * @param {Material} m2
 * @param {object} [options]
 * @param {Number} [options.friction=0.3]
 * @param {Number} [options.restitution=0.3]
 * @param {number} [options.contactEquationStiffness=1e7]
 * @param {number} [options.contactEquationRelaxation=3]
 * @param {number} [options.frictionEquationStiffness=1e7]
 * @param {Number} [options.frictionEquationRelaxation=3]
 */function r(e,t,i){i=n.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),/**
     * Identifier of this material
     * @property {Number} id
     */this.id=r.idCounter++,/**
     * Participating materials
     * @property {Array} materials
     * @todo  Should be .materialA and .materialB instead
     */this.materials=[e,t],/**
     * Friction coefficient
     * @property {Number} friction
     */this.friction=i.friction,/**
     * Restitution coefficient
     * @property {Number} restitution
     */this.restitution=i.restitution,/**
     * Stiffness of the produced contact equations
     * @property {Number} contactEquationStiffness
     */this.contactEquationStiffness=i.contactEquationStiffness,/**
     * Relaxation time of the produced contact equations
     * @property {Number} contactEquationRelaxation
     */this.contactEquationRelaxation=i.contactEquationRelaxation,/**
     * Stiffness of the produced friction equations
     * @property {Number} frictionEquationStiffness
     */this.frictionEquationStiffness=i.frictionEquationStiffness,/**
     * Relaxation time of the produced friction equations
     * @property {Number} frictionEquationRelaxation
     */this.frictionEquationRelaxation=i.frictionEquationRelaxation}t.exports=r,r.idCounter=0},{"../utils/Utils":53}],25:[function(e,t,i){/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param {object} [options]
 * @author schteppe
 */function n(e){var t="";"string"==typeof(e=e||{})?(t=e,e={}):"object"==typeof e&&(t=""),/**
     * @property name
     * @type {String}
     */this.name=t,/**
     * material id.
     * @property id
     * @type {number}
     */this.id=n.idCounter++,/**
     * Friction for this material. If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
     * @property {number} friction
     */this.friction=void 0!==e.friction?e.friction:-1,/**
     * Restitution for this material. If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
     * @property {number} restitution
     */this.restitution=void 0!==e.restitution?e.restitution:-1}t.exports=n,n.idCounter=0},{}],26:[function(e,t,i){t.exports=r;var n=e("./Vec3");/**
 * An element containing 6 entries, 3 spatial and 3 rotational degrees of freedom.
 * @class JacobianElement
 * @constructor
 */function r(){/**
     * @property {Vec3} spatial
     */this.spatial=new n,/**
     * @property {Vec3} rotational
     */this.rotational=new n}/**
 * Multiply with other JacobianElement
 * @method multiplyElement
 * @param  {JacobianElement} element
 * @return {Number}
 */r.prototype.multiplyElement=function(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)},/**
 * Multiply with two vectors
 * @method multiplyVectors
 * @param  {Vec3} spatial
 * @param  {Vec3} rotational
 * @return {Number}
 */r.prototype.multiplyVectors=function(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}},{"./Vec3":30}],27:[function(e,t,i){t.exports=r;var n=e("./Vec3");/**
 * A 3x3 matrix.
 * @class Mat3
 * @constructor
 * @param array elements Array of nine elements. Optional.
 * @author schteppe / http://github.com/schteppe
 */function r(e){/**
     * A vector of length 9, containing all matrix elements
     * @property {Array} elements
     */e?this.elements=e:this.elements=[0,0,0,0,0,0,0,0,0]}/**
 * Sets the matrix to identity
 * @method identity
 * @todo Should perhaps be renamed to setIdentity() to be more clear.
 * @todo Create another function that immediately creates an identity matrix eg. eye()
 */r.prototype.identity=function(){var e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1},/**
 * Set all elements to zero
 * @method setZero
 */r.prototype.setZero=function(){var e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0},/**
 * Sets the matrix diagonal elements from a Vec3
 * @method setTrace
 * @param {Vec3} vec3
 */r.prototype.setTrace=function(e){var t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z},/**
 * Gets the matrix diagonal elements
 * @method getTrace
 * @return {Vec3}
 */r.prototype.getTrace=function(e){var e=e||new n,t=this.elements;e.x=t[0],e.y=t[4],e.z=t[8]},/**
 * Matrix-Vector multiplication
 * @method vmult
 * @param {Vec3} v The vector to multiply with
 * @param {Vec3} target Optional, target to save the result in.
 */r.prototype.vmult=function(e,t){t=t||new n;var i=this.elements,r=e.x,a=e.y,s=e.z;return t.x=i[0]*r+i[1]*a+i[2]*s,t.y=i[3]*r+i[4]*a+i[5]*s,t.z=i[6]*r+i[7]*a+i[8]*s,t},/**
 * Matrix-scalar multiplication
 * @method smult
 * @param {Number} s
 */r.prototype.smult=function(e){for(var t=0;t<this.elements.length;t++)this.elements[t]*=e},/**
 * Matrix multiplication
 * @method mmult
 * @param {Mat3} m Matrix to multiply with from left side.
 * @return {Mat3} The result.
 */r.prototype.mmult=function(e,t){for(var i=t||new r,n=0;n<3;n++)for(var a=0;a<3;a++){for(var s=0,o=0;o<3;o++)s+=e.elements[n+3*o]*this.elements[o+3*a];i.elements[n+3*a]=s}return i},/**
 * Scale each column of the matrix
 * @method scale
 * @param {Vec3} v
 * @return {Mat3} The result.
 */r.prototype.scale=function(e,t){t=t||new r;for(var i=this.elements,n=t.elements,a=0;3!==a;a++)n[3*a+0]=e.x*i[3*a+0],n[3*a+1]=e.y*i[3*a+1],n[3*a+2]=e.z*i[3*a+2];return t},/**
 * Solve Ax=b
 * @method solve
 * @param {Vec3} b The right hand side
 * @param {Vec3} target Optional. Target vector to save in.
 * @return {Vec3} The solution x
 * @todo should reuse arrays
 */r.prototype.solve=function(e,t){t=t||new n;for(var i=[],r=0;r<12;r++)i.push(0);for(r=0;r<3;r++)for(s=0;s<3;s++)i[r+4*s]=this.elements[r+3*s];i[3]=e.x,i[7]=e.y,i[11]=e.z;// Compute right upper triangular version of the matrix - Gauss elimination
var a,r,s,o,l=3;do{if(0===i[(r=3-l)+4*r])// the pivot is null, swap lines
{for(s=r+1;s<3;s++)if(0!==i[r+4*s]){o=4;do a=4-o,i[a+4*r]+=i[a+4*s];while(--o)break}}if(0!==i[r+4*r])for(s=r+1;s<3;s++){var h=i[r+4*s]/i[r+4*r];o=4;do i[(a=4-o)+4*s]=a<=r?0:i[a+4*s]-i[a+4*r]*h;while(--o)}}while(--l)if(// Get the solution
t.z=i[11]/i[10],t.y=(i[7]-i[6]*t.z)/i[5],t.x=(i[3]-i[2]*t.z-i[1]*t.y)/i[0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw"Could not solve equation! Got x=["+t.toString()+"], b=["+e.toString()+"], A=["+this.toString()+"]";return t},/**
 * Get an element in the matrix by index. Index starts at 0, not 1!!!
 * @method e
 * @param {Number} row
 * @param {Number} column
 * @param {Number} value Optional. If provided, the matrix element will be set to this value.
 * @return {Number}
 */r.prototype.e=function(e,t,i){if(void 0===i)return this.elements[t+3*e];this.elements[t+3*e]=i},/**
 * Copy another matrix into this matrix object.
 * @method copy
 * @param {Mat3} source
 * @return {Mat3} this
 */r.prototype.copy=function(e){for(var t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this},/**
 * Returns a string representation of the matrix.
 * @method toString
 * @return string
 */r.prototype.toString=function(){for(var e="",t=0;t<9;t++)e+=this.elements[t]+",";return e},/**
 * reverse the matrix
 * @method reverse
 * @param {Mat3} target Optional. Target matrix to save in.
 * @return {Mat3} The solution x
 */r.prototype.reverse=function(e){e=e||new r;for(var t=[],i=0;i<18;i++)t.push(0);for(i=0;i<3;i++)for(a=0;a<3;a++)t[i+6*a]=this.elements[i+3*a];t[3]=1,t[9]=0,t[15]=0,t[4]=0,t[10]=1,t[16]=0,t[5]=0,t[11]=0,t[17]=1;// Compute right upper triangular version of the matrix - Gauss elimination
var n,i,a,s,o=3;do{if(0===t[(i=3-o)+6*i])// the pivot is null, swap lines
{for(a=i+1;a<3;a++)if(0!==t[i+6*a]){s=6;do n=6-s,t[n+6*i]+=t[n+6*a];while(--s)break}}if(0!==t[i+6*i])for(a=i+1;a<3;a++){var l=t[i+6*a]/t[i+6*i];s=6;do t[(n=6-s)+6*a]=n<=i?0:t[n+6*a]-t[n+6*i]*l;while(--s)}}while(--o)// eliminate the upper left triangle of the matrix
i=2;do{a=i-1;do{var l=t[i+6*a]/t[i+6*i];s=6;do t[(n=6-s)+6*a]=t[n+6*a]-t[n+6*i]*l;while(--s)}while(a--)}while(--i)// operations on the diagonal
i=2;do{var l=1/t[i+6*i];s=6;do t[(n=6-s)+6*i]=t[n+6*i]*l;while(--s)}while(i--)i=2;do{a=2;do{if(isNaN(n=t[3+a+6*i])||n===1/0)throw"Could not reverse! A=["+this.toString()+"]";e.e(i,a,n)}while(a--)}while(i--)return e},/**
 * Set the matrix from a quaterion
 * @method setRotationFromQuaternion
 * @param {Quaternion} q
 */r.prototype.setRotationFromQuaternion=function(e){var t=e.x,i=e.y,n=e.z,r=e.w,a=t+t,s=i+i,o=n+n,l=t*a,h=t*s,c=t*o,u=i*s,d=i*o,p=n*o,f=r*a,m=r*s,g=r*o,v=this.elements;return v[0]=1-(u+p),v[1]=h-g,v[2]=c+m,v[3]=h+g,v[4]=1-(l+p),v[5]=d-f,v[6]=c-m,v[7]=d+f,v[8]=1-(l+u),this},/**
 * Transpose the matrix
 * @method transpose
 * @param  {Mat3} target Where to store the result.
 * @return {Mat3} The target Mat3, or a new Mat3 if target was omitted.
 */r.prototype.transpose=function(e){for(var t=(e=e||new r).elements,i=this.elements,n=0;3!==n;n++)for(var a=0;3!==a;a++)t[3*n+a]=i[3*a+n];return e}},{"./Vec3":30}],28:[function(e,t,i){t.exports=r;var n=e("./Vec3");/**
 * A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
 * @class Quaternion
 * @constructor
 * @param {Number} x Multiplier of the imaginary basis vector i.
 * @param {Number} y Multiplier of the imaginary basis vector j.
 * @param {Number} z Multiplier of the imaginary basis vector k.
 * @param {Number} w Multiplier of the real part.
 * @see http://en.wikipedia.org/wiki/Quaternion
 */function r(e,t,i,n){/**
     * @property {Number} x
     */this.x=void 0!==e?e:0,/**
     * @property {Number} y
     */this.y=void 0!==t?t:0,/**
     * @property {Number} z
     */this.z=void 0!==i?i:0,/**
     * The multiplier of the real quaternion basis vector.
     * @property {Number} w
     */this.w=void 0!==n?n:1}/**
 * Set the value of the quaternion.
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} w
 */r.prototype.set=function(e,t,i,n){this.x=e,this.y=t,this.z=i,this.w=n},/**
 * Convert to a readable format
 * @method toString
 * @return string
 */r.prototype.toString=function(){return this.x+","+this.y+","+this.z+","+this.w},/**
 * Convert to an Array
 * @method toArray
 * @return Array
 */r.prototype.toArray=function(){return[this.x,this.y,this.z,this.w]},/**
 * Set the quaternion components given an axis and an angle.
 * @method setFromAxisAngle
 * @param {Vec3} axis
 * @param {Number} angle in radians
 */r.prototype.setFromAxisAngle=function(e,t){var i=Math.sin(.5*t);this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(.5*t)},/**
 * Converts the quaternion to axis/angle representation.
 * @method toAxisAngle
 * @param {Vec3} targetAxis Optional. A vector object to reuse for storing the axis.
 * @return Array An array, first elemnt is the axis and the second is the angle in radians.
 */r.prototype.toAxisAngle=function(e){e=e||new n,this.normalize();var t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(// if s close to zero then direction of axis not important
e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]};var a=new n,s=new n;/**
 * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
 * @method setFromVectors
 * @param {Vec3} u
 * @param {Vec3} v
 */r.prototype.setFromVectors=function(e,t){if(e.isAntiparallelTo(t))e.tangents(a,s),this.setFromAxisAngle(a,Math.PI);else{var i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(Math.pow(e.norm(),2)*Math.pow(t.norm(),2))+e.dot(t),this.normalize()}};/**
 * Quaternion multiplication
 * @method mult
 * @param {Quaternion} q
 * @param {Quaternion} target Optional.
 * @return {Quaternion}
 */var o=new n,l=new n,h=new n;r.prototype.mult=function(e,t){t=t||new r;var i=this.w;return o.set(this.x,this.y,this.z),l.set(e.x,e.y,e.z),t.w=i*e.w-o.dot(l),o.cross(l,h),t.x=i*l.x+e.w*o.x+h.x,t.y=i*l.y+e.w*o.y+h.y,t.z=i*l.z+e.w*o.z+h.z,t},/**
 * Get the inverse quaternion rotation.
 * @method inverse
 * @param {Quaternion} target
 * @return {Quaternion}
 */r.prototype.inverse=function(e){var t=this.x,i=this.y,n=this.z,a=this.w;e=e||new r,this.conjugate(e);var s=1/(t*t+i*i+n*n+a*a);return e.x*=s,e.y*=s,e.z*=s,e.w*=s,e},/**
 * Get the quaternion conjugate
 * @method conjugate
 * @param {Quaternion} target
 * @return {Quaternion}
 */r.prototype.conjugate=function(e){return(e=e||new r).x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e},/**
 * Normalize the quaternion. Note that this changes the values of the quaternion.
 * @method normalize
 */r.prototype.normalize=function(){var e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===e?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e)},/**
 * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
 * @method normalizeFast
 * @see http://jsperf.com/fast-quaternion-normalization
 * @author unphased, https://github.com/unphased
 */r.prototype.normalizeFast=function(){var e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;0===e?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e)},/**
 * Multiply the quaternion by a vector
 * @method vmult
 * @param {Vec3} v
 * @param {Vec3} target Optional
 * @return {Vec3}
 */r.prototype.vmult=function(e,t){t=t||new n;var i=e.x,r=e.y,a=e.z,s=this.x,o=this.y,l=this.z,h=this.w,c=h*i+o*a-l*r,u=h*r+l*i-s*a,d=h*a+s*r-o*i,p=-s*i-o*r-l*a;return t.x=c*h+-(p*s)+-(u*l)- -(d*o),t.y=u*h+-(p*o)+-(d*s)- -(c*l),t.z=d*h+-(p*l)+-(c*o)- -(u*s),t},/**
 * Copies value of source to this quaternion.
 * @method copy
 * @param {Quaternion} source
 * @return {Quaternion} this
 */r.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this},/**
 * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
 * @method toEuler
 * @param {Vec3} target
 * @param string order Three-character string e.g. "YZX", which also is default.
 */r.prototype.toEuler=function(e,t){t=t||"YZX";var i,n,r,a=this.x,s=this.y,o=this.z,l=this.w;if("YZX"===t){var h=a*s+o*l;if(h>.499&&(i=2*Math.atan2(a,l),n=Math.PI/2,r=0),h<-.499&&(i=-2*Math.atan2(a,l),n=-Math.PI/2,r=0),isNaN(i)){var c=o*o;i=Math.atan2(2*s*l-2*a*o,1-2*(s*s)-2*c),n=Math.asin(2*h),r=Math.atan2(2*a*l-2*s*o,1-2*(a*a)-2*c)}}else throw Error("Euler order "+t+" not supported yet.");e.y=i,e.z=n,e.x=r},/**
 * See http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
 * @method setFromEuler
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {String} order The order to apply angles: 'XYZ' or 'YXZ' or any other combination
 */r.prototype.setFromEuler=function(e,t,i,n){var r=Math.cos(e/2),a=Math.cos(t/2),s=Math.cos(i/2),o=Math.sin(e/2),l=Math.sin(t/2),h=Math.sin(i/2);return"XYZ"===(n=n||"XYZ")?(this.x=o*a*s+r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s-o*l*h):"YXZ"===n?(this.x=o*a*s+r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s+o*l*h):"ZXY"===n?(this.x=o*a*s-r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s-o*l*h):"ZYX"===n?(this.x=o*a*s-r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s+o*l*h):"YZX"===n?(this.x=o*a*s+r*l*h,this.y=r*l*s+o*a*h,this.z=r*a*h-o*l*s,this.w=r*a*s-o*l*h):"XZY"===n&&(this.x=o*a*s-r*l*h,this.y=r*l*s-o*a*h,this.z=r*a*h+o*l*s,this.w=r*a*s+o*l*h),this},r.prototype.clone=function(){return new r(this.x,this.y,this.z,this.w)}},{"./Vec3":30}],29:[function(e,t,i){var n=e("./Vec3"),r=e("./Quaternion");/**
 * @class Transform
 * @constructor
 */function a(e){e=e||{},/**
	 * @property {Vec3} position
	 */this.position=new n,e.position&&this.position.copy(e.position),/**
	 * @property {Quaternion} quaternion
	 */this.quaternion=new r,e.quaternion&&this.quaternion.copy(e.quaternion)}t.exports=a;var s=new r;/**
 * @static
 * @method pointToLocaFrame
 * @param {Vec3} position
 * @param {Quaternion} quaternion
 * @param {Vec3} worldPoint
 * @param {Vec3} result
 */a.pointToLocalFrame=function(e,t,i,r){var r=r||new n;return i.vsub(e,r),t.conjugate(s),s.vmult(r,r),r},/**
 * Get a global point in local transform coordinates.
 * @method pointToLocal
 * @param  {Vec3} point
 * @param  {Vec3} result
 * @return {Vec3} The "result" vector object
 */a.prototype.pointToLocal=function(e,t){return a.pointToLocalFrame(this.position,this.quaternion,e,t)},/**
 * @static
 * @method pointToWorldFrame
 * @param {Vec3} position
 * @param {Vec3} quaternion
 * @param {Vec3} localPoint
 * @param {Vec3} result
 */a.pointToWorldFrame=function(e,t,i,r){var r=r||new n;return t.vmult(i,r),r.vadd(e,r),r},/**
 * Get a local point in global transform coordinates.
 * @method pointToWorld
 * @param  {Vec3} point
 * @param  {Vec3} result
 * @return {Vec3} The "result" vector object
 */a.prototype.pointToWorld=function(e,t){return a.pointToWorldFrame(this.position,this.quaternion,e,t)},a.prototype.vectorToWorldFrame=function(e,t){var t=t||new n;return this.quaternion.vmult(e,t),t},a.vectorToWorldFrame=function(e,t,i){return e.vmult(t,i),i},a.vectorToLocalFrame=function(e,t,i,r){var r=r||new n;return t.w*=-1,t.vmult(i,r),t.w*=-1,r}},{"./Quaternion":28,"./Vec3":30}],30:[function(e,t,i){t.exports=r;var n=e("./Mat3");/**
 * 3-dimensional vector
 * @class Vec3
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @author schteppe
 * @example
 *     var v = new Vec3(1, 2, 3);
 *     console.log('x=' + v.x); // x=1
 */function r(e,t,i){/**
     * @property x
     * @type {Number}
     */this.x=e||0,/**
     * @property y
     * @type {Number}
     */this.y=t||0,/**
     * @property z
     * @type {Number}
     */this.z=i||0}/**
 * @static
 * @property {Vec3} ZERO
 */r.ZERO=new r(0,0,0),/**
 * @static
 * @property {Vec3} UNIT_X
 */r.UNIT_X=new r(1,0,0),/**
 * @static
 * @property {Vec3} UNIT_Y
 */r.UNIT_Y=new r(0,1,0),/**
 * @static
 * @property {Vec3} UNIT_Z
 */r.UNIT_Z=new r(0,0,1),/**
 * Vector cross product
 * @method cross
 * @param {Vec3} v
 * @param {Vec3} target Optional. Target to save in.
 * @return {Vec3}
 */r.prototype.cross=function(e,t){var i=e.x,n=e.y,a=e.z,s=this.x,o=this.y,l=this.z;return(t=t||new r).x=o*a-l*n,t.y=l*i-s*a,t.z=s*n-o*i,t},/**
 * Set the vectors' 3 elements
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return Vec3
 */r.prototype.set=function(e,t,i){return this.x=e,this.y=t,this.z=i,this},/**
 * Set all components of the vector to zero.
 * @method setZero
 */r.prototype.setZero=function(){this.x=this.y=this.z=0},/**
 * Vector addition
 * @method vadd
 * @param {Vec3} v
 * @param {Vec3} target Optional.
 * @return {Vec3}
 */r.prototype.vadd=function(e,t){if(!t)return new r(this.x+e.x,this.y+e.y,this.z+e.z);t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z},/**
 * Vector subtraction
 * @method vsub
 * @param {Vec3} v
 * @param {Vec3} target Optional. Target to save in.
 * @return {Vec3}
 */r.prototype.vsub=function(e,t){if(!t)return new r(this.x-e.x,this.y-e.y,this.z-e.z);t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z},/**
 * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
 * @method crossmat
 * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
 * @return {Mat3}
 */r.prototype.crossmat=function(){return new n([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])},/**
 * Normalize the vector. Note that this changes the values in the vector.
 * @method normalize
 * @return {Number} Returns the norm of the vector
 */r.prototype.normalize=function(){var e=this.x,t=this.y,i=this.z,n=Math.sqrt(e*e+t*t+i*i);if(n>0){var r=1/n;this.x*=r,this.y*=r,this.z*=r}else // Make something up
this.x=0,this.y=0,this.z=0;return n},/**
 * Get the version of this vector that is of length 1.
 * @method unit
 * @param {Vec3} target Optional target to save in
 * @return {Vec3} Returns the unit vector
 */r.prototype.unit=function(e){e=e||new r;var t=this.x,i=this.y,n=this.z,a=Math.sqrt(t*t+i*i+n*n);return a>0?(a=1/a,e.x=t*a,e.y=i*a,e.z=n*a):(e.x=1,e.y=0,e.z=0),e},/**
 * Get the length of the vector
 * @method norm
 * @return {Number}
 * @deprecated Use .length() instead
 */r.prototype.norm=function(){var e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)},/**
 * Get the length of the vector
 * @method length
 * @return {Number}
 */r.prototype.length=r.prototype.norm,/**
 * Get the squared length of the vector
 * @method norm2
 * @return {Number}
 * @deprecated Use .lengthSquared() instead.
 */r.prototype.norm2=function(){return this.dot(this)},/**
 * Get the squared length of the vector.
 * @method lengthSquared
 * @return {Number}
 */r.prototype.lengthSquared=r.prototype.norm2,/**
 * Get distance from this point to another point
 * @method distanceTo
 * @param  {Vec3} p
 * @return {Number}
 */r.prototype.distanceTo=function(e){var t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,s=e.z;return Math.sqrt((r-t)*(r-t)+(a-i)*(a-i)+(s-n)*(s-n))},/**
 * Get squared distance from this point to another point
 * @method distanceSquared
 * @param  {Vec3} p
 * @return {Number}
 */r.prototype.distanceSquared=function(e){var t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,s=e.z;return(r-t)*(r-t)+(a-i)*(a-i)+(s-n)*(s-n)},/**
 * Multiply all the components of the vector with a scalar.
 * @deprecated Use .scale instead
 * @method mult
 * @param {Number} scalar
 * @param {Vec3} target The vector to save the result in.
 * @return {Vec3}
 * @deprecated Use .scale() instead
 */r.prototype.mult=function(e,t){t=t||new r;var i=this.x,n=this.y,a=this.z;return t.x=e*i,t.y=e*n,t.z=e*a,t},/**
 * Multiply the vector with a scalar.
 * @method scale
 * @param {Number} scalar
 * @param {Vec3} target
 * @return {Vec3}
 */r.prototype.scale=r.prototype.mult,/**
 * Calculate dot product
 * @method dot
 * @param {Vec3} v
 * @return {Number}
 */r.prototype.dot=function(e){return this.x*e.x+this.y*e.y+this.z*e.z},/**
 * @method isZero
 * @return bool
 */r.prototype.isZero=function(){return 0===this.x&&0===this.y&&0===this.z},/**
 * Make the vector point in the opposite direction.
 * @method negate
 * @param {Vec3} target Optional target to save in
 * @return {Vec3}
 */r.prototype.negate=function(e){return(e=e||new r).x=-this.x,e.y=-this.y,e.z=-this.z,e};/**
 * Compute two artificial tangents to the vector
 * @method tangents
 * @param {Vec3} t1 Vector object to save the first tangent in
 * @param {Vec3} t2 Vector object to save the second tangent in
 */var a=new r,s=new r;r.prototype.tangents=function(e,t){var i=this.norm();if(i>0){var n=1/i;a.set(this.x*n,this.y*n,this.z*n),.9>Math.abs(a.x)?s.set(1,0,0):s.set(0,1,0),a.cross(s,e),a.cross(e,t)}else // The normal length is zero, make something up
e.set(1,0,0),t.set(0,1,0)},/**
 * Converts to a more readable format
 * @method toString
 * @return string
 */r.prototype.toString=function(){return this.x+","+this.y+","+this.z},/**
 * Converts to an array
 * @method toArray
 * @return Array
 */r.prototype.toArray=function(){return[this.x,this.y,this.z]},/**
 * Copies value of source to this vector.
 * @method copy
 * @param {Vec3} source
 * @return {Vec3} this
 */r.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this.z=e.z,this},/**
 * Do a linear interpolation between two vectors
 * @method lerp
 * @param {Vec3} v
 * @param {Number} t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
 * @param {Vec3} target
 */r.prototype.lerp=function(e,t,i){var n=this.x,r=this.y,a=this.z;i.x=n+(e.x-n)*t,i.y=r+(e.y-r)*t,i.z=a+(e.z-a)*t},/**
 * Check if a vector equals is almost equal to another one.
 * @method almostEquals
 * @param {Vec3} v
 * @param {Number} precision
 * @return bool
 */r.prototype.almostEquals=function(e,t){return void 0===t&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)},/**
 * Check if a vector is almost zero
 * @method almostZero
 * @param {Number} precision
 */r.prototype.almostZero=function(e){return void 0===e&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)};var o=new r;/**
 * Check if the vector is anti-parallel to another vector.
 * @method isAntiparallelTo
 * @param  {Vec3}  v
 * @param  {Number}  precision Set to zero for exact comparisons
 * @return {Boolean}
 */r.prototype.isAntiparallelTo=function(e,t){return this.negate(o),o.almostEquals(e,t)},/**
 * Clone the vector
 * @method clone
 * @return {Vec3}
 */r.prototype.clone=function(){return new r(this.x,this.y,this.z)}},{"./Mat3":27}],31:[function(e,t,i){t.exports=h;var n=e("../utils/EventTarget");e("../shapes/Shape");var r=e("../math/Vec3"),a=e("../math/Mat3"),s=e("../math/Quaternion");e("../material/Material");var o=e("../collision/AABB"),l=e("../shapes/Box");/**
 * Base class for all body types.
 * @class Body
 * @constructor
 * @extends EventTarget
 * @param {object} [options]
 * @param {Vec3} [options.position]
 * @param {Vec3} [options.velocity]
 * @param {Vec3} [options.angularVelocity]
 * @param {Quaternion} [options.quaternion]
 * @param {number} [options.mass]
 * @param {Material} [options.material]
 * @param {number} [options.type]
 * @param {number} [options.linearDamping=0.01]
 * @param {number} [options.angularDamping=0.01]
 * @param {boolean} [options.allowSleep=true]
 * @param {number} [options.sleepSpeedLimit=0.1]
 * @param {number} [options.sleepTimeLimit=1]
 * @param {number} [options.collisionFilterGroup=1]
 * @param {number} [options.collisionFilterMask=1]
 * @param {boolean} [options.fixedRotation=false]
 * @param {Body} [options.shape]
 * @example
 *     var body = new Body({
 *         mass: 1
 *     });
 *     var shape = new Sphere(1);
 *     body.addShape(shape);
 *     world.add(body);
 */function h(e){e=e||{},n.apply(this),this.id=h.idCounter++,/**
     * Reference to the world the body is living in
     * @property world
     * @type {World}
     */this.world=null,/**
     * Callback function that is used BEFORE stepping the system. Use it to apply forces, for example. Inside the function, "this" will refer to this Body object.
     * @property preStep
     * @type {Function}
     * @deprecated Use World events instead
     */this.preStep=null,/**
     * Callback function that is used AFTER stepping the system. Inside the function, "this" will refer to this Body object.
     * @property postStep
     * @type {Function}
     * @deprecated Use World events instead
     */this.postStep=null,this.vlambda=new r,/**
     * @property {Number} collisionFilterGroup
     */this.collisionFilterGroup="number"==typeof e.collisionFilterGroup?e.collisionFilterGroup:1,/**
     * @property {Number} collisionFilterMask
     */this.collisionFilterMask="number"==typeof e.collisionFilterMask?e.collisionFilterMask:1,/**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
     * @property {Number} collisionResponse
     */this.collisionResponse=!0,/**
     * @property position
     * @type {Vec3}
     */this.position=new r,e.position&&this.position.copy(e.position),/**
     * @property {Vec3} previousPosition
     */this.previousPosition=new r,/**
     * Initial position of the body
     * @property initPosition
     * @type {Vec3}
     */this.initPosition=new r,/**
     * @property velocity
     * @type {Vec3}
     */this.velocity=new r,e.velocity&&this.velocity.copy(e.velocity),/**
     * @property initVelocity
     * @type {Vec3}
     */this.initVelocity=new r,/**
     * Linear force on the body
     * @property force
     * @type {Vec3}
     */this.force=new r;var t="number"==typeof e.mass?e.mass:0;/**
     * @property mass
     * @type {Number}
     * @default 0
     */this.mass=t,/**
     * @property invMass
     * @type {Number}
     */this.invMass=t>0?1/t:0,/**
     * @property material
     * @type {Material}
     */this.material=e.material||null,/**
     * @property linearDamping
     * @type {Number}
     */this.linearDamping="number"==typeof e.linearDamping?e.linearDamping:.01,/**
     * One of: Body.DYNAMIC, Body.STATIC and Body.KINEMATIC.
     * @property type
     * @type {Number}
     */this.type=t<=0?h.STATIC:h.DYNAMIC,typeof e.type==typeof h.STATIC&&(this.type=e.type),/**
     * If true, the body will automatically fall to sleep.
     * @property allowSleep
     * @type {Boolean}
     * @default true
     */this.allowSleep=void 0===e.allowSleep||e.allowSleep,/**
     * Current sleep state.
     * @property sleepState
     * @type {Number}
     */this.sleepState=0,/**
     * If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
     * @property sleepSpeedLimit
     * @type {Number}
     * @default 0.1
     */this.sleepSpeedLimit=void 0!==e.sleepSpeedLimit?e.sleepSpeedLimit:.1,/**
     * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
     * @property sleepTimeLimit
     * @type {Number}
     * @default 1
     */this.sleepTimeLimit=void 0!==e.sleepTimeLimit?e.sleepTimeLimit:1,this.timeLastSleepy=0,this._wakeUpAfterNarrowphase=!1,/**
     * Rotational force on the body, around center of mass
     * @property {Vec3} torque
     */this.torque=new r,/**
     * Orientation of the body
     * @property quaternion
     * @type {Quaternion}
     */this.quaternion=new s,e.quaternion&&this.quaternion.copy(e.quaternion),/**
     * @property initQuaternion
     * @type {Quaternion}
     */this.initQuaternion=new s,/**
     * @property angularVelocity
     * @type {Vec3}
     */this.angularVelocity=new r,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),/**
     * @property initAngularVelocity
     * @type {Vec3}
     */this.initAngularVelocity=new r,this.interpolatedPosition=new r,this.interpolatedQuaternion=new s,/**
     * @property shapes
     * @type {array}
     */this.shapes=[],/**
     * @property shapeOffsets
     * @type {array}
     */this.shapeOffsets=[],/**
     * @property shapeOrientations
     * @type {array}
     */this.shapeOrientations=[],/**
     * @property inertia
     * @type {Vec3}
     */this.inertia=new r,/**
     * @property {Vec3} invInertia
     */this.invInertia=new r,/**
     * @property {Mat3} invInertiaWorld
     */this.invInertiaWorld=new a,this.invMassSolve=0,/**
     * @property {Vec3} invInertiaSolve
     */this.invInertiaSolve=new r,/**
     * @property {Mat3} invInertiaWorldSolve
     */this.invInertiaWorldSolve=new a,/**
     * Set to true if you don't want the body to rotate. Make sure to run .updateMassProperties() after changing this.
     * @property {Boolean} fixedRotation
     * @default false
     */this.fixedRotation=void 0!==e.fixedRotation&&e.fixedRotation,/**
     * @property {Number} angularDamping
     */this.angularDamping=void 0!==e.angularDamping?e.angularDamping:.01,/**
     * @property aabb
     * @type {AABB}
     */this.aabb=new o,/**
     * Indicates if the AABB needs to be updated before use.
     * @property aabbNeedsUpdate
     * @type {Boolean}
     */this.aabbNeedsUpdate=!0,this.wlambda=new r,e.shape&&this.addShape(e.shape),this.updateMassProperties()}h.prototype=new n,h.prototype.constructor=h,/**
 * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
 * @static
 * @property DYNAMIC
 * @type {Number}
 */h.DYNAMIC=1,/**
 * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
 * @static
 * @property STATIC
 * @type {Number}
 */h.STATIC=2,/**
 * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
 * @static
 * @property KINEMATIC
 * @type {Number}
 */h.KINEMATIC=4,/**
 * @static
 * @property AWAKE
 * @type {number}
 */h.AWAKE=0,/**
 * @static
 * @property SLEEPY
 * @type {number}
 */h.SLEEPY=1,/**
 * @static
 * @property SLEEPING
 * @type {number}
 */h.SLEEPING=2,h.idCounter=0,/**
 * Wake the body up.
 * @method wakeUp
 */h.prototype.wakeUp=function(){var e=this.sleepState;this.sleepState=0,e===h.SLEEPING&&this.dispatchEvent({type:"wakeup"})},/**
 * Force body sleep
 * @method sleep
 */h.prototype.sleep=function(){this.sleepState=h.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0)},h.sleepyEvent={type:"sleepy"},h.sleepEvent={type:"sleep"},/**
 * Called every timestep to update internal sleep timer and change sleep state if needed.
 * @method sleepTick
 * @param {Number} time The world time in seconds
 */h.prototype.sleepTick=function(e){if(this.allowSleep){var t=this.sleepState,i=this.velocity.norm2()+this.angularVelocity.norm2(),n=Math.pow(this.sleepSpeedLimit,2);t===h.AWAKE&&i<n?(this.sleepState=h.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(h.sleepyEvent)):t===h.SLEEPY&&i>n?this.wakeUp():t===h.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(h.sleepEvent))}},/**
 * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
 * @method updateSolveMassProperties
 */h.prototype.updateSolveMassProperties=function(){this.sleepState===h.SLEEPING||this.type===h.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))},/**
 * Convert a world point to local body frame.
 * @method pointToLocalFrame
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */h.prototype.pointToLocalFrame=function(e,t){var t=t||new r;return e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t},/**
 * Convert a world vector to local body frame.
 * @method vectorToLocalFrame
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */h.prototype.vectorToLocalFrame=function(e,t){var t=t||new r;return this.quaternion.conjugate().vmult(e,t),t},/**
 * Convert a local body point to world frame.
 * @method pointToWorldFrame
 * @param  {Vec3} localPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */h.prototype.pointToWorldFrame=function(e,t){var t=t||new r;return this.quaternion.vmult(e,t),t.vadd(this.position,t),t},/**
 * Convert a local body point to world frame.
 * @method vectorToWorldFrame
 * @param  {Vec3} localVector
 * @param  {Vec3} result
 * @return {Vec3}
 */h.prototype.vectorToWorldFrame=function(e,t){var t=t||new r;return this.quaternion.vmult(e,t),t};var c=new r,u=new s;/**
 * Add a shape to the body with a local offset and orientation.
 * @method addShape
 * @param {Shape} shape
 * @param {Vec3} offset
 * @param {Quaternion} quaternion
 * @return {Body} The body object, for chainability.
 */h.prototype.addShape=function(e,t,i){var n=new r,a=new s;return t&&n.copy(t),i&&a.copy(i),this.shapes.push(e),this.shapeOffsets.push(n),this.shapeOrientations.push(a),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,this},/**
 * Update the bounding radius of the body. Should be done if any of the shapes are changed.
 * @method updateBoundingRadius
 */h.prototype.updateBoundingRadius=function(){for(var e=this.shapes,t=this.shapeOffsets,i=e.length,n=0,r=0;r!==i;r++){var a=e[r];a.updateBoundingSphereRadius();var s=t[r].norm(),o=a.boundingSphereRadius;s+o>n&&(n=s+o)}this.boundingRadius=n};var d=new o;/**
 * Updates the .aabb
 * @method computeAABB
 * @todo rename to updateAABB()
 */h.prototype.computeAABB=function(){for(var e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,n=e.length,r=this.quaternion,a=this.aabb,s=0;s!==n;s++){var o=e[s];// Get shape world quaternion
i[s].mult(r,u),// Get shape world position
u.vmult(t[s],c),c.vadd(this.position,c),// vec2.rotate(offset, shapeOffsets[i], bodyAngle);
// vec2.add(offset, offset, this.position);
// Get shape AABB
o.calculateWorldAABB(c,u,d.lowerBound,d.upperBound),0===s?a.copy(d):a.extend(d)}this.aabbNeedsUpdate=!1};var p=new a,f=new a;new a,/**
 * Update .inertiaWorld and .invInertiaWorld
 * @method updateInertiaWorld
 */h.prototype.updateInertiaWorld=function(e){var t=this.invInertia;(t.x!==t.y||t.y!==t.z||e)&&(p.setRotationFromQuaternion(this.quaternion),p.transpose(f),p.scale(t,p),p.mmult(f,this.invInertiaWorld));/*
    this.quaternion.vmult(this.inertia,this.inertiaWorld);
    this.quaternion.vmult(this.invInertia,this.invInertiaWorld);
    */};/**
 * Apply force to a world point. This could for example be a point on the Body surface. Applying force this way will add to Body.force and Body.torque.
 * @method applyForce
 * @param  {Vec3} force The amount of force to add.
 * @param  {Vec3} worldPoint A world point to apply the force on.
 */var m=new r,g=new r;h.prototype.applyForce=function(e,t){this.type===h.DYNAMIC&&(t.vsub(this.position,m),m.cross(e,g),// Add linear force
this.force.vadd(e,this.force),// Add rotational force
this.torque.vadd(g,this.torque))};/**
 * Apply force to a local point in the body.
 * @method applyLocalForce
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */var v=new r,y=new r;h.prototype.applyLocalForce=function(e,t){this.type===h.DYNAMIC&&(// Transform the force vector to world space
this.vectorToWorldFrame(e,v),this.pointToWorldFrame(t,y),this.applyForce(v,y))};/**
 * Apply impulse to a world point. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
 * @method applyImpulse
 * @param  {Vec3} impulse The amount of impulse to add.
 * @param  {Vec3} worldPoint A world point to apply the force on.
 */var x=new r,_=new r,w=new r;h.prototype.applyImpulse=function(e,t){this.type===h.DYNAMIC&&(t.vsub(this.position,x),_.copy(e),_.mult(this.invMass,_),// Add linear impulse
this.velocity.vadd(_,this.velocity),x.cross(e,w),/*
    rotVelo.x *= this.invInertia.x;
    rotVelo.y *= this.invInertia.y;
    rotVelo.z *= this.invInertia.z;
    */this.invInertiaWorld.vmult(w,w),// Add rotational Impulse
this.angularVelocity.vadd(w,this.angularVelocity))};/**
 * Apply locally-defined impulse to a local point in the body.
 * @method applyLocalImpulse
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */var b=new r,M=new r;h.prototype.applyLocalImpulse=function(e,t){this.type===h.DYNAMIC&&(// Transform the force vector to world space
this.vectorToWorldFrame(e,b),this.pointToWorldFrame(t,M),this.applyImpulse(b,M))};var S=new r;/**
 * Should be called whenever you change the body shape or mass.
 * @method updateMassProperties
 */h.prototype.updateMassProperties=function(){this.invMass=this.mass>0?1/this.mass:0;var e=this.inertia,t=this.fixedRotation;// Approximate with AABB box
this.computeAABB(),S.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),l.calculateInertia(S,this.mass,e),this.invInertia.set(e.x>0&&!t?1/e.x:0,e.y>0&&!t?1/e.y:0,e.z>0&&!t?1/e.z:0),this.updateInertiaWorld(!0)},/**
 * Get world velocity of a point in the body.
 * @method getVelocityAtWorldPoint
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3} The result vector.
 */h.prototype.getVelocityAtWorldPoint=function(e,t){var i=new r;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(e,t,i){e("./Body");var n=e("../math/Vec3"),r=e("../math/Quaternion");e("../collision/RaycastResult");var a=e("../collision/Ray"),s=e("../objects/WheelInfo");/**
 * Vehicle helper class that casts rays from the wheel positions towards the ground and applies forces.
 * @class RaycastVehicle
 * @constructor
 * @param {object} [options]
 * @param {Body} [options.chassisBody] The car chassis body.
 * @param {integer} [options.indexRightAxis] Axis to use for right. x=0, y=1, z=2
 * @param {integer} [options.indexLeftAxis]
 * @param {integer} [options.indexUpAxis]
 */function o(e){/**
     * @property {Body} chassisBody
     */this.chassisBody=e.chassisBody,/**
     * An array of WheelInfo objects.
     * @property {array} wheelInfos
     */this.wheelInfos=[],/**
     * Will be set to true if the car is sliding.
     * @property {boolean} sliding
     */this.sliding=!1,/**
     * @property {World} world
     */this.world=null,/**
     * Index of the right axis, 0=x, 1=y, 2=z
     * @property {integer} indexRightAxis
     * @default 1
     */this.indexRightAxis=void 0!==e.indexRightAxis?e.indexRightAxis:1,/**
     * Index of the forward axis, 0=x, 1=y, 2=z
     * @property {integer} indexForwardAxis
     * @default 0
     */this.indexForwardAxis=void 0!==e.indexForwardAxis?e.indexForwardAxis:0,/**
     * Index of the up axis, 0=x, 1=y, 2=z
     * @property {integer} indexUpAxis
     * @default 2
     */this.indexUpAxis=void 0!==e.indexUpAxis?e.indexUpAxis:2}t.exports=o,new n,new n,new n;var l=new n,h=new n,c=new n;new a,/**
 * Add a wheel. For information about the options, see WheelInfo.
 * @method addWheel
 * @param {object} [options]
 */o.prototype.addWheel=function(e){e=e||{};var t=new s(e),i=this.wheelInfos.length;return this.wheelInfos.push(t),i},/**
 * Set the steering value of a wheel.
 * @method setSteeringValue
 * @param {number} value
 * @param {integer} wheelIndex
 */o.prototype.setSteeringValue=function(e,t){this.wheelInfos[t].steering=e},new n,/**
 * Set the wheel force to apply on one of the wheels each time step
 * @method applyEngineForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */o.prototype.applyEngineForce=function(e,t){this.wheelInfos[t].engineForce=e},/**
 * Set the braking force of a wheel
 * @method setBrake
 * @param {number} brake
 * @param {integer} wheelIndex
 */o.prototype.setBrake=function(e,t){this.wheelInfos[t].brake=e},/**
 * Add the vehicle including its constraints to the world.
 * @method addToWorld
 * @param {World} world
 */o.prototype.addToWorld=function(e){this.constraints,e.add(this.chassisBody);var t=this;this.preStepCallback=function(){t.updateVehicle(e.dt)},e.addEventListener("preStep",this.preStepCallback),this.world=e},/**
 * Get one of the wheel axles, world-oriented.
 * @private
 * @method getVehicleAxisWorld
 * @param  {integer} axisIndex
 * @param  {Vec3} result
 */o.prototype.getVehicleAxisWorld=function(e,t){t.set(0===e?1:0,1===e?1:0,2===e?1:0),this.chassisBody.vectorToWorldFrame(t,t)},o.prototype.updateVehicle=function(e){for(var t=this.wheelInfos,i=t.length,r=this.chassisBody,a=0;a<i;a++)this.updateWheelTransform(a);this.currentVehicleSpeedKmHour=3.6*r.velocity.norm();var s=new n;this.getVehicleAxisWorld(this.indexForwardAxis,s),0>s.dot(r.velocity)&&(this.currentVehicleSpeedKmHour*=-1);// simulate suspension
for(var a=0;a<i;a++)this.castRay(t[a]);this.updateSuspension(e);for(var o=new n,l=new n,a=0;a<i;a++){//apply suspension force
var h=t[a],c=h.suspensionForce;c>h.maxSuspensionForce&&(c=h.maxSuspensionForce),h.raycastResult.hitNormalWorld.scale(c*e,o),h.raycastResult.hitPointWorld.vsub(r.position,l),r.applyImpulse(o,h.raycastResult.hitPointWorld/*relpos*/)}this.updateFriction(e);var u=new n,d=new n,p=new n;for(a=0;a<i;a++){var h=t[a];//var relpos = new Vec3();
//wheel.chassisConnectionPointWorld.vsub(chassisBody.position, relpos);
r.getVelocityAtWorldPoint(h.chassisConnectionPointWorld,p);// Hack to get the rotation in the correct direction
var f=1;if(1===this.indexUpAxis&&(f=-1),h.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,d);var m=d.dot(h.raycastResult.hitNormalWorld);h.raycastResult.hitNormalWorld.scale(m,u),d.vsub(u,d);var g=d.dot(p);h.deltaRotation=f*g*e/h.radius}(h.sliding||!h.isInContact)&&0!==h.engineForce&&h.useCustomSlidingRotationalSpeed&&(h.deltaRotation=(h.engineForce>0?1:-1)*h.customSlidingRotationalSpeed*e),Math.abs(h.brake)>Math.abs(h.engineForce)&&(h.deltaRotation=0),h.rotation+=h.deltaRotation,h.deltaRotation*=.99}},o.prototype.updateSuspension=function(e){for(var t=this.chassisBody.mass,i=this.wheelInfos,n=i.length,r=0;r<n;r++){var a=i[r];if(a.isInContact){var s,o=a.suspensionRestLength-a.suspensionLength;s=a.suspensionStiffness*o*a.clippedInvContactDotSuspension;// Damper
var l=a.suspensionRelativeVelocity;s-=(l<0?a.dampingCompression:a.dampingRelaxation)*l,a.suspensionForce=s*t,a.suspensionForce<0&&(a.suspensionForce=0)}else a.suspensionForce=0}},/**
 * Remove the vehicle including its constraints from the world.
 * @method removeFromWorld
 * @param {World} world
 */o.prototype.removeFromWorld=function(e){this.constraints,e.remove(this.chassisBody),e.removeEventListener("preStep",this.preStepCallback),this.world=null};var u=new n,d=new n;o.prototype.castRay=function(e){this.updateWheelTransformWorld(e);var t=this.chassisBody,i=-1,r=e.suspensionRestLength+e.radius;e.directionWorld.scale(r,u);var a=e.chassisConnectionPointWorld;a.vadd(u,d);var s=e.raycastResult;s.reset();// Turn off ray collision with the chassis temporarily
var o=t.collisionResponse;t.collisionResponse=!1,// Cast ray against world
this.world.rayTest(a,d,s),t.collisionResponse=o;var l=s.body;if(e.raycastResult.groundObject=0,l){i=s.distance,e.raycastResult.hitNormalWorld=s.hitNormalWorld,e.isInContact=!0;var h=s.distance;e.suspensionLength=h-e.radius;// clamp on max suspension travel
var c=e.suspensionRestLength-e.maxSuspensionTravel,p=e.suspensionRestLength+e.maxSuspensionTravel;e.suspensionLength<c&&(e.suspensionLength=c),e.suspensionLength>p&&(e.suspensionLength=p,e.raycastResult.reset());var f=e.raycastResult.hitNormalWorld.dot(e.directionWorld),m=new n;t.getVelocityAtWorldPoint(e.raycastResult.hitPointWorld,m);var g=e.raycastResult.hitNormalWorld.dot(m);if(f>=-.1)e.suspensionRelativeVelocity=0,e.clippedInvContactDotSuspension=10;else{var v=-1/f;e.suspensionRelativeVelocity=g*v,e.clippedInvContactDotSuspension=v}}else //put wheel info as in rest position
e.suspensionLength=e.suspensionRestLength+0*e.maxSuspensionTravel,e.suspensionRelativeVelocity=0,e.directionWorld.scale(-1,e.raycastResult.hitNormalWorld),e.clippedInvContactDotSuspension=1;return i},o.prototype.updateWheelTransformWorld=function(e){e.isInContact=!1;var t=this.chassisBody;t.pointToWorldFrame(e.chassisConnectionPointLocal,e.chassisConnectionPointWorld),t.vectorToWorldFrame(e.directionLocal,e.directionWorld),t.vectorToWorldFrame(e.axleLocal,e.axleWorld)},/**
 * Update one of the wheel transform.
 * Note when rendering wheels: during each step, wheel transforms are updated BEFORE the chassis; ie. their position becomes invalid after the step. Thus when you render wheels, you must update wheel transforms before rendering them. See raycastVehicle demo for an example.
 * @method updateWheelTransform
 * @param {integer} wheelIndex The wheel index to update.
 */o.prototype.updateWheelTransform=function(e){var t=this.wheelInfos[e];this.updateWheelTransformWorld(t),t.directionLocal.scale(-1,l),h.copy(t.axleLocal),l.cross(h,c),c.normalize(),h.normalize();// Rotate around steering over the wheelAxle
var i=t.steering,n=new r;n.setFromAxisAngle(l,i);var a=new r;a.setFromAxisAngle(h,t.rotation);// World rotation of the wheel
var s=t.worldTransform.quaternion;this.chassisBody.quaternion.mult(n,s),s.mult(a,s),s.normalize();// world position of the wheel
var o=t.worldTransform.position;o.copy(t.directionWorld),o.scale(t.suspensionLength,o),o.vadd(t.chassisConnectionPointWorld,o)};var p=[new n(1,0,0),new n(0,1,0),new n(0,0,1)];/**
 * Get the world transform of one of the wheels
 * @method getWheelTransformWorld
 * @param  {integer} wheelIndex
 * @return {Transform}
 */o.prototype.getWheelTransformWorld=function(e){return this.wheelInfos[e].worldTransform};var f=new n,m=[],g=[];o.prototype.updateFriction=function(e){for(var t=this.wheelInfos,i=t.length,r=this.chassisBody,a=0;a<i;a++){var s=t[a],o=s.raycastResult.body;s.sideImpulse=0,s.forwardImpulse=0,g[a]||(g[a]=new n),m[a]||(m[a]=new n)}for(var a=0;a<i;a++){var s=t[a],o=s.raycastResult.body;if(o){var l=m[a];// Get world axle
this.getWheelTransformWorld(a).vectorToWorldFrame(p[this.indexRightAxis],l);var h=s.raycastResult.hitNormalWorld,c=l.dot(h);h.scale(c,f),l.vsub(f,l),l.normalize(),h.cross(l,g[a]),g[a].normalize(),s.sideImpulse=//bilateral constraint between two dynamic objects
function(e,t,i,n,r,a){if(r.norm2()>1.1)return 0;// no impulse
e.getVelocityAtWorldPoint(t,E),i.getVelocityAtWorldPoint(n,T),E.vsub(T,A);var a=-.2*r.dot(A)*(1/(e.invMass+i.invMass));return a}(r,s.raycastResult.hitPointWorld,o,s.raycastResult.hitPointWorld,l),s.sideImpulse*=1}}this.sliding=!1;for(var a=0;a<i;a++){var s=t[a],o=s.raycastResult.body,u=0;if(s.slipInfo=1,o){var d=s.brake?s.brake:0;u=function(e,t,i,n,r){var a=0;return(// contactPosWorld.vsub(body0.position, rel_pos1);
// contactPosWorld.vsub(body1.position, rel_pos2);
e.getVelocityAtWorldPoint(i,v),t.getVelocityAtWorldPoint(i,y),v.vsub(y,x),r<// calculate j that moves us to zero relative velocity
(a=-n.dot(x)*(1/(S(e,i,n)+S(t,i,n))))&&(a=r),a<-r&&(a=-r),a)}(r,o,s.raycastResult.hitPointWorld,g[a],d)+s.engineForce*e;// rollingFriction = 0;
var _=d/u;s.slipInfo*=_}if(//switch between active rolling (throttle), braking and non-active rolling friction (nthrottle/break)
s.forwardImpulse=0,s.skidInfo=1,o){s.skidInfo=1;var w=s.suspensionForce*e*s.frictionSlip,b=w*w;s.forwardImpulse=u;var M=.5*s.forwardImpulse,R=1*s.sideImpulse,C=M*M+R*R;if(s.sliding=!1,C>b){this.sliding=!0,s.sliding=!0;var _=w/Math.sqrt(C);s.skidInfo*=_}}}if(this.sliding)for(var a=0;a<i;a++){var s=t[a];0!==s.sideImpulse&&s.skidInfo<1&&(s.forwardImpulse*=s.skidInfo,s.sideImpulse*=s.skidInfo)}// apply the impulses
for(var a=0;a<i;a++){var s=t[a],P=new n;if(//wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, rel_pos);
// cannons applyimpulse is using world coord for the position
P.copy(s.raycastResult.hitPointWorld),0!==s.forwardImpulse){var L=new n;g[a].scale(s.forwardImpulse,L),r.applyImpulse(L,P)}if(0!==s.sideImpulse){var o=s.raycastResult.body,N=new n;//wheel.raycastResult.hitPointWorld.vsub(groundObject.position, rel_pos2);
N.copy(s.raycastResult.hitPointWorld);var I=new n;m[a].scale(s.sideImpulse,I),// Scale the relative position in the up direction with rollInfluence.
// If rollInfluence is 1, the impulse will be applied on the hitPoint (easy to roll over), if it is zero it will be applied in the same plane as the center of mass (not easy to roll over).
r.pointToLocalFrame(P,P),P["xyz"[this.indexUpAxis]]*=s.rollInfluence,r.pointToWorldFrame(P,P),r.applyImpulse(I,P),//apply friction impulse on the ground
I.scale(-1,I),o.applyImpulse(I,N)}}};var v=new n,y=new n,x=new n,_=new n,w=new n,b=new n,M=new n;function S(e,t,i){return t.vsub(e.position,_),_.cross(i,w),e.invInertiaWorld.vmult(w,M),M.cross(_,b),e.invMass+i.dot(b)}var E=new n,T=new n,A=new n},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(e,t,i){var n=e("./Body"),r=e("../shapes/Sphere"),a=e("../shapes/Box"),s=e("../math/Vec3"),o=e("../constraints/HingeConstraint");/**
 * Simple vehicle helper class with spherical rigid body wheels.
 * @class RigidVehicle
 * @constructor
 * @param {Body} [options.chassisBody]
 */function l(e){if(this.wheelBodies=[],/**
     * @property coordinateSystem
     * @type {Vec3}
     */this.coordinateSystem=void 0===e.coordinateSystem?new s(1,2,3):e.coordinateSystem.clone(),/**
     * @property {Body} chassisBody
     */this.chassisBody=e.chassisBody,!this.chassisBody){// No chassis body given. Create it!
var t=new a(new s(5,2,.5));this.chassisBody=new n(1,t)}/**
     * @property constraints
     * @type {Array}
     */this.constraints=[],this.wheelAxes=[],this.wheelForces=[]}t.exports=l,/**
 * Add a wheel
 * @method addWheel
 * @param {object} options
 * @param {boolean} [options.isFrontWheel]
 * @param {Vec3} [options.position] Position of the wheel, locally in the chassis body.
 * @param {Vec3} [options.direction] Slide direction of the wheel along the suspension.
 * @param {Vec3} [options.axis] Axis of rotation of the wheel, locally defined in the chassis.
 * @param {Body} [options.body] The wheel body.
 */l.prototype.addWheel=function(e){var t=(e=e||{}).body;t||(t=new n(1,new r(1.2))),this.wheelBodies.push(t),this.wheelForces.push(0),new s;var i=void 0!==e.position?e.position.clone():new s,a=new s;this.chassisBody.pointToWorldFrame(i,a),t.position.set(a.x,a.y,a.z);// Constrain wheel
var l=void 0!==e.axis?e.axis.clone():new s(0,1,0);this.wheelAxes.push(l);var h=new o(this.chassisBody,t,{pivotA:i,axisA:l,pivotB:s.ZERO,axisB:l,collideConnected:!1});return this.constraints.push(h),this.wheelBodies.length-1},/**
 * Set the steering value of a wheel.
 * @method setSteeringValue
 * @param {number} value
 * @param {integer} wheelIndex
 * @todo check coordinateSystem
 */l.prototype.setSteeringValue=function(e,t){// Set angle of the hinge axis
var i=this.wheelAxes[t],n=Math.cos(e),r=Math.sin(e),a=i.x,s=i.y;this.constraints[t].axisA.set(n*a-r*s,r*a+n*s,0)},/**
 * Set the target rotational speed of the hinge constraint.
 * @method setMotorSpeed
 * @param {number} value
 * @param {integer} wheelIndex
 */l.prototype.setMotorSpeed=function(e,t){var i=this.constraints[t];i.enableMotor(),i.motorTargetVelocity=e},/**
 * Set the target rotational speed of the hinge constraint.
 * @method disableMotor
 * @param {number} value
 * @param {integer} wheelIndex
 */l.prototype.disableMotor=function(e){this.constraints[e].disableMotor()};var h=new s;/**
 * Set the wheel force to apply on one of the wheels each time step
 * @method setWheelForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */l.prototype.setWheelForce=function(e,t){this.wheelForces[t]=e},/**
 * Apply a torque on one of the wheels.
 * @method applyWheelForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */l.prototype.applyWheelForce=function(e,t){var i=this.wheelAxes[t],n=this.wheelBodies[t],r=n.torque;i.scale(e,h),n.vectorToWorldFrame(h,h),r.vadd(h,r)},/**
 * Add the vehicle including its constraints to the world.
 * @method addToWorld
 * @param {World} world
 */l.prototype.addToWorld=function(e){for(var t=this.constraints,i=this.wheelBodies.concat([this.chassisBody]),n=0;n<i.length;n++)e.add(i[n]);for(var n=0;n<t.length;n++)e.addConstraint(t[n]);e.addEventListener("preStep",this._update.bind(this))},l.prototype._update=function(){for(var e=this.wheelForces,t=0;t<e.length;t++)this.applyWheelForce(e[t],t)},/**
 * Remove the vehicle including its constraints from the world.
 * @method removeFromWorld
 * @param {World} world
 */l.prototype.removeFromWorld=function(e){for(var t=this.constraints,i=this.wheelBodies.concat([this.chassisBody]),n=0;n<i.length;n++)e.remove(i[n]);for(var n=0;n<t.length;n++)e.removeConstraint(t[n])};var c=new s;/**
 * Get current rotational velocity of a wheel
 * @method getWheelSpeed
 * @param {integer} wheelIndex
 */l.prototype.getWheelSpeed=function(e){var t=this.wheelAxes[e],i=this.wheelBodies[e].angularVelocity;return this.chassisBody.vectorToWorldFrame(t,c),i.dot(c)}},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(e,t,i){t.exports=r,e("../shapes/Shape");var n=e("../math/Vec3");/**
 * Smoothed-particle hydrodynamics system
 * @class SPHSystem
 * @constructor
 */function r(){this.particles=[],/**
     * Density of the system (kg/m3).
     * @property {number} density
     */this.density=1,/**
     * Distance below which two particles are considered to be neighbors.
     * It should be adjusted so there are about 15-20 neighbor particles within this radius.
     * @property {number} smoothingRadius
     */this.smoothingRadius=1,this.speedOfSound=1,/**
     * Viscosity of the system.
     * @property {number} viscosity
     */this.viscosity=.01,this.eps=1e-6,// Stuff Computed per particle
this.pressures=[],this.densities=[],this.neighbors=[]}e("../math/Quaternion"),e("../shapes/Particle"),e("../objects/Body"),e("../material/Material"),/**
 * Add a particle to the system.
 * @method add
 * @param {Body} particle
 */r.prototype.add=function(e){this.particles.push(e),this.neighbors.length<this.particles.length&&this.neighbors.push([])},/**
 * Remove a particle from the system.
 * @method remove
 * @param {Body} particle
 */r.prototype.remove=function(e){var t=this.particles.indexOf(e);-1!==t&&(this.particles.splice(t,1),this.neighbors.length>this.particles.length&&this.neighbors.pop())};/**
 * Get neighbors within smoothing volume, save in the array neighbors
 * @method getNeighbors
 * @param {Body} particle
 * @param {Array} neighbors
 */var a=new n;r.prototype.getNeighbors=function(e,t){for(var i=this.particles.length,n=e.id,r=this.smoothingRadius*this.smoothingRadius,s=0;s!==i;s++){var o=this.particles[s];o.position.vsub(e.position,a),n!==o.id&&a.norm2()<r&&t.push(o)}};// Temp vectors for calculation
var s=new n,o=new n,l=new n,h=new n,c=new n,u=new n;// Relative velocity
r.prototype.update=function(){for(var e=this.particles.length,t=this.speedOfSound,i=this.eps,n=0;n!==e;n++){var r=this.particles[n],a=this.neighbors[n];// Current particle
// Get neighbors
a.length=0,this.getNeighbors(r,a),a.push(this.particles[n]);for(var d=a.length,p=0,f=0;f!==d;f++){//printf("Current particle has position %f %f %f\n",objects[id].pos.x(),objects[id].pos.y(),objects[id].pos.z());
r.position.vsub(a[f].position,s);var m=s.norm(),g=this.w(m);p+=a[f].mass*g}// Save
this.densities[n]=p,this.pressures[n]=t*t*(this.densities[n]-this.density)}for(var n=0;n!==e;n++){var v,y,x=this.particles[n];o.set(0,0,0),l.set(0,0,0);//printf("Neighbors: ");
for(var a=this.neighbors[n],d=a.length,f=0;f!==d;f++){var _=a[f];//printf("%d ",nj);
// Get r once for all..
x.position.vsub(_.position,c);var w=c.norm();// Pressure contribution
v=-_.mass*(this.pressures[n]/(this.densities[n]*this.densities[n]+i)+this.pressures[f]/(this.densities[f]*this.densities[f]+i)),this.gradw(c,h),// Add to pressure acceleration
h.mult(v,h),o.vadd(h,o),// Viscosity contribution
_.velocity.vsub(x.velocity,u),u.mult(1/(1e-4+this.densities[n]*this.densities[f])*this.viscosity*_.mass,u),y=this.nablaw(w),u.mult(y,u),// Add to viscosity acceleration
l.vadd(u,l)}// Calculate force
l.mult(x.mass,l),o.mult(x.mass,o),// Add force to particles
x.force.vadd(l,x.force),x.force.vadd(o,x.force)}},// Calculate the weight using the W(r) weightfunction
r.prototype.w=function(e){// 315
var t=this.smoothingRadius;return 315/(64*Math.PI*Math.pow(t,9))*Math.pow(t*t-e*e,3)},// calculate gradient of the weight function
r.prototype.gradw=function(e,t){var i=e.norm(),n=this.smoothingRadius;e.mult(945/(32*Math.PI*Math.pow(n,9))*Math.pow(n*n-i*i,2),t)},// Calculate nabla(W)
r.prototype.nablaw=function(e){var t=this.smoothingRadius;return 945/(32*Math.PI*Math.pow(t,9))*(t*t-e*e)*(7*e*e-3*t*t)}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(e,t,i){var n=e("../math/Vec3");/**
 * A spring, connecting two bodies.
 *
 * @class Spring
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Object} [options]
 * @param {number} [options.restLength]   A number > 0. Default: 1
 * @param {number} [options.stiffness]    A number >= 0. Default: 100
 * @param {number} [options.damping]      A number >= 0. Default: 1
 * @param {Vec3}  [options.worldAnchorA] Where to hook the spring to body A, in world coordinates.
 * @param {Vec3}  [options.worldAnchorB]
 * @param {Vec3}  [options.localAnchorA] Where to hook the spring to body A, in local body coordinates.
 * @param {Vec3}  [options.localAnchorB]
 */function r(e,t,i){i=i||{},/**
     * Rest length of the spring.
     * @property restLength
     * @type {number}
     */this.restLength="number"==typeof i.restLength?i.restLength:1,/**
     * Stiffness of the spring.
     * @property stiffness
     * @type {number}
     */this.stiffness=i.stiffness||100,/**
     * Damping of the spring.
     * @property damping
     * @type {number}
     */this.damping=i.damping||1,/**
     * First connected body.
     * @property bodyA
     * @type {Body}
     */this.bodyA=e,/**
     * Second connected body.
     * @property bodyB
     * @type {Body}
     */this.bodyB=t,/**
     * Anchor for bodyA in local bodyA coordinates.
     * @property localAnchorA
     * @type {Vec3}
     */this.localAnchorA=new n,/**
     * Anchor for bodyB in local bodyB coordinates.
     * @property localAnchorB
     * @type {Vec3}
     */this.localAnchorB=new n,i.localAnchorA&&this.localAnchorA.copy(i.localAnchorA),i.localAnchorB&&this.localAnchorB.copy(i.localAnchorB),i.worldAnchorA&&this.setWorldAnchorA(i.worldAnchorA),i.worldAnchorB&&this.setWorldAnchorB(i.worldAnchorB)}t.exports=r,/**
 * Set the anchor point on body A, using world coordinates.
 * @method setWorldAnchorA
 * @param {Vec3} worldAnchorA
 */r.prototype.setWorldAnchorA=function(e){this.bodyA.pointToLocalFrame(e,this.localAnchorA)},/**
 * Set the anchor point on body B, using world coordinates.
 * @method setWorldAnchorB
 * @param {Vec3} worldAnchorB
 */r.prototype.setWorldAnchorB=function(e){this.bodyB.pointToLocalFrame(e,this.localAnchorB)},/**
 * Get the anchor point on body A, in world coordinates.
 * @method getWorldAnchorA
 * @param {Vec3} result The vector to store the result in.
 */r.prototype.getWorldAnchorA=function(e){this.bodyA.pointToWorldFrame(this.localAnchorA,e)},/**
 * Get the anchor point on body B, in world coordinates.
 * @method getWorldAnchorB
 * @param {Vec3} result The vector to store the result in.
 */r.prototype.getWorldAnchorB=function(e){this.bodyB.pointToWorldFrame(this.localAnchorB,e)};var a=new n,s=new n,o=new n,l=new n,h=new n,c=new n,u=new n,d=new n,p=new n,f=new n,m=new n;/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */r.prototype.applyForce=function(){var e=this.stiffness,t=this.damping,i=this.restLength,n=this.bodyA,r=this.bodyB;// Get world anchors
this.getWorldAnchorA(h),this.getWorldAnchorB(c),// Get offset points
h.vsub(n.position,u),c.vsub(r.position,d),// Compute distance vector between world anchor points
c.vsub(h,a);var g=a.norm();s.copy(a),s.normalize(),// Compute relative velocity of the anchor points, u
r.velocity.vsub(n.velocity,o),// Add rotational velocity
r.angularVelocity.cross(d,m),o.vadd(m,o),n.angularVelocity.cross(u,m),o.vsub(m,o),// F = - k * ( x - L ) - D * ( u )
s.mult(-e*(g-i)-t*o.dot(s),l),// Add forces to bodies
n.force.vsub(l,n.force),r.force.vadd(l,r.force),// Angular force
u.cross(l,p),d.cross(l,f),n.torque.vsub(p,n.torque),r.torque.vadd(f,r.torque)}},{"../math/Vec3":30}],36:[function(e,t,i){var n=e("../math/Vec3"),r=e("../math/Transform"),a=e("../collision/RaycastResult"),s=e("../utils/Utils");/**
 * @class WheelInfo
 * @constructor
 * @param {Object} [options]
 *
 * @param {Vec3} [options.chassisConnectionPointLocal]
 * @param {Vec3} [options.chassisConnectionPointWorld]
 * @param {Vec3} [options.directionLocal]
 * @param {Vec3} [options.directionWorld]
 * @param {Vec3} [options.axleLocal]
 * @param {Vec3} [options.axleWorld]
 * @param {number} [options.suspensionRestLength=1]
 * @param {number} [options.suspensionMaxLength=2]
 * @param {number} [options.radius=1]
 * @param {number} [options.suspensionStiffness=100]
 * @param {number} [options.dampingCompression=10]
 * @param {number} [options.dampingRelaxation=10]
 * @param {number} [options.frictionSlip=10000]
 * @param {number} [options.steering=0]
 * @param {number} [options.rotation=0]
 * @param {number} [options.deltaRotation=0]
 * @param {number} [options.rollInfluence=0.01]
 * @param {number} [options.maxSuspensionForce]
 * @param {boolean} [options.isFrontWheel=true]
 * @param {number} [options.clippedInvContactDotSuspension=1]
 * @param {number} [options.suspensionRelativeVelocity=0]
 * @param {number} [options.suspensionForce=0]
 * @param {number} [options.skidInfo=0]
 * @param {number} [options.suspensionLength=0]
 * @param {number} [options.maxSuspensionTravel=1]
 * @param {boolean} [options.useCustomSlidingRotationalSpeed=false]
 * @param {number} [options.customSlidingRotationalSpeed=-0.1]
 */function o(e){e=s.defaults(e,{chassisConnectionPointLocal:new n,chassisConnectionPointWorld:new n,directionLocal:new n,directionWorld:new n,axleLocal:new n,axleWorld:new n,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:1e4,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),/**
     * Max travel distance of the suspension, in meters.
     * @property {number} maxSuspensionTravel
     */this.maxSuspensionTravel=e.maxSuspensionTravel,/**
     * Speed to apply to the wheel rotation when the wheel is sliding.
     * @property {number} customSlidingRotationalSpeed
     */this.customSlidingRotationalSpeed=e.customSlidingRotationalSpeed,/**
     * If the customSlidingRotationalSpeed should be used.
     * @property {Boolean} useCustomSlidingRotationalSpeed
     */this.useCustomSlidingRotationalSpeed=e.useCustomSlidingRotationalSpeed,/**
     * @property {Boolean} sliding
     */this.sliding=!1,/**
     * Connection point, defined locally in the chassis body frame.
     * @property {Vec3} chassisConnectionPointLocal
     */this.chassisConnectionPointLocal=e.chassisConnectionPointLocal.clone(),/**
     * @property {Vec3} chassisConnectionPointWorld
     */this.chassisConnectionPointWorld=e.chassisConnectionPointWorld.clone(),/**
     * @property {Vec3} directionLocal
     */this.directionLocal=e.directionLocal.clone(),/**
     * @property {Vec3} directionWorld
     */this.directionWorld=e.directionWorld.clone(),/**
     * @property {Vec3} axleLocal
     */this.axleLocal=e.axleLocal.clone(),/**
     * @property {Vec3} axleWorld
     */this.axleWorld=e.axleWorld.clone(),/**
     * @property {number} suspensionRestLength
     */this.suspensionRestLength=e.suspensionRestLength,/**
     * @property {number} suspensionMaxLength
     */this.suspensionMaxLength=e.suspensionMaxLength,/**
     * @property {number} radius
     */this.radius=e.radius,/**
     * @property {number} suspensionStiffness
     */this.suspensionStiffness=e.suspensionStiffness,/**
     * @property {number} dampingCompression
     */this.dampingCompression=e.dampingCompression,/**
     * @property {number} dampingRelaxation
     */this.dampingRelaxation=e.dampingRelaxation,/**
     * @property {number} frictionSlip
     */this.frictionSlip=e.frictionSlip,/**
     * @property {number} steering
     */this.steering=0,/**
     * Rotation value, in radians.
     * @property {number} rotation
     */this.rotation=0,/**
     * @property {number} deltaRotation
     */this.deltaRotation=0,/**
     * @property {number} rollInfluence
     */this.rollInfluence=e.rollInfluence,/**
     * @property {number} maxSuspensionForce
     */this.maxSuspensionForce=e.maxSuspensionForce,/**
     * @property {number} engineForce
     */this.engineForce=0,/**
     * @property {number} brake
     */this.brake=0,/**
     * @property {number} isFrontWheel
     */this.isFrontWheel=e.isFrontWheel,/**
     * @property {number} clippedInvContactDotSuspension
     */this.clippedInvContactDotSuspension=1,/**
     * @property {number} suspensionRelativeVelocity
     */this.suspensionRelativeVelocity=0,/**
     * @property {number} suspensionForce
     */this.suspensionForce=0,/**
     * @property {number} skidInfo
     */this.skidInfo=0,/**
     * @property {number} suspensionLength
     */this.suspensionLength=0,/**
     * @property {number} sideImpulse
     */this.sideImpulse=0,/**
     * @property {number} forwardImpulse
     */this.forwardImpulse=0,/**
     * The result from raycasting
     * @property {RaycastResult} raycastResult
     */this.raycastResult=new a,/**
     * Wheel world transform
     * @property {Transform} worldTransform
     */this.worldTransform=new r,/**
     * @property {boolean} isInContact
     */this.isInContact=!1}t.exports=o;var l=new n,h=new n,l=new n;o.prototype.updateWheel=function(e){var t=this.raycastResult;if(this.isInContact){var i=t.hitNormalWorld.dot(t.directionWorld);t.hitPointWorld.vsub(e.position,h),e.getVelocityAtWorldPoint(h,l);var n=t.hitNormalWorld.dot(l);if(i>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=10;else{var r=-1/i;this.suspensionRelativeVelocity=n*r,this.clippedInvContactDotSuspension=r}}else // Not in contact : position wheel in a nice (rest length) position
t.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,t.directionWorld.scale(-1,t.hitNormalWorld),this.clippedInvContactDotSuspension=1}},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(e,t,i){t.exports=s;var n=e("./Shape"),r=e("../math/Vec3"),a=e("./ConvexPolyhedron");/**
 * A 3d box shape.
 * @class Box
 * @constructor
 * @param {Vec3} halfExtents
 * @author schteppe
 * @extends Shape
 */function s(e){n.call(this),this.type=n.types.BOX,/**
     * @property halfExtents
     * @type {Vec3}
     */this.halfExtents=e,/**
     * Used by the contact generator to make contacts with other convex polyhedra for example
     * @property convexPolyhedronRepresentation
     * @type {ConvexPolyhedron}
     */this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}s.prototype=new n,s.prototype.constructor=s,/**
 * Updates the local convex polyhedron representation used for some collisions.
 * @method updateConvexPolyhedronRepresentation
 */s.prototype.updateConvexPolyhedronRepresentation=function(){var e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,n=[new r(-e,-t,-i),new r(e,-t,-i),new r(e,t,-i),new r(-e,t,-i),new r(-e,-t,i),new r(e,-t,i),new r(e,t,i),new r(-e,t,i)];new r(0,0,1),new r(0,1,0),new r(1,0,0);var s=new a(n,[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]]);this.convexPolyhedronRepresentation=s,s.material=this.material},/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3}
 */s.prototype.calculateLocalInertia=function(e,t){return t=t||new r,s.calculateInertia(this.halfExtents,e,t),t},s.calculateInertia=function(e,t,i){i.x=1/12*t*(2*e.y*2*e.y+2*e.z*2*e.z),i.y=1/12*t*(2*e.x*2*e.x+2*e.z*2*e.z),i.z=1/12*t*(2*e.y*2*e.y+2*e.x*2*e.x)},/**
 * Get the box 6 side normals
 * @method getSideNormals
 * @param {array}      sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
 * @param {Quaternion} quat             Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
 * @return {array}
 */s.prototype.getSideNormals=function(e,t){var i=this.halfExtents;if(e[0].set(i.x,0,0),e[1].set(0,i.y,0),e[2].set(0,0,i.z),e[3].set(-i.x,0,0),e[4].set(0,-i.y,0),e[5].set(0,0,-i.z),void 0!==t)for(var n=0;n!==e.length;n++)t.vmult(e[n],e[n]);return e},s.prototype.volume=function(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z},s.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.halfExtents.norm()};var o=new r;new r,s.prototype.forEachWorldCorner=function(e,t,i){for(var n=this.halfExtents,r=[[n.x,n.y,n.z],[-n.x,n.y,n.z],[-n.x,-n.y,n.z],[-n.x,-n.y,-n.z],[n.x,-n.y,-n.z],[n.x,n.y,-n.z],[-n.x,n.y,-n.z],[n.x,-n.y,n.z]],a=0;a<r.length;a++)o.set(r[a][0],r[a][1],r[a][2]),t.vmult(o,o),e.vadd(o,o),i(o.x,o.y,o.z)};var l=[new r,new r,new r,new r,new r,new r,new r,new r];s.prototype.calculateWorldAABB=function(e,t,i,n){var r=this.halfExtents;l[0].set(r.x,r.y,r.z),l[1].set(-r.x,r.y,r.z),l[2].set(-r.x,-r.y,r.z),l[3].set(-r.x,-r.y,-r.z),l[4].set(r.x,-r.y,-r.z),l[5].set(r.x,r.y,-r.z),l[6].set(-r.x,r.y,-r.z),l[7].set(r.x,-r.y,r.z);var a=l[0];t.vmult(a,a),e.vadd(a,a),n.copy(a),i.copy(a);for(var s=1;s<8;s++){var a=l[s];t.vmult(a,a),e.vadd(a,a);var o=a.x,h=a.y,c=a.z;o>n.x&&(n.x=o),h>n.y&&(n.y=h),c>n.z&&(n.z=c),o<i.x&&(i.x=o),h<i.y&&(i.y=h),c<i.z&&(i.z=c)}// Get each axis max
// min.set(Infinity,Infinity,Infinity);
// max.set(-Infinity,-Infinity,-Infinity);
// this.forEachWorldCorner(pos,quat,function(x,y,z){
//     if(x > max.x){
//         max.x = x;
//     }
//     if(y > max.y){
//         max.y = y;
//     }
//     if(z > max.z){
//         max.z = z;
//     }
//     if(x < min.x){
//         min.x = x;
//     }
//     if(y < min.y){
//         min.y = y;
//     }
//     if(z < min.z){
//         min.z = z;
//     }
// });
}},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(e,t,i){t.exports=s;var n=e("./Shape"),r=e("../math/Vec3");e("../math/Quaternion");var a=e("../math/Transform");/**
 * A set of polygons describing a convex shape.
 * @class ConvexPolyhedron
 * @constructor
 * @extends Shape
 * @description The shape MUST be convex for the code to work properly. No polygons may be coplanar (contained
 * in the same 3D plane), instead these should be merged into one polygon.
 *
 * @param {array} points An array of Vec3's
 * @param {array} faces Array of integer arrays, describing which vertices that is included in each face.
 *
 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
 * @author schteppe / https://github.com/schteppe
 * @see http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
 *
 * @todo Move the clipping functions to ContactGenerator?
 * @todo Automatically merge coplanar polygons in constructor.
 */function s(e,t,i){n.call(this),this.type=n.types.CONVEXPOLYHEDRON,/**
     * Array of Vec3
     * @property vertices
     * @type {Array}
     */this.vertices=e||[],this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,/**
     * Array of integer arrays, indicating which vertices each face consists of
     * @property faces
     * @type {Array}
     */this.faces=t||[],/**
     * Array of Vec3
     * @property faceNormals
     * @type {Array}
     */this.faceNormals=[],this.computeNormals(),this.worldFaceNormalsNeedsUpdate=!0,this.worldFaceNormals=[],/**
     * Array of Vec3
     * @property uniqueEdges
     * @type {Array}
     */this.uniqueEdges=[],/**
     * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
     * @property {Array} uniqueAxes
     */this.uniqueAxes=i?i.slice():null,this.computeEdges(),this.updateBoundingSphereRadius()}s.prototype=new n,s.prototype.constructor=s;var o=new r;/**
 * Computes uniqueEdges
 * @method computeEdges
 */s.prototype.computeEdges=function(){var e=this.faces,t=this.vertices;t.length;var i=this.uniqueEdges;i.length=0;for(var n=0;n!==e.length;n++)for(var r=e[n],a=r.length,s=0;s!==a;s++){var l=(s+1)%a;t[r[s]].vsub(t[r[l]],o),o.normalize();for(var h=!1,c=0;c!==i.length;c++)if(i[c].almostEquals(o)||i[c].almostEquals(o)){h=!0;break}h||i.push(o.clone())}},/**
 * Compute the normals of the faces. Will reuse existing Vec3 objects in the .faceNormals array if they exist.
 * @method computeNormals
 */s.prototype.computeNormals=function(){this.faceNormals.length=this.faces.length;// Generate normals
for(var e=0;e<this.faces.length;e++){// Check so all vertices exists for this face
for(var t=0;t<this.faces[e].length;t++)if(!this.vertices[this.faces[e][t]])throw Error("Vertex "+this.faces[e][t]+" not found!");var i=this.faceNormals[e]||new r;this.getFaceNormal(e,i),i.negate(i),this.faceNormals[e]=i;var n=this.vertices[this.faces[e][0]];if(0>i.dot(n)){console.error(".faceNormals["+e+"] = Vec3("+i.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");for(var t=0;t<this.faces[e].length;t++)console.warn(".vertices["+this.faces[e][t]+"] = Vec3("+this.vertices[this.faces[e][t]].toString()+")")}}};/**
 * Get face normal given 3 vertices
 * @static
 * @method getFaceNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */var l=new r,h=new r;s.computeNormal=function(e,t,i,n){t.vsub(e,h),i.vsub(t,l),l.cross(h,n),n.isZero()||n.normalize()},/**
 * Compute the normal of a face from its vertices
 * @method getFaceNormal
 * @param  {Number} i
 * @param  {Vec3} target
 */s.prototype.getFaceNormal=function(e,t){var i=this.faces[e],n=this.vertices[i[0]],r=this.vertices[i[1]],a=this.vertices[i[2]];return s.computeNormal(n,r,a,t)};/**
 * @method clipAgainstHull
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @param {Vec3} separatingNormal
 * @param {Number} minDist Clamp distance
 * @param {Number} maxDist
 * @param {array} result The an array of contact point objects, see clipFaceAgainstHull
 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
 */var c=new r;s.prototype.clipAgainstHull=function(e,t,i,n,a,s,o,l,h){for(var u=-1,d=-Number.MAX_VALUE,p=0;p<i.faces.length;p++){c.copy(i.faceNormals[p]),a.vmult(c,c);//posB.vadd(WorldNormal,WorldNormal);
var f=c.dot(s);f>d&&(d=f,u=p)}for(var m=[],g=i.faces[u],v=g.length,y=0;y<v;y++){var x=i.vertices[g[y]],_=new r;_.copy(x),a.vmult(_,_),n.vadd(_,_),m.push(_)}u>=0&&this.clipFaceAgainstHull(s,e,t,m,o,l,h)};/**
 * Find the separating axis between this hull and another
 * @method findSeparatingAxis
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @param {Vec3} target The target vector to save the axis in
 * @return {bool} Returns false if a separation is found, else true
 */var u=new r,d=new r,p=new r,f=new r,m=new r,g=new r;s.prototype.findSeparatingAxis=function(e,t,i,n,r,a,s,o){var l=Number.MAX_VALUE,h=0;if(this.uniqueAxes)for(var c=0;c!==this.uniqueAxes.length;c++){// Get world axis
i.vmult(this.uniqueAxes[c],u);var v=this.testSepAxis(u,e,t,i,n,r);if(!1===v)return!1;v<l&&(l=v,a.copy(u))}else // Test face normals from hullA
for(var y=s?s.length:this.faces.length,c=0;c<y;c++){var x=s?s[c]:c;// Get world face normal
u.copy(this.faceNormals[x]),i.vmult(u,u);var v=this.testSepAxis(u,e,t,i,n,r);if(!1===v)return!1;v<l&&(l=v,a.copy(u))}if(e.uniqueAxes)for(var c=0;c!==e.uniqueAxes.length;c++){r.vmult(e.uniqueAxes[c],d),h++;var v=this.testSepAxis(d,e,t,i,n,r);if(!1===v)return!1;v<l&&(l=v,a.copy(d))}else for(var _=o?o.length:e.faces.length,c=0;c<_;c++){var x=o?o[c]:c;d.copy(e.faceNormals[x]),r.vmult(d,d),h++;var v=this.testSepAxis(d,e,t,i,n,r);if(!1===v)return!1;v<l&&(l=v,a.copy(d))}// Test edges
for(var w=0;w!==this.uniqueEdges.length;w++){// Get world edge
i.vmult(this.uniqueEdges[w],f);for(var b=0;b!==e.uniqueEdges.length;b++)if(// Get world edge 2
r.vmult(e.uniqueEdges[b],m),f.cross(m,g),!g.almostZero()){g.normalize();var M=this.testSepAxis(g,e,t,i,n,r);if(!1===M)return!1;M<l&&(l=M,a.copy(g))}}return n.vsub(t,p),p.dot(a)>0&&a.negate(a),!0};var v=[],y=[];/**
 * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
 * @method testSepAxis
 * @param {Vec3} axis
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @return {number} The overlap depth, or FALSE if no penetration.
 */s.prototype.testSepAxis=function(e,t,i,n,r,a){s.project(this,e,i,n,v),s.project(t,e,r,a,y);var o=v[0],l=v[1],h=y[0],c=y[1];if(o<c||h<l)return!1;// Separated
var u=o-c,d=h-l;return u<d?u:d};var x=new r,_=new r;/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 */s.prototype.calculateLocalInertia=function(e,t){// Approximate with box inertia
// Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
this.computeLocalAABB(x,_);var i=_.x-x.x,n=_.y-x.y,r=_.z-x.z;t.x=1/12*e*(2*n*2*n+2*r*2*r),t.y=1/12*e*(2*i*2*i+2*r*2*r),t.z=1/12*e*(2*n*2*n+2*i*2*i)},/**
 * @method getPlaneConstantOfFace
 * @param  {Number} face_i Index of the face
 * @return {Number}
 */s.prototype.getPlaneConstantOfFace=function(e){var t=this.faces[e],i=this.faceNormals[e],n=this.vertices[t[0]];return-i.dot(n)};/**
 * Clip a face against a hull.
 * @method clipFaceAgainstHull
 * @param {Vec3} separatingNormal
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Array} worldVertsB1 An array of Vec3 with vertices in the world frame.
 * @param {Number} minDist Distance clamping
 * @param {Number} maxDist
 * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
 */var w=new r,b=new r,M=new r,S=new r,E=new r,T=new r,A=new r,R=new r;s.prototype.clipFaceAgainstHull=function(e,t,i,n,r,a,s){for(var o=[],l=-1,h=Number.MAX_VALUE,c=0;c<this.faces.length;c++){w.copy(this.faceNormals[c]),i.vmult(w,w);//posA.vadd(faceANormalWS,faceANormalWS);
var u=w.dot(e);u<h&&(h=u,l=c)}if(!(l<0)){//console.log("closest A: ",closestFaceA);
// Get the face and construct connected faces
var d=this.faces[l];d.connectedFaces=[];for(var p=0;p<this.faces.length;p++)for(var f=0;f<this.faces[p].length;f++)-1/* Sharing a vertex*/!==d.indexOf(this.faces[p][f])&&p!==l/* Not the one we are looking for connections from */&&-1/* Not already added */===d.connectedFaces.indexOf(p)&&d.connectedFaces.push(p);n.length;for(var m=d.length,g=0;g<m;g++){var v,y=this.vertices[d[g]],x=this.vertices[d[(g+1)%m]];y.vsub(x,b),M.copy(b),i.vmult(M,M),t.vadd(M,M),S.copy(this.faceNormals[l]),i.vmult(S,S),t.vadd(S,S),M.cross(S,E),E.negate(E),T.copy(y),i.vmult(T,T),t.vadd(T,T),T.dot(E);var _=d.connectedFaces[g];A.copy(this.faceNormals[_]);var C=this.getPlaneConstantOfFace(_);R.copy(A),i.vmult(R,R);//posA.vadd(planeNormalWS,planeNormalWS);
var v=C-R.dot(t);// Throw away all clipped points, but save the reamining until next clip
for(// Clip face against our constructed plane
this.clipFaceAgainstPlane(n,o,R,v);n.length;)n.shift();for(;o.length;)n.push(o.shift())}//console.log("Resulting points after clip:",pVtxIn);
// only keep contact points that are behind the witness face
A.copy(this.faceNormals[l]);var C=this.getPlaneConstantOfFace(l);R.copy(A),i.vmult(R,R);for(var v=C-R.dot(t),p=0;p<n.length;p++){var P=R.dot(n[p])+v;//???
if(P<=r&&(console.log("clamped: depth="+P+" to minDist="+r),P=r),P<=a){var L=n[p];if(P<=0){/*console.log("Got contact point ",point.toString(),
                  ", depth=",depth,
                  "contact normal=",separatingNormal.toString(),
                  "plane",planeNormalWS.toString(),
                  "planeConstant",planeEqWS);*/var N={point:L,normal:R,depth:P};s.push(N)}}}}},/**
 * Clip a face in a hull against the back of a plane.
 * @method clipFaceAgainstPlane
 * @param {Array} inVertices
 * @param {Array} outVertices
 * @param {Vec3} planeNormal
 * @param {Number} planeConstant The constant in the mathematical plane equation
 */s.prototype.clipFaceAgainstPlane=function(e,t,i,n){var a,s,o=e.length;if(o<2)return t;var l=e[e.length-1],h=e[0];a=i.dot(l)+n;for(var c=0;c<o;c++){if(h=e[c],s=i.dot(h)+n,a<0){if(s<0){// Start < 0, end < 0, so output lastVertex
var u=new r;u.copy(h),t.push(u)}else{// Start < 0, end >= 0, so output intersection
var u=new r;l.lerp(h,a/(a-s),u),t.push(u)}}else if(s<0){// Start >= 0, end < 0 so output intersection and end
var u=new r;l.lerp(h,a/(a-s),u),t.push(u),t.push(h)}l=h,a=s}return t},// Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
s.prototype.computeWorldVertices=function(e,t){for(var i=this.vertices.length;this.worldVertices.length<i;)this.worldVertices.push(new r);for(var n=this.vertices,a=this.worldVertices,s=0;s!==i;s++)t.vmult(n[s],a[s]),e.vadd(a[s],a[s]);this.worldVerticesNeedsUpdate=!1},new r,s.prototype.computeLocalAABB=function(e,t){var i=this.vertices.length,n=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(var r=0;r<i;r++){var a=n[r];a.x<e.x?e.x=a.x:a.x>t.x&&(t.x=a.x),a.y<e.y?e.y=a.y:a.y>t.y&&(t.y=a.y),a.z<e.z?e.z=a.z:a.z>t.z&&(t.z=a.z)}},/**
 * Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
 * @method computeWorldFaceNormals
 * @param  {Quaternion} quat
 */s.prototype.computeWorldFaceNormals=function(e){for(var t=this.faceNormals.length;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new r);for(var i=this.faceNormals,n=this.worldFaceNormals,a=0;a!==t;a++)e.vmult(i[a],n[a]);this.worldFaceNormalsNeedsUpdate=!1},/**
 * @method updateBoundingSphereRadius
 */s.prototype.updateBoundingSphereRadius=function(){for(var e=0,t=this.vertices,i=0,n=t.length;i!==n;i++){var r=t[i].norm2();r>e&&(e=r)}this.boundingSphereRadius=Math.sqrt(e)};var C=new r;/**
 * @method calculateWorldAABB
 * @param {Vec3}        pos
 * @param {Quaternion}  quat
 * @param {Vec3}        min
 * @param {Vec3}        max
 */s.prototype.calculateWorldAABB=function(e,t,i,n){for(var r,a,s,o,l,h,c=this.vertices.length,u=this.vertices,d=0;d<c;d++)C.copy(u[d]),t.vmult(C,C),e.vadd(C,C),C.x<r||void 0===r?r=C.x:(C.x>o||void 0===o)&&(o=C.x),C.y<a||void 0===a?a=C.y:(C.y>l||void 0===l)&&(l=C.y),C.z<s||void 0===s?s=C.z:(C.z>h||void 0===h)&&(h=C.z);i.set(r,a,s),n.set(o,l,h)},/**
 * Get approximate convex volume
 * @method volume
 * @return {Number}
 */s.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},/**
 * Get an average of all the vertices positions
 * @method getAveragePointLocal
 * @param  {Vec3} target
 * @return {Vec3}
 */s.prototype.getAveragePointLocal=function(e){e=e||new r;for(var t=this.vertices.length,i=this.vertices,n=0;n<t;n++)e.vadd(i[n],e);return e.mult(1/t,e),e},/**
 * Transform all local points. Will change the .vertices
 * @method transformAllPoints
 * @param  {Vec3} offset
 * @param  {Quaternion} quat
 */s.prototype.transformAllPoints=function(e,t){var i=this.vertices.length,n=this.vertices;// Apply rotation
if(t){// Rotate vertices
for(var r=0;r<i;r++){var a=n[r];t.vmult(a,a)}// Rotate face normals
for(var r=0;r<this.faceNormals.length;r++){var a=this.faceNormals[r];t.vmult(a,a)}/*
        // Rotate edges
        for(var i=0; i<this.uniqueEdges.length; i++){
            var v = this.uniqueEdges[i];
            quat.vmult(v,v);
        }*/}// Apply offset
if(e)for(var r=0;r<i;r++){var a=n[r];a.vadd(e,a)}};/**
 * Checks whether p is inside the polyhedra. Must be in local coords. The point lies outside of the convex hull of the other points if and only if the direction of all the vectors from it to those other points are on less than one half of a sphere around it.
 * @method pointIsInside
 * @param  {Vec3} p      A point given in local coordinates
 * @return {Boolean}
 */var P=new r,L=new r,N=new r;s.prototype.pointIsInside=function(e){var t=this.vertices.length,i=this.vertices,n=this.faces,r=this.faceNormals,a=this.faces.length;this.getAveragePointLocal(P);for(var s=0;s<a;s++){this.faces[s].length;var t=r[s],o=i[n[s][0]];e.vsub(o,L);var l=t.dot(L);P.vsub(o,N);var h=t.dot(N);if(l<0&&h>0||l>0&&h<0)return!1;// Encountered some other sign. Exit.
}// If we got here, all dot products were of the same sign.
return -1},new r;var I=new r,U=new r;s.project=function(e,t,i,n,r){var s=e.vertices.length,o=0,l=0,h=e.vertices;U.setZero(),// Transform the axis to local
a.vectorToLocalFrame(i,n,t,I),a.pointToLocalFrame(i,n,U,U);var c=U.dot(I);l=o=h[0].dot(I);for(var u=1;u<s;u++){var d=h[u].dot(I);d>o&&(o=d),d<l&&(l=d)}if((l-=c)>(o-=c)){// Inconsistent - swap
var p=l;l=o,o=p}// Output
r[0]=o,r[1]=l}},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(e,t,i){t.exports=s;var n=e("./Shape"),r=e("../math/Vec3");e("../math/Quaternion");var a=e("./ConvexPolyhedron");/**
 * @class Cylinder
 * @constructor
 * @extends ConvexPolyhedron
 * @author schteppe / https://github.com/schteppe
 * @param {Number} radiusTop
 * @param {Number} radiusBottom
 * @param {Number} height
 * @param {Number} numSegments The number of segments to build the cylinder out of
 */function s(e,t,i,s){var o=[],l=[],h=[],c=[],u=[],d=Math.cos,p=Math.sin;// First bottom point
o.push(new r(t*d(0),t*p(0),-(.5*i))),c.push(0),// First top point
o.push(new r(e*d(0),e*p(0),.5*i)),u.push(1);for(var f=0;f<s;f++){var m=2*Math.PI/s*(f+1),g=2*Math.PI/s*(f+.5);f<s-1?(// Bottom
o.push(new r(t*d(m),t*p(m),-(.5*i))),c.push(2*f+2),// Top
o.push(new r(e*d(m),e*p(m),.5*i)),u.push(2*f+3),// Face
h.push([2*f+2,2*f+3,2*f+1,2*f])):h.push([0,1,2*f+1,2*f]),(s%2==1||f<s/2)&&l.push(new r(d(g),p(g),0))}h.push(u),l.push(new r(0,0,1));for(var v=[],f=0;f<c.length;f++)v.push(c[c.length-f-1]);h.push(v),this.type=n.types.CONVEXPOLYHEDRON,a.call(this,o,h,l)}s.prototype=new a},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(e,t,i){var n=e("./Shape"),r=e("./ConvexPolyhedron"),a=e("../math/Vec3"),s=e("../utils/Utils");/**
 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a given distance.
 * @class Heightfield
 * @extends Shape
 * @constructor
 * @param {Array} data An array of Y values that will be used to construct the terrain.
 * @param {object} options
 * @param {Number} [options.minValue] Minimum value of the data points in the data array. Will be computed automatically if not given.
 * @param {Number} [options.maxValue] Maximum value.
 * @param {Number} [options.elementSize=0.1] World spacing between the data points in X direction.
 * @todo Should be possible to use along all axes, not just y
 *
 * @example
 *     // Generate some height data (y-values).
 *     var data = [];
 *     for(var i = 0; i < 1000; i++){
 *         var y = 0.5 * Math.cos(0.2 * i);
 *         data.push(y);
 *     }
 *
 *     // Create the heightfield shape
 *     var heightfieldShape = new Heightfield(data, {
 *         elementSize: 1 // Distance between the data points in X and Y directions
 *     });
 *     var heightfieldBody = new Body();
 *     heightfieldBody.addShape(heightfieldShape);
 *     world.addBody(heightfieldBody);
 */function o(e,t){t=s.defaults(t,{maxValue:null,minValue:null,elementSize:1}),/**
     * An array of numbers, or height values, that are spread out along the x axis.
     * @property {array} data
     */this.data=e,/**
     * Max value of the data
     * @property {number} maxValue
     */this.maxValue=t.maxValue,/**
     * Max value of the data
     * @property {number} minValue
     */this.minValue=t.minValue,/**
     * The width of each element
     * @property {number} elementSize
     * @todo elementSizeX and Y
     */this.elementSize=t.elementSize,null===t.minValue&&this.updateMinValue(),null===t.maxValue&&this.updateMaxValue(),this.cacheEnabled=!0,n.call(this),this.pillarConvex=new r,this.pillarOffset=new a,this.type=n.types.HEIGHTFIELD,this.updateBoundingSphereRadius(),// "i_j_isUpper" => { convex: ..., offset: ... }
// for example:
// _cachedPillars["0_2_1"]
this._cachedPillars={}}t.exports=o,o.prototype=new n,/**
 * Call whenever you change the data array.
 * @method update
 */o.prototype.update=function(){this._cachedPillars={}},/**
 * Update the .minValue property
 * @method updateMinValue
 */o.prototype.updateMinValue=function(){for(var e=this.data,t=e[0][0],i=0;i!==e.length;i++)for(var n=0;n!==e[i].length;n++){var r=e[i][n];r<t&&(t=r)}this.minValue=t},/**
 * Update the .maxValue property
 * @method updateMaxValue
 */o.prototype.updateMaxValue=function(){for(var e=this.data,t=e[0][0],i=0;i!==e.length;i++)for(var n=0;n!==e[i].length;n++){var r=e[i][n];r>t&&(t=r)}this.maxValue=t},/**
 * Set the height value at an index. Don't forget to update maxValue and minValue after you're done.
 * @method setHeightValueAtIndex
 * @param {integer} xi
 * @param {integer} yi
 * @param {number} value
 */o.prototype.setHeightValueAtIndex=function(e,t,i){this.data[e][t]=i,// Invalidate cache
this.clearCachedConvexTrianglePillar(e,t,!1),e>0&&(this.clearCachedConvexTrianglePillar(e-1,t,!0),this.clearCachedConvexTrianglePillar(e-1,t,!1)),t>0&&(this.clearCachedConvexTrianglePillar(e,t-1,!0),this.clearCachedConvexTrianglePillar(e,t-1,!1)),t>0&&e>0&&this.clearCachedConvexTrianglePillar(e-1,t-1,!0)},/**
 * Get max/min in a rectangle in the matrix data
 * @method getRectMinMax
 * @param  {integer} iMinX
 * @param  {integer} iMinY
 * @param  {integer} iMaxX
 * @param  {integer} iMaxY
 * @param  {array} [result] An array to store the results in.
 * @return {array} The result array, if it was passed in. Minimum will be at position 0 and max at 1.
 */o.prototype.getRectMinMax=function(e,t,i,n,r){r=r||[];for(var a=this.data,s=this.minValue,o=e;o<=i;o++)for(var l=t;l<=n;l++){var h=a[o][l];h>s&&(s=h)}r[0]=this.minValue,r[1]=s},/**
 * Get the index of a local position on the heightfield. The indexes indicate the rectangles, so if your terrain is made of N x N height data points, you will have rectangle indexes ranging from 0 to N-1.
 * @method getIndexOfPosition
 * @param  {number} x
 * @param  {number} y
 * @param  {array} result Two-element array
 * @param  {boolean} clamp If the position should be clamped to the heightfield edge.
 * @return {boolean}
 */o.prototype.getIndexOfPosition=function(e,t,i,n){// Get the index of the data points to test against
var r=this.elementSize,a=this.data,s=Math.floor(e/r),o=Math.floor(t/r);return(// Bail out if we are out of the terrain
i[0]=s,i[1]=o,n&&(s<0&&(s=0),o<0&&(o=0),s>=a.length-1&&(s=a.length-1),o>=a[0].length-1&&(o=a[0].length-1)),!(s<0)&&!(o<0)&&!(s>=a.length-1)&&!(o>=a[0].length-1))},o.prototype.getHeightAt=function(e,t,i){var n=[];this.getIndexOfPosition(e,t,n,i);// TODO: get upper or lower triangle, then use barycentric interpolation to get the height in the triangle.
var r=[];return this.getRectMinMax(n[0],n[1]+1,n[0],n[1]+1,r),(r[0]+r[1])/2;// average
},o.prototype.getCacheConvexTrianglePillarKey=function(e,t,i){return e+"_"+t+"_"+(i?1:0)},o.prototype.getCachedConvexTrianglePillar=function(e,t,i){return this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]},o.prototype.setCachedConvexTrianglePillar=function(e,t,i,n,r){this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]={convex:n,offset:r}},o.prototype.clearCachedConvexTrianglePillar=function(e,t,i){delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]},/**
 * Get a triangle in the terrain in the form of a triangular convex shape.
 * @method getConvexTrianglePillar
 * @param  {integer} i
 * @param  {integer} j
 * @param  {boolean} getUpperTriangle
 */o.prototype.getConvexTrianglePillar=function(e,t,i){var n=this.pillarConvex,s=this.pillarOffset;if(this.cacheEnabled){var o=this.getCachedConvexTrianglePillar(e,t,i);if(o){this.pillarConvex=o.convex,this.pillarOffset=o.offset;return}n=new r,s=new a,this.pillarConvex=n,this.pillarOffset=s}var o=this.data,l=this.elementSize,h=n.faces;// Reuse verts if possible
n.vertices.length=6;for(var c=0;c<6;c++)n.vertices[c]||(n.vertices[c]=new a);// Reuse faces if possible
h.length=5;for(var c=0;c<5;c++)h[c]||(h[c]=[]);var u=n.vertices,d=(Math.min(o[e][t],o[e+1][t],o[e][t+1],o[e+1][t+1])-this.minValue)/2+this.minValue;i?(// Center of the triangle pillar - all polygons are given relative to this one
s.set((e+.75)*l,(t+.75)*l,d// vertical center
),// Top triangle verts
u[0].set(.25*l,.25*l,o[e+1][t+1]-d),u[1].set(-.75*l,.25*l,o[e][t+1]-d),u[2].set(.25*l,-.75*l,o[e+1][t]-d),// bottom triangle verts
u[3].set(.25*l,.25*l,-d-1),u[4].set(-.75*l,.25*l,-d-1),u[5].set(.25*l,-.75*l,-d-1),// Top triangle
h[0][0]=0,h[0][1]=1,h[0][2]=2,// bottom triangle
h[1][0]=5,h[1][1]=4,h[1][2]=3,// +x facing quad
h[2][0]=2,h[2][1]=5,h[2][2]=3,h[2][3]=0,// +y facing quad
h[3][0]=3,h[3][1]=4,h[3][2]=1,h[3][3]=0,// -xy facing quad
h[4][0]=1,h[4][1]=4,h[4][2]=5,h[4][3]=2):(// Center of the triangle pillar - all polygons are given relative to this one
s.set((e+.25)*l,(t+.25)*l,d// vertical center
),// Top triangle verts
u[0].set(-.25*l,-.25*l,o[e][t]-d),u[1].set(.75*l,-.25*l,o[e+1][t]-d),u[2].set(-.25*l,.75*l,o[e][t+1]-d),// bottom triangle verts
u[3].set(-.25*l,-.25*l,-d-1),u[4].set(.75*l,-.25*l,-d-1),u[5].set(-.25*l,.75*l,-d-1),// top triangle
h[0][0]=0,h[0][1]=1,h[0][2]=2,// bottom triangle
h[1][0]=5,h[1][1]=4,h[1][2]=3,// -x facing quad
h[2][0]=0,h[2][1]=2,h[2][2]=5,h[2][3]=3,// -y facing quad
h[3][0]=1,h[3][1]=0,h[3][2]=3,h[3][3]=4,// +xy facing quad
h[4][0]=4,h[4][1]=5,h[4][2]=2,h[4][3]=1),n.computeNormals(),n.computeEdges(),n.updateBoundingSphereRadius(),this.setCachedConvexTrianglePillar(e,t,i,n,s)},o.prototype.calculateLocalInertia=function(e,t){return(t=t||new a).set(0,0,0),t},o.prototype.volume=function(){return Number.MAX_VALUE;// The terrain is infinite
},o.prototype.calculateWorldAABB=function(e,t,i,n){// TODO: do it properly
i.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),n.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)},o.prototype.updateBoundingSphereRadius=function(){// Use the bounding box of the min/max values
var e=this.data,t=this.elementSize;this.boundingSphereRadius=new a(e.length*t,e[0].length*t,Math.max(Math.abs(this.maxValue),Math.abs(this.minValue))).norm()}},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(e,t,i){t.exports=a;var n=e("./Shape"),r=e("../math/Vec3");/**
 * Particle shape.
 * @class Particle
 * @constructor
 * @author schteppe
 * @extends Shape
 */function a(){n.call(this),this.type=n.types.PARTICLE}a.prototype=new n,a.prototype.constructor=a,/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3}
 */a.prototype.calculateLocalInertia=function(e,t){return(t=t||new r).set(0,0,0),t},a.prototype.volume=function(){return 0},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=0},a.prototype.calculateWorldAABB=function(e,t,i,n){// Get each axis max
i.copy(e),n.copy(e)}},{"../math/Vec3":30,"./Shape":43}],42:[function(e,t,i){t.exports=a;var n=e("./Shape"),r=e("../math/Vec3");/**
 * A plane, facing in the Z direction. The plane has its surface at z=0 and everything below z=0 is assumed to be solid plane. To make the plane face in some other direction than z, you must put it inside a RigidBody and rotate that body. See the demos.
 * @class Plane
 * @constructor
 * @extends Shape
 * @author schteppe
 */function a(){n.call(this),this.type=n.types.PLANE,// World oriented normal
this.worldNormal=new r,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}a.prototype=new n,a.prototype.constructor=a,a.prototype.computeWorldNormal=function(e){var t=this.worldNormal;t.set(0,0,1),e.vmult(t,t),this.worldNormalNeedsUpdate=!1},a.prototype.calculateLocalInertia=function(e,t){return t=t||new r},a.prototype.volume=function(){return Number.MAX_VALUE;// The plane is infinite...
};var s=new r;a.prototype.calculateWorldAABB=function(e,t,i,n){// The plane AABB is infinite, except if the normal is pointing along any axis
s.set(0,0,1),t.vmult(s,s);var r=Number.MAX_VALUE;i.set(-r,-r,-r),n.set(r,r,r),1===s.x&&(n.x=e.x),1===s.y&&(n.y=e.y),1===s.z&&(n.z=e.z),-1===s.x&&(i.x=e.x),-1===s.y&&(i.y=e.y),-1===s.z&&(i.z=e.z)},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=Number.MAX_VALUE}},{"../math/Vec3":30,"./Shape":43}],43:[function(e,t,i){t.exports=n;var n=e("./Shape");/**
 * Base class for shapes
 * @class Shape
 * @constructor
 * @author schteppe
 * @todo Should have a mechanism for caching bounding sphere radius instead of calculating it each time
 */function n(){/**
     * Identifyer of the Shape.
     * @property {number} id
     */this.id=n.idCounter++,/**
     * The type of this shape. Must be set to an int > 0 by subclasses.
     * @property type
     * @type {Number}
     * @see Shape.types
     */this.type=0,/**
     * The local bounding sphere radius of this shape.
     * @property {Number} boundingSphereRadius
     */this.boundingSphereRadius=0,/**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
     * @property {boolean} collisionResponse
     */this.collisionResponse=!0,/**
     * @property {Material} material
     */this.material=null}e("../math/Vec3"),e("../math/Quaternion"),e("../material/Material"),n.prototype.constructor=n,/**
 * Computes the bounding sphere radius. The result is stored in the property .boundingSphereRadius
 * @method updateBoundingSphereRadius
 * @return {Number}
 */n.prototype.updateBoundingSphereRadius=function(){throw"computeBoundingSphereRadius() not implemented for shape type "+this.type},/**
 * Get the volume of this shape
 * @method volume
 * @return {Number}
 */n.prototype.volume=function(){throw"volume() not implemented for shape type "+this.type},/**
 * Calculates the inertia in the local frame for this shape.
 * @method calculateLocalInertia
 * @return {Vec3}
 * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
 */n.prototype.calculateLocalInertia=function(e,t){throw"calculateLocalInertia() not implemented for shape type "+this.type},n.idCounter=0,/**
 * The available shape types.
 * @static
 * @property types
 * @type {Object}
 */n.types={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(e,t,i){t.exports=a;var n=e("./Shape"),r=e("../math/Vec3");/**
 * Spherical shape
 * @class Sphere
 * @constructor
 * @extends Shape
 * @param {Number} radius The radius of the sphere, a non-negative number.
 * @author schteppe / http://github.com/schteppe
 */function a(e){if(n.call(this),/**
     * @property {Number} radius
     */this.radius=void 0!==e?Number(e):1,this.type=n.types.SPHERE,this.radius<0)throw Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}a.prototype=new n,a.prototype.constructor=a,a.prototype.calculateLocalInertia=function(e,t){t=t||new r;var i=2*e*this.radius*this.radius/5;return t.x=i,t.y=i,t.z=i,t},a.prototype.volume=function(){return 4*Math.PI*this.radius/3},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.radius},a.prototype.calculateWorldAABB=function(e,t,i,n){for(var r=this.radius,a=["x","y","z"],s=0;s<a.length;s++){var o=a[s];i[o]=e[o]-r,n[o]=e[o]+r}}},{"../math/Vec3":30,"./Shape":43}],45:[function(e,t,i){t.exports=l;var n=e("./Shape"),r=e("../math/Vec3");e("../math/Quaternion");var a=e("../math/Transform"),s=e("../collision/AABB"),o=e("../utils/Octree");/**
 * @class Trimesh
 * @constructor
 * @param {array} vertices
 * @param {array} indices
 * @extends Shape
 * @example
 *     // How to make a mesh with a single triangle
 *     var vertices = [
 *         0, 0, 0, // vertex 0
 *         1, 0, 0, // vertex 1
 *         0, 1, 0  // vertex 2
 *     ];
 *     var indices = [
 *         0, 1, 2  // triangle 0
 *     ];
 *     var trimeshShape = new Trimesh(vertices, indices);
 */function l(e,t){n.call(this),this.type=n.types.TRIMESH,/**
     * @property vertices
     * @type {Array}
     */this.vertices=new Float32Array(e),/**
     * Array of integers, indicating which vertices each triangle consists of. The length of this array is thus 3 times the number of triangles.
     * @property indices
     * @type {Array}
     */this.indices=new Int16Array(t),/**
     * The normals data.
     * @property normals
     * @type {Array}
     */this.normals=new Float32Array(t.length),/**
     * The local AABB of the mesh.
     * @property aabb
     * @type {Array}
     */this.aabb=new s,/**
     * References to vertex pairs, making up all unique edges in the trimesh.
     * @property {array} edges
     */this.edges=null,/**
     * Local scaling of the mesh. Use .setScale() to set it.
     * @property {Vec3} scale
     */this.scale=new r(1,1,1),/**
     * The indexed triangles. Use .updateTree() to update it.
     * @property {Octree} tree
     */this.tree=new o,this.updateEdges(),this.updateNormals(),this.updateAABB(),this.updateBoundingSphereRadius(),this.updateTree()}l.prototype=new n,l.prototype.constructor=l;var h=new r;/**
 * @method updateTree
 */l.prototype.updateTree=function(){var e=this.tree;e.reset(),e.aabb.copy(this.aabb);var t=this.scale;// The local mesh AABB is scaled, but the octree AABB should be unscaled
e.aabb.lowerBound.x*=1/t.x,e.aabb.lowerBound.y*=1/t.y,e.aabb.lowerBound.z*=1/t.z,e.aabb.upperBound.x*=1/t.x,e.aabb.upperBound.y*=1/t.y,e.aabb.upperBound.z*=1/t.z;for(var i=new s,n=new r,a=new r,o=new r,l=[n,a,o],h=0;h<this.indices.length/3;h++){//this.getTriangleVertices(i, a, b, c);
// Get unscaled triangle verts
var c=3*h;this._getUnscaledVertex(this.indices[c],n),this._getUnscaledVertex(this.indices[c+1],a),this._getUnscaledVertex(this.indices[c+2],o),i.setFromPoints(l),e.insert(i,h)}e.removeEmptyNodes()};var c=new s;/**
 * Get triangles in a local AABB from the trimesh.
 * @method getTrianglesInAABB
 * @param  {AABB} aabb
 * @param  {array} result An array of integers, referencing the queried triangles.
 */l.prototype.getTrianglesInAABB=function(e,t){c.copy(e);// Scale it to local
var i=this.scale,n=i.x,r=i.y,a=i.z,s=c.lowerBound,o=c.upperBound;return s.x/=n,s.y/=r,s.z/=a,o.x/=n,o.y/=r,o.z/=a,this.tree.aabbQuery(c,t)},/**
 * @method setScale
 * @param {Vec3} scale
 */l.prototype.setScale=function(e){var t=this.scale.x===this.scale.y===this.scale.z,i=e.x===e.y===e.z;t&&i||this.updateNormals(),this.scale.copy(e),this.updateAABB(),this.updateBoundingSphereRadius()},/**
 * Compute the normals of the faces. Will save in the .normals array.
 * @method updateNormals
 */l.prototype.updateNormals=function(){for(var e=this.normals,t=0;t<this.indices.length/3;t++){var i=3*t,n=this.indices[i],r=this.indices[i+1],a=this.indices[i+2];this.getVertex(n,m),this.getVertex(r,g),this.getVertex(a,v),l.computeNormal(g,m,v,h),e[i]=h.x,e[i+1]=h.y,e[i+2]=h.z}},/**
 * Update the .edges property
 * @method updateEdges
 */l.prototype.updateEdges=function(){for(var e={},t=function(t,i){e[r<a?r+"_"+a:a+"_"+r]=!0},i=0;i<this.indices.length/3;i++){var n=3*i,r=this.indices[n],a=this.indices[n+1],s=this.indices[n+2];t(r,a),t(a,s),t(s,r)}var o=Object.keys(e);this.edges=new Int16Array(2*o.length);for(var i=0;i<o.length;i++){var l=o[i].split("_");this.edges[2*i]=parseInt(l[0],10),this.edges[2*i+1]=parseInt(l[1],10)}},/**
 * Get an edge vertex
 * @method getEdgeVertex
 * @param  {number} edgeIndex
 * @param  {number} firstOrSecond 0 or 1, depending on which one of the vertices you need.
 * @param  {Vec3} vertexStore Where to store the result
 */l.prototype.getEdgeVertex=function(e,t,i){var n=this.edges[2*e+(t?1:0)];this.getVertex(n,i)};var u=new r,d=new r;/**
 * Get a vector along an edge.
 * @method getEdgeVector
 * @param  {number} edgeIndex
 * @param  {Vec3} vectorStore
 */l.prototype.getEdgeVector=function(e,t){this.getEdgeVertex(e,0,u),this.getEdgeVertex(e,1,d),d.vsub(u,t)};/**
 * Get face normal given 3 vertices
 * @static
 * @method computeNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */var p=new r,f=new r;l.computeNormal=function(e,t,i,n){t.vsub(e,f),i.vsub(t,p),p.cross(f,n),n.isZero()||n.normalize()};var m=new r,g=new r,v=new r;/**
 * Get vertex i.
 * @method getVertex
 * @param  {number} i
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */l.prototype.getVertex=function(e,t){var i=this.scale;return this._getUnscaledVertex(e,t),t.x*=i.x,t.y*=i.y,t.z*=i.z,t},/**
 * Get raw vertex i
 * @private
 * @method _getUnscaledVertex
 * @param  {number} i
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */l.prototype._getUnscaledVertex=function(e,t){var i=3*e,n=this.vertices;return t.set(n[i],n[i+1],n[i+2])},/**
 * Get a vertex from the trimesh,transformed by the given position and quaternion.
 * @method getWorldVertex
 * @param  {number} i
 * @param  {Vec3} pos
 * @param  {Quaternion} quat
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */l.prototype.getWorldVertex=function(e,t,i,n){return this.getVertex(e,n),a.pointToWorldFrame(t,i,n,n),n},/**
 * Get the three vertices for triangle i.
 * @method getTriangleVertices
 * @param  {number} i
 * @param  {Vec3} a
 * @param  {Vec3} b
 * @param  {Vec3} c
 */l.prototype.getTriangleVertices=function(e,t,i,n){var r=3*e;this.getVertex(this.indices[r],t),this.getVertex(this.indices[r+1],i),this.getVertex(this.indices[r+2],n)},/**
 * Compute the normal of triangle i.
 * @method getNormal
 * @param  {Number} i
 * @param  {Vec3} target
 * @return {Vec3} The "target" vector object
 */l.prototype.getNormal=function(e,t){var i=3*e;return t.set(this.normals[i],this.normals[i+1],this.normals[i+2])};var y=new s;/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3} The "target" vector object
 */l.prototype.calculateLocalInertia=function(e,t){// Approximate with box inertia
// Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
this.computeLocalAABB(y);var i=y.upperBound.x-y.lowerBound.x,n=y.upperBound.y-y.lowerBound.y,r=y.upperBound.z-y.lowerBound.z;return t.set(1/12*e*(2*n*2*n+2*r*2*r),1/12*e*(2*i*2*i+2*r*2*r),1/12*e*(2*n*2*n+2*i*2*i))};var x=new r;/**
 * Compute the local AABB for the trimesh
 * @method computeLocalAABB
 * @param  {AABB} aabb
 */l.prototype.computeLocalAABB=function(e){var t=e.lowerBound,i=e.upperBound,n=this.vertices.length;this.vertices,this.getVertex(0,x),t.copy(x),i.copy(x);for(var r=0;r!==n;r++)this.getVertex(r,x),x.x<t.x?t.x=x.x:x.x>i.x&&(i.x=x.x),x.y<t.y?t.y=x.y:x.y>i.y&&(i.y=x.y),x.z<t.z?t.z=x.z:x.z>i.z&&(i.z=x.z)},/**
 * Update the .aabb property
 * @method updateAABB
 */l.prototype.updateAABB=function(){this.computeLocalAABB(this.aabb)},/**
 * Will update the .boundingSphereRadius property
 * @method updateBoundingSphereRadius
 */l.prototype.updateBoundingSphereRadius=function(){for(var e=0,t=this.vertices,i=new r,n=0,a=t.length/3;n!==a;n++){this.getVertex(n,i);var s=i.norm2();s>e&&(e=s)}this.boundingSphereRadius=Math.sqrt(e)},new r;var _=new a,w=new s;/**
 * @method calculateWorldAABB
 * @param {Vec3}        pos
 * @param {Quaternion}  quat
 * @param {Vec3}        min
 * @param {Vec3}        max
 */l.prototype.calculateWorldAABB=function(e,t,i,n){_.position=e,_.quaternion=t,this.aabb.toWorldFrame(_,w),i.copy(w.lowerBound),n.copy(w.upperBound)},/**
 * Get approximate volume
 * @method volume
 * @return {Number}
 */l.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},/**
 * Create a Trimesh instance, shaped as a torus.
 * @static
 * @method createTorus
 * @param  {number} [radius=1]
 * @param  {number} [tube=0.5]
 * @param  {number} [radialSegments=8]
 * @param  {number} [tubularSegments=6]
 * @param  {number} [arc=6.283185307179586]
 * @return {Trimesh} A torus
 */l.createTorus=function(e,t,i,n,r){e=e||1,t=t||.5,i=i||8,n=n||6,r=r||2*Math.PI;for(var a=[],s=[],o=0;o<=i;o++)for(var h=0;h<=n;h++){var c=h/n*r,u=o/i*Math.PI*2,d=(e+t*Math.cos(u))*Math.cos(c),p=(e+t*Math.cos(u))*Math.sin(c),f=t*Math.sin(u);a.push(d,p,f)}for(var o=1;o<=i;o++)for(var h=1;h<=n;h++){var m=(n+1)*o+h-1,g=(n+1)*(o-1)+h-1,v=(n+1)*(o-1)+h,y=(n+1)*o+h;s.push(m,g,y),s.push(g,v,y)}return new l(a,s)}},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(e,t,i){t.exports=r,e("../math/Vec3"),e("../math/Quaternion");var n=e("./Solver");/**
 * Constraint equation Gauss-Seidel solver.
 * @class GSSolver
 * @constructor
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @author schteppe / https://github.com/schteppe
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 * @extends Solver
 */function r(){n.call(this),/**
     * The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
     * @property iterations
     * @type {Number}
     * @todo write more about solver and iterations in the wiki
     */this.iterations=10,/**
     * When tolerance is reached, the system is assumed to be converged.
     * @property tolerance
     * @type {Number}
     */this.tolerance=1e-7}r.prototype=new n;var a=[],s=[],o=[];// Just temporary number holders that we want to reuse each solve.
r.prototype.solve=function(e,t){var i,n,r,l,h,c=0,u=this.iterations,d=this.tolerance*this.tolerance,p=this.equations,f=p.length,m=t.bodies,g=m.length;// Update solve mass
if(0!==f)for(var v=0;v!==g;v++)m[v].updateSolveMassProperties();s.length=f,o.length=f,a.length=f;for(var v=0;v!==f;v++){var y=p[v];a[v]=0,o[v]=y.computeB(e),s[v]=1/y.computeC()}if(0!==f){// Reset vlambda
for(var v=0;v!==g;v++){var x=m[v],_=x.vlambda,w=x.wlambda;_.set(0,0,0),w&&w.set(0,0,0)}// Iterate over equations
for(c=0;c!==u;c++){// Accumulate the total error for each iteration.
l=0;for(var b=0;b!==f;b++){var y=p[b];// Compute iteration
i=o[b],n=s[b],h=a[b],r=n*(i-y.computeGWlambda()-y.eps*h),h+r<y.minForce?r=y.minForce-h:h+r>y.maxForce&&(r=y.maxForce-h),a[b]+=r,l+=r>0?r:-r,y.addToWlambda(r)}// If the total error is small enough - stop iterate
if(l*l<d)break}// Add result to velocity
for(var v=0;v!==g;v++){var x=m[v],M=x.velocity,S=x.angularVelocity;M.vadd(x.vlambda,M),S&&S.vadd(x.wlambda,S)}}return c}},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(e,t,i){/**
 * Constraint equation solver base class.
 * @class Solver
 * @constructor
 * @author schteppe / https://github.com/schteppe
 */function n(){/**
     * All equations to be solved
     * @property {Array} equations
     */this.equations=[]}t.exports=n,/**
 * Should be implemented in subclasses!
 * @method solve
 * @param  {Number} dt
 * @param  {World} world
 */n.prototype.solve=function(e,t){// Should return the number of iterations done!
return 0},/**
 * Add an equation
 * @method addEquation
 * @param {Equation} eq
 */n.prototype.addEquation=function(e){e.enabled&&this.equations.push(e)},/**
 * Remove an equation
 * @method removeEquation
 * @param {Equation} eq
 */n.prototype.removeEquation=function(e){var t=this.equations,i=t.indexOf(e);-1!==i&&t.splice(i,1)},/**
 * Add all equations
 * @method removeAllEquations
 */n.prototype.removeAllEquations=function(){this.equations.length=0}},{}],48:[function(e,t,i){t.exports=a,e("../math/Vec3"),e("../math/Quaternion");var n=e("./Solver"),r=e("../objects/Body");/**
 * Splits the equations into islands and solves them independently. Can improve performance.
 * @class SplitSolver
 * @constructor
 * @extends Solver
 * @param {Solver} subsolver
 */function a(e){// Create needed nodes, reuse if possible
for(n.call(this),this.iterations=10,this.tolerance=1e-7,this.subsolver=e,this.nodes=[],this.nodePool=[];this.nodePool.length<128;)this.nodePool.push(this.createNode())}a.prototype=new n;// Returns the number of subsystems
var s=[],o=[],l={bodies:[]},h=r.STATIC;// All allocated node objects
function c(e){for(var t=e.length,i=0;i!==t;i++){var n=e[i];if(!n.visited&&!(n.body.type&h))return n}return!1}var u=[];function d(e,t,i){t.push(e.body);for(var n=e.eqs.length,r=0;r!==n;r++){var a=e.eqs[r];-1===i.indexOf(a)&&i.push(a)}}function p(e,t){return t.id-e.id}a.prototype.createNode=function(){return{body:null,children:[],eqs:[],visited:!1}},/**
 * Solve the subsystems
 * @method solve
 * @param  {Number} dt
 * @param  {World} world
 */a.prototype.solve=function(e,t){// Create needed nodes, reuse if possible
for(var i=this.nodePool,n=t.bodies,r=this.equations,a=r.length,h=n.length,f=this.subsolver;i.length<h;)i.push(this.createNode());s.length=h;for(var m=0;m<h;m++)s[m]=i[m];// Reset node values
for(var m=0;m!==h;m++){var g=s[m];g.body=n[m],g.children.length=0,g.eqs.length=0,g.visited=!1}for(var v=0;v!==a;v++){var y=r[v],m=n.indexOf(y.bi),x=n.indexOf(y.bj),_=s[m],w=s[x];_.children.push(w),_.eqs.push(y),w.children.push(_),w.eqs.push(y)}var b,M=0,S=o;for(f.tolerance=this.tolerance,f.iterations=this.iterations;b=c(s);){S.length=0,l.bodies.length=0,function(e,t,i,n){for(u.push(e),e.visited=!0,t(e,i,n);u.length;)for(var r,a=u.pop();r=c(a.children);)r.visited=!0,t(r,i,n),u.push(r)}(b,d,l.bodies,S);var E=S.length;S=S.sort(p);for(var m=0;m!==E;m++)f.addEquation(S[m]);f.solve(e,l),f.removeAllEquations(),M++}return M}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(e,t,i){/**
 * Base class for objects that dispatches events.
 * @class EventTarget
 * @constructor
 */var n=function(){};t.exports=n,n.prototype={constructor:n,/**
     * Add an event listener
     * @method addEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventTarget} The self object, for chainability.
     */addEventListener:function(e,t){void 0===this._listeners&&(this._listeners={});var i=this._listeners;return void 0===i[e]&&(i[e]=[]),-1===i[e].indexOf(t)&&i[e].push(t),this},/**
     * Check if an event listener is added
     * @method hasEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {Boolean}
     */hasEventListener:function(e,t){if(void 0===this._listeners)return!1;var i=this._listeners;return void 0!==i[e]&&-1!==i[e].indexOf(t)},/**
     * Remove an event listener
     * @method removeEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventTarget} The self object, for chainability.
     */removeEventListener:function(e,t){if(void 0===this._listeners)return this;var i=this._listeners;if(void 0===i[e])return this;var n=i[e].indexOf(t);return -1!==n&&i[e].splice(n,1),this},/**
     * Emit an event.
     * @method dispatchEvent
     * @param  {Object} event
     * @param  {String} event.type
     * @return {EventTarget} The self object, for chainability.
     */dispatchEvent:function(e){if(void 0===this._listeners)return this;var t=this._listeners[e.type];if(void 0!==t){e.target=this;for(var i=0,n=t.length;i<n;i++)t[i].call(this,e)}return this}}},{}],50:[function(e,t,i){var n=e("../collision/AABB"),r=e("../math/Vec3");/**
 * @class OctreeNode
 * @param {object} [options]
 * @param {Octree} [options.root]
 * @param {AABB} [options.aabb]
 */function a(e){e=e||{},/**
     * The root node
     * @property {OctreeNode} root
     */this.root=e.root||null,/**
     * Boundary of this node
     * @property {AABB} aabb
     */this.aabb=e.aabb?e.aabb.clone():new n,/**
     * Contained data at the current node level.
     * @property {Array} data
     */this.data=[],/**
     * Children to this node
     * @property {Array} children
     */this.children=[]}/**
 * @class Octree
 * @param {AABB} aabb The total AABB of the tree
 * @param {object} [options]
 * @param {number} [options.maxDepth=8]
 * @extends OctreeNode
 */function s(e,t){(t=t||{}).root=null,t.aabb=e,a.call(this,t),/**
     * Maximum subdivision depth
     * @property {number} maxDepth
     */this.maxDepth=void 0!==t.maxDepth?t.maxDepth:8}t.exports=s,s.prototype=new a,a.prototype.reset=function(e,t){this.children.length=this.data.length=0},/**
 * Insert data into this node
 * @method insert
 * @param  {AABB} aabb
 * @param  {object} elementData
 * @return {boolean} True if successful, otherwise false
 */a.prototype.insert=function(e,t,i){var n=this.data;// Ignore objects that do not belong in this node
if(i=i||0,!this.aabb.contains(e))return!1;// object cannot be added
var r=this.children;if(i<(this.maxDepth||this.root.maxDepth)){// Subdivide if there are no children yet
var a=!1;r.length||(this.subdivide(),a=!0);// add to whichever node will accept it
for(var s=0;8!==s;s++)if(r[s].insert(e,t,i+1))return!0;a&&(r.length=0)}return(// Too deep, or children didnt want it. add it in current node
n.push(t),!0)};var o=new r;/**
 * Create 8 equally sized children nodes and put them in the .children array.
 * @method subdivide
 */a.prototype.subdivide=function(){var e=this.aabb,t=e.lowerBound,i=e.upperBound,s=this.children;s.push(new a({aabb:new n({lowerBound:new r(0,0,0)})}),new a({aabb:new n({lowerBound:new r(1,0,0)})}),new a({aabb:new n({lowerBound:new r(1,1,0)})}),new a({aabb:new n({lowerBound:new r(1,1,1)})}),new a({aabb:new n({lowerBound:new r(0,1,1)})}),new a({aabb:new n({lowerBound:new r(0,0,1)})}),new a({aabb:new n({lowerBound:new r(1,0,1)})}),new a({aabb:new n({lowerBound:new r(0,1,0)})})),i.vsub(t,o),o.scale(.5,o);for(var l=this.root||this,h=0;8!==h;h++){var c=s[h];// Set current node as root
c.root=l;// Compute bounds
var u=c.aabb.lowerBound;u.x*=o.x,u.y*=o.y,u.z*=o.z,u.vadd(t,u),// Upper bound is always lower bound + halfDiagonal
u.vadd(o,c.aabb.upperBound)}},/**
 * Get all data, potentially within an AABB
 * @method aabbQuery
 * @param  {AABB} aabb
 * @param  {array} result
 * @return {array} The "result" object
 */a.prototype.aabbQuery=function(e,t){this.data,this.children;for(// for (var i = 0, N = this.children.length; i !== N; i++) {
//     children[i].aabbQuery(aabb, result);
// }
var i=[this];i.length;){var n=i.pop();n.aabb.overlaps(e)&&Array.prototype.push.apply(t,n.data),Array.prototype.push.apply(i,n.children)}return t};var l=new n;/**
 * Get all data, potentially intersected by a ray.
 * @method rayQuery
 * @param  {Ray} ray
 * @param  {Transform} treeTransform
 * @param  {array} result
 * @return {array} The "result" object
 */a.prototype.rayQuery=function(e,t,i){return(// Use aabb query for now.
// @todo implement real ray query which needs less lookups
e.getAABB(l),l.toLocalFrame(t,l),this.aabbQuery(l,i),i)},/**
 * @method removeEmptyNodes
 */a.prototype.removeEmptyNodes=function(){for(var e=[this];e.length;){for(var t=e.pop(),i=t.children.length-1;i>=0;i--)t.children[i].data.length||t.children.splice(i,1);Array.prototype.push.apply(e,t.children)}}},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(e,t,i){/**
 * For pooling objects that can be reused.
 * @class Pool
 * @constructor
 */function n(){/**
     * The pooled objects
     * @property {Array} objects
     */this.objects=[],/**
     * Constructor of the objects
     * @property {mixed} type
     */this.type=Object}t.exports=n,/**
 * Release an object after use
 * @method release
 * @param {Object} obj
 */n.prototype.release=function(){for(var e=arguments.length,t=0;t!==e;t++)this.objects.push(arguments[t])},/**
 * Get an object
 * @method get
 * @return {mixed}
 */n.prototype.get=function(){return 0===this.objects.length?this.constructObject():this.objects.pop()},/**
 * Construct an object. Should be implmented in each subclass.
 * @method constructObject
 * @return {mixed}
 */n.prototype.constructObject=function(){throw Error("constructObject() not implemented in this Pool subclass yet!")}},{}],52:[function(e,t,i){/**
 * @class TupleDictionary
 * @constructor
 */function n(){/**
     * The data storage
     * @property data
     * @type {Object}
     */this.data={keys:[]}}t.exports=n,/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */n.prototype.get=function(e,t){if(e>t){// swap
var i=t;t=e,e=i}return this.data[e+"-"+t]},/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Number} value
 */n.prototype.set=function(e,t,i){if(e>t){var n=t;t=e,e=n}var r=e+"-"+t;this.get(e,t)||this.data.keys.push(r),this.data[r]=i},/**
 * @method reset
 */n.prototype.reset=function(){for(var e=this.data,t=e.keys;t.length>0;){var i=t.pop();delete e[i]}}},{}],53:[function(e,t,i){function n(){}t.exports=n,/**
 * Extend an options object with default values.
 * @static
 * @method defaults
 * @param  {object} options The options object. May be falsy: in this case, a new object is created and returned.
 * @param  {object} defaults An object containing default values.
 * @return {object} The modified options object.
 */n.defaults=function(e,t){for(var i in e=e||{},t)i in e||(e[i]=t[i]);return e}},{}],54:[function(e,t,i){t.exports=a;var n=e("../math/Vec3"),r=e("./Pool");/**
 * @class Vec3Pool
 * @constructor
 * @extends Pool
 */function a(){r.call(this),this.type=n}a.prototype=new r,/**
 * Construct a vector
 * @method constructObject
 * @return {Vec3}
 */a.prototype.constructObject=function(){return new n}},{"../math/Vec3":30,"./Pool":51}],55:[function(e,t,i){t.exports=d;var n=e("../collision/AABB"),r=e("../shapes/Shape"),a=e("../collision/Ray"),s=e("../math/Vec3"),o=e("../math/Transform");e("../shapes/ConvexPolyhedron");var l=e("../math/Quaternion");e("../solver/Solver");var h=e("../utils/Vec3Pool"),c=e("../equations/ContactEquation"),u=e("../equations/FrictionEquation");/**
 * Helper class for the World. Generates ContactEquations.
 * @class Narrowphase
 * @constructor
 * @todo Sphere-ConvexPolyhedron contacts
 * @todo Contact reduction
 * @todo  should move methods to prototype
 */function d(e){/**
     * Internal storage of pooled contact points.
     * @property {Array} contactPointPool
     */this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],/**
     * Pooled vectors.
     * @property {Vec3Pool} v3pool
     */this.v3pool=new h,this.world=e,this.currentContactMaterial=null,/**
     * @property {Boolean} enableFrictionReduction
     */this.enableFrictionReduction=!1}/**
 * Make a contact object, by using the internal pool or creating a new one.
 * @method createContactEquation
 * @return {ContactEquation}
 */d.prototype.createContactEquation=function(e,t,i,n,r,a){this.contactPointPool.length?((s=this.contactPointPool.pop()).bi=e,s.bj=t):s=new c(e,t),s.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&n.collisionResponse;var s,o=this.currentContactMaterial;s.restitution=o.restitution,s.setSpookParams(o.contactEquationStiffness,o.contactEquationRelaxation,this.world.dt);var l=i.material||e.material,h=n.material||t.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(s.restitution=l.restitution*h.restitution),s.si=r||i,s.sj=a||n,s},d.prototype.createFrictionEquationsFromContact=function(e,t){var i=e.bi,n=e.bj,r=e.si,a=e.sj,s=this.world,o=this.currentContactMaterial,l=o.friction,h=r.material||i.material,c=a.material||n.material;if(h&&c&&h.friction>=0&&c.friction>=0&&(l=h.friction*c.friction),l>0){// Create 2 tangent equations
var d=l*s.gravity.length(),p=i.invMass+n.invMass;p>0&&(p=1/p);var f=this.frictionEquationPool,m=f.length?f.pop():new u(i,n,d*p),g=f.length?f.pop():new u(i,n,d*p);return m.bi=g.bi=i,m.bj=g.bj=n,m.minForce=g.minForce=-d*p,m.maxForce=g.maxForce=d*p,// Copy over the relative vectors
m.ri.copy(e.ri),m.rj.copy(e.rj),g.ri.copy(e.ri),g.rj.copy(e.rj),// Construct tangents
e.ni.tangents(m.t,g.t),// Set spook params
m.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,s.dt),g.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,s.dt),m.enabled=g.enabled=e.enabled,t.push(m,g),!0}return!1};var p=new s,f=new s,m=new s;// Take the average N latest contact point on the plane.
d.prototype.createFrictionFromAverage=function(e){// The last contactEquation
var t=this.result[this.result.length-1];// Create the result: two "average" friction equations
if(this.createFrictionEquationsFromContact(t,this.frictionResult)&&1!==e){var i=this.frictionResult[this.frictionResult.length-2],n=this.frictionResult[this.frictionResult.length-1];p.setZero(),f.setZero(),m.setZero();var r=t.bi;t.bj;for(var a=0;a!==e;a++)(t=this.result[this.result.length-1-a]).bodyA!==r?(p.vadd(t.ni,p),f.vadd(t.ri,f),m.vadd(t.rj,m)):(p.vsub(t.ni,p),f.vadd(t.rj,f),m.vadd(t.ri,m));var s=1/e;f.scale(s,i.ri),m.scale(s,i.rj),n.ri.copy(i.ri),n.rj.copy(i.rj),p.normalize(),p.tangents(i.t,n.t)}// return eq;
};var g=new s,v=new s,y=new l,x=new l;/**
 * Generate all contacts between a list of body pairs
 * @method getContacts
 * @param {array} p1 Array of body indices
 * @param {array} p2 Array of body indices
 * @param {World} world
 * @param {array} result Array to store generated contacts
 * @param {array} oldcontacts Optional. Array of reusable contact objects
 */d.prototype.getContacts=function(e,t,i,n,r,a,s){// Save old contact objects
this.contactPointPool=r,this.frictionEquationPool=s,this.result=n,this.frictionResult=a;for(var o=0,l=e.length;o!==l;o++){// Get current collision bodies
var h=e[o],c=t[o],u=null;h.material&&c.material&&(u=i.getContactMaterial(h.material,c.material)||null);for(var d=0;d<h.shapes.length;d++){h.quaternion.mult(h.shapeOrientations[d],y),h.quaternion.vmult(h.shapeOffsets[d],g),g.vadd(h.position,g);for(var p=h.shapes[d],f=0;f<c.shapes.length;f++){// Compute world transform of shapes
c.quaternion.mult(c.shapeOrientations[f],x),c.quaternion.vmult(c.shapeOffsets[f],v),v.vadd(c.position,v);var m=c.shapes[f];if(!(g.distanceTo(v)>p.boundingSphereRadius+m.boundingSphereRadius)){// Get collision material
var _=null;p.material&&m.material&&(_=i.getContactMaterial(p.material,m.material)||null),this.currentContactMaterial=_||u||i.defaultContactMaterial;// Get contacts
var w=this[p.type|m.type];w&&(p.type<m.type?w.call(this,p,m,g,v,y,x,h,c,p,m):w.call(this,m,p,v,g,x,y,c,h,p,m))}}}}},d.prototype[r.types.BOX|r.types.BOX]=d.prototype.boxBox=function(e,t,i,n,r,a,s,o){e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,n,r,a,s,o,e,t)},d.prototype[r.types.BOX|r.types.CONVEXPOLYHEDRON]=d.prototype.boxConvex=function(e,t,i,n,r,a,s,o){e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o,e,t)},d.prototype[r.types.BOX|r.types.PARTICLE]=d.prototype.boxParticle=function(e,t,i,n,r,a,s,o){e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o,e,t)},/**
 * @method sphereSphere
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.SPHERE]=d.prototype.sphereSphere=function(e,t,i,n,r,a,s,o){// We will have only one contact in this case
var l=this.createContactEquation(s,o,e,t);// Contact normal
n.vsub(i,l.ni),l.ni.normalize(),// Contact point locations
l.ri.copy(l.ni),l.rj.copy(l.ni),l.ri.mult(e.radius,l.ri),l.rj.mult(-t.radius,l.rj),l.ri.vadd(i,l.ri),l.ri.vsub(s.position,l.ri),l.rj.vadd(n,l.rj),l.rj.vsub(o.position,l.rj),this.result.push(l),this.createFrictionEquationsFromContact(l,this.frictionResult)};/**
 * @method planeTrimesh
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */var _=new s,w=new s,b=new s;d.prototype[r.types.PLANE|r.types.TRIMESH]=d.prototype.planeTrimesh=function(e,t,i,n,r,a,l,h){// Make contacts!
var c=new s;_.set(0,0,1),r.vmult(_,_);for(var u=0;u<t.vertices.length/3;u++){// Get world vertex from trimesh
t.getVertex(u,c);// Safe up
var d=new s;if(d.copy(c),o.pointToWorldFrame(n,a,d,c),c.vsub(i,w),0>=_.dot(w)){var p=this.createContactEquation(l,h,e,t);p.ni.copy(_),_.scale(w.dot(_),b),c.vsub(b,b),// ri is the projected world position minus plane position
p.ri.copy(b),p.ri.vsub(l.position,p.ri),p.rj.copy(c),p.rj.vsub(h.position,p.rj),// Store result
this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}};/**
 * @method sphereTrimesh
 * @param  {Shape}      sphereShape
 * @param  {Shape}      trimeshShape
 * @param  {Vec3}       spherePos
 * @param  {Vec3}       trimeshPos
 * @param  {Quaternion} sphereQuat
 * @param  {Quaternion} trimeshQuat
 * @param  {Body}       sphereBody
 * @param  {Body}       trimeshBody
 */var M=new s,S=new s;new s;var E=new s,T=new s,A=new s,R=new s,C=new s,P=new s,L=new s,N=new s,I=new s,U=new s,D=new s,O=new n,z=[];d.prototype[r.types.SPHERE|r.types.TRIMESH]=d.prototype.sphereTrimesh=function(e,t,i,n,r,s,l,h){// Convert sphere position to local in the trimesh
o.pointToLocalFrame(n,s,i,L);// Get the aabb of the sphere locally in the trimesh
var c=e.radius;O.lowerBound.set(L.x-c,L.y-c,L.z-c),O.upperBound.set(L.x+c,L.y+c,L.z+c),t.getTrianglesInAABB(O,z);for(var u=e.radius*e.radius,d=0;d<z.length;d++)for(var p=0;p<3;p++)if(t.getVertex(t.indices[3*z[d]+p],E),// Check vertex overlap in sphere
E.vsub(L,S),S.norm2()<=u){// Safe up
T.copy(E),o.pointToWorldFrame(n,s,T,E),E.vsub(i,S);var f=this.createContactEquation(l,h,e,t);f.ni.copy(S),f.ni.normalize(),// ri is the vector from sphere center to the sphere surface
f.ri.copy(f.ni),f.ri.scale(e.radius,f.ri),f.ri.vadd(i,f.ri),f.ri.vsub(l.position,f.ri),f.rj.copy(E),f.rj.vsub(h.position,f.rj),// Store result
this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}// Check all edges
for(var d=0;d<z.length;d++)for(var p=0;p<3;p++){t.getVertex(t.indices[3*z[d]+p],A),t.getVertex(t.indices[3*z[d]+(p+1)%3],R),R.vsub(A,C),// Project sphere position to the edge
L.vsub(R,N);var m=N.dot(C);L.vsub(A,N);var g=N.dot(C);if(g>0&&m<0){// Now check the orthogonal distance from edge to sphere center
L.vsub(A,N),P.copy(C),P.normalize(),g=N.dot(P),P.scale(g,N),N.vadd(A,N);// tmp is now the sphere center position projected to the edge, defined locally in the trimesh frame
var v=N.distanceTo(L);if(v<e.radius){var f=this.createContactEquation(l,h,e,t);N.vsub(L,f.ni),f.ni.normalize(),f.ni.scale(e.radius,f.ri),o.pointToWorldFrame(n,s,N,N),N.vsub(h.position,f.rj),o.vectorToWorldFrame(s,f.ni,f.ni),o.vectorToWorldFrame(s,f.ri,f.ri),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}}}for(var d=0,y=z.length;d!==y;d++){t.getTriangleVertices(z[d],I,U,D),t.getNormal(z[d],M),L.vsub(I,N);var v=N.dot(M);if(M.scale(v,N),L.vsub(N,N),// tmp is now the sphere position projected to the triangle plane
v=N.distanceTo(L),a.pointInTriangle(N,I,U,D)&&v<e.radius){var f=this.createContactEquation(l,h,e,t);N.vsub(L,f.ni),f.ni.normalize(),f.ni.scale(e.radius,f.ri),o.pointToWorldFrame(n,s,N,N),N.vsub(h.position,f.rj),o.vectorToWorldFrame(s,f.ni,f.ni),o.vectorToWorldFrame(s,f.ri,f.ri),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}}z.length=0};var B=new s,F=new s;/**
 * @method spherePlane
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.SPHERE|r.types.PLANE]=d.prototype.spherePlane=function(e,t,i,n,r,a,s,o){// We will have one contact in this case
var l=this.createContactEquation(s,o,e,t);if(// Contact normal
l.ni.set(0,0,1),a.vmult(l.ni,l.ni),l.ni.negate(l.ni),l.ni.normalize(),// Vector from sphere center to contact point
l.ni.mult(e.radius,l.ri),// Project down sphere on plane
i.vsub(n,B),l.ni.mult(l.ni.dot(B),F),B.vsub(F,l.rj),-B.dot(l.ni)<=e.radius){// Make it relative to the body
var h=l.ri,c=l.rj;h.vadd(i,h),h.vsub(s.position,h),c.vadd(n,c),c.vsub(o.position,c),this.result.push(l),this.createFrictionEquationsFromContact(l,this.frictionResult)}};// See http://bulletphysics.com/Bullet/BulletFull/SphereTriangleDetector_8cpp_source.html
var V=new s,H=new s,W=new s,k=new s,G=new s,q=new s,j=new s,X=[new s,new s,new s,new s,new s,new s],Y=new s,Z=new s,K=new s,J=new s;/**
 * @method sphereBox
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.SPHERE|r.types.BOX]=d.prototype.sphereBox=function(e,t,i,n,r,a,s,o){var l=this.v3pool;i.vsub(n,k),t.getSideNormals(X,a);for(var h=e.radius,c=!1,u=null,d=0,p=0,f=0,m=null,g=0,v=X.length;g!==v&&!1===c;g++){G.copy(X[g]);var y=G.norm();G.normalize();// The normal/distance dot product tells which side of the plane we are
var x=k.dot(G);if(x<y+h&&x>0){q.copy(X[(g+1)%3]),j.copy(X[(g+2)%3]);var _=q.norm(),w=j.norm();q.normalize(),j.normalize();var b=k.dot(q),M=k.dot(j);if(b<_&&b>-_&&M<w&&M>-w){var S=Math.abs(x-y-h);(null===m||S<m)&&(m=S,p=b,f=M,u=y,Z.copy(G),K.copy(q),J.copy(j),d++)}}}if(d){c=!0;var E=this.createContactEquation(s,o,e,t);Z.mult(-h,E.ri),E.ni.copy(Z),E.ni.negate(E.ni),Z.mult(u,Z),K.mult(p,K),Z.vadd(K,Z),J.mult(f,J),Z.vadd(J,E.rj),// Make relative to bodies
E.ri.vadd(i,E.ri),E.ri.vsub(s.position,E.ri),E.rj.vadd(n,E.rj),E.rj.vsub(o.position,E.rj),this.result.push(E),this.createFrictionEquationsFromContact(E,this.frictionResult)}for(var T=l.get(),A=0;2!==A&&!c;A++)for(var R=0;2!==R&&!c;R++)for(var C=0;2!==C&&!c;C++)if(T.set(0,0,0),A?T.vadd(X[0],T):T.vsub(X[0],T),R?T.vadd(X[1],T):T.vsub(X[1],T),C?T.vadd(X[2],T):T.vsub(X[2],T),// World position of corner
n.vadd(T,Y),Y.vsub(i,Y),Y.norm2()<h*h){c=!0;var E=this.createContactEquation(s,o,e,t);E.ri.copy(Y),E.ri.normalize(),E.ni.copy(E.ri),E.ri.mult(h,E.ri),E.rj.copy(T),// Make relative to bodies
E.ri.vadd(i,E.ri),E.ri.vsub(s.position,E.ri),E.rj.vadd(n,E.rj),E.rj.vsub(o.position,E.rj),this.result.push(E),this.createFrictionEquationsFromContact(E,this.frictionResult)}l.release(T),T=null;for(var P=l.get(),L=l.get(),E=l.get(),N=l.get(),S=l.get(),I=X.length,A=0;A!==I&&!c;A++)for(var R=0;R!==I&&!c;R++)if(A%3!=R%3){// Get edge tangent
X[R].cross(X[A],P),P.normalize(),X[A].vadd(X[R],L),E.copy(i),E.vsub(L,E),E.vsub(n,E);var U=E.dot(P);// distance from edge center to sphere center in the tangent direction
P.mult(U,N);for(// Find the third side orthogonal to this one
var C=0;C===A%3||C===R%3;)C++;// vec from edge center to sphere projected to the plane orthogonal to the edge tangent
S.copy(i),S.vsub(N,S),S.vsub(L,S),S.vsub(n,S);// Distances in tangent direction and distance in the plane orthogonal to it
var D=Math.abs(U),O=S.norm();if(D<X[C].norm()&&O<h){c=!0;var z=this.createContactEquation(s,o,e,t);L.vadd(N,z.rj),z.rj.copy(z.rj),S.negate(z.ni),z.ni.normalize(),z.ri.copy(z.rj),z.ri.vadd(n,z.ri),z.ri.vsub(i,z.ri),z.ri.normalize(),z.ri.mult(h,z.ri),// Make relative to bodies
z.ri.vadd(i,z.ri),z.ri.vsub(s.position,z.ri),z.rj.vadd(n,z.rj),z.rj.vsub(o.position,z.rj),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}}l.release(P,L,E,N,S)};var Q=new s,$=new s,ee=new s,et=new s,ei=new s,en=new s,er=new s,ea=new s,es=new s,eo=new s;/**
 * @method sphereConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.SPHERE|r.types.CONVEXPOLYHEDRON]=d.prototype.sphereConvex=function(e,t,i,n,r,a,s,o){var l=this.v3pool;i.vsub(n,Q);// if(convex_to_sphere.norm2() > si.boundingSphereRadius + sj.boundingSphereRadius){
//     return;
// }
// Check corners
for(var h=t.faceNormals,c=t.faces,u=t.vertices,d=e.radius,p=0;p!==u.length;p++){var f=u[p];if(a.vmult(f,ei),n.vadd(ei,ei),ei.vsub(i,et),et.norm2()<d*d){g=!0;var m=this.createContactEquation(s,o,e,t);m.ri.copy(et),m.ri.normalize(),m.ni.copy(m.ri),m.ri.mult(d,m.ri),ei.vsub(n,m.rj),// Should be relative to the body.
m.ri.vadd(i,m.ri),m.ri.vsub(s.position,m.ri),// Should be relative to the body.
m.rj.vadd(n,m.rj),m.rj.vsub(o.position,m.rj),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult);return}}for(var g=!1,p=0,v=c.length;p!==v&&!1===g;p++){var y=h[p],x=c[p];a.vmult(y,en),a.vmult(u[x[0]],er),er.vadd(n,er),en.mult(-d,ea),i.vadd(ea,ea),ea.vsub(er,es);// The penetration. Negative value means overlap.
var _=es.dot(en);if(i.vsub(er,eo),_<0&&eo.dot(en)>0){for(var w=[],b=0,M=x.length;b!==M;b++){var S=l.get();a.vmult(u[x[b]],S),n.vadd(S,S),w.push(S)}if(function(e,t,i){for(var n=null,r=e.length,a=0;a!==r;a++){var s=e[a];e[(a+1)%r].vsub(s,V),//var edge_x_normal = new Vec3();
V.cross(t,H),i.vsub(s,W);// This dot product determines which side of the edge the point is
var o=H.dot(W);// If all such dot products have same sign, we are inside the polygon.
if(null!==n&&(!(o>0)||!0!==n)&&(!(o<=0)||!1!==n))return!1;// Encountered some other sign. Exit.
null===n&&(n=o>0)}// If we got here, all dot products were of the same sign.
return!0}(w,en,i)){g=!0;var m=this.createContactEquation(s,o,e,t);en.mult(-d,m.ri),en.negate(m.ni);var E=l.get();en.mult(-_,E);var T=l.get();en.mult(-d,T),//xi.vsub(xj).vadd(penetrationSpherePoint).vadd(penetrationVec2 , r.rj);
i.vsub(n,m.rj),m.rj.vadd(T,m.rj),m.rj.vadd(E,m.rj),// Should be relative to the body.
m.rj.vadd(n,m.rj),m.rj.vsub(o.position,m.rj),// Should be relative to the body.
m.ri.vadd(i,m.ri),m.ri.vsub(s.position,m.ri),l.release(E),l.release(T),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult);// Release world vertices
for(var b=0,A=w.length;b!==A;b++)l.release(w[b]);return;// We only expect *one* face contact
}for(var b=0;b!==x.length;b++){// Get two world transformed vertices
var R=l.get(),C=l.get();a.vmult(u[x[(b+1)%x.length]],R),a.vmult(u[x[(b+2)%x.length]],C),n.vadd(R,R),n.vadd(C,C),C.vsub(R,$),$.unit(ee);// p is xi projected onto the edge
var P=l.get(),L=l.get();i.vsub(R,L);var N=L.dot(ee);ee.mult(N,P),P.vadd(R,P);// Compute a vector from p to the center of the sphere
var I=l.get();// Collision if the edge-sphere distance is less than the radius
// AND if p is in between v1 and v2
if(P.vsub(i,I),N>0&&N*N<$.norm2()&&I.norm2()<d*d){// Edge contact!
var m=this.createContactEquation(s,o,e,t);P.vsub(n,m.rj),P.vsub(i,m.ni),m.ni.normalize(),m.ni.mult(d,m.ri),// Should be relative to the body.
m.rj.vadd(n,m.rj),m.rj.vsub(o.position,m.rj),// Should be relative to the body.
m.ri.vadd(i,m.ri),m.ri.vsub(s.position,m.ri),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult);// Release world vertices
for(var b=0,A=w.length;b!==A;b++)l.release(w[b]);l.release(R),l.release(C),l.release(P),l.release(I),l.release(L);return}l.release(R),l.release(C),l.release(P),l.release(I),l.release(L)}// Release world vertices
for(var b=0,A=w.length;b!==A;b++)l.release(w[b])}}},new s,new s,/**
 * @method planeBox
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.PLANE|r.types.BOX]=d.prototype.planeBox=function(e,t,i,n,r,a,s,o){t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.planeConvex(e,t.convexPolyhedronRepresentation,i,n,r,a,s,o)};var el=new s,eh=new s,ec=new s,eu=new s;/**
 * @method planeConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.PLANE|r.types.CONVEXPOLYHEDRON]=d.prototype.planeConvex=function(e,t,i,n,r,a,s,o){eh.set(0,0,1),r.vmult(eh,eh);for(var l=0,h=0;h!==t.vertices.length;h++)if(// Get world convex vertex
el.copy(t.vertices[h]),a.vmult(el,el),n.vadd(el,el),el.vsub(i,ec),0>=eh.dot(ec)){var c=this.createContactEquation(s,o,e,t);eh.mult(eh.dot(ec),eu),el.vsub(eu,eu),eu.vsub(i,c.ri),c.ni.copy(eh),// rj is now just the vector from the convex center to the vertex
el.vsub(n,c.rj),// Make it relative to the body
c.ri.vadd(i,c.ri),c.ri.vsub(s.position,c.ri),c.rj.vadd(n,c.rj),c.rj.vsub(o.position,c.rj),this.result.push(c),l++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(c,this.frictionResult)}this.enableFrictionReduction&&l&&this.createFrictionFromAverage(l)};var ed=new s,ep=new s;/**
 * @method convexConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.CONVEXPOLYHEDRON]=d.prototype.convexConvex=function(e,t,i,n,r,a,s,o,l,h,c,u){if(!(i.distanceTo(n)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,r,n,a,ed,c,u)){var d=[];e.clipAgainstHull(i,r,t,n,a,ed,-100,100,d);for(var p=0,f=0;f!==d.length;f++){var m=this.createContactEquation(s,o,e,t,l,h),g=m.ri,v=m.rj;ed.negate(m.ni),d[f].normal.negate(ep),ep.mult(d[f].depth,ep),d[f].point.vadd(ep,g),v.copy(d[f].point),// Contact points are in world coordinates. Transform back to relative
g.vsub(i,g),v.vsub(n,v),// Make relative to bodies
g.vadd(i,g),g.vsub(s.position,g),v.vadd(n,v),v.vsub(o.position,v),this.result.push(m),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(m,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}};/**
 * @method convexTrimesh
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */// Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON | Shape.types.TRIMESH] =
// Narrowphase.prototype.convexTrimesh = function(si,sj,xi,xj,qi,qj,bi,bj,rsi,rsj,faceListA,faceListB){
//     var sepAxis = convexConvex_sepAxis;
//     if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
//         return;
//     }
//     // Construct a temp hull for each triangle
//     var hullB = new ConvexPolyhedron();
//     hullB.faces = [[0,1,2]];
//     var va = new Vec3();
//     var vb = new Vec3();
//     var vc = new Vec3();
//     hullB.vertices = [
//         va,
//         vb,
//         vc
//     ];
//     for (var i = 0; i < sj.indices.length / 3; i++) {
//         var triangleNormal = new Vec3();
//         sj.getNormal(i, triangleNormal);
//         hullB.faceNormals = [triangleNormal];
//         sj.getTriangleVertices(i, va, vb, vc);
//         var d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
//         if(!d){
//             triangleNormal.scale(-1, triangleNormal);
//             d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
//             if(!d){
//                 continue;
//             }
//         }
//         var res = [];
//         var q = convexConvex_q;
//         si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
//         for(var j = 0; j !== res.length; j++){
//             var r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
//                 ri = r.ri,
//                 rj = r.rj;
//             r.ni.copy(triangleNormal);
//             r.ni.negate(r.ni);
//             res[j].normal.negate(q);
//             q.mult(res[j].depth, q);
//             res[j].point.vadd(q, ri);
//             rj.copy(res[j].point);
//             // Contact points are in world coordinates. Transform back to relative
//             ri.vsub(xi,ri);
//             rj.vsub(xj,rj);
//             // Make relative to bodies
//             ri.vadd(xi, ri);
//             ri.vsub(bi.position, ri);
//             rj.vadd(xj, rj);
//             rj.vsub(bj.position, rj);
//             result.push(r);
//         }
//     }
// };
var ef=new s,em=new s,eg=new s;/**
 * @method particlePlane
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.PLANE|r.types.PARTICLE]=d.prototype.planeParticle=function(e,t,i,n,r,a,s,o){if(ef.set(0,0,1),s.quaternion.vmult(ef,ef),n.vsub(s.position,em),0>=ef.dot(em)){var l=this.createContactEquation(o,s,t,e);l.ni.copy(ef),l.ni.negate(l.ni),l.ri.set(0,0,0),ef.mult(ef.dot(n),eg),n.vsub(eg,eg),//projected.vadd(bj.position,projected);
// rj is now the projected world position minus plane position
l.rj.copy(eg),this.result.push(l),this.createFrictionEquationsFromContact(l,this.frictionResult)}};var ev=new s;/**
 * @method particleSphere
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.PARTICLE|r.types.SPHERE]=d.prototype.sphereParticle=function(e,t,i,n,r,a,s,o){if(ev.set(0,0,1),n.vsub(i,ev),ev.norm2()<=e.radius*e.radius){var l=this.createContactEquation(o,s,t,e);ev.normalize(),l.rj.copy(ev),l.rj.mult(e.radius,l.rj),l.ni.copy(ev),l.ni.negate(l.ni),l.ri.set(0,0,0),this.result.push(l),this.createFrictionEquationsFromContact(l,this.frictionResult)}};// WIP
var ey=new l,ex=new s;new s;var e_=new s,ew=new s,eb=new s;/**
 * @method convexParticle
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */d.prototype[r.types.PARTICLE|r.types.CONVEXPOLYHEDRON]=d.prototype.convexParticle=function(e,t,i,n,r,a,s,o){var l=-1,h=null;if(ex.copy(n),ex.vsub(i,ex),r.conjugate(ey),ey.vmult(ex,ex),e.pointIsInside(ex)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,r),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(r);// For each world polygon in the polyhedra
for(var c=0,u=e.faces.length;c!==u;c++){// Construct world face vertices
var d=[e.worldVertices[e.faces[c][0]]],p=e.worldFaceNormals[c];// Check how much the particle penetrates the polygon plane.
n.vsub(d[0],ew);var f=-p.dot(ew);(null===h||Math.abs(f)<Math.abs(h))&&(h=f,l=c,e_.copy(p))}if(-1!==l){// Setup contact
var m=this.createContactEquation(o,s,t,e);e_.mult(h,eb),// rj is the particle position projected to the face
eb.vadd(n,eb),eb.vsub(i,eb),m.rj.copy(eb),//var projectedToFace = xi.vsub(xj).vadd(worldPenetrationVec);
//projectedToFace.copy(r.rj);
//qj.vmult(r.rj,r.rj);
e_.negate(m.ni),m.ri.set(0,0,0);var g=m.ri,v=m.rj;// Make relative to bodies
g.vadd(n,g),g.vsub(o.position,g),v.vadd(i,v),v.vsub(s.position,v),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}},d.prototype[r.types.BOX|r.types.HEIGHTFIELD]=d.prototype.boxHeightfield=function(e,t,i,n,r,a,s,o){e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,n,r,a,s,o)};var eM=new s,eS=new s,eE=[0];/**
 * @method convexHeightfield
 */d.prototype[r.types.CONVEXPOLYHEDRON|r.types.HEIGHTFIELD]=d.prototype.convexHeightfield=function(e,t,i,n,r,a,s,l){var h=t.data,c=t.elementSize,u=e.boundingSphereRadius;o.pointToLocalFrame(n,a,i,eM);// Get the index of the data points to test against
var d=Math.floor((eM.x-u)/c)-1,p=Math.ceil((eM.x+u)/c)+1,f=Math.floor((eM.y-u)/c)-1,m=Math.ceil((eM.y+u)/c)+1;// Bail out if we are out of the terrain
if(!(p<0)&&!(m<0)&&!(d>h.length)&&!(f>h[0].length)){d<0&&(d=0),p<0&&(p=0),f<0&&(f=0),m<0&&(m=0),d>=h.length&&(d=h.length-1),p>=h.length&&(p=h.length-1),m>=h[0].length&&(m=h[0].length-1),f>=h[0].length&&(f=h[0].length-1);var g=[];t.getRectMinMax(d,f,p,m,g);var v=g[0],y=g[1];// Bail out if we're cant touch the bounding height box
if(!(eM.z-u>y)&&!(eM.z+u<v))for(var x=d;x<p;x++)for(var _=f;_<m;_++)// Lower triangle
t.getConvexTrianglePillar(x,_,!1),o.pointToWorldFrame(n,a,t.pillarOffset,eS),i.distanceTo(eS)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&this.convexConvex(e,t.pillarConvex,i,eS,r,a,s,l,null,null,eE,null),// Upper triangle
t.getConvexTrianglePillar(x,_,!0),o.pointToWorldFrame(n,a,t.pillarOffset,eS),i.distanceTo(eS)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&this.convexConvex(e,t.pillarConvex,i,eS,r,a,s,l,null,null,eE,null)}};var eT=new s,eA=new s;/**
 * @method sphereHeightfield
 */d.prototype[r.types.SPHERE|r.types.HEIGHTFIELD]=d.prototype.sphereHeightfield=function(e,t,i,n,r,a,s,l){var h=t.data,c=e.radius,u=t.elementSize;o.pointToLocalFrame(n,a,i,eT);// Get the index of the data points to test against
var d=Math.floor((eT.x-c)/u)-1,p=Math.ceil((eT.x+c)/u)+1,f=Math.floor((eT.y-c)/u)-1,m=Math.ceil((eT.y+c)/u)+1;// Bail out if we are out of the terrain
if(!(p<0)&&!(m<0)&&!(d>h.length)&&!(m>h[0].length)){d<0&&(d=0),p<0&&(p=0),f<0&&(f=0),m<0&&(m=0),d>=h.length&&(d=h.length-1),p>=h.length&&(p=h.length-1),m>=h[0].length&&(m=h[0].length-1),f>=h[0].length&&(f=h[0].length-1);var g=[];t.getRectMinMax(d,f,p,m,g);var v=g[0],y=g[1];// Bail out if we're cant touch the bounding height box
if(!(eT.z-c>y)&&!(eT.z+c<v))for(var x=this.result,_=d;_<p;_++)for(var w=f;w<m;w++){var b=x.length;if(// Lower triangle
t.getConvexTrianglePillar(_,w,!1),o.pointToWorldFrame(n,a,t.pillarOffset,eA),i.distanceTo(eA)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&this.sphereConvex(e,t.pillarConvex,i,eA,r,a,s,l),// Upper triangle
t.getConvexTrianglePillar(_,w,!0),o.pointToWorldFrame(n,a,t.pillarOffset,eA),i.distanceTo(eA)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&this.sphereConvex(e,t.pillarConvex,i,eA,r,a,s,l),x.length-b>2)return;/*
            // Skip all but 1
            for (var k = 0; k < numContacts - 1; k++) {
                result.pop();
            }
            */}}}},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(e,t,i){/* global performance */t.exports=y;var n=e("../shapes/Shape"),r=e("../math/Vec3"),a=e("../math/Quaternion"),s=e("../solver/GSSolver");e("../utils/Vec3Pool"),e("../equations/ContactEquation"),e("../equations/FrictionEquation");var o=e("./Narrowphase"),l=e("../utils/EventTarget"),h=e("../collision/ArrayCollisionMatrix"),c=e("../material/Material"),u=e("../material/ContactMaterial"),d=e("../objects/Body"),p=e("../utils/TupleDictionary"),f=e("../collision/RaycastResult"),m=e("../collision/AABB"),g=e("../collision/Ray"),v=e("../collision/NaiveBroadphase");/**
 * The physics world
 * @class World
 * @constructor
 * @extends EventTarget
 */function y(){l.apply(this),/**
     * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
     * @property {Number} dt
     */this.dt=-1,/**
     * Makes bodies go to sleep when they've been inactive
     * @property allowSleep
     * @type {Boolean}
     */this.allowSleep=!1,/**
     * All the current contacts (instances of ContactEquation) in the world.
     * @property contacts
     * @type {Array}
     */this.contacts=[],this.frictionEquations=[],/**
     * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
     * @property quatNormalizeSkip
     * @type {Number}
     */this.quatNormalizeSkip=0,/**
     * Set to true to use fast quaternion normalization. It is often enough accurate to use. If bodies tend to explode, set to false.
     * @property quatNormalizeFast
     * @type {Boolean}
     * @see Quaternion.normalizeFast
     * @see Quaternion.normalize
     */this.quatNormalizeFast=!1,/**
     * The wall-clock time since simulation start
     * @property time
     * @type {Number}
     */this.time=0,/**
     * Number of timesteps taken since start
     * @property stepnumber
     * @type {Number}
     */this.stepnumber=0,/// Default and last timestep sizes
this.default_dt=1/60,this.nextId=0,/**
     * @property gravity
     * @type {Vec3}
     */this.gravity=new r,/**
     * @property broadphase
     * @type {Broadphase}
     */this.broadphase=new v,/**
     * @property bodies
     * @type {Array}
     */this.bodies=[],/**
     * @property solver
     * @type {Solver}
     */this.solver=new s,/**
     * @property constraints
     * @type {Array}
     */this.constraints=[],/**
     * @property narrowphase
     * @type {Narrowphase}
     */this.narrowphase=new o(this),/**
     * @property {ArrayCollisionMatrix} collisionMatrix
	 * @type {ArrayCollisionMatrix}
	 */this.collisionMatrix=new h,/**
     * CollisionMatrix from the previous step.
     * @property {ArrayCollisionMatrix} collisionMatrixPrevious
	 * @type {ArrayCollisionMatrix}
	 */this.collisionMatrixPrevious=new h,/**
     * All added materials
     * @property materials
     * @type {Array}
     */this.materials=[],/**
     * @property contactmaterials
     * @type {Array}
     */this.contactmaterials=[],/**
     * Used to look up a ContactMaterial given two instances of Material.
     * @property {TupleDictionary} contactMaterialTable
     */this.contactMaterialTable=new p,this.defaultMaterial=new c("default"),/**
     * This contact material is used if no suitable contactmaterial is found for a contact.
     * @property defaultContactMaterial
     * @type {ContactMaterial}
     */this.defaultContactMaterial=new u(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),/**
     * @property doProfiling
     * @type {Boolean}
     */this.doProfiling=!1,/**
     * @property profile
     * @type {Object}
     */this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},/**
     * @property subsystems
     * @type {Array}
     */this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null}}y.prototype=new l,new m;var x=new g;if(/**
 * Get the contact material between materials m1 and m2
 * @method getContactMaterial
 * @param {Material} m1
 * @param {Material} m2
 * @return {ContactMaterial} The contact material if it was found.
 */y.prototype.getContactMaterial=function(e,t){return this.contactMaterialTable.get(e.id,t.id);//this.contactmaterials[this.mats2cmat[i+j*this.materials.length]];
},/**
 * Get number of objects in the world.
 * @method numObjects
 * @return {Number}
 * @deprecated
 */y.prototype.numObjects=function(){return this.bodies.length},/**
 * Store old collision state info
 * @method collisionMatrixTick
 */y.prototype.collisionMatrixTick=function(){var e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset()},/**
 * Add a rigid body to the simulation.
 * @method add
 * @param {Body} body
 * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
 * @todo Adding an array of bodies should be possible. This would save some loops too
 * @deprecated Use .addBody instead
 */y.prototype.add=y.prototype.addBody=function(e){-1===this.bodies.indexOf(e)&&(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof d&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.dispatchEvent(this.addBodyEvent))},/**
 * Add a constraint to the simulation.
 * @method addConstraint
 * @param {Constraint} c
 */y.prototype.addConstraint=function(e){this.constraints.push(e)},/**
 * Removes a constraint
 * @method removeConstraint
 * @param {Constraint} c
 */y.prototype.removeConstraint=function(e){var t=this.constraints.indexOf(e);-1!==t&&this.constraints.splice(t,1)},/**
 * Raycast test
 * @method rayTest
 * @param {Vec3} from
 * @param {Vec3} to
 * @param {Function|RaycastResult} result
 * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
 */y.prototype.rayTest=function(e,t,i){i instanceof f?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)},/**
 * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
 * @method raycastAll
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {Function} callback
 * @return {boolean} True if any body was hit.
 */y.prototype.raycastAll=function(e,t,i,n){return i.mode=g.ALL,i.from=e,i.to=t,i.callback=n,x.intersectWorld(this,i)},/**
 * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
 * @method raycastAny
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {RaycastResult} result
 * @return {boolean} True if any body was hit.
 */y.prototype.raycastAny=function(e,t,i,n){return i.mode=g.ANY,i.from=e,i.to=t,i.result=n,x.intersectWorld(this,i)},/**
 * Ray cast, and return information of the closest hit.
 * @method raycastClosest
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {RaycastResult} result
 * @return {boolean} True if any body was hit.
 */y.prototype.raycastClosest=function(e,t,i,n){return i.mode=g.CLOSEST,i.from=e,i.to=t,i.result=n,x.intersectWorld(this,i)},/**
 * Remove a rigid body from the simulation.
 * @method remove
 * @param {Body} body
 * @deprecated Use .removeBody instead
 */y.prototype.remove=function(e){e.world=null;var t=this.bodies.length-1,i=this.bodies,n=i.indexOf(e);if(-1!==n){i.splice(n,1);// Recompute index
for(var r=0;r!==i.length;r++)i[r].index=r;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,this.dispatchEvent(this.removeBodyEvent)}},/**
 * Remove a rigid body from the simulation.
 * @method removeBody
 * @param {Body} body
 */y.prototype.removeBody=y.prototype.remove,/**
 * Adds a material to the World.
 * @method addMaterial
 * @param {Material} m
 * @todo Necessary?
 */y.prototype.addMaterial=function(e){this.materials.push(e)},/**
 * Adds a contact material to the World
 * @method addContactMaterial
 * @param {ContactMaterial} cmat
 */y.prototype.addContactMaterial=function(e){// Add contact material
this.contactmaterials.push(e),// Add current contact material to the material table
this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)},"undefined"==typeof performance&&(performance={}),!performance.now){var _=Date.now();performance.timing&&performance.timing.navigationStart&&(_=performance.timing.navigationStart),performance.now=function(){return Date.now()-_}}var w=new r;/**
 * Step the physics world forward in time.
 *
 * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
 *
 * @method step
 * @param {Number} dt                       The fixed time step size to use.
 * @param {Number} [timeSinceLastCalled]    The time elapsed since the function was last called.
 * @param {Number} [maxSubSteps=10]         Maximum number of fixed steps to take per function call.
 *
 * @example
 *     // fixed timestepping without interpolation
 *     world.step(1/60);
 *
 * @see http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World
 */y.prototype.step=function(e,t,i){if(i=i||10,0===(t=t||0))this.internalStep(e),// Increment time
this.time+=e;else{// Compute the number of fixed steps we should have taken since the last step
var n=Math.floor((this.time+t)/e)-Math.floor(this.time/e);n=Math.min(n,i);for(var r=performance.now(),a=0;a!==n&&(this.internalStep(e),!(performance.now()-r>1e3*e));a++);// Increment internal clock
this.time+=t;for(var s=this.time%e/e,o=this.bodies,l=0;l!==o.length;l++){var h=o[l];h.type!==d.STATIC&&h.sleepState!==d.SLEEPING?(// Interpolate
h.position.vsub(h.previousPosition,w),w.scale(s,w),h.position.vadd(w,h.interpolatedPosition)):(// For static bodies, just copy. Who else will do it?
h.interpolatedPosition.copy(h.position),h.interpolatedQuaternion.copy(h.quaternion))}}};/**
 * Step the simulation
 * @method step
 * @param {Number} dt
 */var b={type:"postStep"},M={type:"preStep"},S={type:"collide",body:null,contact:null},E=[],T=[],A=[],R=[],C=(new r,new r,new r,new r,new r,new r,new r,new r,new r,new a,new a),P=new a,L=new r;y.prototype.internalStep=function(e){this.dt=e;var t,i=this.contacts,r=this.numObjects(),a=this.bodies,s=this.solver,o=this.gravity,l=this.doProfiling,h=this.profile,c=d.DYNAMIC,u=this.constraints,p=(o.norm(),o.x),f=o.y,m=o.z,g=0;// Add gravity to all objects
for(l&&(t=performance.now()),g=0;g!==r;g++){var v=a[g];if(v.type&c){var y=v.force,x=v.mass;y.x+=x*p,y.y+=x*f,y.z+=x*m}}// Update subsystems
for(var g=0,_=this.subsystems.length;g!==_;g++)this.subsystems[g].update();l&&(t=performance.now()),A.length=0,R.length=0,this.broadphase.collisionPairs(this,A,R),l&&(h.broadphase=performance.now()-t);// Remove constrained pairs with collideConnected == false
var w=u.length;for(g=0;g!==w;g++){var N=u[g];if(!N.collideConnected)for(var I=A.length-1;I>=0;I-=1)(N.bodyA===A[I]&&N.bodyB===R[I]||N.bodyB===A[I]&&N.bodyA===R[I])&&(A.splice(I,1),R.splice(I,1))}this.collisionMatrixTick(),l&&(t=performance.now());var U=i.length;for(g=0;g!==U;g++)E.push(i[g]);i.length=0;// Transfer FrictionEquation from current list to the pool for reuse
var D=this.frictionEquations.length;for(g=0;g!==D;g++)T.push(this.frictionEquations[g]);this.frictionEquations.length=0,this.narrowphase.getContacts(A,R,this,i,E,this.frictionEquations,T),l&&(h.narrowphase=performance.now()-t),l&&(t=performance.now());// Add all friction eqs
for(var g=0;g<this.frictionEquations.length;g++)s.addEquation(this.frictionEquations[g]);for(var O=i.length,z=0;z!==O;z++){// Current contact
var N=i[z],v=N.bi,B=N.bj;N.si,N.sj,(v.material&&B.material&&this.getContactMaterial(v.material,B.material)||this.defaultContactMaterial).friction,v.material&&B.material&&(v.material.friction>=0&&B.material.friction>=0&&(v.material.friction,B.material.friction),v.material.restitution>=0&&B.material.restitution>=0&&(N.restitution=v.material.restitution*B.material.restitution)),// c.setSpookParams(
//           cm.contactEquationStiffness,
//           cm.contactEquationRelaxation,
//           dt
//       );
s.addEquation(N),v.allowSleep&&v.type===d.DYNAMIC&&v.sleepState===d.SLEEPING&&B.sleepState===d.AWAKE&&B.type!==d.STATIC&&B.velocity.norm2()+B.angularVelocity.norm2()>=2*Math.pow(B.sleepSpeedLimit,2)&&(v._wakeUpAfterNarrowphase=!0),B.allowSleep&&B.type===d.DYNAMIC&&B.sleepState===d.SLEEPING&&v.sleepState===d.AWAKE&&v.type!==d.STATIC&&v.velocity.norm2()+v.angularVelocity.norm2()>=2*Math.pow(v.sleepSpeedLimit,2)&&(B._wakeUpAfterNarrowphase=!0),// Now we know that i and j are in contact. Set collision matrix state
this.collisionMatrix.set(v,B,!0),this.collisionMatrixPrevious.get(v,B)||(// First contact!
// We reuse the collideEvent object, otherwise we will end up creating new objects for each new contact, even if there's no event listener attached.
S.body=B,S.contact=N,v.dispatchEvent(S),S.body=v,B.dispatchEvent(S))}// Wake up bodies
for(l&&(h.makeContactConstraints=performance.now()-t,t=performance.now()),g=0;g!==r;g++){var v=a[g];v._wakeUpAfterNarrowphase&&(v.wakeUp(),v._wakeUpAfterNarrowphase=!1)}// Add user-added constraints
var w=u.length;for(g=0;g!==w;g++){var N=u[g];N.update();for(var I=0,F=N.equations.length;I!==F;I++){var V=N.equations[I];s.addEquation(V)}}// Solve the constrained system
s.solve(e,this),l&&(h.solve=performance.now()-t),// Remove all contacts from solver
s.removeAllEquations();// Apply damping, see http://code.google.com/p/bullet/issues/detail?id=74 for details
var H=Math.pow;for(g=0;g!==r;g++){var v=a[g];if(v.type&c){var W=H(1-v.linearDamping,e),k=v.velocity;k.mult(W,k);var G=v.angularVelocity;if(G){var q=H(1-v.angularDamping,e);G.mult(q,G)}}}// Invoke pre-step callbacks
for(this.dispatchEvent(M),g=0;g!==r;g++){var v=a[g];v.preStep&&v.preStep.call(v)}l&&(t=performance.now());var j=this.stepnumber,X=d.DYNAMIC|d.KINEMATIC,Y=j%(this.quatNormalizeSkip+1)==0,Z=this.quatNormalizeFast,K=.5*e;for(n.types.PLANE,n.types.CONVEXPOLYHEDRON,g=0;g!==r;g++){var J=a[g],Q=J.force,$=J.torque;if(J.type&X&&J.sleepState!==d.SLEEPING){var ee=J.velocity,et=J.angularVelocity,ei=J.position,en=J.quaternion,er=J.invMass,ea=J.invInertiaWorld;ee.x+=Q.x*er*e,ee.y+=Q.y*er*e,ee.z+=Q.z*er*e,J.angularVelocity&&(ea.vmult($,L),L.mult(e,L),L.vadd(et,et)),// Use new velocity  - leap frog
ei.x+=ee.x*e,ei.y+=ee.y*e,ei.z+=ee.z*e,J.angularVelocity&&(C.set(et.x,et.y,et.z,0),C.mult(en,P),en.x+=K*P.x,en.y+=K*P.y,en.z+=K*P.z,en.w+=K*P.w,Y&&(Z?en.normalizeFast():en.normalize())),J.aabb&&(J.aabbNeedsUpdate=!0),J.updateInertiaWorld&&J.updateInertiaWorld()}}// Invoke post-step callbacks
for(this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=performance.now()-t),// Update world time
this.time+=e,this.stepnumber+=1,this.dispatchEvent(b),g=0;g!==r;g++){var v=a[g],es=v.postStep;es&&es.call(v)}// Sleeping update
if(this.allowSleep)for(g=0;g!==r;g++)a[g].sleepTick(this.time)},/**
 * Sets all body forces in the world to zero.
 * @method clearForces
 */y.prototype.clearForces=function(){for(var e=this.bodies,t=e.length,i=0;i!==t;i++){var n=e[i];n.force,n.torque,n.force.set(0,0,0),n.torque.set(0,0,0)}}},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])(2);var l9=function(){var e=0,t=document.createElement("div");//
function i(e){return t.appendChild(e.dom),e}function n(i){for(var n=0;n<t.children.length;n++)t.children[n].style.display=n===i?"block":"none";e=i}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",function(i){i.preventDefault(),n(++e%t.children.length)},!1);//
var r=(performance||Date).now(),a=r,s=0,o=i(new l9.Panel("FPS","#0ff","#002")),l=i(new l9.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=i(new l9.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:t,addPanel:i,showPanel:n,begin:function(){r=(performance||Date).now()},end:function(){s++;var e=(performance||Date).now();if(l.update(e-r,200),e>=a+1e3&&(o.update(1e3*s/(e-a),100),a=e,s=0,h)){var t=performance.memory;h.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){r=this.end()},// Backwards Compatibility
domElement:t,setMode:n}};l9.Panel=function(e,t,i){var n=1/0,r=0,a=Math.round,s=a(window.devicePixelRatio||1),o=80*s,l=48*s,h=3*s,c=2*s,u=3*s,d=15*s,p=74*s,f=30*s,m=document.createElement("canvas");m.width=o,m.height=l,m.style.cssText="width:80px;height:48px";var g=m.getContext("2d");return g.font="bold "+9*s+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=i,g.fillRect(0,0,o,l),g.fillStyle=t,g.fillText(e,h,c),g.fillRect(u,d,p,f),g.fillStyle=i,g.globalAlpha=.9,g.fillRect(u,d,p,f),{dom:m,update:function(l,v){n=Math.min(n,l),r=Math.max(r,l),g.fillStyle=i,g.globalAlpha=1,g.fillRect(0,0,o,d),g.fillStyle=t,g.fillText(a(l)+" "+e+" ("+a(n)+"-"+a(r)+")",h,c),g.drawImage(m,u+s,d,p-s,f,u,d,p-s,f),g.fillRect(u+p-s,d,s,f),g.fillStyle=i,g.globalAlpha=.9,g.fillRect(u+p-s,d,s,a((1-l/v)*f))}}};//scene
const he=new class extends eK{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),null!==e.background&&(this.background=e.background.clone()),null!==e.environment&&(this.environment=e.environment.clone()),null!==e.fog&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,null!==e.overrideMaterial&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return null!==this.fog&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),1!==this.backgroundIntensity&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},ht=new tY(75,window.innerWidth/window.innerHeight,.1,1e3),hi=new rs;hi.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(hi.domElement);//OrbitControls
const hn=new class extends f{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",// Set to false to disable this control
this.enabled=!0,// "target" sets the location of focus, where the object orbits around
this.target=new Z,// How far you can dolly in and out ( PerspectiveCamera only )
this.minDistance=0,this.maxDistance=1/0,// How far you can zoom in and out ( OrthographicCamera only )
this.minZoom=0,this.maxZoom=1/0,// How far you can orbit vertically, upper and lower limits.
// Range is 0 to Math.PI radians.
this.minPolarAngle=0,this.maxPolarAngle=Math.PI,// How far you can orbit horizontally, upper and lower limits.
// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,// Set to true to enable damping (inertia)
// If damping is enabled, you must call controls.update() in your animation loop
this.enableDamping=!1,this.dampingFactor=.05,// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
// Set to false to disable zooming
this.enableZoom=!0,this.zoomSpeed=1,// Set to false to disable rotating
this.enableRotate=!0,this.rotateSpeed=1,// Set to false to disable panning
this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,// Set to true to automatically rotate around the target
// If auto-rotate is enabled, you must call controls.update() in your animation loop
this.autoRotate=!1,this.autoRotateSpeed=2,// The four arrow keys
this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},// Mouse buttons
this.mouseButtons={LEFT:l.ROTATE,MIDDLE:l.DOLLY,RIGHT:l.PAN},// Touch fingers
this.touches={ONE:h.ROTATE,TWO:h.DOLLY_PAN},// for reset
this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,// the target DOM element for key events
this._domElementKeyEvents=null,//
// public methods
//
this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",J),this._domElementKeyEvents=e},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",J),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(l3),i.update(),r=n.NONE},// this method is exposed, but perhaps it would be better if we can make it private...
this.update=function(){let t=new Z,l=new Y().setFromUnitVectors(e.up,new Z(0,1,0)),h=l.clone().invert(),d=new Z,p=new Y,f=new Z,m=2*Math.PI;return function(g=null){let v=i.object.position;t.copy(v).sub(i.target),// rotate offset to "y-axis-is-up" space
t.applyQuaternion(l),// angle from z-axis around y-axis
s.setFromVector3(t),i.autoRotate&&r===n.NONE&&R(null!==g?2*Math.PI/60*i.autoRotateSpeed*g:2*Math.PI/60/60*i.autoRotateSpeed),i.enableDamping?(s.theta+=o.theta*i.dampingFactor,s.phi+=o.phi*i.dampingFactor):(s.theta+=o.theta,s.phi+=o.phi);// restrict theta to be between desired limits
let y=i.minAzimuthAngle,x=i.maxAzimuthAngle;isFinite(y)&&isFinite(x)&&(y<-Math.PI?y+=m:y>Math.PI&&(y-=m),x<-Math.PI?x+=m:x>Math.PI&&(x-=m),y<=x?s.theta=Math.max(y,Math.min(x,s.theta)):s.theta=s.theta>(y+x)/2?Math.max(y,s.theta):Math.min(x,s.theta)),// restrict phi to be between desired limits
s.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,s.phi)),s.makeSafe(),!0===i.enableDamping?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.zoomToCursor&&M||i.object.isOrthographicCamera?s.radius=O(s.radius):s.radius=O(s.radius*c),t.setFromSpherical(s),// rotate offset back to "camera-up-vector-is-up" space
t.applyQuaternion(h),v.copy(i.target).add(t),i.object.lookAt(i.target),!0===i.enableDamping?(o.theta*=1-i.dampingFactor,o.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(o.set(0,0,0),u.set(0,0,0));// adjust camera position
let _=!1;if(i.zoomToCursor&&M){let n=null;if(i.object.isPerspectiveCamera){// move the camera down the pointer ray
// this method avoids floating point error
let e=t.length();n=O(e*c);let r=e-n;i.object.position.addScaledVector(w,r),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){// adjust the ortho camera position based on zoom changes
let e=new Z(b.x,b.y,0);e.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),_=!0;let r=new Z(b.x,b.y,0);r.unproject(i.object),i.object.position.sub(r).add(e),i.object.updateMatrixWorld(),n=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;// handle the placement of the target
null!==n&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(n).add(i.object.position):(// get the ray and translation plane to compute target
l6.origin.copy(i.object.position),l6.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(l6.direction))<l8?e.lookAt(i.target):(l7.setFromNormalAndCoplanarPoint(i.object.up,i.target),l6.intersectPlane(l7,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),_=!0);return(// update condition is:
// min(camera displacement, camera rotation in radians)^2 > EPS
// using small-angle approximation cos(x/2) = 1 - x^2 / 8
c=1,M=!1,!!(_||d.distanceToSquared(i.object.position)>a||8*(1-p.dot(i.object.quaternion))>a||f.distanceToSquared(i.target)>0)&&(i.dispatchEvent(l3),d.copy(i.object.position),p.copy(i.object.quaternion),f.copy(i.target),_=!1,!0))}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Q),i.domElement.removeEventListener("pointerdown",q),i.domElement.removeEventListener("pointercancel",X),i.domElement.removeEventListener("wheel",K),i.domElement.removeEventListener("pointermove",j),i.domElement.removeEventListener("pointerup",X),null!==i._domElementKeyEvents&&(i._domElementKeyEvents.removeEventListener("keydown",J),i._domElementKeyEvents=null);//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
};//
// internals
//
let i=this,n={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=n.NONE,a=1e-6,s=new aR,o=new aR,c=1,u=new Z,d=new S,p=new S,f=new S,m=new S,g=new S,v=new S,y=new S,x=new S,_=new S,w=new Z,b=new S,M=!1,E=[],T={};function A(){return Math.pow(.95,i.zoomSpeed)}function R(e){o.theta-=e}function C(e){o.phi-=e}let P=function(){let e=new Z;return function(t,i){e.setFromMatrixColumn(i,0),e.multiplyScalar(-t),u.add(e)}}(),L=function(){let e=new Z;return function(t,n){!0===i.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(i.object.up,e)),e.multiplyScalar(t),u.add(e)}}(),N=function(){let e=new Z;return function(t,n){let r=i.domElement;if(i.object.isPerspectiveCamera){// perspective
let a=i.object.position;e.copy(a).sub(i.target);let s=e.length();// we use only clientHeight here so aspect ratio does not distort speed
P(2*t*// half of the fov is center to top of screen
(s*=Math.tan(i.object.fov/2*Math.PI/180))/r.clientHeight,i.object.matrix),L(2*n*s/r.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(// orthographic
P(t*(i.object.right-i.object.left)/i.object.zoom/r.clientWidth,i.object.matrix),L(n*(i.object.top-i.object.bottom)/i.object.zoom/r.clientHeight,i.object.matrix)):(// camera neither orthographic nor perspective
console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function I(e){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function U(e){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function D(e){if(!i.zoomToCursor)return;M=!0;let t=i.domElement.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,a=t.width,s=t.height;b.x=n/a*2-1,b.y=-(2*(r/s))+1,w.set(b.x,b.y,1).unproject(i.object).sub(i.object.position).normalize()}function O(e){return Math.max(i.minDistance,Math.min(i.maxDistance,e))}//
// event callbacks - update the object state
//
function z(e){d.set(e.clientX,e.clientY)}function B(e){m.set(e.clientX,e.clientY)}function F(){if(1===E.length)d.set(E[0].pageX,E[0].pageY);else{let e=.5*(E[0].pageX+E[1].pageX),t=.5*(E[0].pageY+E[1].pageY);d.set(e,t)}}function V(){if(1===E.length)m.set(E[0].pageX,E[0].pageY);else{let e=.5*(E[0].pageX+E[1].pageX),t=.5*(E[0].pageY+E[1].pageY);m.set(e,t)}}function H(){let e=E[0].pageX-E[1].pageX,t=E[0].pageY-E[1].pageY;y.set(0,Math.sqrt(e*e+t*t))}function W(e){if(1==E.length)p.set(e.pageX,e.pageY);else{let t=ee(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);p.set(i,n)}f.subVectors(p,d).multiplyScalar(i.rotateSpeed);let t=i.domElement;R(2*Math.PI*f.x/t.clientHeight),C(2*Math.PI*f.y/t.clientHeight),d.copy(p)}function k(e){if(1===E.length)g.set(e.pageX,e.pageY);else{let t=ee(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);g.set(i,n)}v.subVectors(g,m).multiplyScalar(i.panSpeed),N(v.x,v.y),m.copy(g)}function G(e){let t=ee(e),n=e.pageX-t.x,r=e.pageY-t.y;x.set(0,Math.sqrt(n*n+r*r)),_.set(0,Math.pow(x.y/y.y,i.zoomSpeed)),I(_.y),y.copy(x)}//
// event handlers - FSM: listen for events and reset state
//
function q(e){!1!==i.enabled&&(0===E.length&&(i.domElement.setPointerCapture(e.pointerId),i.domElement.addEventListener("pointermove",j),i.domElement.addEventListener("pointerup",X)),E.push(e),"touch"===e.pointerType?function(e){switch($(e),E.length){case 1:switch(i.touches.ONE){case h.ROTATE:if(!1===i.enableRotate)return;F(),r=n.TOUCH_ROTATE;break;case h.PAN:if(!1===i.enablePan)return;V(),r=n.TOUCH_PAN;break;default:r=n.NONE}break;case 2:switch(i.touches.TWO){case h.DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&H(),i.enablePan&&V(),r=n.TOUCH_DOLLY_PAN;break;case h.DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&H(),i.enableRotate&&F(),r=n.TOUCH_DOLLY_ROTATE;break;default:r=n.NONE}break;default:r=n.NONE}r!==n.NONE&&i.dispatchEvent(l4)}(e):function(e){let t;switch(e.button){case 0:t=i.mouseButtons.LEFT;break;case 1:t=i.mouseButtons.MIDDLE;break;case 2:t=i.mouseButtons.RIGHT;break;default:t=-1}switch(t){case l.DOLLY:if(!1===i.enableZoom)return;D(e),y.set(e.clientX,e.clientY),r=n.DOLLY;break;case l.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enablePan)return;B(e),r=n.PAN}else{if(!1===i.enableRotate)return;z(e),r=n.ROTATE}break;case l.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enableRotate)return;z(e),r=n.ROTATE}else{if(!1===i.enablePan)return;B(e),r=n.PAN}break;default:r=n.NONE}r!==n.NONE&&i.dispatchEvent(l4)}(e))}function j(e){!1!==i.enabled&&("touch"===e.pointerType?function(e){switch($(e),r){case n.TOUCH_ROTATE:if(!1===i.enableRotate)return;W(e),i.update();break;case n.TOUCH_PAN:if(!1===i.enablePan)return;k(e),i.update();break;case n.TOUCH_DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&G(e),i.enablePan&&k(e),i.update();break;case n.TOUCH_DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&G(e),i.enableRotate&&W(e),i.update();break;default:r=n.NONE}}(e):function(e){switch(r){case n.ROTATE:if(!1===i.enableRotate)return;!function(e){p.set(e.clientX,e.clientY),f.subVectors(p,d).multiplyScalar(i.rotateSpeed);let t=i.domElement;R(2*Math.PI*f.x/t.clientHeight),C(2*Math.PI*f.y/t.clientHeight),d.copy(p),i.update()}(e);break;case n.DOLLY:if(!1===i.enableZoom)return;x.set(e.clientX,e.clientY),_.subVectors(x,y),_.y>0?I(A()):_.y<0&&U(A()),y.copy(x),i.update();break;case n.PAN:if(!1===i.enablePan)return;g.set(e.clientX,e.clientY),v.subVectors(g,m).multiplyScalar(i.panSpeed),N(v.x,v.y),m.copy(g),i.update()}}(e))}function X(e){(function(e){delete T[e.pointerId];for(let t=0;t<E.length;t++)if(E[t].pointerId==e.pointerId){E.splice(t,1);return}})(e),0===E.length&&(i.domElement.releasePointerCapture(e.pointerId),i.domElement.removeEventListener("pointermove",j),i.domElement.removeEventListener("pointerup",X)),i.dispatchEvent(l5),r=n.NONE}function K(e){!1!==i.enabled&&!1!==i.enableZoom&&r===n.NONE&&(e.preventDefault(),i.dispatchEvent(l4),D(e),e.deltaY<0?U(A()):e.deltaY>0&&I(A()),i.update(),i.dispatchEvent(l5))}function J(e){!1!==i.enabled&&!1!==i.enablePan&&function(e){let t=!1;switch(e.code){case i.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?C(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,i.keyPanSpeed),t=!0;break;case i.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?C(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,-i.keyPanSpeed),t=!0;break;case i.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?R(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(i.keyPanSpeed,0),t=!0;break;case i.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?R(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(-i.keyPanSpeed,0),t=!0}t&&(// prevent the browser from scrolling on cursor keys
e.preventDefault(),i.update())}(e)}function Q(e){!1!==i.enabled&&e.preventDefault()}function $(e){let t=T[e.pointerId];void 0===t&&(t=new S,T[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ee(e){let t=e.pointerId===E[0].pointerId?E[1]:E[0];return T[t.pointerId]}//
i.domElement.addEventListener("contextmenu",Q),i.domElement.addEventListener("pointerdown",q),i.domElement.addEventListener("pointercancel",X),i.domElement.addEventListener("wheel",K,{passive:!1}),// force an update at start
this.update()}}(ht,hi.domElement);//lights
hi.shadowMap.enabled=!0,hi.shadowMap.type=2;const hr=new class extends au{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}(8947848);he.add(hr);const ha=new class extends au{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(eK.DEFAULT_UP),this.updateMatrix(),this.target=new eK,this.shadow=new ag}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}(14540253);ha.position.set(3,10,4),ha.target.position.set(0,0,0),ha.castShadow=!0,he.add(ha);const hs=[];for(let e=0;e<257;e++){hs.push([]);for(let t=0;t<257;t++){// Вычислите новую высоту с учетом масштабирования
let i=Math.floor(e/2),n=Math.floor(t/2),r=Math.cos(i/128*Math.PI*5)*Math.cos(n/128*Math.PI*5)*2+2;hs[e].push(r)}}// inscreasing matrix for edges
const ho=[];for(let e=0;e<256;e++){ho.push([]);for(let t=0;t<256;t++){let i=0;// inscreasing
if(0===e||255===e||0===t||255===t)i=50;else{// inner points remain standard
let n=e-1,r=t-1;i=hs[n][r]}ho[e].push(i)}}// const planeGeometry = new THREE.PlaneGeometry(
//   planeWidth,
//   planeHeight,
//   segmentsX,
//   segmentsY
// );
// planeGeometry.rotateX(-Math.PI / 2);
// /////////////////////////////////////
// const planeMaterial = new THREE.MeshPhongMaterial({
//   color: 0x888888,
//   // wireframe: true,
//   flatShading: true,
// });
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.receiveShadow = true;
// scene.add(planeMesh);
//three body
const hl=new class extends te{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ta(16777215),this.specular=new ta(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ta(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new S(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}({color:16711680}),hh=new tH(8,1.7,4);new class extends te{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new S(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};const hc=new tF(hh,hl);he.add(hc);//three wheels
const hu=new r4(1),hd=new tF(hu,hl);he.add(hd);const hp=new r4(1),hf=new tF(hp,hl);he.add(hf);const hm=new r4(1),hg=new tF(hm,hl);he.add(hg);const hv=new r4(1),hy=new tF(hv,hl);he.add(hy);//cannon world
const hx=new /**
 * The physics world
 */class extends aF{/**
   * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
   *//**
   * Makes bodies go to sleep when they've been inactive.
   * @default false
   *//**
   * All the current contacts (instances of ContactEquation) in the world.
   *//**
   * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
   * @default 0
   *//**
   * Set to true to use fast quaternion normalization. It is often enough accurate to use.
   * If bodies tend to explode, set to false.
   * @default false
   *//**
   * The wall-clock time since simulation start.
   *//**
   * Number of timesteps taken since start.
   *//**
   * Default and last timestep sizes.
   *//**
   * The gravity of the world.
   *//**
   * Gravity to use when approximating the friction max force (mu*mass*gravity).
   * If undefined, global gravity will be used.
   * Use to enable friction in a World with a null gravity vector (no gravity).
   *//**
   * The broadphase algorithm to use.
   * @default NaiveBroadphase
   *//**
   * All bodies in this world
   *//**
   * True if any bodies are not sleeping, false if every body is sleeping.
   *//**
   * The solver algorithm to use.
   * @default GSSolver
   *//**
   * collisionMatrix
   *//**
   * CollisionMatrix from the previous step.
   *//**
   * All added contactmaterials.
   *//**
   * Used to look up a ContactMaterial given two instances of Material.
   *//**
   * The default material of the bodies.
   *//**
   * This contact material is used if no suitable contactmaterial is found for a contact.
   *//**
   * Time accumulator for interpolation.
   * @see https://gafferongames.com/game-physics/fix-your-timestep/
   *//**
   * Dispatched after a body has been added to the world.
   *//**
   * Dispatched after a body has been removed from the world.
   */constructor(e){void 0===e&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=void 0!==e.quatNormalizeSkip?e.quatNormalizeSkip:0,this.quatNormalizeFast=void 0!==e.quatNormalizeFast&&e.quatNormalizeFast,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new aL,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new aL,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=void 0!==e.broadphase?e.broadphase:new su,this.bodies=[],this.hasActiveBodies=!1,this.solver=void 0!==e.solver?e.solver:new oE,this.constraints=[],this.narrowphase=new oN(this),this.collisionMatrix=new aB,this.collisionMatrixPrevious=new aB,this.bodyOverlapKeeper=new lB,this.shapeOverlapKeeper=new lB,this.contactmaterials=[],this.contactMaterialTable=new lH,this.defaultMaterial=new oc("default"),this.defaultContactMaterial=new oh(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}/**
   * Get the contact material between materials m1 and m2
   * @return The contact material if it was found.
   */getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}/**
   * Store old collision state info
   */collisionMatrixTick(){let e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}/**
   * Add a constraint to the simulation.
   */addConstraint(e){this.constraints.push(e)}/**
   * Removes a constraint
   */removeConstraint(e){let t=this.constraints.indexOf(e);-1!==t&&this.constraints.splice(t,1)}/**
   * Raycast test
   * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
   */rayTest(e,t,i){i instanceof sd?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)}/**
   * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
   * @return True if any body was hit.
   */raycastAll(e,t,i,n){return void 0===i&&(i={}),i.mode=sf.ALL,i.from=e,i.to=t,i.callback=n,lW.intersectWorld(this,i)}/**
   * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
   * @return True if any body was hit.
   */raycastAny(e,t,i,n){return void 0===i&&(i={}),i.mode=sf.ANY,i.from=e,i.to=t,i.result=n,lW.intersectWorld(this,i)}/**
   * Ray cast, and return information of the closest hit.
   * @return True if any body was hit.
   */raycastClosest(e,t,i,n){return void 0===i&&(i={}),i.mode=sf.CLOSEST,i.from=e,i.to=t,i.result=n,lW.intersectWorld(this,i)}/**
   * Add a rigid body to the simulation.
   * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
   * @todo Adding an array of bodies should be possible. This would save some loops too
   */addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof a2&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}/**
   * Remove a rigid body from the simulation.
   */removeBody(e){e.world=null;let t=this.bodies.length-1,i=this.bodies,n=i.indexOf(e);if(-1!==n){i.splice(n,1);// Recompute index
for(let e=0;e!==i.length;e++)i[e].index=e;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}/**
   * @todo Make a faster map
   */getShapeById(e){let t=this.bodies;for(let i=0;i<t.length;i++){let n=t[i].shapes;for(let t=0;t<n.length;t++){let i=n[t];if(i.id===e)return i}}return null}/**
   * Adds a contact material to the World
   */addContactMaterial(e){// Add contact material
this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}/**
   * Removes a contact material from the World.
   */removeContactMaterial(e){let t=this.contactmaterials.indexOf(e);-1!==t&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}/**
   * Step the simulation forward keeping track of last called time
   * to be able to step the world at a fixed rate, independently of framerate.
   *
   * @param dt The fixed time step size to use (default: 1 / 60).
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://gafferongames.com/post/fix_your_timestep/
   * @example
   *     // Run the simulation independently of framerate every 1 / 60 ms
   *     world.fixedStep()
   */fixedStep(e,t){void 0===e&&(e=1/60),void 0===t&&(t=10);let i=lk.now()/1e3;// seconds
if(this.lastCallTime){let n=i-this.lastCallTime;this.step(e,n,t)}else this.step(e,void 0,t);this.lastCallTime=i}/**
   * Step the physics world forward in time.
   *
   * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
   *
   * @param dt The fixed time step size to use.
   * @param timeSinceLastCalled The time elapsed since the function was last called.
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://web.archive.org/web/20180426154531/http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World#What_do_the_parameters_to_btDynamicsWorld::stepSimulation_mean.3F
   * @example
   *     // fixed timestepping without interpolation
   *     world.step(1 / 60)
   */step(e,t,i){if(void 0===i&&(i=10),void 0===t)// Fixed, simple stepping
this.internalStep(e),this.time+=e;else{this.accumulator+=t;let n=lk.now(),r=0;for(;this.accumulator>=e&&r<i&&(// Do fixed steps to catch up
this.internalStep(e),this.accumulator-=e,r++,!(lk.now()-n>1e3*e)););// Remove the excess accumulator, since we may not
// have had enough substeps available to catch up
this.accumulator=this.accumulator%e;let a=this.accumulator/e;for(let e=0;e!==this.bodies.length;e++){let t=this.bodies[e];t.previousPosition.lerp(t.position,a,t.interpolatedPosition),t.previousQuaternion.slerp(t.quaternion,a,t.interpolatedQuaternion),t.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;let t=this.contacts,i=this.bodies.length,n=this.bodies,r=this.solver,a=this.gravity,s=this.doProfiling,o=this.profile,l=a2.DYNAMIC,h=-1/0,c=this.constraints;a.length();let u=a.x,d=a.y,p=a.z,f=0;// Add gravity to all objects
for(s&&(h=lk.now()),f=0;f!==i;f++){let e=n[f];if(e.type===l){// Only for dynamic bodies
let t=e.force,i=e.mass;t.x+=i*u,t.y+=i*d,t.z+=i*p}}// Update subsystems
for(let e=0,t=this.subsystems.length;e!==t;e++)this.subsystems[e].update();s&&(h=lk.now()),lZ.length=0,lK.length=0,this.broadphase.collisionPairs(this,lZ,lK),s&&(o.broadphase=lk.now()-h);// Remove constrained pairs with collideConnected == false
let m=c.length;for(f=0;f!==m;f++){let e=c[f];if(!e.collideConnected)for(let t=lZ.length-1;t>=0;t-=1)(e.bodyA===lZ[t]&&e.bodyB===lK[t]||e.bodyB===lZ[t]&&e.bodyA===lK[t])&&(lZ.splice(t,1),lK.splice(t,1))}this.collisionMatrixTick(),s&&(h=lk.now());let g=t.length;for(f=0;f!==g;f++)lX.push(t[f]);t.length=0;let v=this.frictionEquations.length;for(f=0;f!==v;f++)lY.push(this.frictionEquations[f]);// Add all friction eqs
for(this.frictionEquations.length=0,this.narrowphase.getContacts(lZ,lK,this,t,lX,this.frictionEquations,lY),s&&(o.narrowphase=lk.now()-h),s&&(h=lk.now()),f=0;f<this.frictionEquations.length;f++)r.addEquation(this.frictionEquations[f]);let y=t.length;for(let e=0;e!==y;e++){// Current contact
let i=t[e],n=i.bi,a=i.bj,s=i.si,o=i.sj;// Get current collision indeces
// if(mu > 0){
// 	// Create 2 tangent equations
// 	const mug = mu * gnorm;
// 	const reducedMass = (bi.invMass + bj.invMass);
// 	if(reducedMass > 0){
// 		reducedMass = 1/reducedMass;
// 	}
// 	const pool = frictionEquationPool;
// 	const c1 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
// 	const c2 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
// 	this.frictionEquations.push(c1, c2);
// 	c1.bi = c2.bi = bi;
// 	c1.bj = c2.bj = bj;
// 	c1.minForce = c2.minForce = -mug*reducedMass;
// 	c1.maxForce = c2.maxForce = mug*reducedMass;
// 	// Copy over the relative vectors
// 	c1.ri.copy(c.ri);
// 	c1.rj.copy(c.rj);
// 	c2.ri.copy(c.ri);
// 	c2.rj.copy(c.rj);
// 	// Construct tangents
// 	c.ni.tangents(c1.t, c2.t);
//           // Set spook params
//           c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
//           c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
//           c1.enabled = c2.enabled = c.enabled;
// 	// Add equations to solver
// 	solver.addEquation(c1);
// 	solver.addEquation(c2);
// }
if(// c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;
(n.material&&a.material&&this.getContactMaterial(n.material,a.material)||this.defaultContactMaterial).friction,n.material&&a.material&&(n.material.friction>=0&&a.material.friction>=0&&(n.material.friction,a.material.friction),n.material.restitution>=0&&a.material.restitution>=0&&(i.restitution=n.material.restitution*a.material.restitution)),//           cm.contactEquationStiffness,
//           cm.contactEquationRelaxation,
//           dt
//       );
r.addEquation(i),n.allowSleep&&n.type===a2.DYNAMIC&&n.sleepState===a2.SLEEPING&&a.sleepState===a2.AWAKE&&a.type!==a2.STATIC){let e=a.velocity.lengthSquared()+a.angularVelocity.lengthSquared(),t=a.sleepSpeedLimit**2;e>=2*t&&(n.wakeUpAfterNarrowphase=!0)}if(a.allowSleep&&a.type===a2.DYNAMIC&&a.sleepState===a2.SLEEPING&&n.sleepState===a2.AWAKE&&n.type!==a2.STATIC){let e=n.velocity.lengthSquared()+n.angularVelocity.lengthSquared(),t=n.sleepSpeedLimit**2;e>=2*t&&(a.wakeUpAfterNarrowphase=!0)}// Now we know that i and j are in contact. Set collision matrix state
this.collisionMatrix.set(n,a,!0),this.collisionMatrixPrevious.get(n,a)||(// First contact!
// We reuse the collideEvent object, otherwise we will end up creating new objects for each new contact, even if there's no event listener attached.
lj.body=a,lj.contact=i,n.dispatchEvent(lj),lj.body=n,a.dispatchEvent(lj)),this.bodyOverlapKeeper.set(n.id,a.id),this.shapeOverlapKeeper.set(s.id,o.id)}for(this.emitContactEvents(),s&&(o.makeContactConstraints=lk.now()-h,h=lk.now()),f=0;f!==i;f++){let e=n[f];e.wakeUpAfterNarrowphase&&(e.wakeUp(),e.wakeUpAfterNarrowphase=!1)}// Add user-added constraints
for(f=0,m=c.length;f!==m;f++){let e=c[f];e.update();for(let t=0,i=e.equations.length;t!==i;t++){let i=e.equations[t];r.addEquation(i)}}// Solve the constrained system
r.solve(e,this),s&&(o.solve=lk.now()-h),// Remove all contacts from solver
r.removeAllEquations();let x=Math.pow;for(f=0;f!==i;f++){let t=n[f];if(t.type&l){// Only for dynamic bodies
let i=x(1-t.linearDamping,e),n=t.velocity;n.scale(i,n);let r=t.angularVelocity;if(r){let i=x(1-t.angularDamping,e);r.scale(i,r)}}}this.dispatchEvent(lq),s&&(h=lk.now());let _=this.stepnumber,w=_%(this.quatNormalizeSkip+1)==0,b=this.quatNormalizeFast;for(f=0;f!==i;f++)n[f].integrate(e,w,b);this.clearForces(),this.broadphase.dirty=!0,s&&(o.integrate=lk.now()-h),// Update step number
this.stepnumber+=1,this.dispatchEvent(lG);let M=!0;if(this.allowSleep)for(f=0,M=!1;f!==i;f++){let e=n[f];e.sleepTick(this.time),e.sleepState!==a2.SLEEPING&&(M=!0)}this.hasActiveBodies=M}emitContactEvents(){let e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(lJ,lQ),e){for(let e=0,t=lJ.length;e<t;e+=2)l$.bodyA=this.getBodyById(lJ[e]),l$.bodyB=this.getBodyById(lJ[e+1]),this.dispatchEvent(l$);l$.bodyA=l$.bodyB=null}if(t){for(let e=0,t=lQ.length;e<t;e+=2)l0.bodyA=this.getBodyById(lQ[e]),l0.bodyB=this.getBodyById(lQ[e+1]),this.dispatchEvent(l0);l0.bodyA=l0.bodyB=null}lJ.length=lQ.length=0;let i=this.hasAnyEventListener("beginShapeContact"),n=this.hasAnyEventListener("endShapeContact");if((i||n)&&this.shapeOverlapKeeper.getDiff(lJ,lQ),i){for(let e=0,t=lJ.length;e<t;e+=2){let t=this.getShapeById(lJ[e]),i=this.getShapeById(lJ[e+1]);l1.shapeA=t,l1.shapeB=i,t&&(l1.bodyA=t.body),i&&(l1.bodyB=i.body),this.dispatchEvent(l1)}l1.bodyA=l1.bodyB=l1.shapeA=l1.shapeB=null}if(n){for(let e=0,t=lQ.length;e<t;e+=2){let t=this.getShapeById(lQ[e]),i=this.getShapeById(lQ[e+1]);l2.shapeA=t,l2.shapeB=i,t&&(l2.bodyA=t.body),i&&(l2.bodyB=i.body),this.dispatchEvent(l2)}l2.bodyA=l2.bodyB=l2.shapeA=l2.shapeB=null}}/**
   * Sets all body forces in the world to zero.
   */clearForces(){let e=this.bodies,t=e.length;for(let i=0;i!==t;i++){let t=e[i];t.force,t.torque,t.force.set(0,0,0),t.torque.set(0,0,0)}}}// Temp stuff
({gravity:new aL(0,-9.82,0)}),h_=new function(e,t,i){let{color:n=65280,scale:r=1,onInit:a,onUpdate:s}=void 0===i?{}:i,o=[],l=new to({color:null!=n?n:65280,wireframe:!0}),h=new aL,c=new aL,u=new aL,d=new aV,p=new r4(1),f=new tH(1,1,1),m=new t7(10,10,10,10);return m.translate(0,0,1e-4),{update:function(){let i=0;for(let n of t.bodies)for(let t=0;t!==n.shapes.length;t++){let g=n.shapes[t],v=function(t,i){let n=o[t],a=!1;return!function(e,t){if(!e)return!1;let{geometry:i}=e;return i instanceof r4&&t.type===ak.types.SPHERE||i instanceof tH&&t.type===ak.types.BOX||i instanceof t7&&t.type===ak.types.PLANE||i.id===t.geometryId&&t.type===ak.types.CYLINDER||i.id===t.geometryId&&t.type===ak.types.CONVEXPOLYHEDRON||i.id===t.geometryId&&t.type===ak.types.TRIMESH||i.id===t.geometryId&&t.type===ak.types.HEIGHTFIELD}(n,i)&&(n&&e.remove(n),o[t]=n=function(t){let i=new tF,{SPHERE:n,BOX:r,PLANE:a,CYLINDER:s,CONVEXPOLYHEDRON:o,TRIMESH:d,HEIGHTFIELD:g}=ak.types;switch(t.type){case n:i=new tF(p,l);break;case r:i=new tF(f,l);break;case a:i=new tF(m,l);break;case s:{let e=new rR(t.radiusTop,t.radiusBottom,t.height,t.numSegments);i=new tF(e,l),t.geometryId=e.id;break}case o:{let e=function(e){let t=new tw,i=[];// Add vertices
for(let t=0;t<e.vertices.length;t++){let n=e.vertices[t];i.push(n.x,n.y,n.z)}t.setAttribute("position",new tp(i,3));let n=[];for(let t=0;t<e.faces.length;t++){let i=e.faces[t],r=i[0];for(let e=1;e<i.length-1;e++){let t=i[e],a=i[e+1];n.push(r,t,a)}}return t.setIndex(n),t.computeBoundingSphere(),t.computeVertexNormals(),t}(t);i=new tF(e,l),t.geometryId=e.id;break}case d:{let e=function(e){let t=new tw,i=[];for(let t=0;t<e.indices.length/3;t++)e.getTriangleVertices(t,h,c,u),i.push(h.x,h.y,h.z),i.push(c.x,c.y,c.z),i.push(u.x,u.y,u.z);return t.setAttribute("position",new tp(i,3)),t.computeBoundingSphere(),t.computeVertexNormals(),t}(t);i=new tF(e,l),t.geometryId=e.id;break}case g:{let e=function(e){let t=new tw,i=e.elementSize||1,n=e.data.flatMap((e,t)=>e.flatMap((e,n)=>[t*i,n*i,e])),r=[];for(let t=0;t<e.data.length-1;t++)for(let i=0;i<e.data[t].length-1;i++){let n=e.data[t].length,a=t*n+i;r.push(a+1,a+n,a+n+1),r.push(a+n,a+1,a)}return t.setIndex(r),t.setAttribute("position",new tp(n,3)),t.computeBoundingSphere(),t.computeVertexNormals(),t}(t);i=new tF(e,l),t.geometryId=e.id}}return e.add(i),i}(i),a=!0),function(e,t){let{SPHERE:i,BOX:n,PLANE:a,CYLINDER:s,CONVEXPOLYHEDRON:o,TRIMESH:l,HEIGHTFIELD:h}=ak.types;switch(t.type){case i:{let{radius:i}=t;e.scale.set(i*r,i*r,i*r);break}case n:e.scale.copy(t.halfExtents),e.scale.multiplyScalar(2*r);break;case a:break;case s:case o:e.scale.set(1*r,1*r,1*r);break;case l:e.scale.copy(t.scale).multiplyScalar(r);break;case h:e.scale.set(1*r,1*r,1*r)}}(n,i),a}(i,g),y=o[i];y&&(// Get world position
n.quaternion.vmult(n.shapeOffsets[t],h),n.position.vadd(h,h),n.quaternion.mult(n.shapeOrientations[t],d),y.position.copy(h),y.quaternion.copy(d),v&&a instanceof Function&&a(n,y,g),!v&&s instanceof Function&&s(n,y,g)),i++}for(let t=i;t<o.length;t++){let i=o[t];i&&e.remove(i)}o.length=i}}}(he,hx),hw=new /**
 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a given distance.
 * @todo Should be possible to use along all axes, not just y
 * @todo should be possible to scale along all axes
 * @todo Refactor elementSize to elementSizeX and elementSizeY
 *
 * @example
 *     // Generate some height data (y-values).
 *     const data = []
 *     for (let i = 0; i < 1000; i++) {
 *         const y = 0.5 * Math.cos(0.2 * i)
 *         data.push(y)
 *     }
 *
 *     // Create the heightfield shape
 *     const heightfieldShape = new CANNON.Heightfield(data, {
 *         elementSize: 1 // Distance between the data points in X and Y directions
 *     })
 *     const heightfieldBody = new CANNON.Body({ shape: heightfieldShape })
 *     world.addBody(heightfieldBody)
 */class extends ak{/**
   * An array of numbers, or height values, that are spread out along the x axis.
   *//**
   * Max value of the data points in the data array.
   *//**
   * Minimum value of the data points in the data array.
   *//**
   * World spacing between the data points in X and Y direction.
   * @todo elementSizeX and Y
   * @default 1
   *//**
   * @default true
   *//**
   * @param data An array of numbers, or height values, that are spread out along the x axis.
   */constructor(e,t){void 0===t&&(t={}),t=sk.defaults(t,{maxValue:null,minValue:null,elementSize:1}),super({type:ak.types.HEIGHTFIELD}),this.data=e,this.maxValue=t.maxValue,this.minValue=t.minValue,this.elementSize=t.elementSize,null===t.minValue&&this.updateMinValue(),null===t.maxValue&&this.updateMaxValue(),this.cacheEnabled=!0,this.pillarConvex=new aj,this.pillarOffset=new aL,this.updateBoundingSphereRadius(),// for example:
// _cachedPillars["0_2_1"]
this._cachedPillars={}}/**
   * Call whenever you change the data array.
   */update(){this._cachedPillars={}}/**
   * Update the `minValue` property
   */updateMinValue(){let e=this.data,t=e[0][0];for(let i=0;i!==e.length;i++)for(let n=0;n!==e[i].length;n++){let r=e[i][n];r<t&&(t=r)}this.minValue=t}/**
   * Update the `maxValue` property
   */updateMaxValue(){let e=this.data,t=e[0][0];for(let i=0;i!==e.length;i++)for(let n=0;n!==e[i].length;n++){let r=e[i][n];r>t&&(t=r)}this.maxValue=t}/**
   * Set the height value at an index. Don't forget to update maxValue and minValue after you're done.
   */setHeightValueAtIndex(e,t,i){let n=this.data;n[e][t]=i,this.clearCachedConvexTrianglePillar(e,t,!1),e>0&&(this.clearCachedConvexTrianglePillar(e-1,t,!0),this.clearCachedConvexTrianglePillar(e-1,t,!1)),t>0&&(this.clearCachedConvexTrianglePillar(e,t-1,!0),this.clearCachedConvexTrianglePillar(e,t-1,!1)),t>0&&e>0&&this.clearCachedConvexTrianglePillar(e-1,t-1,!0)}/**
   * Get max/min in a rectangle in the matrix data
   * @param result An array to store the results in.
   * @return The result array, if it was passed in. Minimum will be at position 0 and max at 1.
   */getRectMinMax(e,t,i,n,r){void 0===r&&(r=[]);// Get max and min of the data
let a=this.data,s=this.minValue;// Set first value
for(let r=e;r<=i;r++)for(let e=t;e<=n;e++){let t=a[r][e];t>s&&(s=t)}r[0]=this.minValue,r[1]=s}/**
   * Get the index of a local position on the heightfield. The indexes indicate the rectangles, so if your terrain is made of N x N height data points, you will have rectangle indexes ranging from 0 to N-1.
   * @param result Two-element array
   * @param clamp If the position should be clamped to the heightfield edge.
   */getIndexOfPosition(e,t,i,n){// Get the index of the data points to test against
let r=this.elementSize,a=this.data,s=Math.floor(e/r),o=Math.floor(t/r);return i[0]=s,i[1]=o,n&&(s<0&&(s=0),o<0&&(o=0),s>=a.length-1&&(s=a.length-1),o>=a[0].length-1&&(o=a[0].length-1)),!(s<0)&&!(o<0)&&!(s>=a.length-1)&&!(o>=a[0].length-1)}getTriangleAt(e,t,i,n,r,a){this.getIndexOfPosition(e,t,of,i);let s=of[0],o=of[1],l=this.data;i&&(s=Math.min(l.length-2,Math.max(0,s)),o=Math.min(l[0].length-2,Math.max(0,o)));let h=this.elementSize,c=(e/h-s)**2+(t/h-o)**2,u=(e/h-(s+1))**2+(t/h-(o+1))**2,d=c>u;return this.getTriangle(s,o,d,n,r,a),d}getNormalAt(e,t,i,n){this.getTriangleAt(e,t,i,ox,o_,ow),o_.vsub(ox,ob),ow.vsub(ox,oM),ob.cross(oM,n),n.normalize()}/**
   * Get an AABB of a square in the heightfield
   * @param xi
   * @param yi
   * @param result
   */getAabbAtIndex(e,t,i){let{lowerBound:n,upperBound:r}=i,a=this.data,s=this.elementSize;n.set(e*s,t*s,a[e][t]),r.set((e+1)*s,(t+1)*s,a[e+1][t+1])}/**
   * Get the height in the heightfield at a given position
   */getHeightAt(e,t,i){var n,r,a,s,o,l;let h=this.data;this.getIndexOfPosition(e,t,of,i);let c=of[0],u=of[1];i&&(c=Math.min(h.length-2,Math.max(0,c)),u=Math.min(h[0].length-2,Math.max(0,u)));let d=this.getTriangleAt(e,t,i,og,ov,oy);return(n=og.x,r=og.y,a=ov.x,s=ov.y,o=oy.x,l=oy.y,om.x=((s-l)*(e-o)+(o-a)*(t-l))/((s-l)*(n-o)+(o-a)*(r-l)),om.y=((l-r)*(e-o)+(n-o)*(t-l))/((s-l)*(n-o)+(o-a)*(r-l)),om.z=1-om.x-om.y,d)?h[c+1][u+1]*om.x+h[c][u+1]*om.y+h[c+1][u]*om.z:h[c][u]*om.x+h[c+1][u]*om.y+h[c][u+1]*om.z}getCacheConvexTrianglePillarKey(e,t,i){return`${e}_${t}_${i?1:0}`}getCachedConvexTrianglePillar(e,t,i){return this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]}setCachedConvexTrianglePillar(e,t,i,n,r){this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]={convex:n,offset:r}}clearCachedConvexTrianglePillar(e,t,i){delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(e,t,i)]}/**
   * Get a triangle from the heightfield
   */getTriangle(e,t,i,n,r,a){let s=this.data,o=this.elementSize;i?(// Top triangle verts
n.set((e+1)*o,(t+1)*o,s[e+1][t+1]),r.set(e*o,(t+1)*o,s[e][t+1]),a.set((e+1)*o,t*o,s[e+1][t])):(// Top triangle verts
n.set(e*o,t*o,s[e][t]),r.set((e+1)*o,t*o,s[e+1][t]),a.set(e*o,(t+1)*o,s[e][t+1]))}/**
   * Get a triangle in the terrain in the form of a triangular convex shape.
   */getConvexTrianglePillar(e,t,i){let n=this.pillarConvex,r=this.pillarOffset;if(this.cacheEnabled){let a=this.getCachedConvexTrianglePillar(e,t,i);if(a){this.pillarConvex=a.convex,this.pillarOffset=a.offset;return}n=new aj,r=new aL,this.pillarConvex=n,this.pillarOffset=r}let a=this.data,s=this.elementSize,o=n.faces;n.vertices.length=6;for(let e=0;e<6;e++)n.vertices[e]||(n.vertices[e]=new aL);// Reuse faces if possible
o.length=5;for(let e=0;e<5;e++)o[e]||(o[e]=[]);let l=n.vertices,h=(Math.min(a[e][t],a[e+1][t],a[e][t+1],a[e+1][t+1])-this.minValue)/2+this.minValue;i?(// Center of the triangle pillar - all polygons are given relative to this one
r.set((e+.75)*s,(t+.75)*s,h// vertical center
),l[0].set(.25*s,.25*s,a[e+1][t+1]-h),l[1].set(-.75*s,.25*s,a[e][t+1]-h),l[2].set(.25*s,-.75*s,a[e+1][t]-h),l[3].set(.25*s,.25*s,-Math.abs(h)-1),l[4].set(-.75*s,.25*s,-Math.abs(h)-1),l[5].set(.25*s,-.75*s,-Math.abs(h)-1),o[0][0]=0,o[0][1]=1,o[0][2]=2,o[1][0]=5,o[1][1]=4,o[1][2]=3,o[2][0]=2,o[2][1]=5,o[2][2]=3,o[2][3]=0,o[3][0]=3,o[3][1]=4,o[3][2]=1,o[3][3]=0,o[4][0]=1,o[4][1]=4,o[4][2]=5,o[4][3]=2):(// Center of the triangle pillar - all polygons are given relative to this one
r.set((e+.25)*s,(t+.25)*s,h// vertical center
),l[0].set(-.25*s,-.25*s,a[e][t]-h),l[1].set(.75*s,-.25*s,a[e+1][t]-h),l[2].set(-.25*s,.75*s,a[e][t+1]-h),l[3].set(-.25*s,-.25*s,-Math.abs(h)-1),l[4].set(.75*s,-.25*s,-Math.abs(h)-1),l[5].set(-.25*s,.75*s,-Math.abs(h)-1),o[0][0]=0,o[0][1]=1,o[0][2]=2,o[1][0]=5,o[1][1]=4,o[1][2]=3,o[2][0]=0,o[2][1]=2,o[2][2]=5,o[2][3]=3,o[3][0]=1,o[3][1]=0,o[3][2]=3,o[3][3]=4,o[4][0]=4,o[4][1]=5,o[4][2]=2,o[4][3]=1),n.computeNormals(),n.computeEdges(),n.updateBoundingSphereRadius(),this.setCachedConvexTrianglePillar(e,t,i,n,r)}calculateLocalInertia(e,t){return void 0===t&&(t=new aL),t.set(0,0,0),t}volume(){return Number.MAX_VALUE}calculateWorldAABB(e,t,i,n){/** @TODO do it properly */i.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),n.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)}updateBoundingSphereRadius(){// Use the bounding box of the min/max values
let e=this.data,t=this.elementSize;this.boundingSphereRadius=new aL(e.length*t,e[0].length*t,Math.max(Math.abs(this.maxValue),Math.abs(this.minValue))).length()}/**
   * Sets the height values from an image. Currently only supported in browser.
   */setHeightsFromImage(e,t){let{x:i,z:n,y:r}=t,a=document.createElement("canvas");a.width=e.width,a.height=e.height;let s=a.getContext("2d");s.drawImage(e,0,0);let o=s.getImageData(0,0,e.width,e.height),l=this.data;l.length=0,this.elementSize=Math.abs(i)/o.width;for(let e=0;e<o.height;e++){let t=[];for(let r=0;r<o.width;r++){let a=o.data[(e*o.height+r)*4],s=o.data[(e*o.height+r)*4+1],l=o.data[(e*o.height+r)*4+2],h=(a+s+l)/4/255*n;i<0?t.push(h):t.unshift(h)}r<0?l.unshift(t):l.push(t)}this.updateMaxValue(),this.updateMinValue(),this.update()}}(ho,{elementSize:.78125}),hb=new a2({mass:0});hb.addShape(hw),hb.position.set(-256*hw.elementSize/2,-4,256*hw.elementSize/2),// Установите позицию плоскости Cannon.js так, чтобы она совпадала с Three.js
// rotate ground body by 90 degrees
hb.quaternion.setFromEuler(-Math.PI/2,0,0),hx.addBody(hb);//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);
// physicsWorld.defaultContactMaterial.friction = 0;
// const groundMaterial = new CANNON.Material("groundMaterial");
//cannon body
const hM=new aV;hM.setFromAxisAngle(new aL(0,1,0),Math.PI/2);const hS=new a2({mass:5,position:new aL(0,6,0),shape:new aJ(new aL(4,.7,2))});hS.quaternion.copy(hM);//cannon wheels
const hE=new /**
 * Simple vehicle helper class with spherical rigid body wheels.
 */class{/**
   * The bodies of the wheels.
   *//**
   * The chassis body.
   *//**
   * The constraints.
   *//**
   * The wheel axes.
   *//**
   * The wheel forces.
   */constructor(e){void 0===e&&(e={}),this.wheelBodies=[],this.coordinateSystem=void 0!==e.coordinateSystem?e.coordinateSystem.clone():new aL(1,2,3),e.chassisBody?this.chassisBody=e.chassisBody:this.chassisBody=new a2({mass:1,shape:new aJ(new aL(5,.5,2))}),this.constraints=[],this.wheelAxes=[],this.wheelForces=[]}/**
   * Add a wheel
   */addWheel(e){let t;void 0===e&&(e={}),t=e.body?e.body:new a2({mass:1,shape:new ou(1.2)}),this.wheelBodies.push(t),this.wheelForces.push(0);let i=void 0!==e.position?e.position.clone():new aL,n=new aL;// Set position locally to the chassis
this.chassisBody.pointToWorldFrame(i,n),t.position.set(n.x,n.y,n.z);let r=void 0!==e.axis?e.axis.clone():new aL(0,0,1);this.wheelAxes.push(r);let a=new on(this.chassisBody,t,{pivotA:i,axisA:r,pivotB:aL.ZERO,axisB:r,collideConnected:!1});return this.constraints.push(a),this.wheelBodies.length-1}/**
   * Set the steering value of a wheel.
   * @todo check coordinateSystem
   */setSteeringValue(e,t){// Set angle of the hinge axis
let i=this.wheelAxes[t],n=Math.cos(e),r=Math.sin(e),a=i.x,s=i.z;this.constraints[t].axisA.set(-n*a+r*s,0,r*a+n*s)}/**
   * Set the target rotational speed of the hinge constraint.
   */setMotorSpeed(e,t){let i=this.constraints[t];i.enableMotor(),i.motorTargetVelocity=e}/**
   * Set the target rotational speed of the hinge constraint.
   */disableMotor(e){let t=this.constraints[e];t.disableMotor()}/**
   * Set the wheel force to apply on one of the wheels each time step
   */setWheelForce(e,t){this.wheelForces[t]=e}/**
   * Apply a torque on one of the wheels.
   */applyWheelForce(e,t){let i=this.wheelAxes[t],n=this.wheelBodies[t],r=n.torque;i.scale(e,od),n.vectorToWorldFrame(od,od),r.vadd(od,r)}/**
   * Add the vehicle including its constraints to the world.
   */addToWorld(e){let t=this.constraints,i=this.wheelBodies.concat([this.chassisBody]);for(let t=0;t<i.length;t++)e.addBody(i[t]);for(let i=0;i<t.length;i++)e.addConstraint(t[i]);e.addEventListener("preStep",this._update.bind(this))}_update(){let e=this.wheelForces;for(let t=0;t<e.length;t++)this.applyWheelForce(e[t],t)}/**
   * Remove the vehicle including its constraints from the world.
   */removeFromWorld(e){let t=this.constraints,i=this.wheelBodies.concat([this.chassisBody]);for(let t=0;t<i.length;t++)e.removeBody(i[t]);for(let i=0;i<t.length;i++)e.removeConstraint(t[i])}/**
   * Get current rotational velocity of a wheel
   */getWheelSpeed(e){let t=this.wheelAxes[e],i=this.wheelBodies[e],n=i.angularVelocity;return this.chassisBody.vectorToWorldFrame(t,op),n.dot(op)}}({chassisBody:hS});hE.addToWorld(hx);const hT=new ou(1),hA=new oc("wheel"),hR=new aL(0,-1,0),hC=new a2({mass:1,material:hA});hC.addShape(hT),hC.angularDamping=.4,hE.addWheel({body:hC,position:new aL(-2,0,2.5),axis:new aL(0,0,1),direction:hR});const hP=new a2({mass:1,material:hA});hP.addShape(hT),hP.angularDamping=.4,hE.addWheel({body:hP,position:new aL(-2,0,-2.5),axis:new aL(0,0,1),direction:hR});const hL=new a2({mass:1,material:hA});hL.addShape(hT),hL.angularDamping=.4,hE.addWheel({body:hL,position:new aL(2,0,2.5),axis:new aL(0,0,1),direction:hR});const hN=new a2({mass:1,material:hA});hN.addShape(hT),hN.angularDamping=.4,hE.addWheel({body:hN,position:new aL(2,0,-2.5),axis:new aL(0,0,1),direction:hR}),hE.addToWorld(hx),// move car
document.addEventListener("keydown",e=>{let t=Math.PI/8;switch(e.key){case"w":case"ArrowUp":hE.setWheelForce(10,0),hE.setWheelForce(10,1);break;case"s":case"ArrowDown":hE.setWheelForce(-5,0),hE.setWheelForce(-5,1);break;case"a":case"ArrowLeft":hE.setSteeringValue(t,0),hE.setSteeringValue(t,1);break;case"d":case"ArrowRight":hE.setSteeringValue(-t,0),hE.setSteeringValue(-t,1)}}),// reset car force to zero when key is released
document.addEventListener("keyup",e=>{switch(e.key){case"w":case"ArrowUp":case"s":case"ArrowDown":hE.setWheelForce(0,0),hE.setWheelForce(0,1);break;case"a":case"ArrowLeft":case"d":case"ArrowRight":hE.setSteeringValue(0,0),hE.setSteeringValue(0,1)}});//follow cam
// camera.position.set(25, 10, 25);
const hI=new eK;he.add(hI);const hU=new Z(0,10,20),hD=new Z(0,6,-10);ht.position.copy(hU),ht.lookAt(hD);const hO=new Z(0,5,-10),hz=()=>{hx.fixedStep(),h_.update(),hc.position.copy(hS.position),hc.quaternion.copy(hS.quaternion),hd.position.copy(hC.position),hd.quaternion.copy(hC.quaternion),hf.position.copy(hP.position),hf.quaternion.copy(hP.quaternion),hg.position.copy(hL.position),hg.quaternion.copy(hL.quaternion),hy.position.copy(hN.position),hy.quaternion.copy(hN.quaternion),hI.position.copy(hS.position),hI.position.add(hD),hI.quaternion.copy(hS.quaternion);let e=new Z;e.copy(hI.position),e.add(hO),ht.position.copy(e),ht.lookAt(hI.position),hn.update(),hi.render(he,ht),window.requestAnimationFrame(hz)};hz(),window.addEventListener("resize",function(){ht.aspect=window.innerWidth/window.innerHeight,ht.updateProjectionMatrix(),hi.setSize(window.innerWidth,window.innerHeight)}//# sourceMappingURL=index.b937e023.js.map
,!1);
//# sourceMappingURL=index.b937e023.js.map
