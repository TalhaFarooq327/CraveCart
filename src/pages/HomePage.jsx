import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import PopularItems from '../components/home/PopularItems';
import Promos from '../components/home/Promos';
import HowItWorks from '../components/home/HowItWorks';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <FeaturedRestaurants />
      <PopularItems />
      <Promos />
      <HowItWorks />
    </div>
  );
}
