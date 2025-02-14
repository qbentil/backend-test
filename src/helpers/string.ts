"use strict";

import { Model, Types, model } from "mongoose";

import _ from "lodash";

export function __setDescription(_description: string): string {
  return _.chain(_description)
    .split(". ")
    .map(_.trim)
    .map(_.toLower)
    .map(_.capitalize)
    .join(". ")
    .value();
}

export function __setName(_name: string): string {
  return _.chain(_name).toLower().startCase().value();
}

export function __setMail(_mail: string): string {
  return _.chain(_mail).toLower().value();
}

export function __setPermission(_permission: string): string {
  return _.chain(_permission).snakeCase().toUpper().value();
}

export function __setPhone(_phone: String): string {
  return _.chain(_phone).slice(-9).join("").padStart(12, "233").value();
}

export function __genCode(_length: number = 6): string {
  return _.chain("9")
    .repeat(_length)
    .parseInt()
    .random()
    .padStart(_length, "0")
    .value();
}

export async function __genUniqueCode(
  _model: string,
  _length: number = 6,
): Promise<string> {
  const __Model = model(_model);
  let code: string;

  while (true) {
    // Generate a new code
    code = __genCode(_length);

    // Check if the code is unique
    const existingDoc = await __Model.findOne({ claimCode: code });
    if (!existingDoc) break; // Code is unique, exit the loop
  }

  return code;
}

export const gql = (value: TemplateStringsArray) => value.toString();

export function castStringToObjectId(str: string): Types.ObjectId | null {
  if (Types.ObjectId.isValid(str)) {
    // Convert the valid string to an ObjectId
    return new Types.ObjectId(str);
  }
  // Return null if the string is not a valid ObjectId
  return null;
}
