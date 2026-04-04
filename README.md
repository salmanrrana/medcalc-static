# MedCalc - Static Version

A simple vanilla HTML/CSS/JavaScript version of MedCalc for easy deployment.

## Files

- `index.html` - Home page with feature cards
- `transplant.html` - Transplant day calculator
- `chemo.html` - Chemotherapy day calculator
- `links.html` - Helpful medical resources
- `styles.css` - All styling
- `utils.js` - Calculation functions and utilities
- `nav.js` - Navigation menu functionality
- `calculator.js` - Calculator form handling

## Features

- ✅ Responsive design (mobile & desktop)
- ✅ No frameworks or build tools needed
- ✅ Transplant day counter (Day 0 counting)
- ✅ Chemotherapy day counter (Day 1 counting)
- ✅ Curated medical resource links
- ✅ Mobile bottom navigation
- ✅ Accessible (ARIA labels, semantic HTML)
- ✅ Works offline

## Deployment

### Surge.sh

```bash
# Install surge if you haven't
npm install -g surge

# Deploy from this directory
surge
```

When prompted:
- Project path: `.` (current directory)
- Domain: `medcalc.surge.sh` (or your custom domain)

### Other Options

- **Netlify Drop**: Drag & drop the entire folder to https://app.netlify.com/drop
- **GitHub Pages**: Push to GitHub and enable Pages in repository settings
- **Any static host**: Upload all files to your hosting provider

## How to Use

1. Open `index.html` in a browser
2. Navigate to any calculator
3. Select your start date (transplant or first chemo)
4. Optional: Change the target date (defaults to today)
5. View instant results

## Local Development

Just open `index.html` in your browser - no build step needed!

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Built with care for patients and medical professionals.
