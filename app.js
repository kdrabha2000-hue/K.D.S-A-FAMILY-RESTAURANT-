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

function openLiveTrackingPopup(key, phone) {
  db.ref("customer_history/" + phone + "/" + key).on("value", snap => {
    const ord = snap.val();
    if(!ord) return;
    const stage = ord.stage || 1;

    const content = document.getElementById('trackingContent');
    content.innerHTML = `
      <div style="background:#fff0f3; padding:14px; border-radius:var(--radius); margin-bottom:16px;">
        <div style="font-size:12px; color:var(--primary); font-weight:700;">ORDER ID: #${ord.orderId}</div>
        <div style="font-size:16px; font-weight:700; margin:4px 0;">₹${ord.grandTotal} (${ord.paymentMode})</div>
        <p style="font-size:12px; color:var(--gray);">Estimated Delivery: <strong>${ord.eta || 25} Minutes</strong></p>
      </div>

      <div class="tracker-box">
        <div class="step-item ${stage >= 1 ? (stage > 1 ? 'done' : 'active') : ''}">
          <div class="step-circle">${stage > 1 ? '✓' : '1'}</div>
          <div class="step-line"></div>
          <div>
            <div style="font-size:13px; font-weight:700;">Order Confirmed</div>
            <div style="font-size:11px; color:var(--gray);">Restaurant received your order</div>
          </div>
        </div>

        <div class="step-item ${stage >= 2 ? (stage > 2 ? 'done' : 'active') : ''}">
          <div class="step-circle">${stage > 2 ? '✓' : '2'}</div>
          <div class="step-line"></div>
          <div>
            <div style="font-size:13px; font-weight:700;">Kitchen Preparing</div>
            <div style="font-size:11px; color:var(--gray);">Food is freshly cooking</div>
          </div>
        </div>

        <div class="step-item ${stage >= 3 ? (stage > 3 ? 'done' : 'active') : ''}">
          <div class="step-circle">${stage > 3 ? '✓' : '3'}</div>
          <div class="step-line"></div>
          <div>
            <div style="font-size:13px; font-weight:700;">Out for Delivery</div>
            <div style="font-size:11px; color:var(--gray);">Delivery partner on the way</div>
          </div>
        </div>

        <div class="step-item ${stage >= 4 ? 'done' : ''}">
          <div class="step-circle">${stage >= 4 ? '✓' : '4'}</div>
          <div>
            <div style="font-size:13px; font-weight:700;">Delivered</div>
            <div style="font-size:11px; color:var(--gray);">Enjoy your hot & fresh meal!</div>
          </div>
        </div>
      </div>

      <a href="tel:8453270362" class="admin-btn btn-green" style="text-decoration:none; display:block; text-align:center; margin-top:16px;">
        <i class="fa-solid fa-phone"></i> Call Delivery Partner (8453270362)
      </a>
    `;
    document.getElementById('trackingModal').style.display = 'flex';
  });
}

function reorderItems(key, phone) {
  db.ref("customer_history/" + phone + "/" + key).once("value", snap => {
    const ord = snap.val();
    if(ord && ord.items) {
      ord.items.forEach(i => {
        addToCart(i.id || "dish_" + Date.now(), i.name, i.price, i.img);
      });
      closeModal('orderHistoryModal');
      openCartModal();
      alert("✅ Added previous order items to Bag!");
    }
  });
}

// 8. Custom Cake Studio Logic
function openCakeStudio() {
  document.getElementById('cakeStudioModal').style.display = 'flex';
}

function selectCakeWeight(wt, price, el) {
  selectedCakeWeight = wt;
  selectedCakePrice = price;
  document.querySelectorAll('.weight-pills .weight-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function previewCakeUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('cakePhotoPreview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function addCustomCakeToCart() {
  const flavor = document.getElementById('cakeFlavorSelect').value;
  const msg = document.getElementById('cakeCustomText').value.trim();
  const cakeName = `Custom ${flavor} (${selectedCakeWeight} Kg)` + (msg ? ` [Msg: ${msg}]` : "");

  addToCart("cake_" + Date.now(), cakeName, selectedCakePrice, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500");
  closeModal('cakeStudioModal');
  alert("🎂 Custom Cake added to Bag!");
}

// 9. Customer Profile & Cloud Sync
function switchNavTab(tab) {
  document.querySelectorAll('.bottom-nav .nav-tab').forEach(t => t.classList.remove('active'));
  closeModal('accountModal');
  closeModal('orderHistoryModal');
  closeModal('wishlistModal');
  closeModal('cakeStudioModal');
  closeModal('productDetailModal');

  if(tab === 'home') {
    document.getElementById('tabHome').classList.add('active');
  } else if(tab === 'account') {
    document.getElementById('tabAccount').classList.add('active');
    openProfileTab();
  }
}

function openProfileTab() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if(profile.name) {
    document.getElementById('accNameDisplay').innerText = profile.name;
    document.getElementById('accInputName').value = profile.name;
  }
  if(profile.phone) {
    document.getElementById('accPhoneDisplay').innerText = profile.phone;
    document.getElementById('accInputPhone').value = profile.phone;
    
    db.ref("customers/" + profile.phone + "/wishlist").once("value", snap => {
      const cloudW = snap.val();
      if(cloudW && Array.isArray(cloudW)) {
        wishlist = cloudW;
        localStorage.setItem("kd_wishlist", JSON.stringify(wishlist));
        renderFoodItems(menuCatalog);
      }
    });
  }
  if(profile.address) {
    document.getElementById('accInputAddress').value = profile.address;
  }
  const savedAvatar = localStorage.getItem("kd_cust_avatar");
  if(savedAvatar) {
    document.getElementById('userAvatarImg').src = savedAvatar;
  }
  document.getElementById('accountModal').style.display = 'flex';
}

function uploadCustomerAvatar(input) {
  if(input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('userAvatarImg').src = e.target.result;
      localStorage.setItem("kd_cust_avatar", e.target.result);
      alert("✅ Profile Photo Updated!");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveCustomerAccount() {
  const name = document.getElementById('accInputName').value.trim();
  const phone = document.getElementById('accInputPhone').value.trim();
  const address = document.getElementById('accInputAddress').value.trim();

  if(!name || !phone) {
    alert("Please enter Name and Mobile number.");
    return;
  }
  localStorage.setItem("kd_cust_profile", JSON.stringify({ name, phone, address }));
  document.getElementById('accNameDisplay').innerText = name;
  document.getElementById('accPhoneDisplay').innerText = phone;

  db.ref("customers/" + phone + "/profile").set({ name, phone, address });
  alert("✅ Account synced and saved permanently to cloud!");
}

function openSavedItemsModal() {
  const container = document.getElementById('wishlistItemsContainer');
  container.innerHTML = '';
  const savedDishes = menuCatalog.filter(d => wishlist.includes(d.id));

  if(savedDishes.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--gray); margin-top:30px;">No saved items in your wishlist.</p>';
  } else {
    savedDishes.forEach(dish => {
      container.innerHTML += `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:10px; border-radius:8px; margin-bottom:8px; border:1px solid #e2e8f0;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${dish.img}" style="width:50px; height:50px; border-radius:6px; object-fit:cover;" />
            <div>
              <div style="font-size:13px; font-weight:600;">${dish.name}</div>
              <div style="font-size:12px; color:var(--primary); font-weight:700;">₹${dish.price}</div>
            </div>
          </div>
          <button class="add-btn" onclick="addToCart('${dish.id}', '${dish.name}', ${dish.price}, '${dish.img}')">ADD</button>
        </div>
      `;
    });
  }
  document.getElementById('wishlistModal').style.display = 'flex';
}

// 10. Admin Control Room Logic (Secret Master PIN: Kd@1234)
function openAdminGateway() {
  document.getElementById('adminModal').style.display = 'flex';
}

function unlockAdminWithPin() {
  const pin = document.getElementById('adminPinInput').value.trim();
  if(pin === "Kd@1234") {
    document.getElementById('adminLockScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    listenToLiveOrders();
    renderAdminMenuManager();
  } else {
    alert("❌ Access Denied: Incorrect Master Password!");
  }
}

// 11. Admin Menu Item Manager
function renderAdminMenuManager() {
  const list = document.getElementById('adminMenuItemsList');
  list.innerHTML = '';
  menuCatalog.forEach((dish) => {
    list.innerHTML += `
      <div class="admin-menu-item-row">
        <img src="${dish.img}" class="admin-menu-item-img" id="adminImg_${dish.id}" />
        <div style="flex:1;">
          <div style="font-size:13px; font-weight:700; color:#fff;">${dish.name}</div>
          <div style="font-size:12px; color:#38bdf8;">₹${dish.price} | Stock: <strong>${dish.inStock ? '🟢 Available' : '🔴 Sold Out'}</strong></div>
          <div class="admin-menu-actions">
            <button class="add-btn" style="padding:3px 8px; font-size:10px;" onclick="adminEditDishPrice('${dish.id}')">✏️ Edit Price</button>
            <label class="add-btn" style="padding:3px 8px; font-size:10px; cursor:pointer;">
              📷 Photo
              <input type="file" accept="image/*" style="display:none;" onchange="adminUpdateDishPhoto('${dish.id}', this)" />
            </label>
            <button class="add-btn" style="padding:3px 8px; font-size:10px; background:${dish.inStock ? '#ef4444' : '#10b981'}; color:#fff; border:none;" onclick="adminToggleDishStock('${dish.id}')">
              ${dish.inStock ? 'Mark Out' : 'Mark In'}
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function adminEditDishPrice(dishId) {
  const dish = menuCatalog.find(d => d.id === dishId);
  if(!dish) return;
  const newPrice = prompt(`Enter New Price (₹) for "${dish.name}":`, dish.price);
  if(newPrice && !isNaN(newPrice)) {
    dish.price = Number(newPrice);
    localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
    renderFoodItems(menuCatalog);
    renderAdminMenuManager();
    alert("✅ Price Updated Successfully!");
  }
}

function adminUpdateDishPhoto(dishId, input) {
  if(input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const dish = menuCatalog.find(d => d.id === dishId);
      if(dish) {
        dish.img = e.target.result;
        localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
        renderFoodItems(menuCatalog);
        renderAdminMenuManager();
        alert("✅ Dish Photo Updated from Gallery/Camera!");
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function adminToggleDishStock(dishId) {
  const dish = menuCatalog.find(d => d.id === dishId);
  if(dish) {
    dish.inStock = !dish.inStock;
    localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
    renderFoodItems(menuCatalog);
    renderAdminMenuManager();
    alert(`Item is now: ${dish.inStock ? '🟢 Available in Menu' : '🔴 Marked Out of Stock'}`);
  }
}

// 12. Admin Live Orders Listener
function listenToLiveOrders() {
  db.ref("orders").limitToLast(20).on("value", snapshot => {
    const data = snapshot.val();
    const list = document.getElementById('adminLiveOrdersList');
    list.innerHTML = '';
    let totalSales = 0;
    let orderCount = 0;

    if(data) {
      document.getElementById('orderAudioAlert').play().catch(()=>{});
      Object.keys(data).reverse().forEach(key => {
        const order = data[key];
        orderCount++;
        const cName = order.customerName || order.name || "Customer";
        const cPhone = order.phone || "8453270362";
        const cAddress = order.address || "Bengbari / Udalguri";
        const cTotal = Number(order.grandTotal || order.total || 0);
        const cId = order.orderId || key.substring(1, 7).toUpperCase();
        totalSales += cTotal;

        const itemsSummary = (order.items && Array.isArray(order.items)) 
          ? order.items.map(i => `${i.name} (x${i.qty})`).join(", ") 
          : "Food Items";

        list.innerHTML += `
          <div style="background:#0f172a; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #334155;">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
              <span>${cName} (₹${cTotal})</span>
              <span style="color:var(--primary); font-size:12px;">#${cId}</span>
            </div>
            <p style="font-size:11px; color:#38bdf8; margin:3px 0;">📦 ${itemsSummary}</p>
            <p style="font-size:11px; color:#94a3b8; margin:2px 0;">📍 ${cAddress}</p>
            <div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap;">
              <a href="tel:${cPhone}" class="add-btn" style="text-decoration:none; background:#10b981; color:#fff; border:none; padding:5px 10px; font-size:11px; border-radius:6px;">📞 Call</a>
              <button class="add-btn" style="padding:5px 8px; font-size:11px; border-radius:6px;" onclick="updateOrderStatusFull('${key}', '${cPhone}', 2, '2. In Kitchen')">🍳 Kitchen</button>
              <button class="add-btn" style="padding:5px 8px; font-size:11px; border-radius:6px; background:#f97316; color:#fff; border:none;" onclick="updateOrderStatusFull('${key}', '${cPhone}', 3, '3. Out for Delivery')">🛵 Out</button>
              <button class="add-btn" style="padding:5px 8px; font-size:11px; border-radius:6px; background:#10b981; color:#fff; border:none;" onclick="updateOrderStatusFull('${key}', '${cPhone}', 4, '4. Delivered')">✅ Done</button>
              <button class="add-btn" style="padding:5px 8px; font-size:11px; border-radius:6px; background:#3b82f6; color:#fff; border:none;" onclick="dispatchToRider('${cName}', '${cPhone}', '${cAddress}', '${itemsSummary}', '${cTotal}')">🚴 WhatsApp</button>
              <button class="add-btn" style="padding:5px 8px; font-size:11px; border-radius:6px; background:#ef4444; color:#fff; border:none;" onclick="adminDeleteOrder('${key}')" title="Delete Order"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      });
    }
    document.getElementById('statTotalSales').innerText = `₹${totalSales}`;
    document.getElementById('statOrderCount').innerText = `${orderCount}`;
  });
}

function updateOrderStatusFull(orderKey, phone, stageNum, statusText) {
  db.ref("orders/" + orderKey).update({ stage: stageNum, status: statusText });
  db.ref("customer_history/" + phone).once("value", snap => {
    const userOrders = snap.val();
    if(userOrders) {
      Object.keys(userOrders).forEach(k => {
        if(userOrders[k].orderId && userOrders[k].orderId.includes(orderKey.substring(1, 6))) {
          db.ref("customer_history/" + phone + "/" + k).update({ stage: stageNum, status: statusText });
        }
      });
    }
  });
  alert("Order progress updated to: " + statusText);
}

function adminDeleteOrder(key) {
  if(confirm("Delete this order from live screen? (Customer history will remain safe)")) {
    db.ref("orders/" + key).remove().then(() => {
      alert("Order cleared from live screen.");
    });
  }
}

function dispatchToRider(name, phone, address, items, total) {
  const msg = encodeURIComponent(`🚨 *NEW RESTAURANT DELIVERY DISPATCH*\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items}\nTotal: ₹${total}`);
  window.open(`https://wa.me/918453270362?text=${msg}`, '_blank');
}

function previewAdminDishUpload(input) {
  if(input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      adminUploadBase64 = e.target.result;
      const preview = document.getElementById('adminDishPreview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function adminSaveNewDish() {
  const name = document.getElementById('newDishName').value.trim();
  const price = Number(document.getElementById('newDishPrice').value);
  const cat = document.getElementById('newDishCat').value;
  const urlLink = document.getElementById('newDishImgUrl').value.trim();
  const finalImg = adminUploadBase64 || urlLink || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";

  if(!name || !price) {
    alert("Please enter Dish Name and Price.");
    return;
  }

  menuCatalog.unshift({ id: "dish_" + Date.now(), name, price, mrp: price + 50, cat, inStock: true, img: finalImg });
  localStorage.setItem("kd_live_menu", JSON.stringify(menuCatalog));
  renderFoodItems(menuCatalog);
  renderAdminMenuManager();
  alert(`✅ Added "${name}" (₹${price}) to Menu!`);

  document.getElementById('newDishName').value = '';
  document.getElementById('newDishPrice').value = '';
  document.getElementById('newDishImgUrl').value = '';
  document.getElementById('adminDishPreview').style.display = 'none';
  adminUploadBase64 = "";
}

function adminCreateCoupon() {
  const code = document.getElementById('newCouponCode').value.trim();
  const discount = document.getElementById('newCouponDiscount').value;
  if(code && discount) {
    alert(`Promo Code "${code}" created with ₹${discount} discount!`);
    document.getElementById('newCouponCode').value = '';
    document.getElementById('newCouponDiscount').value = '';
  }
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
  const newTitle = prompt("Enter New Carousel Headline:", "K.D RABHA SPECIAL");
  if(newTitle) document.getElementById('bannerTitle').innerText = newTitle;
}

function assignVipBadge() {
  const phone = document.getElementById('vipCustPhone').value.trim();
  if(phone) {
    alert(`👑 VIP Gold Badge permanently activated for: ${phone}`);
    document.getElementById('vipCustPhone').value = '';
  }
}

// Helpers
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function searchDishes() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = menuCatalog.filter(d => d.name.toLowerCase().includes(q));
  renderFoodItems(filtered);
}
function filterCategory(cat, el) {
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  if(el) el.classList.add('active');
  if(cat === 'all') renderFoodItems(menuCatalog);
  else renderFoodItems(menuCatalog.filter(d => d.cat === cat));
}
function triggerVoiceSearch() {
  alert("Voice Search: Say dish name (e.g. 'Pork Momo' or 'Chocolate Cake')");
}
// पेज लोड होते ही ग्राहक की अपनी लोकल जानकारी लोड करना
document.addEventListener('DOMContentLoaded', () => {
    refreshAccountUI();
});

function refreshAccountUI() {
    const name = localStorage.getItem('sa_customer_name');
    const phone = localStorage.getItem('sa_customer_phone');
    const photo = localStorage.getItem('sa_customer_photo');
    const coins = localStorage.getItem('sa_customer_coins') || '0';

    if (name) {
        document.getElementById('displayUserName').innerText = name;
        document.getElementById('inputCustName').value = name;
        document.getElementById('displayUserBadge').innerText = "Registered Member";
    } else {
        document.getElementById('displayUserName').innerText = "Guest User";
        document.getElementById('displayUserBadge').innerText = "New Customer";
    }

    if (phone) {
        document.getElementById('displayUserPhone').innerText = phone;
        document.getElementById('inputCustPhone').value = phone;
    } else {
        document.getElementById('displayUserPhone').innerText = "+91 Not Registered";
    }

    const address = localStorage.getItem('sa_customer_address');
    if (address) {
        document.getElementById('inputCustAddress').value = address;
    }

    if (photo) {
        document.getElementById('userAvatarImg').src = photo;
    }

    document.getElementById('displayUserCoins').innerText = coins;
}

// नया कस्टमर जब अपना डेटा भरेगा
function saveCustomerProfile() {
    const nameVal = document.getElementById('inputCustName').value.trim();
    const phoneVal = document.getElementById('inputCustPhone').value.trim();
    const addressVal = document.getElementById('inputCustAddress').value.trim();

    if (!nameVal || !phoneVal) {
        alert("कृपया अपना नाम और मोबाइल नंबर भरें!");
        return;
    }

    localStorage.setItem('sa_customer_name', nameVal);
    localStorage.setItem('sa_customer_phone', phoneVal);
    localStorage.setItem('sa_customer_address', addressVal);
    localStorage.setItem('sa_customer_coins', '25'); // पहले रजिस्ट्रेशन पर 25 कॉइन्स

    alert("आपका अकाउंट सफलतापूर्वक बन गया है!");
    refreshAccountUI();
}

// कस्टमर द्वारा फोटो अपलोड करने का फंक्शन
function updateProfilePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Photo = e.target.result;
            localStorage.setItem('sa_customer_photo', base64Photo);
            document.getElementById('userAvatarImg').src = base64Photo;
        };
        reader.readAsDataURL(file);
    }
}
// ================= FIREBASE LIVE SYNC SYSTEM =================
const firebaseConfig = {
  apiKey: "AIzaSyDDTfZD8eaxS6hsQ_M5akONRWixyZdjkSo",
  authDomain: "kd-ka-khana-ghar-tak.firebaseapp.com",
  databaseURL: "https://kd-ka-khana-ghar-tak-default-rtdb.asia-southeast1.firebasedatabase.app",
  
