# Hospital Management System (HMS)

A full-stack microservices-based Hospital Management System built with Spring Boot and React.

## Tech Stack

**Backend:** Java, Spring Boot, Spring Security, JWT, Spring Cloud Gateway, MySQL, Maven  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Redux, Axios

## Project Structure

```
HMS/
├── Backend/
│   ├── UserMS/             # User authentication & JWT
│   ├── AppointmentMS/      # Appointment management
│   ├── ProfileMS/          # Doctor & Patient profiles
│   └── GatewayMS/          # API Gateway & token filter
└── Frontend/
    └── hms/                # React + Vite frontend
```

## Microservices

| Service         | Port  | Description                        |
|----------------|-------|------------------------------------|
| UserMS          | 8080  | Registration, Login, JWT           |
| ProfileMS       | 8081  | Doctor & Patient profile management|
| AppointmentMS   | 8082  | Appointment booking & tracking     |
| GatewayMS       | 8083  | API Gateway & route filtering      |
| Frontend        | 5173  | React Vite UI                      |

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.9+

### Clone the Repository
```bash
git clone https://github.com/Akashpandey0/Hospital-Management-System
cd Hospital-Management-System
```

### Backend Setup

1. Create MySQL databases or let Spring auto-create them via `createDatabaseIfNotExist=true`
2. Update `application.properties` in each service with your DB credentials
3. Run each service:

```bash
cd Backend/UserMS
./mvnw spring-boot:run

cd Backend/ProfileMS
./mvnw spring-boot:run

cd Backend/AppointmentMS
./mvnw spring-boot:run

cd Backend/GatewayMS
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd Frontend/hms
npm install
npm run dev
```

## Branch Strategy

```
main                        → stable production code
feature/user-service        → UserMS development
feature/appointment-service → AppointmentMS development
feature/profile-service     → ProfileMS development
feature/gateway-service     → GatewayMS development
feature/frontend            → Frontend development
```

## API Overview

| Method | Endpoint           | Service  | Description        |
|--------|--------------------|----------|--------------------|
| POST   | /api/users/register| UserMS   | Register new user  |
| POST   | /api/users/login   | UserMS   | Login & get JWT    |
| GET    | /api/profile/doctor| ProfileMS| Get doctor profile |
| GET    | /api/profile/patient| ProfileMS| Get patient profile|
| POST   | /api/appointments  | AppointmentMS | Book appointment |

## License

This project is licensed under the MIT License.
