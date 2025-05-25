# Talynx Frontend: AI-Powered HR System

A modern, responsive frontend application for the Talynx AI-Powered HR System built with React, TypeScript, and cutting-edge UI components.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 + TypeScript for type safety
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Built-in theme switching with persistence
- **Component Library**: Beautiful UI components using shadcn/ui
- **Resume Screening Interface**: Intuitive drag-and-drop file upload
- **Real-time Results**: Live candidate ranking and scoring
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance Optimized**: Lazy loading and optimized bundle size

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: shadcn/ui component library
- **State Management**: React Hooks (useState, useEffect)
- **Theme Management**: Custom theme provider with system preference detection
- **Build Tool**: Vite for fast development and builds
- **Type Checking**: TypeScript for enhanced developer experience

## 📋 Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm package manager
- Modern web browser with ES6+ support

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/manogyaguragai/talynx_frontend.git
cd talynx-frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Theme Configuration
VITE_DEFAULT_THEME=light

# Feature Flags (optional)
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false
```

## 📦 Project Structure

```
talynx-frontend/
│
├── public/
│   ├── vite.svg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── theme-provider.tsx     # Theme management
│   │   └── ...
│   ├── pages/
│   │   └── ResumeScreeningPage.tsx # Main application page
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript type definitions
│   ├── services/                 # API service calls
│   ├── App.tsx                   # Main App component
│   ├── App.css                   # App-specific styles
│   ├── index.css                 # Global styles & Tailwind
│   └── main.tsx                  # Application entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Development

### Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`

### Other Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 🎨 UI Components & Theme

### Theme System

The application supports both light and dark themes with automatic system preference detection:

```tsx
// Theme switching
import { useTheme } from '@/components/theme-provider';

const { theme, setTheme } = useTheme();

// Toggle theme
setTheme(theme === 'light' ? 'dark' : 'light');
```

### Custom Components

Built on top of shadcn/ui, the application includes:

- **Responsive Cards**: For displaying candidate information
- **File Upload**: Drag-and-drop resume upload interface
- **Progress Indicators**: Real-time processing feedback
- **Toast Notifications**: User feedback and error handling
- **Loading States**: Skeleton loaders and spinners

### Styling Guidelines

- **CSS Variables**: Theme-aware color system
- **Tailwind Utilities**: Responsive design patterns
- **Component Variants**: Consistent styling across components

## 🔌 API Integration

### Backend Connection

The frontend connects to the Talynx backend API:

```typescript
// Example API service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const uploadResumes = async (jobDescription: string, files: File[]) => {
  const formData = new FormData();
  formData.append('job_desc', jobDescription);
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/rank/`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
```

### Error Handling

Comprehensive error handling with user-friendly messages:

```typescript
// Error boundary and toast notifications
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();

// Success notification
toast({
  title: "Success!",
  description: "Resumes processed successfully.",
});

// Error notification
toast({
  title: "Error",
  description: "Failed to process resumes. Please try again.",
  variant: "destructive",
});
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Mobile Features

- Touch-friendly interactions
- Optimized file upload for mobile browsers
- Responsive typography and spacing
- Mobile-specific navigation patterns

## 🔧 Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... custom color variables
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```


## 🧪 Testing

### Unit Testing

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

### E2E Testing

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

### Performance Features

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Service worker for offline functionality
- **Compression**: Gzip/Brotli compression
- **Tree Shaking**: Unused code elimination

## 🔒 Security

### Content Security Policy

```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### Environment Variables

- Never commit `.env` files with sensitive data
- Use different environment files for different stages
- Validate environment variables at runtime

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow TypeScript and React best practices
2. **Components**: Create reusable, composable components
3. **Styling**: Use Tailwind utilities with semantic class names
4. **Testing**: Write tests for critical functionality
5. **Accessibility**: Ensure WCAG 2.1 AA compliance

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards
4. Add tests for new functionality
5. Update documentation as needed
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Vite Dev Server Issues**
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Styling Issues**
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

**CORS Errors**
- Ensure backend CORS is configured for frontend URL
- Check API base URL in environment variables

**Build Failures**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+


**Manogya Guragai**