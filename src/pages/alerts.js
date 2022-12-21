import React from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useHistory } from 'react-router-dom';
import Button from '../components/button';


function Alerts() {

    const [alerts, setalerts] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
      const db = getDatabase();
      const announcements = ref(db, 'alerts/updated_alerts/');
      onValue(announcements, (snapshot) => {
        if(snapshot.val()){
          var sortedblogs = snapshot.val().sort((a, b) => (a.id < b.id ? 1 : -1));
          setalerts(sortedblogs);
        }
      });
    }, []);

    return (
        
        <section className='container mx-auto min-h-screen lg:px-16 px-6 pt-36'>
            <h1 className='lg:text-5xl text-3xl font-semibold mt-5 lg:mt-10'>Announcements</h1>
            <p className='text-sm lg:mt-5 mt-3 text-black'>A selection of Creative Technology, Content Storytelling and Design Interaction projects.</p>
            { alerts && alerts.length > 0 ?
            <div className='w-full h-auto py-16 grid grid-cols-1 gap-8'>   
            {alerts.map((alert, index) => {
              return (
                <div className='bg-white rounded-lg hover:shadow-md p-6'>
                  <div className='flex justify-between items-center'>
                    <h1 className='text-2xl'>{alert.title}</h1>
                    <p className='text-sm text-gray-600'>{alert.date}</p>
                  </div>
                  
                  <p className='text-sm mt-2 text-gray-600'>{alert.category}</p>
                  <p className='truncate mt-4 text-black'>{alert.description}</p>
                </div>
              )})}
            </div> : 
            <p className='py-16'>No Announcements</p> 
            }
            <img className='absolute w-24 top-1/3 right-10 z-minus' src="images/icons/spiral.svg" alt="" />
            <img className='absolute w-1/5 lg:bottom-20 bottom-32 left-0 z-minus' src="images/icons/cloud_sm.svg" alt="" />
        </section>
    );
  
}
  
export default Alerts;