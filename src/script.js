let validator = {
  handleSubmit:(event) => {
    //Para o comportamento padrão do form, que é enviar
    event.preventDefault();
    let send = true

    let inputs = form.querySelectorAll('input')

    validator.clearErrors()

    for(input of inputs) {
     let check = validator.checkInput(input)
     if(check !== true) {
       send = false
       //Exibir o erro
       validator.showError(input, check)
     }
    }

    if(send) {
      form.submit()
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');

    if(rules !== null) {
      rules = rules.split('|');
      for(let k in rules) {
        let rDetails = rules[k].split('=')
        switch(rDetails[0]) {
          case 'required':
              if(input.value == '') {
                return 'Campo não pode ser vazio.'
              }
            break
          case 'min':
              if(input.value.length < rDetails[1]) {
                return `Digite pelo menos ${rDetails[1]} caracters`
              }
            break;
        }
      }
    }

    return true
  },
  showError: (input, error) => {
    input.style.borderColor = '#ff0000'
    input.style.borderWidth = '2px'

    //Criando o elemento
    let errorElement = document.createElement('div')
    errorElement.classList.add('error');
    errorElement.innerHTML = error

    //Inserindo na tela
    input.parentElement.insertBefore(errorElement, input.ElementSibling)

  },
  clearErrors: () => {
    let inputs = document.querySelectorAll('input')
    for(input of inputs) {
      input.style = '0'
      // input.style.borderColor = '#ff0000'
    }

    let errorElements = document.querySelectorAll('.error')
    for(error of errorElements) {
      error.remove()
    }
  }
}

const form = document.querySelector('.validator')
form.addEventListener('submit', validator.handleSubmit)