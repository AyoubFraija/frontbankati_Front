import {Roles} from "./Roles";

export interface Agent {
  id?: number;                    // Optional as the ID is typically auto-generated
  uid: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  numCin: string;
  address: string;
  phonenumber: string;
  description: string;
  cinRectoPath: string | ArrayBuffer | null;  // The CIN images (binary data)
  cinVersoPath: string | ArrayBuffer | null;  // The CIN images (binary data)
  birthdate: string;               // Date of birth (ISO string or a format you choose)
  numLicence: number;
  numRegCom: number;
  firstLogin: boolean;
  role: Roles;
  token?: string;

}
