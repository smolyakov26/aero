import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="logo">Skybound Academy</div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О нас</a></li>
          <li><a href="/programs">Программы</a></li>
          <li><a href="/pricing">Цены</a></li>
          <li><a href="/contact" className="cta-nav">Контакты</a></li>
        </ul>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
