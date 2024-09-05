use crate::definition::SpinGameInitArgs;
use crate::definition::SpinGameIntermediateStates;
use crate::spin::SpinGame;
use crate::spin::SpinGameTrait;
use once_cell::sync::Lazy;
use std::sync::Mutex;
use wasm_bindgen::prelude::*;

pub const MAX_POSITION: u64 = 10;

pub static GAME_STATE: Lazy<Mutex<SpinGameIntermediateStates>> =
    Lazy::new(|| Mutex::new(SpinGameIntermediateStates::new()));

impl SpinGameTrait for SpinGame {
    /* STATEFUL FUNCTIONS This defines the initialization of the game*/
    fn initialize_game(args: SpinGameInitArgs) {
        let mut game_state = GAME_STATE.lock().unwrap();

        game_state.x_position = args.x_position;
        game_state.y_position = args.y_position;
        game_state.highscore = args.highscore;
        game_state.player_highscore = args.player_highscore;
    }

    /* STATEFUL FUNCTIONS This is defines the logic when player moves one step/entering one command*/

    fn step(input: u64) {
        let mut game_state = GAME_STATE.lock().unwrap();

        match input {
            0 => {
             
            game_state.x_position +=1;
            }
            1 => {
                game_state.y_position +=1  ;

            }
            2 => {
                if game_state.player_highscore > game_state.highscore {
                    game_state.highscore = game_state.player_highscore;
                }
                game_state.player_highscore += 1;


            }

            _ => {
                panic!("Invalid command");
            }
        };
    }

    /* PURE FUNCTION This function returns the game state, to be used in Rust and Zkmain */
    fn get_game_state() -> SpinGameIntermediateStates {
        let game = GAME_STATE.lock().unwrap().clone();
        return game;
    }
}
