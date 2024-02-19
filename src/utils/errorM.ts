interface ErrorMessage {
    errors: string[];
  }
  
  export default function errorM(msg: string): ErrorMessage {
    return {
      errors: [msg],
    };
  }
  