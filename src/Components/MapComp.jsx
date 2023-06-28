
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
function MapComp() {
    const position = [16.509002474986342, 80.64795113104373]; // Default position: London
    const markerIcon = new Icon({
        iconUrl: 'https://lh5.googleusercontent.com/p/AF1QipP5We8k6hHmdoVAkSsFl8ePVg8oyfxe9B0PVXdO=w408-h306-k-no', // Specify the path to the marker icon
        iconSize: [25, 41], // Specify the size of the icon
        iconAnchor: [12, 41], // Specify the anchor point of the icon
        popupAnchor: [0, -35] // Specify the anchor point of the popup
      });
    return (
      <MapContainer center={position} zoom={13} style={{ height: '200px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            Christ The King school
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
  
  export default MapComp;
  