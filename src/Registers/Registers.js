import React, { useState, useEffect } from 'react';
import Row from '../Registers/Row';
import axios from 'axios';

function Register() {

  const [registers, setRegisters] = useState([]);

  function fetchRegisters() {
    axios.get('http://localhost:3001/users')
      .then(function (response) {
        setRegisters(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchRegisters();
  }, []);


  function placeRows() {
    if (registers.length === 0) {
      return (
        <tr>
          <td colSpan="3" style={{"textAlign": "center"}} >
            Não há registros para mostrar.
          </td>
        </tr>
      );
    }
    return registers.map(registry => {
      return (
        <Row key={ registry.id } registry={ registry } />
      );
    });
  }

  return (
    <section>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Validado</th>
          </tr>
        </thead>
        <tbody>
          { placeRows() }
        </tbody>
      </table>
    </section>
  );
}

export default Register;
