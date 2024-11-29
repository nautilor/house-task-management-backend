export interface TaskParams {
  categoryId?: string;
  id: string;
  name: string;
  points: number;
}

export const TaskParamSchema = {
  type: "object",
  properties: {
    categoryId: { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    points: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
