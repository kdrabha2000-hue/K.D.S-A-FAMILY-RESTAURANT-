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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 2. Initial Menu Catalog
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
let currentActiveOrder = null;
let selectedCakeWeight = 1.0;
let selectedCakePrice = 850;
let appliedDiscount = 0;
let coinsRedeemed = false;
let currentPdpItem = null;
let adminUploadBase64 = "";

// 3. Render Food Catalog (Customer UI)
function renderFoodItems(items) {
  const container = document.getElementById('foodGrid');
  if(!container) return;
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

// 4. Product Detail Page (PDP)
function openProductDetail(dishId) {
  const dish = menuCatalog.find(d => d.id === dishId);
  if(!dish) return;
  currentPdpItem = dish;

  document.getElementById('pdpImg').src = dish.img;
  document.getElementById('pdpTitle').innerText = dish.name;
  document.getElementById('pdpPrice').innerText = `₹${dish.price}`;
  document.getElementById('pdpMrp').innerText = `₹${dish.mrp || (dish.price + 50)}`;
  
  const isWished = wishlist.includes(dish.id);
  const wishBtn = document.getElementById('pdpWishBtn');
  if(isWished) wishBtn.classList.add('active');
  else wishBtn.classList.remove('active');

  const similarContainer = document.getElementById('similarDishesScroll');
  similarContainer.innerHTML = '';
  menuCatalog.filter(d => d.cat === dish.cat && d.id !== dish.id).slice(0, 5).forEach(sim => {
    similarContainer.innerHTML += `
      <div class="cat-item" onclick="openProductDetail('${sim.id}')">
        <div class="cat-circle"><img src="${sim.img}" style="width:100%;height:100%;object-fit:cover;" /></div>
        <div class="cat-name">${sim.name.substring(0, 12)}..</div>
      </div>
    `;
  });

  document.getElementById('productDetailModal').style.display = 'flex';
}

function toggleCurrentWish() {
  if(!currentPdpItem) return;
  toggleCardWish(currentPdpItem.id);
  const btn = document.getElementById('pdpWishBtn');
  btn.classList.toggle('active');
}

function toggleCardWish(id, el) {
  const idx = wishlist.indexOf(id);
  if(idx > -1) {
    wishlist.splice(idx, 1);
    if(el) el.classList.remove('active');
  } else {
    wishlist.push(id);
    if(el) el.classList.add('active');
  }
  localStorage.setItem("kd_wishlist", JSON.stringify(wishlist));
  syncWishlistToCloud();
}

function syncWishlistToCloud() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if(profile.phone) {
    db.ref("customers/" + profile.phone + "/wishlist").set(wishlist);
  }
}

function selectDishVariant(type, extra, el) {
  document.querySelectorAll('#pdpVariantBox .weight-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  if(currentPdpItem) {
    document.getElementById('pdpPrice').innerText = `₹${currentPdpItem.price + extra}`;
  }
}

function addPdpToCart() {
  if(!currentPdpItem) return;
  addToCart(currentPdpItem.id, currentPdpItem.name, currentPdpItem.price, currentPdpItem.img);
  closeModal('productDetailModal');
}

function buyNowPdp() {
  if(!currentPdpItem) return;
  addToCart(currentPdpItem.id, currentPdpItem.name, currentPdpItem.price, currentPdpItem.img);
  closeModal('productDetailModal');
  openCartModal();
}

function shareCurrentItem() {
  if(navigator.share && currentPdpItem) {
    navigator.share({ title: currentPdpItem.name, text: `Check out ${currentPdpItem.name} at S&A Restaurant!`, url: window.location.href });
  } else {
    alert("Link copied to clipboard!");
  }
}

// 5. Cart Operations
function addToCart(id, name, price, img) {
  const existing = cart.find(i => i.id === id);
  if(existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1, img: img || "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500" });
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
  const coinDiscount = coinsRedeemed ? 20 : 0;
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount);

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
  if(savedProfile.name) document.getElementById('custName').value = savedProfile.name;
  if(savedProfile.phone) document.getElementById('custPhone').value = savedProfile.phone;
  if(savedProfile.address) document.getElementById('custAddress').value = savedProfile.address;

  const coinDiscount = coinsRedeemed ? 20 : 0;
  document.getElementById('billSubtotal').innerText = `₹${subtotal}`;
  document.getElementById('billGrandTotal').innerText = `₹${Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount)}`;
  document.getElementById('cartModal').style.display = 'flex';
}

function setPaymentMethod(method) {
  activePayment = method;
  document.getElementById('codBtn').style.background = (method === 'COD') ? 'var(--primary)' : '#f1f5f9';
  document.getElementById('codBtn').style.color = (method === 'COD') ? '#fff' : 'var(--dark)';
  document.getElementById('upiBtn').style.background = (method === 'UPI') ? 'var(--primary)' : '#f1f5f9';
  document.getElementById('upiBtn').style.color = (method === 'UPI') ? '#fff' : 'var(--dark)';
  document.getElementById('upiQrBox').style.display = (method === 'UPI') ? 'block' : 'none';
}

function toggleCoinRedemption() {
  coinsRedeemed = document.getElementById('redeemCoinsCheck').checked;
  document.getElementById('coinsDiscountRow').style.display = coinsRedeemed ? 'flex' : 'none';
  updateCartBar();
  openCartModal();
}

function applyDiscountCoupon() {
  const code = document.getElementById('couponCodeInput').value.trim().toUpperCase();
  if(code === "KD50" || code === "WELCOME") {
    appliedDiscount = 50;
    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('billDiscount').innerText = `-₹50`;
    alert("🎉 Promo Code Applied: ₹50 Discount!");
    updateCartBar();
    openCartModal();
  } else {
    alert("Invalid Promo Code. Try 'KD50'");
  }
}

// 6. Place Order & Permanent Cloud Sync
function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if(!name || !phone || !address) {
    alert("Please fill Name, Phone and Complete Delivery Address.");
    return;
  }

  localStorage.setItem("kd_cust_profile", JSON.stringify({ name, phone, address }));

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const coinDiscount = coinsRedeemed ? 20 : 0;
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount - coinDiscount);

  const orderPayload = {
    orderId: "KD" + Math.floor(100000 + Math.random() * 900000),
    customerName: name,
    phone: phone,
    address: address,
    items: cart,
    grandTotal: grandTotal,
    paymentMode: activePayment,
    status: "1. Order Confirmed",
    stage: 1,
    eta: 30,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };

  const newOrderRef = db.ref("orders").push(orderPayload);
  db.ref("customer_history/" + phone).push(orderPayload);

  newOrderRef.then(() => {
    currentActiveOrder = orderPayload;
    cart = [];
    appliedDiscount = 0;
    coinsRedeemed = false;
    updateCartBar();
    closeModal('cartModal');
    openOrderHistoryModal();
  });
}

// 7. Orders History
function openOrderHistoryModal() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  const phone = profile.phone;
  const container = document.getElementById('orderHistoryContainer');
  container.innerHTML = '<p style="text-align:center; color:var(--gray); margin-top:20px;">Fetching your orders history from cloud...</p>';
  document.getElementById('orderHistoryModal').style.display = 'flex';

  if(!phone) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 0;">
        <i class="fa-solid fa-user-lock" style="font-size:36px; color:#cbd5e1; margin-bottom:10px;"></i>
        <p style="font-size:13px; color:var(--gray);">Please save your mobile number in Account tab to view your order history.</p>
        <button class="admin-btn btn-primary" style="margin-top:12px;" onclick="closeModal('orderHistoryModal'); switchNavTab('account');">Open Account</button>
      </div>
    `;
    return;
  }

  db.ref("customer_history/" + phone).on("value", snapshot => {
    const data = snapshot.val();
    container.innerHTML = '';

    if(!data) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 0;">
          <i class="fa-solid fa-box-open" style="font-size:36px; color:#cbd5e1; margin-bottom:8px;"></i>
          <p style="font-size:13px; color:var(--gray);">No orders found for +91 ${phone}</p>
        </div>
      `;
    } else {
      Object.keys(data).reverse().forEach(key => {
        const ord = data[key];
        const primaryImg = (ord.items && ord.items[0] && ord.items[0].img) ? ord.items[0].img : "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500";
        const itemsList = ord.items ? ord.items.map(i => `${i.name} (x${i.qty})`).join(", ") : "Items";
        const dateStr = ord.timestamp ? new Date(ord.timestamp).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Recent";
        const isDelivered = ord.stage === 4 || (ord.status && ord.status.includes("Delivered"));

        container.innerHTML += `
          <div class="order-history-card">
            <div class="order-history-top">
              <div>
                <span style="font-size:12px; font-weight:700; color:var(--primary);">#${ord.orderId}</span>
                <span style="font-size:11px; color:var(--gray); margin-left:6px;">${dateStr}</span>
              </div>
              <span class="order-status-badge ${isDelivered ? 'badge-green' : 'badge-orange'}">
                ${isDelivered ? '✅ Delivered' : '🚚 ' + (ord.status || 'Preparing')}
              </span>
            </div>

            <div class="order-dish-row">
              <img src="${primaryImg}" class="order-dish-img" />
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:700; color:var(--dark);">${itemsList}</div>
                <div style="font-size:13px; font-weight:700; color:var(--primary); margin-top:2px;">₹${ord.grandTotal} (${ord.paymentMode})</div>
              </div>
            </div>

            ${!isDelivered ? `
              <div style="background:#fef2f2; border:1px solid #fee2e2; padding:8px 12px; border-radius:8px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:600; color:var(--primary);"><i class="fa-solid fa-stopwatch"></i> Estimated Arrival: ~${ord.eta || 25} Mins</span>
                <button class="add-btn" onclick="openLiveTrackingPopup('${key}', '${phone}')">Live Track 📍</button>
              </div>
            ` : `
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:12px; color:var(--gray);">
                <span>Rate Food: ⭐⭐⭐⭐⭐</span>
                <span style="color:var(--green); font-weight:600;">Delivered at Bengbari</span>
              </div>
            `}

            <div style="display:flex; gap:8px; justify-content:flex-end;">
              <a href="tel:8453270362" class="add-btn" style="text-decoration:none; background:#f1f5f9; color:var(--dark); border-color:#cbd5e1;">📞 Call Help</a>
              <button class="add-btn" onclick="reorderItems('${key}', '${phone}')">🔄 Reorder</button>
            </div>
          </div>
        `;
      });
    }
  });
}

// ==================== 8. LIVE DELIVERY STATUS POPUP (FIXED) ====================
function openLiveTrackingPopup(key, phone) {
  let modal = document.getElementById('liveTrackingModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'liveTrackingModal';
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.75); z-index:999999; display:flex; align-items:center; justify-content:center; padding:16px; box-sizing:border-box;";
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';

  db.ref("customer_history/" + phone + "/" + key).on("value", snap => {
    const ord = snap.val();
    if(!ord) return;
    const stage = Number(ord.stage) || 1;

    modal.innerHTML = `
      <div style="background:#ffffff; border-radius:20px; width:100%; max-width:360px; padding:22px; position:relative; box-shadow:0 12px 35px rgba(0,0,0,0.3); font-family:sans-serif; color:#1e293b; box-sizing:border-box;">
        <button onclick="document.getElementById('liveTrackingModal').style.display='none'" style="position:absolute; right:14px; top:14px; background:#f1f5f9; border:none; width:32px; height:32px; border-radius:50%; font-size:16px; font-weight:bold; color:#475569; cursor:pointer;">✕</button>
        
        <div style="font-size:11px; font-weight:800; color:#ff3e6c; text-transform:uppercase; letter-spacing:0.8px;">LIVE ORDER STATUS</div>
        <h3 style="margin:4px 0 2px 0; font-size:18px; color:#0f172a; font-weight:800;">Order #${ord.orderId}</h3>
        <div style="font-size:12px; color:#64748b; margin-bottom:16px;">Estimated Delivery: ~${ord.eta || 30} Mins (₹${ord.grandTotal})</div>

        <!-- 4 Step Live Tracker -->
        <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:18px; background:#f8fafc; padding:14px; border-radius:14px; border:1px solid #e2e8f0;">
          
          <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 1 ? '1' : '0.35'};">
            <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 1 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">1</div>
            <div>
              <div style="font-weight:700; font-size:13px; color:#0f172a;">Order Confirmed</div>
              <div style="font-size:11px; color:#64748b;">रेस्टोरेंट को ऑर्डर मिल गया है</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 2 ? '1' : '0.35'};">
            <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 2 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">2</div>
            <div>
              <div style="font-weight:700; font-size:13px; color:#0f172a;">Kitchen Preparing 🍳</div>
              <div style="font-size:11px; color:#64748b;">ताज़ा खाना बन रहा है (No Cancel)</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 3 ? '1' : '0.35'};">
            <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 3 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">3</div>
            <div>
              <div style="font-weight:700; font-size:13px; color:#0f172a;">Out for Delivery 🛵</div>
              <div style="font-size:11px; color:#64748b;">डिलीवरी पार्टनर रास्ते में है</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:12px; opacity:${stage >= 4 ? '1' : '0.35'};">
            <div style="width:28px; height:28px; border-radius:50%; background:${stage >= 4 ? '#00c853' : '#cbd5e1'}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">4</div>
            <div>
              <div style="font-weight:700; font-size:13px; color:#0f172a;">Delivered 🎉</div>
              <div style="font-size:11px; color:#64748b;">खाना डिलीवर हो गया, Enjoy!</div>
            </div>
          </div>
        </div>

        <a href="tel:8453270362" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#00c853; color:#ffffff; text-decoration:none; padding:12px; border-radius:12px; font-weight:700; font-size:13px;">
          📞 Call Delivery Partner (8453270362)
        </a>
      </div>
    `;
  });
}

function reorderItems(key, phone) {
  db.ref("customer_history/" + phone + "/" + key).once("value", snap => {
    const ord = snap.val();
    if(ord && ord.items) {
      cart = [...ord.items];
      updateCartBar();
      closeModal('orderHistoryModal');
      openCartModal();
    }
  });
}

// ==================== 9. GENERAL UTILITIES & NAVIGATION ====================
function closeModal(id) {
  const m = document.getElementById(id);
  if(m) m.style.display = 'none';
}

function switchNavTab(tab) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const current = document.getElementById('nav-' + tab);
  if(current) current.classList.add('active');

  if(tab === 'home') {
    closeModal('orderHistoryModal');
    closeModal('accountModal');
    renderFoodItems(menuCatalog);
  } else if(tab === 'cakes') {
    filterCategory('cakes');
  } else if(tab === 'orders') {
    openOrderHistoryModal();
  } else if(tab === 'account') {
    openAccountModal();
  }
}

function filterCategory(cat, el) {
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  if(el) el.classList.add('active');
  if(cat === 'all') {
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
  if(modal) modal.style.display = 'flex';
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if(profile.name && document.getElementById('accNameInput')) document.getElementById('accNameInput').value = profile.name;
  if(profile.phone && document.getElementById('accPhoneInput')) document.getElementById('accPhoneInput').value = profile.phone;
  if(profile.address && document.getElementById('accAddressInput')) document.getElementById('accAddressInput').value = profile.address;
}

// ==================== 10. ADMIN STATUS CONTROLLER (FIREBASE) ====================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('button, .btn');
  if (!btn) return;
  const txt = (btn.innerText || '').trim();

  let targetStage = 0;
  let statusText = '';

  if (txt.includes('Kitchen')) {
    targetStage = 2;
    statusText = "2. In Kitchen";
  } else if (txt.includes('Out')) {
    targetStage = 3;
    statusText = "3. Out for Delivery";
  } else if (txt.includes('Done')) {
    targetStage = 4;
    statusText = "4. Delivered";
  }

  if (targetStage > 0) {
    const card = btn.closest('div, li') || document.body;
    const match = (card.innerText || '').match(/KD\d+/i) || (document.body.innerText || '').match(/KD\d+/i);
    const orderId = match ? match[0] : '';

    if (orderId) {
      // 1. All Orders Path
      db.ref("orders").orderByChild("orderId").equalTo(orderId).once("value", snap => {
        snap.forEach(child => {
          child.ref.update({ stage: targetStage, status: statusText });
        });
      });

      // 2. Customer History Path
      db.ref("customer_history").once("value", snap => {
        snap.forEach(userSnap => {
          userSnap.forEach(ordSnap => {
            if (ordSnap.val().orderId === orderId) {
              ordSnap.ref.update({ stage: targetStage, status: statusText });
            }
          });
        });
      });

      alert("Order " + orderId + " updated to: " + statusText);
    }
  }
}, true);
