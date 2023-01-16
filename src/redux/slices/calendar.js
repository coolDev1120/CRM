import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
// utils
import axios from '../../utils/axios';
import { email } from 'src/utils/mock-data/email';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
      console.log(action.payload)
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = map(state.events, (_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = filter(state.events, (user) => user.id !== eventId);
      state.isLoading = false;
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/calendar/events');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: response.data.event, email: jwt_decode(localStorage.getItem('token')).email })
      };

      var results = [];
      await fetch(`${process.env.REACT_APP_SERVER_URL}/getevent`, requestOptions)
        .then(response => response.json())
        .then(data => {
          results = data;
        });
      console.log(results.data)
      dispatch(slice.actions.getEventsSuccess(results.data));

    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(response.data.event));

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: response.data.event, email: jwt_decode(localStorage.getItem('token')).email })
      };

      fetch(`${process.env.REACT_APP_SERVER_URL}/addevent`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(eventId, updateEvent) {
  console.log(eventId, updateEvent)

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId, data: response.data.event, email: jwt_decode(localStorage.getItem('token')).email })
      };
      console.log(response.data.event)
      fetch(`${process.env.REACT_APP_SERVER_URL}/editevent`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId, email: jwt_decode(localStorage.getItem('token')).email })
      };

      fetch(`${process.env.REACT_APP_SERVER_URL}/deleteevent`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start, end) {
  return async (dispatch) => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}