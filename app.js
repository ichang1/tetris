document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    //const height = 20
    const score = document.querySelector('#score')
    const start_pause = document.querySelector('#start-button')

    const t_tetrimino = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ]

    let curPos = 3
    function draw(tetrimino, initPos) {
        tetrimino.forEach((row, y) => {
            row.forEach((value,x) => {
                if (value !== 0) {
                    squares[curPos+10*y+x].classList.add('tetrimino')
                }
            })
        })
    }
    function undraw(tetrimino, initPos) {
        tetrimino.forEach((row, y) => {
            row.forEach((value,x) => {
                if (value !== 0) {
                    squares[curPos+10*y+x].classList.remove('tetrimino')
                }
            })
        })
    }
    draw(t_tetrimino,curPos)
})
