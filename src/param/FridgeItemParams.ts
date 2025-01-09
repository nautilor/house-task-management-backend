export interface FridgeItemParams {
  name: string;
  index: number;
  quantity: number;
}
export const FridgeItemParamSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    index: { type: "string" },
    quantity: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
