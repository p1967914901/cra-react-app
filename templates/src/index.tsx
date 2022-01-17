import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';


const App = () => {
  return (
    <>
      <p>hello world</p>
      <img src={jpg} alt="" width='100px' height='100px'/>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
