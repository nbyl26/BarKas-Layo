import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import FilterPencarian from "../components/home/FilterPencarian"
import Hero from "../components/home/Hero"
import KategoriPopuler from "../components/home/KategoriPopuler"
import BarangTerbaru from "../components/home/BarangTerbaru"
import ChatBot from "../components/home/ChatBot"
import '../assets/styles/Beranda/Beranda.css'

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
