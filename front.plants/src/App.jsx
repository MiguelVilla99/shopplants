import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PlantList from './components/PlantList';
import AuthModals from './components/AuthModals';
import CartModal from './components/CartModal';

function AppContent() {
  const [modalType, setModalType] = useState(null); // 'login', 'register' or null
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (plant) => {
    setCart(prevCart => [...prevCart, plant]);
    console.log(`Añadido al carrito: ${plant.nombre}`);
  };

  const handleRemoveFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onOpenLogin={() => setModalType('login')}
        onOpenRegister={() => setModalType('register')}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="bg-secondary/30">
        <PlantList onAddToCart={handleAddToCart} />
      </main>

      <footer className="bg-white border-t border-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-sans tracking-wide">
            2026 Shopplants. Hecho con amor por la naturaleza.
          </p>
        </div>
      </footer>

      <AuthModals
        isOpen={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
        onSwitch={(type) => setModalType(type)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
