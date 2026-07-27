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
        <span style={{ fontFamily: FONT_ACCENT, fontSize: 11, color: C.warmGray, letterSpacing: '0.05em' }}>{product.id}</span>
