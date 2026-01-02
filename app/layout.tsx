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
              // BLOCK ALL OLD MODAL CODE
              (function() {
                // Remove any password-change-modal elements immediately
                const removeModal = () => {
                  const modal = document.getElementById('password-change-modal') || 
                               document.querySelector('.password-change-modal') ||
                               document.querySelector('[class*="password-change"]');
                  if (modal) {
                    modal.remove();
                    console.log('Removed password-change-modal');
                  }
                };
                
                // Run immediately
                removeModal();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeModal);
                } else {
                  removeModal();
                }
                
                // Run after a delay to catch dynamically created modals
                setTimeout(removeModal, 100);
                setTimeout(removeModal, 500);
                setTimeout(removeModal, 1000);
                
                // Watch for dynamically added modals
                const observer = new MutationObserver(() => {
                  removeModal();
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
                
                // Override any functions that might show modals
                if (typeof window !== 'undefined') {
                  const originalCreateElement = document.createElement;
                  document.createElement = function(tagName) {
                    const element = originalCreateElement.call(this, tagName);
                    if (tagName.toLowerCase() === 'div') {
                      setTimeout(() => {
                        if (element.classList && (
                          element.classList.contains('password-change-modal') ||
                          element.id === 'password-change-modal'
                        )) {
                          element.remove();
                        }
                      }, 0);
                    }
                    return element;
                  };
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
