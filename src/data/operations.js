import {
  AlarmClock,
  BadgeCheck,
  BellRing,
  Building2,
  Camera,
  CarFront,
  ChartNoAxesCombined,
  ClipboardCheck,
  Crosshair,
  Fingerprint,
  Globe2,
  MapPinned,
  Network,
  RadioTower,
  ScanSearch,
  ShieldCheck,
  Siren,
  UsersRound,
  Waypoints,
} from 'lucide-react';
import { institutionalImages, uniforms } from './media.js';

const operationsHeroImage = institutionalImages.patrullaRuta;
const operationsHeroPhoto = operationsHeroImage.src;

export { operationsHeroImage, operationsHeroPhoto };

export const controlFunctions = [
  { label: 'Supervisión continua', icon: ScanSearch },
  { label: 'Gestión de eventos', icon: ClipboardCheck },
  { label: 'Coordinación operativa', icon: RadioTower },
  { label: 'Escalamiento de incidentes', icon: Siren },
  { label: 'Comunicación con unidades', icon: Network },
];

export const operationalCapabilities = [
  {
    title: 'Protección Física Institucional',
    description: 'Protección especializada para instalaciones corporativas, industriales, comerciales, financieras y residenciales.',
    icon: Building2,
  },
  {
    title: 'Protección Ejecutiva',
    description: 'Dispositivos de protección para ejecutivos, funcionarios y personas con exposición al riesgo.',
    icon: UsersRound,
  },
  {
    title: 'Custodia Estratégica de Activos',
    description: 'Protección de mercancías y activos durante su movilización.',
    icon: CarFront,
  },
  {
    title: 'Sistemas Integrados de Seguridad Electrónica',
    description: 'Integración de CCTV, alarmas, control de accesos y detección perimetral.',
    icon: Camera,
  },
  {
    title: 'Gestión de Respuesta Operacional',
    description: 'Coordinación inmediata de recursos ante incidentes.',
    icon: Siren,
  },
  {
    title: 'Investigación Corporativa',
    description: 'Investigaciones administrativas, laborales y corporativas.',
    icon: ScanSearch,
  },
  {
    title: 'Evaluaciones de Confiabilidad',
    description: 'Pruebas de polígrafo, investigaciones y verificación de antecedentes.',
    icon: Fingerprint,
  },
  {
    title: 'Gestión Integral del Riesgo',
    description: 'Análisis de amenazas, vulnerabilidades y planes de mitigación.',
    icon: ChartNoAxesCombined,
  },
];

export const operationalProcess = [
  'Recepción del requerimiento',
  'Evaluación técnica',
  'Diseño del dispositivo de seguridad',
  'Implementación',
  'Supervisión operacional',
  'Mejora continua',
];

export const infrastructure = [
  { label: 'Centro de Operaciones', icon: RadioTower },
  { label: 'Coordinación Operacional', icon: Waypoints },
  { label: 'Protocolos Estandarizados', icon: ClipboardCheck },
  { label: 'Personal Certificado', icon: BadgeCheck },
  { label: 'Cobertura Nacional', icon: Globe2 },
  { label: 'Tecnología Integrada', icon: Network },
];

export const technologies = [
  { label: 'Videovigilancia IP', icon: Camera },
  { label: 'Control de Accesos', icon: Fingerprint },
  { label: 'Analítica de Video', icon: ScanSearch },
  { label: 'GPS', icon: MapPinned },
  { label: 'Comunicación Operacional', icon: RadioTower },
  { label: 'Alarmas', icon: BellRing },
  { label: 'Sensores', icon: Crosshair },
  { label: 'Integración Electrónica', icon: Network },
];

export const commandChain = [
  { label: 'Cliente', icon: ShieldCheck },
  { label: 'Centro de Operaciones', icon: RadioTower },
  { label: 'Coordinador Operacional', icon: Waypoints },
  { label: 'Supervisor', icon: BadgeCheck },
  { label: 'Unidad Operativa', icon: UsersRound },
  { label: 'Retroalimentación', icon: AlarmClock },
];

export const gallery = [
  { category: 'Patrullaje Operativo', src: institutionalImages.guardiaPatrulla.src, alt: institutionalImages.guardiaPatrulla.alt, objectPosition: institutionalImages.guardiaPatrulla.objectPosition },
  { category: 'Ruta y Logística', src: institutionalImages.patrullaRuta.src, alt: institutionalImages.patrullaRuta.alt, objectPosition: institutionalImages.patrullaRuta.objectPosition },
  { category: 'Instalaciones', src: institutionalImages.fachada.src, alt: institutionalImages.fachada.alt, objectPosition: institutionalImages.fachada.objectPosition },
  { category: 'Personal Institucional', src: institutionalImages.guardiasCasual.src, alt: institutionalImages.guardiasCasual.alt, objectPosition: institutionalImages.guardiasCasual.objectPosition },
  { category: 'Uniforme de Fatiga', src: uniforms.fatiga.src, alt: uniforms.fatiga.alt, objectPosition: uniforms.fatiga.objectPosition },
  { category: 'Centro de Operaciones', src: institutionalImages.oficinasAdministrativas.src, alt: institutionalImages.oficinasAdministrativas.alt, objectPosition: institutionalImages.oficinasAdministrativas.objectPosition },
  { category: 'Tecnología', src: institutionalImages.tecnologia.src, alt: institutionalImages.tecnologia.alt, objectPosition: institutionalImages.tecnologia.objectPosition },
];
