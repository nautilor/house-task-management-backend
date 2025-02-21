import datasource from "@config/init";
import CustomElement from "@model/CustomElement";

export const CustomElementRepository = datasource.getRepository(CustomElement);
