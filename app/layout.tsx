import '../styles.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'De Zelfontspanners',
  description: 'Ontdek de kunst van fotografie met ons',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // REMOVE ALL PASSWORD MODALS AND OVERLAYS IMMEDIATELY
              (function() {
                function removeAllModalsAndOverlays() {
                  // Remove password modals
                  const modalSelectors = [
                    '#password-change-modal',
                    '.password-change-modal',
                    '[id*="password-change"]',
                    '[class*="password-change-modal"]',
                    '[class*="password-change"]'
                  ];
                  
                  modalSelectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        if (el) {
                          el.remove();
                          console.log('Removed:', selector);
                        }
                      });
                    } catch(e) {}
                  });
                  
                  // Remove any overlays/backdrops that block clicks
                  const overlays = document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"], [style*="position: fixed"][style*="background"][style*="rgba"]');
                  overlays.forEach(overlay => {
                    const style = overlay.getAttribute('style') || '';
                    if (style.includes('z-index') && (style.includes('99999') || style.includes('100000'))) {
                      overlay.remove();
                      console.log('Removed blocking overlay');
                    }
                  });
                  
                  // Remove any elements with high z-index that might block
                  const highZIndex = document.querySelectorAll('[style*="z-index"]');
                  highZIndex.forEach(el => {
                    const style = el.getAttribute('style') || '';
                    const zIndexMatch = style.match(/z-index:\\s*(\\d+)/);
                    if (zIndexMatch && parseInt(zIndexMatch[1]) >= 9999) {
                      const id = el.id || '';
                      const className = el.className || '';
                      if (id.includes('password') || className.includes('password') || className.includes('modal')) {
                        el.remove();
                        console.log('Removed high z-index element');
                      }
                    }
                  });
                  
                  // Force enable pointer events on body
                  if (document.body) {
                    document.body.style.pointerEvents = 'auto';
                    document.body.style.overflow = '';
                  }
                  
                  // Remove any fixed overlays
                  const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
                  fixedElements.forEach(el => {
                    const style = el.getAttribute('style') || '';
                    const id = el.id || '';
                    const className = el.className || '';
                    if ((id.includes('password') || className.includes('password') || className.includes('modal')) && 
                        style.includes('background') && style.includes('rgba')) {
                      el.remove();
                      console.log('Removed fixed overlay');
                    }
                  });
                }
                
                // Run immediately
                removeAllModalsAndOverlays();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeAllModalsAndOverlays);
                }
                
                // Run repeatedly
                setInterval(removeAllModalsAndOverlays, 50);
                
                // Watch for new elements
                const observer = new MutationObserver(removeAllModalsAndOverlays);
                if (document.body) {
                  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
                } else {
                  document.addEventListener('DOMContentLoaded', () => {
                    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="dark-page">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
