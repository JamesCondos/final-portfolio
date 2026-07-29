const ze=()=>{const l=document.getElementById("fluid");if(!l)return;const _=new AbortController;let U=0,k=!1;Z();let v={SIM_RESOLUTION:96,DYE_RESOLUTION:512,DENSITY_DISSIPATION:3.5,VELOCITY_DISSIPATION:2,PRESSURE:.1,PRESSURE_ITERATIONS:8,CURL:3,SPLAT_RADIUS:.08,SPLAT_FORCE:3200,SHADING:!0,COLOR_UPDATE_SPEED:10};function ne(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}const R=[];R.push(new ne);const{gl:t,ext:E}=ae(l);E.supportLinearFiltering||(v.DYE_RESOLUTION=256,v.SHADING=!1);function ae(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",r);const o=!!i;o||(i=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let n,a;o?(i.getExtension("EXT_color_buffer_float"),a=i.getExtension("OES_texture_float_linear")):(n=i.getExtension("OES_texture_half_float"),a=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);const u=o?i.HALF_FLOAT:n.HALF_FLOAT_OES;let f,s,T;return o?(f=S(i,i.RGBA16F,i.RGBA,u),s=S(i,i.RG16F,i.RG,u),T=S(i,i.R16F,i.RED,u)):(f=S(i,i.RGBA,i.RGBA,u),s=S(i,i.RGBA,i.RGBA,u),T=S(i,i.RGBA,i.RGBA,u)),{gl:i,ext:{formatRGBA:f,formatRG:s,formatR:T,halfFloatTexType:u,supportLinearFiltering:a}}}function S(e,r,i,o){if(!ue(e,r,i,o))switch(r){case e.R16F:return S(e,e.RG16F,e.RG,o);case e.RG16F:return S(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:r,format:i}}function ue(e,r,i,o){const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,i,o,null);const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}class ce{constructor(r,i){this.vertexShader=r,this.fragmentShaderSource=i,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let i=0;for(let n=0;n<r.length;n++)i+=Ie(r[n]);let o=this.programs[i];if(o==null){let n=m(t.FRAGMENT_SHADER,this.fragmentShaderSource,r);o=K(this.vertexShader,n),this.programs[i]=o}o!=this.activeProgram&&(this.uniforms=q(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class p{constructor(r,i){this.uniforms={},this.program=K(r,i),this.uniforms=q(this.program)}bind(){t.useProgram(this.program)}}function K(e,r){let i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(i)),i}function q(e){let r=[],i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){let n=t.getActiveUniform(e,o).name;r[n]=t.getUniformLocation(e,n)}return r}function m(e,r,i){r=le(r,i);const o=t.createShader(e);return t.shaderSource(o,r),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function le(e,r){if(r==null)return e;let i="";return r.forEach(o=>{i+="#define "+o+`
`}),i+e}const g=m(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           vL = vUv - vec2(texelSize.x, 0.0);
           vR = vUv + vec2(texelSize.x, 0.0);
           vT = vUv + vec2(0.0, texelSize.y);
           vB = vUv - vec2(0.0, texelSize.y);
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `);m(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           float offset = 1.33333333;
           vL = vUv - texelSize * offset;
           vR = vUv + texelSize * offset;
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `),m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform sampler2D uTexture;
   
       void main () {
           vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
           sum += texture2D(uTexture, vL) * 0.35294117;
           sum += texture2D(uTexture, vR) * 0.35294117;
           gl_FragColor = sum;
       }
   `);const se=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
   
       void main () {
           gl_FragColor = texture2D(uTexture, vUv);
       }
   `),fe=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
       uniform float value;
   
       void main () {
           gl_FragColor = value * texture2D(uTexture, vUv);
       }
   `);m(t.FRAGMENT_SHADER,`
       precision mediump float;
   
       uniform vec4 color;
   
       void main () {
           gl_FragColor = color;
       }
   `);const ve=`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uTexture;
       uniform sampler2D uDithering;
       uniform vec2 ditherScale;
       uniform vec2 texelSize;
   
       vec3 linearToGamma (vec3 color) {
           color = max(color, vec3(0));
           return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
       }
   
       void main () {
           vec3 c = texture2D(uTexture, vUv).rgb;
   
       #ifdef SHADING
           vec3 lc = texture2D(uTexture, vL).rgb;
           vec3 rc = texture2D(uTexture, vR).rgb;
           vec3 tc = texture2D(uTexture, vT).rgb;
           vec3 bc = texture2D(uTexture, vB).rgb;
   
           float dx = length(rc) - length(lc);
           float dy = length(tc) - length(bc);
   
           vec3 n = normalize(vec3(dx, dy, length(texelSize)));
           vec3 l = vec3(0.0, 0.0, 1.0);
   
           float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
           c *= diffuse;
       #endif
   
           float a = max(c.r, max(c.g, c.b));
           gl_FragColor = vec4(c, a);
       }
   `,me=m(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uTarget;
       uniform float aspectRatio;
       uniform vec3 color;
       uniform vec2 point;
       uniform float radius;
   
       void main () {
           vec2 p = vUv - point.xy;
           p.x *= aspectRatio;
           vec3 splat = exp(-dot(p, p) / radius) * color;
           vec3 base = texture2D(uTarget, vUv).xyz;
           gl_FragColor = vec4(base + splat, 1.0);
       }
   `),de=m(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform vec2 dyeTexelSize;
       uniform float dt;
       uniform float dissipation;
   
       vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
           vec2 st = uv / tsize - 0.5;
   
           vec2 iuv = floor(st);
           vec2 fuv = fract(st);
   
           vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
           vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
           vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
           vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
   
           return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
       }
   
       void main () {
       #ifdef MANUAL_FILTERING
           vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
           vec4 result = bilerp(uSource, coord, dyeTexelSize);
       #else
           vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
           vec4 result = texture2D(uSource, coord);
       #endif
           float decay = 1.0 + dissipation * dt;
           gl_FragColor = result / decay;
       }`,E.supportLinearFiltering?null:["MANUAL_FILTERING"]),he=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).x;
           float R = texture2D(uVelocity, vR).x;
           float T = texture2D(uVelocity, vT).y;
           float B = texture2D(uVelocity, vB).y;
   
           vec2 C = texture2D(uVelocity, vUv).xy;
           if (vL.x < 0.0) { L = -C.x; }
           if (vR.x > 1.0) { R = -C.x; }
           if (vT.y > 1.0) { T = -C.y; }
           if (vB.y < 0.0) { B = -C.y; }
   
           float div = 0.5 * (R - L + T - B);
           gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
       }
   `),xe=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).y;
           float R = texture2D(uVelocity, vR).y;
           float T = texture2D(uVelocity, vT).x;
           float B = texture2D(uVelocity, vB).x;
           float vorticity = R - L - T + B;
           gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
       }
   `),ge=m(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       uniform sampler2D uCurl;
       uniform float curl;
       uniform float dt;
   
       void main () {
           float L = texture2D(uCurl, vL).x;
           float R = texture2D(uCurl, vR).x;
           float T = texture2D(uCurl, vT).x;
           float B = texture2D(uCurl, vB).x;
           float C = texture2D(uCurl, vUv).x;
   
           vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
           force /= length(force) + 0.0001;
           force *= curl * C;
           force.y *= -1.0;
   
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity += force * dt;
           velocity = min(max(velocity, -1000.0), 1000.0);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),Te=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uDivergence;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           float C = texture2D(uPressure, vUv).x;
           float divergence = texture2D(uDivergence, vUv).x;
           float pressure = (L + R + B + T - divergence) * 0.25;
           gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
       }
   `),Re=m(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity.xy -= vec2(R - L, T - B);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),h=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),r&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let d,c,I,z,D;const j=new p(g,se),N=new p(g,fe),y=new p(g,me),x=new p(g,de),M=new p(g,he),O=new p(g,xe),F=new p(g,ge),L=new p(g,Te),b=new p(g,Re),P=new ce(g,ve);function J(){let e=ie(v.SIM_RESOLUTION),r=ie(v.DYE_RESOLUTION);const i=E.halfFloatTexType,o=E.formatRGBA,n=E.formatRG,a=E.formatR,u=E.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),d==null?d=G(r.width,r.height,o.internalFormat,o.format,i,u):d=Q(d,r.width,r.height,o.internalFormat,o.format,i,u),c==null?c=G(e.width,e.height,n.internalFormat,n.format,i,u):c=Q(c,e.width,e.height,n.internalFormat,n.format,i,u),I=w(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),z=w(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),D=G(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST)}function w(e,r,i,o,n,a){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,r,0,o,n,null);let f=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let s=1/e,T=1/r;return{texture:u,fbo:f,width:e,height:r,texelSizeX:s,texelSizeY:T,attach(A){return t.activeTexture(t.TEXTURE0+A),t.bindTexture(t.TEXTURE_2D,u),A}}}function G(e,r,i,o,n,a){let u=w(e,r,i,o,n,a),f=w(e,r,i,o,n,a);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(s){u=s},get write(){return f},set write(s){f=s},swap(){let s=u;u=f,f=s}}}function Ee(e,r,i,o,n,a,u){let f=w(r,i,o,n,a,u);return j.bind(),t.uniform1i(j.uniforms.uTexture,e.attach(0)),h(f),f}function Q(e,r,i,o,n,a,u){return e.width==r&&e.height==i||(e.read=Ee(e.read,r,i,o,n,a,u),e.write=w(r,i,o,n,a,u),e.width=r,e.height=i,e.texelSizeX=1/r,e.texelSizeY=1/i),e}function pe(){let e=[];v.SHADING&&e.push("SHADING"),P.setKeywords(e)}pe(),J();let Y=Date.now(),H=0,B=0;const Se=1e3/60;function C(e=performance.now()){if(k||document.hidden)return;if(e-H<Se){U=requestAnimationFrame(C);return}H=e;const r=De();Z()&&J(),ye(r),_e(),Ae(r),Fe(null),U=requestAnimationFrame(C)}function De(){let e=Date.now(),r=(e-Y)/1e3;return r=Math.min(r,.016666),Y=e,r}function Z(){let e=oe(window.innerWidth),r=oe(window.innerHeight);return l.width!=e||l.height!=r?(l.width=e,l.height=r,!0):!1}function X(e,r){const i=e/window.innerWidth,o=r/window.innerHeight;return{x:Math.max(0,Math.min(l.width,i*l.width)),y:Math.max(0,Math.min(l.height,o*l.height))}}function ye(e){B+=e*v.COLOR_UPDATE_SPEED,B>=1&&(B=Xe(B,0,1),R.forEach(r=>{r.color=W()}))}function _e(){R.forEach(e=>{e.moved&&(e.moved=!1,Ue(e))})}function Ae(e){t.disable(t.BLEND),O.bind(),t.uniform2f(O.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(O.uniforms.uVelocity,c.read.attach(0)),h(z),F.bind(),t.uniform2f(F.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(F.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(F.uniforms.uCurl,z.attach(1)),t.uniform1f(F.uniforms.curl,v.CURL),t.uniform1f(F.uniforms.dt,e),h(c.write),c.swap(),M.bind(),t.uniform2f(M.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(M.uniforms.uVelocity,c.read.attach(0)),h(I),N.bind(),t.uniform1i(N.uniforms.uTexture,D.read.attach(0)),t.uniform1f(N.uniforms.value,v.PRESSURE),h(D.write),D.swap(),L.bind(),t.uniform2f(L.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(L.uniforms.uDivergence,I.attach(0));for(let i=0;i<v.PRESSURE_ITERATIONS;i++)t.uniform1i(L.uniforms.uPressure,D.read.attach(1)),h(D.write),D.swap();b.bind(),t.uniform2f(b.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(b.uniforms.uPressure,D.read.attach(0)),t.uniform1i(b.uniforms.uVelocity,c.read.attach(1)),h(c.write),c.swap(),x.bind(),t.uniform2f(x.uniforms.texelSize,c.texelSizeX,c.texelSizeY),E.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let r=c.read.attach(0);t.uniform1i(x.uniforms.uVelocity,r),t.uniform1i(x.uniforms.uSource,r),t.uniform1f(x.uniforms.dt,e),t.uniform1f(x.uniforms.dissipation,v.VELOCITY_DISSIPATION),h(c.write),c.swap(),E.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(x.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(x.uniforms.uSource,d.read.attach(1)),t.uniform1f(x.uniforms.dissipation,v.DENSITY_DISSIPATION),h(d.write),d.swap()}function Fe(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),we(e)}function we(e){let r=t.drawingBufferWidth,i=t.drawingBufferHeight;P.bind(),v.SHADING&&t.uniform2f(P.uniforms.texelSize,1/r,1/i),t.uniform1i(P.uniforms.uTexture,d.read.attach(0)),h(e)}function Ue(e){let r=e.deltaX*v.SPLAT_FORCE,i=e.deltaY*v.SPLAT_FORCE;ee(e.texcoordX,e.texcoordY,r,i,e.color)}function $(e){const r=W();r.r*=4.5,r.g*=4.5,r.b*=4.5;let i=10*(Math.random()-.5),o=30*(Math.random()-.5);ee(e.texcoordX,e.texcoordY,i,o,r)}function ee(e,r,i,o,n){y.bind(),t.uniform1i(y.uniforms.uTarget,c.read.attach(0)),t.uniform1f(y.uniforms.aspectRatio,l.width/l.height),t.uniform2f(y.uniforms.point,e,r),t.uniform3f(y.uniforms.color,i,o,0),t.uniform1f(y.uniforms.radius,Le(v.SPLAT_RADIUS/100)),h(c.write),c.swap(),t.uniform1i(y.uniforms.uTarget,d.read.attach(0)),t.uniform3f(y.uniforms.color,n.r,n.g,n.b),h(d.write),d.swap()}function Le(e){let r=l.width/l.height;return r>1&&(e*=r),e}window.addEventListener("mousedown",e=>{let r=R[0];const{x:i,y:o}=X(e.clientX,e.clientY);V(r,-1,i,o),$(r)},{passive:!0,signal:_.signal}),window.addEventListener("mousemove",e=>{let r=R[0];const{x:i,y:o}=X(e.clientX,e.clientY);let n=r.color;re(r,i,o,n)},{passive:!0,signal:_.signal}),window.addEventListener("touchstart",e=>{const r=e.targetTouches;let i=R[0];for(let o=0;o<r.length;o++){const{x:n,y:a}=X(r[o].clientX,r[o].clientY);V(i,r[o].identifier,n,a)}},{passive:!0,signal:_.signal}),window.addEventListener("touchmove",e=>{const r=e.targetTouches;let i=R[0];for(let o=0;o<r.length;o++){const{x:n,y:a}=X(r[o].clientX,r[o].clientY);re(i,n,a,i.color)}},{passive:!0,signal:_.signal}),window.addEventListener("touchend",e=>{const r=e.changedTouches;let i=R[0];for(let o=0;o<r.length;o++)be(i)},{passive:!0,signal:_.signal}),document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(U);return}Y=Date.now(),H=0,C()},{signal:_.signal});const te=R[0];return V(te,-1,l.width*.5,l.height*.5),$(te),C(),()=>{var e;k=!0,cancelAnimationFrame(U),_.abort(),(e=t.getExtension("WEBGL_lose_context"))==null||e.loseContext()};function V(e,r,i,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=i/l.width,e.texcoordY=1-o/l.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=W()}function re(e,r,i,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/l.width,e.texcoordY=1-i/l.height,e.deltaX=Pe(e.texcoordX-e.prevTexcoordX),e.deltaY=Be(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function be(e){e.down=!1}function Pe(e){let r=l.width/l.height;return r<1&&(e*=r),e}function Be(e){let r=l.width/l.height;return r>1&&(e/=r),e}function W(){let e=Ce(Math.random(),1,1);return e.r*=.24,e.g*=.24,e.b*=.24,e}function Ce(e,r,i){let o,n,a,u,f,s,T,A;switch(u=Math.floor(e*6),f=e*6-u,s=i*(1-r),T=i*(1-f*r),A=i*(1-(1-f)*r),u%6){case 0:o=i,n=A,a=s;break;case 1:o=T,n=i,a=s;break;case 2:o=s,n=i,a=A;break;case 3:o=s,n=T,a=i;break;case 4:o=A,n=s,a=i;break;case 5:o=i,n=s,a=T;break}return{r:o,g:n,b:a}}function Xe(e,r,i){const o=i-r;return(e-r)%o+r}function ie(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);const i=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:i}:{width:i,height:o}}function oe(e){const r=Math.min(window.devicePixelRatio||1,1.5);return Math.floor(e*r)}function Ie(e){if(e.length==0)return 0;let r=0;for(let i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r|=0;return r}};export{ze as default};
