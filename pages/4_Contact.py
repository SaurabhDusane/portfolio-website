import streamlit as st
import requests
import re
import random

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
    @keyframes iconBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
    @keyframes iconSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulseRing {
        0% { box-shadow: 0 0 0 0 var(--ring-color, rgba(99,102,241,0.4)); }
        70% { box-shadow: 0 0 0 10px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
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
    @keyframes successPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
        50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0); }
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

    .connect-text {
        color: #e2e8f0;
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
        transform: translateX(8px) scale(1.02);
        box-shadow: 0 8px 20px rgba(139,92,246,0.12);
    }
    .social-link {
        animation: slideInRight 0.5s ease-out both;
    }
    .social-link:nth-child(1) { animation-delay: 0.1s; }
    .social-link:nth-child(2) { animation-delay: 0.2s; }
    .social-link:nth-child(3) { animation-delay: 0.3s; }
    .social-link:nth-child(4) { animation-delay: 0.4s; }
    .social-icon {
        width: 46px;
        height: 46px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        flex-shrink: 0;
        transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .social-link:hover .social-icon {
        transform: scale(1.15) rotate(-8deg);
        animation: pulseRing 1.5s ease-out infinite;
    }
    .social-link:hover {
        transform: translateX(6px);
    }
    .social-icon-email { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; --ring-color: rgba(99,102,241,0.4); }
    .social-icon-github { background: rgba(255,255,255,0.1); color: #e2e8f0; --ring-color: rgba(255,255,255,0.2); }
    .social-icon-linkedin { background: rgba(59,130,246,0.2); color: #60a5fa; --ring-color: rgba(59,130,246,0.3); }
    .social-icon-twitter { background: rgba(255,255,255,0.08); color: #e2e8f0; --ring-color: rgba(255,255,255,0.15); }

    .social-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: #e2e8f0;
        transition: color 0.3s ease;
    }
    .social-link:hover .social-title {
        color: #c4b5fd;
    }
    .social-subtitle {
        font-size: 0.82rem;
        color: #e2e8f0;
        transition: color 0.3s ease;
    }
    .social-link:hover .social-subtitle {
        color: #e2e8f0;
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
        animation: fadeInUp 0.7s ease-out 0.2s both;
    }
    .form-heading i { color: #a5b4fc; transition: all 0.3s ease; }
    .form-heading:hover i { transform: rotate(-10deg) scale(1.15); }

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
        box-shadow: 0 0 0 3px rgba(139,92,246,0.15), 0 0 20px rgba(139,92,246,0.08);
        background: rgba(255,255,255,0.06);
    }
    .stTextInput > div > div > input:hover,
    .stTextArea > div > div > textarea:hover {
        border-color: rgba(139,92,246,0.3);
        background: rgba(255,255,255,0.05);
    }

    .stTextInput label, .stTextArea label {
        color: #e2e8f0 !important;
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

    /* Success/error message animation */
    .stAlert {
        animation: fadeInUp 0.4s ease-out both;
    }
    .stAlert[data-baseweb*="positive"] {
        animation: fadeInUp 0.4s ease-out both, successPulse 0.6s ease-out 0.4s both;
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

load_css()

# --- AURORA MESH ---
aurora_blobs = [
    {"color": "rgba(99,102,241,0.10)", "w": 400, "h": 400, "top": "10%", "left": "-3%", "dur": 19},
    {"color": "rgba(168,85,247,0.08)", "w": 350, "h": 350, "top": "55%", "left": "65%", "dur": 23},
    {"color": "rgba(20,184,166,0.06)", "w": 280, "h": 280, "top": "75%", "left": "25%", "dur": 21},
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

# --- HEADER ---
st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-comments"></i> Get In Touch</div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("""<div class="glass-card"><h3 style="color: #e2e8f0; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-handshake" style="color: #6366f1;"></i> Let's Build Something Great</h3><p class="connect-text">I'm actively looking to collaborate with teams solving hard problems with AI. Whether you're a hiring manager, a startup founder, or a fellow engineer with a bold idea&mdash;I'd love to hear from you. Let's talk about how I can add value to your next project.</p></div>""", unsafe_allow_html=True)

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

st.markdown("""<div class="glass-card" style="text-align: center; max-width: 900px; margin: 0 auto 1.5rem;">
    <h3 style="color: #e2e8f0; margin-top: 0;"><i class="fas fa-rocket" style="color: #fbbf24;"></i> Actively Seeking Opportunities</h3>
    <p style="color: #e2e8f0; font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.75rem;">
        I'm looking for <strong style="color: #c4b5fd;">full-time, internship, and contract roles</strong> in AI/ML Engineering,
        Data Science, and Applied Research. I bring production ML experience, a 4.0 GPA, and a track record of shipping systems that move metrics.
    </p>
    <p style="color: #e2e8f0; font-size: 0.85rem; margin-bottom: 0;">
        <i class="fas fa-map-marker-alt" style="color: #a855f7; margin-right: 0.3rem;"></i> Open to relocation &nbsp;|&nbsp;
        <i class="fas fa-laptop-house" style="color: #a855f7; margin-right: 0.3rem;"></i> Remote-friendly
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
