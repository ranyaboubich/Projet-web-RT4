# 📚 Library Club Backend

Welcome to the Library Club backend project! This is a NestJS-based backend service for managing the operations of a library club, including user authentication, book catalog management, borrowing records, and more. <br>
**🔗 Frontend Repository Link**: https://github.com/ranyaboubich/Projet-Angular-second

## 🚀 Features

- User authentication and authorization
- Book catalog management (CRUD operations)
- Borrowing and returning books
- Admin features for managing users and books

## 🛠️ Technologies Used

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [Local]
- **Authentication**: JWT
- **ORM**: [TypeORM](https://typeorm.io/)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 18.x)
- npm (>= 10.7.0)
- 
## 🏁 Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ranyaboubich/Projet-web-RT4.git
    cd library-club-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file based on the `.env.example` and configure your environment variables:
    ```bash
    cp .env.example .env
    ```

2. Run database migrations:
    ```bash
    npm run typeorm migration:run
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run start:dev
    ```

2. The server will start on `http://localhost:3000`.

### Testing

Run the tests using the following command:
```bash
npm run test
