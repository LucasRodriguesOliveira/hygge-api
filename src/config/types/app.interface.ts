import { EnvMode } from './mode.enum';
import { UserConfig } from './user.config';

export interface AppConfig {
  port: number;
  mode: EnvMode;
  user: UserConfig;
}
