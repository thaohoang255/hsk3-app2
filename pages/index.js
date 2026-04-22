import { useState, useEffect } from "react";

// --- DANH SÁCH TỪ VỰNG ---
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
const C = {
  parchment: "#f5f4ed", ivory: "#faf9f5", terra: "#c96442", terraLight:"#f5ece7",
  nearBlack: "#141413", charcoal: "#4d4c48", olive: "#5e5d59", stone: "#87867f",
  sand: "#e8e6dc", cream: "#f0eee6", warmSilver:"#b0aea5", success: "#3b6d11",
  successBg: "#eaf3de", error: "#993c1d", errorBg: "#faece7", warning: "#854f0b", warningBg: "#faeeda",
};

// --- UTILS ---
const shuffle = a => [...a].sort(() => Math.random() - 0.5);
const CATS = ["Tất cả", ...Array.from(new Set(W.map(w => w.c)))];
const normPin = s => s.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, (m) => {
    const map = {'ā':'a','á':'a','ǎ':'a','à':'a','ē':'e','é':'e','ě':'e','è':'e','ī':'i','í':'i','ǐ':'i','ì':'i','ō':'o','ó':'o','ǒ':'o','ò':'o','ū':'u','ú':'u','ǔ':'u','ù':'u','ǖ':'u','ǘ':'u','ǚ':'u','ǜ':'u'};
    return map[m];
}).replace(/[-\s]/g,"");

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

async function callAI(prompt) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    let text = data?.content?.[0]?.text || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    let s = match[0];
    const open = (s.match(/\{/g) || []).length;
    const close = (s.match(/\}/g) || []).length;
    if (open > close) s += (s.endsWith('"') ? "" : '"') + "}".repeat(open - close);
    return JSON.parse(s);
  } catch (e) { return null; }
}

const speak = text => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

// --- APP ---
export default function App() {
  const [tab, setTab] = useState("flashcard");
  const [prog, setProg] = useState({});
  const [cat, setCat] = useState("Tất cả");
  const [weak, setWeak] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("hsk3_vfinal");
    if (saved) setProg(JSON.parse(saved));
    const savedWeak = localStorage.getItem("hsk3_weak");
    if (savedWeak) setWeak(JSON.parse(savedWeak));
  }, []);

  const recordAnswer = (hanzi, isCorrect) => {
    const newProg = { ...prog };
    const cur = newProg[hanzi] || { score: 0 };
    newProg[hanzi] = { score: isCorrect ? Math.min(cur.score + 1, 10) : Math.max(cur.score - 2, 0) };
    setProg(newProg);
    localStorage.setItem("hsk3_vfinal", JSON.stringify(newProg));
  };

  const markWeak = (w) => {
    if (weak.find(x => x.h === w.h)) return;
    const newWeak = [...weak, w];
    setWeak(newWeak);
    localStorage.setItem("hsk3_weak", JSON.stringify(newWeak));
  };

  const unmarkWeak = (h) => {
    const newWeak = weak.filter(x => x.h !== h);
    setWeak(newWeak);
    localStorage.setItem("hsk3_weak", JSON.stringify(newWeak));
  };

  const filteredWords = cat === "Tất cả" ? W : W.filter(w => w.c === cat);

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, padding: "20px 16px", fontFamily: "sans-serif", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
          <div>
            <h1 style={{ fontSize: 24, margin: 0, color: C.nearBlack }}>HSK3 Pro</h1>
            <div style={{ fontSize: 12, color: C.stone }}>🔥 Streak: {streak} | 🚩 Yếu: {weak.length}</div>
          </div>
          <div style={{ background: C.sand, borderRadius: 10, padding: "4px 12px", fontSize: 13 }}>
            {Object.keys(prog).length}/{W.length} từ
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 15 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "4px 12px", borderRadius: 20, border: "none", fontSize: 12, whiteSpace: "nowrap",
              background: cat === c ? C.terra : C.sand, color: cat === c ? "#fff" : C.charcoal, cursor: "pointer"
            }}>{c}</button>
          ))}
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: C.sand, borderRadius: 12, padding: 3, marginBottom: 20 }}>
          {[["flashcard", "📖 Học"], ["quiz", "🧩 Quiz"], ["review", "⚑ Ôn lại"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: 10, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13,
              background: tab === k ? "#fff" : "transparent", fontWeight: tab === k ? "bold" : "normal",
              boxShadow: tab === k ? "0 2px 5px rgba(0,0,0,0.05)" : "none", transition: "0.2s"
            }}>{l}</button>
          ))}
        </div>

        {/* CONTENT */}
        {tab === "flashcard" && <Flashcard words={filteredWords} prog={prog} recordAnswer={recordAnswer} setStreak={setStreak} markWeak={markWeak} />}
        {tab === "quiz" && <Quiz words={filteredWords} recordAnswer={recordAnswer} />}
        {tab === "review" && <Review weak={weak} unmarkWeak={unmarkWeak} />}
      </div>
    </div>
  );
}

// --- COMPONENTS ---

function Flashcard({ words, prog, recordAnswer, setStreak, markWeak }) {
  const [idx, setIdx] = useState(() => weightedPick(words, prog));
  const [step, setStep] = useState(0); 
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fb, setFb] = useState(null);

  const w = words[idx];

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await callAI(`GV HSK3. Chấm câu dùng "${w.h}". Câu HS: "${input}". 
    JSON:{"score":"good/bad","ana":"nhận xét chuyên sâu","fix":"sửa lại câu tự nhiên","pin":"pinyin fix","vi":"nghĩa fix","ex":"ví dụ khác"}`);
    
    if (result) {
      setFb(result);
      setStep(2);
      recordAnswer(w.h, result.score === "good");
      setStreak(s => result.score === "good" ? s + 1 : 0);
      if (result.score === "bad") markWeak(w);
    } else { alert("Lỗi kết nối."); }
    setLoading(false);
  };

  const next = () => {
    setIdx(weightedPick(words, prog));
    setStep(0); setInput(""); setFb(null);
  };

  return (
    <div style={{ background: "#fff", padding: 25, borderRadius: 20, boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
      {step === 0 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, margin: "10px 0", color: C.nearBlack }}>{w.h}</div>
          <div style={{ fontSize: 22, color: C.stone }}>{w.p}</div>
          <div style={{ fontSize: 18, color: C.charcoal, margin: "10px 0 30px" }}>{w.m}</div>
          <button onClick={() => setStep(1)} style={{ width: "100%", padding: 15, background: C.terra, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" }}>Luyện đặt câu</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div style={{ fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>{w.h} <span onClick={() => speak(w.h)} style={{cursor: "pointer", fontSize: 18}}>🔊</span></div>
          <textarea autoFocus value={input} onChange={e => setInput(e.target.value)} placeholder="Nhập câu tiếng Trung..." 
            style={{ width: "100%", height: 120, padding: 15, borderRadius: 12, border: `2px solid ${C.sand}`, fontSize: 16, outline: "none", boxSizing: "border-box" }} />
          <button onClick={handleCheck} disabled={loading} style={{ width: "100%", marginTop: 15, padding: 15, background: "#000", color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" }}>
            {loading ? "Đang phân tích..." : "Gửi chấm điểm"}
          </button>
        </div>
      )}

      {step === 2 && fb && (
        <div>
          <div style={{ padding: 15, borderRadius: 12, background: fb.score === "good" ? C.successBg : C.errorBg, borderLeft: `5px solid ${fb.score === "good" ? C.success : C.error}`, marginBottom: 15 }}>
            <b style={{ color: fb.score === "good" ? C.success : C.error }}>{fb.score === "good" ? "✓ Chính xác" : "× Cần sửa lại"}</b>
            <div style={{ fontSize: 14, marginTop: 5 }}>{fb.ana}</div>
          </div>
          <div style={{ background: "#f9f9f9", padding: 15, borderRadius: 12, marginBottom: 15 }}>
            <div style={{ fontSize: 11, color: C.stone, fontWeight: "bold" }}>SỬA LẠI:</div>
            <div style={{ fontSize: 20, color: C.terra, margin: "5px 0" }}>{fb.fix}</div>
            <div style={{ fontSize: 13, color: C.stone }}>{fb.pin}</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>{fb.vi}</div>
          </div>
          <button onClick={next} style={{ width: "100%", padding: 15, background: C.terra, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" }}>Từ tiếp theo</button>
        </div>
      )}
    </div>
  );
}

function Quiz({ words, recordAnswer }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [opts, setOpts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const w = words[qIdx];

  useEffect(() => {
    if (w) setOpts(shuffle([w, ...shuffle(W.filter(x => x.h !== w.h)).slice(0, 3)]));
  }, [qIdx]);

  const handleAns = (ans) => {
    if (selected) return;
    setSelected(ans.h);
    const isCorrect = ans.h === w.h;
    if (isCorrect) setScore(s => s + 1);
    recordAnswer(w.h, isCorrect);
    setTimeout(() => {
      if (qIdx < 9) {
        setQIdx(i => i + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  if (done) return (
    <div style={{ background: "#fff", padding: 30, borderRadius: 20, textAlign: "center" }}>
      <h2 style={{ color: C.terra }}>Kết quả: {score}/10</h2>
      <button onClick={() => window.location.reload()} style={{ padding: "10px 20px", background: C.terra, color: "#fff", border: "none", borderRadius: 8 }}>Làm lại</button>
    </div>
  );

  return (
    <div style={{ background: "#fff", padding: 25, borderRadius: 20 }}>
      <div style={{ fontSize: 12, color: C.stone, marginBottom: 10 }}>Câu {qIdx + 1}/10</div>
      <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>{w.h}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {opts.map(o => (
          <button key={o.h} onClick={() => handleAns(o)} style={{
            padding: 15, borderRadius: 12, border: `1px solid ${C.sand}`, cursor: "pointer", fontSize: 14,
            background: selected === o.h ? (o.h === w.h ? C.successBg : C.errorBg) : "#fff",
            color: selected === o.h ? (o.h === w.h ? C.success : C.error) : C.charcoal
          }}>{o.m}</button>
        ))}
      </div>
    </div>
  );
}

function Review({ weak, unmarkWeak }) {
  if (weak.length === 0) return <div style={{textAlign: "center", color: C.stone, padding: 40}}>Chưa có từ nào cần ôn lại!</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {weak.map(w => (
        <div key={w.h} style={{ background: "#fff", padding: 15, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>{w.h}</div>
            <div style={{ fontSize: 12, color: C.stone }}>{w.p} - {w.m}</div>
          </div>
          <button onClick={() => unmarkWeak(w.h)} style={{ padding: "5px 10px", background: C.sand, border: "none", borderRadius: 8, fontSize: 12 }}>Xong</button>
        </div>
      ))}
    </div>
  );
}
