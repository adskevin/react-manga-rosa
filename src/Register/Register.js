import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { validate } from 'node-cpf';
import emailValidator from 'email-validator';
import axios from 'axios';

function Register() {

  let params = useParams();

  const [cpf, setCpf] = useState('');
  const [cpfInvalid, setCpfInvalid] = useState(false);

  const [email, setEmail] = useState('');
  const [emailInvalid, setEmaiInvalid] = useState(true);

  const [name, setName] = useState(filterName(params.name));

  const [phone, setPhone] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);

  const [acquirements, setAcquirements] = useState([]);
  const [activeAcquirements, setActiveAcquirements] = useState([]);
  const [acquirementsValid, setAcquirementsValid] = useState(true);

  function cpfHandler(e) {
    let value = e.target.value;
    if (value.length === 0) {
      setCpfInvalid(false);
      return;
    }
    if (value.slice(-1) !== '_') {
      let valid = validate(value);
      setCpfInvalid(!valid);
    }
    setCpf(value);
  }

  function emailHandler(e) {
    let value = e.target.value;
    if (value.length >= 100) {
      return;
    }
    setEmail(value);
  }

  function validateEmail(e) {
    let value = e.target.value;
    if (value.length === 0) {
      setEmaiInvalid(true);
      return;
    }
    let isEmailValid = emailValidator.validate(value);
    setEmaiInvalid(isEmailValid);
  }

  function nameHandler(e) {
    let value = e.target.value;
    if (value.length >= 100) {
      return;
    }
    setName(value);
  }

  function phoneHandler(e) {
    let value = e.target.value;
    if (value.slice(-1) !== '_') {
      setPhoneInvalid(false);
    }
    setPhone(value);
  }

  function validatePhone(e) {
    let value = e.target.value;
    if (value.slice(-1) !== '_') {
      setPhoneInvalid(false);
      return;
    }
    setPhoneInvalid(true);
  }

  function filterName(name) {
    return name.replaceAll('+', ' ');
  }

  function fetchAcquirements() {
    axios.get('http://localhost:3001/acquirements')
      .then(function (response) {
        setAcquirements(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchAcquirements();
  }, []);

  function placeAcquirements() {
    if (acquirements.length === 0) {
      return (<div>Não foi possível carregar os conhecimentos</div>)
    }
    return acquirements.map((element, index) => {
      return (
        <div key={ element.id }>
          <label className="checkbox">
            <input type="checkbox" value={ element.nome } />
            { ' ' + element.nome }
          </label>
        </div>
      );
    });
  }

  function handleFormChange(e) {
    const newActiveAcquirement = activeAcquirements;
    const indexOf = newActiveAcquirement.indexOf(e.target.value);
    if (indexOf === -1) {
      newActiveAcquirement.push(e.target.value);
    } else {
      newActiveAcquirement.splice(newActiveAcquirement.indexOf(indexOf), 1);
    }
    if (newActiveAcquirement.length > 3 || newActiveAcquirement.length < 1) {
      setAcquirementsValid(false);
    } else {
      setAcquirementsValid(true);
    }
    setActiveAcquirements(newActiveAcquirement);
  }

  return (
    <section>

      <form className="box" onChange={ handleFormChange }>
        <div className="field">
          <label className="label">Nome *</label>
          <div className="control">
            <input className="input" type="text" onChange={ nameHandler } value={ name } />
          </div>
        </div>

        <div className="field">
          <label className="label">Email *</label>
          <div className="control">
            <input className={ emailInvalid ? "input" : "input is-danger"} type="email" placeholder="e.g. alex@example.com" onChange={ emailHandler } onBlur={ validateEmail } value={ email }/>
            { emailInvalid ? "" : <p className="help is-danger">Email inválido</p> }
          </div>
        </div>

        <div className="field">
          <label className="label">CPF *</label>
          <div className="control">
            <InputMask className={ cpfInvalid ? "input is-danger" : "input"} mask="999.999.999-99"  onChange={ cpfHandler } onBlur={ cpfHandler } value={ cpf } />
            { cpfInvalid ? <p className="help is-danger">CPF inválido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">Celular *</label>
          <div className="control">
            <InputMask className={ phoneInvalid ? "input is-danger" : "input"} mask="(99) 999-999-999"  onChange={ phoneHandler } onBlur={ validatePhone } value={ phone } />
            { phoneInvalid ? <p className="help is-danger">Telefone inválido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">Conhecimentos * (mínimo 1, máximo 3)</label>
          { acquirementsValid ? "" : <p className="help is-danger">Verifique a quantidade selecionada</p> }
          { placeAcquirements() }
        </div>

        <button className="button is-primary is-static">Cadastrar</button>
      </form>
    </section>
  );
}

export default Register;
