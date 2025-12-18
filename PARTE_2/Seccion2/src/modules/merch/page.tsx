// pages/index.tsx
import { NextPage } from 'next';
import TrueMasonryGallery from './masonryGrid';
import { Product } from './masonryGridData';

const Home: NextPage = () => {
	// Mock product data - replace with your actual data
	const products: Product[] = [
		{
			id: 1,
			name: 'Sapphire Vintage-Inspired Ring',
			brand: 'Luxurious Heirloom Jewels',
			price: 'From $20.00',
			image:
				'https://www.modarm.com/medias/000005000000932137-1200-1.jpg?context=bWFzdGVyfGltYWdlc3w0MjM2OTd8aW1hZ2UvanBlZ3xhRGxoTDJoaU1TOHpNRFkyTURNME1URXpOelF6T0M4d01EQXdNRFV3TURBd01EQTVNekl4TXpjdE1USXdNRjh4TG1wd1p3fDAzODQxZTdlMTkzNDBjNjZhNmJmYmVmNzUwMzcxZjc0NmRmODMwNDYyMTM5YjJjY2NkNjMzNDc3YzdhMjg4ZWE',
			slug: 'sapphire-ring',
			rating: 4.85,
			reviews: 3,
		},

		{
			id: 7,
			name: 'Sapphire Vintage-Inspired Ring',
			brand: 'Luxurious Heirloom Jewels',
			price: 'From $20.00',
			image:
				'https://i.pinimg.com/736x/fb/bf/77/fbbf77bd2de1bb3c992b7eb1ad8a1a73.jpg',
			slug: 'sapphire-ring',
			rating: 4.85,
			reviews: 3,
		},
		{
			id: 2,
			name: 'Portable Bluetooth Speaker',
			brand: 'SoundWave',
			price: '$79.99',
			image:
				'https://www.gap.com.pe/media/catalog/product/7/5/750656_gp02_1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1150&width=858&canvas=858:1150',
			slug: 'portable-speaker',
		},
		{
			id: 3,
			name: 'Minimalist Pendant Light',
			brand: 'ModernLux',
			price: '$45.00',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'pendant-light',
		},
		{
			id: 4,
			name: 'Classic Sunglasses',
			brand: 'ShadeStyle',
			price: '$59.99',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'classic-sunglasses',
		},
		{
			id: 5,
			name: 'Decorative Marble Plate',
			brand: 'ArtHome',
			price: '$32.50',
			image:
				'https://i.pinimg.com/736x/88/2a/0d/882a0d92198f2902e051d738aa7dbdbe.jpg',
			slug: 'marble-plate',
		},
		{
			id: 6,
			name: 'Modern Ceramic Vase',
			brand: 'ElegantDecor',
			price: '$28.99',
			image:
				'https://thenorthfaceec.vteximg.com.br/arquivos/ids/181384-861-1000/NF0A4R2AHRN_1.jpg?v=637897892907900000',
			slug: 'ceramic-vase',
		},
	];

	return (
		<main>
			<TrueMasonryGallery products={products} />
		</main>
	);
};

export default Home;
