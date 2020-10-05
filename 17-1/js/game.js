let rounds = 0;
let roundCount = 0;
let src='';
pWins = 0;
cWins = 0;

$(document).ready(function(){

  $('#rounds button').on('click', function(){
    rounds = +$('#rounds input').val();
    $('#rounds').fadeOut(1000, function(){
      $('#player-choices').css({'display':'inline-block',
                                'width':'20%',
                                'margin-top': '45px'})
      $('#player-choices').fadeIn(1000);
      $('#game').css({'display':'inline-block',
                      'width':'75%'})
      $('#game').fadeIn(1000);
    });
  });

  $('img').on('click', function(){
    let $img = $(this).attr('src');
    $('#player img').attr('src',$img);
    let playerChoice = $(this).attr('id');

    let computerChoice = gameObj.computerImg();
    $('#Computer img').attr('src',computerChoice[0]);

    let scores = gameObj.scores(computerChoice[1], playerChoice);
    $('#player p').text(scores[1]);
    $('#Computer p').text(scores[2]);

    let stopGame = gameObj.isWinner(scores[0],scores[1],scores[2]);
    if (stopGame !== false){
      $('img').off('click');
      $('#play-again').fadeIn(1000);
    }

    $('#play-again button').on('click', function(){
      location.reload();
    })
  })
})

let gameObj = {
  choices: ["Lapis", "Papyrus", "Scalpellus"],
  computerChooses: function (){
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    let computerChoice = this.choices[randomIndex];
    return computerChoice;
  },
  computerImg: function(){
    let computerChoice = this.computerChooses();
    if (computerChoice === "Lapis"){
      src='https://i.imgur.com/jJe8jtM.png';
    }else if(computerChoice === 'Papyrus'){
      src= 'https://i.imgur.com/wWVMNkw.png'
    }else{
      src='https://i.imgur.com/YcHN93v.png'
    }
    return [src,computerChoice];
  },

  scores: function(computerChoice,playerChoice){
    roundCount += 1;
    if (computerChoice !== playerChoice){
      if(computerChoice === this.choices[0]){
        if(playerChoice === this.choices[1]){
          pWins = pWins+1;
        }else{
          cWins = cWins+1;
        }

      }else if(computerChoice === this.choices[1]){
        if(playerChoice === this.choices[2]){
          pWins = pWins+1;
        }else{
          cWins = cWins+1;
        }

      }else if(computerChoice === this.choices[2]){
        if(playerChoice === this.choices[0]){
          pWins = pWins+1;
        }else{
          cWins = cWins+1;
        }
      }
    }

    return [roundCount,pWins,cWins]
  },

  isWinner: function (roundCount,pWins,cWins){
    if (roundCount === rounds){
      if (pWins > cWins){
        return 'Player is the winner';
      }else if (pWins < cWins){
        return 'Computer is the winner';
      }else{
        return 'Tied game';
      }
    }else{
      return false;
    }
  }
}
