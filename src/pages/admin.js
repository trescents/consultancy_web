import React from 'react';
import Button from '../components/button';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from 'react-router-dom';

export function getCurrentDate(separator='-'){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  
}


function Admin_portal() {

    const [manage, setmanage] = React.useState('blogs');
    const [showModal, setshowModal] = React.useState(false);
    const [edit, setedit] = React.useState(false);
    const [password, setpassword] = React.useState('');
    const [blogs, setblogs] = React.useState([]);
    const db = getDatabase();
    const [newBlog, setnewBlog] = React.useState({
          id: 0,
          title: '',
          description: '',
          author: '',
          src: '',
          date: getCurrentDate()
    });
    const [alerts, setalerts] = React.useState([]);
    const [newAlert, setnewAlert] = React.useState({
          id: 0,
          title: '',
          description: '',
          category: '',
          date: getCurrentDate()
    });
    const [lastitem, setlastitem] = React.useState(0);
    const [lastalert, setlastalert] = React.useState(0);
    let history = useHistory();

    
    React.useEffect(() => {
        if (manage == 'blogs') {
          const blog = ref(db, 'blogs/updated_blogs/');
          onValue(blog, (snapshot) => {
            if(snapshot.val()){
              console.log(snapshot.val());
              setblogs(snapshot.val());
              setlastitem(snapshot.val().length > 0 ? snapshot.val()[(snapshot.val().length-1)].id : 1);
              setnewBlog(prevState => ({
                ...prevState,
                id: snapshot.val().length > 0 ? snapshot.val()[(snapshot.val().length-1)].id + 1 : 1
              }))
            }
          });
        }
        if (manage == 'alerts') {
          const announcements = ref(db, 'alerts/updated_alerts/');
          onValue(announcements, (snapshot) => {
            if(snapshot.val()){
              console.log(snapshot.val());
              setlastalert(snapshot.val().length > 0 ? snapshot.val()[(snapshot.val().length-1)].id : 1);
              setalerts(snapshot.val());
              setnewAlert(prevState => ({
                ...prevState,
                id: snapshot.val().length > 0 ? snapshot.val()[(snapshot.val().length-1)].id + 1 : 1
              }))
            }
          });
        }
      }, [manage]);


    function addBlog(newBlog){

      if(edit){
        var updated_blogs = blogs;
        updated_blogs = updated_blogs.filter(x => x.id != newBlog.id);
        updated_blogs.push(newBlog);
        set(ref(db, 'blogs/'), {
          updated_blogs
        });
        setshowModal(false);
        setnewBlog({
          id: 1,
          title: '',
          description: '',
          author: '',
          src: '',
          date: getCurrentDate()
        });
    } else {
        if(newBlog.title != '' && newBlog.description != '' && newBlog.author != ''){
          var updated_blogs = blogs;
          updated_blogs.push(newBlog);
          set(ref(db, 'blogs/'), {
            updated_blogs
          });
          setshowModal(false);
          setnewBlog({
            id: 1,
            title: '',
            description: '',
            author: '',
            src: '',
            date: getCurrentDate()
          });
          history.push('/blogs');
        } else{
          alert("Field is missing")
        }
        
    }
      
    }

    function editBlog(blog_id){

        var updated_blog = blogs.filter(x => x.id == blog_id)[0];
        setnewBlog({
          id: updated_blog.id,
          title: updated_blog.title,
          description: updated_blog.description,
          author: updated_blog.author,
          src: updated_blog.src,
          date: updated_blog.date
        });
        setedit(true);
        setshowModal(true);
    }

    function deleteBlog(blog_d){


        var updated_blogs = blogs.filter(x => x.id != blog_d);
        console.log(updated_blogs);
        set(ref(db, 'blogs/'), {
          updated_blogs
        });

    }

    function addAlert(newAlert){

      if(edit){
        var updated_alerts = alerts;
        updated_alerts = updated_alerts.filter(x => x.id != newAlert.id);
        updated_alerts.push(newAlert);
        set(ref(db, 'alerts/'), {
          updated_alerts
        });
        setshowModal(false);
        setnewAlert({
          id: 0,
          title: '',
          description: '',
          category: '',
          // src: '',
          date: getCurrentDate()
        });
    } else {
      if(newAlert.title != '' && newAlert.description != '' && newAlert.category != ''){
        var updated_alerts = alerts;
        updated_alerts.push(newAlert);
        set(ref(db, 'alerts/'), {
          updated_alerts
        });
        setshowModal(false);
        setnewAlert({
          id: 0,
          title: '',
          description: '',
          category: '',
          // src: '',
          date: getCurrentDate()
        });
        history.push('/alerts');


      } else{
        alert("Field is missing")
      }
        
    }
      
    }

    function editAlert(alert_id){

        var updated_alert = alerts.filter(x => x.id == alert_id)[0];
        setnewAlert({
          id: updated_alert.id,
          title:updated_alert.title,
          description:updated_alert.description,
          category:updated_alert.category,
          date: updated_alert.date
        });
        setedit(true);
        setshowModal(true);
    }

    function deleteAlert(alert_id){

        var updated_alerts = alerts.filter(x => x.id != alert_id);
        set(ref(db, 'alerts/'), {
          updated_alerts
        });

    }


  return (
   
    <>
    { password == 'mehdi123' ?
    <section className='container mx-auto min-h-screen lg:px-16 px-6 pt-36'>
        <ul className="grid grid-cols-2 bg-gray-800 py-5">
            <li onClick={()=>setmanage('blogs')} className={ manage == 'blogs' ? "cursor-pointer py-3 px-4 bg-gray-100 text-black" : "cursor-pointer py-3 px-4 text-white"}>Manage Blogs</li>
            <li onClick={()=>setmanage('alerts')} className={ manage == 'alerts' ? "cursor-pointer py-3 px-4 bg-gray-100 text-black" : "cursor-pointer py-3 px-4 text-white"}>Manage Alerts</li>
        </ul>
        { manage == 'blogs' ?
        <div className="lg:p-10 px-5 py-10 w-full">
            <div className="w-full flex justify-between">
                <h1 className="text-xl">Blogs</h1>
                <button onClick={()=>{setshowModal(true)}} className="bg-gray-800 px-3 py-2 text-sm text-white font-semibold">Add a Blog</button>
            </div>
            <div className="lg:h-96 overflow-y-scroll mt-5">
                <table class="ui single line table w-full text-sm">
                    <thead>
                        <tr>
                        <th >id</th>
                        <th>title</th>
                        <th>author</th>
                        <th>src</th>
                        <th>date</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length > 0  ?
                        blogs.sort(function(a, b){return a.id - b.id}).map(blog => {
                            return(
                            <tr>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <p className="w-48 overflow-x-auto overflow-y-hidden">{blog.src}</p>
                                <td>{blog.date}</td>
                                <td><button onClick={()=>editBlog(blog.id)} className="text-xs p-2 bg-green-400 text-white">Edit</button></td>
                                <td><button onClick={()=>deleteBlog(blog.id)} className="text-xs p-2 bg-red-400 text-white">Delete</button></td>
                            </tr>
                            )
                        }) : <p>Loading..</p>  
                        }
                    </tbody>
                </table> 
            </div>
            {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-50 fadein'>
                    <div className='lg:w-4/5 flex flex-col items-center mx-auto p-8'>
                        <p className='text-2xl'>Add a Blog!</p>
                        <p className='text-center lg:text-sm text-xs mt-2'>Blog id: {newBlog.id > 0 ? newBlog.id : lastitem + 1}</p>
                        <div className="w-full flex flex-col gap-2 mt-4">
                            <input value={newBlog.title} onChange={event => {
                            setnewBlog(prevState => ({
                                    ...prevState,
                                    title: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Title' type="text" />
                            <input value={newBlog.author} onChange={event => {
                            setnewBlog(prevState => ({
                                    ...prevState,
                                    author: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Author' type="text" />
                            <textarea rows="8" value={newBlog.description} onChange={event => {
                            setnewBlog(prevState => ({
                                    ...prevState,
                                    description: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Description' type="text"></textarea>
                            {/* <input value={newBlog.src} onChange={event => {
                            setnewBlog(prevState => ({
                                    ...prevState,
                                    src: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Image Src' type="text" /> */}
                            <input value={newBlog.src} onChange={event => {
                            setnewBlog(prevState => ({
                                    ...prevState,
                                    src: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Medium link' type="text" />
                        </div>
                        <div className='w-1/2 mx-auto mt-4'>
                          <Button title="Add Blog" onClick={()=>addBlog(newBlog)} />
                        </div>
                    </div>
                        <i onClick={()=>setshowModal(false)} className="fas fa-times text-black absolute top-5 right-5 cursor-pointer"></i>
                    </div> 
                </div>
                : null
          }
            
        </div> : 
        <div className="lg:p-10 px-5 py-10 w-full">
            <div className="w-full flex justify-between">
                <h1 className="text-xl">Announcements</h1>
                <button onClick={()=>{setshowModal(true)}} className="bg-gray-800 px-3 py-2 text-sm text-white font-semibold lg:mt-0 mt-8">Add an Announcement</button>
            </div>
            <div className="lg:h-96 h-auto overflow-y-scroll mt-5">
                <table class="ui single line table w-full text-sm">
                    <thead>
                        <tr>
                        <th >id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>category</th>
                        <th>date</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0  ?
                        alerts.map(alert => {
                            return(
                            <tr>
                                <td>{alert.id}</td>
                                <td>{alert.title}</td>
                                <td><p className="w-48 overflow-x-auto overflow-y-hidden">{alert.description}</p></td>
                                <td>{alert.category}</td>
                                <td>{alert.date}</td>
                                <td><button onClick={()=>editAlert(alert.id)}  className="text-xs p-2 bg-green-400 text-white">Edit</button></td>
                                <td><button onClick={()=>deleteAlert(alert.id)} className="text-xs p-2 bg-red-400 text-white">Delete</button></td>
                            </tr>
                            )
                        }) : <p>Loading..</p>  
                        }
                    </tbody>
                </table> 
            </div>
            {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-50 fadein'>
                        
                    <div className='lg:w-4/5 flex flex-col items-center mx-auto p-8'>
                        <p className='text-2xl'>Add an Announcement!</p>
                        <p className='text-center lg:text-sm text-xs mt-2'>Alert id: {newAlert.id > 0 ? newAlert.id : lastalert + 1}</p>
                        <div className="w-full flex flex-col gap-2 mt-4">
                            <input value={newAlert.title} onChange={event => {
                            setnewAlert(prevState => ({
                                    ...prevState,
                                    title: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Title' type="text" />
                            <input value={newAlert.category} onChange={event => {
                            setnewAlert(prevState => ({
                                    ...prevState,
                                    category: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Category' type="text" />
                            <textarea rows="8" value={newAlert.description} onChange={event => {
                            setnewAlert(prevState => ({
                                    ...prevState,
                                    description: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Description' type="text"></textarea>
                            {/* <input value={newAlert.src} onChange={event => {
                            setnewAlert(prevState => ({
                                    ...prevState,
                                    src: event.target.value
                                }))}
                            } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Image Src' type="text" /> */}
                        </div>
                        <div className='w-1/2 mx-auto mt-4'>
                          <Button title="Add Announcement" onClick={()=>addAlert(newAlert)} />
                        </div>
                    </div> 
                        <i onClick={()=>setshowModal(false)} className="fas fa-times text-black absolute top-5 right-5 cursor-pointer"></i>
                    </div> 
                </div>
                : null
            }
            
        </div>
        }
    </section>
    :
    <section className='w-full h-screen flex justify-center items-center'>
        <input className='p-2 focus:outline-none bg-white p-3 shadow-md' type="password" placeholder='Enter password' value={password} onChange={(event)=>setpassword(event.target.value)} />
    </section> }
    </>

  );
}

export default Admin_portal;