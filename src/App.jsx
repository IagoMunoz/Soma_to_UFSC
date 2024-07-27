

import logo from './logo.png';
import React, { useState, useRef, useEffect } from 'react';
import {
  AppView, AppLogo, NavbarTxt, AppNavbar, Topnavbar, Botnavbar, AppInter,
  AppQuadro, AppField, InputField, InputButton, Footer, FooterTxt, AppUpdate, AppUpdateTxt
} from './App-styled.jsx';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [result, setResult] = useState('');
  const [showResults, setShowResults] = useState(false);
  const numItensRef = useRef(null);
  const somaAlternativasRef = useRef(null);
  const somaAssinaladosRef = useRef(null);
  const retryButtonRef = useRef(null);
  

  useEffect(() => {
    const savedVisibility = localStorage.getItem('isVisible');
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility));
    }
  }, []);

  // Salvar o estado no localStorage sempre que isVisible mudar
  useEffect(() => {
    localStorage.setItem('isVisible', JSON.stringify(isVisible));
  }, [isVisible]);

  useEffect(() => {
    if (showResults) {
      retryButtonRef.current.focus();
    } else {
      numItensRef.current.focus();
    }
  }, [showResults]);


  // funçao nova do pwa
  useEffect(() => {
    const handleVisibilityChange = () => {

      if (document.visibilityState === "visible") {
        console.log("APP resumed");
        window.location.reload();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
          strResu = <AppField>Resultado: {pREdondo}<br></br>Nota cheia, Mandou bem!</AppField>
        } else {
          strResu = <AppField>Resultado: {pREdondo}<br></br>Parabéns, cada décimo importa!!!</AppField>;
        }
      } else if (NPC === NPI) {
        strResu = <AppField>Resultado 0. A quantidade de<br></br>itens incorretos se iguala a de corretos.</AppField>;
      } else {
        strResu = <AppField>Resultado 0. A quantidade de<br></br>itens incorretos supera a de corretos.</AppField>;
      }
      setResult(strResu);
      setShowResults(true);
    } else {
      strResu = <AppField>Erro: Um ou mais valores<br></br>se encontrão fora dos limites.</AppField>
      setResult(strResu);
      setShowResults(true);
    }
  };

  const resetForm = () => {
    setShowResults(false);
  };

  return (
    <AppView>
      <AppNavbar>
        <Topnavbar>
          <AppLogo src={logo} alt="logo" onClick={toggleTextVisibility}
            style={{ cursor: 'pointer' }}></AppLogo>
          {isVisible && <NavbarTxt>Clique na logo para ocultar os textos.<br></br>Você pode operar tudo apenas clicando enter para avançar o campo e calcular</NavbarTxt>}
        </Topnavbar>
        <Botnavbar>
          {isVisible && <NavbarTxt>Aplicação PWA com REACT simples, feita para estudantes poderem calcular a nota de questões
            de somatório estilo UFSC. É possível baixar o site para usar como um APP no seu telefone.<br></br>
              </NavbarTxt>}
        </Botnavbar>
      </AppNavbar>
      <AppInter>
        {!showResults ? (
          <AppQuadro>
            <AppField>
              <label htmlFor="numItens">Número de itens:</label>
              <InputField id="numItens" name="numItens" min="1" max="7" pattern="[0-9]*" ref={numItensRef} onKeyDown={(e) => handleEnterKey(e, somaAlternativasRef)} />
            </AppField>
            <AppField>
              <label htmlFor="somaAlternativas">Soma dos itens corretos:</label>
              <InputField type="number" id="somaAlternativas" name="somaAlternativas" min="1" max="99" pattern="[0-9]*" ref={somaAlternativasRef} onKeyDown={(e) => handleEnterKey(e, somaAssinaladosRef)} />
            </AppField>
            <AppField>
              <label htmlFor="somaAssinalados">Soma dos itens assinalados:</label>
              <InputField type="number" id="somaAssinalados" name="somaAssinalados" min="1" max="99" pattern="[0-9]*" ref={somaAssinaladosRef} onKeyDown={(e) => handleEnterKey(e, null, calculate)} />
            </AppField>
            <AppField>
              <InputButton onClick={calculate}>
                Calcular
              </InputButton>
            </AppField>
          </AppQuadro>
        ) : (
          <AppQuadro>
            {result}
            <AppField>
              <InputButton ref={retryButtonRef} onClick={resetForm} onKeyDown={(e) => handleEnterKey(e, null, resetForm)}>
                Calcular <br></br> novamente
              </InputButton>
            </AppField>
          </AppQuadro>
        )}
      </AppInter>
      <AppUpdate>
        <AppUpdateTxt>Por favor, ao entrar no<br></br>
                      aplicativo, arraste para<br></br>
                      baixo, pois a autoatualização<br></br>
                      ainda não está implementada.<br></br>
                      Quando este aviso sumir, a<br></br>
                      autoatualização estará funcionando.
        </AppUpdateTxt>
      </AppUpdate>
      <Footer>
          <FooterTxt href="https://github.com/IagoMunoz/Soma_to_UFSC">Iago Muñoz-Soma_to_UFSC</FooterTxt>
        </Footer>
    </AppView>
  );
}
export default App;
