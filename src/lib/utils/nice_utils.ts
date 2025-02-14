export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  export function setCookie(cname: string, cvalue: string, exdays: number) {
    try{
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      const expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    catch{
        //handle error
    }
    
  }

  export function getCookie(cname: string) {
    try {
      const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
      
    } catch{
      return "";
      
    }
    
  }

  export function isWithin15Minutes(dateTime: Date): boolean {
    const fifteenMinutesInMillis = 15 * 60 * 1000;
    const now = new Date();
    const differenceInMillis = dateTime.getTime() - now.getTime();
  
    return differenceInMillis <= fifteenMinutesInMillis;
  }
  

  // Helper function to convert data to an array
export function ensureArray(data: unknown): object[] {
  return Array.isArray(data) ? data : [data];
}