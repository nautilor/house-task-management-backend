export interface CompletionParams {
  id: string;
}

export const CompletionParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
