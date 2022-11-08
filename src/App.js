import './App.css';
import {useState} from 'react';
import ChooseOperator from './ChooseOperator';
import { data } from './data.js';
import Payment from './Payment';

function App() {
const [operator] = useState(data);
const [choose, setChoose] = useState(data);

const funChooseOperator = (id) => {
  let filterOperator = operator.filter(item => item.id === id);
  setChoose(filterOperator);
}

  return (
    <>
      <div className="header">
        <h1>Оплата мобильной связи</h1>
      </div>

      <div className='form-payment'>
        <div className='step-operator'>
          <h2>Шаг 1: Выбери оператора</h2>
          <ChooseOperator operator={operator} funChooseOperator={funChooseOperator}/>
        </div>

        <div className='step-form'>
          <h2>Шаг 2: Заполни форму оплаты</h2>
          <Payment chooseOperator={choose[0].operator} image={choose[0].image}/>
        </div>
      </div>
    </>
  );
}

export default App;
