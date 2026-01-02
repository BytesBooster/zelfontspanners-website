import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // BLOCK PASSWORD CHANGE MODAL - REMOVE IMMEDIATELY
              (function() {
                function removePasswordModal() {
                  const selectors = [
                    '#password-change-modal',
                    '.password-change-modal',
                    '[id*="password-change"]',
                    '[class*="password-change-modal"]'
                  ];
                  
                  selectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        if (el) {
                          el.remove();
                          console.log('Removed password modal:', selector);
                        }
                      });
                    } catch(e) {}
                  });
                }
                
                // Run immediately
                removePasswordModal();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removePasswordModal);
                }
                
                // Run repeatedly to catch dynamically created modals
                setInterval(removePasswordModal, 100);
                
                // Watch for new elements
                const observer = new MutationObserver(removePasswordModal);
                if (document.body) {
                  observer.observe(document.body, { childList: true, subtree: true });
                } else {
                  document.addEventListener('DOMContentLoaded', () => {
                    observer.observe(document.body, { childList: true, subtree: true });
                  });
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

