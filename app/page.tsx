import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedListings from '@/components/home/FeaturedListings';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <FeaturedCategories />
      <FeaturedListings />
      <Stats />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
