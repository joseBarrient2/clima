const ciudad = document.getElementById('elijePais');
const boton = document.querySelector('.buscarPais');
const boxResult = document.querySelector('.datosClima');

const dia = new Date();
const arregloDias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];
const xday = dia.getDay();


boton.addEventListener('click',buscarClima);

async function buscarClima(){
    
    boxResult.innerHTML = '';
    let img = document.createElement('img');
    img.classList.add('cargador');
    img.src = 'loader.gif';
    boxResult.appendChild(img);
    
    try{
    const link = `https://weather-api-t17v.onrender.com/weather/${ciudad.value}`;
    console.log(link);
    const url = await fetch(link);
    const data = await url.json(); 
    procesarDatos(data);

    }
    catch (error){
       dataError(error);

    }
    finally{
        //let carga = document.querySelector('.cargador');
        //img.css.display = 'none';
    }
    
}

function procesarDatos(arregloClima){
    //console.log(arregloClima);
    for(datos in arregloClima){
        boxResult.innerHTML = `
        <section class="boxDatosClima">
               <article class="boxItem">
                <span class="day fa-solid fa-calendar-days"></span>
                <span>Día de la semana</span>
                <div class="dato_ciuda">${arregloDias[xday]}</div>
               </article>
               <article class="boxItem">
                <span class="fa-solid fa-temperature-three-quarters"></span>
                <span>Temperatura</span>
                <div class="dato_ciuda">${arregloClima['temperature']}</div>
                </article>
               <article class="boxItem">
                    <span class="ciuda fa-solid fa-city"></span>
                    <span>Cuidad</span>
                    <div class="dato_ciuda">${ciudad.value}<div>
                </article>
               <article class="boxItem">
                <span class="viento fa-solid fa-wind"></span>
                <span>Viento</span>
                <div class="dato_ciuda">${arregloClima['wind']}</div>
                </article>
            </section>
        `;
        //console.log(`${arregloClima['temperature']}`);
    }
}

function dataError(error){
   //console.log(error);
   boxResult.innerHTML = `<div class="error">
   <p>ingrese un dato valido<p>
   </div>`;
}