import {Prisma} from "@prisma/client";

const jobInformation = Prisma.validator<Prisma.JobArgs>()({
    include: {
        stages: true,
        vehicle: {
            include: {
                owner: true
            }
        }

    }
});

// it's not "all" of the job information, but pretty much everythign i need
export type FullJobInformation = Prisma.JobGetPayload<typeof jobInformation>;

const jobStageInformation = Prisma.validator<Prisma.JobStageArgs>()({
    include: {
        scheduledItem: true
    }
});

export type JobStageWithSchedule = Prisma.JobStageGetPayload<typeof jobStageInformation>;