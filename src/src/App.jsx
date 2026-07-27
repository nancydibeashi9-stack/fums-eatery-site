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
            <div style={{ fontFamily: FONT_ACCENT, fontSize: 8.5, color: C.gold, letterSpacing: '0.15em' }}>HOMEMADE & FRESH</div>
