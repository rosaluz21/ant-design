(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["ejPejFoj"],{"2gHZWLJ-":function(e,t,o){"use strict";o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return s;}});var i=o("d3__vuQ2"),a=o("WyIMPUJp"),n=o("1F1DPxvR"),r=i._(o("T_Gkv6XD"));let l=`
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
`;var s=()=>{let{token:{colorBgElevated:e}}=r.default.useToken(),t=(0,a.useRef)({colorBgElevated:e}),o=(e,t)=>{(0,n.updateCSS)(`
    * {
    transition: none !important;
  }
    `,"disable-transition"),document.documentElement.animate({clipPath:t?[...e].reverse():e},{duration:500,easing:"ease-in",pseudoElement:t?"::view-transition-old(root)":"::view-transition-new(root)"}).addEventListener("finish",()=>{(0,n.removeCSS)("disable-transition");});};return(0,a.useEffect)(()=>{"function"==typeof document.startViewTransition&&(0,n.updateCSS)(l,"view-transition-style");},[]),(0,a.useEffect)(()=>{e!==t.current.colorBgElevated&&(t.current.colorBgElevated=e);},[e]),(i,a)=>{if(!(i&&"function"==typeof document.startViewTransition))return;let r=Date.now(),l=i.clientX,s=i.clientY,d=Math.hypot(Math.max(l,innerWidth-l),Math.max(s,innerHeight-s));(0,n.updateCSS)(`
    [data-prefers-color='dark'] {
      color-scheme: light !important;
    }

    [data-prefers-color='light'] {
      color-scheme: dark !important;
    }
    `,"color-scheme"),document.startViewTransition(async()=>{for(;e===t.current.colorBgElevated;)await new Promise(e=>{setTimeout(e,1e3/60);});let o=document.documentElement;o.classList.remove(a?"dark":"light"),o.classList.add(a?"light":"dark");}).ready.then(()=>{console.log(`Theme transition finished in ${Date.now()-r}ms`);let e=[`circle(0px at ${l}px ${s}px)`,`circle(${d}px at ${l}px ${s}px)`];(0,n.removeCSS)("color-scheme"),o(e,a);});};};},AuZkyUwI:function(e,t,o){"use strict";o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=o("d3__vuQ2"),a=o("8Z0rk4BW"),n=i._(o("WyIMPUJp")),r=i._(o("4i_r4BgY")),l=e=>{let t=n.default.useCallback(()=>(0,a.jsxs)("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"currentColor",...e,children:[(0,a.jsx)("title",{children:"Theme icon"}),(0,a.jsx)("g",{fillRule:"evenodd",children:(0,a.jsx)("g",{fillRule:"nonzero",children:(0,a.jsx)("path",{d:"M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"})})})]}),[e]);return(0,a.jsx)(r.default,{component:t,...e});};},ejPejFoj:function(e,t,o){"use strict";o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=o("d3__vuQ2"),a=o("8Z0rk4BW"),n=o("4i_r4BgY"),r=o("qdGieaVz"),l=o("ODWitzHB"),s=o("7gnJLnTD"),d=o("nIblKo9C"),c=i._(o("2gHZWLJ-")),u=o("av4YWks-"),m=i._(o("CgOyc9oG")),h=i._(o("AuZkyUwI")),p=e=>{let{value:t=["light"],onChange:o}=e,i=(0,l.useTheme)(),{pathname:p,search:f}=(0,d.useLocation)(),g=t.includes("happy-work"),v=t.includes("dark"),x=(0,c.default)();return(0,a.jsxs)(r.FloatButton.Group,{trigger:"click",icon:(0,a.jsx)(h.default,{}),"aria-label":"Theme Switcher",badge:{dot:!0},style:{zIndex:1010},children:[(0,a.jsx)(m.default,{to:(0,u.getLocalizedPathname)("/theme-editor",(0,u.isZhCN)(p),f),style:{display:"block",marginBottom:i.margin},children:(0,a.jsx)(r.FloatButton,{icon:(0,a.jsx)(n.BgColorsOutlined,{}),tooltip:(0,a.jsx)(d.FormattedMessage,{id:"app.footer.theme"})})}),(0,a.jsx)(r.FloatButton,{icon:(0,a.jsx)(s.DarkTheme,{}),type:v?"primary":"default",onClick:e=>{x(e,v),v?o(t.filter(e=>"dark"!==e)):o([...t,"dark"]);},tooltip:(0,a.jsx)(d.FormattedMessage,{id:"app.theme.switch.dark"})}),(0,a.jsx)(r.FloatButton,{icon:(0,a.jsx)(s.CompactTheme,{}),type:t.includes("compact")?"primary":"default",onClick:()=>{t.includes("compact")?o(t.filter(e=>"compact"!==e)):o([...t,"compact"]);},tooltip:(0,a.jsx)(d.FormattedMessage,{id:"app.theme.switch.compact"})}),(0,a.jsx)(r.FloatButton,{badge:{dot:!0},icon:(0,a.jsx)(n.SmileOutlined,{}),type:g?"primary":"default",onClick:()=>{g?o(t.filter(e=>"happy-work"!==e)):o([...t,"happy-work"]);},tooltip:(0,a.jsx)(d.FormattedMessage,{id:g?"app.theme.switch.happy-work.off":"app.theme.switch.happy-work.on"})})]});};}}]);
//# sourceMappingURL=ejPejFoj-async.b0ae2684.js.map