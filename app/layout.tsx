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
              // DEBUG: Track where modals come from
              (function() {
                console.log('[DEBUG] Script loaded in layout.tsx');
                
                // Monitor DOM for modal creation
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                      if (node.nodeType === 1) { // Element node
                        const el = node;
                        const text = el.textContent || '';
                        const id = el.id || '';
                        const className = el.className || '';
                        
                        // Check if this looks like a password modal
                        if (text.includes('Wachtwoord Wijzigen') || 
                            text.includes('Wachtwoord Instellen Vereist') ||
                            text.includes('Wijzig je wachtwoord voor extra') ||
                            text.includes('voor extra beveiliging') ||
                            id.includes('password-change') ||
                            className.includes('password-change-modal')) {
                          
                          console.error('[DEBUG] PASSWORD MODAL DETECTED!');
                          console.error('[DEBUG] Element:', el);
                          console.error('[DEBUG] ID:', id);
                          console.error('[DEBUG] Class:', className);
                          console.error('[DEBUG] Text:', text.substring(0, 200));
                          console.error('[DEBUG] Parent:', el.parentElement);
                          console.error('[DEBUG] Stack trace:', new Error().stack);
                          
                          // Check which script created it
                          const scripts = document.querySelectorAll('script');
                          console.error('[DEBUG] Loaded scripts:', Array.from(scripts).map(s => s.src || 'inline'));
                        }
                      }
                    });
                  });
                });
                
                // Start observing
                if (document.body) {
                  observer.observe(document.body, { childList: true, subtree: true });
                } else {
                  document.addEventListener('DOMContentLoaded', () => {
                    observer.observe(document.body, { childList: true, subtree: true });
                  });
                }
                
                // Also check immediately
                setTimeout(() => {
                  const modals = document.querySelectorAll('*');
                  modals.forEach(el => {
                    const text = el.textContent || '';
                    if (text.includes('Wachtwoord Wijzigen') || 
                        text.includes('Wachtwoord Instellen Vereist') ||
                        text.includes('Wijzig je wachtwoord voor extra')) {
                      console.error('[DEBUG] EXISTING MODAL FOUND ON PAGE LOAD!');
                      console.error('[DEBUG] Element:', el);
                      console.error('[DEBUG] Source:', el.outerHTML.substring(0, 500));
                    }
                  });
                }, 1000);
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
