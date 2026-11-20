import './style.css'

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} James Condos</p>
      <a className="footer-top" href="#home">Back to top</a>
    </footer>
  )
}
