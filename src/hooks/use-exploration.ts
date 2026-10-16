import { createContext, useContext } from "react";

export interface Exploration { step: number; discover: (clue: number) => void }
export const ExplorationContext = createContext<Exploration>({ step: 0, discover: () => {} });
export const useExploration = () => useContext(ExplorationContext);
