import Header2 from "../components/header/Header2"
import Footer from "../components/footer/Footer"
import KebijakanPrivasiSection from "../components/pages/KebijakanPrivasiSection"
import '../assets/styles/PrivacyPolicy/KebijakanPrivasi.css'

function KebijakanPrivasi() {
  return (
    <div className="policy-pages-container">
      <div className="main-content">
        <Header2 />
        <KebijakanPrivasiSection />
      </div>
      <Footer />
    </div>
  )
}

export default KebijakanPrivasi
