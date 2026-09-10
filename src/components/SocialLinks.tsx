const links = [
  { label: "GitHub", href: "https://github.com/bahcia-design" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Email", href: "mailto:barbaracia.bc@gmail.com" },
];

export default function SocialLinks() {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-1 backdrop-blur-md">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
