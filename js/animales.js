const { createApp } = Vue;

createApp({
    data() {
        return {
            animales: [],
            url: 'https://marianopython.pythonanywhere.com/animales',
            error: false,
            cargando: true,
            id: 0,
            especie: "",
            ubicacion: "",
            artista: "",
            imagen: "",
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.animales = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    Swal.fire({
                        title: "Registro Eliminado",
                        icon: "warning",
                    }).then(() => {
                        location.reload();
                    });
                    
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        title: "Error",
                        text: "Error al eliminar el registro",
                        icon: "error",
                    });
                });
        },
        grabar() {
            let animal = {
                especie: this.especie,
                imagen: this.imagen,
                artista: this.artista,
                ubicacion: this.ubicacion
            };

            var options = {
                body: JSON.stringify(animal),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };

            fetch(this.url, options)
                .then(function () {
                    Swal.fire({
                        title: "Registro Grabado",
                        icon: "success",
                    }).then(() => {
                        window.location.href = "./animales.html";
                    });
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        title: "Error",
                        text: "Error al grabar el registro",
                        icon: "error",
                    });
                });
        }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
