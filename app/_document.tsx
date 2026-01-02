import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // REMOVE ALL MODALS AND OVERLAYS - RUN BEFORE ANYTHING ELSE - AGGRESSIVE VERSION
              (function() {
                function cleanup() {
                  // Remove by text content
                  const texts = ['Wachtwoord Wijzigen', 'Wachtwoord Instellen Vereist', 'Wijzig je wachtwoord', 'Je wachtwoord is gereset'];
                  texts.forEach(text => {
                    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
                    let node;
                    while (node = walker.nextNode()) {
                      if (node.textContent && node.textContent.includes(text)) {
                        let parent = node.parentElement;
                        while (parent && parent !== document.body) {
                          const style = window.getComputedStyle(parent);
                          if ((style.position === 'fixed' || style.position === 'absolute') && parseInt(style.zIndex) >= 1000) {
                            parent.remove();
                            break;
                          }
                          parent = parent.parentElement;
                        }
                      }
                    }
                  });
                  
                  // Remove password modals
                  ['#password-change-modal', '.password-change-modal', '[id*="password-change"]', '[class*="password-change"]', '[id*="password-reset"]', '[class*="password-reset"]'].forEach(sel => {
                    try {
                      document.querySelectorAll(sel).forEach(el => el.remove());
                    } catch(e) {}
                  });
                  
                  // Remove blocking overlays
                  document.querySelectorAll('*').forEach(el => {
                    try {
                      const style = window.getComputedStyle(el);
                      const zIndex = parseInt(style.zIndex) || 0;
                      const position = style.position;
                      const text = el.textContent || '';
                      
                      if ((position === 'fixed' || position === 'absolute') && zIndex >= 1000) {
                        if (text.includes('Wachtwoord') || text.includes('wachtwoord') || text.includes('password')) {
                          el.remove();
                        }
                      }
                    } catch(e) {}
                  });
                  
                  // Enable clicks
                  if (document.body) {
                    document.body.style.pointerEvents = 'auto';
                    document.body.style.overflow = '';
                  }
                }
                
                cleanup();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', cleanup);
                }
                setInterval(cleanup, 25);
                new MutationObserver(cleanup).observe(document.documentElement, { childList: true, subtree: true });
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
