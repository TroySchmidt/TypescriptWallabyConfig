export interface AttackMode {
  id: number;
  approachId?: number;
  name: string;
  description: string;
  icon: string;
}

export interface TargetChemical {
  id: number;
  targetId: number;
  chemicalId: number;
  storageConfigurationId?: number;
  qty: number;
  qtyUnitId: number;
  isMax: boolean;
}

export interface TargetClass {
  id: number;
  targetTypeId: number;
  metaClassId?: number;
  name: string;
  description: string;
  econ2Multiplier: number;
  isCDC: boolean;
  isWater: boolean;
}

export interface TargetConsequenceType {
  id: number;
  targetId: number;
  consequenceTypeId: number;
  consequenceScoreId: number;
}

export interface TargetContact {
  id: number;
  targetId: number;
  contactTypeId?: number;
  contactName: string;
  contactAddress: string;
  contactCity: string;
  contactStateId: string;
  contactPostalCode: string;
  contactPhone: string;
  contactEmail: string;
}

export interface TargetSecurity {
  id: number;
  targetId: number;
  securityMeasureId: number;
  securityClassId: number;
}

export interface Target {
  id: number;
  classId: number;
  acoeId?: number;
  coopPartnerId?: number;
  agreementTypeId?: number;
  epaFacilityId?: number;
  femaSecurityGrantId?: number;
  name: string;
  availability: number;
  populationAverage?: number;
  populationMax?: number;
  trafficAverage?: number;
  website: string;
  agreementDescription: string;
  operationDescription: string;
  areaDescription: string;
  nearbyAssets: string;
  focalPoint: string;
  consequenceDescription: string;
  uniquenessDescription: string;
  productsStored: string;
  note: string;
  isAlternate: boolean;
  isCfats: boolean;
  isCritical: boolean;
  isMtsaRegulated: boolean;
  isProposed: boolean;
}