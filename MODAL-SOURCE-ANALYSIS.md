# Modal Source Analysis

## Problem
Password modals are appearing even though the codebase no longer uses modals. The modals show:
- "Wachtwoord Instellen Vereist" (Password Setup Required)
- "Wachtwoord Wijzigen" (Change Password)
- "Wijzig je wachtwoord voor extra veiligheid" (Change your password for extra security)

## Source Analysis

### ✅ Current Implementation (Correct)
- **No modal components exist** in the source code
- Password changes are handled via `/change-password` page (normal Next.js route)
- All password functionality uses React components, not modals

### ❌ Where Modals Are Coming From

The modals are **NOT** in the source code. They are coming from:

1. **Old Build Files** (`.next` directory)
   - Old JavaScript bundles that still contain modal code
   - These files are generated during build and may contain cached code
   - Location: `.next/static/chunks/` or `.next/server/`

2. **Browser Cache**
   - Old JavaScript files cached by the browser
   - Service workers may be serving old versions

3. **Server Build**
   - Old build files on the production server
   - Need to rebuild and redeploy to remove them

## Solution Implemented

### 1. Improved Modal-Killer Script (`app/layout.tsx`)
   - More aggressive detection of password modals
   - Checks for specific Dutch keywords
   - Removes modals based on:
     - Text content matching password-related keywords
     - Fixed/absolute positioning with high z-index
     - Modal-like styling
   - Runs immediately, on DOM ready, via MutationObserver, and periodically

### 2. Fixed Auth Hook (`lib/auth.ts`)
   - Prevents infinite loops by only updating state when values change
   - Uses refs to track state and prevent unnecessary re-renders
   - Only runs auth check once on mount

## How to Completely Remove Modals

### Step 1: Clean Build
```bash
# Remove old build files
rm -rf .next

# Rebuild
npm run build
```

### Step 2: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use incognito/private mode

### Step 3: Deploy Fresh Build
- Deploy the new build to the server
- Ensure old `.next` files are replaced

### Step 4: Verify
- Check browser console for `[MODAL-KILLER]` logs
- Modals should be removed immediately when detected
- If modals still appear, check Network tab to see which JS files are being loaded

## Files to Check

If modals persist, check these locations:

1. **Build Output**
   ```bash
   grep -r "Wachtwoord Instellen Vereist" .next/
   grep -r "PasswordResetModal" .next/
   ```

2. **Server Files**
   ```bash
   # On server
   cd /var/www/vhosts/zelfontspanners.nl/nodejs
   grep -r "Wachtwoord Instellen Vereist" .next/
   ```

3. **Browser Sources**
   - Open DevTools → Sources tab
   - Look for files containing modal code
   - Check which files are being loaded in Network tab

## Expected Behavior

✅ **Correct**: User is redirected to `/change-password` page when password reset is required
❌ **Wrong**: Modal appears asking for password change

The modal-killer script should catch and remove any modals that appear, but the root cause is old build files that need to be cleaned and rebuilt.

