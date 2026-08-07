import { Camera, ClipboardCheck, Fingerprint, UsersRound } from 'lucide-react';
import { institutionalImages } from './media.js';

export const securityMeans = [
  {
    id: 'medios-humanos',
    path: '/servicios/medios-humanos',
    code: '01',
    title: 'Medios humanos',
    shortTitle: 'Humanos',
    summary:
      'Guardias, vigilantes, custodios, patrullas y supervisores preparados para prevenir, disuadir y responder.',
    description:
      'Los medios humanos son la base operativa del sistema de seguridad. Permiten observar, evaluar, actuar y coordinar respuestas en campo conforme a funciones, protocolos y condiciones previamente definidas.',
    icon: UsersRound,
    image: institutionalImages.guardiasCasual,
    highlights: [
      'Presencia preventiva y disuasiva.',
      'Respuesta ante incidencias y situaciones de riesgo.',
      'Cumplimiento de normas, consignas y procedimientos.',
    ],
    sections: [
      {
        title: 'Guardias y vigilantes',
        description:
          'Personal asignado a instalaciones, residencias, comercios, industrias o instituciones para mantener vigilancia, control de accesos, rondas preventivas y atención inicial de eventos.',
        items: [
          'Seguridad y vigilancia operativa.',
          'Prevención, disuasión y respuesta.',
          'Gestión y cumplimiento de normas internas.',
        ],
      },
      {
        title: 'Custodios y patrullas',
        description:
          'Unidades orientadas al acompañamiento de rutas, resguardo de mercancías, patrullaje preventivo y apoyo operativo cuando el servicio requiere movilidad.',
        items: [
          'Escolta de mercancías y acompañamiento de rutas.',
          'Disuasión antes y durante el traslado.',
          'Geolocalización activa y resguardo ante fallas mecánicas.',
        ],
      },
      {
        title: 'Uniformes, armamento y capacitación',
        description:
          'La presentación, equipo y preparación del personal se alinean con los requisitos legales, la naturaleza del puesto y las políticas institucionales de Corporación SIS',
        items: [
          'Uniformes institucionales registrados ante la DIGESSP.',
          'Armamento asignado según el puesto, el riesgo y la normativa aplicable.',
          'Formación legal en Seguridad y Salud en el Trabajo, políticas y lineamientos internos.',
        ],
      },
      {
        title: 'Jornadas de servicio',
        description:
          'Los esquemas de trabajo se definen según la necesidad operativa, el puesto y el Plan de Trabajo anual aplicable.',
        items: [
          'Turnos rotativos de 24 horas de trabajo por 24 horas de descanso.',
          'Jornadas continuas o discontinuas de 12 horas.',
          'Esquemas específicos establecidos según el servicio contratado.',
        ],
      },
    ],
  },
  {
    id: 'medios-tecnicos-activos',
    path: '/servicios/medios-tecnicos-activos',
    code: '02',
    title: 'Medios técnicos activos',
    shortTitle: 'Técnicos activos',
    summary:
      'Tecnología que detecta, monitorea, analiza y alerta ante eventos o amenazas en tiempo real.',
    description:
      'Los medios técnicos activos fortalecen la observación y el control operacional. Funcionan como sistemas dinámicos capaces de registrar información, activar alertas y apoyar la toma de decisiones.',
    icon: Camera,
    image: institutionalImages.tecnologia,
    highlights: [
      'Detección temprana de eventos.',
      'Monitoreo y seguimiento técnico.',
      'Apoyo a la respuesta operativa.',
    ],
    sections: [
      {
        title: 'Cámaras inteligentes',
        description:
          'Soluciones de videovigilancia para hogares, comercios, empresas e instalaciones que requieren observación constante o evidencia visual.',
        items: [
          'Venta e instalación de videovigilancia.',
          'Configuración según condiciones del entorno.',
          'Apoyo visual para supervisión y verificación de eventos.',
        ],
      },
      {
        title: 'Sistemas de alarma',
        description:
          'Equipos orientados a detectar intrusiones, activar alertas y facilitar una reacción oportuna ante situaciones de riesgo.',
        items: [
          'Alarmas para comercios y residencias.',
          'Diseño de soluciones ajustadas a las necesidades de seguridad.',
          'Activación de alertas según el tipo de evento.',
        ],
      },
      {
        title: 'GPS y rastreo',
        description:
          'Herramientas de localización que permiten conocer la ubicación de vehículos, flotas o rutas durante la operación.',
        items: [
          'Venta, instalación y monitoreo de sistemas de rastreo.',
          'Ubicación en tiempo real para vehículos particulares y flotas comerciales.',
          'Apoyo al seguimiento de rutas y custodia de activos.',
        ],
      },
    ],
  },
  {
    id: 'medios-tecnicos-pasivos',
    path: '/servicios/medios-tecnicos-pasivos',
    code: '03',
    title: 'Medios técnicos pasivos',
    shortTitle: 'Técnicos pasivos',
    summary:
      'Elementos físicos que disuaden, retrasan, canalizan o bloquean el avance de una amenaza.',
    description:
      'Los medios técnicos pasivos reducen vulnerabilidades antes de que ocurra un incidente. Su función es fortalecer perímetros, ordenar accesos y dificultar acciones no autorizadas.',
    icon: Fingerprint,
    image: institutionalImages.fachada,
    highlights: [
      'Refuerzo del perímetro físico.',
      'Control del flujo de ingreso y salida.',
      'Disuasión y retardo ante accesos no autorizados.',
    ],
    sections: [
      {
        title: 'Control de accesos',
        description:
          'Medidas físicas y procedimentales para ordenar el ingreso y salida de personas, vehículos, visitantes y proveedores.',
        items: [
          'Organización del ingreso y salida de personas, vehículos y proveedores.',
          'Medidas adaptadas al flujo y nivel de exposición de cada instalación.',
          'Apoyo al cumplimiento de normas internas y protocolos de seguridad.',
        ],
      },
      {
        title: 'Protección perimetral',
        description:
          'Barreras y elementos físicos instalados para reducir puntos vulnerables y reforzar límites de seguridad.',
        items: [
          'Suministro e instalación de alambre de púas.',
          'Uso en postes de concreto, madera o estructuras metálicas.',
          'Barreras orientadas a disuadir y retardar accesos no autorizados.',
        ],
      },
    ],
  },
  {
    id: 'medios-organizativos',
    path: '/servicios/medios-organizativos',
    code: '04',
    title: 'Medios organizativos',
    shortTitle: 'Organizativos',
    summary:
      'Planes, procedimientos y controles que convierten recursos humanos y técnicos en una operación coordinada.',
    description:
      'Los medios organizativos establecen cómo debe funcionar el sistema de seguridad. Definen responsabilidades, protocolos, seguimiento y criterios de mejora para que cada recurso actúe con orden.',
    icon: ClipboardCheck,
    image: institutionalImages.oficinasAdministrativas,
    highlights: [
      'Planificación y análisis de riesgo.',
      'Protocolos de actuación y escalamiento.',
      'Supervisión, auditoría y mejora continua.',
    ],
    sections: [
      {
        title: 'Planificación integral',
        description:
          'Diseño de medidas coordinadas según el entorno, los riesgos, la exposición y los objetivos de protección del cliente.',
        items: [
          'Planes de seguridad integral.',
          'Análisis de riesgo.',
          'Planes de contingencia.',
        ],
      },
      {
        title: 'Control y seguimiento',
        description:
          'Procedimientos que permiten supervisar la ejecución, corregir desviaciones y mantener actualizado el dispositivo de seguridad.',
        items: [
          'Procedimientos de acceso.',
          'Auditorías de seguridad.',
          'Actualización de medidas según las condiciones de la operación.',
        ],
      },
    ],
  },
];

export function getSecurityMeanById(id) {
  return securityMeans.find((mean) => mean.id === id);
}
