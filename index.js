let start = document.querySelector('.menu__start') // start button
let menu = document.querySelector('.menu') // menu page
let main = document.querySelector('.main') // main page
let close = document.querySelector('.tetris__close') // button close
let tetris = document.querySelector('.tetris')
//start new game
start.addEventListener('click', () => {
   menu.style.display = 'none'
   main.style.display = 'block'
   createFigure()
})
//close game
close.addEventListener('click', () => {
   window.location.reload()
})
//create board
for (let i = 1; i < 253; i++) {
   let square = document.createElement('div')
   square.classList.add('square')
   tetris.appendChild(square)
}
let square = document.querySelectorAll('.square') //square (all of square = 252)
let i = 0
for (let y = 21; y > 0; y--) {
   for (let x = 1; x < 13; x++) {
      square[i].setAttribute('x', x)
      square[i].setAttribute('y', y)
      i++
   }
}

let x = 5 //first position x
let y = 18  //first position y

//all our figures 
let figures = [
   //line
   [
      [0, 1],
      [0, 2],
      [0, 3],
      //route 90
      [
         [-1, 1],
         [0, 0],
         [1, -1],
         [2, -2]
      ],
      //route 180
      [
         [1, -1],
         [0, 0],
         [-1, 1],
         [-2, 2]
      ],
      //route 270
      [
         [-1, 1],
         [0, 0],
         [1, -1],
         [2, -2]
      ],
      //route 360
      [
         [1, -1],
         [0, 0],
         [-1, 1],
         [-2, 2]
      ]
   ],
   //square
   [
      [1, 0],
      [0, 1],
      [1, 1],
      //route 90
      [
         [0, 0],
         [0, 0],
         [0, 0],
         [0, 0],
      ],
      //route 180
      [
         [0, 0],
         [0, 0],
         [0, 0],
         [0, 0],
      ],
      //route 270
      [
         [0, 0],
         [0, 0],
         [0, 0],
         [0, 0],
      ],
      //route 360
      [
         [0, 0],
         [0, 0],
         [0, 0],
         [0, 0],
      ]
   ],
   // letter L
   [
      [1, 0],
      [0, 1],
      [0, 2],
      //route 90
      [
         [0, 0],
         [-1, 1],
         [1, 0],
         [2, -1],
      ],
      //route 180
      [
         [1, -1],
         [1, -1],
         [-1, 0],
         [-1, 0],
      ],
      //route 270
      [
         [-1, 0],
         [0, -1],
         [2, -2],
         [1, -1],
      ],
      //route 360
      [
         [0, -1],
         [0, -1],
         [-2, 0],
         [-2, 0],
      ]
   ],
   // letter L (mirror)
   [
      [1, 0],
      [1, 1],
      [1, 2],
      //route 90
      [
         [0, 0],
         [0, 0],
         [1, -1],
         [-1, -1],
      ],
      //route 180
      [
         [0, -1],
         [-1, 0],
         [-2, 1],
         [1, 0],
      ],
      //route 270
      [
         [2, 0],
         [0, 0],
         [1, -1],
         [1, -1],
      ],
      //route 360
      [
         [-2, 0],
         [1, -1],
         [0, 0],
         [-1, 1],
      ]
   ],
   // zipper right
   [
      [1, 0],
      [-1, 1],
      [0, 1],
      //route 90
      [
         [0, -1],
         [-1, 0],
         [2, -1],
         [1, 0],
      ],
      //route 180
      [
         [0, 0],
         [1, -1],
         [-2, 0],
         [-1, -1],
      ],
      //route 270
      [
         [0, -1],
         [-1, 0],
         [2, -1],
         [1, 0],
      ],
      //route 360
      [
         [0, 0],
         [1, -1],
         [-2, 0],
         [-1, -1],
      ]
   ],
   // zipper left
   [
      [1, 0],
      [1, 1],
      [2, 1],
      //route 90
      [
         [2, -1],
         [0, 0],
         [1, -1],
         [-1, 0],
      ],
      //route 180
      [
         [-2, 0],
         [0, -1],
         [-1, 0],
         [1, -1],
      ],
      //route 270
      [
         [2, -1],
         [0, 0],
         [1, -1],
         [-1, 0],
      ],
      //route 360
      [
         [-2, 0],
         [0, -1],
         [-1, 0],
         [1, -1],
      ]
   ],
   // lego detail
   [
      [1, 0],
      [2, 0],
      [1, 1],
      //route 90
      [
         [1, -1],
         [0, 0],
         [0, 0],
         [0, 0],
      ],
      //route 180
      [
         [0, 0],
         [-1, 0],
         [-1, 0],
         [1, -1],
      ],
      //route 270
      [
         [1, -1],
         [1, -1],
         [1, -1],
         [0, 0],
      ],
      //route 360
      [
         [-2, 0],
         [0, -1],
         [0, -1],
         [-1, -1],
      ]
   ]
]
let currentFigure = 0 //random figure
let figureBody = 0 // body figure
let rotate = 1 // count  of rotate our figure
let createFigure = () => {
   function getRandom() {
      return Math.round(Math.random() * (figures.length - 1))
   }
   rotate = 1
   currentFigure = getRandom()
   figureBody = [
      document.querySelector(`[x = "${x}"][y = "${y}"]`),
      document.querySelector(`[x = "${x + figures[currentFigure][0][0]}"][y = "${y + figures[currentFigure][0][1]}"]`),
      document.querySelector(`[x = "${x + figures[currentFigure][1][0]}"][y = "${y + figures[currentFigure][1][1]}"]`),
      document.querySelector(`[x = "${x + figures[currentFigure][2][0]}"][y = "${y + figures[currentFigure][2][1]}"]`)
   ]
   // add class 'figure' for every el.
   for (let i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.add('figure')
   }
}
let score = 0 //our score
let input = document.querySelector('input') //text score
input.value = `Score: ${score}`

//function of move our figure
let move = () => {
   let moveFlag = true // true => figure can move; false => figure can not move
   // coordinate of our figure
   let coordinates = [
      [figureBody[0].getAttribute('x'), figureBody[0].getAttribute('y')],
      [figureBody[1].getAttribute('x'), figureBody[1].getAttribute('y')],
      [figureBody[2].getAttribute('x'), figureBody[2].getAttribute('y')],
      [figureBody[3].getAttribute('x'), figureBody[3].getAttribute('y')]
   ]
   // if our figure go down max or meet with other figure => flag false
   for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i][1] == 1 || document.querySelector(`[x = "${coordinates[i][0]}"][y = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
         moveFlag = false
         break
      }
   }
   // moving our figure
   if (moveFlag) {
      for (let i = 0; i < figureBody.length; i++) {
         figureBody[i].classList.remove('figure')
      }
      figureBody = [
         document.querySelector(`[x = "${coordinates[0][0]}"][y = "${coordinates[0][1] - 1}"]`),
         document.querySelector(`[x = "${coordinates[1][0]}"][y = "${coordinates[1][1] - 1}"]`),
         document.querySelector(`[x = "${coordinates[2][0]}"][y = "${coordinates[2][1] - 1}"]`),
         document.querySelector(`[x = "${coordinates[3][0]}"][y = "${coordinates[3][1] - 1}"]`),
      ]
      for (let i = 0; i < figureBody.length; i++) {
         figureBody[i].classList.add('figure')
      }
   }
   else {
      for (let i = 0; i < figureBody.length; i++) {
         figureBody[i].classList.remove('figure')
         figureBody[i].classList.add('set')
      }
      // remove first line if it fill
      for (let i = 1; i < 18; i++) {
         let count = 0
         for (let k = 1; k < 13; k++) {
            if (document.querySelector(`[x = "${k}"][y = "${i}"]`).classList.contains('set')) {
               count++
               if (count === 12) {
                  score += 10
                  input.value = `Score: ${score}`
                  for (let m = 1; m < 13; m++) {
                     document.querySelector(`[x = "${m}"][y = "${i}"]`).classList.remove('set')
                  }
                  let set = document.querySelectorAll('.set')
                  let newSet = []
                  for (let s = 0; s < set.length; s++) {
                     let setCoordinates = [set[s].getAttribute('x'), set[s].getAttribute('y')]
                     if (setCoordinates[1] > i) {
                        set[s].classList.remove('set')
                        newSet.push(document.querySelector(`[x = "${setCoordinates[0]}"][y = "${setCoordinates[1] - 1}"]`))
                     }
                  }
                  for (let a = 0; a < newSet.length; a++) {
                     newSet[a].classList.add('set')
                  }
                  i--
               }
            }
         }
      }
      // game over
      for (let n = 1; n < 13; n++) {
         if (document.querySelector(`[x = "${n}"][y = "${17}"]`).classList.contains('set')) {
            clearInterval(interval)
            alert(input.value = `Score: ${score}`)
            break
         }
      }
      createFigure()
   }
}
// interval moving of figure
let interval = setInterval(() => {
   move()
}, 400)
// gamepad
document.addEventListener('keydown', (e) => {
   let coordinates1 = [figureBody[0].getAttribute('x'), figureBody[0].getAttribute('y'),]
   let coordinates2 = [figureBody[1].getAttribute('x'), figureBody[1].getAttribute('y'),]
   let coordinates3 = [figureBody[2].getAttribute('x'), figureBody[2].getAttribute('y'),]
   let coordinates4 = [figureBody[3].getAttribute('x'), figureBody[3].getAttribute('y'),]
   const getNewState = (a) => {
      moveFlag = true
      let figureNew = [
         document.querySelector(`[x = "${+coordinates1[0] + a}"][y = "${coordinates1[1]}"]`),
         document.querySelector(`[x = "${+coordinates2[0] + a}"][y = "${coordinates2[1]}"]`),
         document.querySelector(`[x = "${+coordinates3[0] + a}"][y = "${coordinates3[1]}"]`),
         document.querySelector(`[x = "${+coordinates4[0] + a}"][y = "${coordinates4[1]}"]`),
      ]
      for (let i = 0; i < figureNew.length; i++) {
         if (!figureNew[i] || figureNew[i].classList.contains('set')) {
            moveFlag = false
         }
      }
      if (moveFlag) {
         for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure')
         }
         figureBody = figureNew
         for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure')
         }
      }
   }
   if (e.keyCode === 37) {
      getNewState(-1)
   }
   else if (e.keyCode === 39) {
      getNewState(1)
   }
   else if (e.keyCode === 40) {
      move()
   }
   else if (e.keyCode === 38) {
      moveFlag = true
      let figureNew = [
         document.querySelector(`[x = "${+coordinates1[0] + figures[currentFigure][rotate + 2][0][0]}"][ y = "${+ coordinates1[1] + figures[currentFigure][rotate + 2][0][1]}"]`),
         document.querySelector(`[x = "${+coordinates2[0] + figures[currentFigure][rotate + 2][1][0]}"][ y = "${+ coordinates2[1] + figures[currentFigure][rotate + 2][1][1]}"]`),
         document.querySelector(`[x = "${+coordinates3[0] + figures[currentFigure][rotate + 2][2][0]}"][ y = "${+ coordinates3[1] + figures[currentFigure][rotate + 2][2][1]}"]`),
         document.querySelector(`[x = "${+coordinates4[0] + figures[currentFigure][rotate + 2][3][0]}"][ y = "${+ coordinates4[1] + figures[currentFigure][rotate + 2][3][1]}"]`)
      ]
      for (let i = 0; i < figureNew.length; i++) {
         if (!figureNew[i] || figureNew[i].classList.contains('set')) {
            moveFlag = false
         }
      }
      if (moveFlag) {
         for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure')
         }
         figureBody = figureNew
         for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure')
         }
         if (rotate < 4) {
            rotate++
         } else {
            rotate = 1
         }
      }
   }
})