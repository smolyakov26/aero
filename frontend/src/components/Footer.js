export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-nav">
        <a href="/about">О нас</a>
        <a href="/programs">Программы</a>
        <a href="/pricing">Цены</a>
        <a href="/contact">Контакты</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Skybound Academy</p>
    </footer>
  );
}
