import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Registry() {

  const [registry, setRegistry] = useState({});

  let params = useParams();

  function fetchRegistry() {
    axios.get('http://localhost:3001/users/' + params.id)
      .then(function (response) {
        setRegistry(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchRegistry();
  }, []);

  function invalidateHandler() {
    axios.put('http://localhost:3001/users/' + params.id + '/invalidate').then(() => {
      fetchRegistry();
    });
  }

  function validadeHandler() {
    axios.put('http://localhost:3001/users/' + params.id + '/validate').then(() => {
      fetchRegistry();
    });
  }

  return (
    <section>
      <br/>
      <h1 className="title is-3">{ registry.nome }</h1>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Celular</th>
            <th>Validado</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ registry.id }</td>
            <td>{ registry.nome }</td>
            <td>{ registry.email }</td>
            <td>{ registry.cpf }</td>
            <td>{ registry.celular }</td>
            <td>{ registry.validado ? 'Validado' : 'Não validado' }</td>
            <td>{ registry.validado ? <button className="button is-danger" onClick={ invalidateHandler }>Invalidar</button> : <button className="button is-success" onClick={ validadeHandler }>Validar</button> }</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Registry;
