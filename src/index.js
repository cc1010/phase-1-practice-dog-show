document.addEventListener('DOMContentLoaded', () => {
    let id = 0
    function renderToDom (){    
        fetch('http://localhost:3000/dogs')
        .then(respone => respone.json())
        .then(data => {
            document.querySelector('#table-body').innerHTML = ''
            data.forEach(element => {
                console.log(element)
                renderElements(element.name, element.breed, element.sex, element.id)
            });
        })
    }
    renderToDom()
    function renderElements(name1, breed1, sex1, id1){
    
    const tableBody = document.getElementById('table-body')
    // create elements
    const tableRow = document.createElement('tr')
    const name = document.createElement('th')
    const breed = document.createElement('th')
    const sex = document.createElement('th') 
    const btn = document.createElement('th')
   
    // assign elements
    name.textContent = name1
    breed.textContent = breed1
    sex.textContent = sex1
    btn.innerHTML = `<td><button>Edit</button></td>`
    tableRow.appendChild(name)
    tableRow.appendChild(breed)
    tableRow.appendChild(sex)
    tableRow.appendChild(btn)
    tableBody.appendChild(tableRow)

    const form = document.querySelector('#dog-form')

    // edit element
    const btnEdit = btn.querySelector('button')
    btnEdit.addEventListener('click', e=>{
        //console.log(name1, breed1, sex1, id1)
        //console.log(form, id1)
        const formName = form.querySelectorAll('input')[0]
        const formBreed = form.querySelectorAll('input')[1]
        const formSex = form.querySelectorAll('input')[2]
        formName.value = name1
        formBreed.value = breed1
        formSex.value = sex1
        id = id1

        })
    }
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', e=>{
        e.preventDefault()
        const formName = form.querySelectorAll('input')[0]
        const formBreed = form.querySelectorAll('input')[1]
        const formSex = form.querySelectorAll('input')[2]
        //console.log(formName.value, formBreed.value, formSex.value,id)
        const newObj = {"name": formName.value, "breed": formBreed.value, "sex": formSex.value}
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
            body: JSON.stringify(newObj)
        })
        .then(respone => respone.json())
        .then(data => {
            console.log(data)
            renderToDom()
        })
        
    })





})