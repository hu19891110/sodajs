/**
 * SodaRender
 * light Tml render engine
 * copyright @ Tencent AlloyTeam
 * License under MIT License
 * @author dorsywang
 * @email 314416946@qq.com
 * @blog http://www.dorsywang.com
 * @TeamBlog http://www.alloyteam.com
 */
(function(){var e=/\{\{([^\}]*)\}\}/g,t=function(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)","g")},n=function(e,n){if(!e.className){e.className=n;return}e.className.match(t(n))||(e.className+=" "+n)},r=function(e,n){e.className=e.className.replace(t(n),"")},i=function(e,t){var n=t.indexOf(".");if(n>-1){var r=t.substr(0,n);return t=t.substr(n+1),e[r]?i(e[r],t):""}return typeof e[t]!="undefined"?e[t]:""},s=function(e){},o=/[a-zA-Z_\$]+[\w\$]*/g,u=/"([^"]*)"|'([^']*)'/g,a=/\d+|\d*\.\d+/g,f=/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g,l=/\[([^\[\]]*)\]/g,c=/\.([a-zA-Z_\$]+[\w\$]*)/g,h=/[^\.|]([a-zA-Z_\$]+[\w\$]*)/g,p=/\|\|/g,d="OR_OPERATOR",v=function(){return"$$"+~~(Math.random()*1e6)},m=function(e,t){e=e.replace(p,d).split("|");for(var n=0;n<e.length;n++)e[n]=(e[n].replace(new RegExp(d,"g"),"||")||"").trim();var r=e[0]||"",s=e.slice(1);r=r.replace(u,function(e,n,r){var i=v();return t[i]=n||r,i});while(l.test(r))l.lastIndex=0,r=r.replace(l,function(e,n){return"."+m(n,t)});r=r.replace(f,function(e){return"getValue(scope,'"+e.trim()+"')"});var o=function(){var e=s.shift();if(!e)return;var e=e.split(":"),t=e.slice(1)||[],n=e[0]||"",i=/^'.*'$|^".*"$/;for(var u=0;u<t.length;u++)i.test(t[u])?t[u]="getValue(scope,"+t[u]+")":t[u]="getValue(scope,'"+t[u]+"')";b[n]&&(t.unshift(r),t=t.join(","),r="sodaFilterMap['"+n+"']("+t+")"),o()};o();var a=(new Function("getValue","sodaFilterMap","return function sodaExp(scope){ return "+r+"}"))(i,b);return a(t)},g=function(t,n){[].map.call([].slice.call(t.childNodes,[]),function(t){t.nodeType===3&&(t.nodeValue=t.nodeValue.replace(e,function(e,t){return m(t,n)}));if(t.attributes)if(/in/.test(t.getAttribute("soda-repeat")||""))y["soda-repeat"].link(n,t,t.attributes);else{if((t.getAttribute("soda-if")||"").trim()){y["soda-if"].link(n,t,t.attributes);if(t.getAttribute("removed")==="removed")return}var r;[].map.call(t.attributes,function(i){if(i.name!=="soda-if")if(/^soda-/.test(i.name)){if(y[i.name]){var s=y[i.name],o=s.link(n,t,t.attributes);o&&o.command==="childDone"&&(r=1)}}else i.value=i.value.replace(e,function(e,t){return m(t,n)})}),r||g(t,n)}})},y={},b={},w=function(e,t){y["soda-"+e]=t()},E=function(e,t){b[e]=t};E("date",function(e,t){return t}),w("repeat",function(){return{compile:function(e,t,n){},link:function(t,n,r){var s=n.getAttribute("soda-repeat"),o,u,a=/\s+track\s+by\s+([^\s]+)$/,f;s=s.replace(a,function(e,t){return t&&(f=(t||"").trim()),""}),f=f||"$index";var l=/([^\s]+)\s+in\s+([^\s]+)/,c=l.exec(s);if(!c)return;o=(c[1]||"").trim(),u=(c[2]||"").trim();if(!o||!u)return;var h=i(t,u),p=n;for(var d=0;d<h.length;d++){var v=n.cloneNode(),b={};b[f]=d,b[o]=h[d],b.__proto__=t,v.innerHTML=n.innerHTML;if((v.getAttribute("soda-if")||"").trim()){y["soda-if"].link(b,v,v.attributes);if(v.getAttribute("removed")==="removed")continue}[].map.call(v.attributes,function(t){if(v.getAttribute("removed")==="removed")return;if(t.name.trim()!=="soda-repeat")if(/^soda-/.test(t.name)){if(y[t.name]){var n=y[t.name];n.link(b,v,v.attributes)}}else t.value=t.value.replace(e,function(e,t){return m(t,b)})}),v.getAttribute("removed")!=="removed"&&(g(v,b),n.parentNode.insertBefore(v,p.nextSibling),p=v)}n.parentNode.removeChild(n)}}}),w("if",function(){return{link:function(e,t,n){var r=t.getAttribute("soda-if"),i=m(r,e);i||(t.setAttribute("removed","removed"),t.parentNode&&t.parentNode.removeChild(t))}}}),w("class",function(){return{link:function(e,t,r){var i=t.getAttribute("soda-class"),s=m(i,e);s&&n(t,s)}}}),w("src",function(){return{link:function(t,n,r){var i=n.getAttribute("soda-src"),s=i.replace(e,function(e,n){return m(n,t)});s&&n.setAttribute("src",s)}}}),w("bind-html",function(){return{link:function(e,t,n){var r=t.getAttribute("soda-bind-html"),i=m(r,e);if(i)return t.innerHTML=i,{command:"childDone"}}}});var S=function(e,t){var n=document.createElement("div");n.innerHTML=e,g(n,t);var r=document.createDocumentFragment();r.innerHTML=n.innerHTML;var i;while(i=n.childNodes[0])r.appendChild(i);return r},x=function(e,t){};window.sodaRender=S,window.sodaFilter=E})()
