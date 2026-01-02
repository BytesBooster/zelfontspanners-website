import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        {/* Force no cache for all resources */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Cache busting version */}
        <meta name="build-version" content={Date.now().toString()} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
