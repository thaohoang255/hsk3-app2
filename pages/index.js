import { useState, useEffect } from "react";

// --- DỮ LIỆU TỪ VỰNG  ---
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
  {h:"鼻子",p:"bízi",m:"mùi",c:"Cơ thể"},{h:"头发",p:"tóufa",m:"tóc",c:"Cơ thể"},
  {h:"腿",p:"tuǐ",m:"chân (đùi)",c:"Cơ thể"},{h:"脚",p:"jiǎo",m:"bàn chân",c:"Cơ thể"},
  {h:"牛奶",p:"niúnǎi",m:"sữa bò",c:"Đồ ăn"},{h:"面包",p:"miànbāo",m:"bánh mì",c:"Đồ ăn"},
  {h:"蛋糕",p:"dàngāo",m:"bánh kem",c:"Đồ ăn"},{h:"米饭",p:"mǐfàn",m:"cơm",c:"Đồ ăn"},
  {h:"面条",p:"miàntiáo",m:"mì sợi",c:"Đồ ăn"},{h:"鸡蛋",p:"jīdàn",m:"trứng gà",c:"Đồ ăn"},
  {h:"菜单",p:"càidān",m:"thực đơn",c:"Đồ ăn"},{h:"香蕉",p:"xiāngjiāo",m:"chuối",c:"Đồ ăn"},
  {h:"西瓜",p:"xīguā",m:"dưa hấu",c:"Đồ ăn"},{h:"啤酒",p:"píjiǔ",m:"bia",c:"Đồ ăn"},
  {h:"衬衫",p:"chènshān",m:"áo sơ mi",c:"Quần áo"},{h:"裤子",p:"kùzi",m:"quần",c:"Quần áo"},
  {h:"裙子",p:"qúnzi",m:"váy",c:"Quần áo"},{h:"帽子",p:"màozi",m:"mũ",c:"Quần áo"},
  {h:"眼鏡",p:"yǎnjìng",m:"kính mắt",c:"Quần áo"},
  {h:"作业",p:"zuòyè",m:"bài tập về nhà",c:"Học tập"},{h:"考试",p:"kǎoshì",m:"kỳ thi",c:"Học tập"},
  {h:"成绩",p:"chéngjì",m:"thành tích, điểm số",c:"Học tập"},{h:"水平",p:"shuǐpíng",m:"trình độ",c:"Học tập"},
  {h:"图书馆",p:"túshūguǎn",m:"thư viện",c:"Địa điểm"},{h:"办公室",p:"bàngōngshì",m:"văn phòng",c:"Địa điểm"},
  {h:"饭馆",p:"fànguǎn",m:"nhà hàng",c:"Địa điểm"},{h:"宾館",p:"bīngguǎn",m:"khách sạn",c:"Địa điểm"},
  {h:"超市",p:"chāoshì",m:"siêu thị",c:"Địa điểm"},{h:"火车站",p:"huǒchēzhàn",m:"ga tàu hỏa",c:"Địa điểm"},
  {h:"附近",p:"fùjìn",m:"gần đây",c:"Hướng"},{h:"前面",p:"qiánmiàn",m:"phía trước",c:"Hướng"},
  {h:"后面",p:"hòumiàn",m:"phía sau",c:"Hướng"},{h:"中间",p:"zhōngjiān",m:"ở giữa",c:"Hướng"},
  {h:"左边",p:"zuǒbiān",m:"bên trái",c:"Hướng"},{h:"右边",p:"yòubiān",m:"bên phải",c:"Hướng"},
  {h:"参加",p:"cānjiā",m:"tham gia",c:"Động từ"},{h:"帮助",p:"bāngzhù",m:"giúp đỡ",c:"Động từ"},
  {h:"出现",p:"chūxiàn",m:"xuất hiện",c:"Động từ"},{h:"打算",p:"dǎsuàn",m:"dự định",c:"Động từ"},
  {h:"担心",p:"dānxīn",m:"lo lắng",c:"Động từ"},{h:"发现",p:"fāxiàn",m:"phát hiện",c:"Động từ"},
  {h:"复习",p:"fùxí",m:"ôn tập",c:"Động từ"},{h:" Trang",p:"juédìng",m:"quyết định",c:"Động từ"},
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

const C = {
  parchment: "#f5f4ed", ivory: "#faf9f5", terra: "#c96442", terraLight:"#f5ece7",
  nearBlack: "#141413", charcoal: "#4d4c48", olive: "#5e5d59", stone: "#87867f",
  sand: "#e8e6dc", cream: "#f0eee6", warmSilver:"#b0aea5", success: "#3b6d11",
  successBg: "#eaf3de", error: "#993c1d", errorBg: "#faece7", warning: "#854f0b", warningBg: "#faeeda",
};

// --- SHARED LOGIC ---
const shuffle = a => [...a].sort(() => Math.random() - 0.5);
const getWrong = (w, all) => shuffle(all.filter(x => x.h !== w.h)).slice(0, 3);
const CATS = ["Tất cả", ...Array.from(new Set(W.map(w => w.c)))];
const TONES = [
  {t:"1",mark:"ˉ",bg:"#e6f1fb",fg:"#185fa5",label:"Thanh 1"},
  {t:"2",mark:"ˊ",bg:"#eaf3de",fg:"#3b6d11",label:"Thanh 2"},
  {t:"3",mark:"ˇ",bg:"#faeeda",fg:"#854f0b",label:"Thanh 3"},
  {t:"4",mark:"ˋ",bg:"#faece7",fg:"#993c1d",label:"Thanh 4"},
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
  window.speechSynthesis.speak(u);
};

const normPin = s => s.toLowerCase()
  .replace(/[āáǎà]/g,"a").replace(/[ēéěè]/g,"e").replace(/[īíǐì]/g,"i")
  .replace(/[ōóǒò]/g,"o").replace(/[ūúǔù]/g,"u").replace(/[ǖǘǚǜ]/g,"u")
  .replace(/[-\s]/g,"");

async function callAI(prompt) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    let text = data?.content?.[0]?.text || "";
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    let s = m[0];
    const open = (s.match(/\{/g) || []).length;
    const close = (s.match(/\}/g) || []).length;
    if (open > close) s += (s.endsWith('"') ? "" : '"') + "}".repeat(open - close);
    return JSON.parse(s);
  } catch (e) { return null; }
}

const weightedPick = (words, prog) => {
  const weights = words.map(w => {
    const s = prog[w.h] ? prog[w.h].score : -1;
    if (s === -1) return 10;
    if (s <= 2) return 8;
    if (s <= 5) return 3;
    return 0.5;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < words.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return 0;
};

const pill = (bg,fg)=>({background:bg,color:fg,borderRadius:999,padding:"2px 10px",fontSize:11,fontWeight:500,display:"inline-block"});
const btn = (bg,fg,border)=>({background:bg,color:fg,border:`1px solid ${border||bg}`,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"Georgia, serif"});

// --- MAIN APP ---
export default function App() {
  const [tab, setTab] = useState("flashcard");
  const [cat, setCat] = useState("Tất cả");
  const [prog, setProg] = useState({});
  const [weak, setWeak] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const p = localStorage.getItem("hsk3_prog_v4");
    if (p) setProg(JSON.parse(p));
    const w = localStorage.getItem("hsk3_weak_v4");
    if (w) setWeak(JSON.parse(w));
  }, []);

  const saveProg = (newP) => {
    setProg(newP);
    localStorage.setItem("hsk3_prog_v4", JSON.stringify(newP));
  };

  const recordAnswer = (hanzi, isCorrect) => {
    const cur = prog[hanzi] || { score: 0, seen: 0 };
    const newP = { ...prog, [hanzi]: { 
      score: isCorrect ? Math.min(cur.score + 1, 10) : Math.max(cur.score - 2, 0),
      seen: cur.seen + 1
    }};
    saveProg(newP);
  };

  const markWeak = (w, note = "") => {
    if (weak.find(x => x.h === w.h)) return;
    const newW = [...weak, { ...w, note }];
    setWeak(newW);
    localStorage.setItem("hsk3_weak_v4", JSON.stringify(newW));
  };

  const unmarkWeak = (h) => {
    const newW = weak.filter(x => x.h !== h);
    setWeak(newW);
    localStorage.setItem("hsk3_weak_v4", JSON.stringify(newW));
  };

  const words = cat === "Tất cả" ? W : W.filter(w => w.c === cat);
  const mastered = words.filter(w => (prog[w.h]?.score || 0) >= 6).length;
  const learning = words.filter(w => (prog[w.h]?.score || 0) > 0 && (prog[w.h]?.score || 0) < 6).length;
  const unseen = words.length - mastered - learning;

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, padding: "40px 16px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 620, fontFamily: "Georgia, serif" }}>
        
        {/* Progress Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <h1 style={{ fontSize: 28, margin: 0, color: C.nearBlack }}>漢語 HSK3</h1>
              <p style={{ fontSize: 13, color: C.stone, margin: "4px 0" }}>{W.length} từ vựng · {Math.round((mastered/W.length)*100)}% đã thuộc</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={pill(C.warningBg, C.warning)}>🔥 {streak}</span>
              <span style={pill(C.errorBg, C.error)}>⚑ {weak.length}</span>
            </div>
          </div>
          <div style={{ height: 4, background: C.sand, borderRadius: 999, overflow: "hidden", marginBottom: 4 }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ width: `${(mastered/words.length)*100}%`, background: C.terra, transition: "0.5s" }} />
              <div style={{ width: `${(learning/words.length)*100}%`, background: "#d97757", transition: "0.5s" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.stone, fontFamily: "Arial" }}>
            <span>{unseen} chưa học</span>
            <span>{learning} đang học</span>
            <span>{mastered} đã thuộc</span>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ overflowX: "auto", display: "flex", gap: 6, paddingBottom: 10, marginBottom: 15 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              ...pill(cat === c ? C.terra : C.sand, cat === c ? "#fff" : C.charcoal),
              border: "none", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Arial"
            }}>{c}</button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: C.sand, borderRadius: 10, padding: 3, marginBottom: 20 }}>
          {[["flashcard", "📖 Học"], ["quiz", "🧩 Quiz"], ["review", "⚑ Ôn tập"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: 8, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12,
              background: tab === k ? "#fff" : "transparent", color: tab === k ? C.nearBlack : C.olive,
              fontWeight: tab === k ? "bold" : "normal", fontFamily: "Arial"
            }}>{l}</button>
          ))}
        </div>

        {/* Content */}
        {tab === "flashcard" && <Flashcard words={words} prog={prog} recordAnswer={recordAnswer} markWeak={markWeak} setStreak={setStreak} />}
        {tab === "quiz" && <Quiz words={words} recordAnswer={recordAnswer} setStreak={setStreak} />}
        {tab === "review" && <Review weak={weak} unmarkWeak={unmarkWeak} />}
      </div>
    </div>
  );
}

// --- FLASHCARD ---
function Flashcard({ words, prog, recordAnswer, markWeak, setStreak }) {
  const [idx, setIdx] = useState(() => weightedPick(words, prog));
  const [step, setStep] = useState(0); 
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fb, setFb] = useState(null);
  const [showP, setShowP] = useState(false);
  const [showM, setShowM] = useState(false);

  const w = words[idx];
  const tone = getTone(w.p);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await callAI(`GV HSK3. Chấm câu dùng từ "${w.h}". Câu HS: "${input}". 
    JSON:{"score":"good/bad","ana":"nhận xét lỗi sai & độ tự nhiên","fix":"câu sửa lại tự nhiên nhất","pin":"pinyin câu sửa","vi":"nghĩa câu sửa","ex":"ví dụ khác dùng từ ${w.h}"}`);
    if (res) {
      setFb(res);
      setStep(2);
      recordAnswer(w.h, res.score === "good");
      setStreak(s => res.score === "good" ? s + 1 : 0);
      if (res.score === "bad") markWeak(w, res.ana);
    }
    setLoading(false);
  };

  const next = () => {
    setIdx(weightedPick(words, prog));
    setStep(0); setInput(""); setFb(null); setShowP(false); setShowM(false);
  };

  return (
    <div style={{ background: C.ivory, padding: 24, borderRadius: 12, border: `1px solid ${C.cream}` }}>
      {step === 0 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, color: C.terra, marginBottom: 10 }}>{w.h}</div>
          <div style={{ marginBottom: 20 }}>
            {showP ? <div style={{ fontSize: 22, color: C.olive, fontFamily: "Arial" }}>{w.p}</div> : <button onClick={()=>setShowP(true)} style={btn(C.sand, C.charcoal)}>xem pinyin</button>}
            <div style={{ marginTop: 8 }}>
              {showM ? <div style={{ fontSize: 16 }}>📖 {w.m}</div> : <button onClick={()=>setShowM(true)} style={btn(C.sand, C.charcoal)}>xem nghĩa</button>}
            </div>
          </div>
          <div style={{ background: C.parchment, padding: 12, borderRadius: 10, textAlign: "left", marginBottom: 20 }}>
             <p style={{ fontSize: 11, color: C.stone, margin: "0 0 8px", textTransform: "uppercase" }}>Luyện phát âm</p>
             <div style={{ ...pill(tone.bg, tone.fg), marginBottom: 10 }}>{tone.mark} {tone.label}</div>
             <button onClick={() => speak(w.h)} style={btn(C.terra, "#fff")}>Nghe phát âm</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={next} style={{ flex: 1, ...btn(C.sand, C.charcoal) }}>Bỏ qua</button>
            <button onClick={() => setStep(1)} style={{ flex: 2, ...btn(C.terra, "#fff") }}>Đặt câu</button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <div style={{ fontSize: 32, marginBottom: 15 }}>{w.h} <span style={{ fontSize: 16, color: C.stone }}>{w.p}</span></div>
          <textarea autoFocus value={input} onChange={e => setInput(e.target.value)} placeholder="Viết một câu..." style={{ width: "100%", height: 120, padding: 12, borderRadius: 8, border: `1px solid ${C.sand}`, fontSize: 16, outline: "none", boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 15 }}>
            <button onClick={() => setStep(0)} style={btn(C.sand, C.charcoal)}>Quay lại</button>
            <button onClick={handleCheck} disabled={loading} style={{ flex: 1, ...btn(C.nearBlack, "#fff") }}>{loading ? "Đang phân tích..." : "Gửi GV chấm"}</button>
          </div>
        </div>
      )}
      {step === 2 && fb && (
        <div>
          <div style={{ padding: 15, borderRadius: 10, background: fb.score === "good" ? C.successBg : C.errorBg, borderLeft: `5px solid ${fb.score === "good" ? C.success : C.error}`, marginBottom: 20 }}>
            <b style={{ color: fb.score === "good" ? C.success : C.error }}>{fb.score === "good" ? "✓ Chính xác" : "× Cần sửa lại"}</b>
            <p style={{ fontSize: 14, margin: "5px 0 0" }}>{fb.ana}</p>
          </div>
          <div style={{ background: "#f9f9f9", padding: 15, borderRadius: 10, marginBottom: 15 }}>
            <p style={{ fontSize: 11, color: C.stone, fontWeight: "bold", margin: "0 0 5px" }}>GIÁO VIÊN SỬA LẠI:</p>
            <p style={{ fontSize: 22, color: C.terra, margin: "5px 0" }}>{fb.fix}</p>
            <p style={{ fontSize: 13, color: C.stone, margin: 0 }}>{fb.pin}</p>
            <p style={{ fontSize: 15, marginTop: 4 }}>{fb.vi}</p>
          </div>
          <button onClick={next} style={{ width: "100%", ...btn(C.terra, "#fff"), padding: 15 }}>Học từ tiếp theo</button>
        </div>
      )}
    </div>
  );
}

// --- QUIZ ---
function Quiz({ words, recordAnswer, setStreak }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [opts, setOpts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const w = words[qIdx % words.length];

  useEffect(() => {
    if (w) setOpts(shuffle([w, ...getWrong(w, W)]));
  }, [qIdx, w]);

  const handleAns = (ans) => {
    if (selected) return;
    setSelected(ans.h);
    const isOk = ans.h === w.h;
    if (isOk) setScore(s => s + 1);
    recordAnswer(w.h, isOk);
    setTimeout(() => {
      if (qIdx < 9) { setQIdx(i => i + 1); setSelected(null); }
      else { setDone(true); setStreak(s => s + 1); }
    }, 1000);
  };

  if (done) return (
    <div style={{ background: "#fff", padding: 40, borderRadius: 12, textAlign: "center" }}>
      <h2 style={{ color: C.terra }}>Kết quả: {score}/10</h2>
      <button onClick={() => window.location.reload()} style={btn(C.terra, "#fff")}>Làm lại</button>
    </div>
  );

  return (
    <div style={{ background: "#fff", padding: 25, borderRadius: 12 }}>
      <p style={{ fontSize: 12, color: C.stone }}>Câu {qIdx + 1}/10</p>
      <div style={{ fontSize: 60, textAlign: "center", margin: "20px 0" }}>{w.h}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {opts.map(o => (
          <button key={o.h} onClick={() => handleAns(o)} style={{
            padding: 15, borderRadius: 10, border: `1px solid ${C.sand}`, cursor: "pointer",
            background: selected === o.h ? (o.h === w.h ? C.successBg : C.errorBg) : "#fff",
            color: selected === o.h ? (o.h === w.h ? C.success : C.error) : C.charcoal
          }}>{o.m}</button>
        ))}
      </div>
    </div>
  );
}

// --- REVIEW ---
function Review({ weak, unmarkWeak }) {
  const [mode, setMode] = useState("list");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateLesson = async () => {
    setLoading(true);
    const picked = shuffle(weak).slice(0, 3).map(x => x.h).join(", ");
    const res = await callAI(`Viết một đoạn hội thoại HSK3 ngắn dùng các từ: ${picked}. JSON: {"chinese":"...","pinyin":"...","vi":"..."}`);
    if (res) { setContent(res); setMode("reading"); }
    setLoading(false);
  };

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Đang soạn bài...</div>;

  if (mode === "reading" && content) return (
    <div style={{ background: "#fff", padding: 25, borderRadius: 12 }}>
      <p style={{ color: C.nearBlack, lineHeight: 1.8, fontSize: 18 }}>{content.chinese}</p>
      <p style={{ color: C.stone, fontSize: 14, marginTop: 10 }}>{content.pinyin}</p>
      <div style={{ background: C.successBg, padding: 12, borderRadius: 8, marginTop: 15 }}>{content.vi}</div>
      <button onClick={() => setMode("list")} style={{ marginTop: 20, ...btn(C.sand, C.charcoal) }}>Quay lại</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
        <h3 style={{ margin: 0 }}>Từ cần ôn ({weak.length})</h3>
        {weak.length >= 2 && <button onClick={generateLesson} style={btn(C.terra, "#fff")}>AI Soạn bài đọc</button>}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {weak.map(w => (
          <div key={w.h} style={{ background: "#fff", padding: 15, borderRadius: 10, display: "flex", justifyContent: "space-between" }}>
            <div>
              <b style={{ fontSize: 20 }}>{w.h}</b>
              <div style={{ fontSize: 12, color: C.stone }}>{w.p} - {w.m}</div>
              {w.note && <div style={{ fontSize: 11, color: C.error, marginTop: 4 }}>Note: {w.note}</div>}
            </div>
            <button onClick={() => unmarkWeak(w.h)} style={btn(C.sand, C.stone)}>✕</button>
          </div>
        ))}
        {weak.length === 0 && <p style={{ textAlign: "center", color: C.stone }}>Bạn chưa có từ yếu nào!</p>}
      </div>
    </div>
  );
}
