import React, { useState } from 'react';

function Row(props) {

  const [selected, setSelected] = useState(false);


  let registry = props.registry;

  function handleClick() {
    window.location = 'registro/' + registry.id;
  }

  function handleMouseEnter(e) {
    setSelected(true);
  }

  function handleMouseOut(e) {
    setSelected(false);
  }

  return (
    <tr 
      onClick={ handleClick }
      onMouseEnter={ handleMouseEnter }
      onMouseOut={ handleMouseOut }
      className={ selected ? 'is-selected is-clickable' : 'is-clickable' }
      title="Clique para visualisar este registro"
    >
      <td>{ registry.nome }</td>
      <td>{ registry.email }</td>
      <td>{ registry.validado ? 'Validado' : 'Não validado' }</td>
    </tr>
  );
}

export default Row;