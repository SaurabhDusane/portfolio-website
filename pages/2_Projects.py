import streamlit as st
import json
import base64
from pathlib import Path

st.set_page_config(
    page_title="Portfolio - Projects",
    page_icon="💼",
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
    
    .project-card {
        background: white;
        border-radius: 15px;
        padding: 0;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        height: 100%;
        overflow: hidden;
        border: 2px solid transparent;
    }
    
    .project-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        border-color: #C7D2FE;
    }
    
    .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 15px 15px 0 0;
    }
    
    .project-content {
        padding: 2rem;
    }
    
    .project-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 1rem;
        letter-spacing: -0.3px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    .project-description {
        font-size: 1rem;
        color: #6B7280;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .tech-tag {
        display: inline-block;
        background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
        color: #667eea;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        margin: 0.3rem;
        font-size: 0.85rem;
        font-weight: 500;
        border: 1px solid rgba(102, 126, 234, 0.2);
        transition: all 0.2s ease;
    }
    
    .tech-tag:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        transform: translateY(-2px);
    }
    
    .project-links {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #E5E7EB;
    }
    
    .project-link {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        margin-right: 0.75rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    
    .project-link:hover {
        background: #5568d3;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
    }
    
    .project-link-demo {
        background: #14b8a6;
    }
    
    .project-link-demo:hover {
        background: #0d9488;
    }
    
    .stButton > button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 0.9rem 2.8rem;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        letter-spacing: 0.3px;
    }
    
    .stButton > button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        background: linear-gradient(135deg, #7c8eee 0%, #8558b2 100%);
    }
    
    .info-box {
        background: #EFF6FF;
        border-left: 4px solid #3B82F6;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
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
    <div class="page-title">💼 My Projects</div>
</div>
""", unsafe_allow_html=True)

projects = load_projects()

if not projects:
    st.markdown("""
    <div class="info-box">
        <h3 style="margin-top: 0; color: #1F2937;">📝 No Projects Found</h3>
        <p style="color: #4B5563; margin-bottom: 0;">
            Add your projects to <code>data/projects.json</code> to display them here.
            See the README for instructions on how to add projects.
        </p>
    </div>
    """, unsafe_allow_html=True)
else:
    for i in range(0, len(projects), 2):
        cols = st.columns(2)
        
        for j, col in enumerate(cols):
            if i + j < len(projects):
                project = projects[i + j]
                
                with col:
                    card_html = '<div class="project-card">'
                    
                    img_path = Path(project.get("image", ""))
                    if img_path.exists():
                        img_base64 = get_img_base64(img_path)
                        if img_base64:
                            card_html += f'<img src="data:image/jpeg;base64,{img_base64}" class="project-image">'
                    else:
                        card_html += f'''
                        <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                            {project.get("icon", "🚀")}
                        </div>
                        '''
                    
                    card_html += '<div class="project-content">'
                    card_html += f'<div class="project-title">{project.get("title", "Project Title")}</div>'
                    card_html += f'<div class="project-description">{project.get("description", "Project description")}</div>'
                    
                    card_html += '<div style="margin: 1rem 0;">'
                    for tech in project.get("tech_stack", []):
                        card_html += f'<span class="tech-tag">{tech}</span>'
                    card_html += '</div>'
                    
                    card_html += '<div class="project-links">'
                    if project.get("github_link"):
                        card_html += f'<a href="{project["github_link"]}" target="_blank" class="project-link">🔗 GitHub</a>'
                    if project.get("demo_link"):
                        card_html += f'<a href="{project["demo_link"]}" target="_blank" class="project-link project-link-demo">🌐 Live Demo</a>'
                    card_html += '</div>'
                    
                    card_html += '</div></div>'
                    
                    st.markdown(card_html, unsafe_allow_html=True)
                    st.markdown("<br>", unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

st.markdown("""
<div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); text-align: center;">
    <h3 style="color: #1F2937; margin-top: 0;">💡 Want to see more?</h3>
    <p style="color: #6B7280; margin-bottom: 1.5rem;">
        Check out my GitHub profile for more projects and contributions!
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("🏠 Back to Home", use_container_width=True):
        st.switch_page("Home.py")

with col2:
    if st.button("📖 View Bio", use_container_width=True):
        st.switch_page("pages/1_Bio.py")

with col3:
    if st.button("📧 Contact Me", use_container_width=True):
        st.switch_page("pages/3_Contact.py")
