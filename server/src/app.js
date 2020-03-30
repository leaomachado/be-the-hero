/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const cors = require('cors');
const express = require('express');
const router = require('./routes');
const { errors } = require('celebrate');

/**
 * Sets middlewares and initializes server.
 */ 
const app = express();

// Module for API protection.
app.use(cors());
// Sets responses to JSON format.
app.use(express.json());
// Appends the routes.
app.use(router);
// Error handle for validators.
app.use(errors());

module.exports = app;
