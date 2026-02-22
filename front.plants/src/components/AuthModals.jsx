import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

const AuthModals = ({ isOpen, type, onClose, onSwitch }) => {
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
            const res = await axios.post(`http://localhost:5000${endpoint}`, formData);

            if (type === 'login') {
                login(res.data.user, res.data.token);
                onClose();
            } else {
                alert('Registro exitoso. Por favor inicia sesión.');
                onSwitch('login');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                <button onClick={onClose} className="absolute right-6 top-6 p-2 text-gray-400 hover:text-primary transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 sm:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif text-primary mb-2">
                            {type === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {type === 'login' ? 'Ingresa para gestionar tus plantas' : 'Únete a nuestra comunidad botánica'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {type === 'register' && (
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    className="w-full pl-12 pr-4 py-3.5 bg-secondary border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full pl-12 pr-4 py-3.5 bg-secondary border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full pl-12 pr-4 py-3.5 bg-secondary border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-70"
                        >
                            {loading ? 'Cargando...' : type === 'login' ? 'Iniciar Sesión' : 'Registrarme'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-gray-500">
                        {type === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        <button
                            onClick={() => onSwitch(type === 'login' ? 'register' : 'login')}
                            className="ml-2 text-primary font-bold hover:underline"
                        >
                            {type === 'login' ? 'Regístrate' : 'Inicia Sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModals;
