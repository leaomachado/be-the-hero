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
 * Controller for incident requests.
 */
module.exports = {

    /**
     * Get all incidents with offset of 5.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string All incidents.
     */
    async list(request, response) {
        // Get current page from request.
        const {page = 1} = request.query;

        // Get total of incident records.
        const [count] = await persist('incidents').count();

        // Fetch incident records from database with respective organization
        // information.
        const incidents = await persist('incidents')
            .join(
                'organizations', 
                'organizations.id', 
                '=', 
                'incidents.organization'
            )
            .limit(5)
            .offset((page - 1) * 5)
            .select(
                'incidents.*',
                'organizations.name',
                'organizations.email',
                'organizations.phone',
                'organizations.city',
                'organizations.state'
            );

        // Set the total number of records in the response header.
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    /**
     * Creates a new incident record.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string The new incident ID.
     */
    async create(request, response) {
        // Get the data from request.
        const {title, description, value} = request.body;
        const organization = request.headers.authorization;

        // Insert data into the database and get new ID.
        const [id] = await persist('incidents').insert({
            title,
            description,
            value,
            organization
        });

        return response.json({ id });
    },

    /**
     * Delete a incident record by ID.
     * 
     * @param {*} request   The request object provided by Express.
     * @param {*} response  The response object provided by Express.
     * 
     * @return string No content on success. Otherwise error message.
     */
    async delete(request, response) {
        // Get data from request.
        const {id} = request.params;
        const organization = request.headers.authorization;

        // Fetch incident record the be deleted.
        const incident = await persist('incidents')
            .where('id', id)
            .select('organization')
            .first();

        // Check if it belongs to the current organization.
        if (incident.organization != organization) {
            return response.status(401).json(
                { error: 'Operation unauthorized.' }
            );
        }

        // Deletes from database.
        await persist('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}
