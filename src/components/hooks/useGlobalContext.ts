import { useContext } from 'react';
import { GlobalContext } from '../contexts/globalContexts';

export const useGlobalContext = () => useContext(GlobalContext);