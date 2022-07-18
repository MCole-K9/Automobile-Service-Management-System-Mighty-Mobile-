/*
  Warnings:

  - You are about to drop the column `fullfilled` on the `Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `appoinmentId` on the `Appointment_Image` table. All the data in the column will be lost.
  - You are about to alter the column `totalCost` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `serviceFee` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `price` on the `JobPart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `date` on the `JobStage` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `vehicleId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentId` to the `Appointment_Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `fullfilled`,
    ADD COLUMN `fulfilled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `vehicleId` INTEGER NOT NULL,
    MODIFY `date` DATETIME NOT NULL,
    MODIFY `assignedMechId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Appointment_Image` DROP COLUMN `appoinmentId`,
    ADD COLUMN `appointmentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `totalCost` DECIMAL NULL,
    MODIFY `serviceFee` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `JobPart` MODIFY `price` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `JobStage` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` MODIFY `image` VARCHAR(255) NULL;
