const acountID = process.env.REACT_APP_GN_ACCOUNT_ID;

const PayTokenGN = () => {
  let s = document.createElement('script');
  s.type = 'text/javascript';
  let v = parseInt(Math.random() * 1000000);
  s.src = 'https://sandbox.gerencianet.com.br/v1/cdn/' + acountID + '/' + v;
  s.async = true;
  s.id = acountID;
  if (!document.getElementById(acountID)) {
    document.getElementsByTagName('head')[0].appendChild(s);
    return s;
  }
};

export default PayTokenGN;
