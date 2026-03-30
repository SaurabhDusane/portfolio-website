import streamlit as st
import random

st.set_page_config(
    page_title="Saurabh Dusane - Writing",
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
    @keyframes skillFill {
        from { width: 0; }
        to { width: var(--skill-pct, 80%); }
    }
    @keyframes countPop {
        0% { opacity: 0; transform: scale(0.5); }
        60% { transform: scale(1.15); }
        100% { opacity: 1; transform: scale(1); }
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
    @keyframes pulseScale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
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
        margin-bottom: 0.5rem;
    }
    .page-title i { color: #a5b4fc; font-size: 1.5rem; animation: iconFloat 3s ease-in-out infinite; }
    .page-subtitle {
        color: #e2e8f0;
        font-size: 0.95rem;
        max-width: 600px;
        margin: 0 auto 1.5rem;
    }

    .medium-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 0.6rem 1.25rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 6px 16px rgba(99,102,241,0.3);
    }
    .medium-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 24px rgba(99,102,241,0.5);
    }

    .featured-card {
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 24px;
        padding: 2.5rem;
        max-width: 900px;
        margin: 0 auto 2rem;
        transition: all 0.4s ease;
        text-decoration: none;
        display: block;
        animation: fadeInUp 0.8s ease-out 0.2s both;
        position: relative;
        overflow: hidden;
    }
    .featured-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
        background-size: 200% auto;
        animation: shimmer 3s linear infinite;
    }
    .featured-card:hover {
        transform: translateY(-8px) scale(1.01);
        background: rgba(255,255,255,0.09);
        border-color: rgba(245,158,11,0.25);
        box-shadow: 0 25px 50px rgba(245,158,11,0.12);
    }
    .featured-card::after {
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
    .featured-card:hover::after {
        animation: cardShine 0.8s ease-out;
    }
    .featured-card:hover .featured-title {
        background: linear-gradient(135deg, #fde68a, #fbbf24);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .featured-card .featured-label {
        transition: all 0.3s ease;
    }
    .featured-card:hover .featured-label {
        background: rgba(245,158,11,0.25);
        transform: translateY(-2px);
    }
    .featured-label {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(245,158,11,0.15);
        color: #fbbf24;
        padding: 0.3rem 0.85rem;
        border-radius: 50px;
        font-size: 0.72rem;
        font-weight: 700;
        margin-bottom: 1rem;
        border: 1px solid rgba(245,158,11,0.3);
    }
    .featured-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #e2e8f0;
        margin-bottom: 0.75rem;
        line-height: 1.3;
    }
    .featured-excerpt {
        color: #e2e8f0;
        font-size: 0.95rem;
        line-height: 1.7;
        margin-bottom: 1.25rem;
    }
    .featured-meta {
        display: flex;
        gap: 1.5rem;
        font-size: 0.82rem;
        color: #e2e8f0;
        font-weight: 500;
    }
    .featured-meta i { color: #a5b4fc; }
    .featured-meta span {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .section-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #e2e8f0;
        text-align: center;
        max-width: 900px;
        margin: 0 auto 1.5rem;
        animation: fadeInUp 0.8s ease-out 0.3s both;
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
        height: 100%;
        position: relative;
        overflow: hidden;
        animation: fadeInUp 0.7s ease-out both;
    }
    .article-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
        opacity: 0;
        transition: opacity 0.35s ease;
    }
    .article-card:hover::before {
        opacity: 1;
    }
    .article-card:hover {
        transform: translateY(-8px) rotateX(2deg) scale(1.02);
        background: rgba(255,255,255,0.07);
        border-color: rgba(139,92,246,0.25);
        box-shadow: 0 20px 40px rgba(139,92,246,0.15);
    }
    .article-card::after {
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
    .article-card:hover::after {
        animation: cardShine 0.8s ease-out;
    }
    .article-card:hover .article-title {
        background: linear-gradient(135deg, #c4b5fd, #f9a8d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .article-card:hover .article-excerpt {
        color: #e2e8f0;
    }
    .article-card {
        perspective: 600px;
    }
    .article-card .article-badge {
        transition: all 0.3s ease;
    }
    .article-card:hover .article-badge {
        transform: translateY(-2px);
        filter: brightness(1.2);
    }
    .article-card .read-link {
        transition: all 0.3s ease;
    }
    .article-card:hover .read-link {
        gap: 0.7rem;
        filter: brightness(1.2);
    }
    .article-badge {
        display: inline-block;
        padding: 0.3rem 0.75rem;
        border-radius: 50px;
        font-size: 0.68rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        border: 1px solid;
    }
    .badge-indigo { background: rgba(99,102,241,0.15); color: #a5b4fc; border-color: rgba(99,102,241,0.3); }
    .badge-purple { background: rgba(168,85,247,0.15); color: #c4b5fd; border-color: rgba(168,85,247,0.3); }
    .badge-orange { background: rgba(249,115,22,0.15); color: #fb923c; border-color: rgba(249,115,22,0.3); }

    .article-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .article-excerpt {
        font-size: 0.85rem;
        color: #e2e8f0;
        line-height: 1.6;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .article-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.72rem;
        color: #e2e8f0;
        padding-top: 0.75rem;
        border-top: 1px solid rgba(255,255,255,0.06);
        margin-bottom: 0.75rem;
    }
    .read-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.82rem;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .read-link-indigo { color: #a5b4fc; }
    .read-link-purple { color: #c4b5fd; }
    .read-link-orange { color: #fb923c; }
    .read-link:hover { gap: 0.7rem; }

    .stButton > button {
        background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
        color: white !important;
        border: none !important;
        border-radius: 14px;
        padding: 0.75rem 1rem;
        font-weight: 700;
        font-size: 0.82rem;
        transition: all 0.3s ease;
        box-shadow: 0 8px 24px rgba(99,102,241,0.3);
        width: 100%;
        white-space: nowrap;
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

    /* Reading Stats */
    .reading-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        max-width: 900px;
        margin: 0 auto 2rem;
        animation: fadeInUp 0.7s ease-out 0.15s both;
    }
    .reading-stat-card {
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px;
        padding: 1.25rem;
        text-align: center;
        transition: all 0.35s ease;
    }
    .reading-stat-card:hover {
        background: rgba(255,255,255,0.07);
        transform: translateY(-6px) scale(1.02);
        border-color: rgba(139,92,246,0.2);
        box-shadow: 0 12px 30px rgba(139,92,246,0.1);
    }
    .reading-stat-card:hover .reading-stat-number {
        animation: pulseScale 0.4s ease-out;
    }
    .reading-stat-number {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #a5b4fc, #c4b5fd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: countPop 0.6s ease-out both;
    }
    .reading-stat-card:nth-child(1) .reading-stat-number { animation-delay: 0.3s; }
    .reading-stat-card:nth-child(2) .reading-stat-number { animation-delay: 0.5s; }
    .reading-stat-card:nth-child(3) .reading-stat-number { animation-delay: 0.7s; }
    .reading-stat-label {
        font-size: 0.75rem;
        color: #e2e8f0;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-top: 0.25rem;
    }

    /* Read time bar */
    .read-time-bar {
        width: 100%;
        height: 3px;
        background: rgba(255,255,255,0.06);
        border-radius: 2px;
        margin-top: 0.5rem;
        overflow: hidden;
    }
    .read-time-fill {
        height: 100%;
        border-radius: 2px;
        animation: skillFill 1.2s ease-out both;
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

articles = [
    {
        "id": 1,
        "title": "The Role of AI in Top-Level Business Decision-Making",
        "excerpt": "A deep dive into why C-suite leaders are adopting AI for strategic advantage&mdash;and the decision frameworks that separate hype from real ROI.",
        "category": "Technical Essay",
        "categoryColor": "indigo",
        "url": "https://medium.com/@saurndusane13/the-role-of-artificial-intelligence-in-top-level-business-decision-making",
        "date": "Sep 18, 2024",
        "readTime": 7,
        "featured": True
    },
    {
        "id": 2,
        "title": "Request Through Fear vs...",
        "excerpt": "An introspective piece on how fear shapes the way we ask, receive, and connect with others.",
        "category": "Poetry & Creative",
        "categoryColor": "purple",
        "url": "https://medium.com/@saurndusane13/request-through-fear",
        "date": "Jun 19, 2025",
        "readTime": 3,
        "featured": False
    },
    {
        "id": 3,
        "title": "Exploring the Spectrum of Morality",
        "excerpt": "Dissecting modern ethical frameworks through the lens of technology, cognitive bias, and evolving societal norms.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/exploring-the-spectrum-of-morality",
        "date": "Oct 4, 2024",
        "readTime": 9,
        "featured": False
    },
    {
        "id": 4,
        "title": "Conscience: The Moral Compass of Humanity",
        "excerpt": "How does conscience operate as an internal algorithm? A look at the intersection of moral philosophy and behavioral science.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/conscience-the-moral-compass",
        "date": "May 25, 2024",
        "readTime": 8,
        "featured": False
    },
    {
        "id": 5,
        "title": "The Unshakable Paradox: Rationality, Practicality, and Beyond",
        "excerpt": "Why the smartest strategy isn't always the most logical one&mdash;navigating the paradox of rationality in high-stakes decisions.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/the-unshakable-paradox",
        "date": "May 15, 2024",
        "readTime": 7,
        "featured": False
    },
    {
        "id": 6,
        "title": "Religion-Culture: US and India",
        "excerpt": "A data-informed comparative analysis of how cultural identity and religious structures shape societal decision-making across two democracies.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/religion-culture-navigating",
        "date": "Nov 7, 2024",
        "readTime": 9,
        "featured": False
    },
    {
        "id": 7,
        "title": "The New Global Pandemic: DeepFakes",
        "excerpt": "The technical anatomy of deepfakes, their societal threat vectors, and why AI-powered detection is the next critical infrastructure challenge.",
        "category": "Technical Essay",
        "categoryColor": "indigo",
        "url": "https://medium.com/@saurndusane13/the-new-global-pandemic-deepfakes",
        "date": "Nov 17, 2023",
        "readTime": 7,
        "featured": False
    },
    {
        "id": 8,
        "title": "Rationality vs Practicality: A Modern Approach",
        "excerpt": "A practical framework for when to think and when to act&mdash;lessons from engineering, philosophy, and startup culture.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/rationality-vs-practicality",
        "date": "Nov 1, 2023",
        "readTime": 6,
        "featured": False
    },
    {
        "id": 9,
        "title": "Evolution of History: A Dissonant Perspective on Multiculturalism",
        "excerpt": "How dominant historical narratives are constructed, challenged, and reshaped&mdash;and what that means for multicultural discourse today.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/evolution-of-history",
        "date": "Oct 15, 2023",
        "readTime": 10,
        "featured": False
    }
]

load_css()

# --- AURORA MESH ---
aurora_blobs = [
    {"color": "rgba(99,102,241,0.10)", "w": 400, "h": 400, "top": "5%", "left": "0%", "dur": 20},
    {"color": "rgba(168,85,247,0.08)", "w": 350, "h": 350, "top": "50%", "left": "60%", "dur": 24},
    {"color": "rgba(236,72,153,0.06)", "w": 280, "h": 280, "top": "70%", "left": "20%", "dur": 22},
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
    <div class="page-title"><i class="fas fa-pen-nib"></i> Writing & Essays</div>
    <p class="page-subtitle">Where technical depth meets intellectual curiosity &mdash; essays on AI strategy, ethics, and the human condition</p>
    <a href="https://medium.com/@saurndusane13" target="_blank" rel="noopener noreferrer" class="medium-btn">
        <i class="fab fa-medium"></i> Visit Medium Blog
    </a>
</div>
""", unsafe_allow_html=True)

# --- READING STATS ---
total_articles = len(articles)
total_read_time = sum(a["readTime"] for a in articles)
unique_categories = len(set(a["category"] for a in articles))

st.markdown(f"""
<div class="reading-stats">
    <div class="reading-stat-card">
        <div class="reading-stat-number">{total_articles}</div>
        <div class="reading-stat-label">Published Articles</div>
    </div>
    <div class="reading-stat-card">
        <div class="reading-stat-number">{total_read_time}</div>
        <div class="reading-stat-label">Minutes of Reading</div>
    </div>
    <div class="reading-stat-card">
        <div class="reading-stat-number">{unique_categories}</div>
        <div class="reading-stat-label">Categories</div>
    </div>
</div>
""", unsafe_allow_html=True)

# --- CATEGORY FILTER ---
categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"]

if 'active_category' not in st.session_state:
    st.session_state.active_category = "All Posts"

active_idx = categories.index(st.session_state.active_category)
st.markdown(f'<style>[data-testid="stHorizontalBlock"]:first-of-type [data-testid="column"]:nth-child({active_idx + 1}) .stButton > button {{ background: linear-gradient(135deg, #a855f7, #ec4899) !important; box-shadow: 0 8px 24px rgba(168,85,247,0.4) !important; }}</style>', unsafe_allow_html=True)

cols = st.columns(len(categories))
for idx, category in enumerate(categories):
    with cols[idx]:
        if st.button(category, key=f"filter_{category}", use_container_width=True):
            st.session_state.active_category = category
            st.rerun()

st.markdown("<div style='height: 1.5rem;'></div>", unsafe_allow_html=True)

# --- FILTER ---
if st.session_state.active_category == "All Posts":
    filtered_articles = articles
else:
    filtered_articles = [a for a in articles if a["category"] == st.session_state.active_category]

# --- FEATURED ---
featured_article = next((a for a in articles if a.get("featured")), None)

if featured_article and st.session_state.active_category == "All Posts":
    featured_html = (
        f'<div><a href="{featured_article["url"]}" target="_blank" rel="noopener noreferrer" class="featured-card">'
        f'<div class="featured-label"><i class="fas fa-star"></i> Featured</div>'
        f'<div class="featured-title">{featured_article["title"]}</div>'
        f'<div class="featured-excerpt">{featured_article["excerpt"]}</div>'
        f'<div class="featured-meta">'
        f'<span><i class="far fa-calendar"></i> {featured_article["date"]}</span>'
        f'<span><i class="far fa-clock"></i> {featured_article["readTime"]} min read</span>'
        f'<span><i class="fas fa-external-link-alt"></i> Read on Medium</span>'
        f'</div></a></div>'
    )
    st.markdown(featured_html, unsafe_allow_html=True)

# --- ARTICLES GRID ---
section_title = "All Articles" if st.session_state.active_category == "All Posts" else st.session_state.active_category
st.markdown(f'<div class="section-heading">{section_title}</div>', unsafe_allow_html=True)

cols_per_row = 3
for i in range(0, len(filtered_articles), cols_per_row):
    cols = st.columns(cols_per_row)
    for j in range(cols_per_row):
        if i + j < len(filtered_articles):
            article = filtered_articles[i + j]
            color = article['categoryColor']
            with cols[j]:
                delay = (i + j) * 0.08
                max_read = max(a["readTime"] for a in articles)
                read_pct = min(int((article["readTime"] / max_read) * 100), 100)
                bar_colors = {"indigo": "#6366f1", "purple": "#a855f7", "orange": "#f59e0b"}
                bar_color = bar_colors.get(color, "#6366f1")
                card_html = (
                    f'<div class="article-card" style="animation-delay: {delay}s;">'
                    f'<span class="article-badge badge-{color}">{article["category"]}</span>'
                    f'<div class="article-title">{article["title"]}</div>'
                    f'<div class="article-excerpt">{article["excerpt"]}</div>'
                    f'<div class="article-meta">'
                    f'<span><i class="far fa-calendar" style="margin-right: 0.2rem;"></i> {article["date"]}</span>'
                    f'<span><i class="far fa-clock" style="margin-right: 0.2rem;"></i> {article["readTime"]} min</span>'
                    f'</div>'
                    f'<div class="read-time-bar"><div class="read-time-fill" style="--skill-pct:{read_pct}%;background:{bar_color};animation-delay:{delay + 0.3}s;"></div></div>'
                    f'<a href="{article["url"]}" target="_blank" rel="noopener noreferrer" class="read-link read-link-{color}">'
                    f'Read on Medium <i class="fas fa-arrow-right"></i></a>'
                    f'</div>'
                )
                st.markdown(card_html, unsafe_allow_html=True)

st.markdown("<div style='height: 2rem;'></div>", unsafe_allow_html=True)

# --- NAV ---
col1, col2, col3 = st.columns(3)
with col1:
    if st.button("Back to Home", use_container_width=True, key="nav_home"):
        st.switch_page("Home.py")
with col2:
    if st.button("View Projects", use_container_width=True, key="nav_projects"):
        st.switch_page("pages/2_Projects.py")
with col3:
    if st.button("Contact Me", use_container_width=True, key="nav_contact"):
        st.switch_page("pages/4_Contact.py")
