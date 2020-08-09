import React, { TextareaHTMLAttributes } from 'react';
// Em TextareaHtmlAttributes estão todos os atributos que o Textarea pode receber, 
// e precisa receber o parâmetro < > abaixo.

import './styles.css'; 

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string; //substituindo subject
    label: string; //ode tinha matéria
};

// React.FC especifica que essa const/function é um compoente react.
// Entre < > fica quais as propriedades que o Textarea poderá receber. 
// Isso é definição de componentes com propriedades tipadas.  
// ...rest tem todas as propriedades que o Textarea pode receber.
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return(
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label> 
            <textarea id={name} {...rest} />
        </div>
    );
};

export default Textarea;