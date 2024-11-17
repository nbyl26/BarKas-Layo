import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import KategoriBarang from "../components/category/KategoriBarang"
import '../assets/styles/Category/Kategori.css'


function Kategori() {
  return (
    <div className="category-pages-container">
      <div className="main-content">
        <Header />
        <KategoriBarang />
      </div>
      <Footer />
    </div>
  )
}

export default Kategori
