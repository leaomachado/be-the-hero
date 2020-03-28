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
 * Controller for a specific organziation.
 */
module.exports = {

    /**
     * Get all incidents by organization.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string Requested incident records.
     */
    async list(request, response) {
        // Get organization ID from request.
        const organization = request.headers.authorization;

        // Fetch speific incidents from database.
        const incidents = await persist('incidents')
            .where('organization', organization)
            .select('*');

        return response.json(incidents);
    }
}
