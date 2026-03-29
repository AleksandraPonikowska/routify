"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Routine } from '../types/routine';
import { useRoutines } from '../context/RoutineContext';

interface Props {
    routine: Routine;
}


export default function ActiveRoutineView({ routine }: Props) {
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentTask = routine.content[currentIndex];


    return (
        <div className = "flex flex-col justify-between items-center h-full text-white overflow-hidden">
            <div>
                pasek postępu
            </div>
            <div className = "flex flex-col flex-1 justify-center items-center">
                <div>
                    05:00
                </div>
                <div>
                    {currentTask?.name}
                </div>
            </div>
            
            
        </div>
    );
}