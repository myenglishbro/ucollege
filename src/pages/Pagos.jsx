import React from 'react'
import "../css/Pagos.css"
const Pagos = () => {
  return (
    <>
     <div class="anuncio">
  <h3 class="section-title">Realiza tus pago al siguiente número +51 982 668 882</h3>
</div>

<div class="paypal">
  <h3 class="section-title">También puedes realizar transferencias con Paypal</h3>
  <a href="https://paypal.me/myenglishbro?country.x=PE&locale.x=es_XC" target="_blank">
    <button class="btn btn-dark btn-lg mx-3">Pagar aquí</button>
  </a>
</div>

<section class="payment-section">
  <div class="bank-info">
    <h1 class="bank-title">BCP</h1>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Mi número de cuenta BCP Soles es 31502797130080.</li>
      <li class="list-group-item">Mi número de cuenta interbancaria es 00231510279713008003</li>
      <li class="list-group-item">Titular:</li>
      <li class="list-group-item"><strong>Carlos Apolaya Sanchez</strong></li>
    </ul>
  </div>

  <div class="bank-info">
    <h1 class="bank-title">BBVA</h1>
    <ul classNa="list-group list-group-flush">
      <li class="list-group-item">Número de cuenta: 0011-0057-0239369309</li>
      <li class="list-group-item">CCI: 011-057-000239369309-74</li>
      <li class="list-group-item">Titular:</li>
      <li class="list-group-item"><strong>Carlos Apolaya Sanchez</strong></li>
    </ul>
  </div>

  <div class="bank-info">
    <h1 class="bank-title">Interbank</h1>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Mi número de Cuenta de Ahorros Soles en Interbank es: 4023137558626</li>
      <li class="list-group-item">Mi número de Cuenta Interbancario en Interbank es: 00340201313755862653</li>
      <li class="list-group-item">Titular:</li>
      <li class="list-group-item"><strong>Carlos Apolaya Sanchez</strong></li>
    </ul>
  </div>
</section>

    </>
  )
}

export default Pagos
