import {Prisma} from "@prisma/client";

const JobInformation = Prisma.validator<Prisma.JobArgs>()({
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
export type FullJobInformation = Prisma.JobGetPayload<typeof JobInformation>;