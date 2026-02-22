import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, ShoppingCart } from 'lucide-react';

const Navbar = ({ onOpenLogin, onOpenRegister, cartCount, onOpenCart }) => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Leaf className="text-primary w-8 h-8" />
                        <span className="text-2xl font-serif font-bold text-primary tracking-tight">
                            Shopplants
                        </span>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-6">
                        
                        {/* Botón Carrito */}
                        <button
                            onClick={onOpenCart}
                            className="text-gray-600 hover:text-primary transition-colors relative"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm animate-in zoom-in duration-200">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border border-primary/20">
                                    <User className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">
                                        Hola, {user?.nombre}
                                    </span>
                                </div>

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-accent hover:text-red-600 transition-colors font-medium text-sm"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onOpenLogin}
                                    className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                >
                                    Iniciar Sesión
                                </button>

                                <button
                                    onClick={onOpenRegister}
                                    className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Crear Cuenta
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;