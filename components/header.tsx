import type { NextComponentType, NextPage } from 'next'
import GoogleMapView from '../components/google-map'

const Header: NextComponentType = () => {
  return (
    <div className="m-6">
        <h1 className="title has-text-centered has-text-white">Select a Location</h1>
    </div>
  )
}

export default Header
