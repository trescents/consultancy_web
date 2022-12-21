import React from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useHistory } from 'react-router-dom';
import Button from '../components/button';


function Blogs( props ) {

    const [blogs, setblogs] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
      const db = getDatabase();
      const blogs = ref(db, 'blogs/updated_blogs/');
      onValue(blogs, (snapshot) => {
        if(snapshot.val()){
          var sortedblogs = snapshot.val().sort((a, b) => (a.id < b.id ? 1 : -1));
          setblogs(sortedblogs);
        }
      });
    }, []);

    return (
        
        <section className='container mx-auto min-h-screen lg:px-16 px-6 pt-36'>
            <h1 data-aos="fade-right" data-aos-duration="800" className='lg:text-5xl text-3xl font-semibold mt-5 lg:mt-10'>Blogs</h1>
            <p className='text-sm lg:mt-5 mt-3 text-black'>A selection of Creative Technology, Content Storytelling and Design Interaction projects.</p>
            { blogs && blogs.length > 0 ?
            <div className='w-full h-auto py-16 grid lg:grid-cols-2 grid-cols-1 gap-8'>   
            {blogs.map((blog, index) => {
              return (
                <a href={blog.src} target="_blank">
                  <div className='bg-white rounded-lg hover:shadow-md p-6'>
                    <div className='flex justify-between items-center'>
                      <h1 className='text-2xl'>{blog.title}</h1>
                      <p className='text-sm text-gray-600'>{blog.date}</p>
                    </div>
                    
                    <p className='text-sm mt-2 text-gray-600'>By {blog.author}</p>
                    <p className='truncate mt-4 text-black'>{blog.description}</p>
                    <div className='flex justify-end mt-4'>
                      <div className='lg:w-1/5 w-1/2'>
                        <Button title="Read More" />
                      </div>
                    </div>
                  </div>
                </a> 
              )})}
            </div> : 
            <p className='py-16'>No blogs</p> 
            }
            <img className='absolute w-24 top-1/3 right-10 z-minus' src="images/icons/spiral.svg" alt="" />
            <img className='absolute w-1/5 lg:bottom-20 bottom-32 left-0 z-minus' src="images/icons/cloud_sm.svg" alt="" />
        </section>
    );
  
}
  
export default Blogs;