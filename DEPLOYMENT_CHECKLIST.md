# Deployment Checklist - Recent Fixes

## Changes Made (Need Rebuild & Redeploy)

### 1. Certificate Text Visibility Fix ✓
**Files Modified:**
- `src/components/CertificationBook/ExpandableCertifications.tsx`
- `src/components/CertificationBook/ExpandableCertifications.css` (NEW FILE)

**What was fixed:**
- Certificate card text now shows BLACK in light theme
- Certificate card text shows WHITE in dark theme
- Hover state shows WHITE text for both themes
- Modal content has proper text colors for both themes

### 2. Mobile Navigation Z-Index Fix ✓
**Files Modified:**
- `src/components/Navigation/Navigation.css`

**What was fixed:**
- Mobile menu overlay: `z-index: 1100` (was 1000)
- Mobile menu backdrop: `z-index: 1050` (was 999)
- Hamburger button: `z-index: 1200` (was 1001)

**Result:** Mobile navigation menu now appears ABOVE all page content including hero section

### 3. Connect Page Icons Fix (Previous)
**Files Modified:**
- `src/pages/ConnectPage.tsx`
- `src/pages/ConnectPage.css`

**What was fixed:**
- Social icons now display as images instead of text paths
- Text colors fixed for light theme visibility

## How to Deploy

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Test Locally (Optional)
```bash
npm run preview
```

### Step 3: Deploy
Upload the contents of the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## Verification Checklist

After deployment, verify:

- [ ] Certificate cards show BLACK text in light theme
- [ ] Certificate cards show WHITE text in dark theme
- [ ] Certificate cards show WHITE text on hover (both themes)
- [ ] Mobile menu appears ABOVE hero section content
- [ ] Mobile menu appears ABOVE profile photo
- [ ] Hamburger button is always clickable
- [ ] Connect page icons display as images (not text paths)
- [ ] All text is visible in light theme

## Notes

- Changes are saved in the code but won't appear until you rebuild and redeploy
- Browser cache may need to be cleared to see changes
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
