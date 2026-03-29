"use client";

import React, {createContext, useReducer, useContext } from "react";
import {Routine} from "@/app/types/routine";

type Action = 
    | {type: "ADD_ROUTINE"; routine: Routine}
    | {type: "DELETE_ROUTINE"; id: string}
    | {type: "SET_ACTIVE_ROUTINE", id: string | null}

interface State {
    routines: Routine[];
    activeRoutineId: string | null;
}

const RoutineContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function routineReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ROUTINE":
        return {
            ...state,
            routines: [...state.routines, action.routine]
        }
    case 'DELETE_ROUTINE':
        return {
            ...state,
            routines: state.routines.filter(r => r.id != action.id)
        };
    case "SET_ACTIVE_ROUTINE":
        return {
            ...state,
            activeRoutineId: action.id
        };
    default:
      return state;
  }
}

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(routineReducer, {
        routines: [],
        activeRoutineId: null
    });
    return (
        <RoutineContext.Provider value={{ state, dispatch }}>
            {children}
        </RoutineContext.Provider>
    );
};

export const useRoutines = () => {
  const context = useContext(RoutineContext);
  if (!context) throw new Error('useRoutines must be used within RoutineProvider');
  return context;
};