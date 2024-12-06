# RBAC Project

A Role-Based Access Control (RBAC) system with three predefined roles: **Admin**, **SubAdmin**, and **User**. The project includes both backend and frontend implementations.

## Features

- **Admin**:
  - Add or remove SubAdmins and Users.
  - Manage permissions for SubAdmins and Users.

- **SubAdmin**:
  - Manage permissions for Users.

- **User**:
  - Perform actions like \`read\`, \`write\`, or \`delete\` messages based on granted permissions.

---

## Installation Instructions

### 1. Backend Setup

1. Clone the repository and navigate to the project folder.
2. Open the terminal in the \`rbac-project-master\` folder.
3. Install backend dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Create a \`.env\` file in the root directory with the following content:
   \`\`\`env
   PORT=5000
   MONGODB_URI='<Your MongoDB URI>'
   JWT_SECRET='<Your JWT Secret Key>'
   \`\`\`
   Replace \`<Your MongoDB URI>\` with your MongoDB connection string and \`<Your JWT Secret Key>\` with a secure random string.

5. Initialize models:
   \`\`\`bash
   node ./api/initR.js
   \`\`\`

6. Create the default admin user:
   \`\`\`bash
   node ./api/addadmin.js
   \`\`\`

7. Start the backend server:
   \`\`\`bash
   node ./api/index.js
   \`\`\`

---

### 2. Frontend Setup

1. Navigate to the \`client\` folder:
   \`\`\`bash
   cd client
   \`\`\`
2. Install frontend dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the client:
   \`\`\`bash
   npm run start
   \`\`\`

---

## Running the Full Application

1. Start the backend server by running:
   \`\`\`bash
   node ./api/index.js
   \`\`\`
2. Start the client in the \`client\` folder:
   \`\`\`bash
   npm run start
   \`\`\`

---

## Predefined Roles

1. **Admin**:
   - Add/Remove SubAdmins and Users.
   - Manage permissions for SubAdmins and Users.

2. **SubAdmin**:
   - Manage permissions for Users only.

3. **User**:
   - Perform actions (\`read\`, \`write\`, \`delete\`) on messages as per granted permissions.

---

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Authentication**: JWT (JSON Web Tokens)

---

## How to Contribute

1. Fork this repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch.
4. Create a pull request and explain your changes.

---

## License

This project is licensed under the MIT License. See the \`LICENSE\` file for more details.
" > README.md
