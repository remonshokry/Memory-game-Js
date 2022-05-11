const playerLivesConst = 6;
let playerLives = playerLivesConst;

let container = document.querySelector('.container');
const playerLivesContainer = document.querySelector('.player-lives-container');
let playerLivesCounter = document.querySelector('span');

const init = document.querySelector('.init');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');

const initButton = document.querySelector('.init-button');
const winPlayagainButton = document.querySelector('.win .play-again');
const winExitButton = document.querySelector('.win .exit');
const losePlayagainButton = document.querySelector('.lose .play-again');
const loseExitButton = document.querySelector('.lose .exit');


playerLivesCounter.textContent = playerLives;

const getCardsData = ()=> [
    {imgSrc:'images/avengers.png' , name:'avengers'},
    {imgSrc:'images/falcon.png' , name:'falcon'},
    {imgSrc:'images/diamond.png' , name:'diamond'},
    {imgSrc:'images/captain-america.png' , name:'captainAmerica'},
    {imgSrc:'images/four.png' , name:'four'},
    {imgSrc:'images/hammer.png' , name:'hammer'},
    {imgSrc:'images/spiderman.png' , name:'spiderman'},
    {imgSrc:'images/trident.png' , name:'trident'},
    {imgSrc:'images/avengers.png' , name:'avengers'},
    {imgSrc:'images/falcon.png' , name:'falcon'},
    {imgSrc:'images/diamond.png' , name:'diamond'},
    {imgSrc:'images/captain-america.png' , name:'captainAmerica'},
    {imgSrc:'images/four.png' , name:'four'},
    {imgSrc:'images/hammer.png' , name:'hammer'},
    {imgSrc:'images/spiderman.png' , name:'spiderman'},
    {imgSrc:'images/trident.png' , name:'trident'}
];

const randomize = ()=>{
    const cardData = getCardsData();
    cardData.sort(()=>Math.random() -0.5 );
    return cardData;
}
const cardGenerator =()=>{
    const cardData = randomize();
    cardData.forEach((item)=>{
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');

        card.classList ='card'; 
        face.classList ='face'; 
        back.classList ='back';
        
        face.setAttribute("src", item.imgSrc);
        card.setAttribute('name' ,item.name);

        container.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click' , (e)=>{
            card.classList.toggle('toggle-card');
            checkCard(e);
        })
    });
}


const checkCard =(e)=>{
    e.target.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggledCards = document.querySelectorAll('.toggle-card');

    if(flippedCards.length === 2)
    {
        if (flippedCards[0].getAttribute('name') === 
        flippedCards[1].getAttribute('name'))
        {
            console.log('match');
            flippedCards.forEach((card)=>{
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        }
        else
        {
            flippedCards.forEach((card)=>{
                console.log('lose');
                card.classList.remove('flipped');
                setTimeout(()=>{
                    card.classList.remove('toggle-card'); 
                } , 600);
            });
            playerLives--;
            playerLivesCounter.textContent = playerLives;
            if (playerLives === 0)
            {
                console.log('livess');
                winOrLose(0);
            }
        } 
    }
    if (toggledCards.length === 16 ){
        console.log('won');
        winOrLose(1);
    }
};

const restart =()=>{
    const cardsData = randomize();
    const cards = document.querySelectorAll('.card');
    const faces = document.querySelectorAll('.face');
    container.style.pointerEvents = 'none';

    cardsData.forEach((item , index)=>{
        cards[index].classList.remove('toggle-card');  
        cards[index].style.pointerEvents = 'none';
    });
    
    setTimeout(()=>{
        cardsData.forEach((item , index)=>{
            faces[index].setAttribute( "src", item.imgSrc);
            cards[index].setAttribute("name" , item.name);
            cards[index].style.pointerEvents = 'all';            
        });
    } , 1000);
    
    container.style.pointerEvents = 'all';
    playerLives = playerLivesConst;
    playerLivesCounter.textContent = playerLives;
}

initButton.addEventListener('click' , ()=>{
    init.style.display ='none';
    container.style.display = 'grid';
    playerLivesContainer.style.display = 'flex';
    cardGenerator();
});


const winOrLose = (id)=>{
    if (id === 1 )
    {
        win.style.display = 'flex';
        container.style.pointerEvents = 'none';
        win.style.display = 'flex';
        
        winPlayagainButton.addEventListener('click' , ()=>{
            win.style.display = 'none';
            restart();
            
        });

        winExitButton.addEventListener('click' , ()=>{
            window.close();
        });
    }
    else
    {
        lose.style.display = 'flex';
        container.style.pointerEvents = 'none';
        lose.style.display = 'flex';
        
        losePlayagainButton.addEventListener('click' , ()=>{
            lose.style.display = 'none';
            restart();
            
        });

        loseExitButton.addEventListener('click' , ()=>{
            window.close();
        });

    }
}
