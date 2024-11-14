import React from 'react';
import Header from '../components/Header';
import FilterPencarianSection from '../components/FilterPencarianSection';
import Footer from '../components/Footer';
import '../assets/styles/FilterPencarianPages.css';

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
