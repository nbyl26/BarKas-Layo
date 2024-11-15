import Header2 from "../components/Header2"
import Footer from "../components/Footer"
import KebijakanPrivasiSection from "../components/KebijakanPrivasiSection"
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
