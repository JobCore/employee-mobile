import {Dispatcher} from 'flux';
import utils from "./Util";
import React from 'react';
import Store from "./Store";

const __dispatch = new Dispatcher();

const handleDispatch = ({eventName, eventData}) => {
    utils.log("v2/index:handleDispatch");
    let atLeastDispatchOneEvent = false;
    allEvents.forEach(event => {
        if (event.name === eventName) {
            event.notify(eventData);
            atLeastDispatchOneEvent = true;
        }
    });

    if (!atLeastDispatchOneEvent)
        throw new Error(`No event: ${eventName} exists in the System`);
};

__dispatch.register(handleDispatch);

/**
 * Dispatches an event to the Dispatching system
 * @param eventName The Name of the Event
 * @param eventData The data to be passed
 */
const dispatchEvent = (eventName, eventData) => {
    utils.log("v2/index:dispatchEvent");
    utils.validateText(eventName);
    __dispatch.dispatch({eventName, eventData});
}

const allEvents = new Array();

export {allEvents, dispatchEvent, Store as FluxStore};
