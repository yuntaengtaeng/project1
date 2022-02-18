import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid = [
      enteredNameIsValid,
      enteredStreetIsValid,
      enteredCityIsValid,
      enteredPostalCodeIsValid,
    ].every((v) => v);

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const classesList = Object.entries(formInputsValidity).reduce(
    (classesList, [k, v]) => {
      classesList[k] = `${classes.control} ${v ? '' : classes.invalid}`;
      return classesList;
    },
    {}
  );

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classesList.name}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>이름을 입력해주세요!</p>}
      </div>
      <div className={classesList.street}>
        <label htmlFor="street">상세주소</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>상세주소를 입력해주세요!</p>}
      </div>
      <div className={classesList.postalCode}>
        <label htmlFor="postal">우편번호</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>우편번호를 입력해주세요 (5 자리)!</p>
        )}
      </div>
      <div className={classesList.city}>
        <label htmlFor="city">도시</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>도시를 입력해주세요!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          취소
        </button>
        <button className={classes.submit}>주문하기</button>
      </div>
    </form>
  );
};

export default Checkout;
