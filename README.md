# dotEcom
## E-Commerce Dashboard & Store

An Ecommerce platform with separate user and admin interfaces, built with React, TypeScript, and modern web technologies.

## 🌟 Features

### User Features

- 🛍️ Product browsing with search and category filters
- 🛒 Persistent cart management
- 💳 Checkout process via khalti payment gateway
- 📦 Order tracking
- 🎫 Coupon redemption system
- 👤 User authentication

### Admin Features

- 📊 Dashboard with growth analytics of user ,orders,products,and transactions of past months
- 📦 Product management (CRUD operations)
- 👥 Customer management 
- 🎫 Coupon generation and management
- 📋 Order processing and tracking
- ⚡ Transaction monitoring
- 🎲 Additional utilities (Stopwatch, Coin Toss)[Made for fun]

### Optimistic Updates with React Query

- **Instant UI Updates**: Actions feel instantaneous while networkin calls happening in the background
- **Smart Rollbacks**: Automatic error recovery if network requests fail
- **Real-time Synchronization**: Seamless state management across components

       - 🎯 Zero loading states for better UX
       - ⚡ Instant feedback to user actions
       - 🔄 Automatic recovery from failures

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **State Management**:
  - Redux Toolkit (Cart Management)
  - React Query for (Server State)
- **Styling**: Tailwind CSS
- **Library**: @tanstack/react-table
- **Forms**: Formik with Yup validation
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Charts**: Chart.js

## 🔐 Authentication

The application uses Firebase Authentication with email/password sign-in/sign-up along-side backend validation via HTTP-only cookies. Token refresh is handled by axios interceptors whenever the token is expired.

## 🛒 Cart Management

Cart state is managed using Redux Toolkit with local storage persistence. Features include:

- Add/Remove items
- Quantity adjustments
- Price calculations
- Cart persistence across sessions

## 👥 User Roles

- **Admin**: Full access to dashboard and management features
- **User**: Access to store features and personal order management

## 🔄 State Management

- **Server State**: Managed using React Query for caching and synchronization
- **Client State**: Redux for cart management
- **Local State**: React useState for component-level state
- **Form State**: Formik for form management

## 🔨 Development

### Code Style

- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture
- Custom hooks for logic reuse

### Best Practices

- Proper error handling
- Loading states management
- Form validation
- Responsive design
- Code splitting for better performance

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile devices

## 🏗️ Project Structure(excluding general files)

   ```bash
   src/
    ├── api/             # API integration layer
    ├── components/      # Reusable components
    ├── hooks/           # Custom React hooks
    ├── pages/           # Page components
    ├── redux/           # Redux store and slices
    ├── types/           # TypeScript interfaces
    ├── utils/           # Utility functions
    └── firebase/        # Firebase configuration
   ```

## 📦 PlayAround (Installation Guide)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/niteshgiri-7/dotEcom.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_API_KEY=[your-firebase-api-key]
   VITE_AUTH_DOMAIN=[your-firebase-auth-domain]
   VITE_PROJECTID=[your-firebase-project-id]
   VITE_STORAGE_BUCKET=[your-storage-bucket]
   VITE_MESSENGING_SENDER_ID=[your-messaging-sender-id]
   VITE_APP_ID=[your-app-id]
   VITE_MESAUREMENT_ID=[your-measurement-id]
   VITE_BACKEND_URL=[your-backend-api-url]
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```


## Ready to jump in?
### Kavi ko ghussa bhot aata hai! 😠 Let's [loot](https://dot-ecom.vercel.app) the store! 🤬




