import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.js';
import { Header } from './components/Header.js';
import { Navbar } from './components/Navbar.js';
import { HeroBanner } from './components/HeroBanner.js';
import { HighlightBanners } from './components/HighlightBanners.js';
import { TrustBadges } from './components/TrustBadges.js';
import { CategoryGrid } from './components/CategoryGrid.js';
import { BestSellers } from './components/BestSellers.js';
import { WhyChooseUs } from './components/WhyChooseUs.js';
import { Testimonials } from './components/Testimonials.js';
import { Newsletter } from './components/Newsletter.js';
import { Footer } from './components/Footer.js';
import { ToastContainer } from './components/ToastContainer.js';
import { ProductModal } from './components/ProductModal.js';
import { CartDrawer } from './components/CartDrawer.js';
import { CheckoutModal } from './components/CheckoutModal.js';
import { TrackOrderModal } from './components/TrackOrderModal.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { SupplierDashboard } from './components/SupplierDashboard.js';
import { PaymentSuccessPage } from './pages/payment.success.js';
import { PaymentFailedPage } from './pages/payment.failed.js';
import { PolicyPages } from './components/PolicyPages.js';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950">
      <Header />
      <Navbar />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroBanner />
            <HighlightBanners />
            <TrustBadges />
            <CategoryGrid />
            <BestSellers />
            <WhyChooseUs />
            <Testimonials />
          </>
        )}

        {activePage === 'shop' && <BestSellers />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'supplier' && <SupplierDashboard />}
        {activePage === 'payment-success' && <PaymentSuccessPage />}
        {activePage === 'payment-failed' && <PaymentFailedPage />}

        {['about', 'contact', 'faq', 'privacy', 'terms', 'refund', 'shipping'].includes(activePage) && (
          <PolicyPages />
        )}
      </main>

      <Newsletter />
      <Footer />

      {/* Global Overlays & Modals */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <TrackOrderModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
