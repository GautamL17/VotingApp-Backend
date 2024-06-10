# VotingApp-Backend

This is a voting application that allows users to vote various candidates, the app supports CRUD operations, enabling users to create, read, update, and delete their infromations each user is allowed to vote only once. Users can also manage their profile details, such as changing their name and password.

## Table of Contents

- [Features](#features)
- [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Authentication](#authentication)
- [License](#license)

## Features

- Each user can only vote once.
- Perform CRUD operations on users.
- User authentication and profile management.

## Backend

The server-side application is served on `localhost:3000`.

## API Endpoints

### http://localhost:3000/candidate/

1. **GET `/list`**
   - Returns candidates list.
     
2. **POST `/`**
   - Candidates can signup using this route.
     
3. **GET `/vote/count`**
   - Returns candidate's number of votes.

4. **POST `/vote/:candidateId`**
   - Request to vote a particular candidate.

5. **PUT `/:candidateId`**
   - Update a specific candidate information by ID.

6. **DELETE `/api/notes/:id`**
   - Delete a specific candidate information by ID.


### http://localhost:3000/user/

1. **GET `/profile`**
   - Fetches the profile information about user.
     
2. **POST `/login`**
   - Route for user to login.

4. **POST `/signup`**
   - Route for user to signup.

5. **PUT `/profile/edit-profile`**
   - Update a specific candidate name and password by ID.
     

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd VotingApp-Backend
    ```

3. **Install dependencies for both frontend and backend:**

    ```bash
    cd ../server
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the backend directory and add your environment variables. Example:

    ```env
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. **Start the development servers:**

    ```bash
    cd ../server
    npm run dev
    ```

## Dependencies

### Backend

- `bcrypt`: ^5.1.1
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.4.1
- `nodemon`: ^3.1.2

## Authentication

User authentication is implemented in the backend using JWT (JSON Web Tokens) and password encryption is handled using `bcrypt`.

## License

This project is licensed under the MIT License.
