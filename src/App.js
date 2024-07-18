import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [result, setResult] = useState('');
  const [showResults, setShowResults] = useState(false);
  const numItensRef = useRef(null);
  const somaAlternativasRef = useRef(null);
  const somaAssinaladosRef = useRef(null);
  const retryButtonRef = useRef(null);

  useEffect(() => {
    if (showResults) {
      retryButtonRef.current.focus();
    } else {
      numItensRef.current.focus();
    }
  }, [showResults]);

  
  const toggleTextVisibility = () => {
    setIsVisible(!isVisible); // Alterna a visibilidade dos textos
  };

  const handleEnterKey = (event, nextRef, action) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      if (nextRef) {
        nextRef.current.focus();
      } else if (action) {
        action();
      }
    }
  };

  function converterParaBinario(numero, comprimento) {
    let binario = numero.toString(2);
  
    while (binario.length < comprimento) {
      binario = '0' + binario;
    }

    return binario;
  }

  function contarCertos(binario) {
    let contador = 0;
    
    for (let i = 0; i < binario.length; i++) {
      if (binario[i] === '1') {
        contador++;
      }
    }
    
    return contador;
  }

  function compararBinarios(binCertos, binMarcados) {
    let contAcertos = 0;
    let contErros = 0;
  
    for (let i = 0; i < binCertos.length; i++) {
      if (binCertos[i] === '1' && binMarcados[i] === '1') {
        contAcertos++;
      } else if (binCertos[i] === '0' && binMarcados[i] === '1') {
        contErros++;
      }
    }
  
    return [contAcertos, contErros];
  }
  

  const calculate = () => {

    /*
    P – Pontuação do candidato na questão
    NP – Número de proposições da questão
    NTPC – Número total de proposições corretas na questão
    NPC – Número de proposições corretas consideradas corretas pelo candidato
    NPI – Número de proposições incorretas consideradas corretas pelo candidato

    se NPC > NPI

    P = (NP - (NPTC - (NPC - NPI))) / NP

    caso NPC <=NPI

    P = 0 
    */

    const numItens = parseInt(numItensRef.current.value);
    const somaAlternativas = parseInt(somaAlternativasRef.current.value);
    const somaAssinalados = parseInt(somaAssinaladosRef.current.value);
    let strResu;

    if (numItens >= 1 && numItens <= 7 && somaAlternativas >= 1 && somaAlternativas <= 99 && somaAssinalados >= 1 && somaAssinalados <= 99) {
      const NP = numItens;
      const somaAlte = somaAlternativas;
      const somaAssi = somaAssinalados;

      let binAlte = converterParaBinario(somaAlte, NP);
      let binAssi = converterParaBinario(somaAssi, NP);

      let NTPC = contarCertos(binAlte);
      let [NPC, NPI] = compararBinarios(binAlte, binAssi);

      

      if (NPC > NPI) {
        let P = (NP - (NTPC - (NPC - NPI))) / NP;
        let pREdondo = P.toFixed(2);
        if (pREdondo === "1.00") {
          strResu = <p class="App-input">Resultado: {pREdondo}<br></br>Nota cheia, Mandou bem!</p>
        } else {
          strResu = <p class="App-input">Resultado: ${pREdondo}<br></br>Parabéns, cada décimo importa!!!</p>;
        }
      } else if (NPC === NPI) {
        strResu = <p class="App-input">Resultado 0. A quantidade de<br></br>itens incorretos se iguala a de corretos.</p>;
      } else {
        strResu = <p class="App-input">Resultado 0. A quantidade de<br></br>itens incorretos supera a de corretos.</p>;
      }
      setResult(strResu);
      setShowResults(true);
    } else {
      strResu = <p class="App-input">Erro: Um ou mais valores<br></br>se encontrão fora dos limites.</p>
      setResult(strResu);
      setShowResults(true);
    }
  };

  

  const resetForm = () => {
    setShowResults(false);
  };

  return (
    <app class="App">
      <navbar className="App-navbar">
        <topnavbar className="topnavbar">
          <img src={logo} className="App-logo" alt="logo" onClick={toggleTextVisibility}
            style={{ cursor: 'pointer' }}></img>
          {isVisible && <p class = "App-intro">Clique na logo para ocultar os textos.<br>
          </br>Você pode operar tudo apenas clicando enter para avançar o campo e calcular</p>}
        </topnavbar>
        <botnavbar className="botnavbar">
          {isVisible && <p class = "App-intro">Aplicação PWA com REACT simples, feita para estudantes poderem calcular a nota de questões
            de somatório estilo UFSC. É possível baixar o site para usar como um APP no seu telefone.</p>}
        </botnavbar>
      </navbar>
      <interface class="App-inter">
        {!showResults ? (
          <quadro class="App-quadro">
            <div class="App-input">
              <label htmlFor="numItens">Número de itens da questão:</label>
              <input class="input" type="number" id="numItens" name="numItens" min="1" max="7" pattern="[0-9]*" ref={numItensRef} onKeyDown={(e) => handleEnterKey(e, somaAlternativasRef)} />
            </div>
            <div class="App-input">
              <label htmlFor="somaAlternativas">Soma das alternativas corretas:</label>
              <input class="input" type="number" id="somaAlternativas" name="somaAlternativas" min="1" max="99" pattern="[0-9]*" ref={somaAlternativasRef} onKeyDown={(e) => handleEnterKey(e, somaAssinaladosRef)} />
            </div>
            <div class="App-input">
              <label htmlFor="somaAssinalados">Soma dos valores assinalados por você:</label>
              <input class="input" type="number" id="somaAssinalados" name="somaAssinalados" min="1" max="99" pattern="[0-9]*" ref={somaAssinaladosRef} onKeyDown={(e) => handleEnterKey(e, null, calculate)} />
            </div>
            <div class="App-input">
              <button class="input-button" onClick={calculate}>
                Calcular
              </button>
            </div>
          </quadro>
        ) : (
          <quadro class="App-quadro-result">
            {result}
            <div class="App-input">
              <button class="input-button2" ref={retryButtonRef} onClick={resetForm} onKeyDown={(e) => handleEnterKey(e, null, resetForm)}>
                Calcular <br></br> novamente
              </button>
            </div>
          </quadro>
        )}
      </interface>
    </app>
  );
}

export default App;
