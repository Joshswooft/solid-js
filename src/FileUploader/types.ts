export type Status = "Completed" | "Pending" | "Error"

export interface FileProgress {
    file:  File;
    progress: number;
    startTime: string;
    endTime: string;
    status: Status;
}

export interface FileStatusProps {
    status: Status;
}