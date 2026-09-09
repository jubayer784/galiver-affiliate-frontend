import OrderStats from '@/components/OrderStats';
import TopSellingProducts from '@/components/TopSellingProducts';

export const metadata = { title: 'Product Dashboard' };

export default function Dashboard(){return <main className="shell" style={{paddingBottom:'110px'}}><OrderStats /><TopSellingProducts /></main>}
