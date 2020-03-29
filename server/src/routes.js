/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
router.post('/organizations', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.number().required().min(11).max(11),
        city: Joi.string().required(),
        state: Joi.string().required().length(2)
    })
}), OrganizationController.create);

router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.list);

router.post('/incidents', IncidentController.create);

router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list);

module.exports = router;
