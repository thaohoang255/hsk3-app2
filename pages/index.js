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

const C = {
  parchment: "#f5f4ed", ivory: "#faf9f5", terra: "#c96442", terraLight:"#f5ece7",
  nearBlack: "#141413", charcoal: "#4d4c48", olive: "#5e5d59", stone: "#87867f",
  sand: "#e8e6dc", cream: "#f0eee6", warmSilver:"#b0aea5", success: "#3b6d11",
  successBg: "#eaf3de", error: "#993c1d", errorBg: "#faece7", warning: "#854f0b", warningBg: "#faeeda",
};

const CATS = ["Tất cả", ...Array.from(new Set(W.map(w => w.c)))];

const speak = text => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

// --- API ---
async function callAI(prompt, maxTokens = 1000) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens
      })
    });
    const data = await res.json();
    let text = data?.content?.[0]?.text || "";
    
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    let jsonStr = match[0];

    // "Vá" JSON nếu bị ngắt quãng giữa chừng
    const openBraces = (jsonStr.match(/\{/g) || []).length;
    const closeBraces = (jsonStr.match(/\}/g) || []).length;
    if (openBraces > closeBraces) {
      if (!jsonStr.endsWith('"')) jsonStr += '"';
      jsonStr += "}".repeat(openBraces - closeBraces);
    }
    return jsonStr;
  } catch (e) {
    console.error("AI Error:", e);
    return null;
  }
}

// --- APP COMPONENT ---
export default function App() {
  const [tab, setTab] = useState("flashcard");
  const [cat, setCat] = useState("Tất cả");
  const [weak, setWeak] = useState([]);
  const [prog, setProg] = useState({});
  const [streak, setStreak] = useState(0);

  const words = cat === "Tất cả" ? W : W.filter(w => w.c === cat);

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, padding: "20px 16px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h1 style={{ textAlign: "center", color: C.nearBlack, fontSize: 24, marginBottom: 20 }}>HSK3 Pro Tutor</h1>
        
        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 16 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "4px 12px", borderRadius: 20, border: "none", fontSize: 12, whiteSpace: "nowrap",
              background: cat === c ? C.terra : C.sand, color: cat === c ? "#fff" : C.charcoal, cursor: "pointer"
            }}>{c}</button>
          ))}
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: C.sand, borderRadius: 10, padding: 3, marginBottom: 20 }}>
          {[["flashcard", "Học"], ["quiz", "Kiểm tra"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: 8, borderRadius: 8, border: "none", cursor: "pointer",
              background: tab === k ? "#fff" : "transparent", fontWeight: tab === k ? "bold" : "normal"
            }}>{l}</button>
          ))}
        </div>

        {tab === "flashcard" ? <Flashcard words={words} setStreak={setStreak} setWeak={setWeak} /> : <div style={{textAlign:'center', color:C.stone}}>Quiz đang cập nhật...</div>}
      </div>
    </div>
  );
}

function Flashcard({ words, setStreak, setWeak }) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0); // 0: Word, 1: Practice, 2: Result
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fb, setFb] = useState(null);

  const w = words[idx];

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const prompt = `Bạn là GV tiếng Trung. Chấm câu của HS dùng từ "${w.h}" (${w.p}). Câu HS: "${input}". 
    JSON: {"score":"good/bad","analysis":"giải thích lỗi ngữ pháp và độ tự nhiên","refined_sentence":"sửa lại câu cho tự nhiên nhất","refined_pinyin":"..","refined_vi":"..","example":"một ví dụ khác"}`;
    
    const json = await callAI(prompt);
    if (json) {
      try {
        const data = JSON.parse(json);
        setFb(data);
        setStep(2);
        if (data.score === "good") setStreak(s => s + 1);
        else setWeak(prev => [...prev, w]);
      } catch (e) {
        alert("Lỗi phân tích, hãy thử lại câu ngắn hơn.");
      }
    }
    setLoading(false);
  };

  const nextWord = () => {
    setIdx((idx + 1) % words.length);
    setStep(0);
    setInput("");
    setFb(null);
  };

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 16, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      {step === 0 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, color: C.terra, marginBottom: 8 }}>{w.h}</div>
          <div style={{ fontSize: 20, color: C.stone, marginBottom: 4 }}>{w.p}</div>
          <div style={{ fontSize: 16, color: C.charcoal, marginBottom: 20 }}>{w.m}</div>
          <button onClick={() => setStep(1)} style={{
            width: "100%", padding: 12, borderRadius: 8, border: "none", background: C.terra, color: "#fff", fontWeight: "bold", cursor: "pointer"
          }}>Luyện Đặt Câu</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>{w.h}</span>
            <button onClick={() => speak(w.h)} style={{ background: "none", border: "none", cursor: "pointer" }}>🔊 Nghe</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Viết một câu tiếng Trung..."
            style={{ width: "100%", height: 100, padding: 12, borderRadius: 8, border: `1px solid ${C.sand}`, fontSize: 16, marginBottom: 12, outline: "none" }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: 12, background: C.sand, border: "none", borderRadius: 8 }}>Quay lại</button>
            <button onClick={handleCheck} disabled={loading} style={{
              flex: 2, padding: 12, background: C.terra, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold"
            }}>{loading ? "Đang chấm..." : "Gửi Bài"}</button>
          </div>
        </div>
      )}

      {step === 2 && fb && (
        <div>
          <div style={{
            padding: 12, borderRadius: 8, marginBottom: 16,
            background: fb.score === "good" ? C.successBg : C.errorBg,
            borderLeft: `4px solid ${fb.score === "good" ? C.success : C.error}`
          }}>
            <p style={{ fontWeight: "bold", margin: 0, color: fb.score === "good" ? C.success : C.error }}>
              {fb.score === "good" ? "✓ Câu rất tốt" : "× Cần cải thiện"}
            </p>
            <p style={{ fontSize: 14, marginTop: 4 }}>{fb.analysis}</p>
          </div>

          <div style={{ background: C.parchment, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: C.stone, fontWeight: "bold", marginBottom: 4 }}>CÂU SỬA LẠI TỰ NHIÊN</p>
            <p style={{ fontSize: 18, color: C.nearBlack, margin: "4px 0" }}>{fb.refined_sentence}</p>
            <p style={{ fontSize: 13, color: C.stone, margin: 0 }}>{fb.refined_pinyin}</p>
            <p style={{ fontSize: 14, color: C.charcoal, marginTop: 4 }}>{fb.refined_vi}</p>
          </div>

          <div style={{ borderTop: `1px dashed ${C.sand}`, paddingTop: 12, marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: C.stone, fontWeight: "bold" }}>VÍ DỤ THAM KHẢO</p>
            <p style={{ fontSize: 15, fontStyle: "italic" }}>{fb.example}</p>
          </div>

          <button onClick={nextWord} style={{
            width: "100%", padding: 12, background: C.terra, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold"
          }}>Từ Tiếp Theo</button>
        </div>
      )}
    </div>
  );
}
