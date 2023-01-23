export interface Visit {
    id: number;
    senderId: number;
    senderPesel: string;
    doctorId: number;
    doctorPesel: string;
    dateVisit: Date;
    timeVisit: Date;
    form: string;
    comments: string;
    dateRead?: Date;
}