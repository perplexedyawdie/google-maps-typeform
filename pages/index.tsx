import type { NextPage } from 'next'
import GoogleMapView from '../components/google-map'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <section className="hero map-background is-fullheight ">
      <div className="hero-body">
        <div className="container">
          <Header />
          <GoogleMapView />
        </div>
      </div>
    </section>
  )
}

export default Home
