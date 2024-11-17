import Header2 from "../components/header/Header2"
import Footer from "../components/footer/Footer"
import JualBarangSection from "../components/barang/JualBarangSection"
import '../assets/styles/JualBarang/JualBarang.css' 

function JualBarang() {
  return (
    <div className="sell-pages-container">
      <div className="main-content">
        <Header2 />
        <JualBarangSection />
      </div>
      <Footer />
    </div>
  )
}

export default JualBarang
