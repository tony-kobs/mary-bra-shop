export default function HeaderSocials({ links }) {
  return (
    <ul className="nav-list">
      {links.map(({ href, icon: Icon, label }) => (
        <li className="nav-item" key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="nav-links"
            aria-label={label}
          >
            <Icon className="nav-icons" />
          </a>
        </li>
      ))}
    </ul>
  );
}
