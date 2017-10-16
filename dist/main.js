!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.debounce=t.lineDistance=t.getGradient=t.calculateAngle=t.getCurrentPos=t.randomGaussian=void 0;var r=arguments,a=n(1),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.randomGaussian=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4;return Array(e).fill(0).reduce(function(e){return e+Math.random()},0)/e},t.getCurrentPos=function(e,t,n,r){var a=function(a){return Math.pow(1-r,2)*e[a]+2*(1-r)*r*t[a]+Math.pow(r,2)*n[a]},o=a("x"),u=a("y");return new i.default(o,u)},t.calculateAngle=function(e,t){var n=t.clone().remove(e);return Math.atan2(n.x,n.y)},t.getGradient=function(e,t,n,r,a,i,o){var u=e.createLinearGradient(a,0,a+i,0);if(n===r)u.addColorStop(o,t),u.addColorStop(o,"transparent");else if(n+3<r)u.addColorStop(0,"transparent");else if(n+3===r&&"#1C1D22"!==t){var c=o>.5?2*(o-.5):0,s=o<.5?2*o:1;u.addColorStop(0,"transparent"),u.addColorStop(c,"transparent"),u.addColorStop(s,t),u.addColorStop(1,t)}else n<r&&u.addColorStop(0,t);return u},t.lineDistance=function(e,t){return Math.hypot(t.x-e.x,t.y-e.y)},t.debounce=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=null,i=null,o=function(){return e.apply(n,i)};return function(){i=r,clearTimeout(a),a=setTimeout(o,t)}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(t,n){r(this,e),this.x=t,this.y=n}return a(e,[{key:"add",value:function(e){return this.x+=e.x,this.y+=e.y,this}},{key:"remove",value:function(e){return this.x-=e.x,this.y-=e.y,this}},{key:"clone",value:function(){return new e(this.x,this.y)}}]),e}();t.default=i},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";var r=n(4),a=n(5);n(8);var i=document.getElementById("root");(0,r.createCanvas)(i,a.animate,a.stopAnimate,a.updateInterval)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createCanvas=void 0;var r=n(0);t.createCanvas=function e(t,n,a,i){t.innerHTML="";var o=document.createElement("canvas");o.width=window.innerWidth,o.height=window.innerHeight,o.style.background="#1C1D22",t.appendChild(o);var u=document.createElement("input");u.type="range",u.min=0,u.max=80,u.value=u.max/8,u.className="slider",u.addEventListener("input",function(){i(u.value/1e3)}),t.appendChild(u);var c=o.getContext("2d");window.addEventListener("resize",(0,r.debounce)(function(){a(),e(t,n,a,i)},200)),n(c)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.animate=t.stopAnimate=t.updateInterval=void 0;var r=n(6),a=["#E23500","#FDD800","#83C600","#00B7E4","#883D84","#656E6D"],i=(0,r.generatePaths)(a.length),o=.01,u=void 0;t.updateInterval=function(e){o=e},t.stopAnimate=function(){window.cancelAnimationFrame(u)},t.animate=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;t.clearRect(0,0,t.canvas.width,t.canvas.height),i.forEach(function(e,r){var i=a[r%a.length];e.forEach(function(e,r){t.beginPath(),e.draw(t,r,n,c,i),t.closePath()})});var s=c+o,l=n;s>=1&&(s=0,l++),i.forEach(function(e){e[n]?e[n].drawPlane(t,c):(l=0,s=0,i=(0,r.generatePaths)(a.length))}),u=requestAnimationFrame(function(){return e(t,l,s)})}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.generateOriginCurve=t.generatePaths=t.generatePath=t.generateCurve=t.generateContinuePoint=t.generateRandomPoint=void 0;var a=n(1),i=r(a),o=n(7),u=r(o),c=n(0),s=t.generateRandomPoint=function(e){var t=200*(0,c.randomGaussian)(),n=(0,c.randomGaussian)()*window.innerHeight/4-window.innerHeight/8;return e.clone().add(new i.default(t,n))},l=t.generateContinuePoint=function(e,t){return t.clone().remove(e).add(t)},d=t.generateCurve=function(e){var t=e.p2,n=l(e.p1,e.p2),r=s(n);return new u.default(t,n,r)},f=t.generatePath=function(e){for(var t=[h()],n=t[0];n.p.x<window.innerWidth;)n=t[t.length-1],t.push(d(n));return t.map(function(t){return t.color(e)})},h=(t.generatePaths=function(e){return Array(e).fill(0).map(f)},t.generateOriginCurve=function(){var e=window.innerHeight,t=Math.random()*e/1.8+.25*e,n=new i.default(-10,t),r=s(n),a=s(r);return new u.default(n,r,a)})},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),o=function(){function e(t,n,a){r(this,e),this.p=t,this.p1=n,this.p2=a,this.image=new Image,this.image.src="plane.svg",this.image.width=20,this.image.height=20}return a(e,[{key:"draw",value:function(e,t,n,r,a){var o=this.p,u=this.p1,c=this.p2,s=Math.min(o.x,u.x,c.x),l=c.x-o.x;e.bezierCurveTo(o.x,o.y,u.x,u.y,c.x,c.y),e.strokeStyle=(0,i.getGradient)(e,"#1C1D22",t,n,s,l,r),e.lineWidth=15,e.stroke(),e.strokeStyle=(0,i.getGradient)(e,a,t,n,s,l,r),e.lineWidth=5,e.stroke()}},{key:"drawPlane",value:function(e,t){var n=(0,i.getCurrentPos)(this.p,this.p1,this.p2,t),r=(0,i.getCurrentPos)(this.p,this.p1,this.p2,t+.01),a=(0,i.calculateAngle)(r,n);e.save(),e.translate(n.x,n.y),e.rotate(-a),e.drawImage(this.image,-30,-30,60,60),e.restore()}},{key:"color",value:function(e){return this.color=e,this}},{key:"clone",value:function(){return new e(this.p,this.p1,this.p2)}},{key:"points",get:function(){return[this.p,this.p1,this.p2]}}]),e}();t.default=o},function(e,t){}]);