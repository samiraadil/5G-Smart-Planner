<div align="center">

# 📡 5G Smart Planner

### *AI-Powered Platform for 5G Network Planning and Optimization*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-21-orange.svg?logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16--PostGIS-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg?logo=docker)](https://www.docker.com/)

[Documentation Technique](./docs) · [Rapporter un Bug](https://github.com/your-org/5G-Smart-Planner/issues)

</div>

---

## 📋 Table des Matières

- [1. À Propos du Projet](#1-à-propos-du-projet)
- [2. Fonctionnalités Clés](#2-fonctionnalités-clés)
- [3. Architecture Système](#3-architecture-système)
- [4. Stack Technique](#4-stack-technique)
- [5. Arborescence du Dépôt](#5-arborescence-du-dépôt)
- [6. Installation & Démarrage Rapide (Docker)](#6-installation--démarrage-rapide-docker)
- [7. Référence des APIs REST](#7-référence-des-apis-rest)
- [8. Schéma du Modèle de Données (PostGIS)](#8-schéma-du-modèle-de-données-postgis)
- [9. Roadmap de Développement](#9-roadmap-de-développement)
- [10. Licence](#10-licence)

---

## 1. À Propos du Projet

### 🎯 Le Problème
Le déploiement des réseaux de télécommunication de 5ème génération (**5G**) implique un arbitrage complexe entre la couverture radioélectrique, la capacité offerte et les dépenses d'investissement (**CapEx**). Les ingénieurs télécoms et décideurs font aujourd'hui face à :
* Des outils de simulation radio lourds, propriétaires et extrêmement coûteux.
* Des temps de calcul prohibitifs pour l'évaluation de scénarios de déploiement multi-critères.
* L'absence d'outils d'assistance automatisée basés sur l'IA pour guider la prise de décision sur le terrain.

### 💡 La Solution : 5G Smart Planner
**5G Smart Planner** est une plateforme décisionnelle et cartographique intuitive permettant de :
1. **Modéliser une ville virtuelle** (bâtiments, routes, zones d'habitation/industrielles, usagers).
2. **Placer et configurer dynamiquement des gNodeB** (stations de base 5G) sur carte interactive.
3. **Simuler la propagation radioélectrique 3GPP** et la répartition de la charge réseau en temps réel.
4. **Optimiser le réseau grâce à l'IA** (suggestions automatisées d'ajout, déplacement ou suppression de stations via clustering et programmation linéaire).

---

## 2. Fonctionnalités Clés

| Fonctionnalité | Description |
| :--- | :--- |
| 🗺️ **Modélisation Urbaine** | Support du zonage géospatial (Résidentiel, Industriel, Axes routiers) avec gestion des coefficients d'atténuation radio. |
| 📡 **Placement de gNodeB** | Ajout par simple clic, paramétrage de la fréquence (3.5 GHz), de la puissance de transmission ($P_{tx}$) et du type d'antenne. |
| 🔴🟡🟢 **Heatmap de Couverture** | Calcul du niveau de signal $RSRP$ (*Reference Signal Received Power*) selon le modèle 3GPP Cost-231 Hata. |
| 👥 **Simulation Utilisateurs** | Génération de 1 000+ équipements utilisateurs (UE) et association dynamique selon la puissance et la capacité disponible. |
| 🤖 **Moteur d'Optimisation IA** | Algorithmes **DBSCAN** & **PuLP** pour identifier les zones blanches et recommander la topologie optimale. |
| 📊 **Tableau de Bord KPI** | Métriques temps réel : % Couverture, Latence moyenne, Capacité, Taux de charge et Stations saturées. |

---

## 3. Architecture Système

La plateforme s'appuie sur une architecture microservices conteneurisée à faible couplage :

```mermaid
graph TD
    UI[Frontend: React + TypeScript + Leaflet] -->|REST / WebSocket| API[Backend Orchestrator: Spring Boot]
    API -->|JPA / Spatial Queries| DB[(Database: PostgreSQL + PostGIS)]
    API -->|RPC / REST| SIM[Simulation Engine: Java Spatial Core]
    API -->|REST| AI[AI Engine: FastAPI + Scikit-Learn + PuLP]

    subgraph Infrastructures Microservices
        API
        SIM
        AI
        DB
    end
