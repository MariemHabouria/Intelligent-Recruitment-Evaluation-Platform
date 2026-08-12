// backend/prisma/seed-candidatures.ts


import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool    = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma  = new PrismaClient({ adapter });


// TYPES
interface EntretienSeed {
  type: 'RH' | 'TECHNIQUE' | 'DIRECTION';
  interviewerRole: string;
  offsetDays: number;
  heure: string;
  lieu: string;
  statut: 'PLANIFIE' | 'REALISE' | 'ANNULE';
  feedback?: string;
  evaluation?: number;
}

interface CandidatSeed {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cvUrl: string;
  cvTexte: string;
  scoreGlobal: number;
  scoreExp: number;
  competencesDetectees: string[];
  competencesManquantes: string[];
  statut: string;
  consentementRGPD: boolean;
  consentementIA: boolean;
  offreCible: string;
  ficheRenseignementEnvoyee?: boolean;
  ficheRenseignementRecue?: boolean;
  ficheRenseignementData?: object;
  entretiens?: EntretienSeed[];
}

interface MatchingInverseSeed {
  emailCandidat: string;
  offreCible: string;
  scoreGlobal: number;
  scoreExp: number;
}

// CANDIDATS (candidatures classiques)

const CANDIDATS: CandidatSeed[] = [
  {
    nom: 'Cherif', prenom: 'Mehdi', email: 'mehdi.cherif@gmail.com',
    telephone: '+216 50 100 111',
    cvUrl: '/uploads/cv/cherif_mehdi.pdf',
    cvTexte: `Directeur commercial avec 10 ans d'experience dans l'industrie pharmaceutique et la grande distribution en Tunisie et au Maghreb. Expert en negociation grands comptes, developpement reseau de distribution et management d'equipes commerciales (15 personnes). Succes mesurables : +32% CA sur 3 ans chez Sanofi Tunisie, ouverture de 4 nouveaux marches Afrique subsaharienne. Maitrise CRM Salesforce, force de vente terrain et digital selling. MBA Tunis Business School. Bilingue francais/arabe, anglais professionnel.`,
    scoreGlobal: 91, scoreExp: 90,
    competencesDetectees: ['Direction commerciale', 'Negociation grands comptes', 'CRM', 'Force de vente', 'Management commercial', 'Developpement business'],
    competencesManquantes: ['Revenue Management'],
    statut: 'ENTRETIEN',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Commercial',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '8 500 DT', disponibilite: 'Preavis 2 mois',
      mobilite: 'Tunis, Sfax', motivations: 'Rejoindre un groupe industriel solide avec une vision africaine.',
    },
    entretiens: [
      { type: 'RH', interviewerRole: 'DRH', offsetDays: -7, heure: '10:00', lieu: 'Siege Kilani — Salle RH', statut: 'REALISE', feedback: 'Profil tres solide, excellent parcours commercial pharma. A valider en entretien direction.', evaluation: 9 },
      { type: 'DIRECTION', interviewerRole: 'DGA', offsetDays: 3, heure: '14:00', lieu: 'Siege Kilani — Salle direction', statut: 'PLANIFIE' },
    ],
  },

  {
    nom: 'Ayari', prenom: 'Sarra', email: 'sarra.ayari@outlook.com',
    telephone: '+216 55 200 222',
    cvUrl: '/uploads/cv/ayari_sarra.pdf',
    cvTexte: `Directrice regionale des ventes (Tunisie Nord) dans le secteur pharmaceutique depuis 6 ans. Expertise en management d'une force de vente de 12 delegues medicaux, animation de reseaux de pharmacies et hopitaux. Certifiee en Digital Selling (HubSpot). Track record : croissance de +28% sur le secteur nord en 2 ans. Diplomee IHEC Tunis — Master Marketing.`,
    scoreGlobal: 84, scoreExp: 82,
    competencesDetectees: ['Direction commerciale', 'Force de vente', 'CRM', 'Management commercial'],
    competencesManquantes: ['Negociation grands comptes', 'Developpement business', 'Revenue Management'],
    statut: 'FICHE_ENVOYEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Commercial',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Ben Hamida', prenom: 'Khalil', email: 'khalil.benhamida@yahoo.fr',
    telephone: '+216 98 300 333',
    cvUrl: '/uploads/cv/benhamida_khalil.pdf',
    cvTexte: `Responsable grands comptes avec 8 ans d'experience en FMCG et parapharmacie. Specialiste en trade marketing et negociation avec les chaines de distribution. Diplome IHEC Carthage — MBA Marketing.`,
    scoreGlobal: 70, scoreExp: 75,
    competencesDetectees: ['Force de vente', 'Negociation grands comptes', 'CRM'],
    competencesManquantes: ['Direction commerciale', 'Management commercial', 'Revenue Management', 'Developpement business'],
    statut: 'REFUSEE',
    consentementRGPD: true, consentementIA: false,
    offreCible: 'Directeur Commercial',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Khadhraoui', prenom: 'Anis', email: 'anis.khadhraoui@business-dev.tn',
    telephone: '+216 50 999 009',
    cvUrl: '/uploads/cv/khadhraoui_anis.pdf',
    cvTexte: `Directeur commercial avec 9 ans d'experience dans la distribution pharmaceutique et la parapharmacie en Tunisie, Algerie et Libye. Management d'une force de vente de 20 delegues. Expert en developpement de reseaux de distribution, CRM et Revenue Management. Diplome EM Lyon Business School.`,
    scoreGlobal: 88, scoreExp: 87,
    competencesDetectees: ['Direction commerciale', 'Force de vente', 'Negociation grands comptes', 'CRM', 'Developpement business', 'Management commercial', 'Revenue Management'],
    competencesManquantes: ['Digital selling'],
    statut: 'PRESELECTIONNEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Commercial',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Marzouki', prenom: 'Leila', email: 'leila.marzouki@kilani-ext.tn',
    telephone: '+216 52 400 444',
    cvUrl: '/uploads/cv/marzouki_leila.pdf',
    cvTexte: `Dirigeante avec 15 ans d'experience en management de groupe en Tunisie et en France. Ex-DGA d'un groupe agroalimentaire cote en bourse (CA 280M DT). Expertise en gouvernance, strategie groupe, relations institutionnelles et expansion internationale (Afrique de l'Ouest). MBA HEC Paris.`,
    scoreGlobal: 95, scoreExp: 95,
    competencesDetectees: ['Direction generale', 'Strategie groupe', 'Gouvernance', 'Management senior', 'Finance groupe', 'Relations institutionnelles', 'Expansion internationale'],
    competencesManquantes: [],
    statut: 'ACCEPTEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Général Adjoint',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '18 000 DT', disponibilite: 'Immediate',
      mobilite: 'Tunis — deplacements internationaux acceptes',
      motivations: "Contribuer a l'expansion africaine du groupe Kilani.",
    },
    entretiens: [
      { type: 'RH', interviewerRole: 'DRH', offsetDays: -21, heure: '09:00', lieu: 'Siege Kilani — Salle RH', statut: 'REALISE', feedback: 'Profil exceptionnel. Parcours international parfaitement aligne avec les ambitions du groupe.', evaluation: 10 },
      { type: 'DIRECTION', interviewerRole: 'DG', offsetDays: -14, heure: '11:00', lieu: 'Siege Kilani — Bureau DG', statut: 'REALISE', feedback: 'Entretien tres positif. Offre transmise et acceptee.', evaluation: 10 },
    ],
  },

  {
    nom: 'Karray', prenom: 'Slim', email: 'slim.karray@consulting.tn',
    telephone: '+216 98 500 555',
    cvUrl: '/uploads/cv/karray_slim.pdf',
    cvTexte: `Directeur general adjoint dans le secteur de la sante avec 12 ans d'experience. Expertise en transformation organisationnelle, developpement de partenariats strategiques et management d'equipes pluridisciplinaires (500+ collaborateurs). Diplome Polytechnique Tunis + Executive MBA INSEAD.`,
    scoreGlobal: 89, scoreExp: 88,
    competencesDetectees: ['Direction generale', 'Strategie groupe', 'Gouvernance', 'Management senior', 'Finance groupe'],
    competencesManquantes: ['Relations institutionnelles', 'Expansion internationale'],
    statut: 'FICHE_RECUE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Général Adjoint',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '15 000 DT', disponibilite: 'Preavis 3 mois',
      mobilite: 'Grand Tunis', motivations: 'Rejoindre un groupe pharmaceutique en forte croissance.',
    },
    entretiens: [
      { type: 'RH', interviewerRole: 'DRH', offsetDays: -10, heure: '10:00', lieu: 'Siege Kilani — Salle RH', statut: 'REALISE', feedback: 'Tres bon profil. Legerement en retrait sur le volet international.', evaluation: 8 },
    ],
  },

  {
    nom: 'Laabidi', prenom: 'Hajer', email: 'hajer.laabidi@strategie.tn',
    telephone: '+216 52 010 010',
    cvUrl: '/uploads/cv/laabidi_hajer.pdf',
    cvTexte: `Dirigeante avec 13 ans d'experience en direction generale et gouvernance d'entreprise. DGA d'un groupe de distribution tunisien (CA 150M DT, 700 collaborateurs). Expertise en strategie groupe, restructuration, finance et relations avec les actionnaires. Conseil d'administration de 2 societes. MBA Northwestern Kellogg.`,
    scoreGlobal: 87, scoreExp: 86,
    competencesDetectees: ['Direction generale', 'Strategie groupe', 'Gouvernance', 'Management senior', 'Finance groupe', 'Relations institutionnelles'],
    competencesManquantes: ['Expansion internationale', 'M&A'],
    statut: 'FICHE_ENVOYEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Directeur Général Adjoint',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Trabelsi', prenom: 'Fathi', email: 'fathi.trabelsi@pharma-ind.tn',
    telephone: '+216 50 600 666',
    cvUrl: '/uploads/cv/trabelsi_fathi.pdf',
    cvTexte: `Ingenieur chimiste avec 9 ans d'experience en production pharmaceutique (formes seches et liquides). Responsable de production dans une entreprise pharmaceutique tunisienne (500 employes). Maitrise des BPF, du Lean Manufacturing et des indicateurs industriels KPI. Habilitation ANSM (France). Certifie Six Sigma Green Belt.`,
    scoreGlobal: 88, scoreExp: 87,
    competencesDetectees: ['Management equipe', 'Planification production', 'BPF', 'Lean Manufacturing', 'KPI industriels', 'Six Sigma'],
    competencesManquantes: ['ERP SAP', 'Validation procedes'],
    statut: 'ENTRETIEN',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Responsable Production Pharma',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '7 000 DT', disponibilite: 'Preavis 1 mois',
      mobilite: 'Tunis, Sousse', motivations: "Integrer le groupe leader en Tunisie pour un poste a plus grande responsabilite.",
    },
    entretiens: [
      { type: 'RH', interviewerRole: 'DRH', offsetDays: -5, heure: '09:30', lieu: 'Siege Kilani — Salle RH', statut: 'REALISE', feedback: 'Profil technique solide. BPF et Lean tres pertinents. Competences SAP a confirmer.', evaluation: 8 },
      { type: 'TECHNIQUE', interviewerRole: 'MANAGER', offsetDays: 2, heure: '10:00', lieu: 'Site industriel Kilani — Salle technique', statut: 'PLANIFIE' },
    ],
  },

  {
    nom: 'Bouzid', prenom: 'Amira', email: 'amira.bouzid@gmail.com',
    telephone: '+216 55 700 777',
    cvUrl: '/uploads/cv/bouzid_amira.pdf',
    cvTexte: `Pharmacienne industrielle, 7 ans en production et assurance qualite. Responsable de ligne dans un laboratoire generique tunisien. Expertise BPF, gestion des deviations, qualification des equipements et validation des procedes. Diplomee Faculte de Pharmacie de Monastir.`,
    scoreGlobal: 80, scoreExp: 79,
    competencesDetectees: ['Management equipe', 'BPF', 'Planification production', 'Validation procedes'],
    competencesManquantes: ['Lean Manufacturing', 'KPI industriels', 'ERP SAP'],
    statut: 'FICHE_RECUE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Responsable Production Pharma',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '6 000 DT', disponibilite: 'Preavis 1 mois',
      mobilite: 'Tunis, Bizerte', motivations: 'Evolution vers un poste de responsabilite production.',
    },
    
  },

  {
    nom: 'Sfaxi', prenom: 'Nawel', email: 'nawel.sfaxi@outlook.com',
    telephone: '+216 50 333 003',
    cvUrl: '/uploads/cv/sfaxi_nawel.pdf',
    cvTexte: `Ingenieure en genie industriel, 6 ans en production pharmaceutique. Responsable de ligne de conditionnement secondaire (formes seches). Pilote du deploiement Lean dans son unite : reduction des rebuts de 40%. Maitrise SAP PP/QM et indicateurs OEE/TRS. Diplomee ENIM Monastir.`,
    scoreGlobal: 82, scoreExp: 80,
    competencesDetectees: ['Planification production', 'BPF', 'Lean Manufacturing', 'KPI industriels', 'ERP SAP', 'Management equipe'],
    competencesManquantes: ['Six Sigma', 'Validation procedes'],
    statut: 'PRESELECTIONNEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Responsable Production Pharma',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },

  {

  nom: 'Gharbi', prenom: 'Karim', email: 'karim.gharbi@dev.tn',
  telephone: '+216 50 800 888',
  cvUrl: '/uploads/cv/gharbi_karim.pdf',
  cvTexte: `Developpeur Full Stack avec 6 ans d'experience. Stack principale : React, Node.js, TypeScript, PostgreSQL, Docker. Experience en architecture microservices, CI/CD GitLab, et deploiement cloud Azure. Developpeur senior dans une startup fintech tunisienne. A initie et deploye un module de scoring credit base sur Python et Scikit-Learn en production, en collaboration avec l'equipe data. Contribue a des projets open-source. Certifie AWS Solutions Architect. Diplome ENIT Tunis.`,
  scoreGlobal: 93, scoreExp: 90,
  competencesDetectees: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST API', 'Docker', 'CI/CD', 'Python', 'Scikit-Learn'],
  competencesManquantes: ['FastAPI', 'GraphQL', 'Redis'],
    statut: 'FICHE_RECUE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: true,
    ficheRenseignementData: {
      pretentionsSalariales: '4 500 DT', disponibilite: 'Preavis 1 mois',
      mobilite: 'Tunis', motivations: 'Rejoindre un groupe structure pour un projet a fort impact technique.',
    },
    entretiens: [
      { type: 'RH', interviewerRole: 'DRH', offsetDays: -3, heure: '10:00', lieu: 'Siege Kilani — Salle RH', statut: 'REALISE', feedback: 'Bon profil senior. Stack alignee. Entretien technique a planifier.', evaluation: 8 },
    ],
  },

  {
    nom: 'Boukadida', prenom: 'Sonia', email: 'sonia.boukadida@outlook.com',
    telephone: '+216 55 900 999',
    cvUrl: '/uploads/cv/boukadida_sonia.pdf',
    cvTexte: `Developpeuse Full Stack avec 4 ans d'experience. Maitrise React, Node.js, PostgreSQL et REST API. Experience en developpement d'applications metier et de tableaux de bord analytiques. Diplomee ESPRIT Tunis. Interet pour le developpement IA et les microservices Python.`,
    scoreGlobal: 75, scoreExp: 72,
    competencesDetectees: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST API'],
    competencesManquantes: ['Python', 'FastAPI', 'Docker', 'CI/CD', 'GraphQL', 'Redis'],
    statut: 'PRESELECTIONNEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },

  {
  nom: 'Haddad', prenom: 'Mehdi', email: 'mehdi.haddad@dev-freelance.tn',
  telephone: '+216 55 444 004',
  cvUrl: '/uploads/cv/haddad_mehdi.pdf',
  cvTexte: `Developpeur Full Stack freelance avec 5 ans d'experience sur des projets varies (e-commerce, ERP PME, applications SaaS). Stack : React, Vue.js, Node.js, Python, PostgreSQL, MongoDB. Maitrise Docker, Kubernetes, pipelines CI/CD GitLab/GitHub Actions. A developpe un pipeline FastAPI de classification de tickets support avec Scikit-Learn et Pandas pour un client SaaS. Certifie Google Cloud Professional.`,
  scoreGlobal: 85, scoreExp: 83,
  competencesDetectees: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST API', 'Python', 'Docker', 'CI/CD', 'MongoDB', 'GraphQL', 'FastAPI', 'Scikit-Learn', 'Pandas'],
  competencesManquantes: ['Redis'],
    statut: 'FICHE_ENVOYEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
    ficheRenseignementEnvoyee: true,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Romdhani', prenom: 'Aziz', email: 'aziz.romdhani@data-science.tn',
    telephone: '+216 52 777 007',
    cvUrl: '/uploads/cv/romdhani_aziz.pdf',
    cvTexte: `Ingenieur en Data Science et Machine Learning avec 4 ans d'experience. Specialise NLP, classification de textes et systemes de recommandation. Stack : Python, TensorFlow, Scikit-Learn, spaCy, Pandas, FastAPI. Experience en deploiement de modeles via Docker et API REST. A travaille sur des projets de scoring credit et d'analyse semantique de documents. Diplome ENSI Tunis — Master Data Science.`,
    scoreGlobal: 90, scoreExp: 88,
    competencesDetectees: ['Python', 'TensorFlow', 'Scikit-Learn', 'spaCy', 'FastAPI', 'SHAP', 'Pandas', 'NLP', 'Docker', 'MongoDB'],
    competencesManquantes: ['React', 'PostgreSQL', 'Agile SCRUM'],
    statut: 'PRESELECTIONNEE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Ingénieur IA / Machine Learning',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },

  {
    nom: 'Ben Salah', prenom: 'Ines', email: 'ines.bensalah@gmail.com',
    telephone: '+216 52 111 001',
    cvUrl: '/uploads/cv/bensalah_ines.pdf',
    cvTexte: `Data Analyst avec 3 ans d'experience. Maitrise Python (Pandas, Scikit-Learn), SQL et Power BI. Experience en modelisation predictive et visualisation de donnees pour des clients du secteur bancaire. Diplomee en statistiques appliquees — FSS Tunis.`,
    scoreGlobal: 72, scoreExp: 68,
    competencesDetectees: ['Python', 'Pandas', 'Scikit-Learn', 'NLP'],
    competencesManquantes: ['TensorFlow', 'spaCy', 'FastAPI', 'SHAP', 'Docker'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Ingénieur IA / Machine Learning',
    ficheRenseignementEnvoyee: false,
    ficheRenseignementRecue: false,
  },
  // ── Cas de test classification S3 (pool n=10 sur "Developpeur Full Stack") ──

  {
    nom: 'Jendoubi', prenom: 'Yassine', email: 'yassine.jendoubi@test-classif.tn',
    telephone: '+216 50 111 201',
    cvUrl: '/uploads/cv/jendoubi_yassine.pdf',
    cvTexte: `Developpeur Full Stack senior avec 8 ans d'experience. Expert React, Node.js, TypeScript, PostgreSQL, Docker, Kubernetes. Architecte de solutions microservices a grande echelle. Contributeur open-source reconnu.`,
    scoreGlobal: 95, scoreExp: 92,
    competencesDetectees: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'CI/CD', 'GraphQL'],
    competencesManquantes: ['Python'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Chaouch', prenom: 'Meriem', email: 'meriem.chaouch@test-classif.tn',
    telephone: '+216 50 111 202',
    cvUrl: '/uploads/cv/chaouch_meriem.pdf',
    cvTexte: `Developpeuse Full Stack, 6 ans d'experience. React, Node.js, PostgreSQL, Docker, CI/CD GitLab. Bonne maitrise des tests automatises.`,
    scoreGlobal: 90, scoreExp: 87,
    competencesDetectees: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
    competencesManquantes: ['Python', 'GraphQL'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Nasri', prenom: 'Walid', email: 'walid.nasri@test-classif.tn',
    telephone: '+216 50 111 203',
    cvUrl: '/uploads/cv/nasri_walid.pdf',
    cvTexte: `Developpeur Full Stack, 5 ans d'experience. React, Node.js, TypeScript, MongoDB. Experience en applications SaaS B2B.`,
    scoreGlobal: 82, scoreExp: 79,
    competencesDetectees: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    competencesManquantes: ['PostgreSQL', 'Docker', 'CI/CD'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Belkhiria', prenom: 'Rania', email: 'rania.belkhiria@test-classif.tn',
    telephone: '+216 50 111 204',
    cvUrl: '/uploads/cv/belkhiria_rania.pdf',
    cvTexte: `Developpeuse Full Stack junior-confirmee, 4 ans d'experience. Vue.js, Node.js, PostgreSQL. Bonne base technique, en cours de montee en competences sur Docker.`,
    scoreGlobal: 78, scoreExp: 74,
    competencesDetectees: ['Node.js', 'PostgreSQL', 'REST API'],
    competencesManquantes: ['React', 'Docker', 'CI/CD'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Ferjani', prenom: 'Bilel', email: 'bilel.ferjani@test-classif.tn',
    telephone: '+216 50 111 205',
    cvUrl: '/uploads/cv/ferjani_bilel.pdf',
    cvTexte: `Developpeur Full Stack, 3 ans d'experience. React, Node.js. Premiere experience professionnelle en agence web.`,
    scoreGlobal: 70, scoreExp: 66,
    competencesDetectees: ['React', 'Node.js'],
    competencesManquantes: ['PostgreSQL', 'Docker', 'CI/CD', 'TypeScript'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Zayani', prenom: 'Chaima', email: 'chaima.zayani@test-classif.tn',
    telephone: '+216 50 111 206',
    cvUrl: '/uploads/cv/zayani_chaima.pdf',
    cvTexte: `Developpeuse Full Stack, 3 ans d'experience. JavaScript, Node.js, MySQL. Profil polyvalent, formation continue en cours.`,
    scoreGlobal: 65, scoreExp: 60,
    competencesDetectees: ['Node.js', 'MySQL'],
    competencesManquantes: ['React', 'PostgreSQL', 'Docker', 'TypeScript'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Mahjoub', prenom: 'Oussama', email: 'oussama.mahjoub@test-classif.tn',
    telephone: '+216 50 111 207',
    cvUrl: '/uploads/cv/mahjoub_oussama.pdf',
    cvTexte: `Developpeur junior, 2 ans d'experience. JavaScript, PHP, MySQL. En reconversion vers la stack React/Node.`,
    scoreGlobal: 60, scoreExp: 55,
    competencesDetectees: ['JavaScript', 'MySQL'],
    competencesManquantes: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Grissa', prenom: 'Selim', email: 'selim.grissa@test-classif.tn',
    telephone: '+216 50 111 208',
    cvUrl: '/uploads/cv/grissa_selim.pdf',
    cvTexte: `Developpeur junior, 2 ans d'experience. HTML/CSS, JavaScript, notions Node.js. Profil autodidacte motive.`,
    scoreGlobal: 60, scoreExp: 54,
    competencesDetectees: ['JavaScript'],
    competencesManquantes: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Ouali', prenom: 'Hend', email: 'hend.ouali@test-classif.tn',
    telephone: '+216 50 111 209',
    cvUrl: '/uploads/cv/ouali_hend.pdf',
    cvTexte: `Developpeuse debutante, 1 an d'experience. Notions HTML/CSS/JavaScript. Sortie recente d'un bootcamp dev web.`,
    scoreGlobal: 47, scoreExp: 40,
    competencesDetectees: ['JavaScript'],
    competencesManquantes: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript', 'CI/CD'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },

  {
    nom: 'Sassi', prenom: 'Marouane', email: 'marouane.sassi@test-classif.tn',
    telephone: '+216 50 111 210',
    cvUrl: '/uploads/cv/sassi_marouane.pdf',
    cvTexte: `Candidat en reconversion professionnelle, sans experience en developpement. Formation en cours (MOOC).`,
    scoreGlobal: 38, scoreExp: 20,
    competencesDetectees: [],
    competencesManquantes: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript', 'CI/CD'],
    statut: 'NOUVELLE',
    consentementRGPD: true, consentementIA: true,
    offreCible: 'Développeur Full Stack',
  },
];
// CANDIDATURES MATCHING INVERSE 
const MATCHING_INVERSE: MatchingInverseSeed[] = [
  {
    emailCandidat: 'karim.gharbi@dev.tn',
    offreCible:    'Ingénieur IA / Machine Learning',
    scoreGlobal:   79,
    scoreExp:      77,
  },
  {
    emailCandidat: 'mehdi.haddad@dev-freelance.tn',
    offreCible:    'Ingénieur IA / Machine Learning',
    scoreGlobal:   76,
    scoreExp:      74,
  },
  {
    emailCandidat: 'anis.khadhraoui@business-dev.tn',
    offreCible:    'Directeur Général Adjoint',
    scoreGlobal:   71,
    scoreExp:      73,
  },
];
// HELPERS

const getOffreByIntitule = async (intitule: string) =>
  prisma.offreEmploi.findFirst({
    where: { intitule: { contains: intitule, mode: 'insensitive' }, statut: 'PUBLIEE' },
  });

let refCounter = 0;
const generateReference = async (): Promise<string> => {
  const year = new Date().getFullYear();
  if (refCounter === 0) {
    refCounter = await prisma.candidature.count();
  }
  refCounter++;
  return `CAND-${year}-${String(refCounter).padStart(4, '0')}`;
};

const d = (days: number) => { const r = new Date(); r.setDate(r.getDate() + days); return r; };

// Verification des regles de flux
const isValidStatutForEntretiens = (statut: string, hasEntretiens: boolean): boolean => {
  if (!hasEntretiens) return true;
  const allowedForEntretiens = ['FICHE_RECUE', 'ENTRETIEN'];
  return allowedForEntretiens.includes(statut);
};

async function main() {
  console.log('--------------------------------------------------------------------');
  console.log('  KILANI GROUPE — Seed Candidatures v5 (flux corrige + creneaux)');
  console.log('--------------------------------------------------------------------');
  await prisma.$connect();

  // Nettoyage (on NE touche PAS DisponibiliteInterviewer : gere par seed-demandes.ts)
  console.log('\n[1/4] Nettoyage...');
  await prisma.entretien.deleteMany({});
  await prisma.candidature.deleteMany({});
  refCounter = 0;
  console.log('   Supprime : candidatures et entretiens');

  // Offres disponibles
  console.log('\n[2/4] Offres publiees detectees :');
  const offresPubliees = await prisma.offreEmploi.findMany({ where: { statut: 'PUBLIEE' } });
  for (const o of offresPubliees) console.log(`   * ${o.reference} : ${o.intitule}`);

  const drh      = await prisma.user.findFirstOrThrow({ where: { role: 'DRH' } });
  const dga      = await prisma.user.findFirstOrThrow({ where: { role: 'DGA' } });
  const dg       = await prisma.user.findFirstOrThrow({ where: { role: 'DG'  } });
  const managers = await prisma.user.findMany({ where: { role: 'MANAGER' } });

  const getInterviewer = (role: string) => {
    if (role === 'DRH')     return drh;
    if (role === 'DGA')     return dga;
    if (role === 'DG')      return dg;
    if (role === 'MANAGER') return managers[0];
    return drh;
  };

  // Candidatures classiques
  console.log('\n[3/4] Creation des candidatures classiques...\n');
  const now = new Date();

  for (const c of CANDIDATS) {
    const offre = await getOffreByIntitule(c.offreCible);

    if (!offre) {
      console.log(`   IGNORE  | ${c.prenom.padEnd(10)} ${c.nom.padEnd(15)} (offre "${c.offreCible}" non publiee)`);
      continue;
    }

    // Verifier la coherence du flux
    const hasEntretiens = c.entretiens && c.entretiens.length > 0;
    if (!isValidStatutForEntretiens(c.statut, hasEntretiens)) {
      console.log(`   ERREUR DE FLUX | ${c.prenom} ${c.nom} : statut "${c.statut}" incompatible avec ${hasEntretiens ? 'entretiens presents' : 'absence d entretiens'}`);
      continue;
    }

    if (c.statut === 'ENTRETIEN' && (!hasEntretiens || c.entretiens?.length === 0)) {
      console.log(`   ERREUR DE FLUX | ${c.prenom} ${c.nom} : statut ENTRETIEN sans aucun entretien defini`);
      continue;
    }

    if (c.statut === 'FICHE_RECUE' && !c.ficheRenseignementRecue) {
      console.log(`   ERREUR DE FLUX | ${c.prenom} ${c.nom} : statut FICHE_RECUE mais ficheRenseignementRecue = false`);
      continue;
    }

    if (c.statut === 'FICHE_ENVOYEE' && !c.ficheRenseignementEnvoyee) {
      console.log(`   ERREUR DE FLUX | ${c.prenom} ${c.nom} : statut FICHE_ENVOYEE mais ficheRenseignementEnvoyee = false`);
      continue;
    }

    console.log(`   ACTIF   | ${c.prenom.padEnd(10)} ${c.nom.padEnd(15)} -> ${offre.intitule.substring(0, 35).padEnd(35)} [score:${c.scoreGlobal}] [${c.statut}]`);

    const ficheToken = c.ficheRenseignementEnvoyee
      ? `FICHE-${Buffer.from(c.email).toString('base64').slice(0, 16).toUpperCase()}`
      : null;

    const candidature = await prisma.candidature.create({
      data: {
        reference:                   await generateReference(),
        nom:                         c.nom,
        prenom:                      c.prenom,
        email:                       c.email,
        telephone:                   c.telephone,
        cvUrl:                       c.cvUrl,
        cvTexte:                     c.cvTexte,
        scoreGlobal:                 c.scoreGlobal,
        scoreExp:                    c.scoreExp,
        competencesDetectees:        c.competencesDetectees,
        competencesManquantes:       c.competencesManquantes,
        statut:                      c.statut,
        consentementRGPD:            c.consentementRGPD,
        consentementIA:              c.consentementIA,
        dateSoumission:              now,
        offreId:                     offre.id,
        ficheRenseignementEnvoyee:   c.ficheRenseignementEnvoyee ?? false,
        ficheRenseignementEnvoyeeAt: c.ficheRenseignementEnvoyee ? now : null,
        ficheRenseignementRecue:     c.ficheRenseignementRecue ?? false,
        ficheRenseignementRecueAt:   c.ficheRenseignementRecue ? now : null,
        ficheRenseignementToken:     ficheToken,
        ficheRenseignementData:      c.ficheRenseignementData ?? null,
      },
    });

    // Entretiens (uniquement si statut = FICHE_RECUE ou ENTRETIEN)
    if (hasEntretiens && (c.statut === 'FICHE_RECUE' || c.statut === 'ENTRETIEN')) {
      const offreAvecDemande = await prisma.offreEmploi.findUnique({
        where: { id: offre.id },
        select: { demandeId: true },
      });

      for (const e of c.entretiens!) {
        const interviewer = getInterviewer(e.interviewerRole);
        const dateEntretien = d(e.offsetDays);

        await prisma.entretien.create({
          data: {
            candidatureId: candidature.id,
            interviewerId: interviewer.id,
            type:          e.type as any,
            date:          dateEntretien,
            heure:         e.heure,
            lieu:          e.lieu,
            statut:        e.statut as any,
            feedback:      e.feedback ?? null,
            evaluation:    e.evaluation ?? null,
          },
        });

        // Coherence avec DisponibiliteInterviewer : on reserve le creneau
        // pose par seed-demandes.ts s'il existe deja, sinon on le cree.
        // S'applique a REALISE et PLANIFIE (avant : PLANIFIE seulement,
        // ce qui laissait les entretiens passes sans creneau associe).
        if (offreAvecDemande?.demandeId && (e.statut === 'PLANIFIE' || e.statut === 'REALISE')) {
          const heureFin = `${String(parseInt(e.heure.split(':')[0], 10) + 1).padStart(2, '0')}:00`;

          const creneauExistant = await prisma.disponibiliteInterviewer.findFirst({
            where: { userId: interviewer.id, demandeId: offreAvecDemande.demandeId, date: dateEntretien },
          });

          if (creneauExistant) {
            await prisma.disponibiliteInterviewer.update({
              where: { id: creneauExistant.id },
              data: { reservee: true },
            });
          } else {
            await prisma.disponibiliteInterviewer.create({
              data: {
                userId:     interviewer.id,
                demandeId:  offreAvecDemande.demandeId,
                date:       dateEntretien,
                heureDebut: e.heure,
                heureFin,
                reservee:   true,
              },
            });
          }
        }
      }
      console.log(`      -> ${c.entretiens!.length} entretien(s) cree(s) + creneau(x) reserve(s)`);
    } else if (hasEntretiens && c.statut !== 'FICHE_RECUE' && c.statut !== 'ENTRETIEN') {
      console.log(`      -> ATTENTION : ${c.entretiens!.length} entretien(s) non crees car statut = ${c.statut} (doit etre FICHE_RECUE ou ENTRETIEN)`);
    }
  }

  // Candidatures matching inverse
  console.log('\n[4/4] Creation des candidatures via matching inverse...\n');

  for (const m of MATCHING_INVERSE) {
    const source = await prisma.candidature.findFirst({
      where: { email: m.emailCandidat },
      orderBy: { dateSoumission: 'desc' },
    });

    if (!source) {
      console.log(`   IGNORE | ${m.emailCandidat} — candidature source introuvable`);
      continue;
    }

    const offre = await getOffreByIntitule(m.offreCible);
    if (!offre) {
      console.log(`   IGNORE | ${m.emailCandidat} -> "${m.offreCible}" non publiee`);
      continue;
    }

    const existante = await prisma.candidature.findFirst({
      where: { email: m.emailCandidat, offreId: offre.id },
    });
    if (existante) {
      console.log(`   SKIP   | ${source.prenom} ${source.nom} -> "${offre.intitule}" (deja candidat)`);
      continue;
    }

    await prisma.candidature.create({
      data: {
        reference:             await generateReference(),
        nom:                   source.nom,
        prenom:                source.prenom,
        email:                 source.email,
        telephone:             source.telephone,
        cvUrl:                 source.cvUrl,
        cvTexte:               source.cvTexte,
        scoreGlobal:           m.scoreGlobal,
        scoreExp:              m.scoreExp,
        competencesDetectees:  source.competencesDetectees,
        competencesManquantes: source.competencesManquantes,
        consentementRGPD:      source.consentementRGPD,
        consentementIA:        source.consentementIA,
        statut:                'MATCHING_INVERSE',
        dateSoumission:        now,
        offreId:               offre.id,
      },
    });

    console.log(`   MATCH  | ${source.prenom.padEnd(10)} ${source.nom.padEnd(15)} -> ${offre.intitule.substring(0, 35).padEnd(35)} [score:${m.scoreGlobal}]`);
  }

  // Statistiques
  console.log('\n--------------------------------------------------------------------');
  console.log('  RESUME DU SEED');
  console.log('--------------------------------------------------------------------');

  const total          = await prisma.candidature.count();
  const classiques     = await prisma.candidature.count({ where: { statut: { not: 'MATCHING_INVERSE' } } });
  const viaMatching    = await prisma.candidature.count({ where: { statut: 'MATCHING_INVERSE' } });
  const avecIA         = await prisma.candidature.count({ where: { consentementIA: true } });
  const avecFiche      = await prisma.candidature.count({ where: { ficheRenseignementEnvoyee: true } });
  const nbEntretiens   = await prisma.entretien.count();
  const creneauxReserves = await prisma.disponibiliteInterviewer.count({ where: { reservee: true } });
  const parStatut      = await prisma.candidature.groupBy({ by: ['statut'], _count: true });

  console.log(`  Total candidatures : ${total}`);
  console.log(`  Classiques         : ${classiques}`);
  console.log(`  Via matching inv.  : ${viaMatching}`);
  console.log(`  Consentement IA    : ${avecIA}/${total}`);
  console.log(`  Fiche envoyee      : ${avecFiche}`);
  console.log(`  Entretiens         : ${nbEntretiens}`);
  console.log(`  Creneaux reserves  : ${creneauxReserves}`);
  console.log('\n  Par statut :');
  for (const s of parStatut.sort((a, b) => b._count - a._count)) {
    console.log(`    ${s.statut.padEnd(22)} ${s._count}`);
  }
  console.log('\n  Seed termine avec succes');
}

main()
  .catch(e => { console.error('Erreur seed-candidatures:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });