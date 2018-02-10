// variables
let baraja;
let playerCards;
let dealerCards;
let sum;
let sim;
let c;
let d;
let ace = 11;

// texts
const natural = "You are a natural!"
const push = "Push!"
const busted = "Busted!"

// arranged deck
const back = $('<div class = "card"><img src="./cards/back.png"/></div>');
const naipes = [];
for (i = 1; i < 53; i++) {
  naipes.push({name: 'c'+ i, image: '<div class = "card"><img src="./cards/c' + i + '.png"/></div>', value: i % 13 });
  if (naipes[i-1].value > 10 || naipes[i-1].value === 0 ) { //(naipes[i-1].value === ( 0 || 11 || 12 ))
    naipes[i-1].value = 10
  } else if (naipes[i-1].value === 1) {
    naipes[i-1].value = ace
  }
}

console.log(naipes);

function shuffle(array) {  //Fisher–Yates shuffle
  var i = array.length,
      j = 0,
      temp;
  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

function showDealB() {
  $(".hit").css('visibility','hidden');
  $(".stand").css('visibility','hidden');
  $(".deal").css('visibility','visible');
  $(".reload").css('visibility','visible');
}

function showHitStandB() {
  $(".hit").css('visibility','visible');
  $(".stand").css('visibility','visible');
  $(".deal").css('visibility','hidden');
  $(".reload").css('visibility','hidden');
}

function lessSeventeen() {
  while (sim < 17) {
    $(".dealer").append(baraja[c+1].image);
    sim += baraja[c+1].value
    dealerCards = baraja.slice(d+1,c+2)
    dealerCards = dealerCards.map(a => a.value)
    c++
  };
  if (sim > 21) {
    asDealer();
    simDealer();
    if (sim > 21) {
      $("span").text(natural);
      $(".player").animate({"size": "150%"});
      showDealB();
    }
  } else if (sum === sim) {
    $("span").text(push);
    showDealB();
  } else if (sim > sum && sim <= 21) {
    $("span").text(busted);
    $(".dealer").animate({"size": "150%"})
    showDealB();
  } else if (sim < sum) {
    $("span").text(natural);
    $(".player").animate({"size": "150%"})
    showDealB();
  };
};


function twentyOne() {
  if (sum === 21 && sim === 21) {
    $(back).remove();
    $(".dealer").append(baraja[3].image);
    $("span").text(push);
    showDealB();
  } else if (sum === 21) {
    $(back).remove();
    $(".dealer").append(baraja[3].image);
    lessSeventeen();
  };
};

function sumPlayer() {
  sum = baraja[0].value + baraja[1].value + playerCards.reduce((a, b) => a + b);
}

function simDealer() {
  sim = baraja[2].value + baraja[3].value + dealerCards.reduce((a, b) => a + b);
}

function firstAceP() {
  if (sum > 21 && baraja[0].value === 11) {
    baraja[0].value = 1
    sumPlayer()
  } else if (sum > 21 && baraja[1].value === 11) {
    baraja[1].value = 1
    sumPlayer()
  }
}

function firstAceD() {
  if (sim > 21 && baraja[2].value === 11) {
    baraja[0].value = 1
    simDealer()
  } else if (sim > 21 && baraja[3].value === 11) {
    baraja[1].value = 1
    simDealer()
  }
}

function asPlayer() {
  for (x = 0; c >= x; x++) {
    if (sum > 21 && playerCards[x] === 11) {
      playerCards[x] = 1;
      sumPlayer()
    }
    firstAceP()
  }
}

function asDealer() {
  for (x = 0; c >= x; x++) {
    if (sim > 21 && dealerCards[x] === 11) {
      dealerCards[x] = 1;
      simDealer()
    }
    firstAceD()
  }
}

function play() {
  baraja = shuffle(naipes);
  c = 3;
  d = 3;
  sum = 0;
  sim = 0;
  console.log(sum);
  console.log(sim);
  console.log(c)
  showHitStandB();
  $(".card").remove();
  $(".player").append(baraja[0].image).append(baraja[1].image);
  $(".dealer").append(baraja[2].image).append(back);
  sim = baraja[2].value + baraja[3].value;
  sum = baraja[0].value + baraja[1].value;
  console.log(sum);
  console.log(sim);
  playerCards = baraja.slice(0,2);
  dealerCards = baraja.slice(2,4);
  firstAceP()
  firstAceD()
  if (sum === 21 && sim === 21) {
    $(back).remove();
    $(".dealer").append(baraja[3].image);
    $("span").text(push)
    showDealB();
  } else if (sum === 21) {
    $(back).remove();
    $(".dealer").append(baraja[3].image);
    $("span").text(natural)
    showDealB();
  } else {
    $("span").text("Hit or Stand?");
  }
}

function hitIt() {
    $(".player").append(baraja[c+1].image);
    sum += baraja[c+1].value;
    playerCards = baraja.slice(4,c+2)
    playerCards = playerCards.map(a => a.value)
    c++;
    d++;
    console.log(sum);
    console.log(sim);
    twentyOne();
    if (sum > 21) {
      asPlayer();
      sumPlayer();
      twentyOne();
      if (sum > 21) {
        $("span").text(busted);
        showDealB();
      }}};


function standStill() {
  $(".hit").css('visibility','hidden');
  $(back).remove();
  $(".dealer").append(baraja[3].image);
  if (sim > sum) {
    $("span").text(busted)
    $(".dealer").animate({"size": "150%"})
    showDealB();
  } else if (sim === sum) {
    $("span").text(push)
    showDealB();
  } else if (sim < sum && sim < 17) {
    lessSeventeen();
  } else if (sum > sim) {
    $("span").text(natural);
    $(".dealer").animate({"size": "150%"})
    showDealB();
  };
};

function roundAgain() {
  location.reload();
}

$(document).ready(function(){
  $(".deal").on('click', play);
  $(".hit").on('click', hitIt);
  $(".stand").on('click',standStill);
  $(".reload").on('click', roundAgain);
});

/*  $(".stand").on('click', function(){
    $(".card").remove(back);
    $(".dealer").append(baraja[0]); */



    /*const n2 = c5 = c6 = c7 = c8 = 2;
    const n3 = c9 = c10 = c11 = c12 = 3;
    const n4 = c13 = c14 = c15 = c16 = 4;
    const n5 = c17 = c18 = c19 = c20 = 5;
    const n6 = c21 = c22 = c23 = c24 = 6;
    const n7 = c25 = c26 = c27 = c28 = 7;
    const n8 = c29 = c30 = c31 = c32 = 8;
    const n9 = c33 = c34 = c35 = c36 = 9;
    const n10 = c37 = c38 = c39 = c40 = c41 = c42 = c43 = c44 = c45 = c46 = c47 = c48 = c49 = c50 = c51 = c52 = 10;*/

    /*witch (naipes[i-1].value) {
      case 'c1':case 'c14':case 'c27':case 'c40':
        naipes[i-1].value = ace;
        break;
      case 'c2':case 'c15':case 'c28':case 'c41':
        naipes[i-1].value = 2;
        break;
      case 'c3':case 'c16':case 'c29':case 'c42':
        naipes[i-1].value = 3;
        break;
      case 'c4':case 'c17':case 'c30':case 'c43':
        naipes[i-1].value = 4;
        break;
      case 'c5':case 'c18':case 'c31':case 'c44':
        naipes[i-1].value = 5;
        break;
      case 'c6':case 'c19':case 'c32':case  'c45':
        naipes[i-1].value = 6;
        break;
      case 'c7':case 'c20':case 'c33':case 'c46':
        naipes[i-1].value = 7;
        break;
      case 'c8':case 'c21':case 'c34':case 'c47':
        naipes[i-1].value = 8;
        break;
      case 'c9':case 'c22':case 'c35':case 'c48':
        naipes[i-1].value = 9;
        break;
      case 'c10':case 'c23':case 'c36':case 'c49':
      case 'c11':case 'c24':case 'c37':case 'c50':
      case 'c12':case 'c25':case 'c38':case 'c51':
      case 'c13':case 'c26':case 'c39':case 'c52':
        naipes[i-1].value = 10;
        break;
    } */

    /*    switch (playerCards) {
          case playerCards[x] === 11:
            playerCards[x] = 1;
            return playerCards[x];
            console.log(baraja[x]);
            break;
          case baraja[0].value === 11:
            baraja[0].value = 1;
            console.log(baraja[x]);
            return baraja[0].value;
            break;
          case baraja[1].value === 11:
            baraja[1].value = 1;
            return baraja[1].value;
            console.log(baraja[x]);
            break;
        }*/
