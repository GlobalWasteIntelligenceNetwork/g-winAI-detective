import type { Observation } from '@/types';

export const SAMPLE_OBSERVATIONS: Observation[] = [
  { id: 's1', country: 'Canada', city: 'Vancouver', environment: 'Park', wasteType: 'Cigarette butts', quantity: '~20 items', date: '2026-06-02', verification: 'Verified' },
  { id: 's2', country: 'Canada', city: 'Toronto', environment: 'Street', wasteType: 'Food packaging', quantity: '~15 items', date: '2026-06-09', verification: 'Partially' },
  { id: 's3', country: 'Canada', city: 'Vancouver', environment: 'Beach', wasteType: 'Plastic bottles', quantity: '~30 items', date: '2026-06-15', verification: 'Unverified' },
  { id: 's4', country: 'Canada', city: 'Montreal', environment: 'School', wasteType: 'Drink containers', quantity: '~12 items', date: '2026-06-20', verification: 'Verified' },
  { id: 's5', country: 'Canada', city: 'Vancouver', environment: 'Park', wasteType: 'Food packaging', quantity: '~25 items', date: '2026-07-01', verification: 'Partially' },
  { id: 's6', country: 'Spain', city: 'Barcelona', environment: 'Beach', wasteType: 'Plastic packaging', quantity: '~40 items', date: '2026-06-05', verification: 'Verified' },
  { id: 's7', country: 'Spain', city: 'Madrid', environment: 'Street', wasteType: 'Cigarette butts', quantity: '~35 items', date: '2026-06-12', verification: 'Unverified' },
  { id: 's8', country: 'Spain', city: 'Valencia', environment: 'River / waterway', wasteType: 'Plastic bottles', quantity: '~22 items', date: '2026-06-18', verification: 'Partially' },
  { id: 's9', country: 'Spain', city: 'Barcelona', environment: 'Beach', wasteType: 'Plastic packaging', quantity: '~50 items', date: '2026-07-03', verification: 'Needs correction' },
  { id: 's10', country: 'Spain', city: 'Seville', environment: 'Residential area', wasteType: 'Food packaging', quantity: '~10 items', date: '2026-06-25', verification: 'Verified' },
  { id: 's11', country: 'China', city: 'Shanghai', environment: 'River / waterway', wasteType: 'Plastic bottles', quantity: '~45 items', date: '2026-06-07', verification: 'Partially' },
  { id: 's12', country: 'China', city: 'Beijing', environment: 'Street', wasteType: 'Food packaging', quantity: '~28 items', date: '2026-06-14', verification: 'Verified' },
  { id: 's13', country: 'China', city: 'Shanghai', environment: 'School', wasteType: 'Drink containers', quantity: '~18 items', date: '2026-06-21', verification: 'Unverified' },
  { id: 's14', country: 'China', city: 'Guangzhou', environment: 'Residential area', wasteType: 'Plastic packaging', quantity: '~33 items', date: '2026-06-28', verification: 'Needs correction' },
  { id: 's15', country: 'China', city: 'Shanghai', environment: 'River / waterway', wasteType: 'Plastic bottles', quantity: '~60 items', date: '2026-07-10', verification: 'Partially' },
  { id: 's16', country: 'Canada', city: 'Vancouver', environment: 'Beach', wasteType: 'Plastic bottles', quantity: '~42 items', date: '2026-07-18', verification: 'Unverified' },
];

export interface Hotspot {
  location: string;
  country: string;
  environment: string;
  weeks: { label: string; level: 'low' | 'medium' | 'high'; value: number }[];
  emerging: boolean;
}

export const SAMPLE_HOTSPOTS: Hotspot[] = [
  {
    location: 'Vancouver — English Bay',
    country: 'Canada',
    environment: 'Beach',
    weeks: [
      { label: 'Week 1', level: 'low', value: 18 },
      { label: 'Week 2', level: 'medium', value: 32 },
      { label: 'Week 3', level: 'high', value: 52 },
    ],
    emerging: true,
  },
  {
    location: 'Barcelona — Barceloneta',
    country: 'Spain',
    environment: 'Beach',
    weeks: [
      { label: 'Week 1', level: 'medium', value: 35 },
      { label: 'Week 2', level: 'medium', value: 40 },
      { label: 'Week 3', level: 'medium', value: 38 },
    ],
    emerging: false,
  },
  {
    location: 'Shanghai — Suzhou Creek',
    country: 'China',
    environment: 'River / waterway',
    weeks: [
      { label: 'Week 1', level: 'low', value: 22 },
      { label: 'Week 2', level: 'medium', value: 30 },
      { label: 'Week 3', level: 'high', value: 48 },
    ],
    emerging: true,
  },
];
