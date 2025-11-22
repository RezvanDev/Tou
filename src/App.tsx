import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ToursPage from './pages/ToursPage';
import CityPage from './pages/CityPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import SustainabilityPage from './pages/SustainabilityPage';
import ProfessionalismInSustainabilityPage from './pages/ProfessionalismInSustainabilityPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-beige-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:country" element={<ToursPage />} />
            <Route path="/city/:cityId" element={<CityPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:packageId" element={<PackageDetailPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/sustainability/professionalism" element={<ProfessionalismInSustainabilityPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;