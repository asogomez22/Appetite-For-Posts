import Navbar from '../components/Navbar'
import SeccionDeContacto from '../components/SeccionDeContacto'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

function Contact() {
  return (
    <>
      <Navbar/>
      <Hero nombre='Contacto'/>
      <div className='h-screen bg-[#161515ff] pt-35'>
      <SeccionDeContacto/>

      </div>
      <Footer/>
    </>
  )
}

export default Contact
