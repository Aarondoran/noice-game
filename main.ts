info.onScore(info.highScore(), function () {
    info.setScore(0)
    light.showAnimation(light.sparkleAnimation, 300)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.y += 10
})
info.onScore(2, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
info.onScore(info.score() / info.highScore(), function () {
    game.showLongText("Wow you reached your High score!", DialogLayout.Bottom)
})
let projectile2: Sprite = null
let Highscore = 0
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
    myEnemy.follow(mySprite, 25)
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
        projectile2 = sprites.createProjectileFromSprite(img`
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
            `, myEnemy, 100, 100)
        projectile2.x += 50
        pause(3000)
        info.changeScoreBy(1)
        Highscore += 1
    }
})
