import Header from "../components/Header"
import Footer from "../components/Footer" 
import FilterPencarian from "../components/FilterPencarian"
import Hero from "../components/Hero"
import KategoriPopuler from "../components/KategoriPopuler"
import BarangTerbaru from "../components/BarangTerbaru"
import ChatBot from "../components/ChatBot"

function Beranda() {
  return (
    <>
    <Header />
    <FilterPencarian />
    <Hero />
    <KategoriPopuler />
    <BarangTerbaru />
    <Footer />
    <ChatBot />
    
    </>
  )
}

export default Beranda
