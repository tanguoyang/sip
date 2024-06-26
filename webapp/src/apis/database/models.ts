export interface Device {
  id: string; // Device ID == Document ID
  name: string;
  description: string;
  lastCalled: number | null;
}

export interface DeviceDb {
  name: string;
  description: string;
  lastCalled: number | null;
}

export interface LogDb {
  deviceId: string;
  timestamp: number;
  message: string;
  status: string;
}

export interface Log {
  id: string; // Log ID == Document ID
  deviceId: string;
  createdAt: number;
  message: string;
  status: string;
}

export interface ApiKeyDb {
  key: string;
  deviceIds: string[];
  name: string;
}

export interface ApiKey {
  id: string; // API Key ID == Document ID
  key: string;
  name: string;
  deviceIds: string[];
}
