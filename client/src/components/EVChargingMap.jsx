import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const EVChargingMap = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [inputlocation, setinputlocation] = useState("kannur");

  console.log(storedUser);

  // Set map center to Kannur (Focusing on Iritty)
  const kannurCenter = [11.9946, 75.587]; // Approx. location of Kannur

  // State to store charging stations
  const [chargingStations, setChargingStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storedUser?.address) {
      console.error("User address not found in local storage");
      setLoading(false);
      return;
    }

    const getCoordinates = async (location) => {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`);
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        } else {
          console.log("Location not found.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };

    const loadMapData = async () => {
      fetchChargingStations(storedUser.latitude, storedUser.longitude); // Use storedUser.latitude and storedUser.longitude hereords.lng);
    };
  }, []);

  const fetchChargingStations = async (lat, lon) => {
    console.log(storedUser.latitude, storedUser.longitude);

    const apiKey = "9555c84f-e35f-458b-9709-0774874603d0"; // Replace with your Open Charge Map API key
    const maxResults = 25;
    //   const url = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&latitude=11.875414424662937&longitude=75.3721847513225&maxresults=5&key=9555c84f-e35f-458b-9709-0774874603d0`;

    const url = `https://ev-charge-finder.p.rapidapi.com/search-by-location?near=${inputlocation}&limit=25`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "96c1ececd2msh5693e05cb0db48ap18a068jsn398bfdc712c0",
        "x-rapidapi-host": "ev-charge-finder.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const data = JSON.parse(result).data;
      console.log(data);

      const stations = data.map((station) => ({
        lat: station.latitude,
        lng: station.longitude,
        name: station.name,
      }));

      setChargingStations(stations);
    } catch (error) {
      console.error("Error fetching charging stations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">EV Charging Stations</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter location..."
              onChange={(e) => setinputlocation(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchChargingStations}>
              Search
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading charging stations...</p>
        </div>
      ) : (
        <div className="map-container mt-3" style={{ height: "80vh" }}>
          <MapContainer
            center={kannurCenter}
            zoom={10}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {chargingStations.map((station, index) => (
              <Marker key={index} position={[station.lat, station.lng]}>
                <Popup>{station.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default EVChargingMap;
