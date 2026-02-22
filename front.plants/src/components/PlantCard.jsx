import { ShoppingCart } from 'lucide-react';

const PlantCard = ({ plant, onAddToCart }) => {
    const isVertical = plant.layout === 'vertical';

    // Función de recuperación silenciosa: cambia la imagen sin ensuciar la consola
    const handleImageError = (e) => {
        const backupUrl = `https://picsum.photos/seed/${plant.id + 10}/500/600`;
        // Solo cambiamos si la imagen actual no es ya la de respaldo para evitar bucles infinitos
        if (e.target.src !== backupUrl) {
            e.target.src = backupUrl;
        }
    };

    // Estilos base para las imágenes
    const imageStyles = "w-full h-full object-cover hover:scale-105 transition-transform duration-500";

    if (isVertical) {
        return (
            <div className="bg-white rounded-xl overflow-hidden shadow-md plant-card-shadow border border-primary/5 flex flex-col h-full uppercase-titles group">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                        src={plant.image}
                        alt={plant.nombre}
                        onError={handleImageError}
                        className={imageStyles}
                        loading="lazy"
                    />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif text-primary mb-2 leading-tight uppercase tracking-wide">{plant.nombre}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow font-sans italic">
                        {plant.descripcion}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-accent">${plant.precio.toFixed(2)}</span>
                        <button
                            onClick={() => onAddToCart(plant)}
                            className="p-2.5 bg-secondary text-primary rounded-full hover:bg-primary hover:text-white transition-all active:scale-90 border border-primary/10 shadow-sm"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-2 bg-white rounded-xl overflow-hidden shadow-md plant-card-shadow border border-primary/5 flex h-[280px] group">
            <div className="w-[40%] overflow-hidden bg-gray-100">
                <img
                    src={plant.image}
                    alt={plant.nombre}
                    onError={handleImageError}
                    className={imageStyles}
                    loading="lazy"
                />
            </div>
            <div className="w-[60%] p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-serif text-primary mb-3 uppercase tracking-wide">{plant.nombre}</h3>
                <p className="text-gray-500 text-sm mb-6 font-sans italic pr-4 line-clamp-3">
                    {plant.descripcion}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">${plant.precio.toFixed(2)}</span>
                    <button
                        onClick={() => onAddToCart(plant)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all active:scale-95 shadow-md"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;