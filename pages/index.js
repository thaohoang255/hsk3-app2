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
  {h:"同意",p:"tóngyì",m:"đồng ý",c:"动词"},{h:"坚持",p:"jiānchí",m:"kiên trì",c:"Động từ"},
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

const shuffle = a => [...a].sort(() => Math.random() - 0.5);
const getWrong = (w, all) => shuffle(all.filter(x => x.h !== w.h)).slice(0, 3);
const CATS = ["Tất cả", ...Array.from(new Set(W.map(w => w.c)))];

const TONES = [
  {t:"1",mark:"ˉ",bg:"#dbeafe",fg:"#1d4ed8",label:"Thanh 1 — ngang cao"},
  {t:"2",mark:"ˊ",bg:"#dcfce7",fg:"#15803d",label:"Thanh 2 — lên"},
  {t:"3",mark:"ˇ",bg:"#fef9c3",fg:"#a16207",label:"Thanh 3 — xuống rồi lên"},
  {t:"4",mark:"ˋ",bg:"#fee2e2",fg:"#b91c1c",label:"Thanh 4 — xuống nhanh"},
  {t:"5",mark:"·",bg:"#f3f4f6",fg:"#6b7280",label:"Thanh nhẹ"},
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

export default function App() {
  const [tab, setTab] = useState("flashcard");
  const [weak, setWeak] = useState([]);
  const [streak, setStreak] = useState(0);
  const [cat, setCat] = useState("Tất cả");
  const words = cat === "Tất cả" ? W : W.filter(w => w.c === cat);
  const markWeak = (w, note="") => setWeak(p => p.find(x => x.h===w.h) ? p : [...p, {...w, note}]);
  const unmarkWeak = h => setWeak(p => p.filter(w => w.h !== h));

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#fff1f0,#fffbe6)",display:"flex",alignItems:"center",justifyContent:"center",padding:"12px"}}>
      <div style={{background:"white",borderRadius:"24px",boxShadow:"0 8px 32px rgba(0,0,0,0.12)",width:"100%",maxWidth:"420px",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(90deg,#ef4444,#b91c1c)",padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <div>
              <div style={{color:"white",fontWeight:"bold",fontSize:"15px"}}>🇨🇳 HSK3 — {W.length} từ</div>
              <div style={{color:"#fca5a5",fontSize:"11px"}}>{words.length} từ đang lọc</div>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              <span style={{background:"#fbbf24",color:"#7c2d12",padding:"2px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold"}}>🔥{streak}</span>
              <span style={{background:"#fca5a5",color:"white",padding:"2px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold"}}>⚑{weak.length}</span>
            </div>
          </div>
          <div style={{overflowX:"auto",paddingBottom:"4px"}}>
            <div style={{display:"flex",gap:"6px",width:"max-content"}}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{padding:"2px 10px",borderRadius:"999px",fontSize:"11px",fontWeight:"bold",border:"none",cursor:"pointer",whiteSpace:"nowrap",background:cat===c?"white":"rgba(185,28,28,0.5)",color:cat===c?"#dc2626":"#fee2e2"}}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
            {[["flashcard","📖 Học"],["quiz","🧩 Quiz"],["review","⚑ Ôn lại"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} style={{flex:1,padding:"4px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold",border:"none",cursor:"pointer",background:tab===k?"white":"rgba(185,28,28,0.5)",color:tab===k?"#dc2626":"#fee2e2"}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"16px"}}>
          {tab==="flashcard" && <Flashcard words={words} weak={weak} markWeak={markWeak} unmarkWeak={unmarkWeak} setStreak={setStreak} />}
          {tab==="quiz"      && <Quiz words={words} setStreak={setStreak} />}
          {tab==="review"    && <Review weak={weak} unmarkWeak={unmarkWeak} />}
        </div>
      </div>
    </div>
  );
}

// ── FLASHCARD ────────────────────────────────────────────────
function Flashcard({words, weak, markWeak, unmarkWeak, setStreak}) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [showP, setShowP] = useState(false);
  const [showM, setShowM] = useState(false);
  const [sent, setSent] = useState("");
  const [fb, setFb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [pron, setPron] = useState(null);

  useEffect(() => { setIdx(Math.floor(Math.random() * words.length)); }, [words]);
  const w = words[idx] || words[0];
  const isWeak = weak.find(x => x.h === w?.h);
  const tone = getTone(w?.p || "");

  const next = () => {
    let ni; do { ni = Math.floor(Math.random() * words.length); } while (ni === idx && words.length > 1);
    setIdx(ni); setStep(0); setShowP(false); setShowM(false); setSent(""); setFb(null); setPron(null); setSpeaking(false);
  };
  const doSpeak = () => { setSpeaking(true); speak(w.h); setTimeout(() => setSpeaking(false), 1800); };
  const check = async () => {
    if (!sent.trim()) return;
    setLoading(true);
    try {
      const raw = await callAI(`Giáo viên HSK3. Từ: "${w.h}" (${w.p} - ${w.m}). Câu HS: "${sent}". JSON: {"score":"good/bad","comment":"nhận xét TV","example":"câu mẫu TQ","ex_pinyin":"pinyin","ex_vi":"nghĩa TV"}`);
      const p = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setFb(p); setStep(3); setStreak(s => s+1);
      if (p.score === "bad") markWeak(w, p.comment);
    } catch { setFb({score:"bad",comment:"⚠️ Lỗi kết nối",example:"",ex_pinyin:"",ex_vi:""}); setStep(3); }
    setLoading(false);
  };

  if (!w) return null;
  const R = (obj) => obj;

  return (
    <div>
      {step === 0 && (
        <div>
          <div style={{textAlign:"center",marginBottom:"12px"}}>
            <span style={{background:"#f3f4f6",color:"#6b7280",fontSize:"11px",padding:"2px 8px",borderRadius:"999px"}}>{w.c}</span>
            <div style={{fontSize:"72px",fontWeight:"bold",color:"#dc2626",margin:"8px 0",lineHeight:1}}>{w.h}{isWeak && <span style={{fontSize:"20px"}}>⚑</span>}</div>
            <div>
              {showP ? <p style={{fontSize:"20px",color:"#6b7280",margin:"4px 0"}}>{w.p}</p>
                : <button onClick={() => setShowP(true)} style={{color:"#3b82f6",fontSize:"12px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>👁 Pinyin</button>}
              {showM ? <p style={{fontSize:"14px",color:"#15803d",fontWeight:"600",margin:"4px 0"}}>📖 {w.m}</p>
                : <button onClick={() => setShowM(true)} style={{color:"#3b82f6",fontSize:"12px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>👁 Nghĩa</button>}
            </div>
          </div>
          <div style={{background:"#f9fafb",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"12px",marginBottom:"12px"}}>
            <p style={{fontSize:"11px",fontWeight:"bold",color:"#9ca3af",marginBottom:"8px"}}>🔊 Luyện phát âm</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 10px",borderRadius:"999px",fontSize:"11px",fontWeight:"bold",marginBottom:"8px",background:tone.bg,color:tone.fg}}>
              <span style={{fontSize:"16px"}}>{tone.mark}</span>{tone.label}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
              <button onClick={doSpeak} disabled={speaking} style={{padding:"6px 14px",borderRadius:"999px",fontWeight:"bold",fontSize:"13px",border:"none",cursor:"pointer",background:speaking?"#fecaca":"#ef4444",color:"white"}}>{speaking?"🔊 Đang phát...":"🔊 Nghe"}</button>
              <button onClick={() => speak(w.p)} style={{fontSize:"11px",color:"#60a5fa",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>chậm</button>
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={() => setPron("good")} style={{flex:1,padding:"6px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:`2px solid ${pron==="good"?"#22c55e":"#86efac"}`,cursor:"pointer",background:pron==="good"?"#22c55e":"white",color:pron==="good"?"white":"#16a34a"}}>✅ Đúng!</button>
              <button onClick={() => { setPron("bad"); markWeak(w,"Phát âm chưa chuẩn"); }} style={{flex:1,padding:"6px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:`2px solid ${pron==="bad"?"#f97316":"#fdba74"}`,cursor:"pointer",background:pron==="bad"?"#f97316":"white",color:pron==="bad"?"white":"#ea580c"}}>😅 Chưa chuẩn</button>
            </div>
            {pron==="good" && <p style={{color:"#16a34a",fontSize:"11px",marginTop:"4px",textAlign:"center"}}>🎉 Tuyệt!</p>}
            {pron==="bad"  && <p style={{color:"#ea580c",fontSize:"11px",marginTop:"4px",textAlign:"center"}}>📌 Lưu vào ⚑ Ôn lại!</p>}
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={next} style={{flex:1,padding:"8px",borderRadius:"16px",fontSize:"13px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer"}}>⏭ Bỏ qua</button>
            <button onClick={() => setStep(2)} style={{flex:2,padding:"8px",borderRadius:"16px",fontSize:"13px",fontWeight:"bold",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>✍️ Đặt câu!</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div style={{textAlign:"center",marginBottom:"12px"}}>
            <div style={{fontSize:"56px",fontWeight:"bold",color:"#dc2626"}}>{w.h}</div>
            <p style={{color:"#9ca3af",fontSize:"11px"}}>{w.p} — {w.m}</p>
            <button onClick={doSpeak} style={{color:"#f87171",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>{speaking?"🔊 Đang phát...":"🔊 Nghe lại"}</button>
          </div>
          <textarea value={sent} onChange={e => setSent(e.target.value)} placeholder={`Đặt câu có "${w.h}"...`}
            style={{width:"100%",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"10px",fontSize:"15px",marginBottom:"10px",outline:"none",resize:"none",boxSizing:"border-box"}} rows={3}/>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={() => setStep(0)} style={{flex:1,padding:"8px",borderRadius:"16px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer",fontSize:"13px"}}>← Lại</button>
            <button onClick={check} disabled={loading||!sent.trim()} style={{flex:2,padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:loading||!sent.trim()?"#d1d5db":"#22c55e",color:"white",border:"none",cursor:"pointer"}}>{loading?"⏳...":"✅ Nộp!"}</button>
          </div>
        </div>
      )}
      {step === 3 && fb && (
        <div>
          <div style={{borderRadius:"16px",padding:"12px",marginBottom:"10px",border:`2px solid ${fb.score==="good"?"#86efac":"#fca5a5"}`,background:fb.score==="good"?"#f0fdf4":"#fff1f2"}}>
            <p style={{fontWeight:"bold",marginBottom:"4px"}}>{fb.score==="good"?"🎉 Xuất sắc!":"💪 Cần cải thiện!"}</p>
            <p style={{color:"#374151",fontSize:"13px",marginBottom:"8px"}}>{fb.comment}</p>
            {fb.example && (
              <div style={{background:"white",borderRadius:"12px",padding:"8px"}}>
                <p style={{fontSize:"11px",color:"#9ca3af",marginBottom:"4px"}}>📝 Câu mẫu:</p>
                <p style={{color:"#dc2626",fontWeight:"bold",fontSize:"15px"}}>{fb.example}</p>
                <button onClick={() => speak(fb.example)} style={{color:"#f87171",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>🔊 Nghe</button>
                <p style={{color:"#9ca3af",fontSize:"11px"}}>{fb.ex_pinyin}</p>
                <p style={{color:"#15803d",fontSize:"11px"}}>{fb.ex_vi}</p>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:"6px",marginBottom:"8px"}}>
            {!isWeak && <button onClick={() => markWeak(w)} style={{flex:1,padding:"4px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:"1px solid #fdba74",background:"#fff7ed",color:"#ea580c",cursor:"pointer"}}>⚑ Học lại</button>}
            {isWeak  && <button onClick={() => unmarkWeak(w.h)} style={{flex:1,padding:"4px",borderRadius:"12px",fontSize:"11px",background:"#f3f4f6",color:"#9ca3af",border:"none",cursor:"pointer"}}>✓ Bỏ đánh dấu</button>}
          </div>
          <button onClick={next} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>👉 Từ tiếp!</button>
        </div>
      )}
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────
const TOTAL = 10;

function buildQuiz(words) {
  if (words.length < 4) return [];
  const pool = shuffle(words);
  const result = [];
  for (let i = 0; i < TOTAL; i++) {
    const w = pool[i % pool.length];
    const r = Math.random();
    if (r < 0.4) {
      result.push({kind:"mcq", w, opts:shuffle([w,...getWrong(w,words)]), type:Math.random()>.5?"meaning":"pinyin"});
    } else if (r < 0.7) {
      result.push({kind:"typing", w});
    } else if (result.length === 0 || result[result.length-1].kind === "match") {
      result.push({kind:"mcq", w, opts:shuffle([w,...getWrong(w,words)]), type:"meaning"});
    } else {
      const mp = shuffle(words).slice(0, 4);
      result.push({kind:"match", pairs:mp, rights:shuffle(mp.map(x => x.m))});
    }
  }
  return result;
}

function Quiz({words, setStreak}) {
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState(null);
  const [typed, setTyped] = useState("");
  const [typedRes, setTypedRes] = useState(null);
  const [mSel, setMSel] = useState({l:null, r:null});
  const [mDone, setMDone] = useState([]);
  const [mWrong, setMWrong] = useState(null);

  useEffect(() => { if (words.length >= 4) { setQs(buildQuiz(words)); } }, [words]);

  const resetQ = () => { setSel(null); setTyped(""); setTypedRes(null); setMSel({l:null,r:null}); setMDone([]); setMWrong(null); };
  const next = () => {
    if (qi + 1 >= TOTAL) { setDone(true); setStreak(s => s+1); }
    else { setQi(i => i+1); resetQ(); }
  };
  const restart = () => { setQs(buildQuiz(words)); setQi(0); resetQ(); setScore(0); setDone(false); };

  if (!qs.length) return <p style={{textAlign:"center",color:"#9ca3af"}}>Cần ít nhất 4 từ.</p>;

  if (done) {
    const pct = Math.round(score/TOTAL*100);
    return (
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontSize:"52px",marginBottom:"8px"}}>{pct>=80?"🏆":pct>=50?"👍":"💪"}</div>
        <p style={{fontSize:"22px",fontWeight:"bold",marginBottom:"4px"}}>{score}/{TOTAL}</p>
        <div style={{background:"#f3f4f6",borderRadius:"999px",height:"10px",margin:"10px 0 6px"}}>
          <div style={{background:pct>=80?"#22c55e":pct>=50?"#f59e0b":"#ef4444",height:"10px",borderRadius:"999px",width:`${pct}%`}}/>
        </div>
        <p style={{color:"#6b7280",fontSize:"13px",marginBottom:"20px"}}>{pct>=80?"Xuất sắc!":pct>=50?"Khá tốt!":"Ôn thêm nhé!"}</p>
        <button onClick={restart} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>🔄 Làm lại</button>
      </div>
    );
  }

  const q = qs[qi];
  const labels = {mcq:"📝 Trắc nghiệm", typing:"⌨️ Gõ pinyin", match:"🔗 Ghép cặp"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9ca3af",marginBottom:"6px"}}>
        <span>Câu {qi+1}/{TOTAL} <span style={{background:"#fee2e2",color:"#dc2626",padding:"1px 6px",borderRadius:"999px",fontSize:"10px",fontWeight:"bold"}}>{labels[q.kind]}</span></span>
        <span style={{color:"#16a34a",fontWeight:"bold"}}>✅ {score}</span>
      </div>
      <div style={{width:"100%",background:"#f3f4f6",borderRadius:"999px",height:"6px",marginBottom:"14px"}}>
        <div style={{background:"#f87171",height:"6px",borderRadius:"999px",width:`${(qi/TOTAL)*100}%`}}/>
      </div>

      {q.kind === "mcq" && (
        <div>
          <div style={{background:"#fff1f0",border:"2px solid #fee2e2",borderRadius:"16px",padding:"16px",textAlign:"center",marginBottom:"12px"}}>
            <p style={{color:"#9ca3af",fontSize:"11px",marginBottom:"4px"}}>{q.type==="meaning"?"📖 Từ này nghĩa là gì?":"🔤 Pinyin là gì?"}</p>
            <p style={{fontSize:"58px",fontWeight:"bold",color:"#dc2626",margin:"4px 0",lineHeight:1}}>{q.w.h}</p>
            <p style={{color:"#9ca3af",fontSize:"11px"}}>{q.type==="meaning"?q.w.p:q.w.m}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
            {q.opts.map(opt => {
              const ok = opt.h===q.w.h, picked = sel===opt.h;
              let bg="white", border="2px solid #e5e7eb", color="#374151";
              if (sel) { if(ok){bg="#dcfce7";border="2px solid #4ade80";color="#15803d";}else if(picked){bg="#fee2e2";border="2px solid #f87171";color="#b91c1c";}else{bg="#f9fafb";border="2px solid #f3f4f6";color="#d1d5db";} }
              return (
                <button key={opt.h} onClick={() => { if(!sel){setSel(opt.h);if(ok)setScore(s=>s+1);} }}
                  style={{padding:"10px",borderRadius:"14px",fontSize:"11px",textAlign:"center",border,background:bg,color,cursor:"pointer",minHeight:"44px"}}>
                  {q.type==="meaning"?opt.m:opt.p}
                </button>
              );
            })}
          </div>
          {sel && <button onClick={next} style={{width:"100%",padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>{qi+1>=TOTAL?"🏁 Kết quả":"→ Tiếp"}</button>}
        </div>
      )}

      {q.kind === "typing" && (
        <div>
          <div style={{background:"#fff1f0",border:"2px solid #fee2e2",borderRadius:"16px",padding:"16px",textAlign:"center",marginBottom:"12px"}}>
            <p style={{color:"#9ca3af",fontSize:"11px",marginBottom:"4px"}}>⌨️ Gõ pinyin (không cần dấu thanh)</p>
            <p style={{fontSize:"58px",fontWeight:"bold",color:"#dc2626",margin:"4px 0",lineHeight:1}}>{q.w.h}</p>
            <p style={{color:"#9ca3af",fontSize:"11px"}}>{q.w.m}</p>
          </div>
          {typedRes && (
            <div style={{background:typedRes==="good"?"#dcfce7":"#fee2e2",border:`2px solid ${typedRes==="good"?"#4ade80":"#f87171"}`,borderRadius:"12px",padding:"8px",textAlign:"center",marginBottom:"8px",fontSize:"13px"}}>
              {typedRes==="good" ? <span>✅ Đúng rồi! 🎉 Pinyin: <strong>{q.w.p}</strong></span> : <span>❌ Đáp án: <strong>{q.w.p}</strong></span>}
            </div>
          )}
          {!typedRes ? (
            <div>
              <input value={typed} onChange={e => setTyped(e.target.value)}
                onKeyDown={e => { if(e.key==="Enter"&&typed.trim()){const ok=normPin(typed)===normPin(q.w.p);setTypedRes(ok?"good":"bad");if(ok)setScore(s=>s+1);} }}
                placeholder="Gõ pinyin rồi Enter..."
                style={{width:"100%",border:"2px solid #e5e7eb",borderRadius:"14px",padding:"10px",fontSize:"15px",outline:"none",boxSizing:"border-box",marginBottom:"8px"}} autoFocus/>
              <button onClick={() => { if(typed.trim()){const ok=normPin(typed)===normPin(q.w.p);setTypedRes(ok?"good":"bad");if(ok)setScore(s=>s+1);} }} disabled={!typed.trim()}
                style={{width:"100%",padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:typed.trim()?"#22c55e":"#d1d5db",color:"white",border:"none",cursor:"pointer"}}>✅ Kiểm tra</button>
            </div>
          ) : (
            <button onClick={next} style={{width:"100%",padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>{qi+1>=TOTAL?"🏁 Kết quả":"→ Tiếp"}</button>
          )}
        </div>
      )}

      {q.kind === "match" && (
        <MatchQ q={q} mDone={mDone} mSel={mSel} mWrong={mWrong}
          setMSel={setMSel} setMDone={setMDone} setMWrong={setMWrong}
          setScore={setScore} next={next} qi={qi} />
      )}
    </div>
  );
}

function MatchQ({q, mDone, mSel, mWrong, setMSel, setMDone, setMWrong, setScore, next, qi}) {
  const allDone = mDone.length === q.pairs.length;
  const pick = (side, val) => {
    setMWrong(null);
    const ns = side==="l" ? {l:mSel.l===val?null:val, r:mSel.r} : {l:mSel.l, r:mSel.r===val?null:val};
    setMSel(ns);
    if (ns.l && ns.r) {
      const lw = q.pairs.find(x => x.h===ns.l);
      if (lw && lw.m===ns.r) {
        const nd = [...mDone, lw];
        setMDone(nd);
        setMSel({l:null,r:null});
        if (nd.length===q.pairs.length) setScore(s=>s+1);
      } else {
        setMWrong(ns.l);
        setTimeout(() => { setMSel({l:null,r:null}); setMWrong(null); }, 1800);
      }
    }
  };
  return (
    <div>
      <div style={{background:"#fff1f0",border:"2px solid #fee2e2",borderRadius:"16px",padding:"10px",textAlign:"center",marginBottom:"10px"}}>
        <p style={{color:"#9ca3af",fontSize:"11px"}}>🔗 Ghép chữ Hán với nghĩa đúng • {mDone.length}/{q.pairs.length} cặp</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {q.pairs.map(pw => {
            const done = !!mDone.find(x=>x.h===pw.h);
            const selL = mSel.l===pw.h;
            const wrong = mWrong===pw.h;
            return (
              <button key={pw.h} onClick={() => { if(!done) pick("l",pw.h); }}
                style={{padding:"10px",borderRadius:"14px",fontSize:"18px",fontWeight:"bold",minHeight:"52px",cursor:done?"default":"pointer",border:`2px solid ${done?"#4ade80":wrong?"#f87171":selL?"#dc2626":"#e5e7eb"}`,background:done?"#dcfce7":selL?"#fff1f0":"white",color:done?"#15803d":"#dc2626"}}>
                {pw.h}
                {wrong && <div style={{fontSize:"10px",color:"#f87171",fontWeight:"normal",marginTop:"2px"}}>{pw.p}</div>}
                {done && <div style={{fontSize:"10px",color:"#15803d",fontWeight:"normal",marginTop:"2px"}}>{pw.p}</div>}
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {q.rights.map(meaning => {
            const done = !!mDone.find(x=>x.m===meaning);
            const selR = mSel.r===meaning;
            return (
              <button key={meaning} onClick={() => { if(!done) pick("r",meaning); }}
                style={{padding:"8px",borderRadius:"14px",fontSize:"10px",minHeight:"52px",textAlign:"center",lineHeight:"1.3",cursor:done?"default":"pointer",border:`2px solid ${done?"#4ade80":selR?"#dc2626":"#e5e7eb"}`,background:done?"#dcfce7":selR?"#fff1f0":"white",color:done?"#15803d":"#374151"}}>
                {meaning}
              </button>
            );
          })}
        </div>
      </div>
      {allDone && <button onClick={next} style={{width:"100%",padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>{qi+1>=TOTAL?"🏁 Kết quả":"→ Tiếp"}</button>}
    </div>
  );
}

// ── REVIEW ───────────────────────────────────────────────────
function Review({weak, unmarkWeak}) {
  const [mode, setMode] = useState("menu");
  const [type, setType] = useState("dialogue");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [userTrans, setUserTrans] = useState("");
  const [fb, setFb] = useState(null);
  const [checking, setChecking] = useState(false);

  const pool = weak.length>=3 ? weak : [...weak, ...W.filter(w=>!weak.find(x=>x.h===w.h)).slice(0,6-weak.length)];

  const generate = async () => {
    setLoading(true); setMode("generate"); setShowTrans(false); setShowPin(false); setUserTrans(""); setFb(null);
    const picked = shuffle(pool).slice(0, Math.min(6, pool.length));
    const wl = picked.map(w=>`${w.h}(${w.m})`).join(", ");
    try {
      const raw = await callAI(`Giáo viên HSK3. Viết ${type==="dialogue"?"đoạn hội thoại 4-6 lượt (A và B)":"đoạn văn 5-7 câu"} HSK3 dùng từ: ${wl}. JSON: {"chinese":"...","pinyin":"...","vietnamese":"...","words_used":["..."]}`);
      const p = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setContent(p); setMode("reading");
    } catch { setMode("menu"); }
    setLoading(false);
  };

  const checkTrans = async () => {
    if (!userTrans.trim()) return;
    setChecking(true);
    try {
      const raw = await callAI(`Giáo viên HSK3. Gốc: "${content.chinese}". Chuẩn: "${content.vietnamese}". HS: "${userTrans}". JSON: {"score":"good/ok/bad","comment":"nhận xét 2-3 câu TV"}`);
      setFb(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch { setFb({score:"bad",comment:"⚠️ Lỗi kết nối."}); }
    setChecking(false);
  };

  if (mode==="menu") return (
    <div>
      <div style={{background:"#fff7ed",border:"2px solid #fed7aa",borderRadius:"16px",padding:"12px",marginBottom:"12px"}}>
        <p style={{fontWeight:"bold",color:"#c2410c",fontSize:"13px",marginBottom:"4px"}}>📋 Từ cần ôn</p>
        {weak.length===0 ? <p style={{color:"#9ca3af",fontSize:"11px"}}>Chưa có — dùng từ ngẫu nhiên HSK3</p>
          : <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"4px"}}>
              {weak.map(w => (
                <span key={w.h} style={{background:"white",border:"1px solid #fdba74",color:"#dc2626",fontSize:"11px",padding:"1px 8px",borderRadius:"999px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"4px"}}>
                  {w.h}<button onClick={()=>unmarkWeak(w.h)} style={{color:"#d1d5db",background:"none",border:"none",cursor:"pointer",fontSize:"10px"}}>✕</button>
                </span>
              ))}
            </div>}
      </div>
      <p style={{fontSize:"13px",fontWeight:"bold",color:"#374151",marginBottom:"8px"}}>Chọn loại bài:</p>
      <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
        {[["dialogue","💬 Hội thoại"],["paragraph","📝 Đoạn văn"]].map(([k,l]) => (
          <button key={k} onClick={()=>setType(k)} style={{flex:1,padding:"10px",borderRadius:"16px",fontSize:"13px",fontWeight:"bold",border:`2px solid ${type===k?"#ef4444":"#e5e7eb"}`,background:type===k?"#ef4444":"white",color:type===k?"white":"#6b7280",cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <button onClick={generate} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",fontSize:"14px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>✨ Tạo bài luyện!</button>
    </div>
  );

  if (loading) return <div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:"36px"}}>✍️</div><p style={{color:"#6b7280",fontWeight:"bold",marginTop:"8px"}}>Đang tạo bài...</p></div>;

  if (mode==="reading" && content) return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"10px"}}>
        {(content.words_used||[]).map(w => <span key={w} style={{background:"#fee2e2",color:"#dc2626",fontSize:"11px",padding:"1px 8px",borderRadius:"999px",fontWeight:"bold"}}>⚑ {w}</span>)}
      </div>
      <div style={{background:"#f9fafb",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"12px",marginBottom:"10px"}}>
        <p style={{fontSize:"11px",color:"#9ca3af",fontWeight:"bold",marginBottom:"6px"}}>{type==="dialogue"?"💬 Hội thoại":"📝 Đoạn văn"}</p>
        <p style={{color:"#1f2937",lineHeight:"1.6",fontSize:"14px",whiteSpace:"pre-line"}}>{content.chinese}</p>
        <button onClick={()=>setShowPin(v=>!v)} style={{color:"#60a5fa",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:"6px"}}>{showPin?"🙈 Ẩn pinyin":"👁 Xem pinyin"}</button>
        {showPin && <p style={{color:"#9ca3af",fontSize:"11px",marginTop:"4px",lineHeight:"1.6",whiteSpace:"pre-line"}}>{content.pinyin}</p>}
      </div>
      {!showTrans && (
        <div style={{marginBottom:"10px"}}>
          <p style={{fontSize:"13px",fontWeight:"bold",color:"#374151",marginBottom:"6px"}}>✏️ Bạn dịch thử đi!</p>
          <textarea value={userTrans} onChange={e=>setUserTrans(e.target.value)} placeholder="Gõ bản dịch tiếng Việt..."
            style={{width:"100%",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"10px",fontSize:"13px",outline:"none",resize:"none",boxSizing:"border-box"}} rows={4}/>
          <div style={{display:"flex",gap:"8px",marginTop:"6px"}}>
            <button onClick={()=>setShowTrans(true)} style={{flex:1,padding:"6px",borderRadius:"12px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer",fontSize:"11px"}}>🔍 Xem đáp án</button>
            <button onClick={checkTrans} disabled={checking||!userTrans.trim()} style={{flex:1,padding:"6px",borderRadius:"12px",fontWeight:"bold",fontSize:"11px",background:checking||!userTrans.trim()?"#d1d5db":"#22c55e",color:"white",border:"none",cursor:"pointer"}}>{checking?"⏳...":"✅ Chấm bài!"}</button>
          </div>
        </div>
      )}
      {fb && !showTrans && (
        <div style={{borderRadius:"16px",padding:"10px",marginBottom:"10px",border:`2px solid ${fb.score==="good"?"#86efac":fb.score==="ok"?"#fde68a":"#fca5a5"}`,background:fb.score==="good"?"#f0fdf4":fb.score==="ok"?"#fffbeb":"#fff1f2",fontSize:"13px"}}>
          <p style={{fontWeight:"bold",marginBottom:"4px"}}>{fb.score==="good"?"🎉 Dịch rất tốt!":fb.score==="ok"?"👍 Khá tốt!":"💪 Cần cải thiện!"}</p>
          <p style={{color:"#374151",fontSize:"12px"}}>{fb.comment}</p>
          <button onClick={()=>setShowTrans(true)} style={{color:"#3b82f6",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:"4px"}}>Xem đáp án →</button>
        </div>
      )}
      {showTrans && (
        <div style={{background:"#f0fdf4",border:"2px solid #bbf7d0",borderRadius:"16px",padding:"10px",marginBottom:"10px"}}>
          <p style={{fontSize:"11px",fontWeight:"bold",color:"#15803d",marginBottom:"4px"}}>📖 Bản dịch chuẩn:</p>
          <p style={{color:"#374151",fontSize:"13px",lineHeight:"1.6",whiteSpace:"pre-line"}}>{content.vietnamese}</p>
        </div>
      )}
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={()=>{setMode("menu");setContent(null);}} style={{flex:1,padding:"8px",borderRadius:"16px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer",fontSize:"12px"}}>← Menu</button>
        <button onClick={generate} style={{flex:1,padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"12px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>🔄 Bài mới!</button>
      </div>
    </div>
  );
  return null;
}

async function callAI(prompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000
    })
  });
  const data = await res.json();
  return data.content[0].text;
}
