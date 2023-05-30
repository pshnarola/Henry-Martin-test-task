
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { v4 as uuidv4 } from 'uuid';

import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

type Tinfo = {
    countryName: string,
    activeCase: number,
    receoverd: number,
    death: number,

}

type MarkerState = {
    position: Array<number>,
    info: Tinfo
}

const Map = (): JSX.Element => {

    const [makerList, setMarkerData] = useState<MarkerState[]>([])

    const fetchCovideInfo = async () => {
        const res = await fetch('https://disease.sh/v3/covid-19/countries');
        return res.json();
    };

    const { data, isLoading } = useQuery('covidReport', fetchCovideInfo);

    useEffect(() => {
        const tempData: MarkerState[] = [];
        if (!isLoading && data?.length > 0) {
            data?.map((country: any) => {
                const obj = {
                    id: uuidv4(),
                    position: [country?.countryInfo?.lat, country?.countryInfo?.long],
                    info: { countryName: country?.country, activeCase: country?.active, receoverd: country?.recovered, death: country?.deaths }
                }
                tempData.push(obj);
            })
            setMarkerData(tempData)
        }
    }, [data])


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Graphs</h1>
            {isLoading ? 'Fetching...' :
                <MapContainer center={[20.593683, 78.962883]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {makerList?.map((item: any) =>
                        <Marker key={item?.id} position={item?.position}>
                            <Popup>
                                <p><span className='font-bold'>Country :</span> {item?.info?.countryName}</p>
                                <p><span className='font-bold'>Active Cases</span> : {item?.info?.activeCase.toLocaleString("en-IN")}</p>
                                <p><span className='font-bold'>Receoverd :</span> {item?.info?.receoverd.toLocaleString("en-IN")}</p>
                                <p><span className='font-bold'>Death :</span> {item?.info?.death.toLocaleString("en-IN")}</p>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            }
        </div>
    )
}

export default Map