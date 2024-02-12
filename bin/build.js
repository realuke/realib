#! /usr/bin/env node
import * as readline from "readline";
import * as fs from 'fs'


const rl = readline.createInterface({
  // 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
  input: process.stdin,
  output: process.stdout,
});

const pkgName = "realib"
const version = "0.1.0"

/** 에러 메시지 */
const errorMsgs = {
   lang: `Incorrect language. please enter typescript or javascript.\n`,
   path: "Please enter the path again.\n",
   default: "Incorrect answer. please enter again.\n"
}

/** input 값 모음. 해당 Array의 index 값은 몇 번째 질문인지 판단하는 데 사용. */
let input = [];                          
rl.setPrompt("> ")

/** 질문 배열 */
const questions = [ languageQuestion, filePathQuetion, checkPathQuestion ];

languageQuestion();

//답변을 입력했을 때
rl.on("line", (ans) => {
   input.push(ans)
   console.log("\n")
   switch(input.length) {

      // 언어 질문에 답변 시
      case 1:
         switch(ans) {
            case "typescript":
               filePathQuetion();
               break;
            case "javascript":
               filePathQuetion();
               break;
            default:
               errorAnswer(errorMsgs.lang);
         }
         break;
      
      //파일 주소 질문에 답변 시
      case 2:
         checkPathQuestion(ans);
         break;

      //주소 확인 질문에 답변 시
      case 3:
         switch(ans) {
            case "y":
               install();
               break;
            case "n":
               errorAnswer(errorMsgs.path);
               break;
            default:
               errorAnswer(errorMsgs.default);
         }
         break;
   }
   
});


//모든 질문이 끝났다 판단하여 입력받기 종료.
rl.on("close", () => {
	process.exit();
})

/**
 * 사용할 프로그래밍 언어를 질문함.
 */
function languageQuestion() {
   console.log(`With which language do you want to use this library?\nInput the language you want. [ typescript / javascript ]`)
   rl.prompt();
}

/**
 * 마크 스크립트 파일 주소를 질문함.
 */
function filePathQuetion() {
   const msg = `Please input your script file path.
(ex. "C:/games/com.mojang/development_behavior_packs/BP/scripts")\n
! CAUTION ! Don't push the slash("/") on the end of the path!`

   console.log(msg);
   rl.prompt();
}

/**
 * 파일 주소가 정확한지 재차 확인함.
 * @param {} ans 입력한 파일 주소
 */
function checkPathQuestion(ans) {
   const destinationPath = ans + `\\Realib@${version}`
   console.log(`"${destinationPath}" \nIs it okay to make library folder to this path? If it is, please enter "y", or it's not, please enter "n" to enter again.`)
   rl.prompt();
}

/**
 * 입력이 잘못되었다면, 에러 메시지 출력 후 전 단계로 이동.
 * @param {*} errorMsg 에러 메시지
 */
function errorAnswer(errorMsg) {
   if(errorMsg === errorMsgs.path) input.pop();
   input.pop();
   console.log(errorMsg);
   questions[input.length]();
}


/**
 * 최종적으로 라이브러리를 설치.
 */
async function install() {
   const libFile = {"javascript":`node_modules/${pkgName}/scripts`, "typescript":`node_modules/${pkgName}/src`}
   console.log("bundling is started...")
   const destinationPath = input[1] + `/${pkgName}@${version}`
   fs.rmdir(destinationPath, (err)=>{});
   fs.cp(libFile[input[0]], destinationPath, {"recursive":true}, (err) => {
      if(err) {
         return console.error(err);
      }
      console.log("succesfully loaded library.")
      rl.close()
   })
   
} 

