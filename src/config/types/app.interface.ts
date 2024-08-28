import { EnvMode } from './mode.enum';

export interface AppConfig {
  port: number;
  mode: EnvMode;
}
