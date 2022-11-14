class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        let libro = {
            nombre: nombre,
            autor: autor
        };
        this.libros.push(libro);
    }

    getBookNames() {
        let bookArray = []
        for (let i in this.libros) {
            bookArray.push(this.libros[i].nombre)
        }
        return bookArray
    }
}

const usuario = new Usuario("Juan", "Perez", [{
    nombre: "Las mil y una noches",
    autor: "Anónimo"
}, {
    nombre: "Harry Potter y la Piedra Filosofal",
    autor: "J.K. Rowling"
}], ["Perro", "Gato", "Tortuga"])

//función getFullName

const fullName = usuario.getFullName()
console.log(`Nombre y apellido: ${fullName}`)

//función addMascota

usuario.addMascota("Pájaro")
console.log(`Las mascotas de ${fullName} son: ${usuario.mascotas}`)

//función countMascotas

const cantidadMascotas = usuario.countMascotas()
console.log(`${fullName} tiene ${cantidadMascotas} mascotas`)

//función addBook

usuario.addBook("Las intermitencias de la muerte", "José Saramago")
console.log(usuario.libros)

//función getBookNames

const bookNames = usuario.getBookNames()
console.log(bookNames)