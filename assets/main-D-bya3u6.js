(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const a={landing:"/",profile:"/profile",login:"/login"};class u{constructor(t){if(u.instance)return u.instance;u.instance=this,this.router=t}static get isAuthenticated(){return!!localStorage.getItem("user")}login({username:t}){localStorage.setItem("user",JSON.stringify({username:t,email:"",bio:""})),this.router.navigate(a.landing)}logout(){localStorage.removeItem("user"),this.router.navigate(a.login)}}function I({title:e}){return`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${e}</h1>
    </header>
  `}const g={common:[{id:"home",label:"홈",href:a.landing}],authenticated:[{id:"profile",label:"프로필",href:a.profile},{id:"logout",label:"로그아웃",href:"#",action:"logout"}],unauthenticated:[{id:"login",label:"로그인",href:a.login}]};function S(){const e=u.isAuthenticated,t=r=>{const{href:n,id:o,label:s}=r,i=d.routerType==="hash"?window.location.hash===`#${n}`:window.location.pathname===n;return`<li><a id="${o}" href="${n}" class="${i?"font-bold text-blue-600":"text-gray-600"}">${s}</a></li>`};return`
    <nav id="nav" role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${g.common.map(t).join("")}
        ${e?g.authenticated.map(t).join(""):""}
        ${e?"":g.unauthenticated.map(t).join("")}
      </ul>
    </nav>
  `}function $(){return`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}function w({label:e}){return`
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold"
    >${e}</button>
  `}function y({post:e}){return`
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
  `}class E{constructor(){this._listeners=[]}subscribe(t){return this._listeners.push(t),()=>this.unsubscribe(t)}unsubscribe(t){this._listeners=this._listeners.filter(r=>r!==t)}notify(t){this._listeners.forEach(r=>r(t))}}class b{static get user(){const t=localStorage.getItem("user");return t?JSON.parse(t):{username:"",email:"",bio:""}}static set user({username:t,email:r,bio:n}){localStorage.setItem("user",JSON.stringify({username:t,email:r,bio:n}))}}const T=[{id:1,author:"홍길동",profileImage:"https://placehold.co/40",timeAgo:"5분 전",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{id:2,author:"김철수",profileImage:"https://placehold.co/40",timeAgo:"15분 전",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{id:3,author:"이영희",profileImage:"https://placehold.co/40",timeAgo:"30분 전",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{id:4,author:"박민수",profileImage:"https://placehold.co/40",timeAgo:"1시간 전",content:"주말에 등산 가실 분 계신가요? 함께 가요!"},{id:5,author:"정수연",profileImage:"https://placehold.co/40",timeAgo:"2시간 전",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}];class m extends E{constructor(){if(super(),m.instance)return m.instance;m.instance=this,this.posts=[],this.loadPosts()}loadPosts(){const t=localStorage.getItem("posts");this.posts=t?JSON.parse(t):[...T]}savePosts(){localStorage.setItem("posts",JSON.stringify(this.posts)),this.notify(this.posts)}getPosts(){return[...this.posts]}addPost(t){const r=b.user,n={id:Date.now(),author:r.username,profileImage:"https://placehold.co/40",timeAgo:"방금 전",content:t};return this.posts.unshift(n),this.savePosts(),n}deletePost(t){const r=this.posts.findIndex(n=>n.id===t);return r!==-1?(this.posts.splice(r,1),this.savePosts(),!0):!1}}const f=new m,A=({posts:e})=>`
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea id="post-textarea" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
      <button id="post-button" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
    </div>
    <div id="posts-container" class="space-y-4">
      ${e.map(t=>y({post:t})).join("")}
    </div>
  `;function x(e,{children:t}){if(!e)return null;const r=i=>{if(i.target&&i.target.matches('nav a:not([id="logout"])')){i.preventDefault();const l=i.target.getAttribute("href");d.router.navigate(l)}},n=i=>{i.target&&i.target.id==="logout"&&(i.preventDefault(),d.authService.logout())},o=`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${I({title:"항해플러스"})}
        ${S()}
        <main class="p-4">
          ${t()}
        </main>
        ${$()}
      </div>
    </div>
  `,s=()=>{document.removeEventListener("click",r),document.removeEventListener("click",n)};return document.addEventListener("click",r),document.addEventListener("click",n),{html:o,cleanUp:s}}function O(e){if(!e)return null;const t=l=>{l.preventDefault();const c=document.getElementById("post-textarea"),v=c.value.trim();v&&(f.addPost(v),c.value="")},r=()=>{const l=document.getElementById("posts-container");l&&(l.innerHTML=f.getPosts().map(c=>y({post:c})).join(""))},{html:n,cleanUp:o}=x(e,{children:()=>A({posts:f.getPosts()})});e.innerHTML=n;const s=document.getElementById("post-button");s==null||s.addEventListener("click",t);const i=f.subscribe(()=>r());return()=>{s==null||s.removeEventListener("click",t),i(),o==null||o()}}const N=e=>`
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
        ${w({label:"프로필 업데이트"})}
      </form >
    </div >
`;function D(e){if(!e)return null;const t=s=>{s.preventDefault();const i=s.target,l=new FormData(i);b.user={username:l.get("username"),email:l.get("email"),bio:l.get("bio")}},{html:r,cleanUp:n}=x(e,{children:()=>N(b.user)});e.innerHTML=r;const o=document.getElementById("profile-form");return o==null||o.addEventListener("submit",t),()=>{const s=document.getElementById("profile-form");s==null||s.removeEventListener("submit",t),n==null||n()}}const j=()=>`
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
          ${w({label:"로그인"})}
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
  `;function k(e){if(!e)return null;const t=n=>{const o=n.target;n.preventDefault();const i=new FormData(o).get("username");d.authService.login({username:i})};e.innerHTML=j();const r=document.getElementById("login-form");return r&&r.addEventListener("submit",t),()=>{const n=document.getElementById("login-form");n==null||n.removeEventListener("submit",t)}}const B=[{path:a.landing,element:O},{path:a.profile,element:D},{path:a.login,element:k}],p=(e,t)=>t.find(r=>r.path===e);function P({navigate:e,run:t,currentPath:r,redirectTo:n}){return{navigate:e,run:t,currentPath:r,redirectTo:n}}function H(e){return P({currentPath:window.location.hash.slice(1)||a.landing,run:()=>window.addEventListener("hashchange",e),navigate:t=>window.location.hash=t,redirectTo:t=>window.location.hash=t})}function R(e){return P({currentPath:window.location.pathname,run:()=>window.addEventListener("popstate",e),navigate:t=>window.history.pushState({},"",t),redirectTo:t=>window.history.pushState({},"",t)})}const L=e=>{switch(e){case"hash":return H;case"browser":return R;default:throw new Error("Invalid router type")}},M=({routes:e,routerType:t,renderCallback:r})=>()=>{const n=L(t)(r),o=n.currentPath;let s=p(o,e);const i=u.isAuthenticated;s&&(o===a.login&&i&&(n.redirectTo(a.landing),s=p(a.landing,e)),o!==a.landing&&o!==a.login&&!i&&(n.redirectTo(a.login),s=p(a.login,e))),r({redirectTo:s})};function J(){return`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="${a.landing}" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `}function F({routes:e,type:t}){if(!Array.isArray(e))throw new Error("Provide routes as array");let r=null;const n=M({routes:e,routerType:t,renderCallback:({redirectTo:l})=>{typeof r=="function"&&(r(),r=null);const c=document.getElementById("root");if(!l){c.innerHTML=J();return}r=l.element(c)}}),o=L(t)(n);return{navigate:l=>{o.navigate(l),n()},run:()=>{o.run(),n()}}}class h{constructor(){if(h.instance)return h.instance;h.instance=this,this.router=null,this.routerType=null,this.authService=null}initialize(t="browser"){this.routerType=t,this.router=F({routes:B,type:t}),this.authService=new u(this.router)}}const d=new h;d.initialize("hash");d.router.run();
