function medidas (){
    let bajopecho=document.getElementById("bajopecho").value;
    let pecho=document.getElementById("edad").value; 



    if(bajopecho==""){
        alert("La medida es obligatoria", bajopecho);
        //return false;
    }
    else{
        return true;
    }


    if(pecho==""){
        alert("La medida es obligatoria", pecho);
        //return false;
    }
    else{
        return true;
    }
}

function mostrarAlerta() {
    // Obtener valores de los campos
    const val1 = document.getElementById("bajopecho").value.trim(); // Eliminar espacios en blanco
    const val2 = document.getElementById("pecho").value.trim();

    // Validar que no estén vacíos
    if (val1 !== "" && val2 !== "") {
        alert("Formulario enviado correctamente.");
    } else {
        alert("Por favor, completa todos los campos antes de enviar.");
    }
}