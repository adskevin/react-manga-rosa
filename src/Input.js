import InputMask from 'react-input-mask';

const Input = (props) => (
  <InputMask value={ props.value } onChange={ props.onChange }/>
);

export default Input;
