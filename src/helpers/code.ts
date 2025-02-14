"use strict";

import { codes as __templates } from "../templates";
import dayjs from "dayjs";
import lodash from "lodash";
import { model } from "mongoose";

export function __incrementCode(_code: string): string {
  let __code = lodash.times(_code.length, function (i) {
    return _code.toUpperCase().charCodeAt(i);
  });
  for (let i = __code.length - 1; i >= 0; i--) {
    let code = __code[i];
    if (code < 48 || (code > 57 && code < 65) || code > 90) {
      continue;
    } else if (code + 1 === 58) {
      __code[i] = 48;
    } else if (code + 1 === 91) {
      __code[i] = 65;
    } else {
      __code[i] += 1;
      break;
    }
  }
  return String.fromCharCode(...__code);
}

export async function __generateCode(
  _model: keyof typeof __templates,
  _filter: object = {},
  _data: object = {},
  _field: string = "code",
): Promise<string> {
  return new Promise(async function (resolve, reject) {
    await model(_model)
      .findOne({ ..._filter })
      .sort({ [_field]: -1 })
      .then(function (_doc) {
        const _code: string = _doc
          ? __incrementCode(_doc[_field])
          : __templates[_model](_data);
        resolve(_code);
      })
      .catch(reject);
  });
}

export const __otpExpired = (expiresAt: Date): boolean => {
  const now = dayjs();

  // Check if the current date and time is after the expiresAt date
  return now.isAfter(dayjs(expiresAt));
};
