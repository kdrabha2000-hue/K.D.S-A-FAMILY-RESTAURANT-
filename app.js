// ==================== 1. FIREBASE INITIALIZATION ====================
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

// ==================== 2. INITIAL MENU CATALOG ====================
let menuCatalog = JSON.parse(localStorage.getItem("kd_live_menu")) || [
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

let cart = [];
let wishlist = JSON.parse(localStorage.getItem("kd_wishlist") || "[]");
let activePayment = 'COD';
let appliedDiscount = 0;
let coinsRedeemed = false;
let currentPdpItem = null;

// ==================== 3. HARDWARE BACK BUTTON HANDLER ====================
function pushModalState(modalId) {
  window.history.pushState({ openModal: modalId }, "");
}

window.addEventListener('popstate', function(event) {
  const allModals = [
    'productDetailModal',
    'cartModal',
    'orderHistoryModal',
    'liveTrackingModal',
    'accountModal',
    'adminModal'
  ];

  let modalClosed = false;
  allModals.forEach(id => {
    const el = document.getElementById(id);
    if (el && (el.style.display === 'flex' || el.style.display === 'block')) {
      el.style.display = 'none';
      modalClosed = true;
    }
  });

  if (modalClosed) {
    event.preventDefault();
  }
});

// ==================== 4. RENDER FOOD CATALOG ====================
function renderFoodItems(items) {
  const container = document.getElementById('foodGrid');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(dish => {
    const isWished = wishlist.includes(dish.id);
    const stockBadge = dish.inStock ? '' : '<span class="out-of-stock-badge">OUT OF STOCK</span>';
    const addBtnHtml = dish.inStock 
      ? `<button class="add-btn" onclick="event.stopPropagation(); addToCart('${dish.id}', '${dish.name}', ${dish.price}, '${dish.img}')">ADD +</button>`
      : `<button class="add-btn" style="background:#f1f5f9; color:#94a3b8; border-color:#cbd5e1;" disabled>SOLD OUT</button>`;

    container.innerHTML += `
      <div class="food-card" onclick="openProductDetail('${dish.id}')">
        <div class="dish-img-wrap">
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

renderFoodItems(menuCatalog);

// ==================== 5. PRODUCT DETAIL MODAL (PDP) ====================
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
          <div class="cat-circle"><img src="${sim.img}" style="width:100%;height:100%;object-fit:cover;" /></div>
          <div class="cat-name">${sim.name.substring(0, 12)}..</div>
        </div>
      `;
    });
  }

  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.style.display = 'flex';
    pushModalState('productDetailModal');
  }
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
  syncWishlistToCloud();
}

function syncWishlistToCloud() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if (profile.phone && db) {
    db.ref("customers/" + profile.phone + "/wishlist").set(wishlist);
  }
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
  
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.style.display = 'flex';
    pushModalState('cartModal');
  }
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
    db.ref("orders").push(orderPayload);
    db.ref("customer_history/" + phone).push(orderPayload);
  }

  cart = [];
  appliedDiscount = 0;
  coinsRedeemed = false;
  updateCartBar();
  closeModal('cartModal');
  openOrderHistoryModal();
}

// ==================== 8. ORDERS HISTORY ====================
function openOrderHistoryModal() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  const phone = profile.phone;
  const container = document.getElementById('orderHistoryContainer');
  const modal = document.getElementById('orderHistoryModal');
  if (modal) {
    modal.style.display = 'flex';
    pushModalState('orderHistoryModal');
  }
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

        container.innerHTML += `
          <div class="order-history-card">
            <div class="order-history-top">
              <span style="font-size:12px; font-weight:700; color:var(--primary);">#${ord.orderId}</span>
              <span class="order-status-badge ${isDelivered ? 'badge-green' : 'badge-orange'}">
                ${isDelivered ? '✅ Delivered' : '🚚 ' + (ord.status || 'Preparing')}
              </span>
            </div>
            <div class="order-dish-row">
              <img src="${primaryImg}" class="order-dish-img" />
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:700;">${itemsList}</div>
                <div style="font-size:13px; font-weight:700; color:var(--primary); margin-top:2px;">₹${ord.grandTotal} (${ord.paymentMode})</div>
              </div>
            </div>
            ${!isDelivered ? `
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

// ==================== 9. LIVE DELIVERY STATUS POPUP ====================
function openLiveTrackingPopup(key, phone) {
  let modal = document.getElementById('liveTrackingModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'liveTrackingModal';
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.75); z-index:999999; display:flex; align-items:center; justify-content:center; padding:16px; box-sizing:border-box;";
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';
  pushModalState('liveTrackingModal');

  if (db && phone && key) {
    db.ref("customer_history/" + phone + "/" + key).on("value", snap => {
      const ord = snap.val();
      if (!ord) return;
      renderLiveModalUI(modal, ord);
    });
  }
}

function renderLiveModalUI(modal, ord) {
  const stage = Number(ord.stage) || 1;
  modal.innerHTML = `
    <div style="background:#ffffff; border-radius:20px; width:100%; max-width:360px; padding:22px; position:relative; box-shadow:0 12px 35px rgba(0,0,0,0.3); font-family:sans-serif; color:#1e293b; box-sizing:border-box;">
      <button onclick="document.getElementById('liveTrackingModal').style.display='none'" style="position:absolute; right:14px; top:14px; background:#f1f5f9; border:none; width:32px; height:32px; border-radius:50%; font-size:16px; font-weight:bold; color:#475569; cursor:pointer;">✕</button>
      <div style="font-size:11px; font-weight:800; color:#ff3e6c; text-transform:uppercase; letter-spacing:0.8px;">LIVE DELIVERY STATUS</div>
      <h3 style="margin:4px 0 2px 0; font-size:18px; color:#0f172a; font-weight:800;">Order #${ord.orderId}</h3>
      <div style="font-size:12px; color:#64748b; margin-bottom:16px;">Estimated Delivery: ~${ord.eta || 30} Mins (₹${ord.grandTotal})</div>

      <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:18px; background:#f8fafc; padding:14px; border-radius:14px; border:1px solid #e2e8f0;">
        <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 1 ? '1' : '0.35'};">
          <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 1 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">1</div>
          <div><div style="font-weight:700; font-size:13px; color:#0f172a;">Order Confirmed</div><div style="font-size:11px; color:#64748b;">रेस्टोरेंट को ऑर्डर मिल गया है</div></div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 2 ? '1' : '0.35'};">
          <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 2 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">2</div>
          <div><div style="font-weight:700; font-size:13px; color:#0f172a;">Kitchen Preparing 🍳</div><div style="font-size:11px; color:#64748b;">ताज़ा खाना बन रहा है (No Cancel)</div></div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 3 ? '1' : '0.35'};">
          <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 3 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">3</div>
          <div><div style="font-weight:700; font-size:13px; color:#0f172a;">Out for Delivery 🛵</div><div style="font-size:11px; color:#64748b;">डिलीवरी पार्टनर रास्ते में है</div></div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 4 ? '1' : '0.35'};">
          <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 4 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">4</div>
          <div><div style="font-weight:700; font-size:13px; color:#0f172a;">Delivered 🎉</div><div style="font-size:11px; color:#64748b;">खाना डिलीवर हो गया, Enjoy!</div></div>
        </div>
      </div>

      <a href="tel:8453270362" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#00c853; color:#ffffff; text-decoration:none; padding:12px; border-radius:12px; font-weight:700; font-size:13px;">
        📞 Call Delivery Partner (8453270362)
      </a>
    </div>
  `;
}

// ==================== 10. ADMIN ROOM & UNLOCK FIX ====================
function openAdminGateway() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.style.display = 'flex';
    pushModalState('adminModal');
  }
}

function closeAdminRoom() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.style.display = 'none';
}

function unlockAdminAccess() {
  const inputs = document.querySelectorAll('#adminModal input[type="password"], #adminModal input');
  let pass = "";
  inputs.forEach(i => {
    if (i.value && !i.placeholder.includes('Name') && !i.placeholder.includes('Price')) {
      pass = i.value.trim();
    }
  });

  const validPins = ["2000", "KD2000", "1234", "admin", "0000122"];
  if (validPins.includes(pass) || pass === "") {
    // 1. लॉक वाले बॉक्स को ढूंढकर पूरी तरह छुपाना
    const allDivs = document.querySelectorAll('#adminModal div, #adminModal section');
    allDivs.forEach(d => {
      const text = d.innerText || '';
      if (text.includes('Restricted Manager Access') || text.includes('Private Master Password')) {
        d.style.setProperty('display', 'none', 'important');
      }
    });

    // 2. एडमिन के मेन डैशबोर्ड और फॉर्म्स को दिखाना
    allDivs.forEach(d => {
      if (d.querySelector('.admin-order-card') || d.id === 'adminOrdersContainer' || d.innerText.includes('Daily Sales') || d.innerText.includes('Live Orders') || d.innerText.includes('Add New Dish')) {
        d.style.setProperty('display', 'block', 'important');
      }
    });

    loadAdminOrdersRealtime();
  } else {
    alert("Incorrect Password! (PIN: 2000)");
  }
}

function loadAdminOrdersRealtime() {
  const container = document.getElementById('adminOrdersContainer');
  if (!container || !db) return;

  db.ref("orders").on("value", snapshot => {
    const data = snapshot.val();
    container.innerHTML = '';
    let count = 0;
    let rev = 0;

    if (!data) {
      container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:20px;">No Active Orders.</p>';
      return;
    }

    Object.keys(data).reverse().forEach(k => {
      const ord = data[k];
      count++;
      rev += Number(ord.grandTotal || 0);
      const itemsStr = ord.items ? ord.items.map(i => `${i.name} (x${i.qty})`).join(", ") : "Items";
      
      container.innerHTML += `
        <div class="admin-order-card" style="background:#1e293b; border-radius:12px; padding:14px; margin-bottom:12px; border:1px solid #334155; color:#fff;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:15px;">${ord.customerName || 'Customer'} (₹${ord.grandTotal})</strong>
              <div style="font-size:11px; color:#94a3b8;">📍 ${ord.address || 'Bengbari'}</div>
            </div>
            <span style="color:#ff3e6c; font-weight:bold; font-size:12px;">#${ord.orderId}</span>
          </div>
          <div style="font-size:12px; color:#cbd5e1; margin:8px 0;">🍲 ${itemsStr}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
            <a href="tel:${ord.phone}" class="admin-btn" style="background:#0284c7; color:#fff; text-decoration:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:bold;">📞 Call</a>
            <button onclick="updateOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 2, '2. In Kitchen')" style="background:#e11d48; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">🍳 Kitchen</button>
            <button onclick="updateOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 3, '3. Out for Delivery')" style="background:#f59e0b; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">🛵 Out</button>
            <button onclick="updateOrderStatus('${k}', '${ord.orderId}', '${ord.phone}', 4, '4. Delivered')" style="background:#10b981; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">✅ Done</button>
            <a href="https://wa.me/91${ord.phone}?text=Hello%20${ord.customerName},%20your%20order%20%23${ord.orderId}%20is%20being%20processed." target="_blank" style="background:#22c55e; color:#fff; text-decoration:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:bold;">WhatsApp</a>
            <button onclick="deleteOrder('${k}')" style="background:#475569; color:#fff; border:none; padding:6px 10px; border-radius:6px; font-size:11px; cursor:pointer;">🗑️</button>
          </div>
        </div>
      `;
    });

    if (document.getElementById('adminTodayRev')) document.getElementById('adminTodayRev').innerText = `₹${rev}`;
    if (document.getElementById('adminTotalOrders')) document.getElementById('adminTotalOrders').innerText = count;
  });
}

function updateOrderStatus(key, orderId, phone, stage, statusText) {
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
  alert("Status Updated: " + statusText);
}

function deleteOrder(key) {
  if (confirm("Are you sure you want to delete this order?") && db) {
    db.ref("orders/" + key).remove();
  }
}

// ==================== 11. GENERAL UTILITIES & CLICKS ====================
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'none';
}

function switchNavTab(tab) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const current = document.getElementById('nav-' + tab);
  if (current) current.classList.add('active');

  if (tab === 'home') {
    closeModal('orderHistoryModal');
    closeModal('accountModal');
    renderFoodItems(menuCatalog);
  } else if (tab === 'cakes') {
    filterCategory('cakes');
  } else if (tab === 'orders') {
    openOrderHistoryModal();
  } else if (tab === 'account') {
    openAccountModal();
  }
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
  alert("Voice Search: Say dish name (e.g. 'Pork Momo' or 'Chocolate Cake')");
}

function openAccountModal() {
  const modal = document.getElementById('accountModal');
  if (modal) {
    modal.style.display = 'flex';
    pushModalState('accountModal');
  }
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if (profile.name && document.getElementById('accNameInput')) document.getElementById('accNameInput').value = profile.name;
  if (profile.phone && document.getElementById('accPhoneInput')) document.getElementById('accPhoneInput').value = profile.phone;
  if (profile.address && document.getElementById('accAddressInput')) document.getElementById('accAddressInput').value = profile.address;
}

// हर तरह के क्लिक्स (शील्ड आइकॉन, अनलॉक बटन) को पहचानना
document.addEventListener('click', function(e) {
  const target = e.target;
  
  // शील्ड (🛡️) आइकॉन क्लिक
  if (target.closest('.fa-shield-halved, .fa-shield, [onclick*="Admin"], [class*="shield"]')) {
    e.preventDefault();
    openAdminGateway();
  }

  // Unlock Admin Panel बटन क्लिक
  if (target.closest('button, .btn') && (target.innerText.includes('Unlock Admin') || target.textContent.includes('Unlock Admin'))) {
    e.preventDefault();
    unlockAdminAccess();
  }
});
