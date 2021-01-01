// let list = [
//   { game:'B-Daman', 
//     image: 'images/explore/b-daman.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 58, 
//     rank: 0 
//   },
//   { game:'Bakugan', 
//     image: 'images/explore/bakugan.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 58,
//     rank: 0 
//   },
//   { game:'Batu Seremban', 
//     image: 'images/explore/batu-seremban.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 16,
//     rank: 0 
//   },
//   { game:'Ceper', 
//     image: 'images/explore/ceper.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 61,
//     rank: 0 
//   },
//   { game:'Congkak',
//     image: 'images/explore/congkak.png', 
//     link: 'game/SiteMaintenance.html',
//     vote: 76,
//     rank: 0 
//   },
//   { game:'Eraser Brawl', 
//     image: 'images/explore/eraser-brawl.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 94,
//     rank: 0 
//   },
//   { game:'Gasing', 
//     image: 'images/explore/gasing.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 37,
//     rank: 0 
//   },
//   { game:'Ketingting', 
//     image: 'images/explore/ketingting.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 65,
//     rank: 0 
//   },
//   { game:'Kite', 
//     image: 'images/explore/kite.png',
//     link: 'game/kite.html',
//     vote: 48,
//     rank: 0
//   },
//   { game:'Paper Football',
//     image: 'images/explore/paper-football.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 73,
//     rank: 0 
//   },
//   { game:'Police and Thief',
//     image: 'images/explore/police-and-thief.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 11,
//     rank: 0 
//   },
//   { game:'Super Yoyo',
//     image: 'images/explore/super-yoyo.png',
//     link: 'game/super-yoyo.html',
//     vote: 81,
//     rank: 0 
//   },
//   { game:'Tamiya',
//     image: 'images/explore/tamiya.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 45,
//     rank: 0
//   },
//   { game:'Throwing Slippers', 
//     image: 'images/explore/throwing-slippers.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 41,
//     rank: 0
//   },
//   { game:'Zero Point', 
//     image: 'images/explore/zero-point.png',
//     link: 'game/SiteMaintenance.html',
//     vote: 29,
//     rank: 0
//   }
// ]

function random(number){
  return Math.floor(Math.random() * (number+1));
}

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

// function request() {
//   ajaxget.open('GET', url, true);
//   ajaxget.setRequestHeader('content-type', 'application/json');
//   ajaxget.onreadystatechange = function() {
//     if ( ajaxget.readyState == 4 && ajaxget.status == 200 )
//     {
//       console.log(JSON.parse(ajaxget.responseText));
//       reorderRank(JSON.parse(ajaxget.responseText));
//     }
//   }
//   ajaxget.send(null);
// }

// function post() {

// }

let list = [];
let ajaxget = new XMLHttpRequest();
let url = "game.json";
let voteList = []; //int array yang store semua vote
let sorted = []; //array yang vote
let ranks = []; //array untuk ranks

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



//addEventListener for the buttons
// for(let rank=1;rank<=list.length;rank++){
//   let upId = 'upvote-'+rank;
//   let downId = 'downvote-'+rank;

//   document.getElementById(upId).addEventListener('click', function(){
//     let target = ranks.indexOf(rank);
//     list[target].vote++;
    
//     reorderRank(list);
//     // displayRank();
//     console.log(ranks);
//   });
  
//   document.getElementById(downId).addEventListener('click', function(){
//     let target = ranks.indexOf(rank);
//     list[target].vote--;

//     reorderRank(list);  
//     // displayRank();
//     console.log(ranks);
//   }); 
// }

// request();