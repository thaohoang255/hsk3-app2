import { useState, useEffect } from "react";

const W = [
  {h:"万",p:"wàn",m:"mười nghìn",c:"Số đếm"},{h:"半",p:"bàn",m:"một nửa",c:"Số đếm"},
  {h:"自己",p:"zìjǐ",m:"bản thân mình",c:"Đại từ"},{h:"大家",p:"dàjiā",m:"mọi người",c:"Đại từ"},
  {h:"其他",p:"qítā",m:"khác, những cái khác",c:"Đại từ"},{h:"别人",p:"biéren",m:"người khác",c:"Đại từ"},
  {h:"刚才",p:"gāngcái",m:"vừa mới, lúc nãy",c:"Thời gian"},{h:"周末",p:"zhōumò",m:"cuối tuần",c:"Thời gian"},
  {h:"以前",p:"yǐqián",m:"trước đây",c:"Thời gian"},{h:"以后",p:"yǐhòu",m:"sau này",c:"Thời gian"},
  {h:"最近",p:"zuìjìn",m:"gần đây",c:"Thời gian"},{h:"去年",p:"qùnián",m:"năm ngoái",c:"Thời gian"},
  {h:"季节",p:"jìjié",m:"mùa, thời tiết",c:"Thời gian"},{h:"节日",p:"jiérì",m:"ngày lễ, ngày hội",c:"Thời gian"},
  {h:"丈夫",p:"zhàngfu",m:"chồng",c:"Con người"},{h:"妻子",p:"qīzi",m:"vợ",c:"Con người"},
  {h:"爷爷",p:"yéye",m:"ông nội",c:"Con người"},{h:"奶奶",p:"nǎinai",m:"bà nội",c:"Con người"},
  {h:"叔叔",p:"shūshu",m:"chú (em trai bố)",c:"Con người"},{h:"阿姨",p:"āyí",m:"cô, dì",c:"Con người"},
  {h:"邻居",p:"línjū",m:"hàng xóm",c:"Con người"},{h:"同事",p:"tóngshì",m:"đồng nghiệp",c:"Con người"},
  {h:"校长",p:"xiàozhǎng",m:"hiệu trưởng",c:"Con người"},{h:"司机",p:"sījī",m:"tài xế",c:"Con người"},
  {h:"服务员",p:"fúwùyuán",m:"nhân viên phục vụ",c:"Con người"},{h:"经理",p:"jīnglǐ",m:"giám đốc",c:"Con người"},
  {h:"身体",p:"shēntǐ",m:"cơ thể, sức khỏe",c:"Cơ thể"},{h:"脸",p:"liǎn",m:"mặt, khuôn mặt",c:"Cơ thể"},
  {h:"眼睛",p:"yǎnjīng",m:"mắt",c:"Cơ thể"},{h:"耳朵",p:"ěrduo",m:"tai",c:"Cơ thể"},
  {h:"鼻子",p:"bízi",m:"mũi",c:"Cơ thể"},{h:"头发",p:"tóufa",m:"tóc",c:"Cơ thể"},
  {h:"腿",p:"tuǐ",m:"chân (đùi)",c:"Cơ thể"},{h:"脚",p:"jiǎo",m:"bàn chân",c:"Cơ thể"},
  {h:"牛奶",p:"niúnǎi",m:"sữa bò",c:"Đồ ăn"},{h:"面包",p:"miànbāo",m:"bánh mì",c:"Đồ ăn"},
  {h:"蛋糕",p:"dàngāo",m:"bánh kem",c:"Đồ ăn"},{h:"米饭",p:"mǐfàn",m:"cơm",c:"Đồ ăn"},
  {h:"面条",p:"miàntiáo",m:"mì sợi",c:"Đồ ăn"},{h:"鸡蛋",p:"jīdàn",m:"trứng gà",c:"Đồ ăn"},
  {h:"菜单",p:"càidān",m:"thực đơn",c:"Đồ ăn"},{h:"香蕉",p:"xiāngjiāo",m:"chuối",c:"Đồ ăn"},
  {h:"西瓜",p:"xīguā",m:"dưa hấu",c:"Đồ ăn"},{h:"啤酒",p:"píjiǔ",m:"bia",c:"Đồ ăn"},
  {h:"衬衫",p:"chènshān",m:"áo sơ mi",c:"Quần áo"},{h:"裤子",p:"kùzi",m:"quần",c:"Quần áo"},
  {h:"裙子",p:"qúnzi",m:"váy",c:"Quần áo"},{h:"帽子",p:"màozi",m:"mũ",c:"Quần áo"},
  {h:"眼镜",p:"yǎnjìng",m:"kính mắt",c:"Quần áo"},
  {h:"作业",p:"zuòyè",m:"bài tập về nhà",c:"Học tập"},{h:"考试",p:"kǎoshì",m:"kỳ thi",c:"Học tập"},
  {h:"成绩",p:"chéngjì",m:"thành tích, điểm số",c:"Học tập"},{h:"水平",p:"shuǐpíng",m:"trình độ",c:"Học tập"},
  {h:"图书馆",p:"túshūguǎn",m:"thư viện",c:"Địa điểm"},{h:"办公室",p:"bàngōngshì",m:"văn phòng",c:"Địa điểm"},
  {h:"饭馆",p:"fànguǎn",m:"nhà hàng",c:"Địa điểm"},{h:"宾馆",p:"bīngguǎn",m:"khách sạn",c:"Địa điểm"},
  {h:"超市",p:"chāoshì",m:"siêu thị",c:"Địa điểm"},{h:"火车站",p:"huǒchēzhàn",m:"ga tàu hỏa",c:"Địa điểm"},
  {h:"附近",p:"fùjìn",m:"gần đây",c:"Hướng"},{h:"前面",p:"qiánmiàn",m:"phía trước",c:"Hướng"},
  {h:"后面",p:"hòumiàn",m:"phía sau",c:"Hướng"},{h:"中间",p:"zhōngjiān",m:"ở giữa",c:"Hướng"},
  {h:"左边",p:"zuǒbiān",m:"bên trái",c:"Hướng"},{h:"右边",p:"yòubiān",m:"bên phải",c:"Hướng"},
  {h:"参加",p:"cānjiā",m:"tham gia",c:"Động từ"},{h:"帮助",p:"bāngzhù",m:"giúp đỡ",c:"Động từ"},
  {h:"出现",p:"chūxiàn",m:"xuất hiện",c:"Động từ"},{h:"打算",p:"dǎsuàn",m:"dự định",c:"Động từ"},
  {h:"担心",p:"dānxīn",m:"lo lắng",c:"Động từ"},{h:"发现",p:"fāxiàn",m:"phát hiện",c:"Động từ"},
  {h:"复习",p:"fùxí",m:"ôn tập",c:"Động từ"},{h:"决定",p:"juédìng",m:"quyết định",c:"Động từ"},
  {h:"解决",p:"jiějué",m:"giải quyết",c:"Động từ"},{h:"介绍",p:"jièshào",m:"giới thiệu",c:"Động từ"},
  {h:"了解",p:"liǎojiě",m:"hiểu rõ",c:"Động từ"},{h:"离开",p:"líkāi",m:"rời đi",c:"Động từ"},
  {h:"满意",p:"mǎnyì",m:"hài lòng",c:"Động từ"},{h:"努力",p:"nǔlì",m:"cố gắng",c:"Động từ"},
  {h:"完成",p:"wánchéng",m:"hoàn thành",c:"Động từ"},{h:"相信",p:"xiāngxìn",m:"tin tưởng",c:"Động từ"},
  {h:"选择",p:"xuǎnzé",m:"lựa chọn",c:"Động từ"},{h:"注意",p:"zhùyì",m:"chú ý",c:"Động từ"},
  {h:"准备",p:"zhǔnbèi",m:"chuẩn bị",c:"Động từ"},{h:"迟到",p:"chídào",m:"đến muộn",c:"Động từ"},
  {h:"成功",p:"chénggōng",m:"thành công",c:"Động từ"},{h:"提高",p:"tígāo",m:"nâng cao",c:"Động từ"},
  {h:"同意",p:"tóngyì",m:"đồng ý",c:"Động từ"},{h:"坚持",p:"jiānchí",m:"kiên trì",c:"Động từ"},
  {h:"联系",p:"liánxì",m:"liên lạc",c:"Động từ"},{h:"讨论",p:"tǎolùn",m:"thảo luận",c:"Động từ"},
  {h:"支持",p:"zhīchí",m:"ủng hộ",c:"Động từ"},{h:"游泳",p:"yóuyǒng",m:"bơi lội",c:"Động từ"},
  {h:"聪明",p:"cōngming",m:"thông minh",c:"Tính từ"},{h:"方便",p:"fāngbiàn",m:"thuận tiện",c:"Tính từ"},
  {h:"健康",p:"jiànkāng",m:"khỏe mạnh",c:"Tính từ"},{h:"干净",p:"gānjìng",m:"sạch sẽ",c:"Tính từ"},
  {h:"高兴",p:"gāoxìng",m:"vui mừng",c:"Tính từ"},{h:"简单",p:"jiǎndān",m:"đơn giản",c:"Tính từ"},
  {h:"困难",p:"kùnnán",m:"khó khăn",c:"Tính từ"},{h:"认真",p:"rènzhēn",m:"chăm chỉ",c:"Tính từ"},
  {h:"特别",p:"tèbié",m:"đặc biệt",c:"Tính từ"},{h:"重要",p:"zhòngyào",m:"quan trọng",c:"Tính từ"},
  {h:"紧张",p:"jǐnzhāng",m:"căng thẳng",c:"Tính từ"},{h:"流利",p:"liúlì",m:"trôi chảy",c:"Tính từ"},
  {h:"不但",p:"bùdàn",m:"không những",c:"Liên từ"},{h:"虽然",p:"suīrán",m:"mặc dù",c:"Liên từ"},
  {h:"因为",p:"yīnwèi",m:"vì, bởi vì",c:"Liên từ"},{h:"所以",p:"suǒyǐ",m:"vì vậy",c:"Liên từ"},
  {h:"如果",p:"rúguǒ",m:"nếu như",c:"Liên từ"},{h:"而且",p:"érqiě",m:"hơn nữa",c:"Liên từ"},
  {h:"终于",p:"zhōngyú",m:"cuối cùng",c:"Phó từ"},{h:"已经",p:"yǐjīng",m:"đã, rồi",c:"Phó từ"},
  {h:"一直",p:"yīzhí",m:"liên tục, mãi mãi",c:"Phó từ"},{h:"其实",p:"qíshí",m:"thực ra",c:"Phó từ"},
  {h:"当然",p:"dāngrán",m:"tất nhiên",c:"Phó từ"},{h:"经常",p:"jīngcháng",m:"thường xuyên",c:"Phó từ"},
  {h:"必须",p:"bìxū",m:"bắt buộc phải",c:"Phó từ"},
  {h:"把",p:"bǎ",m:"giới từ chỉ đối tượng",c:"Giới từ"},{h:"被",p:"bèi",m:"bị, được (bị động)",c:"Giới từ"},
  {h:"比",p:"bǐ",m:"so với, hơn",c:"Giới từ"},{h:"离",p:"lí",m:"cách (khoảng cách)",c:"Giới từ"},
  {h:"关于",p:"guānyú",m:"về, liên quan đến",c:"Giới từ"},{h:"为了",p:"wèile",m:"vì (mục đích)",c:"Giới từ"},
];

// ── COLORS (Anthropic-inspired) ──────────────────────────────
const C = {
  parchment: "#f5f4ed",
  ivory:     "#faf9f5",
  terra:     "#c96442",
  terraLight:"#f5ece7",
  nearBlack: "#141413",
  charcoal:  "#4d4c48",
  olive:     "#5e5d59",
  stone:     "#87867f",
  sand:      "#e8e6dc",
  cream:     "#f0eee6",
  warmSilver:"#b0aea5",
  darkSurf:  "#30302e",
  success:   "#3b6d11",
  successBg: "#eaf3de",
  error:     "#993c1d",
  errorBg:   "#faece7",
  warning:   "#854f0b",
  warningBg: "#faeeda",
};

// ── UTILS ────────────────────────────────────────────────────
const shuffle = a => [...a].sort(() => Math.random() - 0.5);
const getWrong = (w, all) => shuffle(all.filter(x => x.h !== w.h)).slice(0, 3);
const CATS = ["Tất cả", ...Array.from(new Set(W.map(w => w.c)))];
const TONES = [
  {t:"1",mark:"ˉ",bg:"#e6f1fb",fg:"#185fa5",label:"Thanh 1 — ngang cao"},
  {t:"2",mark:"ˊ",bg:"#eaf3de",fg:"#3b6d11",label:"Thanh 2 — lên"},
  {t:"3",mark:"ˇ",bg:"#faeeda",fg:"#854f0b",label:"Thanh 3 — xuống rồi lên"},
  {t:"4",mark:"ˋ",bg:"#faece7",fg:"#993c1d",label:"Thanh 4 — xuống nhanh"},
  {t:"5",mark:"·",bg:C.sand,fg:C.olive,label:"Thanh nhẹ"},
];
const getTone = p => {
  if (/[āēīōūǖ]/.test(p)) return TONES[0];
  if (/[áéíóúǘ]/.test(p)) return TONES[1];
  if (/[ǎěǐǒǔǚ]/.test(p)) return TONES[2];
  if (/[àèìòùǜ]/.test(p)) return TONES[3];
  return TONES[4];
};
const speak = text => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = 0.85;
  const zh = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("zh"));
  if (zh) u.voice = zh;
  window.speechSynthesis.speak(u);
};
const normPin = s => s.toLowerCase()
  .replace(/[āáǎà]/g,"a").replace(/[ēéěè]/g,"e").replace(/[īíǐì]/g,"i")
  .replace(/[ōóǒò]/g,"o").replace(/[ūúǔù]/g,"u").replace(/[ǖǘǚǜ]/g,"u")
  .replace(/[-\s]/g,"");

// ── SPACED REPETITION ────────────────────────────────────────
const loadProg = async () => {
  try { const r = await window.storage.get("hsk3_prog"); return r ? JSON.parse(r.value) : {}; }
  catch { return {}; }
};
const saveProg = async p => { try { await window.storage.set("hsk3_prog", JSON.stringify(p)); } catch {} };
const updateProg = (prog, hanzi, correct) => {
  const cur = prog[hanzi] || {score:0,seen:0,correct:0};
  return {...prog,[hanzi]:{score:correct?Math.min(cur.score+1,10):Math.max(cur.score-1,0),seen:cur.seen+1,correct:cur.correct+(correct?1:0)}};
};
const weightedPick = (words, prog) => {
  const weights = words.map(w => { const s = prog[w.h]?prog[w.h].score:-1; return s<0?10:s<=2?8:s<=5?4:1; });
  const total = weights.reduce((a,b)=>a+b,0);
  let r = Math.random()*total;
  for (let i=0;i<words.length;i++){r-=weights[i];if(r<=0)return i;}
  return words.length-1;
};
const getStats = (words,prog) => ({
  mastered:words.filter(w=>(prog[w.h]?prog[w.h].score:-1)>=6).length,
  learning:words.filter(w=>{const s=prog[w.h]?prog[w.h].score:-1;return s>=0&&s<6;}).length,
  unseen:words.filter(w=>!prog[w.h]).length,
});
const getProgLabel = (prog,h) => {
  if (!prog[h]) return {label:"chưa học",bg:C.sand,fg:C.olive};
  const s=prog[h].score;
  if (s>=6) return {label:"đã thuộc",bg:C.successBg,fg:C.success};
  if (s>=3) return {label:"đang học",bg:C.warningBg,fg:C.warning};
  return {label:"cần ôn",bg:C.errorBg,fg:C.error};
};

async function callAI(prompt, maxTokens=500) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens
    })
  });
  const data = await res.json();
  const text = data?.content?.[0]?.text || "";
  const m = text.match(/\{[\s\S]*\}/);
  return m ? m[0] : text;
}

// ── SHARED STYLES ────────────────────────────────────────────
const card = {background:C.ivory,border:`1px solid ${C.cream}`,borderRadius:12,padding:"16px"};
const btn = (bg,fg,border)=>({background:bg,color:fg,border:`1px solid ${border||bg}`,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"Georgia, serif"});
const pill = (bg,fg)=>({background:bg,color:fg,borderRadius:999,padding:"2px 10px",fontSize:11,fontWeight:500,display:"inline-block"});

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("flashcard");
  const [weak,setWeak]=useState([]);
  const [streak,setStreak]=useState(0);
  const [cat,setCat]=useState("Tất cả");
  const [prog,setProg]=useState({});
  useEffect(()=>{loadProg().then(p=>setProg(p));},[]);
  const words=cat==="Tất cả"?W:W.filter(w=>w.c===cat);
  const markWeak=(w,note="")=>setWeak(p=>p.find(x=>x.h===w.h)?p:[...p,{...w,note}]);
  const unmarkWeak=h=>setWeak(p=>p.filter(w=>w.h!==h));
  const recordAnswer=(hanzi,correct)=>{const np=updateProg(prog,hanzi,correct);setProg(np);saveProg(np);};
  const stats=getStats(words,prog);
  const pct=words.length?Math.round((stats.mastered/words.length)*100):0;

  return (
    <div style={{minHeight:"100vh",background:C.parchment,fontFamily:"Georgia, serif",padding:"40px 16px",display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:620}}>

        {/* Header */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <h1 style={{fontSize:28,fontWeight:500,color:C.nearBlack,margin:0,letterSpacing:"-0.3px"}}>
                漢語水平考試 HSK3
              </h1>
              <p style={{fontSize:13,color:C.stone,margin:"4px 0 0",fontFamily:"Arial, sans-serif"}}>
                {W.length} từ vựng · {pct}% đã thuộc
              </p>
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{...pill(C.warningBg,C.warning),fontFamily:"Arial, sans-serif"}}>🔥 {streak}</span>
              <span style={{...pill(C.errorBg,C.error),fontFamily:"Arial, sans-serif"}}>⚑ {weak.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{marginBottom:10}}>
            <div style={{height:4,background:C.sand,borderRadius:999,overflow:"hidden"}}>
              <div style={{display:"flex",height:"100%"}}>
                <div style={{width:`${(stats.mastered/words.length)*100}%`,background:C.terra,transition:"width 0.5s"}}/>
                <div style={{width:`${(stats.learning/words.length)*100}%`,background:"#d97757",transition:"width 0.5s"}}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontFamily:"Arial, sans-serif",fontSize:11,color:C.stone}}>
              <span>{stats.unseen} chưa học</span>
              <span>{stats.learning} đang học</span>
              <span>{stats.mastered} đã thuộc</span>
            </div>
          </div>

          {/* Category filter */}
          <div style={{overflowX:"auto",paddingBottom:4}}>
            <div style={{display:"flex",gap:6,width:"max-content"}}>
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{...pill(cat===c?C.terra:C.sand,cat===c?C.ivory:C.charcoal),border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"Arial, sans-serif",fontSize:11,fontWeight:500,padding:"3px 10px"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
          <div style={{background:C.sand,borderRadius:10,padding:3,marginBottom:16,display:"flex",gap:3}}>
            {[["flashcard","📖 Học"],["quiz","🧩 Quiz"],["review","⚑ Ôn lại"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"7px 4px",borderRadius:8,fontSize:12,fontWeight:500,border:"none",cursor:"pointer",fontFamily:"Arial, sans-serif",background:tab===k?C.ivory:C.sand,color:tab===k?C.nearBlack:C.olive,transition:"all 0.15s"}}>
                {l}
              </button>
            ))}
          </div>

        {/* Content */}
                  <div style={{padding:"24px 24px"}}>
          {tab==="flashcard"&&<Flashcard words={words} weak={weak} markWeak={markWeak} unmarkWeak={unmarkWeak} setStreak={setStreak} prog={prog} recordAnswer={recordAnswer}/>}
          {tab==="quiz"&&<Quiz words={words} setStreak={setStreak} prog={prog} recordAnswer={recordAnswer}/>}
          {tab==="review"&&<Review weak={weak} unmarkWeak={unmarkWeak}/>}
        </div>
      </div>
    </div>
  );
}

// ── FLASHCARD ────────────────────────────────────────────────
function Flashcard({words,weak,markWeak,unmarkWeak,setStreak,prog,recordAnswer}) {
  const [idx,setIdx]=useState(()=>weightedPick(words,prog));
  const [step,setStep]=useState(0);
  const [showP,setShowP]=useState(false);
  const [showM,setShowM]=useState(false);
  const [sent,setSent]=useState("");
  const [fb,setFb]=useState(null);
  const [loading,setLoading]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [pron,setPron]=useState(null);
  useEffect(()=>{setIdx(weightedPick(words,prog));},[words]);
  const w=words[idx]||words[0];
  const isWeak=weak.find(x=>x.h===w.h);
  const tone=getTone(w.p||"");
  const pl=getProgLabel(prog,w.h);
  const next=()=>{setIdx(weightedPick(words,prog));setStep(0);setShowP(false);setShowM(false);setSent("");setFb(null);setPron(null);setSpeaking(false);};
  const doSpeak=()=>{setSpeaking(true);speak(w.h);setTimeout(()=>setSpeaking(false),1800);};
  const check=async()=>{
    if(!sent.trim())return;
    setLoading(true);
    try{
      const raw=await callAI(`Giáo viên HSK3. Từ: "${w.h}"(${w.p}=${w.m}). Câu HS: "${sent}". Trả JSON: {"score":"good/bad","correct_usage":"ngữ pháp đúng/sai ngắn gọn","meaning_ok":"tự nhiên không","comment":"1 câu TV","example":"câu mẫu TQ","ex_pinyin":"pinyin","ex_vi":"nghĩa TV"}`);
      const p=JSON.parse(raw);
      setFb(p);setStep(3);setStreak(s=>s+1);
      recordAnswer(w.h,p.score==="good");
      if(p.score==="bad")markWeak(w,p.comment);
    }catch{setFb({score:"bad",comment:"⚠️ Lỗi kết nối",example:"",ex_pinyin:"",ex_vi:""});setStep(3);}
    setLoading(false);
  };
  if(!w)return null;

  return (
    <div>
      {step===0&&(
        <div style={{...card,textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{...pill(C.sand,C.olive),fontFamily:"Arial, sans-serif"}}>{w.c}</span>
            <span style={{...pill(pl.bg,pl.fg),fontFamily:"Arial, sans-serif"}}>{pl.label}</span>
            {prog[w.h]&&<span style={{...pill(C.sand,C.stone),fontFamily:"Arial, sans-serif"}}>{prog[w.h].correct}/{prog[w.h].seen} đúng</span>}
          </div>
          <div style={{fontSize:80,fontWeight:500,color:C.terra,lineHeight:1,marginBottom:16}}>{w.h}</div>
          <div style={{marginBottom:16}}>
            {showP?<p style={{fontSize:22,color:C.olive,margin:"0 0 6px",fontFamily:"Arial, sans-serif"}}>{w.p}</p>
              :<button onClick={()=>setShowP(true)} style={{...btn(C.sand,C.charcoal,C.cream),marginBottom:6,fontFamily:"Arial, sans-serif"}}>xem pinyin</button>}
            {showM?<p style={{fontSize:15,color:C.charcoal,margin:0,fontFamily:"Arial, sans-serif"}}>📖 {w.m}</p>
              :<button onClick={()=>setShowM(true)} style={{...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>xem nghĩa</button>}
          </div>

          {/* Phát âm */}
          <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:12,marginBottom:14,textAlign:"left"}}>
            <p style={{fontSize:11,color:C.stone,margin:"0 0 8px",fontFamily:"Arial, sans-serif",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.5px"}}>Luyện phát âm</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"3px 10px",borderRadius:999,fontSize:12,marginBottom:10,background:tone.bg,color:tone.fg,fontFamily:"Arial, sans-serif"}}>
              <span style={{fontSize:16,fontWeight:500}}>{tone.mark}</span>{tone.label}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <button onClick={doSpeak} disabled={speaking} style={{...btn(speaking?C.cream:C.terra,speaking?C.stone:C.ivory),fontFamily:"Arial, sans-serif"}}>
                {speaking?"đang phát...":"nghe phát âm"}
              </button>
              <button onClick={()=>speak(w.p)} style={{...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>chậm hơn</button>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setPron("good");recordAnswer(w.h,true);}} style={{flex:1,...btn(pron==="good"?C.successBg:C.ivory,pron==="good"?C.success:C.charcoal,pron==="good"?C.success:C.cream),fontFamily:"Arial, sans-serif"}}>
                {pron==="good"?"✓ Đúng rồi!":"Đọc đúng"}
              </button>
              <button onClick={()=>{setPron("bad");markWeak(w,"Phát âm chưa chuẩn");recordAnswer(w.h,false);}} style={{flex:1,...btn(pron==="bad"?C.errorBg:C.ivory,pron==="bad"?C.error:C.charcoal,pron==="bad"?C.error:C.cream),fontFamily:"Arial, sans-serif"}}>
                {pron==="bad"?"✓ Đã lưu":"Chưa chuẩn"}
              </button>
            </div>
          </div>

          <div style={{display:"flex",gap:8}}>
            <button onClick={next} style={{flex:1,...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>bỏ qua</button>
            <button onClick={()=>setStep(2)} style={{flex:2,...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>đặt câu</button>
          </div>
        </div>
      )}

      {step===2&&(
        <div style={card}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:60,fontWeight:500,color:C.terra}}>{w.h}</div>
            <p style={{color:C.stone,fontSize:13,margin:"4px 0",fontFamily:"Arial, sans-serif"}}>{w.p} · {w.m}</p>
            <button onClick={doSpeak} style={{...btn(C.sand,C.charcoal,C.cream),fontSize:12,fontFamily:"Arial, sans-serif"}}>{speaking?"đang phát...":"nghe lại"}</button>
          </div>
          <textarea value={sent} onChange={e=>setSent(e.target.value)} placeholder={`Đặt câu có "${w.h}"...`}
            style={{width:"100%",border:`1px solid ${C.sand}`,borderRadius:8,padding:"10px 12px",fontSize:15,marginBottom:12,outline:"none",resize:"none",boxSizing:"border-box",background:C.ivory,color:C.nearBlack,fontFamily:"Georgia, serif"}} rows={3}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setStep(0)} style={{flex:1,...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>← lại</button>
            <button onClick={check} disabled={loading||!sent.trim()} style={{flex:2,...btn(loading||!sent.trim()?C.sand:C.terra,loading||!sent.trim()?C.stone:C.ivory),fontFamily:"Arial, sans-serif"}}>
              {loading?"đang chấm...":"nộp bài"}
            </button>
          </div>
        </div>
      )}

      {step===3&&fb&&(
        <div style={card}>
          <div style={{background:fb.score==="good"?C.successBg:C.errorBg,border:`1px solid ${fb.score==="good"?C.success:C.error}`,borderRadius:10,padding:12,marginBottom:12}}>
            <p style={{fontWeight:500,color:fb.score==="good"?C.success:C.error,marginBottom:4,fontFamily:"Arial, sans-serif",fontSize:14}}>
              {fb.score==="good"?"Xuất sắc!":"Cần cải thiện"}
            </p>
            <p style={{color:C.charcoal,fontSize:13,marginBottom:fb.example?10:0,fontFamily:"Arial, sans-serif"}}>{fb.comment}</p>
            {fb.example&&(
              <div style={{background:C.ivory,borderRadius:8,padding:10}}>
                {fb.correct_usage&&<p style={{fontSize:12,color:C.charcoal,margin:"0 0 4px",fontFamily:"Arial, sans-serif"}}>📐 <strong>Ngữ pháp:</strong> {fb.correct_usage}</p>}
                {fb.meaning_ok&&<p style={{fontSize:12,color:C.charcoal,margin:"0 0 8px",fontFamily:"Arial, sans-serif"}}>💬 <strong>Tự nhiên:</strong> {fb.meaning_ok}</p>}
                <p style={{fontSize:11,color:C.stone,margin:"0 0 4px",fontFamily:"Arial, sans-serif",fontWeight:500}}>Câu mẫu</p>
                <p style={{color:C.terra,fontWeight:500,fontSize:17,margin:"0 0 2px"}}>{fb.example}</p>
                <button onClick={()=>speak(fb.example)} style={{...btn(C.sand,C.charcoal,C.cream),fontSize:11,padding:"3px 10px",marginBottom:4,fontFamily:"Arial, sans-serif"}}>nghe</button>
                <p style={{color:C.stone,fontSize:12,margin:"0 0 2px",fontFamily:"Arial, sans-serif"}}>{fb.ex_pinyin}</p>
                <p style={{color:C.charcoal,fontSize:12,margin:0,fontFamily:"Arial, sans-serif"}}>{fb.ex_vi}</p>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {!isWeak&&<button onClick={()=>markWeak(w)} style={{flex:1,...btn(C.warningBg,C.warning,C.warning),fontSize:12,fontFamily:"Arial, sans-serif"}}>đánh dấu ôn lại</button>}
            {isWeak&&<button onClick={()=>unmarkWeak(w.h)} style={{flex:1,...btn(C.sand,C.stone,C.cream),fontSize:12,fontFamily:"Arial, sans-serif"}}>bỏ đánh dấu</button>}
          </div>
          <button onClick={next} style={{width:"100%",...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>từ tiếp theo</button>
        </div>
      )}
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────
const TOTAL=10;
function buildQuiz(words){
  if(words.length<4)return[];
  const pool=shuffle(words),result=[];
  for(let i=0;i<TOTAL;i++){
    const w=pool[i%pool.length],r=Math.random();
    if(r<0.4) result.push({kind:"mcq",w,opts:shuffle([w,...getWrong(w,words)]),type:Math.random()>.5?"meaning":"pinyin"});
    else if(r<0.7) result.push({kind:"typing",w});
    else if(result.length===0||result[result.length-1].kind==="match") result.push({kind:"mcq",w,opts:shuffle([w,...getWrong(w,words)]),type:"meaning"});
    else{const mp=shuffle(words).slice(0,4);result.push({kind:"match",pairs:mp,rights:shuffle(mp.map(x=>x.m))});}
  }
  return result;
}

function Quiz({words,setStreak,prog,recordAnswer}){
  const [qs,setQs]=useState([]);
  const [qi,setQi]=useState(0);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [sel,setSel]=useState(null);
  const [typed,setTyped]=useState("");
  const [typedRes,setTypedRes]=useState(null);
  const [mSel,setMSel]=useState({l:null,r:null});
  const [mDone,setMDone]=useState([]);
  const [mWrong,setMWrong]=useState(null);
  useEffect(()=>{if(words.length>=4)setQs(buildQuiz(words));},[words]);
  const resetQ=()=>{setSel(null);setTyped("");setTypedRes(null);setMSel({l:null,r:null});setMDone([]);setMWrong(null);};
  const next=()=>{if(qi+1>=TOTAL){setDone(true);setStreak(s=>s+1);}else{setQi(i=>i+1);resetQ();}};
  const restart=()=>{setQs(buildQuiz(words));setQi(0);resetQ();setScore(0);setDone(false);};
  const handleMCQ=opt=>{if(sel)return;const ok=opt.h===qs[qi].w.h;setSel(opt.h);if(ok)setScore(s=>s+1);recordAnswer(qs[qi].w.h,ok);};
  const handleTyping=()=>{if(!typed.trim())return;const ok=normPin(typed)===normPin(qs[qi].w.p);setTypedRes(ok?"good":"bad");if(ok)setScore(s=>s+1);recordAnswer(qs[qi].w.h,ok);};
  if(!qs.length)return<p style={{color:C.stone,fontFamily:"Arial, sans-serif",textAlign:"center"}}>Cần ít nhất 4 từ.</p>;

  if(done){
    const pct=Math.round(score/TOTAL*100);
    return(
      <div style={{...card,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>{pct>=80?"🏆":pct>=50?"👍":"💪"}</div>
        <p style={{fontSize:28,fontWeight:500,color:C.nearBlack,margin:"0 0 4px"}}>{score}/{TOTAL}</p>
        <div style={{background:C.sand,borderRadius:999,height:6,margin:"12px 0 8px"}}>
          <div style={{background:pct>=80?C.terra:"#d97757",height:6,borderRadius:999,width:`${pct}%`,transition:"width 0.5s"}}/>
        </div>
        <p style={{color:C.stone,fontSize:13,marginBottom:20,fontFamily:"Arial, sans-serif"}}>{pct>=80?"Xuất sắc!":pct>=50?"Khá tốt!":"Ôn thêm nhé!"}</p>
        <button onClick={restart} style={{width:"100%",...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>làm lại</button>
      </div>
    );
  }

  const q=qs[qi];
  const labels={mcq:"trắc nghiệm",typing:"gõ pinyin",match:"ghép cặp"};
  return(
    <div style={card}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontFamily:"Arial, sans-serif",fontSize:13,color:C.stone}}>
          câu {qi+1}/{TOTAL} <span style={{...pill(C.sand,C.charcoal),marginLeft:4}}>{labels[q.kind]}</span>
        </span>
        <span style={{fontFamily:"Arial, sans-serif",fontSize:13,color:C.terra,fontWeight:500}}>{score} đúng</span>
      </div>
      <div style={{background:C.sand,borderRadius:999,height:3,marginBottom:16}}>
        <div style={{background:C.terra,height:3,borderRadius:999,width:`${(qi/TOTAL)*100}%`}}/>
      </div>

      {q.kind==="mcq"&&(
        <div>
          <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:16,textAlign:"center",marginBottom:12}}>
            <p style={{color:C.stone,fontSize:12,marginBottom:4,fontFamily:"Arial, sans-serif"}}>{q.type==="meaning"?"nghĩa của từ này là gì?":"pinyin của từ này là gì?"}</p>
            <p style={{fontSize:56,fontWeight:500,color:C.terra,margin:"4px 0",lineHeight:1}}>{q.w.h}</p>
            <p style={{color:C.stone,fontSize:13,margin:0,fontFamily:"Arial, sans-serif"}}>{q.type==="meaning"?q.w.p:q.w.m}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {q.opts.map(opt=>{
              const ok=opt.h===q.w.h,picked=sel===opt.h;
              let bg=C.ivory,border=C.cream,color=C.charcoal;
              if(sel){if(ok){bg=C.successBg;border=C.success;color=C.success;}else if(picked){bg=C.errorBg;border=C.error;color=C.error;}else{bg=C.parchment;border=C.cream;color=C.stone;}}
              return<button key={opt.h} onClick={()=>handleMCQ(opt)} style={{padding:10,borderRadius:10,fontSize:12,textAlign:"center",border:`1px solid ${border}`,background:bg,color,cursor:"pointer",minHeight:44,fontFamily:"Arial, sans-serif",transition:"all 0.1s"}}>{q.type==="meaning"?opt.m:opt.p}</button>;
            })}
          </div>
          {sel&&<button onClick={next} style={{width:"100%",...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>{qi+1>=TOTAL?"xem kết quả":"tiếp theo"}</button>}
        </div>
      )}

      {q.kind==="typing"&&(
        <div>
          <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:16,textAlign:"center",marginBottom:12}}>
            <p style={{color:C.stone,fontSize:12,marginBottom:4,fontFamily:"Arial, sans-serif"}}>gõ pinyin (không cần dấu thanh)</p>
            <p style={{fontSize:56,fontWeight:500,color:C.terra,margin:"4px 0",lineHeight:1}}>{q.w.h}</p>
            <p style={{color:C.stone,fontSize:13,margin:0,fontFamily:"Arial, sans-serif"}}>{q.w.m}</p>
          </div>
          {typedRes&&(
            <div style={{background:typedRes==="good"?C.successBg:C.errorBg,border:`1px solid ${typedRes==="good"?C.success:C.error}`,borderRadius:8,padding:"8px 12px",textAlign:"center",marginBottom:8,fontSize:13,fontFamily:"Arial, sans-serif",color:typedRes==="good"?C.success:C.error}}>
              {typedRes==="good"?`Đúng! Pinyin: ${q.w.p}`:`Chưa đúng. Đáp án: ${q.w.p}`}
            </div>
          )}
          {!typedRes?(
            <div>
              <input value={typed} onChange={e=>setTyped(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")handleTyping();}}
                placeholder="gõ pinyin rồi Enter..."
                style={{width:"100%",border:`1px solid ${C.sand}`,borderRadius:8,padding:"10px 12px",fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:8,background:C.ivory,color:C.nearBlack,fontFamily:"Georgia, serif"}} autoFocus/>
              <button onClick={handleTyping} disabled={!typed.trim()} style={{width:"100%",...btn(typed.trim()?C.terra:C.sand,typed.trim()?C.ivory:C.stone),fontFamily:"Arial, sans-serif"}}>kiểm tra</button>
            </div>
          ):(
            <button onClick={next} style={{width:"100%",...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>{qi+1>=TOTAL?"xem kết quả":"tiếp theo"}</button>
          )}
        </div>
      )}

      {q.kind==="match"&&<MatchQ q={q} mDone={mDone} mSel={mSel} mWrong={mWrong} setMSel={setMSel} setMDone={setMDone} setMWrong={setMWrong} setScore={setScore} recordAnswer={recordAnswer} next={next} qi={qi}/>}
    </div>
  );
}

function MatchQ({q,mDone,mSel,mWrong,setMSel,setMDone,setMWrong,setScore,recordAnswer,next,qi}){
  const allDone=mDone.length===q.pairs.length;
  const pick=(side,val)=>{
    setMWrong(null);
    const ns=side==="l"?{l:mSel.l===val?null:val,r:mSel.r}:{l:mSel.l,r:mSel.r===val?null:val};
    setMSel(ns);
    if(ns.l&&ns.r){
      const lw=q.pairs.find(x=>x.h===ns.l);
      if(lw&&lw.m===ns.r){const nd=[...mDone,lw];setMDone(nd);setMSel({l:null,r:null});if(nd.length===q.pairs.length){setScore(s=>s+1);nd.forEach(w=>recordAnswer(w.h,true));}}
      else{setMWrong(ns.l);recordAnswer(ns.l,false);setTimeout(()=>{setMSel({l:null,r:null});setMWrong(null);},1800);}
    }
  };
  return(
    <div>
      <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:"8px 12px",textAlign:"center",marginBottom:10}}>
        <p style={{color:C.stone,fontSize:12,margin:0,fontFamily:"Arial, sans-serif"}}>ghép chữ Hán với nghĩa đúng · {mDone.length}/{q.pairs.length} cặp</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {q.pairs.map(pw=>{
            const done=!!mDone.find(x=>x.h===pw.h),selL=mSel.l===pw.h,wrong=mWrong===pw.h;
            return<button key={pw.h} onClick={()=>{if(!done)pick("l",pw.h);}} style={{padding:10,borderRadius:10,fontSize:20,fontWeight:500,minHeight:52,cursor:done?"default":"pointer",border:`1px solid ${done?C.success:wrong?C.error:selL?C.terra:C.cream}`,background:done?C.successBg:selL?C.terraLight:C.ivory,color:done?C.success:C.terra,textAlign:"center"}}>
              {pw.h}
              {wrong&&<div style={{fontSize:10,color:C.error,fontWeight:400,marginTop:2,fontFamily:"Arial, sans-serif"}}>{pw.p}</div>}
              {done&&<div style={{fontSize:10,color:C.success,fontWeight:400,marginTop:2,fontFamily:"Arial, sans-serif"}}>{pw.p}</div>}
            </button>;
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {q.rights.map(meaning=>{
            const done=!!mDone.find(x=>x.m===meaning),selR=mSel.r===meaning;
            return<button key={meaning} onClick={()=>{if(!done)pick("r",meaning);}} style={{padding:8,borderRadius:10,fontSize:11,minHeight:52,textAlign:"center",lineHeight:"1.4",cursor:done?"default":"pointer",border:`1px solid ${done?C.success:selR?C.terra:C.cream}`,background:done?C.successBg:selR?C.terraLight:C.ivory,color:done?C.success:C.charcoal,fontFamily:"Arial, sans-serif"}}>
              {meaning}
            </button>;
          })}
        </div>
      </div>
      {allDone&&<button onClick={next} style={{width:"100%",...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>{qi+1>=TOTAL?"xem kết quả":"tiếp theo"}</button>}
    </div>
  );
}

// ── REVIEW ───────────────────────────────────────────────────
function Review({weak,unmarkWeak}){
  const [mode,setMode]=useState("menu");
  const [type,setType]=useState("dialogue");
  const [content,setContent]=useState(null);
  const [loading,setLoading]=useState(false);
  const [showTrans,setShowTrans]=useState(false);
  const [showPin,setShowPin]=useState(false);
  const [userTrans,setUserTrans]=useState("");
  const [fb,setFb]=useState(null);
  const [checking,setChecking]=useState(false);
  const pool=weak.length>=3?weak:[...weak,...W.filter(w=>!weak.find(x=>x.h===w.h)).slice(0,6-weak.length)];
  const generate=async()=>{
    setLoading(true);setMode("generate");setShowTrans(false);setShowPin(false);setUserTrans("");setFb(null);
    const picked=shuffle(pool).slice(0,Math.min(type==="dialogue"?3:4,pool.length));
    const wl=picked.map(w=>`${w.h}(${w.m})`).join(", ");
    try{
      const raw=await callAI(`HSK3. Viết ${type==="dialogue"?"hội thoại ngắn 4 lượt A/B":"đoạn văn 4 câu"} dùng: ${wl}. Chỉ JSON: {"chinese":"...","pinyin":"...","vietnamese":"...","words_used":["..."]}`, 1500);
      const p=JSON.parse(raw.replace(/```json|```/g,"").trim());
      setContent(p);setMode("reading");
    }catch(e){console.log("Review error:",e);setMode("menu");}
    setLoading(false);
  };
  const checkTrans=async()=>{
    if(!userTrans.trim())return;setChecking(true);
    try{
      const raw=await callAI(`HSK3. Gốc:"${content.chinese}". Chuẩn:"${content.vietnamese}". HS:"${userTrans}". JSON:{"score":"good/ok/bad","comment":"1-2 câu TV"}`);
      setFb(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{setFb({score:"bad",comment:"⚠️ Lỗi kết nối."});}
    setChecking(false);
  };

  if(mode==="menu")return(
    <div style={card}>
      <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:12,marginBottom:14}}>
        <p style={{fontWeight:500,color:C.charcoal,fontSize:13,marginBottom:6,fontFamily:"Arial, sans-serif"}}>Từ cần ôn</p>
        {weak.length===0?<p style={{color:C.stone,fontSize:12,margin:0,fontFamily:"Arial, sans-serif"}}>Chưa có — dùng từ ngẫu nhiên HSK3</p>
          :<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {weak.map(w=>(
              <span key={w.h} style={{...pill(C.errorBg,C.error),display:"inline-flex",alignItems:"center",gap:4,border:`1px solid ${C.error}`}}>
                {w.h}<button onClick={()=>unmarkWeak(w.h)} style={{color:C.warmSilver,background:"none",border:"none",cursor:"pointer",fontSize:10,padding:0,lineHeight:1}}>✕</button>
              </span>
            ))}
          </div>}
      </div>
      <p style={{fontSize:13,color:C.charcoal,marginBottom:8,fontFamily:"Arial, sans-serif",fontWeight:500}}>Chọn loại bài</p>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["dialogue","hội thoại"],["paragraph","đoạn văn"]].map(([k,l])=>(
          <button key={k} onClick={()=>setType(k)} style={{flex:1,padding:10,borderRadius:8,fontSize:13,fontWeight:500,border:`1px solid ${type===k?C.terra:C.cream}`,background:type===k?C.terraLight:C.ivory,color:type===k?C.terra:C.charcoal,cursor:"pointer",fontFamily:"Arial, sans-serif"}}>{l}</button>
        ))}
      </div>
      <button onClick={generate} style={{width:"100%",...btn(C.terra,C.ivory),padding:"10px 14px",fontFamily:"Arial, sans-serif"}}>tạo bài luyện</button>
    </div>
  );

  if(loading)return<div style={{...card,textAlign:"center",padding:40}}><p style={{color:C.stone,fontFamily:"Arial, sans-serif"}}>Đang tạo bài...</p></div>;

  if(mode==="reading"&&content)return(
    <div style={card}>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
        {(content.words_used||[]).map(w=><span key={w} style={{...pill(C.terraLight,C.terra),border:`1px solid ${C.terra}`}}>{w}</span>)}
      </div>
      <div style={{background:C.parchment,border:`1px solid ${C.cream}`,borderRadius:10,padding:14,marginBottom:12}}>
        <p style={{fontSize:11,color:C.stone,fontWeight:500,marginBottom:8,fontFamily:"Arial, sans-serif",textTransform:"uppercase",letterSpacing:"0.5px"}}>{type==="dialogue"?"hội thoại":"đoạn văn"}</p>
        <p style={{color:C.nearBlack,lineHeight:1.7,fontSize:15,whiteSpace:"pre-line",margin:0}}>{content.chinese}</p>
        <button onClick={()=>setShowPin(v=>!v)} style={{...btn(C.sand,C.charcoal,C.cream),fontSize:11,marginTop:8,fontFamily:"Arial, sans-serif"}}>{showPin?"ẩn pinyin":"xem pinyin"}</button>
        {showPin&&<p style={{color:C.stone,fontSize:12,marginTop:6,lineHeight:1.7,whiteSpace:"pre-line",fontFamily:"Arial, sans-serif"}}>{content.pinyin}</p>}
      </div>
      {!showTrans&&(
        <div style={{marginBottom:12}}>
          <p style={{fontSize:13,fontWeight:500,color:C.charcoal,marginBottom:8,fontFamily:"Arial, sans-serif"}}>Dịch thử đi</p>
          <textarea value={userTrans} onChange={e=>setUserTrans(e.target.value)} placeholder="Gõ bản dịch tiếng Việt..."
            style={{width:"100%",border:`1px solid ${C.sand}`,borderRadius:8,padding:"10px 12px",fontSize:13,outline:"none",resize:"none",boxSizing:"border-box",background:C.ivory,color:C.nearBlack,fontFamily:"Georgia, serif"}} rows={4}/>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <button onClick={()=>setShowTrans(true)} style={{flex:1,...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>xem đáp án</button>
            <button onClick={checkTrans} disabled={checking||!userTrans.trim()} style={{flex:1,...btn(checking||!userTrans.trim()?C.sand:C.terra,checking||!userTrans.trim()?C.stone:C.ivory),fontFamily:"Arial, sans-serif"}}>{checking?"đang chấm...":"chấm bài"}</button>
          </div>
        </div>
      )}
      {fb&&!showTrans&&(
        <div style={{background:fb.score==="good"?C.successBg:fb.score==="ok"?C.warningBg:C.errorBg,border:`1px solid ${fb.score==="good"?C.success:fb.score==="ok"?C.warning:C.error}`,borderRadius:10,padding:12,marginBottom:12}}>
          <p style={{fontWeight:500,color:fb.score==="good"?C.success:fb.score==="ok"?C.warning:C.error,marginBottom:4,fontFamily:"Arial, sans-serif",fontSize:14}}>{fb.score==="good"?"Dịch rất tốt!":fb.score==="ok"?"Khá tốt!":"Cần cải thiện"}</p>
          <p style={{color:C.charcoal,fontSize:13,marginBottom:6,fontFamily:"Arial, sans-serif"}}>{fb.comment}</p>
          <button onClick={()=>setShowTrans(true)} style={{...btn(C.sand,C.charcoal,C.cream),fontSize:12,fontFamily:"Arial, sans-serif"}}>xem đáp án chuẩn</button>
        </div>
      )}
      {showTrans&&(
        <div style={{background:C.successBg,border:`1px solid ${C.success}`,borderRadius:10,padding:12,marginBottom:12}}>
          <p style={{fontSize:11,fontWeight:500,color:C.success,marginBottom:6,fontFamily:"Arial, sans-serif",textTransform:"uppercase",letterSpacing:"0.5px"}}>Bản dịch chuẩn</p>
          <p style={{color:C.charcoal,fontSize:13,lineHeight:1.7,whiteSpace:"pre-line",margin:0,fontFamily:"Arial, sans-serif"}}>{content.vietnamese}</p>
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setMode("menu");setContent(null);}} style={{flex:1,...btn(C.sand,C.charcoal,C.cream),fontFamily:"Arial, sans-serif"}}>← menu</button>
        <button onClick={generate} style={{flex:1,...btn(C.terra,C.ivory),fontFamily:"Arial, sans-serif"}}>bài mới</button>
      </div>
    </div>
  );
  return null;
}
