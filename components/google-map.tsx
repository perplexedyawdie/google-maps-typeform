import type { NextPage, NextComponentType } from 'next'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 46.029999,
    lng: -74.050003
};

const GoogleMapView: NextComponentType = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [map, setMap] = useState(null);
    const [lat, setLat] = useState<number | null>(null)
    const [lng, setLng] = useState<number | null>(null)
    const [coords, setCoords] = useState<google.maps.LatLng>()
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (lat && lng && coords && map) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [lat, lng, coords, map])

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleLocationClick = (latlng: google.maps.LatLng | null) => {
        if (latlng) {
            console.log('Coords of selected location');
            console.log(latlng.toJSON());
            setLat(latlng.toJSON().lat);
            setLng(latlng.toJSON().lng);
            setCoords(latlng)
        }
    }

    const submit = () => {
        if (lat && lng) {
            const typeformURL: URL = new URL(`https://1ti09isrw80.typeform.com/to/OjrUZZI1#lat=${lat}&lng=${lng}`);
            window.open(typeformURL);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Hey there, select a location to continue'
            })
        }
    }
    return (
        <>
            <div className="box p-0">
                {
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            onClick={({ latLng }) => handleLocationClick(latLng)}
                        >
                            {
                                lat && lng && coords ?
                                    <Marker
                                        icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                                        position={{ lat, lng }}
                                    /> : null
                            }
                            <></>
                        </GoogleMap>
                    ) : <></>
                }
            </div>
            <div className="box">
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input" type="text" placeholder="Latitude" value={lat?.toString() || ''} disabled />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input is-success" type="email" placeholder="Longitude" value={lng?.toString() || ''} disabled />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-centered mt-6">
                    <p className="control">
                        <button className="button is-success" onClick={() => submit()} disabled={disabled}>
                            Continue to form
                        </button>
                    </p>
                </div>
            </div>
        </>

    )
}

export default GoogleMapView
