import ByPopularCategoriesSection from "@/components/sections/ByPopularCategoriesSection";
import CategoriesListSection from "@/components/sections/CategoriesListSection";
import HeroSection from "@/components/sections/HeroSection";
import PopularWriterSection from "@/components/sections/PopularWriterSection";
import TrendingSection from "@/components/sections/TrendingSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesListSection />
      <TrendingSection />
      <PopularWriterSection />
      <ByPopularCategoriesSection />
    </div>
  );
};

export default HomePage;
