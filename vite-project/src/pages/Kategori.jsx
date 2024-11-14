import Header from "../components/Header"
import Footer from "../components/Footer"
import KategoriBarang from "../components/KategoriBarang"
import '../assets/styles/Kategori.css'


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
