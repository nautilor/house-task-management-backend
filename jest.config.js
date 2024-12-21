/** @type {import('ts-jest').JestConfigWithTsJest} **/
import "reflect-metadata";
import { pathsToModuleNameMapper } from "ts-jest";

const paths = {
  "@/*": ["src/*"],
  "@model/*": ["src/model/*"],
  "@controller/*": ["src/controller/*"],
  "@repository/*": ["src/repository/*"],
  "@middleware/*": ["src/middleware/*"],
  "@config/*": ["src/config/*"],
  "@param/*": ["src/param/*"],
  "@exception/*": ["src/exception/*"],
};

export const preset = "ts-jest";
export const testEnvironment = "node";
export const moduleNameMapper = pathsToModuleNameMapper(paths, {
  prefix: "<rootDir>",
});
//export const globalSetup = "<rootDir>/jest.setup.ts";

