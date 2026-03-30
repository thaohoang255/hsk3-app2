import { useState, useEffect } from "react";

const hsk3Words = [
  {hanzi:"万",pinyin:"wàn",meaning:"mười nghìn",cat:"Số đếm"},
  {hanzi:"半",pinyin:"bàn",meaning:"một nửa",cat:"Số đếm"},
  {hanzi:"第一",pinyin:"dì-yī",meaning:"thứ nhất",cat:"Số đếm"},
  {hanzi:"自己",pinyin:"zìjǐ",meaning:"bản thân mình",cat:"Đại từ"},
  {hanzi:"大家",pinyin:"dàjiā",meaning:"mọi người",cat:"Đại từ"},
  {hanzi:"其他",pinyin:"qítā",meaning:"khác, những cái khác",cat:"Đại từ"},
  {hanzi:"别人",pinyin:"biéren",meaning:"người khác",cat:"Đại từ"},
  {hanzi:"刚才",pinyin:"gāngcái",meaning:"vừa mới, lúc nãy",cat:"Thời gian"},
  {hanzi:"周末",pinyin:"zhōumò",meaning:"cuối tuần",cat:"Thời gian"},
  {hanzi:"一会儿",pinyin:"yíhuìr",meaning:"một lúc, chốc lát",cat:"Thời gian"},
  {hanzi:"以前",pinyin:"yǐqián",meaning:"trước đây",cat:"Thời gian"},
  {hanzi:"以后",pinyin:"yǐhòu",meaning:"sau này",cat:"Thời gian"},
  {hanzi:"最近",pinyin:"zuìjìn",meaning:"gần đây",cat:"Thời gian"},
  {hanzi:"过去",pinyin:"guòqù",meaning:"quá khứ",cat:"Thời gian"},
  {hanzi:"去年",pinyin:"qùnián",meaning:"năm ngoái",cat:"Thời gian"},
  {hanzi:"季节",pinyin:"jìjié",meaning:"mùa, thời tiết",cat:"Thời gian"},
  {hanzi:"节日",pinyin:"jiérì",meaning:"ngày lễ, ngày hội",cat:"Thời gian"},
  {hanzi:"丈夫",pinyin:"zhàngfu",meaning:"chồng",cat:"Con người"},
  {hanzi:"妻子",pinyin:"qīzi",meaning:"vợ",cat:"Con người"},
  {hanzi:"爷爷",pinyin:"yéye",meaning:"ông nội",cat:"Con người"},
  {hanzi:"奶奶",pinyin:"nǎinai",meaning:"bà nội",cat:"Con người"},
  {hanzi:"叔叔",pinyin:"shūshu",meaning:"chú (em trai bố)",cat:"Con người"},
  {hanzi:"阿姨",pinyin:"āyí",meaning:"cô, dì; người giúp việc",cat:"Con người"},
  {hanzi:"邻居",pinyin:"línjū",meaning:"hàng xóm",cat:"Con người"},
  {hanzi:"客人",pinyin:"kèren",meaning:"khách",cat:"Con người"},
  {hanzi:"同事",pinyin:"tóngshì",meaning:"đồng nghiệp",cat:"Con người"},
  {hanzi:"校长",pinyin:"xiàozhǎng",meaning:"hiệu trưởng",cat:"Con người"},
  {hanzi:"司机",pinyin:"sījī",meaning:"tài xế",cat:"Con người"},
  {hanzi:"服务员",pinyin:"fúwùyuán",meaning:"nhân viên phục vụ",cat:"Con người"},
  {hanzi:"经理",pinyin:"jīnglǐ",meaning:"giám đốc, quản lý",cat:"Con người"},
  {hanzi:"身体",pinyin:"shēntǐ",meaning:"cơ thể, sức khỏe",cat:"Cơ thể"},
  {hanzi:"脸",pinyin:"liǎn",meaning:"mặt, khuôn mặt",cat:"Cơ thể"},
  {hanzi:"眼睛",pinyin:"yǎnjīng",meaning:"mắt",cat:"Cơ thể"},
  {hanzi:"耳朵",pinyin:"ěrduo",meaning:"tai",cat:"Cơ thể"},
  {hanzi:"鼻子",pinyin:"bízi",meaning:"mũi",cat:"Cơ thể"},
  {hanzi:"头发",pinyin:"tóufa",meaning:"tóc",cat:"Cơ thể"},
  {hanzi:"腿",pinyin:"tuǐ",meaning:"chân (đùi)",cat:"Cơ thể"},
  {hanzi:"脚",pinyin:"jiǎo",meaning:"bàn chân",cat:"Cơ thể"},
  {hanzi:"声音",pinyin:"shēngyīn",meaning:"âm thanh, giọng nói",cat:"Cơ thể"},
  {hanzi:"牛奶",pinyin:"niúnǎi",meaning:"sữa bò",cat:"Đồ ăn"},
  {hanzi:"面包",pinyin:"miànbāo",meaning:"bánh mì",cat:"Đồ ăn"},
  {hanzi:"蛋糕",pinyin:"dàngāo",meaning:"bánh kem",cat:"Đồ ăn"},
  {hanzi:"糖",pinyin:"táng",meaning:"kẹo, đường",cat:"Đồ ăn"},
  {hanzi:"米饭",pinyin:"mǐfàn",meaning:"cơm",cat:"Đồ ăn"},
  {hanzi:"面条",pinyin:"miàntiáo",meaning:"mì sợi",cat:"Đồ ăn"},
  {hanzi:"鸡蛋",pinyin:"jīdàn",meaning:"trứng gà",cat:"Đồ ăn"},
  {hanzi:"羊肉",pinyin:"yángròu",meaning:"thịt cừu",cat:"Đồ ăn"},
  {hanzi:"菜单",pinyin:"càidān",meaning:"thực đơn",cat:"Đồ ăn"},
  {hanzi:"香蕉",pinyin:"xiāngjiāo",meaning:"chuối",cat:"Đồ ăn"},
  {hanzi:"西瓜",pinyin:"xīguā",meaning:"dưa hấu",cat:"Đồ ăn"},
  {hanzi:"葡萄",pinyin:"pútáo",meaning:"nho",cat:"Đồ ăn"},
  {hanzi:"果汁",pinyin:"guǒzhī",meaning:"nước ép trái cây",cat:"Đồ ăn"},
  {hanzi:"啤酒",pinyin:"píjiǔ",meaning:"bia",cat:"Đồ ăn"},
  {hanzi:"药",pinyin:"yào",meaning:"thuốc",cat:"Đồ ăn"},
  {hanzi:"衬衫",pinyin:"chènshān",meaning:"áo sơ mi",cat:"Quần áo"},
  {hanzi:"裤子",pinyin:"kùzi",meaning:"quần",cat:"Quần áo"},
  {hanzi:"裙子",pinyin:"qúnzi",meaning:"váy",cat:"Quần áo"},
  {hanzi:"帽子",pinyin:"màozi",meaning:"mũ",cat:"Quần áo"},
  {hanzi:"行李箱",pinyin:"xínglǐxiāng",meaning:"vali",cat:"Quần áo"},
  {hanzi:"伞",pinyin:"sǎn",meaning:"ô, dù",cat:"Quần áo"},
  {hanzi:"眼镜",pinyin:"yǎnjìng",meaning:"kính mắt",cat:"Quần áo"},
  {hanzi:"报纸",pinyin:"bàozhǐ",meaning:"báo (giấy)",cat:"Học tập"},
  {hanzi:"字典",pinyin:"zìdiǎn",meaning:"từ điển",cat:"Học tập"},
  {hanzi:"地图",pinyin:"dìtú",meaning:"bản đồ",cat:"Học tập"},
  {hanzi:"照片",pinyin:"zhàopiàn",meaning:"ảnh, hình ảnh",cat:"Học tập"},
  {hanzi:"护照",pinyin:"hùzhào",meaning:"hộ chiếu",cat:"Học tập"},
  {hanzi:"照相机",pinyin:"zhàoxiàngjī",meaning:"máy ảnh",cat:"Học tập"},
  {hanzi:"黑板",pinyin:"hēibǎn",meaning:"bảng đen",cat:"Học tập"},
  {hanzi:"铅笔",pinyin:"qiānbǐ",meaning:"bút chì",cat:"Học tập"},
  {hanzi:"年级",pinyin:"niánjí",meaning:"lớp học (cấp)",cat:"Học tập"},
  {hanzi:"作业",pinyin:"zuòyè",meaning:"bài tập về nhà",cat:"Học tập"},
  {hanzi:"考试",pinyin:"kǎoshì",meaning:"kỳ thi",cat:"Học tập"},
  {hanzi:"成绩",pinyin:"chéngjì",meaning:"thành tích, điểm số",cat:"Học tập"},
  {hanzi:"水平",pinyin:"shuǐpíng",meaning:"trình độ, mức độ",cat:"Học tập"},
  {hanzi:"词语",pinyin:"cíyǔ",meaning:"từ ngữ",cat:"Học tập"},
  {hanzi:"句子",pinyin:"jùzi",meaning:"câu",cat:"Học tập"},
  {hanzi:"普通话",pinyin:"pǔtōnghuà",meaning:"tiếng Phổ Thông",cat:"Học tập"},
  {hanzi:"电子邮件",pinyin:"diànzǐ yóujiàn",meaning:"email",cat:"Công nghệ"},
  {hanzi:"冰箱",pinyin:"bīngxiāng",meaning:"tủ lạnh",cat:"Công nghệ"},
  {hanzi:"空调",pinyin:"kōngtiáo",meaning:"máy điều hòa",cat:"Công nghệ"},
  {hanzi:"电梯",pinyin:"diàntī",meaning:"thang máy",cat:"Công nghệ"},
  {hanzi:"自行车",pinyin:"zìxíngchē",meaning:"xe đạp",cat:"Phương tiện"},
  {hanzi:"船",pinyin:"chuán",meaning:"thuyền, tàu",cat:"Phương tiện"},
  {hanzi:"太阳",pinyin:"tàiyáng",meaning:"mặt trời",cat:"Thiên nhiên"},
  {hanzi:"月亮",pinyin:"yuèliang",meaning:"mặt trăng",cat:"Thiên nhiên"},
  {hanzi:"云",pinyin:"yún",meaning:"mây",cat:"Thiên nhiên"},
  {hanzi:"草",pinyin:"cǎo",meaning:"cỏ",cat:"Thiên nhiên"},
  {hanzi:"熊猫",pinyin:"xióngmāo",meaning:"gấu trúc",cat:"Động vật"},
  {hanzi:"鸟",pinyin:"niǎo",meaning:"chim",cat:"Động vật"},
  {hanzi:"楼",pinyin:"lóu",meaning:"tòa nhà, tầng lầu",cat:"Địa điểm"},
  {hanzi:"厨房",pinyin:"chúfáng",meaning:"nhà bếp",cat:"Địa điểm"},
  {hanzi:"洗手间",pinyin:"xǐshǒujiān",meaning:"nhà vệ sinh",cat:"Địa điểm"},
  {hanzi:"图书馆",pinyin:"túshūguǎn",meaning:"thư viện",cat:"Địa điểm"},
  {hanzi:"办公室",pinyin:"bàngōngshì",meaning:"văn phòng",cat:"Địa điểm"},
  {hanzi:"饭馆",pinyin:"fànguǎn",meaning:"nhà hàng",cat:"Địa điểm"},
  {hanzi:"宾馆",pinyin:"bīngguǎn",meaning:"khách sạn",cat:"Địa điểm"},
  {hanzi:"超市",pinyin:"chāoshì",meaning:"siêu thị",cat:"Địa điểm"},
  {hanzi:"花园",pinyin:"huāyuán",meaning:"vườn hoa",cat:"Địa điểm"},
  {hanzi:"火车站",pinyin:"huǒchēzhàn",meaning:"ga tàu hỏa",cat:"Địa điểm"},
  {hanzi:"街道",pinyin:"jiēdào",meaning:"đường phố",cat:"Địa điểm"},
  {hanzi:"左边",pinyin:"zuǒbiān",meaning:"bên trái",cat:"Hướng"},
  {hanzi:"右边",pinyin:"yòubiān",meaning:"bên phải",cat:"Hướng"},
  {hanzi:"中间",pinyin:"zhōngjiān",meaning:"ở giữa",cat:"Hướng"},
  {hanzi:"旁边",pinyin:"pángbiān",meaning:"bên cạnh",cat:"Hướng"},
  {hanzi:"附近",pinyin:"fùjìn",meaning:"gần đây, xung quanh",cat:"Hướng"},
  {hanzi:"前面",pinyin:"qiánmiàn",meaning:"phía trước",cat:"Hướng"},
  {hanzi:"后面",pinyin:"hòumiàn",meaning:"phía sau",cat:"Hướng"},
  {hanzi:"北方",pinyin:"běifāng",meaning:"phía bắc",cat:"Hướng"},
  {hanzi:"兴趣",pinyin:"xìngqù",meaning:"sở thích, hứng thú",cat:"Sở thích"},
  {hanzi:"爱好",pinyin:"àihào",meaning:"sở thích",cat:"Sở thích"},
  {hanzi:"音乐",pinyin:"yīnyuè",meaning:"âm nhạc",cat:"Sở thích"},
  {hanzi:"体育",pinyin:"tǐyù",meaning:"thể dục thể thao",cat:"Sở thích"},
  {hanzi:"比赛",pinyin:"bǐsài",meaning:"thi đấu, cuộc thi",cat:"Sở thích"},
  {hanzi:"游戏",pinyin:"yóuxì",meaning:"trò chơi",cat:"Sở thích"},
  {hanzi:"故事",pinyin:"gùshi",meaning:"câu chuyện",cat:"Sở thích"},
  {hanzi:"节目",pinyin:"jiémù",meaning:"chương trình",cat:"Sở thích"},
  {hanzi:"历史",pinyin:"lìshǐ",meaning:"lịch sử",cat:"Sở thích"},
  {hanzi:"文化",pinyin:"wénhuà",meaning:"văn hóa",cat:"Sở thích"},
  {hanzi:"新闻",pinyin:"xīnwén",meaning:"tin tức",cat:"Sở thích"},
  {hanzi:"会议",pinyin:"huìyì",meaning:"cuộc họp",cat:"Công việc"},
  {hanzi:"机会",pinyin:"jīhuì",meaning:"cơ hội",cat:"Công việc"},
  {hanzi:"世界",pinyin:"shìjiè",meaning:"thế giới",cat:"Công việc"},
  {hanzi:"国家",pinyin:"guójiā",meaning:"quốc gia",cat:"Công việc"},
  {hanzi:"作用",pinyin:"zuòyòng",meaning:"tác dụng, vai trò",cat:"Công việc"},
  {hanzi:"参加",pinyin:"cānjiā",meaning:"tham gia",cat:"Động từ"},
  {hanzi:"帮助",pinyin:"bāngzhù",meaning:"giúp đỡ",cat:"Động từ"},
  {hanzi:"表示",pinyin:"biǎoshì",meaning:"biểu thị, thể hiện",cat:"Động từ"},
  {hanzi:"出现",pinyin:"chūxiàn",meaning:"xuất hiện",cat:"Động từ"},
  {hanzi:"打算",pinyin:"dǎsuàn",meaning:"dự định",cat:"Động từ"},
  {hanzi:"担心",pinyin:"dānxīn",meaning:"lo lắng",cat:"Động từ"},
  {hanzi:"发现",pinyin:"fāxiàn",meaning:"phát hiện",cat:"Động từ"},
  {hanzi:"复习",pinyin:"fùxí",meaning:"ôn tập",cat:"Động từ"},
  {hanzi:"感觉",pinyin:"gǎnjué",meaning:"cảm giác, cảm thấy",cat:"Động từ"},
  {hanzi:"根据",pinyin:"gēnjù",meaning:"căn cứ vào",cat:"Động từ"},
  {hanzi:"关心",pinyin:"guānxīn",meaning:"quan tâm",cat:"Động từ"},
  {hanzi:"决定",pinyin:"juédìng",meaning:"quyết định",cat:"Động từ"},
  {hanzi:"解决",pinyin:"jiějué",meaning:"giải quyết",cat:"Động từ"},
  {hanzi:"结束",pinyin:"jiéshù",meaning:"kết thúc",cat:"Động từ"},
  {hanzi:"检查",pinyin:"jiǎnchá",meaning:"kiểm tra",cat:"Động từ"},
  {hanzi:"介绍",pinyin:"jièshào",meaning:"giới thiệu",cat:"Động từ"},
  {hanzi:"了解",pinyin:"liǎojiě",meaning:"hiểu rõ",cat:"Động từ"},
  {hanzi:"离开",pinyin:"líkāi",meaning:"rời đi",cat:"Động từ"},
  {hanzi:"满意",pinyin:"mǎnyì",meaning:"hài lòng",cat:"Động từ"},
  {hanzi:"努力",pinyin:"nǔlì",meaning:"cố gắng, nỗ lực",cat:"Động từ"},
  {hanzi:"跑步",pinyin:"pǎobù",meaning:"chạy bộ",cat:"Động từ"},
  {hanzi:"清楚",pinyin:"qīngchǔ",meaning:"rõ ràng",cat:"Động từ"},
  {hanzi:"认为",pinyin:"rènwéi",meaning:"cho rằng",cat:"Động từ"},
  {hanzi:"使用",pinyin:"shǐyòng",meaning:"sử dụng",cat:"Động từ"},
  {hanzi:"完成",pinyin:"wánchéng",meaning:"hoàn thành",cat:"Động từ"},
  {hanzi:"相信",pinyin:"xiāngxìn",meaning:"tin tưởng",cat:"Động từ"},
  {hanzi:"选择",pinyin:"xuǎnzé",meaning:"lựa chọn",cat:"Động từ"},
  {hanzi:"影响",pinyin:"yǐngxiǎng",meaning:"ảnh hưởng",cat:"Động từ"},
  {hanzi:"注意",pinyin:"zhùyì",meaning:"chú ý",cat:"Động từ"},
  {hanzi:"准备",pinyin:"zhǔnbèi",meaning:"chuẩn bị",cat:"Động từ"},
  {hanzi:"照顾",pinyin:"zhàogù",meaning:"chăm sóc",cat:"Động từ"},
  {hanzi:"迟到",pinyin:"chídào",meaning:"đến muộn",cat:"Động từ"},
  {hanzi:"成功",pinyin:"chénggōng",meaning:"thành công",cat:"Động từ"},
  {hanzi:"变化",pinyin:"biànhuà",meaning:"thay đổi",cat:"Động từ"},
  {hanzi:"提高",pinyin:"tígāo",meaning:"nâng cao",cat:"Động từ"},
  {hanzi:"同意",pinyin:"tóngyì",meaning:"đồng ý",cat:"Động từ"},
  {hanzi:"突然",pinyin:"tūrán",meaning:"đột nhiên",cat:"Động từ"},
  {hanzi:"锻炼",pinyin:"duànliàn",meaning:"luyện tập",cat:"Động từ"},
  {hanzi:"发展",pinyin:"fāzhǎn",meaning:"phát triển",cat:"Động từ"},
  {hanzi:"感谢",pinyin:"gǎnxiè",meaning:"cảm ơn, biết ơn",cat:"Động từ"},
  {hanzi:"坚持",pinyin:"jiānchí",meaning:"kiên trì",cat:"Động từ"},
  {hanzi:"经历",pinyin:"jīnglì",meaning:"trải qua",cat:"Động từ"},
  {hanzi:"联系",pinyin:"liánxì",meaning:"liên lạc",cat:"Động từ"},
  {hanzi:"明白",pinyin:"míngbai",meaning:"hiểu rõ",cat:"Động từ"},
  {hanzi:"期待",pinyin:"qīdài",meaning:"mong đợi",cat:"Động từ"},
  {hanzi:"实现",pinyin:"shíxiàn",meaning:"thực hiện",cat:"Động từ"},
  {hanzi:"讨论",pinyin:"tǎolùn",meaning:"thảo luận",cat:"Động từ"},
  {hanzi:"支持",pinyin:"zhīchí",meaning:"ủng hộ",cat:"Động từ"},
  {hanzi:"游泳",pinyin:"yóuyǒng",meaning:"bơi lội",cat:"Động từ"},
  {hanzi:"运动",pinyin:"yùndòng",meaning:"vận động, thể thao",cat:"Động từ"},
  {hanzi:"聪明",pinyin:"cōngming",meaning:"thông minh",cat:"Tính từ"},
  {hanzi:"方便",pinyin:"fāngbiàn",meaning:"thuận tiện",cat:"Tính từ"},
  {hanzi:"健康",pinyin:"jiànkāng",meaning:"khỏe mạnh",cat:"Tính từ"},
  {hanzi:"安静",pinyin:"ānjìng",meaning:"yên tĩnh",cat:"Tính từ"},
  {hanzi:"复杂",pinyin:"fùzá",meaning:"phức tạp",cat:"Tính từ"},
  {hanzi:"干净",pinyin:"gānjìng",meaning:"sạch sẽ",cat:"Tính từ"},
  {hanzi:"高兴",pinyin:"gāoxìng",meaning:"vui mừng",cat:"Tính từ"},
  {hanzi:"积极",pinyin:"jījí",meaning:"tích cực",cat:"Tính từ"},
  {hanzi:"简单",pinyin:"jiǎndān",meaning:"đơn giản",cat:"Tính từ"},
  {hanzi:"困难",pinyin:"kùnnán",meaning:"khó khăn",cat:"Tính từ"},
  {hanzi:"流利",pinyin:"liúlì",meaning:"trôi chảy",cat:"Tính từ"},
  {hanzi:"热情",pinyin:"rèqíng",meaning:"nhiệt tình",cat:"Tính từ"},
  {hanzi:"认真",pinyin:"rènzhēn",meaning:"nghiêm túc, chăm chỉ",cat:"Tính từ"},
  {hanzi:"特别",pinyin:"tèbié",meaning:"đặc biệt",cat:"Tính từ"},
  {hanzi:"严重",pinyin:"yánzhòng",meaning:"nghiêm trọng",cat:"Tính từ"},
  {hanzi:"重要",pinyin:"zhòngyào",meaning:"quan trọng",cat:"Tính từ"},
  {hanzi:"紧张",pinyin:"jǐnzhāng",meaning:"căng thẳng",cat:"Tính từ"},
  {hanzi:"不但",pinyin:"bùdàn",meaning:"không những",cat:"Liên từ"},
  {hanzi:"虽然",pinyin:"suīrán",meaning:"mặc dù",cat:"Liên từ"},
  {hanzi:"因为",pinyin:"yīnwèi",meaning:"vì, bởi vì",cat:"Liên từ"},
  {hanzi:"所以",pinyin:"suǒyǐ",meaning:"vì vậy",cat:"Liên từ"},
  {hanzi:"如果",pinyin:"rúguǒ",meaning:"nếu như",cat:"Liên từ"},
  {hanzi:"而且",pinyin:"érqiě",meaning:"hơn nữa",cat:"Liên từ"},
  {hanzi:"只要",pinyin:"zhǐyào",meaning:"chỉ cần",cat:"Liên từ"},
  {hanzi:"终于",pinyin:"zhōngyú",meaning:"cuối cùng",cat:"Phó từ"},
  {hanzi:"已经",pinyin:"yǐjīng",meaning:"đã, rồi",cat:"Phó từ"},
  {hanzi:"还是",pinyin:"háishi",meaning:"hay là, vẫn là",cat:"Phó từ"},
  {hanzi:"一直",pinyin:"yīzhí",meaning:"liên tục, mãi mãi",cat:"Phó từ"},
  {hanzi:"其实",pinyin:"qíshí",meaning:"thực ra",cat:"Phó từ"},
  {hanzi:"当然",pinyin:"dāngrán",meaning:"tất nhiên",cat:"Phó từ"},
  {hanzi:"经常",pinyin:"jīngcháng",meaning:"thường xuyên",cat:"Phó từ"},
  {hanzi:"可能",pinyin:"kěnéng",meaning:"có thể, có lẽ",cat:"Phó từ"},
  {hanzi:"必须",pinyin:"bìxū",meaning:"bắt buộc phải",cat:"Phó từ"},
  {hanzi:"把",pinyin:"bǎ",meaning:"giới từ chỉ đối tượng",cat:"Giới từ"},
  {hanzi:"被",pinyin:"bèi",meaning:"bị, được (bị động)",cat:"Giới từ"},
  {hanzi:"比",pinyin:"bǐ",meaning:"so với, hơn",cat:"Giới từ"},
  {hanzi:"离",pinyin:"lí",meaning:"cách (khoảng cách)",cat:"Giới từ"},
  {hanzi:"除了",pinyin:"chúle",meaning:"ngoài ra, trừ",cat:"Giới từ"},
  {hanzi:"关于",pinyin:"guānyú",meaning:"về, liên quan đến",cat:"Giới từ"},
  {hanzi:"为了",pinyin:"wèile",meaning:"vì (mục đích)",cat:"Giới từ"},
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getWrong(correct, all) { return shuffle(all.filter(w => w.hanzi !== correct.hanzi)).slice(0, 3); }
const CATS = ["Tất cả", ...Array.from(new Set(hsk3Words.map(w => w.cat)))];
const TONES = [
  { tone:"1", mark:"ˉ", color:"bg-blue-100 text-blue-700",    label:"Thanh 1 — ngang cao" },
  { tone:"2", mark:"ˊ", color:"bg-green-100 text-green-700",  label:"Thanh 2 — lên" },
  { tone:"3", mark:"ˇ", color:"bg-yellow-100 text-yellow-700",label:"Thanh 3 — xuống rồi lên" },
  { tone:"4", mark:"ˋ", color:"bg-red-100 text-red-700",      label:"Thanh 4 — xuống nhanh" },
  { tone:"5", mark:"·", color:"bg-gray-100 text-gray-500",    label:"Thanh nhẹ" },
];
function getToneNum(p) {
  if (/[āēīōūǖ]/.test(p)) return "1";
  if (/[áéíóúǘ]/.test(p)) return "2";
  if (/[ǎěǐǒǔǚ]/.test(p)) return "3";
  if (/[àèìòùǜ]/.test(p)) return "4";
  return "5";
}
function speakChinese(text) {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = 0.85;
  const zh = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("zh"));
  if (zh) u.voice = zh;
  window.speechSynthesis.speak(u);
  return true;
}

// ── API helper — gọi /api/chat thay vì Anthropic trực tiếp ──
async function callAI(prompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: prompt }], max_tokens: 1000 }),
  });
  const data = await res.json();
  return data.content[0].text;
}

export default function App() {
  const [tab, setTab] = useState("flashcard");
  const [weakWords, setWeakWords] = useState([]);
  const [streak, setStreak] = useState(0);
  const [filterCat, setFilterCat] = useState("Tất cả");
  const filteredWords = filterCat === "Tất cả" ? hsk3Words : hsk3Words.filter(w => w.cat === filterCat);
  const markWeak = (word, note="") => setWeakWords(p => p.find(w=>w.hanzi===word.hanzi) ? p : [...p,{...word,note}]);
  const unmarkWeak = (hanzi) => setWeakWords(p => p.filter(w => w.hanzi !== hanzi));

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#fff1f0,#fffbe6)",display:"flex",alignItems:"center",justifyContent:"center",padding:"12px"}}>
      <div style={{background:"white",borderRadius:"24px",boxShadow:"0 8px 32px rgba(0,0,0,0.12)",width:"100%",maxWidth:"420px",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(90deg,#ef4444,#b91c1c)",padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <div>
              <div style={{color:"white",fontWeight:"bold",fontSize:"15px"}}>🇨🇳 HSK3 — {hsk3Words.length} từ</div>
              <div style={{color:"#fca5a5",fontSize:"11px"}}>{filteredWords.length} từ đang lọc</div>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              <span style={{background:"#fbbf24",color:"#7c2d12",padding:"2px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold"}}>🔥{streak}</span>
              <span style={{background:"#fca5a5",color:"white",padding:"2px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold"}}>⚑{weakWords.length}</span>
            </div>
          </div>
          {/* Category filter */}
          <div style={{overflowX:"auto",paddingBottom:"4px"}}>
            <div style={{display:"flex",gap:"6px",width:"max-content"}}>
              {CATS.map(c=>(
                <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"2px 10px",borderRadius:"999px",fontSize:"11px",fontWeight:"bold",border:"none",cursor:"pointer",background:filterCat===c?"white":"rgba(185,28,28,0.5)",color:filterCat===c?"#dc2626":"#fee2e2",whiteSpace:"nowrap"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
            {[["flashcard","📖 Học"],["quiz","🧩 Quiz"],["review","⚑ Ôn lại"]].map(([k,label])=>(
              <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"4px",borderRadius:"999px",fontSize:"12px",fontWeight:"bold",border:"none",cursor:"pointer",background:tab===k?"white":"rgba(185,28,28,0.5)",color:tab===k?"#dc2626":"#fee2e2"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:"16px"}}>
          {tab==="flashcard" && <FlashcardTab words={filteredWords} weakWords={weakWords} markWeak={markWeak} unmarkWeak={unmarkWeak} setStreak={setStreak}/>}
          {tab==="quiz"      && <QuizTab words={filteredWords} setStreak={setStreak}/>}
          {tab==="review"    && <ReviewTab weakWords={weakWords} unmarkWeak={unmarkWeak}/>}
        </div>
      </div>
    </div>
  );
}

// ── FLASHCARD ────────────────────────────────────────────────
function FlashcardTab({words,weakWords,markWeak,unmarkWeak,setStreak}) {
  const [idx,setIdx]=useState(0);
  const [step,setStep]=useState(0);
  const [showPinyin,setShowPinyin]=useState(false);
  const [showMeaning,setShowMeaning]=useState(false);
  const [sentence,setSentence]=useState("");
  const [feedback,setFeedback]=useState(null);
  const [loading,setLoading]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [pronResult,setPronResult]=useState(null);

  useEffect(()=>{setIdx(Math.floor(Math.random()*words.length));},[words]);
  const word=words[idx]||words[0];
  const isWeak=weakWords.find(w=>w.hanzi===word?.hanzi);
  const toneInfo=TONES.find(t=>t.tone===getToneNum(word?.pinyin||""))||TONES[4];

  const next=()=>{
    let ni; do{ni=Math.floor(Math.random()*words.length);}while(ni===idx&&words.length>1);
    setIdx(ni);setStep(0);setShowPinyin(false);setShowMeaning(false);setSentence("");setFeedback(null);setPronResult(null);
  };
  const handleSpeak=()=>{
    setSpeaking(true);setPronResult(null);
    speakChinese(word.hanzi);
    setTimeout(()=>setSpeaking(false),1800);
  };
  const check=async()=>{
    if(!sentence.trim())return;
    setLoading(true);
    try{
      const raw=await callAI(`Giáo viên tiếng Trung HSK3. Từ: "${word.hanzi}" (${word.pinyin} - ${word.meaning}). Câu HS: "${sentence}". Trả về JSON duy nhất: {"score":"good/bad","comment":"nhận xét ngắn tiếng Việt","example":"câu mẫu TQ","ex_pinyin":"pinyin","ex_vi":"nghĩa TV"}`);
      const p=JSON.parse(raw.replace(/```json|```/g,"").trim());
      setFeedback(p);setStep(3);setStreak(s=>s+1);
      if(p.score==="bad")markWeak(word,p.comment);
    }catch{setFeedback({score:"bad",comment:"⚠️ Lỗi kết nối",example:"",ex_pinyin:"",ex_vi:""});setStep(3);}
    setLoading(false);
  };

  if(!word)return null;
  const s=(obj)=>({...obj});

  return(
    <div>
      {step===0&&(
        <>
          <div style={{textAlign:"center",marginBottom:"12px"}}>
            <span style={{background:"#f3f4f6",color:"#6b7280",fontSize:"11px",padding:"2px 8px",borderRadius:"999px"}}>{word.cat}</span>
            <div style={{fontSize:"72px",fontWeight:"bold",color:"#dc2626",margin:"8px 0",lineHeight:1}}>{word.hanzi}{isWeak&&<span style={{fontSize:"20px"}}>⚑</span>}</div>
            <div>
              {showPinyin?<p style={{fontSize:"20px",color:"#6b7280",margin:"4px 0"}}>{word.pinyin}</p>
                :<button onClick={()=>setShowPinyin(true)} style={{color:"#3b82f6",fontSize:"12px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>👁 Pinyin</button>}
              {showMeaning?<p style={{fontSize:"14px",color:"#15803d",fontWeight:"600",margin:"4px 0"}}>📖 {word.meaning}</p>
                :<button onClick={()=>setShowMeaning(true)} style={{color:"#3b82f6",fontSize:"12px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>👁 Nghĩa</button>}
            </div>
          </div>
          {/* Phát âm block */}
          <div style={{background:"#f9fafb",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"12px",marginBottom:"12px"}}>
            <p style={{fontSize:"11px",fontWeight:"bold",color:"#9ca3af",marginBottom:"8px"}}>🔊 Luyện phát âm</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 10px",borderRadius:"999px",fontSize:"11px",fontWeight:"bold",marginBottom:"8px",background:toneInfo.color.split(" ")[0].replace("bg-","").includes("blue")?"#dbeafe":toneInfo.color.split(" ")[0].includes("green")?"#dcfce7":toneInfo.color.split(" ")[0].includes("yellow")?"#fef9c3":toneInfo.color.split(" ")[0].includes("red")?"#fee2e2":"#f3f4f6",color:toneInfo.color.includes("blue-700")?"#1d4ed8":toneInfo.color.includes("green-700")?"#15803d":toneInfo.color.includes("yellow-700")?"#a16207":toneInfo.color.includes("red-700")?"#b91c1c":"#6b7280"}}>
              <span style={{fontSize:"16px",fontWeight:"900"}}>{toneInfo.mark}</span> {toneInfo.label}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
              <button onClick={handleSpeak} disabled={speaking} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"999px",fontWeight:"bold",fontSize:"13px",border:"none",cursor:"pointer",background:speaking?"#fecaca":"#ef4444",color:"white"}}>
                {speaking?"🔊 Đang phát...":"🔊 Nghe phát âm"}
              </button>
              <button onClick={()=>speakChinese(word.pinyin)} style={{fontSize:"11px",color:"#60a5fa",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>chậm hơn</button>
            </div>
            <p style={{fontSize:"11px",color:"#9ca3af",marginBottom:"6px"}}>Nghe → đọc theo → tự đánh giá:</p>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setPronResult("good")} style={{flex:1,padding:"6px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:`2px solid ${pronResult==="good"?"#22c55e":"#86efac"}`,cursor:"pointer",background:pronResult==="good"?"#22c55e":"white",color:pronResult==="good"?"white":"#16a34a"}}>✅ Đọc đúng!</button>
              <button onClick={()=>{setPronResult("bad");markWeak(word,"Phát âm chưa chuẩn");}} style={{flex:1,padding:"6px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:`2px solid ${pronResult==="bad"?"#f97316":"#fdba74"}`,cursor:"pointer",background:pronResult==="bad"?"#f97316":"white",color:pronResult==="bad"?"white":"#ea580c"}}>😅 Chưa chuẩn</button>
            </div>
            {pronResult==="good"&&<p style={{color:"#16a34a",fontSize:"11px",marginTop:"4px",textAlign:"center"}}>🎉 Tuyệt!</p>}
            {pronResult==="bad"&&<p style={{color:"#ea580c",fontSize:"11px",marginTop:"4px",textAlign:"center"}}>📌 Đã lưu vào ⚑ Ôn lại!</p>}
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={next} style={{flex:1,padding:"8px",borderRadius:"16px",fontSize:"13px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer"}}>⏭ Bỏ qua</button>
            <button onClick={()=>setStep(2)} style={{flex:2,padding:"8px",borderRadius:"16px",fontSize:"13px",fontWeight:"bold",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>✍️ Đặt câu!</button>
          </div>
        </>
      )}
      {step===2&&(
        <>
          <div style={{textAlign:"center",marginBottom:"12px"}}>
            <div style={{fontSize:"56px",fontWeight:"bold",color:"#dc2626"}}>{word.hanzi}</div>
            <p style={{color:"#9ca3af",fontSize:"11px"}}>{word.pinyin} — {word.meaning}</p>
            <button onClick={handleSpeak} style={{color:"#f87171",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>{speaking?"🔊 Đang phát...":"🔊 Nghe lại"}</button>
          </div>
          <textarea value={sentence} onChange={e=>setSentence(e.target.value)} placeholder={`Đặt câu có "${word.hanzi}"...`}
            style={{width:"100%",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"10px",fontSize:"15px",marginBottom:"10px",outline:"none",resize:"none",boxSizing:"border-box"}} rows={3}/>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setStep(0)} style={{flex:1,padding:"8px",borderRadius:"16px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer",fontSize:"13px"}}>← Lại</button>
            <button onClick={check} disabled={loading||!sentence.trim()} style={{flex:2,padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:loading||!sentence.trim()?"#d1d5db":"#22c55e",color:"white",border:"none",cursor:"pointer"}}>
              {loading?"⏳...":"✅ Nộp!"}
            </button>
          </div>
        </>
      )}
      {step===3&&feedback&&(
        <>
          <div style={{borderRadius:"16px",padding:"12px",marginBottom:"10px",border:`2px solid ${feedback.score==="good"?"#86efac":"#fca5a5"}`,background:feedback.score==="good"?"#f0fdf4":"#fff1f2"}}>
            <p style={{fontWeight:"bold",marginBottom:"4px"}}>{feedback.score==="good"?"🎉 Xuất sắc!":"💪 Cần cải thiện!"}</p>
            <p style={{color:"#374151",fontSize:"13px",marginBottom:"8px"}}>{feedback.comment}</p>
            {feedback.example&&(
              <div style={{background:"white",borderRadius:"12px",padding:"8px"}}>
                <p style={{fontSize:"11px",color:"#9ca3af",marginBottom:"4px"}}>📝 Câu mẫu:</p>
                <p style={{color:"#dc2626",fontWeight:"bold",fontSize:"15px"}}>{feedback.example}</p>
                <button onClick={()=>speakChinese(feedback.example)} style={{color:"#f87171",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>🔊 Nghe câu mẫu</button>
                <p style={{color:"#9ca3af",fontSize:"11px"}}>{feedback.ex_pinyin}</p>
                <p style={{color:"#15803d",fontSize:"11px"}}>{feedback.ex_vi}</p>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:"6px",marginBottom:"8px"}}>
            {!isWeak&&<button onClick={()=>markWeak(word)} style={{flex:1,padding:"4px",borderRadius:"12px",fontSize:"11px",fontWeight:"bold",border:"1px solid #fdba74",background:"#fff7ed",color:"#ea580c",cursor:"pointer"}}>⚑ Học lại</button>}
            {isWeak&&<button onClick={()=>unmarkWeak(word.hanzi)} style={{flex:1,padding:"4px",borderRadius:"12px",fontSize:"11px",background:"#f3f4f6",color:"#9ca3af",border:"none",cursor:"pointer"}}>✓ Bỏ đánh dấu</button>}
          </div>
          <button onClick={next} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>👉 Từ tiếp!</button>
        </>
      )}
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────
function QuizTab({words,setStreak}){
  const TOTAL=5;
  const [qs,setQs]=useState([]);
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const build=()=>shuffle(words).slice(0,TOTAL).map(w=>({word:w,opts:shuffle([w,...getWrong(w,words)]),type:Math.random()>.5?"meaning":"pinyin"}));
  useEffect(()=>{if(words.length>=4)setQs(build());},[words]);
  if(!qs.length)return<p style={{textAlign:"center",color:"#9ca3af"}}>Cần ít nhất 4 từ.</p>;
  const pick=(opt)=>{if(sel)return;setSel(opt.hanzi);if(opt.hanzi===qs[qi].word.hanzi)setScore(s=>s+1);};
  const next=()=>{if(qi+1>=TOTAL){setDone(true);setStreak(s=>s+1);}else{setQi(i=>i+1);setSel(null);}};
  const restart=()=>{setQs(build());setQi(0);setSel(null);setScore(0);setDone(false);};
  if(done)return(
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:"48px",marginBottom:"8px"}}>{score>=4?"🏆":score>=2?"👍":"💪"}</div>
      <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"4px"}}>{score}/{TOTAL}</p>
      <p style={{color:"#6b7280",fontSize:"13px",marginBottom:"20px"}}>{score>=4?"Xuất sắc!":score>=2?"Tốt lắm!":"Ôn thêm nhé!"}</p>
      <button onClick={restart} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>🔄 Làm lại</button>
    </div>
  );
  const q=qs[qi];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:"#9ca3af",marginBottom:"6px"}}>
        <span>Câu {qi+1}/{TOTAL}</span><span style={{color:"#16a34a",fontWeight:"bold"}}>✅ {score}</span>
      </div>
      <div style={{width:"100%",background:"#f3f4f6",borderRadius:"999px",height:"6px",marginBottom:"14px"}}>
        <div style={{background:"#f87171",height:"6px",borderRadius:"999px",width:`${(qi/TOTAL)*100}%`}}/>
      </div>
      <div style={{background:"#fff1f0",border:"2px solid #fee2e2",borderRadius:"16px",padding:"16px",textAlign:"center",marginBottom:"14px"}}>
        <p style={{color:"#9ca3af",fontSize:"11px",marginBottom:"4px"}}>{q.type==="meaning"?"📖 Nghĩa là gì?":"🔤 Pinyin là gì?"}</p>
        <p style={{fontSize:"60px",fontWeight:"bold",color:"#dc2626",margin:"4px 0"}}>{q.word.hanzi}</p>
        <p style={{color:"#9ca3af",fontSize:"11px"}}>{q.type==="meaning"?q.word.pinyin:q.word.meaning}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
        {q.opts.map(opt=>{
          const ok=opt.hanzi===q.word.hanzi,picked=sel===opt.hanzi;
          let bg="white",border="2px solid #e5e7eb",color="#374151";
          if(sel){if(ok){bg="#dcfce7";border="2px solid #4ade80";color="#15803d";}else if(picked){bg="#fee2e2";border="2px solid #f87171";color="#b91c1c";}else{bg="#f9fafb";border="2px solid #f3f4f6";color="#d1d5db";}}
          return<button key={opt.hanzi} onClick={()=>pick(opt)} style={{padding:"10px",borderRadius:"14px",fontSize:"11px",textAlign:"center",border,background:bg,color,cursor:"pointer"}}>{q.type==="meaning"?opt.meaning:opt.pinyin}</button>;
        })}
      </div>
      {sel&&<button onClick={next} style={{width:"100%",padding:"8px",borderRadius:"16px",fontWeight:"bold",fontSize:"13px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>{qi+1>=TOTAL?"🏁 Kết quả":"→ Tiếp"}</button>}
    </div>
  );
}

// ── REVIEW ───────────────────────────────────────────────────
function ReviewTab({weakWords,unmarkWeak}){
  const [mode,setMode]=useState("menu");
  const [type,setType]=useState("dialogue");
  const [content,setContent]=useState(null);
  const [loading,setLoading]=useState(false);
  const [showTrans,setShowTrans]=useState(false);
  const [showPinyin,setShowPinyin]=useState(false);
  const [userTrans,setUserTrans]=useState("");
  const [feedback,setFeedback]=useState(null);
  const [checkLoading,setCheckLoading]=useState(false);

  const wordsToUse=weakWords.length>=3?weakWords:[...weakWords,...hsk3Words.filter(w=>!weakWords.find(x=>x.hanzi===w.hanzi)).slice(0,6-weakWords.length)];

  const generate=async()=>{
    setLoading(true);setMode("generate");setShowTrans(false);setShowPinyin(false);setUserTrans("");setFeedback(null);
    const picked=shuffle(wordsToUse).slice(0,Math.min(6,wordsToUse.length));
    const wordList=picked.map(w=>`${w.hanzi}(${w.meaning})`).join(", ");
    try{
      const raw=await callAI(`Bạn là giáo viên tiếng Trung dạy HSK3. Viết một ${type==="dialogue"?"đoạn hội thoại ngắn (4-6 lượt thoại, 2 nhân vật A và B)":"đoạn văn ngắn (5-7 câu)"} trình độ HSK3, có dùng các từ: ${wordList}. Trả về JSON duy nhất không markdown: {"chinese":"nội dung TQ","pinyin":"phiên âm toàn bộ","vietnamese":"bản dịch TV hoàn chỉnh","words_used":["từ1","từ2"]}`);
      const p=JSON.parse(raw.replace(/```json|```/g,"").trim());
      setContent(p);setMode("reading");
    }catch{setContent(null);setMode("menu");}
    setLoading(false);
  };

  const checkTrans=async()=>{
    if(!userTrans.trim())return;
    setCheckLoading(true);
    try{
      const raw=await callAI(`Giáo viên tiếng Trung HSK3. Bản gốc: "${content.chinese}". Dịch chuẩn: "${content.vietnamese}". Bản dịch HS: "${userTrans}". Trả JSON: {"score":"good/ok/bad","comment":"nhận xét 2-3 câu thân thiện tiếng Việt"}`);
      setFeedback(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{setFeedback({score:"bad",comment:"⚠️ Lỗi kết nối."});}
    setCheckLoading(false);
  };

  if(mode==="menu")return(
    <div>
      <div style={{background:"#fff7ed",border:"2px solid #fed7aa",borderRadius:"16px",padding:"12px",marginBottom:"12px"}}>
        <p style={{fontWeight:"bold",color:"#c2410c",marginBottom:"4px",fontSize:"13px"}}>📋 Từ cần ôn</p>
        {weakWords.length===0?<p style={{color:"#9ca3af",fontSize:"11px"}}>Chưa có — sẽ dùng từ ngẫu nhiên HSK3</p>
          :<div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"4px"}}>
            {weakWords.map(w=>(
              <span key={w.hanzi} style={{background:"white",border:"1px solid #fdba74",color:"#dc2626",fontSize:"11px",padding:"1px 8px",borderRadius:"999px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"4px"}}>
                {w.hanzi}
                <button onClick={()=>unmarkWeak(w.hanzi)} style={{color:"#d1d5db",background:"none",border:"none",cursor:"pointer",fontSize:"10px"}}>✕</button>
              </span>
            ))}
          </div>}
      </div>
      <p style={{fontSize:"13px",fontWeight:"bold",color:"#374151",marginBottom:"8px"}}>Chọn loại bài:</p>
      <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
        {[["dialogue","💬 Hội thoại"],["paragraph","📝 Đoạn văn"]].map(([k,label])=>(
          <button key={k} onClick={()=>setType(k)} style={{flex:1,padding:"10px",borderRadius:"16px",fontSize:"13px",fontWeight:"bold",border:`2px solid ${type===k?"#ef4444":"#e5e7eb"}`,background:type===k?"#ef4444":"white",color:type===k?"white":"#6b7280",cursor:"pointer"}}>
            {label}
          </button>
        ))}
      </div>
      <button onClick={generate} style={{width:"100%",padding:"10px",borderRadius:"16px",fontWeight:"bold",fontSize:"14px",background:"#ef4444",color:"white",border:"none",cursor:"pointer"}}>✨ Tạo bài luyện!</button>
    </div>
  );

  if(loading)return(
    <div style={{textAlign:"center",padding:"40px 0"}}>
      <div style={{fontSize:"36px",marginBottom:"8px"}}>✍️</div>
      <p style={{color:"#6b7280",fontWeight:"bold"}}>Đang tạo bài luyện...</p>
    </div>
  );

  if(mode==="reading"&&content)return(
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"10px"}}>
        {(content.words_used||[]).map(w=>(
          <span key={w} style={{background:"#fee2e2",color:"#dc2626",fontSize:"11px",padding:"1px 8px",borderRadius:"999px",fontWeight:"bold"}}>⚑ {w}</span>
        ))}
      </div>
      <div style={{background:"#f9fafb",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"12px",marginBottom:"10px"}}>
        <p style={{fontSize:"11px",color:"#9ca3af",fontWeight:"bold",marginBottom:"6px"}}>{type==="dialogue"?"💬 Hội thoại":"📝 Đoạn văn"}</p>
        <p style={{color:"#1f2937",lineHeight:"1.6",fontSize:"14px",whiteSpace:"pre-line"}}>{content.chinese}</p>
        <button onClick={()=>setShowPinyin(v=>!v)} style={{color:"#60a5fa",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:"6px"}}>
          {showPinyin?"🙈 Ẩn pinyin":"👁 Xem pinyin"}
        </button>
        {showPinyin&&<p style={{color:"#9ca3af",fontSize:"11px",marginTop:"4px",lineHeight:"1.6",whiteSpace:"pre-line"}}>{content.pinyin}</p>}
      </div>
      {!showTrans&&(
        <div style={{marginBottom:"10px"}}>
          <p style={{fontSize:"13px",fontWeight:"bold",color:"#374151",marginBottom:"6px"}}>✏️ Bạn dịch thử đi!</p>
          <textarea value={userTrans} onChange={e=>setUserTrans(e.target.value)} placeholder="Gõ bản dịch tiếng Việt vào đây..."
            style={{width:"100%",border:"2px solid #e5e7eb",borderRadius:"16px",padding:"10px",fontSize:"13px",outline:"none",resize:"none",boxSizing:"border-box"}} rows={4}/>
          <div style={{display:"flex",gap:"8px",marginTop:"6px"}}>
            <button onClick={()=>setShowTrans(true)} style={{flex:1,padding:"6px",borderRadius:"12px",background:"#f3f4f6",color:"#6b7280",border:"none",cursor:"pointer",fontSize:"11px"}}>🔍 Xem đáp án</button>
            <button onClick={checkTrans} disabled={checkLoading||!userTrans.trim()} style={{flex:1,padding:"6px",borderRadius:"12px",fontWeight:"bold",fontSize:"11px",background:checkLoading||!userTrans.trim()?"#d1d5db":"#22c55e",color:"white",border:"none",cursor:"pointer"}}>
              {checkLoading?"⏳...":"✅ Chấm bài!"}
            </button>
          </div>
        </div>
      )}
      {feedback&&!showTrans&&(
        <div style={{borderRadius:"16px",padding:"10px",marginBottom:"10px",border:`2px solid ${feedback.score==="good"?"#86efac":feedback.score==="ok"?"#fde68a":"#fca5a5"}`,background:feedback.score==="good"?"#f0fdf4":feedback.score==="ok"?"#fffbeb":"#fff1f2",fontSize:"13px"}}>
          <p style={{fontWeight:"bold",marginBottom:"4px"}}>{feedback.score==="good"?"🎉 Dịch rất tốt!":feedback.score==="ok"?"👍 Khá tốt!":"💪 Cần cải thiện!"}</p>
          <p style={{color:"#374151",fontSize:"12px"}}>{feedback.comment}</p>
          <button onClick={()=>setShowTrans(true)} style={{color:"#3b82f6",fontSize:"11px",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:"4px"}}>Xem đáp án chuẩn →</button>
        </div>
      )}
      {showTrans&&(
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
