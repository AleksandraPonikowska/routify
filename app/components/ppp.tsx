// placeholder

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Routine } from '../types/routine';
import { useRoutines } from '../context/RoutineContext';

interface Props {
  routine: Routine;
}

export default function ActiveRoutineView({ routine }: Props) {
  const { dispatch } = useRoutines();
  
  // 1. Stan aktualnego indeksu zadania
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = routine.content[currentIndex];
  
  // 2. Stan licznika i aktywności
  const [seconds, setSeconds] = useState(currentTask?.time || 0);
  const [isActive, setIsActive] = useState(false);

  // 3. Resetuj licznik, gdy zmienia się zadanie (indeks)
  useEffect(() => {
    if (currentTask) {
      setSeconds(currentTask.time);
      setIsActive(false); // Pauza przy nowym zadaniu, żeby użytkownik mógł "odetchnąć"
    }
  }, [currentIndex, routine]);

  // 4. Logika odliczania (Timer)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      // Automatyczne przejście dalej, gdy czas minie
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // 5. Funkcja obsługująca przejście do następnego kroku
  const handleComplete = () => {
    if (currentIndex < routine.content.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("BRAWO! Cała rutyna ukończona! ✨");
      dispatch({ type: 'SET_ACTIVE_ROUTINE', id: null });
    }
  };

  // Formatowanie czasu MM:SS
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Obliczanie postępu (%)
  const progress = ((currentIndex + 1) / routine.content.length) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-[500px] text-white overflow-hidden">
      
      {/* Pasek postępu na samej górze */}
      <div className="absolute top-0 left-0 w-full h-2 bg-stone-800">
        <div 
          className="h-full bg-green-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Przycisk wyjścia */}
      <button 
        onClick={() => dispatch({ type: 'SET_ACTIVE_ROUTINE', id: null })}
        className="absolute top-8 left-0 text-stone-500 hover:text-white transition-colors flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Wyjdź z rutyny
      </button>

      {/* Nagłówek Zadania */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="text-green-500 font-mono text-xs tracking-[0.4em] uppercase mb-3 block opacity-80">
          Krok {currentIndex + 1} z {routine.content.length}
        </span>
        <h1 className="text-6xl font-black tracking-tighter">
          {currentTask?.name || "Koniec zadań"}
        </h1>
      </div>

      {/* Wielki Licznik z Interakcją */}
      <div 
        className="relative group cursor-pointer select-none mb-12"
        onClick={() => setIsActive(!isActive)}
      >
        <div className={`text-[12rem] font-mono font-bold leading-none transition-all duration-500 ${isActive ? 'text-white' : 'text-stone-700'}`}>
          {formatTime(seconds)}
        </div>
        {/* Poświata przy aktywnym odliczaniu */}
        <div className={`absolute inset-0 bg-green-500/10 blur-[120px] rounded-full -z-10 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Panel Sterowania */}
      <div className="flex items-center gap-8">
        {/* Play / Pause */}
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isActive ? 'bg-stone-100 text-black' : 'bg-white text-black scale-110 shadow-lg shadow-white/10'
          }`}
        >
          {isActive ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Przycisk Następny/Complete */}
        <button 
          onClick={handleComplete}
          className="bg-green-500 hover:bg-green-400 text-black px-12 py-5 rounded-full font-black text-2xl transition-all active:scale-95 shadow-lg shadow-green-500/20"
        >
          DONE / NEXT
        </button>
      </div>

      {/* Co dalej? */}
      {routine.content[currentIndex + 1] && (
        <div className="mt-16 text-stone-500 animate-pulse">
          <span className="text-xs uppercase tracking-widest mr-2 opacity-50">Następnie:</span>
          <span className="text-stone-300 font-medium">{routine.content[currentIndex + 1].name}</span>
        </div>
      )}

    </div>
  );
}