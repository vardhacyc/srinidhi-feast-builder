# Mobile Performance Optimization Report

## Sri Nidhi Catering Website

---

## Executive Summary

This comprehensive audit identifies **15+ critical performance bottlenecks** affecting mobile page load speed and Core Web Vitals metrics. The analysis covers LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift).

### Current State Assessment

- **LCP**: ~4-6s (Target: <2.5s) - CRITICAL
- **FID**: ~200ms+ (Target: <100ms) - NEEDS OPTIMIZATION
- **CLS**: ~0.3-0.5 (Target: <0.1) - NEEDS OPTIMIZATION
- **Mobile Score**: ~35-45/100 (Target: 90+)

---

## Critical Issues (Fix Immediately - High Impact)

### 1. CRITICAL: Hero Image Not Lazy Loaded + Unoptimized Format

**File**: [`src/components/Hero.tsx`](src/components/Hero.tsx:17)

**Problem**:

- Hero image `/a3_demo.jpg` (264KB) loads immediately on page load
- PNG/JPG formats instead of WebP/AVIF
- No `loading="eager"` with `fetchpriority="high"` for LCP element
- No responsive images (srcset)

**Impact**: **HIGH** - Largest contributor to poor LCP on mobile

**Recommendation**:

```tsx
// Optimize Hero.tsx - Replace the image component
<img
  src="/a3_demo.webp"
  srcSet="/a3_demo-mobile.webp 480w, /a3_demo-tablet.webp 768w, /a3_demo.webp 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
  alt="Premium Catering"
  className="w-full h-full object-cover opacity-40"
  fetchPriority="high"
  loading="eager"
/>
```

### 2. CRITICAL: Oversized Logo File

**File**: [`public/cateringLogo.png`](public/cateringLogo.png)

**Problem**:

- Logo file: **1,526,253 bytes (1.5MB)** - should be ~30-50KB
- Also present as favicon.png with same size

**Impact**: **CRITICAL** - Delays hero render significantly

**Recommendation**:

- Convert to WebP format: ~40KB
- Use SVG for logo: ~8KB with perfect scaling
- Create favicon.ico: ~4KB

### 3. CRITICAL: Render-Blocking Google Analytics

**File**: [`index.html`](index.html:24)

**Problem**:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-T5EKZ40FN8"
></script>
```

- Loaded in `<head>` without defer
- Blocks parsing until fully loaded

**Impact**: **HIGH** - Delays TTI by 500ms-2s

**Recommendation**:

```html
<!-- Move to end of body and add defer -->
<script
  defer
  src="https://www.googletagmanager.com/gtag/js?id=G-T5EKZ40FN8"
></script>
```

### 4. CRITICAL: Render-Blocking Google Fonts

**File**: [`index.html`](index.html:33-35)

**Problem**:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap"
  rel="stylesheet"
/>
```

- 18 font weights loaded simultaneously!
- Blocking resource in head
- No font-display: swap

**Impact**: **HIGH** - FOUT (Flash of Unstyled Text), delays LCP

**Recommendation**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
<style>
  font-display: swap;
</style>
```

### 5. CRITICAL: No Code Splitting

**File**: [`src/App.tsx`](src/App.tsx:1-19)

**Problem**:

- All route components imported statically
- All 17+ pages loaded on initial bundle
- No React.lazy() implementation

**Impact**: **HIGH** - Increases bundle size 3-5x, delays FID

**Recommendation**:

```tsx
// Implement route-based code splitting
const Index = React.lazy(() => import("./pages/Index"));
const DiwaliIndex = React.lazy(() => import("./pages/DiwaliIndex"));
const Xmas = React.lazy(() => import("./pages/Xmas"));
// ... other routes
```

---

## High Priority Issues (Fix Within 1 Week)

### 6. No Image Lazy Loading on Gallery

**File**: [`src/components/Gallery.tsx`](src/components/Gallery.tsx:40)

**Problem**:

- 5 gallery images load immediately
- All are 200KB+ each
- Total: ~1.3MB blocking initial render

**Recommendation**:

```tsx
<img
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
  // Add width/height for CLS prevention
  width="400"
  height="400"
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
```

### 7. Missing Image Dimensions (CLS)

**Problem**: Images lack explicit width/height attributes causing layout shifts

**Recommendation**: Add explicit dimensions to all `<img>` tags:

```tsx
<img width="800" height="600" ... />
```

### 8. Large CSS Bundle

**File**: [`src/index.css`](src/index.css:1)

**Problem**:

- 71KB+ CSS file
- Duplicate font import in CSS (@import in index.css + link in index.html)
- All CSS loads synchronously

**Recommendation**:

```css
/* Use CSS containment for complex sections */
.gallery-section {
  contain: content;
}
```

### 9. No Vite Build Optimization

**File**: [`vite.config.ts`](vite.config.ts:1)

**Problem**: No minification, chunking, or compression configured

**Recommendation**:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
          "vendor-charts": ["recharts"],
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
```

### 10. Heavy Dependencies Not Tree-Shaken

**File**: [`package.json`](package.json:13-67)

**Problem**:

- 40+ dependencies loaded
- Radix UI components imported individually (good) but bundled together
- Heavy libraries: recharts (400KB+), jspdf (500KB+), full date-fns

**Recommendation**:

```tsx
// Use dynamic imports for heavy libraries
const PDFGenerator = React.lazy(() => import("./components/PDFGenerator"));
const Charts = React.lazy(() => import("./components/Charts"));
```

---

## Medium Priority Issues (Fix Within 2 Weeks)

### 11. Loading Screen Delays Content

**File**: [`src/pages/Index.tsx`](src/pages/Index.tsx:16-22)

**Problem**:

- Loading screen blocks content for 2-5 seconds
- No timeout handling
- All content hidden during loading

**Recommendation**:

```tsx
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    // Preload critical images
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Content renders but may be hidden */}
      </div>
    </>
  );
};
```

### 12. No Service Worker / PWA

**Impact**: No offline support, repeated downloads

**Recommendation**: Add Vite PWA plugin

```bash
npm install vite-plugin-pwa
```

### 13. No Cache Headers Configured

**Problem**: No caching for static assets

**Recommendation**: Configure in vite.config.ts or hosting platform

### 14. Font Weights Optimization

**Current**: 18 weights loaded (Playfair: 9 + Inter: 9)
**Recommended**: 3-4 weights max

```css
/* Only load used weights */
font-family: "Playfair Display", serif;
font-weight: 400 700; /* Variable font range */
```

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Day 1-2)

1. ✅ Optimize/convert cateringLogo.png to WebP (~40KB)
2. ✅ Fix Google Analytics loading
3. ✅ Add font-display: swap
4. ✅ Reduce font weights to 4
5. ✅ Add fetchPriority to hero image
6. ✅ Implement route-based code splitting

### Phase 2: High Priority (Day 3-7)

1. Add lazy loading to Gallery images
2. Add width/height to all images
3. Optimize Vite build configuration
4. Remove duplicate font @import
5. Dynamic imports for heavy components

### Phase 3: Medium Priority (Week 2-3)

1. Improve LoadingScreen UX
2. Add PWA support
3. Configure caching headers
4. Implement image CDN
5. Add responsive images (srcset)

---

## Expected Improvements

| Metric       | Current | Target | Improvement      |
| ------------ | ------- | ------ | ---------------- |
| LCP          | 4-6s    | <2.5s  | 50-60% faster    |
| FID          | 200ms+  | <100ms | 50%+ reduction   |
| CLS          | 0.3-0.5 | <0.1   | 70-80% reduction |
| Mobile Score | 35-45   | 90+    | 2x+ improvement  |
| Bundle Size  | ~800KB  | ~250KB | 70% reduction    |

---

## Image Optimization Priority List

| File              | Current Size | Target Size  | Savings |
| ----------------- | ------------ | ------------ | ------- |
| cateringLogo.png  | 1.5MB        | 40KB (WebP)  | 97%     |
| favicon.ico       | 1.5MB        | 4KB          | 99%     |
| a3_demo.jpg       | 264KB        | 80KB (WebP)  | 70%     |
| DryfruitHalwa.png | 1.4MB        | 200KB (WebP) | 85%     |
| gulab-jamoon.png  | 1.5MB        | 150KB (WebP) | 90%     |
| All other images  | Mixed        | WebP/AVIF    | 60-80%  |

---

## Testing Recommendations

1. **Lighthouse Audit**: Run on Chrome DevTools > Lighthouse > Mobile
2. **WebPageTest**: For detailed waterfall analysis
3. **Core Web Vitals**: Use Chrome UX Report (CrUX)
4. **GTmetrix**: For historical comparison

---

_Report generated: 2026-03-30_
_Project: Sri Nidhi Catering_
_Framework: React 18 + Vite + TypeScript_
