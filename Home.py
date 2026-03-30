import streamlit as st
import base64
import random
from pathlib import Path
from datetime import datetime

st.set_page_config(
    page_title="Saurabh Dusane - AI/ML Portfolio",
    page_icon="SD",
    layout="wide"
)

def load_css():
    st.markdown("""
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    """, unsafe_allow_html=True)
    css = """
    <style>
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }

    @keyframes pageReveal {
        from { opacity: 0; filter: blur(4px); transform: translateY(12px); }
        to { opacity: 1; filter: blur(0); transform: translateY(0); }
    }
    [data-testid="stAppViewBlockContainer"] {
        animation: pageReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
    }
    @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes orbDrift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(80px, -50px) scale(1.1); }
        50% { transform: translate(20px, -80px) scale(0.95); }
        75% { transform: translate(-40px, -30px) scale(1.05); }
    }
    @keyframes orbDrift2 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(-60px, 40px); }
        66% { transform: translate(40px, -30px); }
    }
    @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }
    @keyframes scrollBounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
        40% { transform: translateY(-6px) translateX(-50%); }
        60% { transform: translateY(-3px) translateX(-50%); }
    }
    @keyframes particleDrift {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
        50% { opacity: 0.15; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes glowPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
    }
    @keyframes gradientText {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes aurora {
        0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.5; }
        25% { transform: translateY(-30px) scale(1.1) rotate(3deg); opacity: 0.7; }
        50% { transform: translateY(-15px) scale(0.95) rotate(-2deg); opacity: 0.4; }
        75% { transform: translateY(-40px) scale(1.05) rotate(1deg); opacity: 0.65; }
    }
    @keyframes staggerIn {
        from { opacity: 0; transform: translateY(18px); filter: blur(3px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes lineDraw {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
    }
    @keyframes crossSpin {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.35; }
        50% { opacity: 0.12; }
        100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
    }

    /* ---- AURORA MESH ---- */
    .aurora-mesh {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }
    .aurora-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        mix-blend-mode: screen;
    }

    /* ---- GREETING BADGE ---- */
    .greeting-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(139,92,246,0.08);
        border: 1px solid rgba(139,92,246,0.15);
        padding: 0.35rem 1rem;
        border-radius: 50px;
        color: #c4b5fd;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.4px;
        margin-bottom: 0.75rem;
    }

    /* ---- MOUSE GLOW ---- */
    .hero-card::after {
        content: '';
        position: absolute;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%);
        border-radius: 50%;
        pointer-events: none;
        left: var(--mouse-x, 50%);
        top: var(--mouse-y, 50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .hero-card:hover::after { opacity: 1; }

    /* ---- DOT GRID OVERLAY ---- */
    .dot-grid {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
        background-image: radial-gradient(rgba(139,92,246,0.07) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%);
        -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%);
    }

    /* ---- STAGGER SUPPORT ---- */
    .stagger { animation: staggerIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .stagger-1 { animation-delay: 0.1s; }
    .stagger-2 { animation-delay: 0.2s; }
    .stagger-3 { animation-delay: 0.35s; }
    .stagger-4 { animation-delay: 0.5s; }
    .stagger-5 { animation-delay: 0.65s; }
    .stagger-6 { animation-delay: 0.8s; }
    .stagger-7 { animation-delay: 0.95s; }

    /* ---- GEOMETRIC PARTICLES ---- */
    .geo-particle {
        position: absolute;
        bottom: -20px;
        pointer-events: none;
        opacity: 0;
    }
    .geo-cross {
        width: 12px;
        height: 12px;
        position: relative;
        animation: crossSpin linear infinite;
    }
    .geo-cross::before, .geo-cross::after {
        content: '';
        position: absolute;
        background: currentColor;
        border-radius: 1px;
    }
    .geo-cross::before {
        width: 100%; height: 1.5px;
        top: 50%; left: 0;
        transform: translateY(-50%);
    }
    .geo-cross::after {
        width: 1.5px; height: 100%;
        left: 50%; top: 0;
        transform: translateX(-50%);
    }
    .geo-ring {
        border: 1.5px solid currentColor;
        border-radius: 50%;
        animation: particleDrift linear infinite;
    }
    .geo-diamond {
        width: 8px; height: 8px;
        transform-origin: center;
        border: 1.5px solid currentColor;
        animation: crossSpin linear infinite;
    }

    .main, .stApp {
        background: linear-gradient(135deg, #060a13 0%, #0c1222 20%, #141332 45%, #1e1650 70%, #251a5e 100%);
        background-size: 300% 300%;
        animation: gradientMove 25s ease infinite;
        position: relative;
        min-height: 100vh;
        overflow-x: hidden;
    }

    .main::before {
        content: '';
        position: fixed;
        top: 8%;
        left: -8%;
        width: 450px;
        height: 450px;
        background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%);
        border-radius: 50%;
        pointer-events: none;
        animation: orbDrift1 25s infinite ease-in-out;
        filter: blur(40px);
    }
    .main::after {
        content: '';
        position: fixed;
        bottom: 5%;
        right: -8%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 65%);
        border-radius: 50%;
        pointer-events: none;
        animation: orbDrift2 30s infinite ease-in-out;
        filter: blur(40px);
    }

    h1, h2, h3 { color: #f1f5f9; }

    [data-testid="stSidebar"] {
        background: rgba(15,23,42,0.95);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(139,92,246,0.15);
    }
    [data-testid="stSidebar"] * { color: #cbd5e1 !important; }

    /* ---- HERO ---- */
    .hero-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(28px);
        border: 1px solid rgba(139,92,246,0.12);
        border-radius: 32px;
        padding: 5rem 3.5rem 4.5rem;
        max-width: 960px;
        margin: 2rem auto 0;
        text-align: center;
        animation: staggerIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        position: relative;
        overflow: hidden;
        transition: border-color 0.6s ease, box-shadow 0.6s ease, transform 0.6s ease;
        box-shadow: 0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .hero-card:hover {
        border-color: rgba(139,92,246,0.35);
        box-shadow: 0 0 80px rgba(139,92,246,0.08), 0 30px 60px rgba(0,0,0,0.35);
    }
    .hero-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #f59e0b);
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
    }

    .hero-avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        margin: 0 auto 2.5rem;
        overflow: hidden;
        border: 3px solid rgba(139,92,246,0.4);
        box-shadow: 0 0 30px rgba(139,92,246,0.15), 0 4px 20px rgba(0,0,0,0.3);
        animation: float 8s infinite ease-in-out;
        position: relative;
    }
    .hero-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(99,102,241,0.15);
        border: 1px solid rgba(99,102,241,0.3);
        padding: 0.5rem 1.25rem;
        border-radius: 50px;
        color: #a5b4fc;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        letter-spacing: 0.3px;
    }
    .hero-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 3.2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #f1f5f9, #c4b5fd, #e9b0ff, #fcd34d);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 8s linear infinite;
        margin-bottom: 0.75rem;
        letter-spacing: -1px;
    }
    .hero-role {
        font-size: 1.15rem;
        font-weight: 500;
        color: #b8c4d6;
        margin-bottom: 2rem;
        letter-spacing: 0.8px;
    }
    .hero-role strong { color: #c4b5fd; font-weight: 600; }
    .hero-desc {
        font-size: 1.02rem;
        color: #b8c9db;
        max-width: 600px;
        margin: 0 auto 2rem;
        line-height: 1.9;
    }
    .hero-highlight {
        font-weight: 600;
        background: linear-gradient(135deg, #a5b4fc, #c4b5fd, #f9a8d4);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientText 4s ease infinite;
    }
    .hero-cta-row {
        display: flex;
        justify-content: center;
        gap: 1.25rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    .hero-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.75rem;
        border-radius: 14px;
        font-weight: 700;
        font-size: 0.88rem;
        text-decoration: none !important;
        transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        letter-spacing: 0.2px;
    }
    .hero-cta * { text-decoration: none !important; }
    .hero-cta-primary {
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        color: white;
        box-shadow: 0 8px 28px rgba(124,58,237,0.35);
    }
    .hero-cta-primary:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 14px 36px rgba(124,58,237,0.5);
        background: linear-gradient(135deg, #8b5cf6, #c084fc);
    }
    .hero-cta-outline {
        background: rgba(255,255,255,0.04);
        color: #c4b5fd;
        border: 1px solid rgba(196,181,253,0.35);
    }
    .hero-cta-outline:hover {
        background: rgba(139,92,246,0.12);
        border-color: rgba(196,181,253,0.6);
        transform: translateY(-3px);
        color: #e0d5ff;
    }

    @media (max-width: 768px) {
        .hero-name { font-size: 2.2rem; }
        .hero-role { font-size: 1rem; }
    }

    /* ---- FOOTER ---- */
    .footer-section {
        text-align: center;
        padding: 2.5rem 0 1.5rem;
        max-width: 960px;
        margin: 0 auto;
        border-top: 1px solid rgba(255,255,255,0.06);
        animation: fadeInUp 0.8s ease-out 0.5s both;
    }
    .footer-text {
        color: #e2e8f0;
        font-size: 0.9rem;
    }
    .footer-text a { color: #a5b4fc; text-decoration: none; font-weight: 600; }
    .footer-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 1rem;
    }
    .footer-link {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        color: #e2e8f0;
        font-size: 1.2rem;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .footer-link:hover {
        background: rgba(139,92,246,0.15);
        border-color: rgba(139,92,246,0.3);
        color: #c4b5fd;
        transform: translateY(-4px) rotate(-5deg) scale(1.15);
        box-shadow: 0 8px 20px rgba(139,92,246,0.25);
    }
    .footer-link:nth-child(1):hover { color: #e2e8f0; background: rgba(255,255,255,0.08); }
    .footer-link:nth-child(2):hover { color: #60a5fa; background: rgba(59,130,246,0.12); }
    .footer-link:nth-child(3):hover { color: #a5b4fc; background: rgba(99,102,241,0.12); }
    .footer-link:nth-child(4):hover { color: #e2e8f0; background: rgba(255,255,255,0.06); }

    /* ---- PARTICLES ---- */
    .particles-container {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }

    /* ---- SCROLL INDICATOR ---- */
    .scroll-indicator {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        animation: scrollBounce 2.5s ease-in-out infinite;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.4s ease;
    }
    .scroll-indicator:hover { opacity: 1; }
    .scroll-indicator-inner {
        width: 26px;
        height: 40px;
        border: 1.5px solid rgba(165,180,252,0.4);
        border-radius: 13px;
        display: flex;
        justify-content: center;
        padding-top: 8px;
    }
    .scroll-dot {
        width: 3px;
        height: 7px;
        background: rgba(165,180,252,0.7);
        border-radius: 2px;
        animation: float 2s ease-in-out infinite;
    }

    /* ---- FOCUS DOMAINS ---- */
    .focus-domains {
        display: flex;
        justify-content: center;
        gap: 0.85rem;
        flex-wrap: wrap;
        max-width: 700px;
        margin: 2.5rem auto 3.5rem;
        animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
    }
    .focus-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.6rem 1.4rem;
        background: rgba(139,92,246,0.07);
        border: 1px solid rgba(139,92,246,0.18);
        border-radius: 50px;
        color: #c4b5fd;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        cursor: default;
    }
    .focus-pill:hover {
        background: rgba(139,92,246,0.14);
        border-color: rgba(139,92,246,0.4);
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(139,92,246,0.12);
        color: #e0d5ff;
    }
    .focus-pill i {
        font-size: 0.85rem;
        color: #a78bfa;
    }

    /* ---- SECTION DIVIDER ---- */
    .section-divider {
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 960px;
        margin: 0 auto 2.5rem;
        animation: fadeInUp 0.6s ease-out both;
    }
    .section-divider::before,
    .section-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
    }
    .section-divider-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(139,92,246,0.1);
        border: 1px solid rgba(139,92,246,0.2);
        color: #a5b4fc;
        font-size: 0.85rem;
    }

    /* ---- BUTTONS ---- */
    .stButton > button {
        background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
        color: white !important;
        border: none !important;
        border-radius: 14px;
        padding: 0.85rem 2.5rem;
        font-weight: 700;
        font-size: 0.9rem;
        transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: 0 8px 28px rgba(124,58,237,0.3);
    }
    .stButton > button:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(124,58,237,0.45);
    }

    /* ---- EXPLORE CARDS ---- */
    .explore-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        max-width: 960px;
        margin: 0 auto 4rem;
        animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
    }
    @media (max-width: 768px) {
        .explore-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .explore-card {
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(139,92,246,0.10);
        border-radius: 22px;
        padding: 2.25rem 1.5rem;
        text-align: center;
        text-decoration: none !important;
        transition: border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        display: block;
        transform-style: preserve-3d;
    }
    .explore-card * { text-decoration: none !important; }
    .explore-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: var(--card-gradient, linear-gradient(90deg, #6366f1, #a855f7));
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .explore-card::after {
        content: '';
        position: absolute;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, var(--card-shadow, rgba(99,102,241,0.12)) 0%, transparent 65%);
        border-radius: 50%;
        pointer-events: none;
        left: var(--mouse-x, 50%);
        top: var(--mouse-y, 50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .explore-card:hover::before { opacity: 1; }
    .explore-card:hover::after { opacity: 1; }
    .explore-card:hover {
        background: rgba(255,255,255,0.06);
        border-color: var(--card-border, rgba(99,102,241,0.25));
        box-shadow: 0 20px 40px var(--card-shadow, rgba(99,102,241,0.12));
    }
    .explore-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-size: 1.4rem;
        color: white;
        background: var(--icon-bg, linear-gradient(135deg, #6366f1, #8b5cf6));
        transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .explore-card:hover .explore-icon {
        transform: scale(1.1) rotate(-3deg);
    }
    .explore-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.4rem;
        transition: color 0.3s ease;
    }
    .explore-card:hover .explore-title { color: #f1f5f9; }
    .explore-desc {
        font-size: 0.82rem;
        color: #e2e8f0;
        line-height: 1.5;
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

def get_img_base64(img_path):
    try:
        with open(img_path, "rb") as f:
            data = f.read()
        return base64.b64encode(data).decode()
    except:
        return None

load_css()

# --- AURORA MESH ---
aurora_blobs = [
    {"color": "rgba(99,102,241,0.12)", "w": 500, "h": 500, "top": "5%", "left": "-5%", "dur": 18},
    {"color": "rgba(168,85,247,0.10)", "w": 400, "h": 400, "top": "60%", "left": "70%", "dur": 22},
    {"color": "rgba(236,72,153,0.08)", "w": 350, "h": 350, "top": "30%", "left": "50%", "dur": 26},
    {"color": "rgba(20,184,166,0.07)", "w": 300, "h": 300, "top": "70%", "left": "10%", "dur": 20},
]
aurora_html = '<div class="aurora-mesh">'
for b in aurora_blobs:
    aurora_html += f'<div class="aurora-blob" style="background:{b["color"]};width:{b["w"]}px;height:{b["h"]}px;top:{b["top"]};left:{b["left"]};animation:aurora {b["dur"]}s ease-in-out infinite;"></div>'
aurora_html += '</div>'
st.markdown(aurora_html, unsafe_allow_html=True)

# --- DOT GRID ---
st.markdown('<div class="dot-grid"></div>', unsafe_allow_html=True)

# --- GEOMETRIC PARTICLES ---
geo_html = '<div class="particles-container">'
geo_colors = ['rgba(99,102,241,0.5)', 'rgba(168,85,247,0.4)', 'rgba(236,72,153,0.35)', 'rgba(139,92,246,0.45)']
geo_shapes = ['geo-cross', 'geo-ring', 'geo-diamond']
for i in range(14):
    left = random.uniform(2, 98)
    size = random.uniform(6, 14)
    duration = random.uniform(18, 35)
    delay = random.uniform(0, 20)
    color = geo_colors[i % len(geo_colors)]
    shape = geo_shapes[i % len(geo_shapes)]
    geo_html += f'<div class="geo-particle {shape}" style="left:{left:.1f}%;width:{size:.0f}px;height:{size:.0f}px;color:{color};animation-duration:{duration:.0f}s;animation-delay:{delay:.0f}s;"></div>'
geo_html += '</div>'
st.markdown(geo_html, unsafe_allow_html=True)

# --- DYNAMIC GREETING ---
hour = datetime.now().hour
if hour < 12:
    greeting_icon = "fas fa-sun"
    greeting_text = "Good Morning"
elif hour < 17:
    greeting_icon = "fas fa-cloud-sun"
    greeting_text = "Good Afternoon"
elif hour < 21:
    greeting_icon = "fas fa-moon"
    greeting_text = "Good Evening"
else:
    greeting_icon = "fas fa-star"
    greeting_text = "Hello, Night Owl"

profile_img_path = Path("assets/headshot image.png")
img_html = ""
if profile_img_path.exists():
    img_base64 = get_img_base64(profile_img_path)
    if img_base64:
        img_html = f'<div class="hero-avatar"><img src="data:image/png;base64,{img_base64}"></div>'

st.markdown(f"""
<div class="hero-card" id="heroCard">
    <div class="greeting-badge stagger stagger-1"><i class="{greeting_icon}"></i> {greeting_text} &mdash; Welcome to My Portfolio</div>
    <div class="hero-badge stagger stagger-2">
        <i class="fas fa-graduation-cap"></i>
        M.S. Computer Engineering @ Arizona State University
    </div>
    <div class="stagger stagger-3">{img_html}</div>
    <div class="hero-name stagger stagger-4">Saurabh Nilesh Dusane</div>
    <div class="hero-role stagger stagger-5"><strong>AI/ML Engineer</strong> &nbsp;/&nbsp; Data Scientist &nbsp;/&nbsp; Full-Stack AI Builder</div>
    <div class="hero-desc stagger stagger-6">
        Passionate about building <span class="hero-highlight">intelligent ML systems</span> that
        transform real-world data into <span class="hero-highlight">meaningful outcomes</span>.
        Exploring the intersection of predictive analytics, NLP, and scalable AI solutions.
    </div>
    <div class="hero-cta-row stagger stagger-7">
        <a href="/Bio" class="hero-cta hero-cta-primary"><i class="fas fa-user"></i> Explore My Work</a>
        <a href="mailto:sdusane1@asu.edu" class="hero-cta hero-cta-outline"><i class="fas fa-envelope"></i> Get In Touch</a>
    </div>
</div>

<div class="scroll-indicator">
    <div class="scroll-indicator-inner">
        <div class="scroll-dot"></div>
    </div>
</div>

""", unsafe_allow_html=True)

st.markdown("""
<div class="focus-domains">
    <div class="focus-pill"><i class="fas fa-brain"></i> Machine Learning</div>
    <div class="focus-pill"><i class="fas fa-chart-line"></i> Data Science</div>
    <div class="focus-pill"><i class="fas fa-robot"></i> Conversational AI</div>
    <div class="focus-pill"><i class="fas fa-eye"></i> Computer Vision</div>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="section-divider"><div class="section-divider-icon"><i class="fas fa-compass"></i></div></div>', unsafe_allow_html=True)

st.markdown("""
<div class="explore-grid">
    <a href="/Bio" class="explore-card" style="--card-gradient:linear-gradient(90deg,#6366f1,#a855f7); --card-border:rgba(99,102,241,0.3); --card-shadow:rgba(99,102,241,0.15); --icon-bg:linear-gradient(135deg,#6366f1,#818cf8);">
        <div class="explore-icon"><i class="fas fa-user"></i></div>
        <div class="explore-title">About Me</div>
        <div class="explore-desc">Education, skills & experience</div>
    </a>
    <a href="/Projects" class="explore-card" style="--card-gradient:linear-gradient(90deg,#a855f7,#ec4899); --card-border:rgba(168,85,247,0.3); --card-shadow:rgba(168,85,247,0.15); --icon-bg:linear-gradient(135deg,#a855f7,#c084fc);">
        <div class="explore-icon"><i class="fas fa-code-branch"></i></div>
        <div class="explore-title">Projects</div>
        <div class="explore-desc">ML, NLP & AI solutions</div>
    </a>
    <a href="/Writing" class="explore-card" style="--card-gradient:linear-gradient(90deg,#14b8a6,#3b82f6); --card-border:rgba(20,184,166,0.3); --card-shadow:rgba(20,184,166,0.15); --icon-bg:linear-gradient(135deg,#14b8a6,#2dd4bf);">
        <div class="explore-icon"><i class="fas fa-pen-nib"></i></div>
        <div class="explore-title">Writing</div>
        <div class="explore-desc">Essays on AI, ethics & strategy</div>
    </a>
    <a href="/Contact" class="explore-card" style="--card-gradient:linear-gradient(90deg,#f59e0b,#ec4899); --card-border:rgba(245,158,11,0.3); --card-shadow:rgba(245,158,11,0.15); --icon-bg:linear-gradient(135deg,#f59e0b,#fbbf24);">
        <div class="explore-icon"><i class="fas fa-envelope"></i></div>
        <div class="explore-title">Contact</div>
        <div class="explore-desc">Let's connect & collaborate</div>
    </a>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="footer-section">
    <p class="footer-text">
        Built with <i class="fas fa-heart" style="color: #8b5cf6;"></i> using
        <a href="https://streamlit.io" target="_blank">Streamlit</a>
    </p>
    <div class="footer-links">
        <a href="https://github.com/SaurabhDusane" target="_blank" class="footer-link" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/saurabh-dusane" target="_blank" class="footer-link" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:sdusane1@asu.edu" class="footer-link" title="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://medium.com/@saurndusane13" target="_blank" class="footer-link" title="Medium"><i class="fab fa-medium"></i></a>
    </div>
</div>
""", unsafe_allow_html=True)

# --- INTERACTIVE JS (injected last so all DOM elements exist) ---
st.markdown("""
<script>
(function init() {
    const hero = document.getElementById('heroCard');
    const cards = document.querySelectorAll('.explore-card');

    // Retry if Streamlit hasn't rendered elements yet
    if (!hero && !cards.length) { setTimeout(init, 200); return; }

    // Mouse-tracking glow on hero card
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            hero.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            hero.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    }

    // Mouse-tracking glow + 3D tilt on explore cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateX = ((y - midY) / midY) * -6;
            const rotateY = ((x - midX) / midX) * 6;
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();
</script>
""", unsafe_allow_html=True)
