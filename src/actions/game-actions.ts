export enum ActionTypes {
  DRAW_NUMBER = "DRAW_NUMBER",
  SET_CURRENT_NUMBER = "SET_CURRENT_NUMBER",
  START_DRAWING = "START_DRAWING",
  PAUSE_DRAWING = "PAUSE_DRAWING",
  RESTART_DRAWING = "RESTART_DRAWING",
  INCREMENT_TIMER = "INCREMENT_TIMER",
}

interface DrawNumberAction {
  type: ActionTypes.DRAW_NUMBER;
}

interface SetCurrentNumberAction {
  type: ActionTypes.SET_CURRENT_NUMBER;
  payload: number;
}

interface StartDrawingAction {
  type: ActionTypes.START_DRAWING;
}

interface PauseDrawingAction {
  type: ActionTypes.PAUSE_DRAWING;
}

interface RestartDrawingAction {
  type: ActionTypes.RESTART_DRAWING;
}

interface IncrementTimerAction {
  type: ActionTypes.INCREMENT_TIMER;
}

export type GameAction =
  | DrawNumberAction
  | SetCurrentNumberAction
  | StartDrawingAction
  | PauseDrawingAction
  | RestartDrawingAction
  | IncrementTimerAction;

export const drawNumberAction = (): DrawNumberAction => ({
  type: ActionTypes.DRAW_NUMBER,
});

export const setCurrentNumberAction = (
  num: number
): SetCurrentNumberAction => ({
  type: ActionTypes.SET_CURRENT_NUMBER,
  payload: num,
});

export const startDrawingAction = (): StartDrawingAction => ({
  type: ActionTypes.START_DRAWING,
});

export const pauseDrawingAction = (): PauseDrawingAction => ({
  type: ActionTypes.PAUSE_DRAWING,
});

export const restartDrawingAction = (): RestartDrawingAction => ({
  type: ActionTypes.RESTART_DRAWING,
});

export const incrementTimerAction = (): IncrementTimerAction => ({
  type: ActionTypes.INCREMENT_TIMER,
});
