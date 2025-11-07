# 🎬 H4M STUDIOS - Quick Setup Guide

## Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Quick Customization Checklist

### 1. Add Your Logo
- Replace logo placeholder in `components/Navigation.tsx` (line 30-40)
- Replace logo placeholder in `components/Footer.tsx` (line 15-25)
- Your logo should be a lens flare geometric icon

### 2. Replace Hero Video
- Edit `components/home/HeroSection.tsx`
- Replace the image/placeholder with your demo reel video
- Recommended: Use MP4 format, optimize for web

### 3. Update Portfolio Projects
- Edit `app/portfolio/page.tsx`
- Update the `projects` array with your actual projects
- Add your project images and videos

### 4. Customize Contact Information
- Update email, phone, address in `app/contact/page.tsx`
- Update same info in `components/Footer.tsx`

### 5. Update About Page
- Edit team members in `app/about/page.tsx`
- Update equipment list
- Add your actual team photos

## 🎨 Color Customization

Edit `tailwind.config.ts` to adjust colors:
- **Primary (Gold)**: Currently `#F5A623`
- **Dark Blue**: Currently `#0D1B2A`
- **Charcoal**: Currently `#1A1A1A`

## 📱 Testing

- **Desktop**: Test on Chrome, Firefox, Safari
- **Mobile**: Test on iOS and Android devices
- **Tablet**: Test on iPad and Android tablets

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 📋 Pre-Launch Checklist

- [ ] Logo added
- [ ] Hero video/reel added
- [ ] Portfolio projects updated with real content
- [ ] Contact information updated
- [ ] About page team photos added
- [ ] Equipment list updated
- [ ] All links tested
- [ ] Mobile responsiveness verified
- [ ] SEO metadata updated in `app/layout.tsx`

## 🎥 Video Optimization Tips

- Keep hero video under 10MB
- Use H.264 codec for best compatibility
- Recommended resolution: 1920x1080
- Add a poster image for fallback

## 💡 Pro Tips

1. **Images**: Use WebP format for better performance
2. **Videos**: Host large videos on Vimeo/YouTube and embed
3. **Performance**: Run `npm run build` to check bundle size
4. **SEO**: Update metadata in each page file

## 🆘 Troubleshooting

**Issue**: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue**: Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Styling not loading
```bash
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

## 📞 Need Help?

Contact the development team or refer to:
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Ready to impress your client? Let's launch! 🚀**

