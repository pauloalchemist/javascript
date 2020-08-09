import React, { InputHTMLAttributes } from 'react';
// Em InputHtmlAttributes estão todos os atributos que o input pode receber, 
// e precisa receber o parâmetro < > abaixo.

import './styles.css'; 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string; //substituindo subject
    label: string; //ode tinha matéria
};

// React.FC especifica que essa const/function é um compoente react.
// Entre < > fica quais as propriedades que o input poderá receber. 
// Isso é definição de componentes com propriedades tipadas.  
// ...rest tem todas as propriedades que o input pode receber.
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return(
        <div className="input-block">
            <label htmlFor={name}>{label}</label> 
            <input type="text" id={name} {...rest} />
        </div>
    );
};

export default Input;