
export type Page = 'splash' | 'onboarding' | 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'weather' | 'tasks' | 'inventory' | 'scan' | 'diagnosis' | 'marketplace' | 'wallet' | 'areas' | 'nearby' | 'settings' | 'area-details' | 'reports' | 'add-task' | 'adoption' | 'virtual-garden' | 'ai-labs' | 'ap-check';

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

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  time: string;
  area: string;
  priority: Priority;
  status: TaskStatus;
  type: 'irrigation' | 'inspection' | 'harvest' | 'other';
}
