import React, {useState} from 'react';

function Header() {
  const [counter,setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <header>
      <h1>Be The Hero: {counter}</h1>
      <button onClick={increment}>Increment</button>
    </header>
  );
}

export default Header;