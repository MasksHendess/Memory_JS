const gridarea = document.getElementById('gridcontainer')
let colors = [     
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FF00FF',
        '#FF7F50',
        '#C0C0C0',
        //
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FF00FF',
        '#FF7F50',
        '#C0C0C0',

    ]
    const colorsbackup =  [     
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FF00FF',
        '#FF7F50',
        '#C0C0C0',
        //
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FF00FF',
        '#FF7F50',
        '#C0C0C0',
    ]
    let availableCards  = [  ]
    let griditems = []

function fillGrid(rows, columns) {
    for (let i = 1; i <= rows * columns; i++) {
        // Create a new grid item
        const item = document.createElement('div');
        item.id = 'griditem';
        item.className = 'griditem' +i
        //Assign Color to new Element
        let random = Math.floor(Math.random() * colors.length)
        let index = colors[random];
        if( random > -1)
        {  
             colors.splice(random, 1)
        }

        let obj = {
            color: index,
            isActive: false,
            isSolved: false
        }
        availableCards.push ( obj )
          item.style.backgroundColor = "rgb(65, 5, 5)";

        // Add the item to the grid container
        gridarea.appendChild(item);
        
        griditems.push( item )
    }
    
}
let chosencards= []
let life = 6
function addClickable()
{
   for(let i = 0; i < griditems.length; i++)
   {
      griditems[i].addEventListener('click' , function(){
        if(availableCards[i].isActive == false && 
            chosencards.length < 2 &&
            availableCards[i].isSolved == false && 
            life > 0)
        {
            availableCards[i].isActive = true
            //"Flip Card"
            griditems[i].style.backgroundColor =  availableCards[i].color
            chosencards.push(griditems[i])
                if(chosencards.length ==2)
                {
                    setTimeout(function() // give player time to see card 
                    {
                        //Check for matching cards
                        if(chosencards[0].style.backgroundColor == chosencards[1].style.backgroundColor)
                        {
                            for(let i = 0; i < availableCards.length; i++)
                            {
                                // set solved status for matching cards
                                if(availableCards[i].isActive == true)
                                {
                                    availableCards[i].isSolved = true
                                }
                            }
                            updateScoreboard()
                        }
                        else
                        {
                            life--
                            // Reset Active Cards
                            chosencards[0].style.backgroundColor = "rgb(65, 5, 5)"
                            chosencards[1].style.backgroundColor = "rgb(65, 5, 5)"
                            updateScoreboard()
                        
                            for(let i = 0; i < availableCards.length; i++)
                                {
                                    availableCards[i].isActive = false
                                }
                              
                        }           

                        chosencards = []

                    },1000);
                }
        }
      })  
    }  
}

//add first board
fillGrid(4, 3);
addClickable()
 
function updateScoreboard()
{
    // count solved cards 
    let pairs = 0 
    for(let i = 0; i < availableCards.length; i++)
        {
            if(availableCards[i].isSolved== true)
            {
                pairs++
            }
        }

        var score = document.getElementById('score')
        score.innerHTML = " Liv " + life
        // cheack if win
        if(pairs ==12)
        {
            alert("Du har vunnit!")
            reset()
        }
        // check if lose
        if(life == 0)
            {
                alert("Du Förlorade!")
                reset()
            }
}

function reset()
{
    // reset variables
    life = 6
    score = 0
    chosencards = []
    for(let i = 0; i < griditems.length; i++)
    {
        griditems[i].remove();
    }
    griditems = []
    availableCards = []
    // Assign values to colors. Not creating a new reference to colorbackup which colors = colorsbackup would. TIL 
    colors = [...colorsbackup] 
    // Create new board
    fillGrid(4 , 3)
    addClickable()
    updateScoreboard()
}


//Service worker ----
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }, (error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }