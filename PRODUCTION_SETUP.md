# 🚀 Production Setup Guide

This guide will help you configure the portfolio for production deployment.

## ✅ Prerequisites

- Node.js 18+ installed
- npm 8+ installed
- Git configured
- GitHub account (for deployment)

## 📋 Phase 1: Required Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure the following:

#### FormSpree (Required for Contact Form)

1. Visit [FormSpree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy your Form ID (looks like: `mwpeplwk`)
5. Add to `.env`:
   ```
   VITE_FORMSPREE_ID=your_formspree_id_here
   ```

> **Note:** Without FormSpree configured, the contact form will run in demo mode (simulates submission).

#### Google Analytics 4 (Optional)

1. Visit [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `.env`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
5. Uncomment the GA4 script in `index.html` (lines ~10-20)

### 2. Required Assets

Add the following files to the `public/` directory:

#### CV PDF (Required)

```
public/cv-rodrigo-gaete-ux.pdf
```

- Create or export your CV as PDF
- Name it exactly as shown above
- Place in the `public/` folder

#### Profile Photo (Required)

```
public/profile-photo.jpg
```

- Recommended size: 400x400px
- Format: JPG or PNG
- Professional headshot
- Edit `src/components/organisms/About.tsx` line ~50 to uncomment the image tag

#### Company Logos (Optional)

```
public/logos/sura.png
public/logos/transvip.png
public/logos/karri.png
```

- Recommended size: 200x200px
- Format: PNG or SVG with transparency
- Update `src/data/projects-data.ts` with the correct logo paths

## 📋 Phase 2: Build Verification

### 1. Run Tests

```bash
npm run test
```

Expected: All 62 tests passing ✅

### 2. Build for Production

```bash
npm run build
```

Expected: Build completes without errors ✅

### 3. TypeScript Check

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors ✅

### 4. Preview Build Locally

```bash
npm run preview
```

Visit: http://localhost:4173

Test all features:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Contact form validates
- [ ] Projects filter works
- [ ] CV download button present
- [ ] Mobile menu works

## 📋 Phase 3: Performance Check

### Run Lighthouse Audit

```bash
npm run lighthouse
```

Or manually via Chrome DevTools:
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Select "Performance", "Accessibility", "SEO", "Best Practices"
4. Click "Generate report"

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## 📋 Phase 4: Deployment

### GitHub Pages Deployment

The repository is already configured for GitHub Pages deployment.

**Automatic Deployment:**
1. Push changes to `main` branch:
   ```bash
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Run tests
   - Build the project
   - Deploy to GitHub Pages

3. Check deployment status:
   - Visit: https://github.com/vientonorte/mi-portafolio/actions
   - Wait for "Deploy to GitHub Pages" workflow to complete ✅

4. Access your site:
   - URL: https://vientonorte.github.io/mi-portafolio/

### Post-Deployment Verification

After deployment, verify the following:

- [ ] Site loads without errors
- [ ] All routes work (`/`, `/#/proyectos`, `/#/sobre-mi`, `/#/contacto`, `/#/cases`)
- [ ] Contact form submits (sends real email if FormSpree configured)
- [ ] CV downloads correctly
- [ ] Analytics tracking works (check GA4 Real-time if configured)
- [ ] No console errors
- [ ] Mobile responsive works (test on real device)

## 🔧 Troubleshooting

### Contact Form Not Sending

- **Issue:** Form submits but no email received
- **Solution:** 
  1. Check `.env` has correct `VITE_FORMSPREE_ID`
  2. Verify FormSpree account is active
  3. Check FormSpree dashboard for submissions
  4. Test in production (may not work in localhost due to CORS)

### CV Download Not Working

- **Issue:** 404 error on CV download
- **Solution:**
  1. Verify file exists: `public/cv-rodrigo-gaete-ux.pdf`
  2. Check file name matches exactly
  3. Rebuild: `npm run build`
  4. Re-deploy

### Analytics Not Tracking

- **Issue:** No data in Google Analytics
- **Solution:**
  1. Verify GA4 Measurement ID in `.env`
  2. Uncomment GA4 script in `index.html`
  3. Wait 24-48 hours for data to appear
  4. Use GA4 Real-time view for immediate testing

### Build Fails

- **Issue:** `npm run build` fails
- **Solution:**
  1. Delete `node_modules` and `package-lock.json`
  2. Run `npm install`
  3. Run `npm run build` again
  4. Check for TypeScript errors: `npx tsc --noEmit`

### GitHub Pages 404

- **Issue:** Site shows 404 after deployment
- **Solution:**
  1. Check repository settings → Pages → Source is set to "GitHub Actions"
  2. Verify `base: '/mi-portafolio/'` in `vite.config.ts`
  3. Check deployment workflow completed successfully
  4. Wait 5-10 minutes for DNS propagation

## 📊 Production Checklist

Use this checklist before going live:

### Configuration
- [ ] `.env` file created with FormSpree ID
- [ ] CV PDF added to `public/`
- [ ] Profile photo added to `public/`
- [ ] (Optional) Company logos added
- [ ] (Optional) GA4 configured

### Testing
- [ ] All tests passing (62/62)
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Lighthouse scores ≥90
- [ ] Contact form works
- [ ] CV downloads
- [ ] All routes load
- [ ] Mobile responsive

### Deployment
- [ ] Changes pushed to `main`
- [ ] GitHub Actions workflow passed
- [ ] Site accessible at production URL
- [ ] No console errors in production
- [ ] FormSpree receiving submissions
- [ ] (Optional) GA4 tracking events

## 🎯 Success Metrics

Once deployed, monitor:

- **Contact Form Submissions:** Check FormSpree dashboard
- **CV Downloads:** Track via GA4 (if configured)
- **Page Views:** Monitor GA4 for traffic
- **Performance:** Run monthly Lighthouse audits
- **Uptime:** GitHub Pages has 99.9% uptime SLA

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review `QUICK_WINS_SETUP.md` for feature-specific setup
3. Check GitHub Actions logs for deployment errors
4. Verify all files are committed and pushed

## 🔄 Regular Maintenance

**Weekly:**
- Check FormSpree for new submissions
- Review GA4 analytics

**Monthly:**
- Run Lighthouse audit
- Update dependencies: `npm update`
- Review and respond to GitHub Dependabot PRs

**Quarterly:**
- Update CV PDF if needed
- Review and update project showcase
- Check for broken links

---

**Last Updated:** 2026-06-05  
**Version:** 1.0.0  
**Status:** Production Ready 🚀
