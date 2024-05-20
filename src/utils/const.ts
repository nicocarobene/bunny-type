export interface initialState {
  correctLetter: {
    [key: number]: number
  };
  incorrectLetter: {
    [key: number]: number
  };
  total: number;
  time: number;
  gameOver: boolean;
}
export const INITIAL_STATE: initialState = {
  correctLetter: {},
  incorrectLetter: {},
  total: 0,
  time: 0,
  gameOver: false
}

