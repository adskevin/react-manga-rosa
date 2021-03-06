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
  const [emailInvalid, setEmaiInvalid] = useState(false);

  const [name, setName] = useState(filterName(params.name));

  const [phone, setPhone] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);

  const [acquirements, setAcquirements] = useState([]);
  const [activeAcquirements, setActiveAcquirements] = useState([]);
  const [acquirementsValid, setAcquirementsValid] = useState(true);

  const [sendAllowed, setSendAllowed] = useState(false);

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
    setEmaiInvalid(!isEmailValid);
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
    if (value.slice(-1) === '_') {
      setPhoneInvalid(true);
    }
    setPhone(value);
  }

  function validatePhone(e) {
    let value = e.target.value;
    if (value.slice(-1) === '_') {
      setPhoneInvalid(true);
    } else {
      setPhoneInvalid(false);
    }
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
  }, [acquirementsValid, sendAllowed, phoneInvalid, emailInvalid, cpfInvalid]);

  function placeAcquirements() {
    if (acquirements.length === 0) {
      return (<div>N??o foi poss??vel carregar os conhecimentos</div>)
    }
    return acquirements.map((element, index) => {
      return (
        <div key={ element.id }>
          <label className="checkbox">
            <input type="checkbox" value={ element.nome } onChange={ handleAcquirementChange } />
            { ' ' + element.nome }
          </label>
        </div>
      );
    });
  }

  function checkFields() {
    let allowed = true;
    if (cpfInvalid || cpf.length === 0) {
      console.log('cpf error');
      allowed = false;
    }
    if (emailInvalid || email.length === 0) {
      console.log('email error');
      allowed = false;
    }
    if (name < 3) {
      console.log('name error');
      allowed = false;
    }
    if (phoneInvalid || phone.length === 0) {
      console.log('phone error');
      allowed = false;
    }
    if (!acquirementsValid) {
      console.log('acquirements error');
      allowed = false;
    }
    setSendAllowed(allowed);
  }

  function handleAcquirementChange(e) {
    const newActiveAcquirement = activeAcquirements;
    const indexOf = newActiveAcquirement.indexOf(e.target.value);
    if (indexOf === -1) {
      newActiveAcquirement.push(e.target.value);
    } else {
      newActiveAcquirement.splice(newActiveAcquirement.indexOf(indexOf), 1);
    }
    if (newActiveAcquirement.length > 3 || newActiveAcquirement.length < 1) {
      console.log('erro');
      setAcquirementsValid(false);
    } else {
      setAcquirementsValid(true);
    }
    setActiveAcquirements(newActiveAcquirement);
    checkFields();
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('send');
    let data = {
      nome: name,
      email: email,
      cpf: cpf,
      celular: phone,
      conhecimentos: activeAcquirements.join(', '),
    }
    console.log(data);
    axios.post('http://localhost:3001/users', data)
      .then(() => {
        window.location('http://localhost:3001');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <section>

      <form className="box" onSubmit={ handleSubmit }>
        <div className="field"> 
          <label className="label">Nome *</label>
          <div className="control">
            <input className="input" type="text" onChange={ nameHandler } value={ name } />
          </div>
        </div>

        <div className="field">
          <label className="label">Email *</label>
          <div className="control">
            <input className={ emailInvalid ? "input is-danger" : "input" } type="email" placeholder="e.g. alex@example.com" onChange={ emailHandler } onBlur={ validateEmail } value={ email }/>
            { emailInvalid ? <p className="help is-danger">Email inv??lido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">CPF *</label>
          <div className="control">
            <InputMask className={ cpfInvalid ? "input is-danger" : "input"} mask="999.999.999-99"  onChange={ cpfHandler } onBlur={ cpfHandler } value={ cpf } />
            { cpfInvalid ? <p className="help is-danger">CPF inv??lido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">Celular *</label>
          <div className="control">
            <InputMask className={ phoneInvalid ? "input is-danger" : "input"} mask="(99) 999-999-999"  onChange={ phoneHandler } onBlur={ validatePhone } value={ phone } />
            { phoneInvalid ? <p className="help is-danger">Telefone inv??lido</p> : "" }
          </div>
        </div>

        <div className="field">
          <label className="label">Conhecimentos * (m??nimo 1, m??ximo 3)</label>
          { acquirementsValid ? "" : <p className="help is-danger">Verifique a quantidade selecionada</p> }
          { placeAcquirements() }
        </div>

        <button className={ sendAllowed ? "button is-primary" : "button is-primary is-static" } >Cadastrar</button>
      </form>
    </section>
  );
}

export default Register;
