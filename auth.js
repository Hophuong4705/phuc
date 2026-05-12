// auth.js
const $ = id => document.getElementById(id);
function showToast(msg) {
    const t = $('toast'); if(!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

function getDB() { return JSON.parse(localStorage.getItem('hthn_users_db_light')) || []; }
function saveDB(users) { localStorage.setItem('hthn_users_db_light', JSON.stringify(users)); }

function doRegister() {
    const name = $('r_name').value.trim(); 
    const contact = $('r_contact').value.trim(); 
    const pass = $('r_pass').value.trim();
    
    if(!name || !contact || !pass) return showToast('Vui lòng điền đủ thông tin!');
    let db = getDB(); 
    if(db.find(u => u.contact === contact)) return showToast('Tài khoản đã tồn tại!');

    const newUser = {
        id: "UID" + Math.floor(Math.random()*100000), 
        name, contact, password: pass,
        score: 0, 
        stats: { reason: 50, empathy: 50, control: 50, comm: 50, finance: 50, bond: 50 }, 
        history: [],
        createdAt: new Date().toISOString()
    };
    
    db.push(newUser); 
    saveDB(db);
    showToast('Đăng ký thành công! Đang chuyển hướng...');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
}

function doLogin() {
    const contact = $('l_contact').value.trim(); 
    const pass = $('l_pass').value.trim();
    
    if(!contact || !pass) return showToast('Vui lòng nhập đủ thông tin!');
    const user = getDB().find(u => u.contact === contact && u.password === pass);
    if(!user) return showToast('Sai thông tin đăng nhập!');
    
    if(!user.stats || user.stats.reason === undefined) user.stats = { reason: 50, empathy: 50, control: 50, comm: 50, finance: 50, bond: 50 };
    if(!user.history) user.history = [];

    // Lưu session đăng nhập vào trình duyệt
    sessionStorage.setItem('hthn_current_user', JSON.stringify(user));
    
    showToast('Đăng nhập thành công!');
    setTimeout(() => { window.location.href = 'index.html'; }, 1000);
}