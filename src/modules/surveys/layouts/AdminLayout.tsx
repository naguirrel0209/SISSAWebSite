/** Service Clarity: an understated sidebar and briefing header reduce wayfinding friction. */
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, ChevronRight, ClipboardCheck, LayoutDashboard, LogOut, Menu, RefreshCcw, Users, X } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "@/components/BrandMark";
import { useAppData } from "@/contexts/AppDataContext";

const navItems = [
  { href: "/encuestas-admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/encuestas-admin/clientes", label: "Clientes", icon: Users },
  { href: "/encuestas-admin/campanas", label: "Campañas", icon: ClipboardCheck },
  { href: "/encuestas-admin/resultados", label: "Resultados", icon: BarChart3 },
];

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  "/encuestas-admin": { title: "Resumen", subtitle: "Experiencia del Cliente" },
  "/encuestas-admin/clientes": { title: "Clientes", subtitle: "Directorio de cuentas" },
  "/encuestas-admin/campanas": { title: "Campañas", subtitle: "Encuestas e invitaciones" },
  "/encuestas-admin/resultados": { title: "Resultados", subtitle: "Opiniones y seguimiento" },
};

function Navigation({ close }: { close?: () => void }) {
  const { pathname } = useLocation();
  const { logout, resetDemo } = useAppData();
  const reset = () => {
    if (!window.confirm("¿Restablecer los datos de demostración? Los cambios locales actuales se reemplazarán.")) return;
    resetDemo(); toast.success("Datos de demostración restablecidos"); close?.();
  };
  return (
    <div className="nav-content">
      <Link to="/encuestas-admin" onClick={close} className="brand-link"><BrandMark /></Link>
      <div className="nav-section">
        <p>MENÚ</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/encuestas-admin" && pathname.startsWith(href));
          return <Link key={href} to={href} onClick={close} className={`nav-item ${active ? "nav-item-active" : ""}`}><Icon size={18} /><span>{label}</span>{active && <ChevronRight size={15} className="ml-auto" />}</Link>;
        })}
      </div>
      <div className="nav-bottom">
        <button onClick={reset} className="nav-item nav-utility"><RefreshCcw size={16} /><span>Restablecer demo</span></button>
        <div className="nav-user"><div className="user-avatar">AD</div><div><strong>Administrador</strong><span>Entorno local</span></div><button className="plain-icon" onClick={() => { logout(); toast.success("Sesión cerrada"); }} aria-label="Cerrar sesión"><LogOut size={17} /></button></div>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const section = sectionTitles[pathname] ?? { title: "SIS Insight", subtitle: "Experiencia del Cliente" };
  return (
    <div className="app-shell">
      <aside className="side-rail"><Navigation /></aside>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)}><aside className="mobile-side" onClick={(event) => event.stopPropagation()}><button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="close-menu"><X size={19} /></button><Navigation close={() => setMenuOpen(false)} /></aside></div>}
      <main className="workspace">
        <header className="workspace-header"><div className="header-title"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={20} /></button><div><p>{section.subtitle}</p><h1>{section.title}</h1></div></div><div className="header-status"><span />Datos locales protegidos</div></header>
        <div className="workspace-body">{children}</div>
      </main>
    </div>
  );
}
