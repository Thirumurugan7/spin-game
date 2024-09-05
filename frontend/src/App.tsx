import React, { useEffect, useRef, useState } from 'react';
import "./App.css";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { abi } from "./ABI.json";
 import { config } from "./web3";
import { readContract } from "wagmi/actions";
import { TaskStatus } from "zkwasm-service-helper";
import AppleLogo from './assets/applePixels.png';
import Monitor from './assets/oldMonitor.png';
import useInterval from './hooks/useInterval';
import { Spin, SpinGameInitArgs } from "spin";

import { useAccount } from 'wagmi';

const GAME_CONTRACT_ADDRESS = import.meta.env.VITE_GAME_CONTRACT_ADDRESS;
const ZK_USER_ADDRESS = import.meta.env.VITE_ZK_CLOUD_USER_ADDRESS;
const ZK_USER_PRIVATE_KEY = import.meta.env.VITE_ZK_CLOUD_USER_PRIVATE_KEY;
const ZK_IMAGE_MD5 = import.meta.env.VITE_ZK_CLOUD_IMAGE_MD5;
const ZK_CLOUD_RPC_URL = import.meta.env.VITE_ZK_CLOUD_URL;

interface GameState {
    x_position: bigint;
    y_position: bigint;
    highscore: bigint;
    player_highscore: any;
    
}

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;
/* This function is used to verify the proof on-chain */
async function verify_onchain({
    proof,
    verify_instance,
    aux,
    instances,
}: {
    proof: BigInt[];
    verify_instance: BigInt[];
    aux: BigInt[];
    instances: BigInt[];
    status: TaskStatus;
}) {
    console.log("proof", proof);
    console.log("verify_instance", verify_instance);
    console.log("aux",aux);

    console.log("instance val passed", [instances]);
    
    const result = await writeContract(config, {
        abi,
        address: GAME_CONTRACT_ADDRESS,
        functionName: "settleProof",
        args: [proof, verify_instance, aux, [instances]],
    });
    const transactionReceipt = waitForTransactionReceipt(config, {
        hash: result,
    });
    return transactionReceipt;
}

/* This function is used to get the on-chain game states */
async function getOnchainGameStates() {
    const result = (await readContract(config, {
        abi,
        address: GAME_CONTRACT_ADDRESS,
        functionName: "getStates",
        args: [],
    })) as [bigint, bigint, bigint, any];
    return result;
}

let spin: Spin;

function App() {


  const {isConnected} = useAccount()
    useEffect(() => {
if(!isConnected){
  console.log("not connected");
  
  return
}
        getOnchainGameStates().then(async (result): Promise<any> => {
            const x_position = result[0];
            const y_position = result[1];
            const highscore = result[2];
            const player_highscore = result[3];

            console.log("x_position = ", x_position);
            console.log("y_position = ", y_position);
            console.log("highscore = ", highscore);
            console.log("playerHighScore = ", player_highscore);
            setOnChainGameStates({
                x_position,
                y_position,
                highscore,
                player_highscore
            });

            spin = new Spin({
                cloudCredentials: {
                    CLOUD_RPC_URL: ZK_CLOUD_RPC_URL,
                    USER_ADDRESS: ZK_USER_ADDRESS,
                    USER_PRIVATE_KEY: ZK_USER_PRIVATE_KEY,
                    IMAGE_HASH: ZK_IMAGE_MD5,
                },  
            });

            console.log("before jdcfsd",spin);
            
            spin.initialize_import().then(() => {
                const arg = new SpinGameInitArgs( x_position,
                    y_position,
                    highscore,
                    player_highscore);
                console.log("arg = ", arg);
                spin.initialize_game(arg);
                updateDisplay();
            });
        });
    }, []);

    const [gameState, setGameState] = useState<GameState>({
        x_position: BigInt(0),
        y_position: BigInt(0),
        highscore: BigInt(0),
        player_highscore: BigInt(0)
    });

    const [onChainGameStates, setOnChainGameStates] = useState<GameState>({
        x_position: BigInt(0),
        y_position: BigInt(0),
        highscore: BigInt(0),
        player_highscore: BigInt(0),

    });

    const [moves, setMoves] = useState<bigint[]>([]);

    const onClick = (command: bigint) => () => {
        spin.step(command);
        updateDisplay();
    };

    const updateDisplay = () => {
        const newGameState = spin.getGameState();
        setGameState({
            x_position: newGameState.x_position,
            y_position: newGameState.y_position,
            highscore: newGameState.highscore,
            player_highscore: newGameState.player_highscore,
        });
        setMoves(spin.witness);
    };

    // Submit the proof to the cloud
    const submitProof = async () => {
        console.log("valleded");
        
        const proof = await spin.generateProof();
console.log("proof",proof);

        if (!proof) {
            console.error("Proof generation failed");
            return;
        }
        // onchain verification operations
        console.log("submitting proof");
  try {
    const verificationResult = await verify_onchain(proof);

    console.log("verificationResult = ", verificationResult);
  } catch (error) {
    console.log("error in verify onchain function", error);
    
  }

        // wait for the transaction to be broadcasted, better way is to use event listener
        await new Promise((r) => setTimeout(r, 1000));

        const gameStates = await getOnchainGameStates();

        setOnChainGameStates({
            x_position: gameStates[0],
            y_position: gameStates[1],
            highscore: gameStates[2],
        });

        await spin.reset();
        // awonGameInitReady(gameStates[0], gameStates[1]);
    };

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snake, setSnake] = useState(initialSnake);
    const [apple, setApple] = useState(initialApple);
    const [direction, setDirection] = useState([0, -1]);
    const [delay, setDelay] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
  
    useInterval(() => runGame(), delay);
  
    useEffect(() => {
      let fruit = document.getElementById('fruit') as HTMLCanvasElement;
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(scale, 0, 0, scale, 0, 0);
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          ctx.fillStyle = '#a3d001';
          snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
          ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
        }
      }
    }, [snake, apple, gameOver]);
  
    function handleSetScore() {
      if (score > Number(localStorage.getItem('snakeScore'))) {
        localStorage.setItem('snakeScore', JSON.stringify(score));
      }
    }
  
    function play() {
      setSnake(initialSnake);
      setApple(initialApple);
      setDirection([1, 0]);
      setDelay(timeDelay);
      setScore(0);
      setGameOver(false);
    }
    function checkCollision(head: number[]) {
      for (let i = 0; i < snake.length; i++) {
        if (head[i] < 0 || head[i] * scale >= canvasX) return true;
      }
      for (const s of snake) {
        if (head[0] === s[0] && head[1] === s[1]) return true;
      }
      return false;
    }
    function appleAte(newSnake: number[][]) {
      let coord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));
      if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
        let newApple = coord;
        setScore(score + 1);
        setApple(newApple);
        return true;
      }
      return false;
    }
  
    function runGame() {
      const newSnake = [...snake];
      const newSnakeHead = [
        newSnake[0][0] + direction[0],
        newSnake[0][1] + direction[1],
      ];
      newSnake.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) {
        setDelay(null);
        setGameOver(true);
        handleSetScore();
        onClick(BigInt(2))
        submitProof()

      }
      if (!appleAte(newSnake)) {
        newSnake.pop();
      }
      setSnake(newSnake);
    }


    function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
      switch (e.key) {
        case 'ArrowLeft':
          if (direction[0] !== 1) {
            console.log("clicked left");
            onClick(BigInt(0));
            setDirection([-1, 0]);
          }
          break;
        case 'ArrowUp':
          if (direction[1] !== 1) {
            console.log("clicked up");
            onClick(BigInt(1));
            setDirection([0, -1]);
          }
          break;
        case 'ArrowRight':
          if (direction[0] !== -1) {
            console.log("clicked right");
            onClick(BigInt(0));
            setDirection([1, 0]);
          }
          break;
        case 'ArrowDown':
          if (direction[1] !== -1) {
            console.log("clicked down");
            onClick(BigInt(1));
            setDirection([0, 1]);
          }
          break;
      }
    }
    

    return (
        <div className="App">
            
            <w3m-button />
            <div onKeyDown={e => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
      <img src={Monitor} alt="fruit" width="4000" className="monitor" />
      <canvas
        className="playArea"
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>
      <div className="scoreBox">
        <h2 className='val'>Score: {score}</h2>
        <h2 className='val'>High Score: {localStorage.getItem('snakeScore')}</h2>
      </div>
    </div>
        </div>
    );
}

export default App;
