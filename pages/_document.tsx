import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head />
        <body className="bg-body font-body min-h-screen sm:overflow-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
