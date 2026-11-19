# MadeByMaa — Handmade Crochet E-Commerce Storefront (v2.0)

> **Handmade with Love ♡**  
> *"Little things, made with love."*

This repository contains the complete, production-ready frontend for **MadeByMaa**, an artisanal handmade crochet brand specializing in handcrafted accessories, winter wear, festive creations, home decor, and personalized gifts.

---

## 🌟 Highlights & Key Features

1. **All 11 Product Categories (32 Handcrafted Items)**
   - Crochet Keychains (₹200–₹280)
   - Mufflers & Scarves (₹890–₹1,150)
   - Festive Rakhis (₹220–₹280)
   - Hair Accessories (₹240–₹390)
   - Crochet Chokers (₹380–₹490)
   - Book Bouquets (₹550–₹850)
   - Crochet Bags & Totes (₹890–₹1,350)
   - Decorative Items & Plants (₹320–₹450)
   - Crochet Shoes & Slippers (₹490–₹850)
   - Crochet Flowers (₹250–₹380)
   - Crochet Jerseys & Vests (₹1,250–₹1,499)
   - *Strict adherence to client price range of ₹200–₹1,500.*

2. **Signature Crochet Needle & Yarn Animation (Section 9.2)**
   - Custom canvas/vector animation executing the full 7-step sequence:
     1. Yarn strand enters the screen smoothly
     2. Crochet needle appears with realistic hook geometry
     3. Needle catches yarn
     4. Needle moves through crochet loops
     5. Yarn loops form into visible stitches
     6. A crochet flower blooms
     7. Hero content is revealed smoothly
   - Includes *Replay Stitch* and *Skip* controls.

3. **Custom Crochet Cursor Trail (Section 9.3)**
   - Interactive crochet loops, micro flowers, and yarn hearts gracefully trail the cursor on desktop.
   - Automatically disabled on touch screens and includes a user toggle button (ON/OFF).
   - Zero interference with buttons and links (`pointer-events: none`).

4. **Direct WhatsApp Ordering Integration (Section 11)**
   - Connected directly to business WhatsApp: `+91 99962 67995`.
   - Generates properly encoded click-to-chat links pre-filled with:
     - Product Name
     - Fixed Selling Price (₹)
     - Selected Colour
     - Selected Size
     - Quantity
     - Customisation Details / Notes
   - Features a **Live Message Preview** inside the Quick View modal.

5. **Custom Orders Studio (Section 7.5)**
   - Interactive request builder for bespoke creations with custom color palettes, budget ranges, and personal notes.

6. **Branding & Visual Language (Section 8)**
   - Approved crochet-themed SVG logo featuring yarn lettering, crochet hook, and daisy flowers.
   - Brand color palette: Blush Pink (`#F7D6D8`), Cream (`#FFFDF9`), Warm Brown (`#4A2E2B`), Dusty Rose (`#C47B7B`), Soft Green (`#8FA882`).
   - Policies clearly highlighted: Pan-India delivery in 4–5 working days; No returns; No exchanges.

---

## 📁 Project Structure

```
madebymaa/
├── index.html              # Main Semantic HTML5 storefront
├── assets/
│   └── logo.svg            # Custom crochet vector logo
├── css/
│   └── styles.css          # Design system, layout, typography & animations
├── js/
│   ├── products.js         # 11 categories, 32 products & business metadata
│   ├── needle-animation.js # Signature crochet needle & yarn animation engine
│   ├── cursor-trail.js     # Desktop interactive crochet cursor trail
│   └── app.js              # Search, filter, sorting, modal & WhatsApp engine
└── README.md
```

---

## 🚀 How to Run & Preview

Because this project is built using modern standard web technologies (HTML5, CSS3, ES6), there are **zero build steps or package installation dependencies required**.

### Option 1: Open Directly in Browser
Double-click `index.html` or open it with your browser of choice (Chrome, Safari, Edge, Firefox).

### Option 2: Run with any local server
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```
Then visit `http://localhost:8000`.

---

## 📋 Client Information & Contact
- **Brand:** MadeByMaa
- **WhatsApp:** +91 99962 67995
- **Instagram:** [@madebymaa19](https://www.instagram.com/madebymaa19/)
- **Delivery Coverage:** Pan India (4–5 working days)
- **Policy:** No returns, no exchanges
