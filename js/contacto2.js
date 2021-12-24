const email = document.querySelector('#correo');
const tname = document.querySelector('#name');
const number = document.querySelector('#numero');
const form = document.querySelector('.form');
const sendBtn = document.querySelector('#btn')
const div = document.querySelector('#padre');
const select = document.querySelector('#select')
const formato = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatoNumbero = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/;



// EVENTOS
eventos();
function eventos() {
document.addEventListener('DOMContentLoaded', inciarApp);
email.addEventListener('blur', validarForm);
number.addEventListener('blur', validarForm)
tname.addEventListener('blur', validarForm);
form.addEventListener('submit', enviarForm);
}

/* FUNCIONES */

function inciarApp() {
    sendBtn.disabled = true;
    sendBtn.classList.add('first');
  }
  
   function validarForm(e) {
     if(e.target.value.length > 0) { 
       const error = document.querySelector('p.parrafo');
       if(error) {
         error.remove();
       }
      e.target.classList.remove("error");
      e.target.classList.add("correct");
     
    } else {
       e.target.classList.remove("correct");
       e.target.classList.add("error");
       
       mostrarError('Todos los campos son obligatorios');
     }
       //VALIDAR EMAIL
     if(e.target.type === 'email') {
       if(formato.test(e.target.value)) {
        const error = document.querySelector('p.parrafo');
        if(error) {
         error.remove(); 
        }
        e.target.classList.remove("error");
        e.target.classList.add("correct");
       } else {
         e.target.classList.remove("correct");
         e.target.classList.add("error");
        
        mostrarError('Emal no valido');
       }
     }
      //VALIDAR NUMERO
     if(e.target.type === 'tel') {
      if(formatoNumbero.test(e.target.value)) {
       const error = document.querySelector('p.parrafo');
       if(error) {
        error.remove(); 
       }
       e.target.classList.remove("error");
       e.target.classList.add("correct");
      } else {
        e.target.classList.remove("correct");
        e.target.classList.add("error");
       
       mostrarError('Numero no valido');
      }
    }
  1
     if(formato.test(email.value) && tname.value !== '' && select.value != '' && formatoNumbero.test(number.value)) {
      sendBtn.disabled = false;
     sendBtn.classList.remove('first');
     } 
   }
  
  function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('parrafo');
    
    const errores = document.querySelectorAll('.parrafo');
    if(errores.length === 0) {
      form.appendChild(mensajeError);
    }
  
  }
   
  //ENVIAR EMAIL
  function enviarForm(e) {
    e.preventDefault();
  
    const spinner = document.querySelector('.lds-roller');
    spinner.style.display = 'inline-block';
    
    setTimeout(() => {
      spinner.style.display = 'none';
  
      const parrafo = document.createElement('p');
      parrafo.classList.add('parrafoSend')
      parrafo.textContent = 'Email enviado exitosamente';
      div.appendChild(parrafo)
  
      
      setTimeout(() => {
       parrafo.style.display = 'none';
       resetForm();
      }, 3000);
  
      
  
    }, 3000);
  }
  
  function resetForm() {
    form.reset();
    inciarApp();
    email.classList.remove('correct');
    tname.classList.remove('correct');
    number.classList.remove('correct')
  }