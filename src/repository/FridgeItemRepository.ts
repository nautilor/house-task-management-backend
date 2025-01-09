import datasource from "@config/init";
import FridgeItem from "@model/FridgeItem";

export const FridgeItemRepository = datasource.getRepository(FridgeItem);
