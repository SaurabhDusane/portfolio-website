import streamlit as st

st.set_page_config(
    page_title="Writing - Saurabh Dusane",
    page_icon="✍️",
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
        background-color: #F9FAFB;
    }
    
    .page-header-writing {
        background: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%);
        padding: 5rem 2rem;
        border-radius: 0 0 3rem 3rem;
        margin-bottom: 3rem;
        box-shadow: 0 20px 50px rgba(168, 85, 247, 0.3);
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .page-header-writing::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
    }
    
    .header-icon {
        width: 120px;
        height: 120px;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
        font-size: 3.5rem;
        color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .page-title-writing {
        font-size: 4.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 2rem;
        text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        position: relative;
        letter-spacing: -1px;
    }
    
    @media (max-width: 1024px) {
        .page-title-writing {
            font-size: 3.5rem;
        }
    }
    
    @media (max-width: 768px) {
        .page-title-writing {
            font-size: 2.75rem;
        }
    }
    
    @media (max-width: 640px) {
        .page-title-writing {
            font-size: 2.25rem;
        }
    }
    
    .page-subtitle-writing {
        font-size: 1.5rem;
        font-weight: 400;
        color: white;
        margin-bottom: 2.5rem;
        line-height: 1.9;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
    }
    
    @media (max-width: 1024px) {
        .page-subtitle-writing {
            font-size: 1.35rem;
        }
    }
    
    @media (max-width: 768px) {
        .page-subtitle-writing {
            font-size: 1.15rem;
        }
    }
    
    @media (max-width: 640px) {
        .page-subtitle-writing {
            font-size: 1rem;
        }
    }
    
    .medium-link-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: white;
        color: #6366f1;
        padding: 1.25rem 2.5rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    }
    
    .medium-link-btn:hover {
        background: #eef2ff;
        transform: scale(1.05);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
    }
    
    .category-filter {
        display: inline-block;
        padding: 0.75rem 1.75rem;
        margin: 0.5rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    .category-filter:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }
    
    .filter-active-all {
        background: #1f2937;
        color: white;
        box-shadow: 0 6px 20px rgba(31, 41, 55, 0.4);
    }
    
    .filter-active-technical {
        background: #6366f1;
        color: white;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }
    
    .filter-active-poetry {
        background: #a855f7;
        color: white;
        box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
    }
    
    .filter-active-topical {
        background: #f97316;
        color: white;
        box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
    }
    
    .filter-inactive {
        background: white;
        color: #374151;
    }
    
    .filter-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
        padding: 0 1rem;
    }
    
    @media (max-width: 640px) {
        .filter-container {
            overflow-x: auto;
            flex-wrap: nowrap;
            justify-content: flex-start;
            padding: 0 1rem 1rem;
        }
    }
    
    .featured-badge {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        padding: 0.5rem 1.25rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        display: inline-block;
    }
    
    .featured-article {
        background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
        border-radius: 24px;
        padding: 3rem;
        margin-bottom: 4rem;
        box-shadow: 0 20px 60px rgba(168, 85, 247, 0.35);
        transition: all 0.3s ease;
        color: white;
    }
    
    .featured-article:hover {
        transform: translateY(-6px);
        box-shadow: 0 35px 90px rgba(168, 85, 247, 0.5);
    }
    
    @media (max-width: 768px) {
        .featured-article {
            padding: 2rem;
        }
    }
    
    @media (max-width: 640px) {
        .featured-article {
            padding: 1.5rem;
        }
    }
    
    .featured-title {
        font-size: 2.75rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: white;
        letter-spacing: -0.5px;
        line-height: 1.3;
    }
    
    @media (max-width: 1024px) {
        .featured-title {
            font-size: 2.25rem;
        }
    }
    
    @media (max-width: 768px) {
        .featured-title {
            font-size: 1.85rem;
        }
    }
    
    @media (max-width: 640px) {
        .featured-title {
            font-size: 1.5rem;
        }
    }
    
    .featured-excerpt {
        font-size: 1.35rem;
        color: rgba(255, 255, 255, 0.98);
        line-height: 1.85;
        margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
        .featured-excerpt {
            font-size: 1.15rem;
        }
    }
    
    @media (max-width: 640px) {
        .featured-excerpt {
            font-size: 1rem;
        }
    }
    
    .article-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .article-card:hover {
        transform: translateY(-8px) scale(1.01);
        box-shadow: 0 24px 50px rgba(0, 0, 0, 0.18);
    }
    
    .article-color-bar {
        height: 10px;
    }
    
    .color-bar-indigo {
        background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    }
    
    .color-bar-purple {
        background: linear-gradient(90deg, #a855f7 0%, #9333ea 100%);
    }
    
    .color-bar-orange {
        background: linear-gradient(90deg, #f97316 0%, #ea580c 100%);
    }
    
    .article-content {
        padding: 2rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    
    .category-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }
    
    .badge-indigo {
        background: #eef2ff;
        color: #4f46e5;
    }
    
    .badge-purple {
        background: #faf5ff;
        color: #9333ea;
    }
    
    .badge-orange {
        background: #fff7ed;
        color: #ea580c;
    }
    
    .article-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.3s ease;
    }
    
    .article-title-indigo:hover {
        color: #6366f1;
    }
    
    .article-title-purple:hover {
        color: #a855f7;
    }
    
    .article-title-orange:hover {
        color: #f97316;
    }
    
    .article-excerpt {
        font-size: 0.95rem;
        color: #6b7280;
        line-height: 1.75;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
    }
    
    .article-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        color: #9ca3af;
        margin-bottom: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #f3f4f6;
    }
    
    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
    
    .read-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .read-link-indigo {
        color: #6366f1;
    }
    
    .read-link-purple {
        color: #a855f7;
    }
    
    .read-link-orange {
        color: #f97316;
    }
    
    .read-link:hover {
        gap: 0.75rem;
    }
    
    .section-title {
        font-size: 2.25rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 2.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    @media (max-width: 768px) {
        .section-title {
            font-size: 1.875rem;
        }
    }
    
    @media (max-width: 640px) {
        .section-title {
            font-size: 1.5rem;
        }
    }
    
    .cta-section {
        text-align: center;
        margin: 4rem 0 3rem;
    }
    
    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
        color: white;
        padding: 1.5rem 3rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.15rem;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 12px 35px rgba(168, 85, 247, 0.35);
    }
    
    .cta-button:hover {
        background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
        transform: scale(1.05);
        box-shadow: 0 18px 50px rgba(168, 85, 247, 0.6);
    }
    
    @media (max-width: 640px) {
        .cta-button {
            padding: 1.25rem 2rem;
            font-size: 1rem;
        }
    }
    
    .nav-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin: 3rem 0;
    }
    
    @media (max-width: 768px) {
        .nav-buttons {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }
    
    .nav-btn {
        text-align: center;
        padding: 1.25rem 2rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.05rem;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .nav-btn:hover {
        transform: scale(1.02);
    }
    
    .nav-btn-home {
        background: white;
        color: #6366f1;
        border: 2px solid #6366f1;
    }
    
    .nav-btn-home:hover {
        background: #eef2ff;
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.25);
    }
    
    .nav-btn-projects {
        background: #a855f7;
        color: white;
        border: 2px solid #a855f7;
    }
    
    .nav-btn-projects:hover {
        background: #9333ea;
        border-color: #9333ea;
        box-shadow: 0 8px 25px rgba(168, 85, 247, 0.35);
    }
    
    .nav-btn-contact {
        background: #14b8a6;
        color: white;
        border: 2px solid #14b8a6;
    }
    
    .nav-btn-contact:hover {
        background: #0d9488;
        border-color: #0d9488;
        box-shadow: 0 8px 25px rgba(20, 184, 166, 0.35);
    }
    
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    @media (max-width: 1024px) {
        .grid-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    @media (max-width: 768px) {
        .grid-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }
    
    .stButton > button {
        width: 100%;
    }
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

# Article data
articles = [
    {
        "id": 1,
        "title": "The Role of Artificial Intelligence in Top-Level Business Decision-Making: Necessity...",
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
        "title": "Exploring the Spectrum of Morality: Its Significance and Evolution in Modern Society",
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
        "title": "Religion-Culture: Navigating the Dynamic Dichotomy between the United States and India",
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
        "title": "Evolution of History through our Time: A Dissonant Perspective on Global Multiculturalism",
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

# Header Section
st.markdown("""
<div class="page-header-writing">
    <div class="header-icon">
        <i class="fas fa-pen-fancy"></i>
    </div>
    <h1 class="page-title-writing">Writing & Essays</h1>
    <p class="page-subtitle-writing">
        Exploring AI, philosophy, morality, and the human experience through thoughtful writing
    </p>
    <a href="https://medium.com/@saurndusane13" target="_blank" rel="noopener noreferrer" class="medium-link-btn">
        <i class="fas fa-external-link-alt"></i>
        Visit My Medium Blog
    </a>
</div>
""", unsafe_allow_html=True)

# Category filter
st.markdown("<br>", unsafe_allow_html=True)

categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"]

# Create filter buttons
col_filter = st.container()
with col_filter:
    st.markdown('<div style="text-align: center;">', unsafe_allow_html=True)
    
    cols = st.columns(len(categories))
    
    if 'active_category' not in st.session_state:
        st.session_state.active_category = "All Posts"
    
    for idx, category in enumerate(categories):
        with cols[idx]:
            if category == "All Posts":
                active_class = "filter-active-all" if st.session_state.active_category == category else "filter-inactive"
            elif category == "Technical Essay":
                active_class = "filter-active-technical" if st.session_state.active_category == category else "filter-inactive"
            elif category == "Poetry & Creative":
                active_class = "filter-active-poetry" if st.session_state.active_category == category else "filter-inactive"
            else:
                active_class = "filter-active-topical" if st.session_state.active_category == category else "filter-inactive"
            
            if st.button(category, key=f"filter_{category}", use_container_width=True):
                st.session_state.active_category = category
                st.rerun()
    
    st.markdown('</div>', unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

# Filter articles
if st.session_state.active_category == "All Posts":
    filtered_articles = articles
else:
    filtered_articles = [a for a in articles if a["category"] == st.session_state.active_category]

# Featured Article Section
featured_article = next((a for a in articles if a.get("featured")), None)

if featured_article and st.session_state.active_category == "All Posts":
    st.markdown("""
    <h2 class="section-title">
        <span style="color: #fbbf24; margin-right: 0.75rem;">⭐</span>
        Featured Article
    </h2>
    """, unsafe_allow_html=True)
    
    st.markdown(f"""
    <a href="{featured_article['url']}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <div class="featured-article">
            <div style="margin-bottom: 1.5rem;">
                <span class="featured-badge">Featured</span>
                <span class="featured-badge" style="margin-left: 0.75rem;">{featured_article['category']}</span>
            </div>
            <h3 class="featured-title">{featured_article['title']}</h3>
            <p class="featured-excerpt">{featured_article['excerpt']}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; font-size: 0.95rem;">
                <span style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-calendar"></i>
                    {featured_article['date']}
                </span>
                <span style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-clock"></i>
                    {featured_article['readTime']} min read
                </span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 1.1rem;">
                Read on Medium <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
    </a>
    """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)

# Articles Grid Section
section_title = "All Articles" if st.session_state.active_category == "All Posts" else st.session_state.active_category
st.markdown(f'<h2 class="section-title">{section_title}</h2>', unsafe_allow_html=True)

# Create article cards
cols_per_row = 3
for i in range(0, len(filtered_articles), cols_per_row):
    cols = st.columns(cols_per_row)
    for j in range(cols_per_row):
        if i + j < len(filtered_articles):
            article = filtered_articles[i + j]
            color = article['categoryColor']
            
            with cols[j]:
                st.markdown(f"""
                <div class="article-card">
                    <div class="article-color-bar color-bar-{color}"></div>
                    <div class="article-content">
                        <span class="category-badge badge-{color}">{article['category']}</span>
                        <h3 class="article-title article-title-{color}">{article['title']}</h3>
                        <p class="article-excerpt">{article['excerpt']}</p>
                        <div class="article-meta">
                            <span class="meta-item">
                                <i class="fas fa-calendar"></i>
                                {article['date']}
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-clock"></i>
                                {article['readTime']} min
                            </span>
                        </div>
                        <a href="{article['url']}" target="_blank" rel="noopener noreferrer" class="read-link read-link-{color}">
                            Read on Medium <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                """, unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

# CTA Section
st.markdown("""
<div class="cta-section">
    <a href="https://medium.com/@saurndusane13" target="_blank" rel="noopener noreferrer" class="cta-button">
        View All Articles on Medium <i class="fas fa-external-link-alt"></i>
    </a>
</div>
""", unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# Bottom Navigation
col1, col2, col3 = st.columns(3)

with col1:
    if st.button("🏠 Back to Home", use_container_width=True, key="nav_home"):
        st.switch_page("Home.py")

with col2:
    if st.button("📁 View Projects", use_container_width=True, key="nav_projects"):
        st.switch_page("pages/2_Projects.py")

with col3:
    if st.button("💬 Contact Me", use_container_width=True, key="nav_contact"):
        st.switch_page("pages/3_Contact.py")

st.markdown("<br>", unsafe_allow_html=True)
