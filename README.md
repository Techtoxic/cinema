# H4M STUDIOS - Cinematic Production House Website

A stunning, modern website for H4M Studios featuring cutting-edge design, smooth animations, and a premium cinematic aesthetic.

## 🎬 Features

- **Cinematic Design**: Light theme with dark blue cinematic touches and gold/amber accents
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth page transitions and micro-interactions
- **Responsive Layout**: Fully responsive design that looks great on all devices
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Portfolio Showcase**: Dynamic, filterable portfolio with categorized projects
- **Contact Form**: Professional contact form with validation
- **SEO Optimized**: Built-in metadata and SEO best practices

## 📁 Project Structure

```
h4m-studios/
├── app/
│   ├── layout.tsx          # Root layout with navigation and footer
│   ├── page.tsx            # Home page
│   ├── portfolio/          # Portfolio page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Main navigation component
│   ├── Footer.tsx          # Footer component
│   ├── PageTransition.tsx  # Page transition wrapper
│   └── home/               # Home page sections
│       ├── HeroSection.tsx
│       ├── FeaturedWork.tsx
│       ├── ServicesSection.tsx
│       ├── StatsSection.tsx
│       └── CTASection.tsx
└── public/                 # Static assets (add logo here)
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

### Adding Your Logo

Replace the placeholder logo in `components/Navigation.tsx` and `components/Footer.tsx` with your actual logo image.

### Updating Content

- **Home Page**: Edit sections in `components/home/`
- **Portfolio Projects**: Update project data in `app/portfolio/page.tsx`
- **Team Members**: Modify team array in `app/about/page.tsx`
- **Contact Info**: Update contact details in `app/contact/page.tsx` and `components/Footer.tsx`

### Color Theme

The color scheme is defined in `tailwind.config.ts`:
- Primary (Gold/Amber): `#F5A623`
- Dark Blue: `#0D1B2A`
- Dark Charcoal: `#1A1A1A`
- Light: `#FAFAFA`

## 📦 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display (Google Fonts)

## 🎥 Adding Real Video Content

Replace the video placeholder in `components/home/HeroSection.tsx`:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-reel.mp4" type="video/mp4" />
</video>
```

## 📝 Future Enhancements (Phase 2)

- Blog/News section
- Video lightbox for portfolio items
- Advanced filtering and search
- CMS integration
- Analytics integration
- Newsletter subscription

## 🤝 Support

For questions or support, contact: contact@h4mstudios.com

## 📄 License

© 2024 H4M Studios. All rights reserved.

---

**Built with ❤️ for cinematic excellence**

