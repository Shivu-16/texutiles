import './App.css';
import React,{useState} from 'react';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';

function App() {
  
  const [ mode , setMode ] = useState('light'); 
  const [ alert , setAlert ]= useState(null);

  const showAlert = ( message , type ) => {
    setAlert({
      msg : message,
      type : type 
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)

  }

  const toggleMode = () =>{
    if(mode === "light"){
      setMode('dark')
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      showAlert("Dark Mode has been Enabled","success")
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showAlert("Light Mode has been Enabled","success")
    }
  }

  return (
  <>
  <Navbar mode={mode} toggleMode={toggleMode} />
  <Alert alert={alert} />
  <TextForm heading="Enter Your Text Here" mode={mode} showAlert={showAlert}/>
  </> 
  );
}

export default App;
