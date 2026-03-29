"use client"

import React, { useEffect } from 'react';
import { useRoutines } from './context/RoutineContext';
import { Routine } from './types/routine';
import RoutineCard from './components/Card';
import { motion, AnimatePresence } from "framer-motion";
import RoutineView from './components/RoutineView';


export default function Home(){

    const {state, dispatch} = useRoutines();
    const activeRoutine = state.routines.find(r => r.id === state.activeRoutineId);

    useEffect(() =>{

        if (state.routines.length == 0) {
            const demoRoutines: Routine[] = [{
                id: "1",
                name: "Routine 0",
                img: "https://i.pinimg.com/736x/b7/34/0f/b7340ffe7e0e2f31cd02982529af90ae.jpg",
                content: [
                    { id: "t1", name: "Make your bed1", time: 5 },
                    { id: "t2", name: "Make your bed2", time: 5 },
                    { id: "t3", name: "Make your bed3", time: 5 },

                ]
            },
            {
                id: "2",
                name: "Routine 1",
                img: "https://i.pinimg.com/736x/e9/33/68/e9336804d1dd06ff50936a3cd55606dc.jpg",
                content: [
                    { id: "t1", name: "Make your bed", time: 30 },
                ]
            },
            {
                id: "3",
                name: "Routine 2",
                img: "https://i.pinimg.com/736x/9c/81/d4/9c81d45bd99cde6be1cc1c87235fbb92.jpg",
                content: [
                    { id: "t1", name: "Make your bed", time: 30 },
                ]
            }
        
            ]

            demoRoutines.forEach(r => dispatch({type: "ADD_ROUTINE", routine: r}))
        }

        

    });



    return (
        <div className = "flex flex-col min-h-screen">
            <div className = "h-16 flex text-center items-center">
                pasek szukania :3
            </div>
            <div className = "flex flex-1 p-2 gap-2">
                <div className = "bg-stone-900 rounded-md w-100 p-8">
                    boczny
                </div>
                <div className = "flex-1 bg-stone-900 rounded-md p-10">
                    
                    <AnimatePresence mode="wait">
                        {activeRoutine ? (
                            <motion.div
                                key="active"
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0}}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 p-10 bg-stone-900"
                            >
                            <RoutineView routine={activeRoutine} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                            <>
                                <h1 className = "text-2xl font-bold text-white">Routines</h1>
                                <div className = "flex gap-4">
                                    {state.routines.map((r) => (
                                        <RoutineCard key={r.id} routine={r} />
                                    ))}
                                </div>
                            </>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}