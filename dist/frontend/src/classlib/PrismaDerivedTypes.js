"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jobInformation = client_1.Prisma.validator()({
    include: {
        stages: {
            include: {
                scheduledItem: true
            }
        },
        vehicle: {
            include: {
                owner: true
            }
        },
        requiredParts: true
    }
});
const jobStageInformation = client_1.Prisma.validator()({
    include: {
        scheduledItem: true
    }
});
