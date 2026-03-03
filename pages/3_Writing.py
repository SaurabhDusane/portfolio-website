import streamlit as st

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
        margin-bottom: 0.5rem;
    }
    .page-title i { color: #a5b4fc; font-size: 1.5rem; }
    .page-subtitle {
        color: #94a3b8;
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
        transform: translateY(-8px);
        background: rgba(255,255,255,0.09);
        border-color: rgba(245,158,11,0.25);
        box-shadow: 0 25px 50px rgba(245,158,11,0.12);
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
        color: #94a3b8;
        font-size: 0.95rem;
        line-height: 1.7;
        margin-bottom: 1.25rem;
    }
    .featured-meta {
        display: flex;
        gap: 1.5rem;
        font-size: 0.82rem;
        color: #64748b;
        font-weight: 500;
    }
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
        transform: translateY(-8px);
        background: rgba(255,255,255,0.07);
        border-color: rgba(139,92,246,0.25);
        box-shadow: 0 20px 40px rgba(139,92,246,0.15);
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
        color: #64748b;
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
        color: #475569;
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
        padding: 0.85rem 2.5rem;
        font-weight: 700;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        box-shadow: 0 8px 24px rgba(99,102,241,0.3);
        width: 100%;
    }
    .stButton > button:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(99,102,241,0.45);
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

articles = [
    {
        "id": 1,
        "title": "The Role of AI in Top-Level Business Decision-Making",
        "excerpt": "Exploring how AI is transforming strategic business decisions at the executive level and why it's becoming essential for modern enterprises.",
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
        "excerpt": "A poetic exploration of communication, fear, and human connection.",
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
        "excerpt": "A philosophical examination of moral frameworks and their evolution in contemporary times.",
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
        "excerpt": "Understanding the role of conscience in guiding human behavior and ethical decision-making.",
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
        "excerpt": "Exploring the tension between rational thinking and practical action in philosophy and daily life.",
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
        "excerpt": "A comparative analysis of how religion and culture intersect differently in American and Indian societies.",
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
        "excerpt": "Examining the threat of AI-generated deepfakes and their implications for society and truth.",
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
        "excerpt": "Bridging the gap between theoretical reasoning and real-world application.",
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
        "excerpt": "Analyzing how historical narratives evolve and shape our understanding of multiculturalism.",
        "category": "Topical Essay",
        "categoryColor": "orange",
        "url": "https://medium.com/@saurndusane13/evolution-of-history",
        "date": "Oct 15, 2023",
        "readTime": 10,
        "featured": False
    }
]

load_css()

# --- HEADER ---
st.markdown("""
<div class="page-header">
    <div class="page-title"><i class="fas fa-pen-nib"></i> Writing & Essays</div>
    <p class="page-subtitle">Exploring AI, philosophy, morality, and the human experience</p>
    <a href="https://medium.com/@saurndusane13" target="_blank" rel="noopener noreferrer" class="medium-btn">
        <i class="fab fa-medium"></i> Visit Medium Blog
    </a>
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
                card_html = (
                    f'<div class="article-card" style="animation-delay: {delay}s;">'
                    f'<span class="article-badge badge-{color}">{article["category"]}</span>'
                    f'<div class="article-title">{article["title"]}</div>'
                    f'<div class="article-excerpt">{article["excerpt"]}</div>'
                    f'<div class="article-meta">'
                    f'<span><i class="far fa-calendar" style="margin-right: 0.2rem;"></i> {article["date"]}</span>'
                    f'<span><i class="far fa-clock" style="margin-right: 0.2rem;"></i> {article["readTime"]} min</span>'
                    f'</div>'
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
