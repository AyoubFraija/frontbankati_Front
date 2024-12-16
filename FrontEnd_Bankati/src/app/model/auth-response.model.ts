import { Client } from './client.model';
import { Agent } from './agent.model';

export interface AuthResponseWithRedirect {
  redirectUrl: string;
}

export type AuthResponse = (Client & AuthResponseWithRedirect) | (Agent & AuthResponseWithRedirect);
