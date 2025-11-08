# B4M STUDIOS - Premium Production House Website

A stunning, highly-animated website for B4M Studios featuring cutting-edge design, advanced animations, and a premium cinematic aesthetic that impresses clients and showcases creative excellence.

## 🎬 Features

- **🎨 Advanced Animations**: 
  - Animated logo loading screens with bottom-to-top image sliders
  - Smooth page transitions and reveal animations
  - 3D hover effects and parallax scrolling
  - Pulse glow effects and shimmer animations
  
- **🎥 Video Hero Carousel**: Homepage features automatic looping video carousel showcasing your best work

- **📂 Specialized Sections**:
  - **Films**: Dedicated page for film productions with category filtering
  - **Creative Direction**: Masonry layout showcasing creative projects
  - **Photography**: Pinterest-style grid with lightbox functionality

- **🎯 Brand-Focused Design**: 
  - Custom amber/orange gradient color scheme
  - Glass morphism and gradient overlays
  - Distinct visual identity for each section

- **💼 Professional Portfolio**: 
  - Detailed project information with client, director, and agency credits
  - Awards and recognition display
  - Rich metadata including duration, crew size, equipment used

- **📱 Fully Responsive**: Optimized for all devices with mobile-first approach

- **⚡ Performance Optimized**: Built with Next.js 14 for fast loading and optimal SEO

## 📁 Project Structure modern 

```
b4m-studios/
├── app/
│   ├── layout.tsx              # Root layout with navigation and footer
│   ├── page.tsx                # Home page
│   ├── portfolio/              # Main portfolio page
│   ├── films/                  # Films section with filtering
│   ├── creative/               # Creative direction showcase
│   ├── photography/            # Photography gallery with lightbox
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   └── globals.css             # Global styles with animations
├── components/
│   ├── Navigation.tsx          # Navigation with dropdown menus
│   ├── Footer.tsx              # Footer component
│   ├── LoadingAnimation.tsx    # Animated loading screen
│   ├── ImageRevealSlider.tsx   # Bottom-to-top image slider
│   ├── PageTransition.tsx      # Page transition wrapper
│   └── home/
│       ├── HeroSection.tsx     # Video carousel hero
│       ├── CategoriesShowcase.tsx  # Three main categories
│       ├── FeaturedWork.tsx
│       ├── ServicesSection.tsx
│       ├── StatsSection.tsx
│       └── CTASection.tsx
└── public/
    ├── video1.mp4              # Hero carousel videos
    ├── video2.mp4
    ├── video3.mp4
    ├── video4.mp4
    └── video5.mp4
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Adding Your Videos

Place your video files in the `public/` folder and name them `video1.mp4` through `video5.mp4`. These will automatically appear in the homepage hero carousel.

### Adding Your Logo

Replace the placeholder logo in `components/Navigation.tsx` and `components/Footer.tsx` with your actual logo image.

### Updating Content

- **Home Page**: Edit sections in `components/home/`
- **Portfolio Projects**: 
  - Main portfolio: `app/portfolio/page.tsx`
  - Films: `app/films/page.tsx`
  - Creative Direction: `app/creative/page.tsx`
  - Photography: `app/photography/page.tsx`
- **Team Members**: Modify team array in `app/about/page.tsx`
- **Contact Info**: Update contact details in `app/contact/page.tsx` and `components/Footer.tsx`

### Color Theme

The brand color scheme features vibrant gradients:
- **Primary Amber Gradient**: `from-amber-500 to-orange-600`
- **Blue Gradient**: `from-blue-600 to-indigo-700`
- **Purple Gradient**: `from-purple-600 to-pink-600`
- **Slate Dark**: `from-slate-900 via-blue-900 to-slate-800`

All gradients are defined in `app/globals.css` and `tailwind.config.ts`

## 📦 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display (Google Fonts)

## 🎥 Video Content

The homepage automatically cycles through 5 videos from the `public/` folder. Simply add your videos as:
- `public/video1.mp4`
- `public/video2.mp4`
- `public/video3.mp4`
- `public/video4.mp4`
- `public/video5.mp4`

The hero section will automatically loop through them with smooth transitions.

## ✨ Key Animations Included

1. **Page Load Animations**:
   - Animated B4M logo with rotation and pulse
   - Bottom-to-top image slider reveal
   - Smooth fade-in transitions

2. **Scroll Animations**:
   - Parallax effects on images
   - Reveal-on-scroll for sections
   - Staggered item animations

3. **Hover Effects**:
   - 3D lift and scale transforms
   - Image zoom on hover
   - Gradient overlays
   - Play button appearances
   - Shimmer effects

4. **Navigation**:
   - Smooth dropdown menus
   - Active state indicators
   - Mobile menu animations

## 📝 Additional Features

- Lightbox for photography gallery
- Category filtering across all sections
- Detailed project metadata display
- Awards and recognition showcase
- Responsive grid layouts (masonry, Pinterest-style)
- Professional stats and metrics
- Client and agency credits

## 🤝 Support

For questions or support, contact: contact@b4mstudios.com

## 📄 License

© 2024 B4M Studios. All rights reserved.

---

**Built with ❤️ for Ideas in Motion**

*A premium, animation-rich portfolio website designed to impress clients and showcase creative excellence.*

