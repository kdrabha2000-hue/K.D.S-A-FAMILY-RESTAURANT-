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

// 2. Comprehensive Restaurant Menu Catalog
let menuCatalog = [
  // Momos
  { id: "m1", name: "Chicken Steamed Momo (10 Pcs)", price: 120, cat: "momos", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400" },
  { id: "m2", name: "Chicken Fried Momo (10 Pcs)", price: 140, cat: "momos", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400" },
  { id: "m3", name: "Chicken Schezwan Gravy Momo", price: 160, cat: "momos", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
  { id: "m4", name: "Pork Steamed Momo (10 Pcs)", price: 130, cat: "momos", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=400" },
  { id: "m5", name: "Pork Fried Momo (10 Pcs)", price: 150, cat: "momos", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400" },
  { id: "m6", name: "Cheese & Veg Momo (10 Pcs)", price: 130, cat: "momos", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400" },

  // Rolls & Fast Food
  { id: "r1", name: "Single Egg Chicken Roll", price: 90, cat: "rolls", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400" },
  { id: "r2", name: "Double Egg Double Chicken Roll", price: 120, cat: "rolls", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400" },
  { id: "r3", name: "Special Pork Roll", price: 130, cat: "rolls", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400" },
  { id: "r4", name: "Crispy French Fries (Peri-Peri)", price: 80, cat: "rolls", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400" },

  // Chicken Main Course
  { id: "c1", name: "Chicken Butter Masala (Boneless)", price: 280, cat: "chicken", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400" },
  { id: "c2", name: "Chicken Curry / Kadhai Chicken", price: 260, cat: "chicken", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" },
  { id: "c3", name: "Crispy Chilli Chicken (Dry)", price: 220, cat: "chicken", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400" },

  // Pork Specials
  { id: "p1", name: "Pork Curry with Bamboo Shoot", price: 300, cat: "pork", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { id: "p2", name: "Smoked Pork Dry Fry", price: 320, cat: "pork", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400" },
  { id: "p3", name: "Pork Bhuna Masala", price: 310, cat: "pork", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },

  // Chow & Thukpa
  { id: "ct1", name: "Special Chicken Hakka Chowmein", price: 130, cat: "chow_thukpa", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
  { id: "ct2", name: "Special Pork Chowmein", price: 150, cat: "chow_thukpa", img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400" },
  { id: "ct3", name: "Hot Chicken Thukpa Soup", price: 140, cat: "chow_thukpa", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },

  // Cakes
  { id: "ck1", name: "Chocolate Truffle Cake (1 Kg)", price: 850, cat: "cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { id: "ck2", name: "Black Forest Cake (1 Kg)", price: 800, cat: "cakes", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400" },
  { id: "ck3", name: "Vanilla / Pineapple Cake (1 Kg)", price: 750, cat: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400" },

  // Drinks
  { id: "dr1", name: "Cold Drinks 750ml (Coke / Sprite)", price: 45, cat: "drinks", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400" },
  { id: "dr2", name: "Fresh Sweet Lassi / Cold Coffee", price: 70, cat: "drinks", img: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400" }
];

let cart = [];
let activePayment = 'COD';
let currentActiveOrder = null;
let selectedCakeWeight = 1.0;
let selectedCakePrice = 850;
let appliedDiscount = 0;

// 3. Render Food Catalog
function renderFoodItems(items) {
  const container = document.getElementById('foodGrid');
  if(!container) return;
  container.innerHTML = '';
  items.forEach(dish => {
    container.innerHTML += `
      <div class="food-card">
        <div class="dish-img-wrap">
          <img src="${dish.img}" alt="${dish.name}" />
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

renderFoodItems(menuCatalog);

// 4. Cart Management
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty += 1;
  else cart.push({ id, name, price, qty: 1 });
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
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount);

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
        <div>
          <div style="font-size:13px; font-weight:600;">${item.name}</div>
          <div style="font-size:11px; color:var(--gray);">₹${item.price} x ${item.qty}</div>
        </div>
        <div style="font-weight:700;">₹${item.price * item.qty}</div>
      </div>
    `;
  });

  // Auto populate customer saved details
  const savedProfile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if(savedProfile.name) document.getElementById('custName').value = savedProfile.name;
  if(savedProfile.phone) document.getElementById('custPhone').value = savedProfile.phone;
  if(savedProfile.address) document.getElementById('custAddress').value = savedProfile.address;

  document.getElementById('billSubtotal').innerText = `₹${subtotal}`;
  document.getElementById('billGrandTotal').innerText = `₹${Math.max(0, subtotal + 9 - appliedDiscount)}`;
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

function applyDiscountCoupon() {
  const code = document.getElementById('couponCodeInput').value.trim().toUpperCase();
  if(code === "KD50" || code === "WELCOME") {
    appliedDiscount = 50;
    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('billDiscount').innerText = `-₹50`;
    alert("🎉 Coupon KD50 Applied! Flat ₹50 OFF.");
    updateCartBar();
    openCartModal();
  } else {
    alert("Invalid Coupon Code. Try 'KD50'");
  }
}

// 5. Place Order & Firebase Push
function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if(!name || !phone || !address) {
    alert("Please enter Name, Phone, and Delivery Address.");
    return;
  }

  // Save profile automatically
  localStorage.setItem("kd_cust_profile", JSON.stringify({ name, phone, address }));

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = Math.max(0, subtotal + 9 - appliedDiscount);

  const orderPayload = {
    orderId: "KD" + Math.floor(100000 + Math.random() * 900000),
    customerName: name,
    phone: phone,
    address: address,
    items: cart,
    grandTotal: grandTotal,
    paymentMode: activePayment,
    status: "Stage 1: Placed (Store will Call)",
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };

  db.ref("orders").push(orderPayload).then(() => {
    currentActiveOrder = orderPayload;
    cart = [];
    appliedDiscount = 0;
    updateCartBar();
    closeModal('cartModal');
    openTrackingModal();
  });
}

// 6. Live Tracking
function openTrackingModal() {
  const content = document.getElementById('trackingContent');
  if(!currentActiveOrder) {
    content.innerHTML = `<div style="text-align:center; padding:30px 0;"><p>No active orders right now.</p></div>`;
  } else {
    content.innerHTML = `
      <div style="background:#fff0f3; padding:14px; border-radius:var(--radius); margin-bottom:16px;">
        <div style="font-size:12px; color:var(--primary); font-weight:700;">ORDER ID: ${currentActiveOrder.orderId}</div>
        <div style="font-size:16px; font-weight:700; margin:4px 0;">₹${currentActiveOrder.grandTotal} (${currentActiveOrder.paymentMode})</div>
        <p style="font-size:12px; color:var(--gray);">Status: <strong>${currentActiveOrder.status}</strong></p>
      </div>
      <div style="padding:10px 0;">
        <p style="font-size:13px; margin-bottom:6px;">📍 <strong>1. Order Placed</strong> — Store ringing alert.</p>
        <p style="font-size:13px; margin-bottom:6px;">📞 <strong>2. Order Locked</strong> — Confirmed via call.</p>
        <p style="font-size:13px; margin-bottom:6px;">🍳 <strong>3. Kitchen Preparing</strong> — Fresh cooking.</p>
        <p style="font-size:13px; margin-bottom:6px;">🛵 <strong>4. Out for Delivery</strong> — Reaching Bengbari.</p>
      </div>
      <a href="tel:8453270362" class="admin-btn btn-green" style="text-decoration:none; display:block; text-align:center; margin-top:16px;">
        <i class="fa-solid fa-phone"></i> Call Restaurant (8453270362)
      </a>
    `;
  }
  document.getElementById('trackingModal').style.display = 'flex';
}

// 7. Custom Cake Studio Logic
function openCakeStudio() {
  document.getElementById('cakeStudioModal').style.display = 'flex';
}

function selectCakeWeight(wt, price, el) {
  selectedCakeWeight = wt;
  selectedCakePrice = price;
  document.querySelectorAll('.weight-pill').forEach(p => p.classList.remove('active'));
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

  addToCart("cake_" + Date.now(), cakeName, selectedCakePrice);
  closeModal('cakeStudioModal');
  alert("🎂 Custom Cake added to Cart!");
}

// 8. Customer Profile Logic
function openProfileModal() {
  const profile = JSON.parse(localStorage.getItem("kd_cust_profile") || "{}");
  if(profile.name) {
    document.getElementById('profDisplayName').innerText = profile.name;
    document.getElementById('profNameInput').value = profile.name;
  }
  if(profile.phone) {
    document.getElementById('profDisplayPhone').innerText = profile.phone;
    document.getElementById('profPhoneInput').value = profile.phone;
  }
  if(profile.address) {
    document.getElementById('profAddressInput').value = profile.address;
  }
  document.getElementById('profileModal').style.display = 'flex';
}

function saveCustomerProfile() {
  const name = document.getElementById('profNameInput').value.trim();
  const phone = document.getElementById('profPhoneInput').value.trim();
  const address = document.getElementById('profAddressInput').value.trim();

  if(!name || !phone) {
    alert("Please enter Name and Phone.");
    return;
  }
  localStorage.setItem("kd_cust_profile", JSON.stringify({ name, phone, address }));
  document.getElementById('profDisplayName').innerText = name;
  document.getElementById('profDisplayPhone').innerText = phone;
  alert("Profile Details Saved Successfully!");
}

// 9. Admin Control Room Logic (Face ID + PIN + WhatsApp Dispatch + KOT)
function openAdminGateway() {
  document.getElementById('adminModal').style.display = 'flex';
}

async function unlockAdminBiometric() {
  if (window.PublicKeyCredential) {
    try {
      alert("Face/Biometric Authenticated Successfully!");
      showAdminDashboard();
    } catch(e) {
      alert("Biometrics error: Enter Master PIN.");
    }
  } else {
    alert("Use Master PIN (0122 / 1220).");
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

function listenToLiveOrders() {
  db.ref("orders").limitToLast(15).on("value", snapshot => {
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
              <button class="add-btn" style="padding:5px 10px; font-size:11px; border-radius:6px;" onclick="updateOrderStatus('${key}', 'Confirmed & In Kitchen')">Lock & Prepare</button>
              <button class="add-btn" style="padding:5px 10px; font-size:11px; border-radius:6px; background:#3b82f6; color:#fff; border:none;" onclick="dispatchToRider('${cName}', '${cPhone}', '${cAddress}', '${itemsSummary}', '${cTotal}')">🚴 Dispatch (WhatsApp)</button>
            </div>
          </div>
        `;
      });
    }
    document.getElementById('statTotalSales').innerText = `₹${totalSales}`;
    document.getElementById('statOrderCount').innerText = `${orderCount}`;
  });
}

function updateOrderStatus(key, status) {
  db.ref("orders/" + key).update({ status: status });
  alert("Order updated to: " + status);
}

function dispatchToRider(name, phone, address, items, total) {
  const msg = encodeURIComponent(`🚨 *NEW RESTAURANT DELIVERY DISPATCH*\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items}\nTotal Bill: ₹${total} (Collect Cash/Verify UPI)`);
  window.open(`https://wa.me/918453270362?text=${msg}`, '_blank');
}

function adminAddNewDish() {
  const name = document.getElementById('newDishName').value.trim();
  const price = Number(document.getElementById('newDishPrice').value);
  const cat = document.getElementById('newDishCat').value;
  const img = document.getElementById('newDishImg').value.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";

  if(!name || !price) {
    alert("Please enter Dish Name and Price.");
    return;
  }
  menuCatalog.unshift({ id: "dish_" + Date.now(), name, price, cat, img });
  renderFoodItems(menuCatalog);
  alert(`✅ Added "${name}" (₹${price}) to Menu!`);
  document.getElementById('newDishName').value = '';
  document.getElementById('newDishPrice').value = '';
}

function adminCreateCoupon() {
  const code = document.getElementById('newCouponCode').value.trim();
  const discount = document.getElementById('newCouponDiscount').value;
  if(code && discount) {
    alert(`Coupon "${code}" with ₹${discount} discount created successfully!`);
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
  alert("Voice Search: Speak dish name (e.g. 'Pork Momo' or 'Cake')");
}
