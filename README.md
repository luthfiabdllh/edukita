# EduKita - Educational Infrastructure Mapping System

EduKita is an innovative digital platform designed to map and manage educational infrastructure data in the Special Region of Yogyakarta (DIY). This system provides interactive visualization, comprehensive data analysis, and user-friendly school information management.

## 🌟 Key Features

### 📊 Dashboard Analytics
- **Statistical Overview**: Total schools, status distribution (public/private), and accreditation levels
- **Data Visualization**: Interactive charts and graphs for in-depth analysis
- **Regional Distribution**: School mapping by regency/city
- **Level Analysis**: Data breakdown by elementary, junior high, senior high, and vocational schools

### 🗺️ Interactive Map
- **Mapbox Integration**: High-quality maps with various styles
- **Custom Markers**: School pins with color-coding based on education level
- **Popup Information**: Detailed school information with complete details
- **Navigation Tools**: Location search and directions to schools
- **Layer Controls**: Toggle traffic, 3D buildings, and labels

### 🏫 School Data Management
- **CRUD Operations**: Add, edit, delete, and view school details
- **Data Validation**: Input validation to ensure data consistency
- **Form Wizard**: Step-by-step interface for easy data input
- **Export/Import**: Data export features for external analysis

### 🔍 Search & Filter
- **Advanced Search**: Search by name, NPSN, or location
- **Multi-filter**: Filter by level, status, accreditation, and region
- **Real-time Results**: Responsive and fast search results

### ⚙️ Customization
- **Theme Support**: Light, dark, and system theme
- **Map Styles**: Streets, satellite, dark, light, and outdoor themes
- **User Preferences**: Saveable personal settings

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern React component library
- **Mapbox GL JS**: Interactive maps
- **Recharts**: Data visualization library

### Backend & Database
- **NextAuth.js**: Authentication system
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Sonner**: Toast notifications

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Geist Font**: Modern typography

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── dashboard-overview.tsx
│   ├── school-map.tsx
│   ├── add-school-dialog.tsx
│   ├── edit-school-dialog.tsx
│   ├── school-detail-dialog.tsx
│   ├── settings-dialog.tsx
│   └── app-sidebar.tsx
├── types/                # TypeScript definitions
├── lib/                  # Utility functions
└── hooks/                # Custom React hooks
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Git

### 1. Clone Repository
```bash
git clone https://github.com/luthfiabdllh/edukita.git
cd edukita
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create `.env.local` file in root directory:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-project-url
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token
NEXT_PUBLIC_API_BASE_URL=backend-url
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Main Components

### DashboardOverview
Main component for displaying school statistics and analytics with various charts and data visualizations.

### SchoolMap
Interactive map with Mapbox displaying school locations with custom markers and information popups.

### School Dialogs
- **AddSchoolDialog**: Form for adding new schools
- **EditSchoolDialog**: Form for editing school data
- **SchoolDetailDialog**: Detailed school information display

### AppSidebar
Navigation sidebar with main menu and application settings.

## 🎨 Customization

### Themes
The application supports 3 theme modes:
- **Light**: Bright theme for daytime use
- **Dark**: Dark theme to reduce eye strain
- **System**: Follows operating system settings

### Map Styles
- **Streets**: Standard road map with complete details
- **Satellite**: Satellite imagery with geographical details
- **Dark**: Dark theme for night viewing
- **Light**: Light theme with high contrast
- **Outdoors**: Outdoor map with topographical contours

## 📱 Responsive Design

The application is optimized for various screen sizes:
- **Desktop**: Full features with sidebar and multi-column layout
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-first design with bottom navigation

## 🔒 Authentication

The system uses NextAuth.js for authentication:
- **Admin Login**: Full access to all features
- **Session Management**: Automatic session handling
- **Protected Routes**: Route protection for admin pages

## 📈 Performance

### Optimizations
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Strategic caching for performance

### Bundle Size
```bash
npm run build
npm run analyze  # For bundle analysis
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Deploy to Other Platforms
- **Netlify**: Drag & drop build folder
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Deploy with App Platform

## 🤝 Contributing

We welcome contributions from the developer community!

### Development Workflow
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

## 👥 Development Team

- **Dimal Karim A** - Supervisor
- **Lutfi Abdillah** - Full Stack Developer
- **Asyifa Dzaky Maulana A** - Backend Developer  
- **Muhammad Najwan Fadlillah** - Data Scientist & Paper Writer
- **Rifqi Renaldo** - Videographer
- **Devangga Arya Hartanta** - Graphic Designer
- **Aurelius Bevan Yudira P** - Video Editor

## 📄 License

This project uses the MIT License. See the `LICENSE` file for details.

## 📞 Contact & Support

- **Email**: edukita.support@gmail.com
- **Phone**: +62 (274) 123456 (ext. 123)
- **Office**: Department of Electrical and Information Engineering, Universitas Gadjah Mada, Yogyakarta, Indonesia
- **Hours**: 09:00–16:00 WIB (Monday–Friday)

## 🔗 Links

- **Live Demo**: [https://edukita-xi.vercel.app/](https://edukita-xi.vercel.app/)
- **GitHub**: [https://github.com/luthfiabdllh/edukita](https://github.com/luthfiabdllh/edukita)

## 📋 Changelog

### v1.0.0 (2025-06-09)
- ✨ Initial release
- 🗺️ Interactive map with Mapbox
- 📊 Dashboard analytics
- 🏫 School management system
- 🔐 Authentication system
- 📱 Responsive design

---

**EduKita** © 2025 - Educational Infrastructure Mapping System of Special Region of Yogyakarta