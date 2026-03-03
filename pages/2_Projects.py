import streamlit as st
import json
import base64
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

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
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

    .main, .stApp {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 55%, #4c1d95 80%, #581c87 100%);
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
        transform: translateY(-10px);
        background: rgba(255,255,255,0.07);
        border-color: rgba(139,92,246,0.25);
        box-shadow: 0 25px 50px rgba(139,92,246,0.2);
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
    }

    .project-content {
        padding: 1.75rem;
    }
    .project-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    .project-desc {
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.7;
        margin-bottom: 1rem;
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
        background: rgba(99,102,241,0.25);
        transform: translateY(-2px);
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
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(99,102,241,0.5);
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

st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-code-branch"></i> My Projects</div>
</div>
""", unsafe_allow_html=True)

projects = load_projects()

if not projects:
    st.markdown('<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-info-circle" style="color: #6366f1; margin-right: 0.5rem;"></i>No Projects Found</h3><p style="color: #64748b; margin-bottom: 0;">Add your projects to <code style="color: #a5b4fc;">data/projects.json</code> to display them here.</p></div>', unsafe_allow_html=True)
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

st.markdown('<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-lightbulb" style="color: #f59e0b; margin-right: 0.5rem;"></i>Want to see more?</h3><p style="color: #64748b; margin-bottom: 0;">Check out my GitHub profile for more projects and contributions.</p></div>', unsafe_allow_html=True)

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
