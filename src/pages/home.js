import React from 'react';
import Button from '../components/button';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from "firebase/database";
import OwlCarousel from 'react-owl-carousel';

function Home() {

  let history = useHistory();
  const [email, setemail] = React.useState("");
  const [study, setstudy] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [Name, setName] = React.useState("");
  const [emailList, setemailList] = React.useState([]);
  const [betaList, setbetaList] = React.useState([]);
  const [formList, setformList] = React.useState([]);
  const db = getDatabase();

  React.useEffect(() => {
    const emails = ref(db, `emailList/`);
    onValue(emails, (snapshot) => {
        if(snapshot.val()){
            setemailList(snapshot.val());
        }
    });
    const betalists = ref(db, `betaList/`);
    onValue(betalists, (snapshot) => {
        if(snapshot.val()){
            setbetaList(snapshot.val());
        }
    });
    const formlists = ref(db, `formList/`);
    onValue(formlists, (snapshot) => {
        if(snapshot.val()){
            setformList(snapshot.val());
        }
    });
},[]);


function submitEmail() {
  if(email != ''){
    var emails = emailList;
    console.log(emails);
    emails.push(email);
    set(ref(db, 'emailList'), emails);
    setemail("");
    alert("Thank you for submitting your email");
  }
}

function submitForm() {
  if(email != '' && Name != ''){
    var forms = formList;
    var formValues = {
      name: Name,
      email: email,
      phone: phone,
      message: study
    }
    forms.push(formValues);
    set(ref(db, 'formList'), forms);
    setemail("");
    alert("Thank you for submitting your form");
  } else{
    alert("Please fill the form details");
  }
}

function submitBeta() {
  if(email != ''){
    var betalist = betaList;
    console.log(betaList);
    betalist.push({
        email: email,
        study: study
    })
    set(ref(db, 'betaList'),betalist);
    setemail("");
    setstudy("");
    alert("Thank you for submitting your email");
  }
}

const partners_responsiveness = {
  0 : {
    items: 3,
  },
  1000 : {
    items: 5, 
  }
}

const services_responsiveness = {
  0 : {
    margin: 10,
    center: false,
    items: 1,
  },
  1000 : {
    items: 2, 
  }
}


  

  return (

    <>
      
    <div className='container mx-auto lg:px-16 px-6 overflow-x-hidden'>  

      <section id='home' className='w-full lg:h-screen h-auto grid lg:grid-cols-2 grid-cols-1 pt-16 lg:pt-0'>
        <div className='flex items-center justify-start lg:h-full py-16 lg:py-0'>
          <div className='content lg:w-3/4 w-10/11 relative z-10'>
            <h1 data-aos="fade-right" data-aos-duration="800" className='lg:text-4xl text-3xl'>Studying abroad is not a dream now.</h1>
            <p data-aos="fade-right" data-aos-duration="800" className='my-5 text-black text-xl'>Take Right Decisions and Master your destiny - See how we make it happen.</p>
            <div data-aos="fade-right" data-aos-duration="800" className='lg:w-2/3 w-full'>
              <Button  title="Yes!  Show me now" type='anchor' href="#journey" />
            </div>
            <img className='absolute lg:w-24 w-16 lg:-top-20 -top-12 left-1/3 z-minus' src="images/icons/globe.svg" alt="" />
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="800" className='flex lg:items-center items-start lg:justify-end justify-center z-10'>
          <img className='w-4/5' src="images/hero_image.svg" alt="Hero Image" />
        </div>
        <div data-aos="flip-left" data-aos-duration="800" className='lg:absolute relative lg:-bottom-20 left-0 w-full z-10'>
          <div className='container mx-auto lg:px-16 px-6'>
            <div className='bg-white rounded-lg lg:py-12 py-8 shadow-xl'>
              <div className='flex lg:flex-row flex-col gap-8 lg:w-3/5 w-4/5 mx-auto items-center'>
                <div className='flex lg:flex-row flex-col gap-2 lg:w-3/4 w-full'>
                  <input value={study} onChange={(event) => setstudy(event.target.value)} className='lg:w-1/2 w-full text-gray text-sm bg-gray px-4 py-3 rounded-2xl shadow-md focus:outline-none' type="text" placeholder='What do you want to study?' />
                  <input value={email} onChange={(event) => setemail(event.target.value)} className='lg:w-1/2 w-full text-gray text-sm bg-gray px-4 py-3 rounded-2xl shadow-md focus:outline-none' type="text" placeholder='example@gmail.com' />
                </div>
                <div className='lg:w-1/5 w-full'>
                  <Button onClick={submitBeta} title="Send" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className='absolute w-24 bottom-12 left-1/2 z-0' src="images/icons/spiral.svg" alt="" />
        <img className='absolute right-0 lg:top-24 top-1/2 w-full z-minus' src="images/icons/line.svg" alt="" />
      </section>
      
      <section className='lg:h-40 h-10'></section>
      
      <section id='about' className='w-full lg:h-screen h-auto py-16 lg:pt-5'>
        <h1 data-aos="fade-zoom-in" data-aos-duration="800" className='text-center lg:text-5xl text-3xl my-10'>Who are we?</h1>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-20 lg:gap-0'>
          <div className='flex justify-start items-center text-gray-600'>
            <div data-aos="fade-right" data-aos-duration="800" className='lg:w-11/12 w-full z-10'>
              <p className='lg:text-xl text-lg text-black text-center lg:text-left'>Trescents make it easier for you to study abroad. We make it happen and enable you to master your own destiny. Our UK Higher Education experienced professional will guide you throughout the admissions, visa, and pre and post-departure process. Our visa and admissions expert counselors will make your admissions and visa applicant journey smooth, pleasant, and completely hassle free. Contact now and start your process.</p>
              <div className='mt-8 relative flex justify-center lg:justify-start'>
                  <Button title="Yes, I want to know more." type='anchor' href="https://wa.me/923222240336" target="_blank" />
                  <img className='absolute w-24 left-0 -bottom-24 z-0' src="images/icons/spiral.svg" alt="" />
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-duration="800" className='flex items-center justify-center'>
            <img className='w-4/5' src="images/about.svg" alt="consultancy" />
          </div>
        </div>
      </section>
      
      <section id='partners' className='w-full relative py-16'>
        <div data-aos="fade-zoom-in" data-aos-duration="800" className='text-lg text-center'>
          <h2>Partner Universities</h2>
        </div>
        <div data-aos="fade-down" data-aos-duration="800" className='lg:text-5xl text-3xl text-center my-10'>
          <h1>Where you achieve your Goals</h1>
        </div>
        <OwlCarousel className='owl-theme lg:my-20 my-10' loop margin={10} responsive={partners_responsiveness}>
          <div class="item flex justify-center"><div className='lg:w-3/5 w-full'><img src="images/partners/image-2.png" alt="partner 1"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-2/5 w-4/5'><img src="images/partners/image-3.png" alt="partner 2"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-3/5 w-full -mt-10'><img src="images/partners/image-5.png" alt="partner 3"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-4/5 w-full'><img src="images/partners/image-4.png" alt="partner 4"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-3/5 -mt-2 w-full'><img src="images/partners/image-6.png" alt="partner 5"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-2/5 w-full'><img src="images/partners/images-7.png" alt="partner 6"/></div></div>
          <div class="item flex justify-center"><div className='lg:w-4/5 w-full'><img src="images/partners/images-8.png" alt="partner 7"/></div></div>
        </OwlCarousel>
        <div data-aos="flip-left" data-aos-duration="800" className='bg-pink grid lg:grid-cols-2 grid-cols-1 lg:px-24 px-5 py-12 relative'>
          <div data-aos="fade-right" data-aos-duration="800" data-aos-delay="500">
            <h1 className='lg:text-4xl text-3xl font-bold text-blue'>Know before you make a decision. </h1>
            <p className='text-xl text-blue my-6'>Join our Newsletter and get the latest updates about admissions, stories and tips about life abroad and many more.</p>
            <div className='flex flex-row lg:w-4/5 w-full'>
              <input value={email} onChange={(event) => setemail(event.target.value)} className='w-3/4 text-sm bg-gray px-4 py-3 rounded-bl-xl rounded-tr-xl shadow-sm focus:outline-none z-10' type="text" placeholder='Type your email' />
              <div className='w-1/4 -ml-2'>
                <Button onClick={submitEmail} title="Send"/>
              </div>
            </div>
          </div>
          <img className='absolute lg:w-24 w-16 lg:-bottom-16 -bottom-8 left-24 z-0' src="images/icons/spin.svg" alt="" />
          <img data-aos-delay="500" className='absolute w-1/5 right-24 bottom-0 hidden lg:block' src="images/study_abroad.png" alt="" />
        </div>
        <img className='absolute lg:w-24 w-16 top-5 lg:left-20 left-0 z-0' src="images/icons/globe.svg" alt="" />
      </section> 

      <section id='journey' className='relative lg:h-screen pt-12'>
        <h1 data-aos="fade-down" data-aos-duration="800" className='text-center lg:text-5xl text-3xl my-10'>Let's Study Abroad</h1>
        <h2 data-aos="fade-zoom-in" data-aos-duration="800" className='text-lg text-center'>Embrace your dreams and apply with us!</h2>
        <img className='w-full' src="images/process/journey.svg" alt="" />
      </section>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-y-20 place-items-center pb-24 lg:pt-0 pt-20'>
        <div data-aos="fade-right" data-aos-duration="800"  className='flex gap-4'>
          <h1 className='text-9xl'>1</h1>
          <div className='flex flex-col'>
            <h1 className='text-4xl text-black'>Free Initial Assesment</h1>
            <p className='w-4/5 text-xl my-4'>It is often the case that people don't know where you stands based on your profile. Get a free evaluation of your profile from us.</p>
            <h2 className='text-xl font-semibold'>Duration: <span className='text-red-600 font-normal'>Less than a Day</span></h2>
            <a href="https://wa.me/923222240336" target="_blank" className='text-lg text-blue-400 font-medium mt-2'>Let's Chat and Meet</a>
          </div>
        </div>
        <img className='lg:w-3/5 w-4/5' src="images/process/step4.svg" alt="" />
        <img className='w-4/5 hidden lg:block' src="images/process/step1.svg" alt="" />
        <div data-aos="fade-left" data-aos-duration="800"  className='flex gap-4'>
          <h1 className='text-9xl'>2</h1>
          <div className='flex flex-col'>
            <h1 className='text-4xl text-black'>Counselling Session</h1>
            <p className='w-4/5 text-xl my-4'>Visit our office to meet a counsellor and receive free counseling. Please schedule a free online Consultation if you live far away</p>
            <h2 className='text-xl font-semibold'>Duration: <span className='text-red-600 font-normal'>Less than a Day</span></h2>
            <a href="https://wa.me/923222240336" target="_blank" className='text-lg text-blue-400 font-medium mt-2'>Evaluate my Profile</a>
          </div>
        </div>
        <img className='w-4/5 lg:hidden' src="images/process/step1.svg" alt="" />
        <div data-aos="fade-right" data-aos-duration="800"  className='flex gap-4'>
          <h1 className='text-9xl'>3</h1>
          <div className='flex flex-col'>
            <h1 className='text-4xl text-black'>Application Process</h1>
            <p className='w-4/5 text-xl my-4'>Your admission is just a click away. Get in touch with us for further information.</p>
            <h2 className='text-xl font-semibold'>Duration: <span className='text-red-600 font-normal'>4 Weeks</span></h2>
            <a href="https://wa.me/923222240336" target="_blank" className='text-lg text-blue-400 font-medium mt-2'>Begin my Application</a>
          </div>
        </div>
        <img className='w-1/2' src="images/process/step2.svg" alt="" />
        <img className='w-4/5 hidden lg:block' src="images/process/step5.svg" alt="" />
        <div data-aos="fade-left" data-aos-duration="800"  className='flex gap-4'>
          <h1 className='text-9xl'>4</h1>
          <div className='flex flex-col'>
            <h1 className='text-4xl text-black'>VISA  <span className='lg:text-4xl text-3xl'>Processing</span></h1>
            <p className='w-4/5 text-xl my-4'>Getting a visa involves organizing your paperwork in accordance with visa regulations. understand the proper techniques to ace your visa interview.</p>
            <h2 className='text-xl font-semibold'>Duration: <span className='text-red-600 font-normal'>3 Weeks</span></h2>
            <a href="https://wa.me/923222240336" target="_blank" className='text-lg text-blue-400 font-medium mt-2'>Apply for my VISA</a>
          </div>
        </div>
        <img className='w-4/5 lg:hidden' src="images/process/step5.svg" alt="" />
        <div data-aos="fade-right" data-aos-duration="800"  className='flex gap-4'>
          <h1 className='text-9xl'>5</h1>
          <div className='flex flex-col'>
            <h1 className='text-4xl text-black'>Ready to Departure</h1>
            <p className='w-4/5 text-xl my-4'>Moving in to a new country and adapting a new culture and system may be difficult for some. During the pre and post departure , Trescents expert counsellor will provide you full support and information to help you settle in the UK.</p>
            <a href="https://wa.me/923222240336" target="_blank" className='text-lg text-blue-400 font-medium mt-2'>Let's meet before you fly
</a>
          </div>
        </div>
        <img className='w-4/5' src="images/process/step3.svg" alt="" />

      </section>

      {/* <section id='testimonials' className='w-full lg:h-screen h-auto'>
        <h1 data-aos="fade-down" data-aos-duration="800" className='text-center lg:text-5xl text-3xl my-10'>Testimonials</h1>
        <div className='flex items-center my-20 z-10'>
          <div className='relative w-2/12 lg:ml-10 hidden lg:block'>
            <img className='w-12' src="images/icons/curve.svg" alt="" />
            <img className='w-12 h-auto rounded-full absolute -top-10 left-8' src="images/testimonials/Ellipse1.png" alt="" />
            <img className='w-12 h-auto rounded-full absolute top-12 -left-4' src="images/testimonials/Ellipse5.png" alt="" />
            <img className='w-12 h-auto rounded-full absolute bottom-16 -left-4' src="images/testimonials/Ellipse6.png" alt="" />
            <img className='w-12 h-auto rounded-full absolute -bottom-10 left-8' src="images/testimonials/Ellipse7.png" alt="" />
          </div>
          <div className='lg:w-10/12 w-full lg:-ml-20'>
            <OwlCarousel className='owl-theme' loop margin={10} items={1}>
              <div className='item grid lg:grid-cols-2 grid-cols-1 gap-40 lg:gap-0 items-center'>
                <div className='flex items-center lg:justify-start justify-center'>
                  <div data-aos="zoom-in" data-aos-duration="800" className='w-3/5 p-6 bg-light-blue rounded-full'>
                    <img className='w-full rounded-full' src="images/testimonials/Ellipse1.png" alt="consultancy" />
                  </div>
                </div>
                <div className='flex items-center lg:justify-start justify-center text-gray-600 relative'>
                  <div data-aos="fade-left" data-aos-duration="800" className='w-4/5'>
                    <p className='lg:text-lg text-base text-black'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className='w-full flex justify-end mt-12'>
                      <div className='flex flex-col items-center text-black'>
                          <p className='text-xl'>Ava Adams</p>
                          <p>Student of Pharmacy</p>
                      </div>
                    </div>
                    <div className='flex lg:gap-8 gap-5 mt-4 lg:mt-0'>
                      <img className='lg:w-12 w-8 cursor-pointer prev' src="images/icons/previous.svg" alt="" />
                      <img className='lg:w-12 w-8 cursor-pointer next' src="images/icons/next.svg" alt="" />
                    </div>
                  </div>
                  <img className='absolute w-24 right-0 top-1/2 z-minus' src="images/icons/spiral.svg" alt="" />
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section> */}
    
    </div>

    <section id='services' className='relative mt-24 lg:mt-0 pt-8'>
      <div className='container mx-auto w-full h-auto pb-16 lg:px-16 px-6'>
          <div className='flex justify-center'>
            <h1 data-aos="zoom-in-up" data-aos-duration="800" className='text-center lg:text-5xl text-3xl relative'>Our Services
              <img className='absolute w-32 -top-8 -left-6 z-0' src="images/icons/globe.svg" alt="" />
            </h1>
          </div>
        <OwlCarousel className='owl-theme mt-20 px-6 lg:px-0 services' loop margin={20} center items={2} responsive={services_responsiveness}>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>IELTS/TOEFL  <br />Training</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>Universities abroad frequently demand confirmation of English language proficiency. In order to guarantee that the student receives a good score, we offer extensive training.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>Academic <br />Counselling</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>Our knowledgeable counselors take into account your educational background, interests, skills, and market trends before recommending the best possible pathways that are personalized to your needs.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>Admissions</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>We personally handle the application procedure and advise the student on the proper set of supporting required documents. Additionally, we immediately get in touch with the institution to ensure a quick turn around of your offer letter.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>Visa Guidance</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>Our experts have experience of working with relevant government departments across the globe. Our counselors are therefore up to date on all applicable laws and regulations. Our success record in obtaining visas is hence very high.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          {/* <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>University <br /> Guidance</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>To study at one of the best colleges in the world, Pakistani students should apply for the widest range of international scholarships possible.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div> */}
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-2xl text-black'>Personal Statement/SOP  <br /> Writing & Assessment </h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>The admissions staff is curious to learn more about you. With the help of our SOP experienced team, express your reflections, accomplishments, and ideas in the best possible manner and get your amazing SOP done.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>Pre and Post  <br /> Departure Guide</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>TWe provide a variety of pre and post-departure workshops to help you take advantage of the personal and cultural opportunities available to you while traveling and feel at home.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>Profile   <br /> Assessment</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>We summarize your profile based on the data you provided and give you a complete analysis of your chances of receiving a visa based on instructions from the Embassy.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
          <div className='item bg-white lg:px-16 px-6 lg:py-20 py-12'>
            <div className='flex justify-between'>
              <h1 className='lg:text-4xl text-3xl text-black'>CV Writing  <br />  & Assesment</h1>
              <div className='flex justify-center items-center lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-pink'>
                <img className='w-12' src="images/icons/filters.svg" alt="" />
              </div>
            </div>
            <p className='my-6'>CV is the vital part of an application, on which your admission depends. We help you curate professional winning CVs.</p>
            <Button title="Explore More" type='anchor' href="https://wa.me/923222240336" target="_blank"/>
          </div>
        </OwlCarousel>

        <img className='absolute w-1/3 lg:bottom-0 top-0 right-0 z-0' src="images/icons/cloud.svg" alt="" />
        <img className='absolute w-1/5 lg:bottom-20 bottom-32 left-0 z-0' src="images/icons/cloud_sm.svg" alt="" />
      </div>
    </section>

    <section className='w-full h-auto lg:py-56 pt-10 relative'>
      <div className='bg-pink'>
        <div className='container mx-auto w-full h-auto lg:px-16 px-6 grid lg:grid-cols-2 grid-cols-1 py-16'>
          <div className=''>
            <div data-aos="fade-right" data-aos-duration="800" className='flex flex-col'>
              <div className='flex gap-2 items-center'>
                <img className='w-7' src="images/icons/call.svg" alt="Call icon" />
                <p className='text-3xl text-gray-700 font-semibold'>Call us</p>
              </div>
              <p className='mt-2 text-gray-700'>+(92) 3222240336</p>
            </div>
            <div data-aos="fade-right" data-aos-duration="800" data-aos-delay='50' className='flex flex-col mt-16'>
              <div className='flex gap-2 items-center'>
                <img className='w-7' src="images/icons/location.svg" alt="Location icon" />
                <p className='text-3xl text-gray-700 font-semibold'>Location</p>
              </div>
              <p className='mt-2 text-gray-700 w-4/5'>Office # 507 5th Floor, Caesar Tower Main Shahr-e-Faisal, Karachi</p>
            </div>
            <div data-aos="fade-right" data-aos-duration="800" data-aos-delay='100' className='flex flex-col mt-16'>
              <div className='flex gap-2 items-center'>
                <img className='w-7' src="images/icons/global.svg" alt="Globe icon" />
                <p className='text-3xl text-gray-700 font-semibold'>Mail us</p>
              </div>
              <p className='mt-2 text-gray-700'>contact@trescents.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-lg lg:w-1/2 w-full lg:absolute relative lg:top-32 left-custom p-12'>
        <h1 data-aos="fade-zoom-in" data-aos-duration="800" className='lg:text-5xl text-3xl my-10 text-center lg:text-left'>Contact Now</h1>
        <div class="w-full">
            <div>
                <div class="mb-4">
                    <input value={Name} onChange={(event) => setName(event.target.value)}
                        class="border-b-2 w-full py-4 focus:outline-none focus:shadow-outline-none input-form"
                        type="text"
                        placeholder="Name"
                    />
                </div>
                <div class="mb-4">
                    <input value={email} onChange={(event) => setemail(event.target.value)}
                        class="border-b-2 w-full py-4 focus:outline-none focus:shadow-outline-none input-form"
                        id="email" type="text" placeholder="Email" />
                </div>
                <div class="mb-4">
                    <input value={phone} onChange={(event) => setphone(event.target.value)}
                        class="border-b-2 w-full py-4 focus:outline-none focus:shadow-outline-none input-form"
                        id="email" type="text" placeholder="Phone" />
                </div>
                <div class="mb-6">
                    <textarea  value={study} onChange={(event) => setstudy(event.target.value)}
                    class="border-b-2 w-full py-4 focus:outline-none focus:shadow-outline-none input-form"
                        id="message" rows='5' placeholder="Message"></textarea>
                </div>
                <div class="lg:w-1/3 w-1/2">
                  <Button onClick={submitForm} title="Send"/>
                </div>
            </div>
        </div>

      </div>

    </section>

    </>

  );

}
  
export default Home;
