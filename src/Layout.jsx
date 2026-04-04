import { Link } from "react-router-dom";
import "./GeneralStyles.css";
import ChatWidget from "./ChatWidget";
 
const navLinks = [
  { label: "Inicio",             to: "/",              classes: "button1 w-button1 w--current" },
  { label: "CV",                 to: "/cv",              classes: "button2 w-button" },
  { label: "Portfolio",          to: "/portfolio",              classes: "button3 w-button" },
  { label: "Sobre esta página",  to: "/infoweb",              classes: "button4 w-button" },
  { label: "Sobre el asistente", to: "/infoasistente", classes: "button5 w-button" },
  { label: "Contacto",           to: "/contacto",              classes: "button6 w-button" },
];
 
export default function Layout({ children }) {
  return (
    <div className="body">
      <div className="div-menubar">
        {navLinks.map(({ label, to, classes }) => (
          <Link key={label} to={to} className={classes}>
            {label}
          </Link>
        ))}
      </div>
      {children}
      <ChatWidget />
    </div>
  );
}
 