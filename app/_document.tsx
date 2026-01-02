import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // REMOVE ALL MODALS AND OVERLAYS - RUN BEFORE ANYTHING ELSE
              (function() {
                function cleanup() {
                  // Remove password modals
                  ['#password-change-modal', '.password-change-modal', '[id*="password-change"]', '[class*="password-change"]'].forEach(sel => {
                    try {
                      document.querySelectorAll(sel).forEach(el => el.remove());
                    } catch(e) {}
                  });
                  
                  // Remove blocking overlays
                  document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"]').forEach(el => {
                    const id = el.id || '';
                    const cls = el.className || '';
                    if (id.includes('password') || cls.includes('password') || cls.includes('modal')) {
                      el.remove();
                    }
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
                setInterval(cleanup, 50);
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
