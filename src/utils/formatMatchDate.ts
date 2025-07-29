export const formatMatchDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
  
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return `${n}TH`;
      switch (n % 10) {
        case 1:
          return `${n}ST`;
        case 2:
          return `${n}ND`;
        case 3:
          return `${n}RD`;
        default:
          return `${n}TH`;
      }
    };
  
    return `${month} ${getOrdinal(day)} ${hours}:${minutes}`;
  };