import streamlit as st
import requests
import re

st.set_page_config(
    page_title="Saurabh Dusane - Contact",
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

    .glass-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        transition: all 0.35s ease;
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
    .glass-card:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(139,92,246,0.2);
    }

    .connect-text {
        color: #94a3b8;
        font-size: 0.95rem;
        line-height: 1.75;
    }

    .social-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 14px;
        padding: 1.25rem;
        margin-bottom: 0.75rem;
        text-decoration: none;
        transition: all 0.35s ease;
    }
    .social-link:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(139,92,246,0.25);
        transform: translateX(6px);
        box-shadow: 0 8px 20px rgba(139,92,246,0.12);
    }
    .social-icon {
        width: 46px;
        height: 46px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        flex-shrink: 0;
    }
    .social-icon-email { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; }
    .social-icon-github { background: rgba(255,255,255,0.1); color: #e2e8f0; }
    .social-icon-linkedin { background: rgba(59,130,246,0.2); color: #60a5fa; }
    .social-icon-twitter { background: rgba(255,255,255,0.08); color: #e2e8f0; }

    .social-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: #e2e8f0;
    }
    .social-subtitle {
        font-size: 0.82rem;
        color: #64748b;
    }

    .form-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #e2e8f0;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .form-heading i { color: #a5b4fc; }

    .stTextInput > div > div > input,
    .stTextArea > div > div > textarea {
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        padding: 0.85rem;
        background: rgba(255,255,255,0.04);
        color: #e2e8f0;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    .stTextInput > div > div > input:focus,
    .stTextArea > div > div > textarea:focus {
        border-color: rgba(139,92,246,0.5);
        box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
    }

    .stTextInput label, .stTextArea label {
        color: #94a3b8 !important;
        font-weight: 600 !important;
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

load_css()

# --- HEADER ---
st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-comments"></i> Get In Touch</div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("""<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-handshake" style="color: #6366f1;"></i> Let's Connect</h3><p class="connect-text">I'm always open to connecting with fellow developers, potential collaborators, or anyone interested in my work. Whether you have a project idea, a question, or just want to say hi -- feel free to reach out.</p></div>""", unsafe_allow_html=True)

    st.markdown(
        '<div>'
        '<a href="mailto:sdusane1@asu.edu" class="social-link">'
        '<div class="social-icon social-icon-email"><i class="fas fa-envelope"></i></div>'
        '<div><div class="social-title">Email</div><div class="social-subtitle">sdusane1@asu.edu</div></div></a>'
        '<a href="https://github.com/SaurabhDusane" target="_blank" class="social-link">'
        '<div class="social-icon social-icon-github"><i class="fab fa-github"></i></div>'
        '<div><div class="social-title">GitHub</div><div class="social-subtitle">@SaurabhDusane</div></div></a>'
        '<a href="https://www.linkedin.com/in/saurabh-dusane" target="_blank" class="social-link">'
        '<div class="social-icon social-icon-linkedin"><i class="fab fa-linkedin"></i></div>'
        '<div><div class="social-title">LinkedIn</div><div class="social-subtitle">Saurabh Dusane</div></div></a>'
        '<a href="https://x.com/SaurabhDusane13" target="_blank" class="social-link">'
        '<div class="social-icon social-icon-twitter"><i class="fab fa-x-twitter"></i></div>'
        '<div><div class="social-title">Twitter / X</div><div class="social-subtitle">@SaurabhDusane13</div></div></a>'
        '</div>',
        unsafe_allow_html=True
    )

with col2:
    st.markdown('<div class="form-heading"><i class="fas fa-paper-plane"></i> Send Me a Message</div>', unsafe_allow_html=True)

    FORMSPREE_FORM_ID = "xojapzeo"

    def validate_email(email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    def send_to_formspree(name, email, subject, message):
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
            if not name or not email or not subject or not message:
                st.error("Please fill in all required fields")
            elif not validate_email(email):
                st.error("Please enter a valid email address")
            elif len(message) < 10:
                st.error("Message must be at least 10 characters long")
            else:
                with st.spinner("Sending your message..."):
                    success = send_to_formspree(name, email, subject, message)
                if success:
                    st.success("Message sent successfully! I'll get back to you soon.")
                else:
                    st.error("Failed to send message. Please try again or contact me directly via email.")
                    st.info("You can reach me at: sdusane1@asu.edu")

st.markdown("<div style='height: 1.5rem;'></div>", unsafe_allow_html=True)

st.markdown("""
<div class="glass-card" style="text-align: center; max-width: 900px; margin: 0 auto 1.5rem;">
    <h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-star" style="color: #fbbf24;"></i> Open to Opportunities</h3>
    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">
        Currently seeking internship opportunities and freelance projects.
        If you think I'd be a good fit for your team, let's talk.
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown("<div style='height: 1rem;'></div>", unsafe_allow_html=True)

col1, col2, col3 = st.columns([1, 1, 1])
with col1:
    if st.button("Back to Home", use_container_width=True):
        st.switch_page("Home.py")
with col2:
    if st.button("View Bio", use_container_width=True):
        st.switch_page("pages/1_Bio.py")
with col3:
    if st.button("View Projects", use_container_width=True):
        st.switch_page("pages/2_Projects.py")
