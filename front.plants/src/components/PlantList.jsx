import { useEffect, useState } from 'react';
import axios from 'axios';
import PlantCard from './PlantCard';

const PlantList = ({ onAddToCart }) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setPlants(res.data);
            } catch (err) {
                console.error('Error fetching plants:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Deterministic rendering based on orientation
    const renderRows = () => {
        const verticalPlants = plants.filter(p => p.layout === 'vertical');
        const horizontalPlants = plants.filter(p => p.layout === 'horizontal');

        return (
            <>
                {/* Row 1: 4 Vertical cards */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {verticalPlants.slice(0, 4).map(p => <PlantCard key={p.id} plant={p} onAddToCart={onAddToCart} />)}
                </div>

                {/* Row 2: 4 Horizontal cards (2 wide per row) */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {horizontalPlants.slice(0, 4).map(p => <PlantCard key={p.id} plant={p} onAddToCart={onAddToCart} />)}
                </div>

                {/* Row 3: 4 Vertical cards */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {verticalPlants.slice(4, 8).map(p => <PlantCard key={p.id} plant={p} onAddToCart={onAddToCart} />)}
                </div>

                {/* Row 4: 4 Horizontal cards (2 wide per row) */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {horizontalPlants.slice(4, 8).map(p => <PlantCard key={p.id} plant={p} onAddToCart={onAddToCart} />)}
                </div>
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif text-primary mb-4 tracking-tight">Nuestra Colección</h2>
                <p className="text-accent font-sans max-w-2xl mx-auto">Seleccionamos cada planta por su belleza y facilidad de cuidado. Transforma tu hogar en un oasis orgánico.</p>
            </div>
            {renderRows()}
        </div>
    );
};

export default PlantList;
