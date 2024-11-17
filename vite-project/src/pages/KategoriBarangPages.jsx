import Header from "../components/header/Header"
import KategoriBarangSection from "../components/category/KategoriBarangSection"
import Footer from "../components/footer/Footer"
import '../assets/styles/Category/KategoriBarangPages.css'


function KategoriBarangPages() {
  return (
    <div className="category-pages-container">
      <div className="main-content">
        <Header />
        <KategoriBarangSection />
      </div>
      <Footer />
    </div>
  )
}

export default KategoriBarangPages
