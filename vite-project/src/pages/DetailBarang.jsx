import Header from "../components/Header"
import DetailBarangSection from "../components/DetailBarangSection"
import Footer from "../components/Footer"
import '../assets/styles/DetailBarang/DetailBarang.css'


function DetailBarang() {

  return (
    <div className="detail-pages-container">
      <div className="main-content">
        <Header />
        <DetailBarangSection />
      </div>
      <Footer />
    </div>
  )
}

export default DetailBarang
