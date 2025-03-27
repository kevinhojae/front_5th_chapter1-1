(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const l={landing:"/",profile:"/profile",login:"/login"};class c{constructor(t){if(c.instance)return c.instance;c.instance=this,this.router=t}static get isAuthenticated(){return!!localStorage.getItem("user")}login({username:t}){localStorage.setItem("user",JSON.stringify({username:t,email:"",bio:""})),this.router.navigate(l.landing)}logout(){localStorage.removeItem("user"),this.router.navigate(l.login)}}function y({title:e}){return`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${e}</h1>
    </header>
  `}const m={common:[{id:"home",label:"홈",href:l.landing}],authenticated:[{id:"profile",label:"프로필",href:l.profile},{id:"logout",label:"로그아웃",href:"#",action:"logout"}],unauthenticated:[{id:"login",label:"로그인",href:l.login}]};function x(){const e=c.isAuthenticated,t=o=>{const{href:r,id:n,label:i}=o,a=u.routerType==="hash"?window.location.hash===`#${r}`:window.location.pathname===r;return`<li><a id="${n}" href="${r}" class="${a?"font-bold text-blue-600":"text-gray-600"}">${i}</a></li>`};return`
    <nav id="nav" role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${m.common.map(t).join("")}
        ${e?m.authenticated.map(t).join(""):""}
        ${e?"":m.unauthenticated.map(t).join("")}
      </ul>
    </nav>
  `}function $(){return`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}function p({label:e}){return`
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold"
    >${e}</button>
  `}function L({post:e}){return`
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
  `}const S=[{id:1,author:"홍길동",profileImage:"https://placehold.co/40",timeAgo:"5분 전",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{id:2,author:"김철수",profileImage:"https://placehold.co/40",timeAgo:"15분 전",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{id:3,author:"이영희",profileImage:"https://placehold.co/40",timeAgo:"30분 전",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{id:4,author:"박민수",profileImage:"https://placehold.co/40",timeAgo:"1시간 전",content:"주말에 등산 가실 분 계신가요? 함께 가요!"},{id:5,author:"정수연",profileImage:"https://placehold.co/40",timeAgo:"2시간 전",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}],E=()=>`
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
      <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
    </div>
    <div class="space-y-4">
      ${S.map(e=>L({post:e})).join("")}
    </div>
  `;function b(e,{children:t}){if(!e)return null;const o=a=>{if(a.target&&a.target.matches('nav a:not([id="logout"])')){a.preventDefault();const s=a.target.getAttribute("href");u.router.navigate(s)}},r=a=>{a.target&&a.target.id==="logout"&&(a.preventDefault(),u.authService.logout())},n=`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${y({title:"항해플러스"})}
        ${x()}
        <main class="p-4">
          ${t()}
        </main>
        ${$()}
      </div>
    </div>
  `,i=()=>{document.removeEventListener("click",o),document.removeEventListener("click",r)};return document.addEventListener("click",o),document.addEventListener("click",r),{html:n,cleanUp:i}}function I(e){if(!e)return null;const{html:t,cleanUp:o}=b(e,{children:E});return e.innerHTML=t,()=>o==null?void 0:o()}class g{static get user(){const t=localStorage.getItem("user");return t?JSON.parse(t):{username:"",email:"",bio:""}}static set user({username:t,email:o,bio:r}){localStorage.setItem("user",JSON.stringify({username:t,email:o,bio:r}))}}const P=e=>`
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
        ${p({label:"프로필 업데이트"})}
      </form >
    </div >
`;function T(e){if(!e)return null;const t=i=>{i.preventDefault();const a=i.target,s=new FormData(a);g.user={username:s.get("username"),email:s.get("email"),bio:s.get("bio")}},{html:o,cleanUp:r}=b(e,{children:()=>P(g.user)});e.innerHTML=o;const n=document.getElementById("profile-form");return n==null||n.addEventListener("submit",t),()=>{const i=document.getElementById("profile-form");i==null||i.removeEventListener("submit",t),r==null||r()}}const A=()=>`
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
          ${p({label:"로그인"})}
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
  `;function N(e){if(!e)return null;const t=r=>{const n=r.target;r.preventDefault();const a=new FormData(n).get("username");u.authService.login({username:a})};e.innerHTML=A();const o=document.getElementById("login-form");return o&&o.addEventListener("submit",t),()=>{const r=document.getElementById("login-form");r==null||r.removeEventListener("submit",t)}}const O=[{path:l.landing,element:I},{path:l.profile,element:T},{path:l.login,element:N}],f=(e,t)=>t.find(o=>o.path===e);function v({navigate:e,run:t,currentPath:o,redirectTo:r}){return{navigate:e,run:t,currentPath:o,redirectTo:r}}function j(e){return v({currentPath:window.location.hash.slice(1)||l.landing,run:()=>window.addEventListener("hashchange",e),navigate:t=>window.location.hash=t,redirectTo:t=>window.location.hash=t})}function D(e){return v({currentPath:window.location.pathname,run:()=>window.addEventListener("popstate",e),navigate:t=>window.history.pushState({},"",t),redirectTo:t=>window.history.pushState({},"",t)})}const w=e=>{switch(e){case"hash":return j;case"browser":return D;default:throw new Error("Invalid router type")}},B=({routes:e,routerType:t,renderCallback:o})=>()=>{const r=w(t)(o),n=r.currentPath;let i=f(n,e);const a=c.isAuthenticated;i&&(n===l.login&&a&&(r.redirectTo(l.landing),i=f(l.landing,e)),n!==l.landing&&n!==l.login&&!a&&(r.redirectTo(l.login),i=f(l.login,e))),o({redirectTo:i})};function R(){return`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="${l.landing}" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `}function k({routes:e,type:t}){if(!Array.isArray(e))throw new Error("Provide routes as array");let o=null;const r=B({routes:e,routerType:t,renderCallback:({redirectTo:s})=>{typeof o=="function"&&(o(),o=null);const h=document.getElementById("root");if(!s){h.innerHTML=R();return}o=s.element(h)}}),n=w(t)(r);return{navigate:s=>{n.navigate(s),r()},run:()=>{n.run(),r()}}}class d{constructor(){if(d.instance)return d.instance;d.instance=this,this.router=null,this.routerType=null,this.authService=null}initialize(t="browser"){this.routerType=t,this.router=k({routes:O,type:t}),this.authService=new c(this.router)}}const u=new d;u.initialize("hash");u.router.run();
