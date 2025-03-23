import { SetMetadata } from "@nestjs/common";
import { UserType } from "src/user/dto/types";
export let TYPE = "type"

export const Roles = (roles:UserType[]) => SetMetadata(TYPE, roles)
