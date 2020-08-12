//Procurar o botão
//document.querySelector("#add-time").addEventListener('click', cloneField)
 (document.getElementById("add-time"))
// //Quando clicar no botão
.addEventListener('click', cloneField)



//Executar uma ação

function cloneField(){
    console.log("Cheguei aqui")

    //Duplicar os campos - que campos
    //Node para se referir a elementos / tags html (DOM)
    //true - clona todos os filhos e conteúdo
    //false - clona apenas o div
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //limpar os campos
    const fields = newFieldContainer.querySelectorAll('input')


    //for each field, clean it
    fields.forEach(function (actualfield){
        //get the actual field and clean it
        actualfield.value = ""
    })
 

   // //Colocar na página.
    document.querySelector('#schedule-items').appendChild(newFieldContainer)

}
    