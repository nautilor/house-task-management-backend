import datasource from "@config/init";
import Vegetable from "@model/Vegetable";

export const VegetableRepository = datasource.getRepository(Vegetable);
