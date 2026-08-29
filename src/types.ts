export type Country =
  | 'Canada'
  | 'Spain'
  | 'China'
  | 'United States'
  | 'France'
  | 'Germany'
  | 'Other';

export type EnvironmentType =
  | 'Park'
  | 'Street'
  | 'School'
  | 'Beach'
  | 'River / waterway'
  | 'Residential area'
  | 'Other';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Confidence = 'LOW' | 'MEDIUM' | 'HIGH';
export type VerificationStatus = 'Verified' | 'Partially' | 'Needs correction' | 'Unverified';

export interface Observation {
  id: string;
  country: Country;
  city: string;
  environment: EnvironmentType;
  wasteType: string;
  quantity: string;
  date: string;
  verification: VerificationStatus;
}

export interface DetectiveReport {
  observed: string[];
  possiblePattern: string;
  priority: Priority;
  confidence: Confidence;
  investigateNext: string;
  isSample: boolean;
}

export interface AnalysisInput {
  country: Country;
  city: string;
  environment: EnvironmentType;
  image: string;
}
