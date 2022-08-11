import { defineStore } from "pinia";
import type { Role } from "@/classlib/Types";
import { UserRole } from "@/classlib/Types";


export const rolesStore = defineStore("roles", {
    state: ()=> ({
        roles: <Role[]>([]),
        userRoles: {
            Customer : false,
            Mechanic: false ,
            Manager: false,
            Admin:  false 
        }
    }),
    actions: {
        setUserRoles(){
            this.roles.forEach(role => {
                switch (role.id) {
                    case UserRole.Customer:
                        this.userRoles.Customer = true
                        break;
                    case UserRole.Mechanic:
                        this.userRoles.Mechanic = true
                        break;
                    case UserRole.Manager:
                        this.userRoles.Manager = true
                        break;
                    case UserRole.ADMIN:
                        this.userRoles.Admin = true
                        break;
                
                    default:
                        break;
                }
            });
        },
        stripRoleName(){
            //Needed for when sending to the backend for prisma ro process
            //It requires only for reference

            this.roles.forEach((role)=>{
                role.role = undefined;
            })
        }
    },
    
    


})