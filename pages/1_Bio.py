import streamlit as st
import base64
from pathlib import Path

st.set_page_config(
    page_title="Portfolio - Bio",
    page_icon="📖",
    layout="wide"
)

def load_css():
    css = """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    * {
        font-family: 'Inter', sans-serif;
    }
    
    .main {
        background-color: #F8F9FA;
    }
    
    h1 {
        color: #1F2937;
        font-weight: 700;
    }
    
    .page-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2.5rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        box-shadow: 0 10px 35px rgba(102, 126, 234, 0.3);
        position: relative;
        overflow: hidden;
    }
    
    .page-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
    }
    
    .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
        text-align: center;
        text-shadow: 3px 3px 10px rgba(0,0,0,0.3);
        letter-spacing: -0.5px;
        position: relative;
    }
    
    .bio-card {
        background: white;
        padding: 2.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        margin-bottom: 2rem;
        border: 1px solid rgba(102, 126, 234, 0.1);
        transition: all 0.3s ease;
    }
    
    .bio-card:hover {
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        transform: translateY(-3px);
    }
    
    .profile-img-large {
        width: 250px;
        height: 250px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        object-fit: cover;
        display: block;
        margin: 0 auto 1.5rem;
        border: 3px solid rgba(102, 126, 234, 0.2);
        transition: all 0.3s ease;
    }
    
    .profile-img-large:hover {
        transform: scale(1.02);
        box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    }
    
    .bio-text {
        font-size: 1.1rem;
        color: #4B5563;
        line-height: 1.8;
        margin-top: 1rem;
    }
    
    .section-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #667eea;
        margin: 2.5rem 0 1.5rem;
        position: relative;
        padding-bottom: 0.5rem;
        text-shadow: 1px 1px 3px rgba(102, 126, 234, 0.15);
    }
    
    .section-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 2px;
    }
    
    .skill-tag {
        display: inline-block;
        color: white;
        padding: 0.65rem 1.25rem;
        border-radius: 50px;
        margin: 0.35rem;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.3px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: default;
        border: 2px solid transparent;
    }
    
    .skill-tag:hover {
        transform: translateY(-4px) scale(1.08);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: rgba(255, 255, 255, 0.4);
    }
    
    .skill-tag-primary {
        position: relative;
    }
    
    .skill-tag-primary::after {
        content: '⭐';
        position: absolute;
        top: -8px;
        right: -8px;
        font-size: 0.75rem;
    }
    
    /* Programming Languages - Indigo */
    .skill-tag-indigo {
        background: linear-gradient(135deg, #667eea 0%, #5568d3 100%);
        box-shadow: 0 3px 12px rgba(102, 126, 234, 0.3);
    }
    
    .skill-tag-indigo:hover {
        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
    }
    
    /* ML & AI Frameworks - Purple */
    .skill-tag-purple {
        background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%);
        box-shadow: 0 3px 12px rgba(147, 51, 234, 0.3);
    }
    
    .skill-tag-purple:hover {
        box-shadow: 0 6px 25px rgba(147, 51, 234, 0.5);
    }
    
    /* Data Science & Analytics - Teal */
    .skill-tag-teal {
        background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
        box-shadow: 0 3px 12px rgba(20, 184, 166, 0.3);
    }
    
    .skill-tag-teal:hover {
        box-shadow: 0 6px 25px rgba(20, 184, 166, 0.5);
    }
    
    /* Databases - Blue */
    .skill-tag-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        box-shadow: 0 3px 12px rgba(59, 130, 246, 0.3);
    }
    
    .skill-tag-blue:hover {
        box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
    }
    
    /* Cloud & Infrastructure - Cyan */
    .skill-tag-cyan {
        background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
        box-shadow: 0 3px 12px rgba(6, 182, 212, 0.3);
    }
    
    .skill-tag-cyan:hover {
        box-shadow: 0 6px 25px rgba(6, 182, 212, 0.5);
    }
    
    /* Data Visualization & BI - Pink */
    .skill-tag-pink {
        background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
        box-shadow: 0 3px 12px rgba(236, 72, 153, 0.3);
    }
    
    .skill-tag-pink:hover {
        box-shadow: 0 6px 25px rgba(236, 72, 153, 0.5);
    }
    
    /* Specializations - Violet */
    .skill-tag-violet {
        background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
        box-shadow: 0 3px 12px rgba(124, 58, 237, 0.3);
    }
    
    .skill-tag-violet:hover {
        box-shadow: 0 6px 25px rgba(124, 58, 237, 0.5);
    }
    
    .skills-section-title {
        font-size: 2.25rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
        text-shadow: none;
    }
    
    .skills-subtitle {
        color: #6B7280;
        font-size: 1.05rem;
        margin-bottom: 3rem;
        font-style: italic;
    }
    
    .skills-category-container {
        background: linear-gradient(to right, #F9FAFB 0%, transparent 100%);
        padding: 1.75rem;
        border-radius: 12px;
        margin-bottom: 2.5rem;
        transition: all 0.3s ease;
    }
    
    .skills-category-container:hover {
        background: linear-gradient(to right, #F3F4F6 0%, transparent 100%);
        transform: translateX(4px);
    }
    
    .category-indigo {
        border-left: 4px solid #667eea;
    }
    
    .category-purple {
        border-left: 4px solid #9333ea;
    }
    
    .category-teal {
        border-left: 4px solid #14b8a6;
    }
    
    .category-blue {
        border-left: 4px solid #3b82f6;
    }
    
    .category-cyan {
        border-left: 4px solid #06b6d4;
    }
    
    .category-pink {
        border-left: 4px solid #ec4899;
    }
    
    .category-violet {
        border-left: 4px solid #7c3aed;
    }
    
    .skills-category-header {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .skills-category-header i {
        font-size: 1.4rem;
        width: 1.5rem;
        text-align: center;
    }
    
    .skills-pills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .skills-divider {
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, transparent, #D1D5DB, transparent);
        margin: 3rem 0;
    }
    
    .education-section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .education-section-title i {
        color: #667eea;
        font-size: 2.25rem;
    }
    
    .education-container {
        max-width: 56rem;
        margin: 0 auto;
    }
    
    .education-item {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        border-left: 5px solid #667eea;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        position: relative;
    }
    
    .education-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .education-item.masters {
        border-left-color: #9333ea;
    }
    
    .education-item.bachelors {
        border-left-color: #667eea;
    }
    
    .education-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .education-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }
    
    .education-university {
        color: #4B5563;
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .education-university i {
        color: #667eea;
    }
    
    .gpa-badge {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
    }
    
    .graduation-badge {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        margin-top: 0.5rem;
    }
    
    .coursework-container {
        background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
    }
    
    .coursework-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: #4B5563;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .coursework-label i {
        color: #667eea;
    }
    
    .course-pill {
        display: inline-block;
        background: white;
        color: #667eea;
        padding: 0.4rem 0.875rem;
        border-radius: 50px;
        font-size: 0.8125rem;
        font-weight: 500;
        margin: 0.25rem;
        border: 1.5px solid #E0E7FF;
        transition: all 0.2s ease;
    }
    
    .course-pill:hover {
        background: #EEF2FF;
        border-color: #667eea;
        transform: translateY(-1px);
    }
    
    .specialization-text {
        color: #6B7280;
        font-size: 0.9375rem;
        font-style: italic;
        margin-top: 0.75rem;
        padding-left: 1rem;
        border-left: 3px solid #E5E7EB;
    }
    
    .experience-section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 1rem;
        margin-top: 4rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .experience-section-title i {
        color: #10b981;
        font-size: 2.25rem;
    }
    
    .section-underline {
        width: 6rem;
        height: 4px;
        background: #10b981;
        border-radius: 2px;
        margin-bottom: 2.5rem;
    }
    
    .section-underline-leadership {
        width: 6rem;
        height: 4px;
        background: #f59e0b;
        border-radius: 2px;
        margin-bottom: 2.5rem;
    }
    
    .experience-item {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        border-left: 5px solid #10b981;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        position: relative;
    }
    
    .experience-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }
    
    .role-badge {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        padding: 0.375rem 0.875rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .badge-internship {
        background: #DBEAFE;
        color: #1E40AF;
    }
    
    .badge-teaching {
        background: #FEF3C7;
        color: #92400E;
    }
    
    .badge-current {
        background: #D1FAE5;
        color: #065F46;
    }
    
    .badge-founder {
        background: #E9D5FF;
        color: #6B21A8;
    }
    
    .badge-leadership {
        background: #DBEAFE;
        color: #1E40AF;
    }
    
    .metric-highlight {
        font-weight: 700;
        color: #10b981;
    }
    
    .metric-highlight-orange {
        font-weight: 700;
        color: #f59e0b;
    }
    
    .experience-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 0.5rem;
    }
    
    .experience-company {
        color: #4B5563;
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .experience-company i {
        color: #10b981;
    }
    
    .experience-duration {
        color: #6B7280;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .experience-duration i {
        color: #10b981;
    }
    
    .achievement-list {
        margin-top: 1rem;
        padding-left: 0;
        list-style: none;
    }
    
    .achievement-list li {
        color: #4B5563;
        font-size: 0.9375rem;
        line-height: 1.7;
        margin-bottom: 0.75rem;
        padding-left: 1.75rem;
        position: relative;
    }
    
    .achievement-list li::before {
        content: '▸';
        position: absolute;
        left: 0.5rem;
        color: #10b981;
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    .leadership-section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 1rem;
        margin-top: 4rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .leadership-section-title i {
        color: #f59e0b;
        font-size: 2.25rem;
    }
    
    .leadership-item {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        border-left: 5px solid #f59e0b;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        position: relative;
    }
    
    .leadership-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }
    
    .leadership-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 0.5rem;
    }
    
    .leadership-org {
        color: #4B5563;
        font-weight: 500;
        font-size: 0.9375rem;
        margin-bottom: 0.5rem;
    }
    
    .leadership-duration {
        color: #6B7280;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .leadership-duration i {
        color: #f59e0b;
    }
    
    .cta-container {
        margin-top: 4rem;
        padding: 3rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    }
    
    .cta-title {
        color: white;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .cta-text {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.125rem;
        margin-bottom: 2rem;
    }
    
    .journey-callout {
        background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
        border-left: 5px solid #667eea;
        border-radius: 12px;
        padding: 1.75rem;
        margin: 1.5rem 0;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
    }
    
    .journey-heading {
        font-size: 1.125rem;
        font-weight: 600;
        color: #667eea;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .journey-heading i {
        font-size: 1.25rem;
    }
    
    .journey-text {
        color: #4B5563;
        font-size: 1rem;
        line-height: 1.8;
        font-style: italic;
    }
    
    .element-container:has(+ .element-container .section-title) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
    }
    
    .btn-white {
        background: white !important;
        color: #667eea !important;
        border: 2px solid white !important;
        transition: all 0.3s ease;
    }
    
    .btn-white:hover {
        background: #EEF2FF !important;
        transform: translateY(-2px);
    }
    
    .btn-teal {
        background: #14b8a6 !important;
        color: white !important;
        transition: all 0.3s ease;
    }
    
    .btn-teal:hover {
        background: #0d9488 !important;
        transform: translateY(-2px);
    }
    
    .btn-indigo {
        background: #667eea !important;
        color: white !important;
        transition: all 0.3s ease;
    }
    
    .btn-indigo:hover {
        background: #5568d3 !important;
        transform: translateY(-2px);
    }
    
    .download-button {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: white;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        margin-top: 1rem;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        transition: all 0.3s ease;
    }
    
    .download-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
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

st.markdown("""
<div class="page-header">
    <div class="page-title">📖 About Me</div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 2])

with col1:
    profile_img_path = Path("assets/headshot image.png")
    if profile_img_path.exists():
        img_base64 = get_img_base64(profile_img_path)
        if img_base64:
            st.markdown(f"""
            <img src="data:image/jpeg;base64,{img_base64}" class="profile-img-large">
            """, unsafe_allow_html=True)
    else:
        st.markdown("""
        <div style="width: 250px; height: 250px; border-radius: 20px; 
        background: linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%); 
        margin: 0 auto 1.5rem; display: flex; align-items: center; 
        justify-content: center; font-size: 8rem; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
            👤
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    resume_path = Path("assets/Saurabh_Dusane_Resume.pdf")
    if resume_path.exists():
        with open(resume_path, "rb") as pdf_file:
            st.download_button(
                label="📄 Download Resume",
                data=pdf_file,
                file_name="Saurabh_Dusane_Resume.pdf",
                mime="application/pdf",
                use_container_width=True
            )
    else:
        st.info("💡 Add your Saurabh_Dusane_Resume.pdf to assets/ folder")

with col2:
    st.markdown('<div class="bio-card">', unsafe_allow_html=True)
    
    st.markdown('<h2 style="color: #1F2937; margin-top: 0;">Hello! I\'m Saurabh 👋</h2>', unsafe_allow_html=True)
    
    st.markdown('<div class="bio-text">I\'m an innovative AI/ML engineer and data scientist who believes in the transformative power of data.</div>', unsafe_allow_html=True)
    
    st.markdown("""
    <div class="journey-callout">
        <div class="journey-heading"><i class="fas fa-lightbulb"></i> My Journey to AI</div>
        <div class="journey-text">
            My fascination with AI began through an unconventional path: competitive strategy gaming. 
            Intrigued by AI opponents that could adapt tactics, optimize resource management, and challenge 
            my strategic thinking, I recognized the powerful parallels between game AI and business intelligence. 
            The same principles that enable game AI to make complex decisions under uncertainty—pattern recognition, 
            predictive modeling, and strategic optimization—are fundamental to solving real-world business challenges. 
            This realization transformed a hobby into a career passion, driving me to build intelligent systems 
            that help organizations make data-driven strategic decisions.
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div class="bio-text">
        I specialize in building predictive models, extracting actionable insights from complex datasets, 
        and developing business intelligence solutions that drive strategic decision-making. With expertise 
        in machine learning algorithms, deep learning, and data visualization, I approach every challenge 
        with optimism and innovation.
        <br><br>
        When I'm not analyzing data or training models, you can find me exploring cutting-edge AI research, 
        contributing to open-source ML projects, or sharing insights about the latest trends in artificial intelligence.
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown('</div>', unsafe_allow_html=True)

st.markdown('<h2 class="education-section-title"><i class="fas fa-graduation-cap"></i> Education</h2>', unsafe_allow_html=True)

st.markdown('<div class="education-container">', unsafe_allow_html=True)

# Master's Degree Card
st.markdown("""
<div class="education-item masters">
    <div class="education-header">
        <div style="flex: 1;">
            <div class="education-title">Master of Science in Computer Engineering</div>
            <div class="education-title" style="font-size: 1.1rem; color: #6B7280; font-weight: 600;">(Computer Systems)</div>
        </div>
        <div class="gpa-badge"><i class="fas fa-star"></i> GPA: 4.00/4.00</div>
    </div>
    <div class="education-university"><i class="fas fa-university"></i> Arizona State University | Aug 2024 - Present</div>
    <div class="graduation-badge"><i class="fas fa-calendar-alt"></i> Expected Graduation: May 2026</div>
    <div class="specialization-text">Focus Areas: Machine Learning Systems, Advanced Data Mining, Blockchain Architecture</div>
    <div class="coursework-container">
        <div class="coursework-label"><i class="fas fa-book-open"></i> Relevant Coursework</div>
        <div>
            <span class="course-pill">Data Mining</span>
            <span class="course-pill">Semantic Web Mining</span>
            <span class="course-pill">Engineering Blockchain Applications</span>
            <span class="course-pill">Foundation of Algorithms</span>
            <span class="course-pill">Advanced ML Systems</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Bachelor's Degree Card
st.markdown("""
<div class="education-item bachelors">
    <div class="education-title">Bachelor of Engineering in Artificial Intelligence & Data Science</div>
    <div class="education-university"><i class="fas fa-university"></i> K. K. Wagh Institute of Engineering Education | June 2020 - May 2024</div>
    <div class="specialization-text">Comprehensive foundation in AI/ML with focus on practical applications and research</div>
    <div class="coursework-container">
        <div class="coursework-label"><i class="fas fa-book-open"></i> Relevant Coursework</div>
        <div>
            <span class="course-pill">Machine Learning</span>
            <span class="course-pill">Deep Learning</span>
            <span class="course-pill">Statistical Analysis</span>
            <span class="course-pill">Data Mining</span>
            <span class="course-pill">Business Intelligence</span>
            <span class="course-pill">Computer Vision</span>
            <span class="course-pill">Natural Language Processing</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

st.markdown('<h2 class="skills-section-title">💻 Skills & Technologies</h2>', unsafe_allow_html=True)
st.markdown('<p class="skills-subtitle">Technologies I work with to build intelligent solutions</p>', unsafe_allow_html=True)

# 1. Programming Languages
st.markdown("""
<div class="skills-category-container category-indigo">
    <h3 class="skills-category-header">
        <i class="fas fa-code"></i>
        Programming Languages
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-indigo skill-tag-primary">Python</span>
        <span class="skill-tag skill-tag-indigo skill-tag-primary">SQL</span>
        <span class="skill-tag skill-tag-indigo">R</span>
        <span class="skill-tag skill-tag-indigo">C/C++</span>
        <span class="skill-tag skill-tag-indigo">Go</span>
        <span class="skill-tag skill-tag-indigo">Java</span>
        <span class="skill-tag skill-tag-indigo">Scala</span>
    </div>
</div>
""", unsafe_allow_html=True)

# 2. Machine Learning & AI Frameworks
st.markdown("""
<div class="skills-category-container category-purple">
    <h3 class="skills-category-header">
        <i class="fas fa-brain"></i>
        Machine Learning & AI Frameworks
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-purple skill-tag-primary">TensorFlow</span>
        <span class="skill-tag skill-tag-purple skill-tag-primary">PyTorch</span>
        <span class="skill-tag skill-tag-purple">Keras</span>
        <span class="skill-tag skill-tag-purple">Scikit-learn</span>
        <span class="skill-tag skill-tag-purple">XGBoost</span>
        <span class="skill-tag skill-tag-purple">LightGBM</span>
        <span class="skill-tag skill-tag-purple">Random Forest</span>
        <span class="skill-tag skill-tag-purple">OpenCV</span>
        <span class="skill-tag skill-tag-purple">Transformers</span>
        <span class="skill-tag skill-tag-purple">NLTK</span>
    </div>
</div>
""", unsafe_allow_html=True)

# 3. Data Science & Analytics
st.markdown("""
<div class="skills-category-container category-teal">
    <h3 class="skills-category-header">
        <i class="fas fa-chart-line"></i>
        Data Science & Analytics
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-teal skill-tag-primary">Pandas</span>
        <span class="skill-tag skill-tag-teal skill-tag-primary">NumPy</span>
        <span class="skill-tag skill-tag-teal">Matplotlib</span>
        <span class="skill-tag skill-tag-teal">Seaborn</span>
        <span class="skill-tag skill-tag-teal">Plotly</span>
        <span class="skill-tag skill-tag-teal">SciPy</span>
        <span class="skill-tag skill-tag-teal">Apache Spark</span>
        <span class="skill-tag skill-tag-teal">BeautifulSoup</span>
        <span class="skill-tag skill-tag-teal">Scrapy</span>
        <span class="skill-tag skill-tag-teal">Selenium</span>
    </div>
</div>
""", unsafe_allow_html=True)

# 4. Databases & Data Storage
st.markdown("""
<div class="skills-category-container category-blue">
    <h3 class="skills-category-header">
        <i class="fas fa-database"></i>
        Databases & Data Storage
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-blue skill-tag-primary">MySQL</span>
        <span class="skill-tag skill-tag-blue">MongoDB</span>
        <span class="skill-tag skill-tag-blue">PostgreSQL</span>
        <span class="skill-tag skill-tag-blue">NoSQL</span>
    </div>
</div>
""", unsafe_allow_html=True)

# 5. Cloud & Infrastructure
st.markdown("""
<div class="skills-category-container category-cyan">
    <h3 class="skills-category-header">
        <i class="fas fa-cloud"></i>
        Cloud & Infrastructure
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-cyan">AWS (EC2, S3, Lambda)</span>
        <span class="skill-tag skill-tag-cyan">Google Cloud Platform</span>
        <span class="skill-tag skill-tag-cyan">Docker</span>
        <span class="skill-tag skill-tag-cyan">Git</span>
        <span class="skill-tag skill-tag-cyan">FastAPI</span>
        <span class="skill-tag skill-tag-cyan">REST APIs</span>
    </div>
</div>
""", unsafe_allow_html=True)

# 6. Data Visualization & BI Tools
st.markdown("""
<div class="skills-category-container category-pink">
    <h3 class="skills-category-header">
        <i class="fas fa-chart-pie"></i>
        Data Visualization & BI Tools
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-pink skill-tag-primary">Tableau</span>
        <span class="skill-tag skill-tag-pink">Power BI</span>
        <span class="skill-tag skill-tag-pink">Jupyter Notebooks</span>
        <span class="skill-tag skill-tag-pink">Data Studio</span>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="skills-divider"></div>', unsafe_allow_html=True)

# 7. Technical Specializations
st.markdown("""
<div class="skills-category-container category-violet">
    <h3 class="skills-category-header">
        <i class="fas fa-bullseye"></i>
        Technical Specializations
    </h3>
    <div class="skills-pills-container">
        <span class="skill-tag skill-tag-violet">Deep Learning</span>
        <span class="skill-tag skill-tag-violet">Computer Vision</span>
        <span class="skill-tag skill-tag-violet">Natural Language Processing</span>
        <span class="skill-tag skill-tag-violet">Time Series Analysis</span>
        <span class="skill-tag skill-tag-violet">Predictive Analytics</span>
        <span class="skill-tag skill-tag-violet">Feature Engineering</span>
        <span class="skill-tag skill-tag-violet">Model Optimization</span>
        <span class="skill-tag skill-tag-violet">Statistical Modeling</span>
    </div>
</div>
""", unsafe_allow_html=True)

# Experience Section
st.markdown('<h2 class="experience-section-title"><i class="fas fa-briefcase"></i> Professional Experience</h2>', unsafe_allow_html=True)
st.markdown('<div class="section-underline"></div>', unsafe_allow_html=True)

st.markdown('<div class="education-container">', unsafe_allow_html=True)

# ML Intern Experience
st.markdown("""
<div class="experience-item">
    <div class="experience-title">Machine Learning Intern</div>
    <div class="experience-company"><i class="fas fa-building"></i> Cognifront Pvt. Ltd.</div>
    <div class="experience-duration"><i class="fas fa-calendar"></i> Dec 2023 - Jun 2024</div>
    <ul class="achievement-list">
        <li>Developed automated data validation pipeline processing 5,000+ records with 98% accuracy using Python and Pandas</li>
        <li>Built scalable data processing workflows with 35% improvement in throughput by optimizing ETL pipelines</li>
        <li>Created interactive Tableau dashboards enabling real-time data insights for stakeholders and management</li>
        <li>Collaborated with cross-functional teams to deploy ML models improving prediction accuracy by 25%</li>
    </ul>
</div>
""", unsafe_allow_html=True)

# Teaching Assistant Experience
st.markdown("""
<div class="experience-item">
    <div class="experience-title">Teaching Assistant</div>
    <div class="experience-company"><i class="fas fa-university"></i> K. K. Wagh Institute of Engineering & Research</div>
    <div class="experience-duration"><i class="fas fa-calendar"></i> Jul 2023 - Mar 2024</div>
    <ul class="achievement-list">
        <li>Supported 200+ students in Machine Learning and Data Science courses through hands-on lab sessions and office hours</li>
        <li>Provided technical guidance on Python programming, TensorFlow, and Scikit-learn implementation</li>
        <li>Mentored students on capstone projects involving real-world ML applications and research methodologies</li>
    </ul>
</div>
""", unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

# Leadership Section
st.markdown('<h2 class="leadership-section-title"><i class="fas fa-users"></i> Leadership & Extracurricular Activities</h2>', unsafe_allow_html=True)
st.markdown('<div class="section-underline-leadership"></div>', unsafe_allow_html=True)

st.markdown('<div class="education-container">', unsafe_allow_html=True)

# ISSC Volunteer
st.markdown("""
<div class="leadership-item">
    <span class="role-badge badge-current">Current Role</span>
    <div class="leadership-title">Grad Initiatives Team Volunteer</div>
    <div class="leadership-org"><i class="fas fa-building"></i> International Students & Scholars Center (ISSC), Arizona State University Tempe - United States</div>
    <div class="leadership-duration"><i class="fas fa-calendar"></i> Oct 2024 - Present</div>
    <ul class="achievement-list">
        <li>Coordinate community support programs and integration initiatives for diverse student populations, managing multiple concurrent projects and facilitating effective communication across stakeholder groups</li>
    </ul>
</div>
""", unsafe_allow_html=True)

# Phoenix AI Club
st.markdown("""
<div class="leadership-item">
    <span class="role-badge badge-founder">Founder</span>
    <div class="leadership-title">Co-Founder & President</div>
    <div class="leadership-org"><i class="fas fa-users"></i> Phoenix AI Club (University Student Organization) - India</div>
    <div class="leadership-duration"><i class="fas fa-calendar"></i> Mar 2023 - Jan 2024</div>
    <ul class="achievement-list">
        <li>Founded and managed student organization scaling to <span class="metric-highlight-orange">1,500+</span> members within 3 months, delivering <span class="metric-highlight-orange">13+</span> technical training workshops on machine learning, and data science applications while coordinating with multiple stakeholders</li>
    </ul>
</div>
""", unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    st.markdown('<style>.btn-white-bio button { background: white !important; color: #667eea !important; border: 2px solid white !important; border-radius: 50px; padding: 0.9rem 2.8rem; transition: all 0.3s ease; } .btn-white-bio button:hover { background: #EEF2FF !important; transform: translateY(-2px); }</style>', unsafe_allow_html=True)
    st.markdown('<div class="btn-white-bio">', unsafe_allow_html=True)
    if st.button("🏠 Back to Home", use_container_width=True, key="bio_home"):
        st.switch_page("Home.py")
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<style>.btn-teal-bio button { background: #14b8a6 !important; color: white !important; border-radius: 50px; padding: 0.9rem 2.8rem; transition: all 0.3s ease; } .btn-teal-bio button:hover { background: #0d9488 !important; transform: translateY(-2px); }</style>', unsafe_allow_html=True)
    st.markdown('<div class="btn-teal-bio">', unsafe_allow_html=True)
    if st.button("💼 View Projects", use_container_width=True, key="bio_projects"):
        st.switch_page("pages/2_Projects.py")
    st.markdown('</div>', unsafe_allow_html=True)

with col3:
    st.markdown('<style>.btn-indigo-bio button { background: #667eea !important; color: white !important; border-radius: 50px; padding: 0.9rem 2.8rem; transition: all 0.3s ease; } .btn-indigo-bio button:hover { background: #5568d3 !important; transform: translateY(-2px); }</style>', unsafe_allow_html=True)
    st.markdown('<div class="btn-indigo-bio">', unsafe_allow_html=True)
    if st.button("📧 Contact Me", use_container_width=True, key="bio_contact"):
        st.switch_page("pages/3_Contact.py")
    st.markdown('</div>', unsafe_allow_html=True)
