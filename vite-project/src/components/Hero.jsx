import { Link } from 'react-router-dom'
import '../assets/styles/hero.css'

function Hero() {
  return (
    <section className="hero">
            <div className="container">
                <h1>Temukan Barang Bekas Berkualitas di Indralaya</h1>
                <p>Beli dan jual barang bekas dengan mudah dan aman</p>
                <Link to="/SemuaBarang" className="cta-button">Mulai Menjelajah</Link>
            </div>
    </section>
  )
}

export default Hero
