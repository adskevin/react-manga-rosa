import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { validate } from 'node-cpf';
import emailValidator from 'email-validator';

function Register() {

  let params = useParams();

  const [cpf, setCpf] = useState('');
  const [cpfInvalid, setCpfInvalid] = useState(false);

  const [email, setEmail] = useState('');
  const [emailInvalid, setEmaiInvalid] = useState(true);

  const [name, setName] = useState(filterName(params.name));

  const [phone, setPhone] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);

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
    console.log(value);
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

  return (
    <section>

      <form className="box">
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" onChange={ nameHandler } value={ name } />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className={ emailInvalid ? "input" : "input is-danger"} type="email" placeholder="e.g. alex@example.com" onChange={ emailHandler } onBlur={ validateEmail } value={ email }/>
            { emailInvalid ? "" : <p className="help is-danger">Email inválido</p> }
          </div>
        </div>

        <div className="field">
          <label className="label">CPF</label>
          <div className="control">
            <InputMask className={ cpfInvalid ? "input is-danger" : "input"} mask="999.999.999-99"  onChange={ cpfHandler } onBlur={ cpfHandler } value={ cpf } />
            { cpfInvalid ? <p className="help is-danger">CPF inválido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">Celular</label>
          <div className="control">
            <InputMask className={ phoneInvalid ? "input is-danger" : "input"} mask="(99) 999-999-999"  onChange={ phoneHandler } onBlur={ validatePhone } value={ phone } />
            { phoneInvalid ? <p className="help is-danger">Telefone inválido</p> : "" }
          </div>
        </div>

        <button className="button is-primary">Cadastrar</button>
      </form>
    </section>
  );
}

export default Register;
