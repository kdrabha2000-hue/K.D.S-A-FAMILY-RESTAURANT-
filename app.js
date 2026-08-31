// ==================== 1. FIREBASE SETUP ====================
const firebaseConfig = {
  apiKey: "AIzaSyDDTFzD8eaxS6hsQ_W5akOWRWixyZdjkSo",
  authDomain: "kd-ka-khana-ghar-tak.firebaseapp.com",
  databaseURL: "https://kd-ka-khana-ghar-tak-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kd-ka-khana-ghar-tak",
  storageBucket: "kd-ka-khana-ghar-tak.firebasestorage.app",
  messagingSenderId: "69933070653",
  appId: "1:69933070653:web:f9b93ba827d794bb376d54"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

// ==================== LIVE RINGER SETUP ====================
const adminRingerAudio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
adminRingerAudio.loop = true;
let isAudioUnlocked = false;

// Screen par touch hote hi audio unlock
document.addEventListener('click', () => {
  if (!isAudioUnlocked) {
    adminRingerAudio.play().then(() => {
      adminRingerAudio.pause();
      adminRingerAudio.currentTime = 0;
      isAudioUnlocked = true;
    }).catch(() => {});
  }
}, { once: true });

// ==================== 2. MENU DATA & STORAGE ====================
const defaultMenu = [
  { id: "m1", name: "Chicken Steamed Momo (10 Pcs)", price: 120, mrp: 160, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500" },
  { id: "m2", name: "Chicken Fried Momo (10 Pcs)", price: 140, mrp: 180, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500" },
  { id: "m3", name: "Chicken Schezwan Gravy Momo", price: 160, mrp: 200, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500" },
  { id: "m4", name: "Pork Steamed Momo (10 Pcs)", price: 130, mrp: 170, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500" },
  { id: "m5", name: "Pork Fried Momo (10 Pcs)", price: 150, mrp: 190, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500" },
  { id: "m6", name: "Cheese & Veg Momo (10 Pcs)", price: 130, mrp: 160, cat: "momos", inStock: true, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500" },

  { id: "r1", name: "Single Egg Chicken Roll", price: 90, mrp: 120, cat: "rolls", inStock: true, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500" },
  { id: "r2", name: "Double Egg Double Chicken Roll", price: 120, mrp: 150, cat: "rolls", inStock: true, img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500" },
  { id: "r3", name: "Special Pork Roll", price: 130, mrp: 160, cat: "rolls", inStock: true, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500" },
  { id: "r4", name: "Crispy French Fries (Peri-Peri)", price: 80, mrp: 110, cat: "rolls", inStock: true, img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500" },

  { id: "c1", name: "Chicken Butter Masala (Boneless)", price: 280, mrp: 350, cat: "chicken", inStock: true, img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500" },
  { id: "c2", name: "Chicken Curry / Kadhai Chicken", price: 260, mrp: 320, cat: "chicken", inStock: true, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500" },
  { id: "c3", name: "Crispy Chilli Chicken (Dry)", price: 220, mrp: 280, cat: "chicken", inStock: true, img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },

  { id: "p1", name: "Pork Curry with Bamboo Shoot", price: 300, mrp: 380, cat: "pork", inStock: true, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
  { id: "p2", name: "Smoked Pork Dry Fry", price: 320, mrp: 400, cat: "pork", inStock: true, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500" },
  { id: "p3", name: "Pork Bhuna Masala", price: 310, mrp: 390, cat: "pork", inStock: true, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },

  { id: "ct1", name: "Special Chicken Hakka Chowmein", price: 130, mrp: 170, cat: "chow_thukpa", inStock: true, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
  { id: "ct2", name: "Special Pork Chowmein", price: 150, mrp: 190, cat: "chow_thukpa", inStock: true, img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500" },
  { id: "ct3", name: "Hot Chicken Thukpa Soup", price: 140, mrp: 180, cat: "chow_thukpa", inStock: true, img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" },

  { id: "ck1", name: "Chocolate Truffle Cake (1 Kg)", price: 850, mrp: 1100, cat: "cakes", inStock: true, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
  { id: "ck2", name: "Black Forest Cake (1 Kg)", price: 800, mrp: 1000, cat: "cakes", inStock: true, img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500" },
  { id: "ck3", name: "Vanilla / Pineapple Cake (1 Kg)", price: 750, mrp: 950, cat: "cakes", inStock: true, img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500" },

  { id: "dr1", name: "Cold Drinks 750ml (Coke / Sprite)", price: 45, mrp: 50, cat: "drinks", inStock: true, img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
  { id: "dr2", name: "Fresh Sweet Lassi / Cold Coffee", price: 70, mrp: 90, cat: "drinks", inStock: true, img: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500" }
];

let menuCatalog = JSON.parse(localStorage.getItem("kd_live_menu")) || defaultMenu;
let cart = [];
let wishlist = JSON.parse(localStorage.getItem("kd_wishlist") || "[]");
let activePayment = 'COD';
let appliedDiscount = 0;
let coinsRedeemed = false;
let currentPdpItem = null;
let selectedCakeWeight = 1.0;
let selectedCakePrice = 850;
let adminUploadBase64 = "";
let editUploadBase64 = "";

// Firebase Cloud Sync
if (db) {
  db.ref("restaurant_menu").on("value", snapshot => {
    const cloudMenu = snapshot.val();
    if (cloudMenu && Array.isArray(cloudMenu)) {
      menuCatalog = cloudMenu;
      localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
      renderFoodItems(menuCatalog);
      if (document.getElementById('adminDashboard')?.style.display === 'block') {
        renderAdminMenuItems();
      }
    }
  });
}

function saveMenuToStorageAndCloud() {
  localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
  if (db) {
    db.ref("restaurant_menu").set(menuCatalog);
  }
  renderFoodItems(menuCatalog);
  renderAdminMenuItems();
}

// ==================== 3. HARDWARE BACK BUTTON HANDLER ====================
function pushModalState(modalId) {
  window.history.pushState({ openModal: modalId }, "");
}

window.addEventListener('popstate', function(event) {
  const allModals = [
    'productDetailModal',
    'accountModal',
    'orderHistoryModal',
    'trackingModal',
    'wishlistModal',
    'cakeStudioModal',
    'cartModal',
    'adminModal'
  ];

  let modalClosed = false;
  allModals.forEach(id => {
    const el = document.getElementById(id);
    if (el && (el.style.display === 'flex' || el.style.display === 'block')) {
      el.style.setProperty('display', 'none', 'important');
      modalClosed = true;
    }
  });

  if (modalClosed) {
    event.preventDefault();
  }
});

function openModal(id) {
  const m = document.getElementById(id);
  if (m) {
    m.style.setProperty('display', 'flex', 'important');
    pushModalState(id);
  }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) {
    m.style.setProperty('display', 'none', 'important');
  }
}

// ==================== 4. RENDER FOOD CATALOG & SEARCH ====================
function renderFoodItems(items) {
  const container = document.getElementById('foodGrid');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(dish => {
    const isWished = wishlist.includes(dish.id);
    const stockBadge = dish.inStock ? '' : '<span class="out-of-stock-badge" style="position:absolute;top:8px;left:8px;background:#ef4444;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;font-weight:bold;">SOLD OUT</span>';
    const addBtnHtml = dish.inStock 
      ? `<button class="add-btn" onclick="event.stopPropagation(); addToCart('${dish.id}', '${dish.name}', ${dish.price}, '${dish.img}')">ADD +</button>`
      : `<button class="add-btn" style="background:#f1f5f9; color:#94a3b8; border-color:#cbd5e1;" disabled>SOLD OUT</button>`;

    container.innerHTML += `
      <div class="food-card" onclick="openProductDetail('${dish.id}')">
        <div class="dish-img-wrap" style="position:relative;">
          <img src="${dish.img}" alt="${dish.name}" />
          ${stockBadge}
          <button class="card-wish-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleCardWish('${dish.id}', this)"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="food-card-content">
          <div class="food-name">${dish.name}</div>
          <div class="food-price-row">
            <span class="food-price">₹${dish.price}</span>
            ${addBtnHtml}
          </div>
        </div>
      </div>
    `;
  });
}

function searchDishes() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = menuCatalog.filter(d => d.name.toLowerCase().includes(q));
  renderFoodItems(filtered);
}

function filterCategory(cat, el) {
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  if (cat === 'all') {
    renderFoodItems(menuCatalog);
  } else {
    renderFoodItems(menuCatalog.filter(d => d.cat === cat));
  }
}

function triggerVoiceSearch() {
  alert("Voice Search: Say dish name (e.g. 'Pork Momo' or 'Chicken Roll')");
}

// ==================== 5. PRODUCT DETAIL PAGE (PDP) ====================
function openProductDetail(dishId) {
  const dish = menuCatalog.find(d => d.id === dishId);
  if (!dish) return;
  currentPdpItem = dish;

  if (document.getElementById('pdpImg')) document.getElementById('pdpImg').src = dish.img;
  if (document.getElementById('pdpTitle')) document.getElementById('pdpTitle').innerText = dish.name;
  if (document.getElementById('pdpPrice')) document.getElementById('pdpPrice').innerText = `₹${dish.price}`;
  if (document.getElementById('pdpMrp')) document.getElementById('pdpMrp').innerText = `₹${dish.mrp || (dish.price + 50)}`;

  const isWished = wishlist.includes(dish.id);
  const wishBtn = document.getElementById('pdpWishBtn');
  if (wishBtn) {
    if (isWished) wishBtn.classList.add('active');
    else wishBtn.classList.remove('active');
  }

  const similarContainer = document.getElementById('similarDishesScroll');
  if (similarContainer) {
    similarContainer.innerHTML = '';
    menuCatalog.filter(d => d.cat === dish.cat && d.id !== dish.id).slice(0, 5).forEach(sim => {
      similarContainer.innerHTML += `
        <div class="cat-item" onclick="openProductDetail('${sim.id}')">
          <div class="cat-circle"><img src="${sim.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" /></div>
          <div class="cat-name">${sim.name.substring(0, 12)}..</div>
        </div>
      `;
    });
  }

  openModal('productDetailModal');
}

function toggleCurrentWish() {
  if (!currentPdpItem) return;
  toggleCardWish(currentPdpItem.id);
  const btn = document.getElementById('pdpWishBtn');
  if (btn) btn.classList.toggle('active');
}

function toggleCardWish(id, el) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    if (el) el.classList.remove('active');
  } else {
    wishlist.push(id);
    if (el) el.classList.add('active');
  }
  localStorage.setItem("kd_wishlist", JSON.stringify(wishlist));
}

function selectDishVariant(type, extra, el) {
  document.querySelectorAll('#pdpVariantBox .weight-pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  if (currentPdpItem) {
    document.getElementById('pdpPrice').innerText = `₹${currentPdpItem.price + extra}`;
  }
}

function addPdpToCart() {
  if (!currentPdpItem) return;
  addToCart(currentPdpItem.id, currentPdpItem.name, currentPdpItem.price, currentPdpItem.img);
  closeModal('productDetailModal');
}

function buyNowPdp() {
  if (!currentPdpItem) return;
  addToCart(currentPdpItem.id, currentPdpItem.name, currentPdpItem.price, currentPdpItem.img);
  closeModal('productDetailModal');
  openCartModal();
}

function shareCurrentItem() {
  if (navigator.share && currentPdpItem) {
    navigator.share({ title: currentPdpItem.name, text: `Check out ${currentPdpItem.name} at S&A Restaurant!`, url: window.location.href });
  } else {
    alert("Link copied to clipboard!");
  }
}

// ==================== 6. CART OPERATIONS ====================
function addToCart(id, name, price, img) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1, img: img || "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500" });
  }
  updateCartBar();
}

function updateCartBar() {
  const cartBar = document.getElementById('floatingCart');
  if (!cartBar) return;
  if (cart.length === 0) {
    cartBar.style.display = 'none';
    return;
  }
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const coinDiscount = coinsRedeemed ? 20 : 0;
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount);

  if (document.getElementById('cartCount')) document.getElementById('cartCount').innerText = `${totalQty} Item${totalQty > 1 ? 's' : ''}`;
  if (document.getElementById('cartTotal')) document.getElementById('cartTotal').innerText = `₹${grandTotal}`;
  cartBar.style.display = 'flex';
}

function openCartModal() {
  const list = document.getElementById('cartItemsList');
  if (!list) return;
  list.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += (item.price * item.qty);
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #f1f5f9; padding-bottom:6px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${item.img}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;" />
          <div>
            <div style="font-size:13px; font-weight:600;">${item.name}</div>
            <div style="font-size:11px; color:var(--gray);">₹${item.price} x ${item.qty}</div>
          </div>
        </div>
        <div style="font-weight:700;">₹${item.price * item.qty}</div>
      </div>
    `;
  });

  const savedProfile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if (savedProfile.name && document.getElementById('custName')) document.getElementById('custName').value = savedProfile.name;
  if (savedProfile.phone && document.getElementById('custPhone')) document.getElementById('custPhone').value = savedProfile.phone;
  if (savedProfile.address && document.getElementById('custAddress')) document.getElementById('custAddress').value = savedProfile.address;

  const coinDiscount = coinsRedeemed ? 20 : 0;
  if (document.getElementById('billSubtotal')) document.getElementById('billSubtotal').innerText = `₹${subtotal}`;
  if (document.getElementById('billGrandTotal')) document.getElementById('billGrandTotal').innerText = `₹${Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount)}`;

  openModal('cartModal');
}

function setPaymentMethod(method) {
  activePayment = method;
  const cod = document.getElementById('codBtn');
  const upi = document.getElementById('upiBtn');
  const qr = document.getElementById('upiQrBox');
  if (cod) {
    cod.style.background = (method === 'COD') ? 'var(--primary)' : '#f1f5f9';
    cod.style.color = (method === 'COD') ? '#fff' : 'var(--dark)';
  }
  if (upi) {
    upi.style.background = (method === 'UPI') ? 'var(--primary)' : '#f1f5f9';
    upi.style.color = (method === 'UPI') ? '#fff' : 'var(--dark)';
  }
  if (qr) qr.style.display = (method === 'UPI') ? 'block' : 'none';
}

function toggleCoinRedemption() {
  const chk = document.getElementById('redeemCoinsCheck');
  coinsRedeemed = chk ? chk.checked : false;
  const row = document.getElementById('coinsDiscountRow');
  if (row) row.style.display = coinsRedeemed ? 'flex' : 'none';
  updateCartBar();
  openCartModal();
}

function applyDiscountCoupon() {
  const codeEl = document.getElementById('couponCodeInput');
  const code = codeEl ? codeEl.value.trim().toUpperCase() : '';
  if (code === "KD50" || code === "WELCOME") {
    appliedDiscount = 50;
    const dRow = document.getElementById('discountRow');
    const bDisc = document.getElementById('billDiscount');
    if (dRow) dRow.style.display = 'flex';
    if (bDisc) bDisc.innerText = `-₹50`;
    alert("🎉 Promo Code Applied: ₹50 Discount!");
    updateCartBar();
    openCartModal();
  } else {
    alert("Invalid Promo Code. Try 'KD50'");
  }
}

// ==================== 7. PLACE ORDER & LIVE SYNC ====================
function placeOrder() {
  const name = document.getElementById('custName')?.value.trim();
  const phone = document.getElementById('custPhone')?.value.trim();
  const address = document.getElementById('custAddress')?.value.trim();

  if (!name || !phone || !address) {
    alert("Please fill Name, Phone and Complete Delivery Address.");
    return;
  }

  localStorage.setItem("kd_cust_profile", JSON.stringify({ name, phone, address }));

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const coinDiscount = coinsRedeemed ? 20 : 0;
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount);
  const generatedId = "KD" + Math.floor(100000 + Math.random() * 900000);

  const orderPayload = {
    orderId: generatedId,
    customerName: name,
    phone: phone,
    address: address,
    items: cart,
    grandTotal: grandTotal,
    paymentMode: activePayment,
    status: "1. Order Confirmed",
    stage: 1,
    eta: 30,
    timestamp: Date.now()
  };

  if (db) {
    const newOrderRef = db.ref("orders").push();
    newOrderRef.set(orderPayload);
    db.ref("customer_history/" + phone + "/" + newOrderRef.key).set(orderPayload);
  }

  cart = [];
  appliedDiscount = 0;
  coinsRedeemed = false;
  updateCartBar();
  closeModal('cartModal');
  openOrderHistoryModal();
}

// ==================== 8. ORDERS HISTORY & LIVE TRACKING ====================
function openOrderHistoryModal() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  const phone = profile.phone;
  const container = document.getElementById('orderHistoryContainer');
  openModal('orderHistoryModal');

  if (!container) return;
  container.innerHTML = '<p style="text-align:center; color:var(--gray); margin-top:20px;">Fetching orders...</p>';

  if (!phone || !db) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 0;">
        <i class="fa-solid fa-user-lock" style="font-size:36px; color:#cbd5e1; margin-bottom:10px;"></i>
        <p style="font-size:13px; color:var(--gray);">Please save your mobile number in Account tab to view orders.</p>
        <button class="admin-btn btn-primary" style="margin-top:12px;" onclick="closeModal('orderHistoryModal'); switchNavTab('account');">Open Account</button>
      </div>
    `;
    return;
  }

  db.ref("customer_history/" + phone).on("value", snapshot => {
    const data = snapshot.val();
    container.innerHTML = '';

    if (!data) {
      container.innerHTML = `<p style="font-size:13px; color:var(--gray); text-align:center; padding:20px;">No orders found for +91 ${phone}</p>`;
    } else {
      Object.keys(data).reverse().forEach(key => {
        const ord = data[key];
        const primaryImg = (ord.items && ord.items[0] && ord.items[0].img) ? ord.items[0].img : "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500";
        const itemsList = ord.items ? ord.items.map(i => `${i.name} (x${i.qty})`).join(", ") : "Items";
        const isDelivered = ord.stage === 4 || (ord.status && ord.status.includes("Delivered"));
        const isCancelled = ord.stage === 0 || (ord.status && ord.status.includes("Cancelled"));

        let statusBadge = `<span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:6px; background:#fff7ed; color:#c2410c;">🚚 ${ord.status || 'Preparing'}</span>`;
        if (isDelivered) {
          statusBadge = `<span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:6px; background:#dcfce7; color:#15803d;">✅ Delivered</span>`;
        } else if (isCancelled) {
          statusBadge = `<span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:6px; background:#fee2e2; color:#b91c1c;">✖ Cancelled</span>`;
        }

        container.innerHTML += `
          <div class="order-history-card" style="background:#fff; border-radius:12px; padding:12px; margin-bottom:12px; border:1px solid #f1f5f9; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--primary);">#${ord.orderId}</span>
              ${statusBadge}
            </div>
            <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
              <img src="${primaryImg}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;" />
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:700; color:#1e293b;">${itemsList}</div>
                <div style="font-size:12px; font-weight:700; color:var(--primary); margin-top:2px;">₹${ord.grandTotal} (${ord.paymentMode})</div>
              </div>
            </div>
            ${(!isDelivered && !isCancelled) ? `
              <div style="background:#fef2f2; border:1px solid #fee2e2; padding:8px 12px; border-radius:8px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:600; color:var(--primary);">⏱️ ETA: ~${ord.eta || 25} Mins</span>
                <button class="add-btn" onclick="openLiveTrackingPopup('${key}', '${phone}')">Live Track 📍</button>
              </div>
            ` : ''}
          </div>
        `;
      });
    }
  });
}

function openLiveTrackingPopup(key, phone) {
  openModal('trackingModal');
  const content = document.getElementById('trackingContent');
  if (!content) return;

  if (db && phone && key) {
    db.ref("customer_history/" + phone + "/" + key).on("value", snap => {
      const ord = snap.val();
      if (!ord) return;
      const stage = Number(ord.stage) || 1;

      content.innerHTML = `
        <div style="background:#fff0f3; padding:12px 14px; border-radius:12px; margin-bottom:16px;">
          <div style="font-size:12px; color:var(--primary); font-weight:700;">ORDER ID: #${ord.orderId}</div>
          <div style="font-size:16px; font-weight:800; margin:2px 0;">₹${ord.grandTotal} (${ord.paymentMode})</div>
          <div style="font-size:12px; color:var(--gray);">${stage === 0 ? 'Status: Cancelled' : `Estimated Delivery: ~${ord.eta || 30} Mins`}</div>
        </div>

        ${stage === 0 ? `
          <div style="background:#fee2e2; border:1px solid #f87171; border-radius:12px; padding:14px; text-align:center; color:#991b1b; font-weight:700; margin-bottom:16px;">
            ⚠️ This order has been cancelled.
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:20px; background:#f8fafc; padding:14px; border-radius:14px; border:1px solid #e2e8f0;">
            <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 1 ? '1' : '0.35'};">
              <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 1 ? '#00c853' : '#cbd5e1'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;">1</div>
              <div>
                <div style="font-weight:700; font-size:13px; color:#0f172a;">Order Confirmed</div>
                <div style="font-size:11px; color:#64748b;">Restaurant received your order</div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 2 ? '1' : '0.35'};">
              <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 2 ? '#00c853' : '#cbd5e1'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;">2</div>
              <div>
                <div style="font-weight:700; font-size:13px; color:#0f172a;">Kitchen Preparing 🍳</div>
                <div style="font-size:11px; color:#64748b;">Food is freshly cooking (No Cancellation)</div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 3 ? '1' : '0.35'};">
              <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 3 ? '#00c853' : '#cbd5e1'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;">3</div>
              <div>
                <div style="font-weight:700; font-size:13px; color:#0f172a;">Out for Delivery 🛵</div>
                <div style="font-size:11px; color:#64748b;">Delivery partner on the way</div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 4 ? '1' : '0.35'};">
              <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 4 ? '#00c853' : '#cbd5e1'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;">4</div>
              <div>
                <div style="font-weight:700; font-size:13px; color:#0f172a;">Delivered 🎉</div>
                <div style="font-size:11px; color:#64748b;">Enjoy your hot & fresh meal!</div>
              </div>
            </div>
          </div>
        `}

        <a href="tel:8453270362" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#00c853; color:#fff; text-decoration:none; padding:12px; border-radius:10px; font-weight:700; font-size:13px;">
          📞 Call Delivery Partner (8453270362)
        </a>

        ${(stage === 1) ? `
          <button onclick="cancelCustomerCurrentOrder('${key}', '${phone}')" style="width:100%; margin-top:10px; padding:12px; background:#ef4444; color:#fff; border:none; border-radius:10px; font-weight:700; font-size:13px; cursor:pointer;">
            ✖ Cancel Order
          </button>
        ` : ''}
      `;
    });
  }
}

function cancelCustomerCurrentOrder(orderKey, phone) {
  if (confirm("Kya aap sach me apna order cancel karna chahte hain?")) {
    if (db) {
      db.ref("orders/" + orderKey).update({ 
        stage: 0, 
        status: "Cancelled by Customer" 
      });
      if (phone) {
        db.ref("customer_history/" + phone + "/" + orderKey).update({ 
          stage: 0, 
          status: "Cancelled by Customer" 
        });
      }
      alert("Order successfully cancel kar diya gaya hai.");
      closeModal('trackingModal');
    }
  }
}

// ==================== 9. ADMIN PANEL & MASTER PIN UNLOCK ====================
function openAdminGateway() {
  openModal('adminModal');
  const lock = document.getElementById('adminLockScreen');
  const dash = document.getElementById('adminDashboard');
  const pinInput = document.getElementById('adminPinInput');
  if (pinInput) pinInput.value = '';
  if (lock) lock.style.display = 'block';
  if (dash) dash.style.display = 'none';
}

function unlockAdminWithPin() {
  const pinInput = document.getElementById('adminPinInput');
  const pin = pinInput ? pinInput.value.trim() : '';

  // Master Private Password
  const MASTER_KEY = "KD@1234";

  if (pin === MASTER_KEY) {
    // Admin login hote hi browser audio permission unlock
    adminRingerAudio.play().then(() => {
      adminRingerAudio.pause();
      adminRingerAudio.currentTime = 0;
      isAudioUnlocked = true;
    }).catch(e => console.log("Audio unlock failed: ", e));

    const lock = document.getElementById('adminLockScreen');
    const dash = document.getElementById('adminDashboard');
    if (lock) lock.style.display = 'none';
    if (dash) dash.style.display = 'block';

    loadAdminOrdersList();
    renderAdminMenuItems();
  } else {
    alert("Access Denied! Incorrect Password.");
    if (pinInput) pinInput.value = '';
  }
}

function loadAdminOrdersList() {
  const container = document.getElementById('adminLiveOrdersList');
  if (!container || !db) return;

  db.ref("orders").on("value", snapshot => {
    const data = snapshot.val();
    container.innerHTML = '';
    let count = 0;
    let rev = 0;
    let hasPendingOrders = false;

    if (!data) {
      container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:15px;">No active orders.</p>';
      adminRingerAudio.pause();
      adminRingerAudio.currentTime = 0;
      return;
    }

    Object.keys(data).reverse().forEach(k => {
      const ord = data[k];

      // Stage 1 pending order check (Live Ringer ke liye)
      if (Number(ord.stage) === 1) {
        hasPendingOrders = true;
      }

      count++;
      rev += Number(ord.grandTotal || 0);
      const itemsStr = ord.items ? ord.items.map(i => `${i.name} (x${i.qty})`).join(", ") : "Items";
      const isCancelled = Number(ord.stage) === 0;

      container.innerHTML += `
        <div style="background:${isCancelled ? '#2b1d1d' : '#1e293b'}; border-radius:12px; padding:12px; margin-bottom:10px; border:1px solid ${isCancelled ? '#7f1d1d' : '#334155'}; color:#fff;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:14px;">${ord.customerName || 'Customer'} (₹${ord.grandTotal})</strong>
              <div style="font-size:11px; color:#94a3b8;">📍 ${ord.address || 'Bengbari'}</div>
            </div>
            <span style="color:#ff3e6c; font-weight:bold; font-size:12px;">#${ord.orderId}</span>
          </div>
          <div style="font-size:12px; color:#cbd5e1; margin:6px 0;">🍲 ${itemsStr}</div>
          <div style="font-size:11px; margin-bottom:6px; color:${isCancelled ? '#ef4444' : '#38bdf8'}; font-weight:bold;">Status: ${ord.status || 'Pending'}</div>
          
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
            <a href="tel:${ord.phone}" class="admin-btn" style="background:#0284c7; color:#fff; text-decoration:none; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:bold;">📞 Call</a>
            ${!isCancelled ? `
              <button onclick="setAdminOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 2, '2. In Kitchen')" style="background:#e11d48; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">🍳 Kitchen</button>
              <button onclick="setAdminOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 3, '3. Out for Delivery')" style="background:#f59e0b; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">🛵 Out</button>
              <button onclick="setAdminOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 4, '4. Delivered')" style="background:#10b981; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">✅ Done</button>
            ` : ''}
            <button onclick="deleteAdminOrder('${k}')" style="background:#475569; color:#fff; border:none; padding:5px 8px; border-radius:6px; font-size:11px; cursor:pointer;">🗑️</button>
          </div>
        </div>
      `;
    });

    // Ringer trigger logic
    if (hasPendingOrders && isAudioUnlocked) {
      adminRingerAudio.play().catch(e => console.log("Audio play error: ", e));
    } else {
      adminRingerAudio.pause();
      adminRingerAudio.currentTime = 0;
    }

    if (document.getElementById('statTotalSales')) document.getElementById('statTotalSales').innerText = `₹${rev}`;
    if (document.getElementById('statOrderCount')) document.getElementById('statOrderCount').innerText = count;
  });
}

function setAdminOrderStatus(key, orderId, phone, stage, statusText) {
  const updates = { stage: Number(stage), status: statusText };
  if (db) {
    db.ref("orders/" + key).update(updates);
    if (phone) {
      db.ref("customer_history/" + phone).once("value", snap => {
        snap.forEach(child => {
          if (child.val().orderId === orderId) {
            child.ref.update(updates);
          }
        });
      });
    }
  }
}

function deleteAdminOrder(key) {
  if (confirm("Delete this order?") && db) {
    db.ref("orders/" + key).remove();
  }
}

// ==================== 10. MENU EDIT & GALLERY PHOTO UPLOAD ====================
function renderAdminMenuItems() {
  const container = document.getElementById('adminMenuItemsList');
  if (!container) return;
  container.innerHTML = '';

  menuCatalog.forEach((item) => {
    container.innerHTML += `
      <div id="adminDishRow_${item.id}" style="background:#0f172a; border-radius:10px; padding:12px; margin-bottom:10px; border:1px solid #334155; color:#fff;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <img src="${item.img}" style="width:45px; height:45px; border-radius:8px; object-fit:cover; flex-shrink:0;" />
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">${item.name}</div>
            <div style="font-size:12px; color:#38bdf8;">₹${item.price} <span style="font-size:10px; color:#94a3b8;">(${item.cat})</span></div>
          </div>
          <button onclick="openDishEditBox('${item.id}')" style="background:#38bdf8; color:#0f172a; border:none; padding:6px 12px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">✏️ Edit</button>
          <button onclick="toggleDishStock('${item.id}')" style="background:${item.inStock ? '#10b981' : '#ef4444'}; color:#fff; border:none; padding:6px 10px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">${item.inStock ? 'In Stock' : 'Sold Out'}</button>
          <button onclick="deleteMenuItem('${item.id}')" style="background:#475569; color:#fff; border:none; padding:6px 8px; border-radius:6px; font-size:11px; cursor:pointer;">🗑️</button>
        </div>

        <div id="dishEditForm_${item.id}" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed #334155;">
          <label style="font-size:11px; color:#94a3b8;">Dish Name:</label>
          <input type="text" id="editName_${item.id}" value="${item.name}" class="form-input" style="background:#1e293b; color:#fff; border-color:#475569; margin-bottom:8px;" />
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
            <div>
              <label style="font-size:11px; color:#94a3b8;">Price (₹):</label>
              <input type="number" id="editPrice_${item.id}" value="${item.price}" class="form-input" style="background:#1e293b; color:#fff; border-color:#475569;" />
            </div>
            <div>
              <label style="font-size:11px; color:#94a3b8;">Category:</label>
              <select id="editCat_${item.id}" class="form-input" style="background:#1e293b; color:#fff; border-color:#475569;">
                <option value="momos" ${item.cat === 'momos' ? 'selected' : ''}>Momos</option>
                <option value="rolls" ${item.cat === 'rolls' ? 'selected' : ''}>Rolls</option>
                <option value="chicken" ${item.cat === 'chicken' ? 'selected' : ''}>Chicken</option>
                <option value="pork" ${item.cat === 'pork' ? 'selected' : ''}>Pork</option>
                <option value="chow_thukpa" ${item.cat === 'chow_thukpa' ? 'selected' : ''}>Chow/Soup</option>
                <option value="cakes" ${item.cat === 'cakes' ? 'selected' : ''}>Cakes</option>
                <option value="drinks" ${item.cat === 'drinks' ? 'selected' : ''}>Drinks</option>
              </select>
            </div>
          </div>

          <label style="font-size:11px; color:#94a3b8;">Upload New Photo (Gallery / Camera):</label>
          <input type="file" accept="image/*" class="form-input" style="background:#1e293b; color:#fff; border-color:#475569; margin-bottom:6px;" onchange="previewEditImage(this, '${item.id}')" />

          <label style="font-size:11px; color:#94a3b8;">Or Image URL Link:</label>
          <input type="text" id="editImgUrl_${item.id}" value="${item.img}" class="form-input" style="background:#1e293b; color:#fff; border-color:#475569; margin-bottom:10px;" />

          <img id="editPreviewImg_${item.id}" src="${item.img}" style="width:100%; height:110px; object-fit:cover; border-radius:8px; margin-bottom:10px;" />

          <div style="display:flex; gap:8px;">
            <button onclick="saveDishEdits('${item.id}')" class="admin-btn btn-green" style="flex:1;">💾 Save Changes</button>
            <button onclick="closeDishEditBox('${item.id}')" class="admin-btn btn-primary" style="background:#475569; flex:1;">Cancel</button>
          </div>
        </div>
      </div>
    `;
  });
}

function openDishEditBox(id) {
  const box = document.getElementById(`dishEditForm_${id}`);
  if (box) box.style.display = 'block';
}

function closeDishEditBox(id) {
  const box = document.getElementById(`dishEditForm_${id}`);
  if (box) box.style.display = 'none';
}

function previewEditImage(input, id) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      editUploadBase64 = e.target.result;
      const preview = document.getElementById(`editPreviewImg_${id}`);
      if (preview) {
        preview.src = e.target.result;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveDishEdits(id) {
  const item = menuCatalog.find(d => d.id === id);
  if (!item) return;

  const newName = document.getElementById(`editName_${id}`).value.trim();
  const newPrice = Number(document.getElementById(`editPrice_${id}`).value);
  const newCat = document.getElementById(`editCat_${id}`).value;
  const newImgUrl = document.getElementById(`editImgUrl_${id}`).value.trim();

  if (!newName || !newPrice) {
    alert("Please enter valid name and price!");
    return;
  }

  item.name = newName;
  item.price = newPrice;
  item.mrp = newPrice + 40;
  item.cat = newCat;
  item.img = editUploadBase64 || newImgUrl || item.img;

  editUploadBase64 = "";
  saveMenuToStorageAndCloud();
  alert("Dish updated successfully!");
}

function toggleDishStock(id) {
  const item = menuCatalog.find(d => d.id === id);
  if (item) {
    item.inStock = !item.inStock;
    saveMenuToStorageAndCloud();
  }
}

function deleteMenuItem(id) {
  if (confirm("Delete this dish from menu permanently?")) {
    menuCatalog = menuCatalog.filter(d => d.id !== id);
    saveMenuToStorageAndCloud();
  }
}

function adminSaveNewDish() {
  const name = document.getElementById('newDishName').value.trim();
  const price = Number(document.getElementById('newDishPrice').value);
  const cat = document.getElementById('newDishCat').value;
  const imgUrl = document.getElementById('newDishImgUrl').value.trim() || adminUploadBase64 || "https://images.unsplash.com/photo-1544025162-d76694265947?w=500";

  if (!name || !price) {
    alert("Please enter dish name and price.");
    return;
  }

  const newDish = {
    id: "d_" + Date.now(),
    name: name,
    price: price,
    mrp: price + 40,
    cat: cat,
    inStock: true,
    img: imgUrl
  };

  menuCatalog.unshift(newDish);
  saveMenuToStorageAndCloud();
  alert("New dish added to menu!");

  document.getElementById('newDishName').value = '';
  document.getElementById('newDishPrice').value = '';
  document.getElementById('newDishImgUrl').value = '';
  adminUploadBase64 = '';
  const prev = document.getElementById('adminDishPreview');
  if (prev) prev.style.display = 'none';
}

function previewAdminDishUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      adminUploadBase64 = e.target.result;
      const preview = document.getElementById('adminDishPreview');
      if (preview) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function adminCreateCoupon() {
  const code = document.getElementById('newCouponCode').value.trim().toUpperCase();
  const disc = Number(document.getElementById('newCouponDiscount').value);
  if (!code || !disc) {
    alert("Enter promo code and discount!");
    return;
  }
  localStorage.setItem("kd_promo_" + code, disc);
  alert(`Promo code ${code} (₹${disc} OFF) created!`);
  document.getElementById('newCouponCode').value = '';
  document.getElementById('newCouponDiscount').value = '';
}

function toggleStoreStatus() {
  const btn = document.getElementById('storeStatusBtn');
  if (btn.innerText.includes('OPEN')) {
    btn.innerText = "Restaurant is: CLOSED (Currently Offline)";
    btn.style.background = "#ef4444";
  } else {
    btn.innerText = "Restaurant is: OPEN (8am - 10pm)";
    btn.style.background = "#10b981";
  }
}

function editPromoBanner() {
  const newHeading = prompt("Enter new Promo Banner headline:");
  if (newHeading) {
    document.getElementById('bannerTitle').innerText = newHeading;
    localStorage.setItem("kd_banner_title", newHeading);
  }
}

function assignVipBadge() {
  const ph = document.getElementById('vipCustPhone').value.trim();
  if (ph) {
    alert(`Customer +91 ${ph} is now upgraded to VIP Gold Member!`);
    document.getElementById('vipCustPhone').value = '';
  }
}

// ==================== 11. CAKE STUDIO & ACCOUNT ====================
function openCakeStudio() {
  openModal('cakeStudioModal');
}

function selectCakeWeight(weight, price, el) {
  selectedCakeWeight = weight;
  selectedCakePrice = price;
  document.querySelectorAll('#cakeStudioModal .weight-pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
}

function addCustomCakeToCart() {
  const flavor = document.getElementById('cakeFlavorSelect').value;
  const msg = document.getElementById('cakeCustomText').value.trim();
  const cakeTitle = `🎂 Custom Cake: ${flavor} (${selectedCakeWeight} Kg)` + (msg ? ` [Msg: ${msg}]` : '');

  cart.push({
    id: "cake_" + Date.now(),
    name: cakeTitle,
    price: selectedCakePrice,
    qty: 1,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
  });

  updateCartBar();
  closeModal('cakeStudioModal');
  openCartModal();
}

function previewCakeUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const p = document.getElementById('cakePhotoPreview');
      if (p) {
        p.src = e.target.result;
        p.style.display = 'block';
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function openSavedItemsModal() {
  openModal('wishlistModal');
  const container = document.getElementById('wishlistItemsContainer');
  if (!container) return;

  const wishedItems = menuCatalog.filter(d => wishlist.includes(d.id));
  if (wishedItems.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--gray); margin-top:30px;">No saved items in your wishlist.</p>';
  } else {
    container.innerHTML = wishedItems.map(d => `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid #f1f5f9;">
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${d.img}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;" />
          <div>
            <div style="font-size:13px; font-weight:700;">${d.name}</div>
            <div style="font-size:12px; color:var(--primary); font-weight:700;">₹${d.price}</div>
          </div>
        </div>
        <button class="add-btn" onclick="addToCart('${d.id}', '${d.name}', ${d.price}, '${d.img}')">ADD +</button>
      </div>
    `).join('');
  }
}

function saveCustomerAccount() {
  const name = document.getElementById('accInputName')?.value.trim() || '';
  const phone = document.getElementById('accInputPhone')?.value.trim() || '';
  const address = document.getElementById('accInputAddress')?.value.trim() || '';

  if (!phone) {
    alert("Please enter mobile number for sync.");
    return;
  }

  const profile = { name, phone, address };
  localStorage.setItem("kd_cust_profile", JSON.stringify(profile));

  if (document.getElementById('accNameDisplay') && name) document.getElementById('accNameDisplay').innerText = name;
  if (document.getElementById('accPhoneDisplay') && phone) document.getElementById('accPhoneDisplay').innerText = "+91 " + phone;

  if (db) {
    db.ref("customers/" + phone + "/profile").set(profile);
  }

  alert("Account details saved successfully!");
  closeModal('accountModal');
}

function uploadCustomerAvatar(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById('userAvatarImg');
      if (img) img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// ==================== 12. NAVIGATION TABS ====================
function switchNavTab(tab) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  if (tab === 'home') {
    document.getElementById('tabHome')?.classList.add('active');
    closeModal('orderHistoryModal');
    closeModal('accountModal');
    renderFoodItems(menuCatalog);
  } else if (tab === 'cakes') {
    document.getElementById('tabCakes')?.classList.add('active');
    openCakeStudio();
  } else if (tab === 'orders') {
    document.getElementById('tabOrders')?.classList.add('active');
    openOrderHistoryModal();
  } else if (tab === 'account') {
    document.getElementById('tabAccount')?.classList.add('active');
    const saved = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
    if (saved.name && document.getElementById('accInputName')) document.getElementById('accInputName').value = saved.name;
    if (saved.phone && document.getElementById('accInputPhone')) document.getElementById('accInputPhone').value = saved.phone;
    if (saved.address && document.getElementById('accInputAddress')) document.getElementById('accInputAddress').value = saved.address;
    if (saved.name && document.getElementById('accNameDisplay')) document.getElementById('accNameDisplay').innerText = saved.name;
    if (saved.phone && document.getElementById('accPhoneDisplay')) document.getElementById('accPhoneDisplay').innerText = "+91 " + saved.phone;
    openModal('accountModal');
  }
}

// Initial Run
window.addEventListener('DOMContentLoaded', () => {
  renderFoodItems(menuCatalog);
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if (profile.name && document.getElementById('accNameDisplay')) document.getElementById('accNameDisplay').innerText = profile.name;
  if (profile.phone && document.getElementById('accPhoneDisplay')) document.getElementById('accPhoneDisplay').innerText = "+91 " + profile.phone;

  const savedBanner = localStorage.getItem("kd_banner_title");
  if (savedBanner && document.getElementById('bannerTitle')) {
    document.getElementById('bannerTitle').innerText = savedBanner;
  }
});
