// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { PongResponse, GetFeedsData, GetFeedsResponse, GetOperatorData, GetOperatorResponse, GetStopsData, GetStopsResponse, GetLinesByLocationData, GetLinesByLocationResponse, GetLinesData, GetLinesResponse, GetLineData, GetLineResponse } from './types.gen';

/**
 * Pong
 * @returns unknown Successful Response
 * @throws ApiError
 */
export const pong = (): CancelablePromise<PongResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/ping'
}); };

/**
 * Get Feeds
 * @param data The data for the request.
 * @param data.locationCode
 * @returns GTFSFeed Successful Response
 * @throws ApiError
 */
export const getFeeds = (data: GetFeedsData): CancelablePromise<GetFeedsResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}',
    path: {
        location_code: data.locationCode
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Operator
 * @param data The data for the request.
 * @param data.locationCode
 * @param data.operatorId
 * @returns Operator Successful Response
 * @throws ApiError
 */
export const getOperator = (data: GetOperatorData): CancelablePromise<GetOperatorResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}/{operator_id}',
    path: {
        location_code: data.locationCode,
        operator_id: data.operatorId
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Stops
 * @param data The data for the request.
 * @param data.locationCode
 * @param data.operatorId
 * @returns Stop Successful Response
 * @throws ApiError
 */
export const getStops = (data: GetStopsData): CancelablePromise<GetStopsResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}/{operator_id}/stops',
    path: {
        location_code: data.locationCode,
        operator_id: data.operatorId
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Lines By Location
 * @param data The data for the request.
 * @param data.locationCode
 * @returns Line Successful Response
 * @throws ApiError
 */
export const getLinesByLocation = (data: GetLinesByLocationData): CancelablePromise<GetLinesByLocationResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}/lines',
    path: {
        location_code: data.locationCode
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Lines
 * @param data The data for the request.
 * @param data.locationCode
 * @param data.operatorId
 * @returns Line Successful Response
 * @throws ApiError
 */
export const getLines = (data: GetLinesData): CancelablePromise<GetLinesResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}/{operator_id}/lines',
    path: {
        location_code: data.locationCode,
        operator_id: data.operatorId
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Line
 * @param data The data for the request.
 * @param data.locationCode
 * @param data.operatorId
 * @param data.routeId
 * @returns FullLine Successful Response
 * @throws ApiError
 */
export const getLine = (data: GetLineData): CancelablePromise<GetLineResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/v1/transit/{location_code}/{operator_id}/lines/{route_id}',
    path: {
        location_code: data.locationCode,
        operator_id: data.operatorId,
        route_id: data.routeId
    },
    errors: {
        422: 'Validation Error'
    }
}); };