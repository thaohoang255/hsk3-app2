import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import W from "../data/words";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── COLORS ──────────────────────────────────────────────────
const C = {
  parchment: "#f5f4ed", ivory: "#faf9f5", terra: "#c96442",
  terraLight: "#f5ece7", nearBlack: "#141413", charcoal: "#4d4c48",
  olive: "#5e5d59", stone: "#87867f", sand: "#e8e6dc", cream: "#f0eee6",
  warmSilver: "#b0aea5", success: "#3b6d11", successBg: "#eaf3de",
  error: "#993c1d", errorBg: "#faece7", warning: "#854f0b", warningBg: "#faeeda",
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
const safeParse = text => {
  try {
    const m = text.replace(/```json|```/g,"").trim().match(/\{[^]*\}/);
    return m ? JSON.parse(m[0]) : null;
  } catch { return null; }
};

// ── SPACED REPETITION (SM-2) ─────────────────────────────────
const DAY = 86400000;
const defaultProg = { ease: 2.3, interval: 0, due: 0, streak: 0, seen: 0, correct: 0 };

const updateProg = (prog, hanzi, result) => {
  const now = Date.now();
  const cur = prog[hanzi] || { ...defaultProg };
  let { ease, interval, streak } = cur;
  if (result === "good")      { streak += 1; ease = Math.min(ease + 0.1, 3); interval = interval === 0 ? 1 : Math.round(interval * ease); }
  else if (result === "ok")   { streak = 0; ease = Math.max(ease - 0.1, 1.3); interval = Math.max(1, Math.round(interval * 1.1)); }
  else                        { streak = 0; ease = Math.max(ease - 0.25, 1.3); interval = 1; }
  return { ...prog, [hanzi]: { ease, interval, due: now + interval * DAY, streak, seen: cur.seen + 1, correct: cur.correct + (result === "good" ? 1 : 0) } };
};

const pickWord = (words, prog) => {
  const now = Date.now();
  const due = words.filter(w => !prog[w.h] || prog[w.h].due <= now);
  return due.length > 0 ? due[Math.floor(Math.random() * due.length)] : words[Math.floor(Math.random() * words.length)];
};

const getStats = (words, prog) => ({
  mastered: words.filter(w => prog[w.h]?.interval >= 7).length,
  learning:  words.filter(w => prog[w.h] && prog[w.h].interval < 7).length,
  unseen:    words.filter(w => !prog[w.h]).length,
});

const getProgLabel = (prog, h) => {
  if (!prog[h]) return { label: "chưa học", bg: C.sand, fg: C.olive };
  if (prog[h].interval >= 7) return { label: "đã thuộc", bg: C.successBg, fg: C.success };
  if (prog[h].interval >= 2) return { label: "đang học", bg: C.warningBg, fg: C.warning };
  return { label: "cần ôn", bg: C.errorBg, fg: C.error };
};

// ── AI CALL ──────────────────────────────────────────────────
const callAI = async (prompt, maxTokens = 1000) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: prompt }], max_tokens: maxTokens }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data?.content?.[0]?.text || "";
};

// ── STYLES ───────────────────────────────────────────────────
const card = { background: C.ivory, border: `1px solid ${C.cream}`, borderRadius: 12, padding: "16px" };
const btn  = (bg, fg, border) => ({ background: bg, color: fg, border: `1px solid ${border || bg}`, borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Georgia, serif" });
const pill = (bg, fg) => ({ background: bg, color: fg, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 500, display: "inline-block" });

// ── LOGIN SCREEN ─────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [msg, setMsg]           = useState("");

  const handle = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true); setError(""); setMsg("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password });
      if (error) setError(error.message);
      else setMsg("Đăng ký thành công! Kiểm tra email để xác nhận tài khoản.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setError("Email hoặc mật khẩu không đúng.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, color: C.nearBlack, margin: "0 0 8px" }}>漢語水平考試</h1>
          <p style={{ color: C.stone, fontSize: 14, margin: 0, fontFamily: "Arial, sans-serif" }}>HSK3 · Học tiếng Trung</p>
        </div>
        <div style={card}>
          <p style={{ color: C.charcoal, fontSize: 14, marginBottom: 16, fontFamily: "Arial, sans-serif", fontWeight: 500 }}>
            {isSignUp ? "Tạo tài khoản mới" : "Đăng nhập"}
          </p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            placeholder="Email"
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 10, background: C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif" }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            placeholder="Mật khẩu"
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 12, background: C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif" }}
          />
          {error && <p style={{ color: C.error, fontSize: 12, marginBottom: 8, fontFamily: "Arial, sans-serif" }}>{error}</p>}
          {msg   && <p style={{ color: C.success, fontSize: 12, marginBottom: 8, fontFamily: "Arial, sans-serif" }}>{msg}</p>}
          <button
            onClick={handle}
            disabled={loading || !email.trim() || !password.trim()}
            style={{ width: "100%", ...btn(loading || !email.trim() || !password.trim() ? C.sand : C.terra, loading || !email.trim() || !password.trim() ? C.stone : C.ivory), fontFamily: "Arial, sans-serif", marginBottom: 10 }}
          >
            {loading ? "Đang xử lý..." : isSignUp ? "Tạo tài khoản" : "Đăng nhập"}
          </button>
          <button
            onClick={() => { setIsSignUp(v => !v); setError(""); setMsg(""); }}
            style={{ width: "100%", ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif", fontSize: 12 }}
          >
            {isSignUp ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}
// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [user, setUser]         = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab]           = useState("flashcard");
  const [weak, setWeak]         = useState([]);
  const [streak, setStreak]     = useState(0);
  const [cat, setCat]           = useState("Tất cả");
  const [prog, setProg]         = useState({});
  const [syncing, setSyncing]   = useState(false);
  const [progLoaded, setProgLoaded] = useState(false);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load progress from Supabase
  useEffect(() => {
    if (!user) return;
   const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/progress", {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const json = await res.json();
    if (json.data) setProg(json.data);
    setProgLoaded(true); // thêm dòng này
    };
    load();
  }, [user]);

  // Save progress to Supabase (debounced)
  const saveProgress = useCallback(async (newProg) => {
    if (!user) return;
    setSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ data: newProg })
      });
    } catch {}
    setSyncing(false);
  }, [user]);

  const recordAnswer = (hanzi, result) => {
    const np = updateProg(prog, hanzi, result);
    setProg(np);
    saveProgress(np);
  };
  const updateAnswer = (hanzi, result) => {
  const np = updateProg(prog, hanzi, result);
  setProg(np);
  return np; // trả về prog mới để dùng tiếp
  };
  const words = cat === "Tất cả" ? W : W.filter(w => w.c === cat);
  const markWeak   = (w, note = "") => setWeak(p => p.find(x => x.h === w.h) ? p : [...p, { ...w, note }]);
  const unmarkWeak = h => setWeak(p => p.filter(w => w.h !== h));
  const stats = getStats(words, prog);
  const pct   = words.length ? Math.round((stats.mastered / words.length) * 100) : 0;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProg({});
    setWeak([]);
    setProgLoaded(false);
  };

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: C.parchment, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: C.stone, fontFamily: "Arial, sans-serif" }}>Đang tải...</p>
    </div>
  );

  if (!user) return <LoginScreen />;

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, fontFamily: "Georgia, serif", padding: "40px 16px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 620 }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 500, color: C.nearBlack, margin: 0, letterSpacing: "-0.3px" }}>漢語水平考試 HSK3</h1>
              <p style={{ fontSize: 13, color: C.stone, margin: "4px 0 0", fontFamily: "Arial, sans-serif" }}>
                {W.length} từ vựng · {pct}% đã thuộc
                {syncing && <span style={{ marginLeft: 8, color: C.warmSilver }}>· đang lưu...</span>}
              </p>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ ...pill(C.warningBg, C.warning), fontFamily: "Arial, sans-serif" }}>🔥 {streak}</span>
              <span style={{ ...pill(C.errorBg, C.error), fontFamily: "Arial, sans-serif" }}>⚑ {weak.length}</span>
              <button onClick={handleLogout} title="Đăng xuất" style={{ ...btn(C.sand, C.charcoal, C.cream), fontSize: 11, padding: "4px 8px", fontFamily: "Arial, sans-serif" }}>↩</button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ height: 4, background: C.sand, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ display: "flex", height: "100%" }}>
                <div style={{ width: `${(stats.mastered / words.length) * 100}%`, background: C.terra, transition: "width 0.5s" }} />
                <div style={{ width: `${(stats.learning / words.length) * 100}%`, background: "#d97757", transition: "width 0.5s" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontFamily: "Arial, sans-serif", fontSize: 11, color: C.stone }}>
              <span>{stats.unseen} chưa học</span>
              <span>{stats.learning} đang học</span>
              <span>{stats.mastered} đã thuộc</span>
            </div>
          </div>

          {/* Category filter */}
          <div style={{ overflowX: "auto", paddingBottom: 4 }}>
            <div style={{ display: "flex", gap: 6, width: "max-content" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{ ...pill(cat === c ? C.terra : C.sand, cat === c ? C.ivory : C.charcoal), border: "none", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Arial, sans-serif", fontSize: 11, fontWeight: 500, padding: "3px 10px" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: C.sand, borderRadius: 10, padding: 3, marginBottom: 16, display: "flex", gap: 3 }}>
          {[["flashcard","📖 Học"],["quiz","🧩 Quiz"],["review","⚑ Ôn lại"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "7px 4px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "Arial, sans-serif", background: tab === k ? C.ivory : C.sand, color: tab === k ? C.nearBlack : C.olive, transition: "all 0.15s" }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px 24px" }}>
          {!progLoaded
            ? <p style={{ color: C.stone, fontFamily: "Arial, sans-serif", textAlign: "center" }}>Đang tải tiến độ...</p>
            : <>
                {tab === "flashcard" && <Flashcard words={words} weak={weak} markWeak={markWeak} unmarkWeak={unmarkWeak} setStreak={setStreak} prog={prog} recordAnswer={recordAnswer} />}
                {tab === "quiz"      && <Quiz words={words} setStreak={setStreak} prog={prog} recordAnswer={recordAnswer} updateAnswer={updateAnswer} saveProgress={saveProgress} />}
                {tab === "review"    && <Review weak={weak} unmarkWeak={unmarkWeak} />}
              </>
          }
        </div>
      </div>
    </div>
  );
}

// ── FLASHCARD ────────────────────────────────────────────────
function Flashcard({ words, weak, markWeak, unmarkWeak, setStreak, prog, recordAnswer }) {
  const [step, setStep]         = useState(0);
  const [word, setWord]         = useState(() => pickWord(words, prog));
  const [showP, setShowP]       = useState(false);
  const [showM, setShowM]       = useState(false);
  const [sent, setSent]         = useState("");
  const [fb, setFb]             = useState(null);
  const [loading, setLoading]   = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setWord(pickWord(words, prog));
    setStep(0); setShowP(false); setShowM(false); setSent(""); setFb(null);
  }, [words]);

  const w = word || words[0];
  const next = () => { setWord(pickWord(words, prog)); setStep(0); setShowP(false); setShowM(false); setSent(""); setFb(null); setSpeaking(false); };
  const doSpeak = () => { setSpeaking(true); speak(w.h); setTimeout(() => setSpeaking(false), 1800); };

  const check = async () => {
    if (!sent.trim()) return;
    setLoading(true);
    try {
      const raw = await callAI(`Bạn là giáo viên tiếng Trung HSK3.
      Từ đang học: "${w.h}" (${w.p} - ${w.m})
      Câu học sinh đặt: "${sent}"
      Yêu cầu bắt buộc cho "comment":
      - Viết bằng tiếng Việt
      - Nếu nhắc đến từ tiếng Trung thì viết NGUYÊN chữ Hán, ví dụ: 现在, 以前
      - TUYỆT ĐỐI không mix kiểu "hiện在" hay "trước以前"
      - "example" phải có từ "${w.h}" và nên là bản sửa từ câu học sinh
      - "ex_pinyin" chỉ Latin, không có chữ Hán
      Chỉ trả JSON: {"score":"good/bad","comment":"...","example":"...","ex_pinyin":"...","ex_vi":"..."}`);
      const p = safeParse(raw);
      if (!p) throw new Error("parse fail");
      setFb(p); setStep(3); setStreak(s => s + 1);
      recordAnswer(w.h, p.score);
      if (p.score === "bad") markWeak(w, p.comment);
    } catch {
      setFb({ score: "bad", comment: "⚠️ Lỗi kết nối", example: "", ex_pinyin: "", ex_vi: "" });
      setStep(3);
    }
    setLoading(false);
  };

  if (!w) return null;
  const isWeak = !!weak.find(x => x.h === w.h);
  const pl     = getProgLabel(prog, w.h);

  return (
    <div>
      {step === 0 && (
        <div style={{ ...card, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ ...pill(C.sand, C.olive), fontFamily: "Arial, sans-serif" }}>{w.c}</span>
            <span style={{ ...pill(pl.bg, pl.fg), fontFamily: "Arial, sans-serif" }}>{pl.label}</span>
            {prog[w.h] && <span style={{ ...pill(C.sand, C.stone), fontFamily: "Arial, sans-serif" }}>{prog[w.h].correct}/{prog[w.h].seen} đúng</span>}
          </div>
          <div style={{ fontSize: 80, fontWeight: 500, color: C.terra, lineHeight: 1, marginBottom: 16 }}>{w.h}</div>
          <div style={{ marginBottom: 14 }}>
            {showP
              ? <p style={{ fontSize: 22, color: C.olive, margin: "0 0 6px", fontFamily: "Arial, sans-serif" }}>{w.p}</p>
              : <button onClick={() => setShowP(true)} style={{ ...btn(C.sand, C.charcoal, C.cream), marginBottom: 6, fontFamily: "Arial, sans-serif" }}>xem pinyin</button>}
            {showM
              ? <p style={{ fontSize: 15, color: C.charcoal, margin: 0, fontFamily: "Arial, sans-serif" }}>📖 {w.m}</p>
              : <button onClick={() => setShowM(true)} style={{ ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif" }}>xem nghĩa</button>}
          </div>
          <button onClick={doSpeak} disabled={speaking} style={{ ...btn(speaking ? C.cream : C.sand, speaking ? C.stone : C.charcoal, C.cream), marginBottom: 14, fontFamily: "Arial, sans-serif" }}>
            {speaking ? "đang phát..." : "🔊 nghe phát âm"}
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={next} style={{ flex: 1, ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif" }}>bỏ qua</button>
            <button onClick={() => setStep(2)} style={{ flex: 2, ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>đặt câu</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 60, fontWeight: 500, color: C.terra }}>{w.h}</div>
            <p style={{ color: C.stone, fontSize: 13, margin: "4px 0", fontFamily: "Arial, sans-serif" }}>{w.p} · {w.m}</p>
            <button onClick={doSpeak} style={{ ...btn(C.sand, C.charcoal, C.cream), fontSize: 12, fontFamily: "Arial, sans-serif" }}>{speaking ? "đang phát..." : "🔊 nghe lại"}</button>
          </div>
          <textarea value={sent} onChange={e => setSent(e.target.value)} placeholder={`Đặt câu có "${w.h}"...`}
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 15, marginBottom: 12, outline: "none", resize: "none", boxSizing: "border-box", background: C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif" }} rows={3} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif" }}>← lại</button>
            <button onClick={check} disabled={loading || !sent.trim()} style={{ flex: 2, ...btn(loading || !sent.trim() ? C.sand : C.terra, loading || !sent.trim() ? C.stone : C.ivory), fontFamily: "Arial, sans-serif" }}>
              {loading ? "đang chấm..." : "nộp bài"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && fb && (
        <div style={card}>
          <div style={{ background: fb.score === "good" ? C.successBg : C.errorBg, border: `1px solid ${fb.score === "good" ? C.success : C.error}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <p style={{ fontWeight: 500, color: fb.score === "good" ? C.success : C.error, marginBottom: 4, fontFamily: "Arial, sans-serif", fontSize: 14 }}>
              {fb.score === "good" ? "Xuất sắc!" : "Cần cải thiện"}
            </p>
            <p style={{ color: C.charcoal, fontSize: 13, marginBottom: fb.example ? 10 : 0, fontFamily: "Arial, sans-serif" }}>{fb.comment}</p>
            {fb.example && (
              <div style={{ background: C.ivory, borderRadius: 8, padding: 10 }}>
                <p style={{ fontSize: 11, color: C.stone, margin: "0 0 4px", fontFamily: "Arial, sans-serif", fontWeight: 500 }}>Câu mẫu</p>
                <p style={{ color: C.terra, fontWeight: 500, fontSize: 17, margin: "0 0 2px" }}>{fb.example}</p>
                <button onClick={() => speak(fb.example)} style={{ ...btn(C.sand, C.charcoal, C.cream), fontSize: 11, padding: "3px 10px", marginBottom: 4, fontFamily: "Arial, sans-serif" }}>nghe</button>
                <p style={{ color: C.stone, fontSize: 12, margin: "0 0 2px", fontFamily: "Arial, sans-serif" }}>{fb.ex_pinyin}</p>
                <p style={{ color: C.charcoal, fontSize: 12, margin: 0, fontFamily: "Arial, sans-serif" }}>{fb.ex_vi}</p>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {!isWeak
              ? <button onClick={() => markWeak(w)} style={{ flex: 1, ...btn(C.warningBg, C.warning, C.warning), fontSize: 12, fontFamily: "Arial, sans-serif" }}>đánh dấu ôn lại</button>
              : <button onClick={() => unmarkWeak(w.h)} style={{ flex: 1, ...btn(C.sand, C.stone, C.cream), fontSize: 12, fontFamily: "Arial, sans-serif" }}>bỏ đánh dấu</button>}
          </div>
          <button onClick={next} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>từ tiếp theo</button>
        </div>
      )}
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────
const TOTAL = 10;

function buildQuiz(words, prog) {
  if (words.length < 4) return [];
  const now = Date.now();

  // Phân loại — không có rest
  const unseen = words.filter(w => !prog[w.h]);
  const weak   = words.filter(w => prog[w.h] && prog[w.h].correct / Math.max(prog[w.h].seen, 1) < 0.6);
  const due    = words.filter(w => prog[w.h] && prog[w.h].due <= now && prog[w.h].correct / Math.max(prog[w.h].seen, 1) >= 0.6);

  // Gộp theo thứ tự ưu tiên, dedup
  const seen = new Set();
  const pool = [];
  for (const w of [...shuffle(unseen), ...shuffle(weak), ...shuffle(due)]) {
    if (!seen.has(w.h)) { seen.add(w.h); pool.push(w); }
  }

  // Nếu không đủ 10 thì fill thêm unseen/weak chưa có
  if (pool.length < TOTAL) {
    for (const w of shuffle(words)) {
      if (!seen.has(w.h)) { seen.add(w.h); pool.push(w); }
      if (pool.length >= TOTAL) break;
    }
  }

  const picked = pool.slice(0, TOTAL);

  const result = [];
  // Thêm đúng 1 câu antonym nếu có từ có pair trong pool
  const antonymCandidates = picked.filter(w => w.pair);
  const hasAntonym = antonymCandidates.length > 0;
  let antonymInserted = false;
  const antonymPos = Math.floor(Math.random() * TOTAL); // vị trí ngẫu nhiên trong quiz

  for (let i = 0; i < TOTAL; i++) {
    // Chèn câu antonym vào vị trí ngẫu nhiên
    if (hasAntonym && !antonymInserted && i === antonymPos) {
      const aw = shuffle(antonymCandidates)[0];
      result.push({ kind: "antonym", w: aw });
      antonymInserted = true;
      continue;
    }
    const w = picked[i % picked.length];
    const r = Math.random();
    if (r < 0.4)      result.push({ kind: "mcq", w, opts: shuffle([w, ...getWrong(w, words)]), type: Math.random() > 0.5 ? "meaning" : "pinyin" });
    else if (r < 0.7) result.push({ kind: "typing", w });
    else if (result.length === 0 || result[result.length - 1].kind === "match") result.push({ kind: "mcq", w, opts: shuffle([w, ...getWrong(w, words)]), type: "meaning" });
    else { const mp = shuffle([...weak, ...unseen, ...due]).slice(0, 4); result.push({ kind: "match", pairs: mp.length >= 4 ? mp : shuffle(words).slice(0,4), rights: shuffle((mp.length >= 4 ? mp : shuffle(words).slice(0,4)).map(x => x.m)) }); }
  }
  return result;
}

function Quiz({ words, setStreak, prog, recordAnswer, updateAnswer, saveProgress }) {
  const [qs, setQs]             = useState([]);
  const [qi, setQi]             = useState(0);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [sel, setSel]           = useState(null);
  const [typed, setTyped]       = useState("");
  const [typedRes, setTypedRes] = useState(null);
  const [mSel, setMSel]         = useState({ l: null, r: null });
  const [mDone, setMDone]       = useState([]);
  const [mWrong, setMWrong]     = useState(null);

  useEffect(() => { if (words.length >= 4) setQs(buildQuiz(words, prog)); }, [words]);

  const resetQ  = () => { setSel(null); setTyped(""); setTypedRes(null); setMSel({ l: null, r: null }); setMDone([]); setMWrong(null); };

  const next = () => {
    if (qi + 1 >= qs.length) {
      setDone(true);
      setStreak(s => s + 1);
      saveProgress(prog); // save 1 lần duy nhất khi kết thúc
    } else {
      setQi(i => i + 1);
      resetQ();
    }
  };

  const restart = () => { setQs(buildQuiz(words, prog)); setQi(0); resetQ(); setScore(0); setDone(false); };

  const handleMCQ = opt => {
    if (sel) return;
    const ok = opt.h === qs[qi].w.h;
    setSel(opt.h);
    if (ok) setScore(s => s + 1);
    updateAnswer(qs[qi].w.h, ok ? "ok" : "bad");
  };

  const handleTyping = () => {
    if (!typed.trim()) return;
    const ok = normPin(typed) === normPin(qs[qi].w.p);
    setTypedRes(ok ? "good" : "bad");
    if (ok) setScore(s => s + 1);
    updateAnswer(qs[qi].w.h, ok ? "good" : "bad");
  };
  const handleAntonym = () => {
  if (!typed.trim()) return;
  const ok = typed.trim() === qs[qi].w.pair.h;
  setTypedRes(ok ? "good" : "bad");
  if (ok) setScore(s => s + 1);
  updateAnswer(qs[qi].w.h, ok ? "good" : "bad");
  };

  if (!qs.length) return <p style={{ color: C.stone, fontFamily: "Arial, sans-serif", textAlign: "center" }}>Cần ít nhất 4 từ.</p>;

  if (done) {
    const pct = Math.round(score / qs.length * 100);
    return (
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</div>
        <p style={{ fontSize: 28, fontWeight: 500, color: C.nearBlack, margin: "0 0 4px" }}>{score}/{qs.length}</p>
        <div style={{ background: C.sand, borderRadius: 999, height: 6, margin: "12px 0 8px" }}>
          <div style={{ background: pct >= 80 ? C.terra : "#d97757", height: 6, borderRadius: 999, width: `${pct}%`, transition: "width 0.5s" }} />
        </div>
        <p style={{ color: C.stone, fontSize: 13, marginBottom: 20, fontFamily: "Arial, sans-serif" }}>{pct >= 80 ? "Xuất sắc!" : pct >= 50 ? "Khá tốt!" : "Ôn thêm nhé!"}</p>
        <button onClick={restart} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>làm lại</button>
      </div>
    );
  }

  const q = qs[qi];
  const labels = { mcq: "trắc nghiệm", typing: "gõ pinyin", match: "ghép cặp", antonym: "từ trái nghĩa" };
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: C.stone }}>
          câu {qi + 1}/{qs.length} <span style={{ ...pill(C.sand, C.charcoal), marginLeft: 4 }}>{labels[q.kind]}</span>
        </span>
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: C.terra, fontWeight: 500 }}>{score} đúng</span>
      </div>
      <div style={{ background: C.sand, borderRadius: 999, height: 3, marginBottom: 16 }}>
        <div style={{ background: C.terra, height: 3, borderRadius: 999, width: `${(qi / qs.length) * 100}%` }} />
      </div>

      {q.kind === "mcq" && (
        <div>
          <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <p style={{ color: C.stone, fontSize: 12, marginBottom: 4, fontFamily: "Arial, sans-serif" }}>{q.type === "meaning" ? "nghĩa của từ này là gì?" : "pinyin của từ này là gì?"}</p>
            <p style={{ fontSize: 56, fontWeight: 500, color: C.terra, margin: "4px 0", lineHeight: 1 }}>{q.w.h}</p>
            <p style={{ color: C.stone, fontSize: 13, margin: 0, fontFamily: "Arial, sans-serif" }}>{q.type === "meaning" ? q.w.p : q.w.m}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {q.opts.map(opt => {
              const ok = opt.h === q.w.h, picked = sel === opt.h;
              let bg = C.ivory, border = C.cream, color = C.charcoal;
              if (sel) { if (ok) { bg = C.successBg; border = C.success; color = C.success; } else if (picked) { bg = C.errorBg; border = C.error; color = C.error; } else { bg = C.parchment; border = C.cream; color = C.stone; } }
              return <button key={opt.h} onClick={() => handleMCQ(opt)} style={{ padding: 10, borderRadius: 10, fontSize: 12, textAlign: "center", border: `1px solid ${border}`, background: bg, color, cursor: "pointer", minHeight: 44, fontFamily: "Arial, sans-serif", transition: "all 0.1s" }}>{q.type === "meaning" ? opt.m : opt.p}</button>;
            })}
          </div>
          {sel && <button onClick={next} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>{qi + 1 >= qs.length ? "xem kết quả" : "tiếp theo"}</button>}
        </div>
      )}

      {q.kind === "typing" && (
                <div>
          <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <p style={{ color: C.stone, fontSize: 12, marginBottom: 4, fontFamily: "Arial, sans-serif" }}>gõ pinyin (không cần dấu thanh)</p>
            <p style={{ fontSize: 56, fontWeight: 500, color: C.terra, margin: "4px 0", lineHeight: 1 }}>{q.w.h}</p>
            <p style={{ color: C.stone, fontSize: 13, margin: 0, fontFamily: "Arial, sans-serif" }}>{q.w.m}</p>
          </div>
          {typedRes && <div style={{ background: typedRes === "good" ? C.successBg : C.errorBg, border: `1px solid ${typedRes === "good" ? C.success : C.error}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 8, fontSize: 13, fontFamily: "Arial, sans-serif", color: typedRes === "good" ? C.success : C.error }}>{typedRes === "good" ? `Đúng! Pinyin: ${q.w.p}` : `Chưa đúng. Đáp án: ${q.w.p}`}</div>}
          {!typedRes ? (
            <div>
              <input value={typed} onChange={e => setTyped(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleTyping(); }} placeholder="gõ pinyin rồi Enter..."
                style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 8, background: C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif" }} autoFocus />
              <button onClick={handleTyping} disabled={!typed.trim()} style={{ width: "100%", ...btn(typed.trim() ? C.terra : C.sand, typed.trim() ? C.ivory : C.stone), fontFamily: "Arial, sans-serif" }}>kiểm tra</button>
            </div>
          ) : <button onClick={next} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>{qi + 1 >= qs.length ? "xem kết quả" : "tiếp theo"}</button>}
        </div>
      )}
      {q.kind === "antonym" && (
        <div>
          <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <p style={{ color: C.stone, fontSize: 12, marginBottom: 8, fontFamily: "Arial, sans-serif" }}>gõ từ trái nghĩa bằng chữ Hán</p>
            <p style={{ fontSize: 56, fontWeight: 500, color: C.terra, margin: "4px 0", lineHeight: 1 }}>{q.w.h}</p>
          </div>
          {typedRes && (
            <div style={{ background: typedRes === "good" ? C.successBg : C.errorBg, border: `1px solid ${typedRes === "good" ? C.success : C.error}`, borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontFamily: "Arial, sans-serif" }}>
              <p style={{ color: typedRes === "good" ? C.success : C.error, fontWeight: 500, fontSize: 13, margin: "0 0 4px" }}>
                {typedRes === "good" ? "Đúng rồi! 🎉" : `Chưa đúng`}
            </p>
            <p style={{ color: C.nearBlack, fontSize: 18, fontWeight: 500, margin: "0 0 2px" }}>{q.w.pair.h}</p>
            <p style={{ color: C.stone, fontSize: 12, margin: "0 0 2px", fontFamily: "Arial, sans-serif" }}>{q.w.pair.p}</p>
            <p style={{ color: C.charcoal, fontSize: 12, margin: 0, fontFamily: "Arial, sans-serif" }}>{q.w.pair.m}</p>
          </div>
        )}
        {!typedRes ? (
          <div>
            <input
              value={typed}
              onChange={e => setTyped(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAntonym(); }}
              placeholder="gõ chữ Hán..."
              style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 20, outline: "none", boxSizing: "border-box", marginBottom: 8, background: C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif", textAlign: "center" }}
              autoFocus
            />
            <button onClick={handleAntonym} disabled={!typed.trim()} style={{ width: "100%", ...btn(typed.trim() ? C.terra : C.sand, typed.trim() ? C.ivory : C.stone), fontFamily: "Arial, sans-serif" }}>kiểm tra</button>
          </div>
      ) : (
          <button onClick={next} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>{qi + 1 >= qs.length ? "xem kết quả" : "tiếp theo"}</button>
      )}
    </div>
  )}

      {q.kind === "match" && <MatchQ q={q} mDone={mDone} mSel={mSel} mWrong={mWrong} setMSel={setMSel} setMDone={setMDone} setMWrong={setMWrong} setScore={setScore} updateAnswer={updateAnswer} next={next} qi={qi} total={qs.length} />}
    </div>
  );
}

function MatchQ({ q, mDone, mSel, mWrong, setMSel, setMDone, setMWrong, setScore, updateAnswer, next, qi, total }) {
  const allDone = mDone.length === q.pairs.length;
  const pick = (side, val) => {
    setMWrong(null);
    const ns = side === "l" ? { l: mSel.l === val ? null : val, r: mSel.r } : { l: mSel.l, r: mSel.r === val ? null : val };
    setMSel(ns);
    if (ns.l && ns.r) {
      const lw = q.pairs.find(x => x.h === ns.l);
      if (lw && lw.m === ns.r) {
        const nd = [...mDone, lw];
        setMDone(nd);
        setMSel({ l: null, r: null });
        if (nd.length === q.pairs.length) { setScore(s => s + 1); nd.forEach(w => updateAnswer(w.h, "ok")); }
      } else {
        setMWrong(ns.l);
        updateAnswer(ns.l, "bad");
        setTimeout(() => { setMSel({ l: null, r: null }); setMWrong(null); }, 1800);
      }
    }
  };
  return (
    <div>
      <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: "8px 12px", textAlign: "center", marginBottom: 10 }}>
        <p style={{ color: C.stone, fontSize: 12, margin: 0, fontFamily: "Arial, sans-serif" }}>ghép chữ Hán với nghĩa đúng · {mDone.length}/{q.pairs.length} cặp</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.pairs.map(pw => {
            const done = !!mDone.find(x => x.h === pw.h), selL = mSel.l === pw.h, wrong = mWrong === pw.h;
            return <button key={pw.h} onClick={() => { if (!done) pick("l", pw.h); }} style={{ padding: 10, borderRadius: 10, fontSize: 20, fontWeight: 500, minHeight: 52, cursor: done ? "default" : "pointer", border: `1px solid ${done ? C.success : wrong ? C.error : selL ? C.terra : C.cream}`, background: done ? C.successBg : selL ? C.terraLight : C.ivory, color: done ? C.success : C.terra, textAlign: "center" }}>
              {pw.h}
              {wrong && <div style={{ fontSize: 10, color: C.error, fontWeight: 400, marginTop: 2, fontFamily: "Arial, sans-serif" }}>{pw.p}</div>}
              {done  && <div style={{ fontSize: 10, color: C.success, fontWeight: 400, marginTop: 2, fontFamily: "Arial, sans-serif" }}>{pw.p}</div>}
            </button>;
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.rights.map(meaning => {
            const done = !!mDone.find(x => x.m === meaning), selR = mSel.r === meaning;
            return <button key={meaning} onClick={() => { if (!done) pick("r", meaning); }} style={{ padding: 8, borderRadius: 10, fontSize: 11, minHeight: 52, textAlign: "center", lineHeight: "1.4", cursor: done ? "default" : "pointer", border: `1px solid ${done ? C.success : selR ? C.terra : C.cream}`, background: done ? C.successBg : selR ? C.terraLight : C.ivory, color: done ? C.success : C.charcoal, fontFamily: "Arial, sans-serif" }}>
              {meaning}
            </button>;
          })}
        </div>
      </div>
      {allDone && <button onClick={next} style={{ width: "100%", ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>{qi + 1 >= total ? "xem kết quả" : "tiếp theo"}</button>}
    </div>
  );
}
// ── REVIEW ───────────────────────────────────────────────────
function Review({ weak, unmarkWeak }) {
  const [mode, setMode]           = useState("menu");
  const [type, setType]           = useState("dialogue");
  const [content, setContent]     = useState(null);
  const [loading, setLoading]     = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const [showPin, setShowPin]     = useState(false);
  const [userTrans, setUserTrans] = useState("");
  const [fb, setFb]               = useState(null);
  const [checking, setChecking]   = useState(false);
  const [showFb, setShowFb]       = useState(false);

  const pool = weak.length >= 3 ? weak : [...weak, ...W.filter(w => !weak.find(x => x.h === w.h)).slice(0, 6 - weak.length)];

  const generate = async () => {
    setLoading(true); setMode("reading"); setShowTrans(false); setShowPin(false);
    setUserTrans(""); setFb(null); setShowFb(false); setContent(null);
    const needed = Math.min(type === "dialogue" ? 3 : 4, pool.length);
    const weakPart = shuffle(weak).slice(0, needed);
    const remaining = needed - weakPart.length;
    const fillPart = remaining > 0
      ? shuffle(W.filter(w => !weak.find(x => x.h === w.h))).slice(0, remaining)
      : [];
    const picked = [...weakPart, ...fillPart];
    const wl = picked.map(w => w.h).join(", ");
    try {
      const raw = await callAI(`HSK3. Viết ${type === "dialogue" ? "hội thoại ngắn 4 lượt A/B" : "đoạn văn 4 câu"} dùng các từ: ${wl}. Chỉ JSON: {"chinese":"...","pinyin":"...","vietnamese":"...","words_used":["..."]}`, 1500);
      const p = safeParse(raw);
      if (!p) throw new Error("parse fail");
      setContent(p);
    } catch { setMode("menu"); }
    setLoading(false);
  };

  const checkTrans = async () => {
    if (fb) { setShowFb(v => !v); return; }
    if (!userTrans.trim()) return;
    setChecking(true);
    try {
      const raw = await callAI(`Bạn là giáo viên tiếng Trung chấm bài dịch cho học sinh Việt Nam học HSK3.
        Đoạn gốc tiếng Trung: "${content.chinese}"
        Bản dịch chuẩn tiếng Việt: "${content.vietnamese}"
        Bản dịch của học sinh: "${userTrans}"
        Yêu cầu chấm:
          - Học sinh dịch sang tiếng Việt,
          - "good": dịch đúng nghĩa, tự nhiên, dễ hiểu
          - "ok": hiểu đúng ý chính nhưng thiếu chi tiết hoặc hơi cứng
          - "bad": sai nghĩa hoặc bỏ sót ý quan trọng
        Chỉ trả JSON: {"score":"good|ok|bad","comment":"1 câu tiếng Việt nhận xét ngắn gọn"}`);
      const p = safeParse(raw);
      setFb(p || { score: "bad", comment: "⚠️ Lỗi phân tích." });
      setShowFb(true);
    } catch { setFb({ score: "bad", comment: "⚠️ Lỗi kết nối." }); setShowFb(true); }
    setChecking(false);
  };

  if (mode === "menu") return (
    <div style={card}>
      <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
        <p style={{ fontWeight: 500, color: C.charcoal, fontSize: 13, marginBottom: 6, fontFamily: "Arial, sans-serif" }}>Từ cần ôn</p>
        {weak.length === 0
          ? <p style={{ color: C.stone, fontSize: 12, margin: 0, fontFamily: "Arial, sans-serif" }}>Chưa có — dùng từ ngẫu nhiên HSK3</p>
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {weak.map(w => (
                <span key={w.h} style={{ ...pill(C.errorBg, C.error), display: "inline-flex", alignItems: "center", gap: 4, border: `1px solid ${C.error}` }}>
                  {w.h}<button onClick={() => unmarkWeak(w.h)} style={{ color: C.warmSilver, background: "none", border: "none", cursor: "pointer", fontSize: 10, padding: 0, lineHeight: 1 }}>✕</button>
                </span>
              ))}
            </div>}
      </div>
      <p style={{ fontSize: 13, color: C.charcoal, marginBottom: 8, fontFamily: "Arial, sans-serif", fontWeight: 500 }}>Chọn loại bài</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[["dialogue","hội thoại"],["paragraph","đoạn văn"]].map(([k, l]) => (
          <button key={k} onClick={() => setType(k)} style={{ flex: 1, padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 500, border: `1px solid ${type === k ? C.terra : C.cream}`, background: type === k ? C.terraLight : C.ivory, color: type === k ? C.terra : C.charcoal, cursor: "pointer", fontFamily: "Arial, sans-serif" }}>{l}</button>
        ))}
      </div>
      <button onClick={generate} style={{ width: "100%", ...btn(C.terra, C.ivory), padding: "10px 14px", fontFamily: "Arial, sans-serif" }}>tạo bài luyện</button>
    </div>
  );

  if (loading || !content) return <div style={{ ...card, textAlign: "center", padding: 40 }}><p style={{ color: C.stone, fontFamily: "Arial, sans-serif" }}>Đang tạo bài...</p></div>;

  return (
    <div style={card}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {(content.words_used || []).map(w => {
          const hanzi = w.split(" ")[0];
          return <span key={w} style={{ ...pill(C.terraLight, C.terra), border: `1px solid ${C.terra}` }}>{hanzi}</span>;
        })}
      </div>
      <div style={{ background: C.parchment, border: `1px solid ${C.cream}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <p style={{ fontSize: 11, color: C.stone, fontWeight: 500, marginBottom: 8, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{type === "dialogue" ? "hội thoại" : "đoạn văn"}</p>
        <p style={{ color: C.nearBlack, lineHeight: 1.7, fontSize: 15, whiteSpace: "pre-line", margin: "0 0 10px" }}>{content.chinese}</p>
        <button onClick={() => setShowPin(v => !v)} style={{ ...btn(C.sand, C.charcoal, C.cream), fontSize: 11, fontFamily: "Arial, sans-serif" }}>{showPin ? "ẩn pinyin" : "xem pinyin"}</button>
        {showPin && <p style={{ color: C.stone, fontSize: 12, marginTop: 8, lineHeight: 1.7, whiteSpace: "pre-line", fontFamily: "Arial, sans-serif" }}>{content.pinyin}</p>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.charcoal, marginBottom: 8, fontFamily: "Arial, sans-serif" }}>Dịch thử đi</p>
        <textarea value={userTrans} onChange={e => setUserTrans(e.target.value)} readOnly={!!fb} placeholder="Gõ bản dịch tiếng Việt..."
          style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box", background: fb ? C.cream : C.ivory, color: C.nearBlack, fontFamily: "Georgia, serif" }} rows={4} />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setShowTrans(v => !v)} style={{ flex: 1, ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif" }}>{showTrans ? "ẩn đáp án" : "xem đáp án"}</button>
          <button onClick={checkTrans} disabled={checking || (!fb && !userTrans.trim())} style={{ flex: 1, ...btn(checking || (!fb && !userTrans.trim()) ? C.sand : C.terra, checking || (!fb && !userTrans.trim()) ? C.stone : C.ivory), fontFamily: "Arial, sans-serif" }}>
            {checking ? "đang chấm..." : fb ? (showFb ? "ẩn kết quả" : "xem kết quả") : "chấm bài"}
          </button>
        </div>
      </div>
      {fb && showFb && (
        <div style={{ background: fb.score === "good" ? C.successBg : fb.score === "ok" ? C.warningBg : C.errorBg, border: `1px solid ${fb.score === "good" ? C.success : fb.score === "ok" ? C.warning : C.error}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <p style={{ fontWeight: 500, color: fb.score === "good" ? C.success : fb.score === "ok" ? C.warning : C.error, marginBottom: 4, fontFamily: "Arial, sans-serif", fontSize: 14 }}>
            {fb.score === "good" ? "Dịch rất tốt!" : fb.score === "ok" ? "Khá ổn!" : "Cần cải thiện"}
          </p>
          <p style={{ color: C.charcoal, fontSize: 13, margin: 0, fontFamily: "Arial, sans-serif" }}>{fb.comment}</p>
        </div>
      )}
      {showTrans && (
        <div style={{ background: C.successBg, border: `1px solid ${C.success}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: C.success, marginBottom: 6, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Bản dịch chuẩn</p>
          <p style={{ color: C.charcoal, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line", margin: 0, fontFamily: "Arial, sans-serif" }}>{content.vietnamese}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setMode("menu"); setContent(null); }} style={{ flex: 1, ...btn(C.sand, C.charcoal, C.cream), fontFamily: "Arial, sans-serif" }}>← menu</button>
        <button onClick={generate} style={{ flex: 1, ...btn(C.terra, C.ivory), fontFamily: "Arial, sans-serif" }}>bài mới</button>
      </div>
    </div>
  );
}
