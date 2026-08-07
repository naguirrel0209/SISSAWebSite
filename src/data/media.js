import oldOperationsCenterPhoto from '../../Recursos/8.jpeg';
import oldTrainingPhoto from '../../Recursos/20.jpeg';
import oldTechnologyPhoto from '../../Recursos/5.jpeg';
import oldVehiclePhoto from '../../Recursos/3.jpeg';
import logoSinFondo from '../../Recursos/logo_sinfondo_512.png';
import agenteFatigaTurno from '../../Recursos/agente_fatiga_turno.jpeg';
import guardiasCasual from '../../Recursos/guardias_casual.jpeg';
import guardiaYPatrulla from '../../Recursos/guardiaypatrulla.jpeg';
import patrullaEnRuta from '../../Recursos/patrullaenruta.jpeg';
import sisFachada from '../../Recursos/sisfachada1.jpeg';
import oficinasAdministrativas from '../../Recursos/oficinas_administrativas.jpeg';
import uniformeCasual from '../../Recursos/uniformecasual.jpeg';
import uniformeFatiga from '../../Recursos/uniformefatiga.jpeg';
import uniformeGala from '../../Recursos/uniformegala.jpeg';

export const brandLogo = logoSinFondo;

export const institutionalImages = {
  fachada: {
    src: sisFachada,
    alt: 'Instalaciones de Corporación SIS con personal institucional en el acceso principal.',
    objectPosition: 'center 44%',
  },
  oficinasAdministrativas: {
    src: oficinasAdministrativas,
    alt: 'Patio interior y oficinas administrativas de Corporación SIS',
    objectPosition: 'center center',
  },
  guardiaResidencial: {
    src: agenteFatigaTurno,
    alt: 'Agente de Corporación SIS en servicio de seguridad residencial e institucional.',
    objectPosition: 'center 30%',
  },
  guardiaPatrulla: {
    src: guardiaYPatrulla,
    alt: 'Agente operativo de Corporación SIS junto a unidad de patrullaje institucional.',
    objectPosition: 'center 28%',
  },
  guardiasCasual: {
    src: guardiasCasual,
    alt: 'Personal de Corporación SIS con uniforme casual institucional.',
    objectPosition: 'center 18%',
  },
  patrullaRuta: {
    src: patrullaEnRuta,
    alt: 'Unidad de patrullaje Corporación SIS en ruta operativa.',
    objectPosition: 'center 52%',
  },
  operaciones: {
    src: oldOperationsCenterPhoto,
    alt: 'Personal de Corporación SIS durante una jornada de coordinación y capacitación.',
    objectPosition: 'center 45%',
  },
  tecnologia: {
    src: oldTechnologyPhoto,
    alt: 'Personal de Corporación SIS durante práctica técnica de respuesta operacional.',
    objectPosition: 'center 42%',
  },
  entrenamiento: {
    src: oldTrainingPhoto,
    alt: 'Personal operativo de Corporación SIS frente a unidades institucionales.',
    objectPosition: 'center 35%',
  },
  vehiculo: {
    src: oldVehiclePhoto,
    alt: 'Vehículo institucional de Corporación SIS',
    objectPosition: 'center 48%',
  },
};

export const uniforms = {
  casual: {
    src: uniformeCasual,
    alt: 'Uniforme casual institucional de Corporación SIS',
    objectPosition: 'center 18%',
  },
  gala: {
    src: uniformeGala,
    alt: 'Uniforme de gala institucional de Corporación SIS',
    objectPosition: 'center 14%',
  },
  fatiga: {
    src: uniformeFatiga,
    alt: 'Uniforme de fatiga operativo de Corporación SIS',
    objectPosition: 'center 9%',
  },
};

export const serviceImages = {
  custodioRuta: institutionalImages.patrullaRuta,
  seguridadEjecutiva: institutionalImages.guardiaPatrulla,
  seguridadBancaria: uniforms.gala,
  seguridadResidencial: institutionalImages.guardiaResidencial,
  seguridadPrivada: institutionalImages.guardiasCasual,
  monitoreoCctv: institutionalImages.tecnologia,
  logisticaSegura: institutionalImages.vehiculo,
  capacitacion: institutionalImages.entrenamiento,
};
