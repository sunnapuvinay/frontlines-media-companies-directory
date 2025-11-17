import { useState, useEffect } from 'react';
import axios from 'axios';
const App = () =>{

useEffect(() => {
    axios.get('/companies.json')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);


  return (
    <div>
      <h1 className="text-red-400 text-2xl font-extrabold">Frontlines Media</h1>
    </div>
  );
}

export default App;