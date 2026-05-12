// ── DATA ──
const MODULES = [
  { id:'emotion', name:'Cảm xúc & Xung đột', icon:'💔', color:'var(--accent-red)' },
  { id:'finance', name:'Tài chính & Áp lực',  icon:'💰', color:'var(--accent-orange)' },
  { id:'family',  name:'Gia đình & Kết nối',  icon:'👨‍👩‍👧', color:'var(--accent-green)' },
];

const SCENARIOS = [
  /* ── EMOTION ── */
  { id:'s1', title:'Nghi ngờ ngoại tình', icon:'🧠', module:'emotion',
    context:'Dạo gần đây bạn thấy người yêu hay giấu điện thoại, nhắn tin lúc khuya rồi quay lưng lại.',
    question:'Bạn sẽ xử lý thế nào?',
    choices:[
      { id:'A', text:'Hỏi thẳng luôn cho rõ', effect:{control:-5,comm:-5,bond:-5},
        next:{ desc:'Họ bất ngờ, hơi phòng thủ. Tiếp theo?', question:'Bạn tiếp tục như thế nào?',
          choices:[
            { id:'A1', text:'Hỏi dồn dập, không cho họ giải thích', effect:{control:-10,comm:-10,bond:-10},
              result:{ short:'Cãi nhau rất lớn', insight:'Dồn ép tạo phòng thủ, không tạo sự thật.', long:'Khoảng cách cảm xúc tăng dần.', advice:'Thử: "Anh/Em đang lo lắng — có thể chia sẻ không?" thay vì chất vấn.', scoreBonus:-15 }},
            { id:'A2', text:'Cố giữ bình tĩnh, lắng nghe giải thích', effect:{control:5,comm:5,bond:0},
              result:{ short:'Hiểu nhau hơn một chút', insight:'Bình tĩnh là cánh cửa duy nhất dẫn đến sự thật.', long:'Họ bắt đầu giải thích khi cảm thấy an toàn hơn.', advice:'Niềm tin được xây qua sự lắng nghe, không phải kiểm soát.', scoreBonus:10 }},
          ]
        }
      },
      { id:'B', text:'Chọn lúc phù hợp, nói chuyện nhẹ nhàng', effect:{comm:10,bond:5,empathy:5},
        result:{ short:'Mối quan hệ có không gian hồi phục', insight:'Thời điểm và cách nói quyết định 80% kết quả.', long:'Họ cởi mở hơn khi cảm thấy được tôn trọng.', advice:'Chuẩn bị môi trường an toàn trước khi mở cuộc trò chuyện khó.', scoreBonus:20 }},
      { id:'C', text:'Im lặng, tự quan sát thêm', effect:{comm:-10,bond:-5,control:-5},
        result:{ short:'Nghi ngờ tích tụ, kiệt sức từ bên trong', insight:'Im lặng không phải bình yên — là nợ tâm lý đang lãi.', long:'Cảm xúc dồn nén sẽ bùng phát mạnh hơn về sau.', advice:'Hãy tự hỏi: Điều tệ nhất nếu mình nói thật là gì? Thường không tệ như tưởng.', scoreBonus:-5 }},
    ]
  },
  { id:'s2', title:'Ghen tuông', icon:'😡', module:'emotion',
    context:'Người yêu nói chuyện khá thân mật với người khác. Cảm giác không thoải mái xuất hiện.',
    question:'Bạn phản ứng thế nào?',
    choices:[
      { id:'A', text:'Kiểm soát họ, hạn chế giao tiếp', effect:{control:-15,comm:-10,bond:-15},
        result:{ short:'Họ phản kháng hoặc giấu giếm nhiều hơn', insight:'Kiểm soát tạo ra chính điều bạn đang sợ.', long:'Người bị kiểm soát sẽ tìm cách "thoát" theo cách tinh vi hơn.', advice:'Ghen tuông là tín hiệu về nỗi sợ bên trong — hãy xử lý nỗi sợ, không phải người khác.', scoreBonus:-20 }},
      { id:'B', text:'Nói thật về cảm xúc của mình', effect:{comm:15,bond:10,empathy:10},
        result:{ short:'Niềm tin được củng cố', insight:'Chia sẻ cảm xúc tạo sự gần gũi hơn là xung đột.', long:'Câu nói đúng: "Em cảm thấy không an tâm khi... Em cần biết rằng..."', advice:'Ranh giới rõ ràng được thiết lập qua đối thoại, không phải kiểm soát.', scoreBonus:25 }},
      { id:'C', text:'Giữ trong lòng, không nói với ai', effect:{comm:-10,bond:-10,control:-5},
        result:{ short:'Tự mệt mỏi rồi bùng nổ về sau', insight:'Ghen tuông không được xử lý sẽ trở thành bức tường.', long:'Cảm xúc nén → bùng → người kia không hiểu tại sao → xung đột lớn hơn.', advice:'Hỏi bản thân: Ghen tuông này đang nói gì về nỗi sợ của mình?', scoreBonus:-5 }},
    ]
  },
  { id:'s3', title:'Cảm giác hết yêu', icon:'💔', module:'emotion',
    context:'Tình cảm không còn như trước. Những cảm xúc quen thuộc dần phai nhạt.',
    question:'Bạn sẽ làm gì?',
    choices:[
      { id:'A', text:'Chia tay luôn, không kéo dài', effect:{comm:5,bond:-5},
        next:{ desc:'Quyết định đã đưa ra. Cảm giác sau đó?', question:'Phản ứng thực tế của bạn?',
          choices:[
            { id:'A1', text:'Cảm thấy nhẹ nhõm — đúng quyết định', effect:{bond:-5,empathy:5},
              result:{ short:'Dứt khoát là hành động tử tế nhất', insight:'Sự nhẹ nhõm xác nhận quyết định đúng hướng.', long:'Chia tay trong tôn trọng là để cả hai tiếp tục.', advice:'Kết thúc tốt cũng là di sản đẹp của mối quan hệ.', scoreBonus:15 }},
            { id:'A2', text:'Hối hận, tiếc nuối', effect:{bond:-10,empathy:-5},
              result:{ short:'Vội vàng có thể không đúng', insight:'"Hết yêu" đôi khi chỉ là kiệt sức, không phải kết thúc.', long:'Hãy phân biệt kiệt sức và mất tình cảm trước khi quyết định.', advice:'Cho bản thân thêm thời gian để hiểu đúng cảm xúc.', scoreBonus:-5 }},
          ]
        }
      },
      { id:'B', text:'Thử cứu vãn trước khi quyết định', effect:{comm:10,bond:5,empathy:10},
        result:{ short:'Mối quan hệ có cơ hội hồi sinh', insight:'Tình yêu trưởng thành là lựa chọn, không chỉ cảm xúc.', long:'Các nhà tâm lý học gọi giai đoạn này là "tình yêu ổn định" — không kém hơn ban đầu.', advice:'Thử: Tạo kỷ niệm mới, nói chuyện thật về điều mình cần.', scoreBonus:20 }},
      { id:'C', text:'Cứ để vậy, không muốn quyết định', effect:{comm:-10,bond:-15,control:-5},
        result:{ short:'Mệt mỏi kéo dài, tổn thương âm ỉ', insight:'Ở lại không lý do là giam cầm cả hai.', long:'Không quyết định cũng là một quyết định — và thường gây đau lâu hơn.', advice:'Sợ quyết định sai không phải lý do để không quyết định.', scoreBonus:-15 }},
    ]
  },
  /* ── FINANCE ── */
  { id:'s4', title:'Mâu thuẫn tiền bạc', icon:'💰', module:'finance',
    context:'Bạn muốn tiết kiệm trong khi người kia chi tiêu rất thoải mái. Hai người bắt đầu bàn chuyện cưới.',
    question:'Bạn xử lý mâu thuẫn tài chính thế nào?',
    choices:[
      { id:'A', text:'Nói thẳng: cách tiêu đó không ổn', effect:{comm:-5,bond:-5,control:-5},
        next:{ desc:'Không khí căng. Bạn tiếp tục?', question:'Bước tiếp theo?',
          choices:[
            { id:'A1', text:'Cố giải thích bằng logic, tranh luận dài', effect:{comm:5,bond:-5,finance:5},
              result:{ short:'Hiểu hơn nhưng chưa đồng thuận', insight:'Logic tốt — nhưng thiếu đồng cảm. Hỏi: "Tiền có ý nghĩa gì với anh/em?"', long:'Ít nhất cả hai đều lắng nghe — đây là khởi đầu của thỏa thuận.', advice:'Thêm câu hỏi khám phá giá trị, không chỉ con số.', scoreBonus:5 }},
            { id:'A2', text:'Áp đặt, muốn họ theo ý mình', effect:{comm:-15,bond:-15,finance:-5},
              result:{ short:'Họ đồng ý bề ngoài, bất mãn bên trong', insight:'Kiểm soát tài chính là dạng kiểm soát tinh vi nhất.', long:'Phục tùng giả tạo sẽ tái phát dưới dạng phản kháng ngầm.', advice:'Cân bằng không phải 50/50 — mà là cả hai cảm thấy được tôn trọng.', scoreBonus:-15 }},
          ]
        }
      },
      { id:'B', text:'Ngồi nói chuyện bình tĩnh, tìm điểm chung', effect:{comm:15,bond:10,finance:15},
        result:{ short:'Tài chính ổn định, cảm giác an toàn tăng', insight:'Tài chính chung là cuộc trò chuyện về giá trị, không phải con số.', long:'Quy tắc 50/30/20 áp dụng cho thu nhập chung rất hiệu quả.', advice:'Quỹ chung cho chi phí thiết yếu + tài khoản riêng cho cá nhân = linh hoạt và công bằng.', scoreBonus:25 }},
      { id:'C', text:'Tránh đụng đến chủ đề tiền', effect:{comm:-10,bond:-5,finance:-10},
        result:{ short:'Đổ lỗi cho nhau khi mọi thứ vỡ ra', insight:'Im lặng về tài chính là lãi suất đang cộng dồn.', long:'Tài chính là nguyên nhân hàng đầu của ly hôn — nói sớm là yêu nhau tốt hơn.', advice:'Không bao giờ quá trễ để bắt đầu nói về tiền — nhưng sớm thì ít đau hơn.', scoreBonus:-10 }},
    ]
  },
  { id:'s5', title:'Bị gia đình thúc cưới', icon:'🧾', module:'finance',
    context:'Gia đình giục cưới liên tục nhưng bạn chưa thấy sẵn sàng. Áp lực từ nhiều phía.',
    question:'Bạn xử lý áp lực này thế nào?',
    choices:[
      { id:'A', text:'Cưới luôn cho xong', effect:{comm:-10,bond:-10,finance:-5},
        result:{ short:'Nhanh nhưng rủi ro lâu dài rất cao', insight:'Đám cưới 1 ngày — hôn nhân cả đời. Quyết định ngắn hạn cho hành trình dài thường không ổn.', long:'Mâu thuẫn sau đám cưới thường nặng hơn trước.', advice:'Hỏi: Mình cưới vì muốn hay vì sợ?', scoreBonus:-20 }},
      { id:'B', text:'Nói rõ: mình cần thêm thời gian', effect:{comm:15,bond:10,reason:15},
        result:{ short:'Vào hôn nhân với sự sẵn sàng thật sự', insight:'Thời gian chuẩn bị không phải trì hoãn — là tôn trọng quyết định quan trọng nhất.', long:'Chuẩn bị = hiểu rõ giá trị, tài chính, kỳ vọng về con cái và vai trò.', advice:'Đứng vững trước áp lực gia đình — và cần hai người cùng đứng.', scoreBonus:25 }},
      { id:'C', text:'Từ chối thẳng, không muốn kết hôn lúc này', effect:{comm:10,bond:0,reason:10},
        result:{ short:'Rõ ràng và trung thực với bản thân', insight:'Biết mình muốn và không muốn là trưởng thành — dù dẫn đến thay đổi lớn.', long:'Trung thực với bản thân trước khi trung thực với người khác.', advice:'Quyết định này có thể dẫn đến thay đổi — nhưng thay đổi không phải kết thúc.', scoreBonus:15 }},
    ]
  },
  /* ── FAMILY ── */
  { id:'s6', title:'Gia đình can thiệp', icon:'👨‍👩‍👧', module:'family',
    context:'Gia đình người kia can thiệp thường xuyên vào chuyện riêng của hai bạn.',
    question:'Bạn sẽ xử lý thế nào?',
    choices:[
      { id:'A', text:'Nói thẳng: tôi không thích điều này', effect:{comm:0,bond:-5,control:-5},
        next:{ desc:'Người kia rơi vào tình huống khó xử.', question:'Phản ứng của họ?',
          choices:[
            { id:'A1', text:'Họ đứng về phía gia đình — bạn bị bỏ rơi', effect:{bond:-15,empathy:-10,comm:-5},
              result:{ short:'Mất niềm tin, xa cách cảm xúc', insight:'Khi người yêu chọn gia đình trong mọi tình huống — đây là ranh giới cần nói rõ.', long:'Trong hôn nhân, gia đình riêng cần ưu tiên — không phải bỏ gia đình gốc, mà phân rõ vai trò.', advice:'"Chúng ta thống nhất trước rồi mới chia sẻ với gia đình" — câu nói quan trọng.', scoreBonus:-15 }},
            { id:'A2', text:'Họ hiểu nhưng không biết làm gì', effect:{bond:5,comm:5,empathy:5},
              result:{ short:'Thông cảm nhưng vẫn áp lực', insight:'Hiểu vấn đề là bước đầu — thay đổi cần thời gian và cụ thể.', long:'Đưa ra đề xuất cụ thể thay vì chờ họ tự tìm cách.', advice:'6-12 tháng để ranh giới gia đình ổn định là bình thường.', scoreBonus:10 }},
          ]
        }
      },
      { id:'B', text:'Nói nhẹ nhàng, cùng tìm cách dung hòa', effect:{comm:15,bond:10,empathy:10},
        result:{ short:'Gia đình dần tôn trọng — mối quan hệ vững hơn', insight:'Khi đôi bạn đứng cùng nhau — gia đình hai bên sẽ dần học cách điều chỉnh.', long:'Ranh giới với gia đình không phải xa cách — là tôn trọng vai trò mới.', advice:'Kiên trì và nhất quán — quan trọng hơn cứng rắn một lần rồi thôi.', scoreBonus:25 }},
      { id:'C', text:'Không nói gì, tự chịu đựng', effect:{comm:-10,bond:-10,control:-10},
        result:{ short:'Bề ngoài yên, bên trong không ổn', insight:'Im lặng thường được đọc là "đồng ý" — ngay cả khi không.', long:'Cảm xúc bị nén → tìm cách thoát ra không đẹp về sau.', advice:'Câu nói đơn giản nhất: "Tôi cần thêm thời gian để suy nghĩ về điều này."', scoreBonus:-10 }},
    ]
  },
  { id:'s7', title:'Ít nói chuyện với nhau', icon:'💬', module:'family',
    context:'Dạo này hai người nói chuyện ít hẳn — chủ yếu "ăn chưa", "đi đâu". Không còn trò chuyện thật sự.',
    question:'Bạn sẽ làm gì?',
    choices:[
      { id:'A', text:'Nói thẳng: tụi mình đang xa nhau', effect:{comm:10,bond:5,reason:5},
        next:{ desc:'Người kia bất ngờ. Họ phản ứng?', question:'Diễn tiến?',
          choices:[
            { id:'A1', text:'Họ lắng nghe và mở lòng', effect:{comm:15,bond:15,empathy:10},
              result:{ short:'Kết nối được khơi lại', insight:'Đôi khi chỉ cần một người dũng cảm nói ra.', long:'Câu hay nhất để mở đầu: "Gần đây anh/em đang nghĩ đến điều gì nhiều nhất?"', advice:'Chủ động là hành động của tình yêu — không phải dấu hiệu của yếu đuối.', scoreBonus:20 }},
            { id:'A2', text:'Họ khó chịu, thành tranh cãi', effect:{comm:-5,bond:-5,control:-5},
              result:{ short:'Ý tốt nhưng thời điểm không phù hợp', insight:'Thời điểm và không gian quyết định 80% kết quả của cuộc trò chuyện.', long:'Chọn lúc cả hai bình tĩnh, không mệt, không bận — rồi mới nói.', advice:'Đừng bỏ cuộc — thử lại vào thời điểm khác.', scoreBonus:-5 }},
          ]
        }
      },
      { id:'B', text:'Chủ động rủ đi chơi, tạo kỷ niệm mới', effect:{comm:10,bond:15,empathy:5},
        result:{ short:'Mối quan hệ được hâm nóng trở lại', insight:'Nghiên cứu: Cặp đôi dành ≥2 giờ/tuần "thời gian chất lượng" bền hơn 3 lần.', long:'Kỷ niệm chung là nền tảng — hãy tạo thêm mỗi tuần.', advice:'Thói quen nhỏ hiệu quả: Chia sẻ 1 điều tốt + 1 điều khó mỗi tối.', scoreBonus:20 }},
      { id:'C', text:'Thôi kệ, ai cũng bận', effect:{comm:-15,bond:-15,control:-5},
        result:{ short:'Dần trở thành người quen cùng nhà', insight:'Khoảng cách cảm xúc bắt đầu từ những điều tưởng như bình thường.', long:'"Cô đơn đồng hành" (relational loneliness) — đau hơn cô đơn thông thường.', advice:'Dấu hiệu cảnh báo: Không còn hỏi "Hôm nay như thế nào?" một cách thật sự muốn biết.', scoreBonus:-15 }},
    ]
  },
  { id:'s8', title:'Không dành thời gian', icon:'🕰️', module:'family',
    context:'Người kia lúc nào cũng bận. Bạn không còn là ưu tiên trong cuộc sống của họ.',
    question:'Bạn phản ứng thế nào?',
    choices:[
      { id:'A', text:'Than phiền và bày tỏ không hài lòng', effect:{comm:-5,bond:-5,control:-5},
        next:{ desc:'Họ cảm thấy áp lực và tội lỗi.', question:'Họ phản ứng?',
          choices:[
            { id:'A1', text:'Cố thay đổi vì tội lỗi', effect:{comm:5,bond:0,empathy:0},
              result:{ short:'Thay đổi từ tội lỗi thường không bền', insight:'Thay đổi vì tình yêu bền hơn thay đổi vì tội lỗi.', long:'Từ "bạn không dành thời gian" → "Tôi nhớ khi chúng ta... Tôi muốn lại có điều đó."', advice:'Nói về điều bạn cần — không chỉ điều bạn thiếu.', scoreBonus:5 }},
            { id:'A2', text:'Né tránh nhiều hơn vì áp lực', effect:{comm:-15,bond:-15,control:-10},
              result:{ short:'Vòng lặp tiêu cực hình thành', insight:'Than phiền → né → cô đơn → than phiền nhiều hơn. Cần phá vòng.', long:'Để phá vòng: Một người thay đổi cách tiếp cận trước.', advice:'Câu nói dùng "tôi" hiệu quả hơn câu dùng "bạn".', scoreBonus:-15 }},
          ]
        }
      },
      { id:'B', text:'Chủ động tạo thời gian, rủ làm gì đó cùng', effect:{comm:15,bond:15,empathy:5},
        result:{ short:'Gần nhau hơn dần từng ngày', insight:'Tạo thời gian chung là hành động của tình yêu.', long:'"Hẹn hò" định kỳ mỗi tuần giữ kết nối hiệu quả hơn kế hoạch lớn.', advice:'Đừng chờ đợi người kia tự nhận ra — hãy mời.', scoreBonus:25 }},
      { id:'C', text:'Mặc kệ, tự lo một mình', effect:{comm:-15,bond:-15,control:-5},
        result:{ short:'Xa nhau dần, lạnh nhạt', insight:'Rút lui là cơ chế tự bảo vệ — nhưng thường kết thúc trong im lặng.', long:'Rút lui đang nói: "Tôi đã mệt với việc cố gắng." Hãy nói thành lời.', advice:'Nói ra cảm xúc dù sợ — vẫn tốt hơn im lặng đến chết.', scoreBonus:-15 }},
    ]
  },
];

// ── LOCAL STORAGE ──
function getDB(){
  try{ return JSON.parse(localStorage.getItem('hthn_db')) || []; }
  catch(e){ return []; }
}
function saveDB(users){
  try{ localStorage.setItem('hthn_db', JSON.stringify(users)); }
  catch(e){ showToast('Lỗi lưu dữ liệu!'); }
}

// ── STATE ──
let state = {
  view: 'dashboard',
  currentUser: null,
  activeScenarios: [],
  si: 0,
  node: null,
  currentScoreObj: { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 },
  tempResult: null,
  tempTimeStart: 0,
};

let radarChartObj = null;
let pieChartObj = null;

const $ = id => document.getElementById(id);

function showToast(msg){
  const t = $('toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}
function clamp(v, mn, mx){ return Math.min(mx, Math.max(mn, v)); }
function formatDate(iso){
  if(!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// Register Plugin
if (window.ChartDataLabels) {
    Chart.register(ChartDataLabels);
}

// ── RESTORE SESSION ──
try{
  const s = sessionStorage.getItem('hthn_user');
  if(s) state.currentUser = JSON.parse(s);
}catch(e){}

// ── ROUTER ──
function renderApp(){
  const app = $('app');
  if(state.view === 'login')   { app.innerHTML = renderLogin();    return; }
  if(state.view === 'register'){ app.innerHTML = renderRegister(); return; }

  const authBtn = state.currentUser
    ? `<button class="nav-btn logout" onclick="doLogout()">Đăng Xuất</button>`
    : `<button class="nav-btn" style="color:var(--accent-purple);border:1px solid rgba(168,85,247,.3)" onclick="changeView('login')">Đăng Nhập</button>`;

  app.innerHTML = `
    <div class="app-wrapper">
      <nav class="top-nav fade-in">
        <div class="nav-inner">
          <div class="nav-brand" onclick="changeView('dashboard')">🔥 HT.HON NHAN</div>
          <div class="nav-menu">
            <button class="nav-btn ${state.view==='dashboard'?'active':''}" onclick="changeView('dashboard')">Trang Chủ</button>
            <button class="nav-btn ${state.view==='finance'?'active':''}" onclick="changeView('finance')">Công Cụ Tài Chính</button>
            <button class="nav-btn ${state.view==='profile'?'active':''}" onclick="requireAuth('profile')">Hồ Sơ & Nhật Ký</button>
            ${authBtn}
          </div>
        </div>
      </nav>
      <main class="main-content">${renderMain()}</main>
    </div>`;

  if(state.view==='dashboard') setTimeout(drawDashboardRadar, 100);
  if(state.view==='result')    setTimeout(drawResultRadar, 100);
  if(state.view==='finance')   { calcFinance(); setTimeout(initPieChart, 100); }
}

function renderMain(){
  if(state.view==='dashboard') return renderDashboard();
  if(state.view==='scenario')  return renderScenario();
  if(state.view==='result')    return renderResult();
  if(state.view==='finance')   return renderFinance();
  if(state.view==='profile')   return renderProfile();
  return '';
}

function changeView(v){ state.view = v; renderApp(); }
function requireAuth(v){
  if(!state.currentUser){ showToast('Vui lòng đăng nhập!'); changeView('login'); }
  else changeView(v);
}

// ── 1. AUTH ──
function renderLogin(){
  return `
    <div class="auth-container fade-in">
      <div class="auth-box">
        <h2>Đăng Nhập</h2>
        <div class="form-group"><label>Tài khoản (Email/SĐT)</label><input type="text" id="l_contact" placeholder="email@example.com"></div>
        <div class="form-group"><label>Mật khẩu</label><input type="password" id="l_pass" placeholder="••••••••"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="doLogin()">VÀO HỆ THỐNG</button>
        <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="changeView('dashboard')">🏠 Về Trang Chủ</button>
        <div class="auth-link" style="margin-top:20px">Chưa có tài khoản? <span onclick="changeView('register')">Đăng ký ngay</span></div>
      </div>
    </div>`;
}

function renderRegister(){
  return `
    <div class="auth-container fade-in">
      <div class="auth-box">
        <h2>Tạo Tài Khoản</h2>
        <div class="form-group"><label>Họ và Tên</label><input type="text" id="r_name" placeholder="Nguyễn Văn A"></div>
        <div class="form-group"><label>Email / SĐT</label><input type="text" id="r_contact" placeholder="email@example.com"></div>
        <div class="form-group"><label>Mật khẩu</label><input type="password" id="r_pass" placeholder="••••••••"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="doRegister()">HOÀN TẤT</button>
        <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="changeView('dashboard')">🏠 Về Trang Chủ</button>
        <div class="auth-link" style="margin-top:20px">Đã có tài khoản? <span onclick="changeView('login')">Đăng nhập</span></div>
      </div>
    </div>`;
}

// ── 2. DASHBOARD ──
function renderDashboard(){
  const isGuest = !state.currentUser;
  const name      = isGuest ? 'Khách' : state.currentUser.name;
  const score     = isGuest ? 0       : state.currentUser.score;
  const joinDate  = isGuest ? formatDate(new Date().toISOString()) : formatDate(state.currentUser.createdAt);

  return `
    <div class="fade-in">
      <div class="card dash-welcome">
        <div class="welcome-left">
          <div style="font-size:2.5rem;margin-bottom:.5rem">👋</div>
          <h1 style="font-size:1.5rem;margin-bottom:.5rem;color:var(--text-title)">Xin chào, ${name}!</h1>
          <p style="color:var(--text-muted);margin-bottom:1.2rem;font-weight:600">Bạn đã sẵn sàng cho bài tập hôm nay chưa?</p>
          <button class="btn btn-primary" onclick="startModule('emotion')">BẮT ĐẦU BÀI TẬP ➔</button>
        </div>
        <div class="radar-container"><canvas id="dashRadar"></canvas></div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-purple)">${score}</div>
          <div class="stat-label">Tổng Điểm</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-green)">${SCENARIOS.length}</div>
          <div class="stat-label">Tình Huống</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-orange);font-size:1.2rem;line-height:2.6rem">${joinDate}</div>
          <div class="stat-label">Ngày Tham Gia</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">⚙️ CHỌN CHỦ ĐỀ MÔ PHỎNG</div>
        <div class="modules-grid">
          ${MODULES.map(m=>{
            const cnt = SCENARIOS.filter(s=>s.module===m.id).length;
            return `
              <div class="module-card" onclick="startModule('${m.id}')">
                <div class="mc-icon" style="color:${m.color}">${m.icon}</div>
                <div class="mc-title" style="color:var(--text-title)">${m.name}</div>
                <div class="mc-count">${cnt} Tình huống</div>
                <button class="btn btn-outline" style="width:100%">⊙ Bắt Đầu</button>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function drawDashboardRadar(){
  const ctx = $('dashRadar'); if(!ctx) return;
  if(radarChartObj){ radarChartObj.destroy(); radarChartObj=null; }
  const st = (state.currentUser && state.currentUser.stats)
    ? state.currentUser.stats
    : { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  const hasPlayed = state.currentUser && state.currentUser.history && state.currentUser.history.length > 0;
  const vals = hasPlayed
    ? [st.reason,st.empathy,st.control,st.comm,st.finance,st.bond]
    : [0,0,0,0,0,0];
  _drawRadar(ctx, vals);
}

function drawResultRadar(){
  const ctx = $('resRadar'); if(!ctx) return;
  if(radarChartObj){ radarChartObj.destroy(); radarChartObj=null; }
  const sc = state.currentScoreObj;
  const vals = [
    clamp(50+sc.reason,0,100), clamp(50+sc.empathy,0,100),
    clamp(50+sc.control,0,100), clamp(50+sc.comm,0,100),
    clamp(50+sc.finance,0,100), clamp(50+sc.bond,0,100),
  ];
  _drawRadar(ctx, vals);
}

function _drawRadar(ctx, dataVals){
  const labels = ['Lý trí','Thấu cảm','Kiềm chế','Giao tiếp','Tài chính','Gắn kết'];
  radarChartObj = new Chart(ctx, {
    type:'radar',
    data:{
      labels,
      datasets:[{
        data: dataVals,
        backgroundColor:'rgba(225,29,72,0.15)',
        borderColor:'rgba(225,29,72,0.8)',
        borderWidth:2,
        pointBackgroundColor:'rgba(245,158,11,1)',
        pointBorderColor:'#fff',
        pointBorderWidth:2,
        pointRadius:5,
      }]
    },
    options:{
      layout:{ padding:35 },
      scales:{
        r:{
          angleLines:{ color:'rgba(225,29,72,0.15)' },
          grid:{ color:'rgba(225,29,72,0.15)' },
          ticks:{ display:false, max:100, min:0 },
          pointLabels:{
            color:'#fda4af',
            font:{ size:12, family:'Nunito', weight:'900' },
            padding:12,
            callback:(label,i)=>[label, dataVals[i]>0?`${dataVals[i]}%`:''],
          }
        }
      },
      plugins:{
        legend:{ display:false },
        datalabels:{ display:false },
      },
      maintainAspectRatio:false,
    }
  });
}

// ── 3. SCENARIO ──
function startModule(moduleId){
  if(!state.currentUser){ showToast('Vui lòng đăng nhập để bắt đầu!'); changeView('login'); return; }
  state.activeScenarios = SCENARIOS.filter(s=>s.module===moduleId);
  if(!state.activeScenarios.length){ showToast('Chủ đề đang cập nhật!'); return; }
  state.si = 0; state.node = null;
  state.currentScoreObj = { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  state.tempTimeStart = Date.now();
  changeView('scenario');
}

function nextScenarioInModule(){
  state.si++;
  state.node = null;
  state.currentScoreObj = { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  state.tempTimeStart = Date.now();
  changeView('scenario');
}

function renderScenario(){
  const s    = state.activeScenarios[state.si];
  const node = state.node || s;

  // Reached a result leaf
  if(node.result){
    state.tempResult = {
      ...node.result,
      bonus:     node.result.scoreBonus !== undefined ? node.result.scoreBonus : 10,
      timeTaken: Math.round((Date.now() - state.tempTimeStart) / 1000),
    };
    // Use setTimeout so DOM doesn't flicker
    setTimeout(()=>changeView('result'), 50);
    return `<div style="text-align:center;padding:50px;font-size:1.2rem;font-weight:700;color:var(--accent-purple)">⏳ Đang phân tích kết quả...</div>`;
  }

  const total = state.activeScenarios.length;
  return `
    <div class="fade-in scenario-box">
      <div class="card" style="padding:0;overflow:hidden">
        <div class="scenario-header">
          <button class="btn btn-outline" onclick="changeView('dashboard')">❮ Về Trang Chủ</button>
          <div class="sh-title">TÌNH HUỐNG ${state.si+1}/${total}: ${s.title}</div>
          <div style="width:110px"></div>
        </div>
        <div style="padding:1.5rem">
          <div class="context-box">
            <div class="c-label" style="color:var(--accent-purple)">▶ BỐI CẢNH:</div>
            <div class="c-text">${s.context || s.desc || ''}</div>
            <div class="c-question">💬 ${node.question || node.desc || s.question || 'Bạn sẽ làm gì?'}</div>
          </div>
          <div class="c-label" style="color:var(--accent-green);margin-bottom:.75rem">▶ LỰA CHỌN:</div>
          <div class="choices-container">
            ${(node.choices||[]).map(c=>`
              <div class="choice-item" onclick='pickChoice(${JSON.stringify(c).replace(/'/g,"&#39;")})'>
                <div class="choice-letter">${c.id}</div>
                <div class="choice-text">${c.text}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function pickChoice(c){
  // Accumulate score effects
  const sc = state.currentScoreObj;
  const e  = c.effect || {};
  sc.reason  += e.reason  || 0;
  sc.empathy += e.empathy || 0;
  sc.control += e.control || 0;
  sc.comm    += e.comm    || 0;
  sc.finance += e.finance || 0;
  sc.bond    += e.bond    || 0;

  // Navigate tree: result leaf or next branch
  if(c.result){
    state.node = { result: c.result };
  } else if(c.next){
    state.node = c.next;
  } else {
    // No next defined — treat as result with default
    state.node = { result:{ short:'Lựa chọn đã ghi nhận.', insight:'', long:'', advice:'', scoreBonus: e.reason+e.empathy+e.control+e.comm+e.finance+e.bond } };
  }
  renderApp();
}

// ── 4. RESULT ──
function renderResult(){
  const res   = state.tempResult || {};
  const bonus = res.bonus || 0;

  // Save to user — guard against double-save
  if(!res._saved && state.currentUser){
    res._saved = true;
    const u = state.currentUser;
    u.score = (u.score||0) + Math.max(0, bonus);
    u.stats.reason  = clamp((u.stats.reason  || 50) + state.currentScoreObj.reason,  0, 100);
    u.stats.empathy = clamp((u.stats.empathy || 50) + state.currentScoreObj.empathy, 0, 100);
    u.stats.control = clamp((u.stats.control || 50) + state.currentScoreObj.control, 0, 100);
    u.stats.comm    = clamp((u.stats.comm    || 50) + state.currentScoreObj.comm,    0, 100);
    u.stats.finance = clamp((u.stats.finance || 50) + state.currentScoreObj.finance, 0, 100);
    u.stats.bond    = clamp((u.stats.bond    || 50) + state.currentScoreObj.bond,    0, 100);
    if(!u.history) u.history = [];
    u.history.unshift({
      scene:   state.activeScenarios[state.si]?.title || '',
      outcome: res.short || '',
      bonus,
      time:    (res.timeTaken||0) + 's',
      date:    new Date().toISOString(),
    });
    updateUser(u);
  }

  const isLast = state.si >= state.activeScenarios.length - 1;
  const actionBtns = isLast
    ? `<button class="btn btn-outline" style="flex:1" onclick="state.node=null;changeView('scenario')">↻ CHƠI LẠI</button>
       <button class="btn btn-primary" style="flex:2" onclick="changeView('dashboard')">HOÀN THÀNH ➔</button>`
    : `<button class="btn btn-outline" style="flex:1" onclick="state.node=null;changeView('scenario')">↻ CHƠI LẠI</button>
       <button class="btn btn-primary" style="flex:2" onclick="nextScenarioInModule()">TIẾP THEO ➔</button>`;

  const bonusPositive = bonus >= 0;
  return `
    <div class="fade-in scenario-box">
      <div class="card" style="padding:2rem">
        <div class="res-top">
          <div class="res-trophy">🏆</div>
          <div class="res-title">Báo Cáo Kết Quả</div>
        </div>
        <div class="res-row">
          <div class="r-sym" style="color:var(--accent-green);border-color:var(--accent-green)">⭐</div>
          <div class="r-content">
            <h3 style="color:var(--accent-green)">ĐIỂM VẬN DỤNG:</h3>
            <span class="score-badge ${bonusPositive?'':'negative'}">${bonusPositive?'+':''}${bonus} ĐIỂM</span>
            <span style="color:var(--text-muted);font-size:.85rem;margin-left:12px;font-weight:700">⏱ ${res.timeTaken||0}s</span>
          </div>
        </div>
        <div class="res-row">
          <div class="r-sym" style="color:var(--accent-purple);border-color:var(--accent-purple)">👁️</div>
          <div class="r-content">
            <h3 style="color:var(--accent-purple)">GÓC NHÌN TÂM LÝ:</h3>
            <p style="font-weight:700;color:var(--text-title);margin-bottom:6px">${res.insight||''}</p>
            <p>${res.long||''}</p>
          </div>
        </div>
        <div class="res-row" style="border:none">
          <div class="r-sym" style="color:var(--accent-orange);border-color:var(--accent-orange)">💡</div>
          <div class="r-content">
            <h3 style="color:var(--accent-orange)">LỜI KHUYÊN:</h3>
            <p>${res.advice||'Giao tiếp bình tĩnh là chìa khóa hạnh phúc.'}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title" style="justify-content:center">📊 TÁC ĐỘNG TÂM LÝ TÌNH HUỐNG NÀY</div>
        <div class="radar-container" style="width:100%;height:280px"><canvas id="resRadar"></canvas></div>
      </div>
      <div style="display:flex;gap:1rem">${actionBtns}</div>
    </div>`;
}

// ── 5. FINANCE ──
function renderFinance(){
  return `
    <div class="fade-in">
      <div class="fin-header">
        <div class="fin-title">💳 Kế Hoạch Tài Chính Gia Đình</div>
        <button class="btn btn-primary" onclick="showToast('Đã lưu kế hoạch!')">💾 Lưu</button>
      </div>
      <div class="fin-grid">
        <div class="fin-col">
          <div class="fin-card">
            <div class="fin-step-title"><div class="fin-step-icon">📥</div>THU NHẬP HÀNG THÁNG</div>
            <div class="fin-row"><div class="fin-label">👤 Chồng:</div><input type="number" id="fIncH" value="15000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">👤 Vợ:</div><input type="number" id="fIncW" value="12000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-total">TỔNG THU NHẬP: <span id="fTotalInc" style="color:var(--accent-purple)">27.000.000 VND</span></div>
          </div>
          <div class="fin-card">
            <div class="fin-step-title"><div class="fin-step-icon">👛</div>PHÂN BỔ CHI TIÊU</div>
            <div class="fin-row"><div class="fin-label">🏠 Thuê nhà / Trả góp:</div><input type="number" id="fExpR" value="6000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">🍽️ Sinh hoạt (Ăn, điện...):</div><input type="number" id="fExpL" value="9000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">👥 Biếu nội/ngoại & Đám tiệc:</div><input type="number" id="fExpF" value="4000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">💰 Tiết kiệm / Đầu tư:</div><input type="number" id="fExpS" value="8000000" class="fin-input" oninput="calcFinance()"></div>
          </div>
        </div>
        <div class="fin-col">
          <div class="fin-card" style="height:100%">
            <div class="fin-step-title"><div class="fin-step-icon">🥧</div>PHÂN TÍCH & ĐÁNH GIÁ</div>
            <div style="font-size:.78rem;color:var(--text-muted);font-weight:800;margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.5px">Biểu đồ phân bổ</div>
            <div style="height:220px;position:relative;margin-bottom:1.2rem"><canvas id="pieChart"></canvas></div>
            <div class="fin-alert" id="fAlertBox"><span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange);font-weight:700">Đang tính toán...</p></div>
            <div style="font-size:.78rem;font-weight:800;color:var(--accent-purple);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px">Nhận xét:</div>
            <div style="font-size:.9rem;color:var(--text-main);line-height:1.6;font-weight:600" id="fComment">Nhập số liệu để xem phân tích.</div>
          </div>
        </div>
      </div>
    </div>`;
}

function calcFinance(){
  const incH = Number($('fIncH')?.value)||0;
  const incW = Number($('fIncW')?.value)||0;
  const total = incH + incW;
  if($('fTotalInc')) $('fTotalInc').textContent = new Intl.NumberFormat('vi-VN').format(total) + ' VND';

  const essentials = (Number($('fExpR')?.value)||0) + (Number($('fExpL')?.value)||0);
  const wants      = Number($('fExpF')?.value)||0;
  const savings    = Number($('fExpS')?.value)||0;
  const totalExp   = essentials + wants + savings;

  if(pieChartObj){ pieChartObj.data.datasets[0].data=[essentials,wants,savings]; pieChartObj.update(); }

  const alertBox = $('fAlertBox');
  const comment  = $('fComment');
  if(!alertBox||!comment) return;

  const pctSave = total>0?Math.round(savings/total*100):0;
  const pctEss  = total>0?Math.round(essentials/total*100):0;

  if(totalExp > total){
    alertBox.style.borderColor='var(--accent-red)'; alertBox.style.background='rgba(225,29,72,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">🛑</span><p style="color:var(--accent-red);font-weight:800">Nguy cơ RẤT CAO!</p>`;
    comment.innerHTML=`Thâm hụt <b>${new Intl.NumberFormat('vi-VN').format(totalExp-total)} VND</b>. Áp lực tài chính là nguyên nhân hàng đầu của mâu thuẫn hôn nhân.`;
  } else if(pctSave>=20){
    alertBox.style.borderColor='var(--accent-green)'; alertBox.style.background='rgba(16,185,129,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">✅</span><p style="color:var(--accent-green);font-weight:800">An toàn tài chính!</p>`;
    comment.innerHTML=`Chi sinh hoạt: <b>${pctEss}%</b> · Tiết kiệm: <b>${pctSave}%</b>. Quản lý rất tốt — nền tảng ổn định cho hôn nhân!`;
  } else {
    alertBox.style.borderColor='var(--accent-orange)'; alertBox.style.background='rgba(245,158,11,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange);font-weight:800">Nguy cơ trung bình.</p>`;
    comment.innerHTML=`Chi sinh hoạt: <b>${pctEss}%</b> · Tiết kiệm chỉ <b>${pctSave}%</b>. Khuyến nghị tăng quỹ dự phòng lên tối thiểu 20%.`;
  }
}

function initPieChart(){
  const ctx = $('pieChart'); if(!ctx) return;
  if(pieChartObj){ pieChartObj.destroy(); pieChartObj=null; }
  const essentials = (Number($('fExpR')?.value)||0)+(Number($('fExpL')?.value)||0);
  const wants      = Number($('fExpF')?.value)||0;
  const savings    = Number($('fExpS')?.value)||0;
  pieChartObj = new Chart(ctx, {
    type:'doughnut',
    data:{
      labels:['Sinh hoạt','Ngoại giao / Dự phòng','Tiết kiệm'],
      datasets:[{ data:[essentials,wants,savings], backgroundColor:['#0284c7','#e11d48','#059669'], borderWidth:0 }]
    },
    options:{
      plugins:{
        legend:{ position:'bottom', labels:{ color:'#94a3b8', font:{ family:'Nunito',size:12,weight:'bold' } } },
        datalabels:{
          color:'#fff', font:{ weight:'bold',size:13,family:'Nunito' },
          formatter:(value,ctx)=>{
            const sum = ctx.chart.data.datasets[0].data.reduce((a,b)=>a+b,0);
            return (sum===0||value===0)?'':Math.round(value*100/sum)+'%';
          }
        }
      },
      maintainAspectRatio:false, cutout:'55%', layout:{ padding:10 }
    }
  });
  calcFinance();
}

// ── 6. PROFILE ──
function renderProfile(){
  const u = state.currentUser;
  const history = u.history||[];
  let pos=0,neg=0;
  history.forEach(h=>{ if(h.bonus>=0) pos++; else neg++; });
  const total = history.length||1;
  const posPct = Math.round(pos/total*100);
  const negPct = 100-posPct;

  const rows = history.length===0
    ? `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:1.5rem">Chưa có dữ liệu. Hãy thử một tình huống!</td></tr>`
    : history.map(h=>`
      <tr>
        <td style="color:var(--text-title);font-weight:800">${h.scene}</td>
        <td>${h.outcome}</td>
        <td style="color:${h.bonus>=0?'var(--accent-green)':'var(--accent-red)'};font-weight:900">${h.bonus>=0?'+'+h.bonus:h.bonus}</td>
        <td style="color:var(--text-muted)">${h.time}</td>
      </tr>`).join('');

  return `
    <div class="fade-in">
      <div class="card">
        <div class="card-title">👤 HỒ SƠ & THIẾT LẬP</div>
        <div class="profile-grid">
          <div class="form-group"><label>Mã định danh</label><input type="text" value="${u.id}" readonly style="opacity:.6"></div>
          <div class="form-group"><label>Ngày Tạo</label><input type="text" value="${formatDate(u.createdAt)}" readonly style="opacity:.6"></div>
          <div class="form-group"><label>Họ Tên</label><input type="text" id="p_name" value="${u.name}"></div>
          <div class="form-group"><label>Liên hệ</label><input type="text" id="p_contact" value="${u.contact}"></div>
          <div class="form-group"><label>Mật khẩu mới</label><input type="password" id="p_pass" value="${u.password}"></div>
        </div>
        <div style="text-align:right"><button class="btn btn-primary" onclick="saveProfile()">LƯU THAY ĐỔI</button></div>
      </div>
      <div class="card">
        <div class="card-title" style="justify-content:space-between;flex-wrap:wrap;gap:.5rem">
          <span>📒 NHẬT KÝ RA QUYẾT ĐỊNH</span>
          <span style="font-size:.82rem;color:var(--text-main);font-weight:800">
            Tích cực: <span style="color:var(--accent-green)">${history.length===0?0:posPct}%</span> &nbsp;|&nbsp;
            Tiêu cực: <span style="color:var(--accent-red)">${history.length===0?0:negPct}%</span>
          </span>
        </div>
        <table class="diary-table">
          <thead><tr><th>Tình huống</th><th>Hệ quả</th><th>Điểm</th><th>Tốc độ</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ── AUTH LOGIC ──
function doRegister(){
  const name    = $('r_name')?.value.trim();
  const contact = $('r_contact')?.value.trim();
  const pass    = $('r_pass')?.value.trim();
  if(!name||!contact||!pass){ showToast('Vui lòng điền đủ thông tin!'); return; }
  const db = getDB();
  if(db.find(u=>u.contact===contact)){ showToast('Tài khoản đã tồn tại!'); return; }
  const user = {
    id: 'UID'+Math.floor(Math.random()*1e6), name, contact, password:pass,
    score:0,
    stats:{ reason:50, empathy:50, control:50, comm:50, finance:50, bond:50 },
    history:[],
    createdAt: new Date().toISOString(),
  };
  db.push(user); saveDB(db);
  state.currentUser = user;
  sessionStorage.setItem('hthn_user', JSON.stringify(user));
  changeView('dashboard'); showToast('Đăng ký thành công! 🎉');
}

function doLogin(){
  const contact = $('l_contact')?.value.trim();
  const pass    = $('l_pass')?.value.trim();
  if(!contact||!pass){ showToast('Vui lòng nhập đủ thông tin!'); return; }
  const db   = getDB();
  const user = db.find(u=>u.contact===contact && u.password===pass);
  if(!user){ showToast('Sai thông tin đăng nhập!'); return; }
  // Migration guard
  if(!user.stats||user.stats.reason===undefined)
    user.stats = { reason:50, empathy:50, control:50, comm:50, finance:50, bond:50 };
  if(!user.history) user.history = [];
  state.currentUser = user;
  sessionStorage.setItem('hthn_user', JSON.stringify(user));
  changeView('dashboard'); showToast('Đăng nhập thành công! 👋');
}

function doLogout(){
  state.currentUser = null;
  sessionStorage.removeItem('hthn_user');
  changeView('dashboard');
  showToast('Đã đăng xuất.');
}

function saveProfile(){
  const name    = $('p_name')?.value.trim();
  const contact = $('p_contact')?.value.trim();
  const pass    = $('p_pass')?.value.trim();
  if(!name||!contact||!pass){ showToast('Không được để trống!'); return; }
  state.currentUser.name = name;
  state.currentUser.contact = contact;
  state.currentUser.password = pass;
  updateUser(state.currentUser);
  showToast('Đã lưu hồ sơ!');
}

function updateUser(u){
  const db  = getDB();
  const idx = db.findIndex(x=>x.id===u.id);
  if(idx!==-1){ db[idx]=u; saveDB(db); }
  sessionStorage.setItem('hthn_user', JSON.stringify(u));
  state.currentUser = u;
}

// ── INIT ──
renderApp();