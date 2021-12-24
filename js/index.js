//VARIABLES
const formulario = document.querySelector('.form');
//TIPOS DE SEGUROS PARA ANIMACION
const types = document.querySelectorAll('.type');
//SERIVICIOS PARA ANIMACION
const services = document.querySelectorAll('.service');


//ANIMACION TIPOS DE SEGURO
window.addEventListener('scroll', checkBoxes)
checkBoxes()
function checkBoxes() {
    const triggerBottom = window.innerHeight;
    types.forEach((type) => {
        const boxTop = type.getBoundingClientRect().top
        if(boxTop <= triggerBottom) {
            type.classList.add('show')
        } else {
            type.classList.remove('show')
        }
    })
}

//ANIMACION SERVICIOS
window.addEventListener('scroll', serviceScroll)
serviceScroll()
function serviceScroll() {
    const triggerBottom = window.innerHeight;
    services.forEach((service) => {
        const boxTop = service.getBoundingClientRect().top
        if(boxTop < triggerBottom) {
            service.classList.add('show')
        } else {
            service.classList.remove('show')
        }
    })
}






//CONSTRUCTORES
function Seguro (cantidad, edad, enfermedad, apoyo, tipo) {
    this.cantidad = cantidad;
    this.edad = edad;
    this.enfermedad = enfermedad;
    this.apoyo = apoyo;
    this.tipo = tipo;
}


Seguro.prototype.cotizarSeguro = function() {
    let cantidad;
    const base = 500;
    //CANTIDAD DE PERSONAS 
    switch(this.cantidad) {
        case '1':
            cantidad = base * 5;
            break;
         case '2':
            cantidad = base * 10;
            break;
         case '3':
            cantidad = base * 15;
            break;
         case '4':
            cantidad = base * 20;
            break;
         case '5':
            cantidad = base * 25;
            break;
        default:
            break;
    }
    
    //EDAD DE LAS PERSONAS
    switch(this.edad) {
        case '1':
            cantidad *=  1.15;
            break;
         case '2':
            cantidad *=  1.25;
            break;
         case '3':
            cantidad *=  1.35;
            break;
         case '4':
            cantidad *=  1.45;
            break;
         case '5':
            cantidad *=  1.55;
            break;
         case '6':
            cantidad *= 1.65;
            break;
        default:
            break;
    }

    //EDAD DE LAS PERSONAS
    switch(this.enfermedad) {
        case 'No':
            cantidad = cantidad;
            break;
         case 'Cancer':
            cantidad = cantidad + 1000;
            break;
         case 'Diabetes':
            cantidad = cantidad + 850;
            break;
         case 'Alzheimer':
            cantidad = cantidad + 1500;
            break;
         case 'Parkinson':
            cantidad = cantidad * 2000;
            break;
        case 'VIH':
            cantidad = cantidad + 3100;
            break;
         case 'SIDA':
            cantidad = cantidad + 2690;
            break;
         case 'Cirrosis':
            cantidad = cantidad + 1800;
            break;
         case 'Hepatitis':
            cantidad = cantidad + 2400;
            break;
         case 'Pulmonia':
            cantidad = cantidad * 2000;
            break;
         case 'Artritis':
            cantidad = cantidad + 1900;
            break;
         case 'Otro':
            cantidad = cantidad * 3500;
            break;
        default:
            break;
    }

        //Apoyo
        switch(this.apoyo) {
            case 'No':
                cantidad = cantidad;
                break;
             case 'Gobierno':
                cantidad = cantidad - 500;
                break;
             case 'Trabajo':
                cantidad = cantidad - 600;
                break;
             case 'Escuela':
                cantidad = cantidad - 800;
                break;
             case 'Despensa':
                cantidad = cantidad - 900;
                break;
            case 'Privada':
                cantidad = cantidad - 1000;
                break;
             case 'Otro':
                cantidad = cantidad -750;
                break;
            default:
                break;
        }

      //TIPO DE SEGURO
      switch(this.tipo) {
        case 'Casual':
            cantidad = (cantidad * 2)/100 + cantidad ;
            break;
         case 'Contra Accidentes':
            cantidad = (cantidad * 4)/100 + cantidad ;
            break;
         case 'Hipotecario':
            cantidad = (cantidad * 6)/100 + cantidad ;
        default:
            break;
    }

    return cantidad;
}


function UI () {}

//MOSTRAR RESULTAOD
UI.prototype.mostrarResultado = (total, seguro) => {
   const {cantidad, edad, enfermedad, apoyo, tipo} = seguro;
   let textoEdad;

   switch(edad) {
      case '1':
         textoEdad = '18-25';
         break;
      case '2':
          textoEdad = '26-30';
          break;
      case '3':
         textoEdad = '31-40';
         break;
      case '4':
          textoEdad = '41-50';
          break;
      case '5':
         textoEdad = '51-60';
         break;
      case '6':
          textoEdad = '61-70';
          break;
   }

   const div = document.createElement('DIV');
   div.classList.add('resultado');

   div.innerHTML = `
   <p class="header-resultado">Resumen</p>
   <p><span>Personas Aseguradas:</span> ${cantidad}</p>
   <p><span>Su edad:</span> ${textoEdad}</p>
   <p><span>Enfermedad:</span> ${enfermedad}</p>
   <p><span>Tipo De Apoyo:</span> ${apoyo}</p>
   <p><span>Tipo de Seguro:</span> ${tipo}</p>
   <p><span>Tu total:</span> ${total}</p>
   `;
  
   const divResultado = document.querySelector('#resultado')

   //MOSTRAR SPINNER
   const spinner = document.querySelector('.spinner');
   spinner.style.display = 'block'

   setTimeout(() => {
      spinner.style.display = 'none';
      divResultado.appendChild(div)
   }, 2000);
}


const ui = new UI();

eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', Cotizar)
}

function Cotizar(e) {
    e.preventDefault();

    //OBTENER LOS CAMPOS DEL FORM
    const cantidad = document.querySelector('#personas-select').value;
    const edad = document.querySelector('#edad-select').value;
    const enfermedad = document.querySelector('#enfermedad-select').value;
    const apoyo = document.querySelector('#apoyo-select').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
   
    if(cantidad === '' || edad === '' || enfermedad === '' || apoyo === '' || tipo === '')
     {
        ui.mostrarError('Todos los campos son obligatorios', 'error');
        return;
     } 

     ui.mostrarError('Calculando...', 'correcto');

     const resultados = document.querySelector('#resultado div');
     if(resultados != null) {
        resultados.remove();
     }

     const seguro = new Seguro(cantidad, edad, enfermedad, apoyo, tipo);
     const total = seguro.cotizarSeguro();
     ui.mostrarResultado(total, seguro);
}

//MENSAJE ERROR
UI.prototype.mostrarError = (mensaje, tipo) => {
   const div = document.createElement('DIV');
   if(tipo === 'correcto') {
       div.classList.add('correcto')
   } else {
       div.classList.add('error');
   }
   div.classList.add('mensaje');

   setTimeout(() => {
       div.remove();
   }, 2000);

   div.textContent = mensaje;
   formulario.insertBefore(div, document.querySelector('.button-container'));
}



























