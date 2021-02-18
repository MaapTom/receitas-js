//Alteração na cor dos botões
const inputsRadio = document.querySelectorAll('input[type="radio"]')

inputsRadio.forEach((input) => {
  if (input.checked) {
    input.previousElementSibling.classList.add('selected');
  }
  input.addEventListener('click', changeColorInput)
})

function changeColorInput(event) {
  inputsRadio.forEach((input) => {
    input.checked = false;
    input.previousElementSibling.classList.remove('selected')
  })

  event.target.checked = true;
  event.target.previousElementSibling.classList.add('selected')
}

//Botão adicionar novo ingrediente
const btnAdicionar = document.querySelector('.button-add');

function addIngrediente(event) {
  event.preventDefault();

  const inputsIngredientes = document.querySelector('.input-ingrediente');
  const btnDeleteIngredientes = document.createElement('a');

  const newInputsIngredientes = inputsIngredientes.cloneNode(true)
  
  btnDeleteIngredientes.href = "#";
  btnDeleteIngredientes.innerText = "Retirar";
  btnDeleteIngredientes.classList.add('btn-delete');
  btnDeleteIngredientes.onclick = deleteIngrediente;

  newInputsIngredientes.appendChild(btnDeleteIngredientes);
  newInputsIngredientes.children[0].value = "";
  newInputsIngredientes.children[1].value = "";

  const containerIngredientes =  inputsIngredientes.parentNode;

  containerIngredientes.insertBefore(newInputsIngredientes, btnAdicionar)
}
btnAdicionar.addEventListener('click', addIngrediente)

//Botão remover ingrediente

function deleteIngrediente(event) {  
  const elementoPai = event.target.parentNode;

  elementoPai.parentNode.removeChild(elementoPai);
}

//Validando e carregando preview

const inputFile = document.querySelector('input[type="file"]');

function readInputFile() {

  const preview = document.querySelector('#preview');

  if(inputFile.files[0]) {
    const reader = new FileReader();  
    reader.readAsDataURL(inputFile.files[0])
    reader.onload = (event) => {

      document.querySelector('.mensagem-error').style.display = 'none';
      document.querySelector('.send-form').disabled = false;

      const typeImages = ['image/jpeg', 'image/png', 'image/jpg'].includes(inputFile.files[0].type);

      if (!typeImages) {
        document.querySelector('.mensagem-error').style.display = 'flex';
        document.querySelector('.send-form').disabled = true;
        return;
      }

      preview.src = event.target.result;
    }
  }
}
inputFile.addEventListener('change', readInputFile)



