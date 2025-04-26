# TS Fullstack Template

A TypeScript fullstack application template with complete user authentication and management system. A solid foundation to quickly start your web projects with a modern and scalable architecture.

![Version](https://img.shields.io/badge/version-0.1.12-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Included Features

- ✅ Complete user management (registration, login, profile)
- ✅ Secure authentication with JWT
- ✅ Multilingual interface (English, French)
- ✅ Responsive and modern UI with TailwindCSS
- ✅ Real-time communication via Socket.io
- ✅ Relational database with Prisma ORM
- ✅ Complete REST API with Express.js
- ✅ Automatic versioning using conventional commits

## 🛠️ Technologies Used

### Frontend
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Routing**: Vue Router
- **Styles**: TailwindCSS
- **Global State**: Vue Reactivity + Pinia (coming soon)
- **Internationalization**: Vue I18n
- **Network Communication**: Axios, Socket.io-client
- **Visualization**: Chart.js (coming soon)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (dev), PostgreSQL (prod - coming soon)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod (coming soon)
- **Real-time**: Socket.io

### Tools and Workflow
- **Build**: Vite
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest (backend), Vitest (frontend)
- **CI/CD**: GitHub Actions
- **Versioning**: Conventional Commits, Standard Version

## 📁 Project Structure

```
ts-fullstack-template/
├── client/                     # Vue 3 frontend application
│   ├── public/                 # Public static resources
│   └── src/
│       ├── assets/             # Images, fonts, etc.
│       ├── components/         # Reusable Vue components
│       ├── i18n/               # Internationalization
│       │   ├── en.ts           # English translations
│       │   ├── fr.ts           # French translations
│       │   └── index.ts        # i18n configuration
│       ├── router/             # Route configuration
│       ├── services/           # API and utility services
│       │   ├── api.ts          # REST API client
│       │   └── socketService.ts # Real-time communication service
│       ├── types/              # TypeScript types
│       │   └── User.ts         # User types
│       └── views/              # Vue pages
│           ├── Home.vue        # Home page
│           ├── Login.vue       # Login page
│           ├── NotFound.vue    # 404 page
│           ├── Profile.vue     # User profile page
│           ├── Register.vue    # Registration page
│           └── Settings.vue    # Settings page
│
├── server/                     # Express.js backend API
│   ├── prisma/                 # ORM configuration and schemas
│   │   ├── migrations/         # Database migrations
│   │   ├── dev.db              # SQLite database (dev)
│   │   └── schema.prisma       # Database schema
│   └── src/
│       ├── config/             # Server configuration
│       ├── controllers/        # API controllers
│       │   ├── authController.ts # Authentication management
│       │   └── userController.ts # User management
│       ├── interfaces/         # TypeScript interfaces
│       │   └── IUser.ts        # User interface
│       ├── models/             # Data models
│       │   └── userModel.ts    # User model
│       ├── routes/             # API routes
│       │   ├── authRoutes.ts   # Authentication routes
│       │   └── userRoutes.ts   # User routes
│       ├── services/           # Services
│       │   └── socketService.ts # Real-time communication service
│       ├── utils/              # Utility functions
│       │   ├── index.ts        # General utilities
│       │   └── security.ts     # Security utilities
│       └── index.ts            # Server entry point
│
├── README.md                   # This file
└── TODO.md                     # Todo list and ideas
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js 16+ and npm
- Git

### Backend (server)

```bash
# Clone the project
git --depth=1 clone https://github.com/your-username/ts-fullstack-template.git <project-name>
cd <project-name>

# Install backend dependencies
cd server
npm install

# Database setup
npx prisma migrate dev --name init
npx prisma generate

# Start development server
npm run dev
```

### Frontend (client)

```bash
# In a new terminal, from project root
cd client
npm install

# Start development server
npm run dev
```

## 📝 Configuration

### Environment Variables

#### Server (.env)
```
DATABASE_URL="file:../prisma/dev.db"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="12h"
PORT=3000
```

#### Client (.env.local)
```
VITE_API_URL=http://localhost:3000
```

## 💾 Git Workflow & Versioning

This project uses conventional commits and semantic versioning to automatically manage version numbers.

### Committing Code

Instead of using the standard `git commit` command, use:

```bash
npm run commit
```

This will start an interactive promot to create a properly formatted commit message:

1. **Type**: Select the type of change (feat, fix, docs, etc.)
2. **Scope**: Optional section of the codebase this commit affects
3. **Description**: Short description of the change
4. **Body**: Optional longer description
5. **Breaking Changes**: Does this commit introduce breaking changes?
6. **Issues**: Optional issues this commit closes

### Commit Types and Version Impact

- `fix`: Patches a bug (increases PATCH version 0.0.x)
- `feat`: Adds a new feature (increases MINOR version 0.x.0)
- `feat` with `BREAKING CHANGE`: Major changes (increases MAJOR version x.0.0)
- `docs`, `style`, `refactor`, `perf`, `test`, `chore`: No version change

### Manual Release

To manually trigger a version update:

```bash
npm run release
```

This will:
1. Analyze commits since last version
2. Update version number in package.json
3. Generate/update CHANGELOG.md
4. Create a git tag for the version
5. Commit these changes

### Automatic Versioning

A GitHub Actions workflow automatically runs the release process when pushing to the main/master branch.

## 🔍 Customizing the Template

This template is designed to be easily adaptable to your specific needs. You can:

1. Rename the project and components according to your use case
2. Add additional data models in Prisma
3. Extend authentication features (OAuth, 2FA)
4. Customize the user interface and Vue components
5. Add domain-specific modules for your application

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👥 Authors

[**Samad Hatsijev**](https://github.com/samadh90)

## 👨‍💻 Contributors

*Want to be on this list? Check our contribution guidelines and submit a pull request!*
