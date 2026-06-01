# Gradix Technologies - Premium Enterprise Redesign

A world-class, premium, modern, and enterprise-level software company website inspired by Gradix Technologies. Designed and engineered with a modern SaaS aesthetic inspired by Stripe, Vercel, Linear, and Framer, utilizing Tailwind CSS, custom high-performance CSS animations, and modular vanilla JavaScript.

## 🚀 Key Visual & Interactive Features

1.  **High-Fidelity Glassmorphism UI:** Advanced CSS styling overlays (`backdrop-filter`) with semi-transparent glossy backdrops, harmonic glowing borders, and modern box-shadow tokens.
2.  **Cursor Ambient Tracking Glow:** A custom pointer glow orb that follows the mouse movement with smooth linear interpolation (lerp) for maximum responsiveness.
3.  **Physical Magnetic CTA Buttons:** Proximity-based physical attraction force that makes primary buttons gravitate slightly towards the cursor on hover.
4.  **Animated Statistics Counter:** Numbers automatically count up from 0 to targets (50+ Projects, 20+ Clients, 15+ Techs, 99% Satisfaction) using decelerating curve equations triggered only when scrolled into the viewport via `IntersectionObserver`.
5.  **Infinite Marquee Track:** Smooth continuous looping marquee displaying tech badges with self-contained duplicated list sections.
6.  **Interactive Testimonial Carousel:** A customized slide transition slider (prev/next controls, automatic cycles, touch-pauses) styled on premium layouts.
7.  **Hot-Dragonfly Inputs:** Form inputs featuring floating text labels, dynamic border-expansion animations, and custom outline focus flows.
8.  **Sticky Responsive Header:** Glassmorphic navigation menu displaying scroll indicators and dynamic shadows when scrolled.
9.  **AOS (Animate On Scroll):** Fully configured viewport animations (`fade-up`, `fade-left`, `fade-right`, `zoom-in`, `fade-down`) running seamlessly inside 1000ms.

---

## 🎨 Color Palette & Design Tokens

*   **Primary:** `#2563EB` (Tailwind blue-600) — Dynamic enterprise blue.
*   **Secondary:** `#06B6D4` (Tailwind cyan-500) — Neon tech cyan accents.
*   **Accent:** `#F97316` (Tailwind orange-500) — Modern call-to-action orange.
*   **Background:** `#FFFFFF` & `#F8FAFC` (Slate-50) — High-contrast bright layout sections.
*   **Heading Text:** `#0F172A` (Slate-900) — Deep charcoal corporate typography.
*   **Body Text:** `#475569` (Slate-600) — Easy-to-read slate body.
*   **Border:** `#E2E8F0` (Slate-200) — Soft separating lines.

---

## 📁 File Structure

```
/
├── index.html            # Main HTML structural file integrating Tailwinds, Font Awesome, and AOS
├── css/
│   └── style.css         # Custom stylesheet configuring scrollbars, loaders, custom keyframes, and Uiverse styles
├── js/
│   └── script.js         # Modular interactive logic (smooth tracking, magnetic cards, counters, slider systems)
├── assets/
│   ├── images/
│   │   ├── hero-visual.png    # Premium high-tech dashboard illustration (AI-Generated)
│   │   └── about-visual.png   # Premium workflow collaborative illustration (AI-Generated)
│   ├── icons/
│   └── logos/
└── README.md             # Project documentation details (this file)
```

---

## 💻 How to View Locally

Simply open the `index.html` file directly in any modern web browser, or launch it using a local development server like VS Code Live Server or python's HTTP module:

```bash
# Using Python
python -m http.server 8000

# Using Node (lite-server)
npx lite-server
```
Navigate to `http://localhost:8000` to interact with the high-performance site.
