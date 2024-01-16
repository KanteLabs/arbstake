import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Arb like a pro" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600&display=swap"
          rel="stylesheet"
        />

        <meta property="og:url" content="https://dex.zeta.markets/" />
        <meta property="og:title" content="Zeta Markets" />
        <meta
          property="og:description"
          content="Trade crypto like never before. Zeta lets you trade all your favorite assets at lightning speed without compromising security."
        />
        <meta property="og:image" content="https://dex.zeta.markets/card.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dex.zeta.markets/" />
        <meta property="twitter:title" content="Zeta Markets" />
        <meta
          property="twitter:description"
          content="Trade crypto like never before. Zeta lets you trade all your favorite assets at lightning speed without compromising security."
        />
        <meta
          property="twitter:image"
          content="https://dex.zeta.markets/card.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
