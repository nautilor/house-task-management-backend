export interface CustomElementParams {
  name: string;
  color: string;
  type: string;
  action: string;
}
export const CustomElementParamSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    color: { type: "string" },
    type: { type: "string" },
    action: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
