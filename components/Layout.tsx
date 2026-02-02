import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, HeartPulse, Building2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onFinish, 800); // Wait for fade out animation
    }, 2500); // Show splash for 2.5s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-brand-surface flex items-center justify-center transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-6">
           <div className="absolute inset-0 border-2 border-brand-primary rounded-full animate-ping opacity-20" style={{ borderRadius: '50% 50% 50% 0', animationDuration: '3s' }}></div>
           <div className="absolute inset-0 border-2 border-brand-primary rounded-full" style={{ borderRadius: '50% 50% 50% 0' }}></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif italic font-bold text-brand-primary text-5xl animate-pulse-slow">E</span>
           </div>
        </div>
        <span className="text-sm font-bold tracking-[0.4em] uppercase text-brand-heading animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Equilibrar
        </span>
        <span className="text-[10px] text-brand-gold tracking-[0.2em] uppercase mt-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Clinical Luxury
        </span>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Psiquiatría', path: '/psiquiatria' },
    { name: 'Psicología', path: '/psicologia' },
    { name: 'Angustia', path: '/programa-angustia' },
    { name: 'Culpa', path: '/programa-culpa' },
    { name: 'Irritabilidad', path: '/programa-irritabilidad' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-xl shadow-luxury py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center relative h-12 md:h-16">
            
            {/* Desktop Navigation Left (Services) */}
            <div className="hidden md:flex flex-1 justify-start space-x-6">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm tracking-wide text-brand-text hover:text-brand-primary transition-colors font-medium hover:translate-y-1 transform duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Centered Logo */}
            <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-50">
              <Link to="/" className="flex flex-col items-center group" onClick={() => setIsOpen(false)}>
                 <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-1 transition-transform duration-500 group-hover:rotate-12">
                    {/* Abstract Circle Logo */}
                    <div className="absolute inset-0 border-[1.5px] border-brand-primary rounded-full opacity-100 group-hover:scale-105 transition-transform duration-700" style={{ borderRadius: '50% 50% 50% 0' }}></div>
                    <span className="font-serif italic font-bold text-brand-primary text-xl md:text-2xl relative z-10">E</span>
                </div>
                <span className={`text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled || isOpen ? 'text-brand-heading' : 'text-brand-heading'}`}>
                  Equilibrar
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Right (Programs) */}
            <div className="hidden md:flex flex-1 justify-end space-x-6">
               {navLinks.slice(2, 5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm tracking-wide text-brand-text hover:text-brand-primary transition-colors font-medium hover:translate-y-1 transform duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden absolute right-0 z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-heading p-2 focus:outline-none transition-transform duration-300 active:rotate-90"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-sand/95 backdrop-blur-3xl z-40 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} md:hidden pt-32 px-6 overflow-y-auto`}>
           <div className="flex flex-col space-y-8 items-center text-center">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ transitionDelay: `${100 + idx * 50}ms` }}
                  className={`text-3xl font-serif text-brand-heading hover:text-brand-primary transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-12 border-t border-brand-primary/10 w-full max-w-xs space-y-4">
                 <p className="text-xs text-brand-gold uppercase tracking-widest font-bold">Atención Preferencial</p>
                 <button 
                  onClick={() => window.open('https://wa.me/56912345678', '_blank')}
                  className="w-full bg-brand-primary text-white py-4 rounded-full font-medium tracking-wide shadow-luxury flex items-center justify-center gap-2 animate-fade-in-down"
                >
                   <MessageCircle size={18} /> Contactar
                 </button>
              </div>
           </div>
        </div>
      </nav>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-sand/30 text-brand-text pt-16 md:pt-24 pb-24 md:pb-12 border-t border-brand-primary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
          
          <div className="md:col-span-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="w-10 h-10 border border-brand-primary/50 rounded-full flex items-center justify-center text-brand-primary font-serif italic text-lg">E</div>
               <p className="text-sm leading-7 text-gray-500 max-w-xs mx-auto md:mx-0">
                 Integramos psicología clínica, psiquiatría y neurociencia afectiva para guiar procesos de transformación humana profunda y sostenible.
               </p>
            </div>
          </div>

          <div className="md:col-span-4 text-center md:text-left">
             <h4 className="font-serif text-lg mb-4 text-brand-heading">Aviso Importante</h4>
             <p className="text-sm leading-7 text-brand-text font-medium">
               Tras tu compra, el equipo de Equilibrar activará tus credenciales de acceso a la plataforma privada de acompañamiento vía WhatsApp.
             </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
             <h4 className="font-serif text-lg mb-4 text-brand-heading">Cobertura & Reembolso</h4>
             <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-1 border border-brand-primary/10 px-3 py-1.5 rounded bg-white shadow-sm">
                   <Building2 size={14} className="text-brand-primary" /> <span className="text-[10px] font-bold">ISAPRES</span>
                </div>
                <div className="flex items-center gap-1 border border-brand-primary/10 px-3 py-1.5 rounded bg-white shadow-sm">
                   <HeartPulse size={14} className="text-brand-primary" /> <span className="text-[10px] font-bold">SEGUROS</span>
                </div>
             </div>
             <p className="text-xs text-brand-gold mt-4 font-medium">
               Boletas reembolsables en Isapres y Seguros.
             </p>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-brand-primary/5 text-[10px] text-gray-400 uppercase tracking-wider gap-4">
          <p>© 2024 Centro Clínico Equilibrar®</p>
          <div className="flex space-x-6">
             <a href="#" className="hover:text-brand-primary transition-colors">Privacidad</a>
             <a href="#" className="hover:text-brand-primary transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp: React.FC = () => {
  return (
    <button 
      onClick={() => window.open('https://wa.me/56912345678', '_blank')}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-luxury hover:scale-110 transition-transform duration-300 group active:scale-90 animate-fade-in-down"
      style={{ animationDelay: '1.5s' }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} className="group-hover:rotate-12 transition-transform" />
    </button>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface selection:bg-brand-light selection:text-brand-dark overflow-x-hidden">
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;