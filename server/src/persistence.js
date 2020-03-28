/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const knex = require('knex');
const config = require('../knexfile');

// Connects to the database.
const stream = knex(config.development);

module.exports = stream;
