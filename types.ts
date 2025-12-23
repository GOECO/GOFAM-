
export type Page = 'splash' | 'onboarding' | 'login' | 'signup' | 'dashboard' | 'weather' | 'tasks' | 'inventory' | 'scan' | 'diagnosis' | 'marketplace' | 'wallet' | 'areas' | 'nearby' | 'settings';

export interface SensorData {
  temp: number;
  humidity: number;
  soilMoisture: number;
  ph: number;
  lux: number;
}

export interface DiagnosisResult {
  diseaseName: string;
  scientificName: string;
  severity: 'Light' | 'Moderate' | 'Severe';
  confidence: number;
  causes: string[];
  protocol: {
    urgent: string[];
    safe: string[];
  };
}

export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  time: string;
  area: string;
  priority: Priority;
  completed: boolean;
  type: 'irrigation' | 'inspection' | 'harvest' | 'other';
}
