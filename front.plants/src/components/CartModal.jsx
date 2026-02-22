import { X, Trash2, ShoppingBag } from 'lucide-react';

const CartModal = ({ isOpen, onClose, items, onRemove }) => {
    if (!isOpen) return null;

    const total = items.reduce((acc, item) => acc + item.precio, 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6" />
                        <h2 className="text-xl font-serif font-bold">Tu Carrito</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12 flex flex-col items-center gap-4">
                            <div className="bg-secondary/30 p-4 rounded-full">
                                <ShoppingBag className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-sans">Tu carrito está vacío todavía.</p>
                            <button
                                onClick={onClose}
                                className="text-primary font-semibold hover:underline"
                            >
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex items-center gap-4 bg-secondary/20 p-3 rounded-xl border border-primary/5 hover:border-primary/20 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-serif text-primary font-bold">{item.nombre}</h4>
                                    <p className="text-accent font-bold">${item.precio.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => onRemove(index)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Eliminar producto"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 font-sans uppercase tracking-wider text-sm font-bold">Total estimado</span>
                            <span className="text-2xl font-serif font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]">
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
