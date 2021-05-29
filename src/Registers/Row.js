function Row(props) {

  let registry = props.registry;

  return (
    <tr>
      <td>{ registry.nome }</td>
      <td>{ registry.email }</td>
      <td>{ registry.validado ? 'Validado' : 'Não validado' }</td>
    </tr>
  );
}

export default Row;