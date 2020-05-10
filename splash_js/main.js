
const app = document.querySelector("#app");

const numberOfWatch = 1;

for( let i=0; i < numberOfWatch; i++ ) {
    const div = document.createElement("div");
    app.appendChild(div);
}

app.addEventListener("mouseout", clicked);


function clicked( event ) {
    console.log(event);
    const target = event.target;

    if( target.id === "app" ) {

        const appDiv = event.relatedTarget;
        if( appDiv != null && appDiv.parentElement != null && appDiv.parentElement.id === "app") {
            randomMove(appDiv);
        }
    }
}

function randomMove(appDiv) {
    console.log("randomMove");
    
    appDiv.style.backgroundColor = `rgb(${Math.random()*360}, ${Math.random()*10}%, 50%)`;
    appDiv.style.transform= `translate(${Math.random()*100}vw, ${Math.random()*60}vh)`;

}

function createNewWatch() {
    const div = document.createElement("div");
    app.appendChild(div);
    randomMove(div);

}

setInterval( createNewWatch,1500);