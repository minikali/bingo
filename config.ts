import { envSchema } from "env-schema";
import type { FromSchema } from "json-schema-to-ts";

const schema = {
  type: "object",
  properties: {
    BINGO_RANGE_MIN: { type: "number" },
    BINGO_RANGE_MAX: { type: "number" },
    DEFAULT_TIMER: { type: "number" },
  },
  additionalProperties: false,
  required: ["BINGO_RANGE_MIN", "BINGO_RANGE_MAX", "DEFAULT_TIMER"],
} as const;

const env = envSchema<FromSchema<typeof schema>>({ dotenv: true, schema });

const config = {
  range: {
    min: env.BINGO_RANGE_MIN,
    max: env.BINGO_RANGE_MAX,
  },
  defaultTimer: env.DEFAULT_TIMER,
};

export type Config = typeof config;

export default config;
