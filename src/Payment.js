import React, { useEffect, useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';

export default function Payment({chooseOperator, image}){

    const [amount, setAmount] = useState('');
    const [amountEror, setAmountError] = useState();
    const [amountMessage, setAmountMessage] = useState('');

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phoneMessage, setPhoneMessage] = useState('');


    const currentAmount = useRef();
    const phoneRef = useRef();
    const modalWindow = useRef();
        

      const funAmount = () => {
        let inputAmount = currentAmount.current.value
        .replace(/\D/g, '');
        let resultAmount = inputAmount.match(/(\d{0,5})/);
        setAmount(resultAmount[1])
      }

      useEffect(() => {
        funAmount();
        
        const validate = () => {
          (amount > 15000 || amount < 1) ? setAmountError(false) : setAmountError(true)
        }
        validate()
      }, [amount]);

      
      const showMessage = () => {
        if (amountEror === false) {
          setAmountMessage('Введите сумму от 1 до 15 000 ₽')
        }
        else {
          setAmountMessage('')
        }
      }
    
    const funInput = () => {
      setPhone(phoneRef.current.maskRef._value);
    }

    useEffect(() => {
      const validatePhone = () => {
          if (Number(phone.length) <  18) {
              setPhoneError(false)
          }
          else {
              setPhoneError(true)
          }
      }
      validatePhone()
      }, [phone]);


      const showMessagePhone = () => {
        if (phoneError === false) {
          setPhoneMessage('Введите телефон')
        }
        else {
          setPhoneMessage('')
        }
      }

      const funPayment = (e) => {
        e.preventDefault();
        showMessage();
        showMessagePhone();

        if(phoneError === true && amountEror === true) {
          modalWindow.current.style.display = 'block';
        }
      }

      const funCloseModal = () => {
        modalWindow.current.style.display = 'none';
        currentAmount.current.value = '';
        setAmount('');
      }


    return(
        <>
            <div className="container-payment">
                <form onSubmit={funPayment} className="container-form">
                    <div className="block1">
                        <p>{chooseOperator}</p>
                        <img className='block1__img' src={image} width="180" alt={chooseOperator} />
                    </div>
                    <div className='block2'>
                        <div className='block2__card1'>
                            <IMaskInput
                                mask= '+{7} (000) 000-00-00'
                                radix="."
                                unmask={true}
                                ref={phoneRef}
                                lazy={true}                                
                                autofix={true}
                                thousandsSeparator=' '
                                onAccept={funInput}
                                placeholder='Телефон'
                              />
                            <p className='errorMessage'>{phoneMessage}</p>
                        </div>

                        <div className='block2__card2'>
                          <input type="text" onChange={funAmount} ref={currentAmount} placeholder='Сумма от 1 до 15 000₽'/>
                          <p className='errorMessage'>{amountMessage}</p>
                        </div>
                    </div>

                    <div className='block3'>
                          <button type='submit' className='btn-submit'>Отправить</button>
                    </div>
                </form>
            </div>

            <div className='container-modal-window' ref={modalWindow}>
                <div className='modal-window'>
                  <div className='modal-close'>
                  </div>
                  <div className='modal-content'>
                  <div className="modal_btn_close" onClick={funCloseModal}><span></span></div>
                      <p>Поступил платеж {amount} руб. Спасибо, что пользуетесь услугами {chooseOperator}!</p>
                  </div>
                </div>
            </div>
            
                
        </>
    )
}