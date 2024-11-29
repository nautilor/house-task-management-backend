export interface CategoryParams {
  id: string;
  name: string;
}

export const CategoryParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
