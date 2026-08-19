import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getPostLoginPath } from "@/lib/login";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "N5Deal Marketplace",
    template: "%s · N5Deal Marketplace",
  },
  description:
    "Преміальний B2B-майданчик для купівлі та продажу бізнесу й інвестиційних активів.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  const session = user
    ? {
        label:
          user.buyerProfile?.companyName ??
          user.sellerProfile?.companyName ??
          user.email,
        href: getPostLoginPath(user.role),
      }
    : null;

  return (
    <html lang="uk" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader session={session} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
