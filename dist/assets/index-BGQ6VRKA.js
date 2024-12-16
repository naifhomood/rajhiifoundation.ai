(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const h=[];function T(e,t={value:"نعاهعلعلعخلخعلخللل"}){var c,r;const n=document.createElement("div");n.className="project-card",n.dataset.projectId=e.id,n.dataset.instructions=t.value;const a=document.createElement("input");a.type="checkbox",a.className="project-checkbox",a.id=`project-${e.id}`,a.addEventListener("change",u=>{const l=u.target.checked;window.handleProjectSelect(e.id,l,e)});const s=document.createElement("label");s.htmlFor=`project-${e.id}`,s.className="project-label";const o=document.createElement("button");o.className="delete-project",o.innerHTML="×",o.onclick=()=>K(e.id);const i=document.createElement("div");return i.className="project-content",i.innerHTML=`
    <div class="project-header">
      <h3>${e.name}</h3>
      <div class="project-badges">
        <span class="badge category-badge">${e.category||"غير محدد"}</span>
        <span class="badge budget-badge">${((c=e.budget)==null?void 0:c.toLocaleString())||0} ريال</span>
      </div>
    </div>
    
    <div class="project-organization">
      <i class="fas fa-building"></i>
      <span>${e.organization}</span>
    </div>
    
    <div class="project-location">
      <i class="fas fa-map-marker-alt"></i>
      <span>${e.location||"غير محدد"}</span>
    </div>
    
    <div class="project-stats">
      <div class="stat">
        <span class="stat-label">المستفيدين</span>
        <span class="stat-value">${((r=e.beneficiaries)==null?void 0:r.toLocaleString())||0}</span>
      </div>
      <div class="stat">
        <span class="stat-label">المدة</span>
        <span class="stat-value">${e.duration||0} شهر</span>
      </div>
    </div>
    
    <div class="project-description">
      <p>${e.description||"لا يوجد وصف"}</p>
    </div>
    
    <div class="project-target">
      <span class="target-label">الفئة المستهدفة:</span>
      <span class="target-value">${e.targetGroup||"نتعلعلعلعلللتتتنتلتللت محدد"}</span>
    </div>
    
    <div class="project-contact">
      <div class="contact-item">
        <i class="fas fa-user"></i>
        <span>${e.contact||"غير محدد"}</span>
      </div>
      <div class="contact-item">
        <i class="fas fa-phone"></i>
        <span>${e.phone||"غير محدد"}</span>
      </div>
    </div>
  `,n.appendChild(a),n.appendChild(s),n.appendChild(o),s.appendChild(i),n}function K(e){if(confirm("هل أنت متأكد من حذف هذا المشروع؟")){const t=document.querySelector(`#project-${e}`).closest(".project-card");if(t){const n=h.find(c=>c.id===e);n&&window.selectedProjects.delete(n),t.remove();const a=h.findIndex(c=>c.id===e);a!==-1&&h.splice(a,1);const s=window.selectedProjects.size,o=document.querySelector("#selected-count"),i=document.querySelector("#analyzeWithAI");o&&i&&(o.textContent=s>0?`(${s})`:"",i.disabled=s===0)}}}function P(e,t){const n=e.querySelector(`#project-${t.id}`);n&&n.addEventListener("change",a=>{a.target.checked?window.selectedProjects.has(t)||window.selectedProjects.add(t):window.selectedProjects.delete(t);const s=window.selectedProjects.size,o=document.querySelector("#selected-count"),i=document.querySelector("#analyzeWithAI");o&&i&&(o.textContent=s>0?`(${s})`:"",i.disabled=s===0)})}function Y(e){const t=document.createElement("div");t.className="modal",t.id="addProjectModal",t.innerHTML=`
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>إضافة مشروع جديد</h2>
      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="paste">لصق من الجدول</button>
        <button class="tab-btn" data-tab="manual">إدخال يدوي</button>
      </div>
      
      <div class="tab-content" id="paste-tab">
        <div class="form-group">
          <label for="pasteArea">الصق بيانات المشروع من الجدول هنا</label>
          <textarea id="pasteArea" rows="10" placeholder="الصق بيانات المشروع هنا..."></textarea>
        </div>
        <button type="button" class="submit-btn" id="processPasteBtn">إضافة المشروع</button>
      </div>

      <form id="addProjectForm" class="tab-content" style="display: none;">
        <div class="form-grid">
          <div class="form-group">
            <label for="projectName">
              <i class="fas fa-project-diagram"></i>
              اسم المشروع
            </label>
            <input type="text" id="projectName" placeholder="أدخل اسم المشروع" required>
          </div>
          
          <div class="form-group">
            <label for="organization">
              <i class="fas fa-building"></i>
              المنظمة
            </label>
            <input type="text" id="organization" placeholder="اسم المنظمة المنفذة" required>
          </div>
          
          <div class="form-group">
            <label for="category">
              <i class="fas fa-tag"></i>
              الفئة
            </label>
            <input type="text" id="category" placeholder="فئة المشروع" required>
          </div>
          
          <div class="form-group">
            <label for="location">
              <i class="fas fa-map-marker-alt"></i>
              الموقع
            </label>
            <input type="text" id="location" placeholder="موقع تنفيذ المشروع" required>
          </div>
          
          <div class="form-group currency-input">
            <label for="budget">
              <i class="fas fa-coins"></i>
              الميزانية
            </label>
            <input type="number" id="budget" placeholder="0" required>
          </div>
          
          <div class="form-group number-input">
            <label for="beneficiaries">
              <i class="fas fa-users"></i>
              عدد المستفيدين
            </label>
            <input type="number" id="beneficiaries" placeholder="0" required>
          </div>
          
          <div class="form-group">
            <label for="targetGroup">
              <i class="fas fa-bullseye"></i>
              الفئة المستهدفة
            </label>
            <input type="text" id="targetGroup" placeholder="الفئة المستهدفة من المشروع" required>
          </div>
          
          <div class="form-group number-input">
            <label for="duration">
              <i class="fas fa-calendar-alt"></i>
              المدة (بالأيام)
            </label>
            <input type="number" id="duration" placeholder="0" required>
          </div>
          
          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="description">
              <i class="fas fa-align-left"></i>
              الوصف
            </label>
            <textarea id="description" placeholder="وصف تفصيلي للمشروع" rows="4"></textarea>
          </div>
          
          <div class="form-group">
            <label for="contactPerson">
              <i class="fas fa-user"></i>
              جهة الاتصال
            </label>
            <input type="text" id="contactPerson" placeholder="اسم الشخص المسؤول">
          </div>
          
          <div class="form-group">
            <label for="phone">
              <i class="fas fa-phone"></i>
              رقم الهاتف
            </label>
            <input type="tel" id="phone" placeholder="05xxxxxxxx" pattern="[0-9]{10}">
          </div>
        </div>
        
        <button type="submit" class="submit-btn">
          <i class="fas fa-plus-circle"></i>
          إضافة المشروع
        </button>
      </form>
    </div>
  `;const n=t.querySelector(".close");n.onclick=()=>t.style.display="none";const a=t.querySelectorAll(".tab-btn");a.forEach(i=>{i.onclick=()=>{a.forEach(r=>r.classList.remove("active")),i.classList.add("active"),i.dataset.tab==="paste"?(t.querySelector("#paste-tab").style.display="block",t.querySelector("#addProjectForm").style.display="none"):(t.querySelector("#paste-tab").style.display="none",t.querySelector("#addProjectForm").style.display="block")}});const s=t.querySelector("#processPasteBtn");s.onclick=()=>{try{t.querySelector("#pasteArea").value.split(`
`).filter(r=>r.trim()&&!r.includes("عدد النتائج")).forEach((r,u)=>{var p,d;const l=r.split("	").map(f=>f.trim());try{const f={id:parseInt(l[0])||Math.floor(Math.random()*1e5),name:l[1]||"",organization:l[2]||"",category:l[3]||"",location:`${l[6]} - ${l[7]}`,budget:parseInt((p=l[10])==null?void 0:p.replace(/[,\s]/g,""))||0,beneficiaries:parseInt(l[14])||0,targetGroup:l[15]||"",duration:parseInt(l[17])||0,description:l[18]||"",contact:l[20]||"",phone:((d=l[21])==null?void 0:d.replace(/[^\d]/g,""))||""};if(f.name&&f.organization){h.push(f);const y=document.querySelector("#projects-list");if(y){const S=T(f,e);P(S,f),y.appendChild(S)}}}catch(f){console.error(`خطأ في معالجة المشروع ${u+1}:`,f)}}),t.querySelector("#pasteArea").value="",t.style.display="none"}catch(i){console.error("خطأ في معالجة البيانات:",i),alert("حدث خطأ أثناء معالجة البيانات. يرجى التأكد من صحة التنسيق والمحاولة مرة أخرى.")}},window.onclick=i=>{i.target===t&&(t.style.display="none")};const o=t.querySelector("#addProjectForm");return o.onsubmit=i=>{i.preventDefault();const c={id:Math.floor(Math.random()*1e5),name:document.getElementById("projectName").value,organization:document.getElementById("organization").value,category:document.getElementById("category").value,location:document.getElementById("location").value,budget:Number(document.getElementById("budget").value),beneficiaries:Number(document.getElementById("beneficiaries").value),targetGroup:document.getElementById("targetGroup").value,duration:Number(document.getElementById("duration").value),description:document.getElementById("description").value,contact:document.getElementById("contactPerson").value,phone:document.getElementById("phone").value};h.push(c);const r=document.querySelector("#projects-list");if(r){const u=T(c,e);P(u,c),r.appendChild(u)}o.reset(),t.style.display="none"},t}function V(){const e=document.getElementById("addProjectModal");e&&(e.style.display="block")}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(j||(j={}));var L;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(L||(L={}));var B;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(B||(B={}));var M;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(M||(M={}));var A;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.OTHER="OTHER"})(A||(A={}));var k;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(k||(k={}));/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class G extends E{constructor(t,n){super(t),this.response=n}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W="https://generativelanguage.googleapis.com",J="v1",X="0.2.1",Q="genai-js";var g;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(g||(g={}));class I{constructor(t,n,a,s){this.model=t,this.task=n,this.apiKey=a,this.stream=s}toString(){let t=`${W}/${J}/${this.model}:${this.task}`;return this.stream&&(t+="?alt=sse"),t}}function Z(){return`${Q}/${X}`}async function C(e,t,n){let a;try{if(a=await fetch(e.toString(),Object.assign(Object.assign({},ee(n)),{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-client":Z(),"x-goog-api-key":e.apiKey},body:t})),!a.ok){let s="";try{const o=await a.json();s=o.error.message,o.error.details&&(s+=` ${JSON.stringify(o.error.details)}`)}catch{}throw new Error(`[${a.status} ${a.statusText}] ${s}`)}}catch(s){const o=new E(`Error fetching from ${e.toString()}: ${s.message}`);throw o.stack=s.stack,o}return a}function ee(e){const t={};if((e==null?void 0:e.timeout)>=0){const n=new AbortController,a=n.signal;setTimeout(()=>n.abort(),e.timeout),t.signal=a}return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),q(e.candidates[0]))throw new G(`${_(e)}`,e);return te(e)}else if(e.promptFeedback)throw new G(`Text not available. ${_(e)}`,e);return""},e}function te(e){var t,n,a,s;return!((s=(a=(n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0?void 0:n.parts)===null||a===void 0?void 0:a[0])===null||s===void 0)&&s.text?e.candidates[0].content.parts[0].text:""}const ne=[A.RECITATION,A.SAFETY];function q(e){return!!e.finishReason&&ne.includes(e.finishReason)}function _(e){var t,n,a;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((a=e.candidates)===null||a===void 0)&&a[0]){const o=e.candidates[0];q(o)&&(s+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(s+=`: ${o.finishMessage}`))}return s}function w(e){return this instanceof w?(this.v=e,this):new w(e)}function se(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=n.apply(e,t||[]),s,o=[];return s={},i("next"),i("throw"),i("return"),s[Symbol.asyncIterator]=function(){return this},s;function i(d){a[d]&&(s[d]=function(f){return new Promise(function(y,S){o.push([d,f,y,S])>1||c(d,f)})})}function c(d,f){try{r(a[d](f))}catch(y){p(o[0][3],y)}}function r(d){d.value instanceof w?Promise.resolve(d.value.v).then(u,l):p(o[0][2],d)}function u(d){c("next",d)}function l(d){c("throw",d)}function p(d,f){d(f),o.shift(),o.length&&c(o[0][0],o[0][1])}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function ae(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=re(t),[a,s]=n.tee();return{stream:ie(a),response:oe(s)}}async function oe(e){const t=[],n=e.getReader();for(;;){const{done:a,value:s}=await n.read();if(a)return $(ce(t));t.push(s)}}function ie(e){return se(this,arguments,function*(){const n=e.getReader();for(;;){const{value:a,done:s}=yield w(n.read());if(s)break;yield yield w($(a))}})}function re(e){const t=e.getReader();return new ReadableStream({start(a){let s="";return o();function o(){return t.read().then(({value:i,done:c})=>{if(c){if(s.trim()){a.error(new E("Failed to parse stream"));return}a.close();return}s+=i;let r=s.match(F),u;for(;r;){try{u=JSON.parse(r[1])}catch{a.error(new E(`Error parsing JSON response: "${r[1]}"`));return}a.enqueue(u),s=s.substring(r[0].length),r=s.match(F)}return o()})}}})}function ce(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const a of e)if(a.candidates)for(const s of a.candidates){const o=s.index;if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:s.index}),n.candidates[o].citationMetadata=s.citationMetadata,n.candidates[o].finishReason=s.finishReason,n.candidates[o].finishMessage=s.finishMessage,n.candidates[o].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[o].content||(n.candidates[o].content={role:s.content.role||"user",parts:[{text:""}]});for(const i of s.content.parts)i.text&&(n.candidates[o].content.parts[0].text+=i.text)}}return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D(e,t,n,a){const s=new I(t,g.STREAM_GENERATE_CONTENT,e,!0),o=await C(s,JSON.stringify(n),a);return ae(o)}async function z(e,t,n,a){const s=new I(t,g.GENERATE_CONTENT,e,!1),i=await(await C(s,JSON.stringify(n),a)).json();return{response:$(i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e,t){let n=[];if(typeof e=="string")n=[{text:e}];else for(const a of e)typeof a=="string"?n.push({text:a}):n.push(a);return{role:t,parts:n}}function N(e){return e.contents?e:{contents:[v(e,"user")]}}function le(e){return typeof e=="string"||Array.isArray(e)?{content:v(e,"user")}:e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H="SILENT_ERROR";class de{constructor(t,n,a,s){this.model=n,this.params=a,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,a!=null&&a.history&&(this._history=a.history.map(o=>{if(!o.role)throw new Error("Missing role for history item: "+JSON.stringify(o));return v(o.parts,o.role)}))}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t){var n,a;await this._sendPromise;const s=v(t,"user"),o={safetySettings:(n=this.params)===null||n===void 0?void 0:n.safetySettings,generationConfig:(a=this.params)===null||a===void 0?void 0:a.generationConfig,contents:[...this._history,s]};let i;return this._sendPromise=this._sendPromise.then(()=>z(this._apiKey,this.model,o,this.requestOptions)).then(c=>{var r;if(c.response.candidates&&c.response.candidates.length>0){this._history.push(s);const u=Object.assign({parts:[],role:"model"},(r=c.response.candidates)===null||r===void 0?void 0:r[0].content);this._history.push(u)}else{const u=_(c.response);u&&console.warn(`sendMessage() was unsuccessful. ${u}. Inspect response object for details.`)}i=c}),await this._sendPromise,i}async sendMessageStream(t){var n,a;await this._sendPromise;const s=v(t,"user"),o={safetySettings:(n=this.params)===null||n===void 0?void 0:n.safetySettings,generationConfig:(a=this.params)===null||a===void 0?void 0:a.generationConfig,contents:[...this._history,s]},i=D(this._apiKey,this.model,o,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>i).catch(c=>{throw new Error(H)}).then(c=>c.response).then(c=>{if(c.candidates&&c.candidates.length>0){this._history.push(s);const r=Object.assign({},c.candidates[0].content);r.role||(r.role="model"),this._history.push(r)}else{const r=_(c);r&&console.warn(`sendMessageStream() was unsuccessful. ${r}. Inspect response object for details.`)}}).catch(c=>{c.message!==H&&console.error(c)}),i}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ue(e,t,n,a){const s=new I(t,g.COUNT_TOKENS,e,!1);return(await C(s,JSON.stringify(Object.assign(Object.assign({},n),{model:t})),a)).json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pe(e,t,n,a){const s=new I(t,g.EMBED_CONTENT,e,!1);return(await C(s,JSON.stringify(n),a)).json()}async function fe(e,t,n,a){const s=new I(t,g.BATCH_EMBED_CONTENTS,e,!1),o=n.requests.map(c=>Object.assign(Object.assign({},c),{model:t}));return(await C(s,JSON.stringify({requests:o}),a)).json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(t,n,a){this.apiKey=t,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.requestOptions=a||{}}async generateContent(t){const n=N(t);return z(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},n),this.requestOptions)}async generateContentStream(t){const n=N(t);return D(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},n),this.requestOptions)}startChat(t){return new de(this.apiKey,this.model,t,this.requestOptions)}async countTokens(t){const n=N(t);return ue(this.apiKey,this.model,n)}async embedContent(t){const n=le(t);return pe(this.apiKey,this.model,n)}async batchEmbedContents(t){return fe(this.apiKey,this.model,t,this.requestOptions)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new E("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new me(this.apiKey,t,n)}}const ye=new ge("AIzaSyDPNxOu_2__AHwG6V7t2VP3Xb5aoc1pQgg");function be(e,t){if(!e||!t||t.length===0)return e;let n=e;return n=n.replace(/كلا المشروعين/g,`مشروعي "${t.join('" و"')}"`),t.forEach((a,s)=>{const o=s+1,i=new RegExp(`المشروع ${o}\\b(?!\\s*مستفيد|\\s*[٠-٩])`,"g");n=n.replace(i,`مشروع "${a}"`);const c=new RegExp(`^المشروع ${o}\\b`,"gm");n=n.replace(c,`مشروع "${a}"`);const r=new RegExp(`\\bالمشروع ${o}\\b(?=.*?المشروع\\s*\\d)`,"g");n=n.replace(r,`مشروع "${a}"`);const u=new RegExp(`\\b${o}\\b(?!\\s*[:.]|\\s*مستفيد|\\s*[٠-٩])`,"g");n=n.replace(u,`مشروع "${a}"`)}),n}function he(e){if(e>=1e6){const t=Math.floor(e/1e6),n=e%1e6,a=t===1?"مليون":`${t} ملايين`,s=n>0?` و ${n}`:"";return`${a}${s}`}return e.toString()}async function ve(e,t){if(!e||!Array.isArray(e)||e.length===0)throw new Error("لم يتم اختيار أي مشاريع للتحليل");const n=e.filter(a=>a&&typeof a=="object"&&a.name&&a.organization);if(n.length===0)throw new Error("المشاريع المحددة غير صالحة للتحليل");try{const a=ye.getGenerativeModel({model:"gemini-pro"}),o=`ملاحظة مهمة: الأرقام المذكورة في هذا النص هي القيم الدقيقة. يجب عدم اختصار أو تقريب أي رقم. على سبيل المثال، إذا كان هناك رقم 1800000، فهو مليون وثمانمائة ألف بالضبط، وليس 800000.

معلومات المشاريع:
${n.map((l,p)=>{const d=l.budget||0,f=l.beneficiaries||0;return`
المشروع: ${l.name}
المنظمة: ${l.organization}
الوصف: ${l.description||"غير متوفر"}
الفئة المستهدفة: ${l.targetGroup||"غير محدد"}
الميزانية الإجمالية: ${d} ريال (${he(d)} ريال)
عدد المستفيدين: ${f}
المدة: ${l.duration||0} شهر
الموقع: ${l.location||"غير محدد"}
      `}).join(`
-------------------
`)}

التوجيهات:
- يجب ذكر الأرقام كما هي بدون اختصار أو تقريب
- عند مقارنة الميزانيات، استخدم القيم الكاملة
- عند ذكر أي رقم في تحليلك، اكتبه كاملاً كما ورد في النص
${t||" قم بتحليل المشاريع المذكورة بما يتوافق مع كمؤسسة أهلية مانحة لكل ما يخدم المجتمع،من خلال دعم وتمويل المشاريع التنموية الخاصة بالمجتمع عن طريق المنظمات غير الربحية،وفق آليات ومعايير محددة، مما يسهم في بناء إنسان فاعل، بدعم وتوجيه من أبناء الشـيخ عبد الله بن عبدالعزيز الراجحي -رحمه الله- المتجانسة مع وصيته، بما يكون دافعاً للتقدم والتميز والابتكار وفق القيم التالية الإحسان و الاحترافية و الابتكار والرياد والاستدامة و العمل التشاركي"}`;let r=(await a.generateContent(o)).response.text();const u=n.map(l=>l.name);return r=be(r,u),`
    <div class="analysis-report" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl;">
      <div class="analysis-container" style="background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div class="analysis-header" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: #2c3e50; font-size: 1.5em;">
            <i class="fas fa-chart-line" style="margin-left: 10px; color: #3498db;"></i>
            نتائج التحليل
          </h3>
          <div class="analysis-actions">
           
          </div>
        </div>
        
        <div class="analysis-content" style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);">
          <textarea 
            id="analysis-text" 
            style="width: 100%; 
                   min-height: 400px; 
                   padding: 20px; 
                   border: 1px solid #e1e8ed; 
                   border-radius: 8px; 
                   font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                   font-size: 16px; 
                   line-height: 1.8; 
                   resize: vertical; 
                   direction: rtl;
                   color: #2c3e50;
                   background-color: #f8f9fa;
                   transition: all 0.3s ease;" 
            readonly
            onmouseover="this.style.borderColor='#3498db'"
            onmouseout="this.style.borderColor='#e1e8ed'"
          >${r}</textarea>
        </div>
        
        <div class="analysis-footer" style="margin-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
          
        </div>
      </div>
    </div>
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap" rel="stylesheet">
    
    <script>
      function copyAnalysis() {
        const textarea = document.getElementById('analysis-text');
        textarea.select();
        document.execCommand('copy');
        
        // إظهار رسالة نجاح النسخ
        const notification = document.createElement('div');
        notification.style.cssText = \`
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: 'Cairo', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        \`;
        notification.innerHTML = '<i class="fas fa-check-circle"></i> تم نسخ التحليل بنجاح';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }, 2000);
      }

      function downloadAnalysis() {
        const text = document.getElementById('analysis-text').value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'تحليل_المشاريع.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // إظهار رسالة نجاح التحميل
        const notification = document.createElement('div');
        notification.style.cssText = \`
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: 'Cairo', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        \`;
        notification.innerHTML = '<i class="fas fa-check-circle"></i> تم تحميل التقرير بنجاح';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }, 2000);
      }
    <\/script>`}catch(a){console.error("Error in AI analysis:",a);let s="عذراً، حدث خطأ أثناء تحليل المشاريع.";return a.message.includes("rate limit exceeded")?s="عذراً، تم تجاوز الحد الأقصى لعدد الطلبات. يرجى المحاولة بعد ساعة من الآن.":a.message.includes("API key")?s="خطأ في مفتاح API - يرجى التواصل مع مسؤول النظام":a.message.includes("network")&&(s="خطأ في الاتصال - يرجى التحقق من اتصال الإنترنت"),`
    <div class="error-message" style="color: #721c24; background-color: #f8d7da; padding: 20px; border: 1px solid #f5c6cb; border-radius: 5px; margin: 10px; text-align: right;">
      <h3 style="margin: 0 0 10px 0; color: #721c24;">⚠️ تنبيه</h3>
      <p style="margin: 0;">${s}</p>
      ${a.message.includes("rate limit exceeded")?'<p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">سيتم إعادة تعيين حد الاستخدام تلقائياً بعد ساعة.</p>':""}
    </div>`}}function Ee(e="جاري التحليل..."){const t=document.createElement("div");return t.className="loading-container",t.innerHTML=`
    <div class="loading-spinner"></div>
    <p class="loading-message">${e}</p>
  `,t}function we(){const e=document.createElement("div");return e.className="analysis-controls",e.innerHTML=`
    <div class="analysis-options">
      <h3>توجيه الذكاء الاصطناعي</h3>
      <div class="instructions-container">
        <textarea
          id="customInstructions"
          class="custom-textarea"
          placeholder="اكتب تعليماتك للذكاء الاصطناعي هنا... مثال: قم بتحليل المشاريع وفقاً لمعايير مؤسسة عبدالله بن عبدالعزيز الراجحي الخيرية، وقدم توصيات تتماشى مع أهدافنا الخيرية."
          rows="4"
        ></textarea>
      </div>
    </div>
  `,e}let m=null;document.querySelector("#app").innerHTML=`
  <div class="container">
    <div class="header">
      <h1>المشاريع المتاحة للتحليل</h1>
      <div class="header-buttons">
        <button id="selectAllBtn" class="select-all-btn">
          <i class="fas fa-check-square"></i>
          <span>تحديد الكل</span>
        </button>
        <button id="deselectAllBtn" class="deselect-all-btn">
          <i class="fas fa-square"></i>
          <span>إلغاء التحديد</span>
        </button>
        <button id="deleteSelectedBtn" class="delete-selected-btn">
          <i class="fas fa-trash-alt"></i>
          <span>حذف المحدد</span>
        </button>
        <button id="addProjectBtn" class="add-project-btn">
          <i class="fas fa-plus-circle"></i>
          <span>إضافة مشروع</span>
        </button>
      </div>
    </div>
    
    <div class="visualization-section">
      <div class="chart-container">
        <canvas id="projectChart"></canvas>
      </div>
      
      <div id="stats-box" class="stats-box">
        <h3>إحصائيات المشاريع المختارة</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <i class="fas fa-project-diagram"></i>
            <span>عدد المشاريع: </span>
            <span id="total-projects">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>إجمالي التكلفة: </span>
            <span id="total-budget">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <span>إجمالي المستفيدين: </span>
            <span id="total-beneficiaries">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <span>متوسط المدة: </span>
            <span id="avg-duration">0</span>
          </div>
        </div>
 
      </div>
    </div>
    
    <div id="projects-list" class="projects-list"></div>
    <div id="analysis-section" class="analysis-section">
      <div id="controls-container"></div>
      <div class="button-group">
        <button id="analyzeWithAI" class="ai-button" disabled>
          <span>تحليل المشاريع المختارة</span>
          <span id="selected-count"></span>
        </button>
      </div>

         <div class="stats-actions">
          <button id="copyAnalysisBtn" class="action-btn">
            <i class="fas fa-copy"></i>
            نسخ التحليل
          </button>
          <button id="downloadReportBtn" class="action-btn">
            <i class="fas fa-download"></i>
            تحميل التقرير
          </button>
        </div>
      <div id="result" class="result"></div>
    </div>
  </div>
  
`;function Ie(){const e=document.getElementById("projectChart").getContext("2d"),t=e.createLinearGradient(0,0,0,400);t.addColorStop(0,"rgba(46, 204, 113, 0.2)"),t.addColorStop(1,"rgba(46, 204, 113, 0.0)");const n=e.createLinearGradient(0,0,0,400);n.addColorStop(0,"rgba(52, 152, 219, 0.2)"),n.addColorStop(1,"rgba(52, 152, 219, 0.0)"),m=new Chart(e,{type:"line",data:{labels:[],datasets:[{label:"💰 تكلفة المشاريع",data:[],backgroundColor:t,borderColor:"rgba(46, 204, 113, 1)",borderWidth:3,fill:!0,tension:.4,pointStyle:"💰",pointRadius:12,pointHoverRadius:15,yAxisID:"y"},{label:"👥 عدد المستفيدين",data:[],backgroundColor:n,borderColor:"rgba(52, 152, 219, 1)",borderWidth:3,fill:!0,tension:.4,pointStyle:"👥",pointRadius:12,pointHoverRadius:15,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:1e3,easing:"easeInOutQuart"},interaction:{intersect:!1,mode:"index"},plugins:{title:{display:!0,text:"📊 تحليل المشاريع: التكلفة وعدد المستفيدين",font:{size:20,family:"Cairo",weight:"bold"},padding:20,color:"#2c3e50"},legend:{display:!0,position:"top",labels:{font:{family:"Cairo",size:14},usePointStyle:!0,pointStyle:a=>a.datasetIndex===0?"💰":"👥",padding:20}},tooltip:{enabled:!0,backgroundColor:"rgba(0, 0, 0, 0.8)",titleFont:{family:"Cairo"},bodyFont:{family:"Cairo"},rtl:!0,padding:12},datalabels:{display:!0,backgroundColor:function(a){return a.dataset.borderColor.replace("1)","0.9)")},borderRadius:4,color:"white",font:{family:"Cairo",size:12,weight:"bold"},padding:{top:6,bottom:6,left:10,right:10},formatter:function(a,s){const o=new Intl.NumberFormat("ar-SA",{notation:"standard",maximumFractionDigits:0});return s.datasetIndex===0?o.format(a)+" ريال":o.format(a)},anchor:"end",align:"top",offset:10,textAlign:"center"}},elements:{point:{radius:12,hoverRadius:15,borderWidth:0}},scales:{x:{title:{display:!0,text:"⏱️ مدة التنفيذ (بالأشهر)",font:{family:"Cairo",size:14,weight:"bold"},padding:10,color:"#2c3e50"},grid:{display:!0,color:"rgba(0, 0, 0, 0.1)",borderColor:"rgba(0, 0, 0, 0.3)"},ticks:{font:{family:"Cairo",size:12}}},y:{type:"linear",display:!0,position:"left",title:{display:!0,text:"💰 التكلفة (بالريال)",font:{family:"Cairo",size:14,weight:"bold"},padding:10,color:"#2c3e50"},grid:{display:!0,color:"rgba(0, 0, 0, 0.1)",borderColor:"rgba(0, 0, 0, 0.3)"},ticks:{font:{family:"Cairo",size:12},callback:function(a){return a.toLocaleString()+" ريال"}}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"👥 عدد المستفيدين",font:{family:"Cairo",size:14,weight:"bold"},padding:10,color:"#2c3e50"},grid:{display:!1},ticks:{font:{family:"Cairo",size:12},callback:function(a){return a.toLocaleString()}}}}}})}function U(){if(!m)return;const e=Array.from(window.selectedProjects).sort((s,o)=>parseInt(s.duration)-parseInt(o.duration)),t=e.map(s=>s.duration+" شهر"),n=e.map(s=>parseInt(s.budget)),a=e.map(s=>parseInt(s.beneficiaries||0));m.data.labels=t,m.data.datasets[0].data=n,m.data.datasets[1].data=a,m.options.plugins.tooltip={...m.options.plugins.tooltip,callbacks:{title:function(s){return"📋 "+e[s[0].dataIndex].name},label:function(s){const o=e[s.dataIndex];return s.dataset.label.includes("تكلفة")?["💰 التكلفة: "+new Intl.NumberFormat("ar-SA").format(s.raw)+" ريال","⏱️ المدة: "+o.duration+" شهر"]:"👥 المستفيدين: "+new Intl.NumberFormat("ar-SA").format(s.raw)}}},m.options.scales.x.title={display:!0,text:"المدة (بالأشهر)",font:{family:"Cairo",size:14,weight:"bold"}},m.update("default"),Oe()}window.selectedProjects=new Set;const Ce=document.getElementById("projects-list"),b=document.getElementById("result"),x=document.getElementById("analyzeWithAI"),Se=document.getElementById("selected-count"),xe=document.getElementById("controls-container");let O=[];function R(){const e=window.selectedProjects.size;Se.textContent=e>0?`(${e})`:"",x.disabled=e===0,U()}window.handleProjectSelect=function(e,t,n){console.log("Project selected:",n),t?window.selectedProjects.add(n):window.selectedProjects.delete(n),R()};function Ae(){O.forEach(e=>{const t=T(e);Ce.appendChild(t)}),document.getElementById("addProjectBtn").addEventListener("click",()=>{const e=Y();document.body.appendChild(e),V()})}Ie();Ae();xe.appendChild(we());const _e=document.getElementById("customInstructions");x.addEventListener("click",async()=>{if(window.selectedProjects.size===0){b.innerHTML=`
      <div class="error-message">
        يرجى اختيار مشروع واحد على الأقل للتحليل
      </div>
    `;return}b.innerHTML="",b.appendChild(Ee("جاري تحليل المشاريع المختارة...")),x.disabled=!0;try{console.log("Selected projects:",window.selectedProjects.size);const e=Array.from(window.selectedProjects),n=`${_e.value||""} قم بتحليل المشاريع المقدمة وفقاً للمعايير والقيم الأساسية لمؤسسة عبدالله بن عبدالعزيز الراجحي الخيرية. المؤسسة هي جهة أهلية مانحة تهدف إلى خدمة المجتمع من خلال دعم وتمويل المشاريع التنموية المقدمة من المنظمات غير الربحية.ركز التحليل على تقديم توصيات عملية ومحددة تُسهم في تحسين المشروع ليتماشى مع القيم التالية: العمل التشاركي الاستدامة الريادة الابتكار والاحترافية في حال نقص المعلومات المطلوبة في المشروع، قدّم توصيات لسد هذه الفجوات وتعزيز توافق المشروع مع أهداف المؤسسة الخيرية`;console.log("Instructions used for analysis:",n);const a=await ve(e,n);b.innerHTML=`<div class="analysis-result">${a}</div>`}catch(e){console.error("Analysis error:",e),b.innerHTML=`
      <div class="error-message">
        ${e.message}
      </div>
    `}finally{x.disabled=window.selectedProjects.size===0}});function Re(){const e=document.querySelectorAll(".project-checkbox"),n=document.getElementById("selectAllBtn").classList.toggle("active");e.forEach(a=>{a.checked=n;const s=new Event("change",{bubbles:!0,cancelable:!0});a.dispatchEvent(s)}),R()}function Ne(){document.querySelectorAll(".project-checkbox").forEach(t=>{if(t.checked){t.checked=!1;const n=new Event("change",{bubbles:!0,cancelable:!0});t.dispatchEvent(n)}}),document.getElementById("selectAllBtn").classList.remove("active"),R()}function Te(){window.selectedProjects.size!==0&&confirm("هل أنت متأكد من حذف المشاريع المحددة؟")&&(Array.from(window.selectedProjects).map(t=>t.id).forEach(t=>{const n=O.findIndex(s=>s.id===t);n!==-1&&O.splice(n,1);const a=document.querySelector(`.project-card[data-project-id="${t}"]`);a&&a.remove()}),window.selectedProjects.clear(),R(),U())}function Oe(){const e=Array.from(window.selectedProjects),t=e.length,n=e.reduce((o,i)=>o+parseInt(i.budget),0),a=e.reduce((o,i)=>o+parseInt(i.beneficiaries||0),0),s=t>0?Math.round(e.reduce((o,i)=>o+parseInt(i.duration),0)/t):0;document.getElementById("total-projects").textContent=t,document.getElementById("total-budget").textContent=new Intl.NumberFormat("ar-SA").format(n)+" ريال",document.getElementById("total-beneficiaries").textContent=new Intl.NumberFormat("ar-SA").format(a),document.getElementById("avg-duration").textContent=s+" شهر"}async function $e(){const e=Array.from(window.selectedProjects),t=e.length,n=new Intl.NumberFormat("ar-SA").format(e.reduce((p,d)=>p+parseInt(d.budget),0)),a=new Intl.NumberFormat("ar-SA").format(e.reduce((p,d)=>p+parseInt(d.beneficiaries||0),0)),s=t>0?Math.round(e.reduce((p,d)=>p+parseInt(d.duration),0)/t):0,o=document.getElementById("analysis-text"),i=o?o.value:"لم يتم العثور على نتائج التحليل",c=`تقرير المشاريع المختارة
تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}

ملخص الإحصائيات:
=================
• عدد المشاريع: ${t}
• إجمالي التكلفة: ${n} ريال
• إجمالي المستفيدين: ${a}
• متوسط المدة: ${s} شهر

تفاصيل المشاريع:
=================
${e.map((p,d)=>`${d+1}. ${p.name}
   • التكلفة: ${new Intl.NumberFormat("ar-SA").format(p.budget)} ريال
   • المستفيدين: ${new Intl.NumberFormat("ar-SA").format(p.beneficiaries||0)}
   • المدة: ${p.duration} شهر
   • الموقع: ${p.location||"غير محدد"}
   • الفئة المستهدفة: ${p.targetGroup||"غير محدد"}
   • الوصف: ${p.description||"غير متوفر"}`).join(`

`)}

نتائج التحليل الذكي:
=================
${i}

توصيات وملاحظات:
=================
• يرجى مراجعة التحليل أعلاه والتأكد من دقة البيانات
• في حال وجود أي استفسارات أو ملاحظات، يرجى التواصل مع فريق الدعم
• يمكن استخدام هذا التقرير لأغراض العرض والتوثيق`,r=new Blob([c],{type:"text/plain;charset=utf-8"}),u=window.URL.createObjectURL(r),l=document.createElement("a");l.href=u,l.download=`تقرير_المشاريع_${new Date().toLocaleDateString("ar-SA").replace(/\//g,"-")}.txt`,document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(u),document.body.removeChild(l)}function Pe(){const e=Array.from(window.selectedProjects),t=e.length,n=new Intl.NumberFormat("ar-SA").format(e.reduce((r,u)=>r+parseInt(u.budget),0)),a=new Intl.NumberFormat("ar-SA").format(e.reduce((r,u)=>r+parseInt(u.beneficiaries||0),0)),s=t>0?Math.round(e.reduce((r,u)=>r+parseInt(u.duration),0)/t):0,o=document.getElementById("analysis-text"),i=o?o.value:"لم يتم العثور على نتائج التحليل",c=`تحليل المشاريع المختارة:
• عدد المشاريع: ${t}
• إجمالي التكلفة: ${n} ريال
• إجمالي المستفيدين: ${a}
• متوسط المدة: ${s} شهر

تفاصيل المشاريع:
${e.map(r=>`- ${r.name}
  • التكلفة: ${new Intl.NumberFormat("ar-SA").format(r.budget)} ريال
  • المستفيدين: ${new Intl.NumberFormat("ar-SA").format(r.beneficiaries||0)}
  • المدة: ${r.duration} شهر`).join(`
`)}

نتائج التحليل الذكي:
=================
${i}`;navigator.clipboard.writeText(c).then(()=>{alert("تم نسخ التحليل بنجاح!")}).catch(()=>{alert("حدث خطأ أثناء نسخ التحليل")})}document.getElementById("copyAnalysisBtn").addEventListener("click",Pe);document.getElementById("downloadReportBtn").addEventListener("click",$e);document.getElementById("selectAllBtn").addEventListener("click",Re);document.getElementById("deselectAllBtn").addEventListener("click",Ne);document.getElementById("deleteSelectedBtn").addEventListener("click",Te);
