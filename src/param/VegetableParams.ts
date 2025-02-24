export interface VegetableParams {
	name: string;
}
export const VegetableParamSchema = {
	type: "object",
properties: {
		name: { type: "string" },
	},
	required: [],
	additionalProperties: false,
};
