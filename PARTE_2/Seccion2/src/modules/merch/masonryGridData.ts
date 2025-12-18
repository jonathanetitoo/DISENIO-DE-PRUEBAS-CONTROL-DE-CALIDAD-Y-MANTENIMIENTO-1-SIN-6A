// types/product.ts
export interface Product {
	id: number;
	name: string;
	brand: string;
	price: string;
	image: string;
	slug: string;
	rating?: number;
	reviews?: number;
	description?: string;
	categories?: string[];
	tags?: string[];
	inStock?: boolean;
	onSale?: boolean;
	salePrice?: string;
	colors?: string[];
	sizes?: string[];
}

export interface ProductCardProps {
	product: Product;
}

export interface MasonryGalleryProps {
	products: Product[];
	title?: string;
	columns?: number;
}
