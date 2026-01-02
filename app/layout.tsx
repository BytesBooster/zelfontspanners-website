import '../styles.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

// Generate build version for cache busting
const BUILD_VERSION = process.env.BUILD_VERSION || Date.now().toString()

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
        {/* Force no cache */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Build version for cache busting */}
        <meta name="build-version" content={BUILD_VERSION} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // ULTRA-AGGRESSIVE MODAL PREVENTION AND REMOVAL
              (function() {
                console.log('[MODAL-KILLER] Script loaded - preventing and removing all password modals');
                
                // Keywords that indicate password modals
                const passwordModalKeywords = [
                  'Wachtwoord Instellen Vereist',
                  'Wachtwoord Wijzigen',
                  'voor extra veiligheid',
                  'voor extra beveiliging',
                  'Wijzig je wachtwoord',
                  'wachtwoord instellen',
                  'wachtwoord wijzigen',
                  'Nieuw Wachtwoord',
                  'Bevestig Nieuw Wachtwoord',
                  'Huidige Wachtwoord',
                  'Huidig Wachtwoord',
                  'password reset',
                  'password change',
                  'password-reset',
                  'password-change'
                ];
                
                function isPasswordModal(element) {
                  if (!element || typeof element.textContent === 'undefined') return false;
                  
                  const text = (element.textContent || element.innerText || '').toLowerCase();
                  const hasPasswordKeyword = passwordModalKeywords.some(keyword => 
                    text.includes(keyword.toLowerCase())
                  );
                  
                  if (!hasPasswordKeyword) return false;
                  
                  // Check if it's positioned as a modal (fixed position, high z-index, or has modal-like styling)
                  try {
                    const style = window.getComputedStyle(element);
                    const zIndex = parseInt(style.zIndex) || 0;
                    const position = style.position;
                    const isFixed = position === 'fixed' || position === 'absolute';
                    const hasHighZIndex = zIndex > 50; // Lowered threshold
                    
                    // Also check parent elements
                    let parent = element.parentElement;
                    let parentIsModal = false;
                    while (parent && parent !== document.body) {
                      const parentStyle = window.getComputedStyle(parent);
                      const parentZIndex = parseInt(parentStyle.zIndex) || 0;
                      if (parentZIndex > 50 || parentStyle.position === 'fixed') {
                        parentIsModal = true;
                        break;
                      }
                      parent = parent.parentElement;
                    }
                    
                    return hasPasswordKeyword && (isFixed || hasHighZIndex || parentIsModal || 
                           element.classList.contains('modal') || 
                           element.id && element.id.includes('modal') ||
                           element.className && element.className.includes('modal'));
                  } catch(e) {
                    // If we can't check styles, assume it's a modal if it has password keywords
                    return hasPasswordKeyword;
                  }
                }
                
                function removeAllModals() {
                  // Method 1: Remove by selectors (more aggressive)
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
                    '#password-reset-modal',
                    '[id*="password"]',
                    '[class*="password"]'
                  ];
                  
                  modalSelectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        if (isPasswordModal(el)) {
                          console.log('[MODAL-KILLER] Removing modal by selector:', el);
                          el.remove();
                        }
                      });
                    } catch(e) {}
                  });
                  
                  // Method 2: Check ALL elements for password modal content
                  try {
                    const allElements = document.querySelectorAll('*');
                    allElements.forEach(el => {
                      if (isPasswordModal(el)) {
                        console.log('[MODAL-KILLER] Removing password modal:', el);
                        el.remove();
                      }
                    });
                  } catch(e) {}
                  
                  // Method 3: Remove backdrop/overlay elements (more aggressive)
                  const overlays = document.querySelectorAll('div[style*="position"], div[style*="z-index"], div[style*="fixed"], div[style*="absolute"]');
                  overlays.forEach(overlay => {
                    try {
                      const style = window.getComputedStyle(overlay);
                      const zIndex = parseInt(style.zIndex) || 0;
                      if (zIndex > 50) {
                        const text = (overlay.textContent || overlay.innerText || '').toLowerCase();
                        if (passwordModalKeywords.some(keyword => text.includes(keyword.toLowerCase()))) {
                          console.log('[MODAL-KILLER] Removing overlay:', overlay);
                          overlay.remove();
                        }
                      }
                    } catch(e) {}
                  });
                }
                
                // PREVENT modal creation by intercepting createElement
                const originalCreateElement = document.createElement.bind(document);
                document.createElement = function(tagName, options) {
                  const element = originalCreateElement(tagName, options);
                  
                  // Monitor for modal-like attributes
                  const originalSetAttribute = element.setAttribute.bind(element);
                  element.setAttribute = function(name, value) {
                    originalSetAttribute(name, value);
                    
                    // Check if this might be a password modal
                    if ((name === 'id' || name === 'class') && 
                        typeof value === 'string' && 
                        (value.includes('modal') || value.includes('password'))) {
                      setTimeout(() => {
                        if (isPasswordModal(element)) {
                          console.log('[MODAL-KILLER] Preventing modal creation:', element);
                          element.remove();
                        }
                      }, 0);
                    }
                  };
                  
                  return element;
                };
                
                // PREVENT appendChild for password modals
                const originalAppendChild = Node.prototype.appendChild;
                Node.prototype.appendChild = function(child) {
                  if (child && isPasswordModal(child)) {
                    console.log('[MODAL-KILLER] Preventing modal append:', child);
                    return child; // Don't actually append
                  }
                  return originalAppendChild.call(this, child);
                };
                
                // Run immediately
                removeAllModals();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeAllModals);
                } else {
                  removeAllModals();
                }
                
                // Run continuously to catch dynamically added modals
                function setupObserver() {
                  if (!document.body) {
                    // Body not ready yet, try again later
                    setTimeout(setupObserver, 50);
                    return;
                  }
                  
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                          if (isPasswordModal(node)) {
                            console.log('[MODAL-KILLER] Removing dynamically added modal:', node);
                            node.remove();
                          }
                          // Also check children immediately
                          if (node.querySelectorAll) {
                            node.querySelectorAll('*').forEach(child => {
                              if (isPasswordModal(child)) {
                                console.log('[MODAL-KILLER] Removing modal child:', child);
                                child.remove();
                              }
                            });
                          }
                        }
                      });
                    });
                    removeAllModals();
                  });
                  
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class', 'id', 'style']
                  });
                }
                
                // Setup observer when body is ready
                if (document.body) {
                  setupObserver();
                } else {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', setupObserver);
                  } else {
                    setTimeout(setupObserver, 50);
                  }
                }
                
                // Also run periodically as backup (very frequent)
                setInterval(removeAllModals, 25);
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
