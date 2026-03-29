"use client";

import React from 'react';
import { Routine } from "../types/routine";
import { useRoutines } from "../context/RoutineContext";
import Image from 'next/image';

interface RoutineCardProps {
    routine: Routine;
}

export default function RoutineCard({ routine }: RoutineCardProps){
    
    const {dispatch} = useRoutines();

    return (
        <div className = "group py-2 my-2 -mx-2 px-2 flex flex-col gap-4 rounded-md transition-all w-fit duration-300 hover:bg-stone-800">
            <div className = "relative w-50 h-50 bg-amber-600 rounded-3xl">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src = {routine.img || "placeholder"}
                    alt = ""
                    className = "rounded-xl"
                />

                {/*ikonka play przepiękna*/}
                <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out shadow-2xl">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({type: "SET_ACTIVE_ROUTINE", id: routine.id})
                        }}
                        className="bg-stone-300 p-3.5 rounded-full text-black hover:scale-110 active:scale-95 transition-all shadow-xl"
                        aria-label="Play routine"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 6v12l10-6z" />
                        </svg>

                    </button>
                </div>
                
            </div>
            <div className = "flex flex-col">
                <span className = "text-md font-bold">{routine.name}</span>
                <span className = "text-md text-stone-400">5 min</span>

            </div>
            

        </div>
        
    )
}