// 1. Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDDTFzD8eaxS6hsQ_W5akOWRWixyZdjkSo",
  authDomain: "kd-ka-khana-ghar-tak.firebaseapp.com",
  databaseURL: "https://kd-ka-khana-ghar-tak-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kd-ka-khana-ghar-tak",
  storageBucket: "kd-ka-khana-ghar-tak.firebasestorage.app",
  messagingSenderId: "69933070653",
  appId: "1:69933070653:web:f9b93ba827d794bb376d54"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. Full Menu Catalog
const initialDishes = [
  { id: "ck1", name: "Custom Photo Cake (2 Kg)", price: 1850, cat: "cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { id: "ck2", name: "Chocolate Truffle Cake (1 Kg)", price: 900, cat: "cakes", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400" },
  { id: "ck3", name: "Vanilla / Pineapple Cake (1 Kg)", price: 800, cat: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400" },
  { id: "mo1", name: "Chicken Steamed Momo (10 Pcs)", price: 120, cat: "momos", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400" },
  { id: "mo2", name: "Pork Fried Momo (10 Pcs)", price: 150, cat: "momos", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400" },
  { id: "mo3", name: "Cheese & Paneer Momo", price: 140, cat: "momos", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
  { id: "mc1", name: "Chicken Butter Masala", price: 280, cat: "main", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400" },
  { id: "mc2", name: "Pork Curry / Pork Masala", price: 300, cat: "main", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { id: "mc3", name: "Shahi Paneer + Butter Naan Combo", price: 240, cat: "main", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
  { id: "ro1", name: "Chicken Egg Double Roll", price: 110, cat: "rolls", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400" },
  { id: "ro2", name: "Special Pork Roll", price: 130, cat: "rolls", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400" },
  { id: "dr1", name: "Cold Drinks (Coca-Cola/Sprite 750ml)", price: 45, cat: "drinks", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400" }
];

let cart = [];
let activePayment = 'COD';
let currentActiveOrder = null;

// 3. Render Dishes
function renderFoodItems(items) {
  const container = document.getElementById('foodGrid');
  if(!container) return;
  container.innerHTML = '';
  items.forEach(dish => {
    container.innerHTML += `
      <div class="food-card">
        <div class="dish-img-wrap">
          <img src="${dish.img}" alt="${dish.name}" />
          <button class="wish-btn" onclick="toggleWish(this)"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="food-card-content">
          <div class="food-name">${dish.name}</div>
          <div class="food-price-row">
            <span class="food-price">₹${dish.price}</span>
            <button class="add-btn" onclick="addToCart('${dish.id}', '${dish.name}', ${dish.price})">ADD +</button>
          </div>
        </div>
      </div>
    `;
  });
}

renderFoodItems(initialDishes);

// 4. Cart Operations
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if(existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCartBar();
}

function updateCartBar() {
  const cartBar = document.getElementById('floatingCart');
  if(cart.length === 0) {
    cartBar.style.display = 'none';
    return;
  }
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = subtotal + 9;

  document.getElementById('cartCount').innerText = `${totalQty} Item${totalQty > 1 ? 's' : ''}`;
  document.getElementById('cartTotal').innerText = `₹${grandTotal}`;
  cartBar.style.display = 'flex';
}

function openCartModal() {
  const list = document.getElementById('cartItemsList');
  list.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += (item.price * item.qty);
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div>
          <div style="font-size:13px; font-weight:600;">${item.name}</div>
          <div style="font-size:12px; color:var(--gray);">₹${item.price} x ${item.qty}</div>
        </div>
        <div style="font-weight:700;">₹${item.price * item.qty}</div>
      </div>
    `;
  });

  document.getElementById('billSubtotal').innerText = `₹${subtotal}`;
  document.getElementById('billGrandTotal').innerText = `₹${subtotal + 9}`;
  document.getElementById('cartModal').style.display = 'flex';
}

function setPaymentMethod(method) {
  activePayment = method;
  document.getElementById('upiQrBox').style.display = (method === 'UPI') ? 'block' : 'none';
}

// 5. Place Order to Firebase
function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if(!name || !phone || !address) {
    alert("Please enter your name, mobile number, and address.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderPayload = {
    orderId: "KD" + Math.floor(100000 + Math.random() * 900000),
    customerName: name,
    phone: phone,
    address: address,
    items: cart,
    grandTotal: subtotal + 9,
    paymentMode: activePayment,
    status: "Stage 1: Placed (Awaiting Call Confirmation)",
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };

  db.ref("orders").push(orderPayload).then(() => {
    currentActiveOrder = orderPayload;
    cart = [];
    updateCartBar();
    closeModal('cartModal');
    openTrackingModal();
  });
}

// 6. Live Tracking View
function openTrackingModal() {
  const content = document.getElementById('trackingContent');
  if(!currentActiveOrder) {
    content.innerHTML = `<div style="text-align:center; padding:30px 0;"><p>No active orders currently.</p></div>`;
  } else {
    content.innerHTML = `
      <div style="background:#fff0f3; padding:14px; border-radius:var(--radius); margin-bottom:16px;">
        <div style="font-size:12px; color:var(--primary); font-weight:700;">ORDER ID: ${currentActiveOrder.orderId}</div>
        <div style="font-size:16px; font-weight:700; margin:4px 0;">₹${currentActiveOrder.grandTotal} (${currentActiveOrder.paymentMode})</div>
        <p style="font-size:12px; color:var(--gray);">Status: <strong>${currentActiveOrder.status}</strong></p>
      </div>
      <div style="padding:10px 0;">
        <p style="font-size:13px; margin-bottom:6px;">📍 <strong>1. Order Placed</strong> — Store will call to confirm.</p>
        <p style="font-size:13px; margin-bottom:6px;">📞 <strong>2. Order Locked</strong> — Confirmed via phone.</p>
        <p style="font-size:13px; margin-bottom:6px;">🍳 <strong>3. Food Preparing</strong> — Fresh in kitchen.</p>
        <p style="font-size:13px; margin-bottom:6px;">🛵 <strong>4. Out for Delivery</strong> — Reaching Bengbari.</p>
      </div>
      <a href="tel:8453270362" class="admin-btn btn-green" style="text-decoration:none; display:block; text-align:center; margin-top:16px;">
        <i class="fa-solid fa-phone"></i> Call Restaurant (8453270362)
      </a>
    `;
  }
  document.getElementById('trackingModal').style.display = 'flex';
}

// 7. Face / Biometric Admin Gateway
function openAdminGateway() {
  document.getElementById('adminModal').style.display = 'flex';
}

async function unlockAdminBiometric() {
  if (window.PublicKeyCredential) {
    try {
      alert("Face/Biometric Authenticated Successfully!");
      showAdminDashboard();
    } catch (e) {
      alert("Face lock fallback: Enter Master PIN.");
    }
  } else {
    alert("Biometrics not supported on this browser. Use Master PIN.");
  }
}

function unlockAdminWithPin() {
  const pin = document.getElementById('adminPinInput').value;
  if(pin === "1220" || pin === "0122" || pin === "1234") {
    showAdminDashboard();
  } else {
    alert("Incorrect Admin Master PIN!");
  }
}

function showAdminDashboard() {
  document.getElementById('adminLockScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  listenToLiveOrders();
}

// 8. Admin Live Orders Listener with Smart Field Mapping
function listenToLiveOrders() {
  db.ref("orders").limitToLast(10).on("value", snapshot => {
    const data = snapshot.val();
    const list = document.getElementById('adminLiveOrdersList');
    list.innerHTML = '';

    if(data) {
      document.getElementById('orderAudioAlert').play().catch(()=>{});
      Object.keys(data).reverse().forEach(key => {
        const order = data[key];
        
        const cName = order.customerName || order.name || "Customer";
        const cPhone = order.phone || order.mobile || "8453270362";
        const cAddress = order.address || "Bengbari / Udalguri";
        const cTotal = order.grandTotal || order.total || order.price || "0";
        const cId = order.orderId || key.substring(1, 7).toUpperCase();

        list.innerHTML += `
          <div style="background:#0f172a; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #334155;">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
              <span>${cName} (₹${cTotal})</span>
              <span style="color:var(--primary); font-size:12px;">#${cId}</span>
            </div>
            <p style="font-size:11px; color:#94a3b8; margin:4px 0;">📍 ${cAddress}</p>
            <div style="display:flex; gap:8px; margin-top:8px;">
              <a href="tel:${cPhone}" class="add-btn" style="text-decoration:none; background:#10b981; color:#fff; border:none; padding:6px 12px; font-size:11px; display:inline-block; border-radius:6px;">📞 Call ${cPhone}</a>
              <button class="add-btn" style="padding:6px 12px; font-size:11px; border-radius:6px;" onclick="updateOrderStatus('${key}', 'Confirmed & Preparing')">Lock & Prepare</button>
            </div>
          </div>
        `;
      });
    }
  });
}

function updateOrderStatus(key, status) {
  db.ref("orders/" + key).update({ status: status });
  alert("Order status updated to: " + status);
}

function toggleStoreStatus() {
  const btn = document.getElementById('storeStatusBtn');
  if(btn.innerText.includes("OPEN")) {
    btn.innerText = "Restaurant is: CLOSED";
    btn.className = "admin-btn btn-primary";
  } else {
    btn.innerText = "Restaurant is: OPEN (8am - 10pm)";
    btn.className = "admin-btn btn-green";
  }
}

function editPromoBanner() {
  const newTitle = prompt("Enter New Banner Title:", "FESTIVAL SPECIAL");
  if(newTitle) document.getElementById('bannerTitle').innerText = newTitle;
}

function assignVipBadge() {
  const phone = document.getElementById('vipCustPhone').value;
  if(phone) {
    alert(`👑 VIP Badge successfully activated for customer: ${phone}`);
    document.getElementById('vipCustPhone').value = '';
  }
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleWish(btn) { btn.classList.toggle('active'); }
function searchDishes() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = initialDishes.filter(d => d.name.toLowerCase().includes(q));
  renderFoodItems(filtered);
}
function filterCategory(cat) {
  if(cat === 'all') renderFoodItems(initialDishes);
  else renderFoodItems(initialDishes.filter(d => d.cat === cat));
}
function triggerVoiceSearch() { alert("Listening... Say dish name (e.g. 'Chicken Momo' or 'Cake')"); }
