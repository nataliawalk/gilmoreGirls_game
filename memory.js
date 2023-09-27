function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

var cards = ["rory.jpg", "lorelai.jpg", "emily.jpg", "emily.jpg", "richard.jpg", "dean.jpg", "lorelai.jpg", "luke.jpg","rory.jpg", "dean.jpg","luke.jpg", "richard.jpg"];
shuffle(cards);
console.log(cards);

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var c = new Array(12);

for(i=0;i<=11;i++) {
	c[i]=document.getElementById("c"+ i);
}

for( let i=0;i<=11;i++) {
	let index = i;
	c[index].addEventListener("click", function() { revealCard(index); } );
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr) {
	
	var opacityValue = $('#c'+nr).css('opacity');
	
	if (opacityValue != 0 && lock==false && visible_nr!=nr) {
	
		lock = true;
		
		var image = "url(img/" + cards[nr] + ")";
		
		$('#c'+nr).css('background-image', image);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if (oneVisible ==false) {
			oneVisible = true;
			visible_nr=nr;
			lock = false;
		}
		
		else  {
			if(cards[visible_nr]==cards[nr]) {
				yes.play();
				setTimeout(function() {hide2Cards(nr, visible_nr)}, 750);
			}
			else {
				no.play();
				setTimeout(function() {restore2Cards(nr, visible_nr)}, 1000);
			}
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);		
			oneVisible = false;
		}
	}
}

function hide2Cards(nr1, nr2) {
	$('#c' +nr1).css('opacity', '0');
	$('#c' +nr2).css('opacity', '0');

	pairsLeft--;
	
	if(pairsLeft == 0) {
		$('.board').html('<h1>You win!<br>Done in: '+turnCounter+ ' turns</h1><span class="reset" onclick="location.reload()">Play again</span>');
	}
	
	lock = false;
}
function restore2Cards(nr1, nr2) {
	$('#c'+nr1).css('background-image', 'url(img/karta.jpg)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');
		
	$('#c'+nr2).css('background-image', 'url(img/karta.jpg)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
		
	lock = false;
}