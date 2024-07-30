import styled from 'styled-components';


export const AppView = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  margin: 0;
  overflow: hidden;
  text-align: center;
`;

export const AppLogo = styled.img`
  width: 128px;
  height: 128px;
  cursor: pointer;
  border: 2px solid #000000;
  border-radius: 25%;

@media (max-width: 720px) {
    width: 48px;
    height: 48px;
}
`;

export const NavbarTxt = styled.a`
  font-family: 'Courier New', serif;
  font-weight: bold;
  font-size: 16px;
  text-align: justify;
  margin: 0 30px;
  
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

export const AppNavbar = styled.div`
  background-color: #ffffff;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

@media (max-width: 720px) {
    padding: 6px 0;
}
`;

export const Topnavbar = styled.div`
  background-color: #ffffff;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  margin-left: 16%;
  margin-right: 16%;

  @media (max-width: 720px) {
  margin-left: 8%;
  margin-right: 8%;
}
`;

export const Botnavbar = styled.div`
  background-color: #ffffff;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  margin-left: 13%;
  margin-right: 13%;

  @media (max-width: 720px) {
  margin-left: 0%;
  margin-right: 0%;
}
`;

export const AppInter = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin: 0 0px;
  box-sizing: border-box;
  overflow: hidden;

@media (max-width: 720px) {
    align-items: flex-start;
    margin-bottom: 10%;
}
`;

export const AppQuadro = styled.div`
  margin: 12px;
  border: 2px solid #000000;
  border-radius: 6%;
  padding: 15px;
  box-shadow: inset 0 0 0 2px #FFF;
  box-sizing: border-box;
`;

export const AppField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: 'Courier New', serif;
  font-weight: bold;
  font-size: 24px;
  margin: 2% 0;
  padding: 10px;

@media (max-width: 720px) {
    font-size: 16px;
}
`;

export const InputField = styled.input`
  font-family: 'Courier New', serif;
  font-weight:bold;
  font-size: 24px;
  text-align: center;
  border-radius: 12px;
  margin: 8px 15%;

@media (max-width: 720px) {
    font-size: 16px;
}
`;

export const InputButton = styled.button`
  font-family: 'Courier New', serif;
  font-weight:bold;
  font-size: 24px;
  text-align: center;
  border-radius: 12px;
  margin-right: 25%;
  margin-left: 25%;

@media (max-width: 720px) {
    font-size: 16px;
}
`;

export const Footer = styled.div`
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  @media (max-width: 450px) {
    justify-content: space-between;
  }  
`;

export const FooterTxt = styled.a`
  font-family: 'Courier New', serif;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  margin-right: 18px;
`;

export const AppUpdate = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  
  overflow: hidden;
  margin-left: 18%;
  margin-right: 18%;

@media (max-width: 450px) {
    display: flex;
  }
`;

export const AppUpdateTxt = styled.div`
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  overflow: hidden;
  font-family: 'Courier New', serif;
  font-weight:bold;
  font-size: 12px;
  text-align: center;
  border-radius: 12px;
  padding: 8px;
`;
