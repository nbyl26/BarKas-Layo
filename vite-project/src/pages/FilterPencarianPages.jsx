import React from 'react';
import Header from '../components/header/Header';
import FilterPencarianSection from '../components/FilterPencarianSection';
import Footer from '../components/footer/Footer';
import '../assets/styles/Beranda/FilterPencarian/FilterPencarianPages.css';

function FilterPencarianPages() {
  return (
    <div className="filter-pages-container">
      <div className="main-content">
        <Header />
        <FilterPencarianSection />
      </div>
      <Footer />
    </div>
  );
}

export default FilterPencarianPages;
