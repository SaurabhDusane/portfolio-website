import streamlit as st
import base64
from pathlib import Path

st.set_page_config(
    page_title="Portfolio - Home",
    page_icon="👋",
    layout="wide"
)

def load_css():
    css = """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
        font-family: 'Inter', sans-serif;
    }
    
    .main {
        background-color: #F8F9FA;
    }
    
    h1, h2, h3 {
        color: #1F2937;
    }
    
    .hero-container {
        text-align: center;
        padding: 5rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        margin: 2rem 0;
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .hero-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
    }
    
    .hero-avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2.5rem;
        font-size: 5rem;
        box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        border: 5px solid white;
    }
    
    .hero-title {
        font-size: 4.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 1.5rem;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
        letter-spacing: -1px;
        position: relative;
    }
    
    @media (max-width: 768px) {
        .hero-title {
            font-size: 3rem;
        }
        .hero-avatar {
            width: 160px;
            height: 160px;
        }
    }
    
    .hero-subtitle {
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.98);
        margin-bottom: 2rem;
        letter-spacing: 0.5px;
    }
    
    @media (max-width: 768px) {
        .hero-subtitle {
            font-size: 1.15rem;
        }
    }
    
    .hero-description {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.92);
        max-width: 900px;
        margin: 0 auto 2.5rem;
        line-height: 1.8;
    }
    
    @media (max-width: 768px) {
        .hero-description {
            font-size: 1.05rem;
        }
    }
    
    .profile-img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 5px solid white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        margin: 1rem auto 2rem;
        object-fit: cover;
        display: block;
    }
    
    .nav-button {
        display: inline-block;
        padding: 0.8rem 2rem;
        margin: 0.5rem;
        background-color: white;
        color: #667eea;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .nav-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
    
    .intro-card {
        background: white;
        padding: 2.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        margin: 2rem 0;
        border: 1px solid rgba(102, 126, 234, 0.1);
        transition: all 0.3s ease;
    }
    
    .intro-card:hover {
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        transform: translateY(-3px);
    }
    
    .intro-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    
    .intro-text {
        font-size: 1.2rem;
        color: #4B5563;
        line-height: 1.9;
        max-width: 960px;
        margin: 0 auto;
    }
    
    .info-card {
        background: white;
        padding: 2.5rem;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        border-top: 4px solid;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .info-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    
    .info-card-icon {
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }
    
    .info-card-title {
        font-weight: 700;
        color: #1F2937;
        font-size: 1.4rem;
        margin-bottom: 0.75rem;
    }
    
    .info-card-desc {
        color: #6B7280;
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .info-card-meta {
        color: #9CA3AF;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
    
    .card-indigo {
        border-top-color: #667eea;
    }
    
    .card-purple {
        border-top-color: #764ba2;
    }
    
    .card-teal {
        border-top-color: #14b8a6;
    }
    
    .btn-white {
        background: white !important;
        color: #667eea !important;
        border: 2px solid white !important;
        border-radius: 50px;
        padding: 0.9rem 2.8rem;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    .btn-white:hover {
        background: #EEF2FF !important;
        transform: scale(1.05) translateY(-2px) !important;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
    }
    
    .btn-primary {
        background: #667eea !important;
        color: white !important;
        border: 2px solid #667eea !important;
        border-radius: 50px;
        padding: 0.9rem 2.8rem;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3) !important;
    }
    
    .btn-primary:hover {
        background: #5568d3 !important;
        border-color: #5568d3 !important;
        transform: scale(1.05) translateY(-2px) !important;
        box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5) !important;
    }
    
    [data-testid="stSidebar"] {
        background-color: #FFFFFF;
    }
    
    [data-testid="stSidebar"] [data-testid="stMarkdownContainer"] a {
        transition: all 0.3s ease;
    }
    
    [data-testid="stSidebar"] .stPageLink-navLink[aria-current="page"] {
        background-color: #EEF2FF;
        border-left: 4px solid #667eea;
        padding-left: 1rem;
    }
    
    .footer {
        text-align: center;
        padding: 3rem 0;
        margin-top: 6rem;
        border-top: 2px solid rgba(102, 126, 234, 0.15);
    }
    
    .footer-text {
        color: #6B7280;
        font-size: 1.05rem;
        margin-bottom: 0.75rem;
    }
    
    .footer-copyright {
        color: #9CA3AF;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
    
    .footer-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .footer-link {
        color: #6B7280;
        transition: color 0.3s ease;
        font-size: 1.5rem;
    }
    
    .footer-link:hover {
        color: #667eea;
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
if profile_img_path.exists():
    img_base64 = get_img_base64(profile_img_path)
    if img_base64:
        st.markdown(f"""
        <div class="hero-container">
            <div class="hero-avatar">
                <img src="data:image/jpeg;base64,{img_base64}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            </div>
            <div class="hero-title">Saurabh Nilesh Dusane</div>
            <div class="hero-subtitle">AI/ML Engineer | Data Scientist | Problem Solver</div>
            <div class="hero-description">
                Transforming data into actionable insights and building intelligent solutions for tomorrow's challenges.
            </div>
        </div>
        """, unsafe_allow_html=True)
else:
    st.markdown("""
    <div class="hero-container">
        <div class="hero-avatar">
            👤
        </div>
        <div class="hero-title">Saurabh Nilesh Dusane</div>
        <div class="hero-subtitle">AI/ML Engineer | Data Scientist | Problem Solver</div>
        <div class="hero-description">
            Transforming data into actionable insights and building intelligent solutions for tomorrow's challenges.
        </div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

col1, col2, col3, col4, col5 = st.columns([1, 1.5, 0.5, 1.5, 1])

with col1:
    st.write("")

with col2:
    st.markdown('<style>.btn-white-container button { background: white !important; color: #667eea !important; border: 2px solid white !important; border-radius: 12px; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important; } .btn-white-container button:hover { background: #EEF2FF !important; transform: scale(1.05) translateY(-2px) !important; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25) !important; }</style>', unsafe_allow_html=True)
    st.markdown('<div class="btn-white-container">', unsafe_allow_html=True)
    if st.button("📖 View Bio", use_container_width=True, key="btn_bio"):
        st.switch_page("pages/1_Bio.py")
    st.markdown('</div>', unsafe_allow_html=True)

with col3:
    st.write("")

with col4:
    st.markdown('<style>.btn-teal-container button { background: #14b8a6 !important; color: white !important; border: 2px solid #14b8a6 !important; border-radius: 12px; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3) !important; } .btn-teal-container button:hover { background: #0d9488 !important; border-color: #0d9488 !important; transform: scale(1.05) translateY(-2px) !important; box-shadow: 0 12px 30px rgba(20, 184, 166, 0.5) !important; }</style>', unsafe_allow_html=True)
    st.markdown('<div class="btn-teal-container">', unsafe_allow_html=True)
    if st.button("💼 View Projects", use_container_width=True, key="btn_projects"):
        st.switch_page("pages/2_Projects.py")
    st.markdown('</div>', unsafe_allow_html=True)

with col5:
    st.write("")

st.markdown("""
<div class="intro-card">
    <div class="intro-title">Welcome to My Portfolio</div>
    <div class="intro-text">
        <p style="margin-bottom: 1.5rem;">
            I'm an innovative AI/ML engineer and data scientist passionate about leveraging cutting-edge technology 
            to solve complex problems. This portfolio showcases my journey in machine learning, data science, and 
            business intelligence, featuring projects that demonstrate my ability to extract meaningful insights from data.
        </p>
        <p>
            Feel free to explore my projects, learn more about my background, and get in touch if you'd like to collaborate!
        </p>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown("""
    <div class="info-card card-indigo">
        <div class="info-card-icon">🎓</div>
        <div class="info-card-title">Education</div>
        <div class="info-card-desc">AI/ML & Data Science</div>
        <div class="info-card-meta">MS @ ASU • GPA: 4.0</div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="info-card card-purple">
        <div class="info-card-icon">💼</div>
        <div class="info-card-title">Projects</div>
        <div class="info-card-desc">Multiple Completed Works</div>
        <div class="info-card-meta">ML • AI • Data Analytics</div>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="info-card card-purple">
        <div class="info-card-icon">✍️</div>
        <div class="info-card-title">Writing</div>
        <div class="info-card-desc">Essays & Creative Work</div>
        <div class="info-card-meta">Philosophy • AI • Poetry</div>
    </div>
    """, unsafe_allow_html=True)

with col4:
    st.markdown("""
    <div class="info-card card-teal">
        <div class="info-card-icon">🚀</div>
        <div class="info-card-title">Skills</div>
        <div class="info-card-desc">AI/ML & Data Analytics</div>
        <div class="info-card-meta">Python • TensorFlow • PyTorch</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

# Latest Writing Section
st.markdown("""
<div style="margin-bottom: 3rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 style="font-size: 2rem; font-weight: 700; color: #1f2937; display: flex; align-items: center; gap: 0.75rem; margin: 0;">
            <span style="color: #a855f7; font-size: 2rem;">✍️</span>
            Latest Writing
        </h2>
        <a href="pages/4_Writing.py" style="color: #6366f1; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease;">
            View All <span style="font-size: 1.2rem;">→</span>
        </a>
    </div>
</div>
""", unsafe_allow_html=True)

recent_articles = [
    {
        "title": "The Role of AI in Business Decision-Making",
        "excerpt": "Exploring how AI is transforming strategic decisions at the executive level.",
        "category": "Technical Essay",
        "url": "https://medium.com/@saurndusane13/the-role-of-artificial-intelligence-in-top-level-business-decision-making",
        "date": "Sep 18, 2024",
        "readTime": 7
    },
    {
        "title": "Religion-Culture: US and India",
        "excerpt": "A comparative analysis of religion and culture in American and Indian societies.",
        "category": "Topical Essay",
        "url": "https://medium.com/@saurndusane13/religion-culture-navigating",
        "date": "Nov 7, 2024",
        "readTime": 9
    },
    {
        "title": "Exploring the Spectrum of Morality",
        "excerpt": "A philosophical examination of moral frameworks in contemporary times.",
        "category": "Topical Essay",
        "url": "https://medium.com/@saurndusane13/exploring-the-spectrum-of-morality",
        "date": "Oct 4, 2024",
        "readTime": 9
    }
]

col1, col2, col3 = st.columns(3)

for idx, article in enumerate(recent_articles):
    with [col1, col2, col3][idx]:
        st.markdown(f"""
        <a href="{article['url']}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
            <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; border-top: 4px solid #a855f7;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 30px rgba(168,85,247,0.2)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';">
                <div style="background: #faf5ff; color: #9333ea; padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">
                    {article['category']}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; line-height: 1.4;">
                    {article['title']}
                </h3>
                <p style="font-size: 0.95rem; color: #6b7280; line-height: 1.6; margin-bottom: 1rem;">
                    {article['excerpt']}
                </p>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #9ca3af; padding-top: 1rem; border-top: 1px solid #f3f4f6;">
                    <span>{article['date']}</span>
                    <span>{article['readTime']} min read</span>
                </div>
            </div>
        </a>
        """, unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# View Writing button
col_btn1, col_btn2, col_btn3 = st.columns([1, 1, 1])
with col_btn2:
    if st.button("📖 View All Writing", use_container_width=True, key="btn_writing"):
        st.switch_page("pages/4_Writing.py")

st.markdown("<br>", unsafe_allow_html=True)

st.markdown("""
<div class="footer">
    <p class="footer-text">
        Built with <span style="color: #ef4444;">❤️</span> using 
        <a href="https://streamlit.io" target="_blank" style="color: #667eea; font-weight: 600; text-decoration: none;">Streamlit</a>
    </p>
    <p class="footer-copyright">© 2025 Saurabh Nilesh Dusane. All rights reserved.</p>
    <div class="footer-links">
        <a href="https://github.com/SaurabhDusane" target="_blank" class="footer-link" title="GitHub">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/saurabh-dusane" target="_blank" class="footer-link" title="LinkedIn">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="mailto:sdusane1@asu.edu" class="footer-link" title="Email">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
        </a>
    </div>
</div>
""", unsafe_allow_html=True)
