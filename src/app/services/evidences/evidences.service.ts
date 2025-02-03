import { Injectable } from '@angular/core';
import { Evidence } from '../../interfaces/evidence';

@Injectable({
  providedIn: 'root'
})
export class EvidencesService {
  evidences:Evidence[]=[
    { id: 1, productId: 1,username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"},
    { id: 2, productId: 1, username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"},
    { id: 3, productId: 2, username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"},
    { id: 4, productId: 2, username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"},
    { id: 5, productId: 3, username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"},
    { id: 6, productId: 3, username:"Anonimo", description:"Muito bom o produto, recomento muito", createdAt:"26/01/2025 13:31:18"}
  ]

  constructor() { }
  
 getEvidencesByProductId(productId: number): Evidence[] {
    const filteredEvidences = this.evidences.filter(evidence => evidence.productId === productId);
    if (!filteredEvidences) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return filteredEvidences; 
  }

}
