function dice(sides){
  return Math.round(Math.random()*sides+.5,0);
}


function d6m1() {
  return dice(6)-1;
}


function d8() {
  return dice(8);
}

function highd6() {
  
  let num = d6m1()
  
  
  if (num < 4) {
    return 4;
  } else{
    return num;
  }
}

function lowd6() {
  
  let num = d6m1()
  
  
  if (num >= 4) {
    return 3;
  } else{
    return num;
  }
}




function rollstat(input) {
  //debugger;
  const cheat = input || {min:0,max:3}
  let stat = 0;
  let pass = 0;
  let num  = 0;
  
  while(true) {
    //debugger;
    
    if (pass < cheat.min) {
      num = highd6();
    } else if ( pass >= cheat.max){
      num = lowd6();
    }else {
      num = d6m1();
    }
    
    stat += num
    if (num >= 4) {
      pass += 1
    //keep going
    
    } else {
      break;
    }
  }
  
  return {
    stat:stat,
    pass:pass
  }
}


let mytype = {
  RNGE:{min:0,max:3},
  MELE:{min:0,max:3},
  INTL:{min:0,max:3},
  NATR:{min:0,max:3},
  SOCL:{min:0,max:3},
  CRFT:{min:0,max:3},
  LABR:{min:0,max:3},
  COOK:{min:0,max:3},
};


function char(input) {
  const type = input || {};
  return {
    RNGE:rollstat(type.RNGE),
    MELE:rollstat(type.MELE),
    INTL:rollstat(type.INTL),
    NATR:rollstat(type.NATR),
    SOCL:rollstat(type.SOCL),
    CRFT:rollstat(type.CRFT),
    LABR:rollstat(type.LABR),
    COOK:rollstat(type.COOK),
    
  }
};


//console.log(JSON.stringify(char(mytype), null, 2));

//const getDOM = document.getElementById.bind(document);

const dom = {};
const domNames = ['minAndMax', 'character', 'generateBtn', 'results', 'passion', 'stat'];

/*
for (let i = 0; i < domNames.length; i++) {
  const name = domNames[i];
}
let prop = undefined;
foreach (prop in domNames) {
  dom[prop] = document.getElementById(prop);
}
*/
domNames.forEach(function (item) {
  dom[item] = document.getElementById(item);
});
['rnge', 'mele', 'intl', 'natr', 'socl', 'crft', 'labr', 'cook'].forEach(function (item) {
  dom[item] = {
    min: document.getElementById(item+'Min'),
    max: document.getElementById(item+'Max')
  };
});

function getValues(item) {
  return {
    min: +(dom[item].min.value),
    max: +(dom[item].max.value)
  };
}

dom.generateBtn.addEventListener('click', function () {

  dom.minAndMax.classList.remove('hide');
  dom.results.classList.remove('hide');

  const thetype = {
    RNGE: getValues('rnge'),
    MELE: getValues('mele'),
    INTL: getValues('intl'),
    NATR: getValues('natr'),
    SOCL: getValues('socl'),
    CRFT: getValues('crft'),
    LABR: getValues('labr'),
    COOK: getValues('cook')
  };

  const thechar = char(thetype);

  const passionCells = dom.passion.querySelectorAll('td');
  const statCells = dom.stat.querySelectorAll('td');

  passionCells[1].innerText = thechar.RNGE.pass;
  passionCells[2].innerText = thechar.MELE.pass;
  passionCells[3].innerText = thechar.INTL.pass;
  passionCells[4].innerText = thechar.NATR.pass;
  passionCells[5].innerText = thechar.SOCL.pass;
  passionCells[6].innerText = thechar.CRFT.pass;
  passionCells[7].innerText = thechar.LABR.pass;
  passionCells[8].innerText = thechar.COOK.pass;

  statCells[1].innerText = thechar.RNGE.stat;
  statCells[2].innerText = thechar.MELE.stat;
  statCells[3].innerText = thechar.INTL.stat;
  statCells[4].innerText = thechar.NATR.stat;
  statCells[5].innerText = thechar.SOCL.stat;
  statCells[6].innerText = thechar.CRFT.stat;
  statCells[7].innerText = thechar.LABR.stat;
  statCells[8].innerText = thechar.COOK.stat;

  //dom.character.innerText = JSON.stringify(thechar, null, 2);
});

