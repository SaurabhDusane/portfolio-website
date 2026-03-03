import streamlit as st
import base64
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

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
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
        color: #94a3b8;
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
        color: #94a3b8;
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
    .edu-degree {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.25rem;
    }
    .edu-sub {
        font-size: 0.85rem;
        color: #64748b;
        margin-bottom: 0.5rem;
    }
    .edu-meta {
        font-size: 0.82rem;
        color: #94a3b8;
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
        background: rgba(99,102,241,0.2);
        border-color: rgba(99,102,241,0.4);
        transform: translateY(-2px);
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
        transform: translateY(-3px);
        filter: brightness(1.3);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

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
    .exp-badge {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-size: 0.68rem;
        font-weight: 600;
    }
    .exp-badge-current { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
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
        color: #94a3b8;
        font-size: 0.88rem;
        margin-bottom: 0.35rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
    .exp-company i { color: var(--accent, #10b981); font-size: 0.8rem; }
    .exp-duration {
        color: #64748b;
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
        color: #94a3b8;
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
    st.markdown('<div class="bio-text">I\'m a passionate AI/ML Engineer and Data Scientist currently pursuing my Master\'s in Computer Engineering at Arizona State University with a perfect 4.0 GPA. My expertise lies in developing intelligent systems that transform complex data into actionable business insights.</div>', unsafe_allow_html=True)

    st.markdown('<div class="expertise-box"><div class="expertise-heading"><i class="fas fa-bolt"></i> My Expertise</div><div class="expertise-text">With a strong foundation in machine learning, deep learning, and data analytics, I specialize in building predictive models, developing business intelligence solutions, and implementing AI-driven decision-making systems. My technical proficiency spans Python, TensorFlow, PyTorch, and advanced data visualization tools.</div></div>', unsafe_allow_html=True)

    st.markdown('<div class="bio-text">I approach every project with a blend of technical rigor and creative problem-solving. My goal is to bridge the gap between cutting-edge AI research and practical business applications. Beyond technical skills, I bring experience in research, teaching, and leadership roles.</div>', unsafe_allow_html=True)

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
        <div class="edu-sub" style="margin-top: 0.75rem; font-style: italic; color: #64748b;">Focus: Machine Learning Systems, Advanced Data Mining, Blockchain Architecture</div>
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
        <div class="edu-sub" style="font-style: italic; color: #64748b;">Comprehensive foundation in AI/ML with focus on practical applications and research</div>
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
</div>
""", unsafe_allow_html=True)

# --- EXPERIENCE ---
st.markdown("""
<div class="glass-card glass-card-exp">
    <div class="section-heading"><i class="fas fa-briefcase" style="color: #10b981;"></i> Professional Experience</div>
    <div class="exp-item" style="--accent: #10b981;">
        <span class="exp-badge exp-badge-current">Current</span>
        <div class="exp-title">Graduate Research Volunteer - Conversational AI</div>
        <div class="exp-company"><i class="fas fa-university"></i> Prof. Hasan Davulcu's Research Group, ASU</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Nov 2025 - Present | Tempe, AZ</div>
        <ul class="exp-list">
            <li>Designed and deployed production-ready AI-powered legal chatbot serving the US legal fraternity using conversational AI and NLP techniques</li>
            <li>Developed consumer-facing AI solutions including sentiment analysis and recommendation systems, improving operational efficiency by 30%</li>
            <li>Implemented ML models for predictive analytics with 99.5%+ uptime through robust monitoring workflows</li>
            <li>Collaborated with cross-functional teams using Agile methodologies to deliver high-quality AI features</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #3b82f6;">
        <span class="exp-badge exp-badge-intern">Internship</span>
        <div class="exp-title">AI/ML Intern - Consumer AI & Regional Analytics</div>
        <div class="exp-company"><i class="fas fa-building"></i> Cognifront Pvt. Ltd. (Startup)</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Dec 2023 - Jun 2024 | India</div>
        <ul class="exp-list">
            <li>Built consumer-facing AI chatbot for regional retailers using NLP for personalized product recommendations</li>
            <li>Developed predictive analytics models processing 5,000+ records, optimizing supply chain efficiency by 18%</li>
            <li>Created interactive BI dashboards enabling data-driven decision-making across stakeholder teams</li>
            <li>Maintained production AI systems with continuous performance monitoring and optimization</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #f59e0b;">
        <span class="exp-badge exp-badge-teaching">Teaching</span>
        <div class="exp-title">AI/ML Teaching Assistant - Technical Mentorship</div>
        <div class="exp-company"><i class="fas fa-university"></i> K. K. Wagh Institute, Dept. of AI & Data Science</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Jul 2023 - Mar 2024 | India</div>
        <ul class="exp-list">
            <li>Provided technical guidance to 200+ students on AI/ML development with TensorFlow and PyTorch</li>
            <li>Mentored students developing entrepreneurial AI innovations and consumer-facing applications</li>
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
        <div class="exp-duration"><i class="fas fa-calendar"></i> Oct 2024 - Present</div>
        <ul class="exp-list">
            <li>Coordinate community support programs and integration initiatives for diverse student populations</li>
        </ul>
    </div>
    <div class="exp-item" style="--accent: #a855f7;">
        <span class="exp-badge exp-badge-founder">Founder</span>
        <div class="exp-title">Co-Founder & President</div>
        <div class="exp-company"><i class="fas fa-users"></i> Phoenix AI Club (University Organization)</div>
        <div class="exp-duration"><i class="fas fa-calendar"></i> Mar 2023 - Jan 2024</div>
        <ul class="exp-list">
            <li>Founded and scaled organization to <span class="metric-hl">1,500+</span> members in 3 months, delivering <span class="metric-hl">13+</span> technical workshops on ML and data science</li>
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
