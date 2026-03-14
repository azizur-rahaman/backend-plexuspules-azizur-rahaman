# Plexus Cloud - Network Monitoring Backend (NOC Simulator)

Plexus Cloud is a high-performance, professional Express.js backend engineered as the backbone for the Plexuspules NOC Simulator. It provides a modular, feature-oriented API for real-time network infrastructure monitoring, secure identity management, and proactive alert broadcasting.

## 🚀 Key Features

*   **Secure Identity Management**: Robust authentication flow utilizing JWT (JSON Web Tokens) and bcryptjs for secure credential hashing.
*   **Holistic Dashboard Metrics**: High-efficiency endpoints providing real-time aggregates for device health (Total, Online, Offline).
*   **Network Inventory Management**: Full RESTful suite for device tracking, including status filtering and high-speed search capabilities.
*   **Performance Telemetry**: Simulated time-series data for CPU and RAM utilization metrics across the infrastructure.
*   **FCM Push Notifications**: End-to-end integration with Firebase Admin SDK for registering device tokens and broadcasting background alerts.
*   **Automated Alert Simulation**: Intelligent background worker that periodically triggers critical system alerts to simulate real-world networking deviations.
*   **Structured Resilience**: Global error handling middleware and standardized response formats for consistent API consumption.

## 🛠 Tech Stack

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/)
*   **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [JWT](https://jwt.io/)
*   **Push Notifications**: [Firebase Admin SDK](https://firebase.google.com/docs/admin)
*   **Logging**: [Morgan](https://github.com/expressjs/morgan) & [Winston](https://github.com/winstonjs/winston)
*   **Testing**: [Jest](https://jestjs.io/) (Unit & Integration) with [ts-jest](https://kulshekhar.github.io/ts-jest/)
*   **Validation**: [express-validator](https://express-validator.github.io/docs/)

## 🏗 Architecture

The project is built on a **Feature-Oriented Layered Architecture**, prioritizing modularity and separation of concerns.

### Architectural Layers:
-   **Delivery (Controllers/Routes)**: Handles HTTP entry points, request parsing, and response coordination.
-   **Domain (Use Cases/Logic)**: Pure business logic layer that orchestrates data flow between features.
-   **Data (Repositories/Mocks)**: Abstracts data retrieval logic, utilizing the Repository Pattern to swap between live databases and simulators seamlessly.
-   **Core**: Shared infrastructure containing global configurations, middlewares (Auth, Error, Rate-limiting), and enterprise utilities.

## 📁 Folder Structure

```text
src/
├── core/               # Shared infrastructure and utilities
│   ├── config/         # System configurations (Firebase, Env etc.)
│   ├── middlewares/    # Security, Auth, and Error handling
│   └── utils/          # Generic helpers and response templates
├── features/           # Modular feature domains
│   ├── auth/           # Identity and Access Management
│   ├── dashboard/      # Infrastructure health metrics
│   ├── devices/        # Network device inventory and status
│   ├── alerts/         # Event-driven system notifications
│   ├── notifications/  # FCM management and broadcast logic
│   └── performance/    # Metrics for CPU and Memory tracking
│   ├── performance/    # Metrics for CPU and Memory tracking
└── server.ts           # Global entry point and background task worker
```

## 🚥 Getting Started

### Prerequisites
-  - Node.js (v18+)
- npm or yarn
- **Firebase Service Account Key**: Required for Push Notifications. Place the JSON file in the root directory and ensure it matches the filename referenced in `src/core/config/firebase.config.ts`.

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/azizur-rahaman/backend-plexuspules-azizur-rahaman.git
    cd backend-plexuspules-azizur-rahaman
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Then, edit `.env` and provide your secrets:
    ```env
    PORT=3000
    JWT_SECRET=your_super_secret_key
    DATABASE_URL=./plexus.db
    ```

4.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## 🔑 Demo Credentials

-   **Email**: `admin@plexus.com`
-   **Password**: `password123`

## 🎛 Real-Time Data Handling

Plexus Cloud utilizes a tailored approach for high-fidelity data synchronization:
-   **Optimized Polling**: Response structures are minimized for high-frequency polling (Low Latency).
-   **Proactive Broadcasting**: A background simulation worker in `server.ts` monitors the virtual infrastructure and dispatches **FCM Push Notifications** for critical events (e.g., Core Switch failures) to all registered client tokens every 60 seconds.

## 🔮 Future Improvements

-   **MongoDB Integration**: Transition from mock repositories to persistent document storage.
-   **WebSocket Implementation**: Shift to Bi-directional communication for sub-second dashboard updates.
-   **Advanced Telemetry**: Implementation of SNMP-like traps for more granular device health tracking.

## ✅ Testing

Plexus Cloud follows a rigorous testing methodology using **Jest** and **ts-jest**.

### Coverage:
-   **Unit Tests**: Comprehensive verification of Use Cases, Repositories, and Core Utilities.
-   **Integration Tests**: Validating end-to-end API flows and security middlewares.

### Running Tests:
```bash
npm test
```

## 👤 Author

**Azizur Rahaman**
*   GitHub: [azizur-rahaman](https://github.com/azizur-rahaman)

---
© 2024 Plexus Cloud. Scalable Monitoring Infrastructure.