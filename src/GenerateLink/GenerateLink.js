import React, { useState } from 'react';

function GenerateLink() {

  const urlSufix = '/registrar';
  const [formattedName, setFormattedName] = useState('');

  function handleNameChange(e) {
    const value = e.target.value;
    setFormattedName(formatName(value))
  }

  function formatName(name) {
    return name.replaceAll(' ', '+');
  }

  return (
    <section>
      <div className="box">
        <h1 className="title is-3">Criar Link de convite</h1>
        <span className="subtitle">Adicione o nome para podermos gerar o link:</span>
        <br/>
        <br/>
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" onChange={ handleNameChange } />
          </div>
        </div>
        <div className="field">
          <label className="label">Link Gerado</label>
          <div className="control">
            <a href={ formattedName + urlSufix }>{ formattedName + urlSufix }</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenerateLink;
