import {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import createShuffledArray from "@/utils/create-shuffled-array";
import { useSettingsContext } from "./settings-context";
import { ActionTypes } from "@/actions/game-actions";

/* Interfaces */
interface IGameState {
  drawnNumbers: number[];
  currentNumber: number | null;
  remainingNumbers: number[];
  isDrawing: boolean;
  timer: number;
}

interface IGameContext extends IGameState {
  drawNumber: () => void;
  startDrawing: () => void;
  pauseDrawing: () => void;
  restartDrawing: () => void;
  incrementTimer: () => void;
}

interface IGameContextProvider {
  children: ReactNode;
}

/* Context */
export const GameContext = createContext<IGameContext | null>(null);

/* Hook */
export const useGameContext = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error(
      "useGameContext has to be used within <GameContext.Provider>"
    );
  }
  return game;
};

/* Reducer */
type Action =
  | { type: "DRAW_NUMBER" }
  | { type: "SET_CURRENT_NUMBER"; payload: number }
  | { type: "START_DRAWING" }
  | { type: "PAUSE_DRAWING" }
  | { type: "RESTART_DRAWING" }
  | { type: "INCREMENT_TIMER" };

const gameReducer: Reducer<IGameState, Action> = (state, action) => {
  switch (action.type) {
    case "DRAW_NUMBER": {
      const { remainingNumbers, drawnNumbers } = state;
      if (remainingNumbers.length > 0) {
        const randomNumber = remainingNumbers.pop()!;

        return {
          ...state,
          currentNumber: randomNumber,
          drawnNumbers: [...drawnNumbers, randomNumber],
          remainingNumbers: remainingNumbers,
          timer: 0,
        };
      } else {
        return {
          ...state,
          currentNumber: null,
          isDrawing: false,
        };
      }
    }
    case "SET_CURRENT_NUMBER":
      return {
        ...state,
        currentNumber: action.payload,
      };
    case "START_DRAWING":
      return {
        ...state,
        isDrawing: true,
      };
    case "PAUSE_DRAWING":
      return {
        ...state,
        isDrawing: false,
      };
    case "RESTART_DRAWING":
      return {
        drawnNumbers: [],
        currentNumber: null,
        remainingNumbers: createShuffledArray(state.remainingNumbers.length),
        isDrawing: false,
        timer: 0,
      };
    case "INCREMENT_TIMER":
      return {
        ...state,
        timer: state.timer + 1,
      };
    default:
      return state;
  }
};

/* Context Provider */
const GameContextProvider = ({ children }: IGameContextProvider) => {
  const { range } = useSettingsContext();
  const [state, dispatch] = useReducer(gameReducer, {
    drawnNumbers: [],
    currentNumber: null,
    remainingNumbers: createShuffledArray(range.max),
    isDrawing: false,
    timer: 0,
  });

  const drawNumber = useCallback(() => {
    dispatch({ type: ActionTypes.DRAW_NUMBER });
  }, [dispatch]);

  const startDrawing = useCallback(() => {
    dispatch({ type: ActionTypes.START_DRAWING });
  }, [dispatch]);

  const pauseDrawing = useCallback(() => {
    dispatch({ type: ActionTypes.PAUSE_DRAWING });
  }, [dispatch]);

  const restartDrawing = useCallback(() => {
    dispatch({ type: ActionTypes.RESTART_DRAWING });
  }, [dispatch]);

  const incrementTimer = useCallback(() => {
    dispatch({ type: ActionTypes.INCREMENT_TIMER });
  }, [dispatch]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        drawNumber,
        startDrawing,
        pauseDrawing,
        restartDrawing,
        incrementTimer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
