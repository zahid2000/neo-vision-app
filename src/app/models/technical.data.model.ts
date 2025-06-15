
export interface TechnicalData {
  // Ümumi xüsusiyyətlər
  dimensions?: string;
  material?: string;
  weight?: string;
  color?: string;
  operatingTemperature?: string;
  storageTemperature?: string;
  humidity?: string;

  // Elektrik xüsusiyyətləri
  batteryType?: string;
  batteryLife?: string;
  powerConsumption?: string;
  voltage?: string;
  current?: string;

  // Ekran xüsusiyyətləri
  displayType?: string;
  displaySize?: string;
  resolution?: string;
  viewingAngle?: string;
  refreshRate?: string;

  // Kommunikasiya
  communicationProtocol?: string;
  wirelessRange?: string;
  frequency?: string;
  dataRate?: string;

  // Uyğunluq
  compatibility?: string[];

  // Əlavə xüsusiyyətlər
  features?: string[];
  certifications?: string[];
  warranty?: string;

  // Texniki spesifikasiyalar
  specifications?: string[];

  // Əlavə məlumatlar
  [key: string]: any;
}
