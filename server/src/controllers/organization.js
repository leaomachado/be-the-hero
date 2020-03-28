/**
 * Copyright (c) 2020 Herberth Leão
 *
 * This file is part of Be The Hero package.
 *
 * Distributed under the Azllan Public Software License, Version 1.0. (See
 * accompanying file LICENSE.md or copy at http://azllan.io/licenses/apsl).
 */

const crypto = require('crypto');
const persist = require('../persistence');

/**
 * Controller for organization requests.
 */
module.exports = {

    /**
     * Get all organization records.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string All organization info.
     */
    async list(request, response) {
        // Fetch all organizations from database.
        const organizations = await persist('organizations').select('*');

        return response.json(organizations);
    },

    /**
     * Creates a new organization.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string The new organization ID.
     */
    async create(request, response) {
        // Get data from request.
        const {name, email, phone, city, state} = request.body;

        // Generate an ID for the new organization.
        const id = crypto.randomBytes(4).toString('HEX');

        // Insert the new organization record into the database.
        await persist('organizations').insert({
            id,
            name,
            email,
            phone,
            city,
            state
        });
    
        return response.json({ id });
    }
}
