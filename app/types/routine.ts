export interface Routine {
    id: string;
    name: string;
    img?: string;
    content: Task[];
}

export interface Task {
    id: string;
    name: string;
    time: number;
}