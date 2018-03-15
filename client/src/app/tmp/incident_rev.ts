class Revision {
    id: number;
    incident_id: number;
    date: Date;
    type: string;
    short_desc: string;
    detailed_desc: string;
    cost: number;
    class: string;
    resolution: string;
}

export class Incident_Rev {
    id: number;
    user_id: number;
    tracker_id: number;
    last_rev_id: number;
    revision: Revision[];
}