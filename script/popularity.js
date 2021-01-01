//function to display all games ranking
function displayRank(list) {
  for(let i=0; i<list.length; i++){
    let titleId = 'pop-game'+list[i].rank+'-title';
    let voteId = 'pop-game'+list[i].rank+'-vote';
    let imgId = 'pop-game'+list[i].rank+'-img';
    let linkId = 'pop-game'+list[i].rank+'-link';

    document.getElementById(titleId).innerHTML = list[i].game;
    document.getElementById(voteId).innerHTML = list[i].vote;
    document.getElementById(imgId).setAttribute('src', list[i].image);
    document.getElementById(linkId).setAttribute('href', list[i].link);
  }
  console.log(list);
}

//function to assign rank to the games
function reorderRank(list) {
  voteList = []; //int array for vote     
  sorted = [];
  ranks = [];

  for (let i=0; i < list.length; i++) {
    let v=list[i].vote;
    voteList.push(v);
  }
  console.log(voteList);

  sorted = voteList.slice().sort( function(a,b) { 
    return b-a  
  });
  console.log(sorted);

  ranks = voteList.map( function(a) { 
    return sorted.indexOf(a)+1  
  });
  console.log(ranks);

  for(let i=0;i<ranks.length;i++){
    let therank = ranks[i];
    let count = 0; //tengok berapa kali
    for(let j=0;j< ranks.length;j++){
      if (ranks[j] == therank){
        count++;
      }
    }
    if (count > 1){
      for(let k=0;k< ranks.length;k++){
        if (ranks[k] == therank && count > 1){
          ranks[k]++;
          count--;
        }
      }
    }
  }

  for (let i=0; i < list.length; i++) {  
    list[i].rank = ranks[i];
  }
}

let list = [];
let ajaxget = new XMLHttpRequest();
let url = "game.json";
let voteList = []; //int array yang store semua vote
let sorted = []; //array yang vote
let ranks = []; //array untuk ranks

//request data from JSON file
ajaxget.open('GET', url, true);
ajaxget.setRequestHeader('content-type', 'application/json');
ajaxget.onreadystatechange = function() {
  if ( ajaxget.readyState == 4 && ajaxget.status == 200 )
  {
    console.log(JSON.parse(ajaxget.responseText));
    list = JSON.parse(ajaxget.responseText);
    reorderRank(list);
    displayRank(list);
    //addEventListener for the buttons
    for(let rank=1;rank<=list.length;rank++){
      let upId = 'upvote-'+rank;
      let downId = 'downvote-'+rank;
      
      document.getElementById(upId).addEventListener('click', function(){
        let target = ranks.indexOf(rank);
        list[target].vote++;
        alert(list[target].game + ' have been upvoted!');
        reorderRank(list);
        displayRank(list);
        console.log(ranks);
      });
        
      document.getElementById(downId).addEventListener('click', function(){
        let target = ranks.indexOf(rank);
        list[target].vote--;
        alert(list[target].game + ' have been downvoted!');
        reorderRank(list);  
        displayRank(list);
        console.log(ranks);
      }); 
    }

  }
}
ajaxget.send(null);