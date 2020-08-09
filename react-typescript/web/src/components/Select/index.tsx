import React, { SelectHTMLAttributes } from 'react';
// Em SelectHtmlAttributes estão todos os atributos que o Select pode receber, 
// e precisa receber o parâmetro < > abaixo.

import './styles.css'; 

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string; //substituindo subject
    label: string; //ode tinha matéria
    options: Array<{
        value: string;
        label: string;
    }>;
};
 
// Copiado co componente input.
// a tag select uma forma de fazer estrutura de repetição no react.
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label> 
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>-- Selecione uma opção --</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
};

export default Select;