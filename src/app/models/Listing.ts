import { AgentInfo } from "./AgentInfo";
import { Record } from "./Record";


export class Listing {
    agentInfo?: AgentInfo;
    records?: Record[];
    showContactInfo?: boolean;
    role?: string;
    title?: string;
    body?: string;
}