/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const persist = require('../persistence');

/**
 * Controller for login.
 */
module.exports = {

    /**
     * Creates a new session for organization login.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     *
     * @return string The logged organization ID. Otherwise error message.
     */
    async create(request, response) {
        // Gets the organization ID.
        const {id} = request.body;

        // Checks if the organization exists.
        const organization = await persist('organizations')
            .where('id', id)
            .select('name')
            .first();
        
        if (!organization) {
            return response.status(400).json({ error: 'Organization not found.' });
        }

        return response.json(organization);
    }
}
