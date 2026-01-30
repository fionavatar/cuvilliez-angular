export interface Sample {
    url: string;
    name: string;
  }
  
  export interface Preset {
    name: string;
    type?: string;
    isFactoryPresets?: boolean;
    samples: Sample[];
  }
  