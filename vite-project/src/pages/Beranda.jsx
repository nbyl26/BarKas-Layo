import Header from "../components/Header"
import Footer from "../components/Footer"
import FilterPencarian from "../components/FilterPencarian"
import Hero from "../components/Hero"
import KategoriPopuler from "../components/KategoriPopuler"
import BarangTerbaru from "../components/BarangTerbaru"
import ChatBot from "../components/ChatBot"
import '../assets/styles/Beranda.css'

function Beranda() {
  return (
    <div className="beranda-pages-container">
      <div className="main-content">
        <Header />
        <FilterPencarian />
        <Hero />
        <KategoriPopuler />
        <BarangTerbaru />
      </div>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Beranda
