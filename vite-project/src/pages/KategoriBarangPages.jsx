import Header from "../components/Header"
import KategoriBarangSection from "../components/KategoriBarangSection"
import Footer from "../components/Footer"
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
