 

:dart: About

The Hospital Backend System is a Node.js-based backend application designed to manage patients, doctors, appointments, and medical records efficiently. It utilizes MongoDB for data storage and integrates Live Large Language Models (LLMs) for extracting actionable healthcare plans.

:sparkles: Features

:heavy_check_mark: User authentication & authorization (Doctors, Patients, Admins);

:heavy_check_mark: Patient & Doctor profile management;

:heavy_check_mark: Assigning doctors to patients;

:heavy_check_mark: Managing appointments & medical records;

:heavy_check_mark: Integrating Google Gemini Flash LLM for AI-driven health plans;

:heavy_check_mark: Aggregation pipeline to merge patient & user data efficiently.

:rocket: Technologies

The following tools were used in this project:

Node.js

Express.js

MongoDB

Mongoose

TypeScript

JWT

Google Gemini Flash (LLM)

:white_check_mark: Requirements

Before starting, ensure you have Git, Node.js, and MongoDB installed on your machine.

:checkered_flag: Starting

# Clone this project
$ git clone https://github.com/qbentil/hospital-bakend-system.git

# Access project directory
$ cd hospital-bakend-system

# Install dependencies
$ yarn install  # or npm install

# Set up environment variables
$ cp .env.example .env
# Edit .env file with your MongoDB URI and other configurations

# Run the project
$ yarn start  # or npm start

# The server will initialize on <http://localhost:3000>

:memo: API Endpoints

User Authentication

POST /api/auth/signup - Register a new user (Doctor/Patient)

POST /api/auth/login - Login and get JWT token

Patient Management

GET /api/patient/profile - Get logged-in patient’s profile

POST /api/patient/assign-doctor/:doctorId - Assign a doctor to a patient

Doctor Management

GET /api/doctor/patients - Get a list of patients assigned to a doctor

GET /api/doctor/patient/:patientId - Get detailed patient information

AI-Powered Health Plans (LLM Integration)

POST /api/ai/generate-checklist - Generate an immediate checklist

POST /api/ai/generate-plan - Generate a scheduled healthcare plan

:memo: License

This project is under the MIT License. For more details, see the LICENSE file.

Made with :heart: by Shadrack Bentil

 

Back to top

