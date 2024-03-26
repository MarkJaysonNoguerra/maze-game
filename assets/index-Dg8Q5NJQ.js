var C=Object.defineProperty;var O=(i,t,e)=>t in i?C(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var n=(i,t,e)=>(O(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();class P{constructor(t,e,s,r){n(this,"visited",!1);n(this,"walls",[!0,!0,!0,!0]);this.x=t,this.y=e,this.maxRow=s,this.maxColumn=r}get getX(){return this.x}get getY(){return this.y}getNeighbors(t){return[t[this.getNeighborIndex(this.x,this.y-1)],t[this.getNeighborIndex(this.x+1,this.y)],t[this.getNeighborIndex(this.x,this.y+1)],t[this.getNeighborIndex(this.x-1,this.y)]].filter(Boolean)}checkNeighbors(t){const e=this.getNeighbors(t).filter(({visited:s})=>!s);if(e.length>0)return e[Math.floor(Math.random()*e.length)]}getNeighborIndex(t,e){return t<0||e<0||t>this.maxColumn||e>this.maxRow?"":`${t}-${e}`}}const f=(i,t,e)=>{i.beginPath(),i.moveTo(...t),i.lineTo(...e),i.strokeStyle="red",i.lineWidth=5,i.stroke(),i.closePath()},p=(i,t,e,s="blue")=>{i.beginPath(),i.rect(...t,...e),i.fillStyle=s,i.fill(),i.closePath()};var o=(i=>(i[i.Top=0]="Top",i[i.Right=1]="Right",i[i.Bottom=2]="Bottom",i[i.Left=3]="Left",i))(o||{});class H{constructor(t,e,s){this.ctx=t,this.boxWidth=e,this.boxHeight=s}drawMaze(t){for(const e of t)this.drawWalls(e)}drawGoal(t,e,s,r,a="blue"){p(this.ctx,[t,e],[s,r],a)}drawWalls(t){t.walls[o.Top]&&f(this.ctx,[this.startingX(t.getX),this.startingY(t.getY)],[this.startingX(t.getX)+this.boxWidth,this.startingY(t.getY)]),t.walls[o.Right]&&f(this.ctx,[this.startingX(t.getX)+this.boxWidth,this.startingY(t.getY)+this.boxHeight],[this.startingX(t.getX)+this.boxWidth,this.startingY(t.getY)]),t.walls[o.Bottom]&&f(this.ctx,[this.startingX(t.getX)+this.boxWidth,this.startingY(t.getY)+this.boxHeight],[this.startingX(t.getX),this.startingY(t.getY)+this.boxHeight]),t.walls[o.Left]&&f(this.ctx,[this.startingX(t.getX),this.startingY(t.getY)+this.boxHeight],[this.startingX(t.getX),this.startingY(t.getY)])}startingX(t){return t*this.boxWidth}startingY(t){return t*this.boxHeight}}class N{constructor(t,e,s,r){n(this,"gridData",{});n(this,"visitedCellStack",[]);n(this,"drawer");this.ctx=t,this.goal=e,this.cellWidth=s,this.cellHeight=r,this.drawer=new H(this.ctx,this.cellWidth,this.cellHeight)}get getGridData(){return Object.values(this.gridData)}isGoalCell(t,e){const[s,r]=this.goal;return s===t&&r===e}addCell(t,e){this.gridData[t]=e}draw(){const[t,e]=this.goal;this.drawer.drawGoal(t*this.cellWidth,e*this.cellHeight,this.cellWidth,this.cellHeight),this.drawer.drawMaze(this.getGridData)}resetVisited(){for(const t of this.getGridData)t.visited=!1;return this}generatePath(t,e){let s=this.gridData[`${t}-${e}`];for(;s&&!this.isGoalCell(s.getX,s.getY);){s.visited=!0;const r=s.checkNeighbors(this.gridData);r?(this.removeWalls(s,r),this.visitedCellStack.push(r),s=r):s=this.visitedCellStack.pop()}return this}generateUnvisitedPath(){let t=Object.values(this.gridData).filter(({visited:e})=>!e)[0];for(;t;){t.visited=!0;const e=t.checkNeighbors(this.gridData);e?(this.removeWalls(t,e),this.visitedCellStack.push(e),t=e):(t=this.visitedCellStack.pop(),t||(t=Object.values(this.gridData).filter(({visited:s})=>!s)[0]))}return this}removeWalls(t,e){e.getX!==t.getX?e.getX>t.getX?(t.walls[o.Right]=!1,e.walls[o.Left]=!1):(t.walls[o.Left]=!1,e.walls[o.Right]=!1):e.getY>t.getY?(t.walls[o.Bottom]=!1,e.walls[o.Top]=!1):(t.walls[o.Top]=!1,e.walls[o.Bottom]=!1)}}class M{constructor(t,e){this.x=t,this.y=e}update(t){switch(t){case o.Top:this.y-=1;break;case o.Right:this.x+=1;break;case o.Bottom:this.y+=1;break;case o.Left:this.x-=1;break}}}const w=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];class T{constructor(t,e){this.player=t,this.grid=e,window.addEventListener("keydown",s=>{w.includes(s.key)&&this.validMove(w.indexOf(s.code))&&this.player.update(w.indexOf(s.code))})}getPlayerPosition(){const{x:t,y:e}=this.player;return this.grid[`${t}-${e}`]}validMove(t){return!this.getPlayerPosition().walls[t]}}const x=400,v=800,d=15,h=29,X=Math.floor(d/2),Y=Math.floor(h/2),b=v/h,y=x/d,R=d*h,c=document.querySelector("#canvas"),m=c.getContext("2d");let g,l;window.onload=async()=>{L()};const L=()=>{g=new N(m,[Y,X],b,y);for(let i=0;i<R;i++){const t=i%h,e=Math.floor(i/h);g.addCell(`${t}-${e}`,new P(t,e,d-1,h-1))}l=new M(0,0),new T(l,g.gridData),c.height=x,c.width=v,g.generatePath(h-1,d-1).resetVisited().generatePath(0,0).generateUnvisitedPath(),D()},D=()=>{if(m.clearRect(0,0,c.width,c.height),g.draw(),p(m,[l.x*b,l.y*y],[b,y],"orange"),l.x===Y&&l.y===X){alert("You win"),L();return}requestAnimationFrame(D)};