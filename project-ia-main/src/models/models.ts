
export interface Cliente {
    ID: number;
    Name: string;
    Empresa: string;
  }
  
export interface Maquina {
    ID: number;
    Name: string;
    ClienteID: number;
  }

export interface Controladora {
    ID: string;
    Name: string;
    Type: string;
    MaquinaID: number;
  }

export interface Keepalive {
    ID: number;
    ControladoraID: string;
    Timestamp: Date;  
    Status: string;
  }

export  interface Leituras {
    ID: number;
    SensorID: number;
    Timestamp: Date;
    Leitura: string;
  }

export interface Leituras {
    ID: number;
    SensorID: number;
    Timestamp: Date;
    Leitura: string;
  }
  