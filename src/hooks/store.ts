import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@src/store';
import { ThunkDispatch } from '@reduxjs/toolkit';

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
