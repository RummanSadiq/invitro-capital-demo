"use client";

import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren, useContext, useReducer
} from "react";
import { Appointment } from "@/types/appointment";
import {AppointmentAction} from "@/context/action";

type AppointmentState = {
  appointments: Appointment[];
}

type Action = {type: AppointmentAction.SetAppointments, payload: Appointment[]};

const defaultState: AppointmentState = {
  appointments: [],
};

export const AppointmentsContext = createContext<{state: AppointmentState, dispatch: Dispatch<Action>}>({state:defaultState, dispatch: ()=> {}})

const AppointmentReducer = (state: AppointmentState, action: Action): AppointmentState => {
  switch (action.type) {
    case AppointmentAction.SetAppointments:
      return { ...state, appointments: action.payload };
    default:
      return state;
  }
}

export const AppointmentsProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(AppointmentReducer, defaultState);
  return (
    <AppointmentsContext.Provider value={{state, dispatch}}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export const useAppointmentContext = () => {
  const safeContext = useContext(AppointmentsContext);
  if (!safeContext) {
    throw new Error(
        "useAppointmentContext must be used within a AppointmentProvider",
    );
  }

  return safeContext;
}