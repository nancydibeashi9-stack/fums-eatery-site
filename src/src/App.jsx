import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed, Soup, Cookie, Coffee, IceCream,
  ShoppingCart, X, Plus, Minus, Menu, ChevronRight, ChevronLeft,
  Check, Phone, Mail, MapPin, MessageCircle, Search, ArrowRight, ShieldCheck, Truck, Star
} from 'lucide-react';

/* ---------------------------------- TOKENS ---------------------------------- */
const C = {
  terracotta: '#C1440E',
  terracottaDark: '#9C3610',
  charcoal: '#2B2320',
  charcoalDark: '#1C1613',
  cream: '#FBF3E7',
  paper: '#FFFDF8',
  warmGray: '#8C7F72',
  warmGrayLight: '#E4DACE',
  gold: '#D8A24A',
  green: '#3B5D45',
  white: '#FFFFFF',
};

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_ACCENT = "'Inter', sans-serif";

/* ---------------------------------- DATA ---------------------------------- */
const CATEGORIES = [
  { id: 'meals', code: 'ML', name: 'Meals & Swallow', icon: Soup, desc: 'Rice dishes, soups and swallow' },
  { id: 'chops', code: 'SC', name: 'Small Chops & Snacks', icon: UtensilsCrossed, desc: 'Party snacks and light bites' },
  { id: 'baked', code: 'BK', name: 'Baked Goods', icon: Cookie, desc: 'Cakes, pastries and bread' },
  { id: 'drinks', code: 'DR', name: 'Drinks & Sides', icon: Coffee, desc: 'Beverages and side dishes' },
  { id: 'desserts', code: 'DS', name: 'Desserts', icon: IceCream, desc: 'Sweet treats to finish' },
];

const PRODUCTS = [
  { id: 'ML-001', cat: 'meals', name: 'Jollof Rice with Grilled Chicken', size: 'Full Plate', price: 3500, stock: 'Available', specs: [['Serving', '1 person'], ['Includes', 'Rice, grilled chicken, coleslaw'], ['Spice Level', 'Medium'], ['Prep Time', '30-40 mins']] },
  { id: 'ML-002', cat: 'meals', name: 'Pounded Yam with Egusi Soup', size: 'Full Plate', price: 4000, stock: 'Available', specs: [['Serving', '1 person'], ['Includes', 'Pounded yam, egusi soup, assorted meat'], ['Spice Level', 'Medium'], ['Prep Time', '40-50 mins']] },
  { id: 'SC-001', cat: 'chops', name: 'Mixed Small Chops Platter', size: '20 Pieces', price: 6000, stock: 'Available', specs: [['Pieces', '20'], ['Includes', 'Spring rolls, samosa, puff puff, chicken wings'], ['Serves', '3-4 people'], ['Order Notice', '24 hours']] },
  { id: 'SC-002', cat: 'chops', name: 'Suya Platter', size: '500g', price: 4500, stock: 'Available', specs: [['Weight', '500g'], ['Includes', 'Spiced grilled beef, onions, pepper'], ['Spice Level', 'Hot'], ['Serves', '2-3 people']] },
  { id: 'BK-001', cat: 'baked', name: 'Classic Vanilla Birthday Cake', size: '8-inch, Serves 12', price: 15000, stock: 'Available', specs: [['Size', '8-inch round'], ['Flavor', 'Vanilla sponge'], ['Serves', '10-12 people'], ['Order Notice', '48 hours']] },
  { id: 'BK-002', cat: 'baked', name: 'Meat Pie Pack', size: '10 Pieces', price: 5000, stock: 'Available', specs: [['Pieces', '10'], ['Filling', 'Minced meat & vegetables'], ['Serves', '5-6 people'], ['Order Notice', 'Same day']] },
  { id: 'DR-001', cat: 'drinks', name: 'Chapman (1 Litre)', size: '1 Litre Bottle', price: 2500, stock: 'Available', specs: [['Volume', '1 litre'], ['Type', 'Non-alcoholic cocktail'], ['Serves', '3-4 people'], ['Chilled', 'Yes']] },
  { id: 'DR-002', cat: 'drinks', name: 'Zobo Drink (1 Litre)', size: '1 Litre Bottle', price: 1800, stock: 'Available', specs: [['Volume', '1 litre'], ['Type', 'Hibiscus drink'], ['Serves', '3-4 people'], ['Chilled', 'Yes']] },
  { id: 'DS-001', cat: 'desserts', name: 'Chocolate Cupcakes', size: 'Box of 6', price: 3000, stock: 'Available', specs: [['Pieces', '6'], ['Flavor', 'Chocolate with buttercream'], ['Order Notice', 'Same day'], ['Storage', 'Refrigerate']] },
  { id: 'DS-002', cat: 'desserts', name: 'Fruit Parfait Cup', size: 'Single Cup', price: 2000, stock: 'Available', specs: [['Serving', '1 cup'], ['Includes', 'Yogurt, granola, seasonal fruit'], ['Storage', 'Refrigerate'], ['Order Notice', 'Same day']] },
];

const formatPrice = (n) => `\u20A6${n.toLocaleString('en-NG')}`;

/* ---------------------------------- SMALL PIECES ---------------------------------- */
function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

function EyebrowLabel({ children, dark }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 mb-4"
      style={{
        fontFamily: FONT_ACCENT, fontSize: 11, letterSpacing: '0.12em', fontWeight: 600,
        color: dark ? C.cream : C.terracottaDark,
        border: `1px solid ${dark ? 'rgba(251,243,231,0.35)' : C.terracotta}`,
      }}
    >
      <span style={{ width: 6, height: 6, background: C.terracotta, display: 'inline-block', borderRadius: '50%' }} />
      {children.toUpperCase()}
    </div>
  );
}

function ProductCard({ product, onView, onAdd }) {
  const cat = CATEGORIES.find((c) => c.id === product.cat);
  return (
    <div className="relative flex flex-col" style={{ background: C.paper, border: `1px solid ${C.warmGrayLight}` }}>
      <div className="px-4 pt-4 flex items-center justify-between">
        <span style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray, letterSpacing: '0.05em' }}>{product.id}</span><span style={{ fontFamily: FONT_ACCENT, fontSize: 10, color: C.green, letterSpacing: '0.05em', fontWeight: 600 }}>{product.stock.toUpperCase()}</span>
      </div>
      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
        <div
          className="w-full flex items-center justify-center mb-4"
          style={{ height: 108, background: C.terracotta, backgroundImage: `linear-gradient(135deg, ${C.terracotta}, ${C.terracottaDark})`, overflow: 'hidden' }}
        >
          {product.img ? (
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            cat && <cat.icon size={40} color={C.cream} strokeWidth={1.4} />
          )}
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17, color: C.charcoal, lineHeight: 1.25 }}>{product.name}</h3>
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.warmGray, marginTop: 4 }}>{product.size}</p>
        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px dashed ${C.warmGrayLight}` }}>
          <span style={{ fontFamily: FONT_ACCENT, fontSize: 17, fontWeight: 700, color: C.terracottaDark }}>{formatPrice(product.price)}</span>
          <button onClick={() => onView(product.id)} style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.terracottaDark, letterSpacing: '0.04em', fontWeight: 600 }} className="hover:underline">
            DETAILS →
          </button>
        </div>
        <button
          onClick={() => onAdd(product.id)}
          className="mt-3 w-full py-2.5 flex items-center justify-center gap-2"
          style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12, letterSpacing: '0.06em', fontWeight: 600 }}
        >
          <Plus size={14} /> ADD TO CART
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- CHECKOUT (standalone from the start) ---------------------------------- */
function Checkout({ cartItems, cartTotal, form, setForm, placeOrder, go }) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <EyebrowLabel>Complete Your Order</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 700, marginBottom: 32 }}>Checkout</h1>
      {cartItems.length === 0 ? (
        <div className="py-16 text-center">
          <p style={{ fontFamily: FONT_BODY, color: C.warmGray, marginBottom: 16 }}>Your cart is empty.</p>
          <button onClick={() => go('shop')} style={{ fontFamily: FONT_ACCENT, fontSize: 12, color: C.terracottaDark, fontWeight: 600 }}>BROWSE MENU →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <form onSubmit={placeOrder} className="md:col-span-3 flex flex-col gap-4">
            <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.terracottaDark, letterSpacing: '0.1em', fontWeight: 600 }}>DELIVERY DETAILS</div>
            {[['name', 'Full name', true], ['phone', 'Phone number', true], ['email', 'Email address', true]].map(([key, label, req]) => (
              <div key={key}>
                <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>{label}{req && ' *'}</label>
                <input required={req} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>Delivery address *</label>
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>
            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>City *</label>
              <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>
            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>Order notes (optional)</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>
            <button type="submit" className="mt-4 py-3.5 flex items-center justify-center gap-2"
              style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 13, letterSpacing: '0.06em', fontWeight: 600 }}>
              SEND ORDER REQUEST <MessageCircle size={15} />
            </button>
          </form>
          <div className="md:col-span-2">
            <div style={{ background: C.paper, border: `1px solid ${C.warmGrayLight}` }} className="p-5">
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.terracottaDark, letterSpacing: '0.1em', fontWeight: 600 }} className="mb-4">ORDER SUMMARY</div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2.5">
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.charcoal }}>{item.name} × {item.qty}</span>
                  <span style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.terracottaDark }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${C.warmGrayLight}` }}><span style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.warmGray }}>DELIVERY</span>
                <span style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.terracottaDark }}>Confirmed on WhatsApp</span>
              </div>
              <div className="flex justify-between mt-2">
                <span style={{ fontFamily: FONT_ACCENT, fontSize: 14, color: C.charcoal, fontWeight: 700 }}>TOTAL</span>
                <span style={{ fontFamily: FONT_ACCENT, fontSize: 18, color: C.terracottaDark, fontWeight: 700 }}>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- MAIN APP ---------------------------------- */
export default function App() {
  const [page, setPage] = useState('home');
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderNo, setOrderNo] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });

  const go = (p) => { setPage(p); setMenuOpen(false); setCartOpen(false); window.scrollTo?.(0, 0); };

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const setQty = (id, qty) => setCart((c) => {
    if (qty <= 0) { const n = { ...c }; delete n[id]; return n; }
    return { ...c, [id]: qty };
  });
  const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });

  const cartItems = useMemo(() => Object.entries(cart).map(([id, qty]) => ({
    ...PRODUCTS.find((p) => p.id === id), qty,
  })), [cart]);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCat !== 'all') list = list.filter((p) => p.cat === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    return list;
  }, [activeCat, query]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId);

  const placeOrder = (e) => {
    e.preventDefault();
    const no = 'FUM-' + Math.floor(100000 + Math.random() * 900000);
    const itemLines = cartItems.map((item) => `- ${item.name} x${item.qty} (${formatPrice(item.price * item.qty)})`).join('\n');
    const message =
      `New Order Request ${no}\n\n` +
      `${itemLines}\n\n` +
      `Total: ${formatPrice(cartTotal)}\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Delivery Address: ${form.address}, ${form.city}\n` +
      (form.notes ? `Notes: ${form.notes}\n` : '');
    const waUrl = `https://wa.me/2347084963915?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setOrderNo(no);
    setCart({});
    go('confirmation');
  };

  /* ------------------------ HEADER ------------------------ */
  const Header = () => (
    <header style={{ background: C.charcoalDark, borderBottom: `3px solid ${C.terracotta}` }} className="sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <div style={{ width: 34, height: 34, background: C.terracotta }} className="flex items-center justify-center">
            <UtensilsCrossed size={18} color={C.white} />
          </div>
          <div className="text-left leading-none">
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: C.white, fontWeight: 700, letterSpacing: '0.01em' }}>FUMS EATERY</div>
            <div style={{ fontFamily: FONT_ACCENT, fontSize: 8.5, color: C.gold, letterSpacing: '0.15em' }}>HOMEMADE & FRESH</div></div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {[['home', 'Home'], ['shop', 'Menu'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <button key={id} onClick={() => { setActiveCat('all'); go(id); }}
              style={{ fontFamily: FONT_ACCENT, fontSize: 12, letterSpacing: '0.06em', color: page === id ? C.gold : C.warmGrayLight, fontWeight: 500 }}
              className="hover:text-white transition-colors">
              {label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setCartOpen(true)} className="relative p-2" aria-label="Open cart">
            <ShoppingCart size={20} color={C.white} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center"
                style={{ width: 17, height: 17, borderRadius: '50%', background: C.terracotta, color: C.white, fontSize: 10, fontFamily: FONT_ACCENT, fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setMenuOpen((m) => !m)} aria-label="Menu">
            <Menu size={22} color={C.white} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[['home', 'Home'], ['shop', 'Menu'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <button key={id} onClick={() => { setActiveCat('all'); go(id); }} className="text-left pt-3"
              style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.warmGrayLight, letterSpacing: '0.06em' }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  /* ------------------------ FOOTER ------------------------ */
  const Footer = () => (
    <footer style={{ background: C.charcoalDark }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: C.white, fontWeight: 700 }}>FUMS EATERY</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGray, marginTop: 8, lineHeight: 1.6 }}>
            Homemade meals, snacks and baked goods, made fresh in Jos.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.gold, letterSpacing: '0.1em', fontWeight: 600 }} className="mb-3">MENU</div>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => { setActiveCat(c.id); go('shop'); }} className="block mb-2 text-left"
              style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGrayLight }}>{c.name}</button>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.gold, letterSpacing: '0.1em', fontWeight: 600 }} className="mb-3">COMPANY</div>
          <button onClick={() => go('about')} className="block mb-2 text-left" style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGrayLight }}>About Us</button>
          <button onClick={() => go('contact')} className="block mb-2 text-left" style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGrayLight }}>Contact</button>
        </div>
        <div>
          <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.gold, letterSpacing: '0.1em', fontWeight: 600 }} className="mb-3">GET IN TOUCH</div>
          <div className="flex items-center gap-2 mb-2" style={{ color: C.warmGrayLight, fontFamily: FONT_BODY, fontSize: 13 }}><Phone size={14} /> 0708 496 3915</div>
          <div className="flex items-center gap-2" style={{ color: C.warmGrayLight, fontFamily: FONT_BODY, fontSize: 13 }}><MapPin size={14} /> Jos, Plateau State</div>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://wa.me/2347084963915" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} color={C.warmGrayLight} /></a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="py-4 text-center">
        <span style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray }}>© 2026 FUMS EATERY. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );

  /* ------------------------ CART DRAWER ------------------------ */
  const CartDrawer = () => (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(28,22,19,0.55)' }} onClick={() => setCartOpen(false)}>
      <div className="w-full max-w-sm h-full flex flex-col" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4" style={{ background: C.charcoalDark }}>
          <span style={{ fontFamily: FONT_DISPLAY, color: C.white, fontSize: 16, letterSpacing: '0.01em', fontWeight: 700 }}>YOUR CART ({cartCount})</span>
          <button onClick={() => setCartOpen(false)}><X size={20} color={C.white} /></button>
</div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <p style={{ fontFamily: FONT_BODY, color: C.warmGray, fontSize: 14 }}>Your cart is empty. Add something delicious to get started.</p>
          ) : cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 mb-4 pb-4" style={{ borderBottom: `1px dashed ${C.warmGrayLight}` }}>
              <div className="flex-1">
                <div style={{ fontFamily: FONT_ACCENT, fontSize: 10, color: C.warmGray }}>{item.id}</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: C.charcoal, fontWeight: 600 }}>{item.name}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => setQty(item.id, item.qty - 1)} style={{ border: `1px solid ${C.warmGrayLight}` }} className="w-6 h-6 flex items-center justify-center"><Minus size={12} /></button>
                  <span style={{ fontFamily: FONT_ACCENT, fontSize: 13 }}>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} style={{ border: `1px solid ${C.warmGrayLight}` }} className="w-6 h-6 flex items-center justify-center"><Plus size={12} /></button>
                  <button onClick={() => removeFromCart(item.id)} style={{ fontFamily: FONT_ACCENT, fontSize: 10, color: C.terracottaDark }} className="ml-auto">REMOVE</button>
                </div>
              </div>
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.terracottaDark, fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="px-5 py-4" style={{ borderTop: `2px solid ${C.charcoalDark}` }}>
            <div className="flex justify-between mb-3">
              <span style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.warmGray }}>SUBTOTAL</span>
              <span style={{ fontFamily: FONT_ACCENT, fontSize: 17, fontWeight: 700, color: C.terracottaDark }}>{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => go('checkout')} className="w-full py-3 flex items-center justify-center gap-2"
              style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12, letterSpacing: '0.06em', fontWeight: 600 }}>
              CHECKOUT <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ------------------------ HOME ------------------------ */
  const Home = () => (
    <>
      <section style={{ background: C.charcoalDark }}>
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28">
          <EyebrowLabel dark>Homemade & Fresh · Jos</EyebrowLabel>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(36px,6vw,60px)', color: C.white, fontWeight: 700, lineHeight: 1.1, maxWidth: 700 }}>
            Good food, made with <span style={{ color: C.gold }}>love.</span>
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.warmGrayLight, maxWidth: 520, marginTop: 20, lineHeight: 1.6 }}>
            Fresh meals, small chops, baked goods and drinks made to order in Jos, Plateau State. Order online or straight through WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <button onClick={() => go('shop')} className="px-6 py-3 flex items-center gap-2" style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
              VIEW MENU <ArrowRight size={15} />
            </button>
            <a href="https://wa.me/2347084963915?text=Hi%20Fums%20Eatery%2C%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="px-6 py-3 flex items-center gap-2" style={{ border: `1px solid ${C.warmGray}`, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
              <MessageCircle size={15} /> ORDER ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <EyebrowLabel>Menu</EyebrowLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 700 }}>Browse by category</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => { setActiveCat(c.id); go('shop'); }} className="text-left p-5 flex flex-col"
              style={{ background: C.paper, border: `1px solid ${C.warmGrayLight}` }}>
              <div className="flex items-center justify-between mb-4">
                <div style={{ width: 42, height: 42, background: C.terracotta }} className="flex items-center justify-center">
                  <c.icon size={20} color={C.cream} />
                </div>
                <span style={{ fontFamily: FONT_ACCENT, fontSize: 10, color: C.warmGray }}>{c.code}</span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: C.charcoal, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.warmGray, marginTop: 4 }}>{c.desc}</div>
              <div className="mt-4 flex items-center gap-1" style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.terracottaDark, fontWeight: 600 }}>
                VIEW ITEMS <ChevronRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </section><section style={{ background: C.cream }} className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <EyebrowLabel>Why Fums Eatery</EyebrowLabel>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 700, marginBottom: 32 }}>Made fresh, every time</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              [ShieldCheck, 'Fresh ingredients', 'Every dish is prepared fresh to order, never sitting around.'],
              [Truck, 'Local delivery', 'We deliver across Jos, with pickup also available.'],
              [Star, 'Made with care', 'Recipes made the way home cooking should taste.'],
            ].map(([Icon, title, body], i) => (
              <div key={i}>
                <Icon size={26} color={C.terracotta} />
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: C.charcoal, marginTop: 12, fontWeight: 600 }}>{title}</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: C.warmGray, marginTop: 6, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <EyebrowLabel>Popular</EyebrowLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 700 }}>Customer favorites</h2>
          </div>
          <button onClick={() => go('shop')} style={{ fontFamily: FONT_ACCENT, fontSize: 12, color: C.terracottaDark, fontWeight: 600 }} className="hidden sm:flex items-center gap-1">
            FULL MENU <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onView={(id) => { setSelectedId(id); go('product'); }} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </>
  );

  /* ------------------------ SHOP (MENU) ------------------------ */
  const Shop = () => (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <EyebrowLabel>Full Menu</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: C.charcoal, fontWeight: 700 }}>
        {activeCat === 'all' ? 'All items' : CATEGORIES.find((c) => c.id === activeCat)?.name}
      </h1>
      <div className="flex items-center gap-2 mt-6 mb-8" style={{ border: `1px solid ${C.warmGrayLight}`, background: C.paper }}>
        <Search size={16} color={C.warmGray} className="ml-3" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu..."
          className="flex-1 py-2.5 px-2 bg-transparent outline-none" style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.charcoal }} />
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        <button onClick={() => setActiveCat('all')} className="px-3.5 py-1.5"
          style={{ fontFamily: FONT_ACCENT, fontSize: 11.5, letterSpacing: '0.04em', fontWeight: 600, background: activeCat === 'all' ? C.charcoalDark : 'transparent', color: activeCat === 'all' ? C.white : C.charcoal, border: `1px solid ${activeCat === 'all' ? C.charcoalDark : C.warmGrayLight}` }}>
          ALL
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} className="px-3.5 py-1.5"
            style={{ fontFamily: FONT_ACCENT, fontSize: 11.5, letterSpacing: '0.04em', fontWeight: 600, background: activeCat === c.id ? C.charcoalDark : 'transparent', color: activeCat === c.id ? C.white : C.charcoal, border: `1px solid ${activeCat === c.id ? C.charcoalDark : C.warmGrayLight}` }}>
            {c.code}
          </button>
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p style={{ fontFamily: FONT_BODY, color: C.warmGray, marginBottom: 20 }}>No items match "{query}". Try a different search, or ask us directly.</p>
          <a href="https://wa.me/2347084963915?text=Hi%20Fums%20Eatery%2C%20I%27m%20looking%20for%20something%20I%20couldn%27t%20find%20on%20your%20menu." target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 items-center gap-2" style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
            <MessageCircle size={15} /> ASK ON WHATSAPP
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onView={(id) => { setSelectedId(id); go('product'); }} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );

  /* ------------------------ PRODUCT DETAIL ------------------------ */
  const ProductDetail = () => {
    if (!selectedProduct) return null;
    const cat = CATEGORIES.find((c) => c.id === selectedProduct.cat);return (
      <div className="max-w-6xl mx-auto px-5 py-12">
        <button onClick={() => go('shop')} className="flex items-center gap-1 mb-8" style={{ fontFamily: FONT_ACCENT, fontSize: 12, color: C.warmGray }}>
          <ChevronLeft size={14} /> BACK TO MENU
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center" style={{ height: 360, background: C.terracotta, backgroundImage: `linear-gradient(135deg, ${C.terracotta}, ${C.terracottaDark})`, overflow: 'hidden' }}>
            {selectedProduct.img ? (
              <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              cat && <cat.icon size={90} color={C.cream} strokeWidth={1.2} />
            )}
          </div>
          <div>
            <span style={{ fontFamily: FONT_ACCENT, fontSize: 12, color: C.warmGray }}>{selectedProduct.id} · {cat?.name}</span>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 700, marginTop: 6 }}>{selectedProduct.name}</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.warmGray, marginTop: 4 }}>{selectedProduct.size}</p>
            <div style={{ fontFamily: FONT_ACCENT, fontSize: 30, fontWeight: 700, color: C.terracottaDark, marginTop: 20 }}>{formatPrice(selectedProduct.price)}</div>
            <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.green, marginTop: 6, letterSpacing: '0.05em', fontWeight: 600 }}>{selectedProduct.stock.toUpperCase()}</div>
            <button onClick={() => addToCart(selectedProduct.id)} className="mt-6 px-8 py-3 flex items-center gap-2"
              style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
              <Plus size={15} /> ADD TO CART
            </button>
            <div className="mt-10 pt-6" style={{ borderTop: `1px dashed ${C.warmGrayLight}` }}>
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.terracottaDark, letterSpacing: '0.1em', fontWeight: 600 }} className="mb-4">DETAILS</div>
              <table className="w-full">
                <tbody>
                  {selectedProduct.specs.map(([label, value]) => (
                    <tr key={label} style={{ borderTop: `1px solid ${C.warmGrayLight}` }}>
                      <td style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGray, padding: '10px 0' }}>{label}</td>
                      <td style={{ fontFamily: FONT_ACCENT, fontSize: 13, color: C.charcoal, padding: '10px 0', textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------ CONFIRMATION ------------------------ */
  const Confirmation = () => (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <div className="mx-auto mb-6 flex items-center justify-center" style={{ width: 56, height: 56, background: C.terracotta, borderRadius: '50%' }}>
        <Check size={28} color={C.white} />
      </div>
      <EyebrowLabel>Order Request Sent</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 700 }}>Order request sent.</h1>
      <p style={{ fontFamily: FONT_ACCENT, fontSize: 15, color: C.terracottaDark, marginTop: 12, fontWeight: 700 }}>{orderNo}</p>
      <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.warmGray, marginTop: 12, lineHeight: 1.6 }}>
        We've opened WhatsApp with your order details. Send the message and we'll confirm pricing, payment and delivery with you directly. Save your order number for reference.
      </p>
      <button onClick={() => go('shop')} className="mt-8 px-6 py-3" style={{ background: C.charcoalDark, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12, letterSpacing: '0.06em', fontWeight: 600 }}>
        CONTINUE BROWSING
      </button>
    </div>
  );

  /* ------------------------ ABOUT ------------------------ */
  const About = () => (
    <div>
      <section style={{ background: C.charcoalDark }} className="py-20">
        <div className="max-w-4xl mx-auto px-5">
          <EyebrowLabel dark>Our Story</EyebrowLabel>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, color: C.white, fontWeight: 700 }}>Cooking made with care.</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-5 py-16">
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.charcoal, lineHeight: 1.8, marginBottom: 20 }}>
          Fums Eatery started as a small home kitchen in Jos, Plateau State, cooking for family and friends. What began with a love for good food grew into serving fresh meals, snacks and baked goods to the wider community.
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.charcoal, lineHeight: 1.8, marginBottom: 20 }}>
          Today we prepare everything fresh to order — from everyday meals and small chops to cakes and desserts for your celebrations. Every dish is made the way home cooking should taste.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[['10+', 'Menu items'], ['5', 'Categories'], ['Jos', 'Based in Plateau State']].map(([num, label]) => (
            <div key={label} style={{ borderLeft: `3px solid ${C.terracotta}`, paddingLeft: 16 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: C.terracottaDark, fontWeight: 700 }}>{num}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.warmGray }}>{label}</div>
            </div>
          ))}
        </div>
      </section></div>
  );

  /* ------------------------ CONTACT ------------------------ */
  const Contact = () => (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <EyebrowLabel>Get In Touch</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: C.charcoal, fontWeight: 700, marginBottom: 20 }}>Order or ask us anything</h1>
      <div className="flex flex-wrap gap-3 mb-10">
        <a href="https://wa.me/2347084963915?text=Hi%20Fums%20Eatery%2C%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="px-6 py-3 flex items-center gap-2" style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
          <MessageCircle size={15} /> CHAT ON WHATSAPP
        </a>
        <a href="tel:+2347084963915" className="px-6 py-3 flex items-center gap-2" style={{ border: `1px solid ${C.charcoalDark}`, color: C.charcoalDark, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
          <Phone size={15} /> CALL NOW
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <a href="tel:+2347084963915" className="flex items-start gap-3">
            <div style={{ width: 38, height: 38, background: C.terracotta }} className="flex items-center justify-center shrink-0"><Phone size={18} color={C.cream} /></div>
            <div>
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray, letterSpacing: '0.05em', fontWeight: 600 }}>CALL OR TEXT</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.charcoal }}>0708 496 3915</div>
            </div>
          </a>
          <div className="flex items-start gap-3">
            <div style={{ width: 38, height: 38, background: C.terracotta }} className="flex items-center justify-center shrink-0"><MapPin size={18} color={C.cream} /></div>
            <div>
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray, letterSpacing: '0.05em', fontWeight: 600 }}>LOCATION</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.charcoal }}>Jos, Plateau State</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div style={{ width: 38, height: 38, background: C.terracotta }} className="flex items-center justify-center shrink-0"><MessageCircle size={18} color={C.cream} /></div>
            <div>
              <div style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray, letterSpacing: '0.05em', fontWeight: 600 }}>ORDER HOURS</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.charcoal }}>Mon–Sat, 9:00 AM – 7:00 PM</div>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent — we\'ll get back to you shortly.'); }} className="flex flex-col gap-4">
          <input required placeholder="Your name" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <input required type="email" placeholder="Email address" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <textarea required rows={5} placeholder="What would you like to order or ask?" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.warmGrayLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <button type="submit" className="py-3 flex items-center justify-center gap-2" style={{ background: C.terracotta, color: C.white, fontFamily: FONT_ACCENT, fontSize: 12.5, letterSpacing: '0.06em', fontWeight: 600 }}>
            SEND MESSAGE <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );

  const PAGES = { home: Home, shop: Shop, product: ProductDetail, confirmation: Confirmation, about: About, contact: Contact };
  const CurrentPage = PAGES[page] || Home;

  return (
    <div style={{ background: C.cream, minHeight: '100vh', fontFamily: FONT_BODY }} className="flex flex-col">
      <Fonts />
      <Header />
      <main className="flex-1">
        {page === 'checkout' ? (
          <Checkout cartItems={cartItems} cartTotal={cartTotal} form={form} setForm={setForm} placeOrder={placeOrder} go={go} />
        ) : (
          <CurrentPage />
        )}
      </main>
      <Footer />
      {cartOpen && <CartDrawer />}
    </div>
  );
}
