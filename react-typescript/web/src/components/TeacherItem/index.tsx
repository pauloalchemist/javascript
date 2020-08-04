import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/64275070?s=460&u=982ae5886f18e579b6d375d940016b6ed4599927&v=4" alt="Paulo Lins" />
                <div>
                    <strong>Paulo Lins</strong>
                    <span>Filosofia</span>
                </div>
            </header>

            <p>
                Entusiasta da filosofia de Hannah Arendt, Aristotéles
                e Ludwig Wittgenstein. E também curioso pelo mundo das tecnologias.
                        <br /><br />
                        Já gerou centenas de hipoteses, questionamentos e soluções que mudaram, para melhor, a realidade
                        de várias pessoas e organizações.
                    </p>

            <footer>
                <p>
                    Preço/hora:
                            <strong>R$ 70,00</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    );
};

export default TeacherItem

