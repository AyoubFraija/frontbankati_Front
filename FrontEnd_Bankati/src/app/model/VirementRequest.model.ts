import { Virement } from "./Virement.model";

export class VirementRequest {
    virement: Virement;
    sms: string;  // Assuming this is a string (e.g., a code or a message)

    constructor(virement: Virement, sms: string) {
        this.virement = virement;
        this.sms = sms;
    }
}
