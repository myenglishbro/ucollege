import React from 'react'
import "./Benefit.css"
const Benefit = () => {
  return (
    <section class="faq">
    <h1>Preguntas frecuentes</h1>
    <div class="tab">
        <input type="radio" name="abrir" id="acc1"/>
        <label for="acc1">
            <h2>01</h2>
            <h3>¿Qué nivel de inglés necesito para apuntarme?</h3>
        </label>
        <div class="content">
            <p>
            El reto You Speak está recomendado para estudiantes a partir de un nivel de inglés Intermediate (B1- B2).
También te lo recomendamos si te estás preparando para obtener el nivel Advanced (C1) y sientes que necesitas expandir tu vocabulario y entrenar tu expresión oral.
¿No estás seguro de cuál es tu nivel? Puedes descubrirlo con este test: Test your English.
              </p>
        </div>
    </div>
    <div class="tab">
        <input type="radio" name="abrir" id="acc2"/>
        <label for="acc2">
            <h2>02</h2>
            <h3>¿Cómo son las clases del curso?</h3>
        </label>
        <div class="content">
            <p>
            Te hemos preparado actividades para cada uno de los 30 días del curso. Yee-haw!

Cada día tendrás acceso a nuevas clases y entrenamientos para poner tu expresión oral en forma.

Todo este contenido se ha preparado con antelación para que puedas acceder a la hora del día que más te convenga.

La idea es ir haciendo juntos la clase correspondiente a cada día y que puedas compartir en la escuela tus tareas con los demás estudiantes y profes.

Este es un ejemplo de un día:

💂🏻‍♀️ Immerse yourself: sumérgete en el idioma y expande tu vocabulario con nuestros divertidos vídeos de preguntas y respuestas.

💪 Train your fluency: entrena tu fluidez y tu pronunciación con nuestros workouts diarios y empieza a sonar mucho más natural y como un nativo.

👄 Unlock your voice: llegó la hora de la verdad. Tu reto de speaking diario. You Speak! 🫵 Graba tu tarea en vídeo y compártela en la comunidad con los demás estudiantes. Pregúntanos cualquier duda que tengas sobre tu tarea o las lecciones.
              </p>
        </div>
    </div>
    <div class="tab">
        <input type="radio" name="abrir" id="acc3"/>
        <label for="acc3">
            <h2>03</h2>
            <h3>¿Cuánto tiempo necesito dedicar cada día?</h3>
        </label>
        <div class="content">
            <p>
            30 minutos al día son suficientes para ver el vídeo, escuchar el audio y hacer tu reto de speaking, aunque este tiempo puede variar según el nivel de cada estudiante. 
Una vez acabes el curso, te recomendamos volver a repasar las lecciones, hacer los entrenamientos y los ejercicios prácticos para ver los resultados y ampliar tus conocimientos de forma natural, mediante la inmersión y contacto diario con el idioma. 👌
              </p>
        </div>
    </div>
    <div class="tab">
        <input type="radio" name="abrir" id="acc4"/>
        <label for="acc4">
            <h2>04</h2>
            <h3>¿Se pueden descargar los materiales para aprender offline?</h3>
        </label>
        <div class="content">
            <p>
            Yes, you can! ✌️

Si deseas trabajar sin estar conectado a internet, simplemente envíanos tu petición a: temis_it@hotmail.com y te enviaremos los enlaces de descarga de los materiales del curso. 

Podrás solicitar las descarga de materiales una vez haya transcurrido el período de prueba de 15 días.

Bear in mind

Ten en cuenta que podemos enviarte todos los materiales (audios, worksheets y ejercicios) excepto los vídeos, ya que se trata de archivos muy pesados.
              </p>
        </div>
    </div>
</section>
  )
}

export default Benefit
