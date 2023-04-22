import * as chalk from 'chalk';
import { ENVIRONMENT } from '../enums';

/* ==========================================================================
	-- Configs
========================================================================== */

const POSITIVE = chalk.green;
const NEGATIVE = chalk.red;

/* ==========================================================================
	-- Interfaces
========================================================================== */

export interface IApplicationResponseOutput {
  success: () => void;
  error: (error: Error) => void;
}

/* ==========================================================================
	-- Cases
========================================================================== */

const success = () => {
  const environment = process.env.NODE_ENV || ENVIRONMENT.PRODUCTION;
  const message = `ts-node listening on port ${ENVIRONMENT.PORT} in ${environment} mode`;

  console.log(POSITIVE(message));
};

const error = (error: Error) => {
  const ERROR_MESSAGE = `Bad things happen to good people ={ - ${error.message}`;
  console.log(NEGATIVE(ERROR_MESSAGE, error.message));
};

/* ==========================================================================
	-- Exports
========================================================================== */

export const ApplicationResponse: IApplicationResponseOutput = {
  success,
  error,
};
