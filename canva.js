document.addEventListener("DOMContentLoaded", function() 
{
    //canvas ko id signature chha.
    var canvas = document.getElementById("signature");

    // suru ma line color black.
    var linecolor="black";

   var colorpen=document.getElementById("colorpicker");
    colorpen.addEventListener("change",function()
    {
        linecolor=colorpen.value;
    })

    var context = canvas.getContext("2d");

    // bool type false kina chha bhane that means user is not engaged bhanera ho.
    var paint = false;

   // maile yeha k gareko bhanda eventlistener to canvas haleko
   // yesto kura maile ka bta tha paye event ko pdf ra chatgpt

   //canvas.addEventListener("event", function);

    canvas.addEventListener("mousedown", startDrawing);

    //start drawing bhanni yeha function ho jun chai event huni bittikai call hunxa.

    canvas.addEventListener("mousemove", draw);
// mouseout matlab left or right of mouse is clicked or not.
    canvas.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("mouseout", stopDrawing);
    
    canvas.addEventListener('touchstart',touchdetect);

    canvas.addEventListener('touchmove',drivesign);

    canvas.addEventListener('touchend',stopDrawing);
    
    
    function startDrawing(event)
     {
        // matlab user active chha hai.
        paint= true;
        draw(event); 
    }
    
    function draw(event)
     {
        // initially the paint is set to false.
        // abatrue vayo.

        if (!paint) return;
        // if not paint true vayo bhane user is not drawing kina bhanda paint ta hamle suru ma false declare garya xam ni ta.

        // functin le kam gardaina aba and execution will be stopped further.
        
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = linecolor;
        
        var rect = canvas.getBoundingClientRect();
        var x,y;
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }
    
    function stopDrawing() {
        paint = false;


        // starts new segment of the path.
        context.beginPath();
    }

    function touchdetect(event) {
        event.preventDefault();
        paint=true;
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousedown",
         {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function drivesign(event) {
        event.preventDefault();
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    




    var clearButton = document.getElementById("clear");

    clearButton.addEventListener("click", clearCanvas);

    function clearCanvas()
    // clearRect is a method to clear the entire canvas to it's inital state.
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", submitsign);

    function submitsign()
    {
// j garna parxa garxu tara ahile lai mouse ko event milauxu

const imageURL= canvas.toDataURL();

const image=document.createElement('img');

image.src=imageURL;

image.style.display='block';

// display bhanni regin ma image lai append garidinxa
display.appendChild(image);



    }


    // var downlaod=document.getElementById('download');

    // function download()
    // {
    //     var signatureDataURL=canvas.toDataURL();

    //     download.href=signatureDataURL;
    // }

});
