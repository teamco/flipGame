"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[85],{38085:function(mn,G,J){J.r(G),J.d(G,{CLSThresholds:function(){return B},FCPThresholds:function(){return D},FIDThresholds:function(){return N},INPThresholds:function(){return x},LCPThresholds:function(){return O},TTFBThresholds:function(){return q},getCLS:function(){return W},getFCP:function(){return M},getFID:function(){return _},getINP:function(){return on},getLCP:function(){return an},getTTFB:function(){return un},onCLS:function(){return W},onFCP:function(){return M},onFID:function(){return _},onINP:function(){return on},onLCP:function(){return an},onTTFB:function(){return un}});var p,T,K,E,P,Q=-1,m=function(t){addEventListener("pageshow",function(n){n.persisted&&(Q=n.timeStamp,t(n))},!0)},I=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},L=function(){var t=I();return t&&t.activationStart||0},s=function(t,n){var r=I(),i="navigate";return Q>=0?i="back-forward-cache":r&&(document.prerendering||L()>0?i="prerender":document.wasDiscarded?i="restore":r.type&&(i=r.type.replace(/_/g,"-"))),{name:t,value:n===void 0?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:i}},h=function(t,n,r){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){var i=new PerformanceObserver(function(e){Promise.resolve().then(function(){n(e.getEntries())})});return i.observe(Object.assign({type:t,buffered:!0},r||{})),i}}catch(e){}},d=function(t,n,r,i){var e,o;return function(u){n.value>=0&&(u||i)&&((o=n.value-(e||0))||e===void 0)&&(e=n.value,n.delta=o,n.rating=function(c,a){return c>a[1]?"poor":c>a[0]?"needs-improvement":"good"}(n.value,r),t(n))}},F=function(t){requestAnimationFrame(function(){return requestAnimationFrame(function(){return t()})})},w=function(t){var n=function(r){r.type!=="pagehide"&&document.visibilityState!=="hidden"||t(r)};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},A=function(t){var n=!1;return function(r){n||(t(r),n=!0)}},g=-1,U=function(){return document.visibilityState!=="hidden"||document.prerendering?1/0:0},b=function(t){document.visibilityState==="hidden"&&g>-1&&(g=t.type==="visibilitychange"?t.timeStamp:0,fn())},V=function(){addEventListener("visibilitychange",b,!0),addEventListener("prerenderingchange",b,!0)},fn=function(){removeEventListener("visibilitychange",b,!0),removeEventListener("prerenderingchange",b,!0)},k=function(){return g<0&&(g=U(),V(),m(function(){setTimeout(function(){g=U(),V()},0)})),{get firstHiddenTime(){return g}}},y=function(t){document.prerendering?addEventListener("prerenderingchange",function(){return t()},!0):t()},D=[1800,3e3],M=function(t,n){n=n||{},y(function(){var r,i=k(),e=s("FCP"),o=h("paint",function(u){u.forEach(function(c){c.name==="first-contentful-paint"&&(o.disconnect(),c.startTime<i.firstHiddenTime&&(e.value=Math.max(c.startTime-L(),0),e.entries.push(c),r(!0)))})});o&&(r=d(t,e,D,n.reportAllChanges),m(function(u){e=s("FCP"),r=d(t,e,D,n.reportAllChanges),F(function(){e.value=performance.now()-u.timeStamp,r(!0)})}))})},B=[.1,.25],W=function(t,n){n=n||{},M(A(function(){var r,i=s("CLS",0),e=0,o=[],u=function(a){a.forEach(function(f){if(!f.hadRecentInput){var v=o[0],z=o[o.length-1];e&&f.startTime-z.startTime<1e3&&f.startTime-v.startTime<5e3?(e+=f.value,o.push(f)):(e=f.value,o=[f])}}),e>i.value&&(i.value=e,i.entries=o,r())},c=h("layout-shift",u);c&&(r=d(t,i,B,n.reportAllChanges),w(function(){u(c.takeRecords()),r(!0)}),m(function(){e=0,i=s("CLS",0),r=d(t,i,B,n.reportAllChanges),F(function(){return r()})}),setTimeout(r,0))}))},C={passive:!0,capture:!0},sn=new Date,X=function(t,n){p||(p=n,T=t,K=new Date,Z(removeEventListener),Y())},Y=function(){if(T>=0&&T<K-sn){var t={entryType:"first-input",name:p.type,target:p.target,cancelable:p.cancelable,startTime:p.timeStamp,processingStart:p.timeStamp+T};E.forEach(function(n){n(t)}),E=[]}},dn=function(t){if(t.cancelable){var n=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;t.type=="pointerdown"?function(r,i){var e=function(){X(r,i),u()},o=function(){u()},u=function(){removeEventListener("pointerup",e,C),removeEventListener("pointercancel",o,C)};addEventListener("pointerup",e,C),addEventListener("pointercancel",o,C)}(n,t):X(n,t)}},Z=function(t){["mousedown","keydown","touchstart","pointerdown"].forEach(function(n){return t(n,dn,C)})},N=[100,300],_=function(t,n){n=n||{},y(function(){var r,i=k(),e=s("FID"),o=function(a){a.startTime<i.firstHiddenTime&&(e.value=a.processingStart-a.startTime,e.entries.push(a),r(!0))},u=function(a){a.forEach(o)},c=h("first-input",u);r=d(t,e,N,n.reportAllChanges),c&&w(A(function(){u(c.takeRecords()),c.disconnect()})),c&&m(function(){var a;e=s("FID"),r=d(t,e,N,n.reportAllChanges),E=[],T=-1,p=null,Z(addEventListener),a=o,E.push(a),Y()})})},$=0,R=1/0,S=0,ln=function(t){t.forEach(function(n){n.interactionId&&(R=Math.min(R,n.interactionId),S=Math.max(S,n.interactionId),$=S?(S-R)/7+1:0)})},nn=function(){return P?$:performance.interactionCount||0},pn=function(){"interactionCount"in performance||P||(P=h("event",ln,{type:"event",buffered:!0,durationThreshold:0}))},x=[200,500],tn=0,en=function(){return nn()-tn},l=[],H={},rn=function(t){var n=l[l.length-1],r=H[t.interactionId];if(r||l.length<10||t.duration>n.latency){if(r)r.entries.push(t),r.latency=Math.max(r.latency,t.duration);else{var i={id:t.interactionId,latency:t.duration,entries:[t]};H[i.id]=i,l.push(i)}l.sort(function(e,o){return o.latency-e.latency}),l.splice(10).forEach(function(e){delete H[e.id]})}},on=function(t,n){n=n||{},y(function(){var r;pn();var i,e=s("INP"),o=function(c){c.forEach(function(v){v.interactionId&&rn(v),v.entryType==="first-input"&&!l.some(function(z){return z.entries.some(function(cn){return v.duration===cn.duration&&v.startTime===cn.startTime})})&&rn(v)});var a,f=(a=Math.min(l.length-1,Math.floor(en()/50)),l[a]);f&&f.latency!==e.value&&(e.value=f.latency,e.entries=f.entries,i())},u=h("event",o,{durationThreshold:(r=n.durationThreshold)!==null&&r!==void 0?r:40});i=d(t,e,x,n.reportAllChanges),u&&("PerformanceEventTiming"in window&&"interactionId"in PerformanceEventTiming.prototype&&u.observe({type:"first-input",buffered:!0}),w(function(){o(u.takeRecords()),e.value<0&&en()>0&&(e.value=0,e.entries=[]),i(!0)}),m(function(){l=[],tn=nn(),e=s("INP"),i=d(t,e,x,n.reportAllChanges)}))})},O=[2500,4e3],j={},an=function(t,n){n=n||{},y(function(){var r,i=k(),e=s("LCP"),o=function(a){var f=a[a.length-1];f&&f.startTime<i.firstHiddenTime&&(e.value=Math.max(f.startTime-L(),0),e.entries=[f],r())},u=h("largest-contentful-paint",o);if(u){r=d(t,e,O,n.reportAllChanges);var c=A(function(){j[e.id]||(o(u.takeRecords()),u.disconnect(),j[e.id]=!0,r(!0))});["keydown","click"].forEach(function(a){addEventListener(a,function(){return setTimeout(c,0)},!0)}),w(c),m(function(a){e=s("LCP"),r=d(t,e,O,n.reportAllChanges),F(function(){e.value=performance.now()-a.timeStamp,j[e.id]=!0,r(!0)})})}})},q=[800,1800],vn=function t(n){document.prerendering?y(function(){return t(n)}):document.readyState!=="complete"?addEventListener("load",function(){return t(n)},!0):setTimeout(n,0)},un=function(t,n){n=n||{};var r=s("TTFB"),i=d(t,r,q,n.reportAllChanges);vn(function(){var e=I();if(e){var o=e.responseStart;if(o<=0||o>performance.now())return;r.value=Math.max(o-L(),0),r.entries=[e],i(!0),m(function(){r=s("TTFB",0),(i=d(t,r,q,n.reportAllChanges))(!0)})}})}}}]);
