
export type Page = 'splash' | 'onboarding' | 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'weather' | 'tasks' | 'inventory' | 'scan' | 'diagnosis' | 'marketplace' | 'wallet' | 'areas' | 'nearby' | 'settings' | 'area-details' | 'reports' | 'add-task' | 'adoption' | 'virtual-garden' | 'ai-labs' | 'ap-check' | 'attendance' | 'messages' | 'chat-detail' | 'virtual-farm' | 'cultivation-log' | 'harvest' | 'blockchain-scan' | 'missions' | 'store' | 'ai-data' | 'notifications' | 'avatar-profile' | 'ai-chat' | 'ai-settings' | 'live-assistant';

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

export interface Message {
  id: string;
  sender: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  time: string;
  isMe: boolean;
  type: 'text' | 'image' | 'file' | 'shared';
  sharedContent?: {
    title: string;
    description: string;
    icon: string;
    category: 'Diagnosis' | 'Log';
  };
  imageUri?: string;
  fileName?: string;
  fileSize?: string;
  reactions?: { emoji: string; count: number }[];
}

export interface ChatThread {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageSender: string;
  time: string;
  unreadCount: number;
  isGroup: boolean;
  isImportant?: boolean;
  statusColor?: string; // 'red' | 'primary' | 'transparent'
  isOnline?: boolean;
}

export interface GardenNotification {
  id: string;
  type: 'irrigation' | 'alert' | 'ai' | 'milestone';
  title: string;
  desc: string;
  time: string;
  isNew: boolean;
}

export type AreaState = 'active' | 'warning' | 'critical' | 'harvest';

export interface Area {
  id: string;
  name: string;
  typeIcon: string;
  crop: string;
  size: string;
  count: string;
  health: string;
  healthColor: 'green' | 'yellow' | 'red';
  state: AreaState;
  img: string;
  growthStage: string;
  daysToHarvest: number;
  totalCycleDays: number;
  sensors: {
    temp?: string;
    hum?: string;
    ph?: string;
    soil?: string;
    sun?: string;
  };
  mapPos?: { x: number; y: number };
}
