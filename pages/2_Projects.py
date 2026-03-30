import streamlit as st
import json
import base64
import random
from pathlib import Path

st.set_page_config(
    page_title="Saurabh Dusane - Projects",
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
    @keyframes particleDrift {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
    }
    @keyframes imgShine {
        0% { left: -75%; }
        100% { left: 125%; }
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
    @keyframes borderGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    @keyframes cardShine {
        0% { left: -75%; }
        100% { left: 125%; }
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
    .page-title i { color: #a5b4fc; font-size: 1.5rem; animation: iconFloat 3s ease-in-out infinite; }

    /* ---- PROJECT COUNT BADGE ---- */
    .project-count {
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
        margin-top: 0.75rem;
        animation: fadeInUp 0.6s ease-out 0.2s both;
    }

    /* Equal-height columns */
    [data-testid="stHorizontalBlock"] {
        align-items: stretch !important;
    }
    [data-testid="stHorizontalBlock"] > [data-testid="column"] > div > div {
        height: 100%;
    }
    .project-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        margin-bottom: 1.5rem;
        position: relative;
        animation: fadeInUp 0.7s ease-out both;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .project-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #f59e0b);
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
        z-index: 1;
    }
    .project-card:hover {
        transform: translateY(-10px) rotateX(2deg) rotateY(-2deg) scale(1.02);
        background: rgba(255,255,255,0.07);
        border-color: rgba(139,92,246,0.25);
        box-shadow: 0 25px 50px rgba(139,92,246,0.2);
    }
    .project-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
        transform: skewX(-25deg);
        pointer-events: none;
        z-index: 2;
    }
    .project-card:hover::after {
        animation: cardShine 0.8s ease-out;
    }
    .project-card {
        perspective: 800px;
        transform-style: preserve-3d;
    }

    .project-img-placeholder {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .project-img-placeholder i {
        font-size: 3.5rem;
        color: rgba(255,255,255,0.8);
        z-index: 1;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
    }
    .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        opacity: 0.85;
        transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
    }
    .project-card:hover .project-image {
        transform: scale(1.08);
        opacity: 1;
    }
    .project-img-placeholder {
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
    }
    .project-img-placeholder::after {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transform: skewX(-25deg);
    }
    .project-card:hover .project-img-placeholder::after {
        animation: imgShine 0.8s ease-out;
    }
    .project-card:hover .project-img-placeholder {
        background-size: 120% 120%;
    }
    .project-card:hover .project-img-placeholder i {
        transform: scale(1.2) rotate(-5deg);
        filter: drop-shadow(0 8px 20px rgba(0,0,0,0.5));
    }

    .project-content {
        padding: 1.75rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .project-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
    }
    .project-card:hover .project-title {
        background: linear-gradient(135deg, #c4b5fd, #f9a8d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .project-desc {
        font-size: 0.9rem;
        color: #e2e8f0;
        line-height: 1.7;
        margin-bottom: 1rem;
        flex: 1;
    }
    .tech-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 1.25rem;
    }
    .tech-pill {
        display: inline-block;
        background: rgba(99,102,241,0.12);
        color: #a5b4fc;
        padding: 0.3rem 0.75rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid rgba(99,102,241,0.25);
        transition: all 0.25s ease;
    }
    .tech-pill:hover {
        background: rgba(99,102,241,0.3);
        transform: translateY(-3px) scale(1.08);
        box-shadow: 0 4px 12px rgba(99,102,241,0.2);
        letter-spacing: 0.3px;
    }
    .tech-pill:nth-child(odd):hover {
        background: rgba(168,85,247,0.25);
        border-color: rgba(168,85,247,0.4);
        color: #c4b5fd;
    }

    .project-links {
        display: flex;
        gap: 0.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid rgba(255,255,255,0.06);
    }
    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 0.6rem 1.2rem;
        border-radius: 12px;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99,102,241,0.3);
    }
    .project-link:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 20px rgba(99,102,241,0.5);
        letter-spacing: 0.3px;
    }
    .project-link i {
        transition: transform 0.3s ease;
    }
    .project-link:hover i {
        transform: rotate(-8deg) scale(1.15);
    }
    .project-link-demo {
        background: linear-gradient(135deg, #14b8a6, #0d9488);
    }
    .project-link-demo:hover {
        box-shadow: 0 8px 20px rgba(20,184,166,0.5);
    }

    .glass-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 2.5rem;
        text-align: center;
        max-width: 900px;
        margin: 0 auto 2rem;
        position: relative;
        overflow: hidden;
        transition: all 0.35s ease;
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
    .glass-card:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(139,92,246,0.2);
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

def load_projects():
    projects_file = Path("data/projects.json")
    if projects_file.exists():
        with open(projects_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

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
    {"color": "rgba(99,102,241,0.10)", "w": 420, "h": 420, "top": "8%", "left": "-3%", "dur": 19},
    {"color": "rgba(168,85,247,0.08)", "w": 360, "h": 360, "top": "50%", "left": "68%", "dur": 23},
    {"color": "rgba(236,72,153,0.06)", "w": 300, "h": 300, "top": "70%", "left": "20%", "dur": 21},
]
aurora_html = '<div class="aurora-mesh">'
for b in aurora_blobs:
    aurora_html += f'<div class="aurora-blob" style="background:{b["color"]};width:{b["w"]}px;height:{b["h"]}px;top:{b["top"]};left:{b["left"]};animation:aurora {b["dur"]}s ease-in-out infinite;"></div>'
aurora_html += '</div>'
st.markdown(aurora_html, unsafe_allow_html=True)

particles_html = '<div class="particles-container">'
p_colors = ['rgba(99,102,241,0.35)', 'rgba(168,85,247,0.3)', 'rgba(236,72,153,0.25)', 'rgba(245,158,11,0.2)']
for i in range(15):
    left = random.uniform(0, 100)
    size = random.uniform(3, 7)
    dur = random.uniform(14, 30)
    delay = random.uniform(0, 12)
    color = p_colors[i % len(p_colors)]
    particles_html += f'<div class="particle" style="left:{left:.1f}%;width:{size:.1f}px;height:{size:.1f}px;background:{color};animation-duration:{dur:.1f}s;animation-delay:{delay:.1f}s;"></div>'
particles_html += '</div>'
st.markdown(particles_html, unsafe_allow_html=True)

st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-code-branch"></i> Projects &amp; Impact</div>
    <div class="project-count"><i class="fas fa-layer-group"></i> 6 Featured Projects &mdash; ML, NLP, Computer Vision, IoT</div>
</div>
""", unsafe_allow_html=True)

projects = load_projects()

if not projects:
    st.markdown('<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-info-circle" style="color: #6366f1; margin-right: 0.5rem;"></i>No Projects Found</h3><p style="color: #e2e8f0; margin-bottom: 0;">Add your projects to <code style="color: #a5b4fc;">data/projects.json</code> to display them here.</p></div>', unsafe_allow_html=True)
else:
    gradients = [
        "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 100%)",
        "linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.2) 100%)",
        "linear-gradient(135deg, rgba(20,184,166,0.3) 0%, rgba(59,130,246,0.2) 100%)",
        "linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(239,68,68,0.2) 100%)",
        "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(6,182,212,0.2) 100%)"
    ]

    for i in range(0, len(projects), 2):
        cols = st.columns(2)
        for j, col in enumerate(cols):
            if i + j < len(projects):
                project = projects[i + j]
                with col:
                    delay = (i + j) * 0.1
                    card_html = f'<div class="project-card" style="animation-delay: {delay}s;">'

                    img_path = Path(project.get("image", ""))
                    if img_path.exists():
                        img_base64 = get_img_base64(img_path)
                        if img_base64:
                            card_html += f'<img src="data:image/jpeg;base64,{img_base64}" class="project-image">'
                    else:
                        icon_class = project.get("icon", "fas fa-rocket")
                        gradient = gradients[project.get("id", i+j) % len(gradients)] if "id" in project else gradients[(i+j) % len(gradients)]
                        card_html += f'<div class="project-img-placeholder" style="background: {gradient};"><i class="{icon_class}"></i></div>'

                    card_html += '<div class="project-content">'
                    card_html += f'<div class="project-title">{project.get("title", "Project Title")}</div>'
                    card_html += f'<div class="project-desc">{project.get("description", "Project description")}</div>'

                    card_html += '<div class="tech-pills">'
                    for tech in project.get("tech_stack", []):
                        card_html += f'<span class="tech-pill">{tech}</span>'
                    card_html += '</div>'

                    card_html += '<div class="project-links">'
                    if project.get("github_link"):
                        card_html += f'<a href="{project["github_link"]}" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>'
                    if project.get("demo_link"):
                        card_html += f'<a href="{project["demo_link"]}" target="_blank" class="project-link project-link-demo"><i class="fas fa-external-link-alt"></i> Demo</a>'
                    card_html += '</div></div></div>'

                    st.markdown(card_html, unsafe_allow_html=True)

st.markdown("<div style='height: 2rem;'></div>", unsafe_allow_html=True)

st.markdown('<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-lightbulb" style="color: #f59e0b; margin-right: 0.5rem;"></i>Want to see more?</h3><p style="color: #e2e8f0; margin-bottom: 0;">Check out my GitHub profile for more projects and contributions.</p></div>', unsafe_allow_html=True)

st.markdown("<div style='height: 1rem;'></div>", unsafe_allow_html=True)

col1, col2, col3 = st.columns([1, 1, 1])
with col1:
    if st.button("Back to Home", use_container_width=True):
        st.switch_page("Home.py")
with col2:
    if st.button("View Bio", use_container_width=True):
        st.switch_page("pages/1_Bio.py")
with col3:
    if st.button("Contact Me", use_container_width=True):
        st.switch_page("pages/4_Contact.py")
