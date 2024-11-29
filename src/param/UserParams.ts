export interface UserParams {
  id: string;
  name: string;
}

export const UserParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
