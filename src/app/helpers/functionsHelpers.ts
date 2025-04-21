import { AuthResponse } from "../interfaces/AuthResponse";
import * as jwt_decode from "jwt-decode";
import { User } from "../interfaces/user";
import { JwtPayload } from "../interfaces/JwtPayload";

export function createEmptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      status: '',
      typeAccount: '',
      address: {
        id: 0,
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipcode: '',
        cellPhone: '',
        userId: 0
      }
    };
}
export function getUserIdFromToken(): number | null {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
  
    try {
      const parsedUser: AuthResponse = JSON.parse(storedUser);
      const token = parsedUser.acessToken.replace('Bearer ', '');
      const decoded = jwt_decode.jwtDecode<JwtPayload>(token);
  
      return decoded["nameid"]; 
      
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
  export function validateCpfCnpj(document: string): 'CPF' | 'CNPJ' | 'INVALID' {
    const cleaned = document.replace(/\D/g, '');
  
    if (cleaned.length === 11 && validateCpf(cleaned)) return 'CPF';
    if (cleaned.length === 14 && validateCnpj(cleaned)) return 'CNPJ';
  
    return 'INVALID';
  }
  
  export function validateCpf(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0, remainder;
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf[10]);
  }
  
  export function validateCnpj(cnpj: string): boolean {
    if (!cnpj || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0, pos = length - 7;
  
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
  
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
  
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  }