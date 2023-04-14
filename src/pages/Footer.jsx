import React from 'react'
import '../css/Footer.css'
import MiLogo from '../img/logo.png';

const Footer = () => {
  return (
    <footer>
  <div class="footer-container">
    <div class="logo">
      <img src={MiLogo} alt="logo" style={{ width: "100px" }}/>
    </div>
    <div class="contact-info">
      <h4>Información de contacto</h4>
      <p>Dirección: 123 Calle Principal</p>
      <p>Teléfono: (123) 456-7890</p>
      <p>Correo electrónico: info@tudominio.com</p>
    </div>
    <div class="social-media">
      <h4>Síguenos en redes sociales</h4>
      <ul>
        <li><a href="..">Facebook</a></li>
        <li><a href=".">Twitter</a></li>
        <li><a href="..">Instagram</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>Derechos reservados © 2023 Tu empresa | <a href="..">Política de privacidad</a></p>
  </div>
</footer>
  )
}

export default Footer
