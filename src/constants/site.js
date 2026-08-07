export const SITE = {
  name: 'Corporación SIS',
  legalName: 'Corporación SIS',
  title: 'Corporación SIS | Seguridad estratégica',
  description:
    'Corporación SIS brinda soluciones institucionales de seguridad, monitoreo y protección especializada.',
  url: 'https://naguirrel0209.github.io/SISSAWebSite/',
  logoUrl: 'https://naguirrel0209.github.io/SISSAWebSite/images/brand/logo-sis.png',
  phone: '2323-0303',
  phoneHref: 'tel:23230303',
  email: 'recepcion@corporacionsis.com',
  emailHref: 'mailto:recepcion@corporacionsis.com',
  address: '14 Av A 6-68, Mixco, Guatemala',
};

export const NAV_ITEMS = [
  { label: 'Inicio', path: '/', end: true },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Oportunidades', path: '/oportunidades' },
  { label: 'Contacto', path: '/contacto' },
];

export const PAGE_META = {
  home: {
    title: `Inicio | ${SITE.name}`,
    description: SITE.description,
  },
  nosotros: {
    title: `Nosotros | ${SITE.name}`,
    description: 'Conozca el perfil institucional y la capacidad operativa de Corporación SIS',
  },
  servicios: {
    title: `Servicios | ${SITE.name}`,
    description:
      'Explore el Sistema Integral de Seguridad de Corporación SIS y sus medios humanos, técnicos y organizativos.',
  },
  contacto: {
    title: `Contacto | ${SITE.name}`,
    description: 'Consulte los canales institucionales de atención de Corporación SIS',
  },
  oportunidades: {
    title: `Oportunidades laborales | ${SITE.name}`,
    description: 'Conozca los beneficios y canales para consultar oportunidades laborales en Corporación SIS',
  },
  notFound: {
    title: `Página no encontrada | ${SITE.name}`,
    description: 'La página solicitada no está disponible.',
  },
};
