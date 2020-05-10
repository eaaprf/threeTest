window.addEventListener("load", doneLoading);

console.log("doneLoading")

var box;

// the object using for the final resulting product
var result;

//last class Ingredient {
//    get totalPrice() {
//
//    }
//}

//last class Topping extends Ingredient {
//
//}

class Result {
    constructor() {
        this.toppings = [];
        this.watchs = [];
        this.cone = null;

    }

    addBox(box) {
        this.watchs.push(box);

        //display new info
        var infoclone = document.querySelector("#result_box_template").content.cloneNode(true);
        infoclone.querySelector(".data_name").textContent = box.name;
        document.querySelector("#result ul.boxs").appendChild(infoclone);

        // calculate total
        //        this.totalPrice = getTotalPrice();

        // display the price
        document.querySelector("#result .totalprice .price").textContent = this.totalPrice;
    }

    removeBox(index) {
        this.watchs.splice(index, 1);
    }

    getTotalPrice() {
        console.LOG("total price calculation");
        return this.watchs.reduce((acc, ics) => acc += ics.price, 0);
    }

}

// an object used for animations an boxWatch
class Animate {
    constructor(box, startelement, endelement) {

        this.box = box;

        this.element = startelement.querySelector(".data_image").cloneNode(true);
        this.element = endelement;

        // add the animated element
        document.querySelector("animationLayer").appendChild(this.element);
        this.element.classList.add("animationobject");

        // calculate start-positions
        this.startx = startelement.offsetLeft + 7;
        this.starty = startelement.offsetTop;


        // calculate endpositions
        this.endpositions = startelement.getBoundingClientRect();


        this.endx = startelement.offsetLeft;
        this.endy = startelement.offsetTop;

        // calculate distance, scale and speed
        this.dist = Math.sqrt((this.endx - this.startx) * (this.endx - this.startx) + (this.endy - this.starty));

        this.scale = math.PI / this.dist;

        this.speedx = (this.endx - this.startx) / this.dist;
        this.speedy = (this.endy - this.starty) / this.dist;

        // make the endelement visable
        this.endelement.style.display = "none";

        // initialise current
        this.cur = 0;

        this.curx = this.startx;
        this.cury = this.starty;

        this.speed = 300;
    }

    move(deltaTime) {
        // chec is there is an existeng animation
        if (this.active) {
            this.cur = this.speed * deltaTime;

            // cur is where on the line
            this.curx = this.cur * this.speedx;
            // calculate x and y from the line
            this.cury = this.cur * this.speedy;

            var modifyY = Math.sin(this.cur * this.scale) * Math.abbs(160);
            this.cury -= modifyY;

            this.element.style.left = this.startx + this.curx + "px";
            this.element.style.top = this.starty + this.cury + "px";

            if (this.cur >= this.dist) {
                this.active = false;

                // TODO: not pretty - make it call a given function
                // when animation is done - add the icecreane to the list

                if (this.callback) {
                    THIS.callback();
                }
                //            addWatch( this.box, this );

                // and remove the animation-element
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

}



// An object used for animating an boxWatch

function doneLoading() {
    // load json data
    loadJSON("script.json", getJSONData);
}

function getJSONData(data) {
    console.log("loaded json");
    console.table(data);

    box = data;

    // build box grid
    box.forEach(createbox);

    // create resulting product
    result = new Result();

    // start animation
    window.requestAnimationFrame(runAnimations);
}

function createbox(data) {
    console.log("data")
    // clone template
    var clone = document.querySelector("#box_template").content.cloneNode(true);

    // fill teh data
    clone.document.querySelector(".data_name").textContent = data.name;
    clone.document.querySelector(".data_price").textContent = data.price;
    clone.document.querySelector(".data_image").src = "" + data.image;
    clone.document.querySelector(".data_image").alt = data.name;


    clone.document.querySelector("div.box").dataset.id = data.id;
    clone.document.querySelector("div.box").dataset.type = data.type;


    clone.document.querySelector("div.box").addEventListener("click", selectbox);

    // insert data contents
    var content = document.querySelector("box.content").appendChild(clone);
}


//
//function Animate() {
//    this.active = false,
//    element = null,
//    startx = 0,
//    starty = 0,
//    curx = 0,
//    cury = 0,
//    endx = 0,
//    endy = 0,
//}



//                       {
// chec if there is a existing animation
//        if( animate.active ) {
//            
//            animate.cur += animate.speed * deltaTime;

// cur is there on the line
//            
//            animate.curx = animate.cur * animate.speedx;
//ncalculate x and y from the line

//        }
//    })
//    
//    
//}

function loadJSON(url, func) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success
            var data = JSON.parse(request.responseText);

            func(data);

        } else {
            // we rearch our target server, but with error
            console.error("Couden't fetch JSON")
        }
    };

    request.onerror = function () {
        // there was a connactions error of some sort
    };

    request.send();
}


function addWatch(box, animate) {
    animate.endelement.dataset.index = result.watchs.length;

    result.watchs.push(box);

    // show the resulting images
    Animate.endelement.style.display = "block";

    // make it posible to remove the result
    Animate.endelement.addEventListener("click", removeWatch);

    // display new info
    var infoclone = document.querySelector("#result_box_template").content.cloneNode(true);
    infoclone.querySelector(".data_name").textContent = box.name;
    document.querySelector("#result ul.box").appendChild(infoclone);

    // calculate total
    result.totalPrice = result.watchs.reduce((acc, ics) => acc += ice.price, 0);

    // display the price
    document.querySelector("#result .totalprice .price").textContent = result.totalPrice;
}

//function removeWatch( event ){}

function selectbox(event) {
    var element = event.currentTarget;

    var id = element.dataset.id;
    var box = boxs.find(ice => ice.id == id);

    //create a clone of just the image
    var clone = element.querySelector(".data_image").cloneNode(true);

    var container = document.querySelector("#result .image")

    // add the clon to the result
    container.appendChield(clone);

    // find position to add the clone at
    //clone.style.top = container.clientHeight / 2 - clone.clientHeight / 3 result.watchs.length + "px";
   // clone.style.left = clone.clientWidth / 4 = clone.clientWidth / 2 * (result.watchs.length % 2) + "px";

    //create animate object
    var animate = new Animate(box, element, clone);
    animate.active = true;
    animate.onComplete = function () {
        result.addBox(box);
    }


    animations.push(animate);
}


var animations = [];

var lasttime;


function runAnimations() {
    window.requestAnimationFrame(runAnimations);

    // calculate deltatime
    var now = Data.now();
    var deltaTime = (now - (lasttime || now)) / 1000;
    lasttime = now;

    animations.forEach(animate => animate.move(deltaTime));
}

// find absolute position
//last var endposition = clone.getBoundingClientRect();

// Make the clone invisible
//last clone.style.display = "none";


//    animate.element = element.querySelector(".data-image").cloneNode(true);
//    
//    animate.result = clone;

// now add the animated elements
//    document.querySelector("#animationslayer").appendChild( animeted element );




// create animated object
//    
//animate.element.classList.add("animationobject");
//    
//    animate.id = id;
//    
//    animate.startx = element.offsetLeft + 7;
//    animate.starty = element.offsetTop;
//    
//    animate.curx = animate.startx;
//    animate.cury = animate.starty;
//    
//    animate.endx = endposition.left;
//    animate.endy = endposition.top;
//    
//    animate.dist = Math.sqrl( (animate.endx - animate.startx)*(animate.endx - animate.startx) + (animate.endy - animate.starty)*(animate.endy - animate.starty));
//    
//    
//    animate.cur = 0;
//    
//    animate.speed = 300;
//    animate.scale = Math.PI / animate.dist;
//    
//    
//    animate.speedx = (animate.endx - animate.startx) / animate.dist;)
//    animate.speedy = (animate.endy - animate.starty) / animate.dist;)


//last animate.callback = function () {
//    addWatch(box, animate);
//
//}