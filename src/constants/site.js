export const SITE = {
  name: 'SIS S.A.',
  legalName: 'Corporación SIS',
  title: 'SIS S.A. | Seguridad estratégica',
  description:
    'SIS S.A. brinda soluciones institucionales de seguridad, monitoreo y protección especializada.',
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
  { label: 'Contacto', path: '/contacto' },
];

export const PAGE_META = {
  home: {
    title: SITE.title,
    description: SITE.description,
  },
  nosotros: {
    title: `Nosotros | ${SITE.name}`,
    description: 'Conozca el perfil institucional y la capacidad operativa de SIS S.A.',
  },
  servicios: {
    title: `Servicios | ${SITE.name}`,
    description: 'Explore las soluciones de seguridad y protección especializada de SIS S.A.',
  },
  contacto: {
    title: `Contacto | ${SITE.name}`,
    description: 'Consulte los canales institucionales de atención de SIS S.A.',
  },
  notFound: {
    title: `Página no encontrada | ${SITE.name}`,
    description: 'La página solicitada no está disponible.',
  },
};
