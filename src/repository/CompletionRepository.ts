import datasource from "@/config/init";
import Completion from "@/model/Completion";

export const CompletionRepository = datasource.getRepository(Completion);
