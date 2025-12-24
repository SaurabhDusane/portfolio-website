# 🎨 Quick Customization Guide

This guide helps you quickly personalize your portfolio website.

## 🚀 Essential Customizations (Do These First!)

### 1. Replace "Your Name" Throughout

**In `Home.py`:**
- Line 112: Change `<div class="hero-title">Your Name</div>`
- Line 113: Update tagline/title
- Line 243: Update footer name

**In `pages/1_Bio.py`:**
- Line 155: Change `<h2>Hello! I'm Your Name 👋</h2>`

### 2. Update Contact Information

**In `pages/3_Contact.py`:**
```html
Line 129: your.email@example.com (change to your real email)
Line 137: @yourusername (your GitHub username)
Line 145: Your Name (your LinkedIn profile)
Line 153: @yourusername (your Twitter handle)
```

### 3. Add Your Projects

Edit `data/projects.json`:
- Remove sample projects
- Add your own projects
- Update tech stacks to match what you actually used
- Add real GitHub and demo links

### 4. Write Your Bio

**In `pages/1_Bio.py` (around line 157-169):**
Replace the sample bio text with your own story:
- Who you are
- What you're passionate about
- Your goals and interests
- What makes you unique

### 5. Update Education & Skills

**In `pages/1_Bio.py`:**
- Lines 187-197: Update your university, GPA, coursework
- Lines 206-238: Modify skill tags to match your actual skills

## 📸 Adding Images

### Profile Picture
1. Get a professional photo (500x500px recommended)
2. Save it as `assets/profile.jpg`
3. Supported formats: JPG, PNG, WEBP

### Resume
1. Export your resume as PDF
2. Save it as `assets/resume.pdf`
3. It will appear as a download button on Bio page

### Project Screenshots
1. Take screenshots of your projects (800x600px recommended)
2. Save them in `assets/` folder
3. Name them clearly: `ecommerce_app.jpg`, `weather_dashboard.png`, etc.
4. Reference them in `projects.json` under `"image"` field

## 🎨 Color Customization

### Changing the Accent Color

Edit `.streamlit/config.toml`:
```toml
primaryColor="#667eea"  # Change this hex code to your preferred color
```

**Popular alternatives:**
- Blue: `#3B82F6`
- Green: `#10B981`
- Orange: `#F59E0B`
- Pink: `#EC4899`
- Red: `#EF4444`

### Full Color Scheme

```toml
[theme]
primaryColor="#667eea"        # Buttons, links, accents
backgroundColor="#F8F9FA"     # Page background (keep light)
secondaryBackgroundColor="#FFFFFF"  # Cards and containers
textColor="#1F2937"          # Main text color
```

## 📝 Content Templates

### Project Description Template
```
[Action verb] [what it does] [key feature]. [Technical highlight]. [Impact/benefit].

Example:
"Built a full-stack e-commerce platform with real-time inventory management. 
Implemented secure payment processing using Stripe API. Reduced checkout time by 40%."
```

### Bio Writing Tips
```
Paragraph 1: Who you are, current status (student/developer)
Paragraph 2: What drives you, your interests, your approach
Paragraph 3: What you do outside coding, how you contribute to community
```

## 🔗 Social Links Format

### GitHub
`https://github.com/yourusername`

### LinkedIn
`https://linkedin.com/in/yourprofilename`

### Twitter
`https://twitter.com/yourusername`

### Portfolio Website (if you have another)
`https://yourwebsite.com`

## ✅ Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Replaced all "Your Name" placeholders
- [ ] Updated email and social links
- [ ] Added real project data to `projects.json`
- [ ] Written your own bio text
- [ ] Updated education and skills
- [ ] Added profile picture (or confirmed placeholder looks okay)
- [ ] Added resume PDF (optional)
- [ ] Tested locally with `streamlit run Home.py`
- [ ] Proofread all text for typos
- [ ] Verified all external links work

## 🎯 Advanced Customizations

### Adding a New Section to Bio Page

After line 238 in `pages/1_Bio.py`, add:
```python
st.markdown('<div class="section-title">🏆 Achievements</div>', unsafe_allow_html=True)

st.markdown("""
<div class="bio-card">
    <div class="education-item">
        <div class="education-title">Achievement Title</div>
        <div class="education-subtitle">Description and date</div>
    </div>
</div>
""", unsafe_allow_html=True)
```

### Customizing Font

In any page's `load_css()` function, change the Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}
```

Popular fonts: Inter, Poppins, Roboto, Open Sans, Montserrat

### Adding Icons to Skills

Change skill tags to include emojis:
```html
<span class="skill-tag">🐍 Python</span>
<span class="skill-tag">⚛️ React</span>
<span class="skill-tag">🟢 Node.js</span>
```

## 🐛 Common Issues

**Issue**: Profile image not showing
- **Fix**: Make sure image is named exactly `profile.jpg` in `assets/` folder

**Issue**: Projects not displaying
- **Fix**: Check `projects.json` for valid JSON syntax (use a JSON validator)

**Issue**: Styling looks different
- **Fix**: Clear browser cache or use incognito mode

**Issue**: Page navigation not working
- **Fix**: Ensure all page files are in `pages/` folder and start with number (e.g., `1_Bio.py`)

## 💡 Tips for Best Results

1. **Images**: Use consistent image sizes for professional look
2. **Text Length**: Keep descriptions concise (2-3 sentences max)
3. **Skills**: Only list skills you're confident in
4. **Projects**: Quality over quantity (4-6 strong projects better than 10 weak ones)
5. **Links**: Test all links before deploying
6. **Mobile**: Preview on phone to ensure responsive design works

## 📞 Need More Help?

- Check `README.md` for detailed documentation
- Streamlit docs: [docs.streamlit.io](https://docs.streamlit.io)
- Test locally before deploying: `streamlit run Home.py`

---

**Remember**: Your portfolio represents you. Take time to make it authentic and professional! 🚀
