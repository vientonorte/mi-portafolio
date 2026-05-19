# Mobile QA Checklist — Portafolio Lead UX

## Hero Section Mobile Optimization

### Visual & Layout Testing

#### Viewport Testing (Required Breakpoints)
- [ ] **320px** — iPhone SE, small devices
  - [ ] All text is readable without horizontal scroll
  - [ ] Buttons stack vertically with proper spacing
  - [ ] Logo and badge scale appropriately
  - [ ] Metrics pills wrap correctly
  
- [ ] **375px** — iPhone 12/13/14
  - [ ] Heading line breaks naturally
  - [ ] CTA buttons have full-width on mobile
  - [ ] Spacing between elements feels balanced
  
- [ ] **414px** — iPhone Pro Max
  - [ ] Layout transitions smoothly
  - [ ] No awkward white spaces
  
- [ ] **768px** — iPad Portrait
  - [ ] Buttons switch to horizontal layout
  - [ ] Typography scales up appropriately
  - [ ] Hero height adjusts properly

- [ ] **1024px+** — Desktop
  - [ ] Full desktop layout active
  - [ ] Gradient animations visible (if motion enabled)

### Typography Mobile Audit
- [ ] Heading readable at minimum size (min 28px on 320px viewport)
- [ ] Description text comfortable to read (min 16px)
- [ ] Badge text legible (min 14px)
- [ ] Line height sufficient for mobile (1.4-1.6)
- [ ] No text overflow or truncation

### Touch Interaction Standards (WCAG 2.1 Level AA)
- [ ] **Primary CTA button**: min 48x48px touch target ✅
- [ ] **Secondary CTA button**: min 48x48px touch target ✅
- [ ] **Scroll indicator**: min 44x44px touch target ✅
- [ ] Buttons have 8px minimum spacing between them
- [ ] No overlapping touch targets
- [ ] Touch feedback visible (active states)

### Performance on Mobile
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No janky scrolling or layout shifts
- [ ] Gradient background optimized (will-change property)
- [ ] Particle animations reduced on mobile (only 3 particles)
- [ ] Image/logo loads quickly
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

### Accessibility Mobile Testing
- [ ] **Screen Reader Testing**
  - [ ] VoiceOver (iOS): All content announced correctly
  - [ ] TalkBack (Android): Navigation works smoothly
  - [ ] Badge text announced
  - [ ] Metrics announced in logical order
  
- [ ] **Zoom & Scaling**
  - [ ] Text scales up to 200% without breaking layout
  - [ ] Pinch-to-zoom works (viewport not disabled)
  - [ ] No horizontal scrolling at 200% zoom
  
- [ ] **Focus Management**
  - [ ] Focus indicators visible on all interactive elements
  - [ ] Tab order logical (badge → heading → buttons → scroll)
  - [ ] No keyboard traps

### Visual Hierarchy Mobile
- [ ] Badge draws attention first (status indicator animation)
- [ ] Heading clearly the primary focus
- [ ] Metrics provide social proof without overwhelming
- [ ] Primary CTA stands out from secondary
- [ ] Scroll indicator subtle but noticeable

### Content Quality
- [ ] **Spanish copy**
  - [ ] Heading: "Transformo estrategia digital en experiencias que impulsan resultados de negocio"
  - [ ] Description concise and value-focused
  - [ ] Metrics visible: -40% abandono, NPS 72, +35% activación
  
- [ ] **English copy**
  - [ ] Properly translated with natural phrasing
  - [ ] Value proposition clear
  - [ ] Metrics formatted correctly

## Cross-Device Testing Matrix

| Device | OS | Browser | Status | Notes |
|--------|-----|---------|--------|-------|
| iPhone SE (320px) | iOS 15+ | Safari | ⬜ | Test min viewport |
| iPhone 12/13 (375px) | iOS 15+ | Safari | ⬜ | Most common iPhone |
| iPhone 14 Pro Max (414px) | iOS 16+ | Safari | ⬜ | Large iPhone |
| Samsung Galaxy S21 (360px) | Android 12+ | Chrome | ⬜ | Common Android |
| iPad Air (768px) | iOS 15+ | Safari | ⬜ | Tablet portrait |
| iPad Pro (1024px) | iOS 15+ | Safari | ⬜ | Large tablet |

## Mobile-Specific Issues Checklist

### Common Mobile Issues
- [ ] Text legibility issues
- [ ] Touch target too small
- [ ] Buttons hard to tap
- [ ] Animations causing lag
- [ ] Content cut off or hidden
- [ ] Horizontal scrolling
- [ ] Poor contrast in outdoor lighting conditions

### Motion & Animations
- [ ] Reduced motion users see static version
- [ ] No motion sickness triggers (subtle animations only)
- [ ] Battery-friendly (minimal animation complexity)

### Loading & Images
- [ ] Logo loads with proper fallback
- [ ] Gradient background efficient
- [ ] No CLS (Cumulative Layout Shift)

## Testing Tools

### Manual Testing
```bash
# Local dev server
npm run dev
```
Then test on:
- Physical devices (recommended)
- Browser DevTools device emulation
- BrowserStack/Sauce Labs (if available)

### Automated Testing
```bash
# Lighthouse mobile audit
npx lighthouse http://localhost:5173 --preset=mobile --view

# axe-core accessibility
npx axe http://localhost:5173 --mobile --save axe-mobile-report.html
```

### Responsive Testing Commands
```bash
# Test specific viewport in Chrome DevTools
# 1. Open DevTools (F12)
# 2. Toggle device toolbar (Ctrl+Shift+M)
# 3. Test each breakpoint: 320, 375, 414, 768, 1024
```

## Hero Section Improvements Applied

### ✅ Copy Improvements
- Added professional badge with "Lead UX · Senior Product Designer"
- Strengthened heading: "Transformo estrategia digital..." (more action-oriented)
- Enhanced description with bullet-point metrics for scannability
- Added inline metrics badges for social proof

### ✅ Mobile UX Improvements
- Increased hero min-height on mobile (80vh vs 75vh)
- Made CTA buttons full-width on mobile for easier tapping
- Ensured all touch targets meet WCAG 2.1 minimum (48x48px)
- Added proper spacing between stacked buttons
- Optimized typography scaling across breakpoints

### ✅ Visual Hierarchy
- Added badge with status indicator for credibility
- Improved heading size progression (responsive type scale)
- Added metric pills for immediate social proof
- Enhanced CTA prominence with gradient and shadows

### ✅ Accessibility
- All interactive elements meet WCAG AA touch target size
- Proper ARIA labels on scroll indicator
- Semantic HTML structure maintained
- Focus states visible and consistent

## Sign-off Criteria

Before marking Hero Section mobile QA as complete:
- [ ] All viewport sizes tested
- [ ] Touch targets verified (48x48px minimum)
- [ ] Performance metrics acceptable (LCP < 2.5s)
- [ ] Accessibility score ≥ 95 (Lighthouse)
- [ ] No visual regressions
- [ ] Content copy reviewed and approved
- [ ] Cross-browser testing passed
- [ ] Screen reader testing completed

---

**Last Updated:** 2026-05-19  
**Reviewer:** Automated + Manual QA  
**Status:** In Progress
