info.onScore(info.highScore(), function () {
    info.setScore(0)
    light.showAnimation(light.sparkleAnimation, 300)
})
info.onScore(11, function () {
    game.gameOver(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.y += 10
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
info.onScore(5, function () {
    sprites.destroy(projectile, effects.spray, 100)
})
info.onScore(info.score() / info.highScore(), function () {
    mySprite.sayText("High score reached!")
    info.setScore(Highscore)
})
let Highscore = 0
let projectile: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . 2 2 2 . . . . . . . . 
    . . . . . 2 . 2 2 . . . . . . . 
    . . . . . 2 . 2 2 2 2 2 . . . . 
    . . 2 . . 2 2 2 2 2 . . . . . . 
    . . . 2 2 2 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 . . . . . . . . . 
    . . . . . 2 2 . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 . . . . . . . . . 
    . . . . 2 . 2 2 . . . . . . . . 
    . . . . 2 . . 2 2 . . . . . . . 
    . . . 2 . . . . 2 2 . . . . . . 
    . . . 2 . . . . . 2 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let myEnemy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 8 8 8 8 8 . . . . . . 
    . . . . 8 8 5 5 5 8 8 . . . . . 
    . . . 8 8 5 5 5 5 5 8 8 . . . . 
    . . . 8 5 5 2 5 2 5 5 8 . . . . 
    . . . 8 5 5 5 5 5 5 5 8 . . . . 
    . . . 8 5 6 6 6 6 6 5 8 . . . . 
    . . . 8 8 3 2 2 2 3 8 8 . . . . 
    . . . . 8 8 3 3 3 8 8 . . . . . 
    . . . . . 8 8 8 8 8 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
myEnemy.setPosition(140, 10)
forever(function () {
    myEnemy.follow(mySprite, 30)
    game.setGameOverScoringType(game.ScoringType.HighScore)
    mySprite.setStayInScreen(true)
    mySprite.sayText(info.highScore())
    controller.moveSprite(mySprite)
    info.setLife(1)
    blockSettings.writeNumber("High score", Highscore)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . 2 2 . . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . 2 . . . 2 . . . . . . . . 
        . . . 2 . . 2 2 . . . . . . . . 
        . . . 2 2 2 2 . . . . . . . . . 
        2 2 2 . . 2 . 2 2 2 2 2 . . . . 
        . . 2 2 2 2 2 2 . . . . . . . . 
        . . . . . 2 . . . . . . . . . . 
        . . . . . 2 . . . . . . . . . . 
        . . . . 2 2 2 . . . . . . . . . 
        . . . 2 2 . 2 2 . . . . . . . . 
        . . 2 2 . . . 2 2 . . . . . . . 
        . 2 2 . . . . . 2 2 . . . . . . 
        . 2 . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . 2 2 . . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        2 . . 2 . . . 2 . . 2 2 . . . . 
        2 2 . 2 . . 2 2 . 2 2 . . . . . 
        . 2 2 2 2 2 2 . 2 2 . . . . . . 
        . . . 2 . 2 . 2 . . . . . . . . 
        . . . . . 2 2 2 . . . . . . . . 
        . . . . . 2 . . . . . . . . . . 
        . . . . 2 2 2 . . . . . . . . . 
        . . . 2 2 2 2 2 2 . . . . . . . 
        . . 2 2 . . . 2 2 2 . . . . . . 
        . 2 2 . . . . . 2 2 2 . . . . . 
        2 2 . . . . . . . 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    true
    )
    for (let index = 0; index < 99999; index++) {
        let list: number[] = []
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . 4 2 . 2 2 4 5 4 4 2 . . . . . 
            . 4 . 4 4 . 4 5 5 5 2 . . . . . 
            . 2 4 2 2 2 5 4 4 5 2 . . . . . 
            . . 2 2 . 4 5 4 5 4 2 . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, myEnemy, 50, 100)
        projectile.follow(mySprite, 20)
        pause(2000)
        info.changeScoreBy(1)
        list.push(info.score())
        Highscore += 1
        projectile.x += 50
    }
})
