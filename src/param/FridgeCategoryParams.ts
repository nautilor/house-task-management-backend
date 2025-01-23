export interface FridgeCategoryParams {
	name: string;
	color: string;
}
export const FridgeCategoryParamSchema = {
	type: "object",
properties: {
		name: { type: "string" },
		color: { type: "string" },
	},
	required: [],
	additionalProperties: false,
};
