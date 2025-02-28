import { FindOperator } from "typeorm";

export interface VegetableParams {
  name?: string;
  recipeName?: string;
}

export interface VegetableQueryParams {
  name?: FindOperator<string>;
  recipes?: {
    name?: FindOperator<string>;
  };
}

export const VegetableParamSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    recipeName: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
