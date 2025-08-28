// FooterSection.tsx
import React from "react";

const footerData = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Developer API", href: "/api" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { icon: "👍", href: "https://facebook.com" },
  { icon: "🐦", href: "https://twitter.com" },
  { icon: "📸", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content sm:footer-horizontal">
      {footerData.map((col) => (
        <nav key={col.title}>
          <span className="footer-title">{col.title}</span>
          {col.links.map((link) => (
            <a key={link.href} href={link.href} className="link link-hover">
              {link.label}
            </a>
          ))}
        </nav>
      ))}

      <nav>
        <span className="footer-title">Connect with us</span>
        <div className="flex space-x-4">
          {socialLinks.map((soc, idx) => (
            <a key={idx} href={soc.href} className="link link-hover text-2xl">
              {soc.icon}
            </a>
          ))}
        </div>
      </nav>

      <div className="footer-center mt-4 sm:mt-0">
        <p>© {new Date().getFullYear()} SideTrack. All rights reserved.</p>
      </div>
    </footer>
  );
}
