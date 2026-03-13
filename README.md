# Backend Plexuspules - Azizur Rahaman

A robust backend application built with modern technologies to power the Plexuspules platform.

## Description

This backend service provides the core API and business logic for the Plexuspules application. It handles user authentication, data processing, and integration with various services.

## Features

- RESTful API endpoints
- User authentication and authorization
- Database integration
- Error handling and logging
- Scalable architecture

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/backend-plexuspules-azizur-rahaman.git
   cd backend-plexuspules-azizur-rahaman
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

The API is available at `http://localhost:3000`.

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login with dummy credentials.
  - Body: `{ "email": "admin@plexus.com", "password": "password" }`
  - Returns: `{ "token": "...", "user": { ... } }`

#### Monitoring & Dashboard
- `GET /api/monitoring/summary` - Real-time metrics overview.
  - Returns: `{ "totalDevices": 4, "onlineDevices": 3, "offlineDevices": 1, "alerts": 2 }`
- `GET /api/monitoring/devices` - List of all network devices.
- `GET /api/monitoring/devices/:id` - Detailed information for a specific device, including real-time CPU/Memory usage and history.

#### Health Check
- `GET /health` - Service health status.

## Architecture

This project follows **Clean Architecture** principles:
- **Core**: Cross-cutting concerns like security, global errors, and utilities.
- **Features**: Business logic modules (Auth, Monitoring).
  - **Domain**: Entities, Use Cases, and Repository Interfaces (Pure TS).
  - **Data**: Repository implementations and data sources (External dependencies).
  - **Delivery**: Express controllers and route definitions.

## Development

To run in development mode with hot reloading:
```bash
npm run dev
```

## Testing

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Azizur Rahaman - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/backend-plexuspules-azizur-rahaman](https://github.com/yourusername/backend-plexuspules-azizur-rahaman)