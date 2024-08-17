use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Clone, Serialize)]
#[wasm_bindgen]
pub struct SpinGameInitArgs {
    // define your arguments here
    pub x_position: u64,
    pub y_position: u64,
    pub highscore: u64,
}

#[wasm_bindgen]
impl SpinGameInitArgs {
    #[wasm_bindgen(constructor)]
    pub fn new(x_position: u64, y_position: u64, highscore: u64) -> SpinGameInitArgs {
        SpinGameInitArgs {
            x_position,
            y_position,
            highscore
        }
    }
}

#[derive(Clone, Serialize)]
#[wasm_bindgen]
pub struct SpinGameIntermediateStates {
    // define your game state here
    pub x_position: u64,
    pub y_position: u64,
    pub highscore: u64,
}

impl SpinGameIntermediateStates {
    pub fn new() -> SpinGameIntermediateStates {
        SpinGameIntermediateStates {
            x_position: 0,
            y_position: 0,
            highscore: 0,
        }
    }
}

impl fmt::Display for SpinGameIntermediateStates {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "GameState {{ x_position: {}, y_position: {}, highscore: {} }}",
            self.x_position, self.y_position, self.highscore
        )
    }
}
