import streamlit as st
import requests
import re

st.set_page_config(
    page_title="Portfolio - Contact",
    page_icon="📧",
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
    
    .contact-card {
        background: white;
        padding: 2.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        margin-bottom: 2rem;
        border: 1px solid rgba(102, 126, 234, 0.1);
        transition: box-shadow 0.3s ease;
    }
    
    .contact-card:hover {
        box-shadow: 0 12px 35px rgba(0,0,0,0.12);
    }
    
    .social-link {
        display: flex;
        align-items: center;
        background: white;
        padding: 1.8rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        margin-bottom: 1rem;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
        border: 1px solid rgba(102, 126, 234, 0.1);
    }
    
    .social-link:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        border-color: rgba(102, 126, 234, 0.3);
    }
    
    .social-icon {
        width: 50px;
        height: 50px;
        margin-right: 1.5rem;
        flex-shrink: 0;
    }
    
    .social-icon svg {
        width: 100%;
        height: 100%;
    }
    
    .social-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 0.4rem;
        letter-spacing: -0.3px;
    }
    
    .social-subtitle {
        color: #6B7280;
        font-size: 0.95rem;
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
    
    .form-container {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    
    .stTextInput > div > div > input,
    .stTextArea > div > div > textarea {
        border-radius: 10px;
        border: 2px solid #E5E7EB;
        padding: 0.8rem;
    }
    
    .stTextInput > div > div > input:focus,
    .stTextArea > div > div > textarea:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .info-note {
        background: #EFF6FF;
        border: 2px solid #DBEAFE;
        border-left: 4px solid #3B82F6;
        padding: 1rem 1.2rem;
        border-radius: 8px;
        margin: 1rem 0;
        color: #1E40AF;
    }
    
    .element-container {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    [data-testid="column"] {
        padding-top: 1rem !important;
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

load_css()

st.markdown("""
<div class="page-header">
    <div class="page-title">💬 Get In Touch</div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("""
    <div class="contact-card">
        <h2 style="color: #1F2937; margin-top: 0;">Let's Connect! 🤝</h2>
        <p style="color: #6B7280; font-size: 1.1rem; line-height: 1.8;">
            I'm always excited to connect with fellow developers, potential collaborators, 
            or anyone interested in my work. Whether you have a project idea, a question, 
            or just want to say hi, feel free to reach out!
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <a href="mailto:sdusane1@asu.edu" class="social-link">
        <div class="social-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        </div>
        <div>
            <div class="social-title">Email</div>
            <div class="social-subtitle">sdusane1@asu.edu</div>
            <div class="social-subtitle">saurndusane@live.in</div>
        </div>
    </a>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <a href="https://github.com/SaurabhDusane" target="_blank" class="social-link">
        <div class="social-icon">
            <svg viewBox="0 0 24 24" fill="#667eea">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        </div>
        <div>
            <div class="social-title">GitHub</div>
            <div class="social-subtitle">@SaurabhDusane</div>
        </div>
    </a>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <a href="https://www.linkedin.com/in/saurabh-dusane" target="_blank" class="social-link">
        <div class="social-icon">
            <svg viewBox="0 0 24 24" fill="#667eea">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        </div>
        <div>
            <div class="social-title">LinkedIn</div>
            <div class="social-subtitle">Saurabh Dusane</div>
        </div>
    </a>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <a href="https://x.com/SaurabhDusane13" target="_blank" class="social-link">
        <div class="social-icon">
            <svg viewBox="0 0 24 24" fill="#667eea">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        </div>
        <div>
            <div class="social-title">Twitter</div>
            <div class="social-subtitle">@SaurabhDusane13</div>
        </div>
    </a>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="form-container">
        <h3 style="color: #1F2937; margin-top: 0; margin-bottom: 1rem;">💬 Send Me a Message</h3>
    </div>
    """, unsafe_allow_html=True)
    
    # FormSpree Form ID - Configured and ready to use
    FORMSPREE_FORM_ID = "xojapzeo"  # FormSpree form endpoint
    
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def send_to_formspree(name, email, subject, message):
        """Send form data to FormSpree"""
        try:
            response = requests.post(
                f"https://formspree.io/f/{FORMSPREE_FORM_ID}",
                data={
                    "name": name,
                    "email": email,
                    "subject": subject,
                    "message": message,
                    "_replyto": email
                },
                headers={"Accept": "application/json"},
                timeout=10
            )
            return response.status_code == 200
        except requests.exceptions.RequestException:
            return False
    
    with st.form("contact_form"):
        name = st.text_input("Name *", placeholder="Your Name")
        email = st.text_input("Email *", placeholder="your.email@example.com")
        subject = st.text_input("Subject *", placeholder="What's this about?")
        message = st.text_area("Message *", placeholder="Your message here...", height=150)
        
        submitted = st.form_submit_button("Send Message", use_container_width=True)
        
        if submitted:
            # Validation
            if not name or not email or not subject or not message:
                st.error("❌ Please fill in all required fields")
            elif not validate_email(email):
                st.error("❌ Please enter a valid email address")
            elif len(message) < 10:
                st.error("❌ Message must be at least 10 characters long")
            else:
                # Send to FormSpree
                with st.spinner("Sending your message..."):
                    success = send_to_formspree(name, email, subject, message)
                
                if success:
                    st.success("✅ Message sent successfully! I'll get back to you soon.")
                else:
                    st.error("❌ Failed to send message. Please try again or contact me directly via email.")
                    st.info("📧 You can reach me at: sdusane1@asu.edu")

st.markdown("<br>", unsafe_allow_html=True)

st.markdown("""
<div class="contact-card" style="text-align: center;">
    <h3 style="color: #1F2937; margin-top: 0;">🌟 Looking for Opportunities</h3>
    <p style="color: #6B7280; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
        I'm currently seeking internship opportunities and freelance projects. 
        If you think I'd be a good fit for your team or project, let's talk!
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
    if st.button("💼 View Projects", use_container_width=True):
        st.switch_page("pages/2_Projects.py")
