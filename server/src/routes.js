/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const express = require('express');

const OrganizationController = require('./controllers/organization');
const IncidentController = require('./controllers/incident');
const ProfileController = require('./controllers/profile');
const SessionController = require('./controllers/session');

/**
 * Defines all routes of the application.
 */

const router = express.Router();

router.post('/sessions', SessionController.create);

router.get('/organizations', OrganizationController.list);
router.post('/organizations', OrganizationController.create);

router.get('/incidents', IncidentController.list);
router.post('/incidents', IncidentController.create);
router.delete('/incidents/:id', IncidentController.delete);

router.get('/profile', ProfileController.list);

module.exports = router;
