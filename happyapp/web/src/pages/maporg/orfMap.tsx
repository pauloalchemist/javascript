import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import './orfMap.css';
import logomap from '../../images/nlw/logomap.svg'
import { FiPlus } from 'react-icons/fi';

function OrfMap() {
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={logomap} alt="Happy"/>
          
          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando sua vissita.</p>
        </header>

        <footer>
          <strong>Feira de Santana</strong>
          <span>Bahia</span>
        </footer>
      </aside>
      
      <Map 
        center={[-12.2585088,-38.9480448]}
        zoom={15}
        style={{width: '100%', height: "100%"}}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to="" className="newOrf">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrfMap;