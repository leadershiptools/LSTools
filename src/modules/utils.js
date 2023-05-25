import Cookies from "js-cookie";

export function getMonthNames(monthIndex) {
  switch (monthIndex) {
    case 0:
      return "Janeiro";
    case 1:
      return "Fevereiro";
    case 2:
      return "Março";
    case 3:
      return "Abril";
    case 4:
      return "Maio";
    case 5:
      return "Junho";
    case 6:
      return "Julho";
    case 7:
      return "Agosto";
    case 8:
      return "Setembro";
    case 9:
      return "Outubro";
    case 10:
      return "Novembro";
    case 11:
      return "Dezembro";
    default:
      return "";
  }
}

export function getUserToken() {
  const user = Cookies.get("user");
  if (!user) return null;
  return JSON.parse(user)?.stsTokenManager?.accessToken;
}
