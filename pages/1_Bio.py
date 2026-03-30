import streamlit as st
import base64
import random
from pathlib import Path

st.set_page_config(
    page_title="Saurabh Dusane - About Me",
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
        50% { transform: translateY(-12px); }
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
    @keyframes ringPulse {
        0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); }
        70% { box-shadow: 0 0 0 20px rgba(139,92,246,0); }
        100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
    }
    @keyframes skillFill {
        from { width: 0; }
        to { width: var(--skill-pct, 80%); }
    }
    @keyframes particleDrift {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
    }
    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 8px rgba(139,92,246,0.3); }
        50% { box-shadow: 0 0 20px rgba(139,92,246,0.6); }
    }
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes aurora {
        0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.5; }
        25% { transform: translateY(-30px) scale(1.1) rotate(3deg); opacity: 0.7; }
        50% { transform: translateY(-15px) scale(0.95) rotate(-2deg); opacity: 0.4; }
        75% { transform: translateY(-40px) scale(1.05) rotate(1deg); opacity: 0.65; }
    }
    @keyframes iconFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-6px) rotate(3deg); }
        75% { transform: translateY(4px) rotate(-3deg); }
    }
    @keyframes cardShine {
        0% { left: -75%; }
        100% { left: 125%; }
    }
    @keyframes timelinePulse {
        0%, 100% { height: 0%; opacity: 0; }
        100% { height: 100%; opacity: 1; }
    }
    @keyframes badgeBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
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

    .main, .stApp {
        background: linear-gradient(135deg, #060a13 0%, #0c1222 20%, #141332 45%, #1e1650 70%, #251a5e 100%);
        background-size: 300% 300%;
        animation: gradientMove 20s ease infinite;
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

    .page-header {
        text-align: center;
        padding: 2rem 2rem 1rem;
        max-width: 960px;
        margin: 0 auto 1.5rem;
        animation: fadeInUp 0.6s ease-out both;
    }
    .page-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #e2e8f0;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
    }
    .page-title i { color: #a5b4fc; font-size: 1.5rem; }

    .profile-wrapper {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 2.5rem 2rem;
        max-width: 1000px;
        margin: 0 auto 2.5rem;
        animation: fadeInUp 0.7s ease-out both;
        position: relative;
        overflow: hidden;
    }
    .profile-wrapper::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #f59e0b);
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
    }

    .profile-img {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        margin: 0 auto 1.5rem;
        overflow: hidden;
        border: 4px solid rgba(139,92,246,0.5);
        animation: float 6s infinite ease-in-out, ringPulse 3s infinite;
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease;
        cursor: pointer;
    }
    .profile-img:hover {
        transform: scale(1.08);
        border-color: rgba(168,85,247,0.8);
    }
    .profile-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }
    .profile-img:hover img {
        transform: scale(1.1);
    }

    .bio-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #e0e7ff, #c4b5fd, #f9a8d4);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 6s linear infinite;
        margin-bottom: 0.75rem;
    }
    .bio-text {
        font-size: 0.95rem;
        color: #e2e8f0;
        line-height: 1.8;
        margin-bottom: 1rem;
    }

    .expertise-box {
        background: rgba(99,102,241,0.08);
        border: 1px solid rgba(99,102,241,0.2);
        border-radius: 16px;
        padding: 1.5rem;
        margin: 1.5rem 0;
    }
    .expertise-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #a5b4fc;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .expertise-text {
        color: #e2e8f0;
        font-size: 0.9rem;
        line-height: 1.75;
    }

    .glass-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        animation: fadeInUp 0.8s ease-out 0.1s both;
        position: relative;
        overflow: hidden;
    }
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
        opacity: 0.7;
    }
    .glass-card-edu { animation-delay: 0.15s; }
    .glass-card-skills { animation-delay: 0.25s; }
    .glass-card-exp { animation-delay: 0.35s; }
    .glass-card-lead { animation-delay: 0.45s; }
    .glass-card:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(139,92,246,0.2);
        box-shadow: 0 20px 50px rgba(139,92,246,0.08);
    }
    .glass-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
        transform: skewX(-25deg);
        pointer-events: none;
    }
    .glass-card:hover::after {
        animation: cardShine 0.8s ease-out;
    }

    .section-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.35rem;
        font-weight: 700;
        color: #e2e8f0;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .section-heading i {
        animation: iconFloat 3s ease-in-out infinite;
    }

    .edu-item {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-left: 3px solid var(--accent, #6366f1);
        border-radius: 14px;
        padding: 1.75rem;
        margin-bottom: 1.25rem;
        transition: all 0.35s ease;
    }
    .edu-item:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.1);
        border-left-color: var(--accent, #6366f1);
        transform: translateX(6px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    /* Timeline dots */
    .edu-item {
        position: relative;
    }
    .edu-item::before {
        content: '';
        position: absolute;
        left: -11px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--accent, #6366f1);
        border: 2px solid rgba(15,23,42,0.9);
        box-shadow: 0 0 10px var(--accent, #6366f1);
        transition: all 0.3s ease;
    }
    .edu-item:hover::before {
        transform: translateY(-50%) scale(1.4);
        box-shadow: 0 0 20px var(--accent, #6366f1);
    }
    .edu-degree {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.25rem;
    }
    .edu-sub {
        font-size: 0.85rem;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    .edu-meta {
        font-size: 0.82rem;
        color: #e2e8f0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .edu-meta i { color: #a5b4fc; font-size: 0.8rem; }

    .badge-sm {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.75rem;
        border-radius: 50px;
        font-size: 0.72rem;
        font-weight: 600;
        margin-right: 0.5rem;
        margin-top: 0.5rem;
    }
    .badge-green { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
    .badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }

    .coursework-wrap {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
    .course-pill {
        display: inline-block;
        background: rgba(99,102,241,0.1);
        color: #a5b4fc;
        padding: 0.3rem 0.75rem;
        border-radius: 50px;
        font-size: 0.72rem;
        font-weight: 500;
        border: 1px solid rgba(99,102,241,0.2);
        transition: all 0.25s ease;
    }
    .course-pill:hover {
        background: rgba(99,102,241,0.25);
        border-color: rgba(99,102,241,0.5);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 4px 12px rgba(99,102,241,0.2);
    }

    .skill-category {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-left: 3px solid var(--accent, #6366f1);
        border-radius: 14px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.35s ease;
    }
    .skill-category:hover {
        background: rgba(255,255,255,0.06);
        transform: translateX(6px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    .skill-cat-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .skill-cat-title i { font-size: 0.9rem; }
    .skill-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
    .skill-pill {
        display: inline-block;
        padding: 0.35rem 0.85rem;
        border-radius: 50px;
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--pill-color, #a5b4fc);
        background: var(--pill-bg, rgba(99,102,241,0.1));
        border: 1px solid var(--pill-border, rgba(99,102,241,0.2));
        transition: all 0.25s ease;
    }
    .skill-pill:hover {
        transform: translateY(-3px) scale(1.08);
        filter: brightness(1.3);
        box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    }

    /* Animated skill bars */
    .skill-bar-wrap {
        margin-top: 0.75rem;
    }
    .skill-bar-item {
        margin-bottom: 0.6rem;
    }
    .skill-bar-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #e2e8f0;
        margin-bottom: 0.3rem;
        font-weight: 500;
    }
    .skill-bar-track {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.06);
        border-radius: 3px;
        overflow: hidden;
    }
    .skill-bar-fill {
        height: 100%;
        border-radius: 3px;
        animation: skillFill 1.5s ease-out both;
        position: relative;
    }
    .skill-bar-fill::after {
        content: '';
        position: absolute;
        right: 0;
        top: -1px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: inherit;
        box-shadow: 0 0 8px currentColor;
        animation: pulseGlow 2s ease-in-out infinite;
    }

    /* ---- STAGGER ANIMATIONS ---- */
    .glass-card-edu .edu-item:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.1s both; }
    .glass-card-edu .edu-item:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.2s both; }
    .glass-card-skills .skill-category:nth-child(2) { animation: fadeInUp 0.5s ease-out 0.05s both; }
    .glass-card-skills .skill-category:nth-child(3) { animation: fadeInUp 0.5s ease-out 0.1s both; }
    .glass-card-skills .skill-category:nth-child(4) { animation: fadeInUp 0.5s ease-out 0.15s both; }
    .glass-card-skills .skill-category:nth-child(5) { animation: fadeInUp 0.5s ease-out 0.2s both; }
    .glass-card-skills .skill-category:nth-child(6) { animation: fadeInUp 0.5s ease-out 0.25s both; }
    .glass-card-skills .skill-category:nth-child(7) { animation: fadeInUp 0.5s ease-out 0.3s both; }
    .glass-card-exp .exp-item:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.1s both; }
    .glass-card-exp .exp-item:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.2s both; }
    .glass-card-exp .exp-item:nth-child(4) { animation: fadeInUp 0.6s ease-out 0.3s both; }

    .exp-item {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-left: 3px solid var(--accent, #10b981);
        border-radius: 14px;
        padding: 1.75rem;
        margin-bottom: 1.25rem;
        transition: all 0.35s ease;
        position: relative;
    }
    .exp-item:hover {
        background: rgba(255,255,255,0.06);
        transform: translateX(6px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    /* Timeline dots for exp items */
    .exp-item::before {
        content: '';
        position: absolute;
        left: -11px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--accent, #10b981);
        border: 2px solid rgba(15,23,42,0.9);
        box-shadow: 0 0 10px var(--accent, #10b981);
        transition: all 0.3s ease;
    }
    .exp-item:hover::before {
        transform: translateY(-50%) scale(1.4);
        box-shadow: 0 0 20px var(--accent, #10b981);
    }
    .exp-badge {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-size: 0.68rem;
        font-weight: 600;
    }
    .exp-badge-current { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.25); animation: badgeBounce 2s ease-in-out infinite; }
    .exp-badge-intern { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }
    .exp-badge-teaching { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.25); }
    .exp-badge-founder { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.25); }

    .exp-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.35rem;
        padding-right: 6rem;
    }
    .exp-company {
        color: #e2e8f0;
        font-size: 0.88rem;
        margin-bottom: 0.35rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
    .exp-company i { color: var(--accent, #10b981); font-size: 0.8rem; }
    .exp-duration {
        color: #e2e8f0;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
    .exp-duration i { color: var(--accent, #10b981); font-size: 0.75rem; }

    .exp-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .exp-list li {
        color: #e2e8f0;
        font-size: 0.88rem;
        line-height: 1.7;
        margin-bottom: 0.5rem;
        padding-left: 1.25rem;
        position: relative;
    }
    .exp-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65rem;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--accent, #10b981);
    }

    .metric-hl {
        font-weight: 700;
        color: #fbbf24;
        position: relative;
        transition: all 0.3s ease;
    }
    .metric-hl::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #fbbf24, #f59e0b);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
    }
    .exp-item:hover .metric-hl::after {
        transform: scaleX(1);
    }
    .exp-item:hover .metric-hl {
        color: #fde68a;
        text-shadow: 0 0 12px rgba(251,191,36,0.3);
    }

    /* Particles */
    .particles-container {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }
    .particle {
        position: absolute;
        bottom: -20px;
        border-radius: 50%;
        opacity: 0;
        animation: particleDrift linear infinite;
    }

    .stButton > button {
        background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
        color: white !important;
        border: none !important;
        border-radius: 14px;
        padding: 0.85rem 2.5rem;
        font-weight: 700;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        box-shadow: 0 8px 24px rgba(99,102,241,0.3);
    }
    .stButton > button:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(99,102,241,0.45);
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
    {"color": "rgba(99,102,241,0.10)", "w": 450, "h": 450, "top": "10%", "left": "-5%", "dur": 20},
    {"color": "rgba(168,85,247,0.08)", "w": 380, "h": 380, "top": "55%", "left": "65%", "dur": 24},
    {"color": "rgba(20,184,166,0.06)", "w": 300, "h": 300, "top": "75%", "left": "15%", "dur": 22},
]
aurora_html = '<div class="aurora-mesh">'
for b in aurora_blobs:
    aurora_html += f'<div class="aurora-blob" style="background:{b["color"]};width:{b["w"]}px;height:{b["h"]}px;top:{b["top"]};left:{b["left"]};animation:aurora {b["dur"]}s ease-in-out infinite;"></div>'
aurora_html += '</div>'
st.markdown(aurora_html, unsafe_allow_html=True)

particles_html = '<div class="particles-container">'
p_colors = ['rgba(99,102,241,0.35)', 'rgba(168,85,247,0.3)', 'rgba(236,72,153,0.25)', 'rgba(139,92,246,0.3)']
for i in range(15):
    left = random.uniform(0, 100)
    size = random.uniform(3, 7)
    dur = random.uniform(14, 30)
    delay = random.uniform(0, 12)
    color = p_colors[i % len(p_colors)]
    particles_html += f'<div class="particle" style="left:{left:.1f}%;width:{size:.1f}px;height:{size:.1f}px;background:{color};animation-duration:{dur:.1f}s;animation-delay:{delay:.1f}s;"></div>'
particles_html += '</div>'
st.markdown(particles_html, unsafe_allow_html=True)

# --- PAGE HEADER ---
st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-user"></i> About Me</div>
</div>
""", unsafe_allow_html=True)

# --- ABOUT ME ---
col1, col2 = st.columns([1, 2], gap="large")

with col1:
    profile_img_path = Path("assets/headshot image.png")
    if profile_img_path.exists():
        img_base64 = get_img_base64(profile_img_path)
        if img_base64:
            st.markdown(f'<img src="data:image/png;base64,{img_base64}" class="profile-img">', unsafe_allow_html=True)

    resume_path = Path("assets/Resume_Saurabh_Nilesh_Dusane.pdf")
    if resume_path.exists():
        with open(resume_path, "rb") as pdf_file:
            st.download_button(
                label="Download Resume",
                data=pdf_file,
                file_name="Resume_Saurabh_Nilesh_Dusane.pdf",
                mime="application/pdf",
                use_container_width=True
            )

with col2:
    st.markdown('<div class="bio-name">Hello, I\'m Saurabh</div>', unsafe_allow_html=True)
    st.markdown('<div class="bio-text">I\'m an AI/ML Engineer who ships <strong style="color:#c4b5fd;">production-grade intelligent systems</strong>. Currently pursuing my M.S. in Computer Engineering at Arizona State University (4.0 GPA), I specialize in turning complex, messy data into solutions that drive <strong style="color:#c4b5fd;">measurable business outcomes</strong>&mdash;from predictive models processing 50K+ records to conversational AI serving real users.</div>', unsafe_allow_html=True)

    st.markdown('<div class="expertise-box"><div class="expertise-heading"><i class="fas fa-bolt"></i> Core Competencies</div><div class="expertise-text">End-to-end ML pipeline design &bull; Deep learning &amp; NLP at scale &bull; Predictive analytics with 85%+ accuracy &bull; Production deployment on AWS/GCP &bull; Real-time data processing &bull; Business intelligence dashboards &bull; Cross-functional Agile delivery &bull; Technical mentorship of 200+ students</div></div>', unsafe_allow_html=True)

    st.markdown('<div class="bio-text">I don\'t just build models&mdash;I deliver <strong style="color:#c4b5fd;">end-to-end AI solutions</strong> that move metrics. Every project I take on blends rigorous engineering with creative problem-solving, and I\'ve consistently delivered systems that improve operational efficiency by <strong style="color:#fbbf24;">18-30%</strong>. I thrive at the intersection of research and real-world impact.</div>', unsafe_allow_html=True)

# --- EDUCATION ---
st.markdown("""
<div class="glass-card glass-card-edu">
    <div class="section-heading"><i class="fas fa-graduation-cap" style="color: #6366f1;"></i> Education</div>
    <div class="edu-item" style="--accent: #a855f7;">
        <div class="edu-degree">Master of Science in Computer Engineering</div>
        <div class="edu-sub">(Computer Systems)</div>
        <div class="edu-meta"><i class="fas fa-university"></i> Arizona State University | Aug 2024 - Present</div>
        <span class="badge-sm badge-green"><i class="fas fa-star"></i> GPA: 4.00/4.00</span>
        <span class="badge-sm badge-blue"><i class="fas fa-calendar-alt"></i> Expected May 2026</span>
        <div class="edu-sub" style="margin-top: 0.75rem; font-style: italic; color: #e2e8f0;">Focus: Machine Learning Systems, Advanced Data Mining, Blockchain Architecture</div>
        <div class="coursework-wrap">
            <span class="course-pill">Data Mining</span>
            <span class="course-pill">Semantic Web Mining</span>
            <span class="course-pill">Engineering Blockchain Applications</span>
            <span class="course-pill">Foundation of Algorithms</span>
            <span class="course-pill">Advanced ML Systems</span>
        </div>
    </div>
    <div class="edu-item" style="--accent: #6366f1;">
        <div class="edu-degree">Bachelor of Engineering in AI & Data Science</div>
        <div class="edu-meta"><i class="fas fa-university"></i> K. K. Wagh Institute of Engineering | June 2020 - May 2024</div>
        <div class="edu-sub" style="font-style: italic; color: #e2e8f0;">Comprehensive foundation in AI/ML with focus on practical applications and research</div>
        <div class="coursework-wrap">
            <span class="course-pill">Machine Learning</span>
            <span class="course-pill">Deep Learning</span>
            <span class="course-pill">Statistical Analysis</span>
            <span class="course-pill">Data Mining</span>
            <span class="course-pill">Business Intelligence</span>
            <span class="course-pill">Computer Vision</span>
            <span class="course-pill">NLP</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# --- SKILLS ---
st.markdown("""
<div class="glass-card glass-card-skills">
    <div class="section-heading"><i class="fas fa-code" style="color: #6366f1;"></i> Skills & Technologies</div>
    <div class="skill-category" style="--accent: #6366f1;">
        <div class="skill-cat-title"><i class="fas fa-terminal" style="color: #6366f1;"></i> Programming Languages</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">Python</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">SQL</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">R</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">C/C++</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">Go</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">Java</span>
            <span class="skill-pill" style="--pill-color:#a5b4fc; --pill-bg:rgba(99,102,241,0.1); --pill-border:rgba(99,102,241,0.2);">Scala</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #a855f7;">
        <div class="skill-cat-title"><i class="fas fa-brain" style="color: #a855f7;"></i> ML & AI Frameworks</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">TensorFlow</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">PyTorch</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">Keras</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">Scikit-learn</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">XGBoost</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">OpenCV</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">Transformers</span>
            <span class="skill-pill" style="--pill-color:#c084fc; --pill-bg:rgba(168,85,247,0.1); --pill-border:rgba(168,85,247,0.2);">NLTK</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #14b8a6;">
        <div class="skill-cat-title"><i class="fas fa-chart-line" style="color: #14b8a6;"></i> Data Science & Analytics</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">Pandas</span>
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">NumPy</span>
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">Matplotlib</span>
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">Plotly</span>
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">Apache Spark</span>
            <span class="skill-pill" style="--pill-color:#5eead4; --pill-bg:rgba(20,184,166,0.1); --pill-border:rgba(20,184,166,0.2);">Selenium</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #3b82f6;">
        <div class="skill-cat-title"><i class="fas fa-database" style="color: #3b82f6;"></i> Databases & Cloud</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">MySQL</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">MongoDB</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">PostgreSQL</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">AWS</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">GCP</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">Docker</span>
            <span class="skill-pill" style="--pill-color:#93c5fd; --pill-bg:rgba(59,130,246,0.1); --pill-border:rgba(59,130,246,0.2);">FastAPI</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #ec4899;">
        <div class="skill-cat-title"><i class="fas fa-chart-pie" style="color: #ec4899;"></i> BI & Visualization</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#f9a8d4; --pill-bg:rgba(236,72,153,0.1); --pill-border:rgba(236,72,153,0.2);">Tableau</span>
            <span class="skill-pill" style="--pill-color:#f9a8d4; --pill-bg:rgba(236,72,153,0.1); --pill-border:rgba(236,72,153,0.2);">Power BI</span>
            <span class="skill-pill" style="--pill-color:#f9a8d4; --pill-bg:rgba(236,72,153,0.1); --pill-border:rgba(236,72,153,0.2);">Jupyter</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #7c3aed;">
        <div class="skill-cat-title"><i class="fas fa-bullseye" style="color: #7c3aed;"></i> Specializations</div>
        <div class="skill-pills">
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">Deep Learning</span>
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">Computer Vision</span>
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">NLP</span>
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">Predictive Analytics</span>
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">Feature Engineering</span>
            <span class="skill-pill" style="--pill-color:#c4b5fd; --pill-bg:rgba(124,58,237,0.1); --pill-border:rgba(124,58,237,0.2);">Statistical Modeling</span>
        </div>
    </div>
    <div class="skill-category" style="--accent: #f59e0b; border-left-color: #f59e0b;">
        <div class="skill-cat-title"><i class="fas fa-signal" style="color: #f59e0b;"></i> Proficiency Overview</div>
        <div class="skill-bar-wrap">
            <div class="skill-bar-item">
                <div class="skill-bar-header"><span>Python / ML</span><span>95%</span></div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--skill-pct:95%;background:linear-gradient(90deg,#6366f1,#a855f7);color:#a855f7;animation-delay:0.2s;"></div></div>
            </div>
            <div class="skill-bar-item">
                <div class="skill-bar-header"><span>Deep Learning / NLP</span><span>88%</span></div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--skill-pct:88%;background:linear-gradient(90deg,#a855f7,#ec4899);color:#ec4899;animation-delay:0.4s;"></div></div>
            </div>
            <div class="skill-bar-item">
                <div class="skill-bar-header"><span>Data Analytics / BI</span><span>90%</span></div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--skill-pct:90%;background:linear-gradient(90deg,#14b8a6,#3b82f6);color:#3b82f6;animation-delay:0.6s;"></div></div>
            </div>
            <div class="skill-bar-item">
                <div class="skill-bar-header"><span>Cloud / DevOps</span><span>78%</span></div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--skill-pct:78%;background:linear-gradient(90deg,#3b82f6,#6366f1);color:#6366f1;animation-delay:0.8s;"></div></div>
            </div>
            <div class="skill-bar-item">
                <div class="skill-bar-header"><span>Computer Vision</span><span>85%</span></div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--skill-pct:85%;background:linear-gradient(90deg,#f59e0b,#ec4899);color:#ec4899;animation-delay:1.0s;"></div></div>
            </div>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# --- EXPERIENCE ---
st.markdown("""
<div class="glass-card glass-card-exp">
    <div class="section-heading"><i class="fas fa-briefcase" style="color: #10b981;"></i> Professional Experience</div>
    <div class="exp-item" style="--accent: #10b981;">
        <span class="exp-badge exp-badge-current">Current</span>
        <div class="exp-title">Graduate Research Volunteer &mdash; Conversational AI</div>
        <div class="exp-company"><i class="fas fa-university"></i> Prof. Hasan Davulcu's Research Group, ASU</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Nov 2025 &ndash; Present | Tempe, AZ</div>
        <ul class="exp-list">
            <li>Architected and deployed a <span class="metric-hl">production-ready legal chatbot</span> serving the US legal fraternity, reducing document review time by an estimated 40% through conversational AI and NLP pipelines</li>
            <li>Engineered consumer-facing AI features (sentiment analysis, recommendation engine) that boosted user engagement and <span class="metric-hl">improved operational efficiency by 30%</span></li>
            <li>Maintained <span class="metric-hl">99.5%+ system uptime</span> across predictive analytics models via automated monitoring, alerting, and CI/CD workflows</li>
            <li>Drove cross-functional Agile sprints to ship AI capabilities on schedule, collaborating with researchers, designers, and domain experts</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #3b82f6;">
        <span class="exp-badge exp-badge-intern">Internship</span>
        <div class="exp-title">AI/ML Intern &mdash; Consumer AI &amp; Regional Analytics</div>
        <div class="exp-company"><i class="fas fa-building"></i> Cognifront Pvt. Ltd. (Startup)</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Dec 2023 &ndash; Jun 2024 | India</div>
        <ul class="exp-list">
            <li>Built and launched an NLP-powered chatbot for regional retailers, generating <span class="metric-hl">personalized product recommendations</span> that increased average order value</li>
            <li>Designed predictive analytics models processing <span class="metric-hl">5,000+ records</span>, optimizing supply chain logistics and reducing waste by <span class="metric-hl">18%</span></li>
            <li>Delivered executive-facing BI dashboards (Tableau/Power BI) that became the primary decision-making tool for 3 stakeholder teams</li>
            <li>Owned production AI system health&mdash;implemented performance monitoring, A/B testing, and model retraining pipelines</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #f59e0b;">
        <span class="exp-badge exp-badge-teaching">Teaching</span>
        <div class="exp-title">AI/ML Teaching Assistant &mdash; Technical Mentorship</div>
        <div class="exp-company"><i class="fas fa-university"></i> K. K. Wagh Institute, Dept. of AI &amp; Data Science</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Jul 2023 &ndash; Mar 2024 | India</div>
        <ul class="exp-list">
            <li>Mentored <span class="metric-hl">200+ students</span> through hands-on ML workshops covering TensorFlow, PyTorch, and end-to-end model deployment</li>
            <li>Guided 8 student teams in building entrepreneurial AI products, with 3 projects advancing to regional competitions</li>
        </ul>
    </div>
</div>
""", unsafe_allow_html=True)

# --- LEADERSHIP ---
st.markdown("""
<div class="glass-card glass-card-lead">
    <div class="section-heading"><i class="fas fa-users" style="color: #f59e0b;"></i> Leadership & Activities</div>
    <div class="exp-item" style="--accent: #f59e0b;">
        <span class="exp-badge exp-badge-current">Current</span>
        <div class="exp-title">Grad Initiatives Team Volunteer</div>
        <div class="exp-company"><i class="fas fa-building"></i> ISSC, Arizona State University</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Oct 2024 &ndash; Present</div>
        <ul class="exp-list">
            <li>Spearhead community integration programs supporting 500+ international graduate students, strengthening cross-cultural collaboration and campus engagement</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #a855f7;">
        <span class="exp-badge exp-badge-founder">Founder</span>
        <div class="exp-title">Co-Founder &amp; President</div>
        <div class="exp-company"><i class="fas fa-users"></i> Phoenix AI Club (University Organization)</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Mar 2023 &ndash; Jan 2024</div>
        <ul class="exp-list">
            <li>Scaled from 0 to <span class="metric-hl">1,500+ members in 3 months</span>&mdash;delivered <span class="metric-hl">13+ technical workshops</span> on ML, deep learning, and real-world AI applications, establishing the club as the largest tech community on campus</li>
        </ul>
    </div>
</div>
""", unsafe_allow_html=True)

# --- NAV BUTTONS ---
st.markdown("<div style='height: 1rem;'></div>", unsafe_allow_html=True)
col1, col2, col3 = st.columns([1, 1, 1])
with col1:
    if st.button("Back to Home", use_container_width=True, key="bio_home"):
        st.switch_page("Home.py")
with col2:
    if st.button("View Projects", use_container_width=True, key="bio_projects"):
        st.switch_page("pages/2_Projects.py")
with col3:
    if st.button("Contact Me", use_container_width=True, key="bio_contact"):
        st.switch_page("pages/4_Contact.py")
