"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "getState",
    value: function getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
        gameState = data.val();
      });
    }
  }, {
    key: "update",
    value: function update(state) {
      database.ref('/').update({
        gameState: state
      });
    }
  }, {
    key: "start",
    value: function start() {
      var playerCountRef;
      return regeneratorRuntime.async(function start$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(gameState === 0)) {
                _context.next = 8;
                break;
              }

              player = new Player();
              _context.next = 4;
              return regeneratorRuntime.awrap(database.ref('playerCount').once("value"));

            case 4:
              playerCountRef = _context.sent;

              if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
              }

              form = new Form();
              form.display();

            case 8:
              player1 = createSprite(200, 500);
              player1.addImage("player1", player_img);
              player2 = createSprite(800, 500);
              player2.addImage("player2", player_img);
              players = [player1, player2];

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "play",
    value: function play() {
      form.hide();
      Player.getPlayerInfo();
      image(back_img, 0, 0, 1000, 800);
      var x = 100;
      var y = 200;
      var index = 0;
      drawSprites();

      for (var plr in allPlayers) {
        index = index + 1;
        x = 500 - allPlayers[plr].distance;
        y = 500;
        players[index - 1].x = x;
        players[index - 1].y = y;

        if (index === player.index) {
          fill("red");
          textSize(20);
          text(allPlayers[plr].name, x - 25, y + 25); //add code to display the player's name on the respective basket.
        }
      }

      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        player.distance -= 10;
        player.update();
      }

      if (keyIsDown(LEFT_ARROW) && player.index !== null) {
        player.distance += 10;
        player.update();
      }

      if (frameCount % 20 === 0) {
        fruits = createSprite(random(100, 1000), 0, 100, 100);
        fruits.velocityY = 6;
        var rand = Math.round(random(1, 5));

        switch (rand) {
          case 1:
            fruits.addImage("fruit1", fruit1_img);
            break;

          case 2:
            fruits.addImage("fruit1", fruit2_img);
            break;

          case 3:
            fruits.addImage("fruit1", fruit3_img);
            break;

          case 4:
            fruits.addImage("fruit1", fruit4_img);
            break;

          case 5:
            fruits.addImage("fruit1", fruit5_img);
            break;
        }

        fruitGroup.add(fruits);
      }

      if (player.index !== null) {
        for (var i = 0; i < fruitGroup.length; i++) {
          if (fruitGroup.get(i).isTouching(players)) {
            fruitGroup.get(i).destroy();
          }
        }
      }
    }
  }, {
    key: "end",
    value: function end() {
      console.log("Game Ended");
    }
  }]);

  return Game;
}();