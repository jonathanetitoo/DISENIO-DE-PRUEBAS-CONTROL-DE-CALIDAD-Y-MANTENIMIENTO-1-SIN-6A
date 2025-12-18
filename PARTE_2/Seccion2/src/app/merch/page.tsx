// pages/app.tsx
import { NextPage } from 'next';
import TrueMasonryGallery from '@/modules/merch/page';

const App: NextPage = () => {
	return (
		<main className="mt-8">
			<TrueMasonryGallery />
		</main>
	);
};

export default App;
