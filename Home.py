import streamlit as st
import base64
from pathlib import Path

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

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
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
    @keyframes ringPulse {
        0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); }
        70% { box-shadow: 0 0 0 20px rgba(139,92,246,0); }
        100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
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

    /* ---- HERO ---- */
    .hero-card {
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 28px;
        padding: 4rem 3rem 3.5rem;
        max-width: 960px;
        margin: 1rem auto 0;
        text-align: center;
        animation: fadeInUp 0.8s ease-out both;
        position: relative;
        overflow: hidden;
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
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 0 auto 2rem;
        overflow: hidden;
        border: 4px solid rgba(139,92,246,0.5);
        animation: float 6s infinite ease-in-out, ringPulse 3s infinite;
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
        margin-bottom: 1.5rem;
        letter-spacing: 0.3px;
    }
    .hero-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 3.2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #e0e7ff, #c4b5fd, #f9a8d4, #fde68a);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 6s linear infinite;
        margin-bottom: 0.5rem;
        letter-spacing: -1px;
    }
    .hero-role {
        font-size: 1.2rem;
        font-weight: 500;
        color: #94a3b8;
        margin-bottom: 1.5rem;
        letter-spacing: 0.5px;
    }
    .hero-role strong { color: #c4b5fd; font-weight: 600; }
    .hero-desc {
        font-size: 1rem;
        color: #64748b;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.8;
    }

    @media (max-width: 768px) {
        .hero-name { font-size: 2.2rem; }
        .hero-role { font-size: 1rem; }
    }

    /* ---- STATS ---- */
    .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
        max-width: 960px;
        margin: 2.5rem auto 3rem;
        animation: fadeInUp 0.8s ease-out 0.15s both;
    }
    @media (max-width: 768px) {
        .stats-row { grid-template-columns: repeat(2, 1fr); }
    }
    .stat-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 1.75rem 1rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
        overflow: hidden;
    }
    .stat-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 20px;
        padding: 1px;
        background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(236,72,153,0.3));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .stat-card:hover::after { opacity: 1; }
    .stat-card:hover {
        transform: translateY(-8px) scale(1.03);
        background: rgba(255,255,255,0.08);
    }
    .stat-number {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #a5b4fc, #c4b5fd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.25rem;
    }
    .stat-label {
        font-size: 0.78rem;
        color: #64748b;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* ---- SECTION TITLES ---- */
    .section-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #e2e8f0;
        text-align: center;
        margin-bottom: 2rem;
        animation: fadeInUp 0.8s ease-out 0.25s both;
    }

    /* ---- INFO GRID ---- */
    .info-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
        max-width: 960px;
        margin: 0 auto 3.5rem;
        animation: fadeInUp 0.8s ease-out 0.3s both;
    }
    @media (max-width: 768px) {
        .info-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .info-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 2rem 1.5rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
    }
    .info-card:hover {
        transform: translateY(-10px);
        background: rgba(255,255,255,0.08);
        border-color: var(--glow, rgba(99,102,241,0.3));
        box-shadow: 0 20px 40px var(--shadow, rgba(99,102,241,0.15));
    }
    .info-icon-wrap {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.25rem;
        font-size: 1.5rem;
        color: white;
        background: var(--icon-bg, linear-gradient(135deg, #6366f1, #8b5cf6));
        box-shadow: 0 8px 20px var(--icon-shadow, rgba(99,102,241,0.3));
    }
    .info-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    .info-desc {
        font-size: 0.85rem;
        color: #64748b;
        line-height: 1.6;
        margin-bottom: 0.5rem;
    }
    .info-meta {
        font-size: 0.72rem;
        color: #475569;
        font-weight: 500;
        letter-spacing: 0.3px;
    }

    /* ---- ARTICLES ---- */
    .articles-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        max-width: 960px;
        margin: 0 auto 3rem;
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    @media (max-width: 768px) {
        .articles-grid { grid-template-columns: 1fr; }
    }
    .article-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 1.75rem;
        transition: all 0.35s ease;
        text-decoration: none;
        display: block;
    }
    .article-card:hover {
        transform: translateY(-8px);
        background: rgba(168,85,247,0.08);
        border-color: rgba(168,85,247,0.25);
        box-shadow: 0 15px 35px rgba(168,85,247,0.15);
    }
    .article-badge {
        display: inline-block;
        background: rgba(168,85,247,0.15);
        color: #c4b5fd;
        padding: 0.3rem 0.8rem;
        border-radius: 50px;
        font-size: 0.7rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        border: 1px solid rgba(168,85,247,0.25);
    }
    .article-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }
    .article-excerpt {
        font-size: 0.82rem;
        color: #64748b;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    .article-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        color: #475569;
        padding-top: 0.75rem;
        border-top: 1px solid rgba(255,255,255,0.06);
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
        color: #475569;
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
        color: #94a3b8;
        font-size: 1.2rem;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .footer-link:hover {
        background: rgba(139,92,246,0.15);
        border-color: rgba(139,92,246,0.3);
        color: #c4b5fd;
        transform: translateY(-4px);
    }

    /* ---- BUTTONS ---- */
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

profile_img_path = Path("assets/headshot image.png")
img_html = ""
if profile_img_path.exists():
    img_base64 = get_img_base64(profile_img_path)
    if img_base64:
        img_html = f'<div class="hero-avatar"><img src="data:image/png;base64,{img_base64}"></div>'

st.markdown(f"""
<div class="hero-card">
    <div class="hero-badge">
        <i class="fas fa-graduation-cap"></i>
        Master's Student @ Arizona State University
    </div>
    {img_html}
    <div class="hero-name">Saurabh Nilesh Dusane</div>
    <div class="hero-role"><strong>AI/ML Engineer</strong> &nbsp;/&nbsp; Data Scientist &nbsp;/&nbsp; Problem Solver</div>
    <div class="hero-desc">
        Transforming complex data into intelligent systems and actionable insights.
        Building the future with machine learning, one model at a time.
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="stats-row">
    <div class="stat-card">
        <div class="stat-number">5+</div>
        <div class="stat-label">Projects</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">4.0</div>
        <div class="stat-label">GPA</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">3+</div>
        <div class="stat-label">Years Exp</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">10+</div>
        <div class="stat-label">Technologies</div>
    </div>
</div>
""", unsafe_allow_html=True)

btn_col1, btn_col2, btn_col3, btn_col4 = st.columns([1, 1, 1, 1])
with btn_col2:
    if st.button("View Bio", use_container_width=True, key="btn_bio"):
        st.switch_page("pages/1_Bio.py")
with btn_col3:
    if st.button("View Projects", use_container_width=True, key="btn_projects"):
        st.switch_page("pages/2_Projects.py")

st.markdown("<div style='height: 2rem;'></div>", unsafe_allow_html=True)

st.markdown('<div class="section-title"><i class="fas fa-th-large" style="margin-right: 0.5rem; font-size: 1.25rem; color: #a5b4fc;"></i> At a Glance</div>', unsafe_allow_html=True)
st.markdown("""
<div class="info-grid">
    <div class="info-card" style="--glow: rgba(99,102,241,0.3); --shadow: rgba(99,102,241,0.15);">
        <div class="info-icon-wrap" style="--icon-bg: linear-gradient(135deg, #6366f1, #818cf8); --icon-shadow: rgba(99,102,241,0.3);"><i class="fas fa-graduation-cap"></i></div>
        <div class="info-title">Education</div>
        <div class="info-desc">MS in Computer Engineering</div>
        <div class="info-meta">Arizona State University / GPA: 4.0</div>
    </div>
    <div class="info-card" style="--glow: rgba(168,85,247,0.3); --shadow: rgba(168,85,247,0.15);">
        <div class="info-icon-wrap" style="--icon-bg: linear-gradient(135deg, #a855f7, #c084fc); --icon-shadow: rgba(168,85,247,0.3);"><i class="fas fa-laptop-code"></i></div>
        <div class="info-title">Projects</div>
        <div class="info-desc">ML pipelines, AI chatbots, analytics</div>
        <div class="info-meta">Python / TensorFlow / PyTorch</div>
    </div>
    <div class="info-card" style="--glow: rgba(20,184,166,0.3); --shadow: rgba(20,184,166,0.15);">
        <div class="info-icon-wrap" style="--icon-bg: linear-gradient(135deg, #14b8a6, #2dd4bf); --icon-shadow: rgba(20,184,166,0.3);"><i class="fas fa-pen-nib"></i></div>
        <div class="info-title">Writing</div>
        <div class="info-desc">AI, philosophy, morality essays</div>
        <div class="info-meta">9 Published Articles on Medium</div>
    </div>
    <div class="info-card" style="--glow: rgba(245,158,11,0.3); --shadow: rgba(245,158,11,0.15);">
        <div class="info-icon-wrap" style="--icon-bg: linear-gradient(135deg, #f59e0b, #fbbf24); --icon-shadow: rgba(245,158,11,0.3);"><i class="fas fa-bolt"></i></div>
        <div class="info-title">Experience</div>
        <div class="info-desc">Research, internships, teaching</div>
        <div class="info-meta">3+ Years / Industry + Academia</div>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="section-title"><i class="fas fa-feather-alt" style="margin-right: 0.5rem; font-size: 1.25rem; color: #c4b5fd;"></i> Latest Writing</div>', unsafe_allow_html=True)

recent_articles = [
    {
        "title": "The Role of AI in Business Decision-Making",
        "excerpt": "How AI is transforming strategic decisions at the executive level.",
        "category": "Technical",
        "url": "https://medium.com/@saurndusane13/the-role-of-artificial-intelligence-in-top-level-business-decision-making",
        "date": "Sep 18, 2024",
        "readTime": 7
    },
    {
        "title": "Religion-Culture: US and India",
        "excerpt": "A comparative analysis of religion and culture across societies.",
        "category": "Topical",
        "url": "https://medium.com/@saurndusane13/religion-culture-navigating",
        "date": "Nov 7, 2024",
        "readTime": 9
    },
    {
        "title": "Exploring the Spectrum of Morality",
        "excerpt": "A philosophical examination of moral frameworks today.",
        "category": "Topical",
        "url": "https://medium.com/@saurndusane13/exploring-the-spectrum-of-morality",
        "date": "Oct 4, 2024",
        "readTime": 9
    }
]

articles_html = '<div class="articles-grid">'
for article in recent_articles:
    articles_html += (
        f'<a href="{article["url"]}" target="_blank" rel="noopener noreferrer" class="article-card">'
        f'<div class="article-badge">{article["category"]}</div>'
        f'<div class="article-title">{article["title"]}</div>'
        f'<div class="article-excerpt">{article["excerpt"]}</div>'
        f'<div class="article-meta">'
        f'<span><i class="far fa-calendar" style="margin-right: 0.3rem;"></i>{article["date"]}</span>'
        f'<span><i class="far fa-clock" style="margin-right: 0.3rem;"></i>{article["readTime"]} min</span>'
        f'</div></a>'
    )
articles_html += '</div>'
st.markdown(articles_html, unsafe_allow_html=True)

col_btn1, col_btn2, col_btn3 = st.columns([1, 1, 1])
with col_btn2:
    if st.button("View All Writing", use_container_width=True, key="btn_writing"):
        st.switch_page("pages/3_Writing.py")

st.markdown("<div style='height: 2rem;'></div>", unsafe_allow_html=True)

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
