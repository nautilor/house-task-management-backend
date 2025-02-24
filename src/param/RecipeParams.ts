export interface RecipeParams {
	name: string;
	description: string;
	extra: boolean;
}
export const RecipeParamSchema = {
	type: "object",
properties: {
		name: { type: "string" },
		description: { type: "string" },
		extra: { type: "boolean" },
	},
	required: [],
	additionalProperties: false,
};
