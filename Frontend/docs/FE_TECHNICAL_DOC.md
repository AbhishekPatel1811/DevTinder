# DevTinder Frontend - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Functional Requirements](#functional-requirements)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Routing](#routing)
10. [Styling & Theming](#styling--theming)
11. [Build & Deployment](#build--deployment)
12. [Development Setup](#development-setup)
13. [Key Features](#key-features)

---

## Project Overview

**DevTinder** is a modern web application designed as a social networking platform specifically for developers. It enables developers to connect with each other, discover potential collaborators, and build professional relationships. The application follows a Tinder-like interface where users can browse through developer profiles, send connection requests, and manage their professional network.

### Core Concept
- **Platform Purpose**: A developer-focused social networking platform
- **User Interaction Model**: Swipe-based (Like/Dislike) interface for discovering and connecting with other developers
- **Primary Use Case**: Professional networking, collaboration discovery, and community building

---

## Functional Requirements

### 1. **Authentication & Authorization**
- **User Registration (Signup)**
  - New users can create accounts with email, password, first name, and last name
  - Password validation (minimum 8 characters)
  - Password confirmation matching
  - Form validation using Zod schema
  - Automatic login after successful signup

- **User Login**
  - Email and password authentication
  - Session management via HTTP-only cookies
  - Automatic redirect to home page after successful login
  - Form validation and error handling

- **User Logout**
  - Secure logout functionality
  - Clear all user data from Redux store
  - Redirect to login page
  - Session termination on backend

- **Protected Routes**
  - Automatic authentication check on protected routes
  - Redirect to login if unauthorized (401 status)
  - Token validation on page load

### 2. **User Profile Management**
- **View Profile**
  - Display user's own profile information
  - Show profile picture, name, age, gender, skills, and bio
  - Real-time profile preview

- **Edit Profile**
  - Update personal information:
    - First Name & Last Name
    - Profile Photo URL
    - Age
    - Gender (Male, Female, Others)
    - About/Bio section
    - Skills (comma-separated list)
  - Live preview of profile changes
  - Form validation
  - Success/error toast notifications

### 3. **Feed & Discovery**
- **User Feed**
  - Browse through available developer profiles
  - Display one profile at a time (card-based interface)
  - Show profile photo, name, age, skills, and bio
  - Like/Dislike functionality for each profile
  - Automatic removal of viewed profiles from feed
  - Empty state handling when no more profiles available

### 4. **Connection Management**
- **Send Connection Requests**
  - Like a user from feed → sends connection request
  - Dislike a user from feed → ignores/rejects
  - Real-time feed update after action

- **View Connections**
  - Display all accepted connections
  - Show connection profile cards with:
    - Profile picture
    - Name, age, gender
    - Skills
    - Bio/About section
  - Empty state when no connections exist

- **Manage Connection Requests**
  - View all received connection requests
  - Accept or reject incoming requests
  - Display requester's profile information
  - Real-time updates after accepting/rejecting
  - Automatic navigation to connections page after acceptance

### 5. **User Interface Features**
- **Dark/Light Theme Toggle**
  - System preference detection
  - Manual theme switching
  - Persistent theme selection
  - Smooth theme transitions

- **Responsive Design**
  - Mobile-friendly layouts
  - Adaptive components
  - Responsive navigation

- **Toast Notifications**
  - Success messages for actions
  - Error notifications
  - User feedback for all operations

---

## Technology Stack

### Core Framework & Language
- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.7.2** - Type-safe development
- **Vite 7.2.4** - Fast build tool and development server

### State Management
- **Redux Toolkit 2.11.0** - Predictable state container
- **React Redux 9.2.0** - React bindings for Redux

### Routing
- **React Router DOM 7.9.6** - Client-side routing and navigation

### UI Framework & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives:
  - `@radix-ui/react-accordion`
  - `@radix-ui/react-avatar`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-label`
  - `@radix-ui/react-navigation-menu`
  - `@radix-ui/react-select`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-tooltip`

### Form Management & Validation
- **React Hook Form 7.67.0** - Performant form library
- **Zod 4.1.13** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Validation resolvers for React Hook Form

### HTTP Client
- **Axios 1.13.2** - Promise-based HTTP client
- Configured with interceptors for error handling

### Theming
- **next-themes 0.4.6** - Theme management for dark/light mode

### UI Utilities
- **class-variance-authority 0.7.1** - Component variant management
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.4.0** - Merge Tailwind classes intelligently
- **lucide-react 0.554.0** - Icon library

### Notifications
- **Sonner 2.0.7** - Toast notification library

### Development Tools
- **ESLint 9.39.1** - Code linting
- **TypeScript** - Static type checking
- **@vitejs/plugin-react 5.1.1** - Vite plugin for React

---

## Architecture

### Application Architecture Pattern
The application follows a **Component-Based Architecture** with:
- **Separation of Concerns**: Clear separation between UI components, state management, and API logic
- **Unidirectional Data Flow**: Data flows from Redux store → Components → User Actions → API → Redux Store
- **Container/Presentational Pattern**: Smart components (connected to Redux) and presentational components

### Architecture Layers

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (React Components, UI Library)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      State Management Layer         │
│  (Redux Toolkit, Redux Slices)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      API Integration Layer          │
│  (Axios Instance, API Calls)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Backend API                    │
│  (RESTful API Endpoints)           │
└─────────────────────────────────────┘
```

### Data Flow
1. **User Action** → Component dispatches action
2. **Redux Action** → Updates store state
3. **API Call** → Axios instance makes HTTP request
4. **Response Handling** → Update Redux store with response data
5. **UI Update** → Components re-render with new state

---

## Project Structure

```
Frontend/
├── docs/                          # Documentation
│   └── FE_TECHNICAL_DOC.md       # This file
├── deployment/                    # Deployment documentation
│   └── steps.md
├── dist/                          # Production build output
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── [other assets]
├── src/                           # Source code
│   ├── components/                # React components
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   ├── Body.tsx               # Main layout wrapper
│   │   ├── Connections.tsx        # Connections list page
│   │   ├── EditProfile.tsx        # Profile editing component
│   │   ├── Feed.tsx               # User feed/discovery page
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Login.tsx              # Login page
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── Profile.tsx            # Profile view page
│   │   ├── Requests.tsx           # Connection requests page
│   │   ├── Signup.tsx             # Signup page
│   │   ├── ThemeToggle.tsx        # Theme switcher
│   │   ├── UserCard.tsx           # Reusable user profile card
│   │   └── theme-provider.tsx     # Theme context provider
│   ├── lib/                       # Utility libraries
│   │   ├── api.ts                 # Axios instance configuration
│   │   └── utils.ts               # General utilities (cn function)
│   ├── utils/                     # Redux store and slices
│   │   ├── appStore.ts            # Redux store configuration
│   │   ├── userSlice.ts           # User state slice
│   │   ├── feedSlice.ts           # Feed state slice
│   │   ├── connectionSlice.ts     # Connections state slice
│   │   └── requestSlice.ts        # Requests state slice
│   ├── App.tsx                    # Root component with routing
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles and theme
│   └── vite-env.d.ts              # Vite type definitions
├── .gitignore                     # Git ignore rules
├── components.json                 # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for Node
└── vite.config.ts                 # Vite build configuration
```

---

## Component Architecture

### Core Components

#### 1. **App.tsx** (Root Component)
- **Purpose**: Application root with routing and global providers
- **Responsibilities**:
  - Redux Provider setup
  - React Router configuration
  - Toast notification provider
  - Route definitions

**Key Routes**:
- `/login` - Login page
- `/signup` - Signup page
- `/` - Main layout (Body) with nested routes:
  - `/` - Feed page
  - `/profile` - Profile page
  - `/connections` - Connections page
  - `/requests` - Requests page

#### 2. **Body.tsx** (Layout Wrapper)
- **Purpose**: Main layout component for authenticated routes
- **Responsibilities**:
  - Authentication check on mount
  - Fetch user profile data
  - Render Navbar and Footer
  - Provide Outlet for nested routes
  - Handle unauthorized access (redirect to login)

#### 3. **Navbar.tsx** (Navigation Bar)
- **Purpose**: Top navigation with user menu
- **Features**:
  - Logo and branding
  - Theme toggle button
  - User avatar dropdown menu
  - Navigation links (Profile, Connections, Requests)
  - Logout functionality
  - Conditional rendering based on auth state

#### 4. **Login.tsx** (Login Page)
- **Purpose**: User authentication
- **Features**:
  - Email and password form
  - Password visibility toggle
  - Form validation with Zod
  - Error handling and display
  - Redirect to home after successful login
  - Link to signup page

#### 5. **Signup.tsx** (Registration Page)
- **Purpose**: New user registration
- **Features**:
  - Multi-field registration form
  - Password confirmation
  - Password visibility toggles
  - Form validation with Zod
  - Automatic login after signup
  - Redirect to profile page

#### 6. **Feed.tsx** (Discovery Page)
- **Purpose**: Browse and discover developers
- **Features**:
  - Fetch user feed from API
  - Display one profile at a time
  - Like/Dislike functionality
  - Automatic feed refresh on user change
  - Empty state handling

#### 7. **UserCard.tsx** (Reusable Profile Card)
- **Purpose**: Display user profile information
- **Features**:
  - Profile photo display
  - User information (name, age, skills, bio)
  - Conditional action buttons (Like/Dislike)
  - Tooltips for actions
  - Responsive design
  - Fallback for missing photos

#### 8. **Profile.tsx** (Profile View Page)
- **Purpose**: Display and edit user profile
- **Features**:
  - Renders EditProfile component
  - Shows current user data

#### 9. **EditProfile.tsx** (Profile Editor)
- **Purpose**: Edit user profile information
- **Features**:
  - Form with all profile fields
  - Live preview of changes
  - Skills input (comma-separated)
  - Gender selection dropdown
  - Photo URL input
  - Form validation
  - Success/error notifications

#### 10. **Connections.tsx** (Connections List)
- **Purpose**: Display all accepted connections
- **Features**:
  - Fetch connections from API
  - Display connection cards
  - Avatar, name, bio, skills display
  - Empty state handling

#### 11. **Requests.tsx** (Connection Requests)
- **Purpose**: Manage incoming connection requests
- **Features**:
  - Fetch received requests
  - Display requester information
  - Accept/Reject buttons
  - Real-time updates
  - Navigation after acceptance

#### 12. **Footer.tsx** (Footer Component)
- **Purpose**: Site footer with branding
- **Features**:
  - Logo and description
  - Copyright information

#### 13. **ThemeToggle.tsx** (Theme Switcher)
- **Purpose**: Toggle between dark and light themes
- **Features**:
  - Theme state management
  - Icon-based toggle button
  - Accessible design

### UI Components (shadcn/ui)
Located in `src/components/ui/`, these are reusable, accessible components:
- **Button** - Styled button component
- **Card** - Container component for content
- **Input** - Form input field
- **Label** - Form label
- **Select** - Dropdown selection
- **Textarea** - Multi-line text input
- **Avatar** - User avatar display
- **Dropdown Menu** - Context menu
- **Tooltip** - Hover tooltips
- **Sonner** - Toast notification component

---

## State Management

### Redux Store Structure

The application uses **Redux Toolkit** for centralized state management with the following slices:

#### Store Configuration (`appStore.ts`)
```typescript
{
  user: userReducer,        // Current user data
  feed: feedReducer,        // User feed/discovery list
  connections: connectionsReducer,  // Accepted connections
  requests: requestsReducer  // Connection requests
}
```

#### 1. **User Slice** (`userSlice.ts`)
- **State**: Current authenticated user object or `null`
- **Actions**:
  - `addUser(user)` - Set current user
  - `removeUser()` - Clear user (logout)

**State Shape**:
```typescript
{
  _id: string,
  firstName: string,
  lastName: string,
  emailId: string,
  photoUrl: string,
  age: number,
  gender: string,
  about: string,
  skills: string[]
}
```

#### 2. **Feed Slice** (`feedSlice.ts`)
- **State**: Array of user profiles for discovery or `null`
- **Actions**:
  - `addFeed(users)` - Set feed list
  - `removeUserFromFeed(userId)` - Remove user after action
  - `clearFeed()` - Clear feed

**State Shape**: `Array<User> | null`

#### 3. **Connections Slice** (`connectionSlice.ts`)
- **State**: Array of accepted connections or `null`
- **Actions**:
  - `addConnections(connections)` - Set connections list
  - `removeConnections()` - Clear connections

**State Shape**: `Array<Connection> | null`

#### 4. **Requests Slice** (`requestSlice.ts`)
- **State**: Array of connection requests or `null`
- **Actions**:
  - `addRequests(requests)` - Set requests list
  - `removeRequest(requestId)` - Remove specific request
  - `clearRequests()` - Clear all requests

**State Shape**: `Array<Request> | null`

### State Flow Example (Login)
1. User submits login form
2. Component calls API via `axiosInstance`
3. On success, dispatch `addUser(userData)`
4. Redux store updates with user data
5. All connected components re-render
6. Navbar shows user avatar, protected routes accessible

---

## API Integration

### Axios Configuration (`lib/api.ts`)

The application uses a centralized Axios instance with the following configuration:

```typescript
baseURL: import.meta.env.VITE_API_URL
withCredentials: true  // For cookie-based authentication
headers: {
  "Content-Type": "application/json"
}
```

### Response Interceptor
- Automatically handles 401 (Unauthorized) responses
- Redirects to login page on authentication failure
- Shows error toast notifications

### API Endpoints Used

#### Authentication
- `POST /login` - User login
  - Body: `{ emailId, password }`
  - Response: User object with session cookie

- `POST /signup` - User registration
  - Body: `{ firstName, lastName, emailId, password }`
  - Response: `{ data: User, message }`

- `POST /logout` - User logout
  - Clears session cookie

#### Profile
- `GET /profile/view` - Get current user profile
  - Response: User object

- `PATCH /profile/edit` - Update user profile
  - Body: `{ firstName, lastName, photoUrl, age, gender, about, skills }`
  - Response: `{ data: User, message }`

#### User Discovery
- `GET /user/feed` - Get user feed for discovery
  - Response: `{ data: User[] }`

#### Connections
- `GET /user/connections` - Get all accepted connections
  - Response: `{ data: Connection[] }`

#### Connection Requests
- `POST /request/send/:status/:userId` - Send like/dislike
  - Status: `"like"` or `"dislike"`
  - Response: `{ data, message }`

- `GET /user/requests/received` - Get received requests
  - Response: `{ data: Request[] }`

- `POST /request/review/:status/:requestId` - Accept/reject request
  - Status: `"accepted"` or `"rejected"`
  - Response: `{ data, message }`

### Error Handling
- All API calls wrapped in try-catch blocks
- Error messages displayed via toast notifications
- 401 errors trigger automatic logout and redirect
- Network errors handled gracefully

---

## Routing

### Route Structure

```
/ (Root)
├── /login (Public)
├── /signup (Public)
└── / (Protected - Body Layout)
    ├── / (Feed - Default)
    ├── /profile (Profile)
    ├── /connections (Connections)
    └── /requests (Requests)
```

### Route Protection
- **Public Routes**: `/login`, `/signup`
- **Protected Routes**: All routes under `/` (Body component)
- **Protection Mechanism**: 
  - Body component checks authentication on mount
  - Fetches user profile via `/profile/view`
  - Redirects to `/login` if 401 error occurs
  - Uses React Router's `useNavigate` for navigation

### Navigation
- **Programmatic Navigation**: `useNavigate()` hook
- **Link Navigation**: `<Link>` component for internal links
- **Automatic Redirects**:
  - Login success → `/`
  - Signup success → `/profile`
  - Logout → `/login`
  - Unauthorized → `/login`

---

## Styling & Theming

### Tailwind CSS 4
- **Version**: 4.1.17
- **Configuration**: Inline configuration in `index.css` using `@theme`
- **Vite Plugin**: `@tailwindcss/vite` for seamless integration

### Theme System
- **Theme Provider**: `next-themes` for theme management
- **Default Theme**: Dark mode
- **Theme Storage**: Local storage persistence
- **Theme Variants**: Light and Dark modes

### Design System
The application uses a comprehensive design system with CSS variables:

#### Color Palette
- **Primary Colors**: Defined in CSS variables
- **Semantic Colors**: 
  - Background, Foreground
  - Card, Popover
  - Primary, Secondary
  - Muted, Accent
  - Destructive
  - Border, Input, Ring

#### Typography
- **Font Families**:
  - Sans: Inter
  - Serif: Source Serif 4
  - Mono: JetBrains Mono

#### Spacing & Layout
- Consistent spacing scale
- Responsive breakpoints
- Flexbox and Grid layouts

#### Components Styling
- **shadcn/ui Style**: "New York" style variant
- **Component Variants**: Using `class-variance-authority`
- **Utility Classes**: Tailwind utility classes throughout

### Dark Mode Implementation
- CSS variables switch based on `.dark` class
- Smooth transitions between themes
- System preference detection
- Manual override capability

---

## Build & Deployment

### Build Process

#### Development
```bash
npm run dev
```
- Starts Vite development server
- Hot Module Replacement (HMR)
- Fast refresh for React components

#### Production Build
```bash
npm run build
```
- Creates optimized production bundle in `dist/` folder
- Code minification and tree-shaking
- Asset optimization
- Source maps generation

#### Preview Production Build
```bash
npm run preview
```
- Serves production build locally for testing

### Build Output
- **Location**: `dist/` directory
- **Contents**:
  - `index.html` - Entry HTML file
  - `assets/` - Bundled JavaScript and CSS
  - Static assets from `public/`

### Deployment Configuration

#### Environment Variables
- `VITE_API_URL` - Backend API base URL
- Set in `.env` file or build-time environment

#### Deployment Steps (AWS EC2)
1. Build the application: `npm run build`
2. Copy `dist/*` to web server directory (`/var/www/html/`)
3. Configure Nginx for static file serving
4. Set up reverse proxy for API calls
5. Configure CORS on backend
6. Set environment variables

#### Nginx Configuration
- Static file serving for frontend
- Reverse proxy for `/api/*` to backend server
- Proper headers for SPA routing

---

## Development Setup

### Prerequisites
- **Node.js**: Version 18+ recommended
- **npm**: Comes with Node.js
- **Git**: For version control

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open browser to `http://localhost:5173` (default Vite port)

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

#### ESLint Configuration
- React Hooks rules
- React Refresh plugin
- Recommended JavaScript rules
- Unused variable detection

#### TypeScript Configuration
- **Strict Mode**: Enabled
- **Target**: ES2020
- **Module**: ESNext
- **Path Aliases**: Configured for clean imports
  - `@/*` → `./src/*`
  - `@components/*` → `./src/components/*`
  - `@lib/*` → `./src/lib/*`
  - `@utils/*` → `./src/utils/*`

### Adding New Components

#### shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```

#### Custom Components
1. Create component file in `src/components/`
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Use Tailwind for styling
5. Export as default or named export

---

## Key Features

### 1. **Modern React Patterns**
- Functional components with Hooks
- Custom hooks for reusable logic
- Context API for theme management
- React Router for navigation

### 2. **Type Safety**
- Full TypeScript implementation
- Type-safe Redux actions
- Type-safe API calls
- Type-safe form validation

### 3. **Form Validation**
- Zod schema validation
- React Hook Form integration
- Real-time validation feedback
- Accessible error messages

### 4. **User Experience**
- Toast notifications for all actions
- Loading states during API calls
- Empty states for empty data
- Error handling with user-friendly messages
- Smooth theme transitions

### 5. **Performance Optimizations**
- Code splitting via Vite
- Lazy loading capabilities
- Optimized re-renders with Redux
- Efficient state updates

### 6. **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly components (Radix UI)

### 7. **Responsive Design**
- Mobile-first approach
- Adaptive layouts
- Responsive navigation
- Touch-friendly interactions

### 8. **Developer Experience**
- Hot Module Replacement
- Fast refresh
- TypeScript IntelliSense
- Path aliases for clean imports
- ESLint for code quality

---

## Future Enhancements

### Potential Improvements
1. **Real-time Features**
   - WebSocket integration for live updates
   - Real-time notifications

2. **Advanced Features**
   - Search and filter functionality
   - Advanced profile matching algorithm
   - Messaging system
   - Activity feed

3. **Performance**
   - Code splitting for routes
   - Image optimization
   - Caching strategies

4. **Testing**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright

5. **Accessibility**
   - Enhanced keyboard navigation
   - Screen reader optimization
   - WCAG compliance

---

## Conclusion

The DevTinder Frontend is a modern, well-architected React application built with industry best practices. It provides a solid foundation for a developer networking platform with room for future enhancements and scalability.

### Key Strengths
- ✅ Modern tech stack
- ✅ Type-safe development
- ✅ Clean architecture
- ✅ Comprehensive state management
- ✅ Excellent developer experience
- ✅ Production-ready build system

---

