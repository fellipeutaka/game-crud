import { ReactNode } from "react";

import Head from "next/head";

type SeoProps = {
  title: string;
  children: ReactNode;
};

export default function Seo({ title, children }: SeoProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
