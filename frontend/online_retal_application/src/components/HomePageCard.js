import React, { useEffect, useState } from 'react'
import NewArrival from './newarrival';

function HomePageCard() {
    const [perpertydata, setPerpertydata] = useState([]);

    useEffect(() => {
      getProperties();
    }, []);
  
    const getProperties = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/getproperties", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const message = `An error has occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const data = await response.json();
        setPerpertydata(data);
      } catch (error) {
        console.log(error);
      }
    };
  return (
   <div className='m-5'>
    <div className='text-center'>
        <h2 className='text-3xl font-bold dark:text-blue-800'>New Arrivals</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
    {
        perpertydata?.map((datas) => (
            <NewArrival data={datas}/>
        ))
    }
    </div>
   </div>
  )
}

export default HomePageCard