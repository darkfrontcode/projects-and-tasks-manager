import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';
import { IOC } from './ioc';

import { ApplicationResponse, ENVIRONMENT, EVENT, inversify } from './configs';

/* ==========================================================================
	-- Configs
========================================================================== */

const container = IOC.configureContainer();
const server = new InversifyExpressServer(container);

server.setConfig(inversify.config.server);
server.setErrorConfig(inversify.config.error);

/* ==========================================================================
	-- Server
========================================================================== */

const app = server.build();

app
  .listen(ENVIRONMENT.PORT, ApplicationResponse.success)
  .on(EVENT.ERROR, ApplicationResponse.error);
