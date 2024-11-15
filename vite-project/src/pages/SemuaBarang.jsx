import Header from "../components/Header"
import Footer from "../components/Footer"
import SemuaBarangSection from "../components/SemuaBarangSection"
import '../assets/styles/SemuaBarang/SemuaBarang.css' 

function SemuaBarang() {
  return (

    <div className="all-pages-container">
      <div className="main-content">
        <Header />
        <SemuaBarangSection />
      </div>
      <Footer />
    </div>
  )
}

export default SemuaBarang
