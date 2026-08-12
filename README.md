# Plateforme Intelligente de Recrutement et d'Évaluation RH

> Plateforme full-stack de gestion du recrutement et des ressources humaines, couvrant l'intégralité du cycle de vie de l'embauche — de la demande de recrutement jusqu'à l'évaluation de la période d'essai — avec un moteur de scoring de CV assisté par IA et une automatisation des workflows.

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![n8n](https://img.shields.io/badge/n8n-workflow--automation-EA4B71?logo=n8n&logoColor=white)](https://n8n.io)
[![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/license-Unlicensed-lightgrey)](#licence)

🇬🇧 [Read in English](./README.md)

---

## Table des matières

- [Aperçu](#aperçu)
- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Rôles](#rôles)
- [Modules principaux](#modules-principaux)
- [Démarrage](#démarrage)
- [CI/CD](#cicd)
- [Licence](#licence)

---

## Aperçu

La plateforme digitalise et automatise les processus RH :

- Validation hiérarchique multi-niveaux des demandes de recrutement, avec routage dynamique selon le niveau du poste
- Parsing, scoring et classification des candidatures assistés par IA
- Parcours candidat public, sans compte (candidature, fiche de renseignement, self-scheduling d'entretien)
- Génération, signature et gestion des avenants de contrat
- Évaluation de la période d'essai avec un modèle de confidentialité à deux niveaux
- Tableaux de bord KPI scopés par rôle et journal d'audit complet
- Relances/escalades automatisées et pipeline de détection de dérive + ré-entraînement IA

## Architecture

Architecture en couches (N-tier) — **Routes → Controllers → Services → Prisma ORM → PostgreSQL** — plutôt qu'un MVC classique, répartie sur quatre services déployables indépendamment.

```
┌─────────────┐      ┌──────────────┐      ┌──────────────────┐
│  Frontend   │ ───▶ │  Backend API │ ───▶ │   PostgreSQL      │
│  (React)    │      │ (Node/Express│      │   (via Prisma,    │
└─────────────┘      │   /Prisma)   │      │   hébergé Neon)   │
                      └──────┬───────┘      └──────────────────┘
                             │
                 ┌───────────┼────────────┐
                 ▼                        ▼
        ┌──────────────────┐      ┌──────────────┐
        │  Microservice IA │      │     n8n      │
        │  (FastAPI)       │      │  (workflows) │
        └──────────────────┘      └──────────────┘
```

| Service | Stack | Responsabilité |
|---|---|---|
| **Backend API** | Node.js, TypeScript, Express, Prisma | Logique métier centrale, auth, circuits de validation |
| **Microservice IA** | Python, FastAPI, scikit-learn, LightGBM, spaCy, Sentence-Transformers | Parsing CV, scoring hybride, matching inverse |
| **Frontend** | React (Vite) | SPA adaptée par rôle |
| **n8n** | Automatisation de workflows | Relances du circuit de recrutement, détection de dérive IA → déclenchement du ré-entraînement |

## Stack technique

- **Backend :** Node.js · TypeScript · Express · Prisma ORM
- **Microservice IA :** Python · FastAPI · scikit-learn · LightGBM · spaCy · Sentence-Transformers
- **Frontend :** React · Vite
- **Base de données :** PostgreSQL (hébergée sur NeonDB)
- **Automatisation :** n8n
- **Infrastructure :** Docker, GitHub Actions (CI)

## Rôles

9 rôles aux permissions et périmètres de dashboard distincts :

`SUPER_ADMIN` · `MANAGER` · `DIRECTEUR` · `DRH` · `DAF` · `DGA` · `DG` · `RESP_PAIE` · `EMPLOYE`

Plus un acteur externe **Candidat** qui interagit sans compte, exclusivement via des liens tokenisés signés HMAC.

## Modules principaux

<details>
<summary><b>1. Authentification & utilisateurs</b></summary>

JWT, bcrypt (coût 12), login résistant aux attaques par timing, changement de mot de passe forcé à la première connexion, rate limiting, un seul Manager/Directeur actif par direction imposé à la création.
</details>

<details>
<summary><b>2. Circuit de validation du recrutement</b></summary>

6 niveaux de seniorité de poste, chacun associé à une chaîne d'approbation ordonnée. Les circuits sont des données configurables, pas de la logique en dur. Le rôle du créateur est retiré de la chaîne ; un rôle de repli s'applique si le validateur habituel n'a pas de compte actif. Gestion des délais : 48h → relance → 48h → annulation automatique, avec relance manuelle possible par le DRH.
</details>

<details>
<summary><b>3. Offres d'emploi & candidatures</b></summary>

Offres publiées à partir de demandes validées, avec un lien de candidature public. Les candidats postulent sans compte (consentement RGPD et IA requis).
</details>

<details>
<summary><b>4. Scoring IA des CV (modèle hybride)</b></summary>

`Score = 0.55 × scoring à base de règles + 0.45 × similarité sémantique par embeddings`. Testé sur 300 CV × 12 offres, surpassant chacune des deux approches prise isolément sur l'erreur, la corrélation et le taux d'accord. Inclut des pénalités de disparité de domaine, une explicabilité détaillée par critère, et une classification automatique par percentile dynamique.
</details>

<details>
<summary><b>5. Fiche de renseignement candidat</b></summary>

Les candidats doivent compléter une fiche de renseignement (accès par token, public) avant qu'un entretien puisse être planifié. L'absence de réponse entraîne un refus automatique après 48h.
</details>

<details>
<summary><b>6. Entretiens</b></summary>

Entretiens RH planifiés directement par les RH ; entretiens techniques/direction via self-scheduling du candidat sur un lien signé, à partir des disponibilités saisies par les interviewers, avec réservation atomique des créneaux pour éviter les conflits.
</details>

<details>
<summary><b>7. Contrats & avenants</b></summary>

Génération de contrats PDF, consultables publiquement sans authentification. La signature crée une fiche employé interne (pas un vrai compte — l'employé embauché ne se connecte jamais à la plateforme). Les avenants couvrent confirmation, prolongation, changement de poste/salaire et rupture.
</details>

<details>
<summary><b>8. Évaluation de la période d'essai</b></summary>

Deux circuits :
- **Circuit 1** (sort de l'employé) : saisie RH → évaluation par le manager direct → validation par le directeur de la direction, même direction uniquement
- **Circuit 2** (modification contractuelle) : le RH propose un avenant → le DRH valide

Les commentaires manager/directeur sont filtrés par confidentialité ; le directeur peut masquer (pas supprimer) l'évaluation du manager.
</details>

<details>
<summary><b>9. Dashboard & audit</b></summary>

KPI scopés par rôle (délai, taux de conversion, budget, conformité SLA, coût par recrutement, score qualité, taux de rétention) et journal d'audit complet exportable en CSV.
</details>

<details>
<summary><b>10. MLOps</b></summary>

Un workflow hebdomadaire vérifie la dérive de la distribution des scores du modèle IA ; en cas d'alerte, déclenche un pipeline de ré-entraînement automatisé qui ré-entraîne le modèle et ne commit le nouvel artefact que s'il est meilleur.
</details>

## Démarrage

```bash
# Backend
cd backend
npm install
npx prisma generate
npm run dev

# Microservice IA
cd ia_service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

# Frontend
cd frontend
npm install
npm run dev
```

Chaque service dispose également d'un `Dockerfile` ; voir `docker-compose.yml` (si présent) pour lancer toute la stack (backend, microservice IA, frontend, n8n, Redis) en conteneurs.

Variables d'environnement requises (`.env`) : `DATABASE_URL`, `JWT_SECRET`, `VALIDATION_SECRET`, `N8N_WEBHOOK_URL_CIRCUIT`, `N8N_WEBHOOK_SECRET`, `SMTP_*`, et `IA_SERVICE_URL`.

## CI/CD

L'intégration continue tourne à chaque push/PR : vérification de typage + tests backend, suite de tests du microservice IA (poids des modèles ML mis en cache), validation du schéma de base de données, et scan de fuite de secrets. Pas de déploiement continu — le déploiement en production est géré séparément par l'organisation hébergeuse.




## Licence

Projet interne. Tous droits réservés.