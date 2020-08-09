import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../assets/images/logo.svg';
import LandigImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';              

function Landing() {
    // eslint-disable-next-line no-lone-blocks
    {/* configurando para receber a informação do total de conexões do back-end. */}
    const [totalConnections, setTotalConnections] = useState(0);
    
    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="Proffi"/>
                    <h2>Plataforma de estudo online</h2>
                </div>

                <img 
                    src={LandigImg} 
                    alt="Platafoma de estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>

                </div>

                    <span className="total-connections">
                        Total de {totalConnections} conexões! <img src={purpleHeartIcon} alt="Coração roxo"/>
                    </span>
            </div>
        </div>
    );
};

export default Landing;