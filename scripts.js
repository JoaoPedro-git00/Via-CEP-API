const campos = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];

// Restaura os dados do localStorage ao carregar a página
window.addEventListener('load', () => {
  campos.forEach(campo => {
    const valor = localStorage.getItem(campo);
    if (valor) {
      document.getElementById(campo).value = valor;
    }
  });
});

// Salva os dados no localStorage sempre que forem modificados
campos.forEach(campo => {
  const input = document.getElementById(campo);
  input.addEventListener('input', () => {
    localStorage.setItem(campo, input.value);
  });
});

// Busca os dados do CEP ao sair do campo
document.getElementById("cep").addEventListener("blur", (evento) => {
  const elemento = evento.target;
  const cepInformado = elemento.value.replace(/\D/g, '');

  if (cepInformado.length !== 8) {
    console.log("CEP não tem 8 caracteres.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado");
      } else {
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        // Salva no localStorage
        localStorage.setItem('rua', data.logradouro);
        localStorage.setItem('bairro', data.bairro);
        localStorage.setItem('cidade', data.localidade);
        localStorage.setItem('estado', data.uf);
      }
    })
    .catch(error => console.error("Erro ao buscar o CEP: ", error));
});



