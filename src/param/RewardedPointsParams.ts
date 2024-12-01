export interface RewardedPointsParams {
  id: string;
}

export const RewardedPointsParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
