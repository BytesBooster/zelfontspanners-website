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
              // AGGRESSIVE MODAL REMOVAL - RUNS IMMEDIATELY
              (function() {
                console.log('[MODAL-KILLER] Script loaded - removing all modals');
                
                function removeAllModals() {
                  // Remove by class names
                  const modalSelectors = [
                    '.modal',
                    '.modal-overlay',
                    '.modal-backdrop',
                    '[id*="modal"]',
                    '[id*="Modal"]',
                    '[class*="modal"]',
                    '[class*="Modal"]',
                    '.password-change-modal',
                    '#password-change-modal',
                    '.password-reset-modal',
                    '#password-reset-modal'
                  ];
                  
                  modalSelectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        const text = el.textContent || el.innerText || '';
                        if (text.includes('wachtwoord') || text.includes('Wachtwoord') || 
                            text.includes('wijzig') || text.includes('Wijzig') ||
                            text.includes('voor extra') || text.includes('beveiliging')) {
                          console.log('[MODAL-KILLER] Removing modal:', el);
                          el.remove();
                        }
                      });
                    } catch(e) {}
                  });
                  
                  // Remove overlays that block interaction
                  const overlays = document.querySelectorAll('div[style*="position: fixed"], div[style*="z-index"]');
                  overlays.forEach(overlay => {
                    const style = window.getComputedStyle(overlay);
                    const zIndex = parseInt(style.zIndex) || 0;
                    if (zIndex > 1000) {
                      const text = overlay.textContent || overlay.innerText || '';
                      if (text.includes('wachtwoord') || text.includes('Wachtwoord')) {
                        console.log('[MODAL-KILLER] Removing overlay:', overlay);
                        overlay.remove();
                      }
                    }
                  });
                }
                
                // Run immediately
                removeAllModals();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeAllModals);
                } else {
                  removeAllModals();
                }
                
                // Run continuously to catch dynamically added modals
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeType === 1) { // Element node
                        const text = node.textContent || node.innerText || '';
                        if ((text.includes('wachtwoord') || text.includes('Wachtwoord') || 
                             text.includes('wijzig') || text.includes('Wijzig') ||
                             text.includes('voor extra') || text.includes('beveiliging')) &&
                            (node.classList.contains('modal') || 
                             node.id && node.id.includes('modal') ||
                             node.querySelector && node.querySelector('.modal'))) {
                          console.log('[MODAL-KILLER] Removing dynamically added modal:', node);
                          node.remove();
                        }
                      }
                    });
                  });
                  removeAllModals();
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
                
                // Also run periodically as backup
                setInterval(removeAllModals, 100);
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
