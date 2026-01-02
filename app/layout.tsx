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
              // REMOVE ALL PASSWORD MODALS AND OVERLAYS IMMEDIATELY - AGGRESSIVE VERSION
              (function() {
                function removeAllModalsAndOverlays() {
                  // Remove by text content - find elements containing password modal text
                  const passwordModalTexts = [
                    'Wachtwoord Wijzigen',
                    'Wachtwoord Instellen Vereist',
                    'Wijzig je wachtwoord voor extra veiligheid',
                    'Je wachtwoord is gereset',
                    'Je moet een nieuw wachtwoord instellen',
                    'Huidige Wachtwoord',
                    'Bevestig Nieuw Wachtwoord'
                  ];
                  
                  // Find and remove elements containing these texts
                  passwordModalTexts.forEach(text => {
                    try {
                      const walker = document.createTreeWalker(
                        document.body || document.documentElement,
                        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                        null
                      );
                      
                      let node;
                      while (node = walker.nextNode()) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.includes(text)) {
                          let parent = node.parentElement;
                          // Go up the tree to find the modal container
                          while (parent && parent !== document.body) {
                            const style = window.getComputedStyle(parent);
                            const zIndex = style.zIndex;
                            const position = style.position;
                            const display = style.display;
                            
                            // If it's a modal-like element (fixed/absolute with high z-index or display flex/block)
                            if ((position === 'fixed' || position === 'absolute') && 
                                (parseInt(zIndex) >= 1000 || display === 'flex' || display === 'block')) {
                              // Check if it contains modal-like content
                              const hasModalContent = parent.textContent && (
                                parent.textContent.includes('Wachtwoord') || 
                                parent.textContent.includes('wachtwoord') ||
                                parent.textContent.includes('password')
                              );
                              
                              if (hasModalContent) {
                                parent.remove();
                                console.log('Removed modal by text content:', text);
                                break;
                              }
                            }
                            parent = parent.parentElement;
                          }
                        }
                      }
                    } catch(e) {}
                  });
                  
                  // Remove password modals by selectors
                  const modalSelectors = [
                    '#password-change-modal',
                    '.password-change-modal',
                    '[id*="password-change"]',
                    '[class*="password-change-modal"]',
                    '[class*="password-change"]',
                    '[id*="password-reset"]',
                    '[class*="password-reset"]',
                    '[id*="password-setup"]',
                    '[class*="password-setup"]'
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
                  const overlays = document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"], [style*="position: fixed"][style*="background"]');
                  overlays.forEach(overlay => {
                    const style = overlay.getAttribute('style') || '';
                    const computedStyle = window.getComputedStyle(overlay);
                    const zIndex = computedStyle.zIndex;
                    const position = computedStyle.position;
                    const bgColor = computedStyle.backgroundColor;
                    
                    if ((position === 'fixed' || position === 'absolute') && 
                        (parseInt(zIndex) >= 1000 || style.includes('z-index'))) {
                      const text = overlay.textContent || '';
                      if (text.includes('Wachtwoord') || text.includes('wachtwoord') || text.includes('password')) {
                        overlay.remove();
                        console.log('Removed blocking overlay with password text');
                      }
                    }
                  });
                  
                  // Remove any elements with high z-index that might block
                  const highZIndex = document.querySelectorAll('*');
                  highZIndex.forEach(el => {
                    try {
                      const style = window.getComputedStyle(el);
                      const zIndex = parseInt(style.zIndex) || 0;
                      const position = style.position;
                      
                      if ((position === 'fixed' || position === 'absolute') && zIndex >= 1000) {
                        const text = el.textContent || '';
                        const id = el.id || '';
                        const className = el.className || '';
                        
                        if (text.includes('Wachtwoord') || text.includes('wachtwoord') || 
                            text.includes('password') || id.includes('password') || 
                            className.includes('password') || className.includes('modal')) {
                          el.remove();
                          console.log('Removed high z-index password element');
                        }
                      }
                    } catch(e) {}
                  });
                  
                  // Force enable pointer events on body and html
                  if (document.body) {
                    document.body.style.pointerEvents = 'auto';
                    document.body.style.overflow = '';
                  }
                  if (document.documentElement) {
                    document.documentElement.style.pointerEvents = 'auto';
                    document.documentElement.style.overflow = '';
                  }
                  
                  // Remove any fixed overlays
                  const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
                  fixedElements.forEach(el => {
                    const text = el.textContent || '';
                    const id = el.id || '';
                    const className = el.className || '';
                    
                    if ((text.includes('Wachtwoord') || text.includes('wachtwoord') || 
                         text.includes('password') || id.includes('password') || 
                         className.includes('password') || className.includes('modal')) &&
                        (className.includes('modal') || id.includes('modal') || 
                         window.getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)')) {
                      el.remove();
                      console.log('Removed fixed password overlay');
                    }
                  });
                }
                
                // Run immediately
                removeAllModalsAndOverlays();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeAllModalsAndOverlays);
                }
                
                // Run repeatedly - very aggressive
                setInterval(removeAllModalsAndOverlays, 25);
                
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
