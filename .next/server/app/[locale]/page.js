(()=>{var a={};a.id=465,a.ids=[465],a.modules={146:(a,b,c)=>{"use strict";c.d(b,{default:()=>h});var d=c(21124),e=c(38301),f=c(3991),g=c.n(f);function h(){let[a,b]=(0,e.useState)("product"),[c,f]=(0,e.useState)(20),[h,i]=(0,e.useState)("studio"),[j,k]=(0,e.useState)([]),l={product:200,fashion:300,restaurant:350,model:400},m={modelCasting:100,styling:75,videoClips:200,expressDelivery:150},{breakdown:n,minPrice:o,maxPrice:p}=(0,e.useMemo)(()=>{let b=l[a],d=20*Math.ceil(c/5);"onLocation"===h&&(b+=150);let e=0;j.forEach(a=>{e+=m[a]||0});let f=b+d+e,g=Math.round(.9*f),i=Math.round(1.1*f);return{breakdown:{service:b,images:d,location:150*("onLocation"===h),addOns:e},total:f,minPrice:g,maxPrice:i}},[a,c,h,j]);return(0,d.jsxs)("section",{className:"calculator-section",children:[(0,d.jsx)("style",{children:`
        .calculator-section {
          background: var(--bg);
          padding: 100px 0;
        }

        .calculator-header {
          margin-bottom: 60px;
        }

        .calculator-header span.eyebrow {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .calculator-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          margin-bottom: 24px;
          color: var(--text-dark);
        }

        .calculator-header p {
          font-size: 1rem;
          color: var(--text-light);
          max-width: 600px;
          line-height: 1.7;
        }

        .calculator-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .calculator-controls h3 {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .calculator-controls h3:first-of-type {
          margin-top: 0;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        .button-group button {
          padding: 12px 20px;
          border: 1px solid var(--border);
          border-radius: var(--r-sm);
          background: var(--bg);
          color: var(--text-dark);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }

        .button-group button:hover {
          border-color: var(--text-dark);
          background: var(--bg-light);
        }

        .button-group button.active {
          background: var(--dark);
          color: var(--bg);
          border-color: var(--dark);
        }

        .location-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .location-buttons button {
          width: 100%;
          padding: 16px;
          text-align: left;
        }

        .location-buttons button.active {
          border: 2px solid var(--dark);
        }

        .slider-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .slider-container input[type="range"] {
          flex: 1;
        }

        .slider-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          min-width: 40px;
          text-align: right;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-light);
          margin-top: 8px;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .addon-card {
          border: 1px solid var(--border);
          border-radius: var(--r-md);
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }

        .addon-card:hover {
          border-color: var(--text-dark);
          background: var(--bg-light);
        }

        .addon-card input[type="checkbox"] {
          margin-right: 12px;
        }

        .addon-label {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .addon-desc {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-top: 4px;
        }

        /* Price Card */
        .price-card {
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: var(--r-lg);
          background: var(--dark);
          color: var(--text-on-dark);
          padding: 40px;
          position: sticky;
          top: 100px;
        }

        .price-card-header {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .price-display {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1;
        }

        .price-range {
          font-size: 0.9rem;
          color: var(--text-on-dark-dim);
          margin-bottom: 24px;
        }

        .price-note {
          font-size: 0.85rem;
          color: var(--text-on-dark-dim);
          line-height: 1.6;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }

        .breakdown-item-label {
          color: var(--text-on-dark-dim);
        }

        .breakdown-item-value {
          font-weight: 600;
          color: var(--text-on-dark);
        }

        .price-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .feature-value {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-on-dark);
        }

        .feature-label {
          font-size: 0.8rem;
          color: var(--text-on-dark-dim);
        }

        .price-cta {
          background: var(--accent);
          color: var(--dark);
          border: none;
          padding: 16px 24px;
          border-radius: var(--r-pill);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s var(--ease);
        }

        .price-cta:hover {
          background: #6ab800;
          transform: scale(1.02);
        }

        @media (max-width: 1024px) {
          .calculator-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .price-card {
            position: static;
            top: auto;
          }

          .addons-grid {
            grid-template-columns: 1fr;
          }

          .location-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}),(0,d.jsxs)("div",{className:"container",children:[(0,d.jsxs)("div",{className:"calculator-header",children:[(0,d.jsx)("span",{className:"eyebrow",children:"The Part Everyone Asks About First"}),(0,d.jsx)("h2",{children:"See your price before you talk to anyone."}),(0,d.jsx)("p",{children:"Move the controls and watch the number change. This is the same calculation behind every quote we send — nothing hidden underneath it."})]}),(0,d.jsxs)("div",{className:"calculator-container",children:[(0,d.jsxs)("div",{className:"calculator-controls",children:[(0,d.jsx)("h3",{children:"What are we photographing?"}),(0,d.jsx)("div",{className:"button-group",children:["product","fashion","restaurant","model"].map(c=>(0,d.jsx)("button",{className:`capitalize ${a===c?"active":""}`,onClick:()=>b(c),children:c.charAt(0).toUpperCase()+c.slice(1)},c))}),(0,d.jsx)("h3",{children:"How many final images?"}),(0,d.jsxs)("div",{className:"slider-container",children:[(0,d.jsx)("input",{type:"range",min:"5",max:"80",step:"1",value:c,onChange:a=>f(Number(a.target.value)),className:"w-full"}),(0,d.jsx)("div",{className:"slider-value",children:c})]}),(0,d.jsxs)("div",{className:"slider-labels",children:[(0,d.jsx)("span",{children:"5 — a small drop"}),(0,d.jsx)("span",{children:"80 — a full catalogue"})]}),(0,d.jsx)("h3",{children:"Where?"}),(0,d.jsxs)("div",{className:"location-buttons",children:[(0,d.jsxs)("button",{className:"studio"===h?"active":"",onClick:()=>i("studio"),children:[(0,d.jsx)("div",{style:{fontWeight:600},children:"Our Milan studio"}),(0,d.jsx)("div",{style:{fontSize:"0.85rem",marginTop:"4px",color:"var(--text-light)"},children:"Full control of the light"})]}),(0,d.jsxs)("button",{className:"onLocation"===h?"active":"",onClick:()=>i("onLocation"),children:[(0,d.jsx)("div",{style:{fontWeight:600},children:"Your location"}),(0,d.jsx)("div",{style:{fontSize:"0.85rem",marginTop:"4px",color:"var(--text-light)"},children:"We pack the studio into a van"})]})]}),(0,d.jsx)("h3",{children:"Anything else?"}),(0,d.jsx)("div",{className:"addons-grid",children:[{id:"modelCasting",label:"Model casting",desc:"We cast, book and pay the talent."},{id:"styling",label:"Styling & set build",desc:"Props, surfaces, wardrobe."},{id:"videoClips",label:"Vertical video clips",desc:"6–10 short clips from the same set."},{id:"expressDelivery",label:"Express delivery",desc:"Retouched files back in 48 hours."}].map(a=>(0,d.jsxs)("div",{className:"addon-card",onClick:()=>{var b;return b=a.id,void k(a=>a.includes(b)?a.filter(a=>a!==b):[...a,b])},children:[(0,d.jsx)("input",{type:"checkbox",checked:j.includes(a.id),onChange:()=>{}}),(0,d.jsx)("label",{className:"addon-label",children:a.label}),(0,d.jsx)("div",{className:"addon-desc",children:a.desc})]},a.id))})]}),(0,d.jsxs)("div",{className:"price-card",children:[(0,d.jsx)("div",{className:"price-card-header",children:"Your Estimate"}),(0,d.jsxs)("div",{className:"price-display",children:["€",o," – €",p]}),(0,d.jsx)("div",{className:"price-range",children:"Excluding VAT. Fixed in writing before we start."}),(0,d.jsxs)("div",{className:"price-note",children:[(0,d.jsxs)("strong",{children:[a.charAt(0).toUpperCase()+a.slice(1)," shoot"]}),"— studio time & lighting"]}),(0,d.jsxs)("div",{className:"breakdown-item",children:[(0,d.jsxs)("span",{className:"breakdown-item-label",children:[c," final retouched images"]}),(0,d.jsxs)("span",{className:"breakdown-item-value",children:["€",n.images]})]}),n.location>0&&(0,d.jsxs)("div",{className:"breakdown-item",children:[(0,d.jsx)("span",{className:"breakdown-item-label",children:"On-location travel"}),(0,d.jsxs)("span",{className:"breakdown-item-value",children:["€",n.location]})]}),n.addOns>0&&(0,d.jsxs)("div",{className:"breakdown-item",children:[(0,d.jsx)("span",{className:"breakdown-item-label",children:"Add-ons"}),(0,d.jsxs)("span",{className:"breakdown-item-value",children:["€",n.addOns]})]}),(0,d.jsxs)("div",{className:"price-features",children:[(0,d.jsxs)("div",{className:"feature",children:[(0,d.jsx)("div",{className:"feature-icon",children:"⏱️"}),(0,d.jsx)("div",{className:"feature-value",children:"4 working days"}),(0,d.jsx)("div",{className:"feature-label",children:"Files delivered"})]}),(0,d.jsxs)("div",{className:"feature",children:[(0,d.jsx)("div",{className:"feature-icon",children:"✨"}),(0,d.jsx)("div",{className:"feature-value",children:"Essential"}),(0,d.jsx)("div",{className:"feature-label",children:"One studio day"})]})]}),(0,d.jsx)(g(),{href:"/booking",className:"price-cta",style:{display:"inline-block",textAlign:"center",textDecoration:"none"},children:"Hold a date with this brief"})]})]})]})]})}},261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},1904:(a,b,c)=>{"use strict";c.d(b,{default:()=>l});var d=c(21124),e=c(38301);let f=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),g=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),h=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),i=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h4m4 0h4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"})}),j=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),k=()=>(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})});function l(){let[a,b]=(0,e.useState)(null),c=[{question:"How far in advance should I book?",answer:"We recommend booking at least 2-3 weeks in advance. However, we can sometimes accommodate rush bookings depending on availability. Contact us directly for urgent requests.",icon:(0,d.jsx)(f,{})},{question:"What is included in each package?",answer:"Each package includes the photoshoot with a professional photographer, edited digital images, and a usage license. Specific details vary by package - check our packages section for complete details.",icon:(0,d.jsx)(g,{})},{question:"Can I reschedule my booking?",answer:"Yes, we allow rescheduling with at least 7 days notice. Rescheduling within 7 days may incur additional fees. Contact us to discuss your specific situation.",icon:(0,d.jsx)(h,{})},{question:"What is your payment and cancellation policy?",answer:"A 25% deposit is required to confirm the booking. The remaining balance is due on the day of the shoot. Cancellations within 7 days of the shoot are non-refundable.",icon:(0,d.jsx)(i,{})},{question:"How long until I receive my photos?",answer:"Typical turnaround is 5-7 business days for edited images. Express delivery is available for an additional fee - images within 48 hours.",icon:(0,d.jsx)(j,{})},{question:"Do you offer rush/express services?",answer:"Yes! Add the Express Delivery option for 48-hour turnaround (additional €150). For same-day needs, please contact us directly.",icon:(0,d.jsx)(k,{})}];return(0,d.jsxs)("div",{className:"max-w-5xl mx-auto px-4",children:[(0,d.jsxs)("div",{className:"text-center mb-16",children:[(0,d.jsx)("h2",{className:"text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent",children:"Frequently Asked Questions"}),(0,d.jsx)("p",{className:"text-lg text-gray-600",children:"Everything you need to know about booking with MEOCY"})]}),(0,d.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:c.map((c,e)=>(0,d.jsxs)("div",{className:"group",children:[(0,d.jsx)("button",{onClick:()=>b(a===e?null:e),className:`w-full text-left transition-all duration-300 ${a===e?"bg-gradient-to-br from-gray-900 to-gray-800 text-white":"bg-white text-gray-900 hover:shadow-lg border border-gray-200"} rounded-2xl p-6 shadow-sm hover:shadow-md`,children:(0,d.jsxs)("div",{className:"flex items-start gap-4",children:[(0,d.jsx)("div",{className:`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${a===e?"bg-white/20":"bg-gray-100 text-gray-700"}`,children:c.icon}),(0,d.jsx)("div",{className:"flex-1 min-w-0",children:(0,d.jsx)("h3",{className:"text-lg font-semibold pr-8",children:c.question})}),(0,d.jsx)("svg",{className:`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${a===e?"transform rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 14l-7 7m0 0l-7-7m7 7V3"})})]})}),a===e&&(0,d.jsx)("div",{className:"mt-2 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-gray-700 leading-relaxed animate-in fade-in duration-200",children:c.answer})]},e))})]})}},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14005:(a,b,c)=>{"use strict";c.d(b,{default:()=>h});var d=c(21124),e=c(46078),f=c(3991),g=c.n(f);function h(){let a=(0,e.useTranslations)();return(0,d.jsxs)("section",{className:"packages-section",children:[(0,d.jsx)("style",{children:`
        .packages-section {
          padding: 0;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .package-card {
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 40px;
          display: flex;
          flex-direction: column;
          min-height: 600px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .package-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%);
          pointer-events: none;
        }

        .package-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .package-card.light {
          background: var(--bg-light);
          color: var(--text-dark);
        }

        .package-card.dark {
          background: var(--dark);
          color: var(--text-on-dark);
          border-color: rgba(0, 0, 0, 0.3);
        }

        .package-card.accent {
          background: #f0ffe8;
          color: var(--text-dark);
          border-color: var(--accent);
          border-width: 2px;
        }

        .package-header {
          margin-bottom: 24px;
        }

        .package-name {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .package-card.light .package-name {
          color: var(--text-dark);
        }

        .package-card.dark .package-name {
          color: var(--text-on-dark);
        }

        .package-card.accent .package-name {
          color: var(--accent);
        }

        .package-subtitle {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .package-card.dark .package-subtitle {
          color: var(--accent);
        }

        .package-price {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }

        .package-price-note {
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 500;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .package-card.dark .package-price-note {
          color: var(--text-on-dark-dim);
        }

        .package-card.accent .package-price-note {
          color: var(--text-light);
        }

        .package-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid;
        }

        .package-card.light .package-info {
          border-color: rgba(0, 0, 0, 0.1);
        }

        .package-card.dark .package-info {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .package-card.accent .package-info {
          border-color: rgba(122, 204, 0, 0.2);
        }

        .package-info-item {
          border: 1px solid;
          border-radius: var(--r-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .package-card.light .package-info-item {
          border-color: rgba(0, 0, 0, 0.1);
          background: var(--bg);
        }

        .package-card.dark .package-info-item {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }

        .package-card.accent .package-info-item {
          border-color: rgba(122, 204, 0, 0.3);
          background: rgba(122, 204, 0, 0.05);
        }

        .package-info-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 6px;
        }

        .package-card.dark .package-info-label {
          color: var(--text-on-dark-dim);
        }

        .package-card.accent .package-info-label {
          color: var(--accent);
        }

        .package-info-value {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .package-card.light .package-info-value {
          color: var(--text-dark);
        }

        .package-card.dark .package-info-value {
          color: var(--text-on-dark);
        }

        .package-card.accent .package-info-value {
          color: var(--text-dark);
        }

        .package-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .package-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .package-feature-check {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-weight: 700;
          margin-top: 2px;
        }

        .package-feature-text {
          color: inherit;
        }

        .package-card.light .package-feature-text {
          color: var(--text-dark);
        }

        .package-card.dark .package-feature-text {
          color: var(--text-on-dark);
        }

        .package-cta {
          border: 1.5px solid #000;
          background: transparent;
          color: #000;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: block;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .package-card.light .package-cta {
          color: #000;
          border-color: #000;
        }

        .package-card.light .package-cta:hover {
          background: #000;
          color: #fff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .package-card.dark .package-cta {
          color: #fff;
          border-color: #fff;
        }

        .package-card.dark .package-cta:hover {
          background: #fff;
          color: #000;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .package-card.accent .package-cta {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .package-card.accent .package-cta:hover {
          background: #22c55e;
          color: #000;
          border-color: #22c55e;
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
        }

        @media (max-width: 768px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }

          .package-card {
            min-height: auto;
          }
        }
      `}),(0,d.jsx)("div",{className:"packages-grid",children:[{key:"basic",variant:"light"},{key:"silver",variant:"dark"},{key:"gold",variant:"accent"},{key:"platinum",variant:"dark"}].map(b=>(0,d.jsxs)("div",{className:`package-card ${b.variant}`,children:[(0,d.jsxs)("div",{className:"package-header",children:[(0,d.jsx)("div",{className:"package-name",children:a(`packages.${b.key}.name`)}),(0,d.jsx)("div",{className:"package-subtitle",children:a(`packages.${b.key}.subtitle`)}),(0,d.jsx)("div",{className:"package-price",children:a(`packages.${b.key}.price`)}),(0,d.jsx)("div",{className:"package-price-note",children:"Excluding VAT"})]}),(0,d.jsxs)("div",{className:"package-info",children:["basic"===b.key&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Volume"}),(0,d.jsx)("div",{className:"package-info-value",children:"Up to 15 final images"})]}),(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Delivery"}),(0,d.jsx)("div",{className:"package-info-value",children:"5 working days"})]})]}),"silver"===b.key&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Volume"}),(0,d.jsx)("div",{className:"package-info-value",children:"Up to 40 final images"})]}),(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Delivery"}),(0,d.jsx)("div",{className:"package-info-value",children:"4 working days"})]})]}),"gold"===b.key&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Volume"}),(0,d.jsx)("div",{className:"package-info-value",children:"80+ final images"})]}),(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Delivery"}),(0,d.jsx)("div",{className:"package-info-value",children:"7 working days"})]})]}),"platinum"===b.key&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Volume"}),(0,d.jsx)("div",{className:"package-info-value",children:"100+ photos & 10 videos"})]}),(0,d.jsxs)("div",{className:"package-info-item",children:[(0,d.jsx)("div",{className:"package-info-label",children:"Delivery"}),(0,d.jsx)("div",{className:"package-info-value",children:"10 working days"})]})]})]}),(0,d.jsx)("ul",{className:"package-features",children:(()=>{let c=a.raw(`packages.${b.key}.features`);return Array.isArray(c)?c.map((a,b)=>(0,d.jsxs)("li",{className:"package-feature",children:[(0,d.jsx)("div",{className:"package-feature-check",children:"✓"}),(0,d.jsx)("div",{className:"package-feature-text",children:a})]},b)):null})()}),(0,d.jsx)(g(),{href:"/booking",className:"package-cta",children:"Book your package"})]},b.key))})]})}},16840:(a,b,c)=>{"use strict";c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Calculator.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Calculator.tsx","default")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},23331:(a,b,c)=>{"use strict";c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Packages.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Packages.tsx","default")},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},28354:a=>{"use strict";a.exports=require("util")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},31933:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>E.a,__next_app__:()=>K,handler:()=>M,pages:()=>J,routeModule:()=>L,tree:()=>I});var d=c(49754),e=c(9117),f=c(46595),g=c(32324),h=c(39326),i=c(38928),j=c(20175),k=c(12),l=c(54290),m=c(12696),n=c(52574),o=c(82802),p=c(77533),q=c(45229),r=c(32822),s=c(261),t=c(26453),u=c(52474),v=c(26713),w=c(51356),x=c(62685),y=c(36225),z=c(63446),A=c(2762),B=c(45742),C=c(86439),D=c(81170),E=c.n(D),F=c(62506),G=c(91203),H={};for(let a in F)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(H[a]=()=>F[a]);c.d(b,H);let I={children:["",{children:["[locale]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,76116)),"/Users/chamilaprasanna/Desktop/MEOCY/meocy/app/[locale]/page.tsx"]}]},{layout:[()=>Promise.resolve().then(c.bind(c,60098)),"/Users/chamilaprasanna/Desktop/MEOCY/meocy/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(c.bind(c,16953)),"/Users/chamilaprasanna/Desktop/MEOCY/meocy/app/layout.tsx"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,81170,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,87028,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,90461,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,32768,23)),"next/dist/client/components/builtin/unauthorized.js"]}]}.children,J=["/Users/chamilaprasanna/Desktop/MEOCY/meocy/app/[locale]/page.tsx"],K={require:c,loadChunk:()=>Promise.resolve()},L=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/[locale]/page",pathname:"/[locale]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:I},distDir:".next",relativeProjectDir:""});async function M(a,b,d){var D;let H="/[locale]/page";"/index"===H&&(H="/");let N=(0,h.getRequestMeta)(a,"postponed"),O=(0,h.getRequestMeta)(a,"minimalMode"),P=await L.prepare(a,b,{srcPage:H,multiZoneDraftMode:!1});if(!P)return b.statusCode=400,b.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve()),null;let{buildId:Q,query:R,params:S,parsedUrl:T,pageIsDynamic:U,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,serverActionsManifest:Y,clientReferenceManifest:Z,subresourceIntegrityManifest:$,prerenderManifest:_,isDraftMode:aa,resolvedPathname:ab,revalidateOnlyGenerated:ac,routerServerContext:ad,nextConfig:ae,interceptionRoutePatterns:af}=P,ag=T.pathname||"/",ah=(0,s.normalizeAppPath)(H),{isOnDemandRevalidate:ai}=P,aj=L.match(ag,_),ak=!!_.routes[ab],al=!!(aj||ak||_.routes[ah]),am=a.headers["user-agent"]||"",an=(0,v.getBotType)(am),ao=(0,q.isHtmlBotRequest)(a),ap=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??"1"===a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],aq=(0,h.getRequestMeta)(a,"isRSCRequest")??(0,n.f)(a.headers[u.RSC_HEADER]),ar=(0,t.getIsPossibleServerAction)(a),as=(0,m.checkIsAppPPREnabled)(ae.experimental.ppr)&&(null==(D=_.routes[ah]??_.dynamicRoutes[ah])?void 0:D.renderingMode)==="PARTIALLY_STATIC",at=!1,au=!1,av=as?N:void 0,aw=as&&aq&&!ap,ax=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),ay=!am||(0,q.shouldServeStreamingMetadata)(am,ae.htmlLimitedBots);ao&&as&&(al=!1,ay=!1);let az=!0===L.isDev||!al||"string"==typeof N||aw,aA=ao&&as,aB=null;aa||!al||az||ar||av||aw||(aB=ab);let aC=aB;!aC&&L.isDev&&(aC=ab),L.isDev||aa||!al||!aq||aw||(0,k.d)(a.headers);let aD={...F,tree:I,pages:J,GlobalError:E(),handler:M,routeModule:L,__next_app__:K};Y&&Z&&(0,p.setReferenceManifestsSingleton)({page:H,clientReferenceManifest:Z,serverActionsManifest:Y,serverModuleMap:(0,r.createServerModuleMap)({serverActionsManifest:Y})});let aE=a.method||"GET",aF=(0,g.getTracer)(),aG=aF.getActiveScopeSpan();try{let f=L.getVaryHeader(ab,af);b.setHeader("Vary",f);let k=async(c,d)=>{let e=new l.NodeNextRequest(a),f=new l.NodeNextResponse(b);return L.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aF.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aE} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aE} ${a.url}`)})},m=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:R,params:S,page:ah,sharedContext:{buildId:Q},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aD,Component:(0,j.T)(aD),params:S,routeModule:L,page:H,postponed:f,shouldWaitOnAllReady:aA,serveStreamingMetadata:ay,supportsDynamicResponse:"string"==typeof f||az,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,subresourceIntegrityManifest:$,serverActionsManifest:Y,clientReferenceManifest:Z,setIsrStatus:null==ad?void 0:ad.setIsrStatus,dir:c(33873).join(process.cwd(),L.relativeProjectDir),isDraftMode:aa,isRevalidate:al&&!f&&!aw,botType:an,isOnDemandRevalidate:ai,isPossibleServerAction:ar,assetPrefix:ae.assetPrefix,nextConfigOutput:ae.output,crossOrigin:ae.crossOrigin,trailingSlash:ae.trailingSlash,previewProps:_.preview,deploymentId:ae.deploymentId,enableTainting:ae.experimental.taint,htmlLimitedBots:ae.htmlLimitedBots,devtoolSegmentExplorer:ae.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ae.reactMaxHeadersLength,multiZoneDraftMode:!1,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ae.experimental.cacheLife,basePath:ae.basePath,serverActions:ae.experimental.serverActions,...at?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:at}:{},experimental:{isRoutePPREnabled:as,expireTime:ae.expireTime,staleTimes:ae.experimental.staleTimes,cacheComponents:!!ae.experimental.cacheComponents,clientSegmentCache:!!ae.experimental.clientSegmentCache,clientParamParsing:!!ae.experimental.clientParamParsing,dynamicOnHover:!!ae.experimental.dynamicOnHover,inlineCss:!!ae.experimental.inlineCss,authInterrupts:!!ae.experimental.authInterrupts,clientTraceMetadata:ae.experimental.clientTraceMetadata||[]},waitUntil:d.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>L.onRequestError(a,b,d,ad),err:(0,h.getRequestMeta)(a,"invokeError"),dev:L.isDev}},l=await k(e,i),{metadata:m}=l,{cacheControl:n,headers:o={},fetchTags:p}=m;if(p&&(o[z.NEXT_CACHE_TAGS_HEADER]=p),a.fetchMetrics=m.fetchMetrics,al&&(null==n?void 0:n.revalidate)===0&&!L.isDev&&!as){let a=m.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${ab}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:w.CachedRouteKind.APP_PAGE,html:l,headers:o,rscData:m.flightData,postponed:m.postponed,status:m.statusCode,segmentData:m.segmentData},cacheControl:n}},n=async({hasResolved:c,previousCacheEntry:f,isRevalidating:g,span:i})=>{let j,k=!1===L.isDev,l=c||b.writableEnded;if(ai&&ac&&!f&&!O)return(null==ad?void 0:ad.render404)?await ad.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(aj&&(j=(0,x.parseFallbackField)(aj.fallback)),j===x.FallbackMode.PRERENDER&&(0,v.isBot)(am)&&(!as||ao)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),(null==f?void 0:f.isStale)===-1&&(ai=!0),ai&&(j!==x.FallbackMode.NOT_FOUND||f)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),!O&&j!==x.FallbackMode.BLOCKING_STATIC_RENDER&&aC&&!l&&!aa&&U&&(k||!ak)){let b;if((k||aj)&&j===x.FallbackMode.NOT_FOUND)throw new C.NoFallbackError;if(as&&!aq){let c="string"==typeof(null==aj?void 0:aj.fallback)?aj.fallback:k?ah:null;if(b=await L.handleResponse({cacheKey:c,req:a,nextConfig:ae,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:_,isRoutePPREnabled:as,responseGenerator:async()=>m({span:i,postponed:void 0,fallbackRouteParams:k||au?(0,o.u)(ah):null}),waitUntil:d.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let n=ai||g||!av?void 0:av;if(at&&void 0!==n)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:w.CachedRouteKind.PAGES,html:y.default.EMPTY,pageData:{},headers:void 0,status:void 0}};let p=U&&as&&((0,h.getRequestMeta)(a,"renderFallbackShell")||au)?(0,o.u)(ag):null;return m({span:i,postponed:n,fallbackRouteParams:p})},p=async c=>{var f,g,i,j,k;let l,o=await L.handleResponse({cacheKey:aB,responseGenerator:a=>n({span:c,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ai,isRoutePPREnabled:as,req:a,nextConfig:ae,prerenderManifest:_,waitUntil:d.waitUntil});if(aa&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),L.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(aB)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(f=o.value)?void 0:f.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(i=o.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;al&&!aw&&(!p||ap)&&(O||b.setHeader("x-nextjs-cache",ai?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(u.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(av)l={revalidate:0,expire:void 0};else if(O&&aq&&!ap&&as)l={revalidate:0,expire:void 0};else if(!L.isDev)if(aa)l={revalidate:0,expire:void 0};else if(al){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});l={revalidate:o.cacheControl.revalidate,expire:(null==(j=o.cacheControl)?void 0:j.expire)??ae.expireTime}}else l={revalidate:z.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(l={revalidate:0,expire:void 0});if(o.cacheControl=l,"string"==typeof ax&&(null==q?void 0:q.kind)===w.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(k=q.headers)?void 0:k[z.NEXT_CACHE_TAGS_HEADER];O&&al&&c&&"string"==typeof c&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(ax);return void 0!==d?(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(d,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl}):(b.statusCode=204,(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.EMPTY,cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&av)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(O&&al||delete a[z.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let s=null==(g=q.headers)?void 0:g[z.NEXT_CACHE_TAGS_HEADER];if(O&&al&&s&&"string"==typeof s&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,s),!q.status||aq&&as||(b.statusCode=q.status),!O&&q.status&&G.RedirectStatusCode[q.status]&&aq&&(b.statusCode=200),p&&b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"1"),aq&&!aa){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:q.html,cacheControl:aw?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(q.rscData,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl})}let t=q.html;if(!p||O||aq)return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:o.cacheControl});if(at)return t.push(new ReadableStream({start(a){a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}});let v=new TransformStream;return t.push(v.readable),m({span:c,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(v.writable)}).catch(a=>{v.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}})};if(!aG)return await aF.withPropagatedContext(a.headers,()=>aF.trace(i.BaseServerSpan.handleRequest,{spanName:`${aE} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aE,"http.target":a.url}},p));await p(aG)}catch(b){throw b instanceof C.NoFallbackError||await L.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:al,isOnDemandRevalidate:ai})},ad),b}}},33873:a=>{"use strict";a.exports=require("path")},34934:(a,b,c)=>{"use strict";c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Studio.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/Studio.tsx","default")},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},56332:(a,b,c)=>{"use strict";c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/CTA.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/CTA.tsx","default")},59741:(a,b,c)=>{Promise.resolve().then(c.bind(c,146)),Promise.resolve().then(c.bind(c,65470)),Promise.resolve().then(c.bind(c,1904)),Promise.resolve().then(c.bind(c,14005)),Promise.resolve().then(c.bind(c,86008)),Promise.resolve().then(c.bind(c,94398)),Promise.resolve().then(c.t.bind(c,3991,23))},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65169:(a,b,c)=>{let{createProxy:d}=c(39893);a.exports=d("/Users/chamilaprasanna/Desktop/MEOCY/meocy/node_modules/next/dist/client/app-dir/link.js")},65470:(a,b,c)=>{"use strict";c.d(b,{default:()=>h});var d=c(21124),e=c(46078),f=c(3991),g=c.n(f);function h(){let a=(0,e.useTranslations)();return(0,d.jsxs)("section",{className:"cta-section",children:[(0,d.jsx)("style",{children:`
        .cta-section {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: #ffffff;
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .cta-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          line-height: 1.8;
          font-weight: 400;
        }

        .cta-button {
          display: inline-block;
          background: #ffffff;
          color: #000000;
          padding: 16px 44px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          background: #f5f5f5;
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 60px 20px;
          }

          .cta-title {
            font-size: 2rem;
          }
        }
      `}),(0,d.jsx)("div",{className:"container",children:(0,d.jsxs)("div",{className:"cta-content",children:[(0,d.jsx)("h2",{className:"cta-title",children:"Ready to Transform Your Visual Content?"}),(0,d.jsx)("p",{className:"cta-description",children:"Let's create stunning photography that elevates your brand. Book your shoot today."}),(0,d.jsx)(g(),{href:"/booking",className:"cta-button",children:a("hero.cta_book")})]})})]})}},68894:(a,b,c)=>{"use strict";c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/FAQ.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/chamilaprasanna/Desktop/MEOCY/meocy/components/FAQ.tsx","default")},76116:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>q,dynamic:()=>p});var d=c(75338),e=c(94764),f=c(65169),g=c.n(f);function h(){let a=(0,e.A)();return(0,d.jsxs)("section",{className:"hero-section",children:[(0,d.jsx)("style",{children:`
        .hero-section {
          margin-top: 60px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          position: relative;
          overflow: hidden;
          padding: 60px 20px;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: -40%;
          right: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-section::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.05);
          padding: 10px 18px;
          border-radius: 20px;
          margin-bottom: 32px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #000;
          border: 1px solid rgba(0, 0, 0, 0.1);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hero-tag::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          color: #000;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #666;
          margin-bottom: 56px;
          line-height: 1.8;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
          align-items: center;
          margin-bottom: 100px;
        }

        @media (min-width: 640px) {
          .hero-cta {
            flex-direction: row;
            gap: 12px;
          }
        }

        .btn {
          padding: 14px 40px;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          min-width: 200px;
        }

        .btn-primary {
          background: #000;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
          background: transparent;
          color: #000;
          border: 2px solid #000;
        }

        .btn-secondary:hover {
          background: #000;
          color: #fff;
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 50px;
        }

        .stat-item {
          animation: fadeInUp 0.6s ease-out both;
        }

        .stat-number {
          font-size: 4rem;
          font-weight: 800;
          color: #22c55e;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          font-weight: 500;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            margin-top: 60px;
            padding: 40px 20px;
          }

          .btn {
            min-width: 100%;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .stats-grid {
            gap: 30px;
          }

          .stat-number {
            font-size: 3rem;
          }
        }
      `}),(0,d.jsx)("div",{className:"container",children:(0,d.jsxs)("div",{className:"hero-content",children:[(0,d.jsx)("div",{className:"hero-tag",children:(0,d.jsx)("span",{children:"MILAN"})}),(0,d.jsx)("h1",{className:"hero-title",children:a("hero.title")}),(0,d.jsx)("p",{className:"hero-subtitle",children:a("hero.subtitle")}),(0,d.jsxs)("div",{className:"hero-cta",children:[(0,d.jsx)(g(),{href:"/booking",className:"btn btn-primary",children:a("hero.cta_book")}),(0,d.jsx)("button",{className:"btn btn-secondary",children:a("hero.cta_work")})]}),(0,d.jsxs)("div",{className:"stats-grid",children:[(0,d.jsxs)("div",{className:"stat-item",children:[(0,d.jsx)("div",{className:"stat-number",children:"8"}),(0,d.jsx)("p",{className:"stat-label",children:a("stats.equipment")})]}),(0,d.jsxs)("div",{className:"stat-item",children:[(0,d.jsx)("div",{className:"stat-number",children:"12"}),(0,d.jsx)("p",{className:"stat-label",children:a("stats.response")})]}),(0,d.jsxs)("div",{className:"stat-item",children:[(0,d.jsx)("div",{className:"stat-number",children:"1"}),(0,d.jsx)("p",{className:"stat-label",children:a("stats.location")})]})]})]})})]})}function i(){let a=(0,e.A)();return(0,d.jsxs)("section",{className:"equipment-section",children:[(0,d.jsx)("style",{children:`
        .equipment-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ffffff;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .equipment-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .equipment-section::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .equipment-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 100px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        .equipment-header-left span.eyebrow {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .equipment-header h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: #ffffff;
          margin-bottom: 24px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .equipment-header-right p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          line-height: 1.8;
          font-weight: 400;
        }

        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .equipment-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .equipment-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .equipment-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .equipment-card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          display: inline-block;
        }

        .equipment-card-title {
          font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto';
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .equipment-card-title::before {
          content: "";
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }

        .equipment-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .equipment-list li {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
          padding-left: 0;
          transition: color 0.2s;
          font-weight: 400;
        }

        .equipment-list li::before {
          content: "–";
          margin-right: 8px;
          color: rgba(255, 255, 255, 0.4);
        }

        .equipment-card:hover .equipment-list li {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .equipment-header {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 60px;
          }

          .equipment-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .equipment-section {
            padding: 80px 0;
          }

          .equipment-header h2 {
            font-size: 2rem;
          }
        }
      `}),(0,d.jsxs)("div",{className:"container",children:[(0,d.jsxs)("div",{className:"equipment-header",children:[(0,d.jsxs)("div",{className:"equipment-header-left",children:[(0,d.jsx)("span",{className:"eyebrow",children:"Behind the Scenes"}),(0,d.jsx)("h2",{children:a("equipment.title")})]}),(0,d.jsx)("div",{className:"equipment-header-right",children:(0,d.jsx)("p",{children:a("equipment.subtitle")})})]}),(0,d.jsx)("div",{className:"equipment-grid",children:[{titleKey:"equipment.camera",items:["Sony A6700","Sony FX30"],icon:"\uD83D\uDCF7"},{titleKey:"equipment.lenses",items:["85mm f/1.4","50mm f/1.4","33mm f/1.4"],icon:"\uD83D\uDD0D"},{titleKey:"equipment.lighting",items:["Godox AD600Pro","Godox AD300Pro","GVM 300W","GVM 150W","3\xd7 Speedlight","120cm & 80cm Octabox","Light Stands"],icon:"\uD83D\uDCA1"},{titleKey:"equipment.support",items:["Photo & video tripods","Ronin RS Mini Pro"],icon:"\uD83E\uDDBE"},{titleKey:"equipment.aerial",items:["DJI Mini 3 Pro"],icon:"\uD83D\uDE81"},{titleKey:"equipment.storage",items:["256GB SD card","128GB V90 SD card","128GB V60 SD card","64GB SD card","8TB HDD backup"],icon:"\uD83D\uDCBE"},{titleKey:"equipment.power",items:["3\xd7 spare batteries","2\xd7 20,000mAh power bank","EcoFlow 60,000mAh"],icon:"\uD83D\uDD0B"},{titleKey:"equipment.postproduction",items:["Mac","ASUS PA278QV color-calibrated monitor"],icon:"\uD83D\uDDA5️"}].map((b,c)=>(0,d.jsxs)("div",{className:"equipment-card",children:[(0,d.jsx)("div",{className:"equipment-card-icon",children:b.icon}),(0,d.jsx)("div",{className:"equipment-card-title",children:a(b.titleKey)}),(0,d.jsx)("ul",{className:"equipment-list",children:b.items.map((a,b)=>(0,d.jsx)("li",{children:a},b))})]},c))})]})]})}var j=c(23331),k=c(16840);function l(){return(0,d.jsxs)("section",{className:"process-section",children:[(0,d.jsx)("style",{children:`
        .process-section {
          background: var(--dark);
          color: var(--text-on-dark);
          padding: 100px 0;
        }

        .process-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .process-content span.eyebrow {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .process-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          color: var(--text-on-dark);
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .process-content > p {
          font-size: 1.05rem;
          color: var(--text-on-dark-dim);
          margin-bottom: 60px;
          line-height: 1.7;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
          padding-left: 32px;
        }

        .process-steps::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            180deg,
            var(--accent) 0%,
            var(--accent) 100%
          );
        }

        .process-step {
          position: relative;
          padding-left: 24px;
        }

        .process-step::before {
          content: "";
          position: absolute;
          left: -32px;
          top: 6px;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 50%;
          border: 3px solid var(--dark);
        }

        .process-step-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-on-dark);
          margin-bottom: 8px;
        }

        .process-step-duration {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 4px 12px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .process-step-description {
          font-size: 0.95rem;
          color: var(--text-on-dark-dim);
          line-height: 1.6;
        }

        .process-image {
          position: relative;
          border-radius: var(--r-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          aspect-ratio: 1;
        }

        .process-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .process-image-caption {
          font-size: 0.8rem;
          color: var(--text-on-dark-dim);
          margin-top: 16px;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .process-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .process-image {
            aspect-ratio: auto;
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .process-section {
            padding: 60px 0;
          }

          .process-container {
            gap: 40px;
          }

          .process-steps {
            gap: 32px;
            padding-left: 24px;
          }

          .process-steps::before {
            left: 3px;
          }

          .process-step::before {
            left: -24px;
          }
        }
      `}),(0,d.jsx)("div",{className:"container",children:(0,d.jsxs)("div",{className:"process-container",children:[(0,d.jsxs)("div",{className:"process-content",children:[(0,d.jsx)("span",{className:"eyebrow",children:"From First Message to Final Files"}),(0,d.jsx)("h2",{children:"You will always know what happens next."}),(0,d.jsx)("p",{children:"No jargon, no surprise invoices. Four steps, fixed timings, one person looking after you the whole way."}),(0,d.jsx)("div",{className:"process-steps",children:[{title:"Tell us what you sell",duration:"20 MINUTES",description:"A short call or a form. We look at your products, your channels and the images you wish you had."},{title:"We send a shot list",duration:"2 DAYS",description:"Every frame planned before anyone touches a camera — angles, props, light, and where each image will be used."},{title:"Shoot day",duration:"HALF OR FULL DAY",description:"In our Milan studio or at your location. You can join in person or watch the live tethered feed from anywhere."},{title:"Selects, retouch, deliver",duration:"4–7 DAYS",description:"You pick favourites in a private gallery. We retouch and deliver in every crop your channels need."}].map((a,b)=>(0,d.jsxs)("div",{className:"process-step",children:[(0,d.jsx)("div",{className:"process-step-title",children:a.title}),(0,d.jsx)("div",{className:"process-step-duration",children:a.duration}),(0,d.jsx)("div",{className:"process-step-description",children:a.description})]},b))})]}),(0,d.jsxs)("div",{className:"process-image",children:[(0,d.jsx)("img",{src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",alt:"MEOCY Studio Setup"}),(0,d.jsx)("div",{className:"process-image-caption",children:"Via Tortona, Milan — 180 sqm, three cycloramas, tethered to your screen."})]})]})})]})}var m=c(34934),n=c(68894),o=c(56332);let p="force-dynamic";function q(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsxs)("section",{className:"packages-section-wrapper",children:[(0,d.jsx)("style",{children:`
          .packages-section-wrapper {
            background: var(--bg);
            padding: 100px 0;
          }

          .packages-header {
            text-align: center;
            margin-bottom: 80px;
          }

          .packages-header span.eyebrow {
            display: inline-block;
            background: var(--accent-soft);
            color: var(--accent);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 8px 16px;
            border-radius: 20px;
            margin-bottom: 24px;
          }

          .packages-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2rem, 6vw, 3rem);
            font-weight: 800;
            margin-bottom: 24px;
            color: var(--text-dark);
          }

          .packages-header p {
            font-size: 1.05rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
          }
        `}),(0,d.jsxs)("div",{className:"container",children:[(0,d.jsxs)("div",{className:"packages-header",children:[(0,d.jsx)("span",{className:"eyebrow",children:"Pricing"}),(0,d.jsx)("h2",{children:"Packages & Pricing"}),(0,d.jsx)("p",{children:"All prices shown excluding VAT. Every detail fixed in writing before we start. Standard packages include videos for social media content (Reels, TikTok, Stories)."})]}),(0,d.jsx)(j.default,{})]})]}),(0,d.jsx)("section",{className:"py-16",children:(0,d.jsx)("div",{className:"container",children:(0,d.jsx)(k.default,{})})}),(0,d.jsx)(l,{}),(0,d.jsx)(m.default,{}),(0,d.jsx)("section",{className:"py-16 bg-gray-50",children:(0,d.jsx)("div",{className:"container",children:(0,d.jsx)(n.default,{})})}),(0,d.jsx)(o.default,{})]})}},86008:(a,b,c)=>{"use strict";c.d(b,{default:()=>f});var d=c(21124),e=c(24515);function f(){return(0,d.jsx)("section",{className:"bg-white",children:(0,d.jsx)("div",{className:"container",children:(0,d.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,d.jsxs)("div",{className:"text-center mb-12 pt-20",children:[(0,d.jsx)("span",{className:"inline-block bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4",children:"Our Studio"}),(0,d.jsx)("h2",{className:"text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent",children:"Professional Studio Space"}),(0,d.jsx)("p",{className:"text-lg text-gray-600 max-w-2xl mx-auto",children:"Fully equipped with professional lighting, backdrop systems, and state-of-the-art gear"})]}),(0,d.jsx)("div",{className:"rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-20",children:(0,d.jsx)(e.default,{src:"/studio-setup.jpg",alt:"MEOCY Studio Setup with Professional Equipment",width:1200,height:600,className:"w-full h-auto object-cover",priority:!0})}),(0,d.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12 mb-20",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{className:"text-3xl font-bold mb-8 text-gray-900",children:"State-of-the-Art Equipment"}),(0,d.jsxs)("div",{className:"space-y-6",children:[(0,d.jsxs)("div",{className:"flex gap-4",children:[(0,d.jsx)("div",{className:"flex-shrink-0",children:(0,d.jsx)("div",{className:"flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white",children:(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{className:"text-lg font-semibold text-gray-900",children:"Professional Lighting"}),(0,d.jsx)("p",{className:"text-gray-600",children:"Multi-light setups with softboxes and reflectors for perfect illumination"})]})]}),(0,d.jsxs)("div",{className:"flex gap-4",children:[(0,d.jsx)("div",{className:"flex-shrink-0",children:(0,d.jsx)("div",{className:"flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white",children:(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{className:"text-lg font-semibold text-gray-900",children:"Backdrop Systems"}),(0,d.jsx)("p",{className:"text-gray-600",children:"Wide range of backdrops and backdrop stands for various shooting styles"})]})]}),(0,d.jsxs)("div",{className:"flex gap-4",children:[(0,d.jsx)("div",{className:"flex-shrink-0",children:(0,d.jsx)("div",{className:"flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white",children:(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm0 0c0 1.105 1.343 2 3 2s3-.895 3-2m0 0V6m0 0c0-1.105-1.343-2-3-2s-3 .895-3 2m3-2c-1.657 0-3 .895-3 2v.001M9 19c1.657 0 3-.895 3-2M21 19c1.105 0 2-1.343 2-3s-.895-3-2-3-3 1.343-3 3 .895 3 2 3z"})})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{className:"text-lg font-semibold text-gray-900",children:"Professional Gear"}),(0,d.jsx)("p",{className:"text-gray-600",children:"High-end cameras, lenses, and support equipment for superior image quality"})]})]}),(0,d.jsxs)("div",{className:"flex gap-4",children:[(0,d.jsx)("div",{className:"flex-shrink-0",children:(0,d.jsx)("div",{className:"flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white",children:(0,d.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{className:"text-lg font-semibold text-gray-900",children:"Comfortable Setting"}),(0,d.jsx)("p",{className:"text-gray-600",children:"Climate-controlled studio with waiting area and styling space"})]})]})]}),(0,d.jsx)("div",{className:"mt-10 pt-10 border-t border-gray-200",children:(0,d.jsx)("p",{className:"text-gray-700 italic",children:'"Our studio is designed to ensure every shoot is smooth, comfortable, and produces stunning results."'})})]}),(0,d.jsx)("div",{className:"flex flex-col justify-center",children:(0,d.jsxs)("div",{className:"bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8",children:[(0,d.jsx)("h3",{className:"text-2xl font-bold mb-6 text-gray-900",children:"Why Choose MEOCY Studio?"}),(0,d.jsxs)("ul",{className:"space-y-4",children:[(0,d.jsxs)("li",{className:"flex gap-3",children:[(0,d.jsx)("span",{className:"text-green-600 font-bold",children:"✓"}),(0,d.jsx)("span",{className:"text-gray-700",children:"Professional environment for perfect shoots"})]}),(0,d.jsxs)("li",{className:"flex gap-3",children:[(0,d.jsx)("span",{className:"text-green-600 font-bold",children:"✓"}),(0,d.jsx)("span",{className:"text-gray-700",children:"Natural and artificial lighting options"})]}),(0,d.jsxs)("li",{className:"flex gap-3",children:[(0,d.jsx)("span",{className:"text-green-600 font-bold",children:"✓"}),(0,d.jsx)("span",{className:"text-gray-700",children:"Multiple backdrop and setting options"})]}),(0,d.jsxs)("li",{className:"flex gap-3",children:[(0,d.jsx)("span",{className:"text-green-600 font-bold",children:"✓"}),(0,d.jsx)("span",{className:"text-gray-700",children:"Comfortable and welcoming space"})]})]})]})})]})]})})})}},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},89597:(a,b,c)=>{Promise.resolve().then(c.bind(c,16840)),Promise.resolve().then(c.bind(c,56332)),Promise.resolve().then(c.bind(c,68894)),Promise.resolve().then(c.bind(c,23331)),Promise.resolve().then(c.bind(c,34934)),Promise.resolve().then(c.bind(c,49357)),Promise.resolve().then(c.t.bind(c,65169,23))}};var b=require("../../webpack-runtime.js");b.C(a);var c=b.X(0,[331,792,529,496],()=>b(b.s=31933));module.exports=c})();