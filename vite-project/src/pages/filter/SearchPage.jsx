import Header from "../../components/header/Header"
import SearchPageSection from "../../components/search/SearchPageSection"
import Footer from "../../components/footer/Footer"

function SearchPage() {
  return (
    <div className="search-pages-container">
      <div className="main-content">
        <Header />
        <SearchPageSection />
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage
