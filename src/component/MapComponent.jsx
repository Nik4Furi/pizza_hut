"use client"


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const position = [20.5937, 78.9629]

const MapComponent = ({ data }) => {

    const handleMarkerClick = (map, lat, lon) => {
        // Set the desired zoom level
    
        // Fly to the clicked marker with the desired zoom level
        setTimeout(()=>{

            map.setView([lat, lon], 7.75);
        },1000)
        setTimeout(()=>{

            map.setView([lat, lon], 8);
        },1580)
      };



    //---------- Customize icon
    const CustomIcon = new L.Icon({
        iconUrl: '/logo.png',
        iconSize: [32, 32], // width and height of the icon
        iconAnchor: [16, 32], // position of the icon anchor
        popupAnchor: [0, -32], // position of the popup anchor
    });

    return (
        <>

            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }}
                center={position}
                zoom={5}
                worldCopyJump={true}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap || Contributing With Nik 🗺️</a> contributors'
                />

                {/* ----------- Marking the poppups, in the fix points  */}
                {data?.map((feature, index) => (
                    <Marker
                        key={index}
                        position={[
                            feature.geometry.coordinates[1],
                            feature.geometry.coordinates[0],
                        ]}
                        icon={CustomIcon}

                        eventHandlers={{
                            click: (e) =>
                              handleMarkerClick(
                                e.target._map, // Access the map instance from the marker
                                feature.geometry.coordinates[1],
                                feature.geometry.coordinates[0]
                              ),
                          }}
                    >
                        <Popup>{makePopupContent(feature)}</Popup>
                    </Marker>
                ))}

            </MapContainer>
        </>
    )
};

export default MapComponent;


function makePopupContent(shop) {
    return (
        <div >
             <h2 className='text-white px-5 py-3 text-center my-3 border rounded-md bg-red-500 font-bold '>{shop.properties.name}</h2>
            <p >{shop.properties.address}</p>
            <div className="phone-number">
                <a href="tel:${shop.properties.phone}"> 📞 {shop.properties.phone}</a>
            </div>
        </div>
    )
}