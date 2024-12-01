export interface RewardParams {
  id: string;
  name: string;
  points: number;
}

export const RewardParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    points: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
