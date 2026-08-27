/** Service Clarity: a welcoming local access screen makes the purpose and next action immediately clear. */
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "@/components/BrandMark";
import { useAppData } from "@/contexts/AppDataContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitting(true); window.setTimeout(() => { if (login(username, password)) { toast.success("Bienvenido a SIS Insight"); navigate("/encuestas-admin"); } else toast.error("Usuario o contraseña incorrectos."); setSubmitting(false); }, 240); };
  return <div className="login-page"><div className="login-intro"><BrandMark /><div><p className="kicker">Portal de servicio</p><h1>Escuche mejor.<br /><em>Actúe a tiempo.</em></h1><p>Un espacio claro para entender la experiencia de cada cliente y convertir sus opiniones en acciones de servicio.</p></div><div className="intro-points"><span>Encuestas simples</span><span>Seguimiento visible</span><span>Información local</span></div></div><section className="login-panel"><div className="login-card"><div className="login-symbol"><ShieldCheck size={23} /></div><p className="kicker">Acceso de demostración</p><h2>Ingrese a SIS Insight</h2><p className="login-copy">Utilice las credenciales de prueba para explorar el portal.</p><form onSubmit={submit}><label>Usuario<div className="form-control"><UserRound size={16} /><input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" placeholder="admin" required /></div></label><label>Contraseña<div className="form-control"><LockKeyhole size={16} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="••••••••" required /></div></label><button disabled={submitting} className="action-button" type="submit">{submitting ? "Ingresando…" : "Entrar al portal"}<ArrowRight size={17} /></button></form><div className="demo-credentials"><strong>Pruebe ahora</strong><span><code>admin</code> · <code>sis2026</code></span></div></div><p className="auth-note">DEMO AUTH ONLY · Sin autenticación real</p></section></div>;
}
