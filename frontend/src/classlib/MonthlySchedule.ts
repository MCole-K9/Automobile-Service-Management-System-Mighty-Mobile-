export type MonthBlock = {
    month: number
    workingDays: DayBlock[]
}


export class HourDataBlock {
    time: number;
    description: string;
    duration: number;
    id: number | null;
    client: string;
    blocktype: "APPOINTMENT" | "JOBSTAGE" | null;

    constructor(){
        this.time = 0;
        this.description = "";
        this.duration = 1;
        this.id = null;
        this.client = "";
        this.blocktype = null;
    }
    
}

export type DayBlock = {
    day: number
    hourBlocks: HourDataBlock[]
}