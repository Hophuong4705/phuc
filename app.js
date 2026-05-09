// ── LOCAL STORAGE DB ──
function getDB() { return JSON.parse(localStorage.getItem('hthn_users_db')) || []; }
function saveDB(users) { localStorage.setItem('hthn_users_db', JSON.stringify(users)); }

let state = {
    view: 'login', // login | register | dashboard | scenario | result | finance | profile
    currentUser: null,
    
    activeScenarios: [], 
    si: 0, 
    node: null, 
    
    currentScoreObj: { trust: 0, conflict: 0, comm: 0, emotion: 0 },
    tempResult: null,
    tempTimeStart: 0
};

let radarChartObj = null;
let pieChartObj = null;

const $ = id => document.getElementById(id);

function showToast(msg) {
    const t = $('toast'); 
    if(!t) return;
    t.textContent = msg; 
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

function clamp(v, min, max) { 
    return Math.min(max, Math.max(min, v)); 
}

function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}

// ── ROUTER MANAGER ──
function renderApp() {
    const app = $('app');
    
    if (!state.currentUser && state.view !== 'register') state.view = 'login';

    if (state.view === 'login') { app.innerHTML = renderLogin(); return; }
    if (state.view === 'register') { app.innerHTML = renderRegister(); return; }

    app.innerHTML = `
        <div class="app-wrapper">
            <nav class="top-nav fade-in">
                <div class="nav-inner">
                    <div class="nav-brand" onclick="changeView('dashboard')">🔥 HT.HON NHAN</div>
                    <div class="nav-menu">
                        <button class="nav-btn ${state.view === 'dashboard' ? 'active' : ''}" onclick="changeView('dashboard')">Bảng Điều Khiển</button>
                        <button class="nav-btn ${state.view === 'finance' ? 'active' : ''}" onclick="changeView('finance')">Công Cụ Tài Chính</button>
                        <button class="nav-btn ${state.view === 'profile' ? 'active' : ''}" onclick="changeView('profile')">Hồ Sơ & Nhật Ký</button>
                        <button class="nav-btn logout" onclick="doLogout()">Đăng Xuất</button>
                    </div>
                </div>
            </nav>
            <main class="main-content">
                ${renderMainContent()}
            </main>
        </div>
    `;

    if (state.view === 'dashboard') setTimeout(drawDashboardRadar, 100);
    if (state.view === 'result') setTimeout(drawResultRadar, 100);
    if (state.view === 'finance') { calcFinance(); setTimeout(initPieChart, 100); }
}

function renderMainContent() {
    if (state.view === 'dashboard') return renderDashboard();
    if (state.view === 'scenario') return renderScenario();
    if (state.view === 'result') return renderResult();
    if (state.view === 'finance') return renderFinance();
    if (state.view === 'profile') return renderProfile();
    return '';
}

function changeView(v) { 
    state.view = v; 
    renderApp(); 
}

// ── 1. AUTH VIEWS ──
function renderLogin() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-box">
                <h2>ĐĂNG NHẬP</h2>
                <div class="form-group"><label>Tài khoản (Email/SĐT)</label><input type="text" id="l_contact"></div>
                <div class="form-group"><label>Mật khẩu</label><input type="password" id="l_pass"></div>
                <button class="btn btn-primary" style="width:100%; margin-top:10px" onclick="doLogin()">VÀO HỆ THỐNG</button>
                <div class="auth-link" style="margin-top:20px">Chưa có tài khoản? <span onclick="changeView('register')">Đăng ký ngay</span></div>
            </div>
        </div>
    `;
}

function renderRegister() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-box">
                <h2>TẠO TÀI KHOẢN</h2>
                <div class="form-group"><label>Họ và Tên</label><input type="text" id="r_name" placeholder="Ví dụ: Nguyễn Jisoo"></div>
                <div class="form-group"><label>Email / SĐT</label><input type="text" id="r_contact"></div>
                <div class="form-group"><label>Mật khẩu</label><input type="password" id="r_pass"></div>
                <button class="btn btn-primary" style="width:100%; margin-top:10px" onclick="doRegister()">HOÀN TẤT</button>
                <div class="auth-link" style="margin-top:20px">Đã có tài khoản? <span onclick="changeView('login')">Đăng nhập</span></div>
            </div>
        </div>
    `;
}

// ── 2. DASHBOARD VIEW ──
function renderDashboard() {
    const u = state.currentUser;
    return `
        <div class="fade-in">
            <div class="card dash-welcome">
                <div class="welcome-left">
                    <div class="welcome-avatar">👋</div>
                    <div>
                        <h1 style="font-size:1.6rem; margin-bottom:8px">Xin chào, ${u.name}!</h1>
                        <p style="color:var(--text-muted)">Năng lực Tâm lý Tổng thể của bạn đang phát triển rất tốt.</p>
                    </div>
                </div>
                <div class="radar-container"><canvas id="dashRadar"></canvas></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-val" style="color:var(--accent-purple)">${u.score}</div>
                    <div class="stat-label">Tổng Điểm Kỹ Năng</div>
                </div>
                <div class="stat-box">
                    <div class="stat-val" style="color:var(--accent-green)">${SCENARIOS.length}</div>
                    <div class="stat-label">Tình Huống Hệ Thống</div>
                </div>
                <div class="stat-box">
                    <div class="stat-val" style="color:var(--accent-orange); font-size: 1.6rem; line-height:2.6rem">${formatDate(u.createdAt)}</div>
                    <div class="stat-label">Ngày Tham Gia</div>
                </div>
            </div>

            <div class="card">
                <div class="card-title">⚙️ CHỌN CHỦ ĐỀ MÔ PHỎNG TÌNH HUỐNG:</div>
                <div class="modules-grid">
                    ${MODULES.map((m) => {
                        const count = SCENARIOS.filter(s => s.module === m.id).length;
                        return `
                        <div class="module-card" onclick="startModule('${m.id}')">
                            <div class="mc-icon" style="color:${m.color}">${m.icon}</div>
                            <div class="mc-title" style="color:var(--text-main)">${m.name}</div>
                            <div class="mc-count">${count} Tình huống</div>
                            <button class="btn btn-outline" style="width:100%">⊙ Bắt Đầu</button>
                        </div>
                        `
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

function drawDashboardRadar() {
    const ctx = $('dashRadar'); 
    if(!ctx) return;
    if(radarChartObj) radarChartObj.destroy();
    
    const st = state.currentUser.stats;
    const hasPlayed = state.currentUser.history && state.currentUser.history.length > 0;
    
    const dataVals = hasPlayed 
        ? [st.trust, 100 - st.conflict, st.comm, st.emotion] 
        : [0, 0, 0, 0];

    radarChartObj = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Lý trí', 'Kiểm soát', 'Giao tiếp', 'Cảm xúc'],
            datasets: [{
                data: dataVals,
                backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: 'rgba(6, 182, 212, 1)',
                borderWidth: 2, pointBackgroundColor: 'rgba(236, 72, 153, 1)', pointRadius: 3
            }]
        },
        options: {
            layout: { padding: 15 },
            scales: { r: { angleLines: {color: 'rgba(255,255,255,0.1)'}, grid: {color: 'rgba(255,255,255,0.1)'}, ticks: {display: false, max: 100, min: 0}, pointLabels: {color: '#94A3B8', font: {size: 11, family: 'Nunito', weight: '700'}} } },
            plugins: { legend: {display: false} }, maintainAspectRatio: false
        }
    });
}

// ── 3. SCENARIO VIEW ──
function startModule(moduleId) {
    state.activeScenarios = SCENARIOS.filter(s => s.module === moduleId);
    if(state.activeScenarios.length === 0) return showToast("Chủ đề đang cập nhật kịch bản!");
    
    state.si = 0; 
    state.node = null;
    state.currentScoreObj = { trust: 0, conflict: 0, comm: 0, emotion: 0 };
    state.tempTimeStart = Date.now();
    changeView('scenario');
}

function nextScenarioInModule() {
    state.si++; 
    state.node = null;
    state.currentScoreObj = { trust: 0, conflict: 0, comm: 0, emotion: 0 };
    state.tempTimeStart = Date.now();
    changeView('scenario');
}

function renderScenario() {
    const s = state.activeScenarios[state.si];
    const node = state.node || s;

    if (node.result) {
        state.tempResult = node.result;
        
        let bonus = 10;
        if (state.node.scoreBonus !== undefined) bonus = state.node.scoreBonus;
        else if (node.result.scoreBonus !== undefined) bonus = node.result.scoreBonus;
        else if (state.currentScoreObj.comm > 0 || state.currentScoreObj.trust > 0) bonus = 15;
        else bonus = -10;
        
        state.tempResult.bonus = bonus;
        state.tempResult.timeTaken = Math.round((Date.now() - state.tempTimeStart) / 1000); 
        
        setTimeout(() => changeView('result'), 50);
        return `<div style="text-align:center; padding:50px; font-size:1.2rem; font-weight:700; color:var(--accent-cyan)">⏳ Đang phân tích kết quả tâm lý...</div>`;
    }

    return `
        <div class="fade-in scenario-box">
            <div class="card" style="padding:0; overflow:hidden">
                <div class="scenario-header">
                    <button class="btn btn-outline" onclick="changeView('dashboard')">❮ Về Trang Chủ</button>
                    <div class="sh-title">TÌNH HUỐNG ${state.si + 1}/${state.activeScenarios.length}: ${s.title}</div>
                    <div style="width: 100px"></div>
                </div>
                <div style="padding: 25px">
                    <div class="context-box">
                        <div class="c-label">▶ BỐI CẢNH THỰC TẾ:</div>
                        <div class="c-text">${s.context || s.desc}</div>
                        <div class="c-question">💬 CÂU HỎI: ${node.desc || node.question || s.question || "Bạn sẽ làm gì?"}</div>
                    </div>
                    <div class="c-label" style="color:var(--accent-green)">▶ LỰA CHỌN CỦA BẠN:</div>
                    <div class="choices-container">
                        ${node.choices.map(c => `
                            <div class="choice-item" onclick='pickChoice(${JSON.stringify(c).replace(/'/g, "&#39;")})'>
                                <div class="choice-letter">${c.id}</div>
                                <div class="choice-text">${c.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function pickChoice(c) {
    if(c.effect) {
        if(c.effect.trust) state.currentScoreObj.trust += c.effect.trust;
        if(c.effect.conflict) state.currentScoreObj.conflict += c.effect.conflict;
        if(c.effect.comm) state.currentScoreObj.comm += c.effect.comm;
        if(c.effect.emotion) state.currentScoreObj.emotion += c.effect.emotion;
    }
    
    let bonus = 10;
    if (c.scoreBonus !== undefined) bonus = c.scoreBonus;
    else if (c.result && c.result.scoreBonus !== undefined) bonus = c.result.scoreBonus;

    state.node = c.result ? { result: c.result, scoreBonus: bonus } : c.next;
    renderApp();
}

// ── 4. RESULT VIEW ──
function renderResult() {
    const res = state.tempResult;
    const bonus = res.bonus || 0;
    
    if(!res.saved) {
        let u = state.currentUser;
        u.score += Math.max(0, bonus); 
        
        u.stats.trust = clamp(u.stats.trust + state.currentScoreObj.trust, 0, 100);
        u.stats.conflict = clamp(u.stats.conflict + state.currentScoreObj.conflict, 0, 100);
        u.stats.comm = clamp(u.stats.comm + state.currentScoreObj.comm, 0, 100);
        u.stats.emotion = clamp(u.stats.emotion + state.currentScoreObj.emotion, 0, 100);
        
        if (!u.history) u.history = [];
        u.history.unshift({
            scene: state.activeScenarios[state.si].title,
            outcome: res.short,
            bonus: bonus,
            time: res.timeTaken + "s",
            date: new Date().toISOString()
        });

        updateUser(u);
        res.saved = true;
    }

    let actionBtns = '';
    if (state.si < state.activeScenarios.length - 1) {
        actionBtns = `
            <button class="btn btn-outline" style="flex:1" onclick="state.node=null; changeView('scenario')">↻ CHƠI LẠI TÌNH HUỐNG</button>
            <button class="btn btn-primary" style="flex:2" onclick="nextScenarioInModule()">TÌNH HUỐNG TIẾP THEO ➔</button>
        `;
    } else {
        actionBtns = `
            <button class="btn btn-outline" style="flex:1" onclick="state.node=null; changeView('scenario')">↻ CHƠI LẠI TÌNH HUỐNG</button>
            <button class="btn btn-primary" style="flex:2" onclick="changeView('dashboard')">HOÀN THÀNH CHỦ ĐỀ ➔</button>
        `;
    }

    return `
        <div class="fade-in scenario-box">
            <div class="card" style="padding: 40px">
                <div class="res-top"><div class="res-trophy">🏆</div><div class="res-title">BÁO CÁO KẾT QUẢ TÌNH HUỐNG</div></div>
                <div class="res-row">
                    <div class="r-sym" style="color:var(--accent-green); border-color:var(--accent-green)">⭐</div>
                    <div class="r-content">
                        <h3 style="color:var(--accent-green)">ĐIỂM VẬN DỤNG KỸ NĂNG:</h3>
                        <div class="score-badge">${bonus >= 0 ? '+' : ''}${bonus} ĐIỂM</div>
                        <span style="color:var(--text-muted); font-size:0.85rem; margin-left:15px">⏱ Tốc độ quyết định: ${res.timeTaken}s</span>
                    </div>
                </div>
                <div class="res-row">
                    <div class="r-sym" style="color:var(--accent-purple); border-color:var(--accent-purple)">👁️</div>
                    <div class="r-content">
                        <h3 style="color:var(--accent-purple)">GÓC NHÌN TÂM LÝ HỌC:</h3>
                        <p style="font-weight:700; color:var(--text-main); margin-bottom:8px">${res.insight}</p>
                        <p>${res.long}</p>
                    </div>
                </div>
                <div class="res-row" style="border:none">
                    <div class="r-sym" style="color:var(--accent-orange); border-color:var(--accent-orange)">💡</div>
                    <div class="r-content">
                        <h3 style="color:var(--accent-orange)">LỜI KHUYÊN:</h3>
                        <p>${res.advice || "Giao tiếp bình tĩnh là chìa khóa của hạnh phúc."}</p>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-title" style="justify-content:center">📊 TÁC ĐỘNG TÂM LÝ TRONG TÌNH HUỐNG NÀY</div>
                <div class="radar-container"><canvas id="resRadar"></canvas></div>
            </div>

            <div style="display:flex; gap:20px">
                ${actionBtns}
            </div>
        </div>
    `;
}

function drawResultRadar() {
    const ctx = $('resRadar'); 
    if(!ctx) return;
    if(radarChartObj) radarChartObj.destroy();
    
    const t = clamp(50 + state.currentScoreObj.trust, 0, 100);
    const cf = clamp(50 + state.currentScoreObj.conflict, 0, 100);
    const cm = clamp(50 + state.currentScoreObj.comm, 0, 100);
    const e = clamp(50 + state.currentScoreObj.emotion, 0, 100);
    
    radarChartObj = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Lý trí / Niềm tin', 'Kiểm soát Bốc đồng', 'Giao tiếp Thấu cảm', 'Trí tuệ Cảm xúc'],
            datasets: [{
                data: [t, 100 - cf, cm, e],
                backgroundColor: 'rgba(139, 92, 246, 0.3)', borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 2, pointBackgroundColor: 'rgba(236, 72, 153, 1)', pointRadius: 4
            }]
        },
        options: {
            layout: { padding: 15 },
            scales: { r: { angleLines: {color: 'rgba(255,255,255,0.1)'}, grid: {color: 'rgba(255,255,255,0.1)'}, ticks: {display: false, max: 100, min: 0}, pointLabels: {color: '#94A3B8', font: {size: 12, family: 'Nunito', weight: '700'}} } },
            plugins: { legend: {display: false} }, maintainAspectRatio: false
        }
    });
}

// ── 5. FINANCE TOOL VIEW ──
function renderFinance() {
    return `
        <div class="fade-in">
            <div class="fin-header">
                <div class="fin-title">CÔNG CỤ: KẾ HOẠCH TÀI CHÍNH GIA ĐÌNH</div>
                <button class="btn btn-outline" style="color:var(--accent-cyan); border-color:var(--accent-cyan)" onclick="showToast('Đã lưu dữ liệu!')">💾 Lưu kế hoạch</button>
            </div>

            <div class="fin-grid">
                <div class="fin-col">
                    <div class="fin-card">
                        <div class="fin-step-title"><div class="fin-step-icon">📥</div> BƯỚC 1: THU NHẬP HÀNG THÁNG</div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box green">👤</div> Chồng:</div><input type="number" id="fIncH" value="15000000" class="fin-input green" oninput="calcFinance()"></div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box purple">👤</div> Vợ:</div><input type="number" id="fIncW" value="12000000" class="fin-input purple" oninput="calcFinance()"></div>
                        <div class="fin-total">TỔNG THU NHẬP: <span id="fTotalInc">27.000.000 VND</span></div>
                    </div>

                    <div class="fin-card" style="margin-bottom:0">
                        <div class="fin-step-title"><div class="fin-step-icon orange">👛</div> BƯỚC 2: PHÂN BỔ CHI TIÊU</div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box orange">🏠</div> Tiền thuê nhà / Trả góp:</div><input type="number" id="fExpR" value="6000000" class="fin-input orange" oninput="calcFinance()"></div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box green">🍽️</div> Sinh hoạt (Ăn, điện...):</div><input type="number" id="fExpL" value="9000000" class="fin-input orange" oninput="calcFinance()"></div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box purple">👥</div> Biếu nội/ngoại & Đám tiệc:</div><input type="number" id="fExpF" value="4000000" class="fin-input orange" oninput="calcFinance()"></div>
                        <div class="fin-row"><div class="fin-label"><div class="fin-icon-box" style="color:var(--accent-blue); background:rgba(6,182,212,0.1)">💰</div> Quỹ tiết kiệm / Đầu tư:</div><input type="number" id="fExpS" value="8000000" class="fin-input orange" oninput="calcFinance()"></div>
                    </div>
                </div>

                <div class="fin-col">
                    <div class="fin-card" style="height:100%; display:flex; flex-direction:column">
                        <div class="fin-step-title"><div class="fin-step-icon" style="background:rgba(16,185,129,0.1); border-color:var(--accent-green); color:var(--accent-green)">🥧</div> BƯỚC 3: PHÂN TÍCH & ĐÁNH GIÁ</div>
                        <div class="fin-right-content">
                            <div>
                                <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:15px; font-weight:700">BIỂU ĐỒ TRÒN (PIE CHART)</div>
                                <div style="height:200px; position:relative"><canvas id="pieChart"></canvas></div>
                            </div>
                            <div>
                                <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px; font-weight:700">CẢNH BÁO TỪ TRỢ LÝ:</div>
                                <div class="fin-alert" id="fAlertBox"><span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange); font-weight:700">Nguy cơ mâu thuẫn trung bình.</p></div>
                                <div style="font-size:0.8rem; font-weight:800; color:var(--accent-cyan); margin-bottom:8px">NHẬN XÉT:</div>
                                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:15px" id="fComment">Đang tính toán...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calcFinance() {
    const incH = Number($('fIncH')?.value) || 0; 
    const incW = Number($('fIncW')?.value) || 0;
    const totalInc = incH + incW;
    
    if($('fTotalInc')) $('fTotalInc').textContent = new Intl.NumberFormat('vi-VN').format(totalInc) + " VND";

    const essentials = (Number($('fExpR')?.value) || 0) + (Number($('fExpL')?.value) || 0);
    const wants = Number($('fExpF')?.value) || 0;
    const savings = Number($('fExpS')?.value) || 0;
    const totalExp = essentials + wants + savings;

    if(pieChartObj) { 
        pieChartObj.data.datasets[0].data = [essentials, wants, savings]; 
        pieChartObj.update(); 
    }

    const alertBox = $('fAlertBox'); 
    const comment = $('fComment');
    
    if(!alertBox || !comment) return;

    if(totalExp > totalInc) {
        alertBox.style.borderColor = "var(--accent-red)"; alertBox.style.background = "rgba(239, 68, 68, 0.05)";
        alertBox.innerHTML = `<span style="font-size:1.5rem">🛑</span><p style="color:var(--accent-red); font-weight:700">Nguy cơ RẤT CAO!</p>`;
        comment.textContent = `Thâm hụt ${new Intl.NumberFormat('vi-VN').format(totalExp - totalInc)} VND. Áp lực lớn dễ sinh cãi vã. Cắt giảm ngay chi tiêu!`;
    } else {
        const pctSave = totalInc > 0 ? Math.round((savings / totalInc) * 100) : 0;
        const pctEss = totalInc > 0 ? Math.round((essentials / totalInc) * 100) : 0;
        if(pctSave >= 20) {
            alertBox.style.borderColor = "var(--accent-green)"; alertBox.style.background = "rgba(16, 185, 129, 0.05)";
            alertBox.innerHTML = `<span style="font-size:1.5rem">✅</span><p style="color:var(--accent-green); font-weight:700">An toàn tài chính.</p>`;
            comment.textContent = `Khoản chi "Sinh hoạt" chiếm ${pctEss}%. Quỹ tiết kiệm đạt ${pctSave}%. Bạn quản lý tiền rất tốt!`;
        } else {
            alertBox.style.borderColor = "var(--accent-orange)"; alertBox.style.background = "rgba(245, 158, 11, 0.05)";
            alertBox.innerHTML = `<span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange); font-weight:700">Nguy cơ trung bình.</p>`;
            comment.textContent = `Khoản chi "Sinh hoạt" chiếm ${pctEss}%. Tuy nhiên, quỹ dự phòng đang khá thấp (chỉ ${pctSave}%).`;
        }
    }
}

function initPieChart() {
    const ctx = $('pieChart'); 
    if (!ctx) return;
    if (pieChartObj) pieChartObj.destroy();
    
    const essentials = (Number($('fExpR')?.value) || 0) + (Number($('fExpL')?.value) || 0);
    const wants = Number($('fExpF')?.value) || 0;
    const savings = Number($('fExpS')?.value) || 0;

    pieChartObj = new Chart(ctx, {
        type: 'doughnut',
        data: { 
            labels: ['Sinh hoạt', 'Dự phòng/Ngoại giao', 'Tiết kiệm'], 
            datasets: [{ 
                data: [essentials, wants, savings], 
                backgroundColor: ['#06B6D4', '#8B5CF6', '#F59E0B'], 
                borderWidth: 0 
            }] 
        },
        options: { 
            plugins: { legend: { position: 'bottom', labels: { color: '#94A3B8', font: { family: 'Nunito', size: 11 } } } }, 
            maintainAspectRatio: false, 
            cutout: '60%', 
            layout: { padding: 10 } 
        }
    });
    calcFinance();
}

// ── 6. PROFILE & DIARY VIEW ──
function renderProfile() {
    const u = state.currentUser;
    const history = u.history || [];
    
    let posCount = 0, negCount = 0;
    history.forEach(h => { if(h.bonus > 0) posCount++; else negCount++; });
    const totalH = history.length || 1;
    const posPct = Math.round((posCount / totalH) * 100);
    const negPct = 100 - posPct;

    const historyRows = history.length === 0 ? `<tr><td colspan="4" style="text-align:center">Chưa có dữ liệu trải nghiệm</td></tr>` 
        : history.map(h => `
            <tr>
                <td style="color:var(--accent-cyan); font-weight:800">${h.scene}</td>
                <td>${h.outcome}</td>
                <td style="color:${h.bonus > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight:800">${h.bonus > 0 ? '+'+h.bonus : h.bonus}</td>
                <td>${h.time}</td>
            </tr>
        `).join('');

    return `
        <div class="fade-in">
            <div class="card">
                <div class="card-title">👤 HỒ SƠ & THIẾT LẬP</div>
                <div class="profile-grid">
                    <div class="form-group"><label>Mã định danh</label><input type="text" value="${u.id}" readonly></div>
                    <div class="form-group"><label>Ngày Tạo</label><input type="text" value="${formatDate(u.createdAt)}" readonly></div>
                    <div class="form-group"><label>Họ Tên</label><input type="text" id="p_name" value="${u.name}"></div>
                    <div class="form-group"><label>Liên hệ</label><input type="text" id="p_contact" value="${u.contact}"></div>
                    <div class="form-group"><label>Mật khẩu</label><input type="password" id="p_pass" value="${u.password}"></div>
                </div>
                <div style="text-align:right"><button class="btn btn-primary" onclick="saveProfile()">LƯU THAY ĐỔI</button></div>
            </div>

            <div class="card">
                <div class="card-title" style="justify-content:space-between">
                    <div>📒 NHẬT KÝ RA QUYẾT ĐỊNH</div>
                    <div style="font-size:0.8rem; color:var(--text-main)">Tích cực: <span style="color:var(--accent-green)">${history.length===0?0:posPct}%</span> | Tiêu cực: <span style="color:var(--accent-red)">${history.length===0?0:negPct}%</span></div>
                </div>
                <table class="diary-table">
                    <thead><tr><th>Tình huống</th><th>Hệ quả chọn</th><th>Điểm</th><th>Thời gian nghĩ</th></tr></thead>
                    <tbody>${historyRows}</tbody>
                </table>
            </div>
        </div>
    `;
}

// ── AUTH LOGIC ──
function doRegister() {
    const name = $('r_name').value.trim(); 
    const contact = $('r_contact').value.trim(); 
    const pass = $('r_pass').value.trim();
    
    if(!name || !contact || !pass) return showToast('Vui lòng điền đủ thông tin!');
    let db = getDB(); 
    if(db.find(u => u.contact === contact)) return showToast('Tài khoản đã tồn tại!');

    const newUser = {
        id: "UID" + Math.floor(Math.random()*100000), 
        name, 
        contact, 
        password: pass,
        score: 0, 
        stats: { trust: 0, conflict: 100, comm: 0, emotion: 0 }, 
        history: [],
        createdAt: new Date().toISOString()
    };
    
    db.push(newUser); 
    saveDB(db);
    
    state.currentUser = newUser; 
    changeView('dashboard'); 
    showToast('Đăng ký thành công!');
}

function doLogin() {
    const contact = $('l_contact').value.trim(); 
    const pass = $('l_pass').value.trim();
    
    if(!contact || !pass) return showToast('Vui lòng nhập đủ thông tin!');
    const user = getDB().find(u => u.contact === contact && u.password === pass);
    if(!user) return showToast('Sai thông tin đăng nhập!');
    
    if(!user.stats) user.stats = { trust: 0, conflict: 100, comm: 0, emotion: 0 };
    if(!user.history) user.history = [];

    state.currentUser = user; 
    changeView('dashboard'); 
    showToast('Đăng nhập thành công!');
}

function doLogout() { 
    state.currentUser = null; 
    changeView('login'); 
}

function saveProfile() {
    const name = $('p_name').value.trim(); 
    const contact = $('p_contact').value.trim(); 
    const pass = $('p_pass').value.trim();
    
    if(!name || !contact || !pass) return showToast('Không được để trống!');
    
    state.currentUser.name = name; 
    state.currentUser.contact = contact; 
    state.currentUser.password = pass;
    
    updateUser(state.currentUser); 
    showToast('Đã lưu hồ sơ!');
}

function updateUser(userObj) {
    let db = getDB(); 
    const index = db.findIndex(u => u.id === userObj.id);
    if(index !== -1) { 
        db[index] = userObj; 
        saveDB(db); 
    }
}

// CHẠY ỨNG DỤNG
renderApp();