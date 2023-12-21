console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        especie:"",
        imagen:"",
        artista:"",
        ubicacion:"",
        url:'https://marianopython.pythonanywhere.com/animales/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.especie = data.especie;
                    this.imagen=data.imagen
                    this.artista=data.artista
                    this.ubicacion=data.ubicacion                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let animal = {
                especie:this.especie,
                ubicacion: this.ubicacion,
                artista: this.artista,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(animal),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
            .then(function () {
                Swal.fire({
                    title: "Registro Modificado",
                    icon: "info",
                }).then(() => {
                    window.location.href = "./animales.html";
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "Error al modificar el registro",
                    icon: "error",
                });
            });
    }
},
created() {
    this.fetchData(this.url)
},
}).mount('#app');