(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();class i{constructor(t){if(i.instance)return i.instance;i.instance=this,this.router=t}static get isAuthenticated(){return!!localStorage.getItem("user")}login({username:t}){localStorage.setItem("user",JSON.stringify({username:t,email:"",bio:""})),this.router.navigate("/")}logout(){localStorage.removeItem("user"),this.router.navigate("/login")}}function b({title:e}){return`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${e}</h1>
    </header>
  `}document.addEventListener("click",e=>{e.target&&e.target.id==="logout"&&(e.preventDefault(),d.authService.logout())});function w(){const e=i.isAuthenticated,t=n=>{const o=d.routerType==="hash"?window.location.hash===n.href:window.location.pathname===n.href;return`<li><a id="${n.id}" href="${n.href}" class="${n.className} ${o&&"font-bold"}">${n.label}</a></li>`};return`
    <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${c.common.map(t).join("")}
        ${e?c.authenticated.map(t).join(""):""}
        ${e?"":c.unauthenticated.map(t).join("")}
      </ul>
    </nav>
  `}function v(){return`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}function g({label:e}){return`
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold"
    >${e}</button>
  `}function p(e){return`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${b({title:"항해플러스"})}
        ${w()}
        <main class="p-4">
          ${e()}
        </main>
        ${v()}
      </div>
    </div>
  `}function x({post:e}){return`
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center mb-2">
        <img src="${e.profileImage}" alt="프로필" class="rounded-full mr-2">
        <div>
          <p class="font-bold">${e.author}</p>
          <p class="text-sm text-gray-500">${e.timeAgo}</p>
        </div>
      </div>
      <p>${e.content}</p>
      <div class="mt-2 flex justify-between text-gray-500">
        <button>좋아요</button>
        <button>댓글</button>
        <button>공유</button>
      </div>
    </div>
  `}const y=[{id:1,author:"홍길동",profileImage:"https://placehold.co/40",timeAgo:"5분 전",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{id:2,author:"김철수",profileImage:"https://placehold.co/40",timeAgo:"15분 전",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{id:3,author:"이영희",profileImage:"https://placehold.co/40",timeAgo:"30분 전",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{id:4,author:"박민수",profileImage:"https://placehold.co/40",timeAgo:"1시간 전",content:"주말에 등산 가실 분 계신가요? 함께 가요!"},{id:5,author:"정수연",profileImage:"https://placehold.co/40",timeAgo:"2시간 전",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}],$=()=>p(()=>`
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>
      <div class="space-y-4">
        ${y.map(e=>x({post:e})).join("")}
      </div>
    `);function S(e){if(!e)return null;e.innerHTML=$()}class f{static get user(){const t=localStorage.getItem("user");return t?JSON.parse(t):{username:"",email:"",bio:""}}static set user({username:t,email:n,bio:o}){localStorage.setItem("user",JSON.stringify({username:t,email:n,bio:o}))}}const L=e=>p(()=>`
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form" data-form-type="profile">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            name="username"
            value="${e.username}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-bold mb-2"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            name="email"
            value="${e.email}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label
            for="bio"
            class="block text-gray-700 text-sm font-bold mb-2"
            >자기소개</label
          >
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >${e.bio}</textarea>
        </div>
        ${g({label:"프로필 업데이트"})}
      </form >
    </div >
  `);function I(e){if(!e)return null;const t=o=>{o.preventDefault();const r=o.target,a=new FormData(r);f.user={username:a.get("username"),email:a.get("email"),bio:a.get("bio")}};e.innerHTML=L(f.user);const n=document.getElementById("profile-form");return n&&n.addEventListener("submit",t),()=>{const o=document.getElementById("profile-form");o&&o.removeEventListener("submit",t)}}const P=()=>`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form" data-form-type="login">
          <div class="mb-4">
            <input id="username" name="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" name="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          ${g({label:"로그인"})}
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;function E(e){if(!e)return null;const t=o=>{const r=o.target;o.preventDefault();const s=new FormData(r).get("username");d.authService.login({username:s})};e.innerHTML=P();const n=document.getElementById("login-form");return n&&n.addEventListener("submit",t),()=>{const o=document.getElementById("login-form");o&&o.removeEventListener("submit",t)}}const N=[{path:"/",element:S},{path:"/profile",element:I},{path:"/login",element:E}],c={common:[{id:"home",label:"홈",href:"/",className:"text-blue-600"}],authenticated:[{id:"profile",label:"프로필",href:"/profile",className:"text-gray-600"},{id:"logout",label:"로그아웃",href:"#",className:"text-gray-600",action:"logout"}],unauthenticated:[{id:"login",label:"로그인",href:"/login",className:"text-gray-600"}]},u=(e,t)=>t.find(n=>n.path===e),A=({routes:e,routerType:t,renderCallback:n})=>()=>{console.log("routerType",t);const o=t==="hash"?window.location.hash.slice(1)||"/":window.location.pathname;console.log("window.location.hash",window.location.hash),console.log("currentPath",o);let r=u(o,e);const a=i.isAuthenticated;r&&(o==="/login"&&a&&(h("/",t),r=u("/",e)),o!=="/"&&o!=="/login"&&!a&&(h("/login",t),r=u("/login",e))),n({redirectTo:r})},h=(e,t)=>{switch(t){case"hash":window.location.hash=`#${e}`;break;case"browser":window.history.pushState({},"",e);break}};function O(){return`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `}function F({routes:e,type:t}){if(!Array.isArray(e))throw new Error("Provide routes as array");let n=null;const o=A({routes:e,routerType:t,renderCallback:({redirectTo:s})=>{typeof n=="function"&&(n(),n=null);const m=document.getElementById("root");if(!s){m.innerHTML=O();return}n=s.element(m)}});return{navigate:s=>{t==="hash"?window.location.hash=s:window.history.pushState({},"",s),o()},run:()=>{window.addEventListener(t==="hash"?"hashchange":"popstate",o),o()}}}class l{constructor(){if(l.instance)return l.instance;l.instance=this,this.router=null,this.routerType=null,this.authService=null}initialize(t="browser"){this.routerType=t,this.router=F({routes:N,type:t}),this.authService=new i(this.router)}}const d=new l;export{d as a};
