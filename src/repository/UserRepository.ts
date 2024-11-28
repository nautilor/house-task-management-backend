import datasource from "@/config/init";
import User from "@/model/User";

export const UserRepository = datasource.getRepository(User);
