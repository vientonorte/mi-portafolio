# 🚀 Production Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

## Pre-Deployment Checklist

### Phase 1: Configuration ✅

- [ ] `.env.local` created from `.env.example` (opcional en CI)
- [ ] FormSubmit activado en inbox (`gaete.gaona@gmail.com` — enlace de confirmación)
- [ ] `VITE_GA_MEASUREMENT_ID` configured (optional)
- [ ] `VITE_GTM_ID` configured (optional)
- [ ] GA4 script uncommented in `index.html` (if using analytics)

### Phase 2: Assets ✅

- [ ] CV PDF exists at `public/cv-rodrigo-gaete-ux.pdf`
- [ ] Profile photo exists at `public/profile-photo.jpg`
- [ ] Profile photo uncommented in `src/components/organisms/About.tsx` (~line 50)
- [ ] Company logos added (optional): `public/logos/*.png`

### Phase 3: Code Quality ✅

- [ ] All tests passing: `npm run test`
- [ ] Routes QA passing: `npm run qa:routes` (Playwright; también en CI)
  - Expected: 40/40 checks ✅ (rutas + secciones + hero mobile)
- [ ] Build succeeds: `npm run build`
  - Expected: No errors, dist/ folder created ✅
- [ ] TypeScript check passes: `npx tsc --noEmit`
  - Expected: No type errors ✅
- [ ] Linting passes: `npm run lint` (if configured)
  - Expected: No errors ✅
- [ ] `npm run sync:images` sin errores (capturas dedicadas en `public/images/`)

### Phase 4: Manual Testing ✅

Run preview: `npm run preview` and verify:

#### Core Functionality
- [ ] Homepage loads without errors
- [ ] Hero buscador: sugerencias visibles en mobile (390px) sin focus
- [ ] Hero section displays correctly
- [ ] Navigation menu works (all links)
- [ ] Mobile menu works (<768px)

#### Features
- [ ] Contact form validation works
  - [ ] Name field requires min 2 characters
  - [ ] Email field validates format
  - [ ] Message field requires min 10 characters
  - [ ] Consent checkbox required (Ley 21.719)
  - [ ] Error messages display correctly
- [ ] Contact assistant flow works (intent → review → send)
- [ ] Contact form submits successfully (FormSubmit → Gmail)
- [ ] `/privacy` loads in ES and EN
- [ ] CV download button exists and is clickable
- [ ] Projects filtering works (All/Featured/Fintech/Mobility)
- [ ] Impact stats are clickable
- [ ] Back to top button appears on scroll

#### Routing
- [ ] `/` (Home) loads
- [ ] `/#/sobre-mi` (About) loads
- [ ] `/#/proyectos` (Projects) loads
- [ ] `/#/contacto` (Contact) loads
- [ ] `/#/proceso` (Process) loads
- [ ] `/#/proceso/fase/:id` (Process Detail) loads
- [ ] `/#/design-system` (Design System) loads

#### Responsive Design
- [ ] Test at 320px (mobile small)
- [ ] Test at 375px (mobile standard)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop small)
- [ ] Test at 1920px (desktop large)
- [ ] All touch targets ≥48×48px on mobile

### Phase 5: Performance ✅

Run Lighthouse audit (Chrome DevTools → Lighthouse):

- [ ] Performance score ≥90
- [ ] Accessibility score ≥95
- [ ] Best Practices score ≥90
- [ ] SEO score ≥90

Check bundle size:
- [ ] Main bundle <750KB uncompressed
- [ ] Gzipped bundle <200KB
- [ ] Lazy loading working (check Network tab)

### Phase 6: Accessibility ✅

- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader friendly (test with NVDA/JAWS if available)
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Form fields have proper labels
- [ ] Error messages are announced

### Phase 7: SEO ✅

- [ ] Page titles are descriptive
- [ ] Meta descriptions exist
- [ ] Open Graph tags present (optional)
- [ ] Canonical URLs set
- [ ] Sitemap exists (if configured)

## Deployment

### Step 1: Final Code Review

- [ ] All console.logs removed (or wrapped in dev check)
- [ ] No sensitive data in code
- [ ] No TODO comments in production code
- [ ] Git status clean: `git status`

### Step 2: Version Control

- [ ] All changes committed
- [ ] Meaningful commit messages
- [ ] Branch is up to date with main:
  ```bash
  git checkout main
  git pull origin main
  ```

### Step 3: Deploy

#### Option A: Merge to Main (Automatic Deployment)

```bash
# If working on a feature branch
git checkout main
git merge your-feature-branch
git push origin main
```

#### Option B: Direct Push (if on main)

```bash
git push origin main
```

### Step 4: Monitor Deployment

1. Go to GitHub Actions:
   - URL: https://github.com/vientonorte/mi-portafolio/actions

2. Wait for workflows to complete:
   - [ ] CI workflow passes (tests, typecheck, lint)
   - [ ] Deploy workflow passes
   - [ ] Lighthouse workflow passes

3. Check deployment time:
   - Expected: ~2-5 minutes total

## Post-Deployment Verification

### Step 1: Site Accessibility

- [ ] Visit production URL: https://vientonorte.io/
- [ ] Site loads within 3 seconds
- [ ] No browser console errors

### Step 2: Functional Testing

Test all critical paths in production:

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Contact form submits (check FormSpree dashboard)
- [ ] CV downloads
- [ ] Projects filter
- [ ] All routes accessible

### Step 3: Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if Mac available)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS, if available)
- [ ] Chrome Mobile (Android, if available)

### Step 4: Analytics Verification (if configured)

- [ ] Visit GA4 dashboard
- [ ] Check Real-time view
- [ ] Navigate site and see events in Real-time
- [ ] Verify events firing:
  - Page views
  - Button clicks
  - Form submissions
  - Downloads

### Step 5: Performance in Production

- [ ] Run Lighthouse on production URL
- [ ] Compare scores with local build
- [ ] Check Core Web Vitals:
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1

## Rollback Plan

If critical issues found:

### Option 1: Quick Fix

1. Fix the issue locally
2. Test thoroughly
3. Push fix to main
4. Wait for redeployment

### Option 2: Revert

```bash
# Find the last working commit
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Push revert
git push origin main
```

## Post-Deployment Tasks

### Immediate (Within 24 hours)

- [ ] Share production URL with stakeholders
- [ ] Monitor FormSpree for first submissions
- [ ] Check GA4 for initial traffic
- [ ] Test on real mobile devices
- [ ] Ask 2-3 people to test and provide feedback

### Week 1

- [ ] Monitor error logs (if configured)
- [ ] Review GA4 analytics
- [ ] Check FormSpree submissions
- [ ] Gather user feedback

### Month 1

- [ ] Review performance metrics
- [ ] Analyze user behavior in GA4
- [ ] Plan improvements based on data
- [ ] Update content if needed

## Success Criteria

Deployment is successful when:

- ✅ All tests passing
- ✅ Build succeeds
- ✅ Site accessible at production URL
- ✅ No console errors
- ✅ Contact form working
- ✅ CV downloadable
- ✅ Lighthouse scores ≥90
- ✅ Mobile responsive
- ✅ Analytics tracking (if configured)

## Known Issues / Technical Debt

Document any known issues that are acceptable for production:

- [ ] PDF download uses `window.print()` instead of real PDF generation (P2 priority)
- [ ] Privacy page dark mode contrast needs verification on mobile (P2 priority)
- [ ] Orphaned pages without routes: CompanyDetail, ProjectDetail, FrameworkDetail (P3 priority)

## Maintenance Schedule

### Weekly
- Check FormSpree for new submissions
- Review GA4 basic metrics

### Monthly
- Run Lighthouse audit
- Update dependencies: `npm update`
- Review Dependabot PRs

### Quarterly
- Update CV if needed
- Refresh project showcase
- Review and update content
- Security audit

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Version:** 1.0.0  
**Production URL:** https://vientonorte.io/

**Notes:**
_____________________________________________________________________
_____________________________________________________________________
_____________________________________________________________________
