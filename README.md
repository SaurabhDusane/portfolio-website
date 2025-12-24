# 🎨 Modern Student Portfolio Website

A beautiful, responsive portfolio website built with **Streamlit** and designed for easy deployment on **Streamlit Community Cloud**. Perfect for students and developers to showcase their projects, skills, and experience.

## ✨ Features

- 🎯 **Modern Light Theme** - Clean, professional design with soft colors and smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop devices
- 🚀 **Multi-Page Navigation** - Organized pages for Home, Bio, Projects, and Contact
- 🎨 **Easy Customization** - Update your content by editing simple JSON files and text
- 💼 **Dynamic Projects** - Display projects from a JSON file with images, tech stacks, and links
- 📄 **Resume Download** - Option to add downloadable PDF resume
- 🌐 **Free Deployment** - Deploy for free on Streamlit Community Cloud

## 📁 Project Structure

```
portfolio_sd/
├── Home.py                 # Main landing page
├── pages/
│   ├── 1_Bio.py           # Biography and skills page
│   ├── 2_Projects.py      # Projects showcase page
│   └── 3_Contact.py       # Contact information page
├── data/
│   └── projects.json      # Your projects data
├── assets/
│   ├── profile.jpg        # Your profile picture (add your own)
│   ├── resume.pdf         # Your resume (add your own)
│   └── project*.jpg       # Project screenshots (add your own)
├── .streamlit/
│   └── config.toml        # Streamlit theme configuration
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Running Locally

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   streamlit run Home.py
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:8501`

## 📝 Customization Guide

### 1. Update Personal Information

#### Home Page (`Home.py`)
- Line 112-119: Change your name, title, and tagline
- Line 168-174: Update welcome message and introduction text

#### Bio Page (`pages/1_Bio.py`)
- Line 167-179: Edit your bio and background story
- Line 187-197: Update education details
- Line 206-238: Modify skills and tech stack tags

#### Contact Page (`pages/3_Contact.py`)
- Line 129: Update email address
- Line 137: Update GitHub username
- Line 145: Update LinkedIn profile
- Line 153: Update Twitter/social media handle

### 2. Add Your Projects

Edit `data/projects.json` to add or modify projects:

```json
{
  "title": "Your Project Name",
  "description": "Brief description of what the project does",
  "tech_stack": ["React", "Node.js", "MongoDB"],
  "image": "assets/project_image.jpg",
  "icon": "🚀",
  "github_link": "https://github.com/username/repo",
  "demo_link": "https://your-demo-url.com"
}
```

**Fields explained:**
- `title`: Project name
- `description`: What the project does (keep it concise)
- `tech_stack`: Array of technologies used
- `image`: Path to project screenshot (optional)
- `icon`: Emoji icon if no image provided
- `github_link`: Link to GitHub repository
- `demo_link`: Link to live demo (can be empty string if none)

### 3. Add Your Images

#### Profile Picture
1. Add your profile photo as `assets/profile.jpg`
2. Recommended size: 500x500 pixels (square)
3. Formats supported: JPG, PNG

#### Resume
1. Add your resume PDF as `assets/resume.pdf`
2. It will appear as a download button on the Bio page

#### Project Screenshots
1. Add project images to `assets/` folder
2. Name them descriptively (e.g., `ecommerce_screenshot.jpg`)
3. Reference them in `projects.json`
4. Recommended size: 800x600 pixels or similar aspect ratio

### 4. Change Color Scheme

Edit `.streamlit/config.toml` to customize colors:

```toml
[theme]
primaryColor="#667eea"        # Main accent color (buttons, links)
backgroundColor="#F8F9FA"     # Page background
secondaryBackgroundColor="#FFFFFF"  # Card backgrounds
textColor="#1F2937"          # Text color
```

## 🌐 Deploy to Streamlit Community Cloud

### Prerequisites
- GitHub account
- Streamlit Community Cloud account (free at [share.streamlit.io](https://share.streamlit.io))

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Streamlit**
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Click "New app"
   - Select your GitHub repository
   - Set main file path: `Home.py`
   - Click "Deploy"

3. **Your site will be live at:**
   `https://[your-app-name].streamlit.app`

### Important Notes for Deployment

- Make sure `requirements.txt` is in the root directory
- Ensure all image paths use relative paths
- The `.streamlit/config.toml` file will be automatically applied
- Free tier includes: unlimited public apps, 1GB storage, community support

## 🎨 Design Features

- **Color Palette**: Soft purple gradient (#667eea to #764ba2) as accent
- **Typography**: Inter font family for modern, clean look
- **Shadows**: Subtle box-shadows for depth and dimension
- **Hover Effects**: Smooth transitions on interactive elements
- **Responsive Grid**: Adapts to different screen sizes automatically
- **Card-Based Layout**: Clean, organized content presentation

## 🛠️ Tech Stack

- **Framework**: Streamlit (Python)
- **Styling**: Custom CSS with Google Fonts
- **Data**: JSON for project management
- **Deployment**: Streamlit Community Cloud (free)
- **No Database Required**: All content managed through files

## 📋 Tips for a Great Portfolio

1. **Keep it updated** - Regularly add new projects
2. **Use quality images** - Good screenshots make a big difference
3. **Write clear descriptions** - Explain what problems your projects solve
4. **Include live demos** - Let people interact with your work
5. **Showcase variety** - Display different types of projects and skills
6. **Proofread** - Check for typos and grammar
7. **Add real links** - Update placeholder social media links
8. **Professional photo** - Use a clear, professional profile picture

## 🤝 Customization Beyond Basics

### Adding New Pages

1. Create a new file in `pages/` folder (e.g., `4_Blog.py`)
2. Streamlit automatically adds it to the sidebar navigation
3. Follow the same CSS and structure pattern as existing pages

### Integrating Contact Form

To make the contact form functional:
- Use **FormSpree**: Add action URL to form
- Use **EmailJS**: JavaScript integration for client-side email
- Create a backend API with Flask/FastAPI for custom handling

### Adding Analytics

Add Google Analytics or Plausible Analytics by inserting tracking code in page headers.

## 📄 License

Feel free to use this template for your personal portfolio. No attribution required, but appreciated!

## 💡 Need Help?

- **Streamlit Docs**: [docs.streamlit.io](https://docs.streamlit.io)
- **Streamlit Community**: [discuss.streamlit.io](https://discuss.streamlit.io)
- **Deployment Guide**: [docs.streamlit.io/streamlit-community-cloud](https://docs.streamlit.io/streamlit-community-cloud)

## 🚀 What's Next?

After setting up your portfolio:
1. Replace all placeholder text with your own information
2. Add your profile picture and resume
3. Update the projects.json with your actual projects
4. Add project screenshots
5. Update social media links
6. Push to GitHub
7. Deploy to Streamlit Community Cloud
8. Share your portfolio URL!

---

**Built with ❤️ using Streamlit**

Good luck with your portfolio! 🎉
