//create by Julien Mustière

document.getElementById("clock_svg").addEventListener("load", function() {
    // elements to vars
        var svg = this.getSVGDocument();
        var ratio = 360/60;
        var secondsCount, minutesCount, rotateSecondes, rotateMinutes, rotateHours;
        var circle_big_dark = svg.getElementById("circle_x5F_big_x5F_dark");
        var square_dark = svg.getElementById("square_x5F_dark_1_");
        var square_light = svg.getElementById("square_x5F_light_1_");
        var circle_light = svg.getElementById("circle_x5F_light");
        var secondesSVG = svg.getElementById("secondes");
        var minutesSVG = svg.getElementById("minutes");
        var hoursSVG = svg.getElementById("hours");
        var morph = false;

    //update
        actualize();

    //Etat initial
    	TweenLite.to(square_dark, 0, {scale:0, transformOrigin:"50% 50%", top: -50});
    	TweenLite.to(secondesSVG, 0, {scale:0, transformOrigin:"70% 33%"});
    	TweenLite.to(minutesSVG, 0, {scale:0, transformOrigin:"5% 55%"});
    	TweenLite.to(hoursSVG, 0, {scale:0, transformOrigin:"86% 86%"});

    //First move
        TweenLite.to(square_dark, 1, {scale:1, transformOrigin:"50% 50%", top: 0, ease: Elastic.easeOut.config( 1, 0.3)});
        TweenLite.to(secondesSVG, 1, {scale:1, transformOrigin:"70% 33%", top: 0, ease: Elastic.easeOut.config( 1, 0.3),delay:0.1});
        TweenLite.to(minutesSVG,  1, {scale:1, transformOrigin:"5% 55%", top: 0, ease: Elastic.easeOut.config( 1, 0.3),delay:0.2});
        TweenLite.to(hoursSVG, 1, {scale:1, transformOrigin:"86% 86%", top: 0, ease: Elastic.easeOut.config( 1, 0.3),delay:0.3});
        var tls = new TimelineMax(); 
            tls.to(secondesSVG, 1.0, {rotation:rotateSecondes, transformOrigin:"70% 33%", scaleX:1,delay:1});
        var tlm = new TimelineMax()
            tlm.to(minutesSVG, 1.2, {rotation:rotateMinutes, transformOrigin:"5% 55%", scaleX:1,delay:1.15});
        var tlh = new TimelineMax()
            tlh.to(hoursSVG, 1.5, {rotation:rotateHours, transformOrigin:"86% 86%", scaleX:1,delay:1.3}); 

    

    //Gestion du temps avec optimisation 'requestAnimationFrame'
    	var time = function(){
    	    window.setTimeout(function () {
                //secondes
                rotateSecondes += ratio; 
                secondsCount ++;               
                requestAnimationFrame(secondsMove);
                //minutes
                if(secondsCount >= 60){
                    rotateMinutes += ratio;
                    requestAnimationFrame(minutesMove);
                    secondsCount=1;
                    minutesCount++;
                }
                if(minutesCount >= 60){
                    rotateHours += 360/12;
                    requestAnimationFrame(hoursMove);
                    minutesCount=1;
                }
                requestAnimationFrame(time);
            },1000)
        };
        var secondsMove = function(){
            tls.to(secondesSVG, 0.1, {scale:1, rotation:rotateSecondes, transformOrigin:"70% 33%", scaleX:1});
        };
        var minutesMove = function(time){
            tlm.to(minutesSVG, 0.5, {scale:1, rotation:rotateMinutes, transformOrigin:"5% 55%", scaleX:1});
        };
        var hoursMove = function(time){
            tlh.to(hoursSVG, 0.6, {scale:1, rotation:rotateHours, transformOrigin:"86% 86%", scaleX:1});
        };
        requestAnimationFrame(time);

    //on click 
        svg.addEventListener("click", function() {
            //MORPH
                if(morph){
                    TweenLite.to(square_dark, 0.3, {morphSVG: "M70,70.001h612v611.998H70V70.001z" }, "+=1");
                    TweenLite.to(square_light, 0.3, {morphSVG: "M122.594,122.595h506.812v506.812H122.594V122.595z"}, "+=1");
                } else {
                    TweenLite.to(square_dark, 0.3, {morphSVG: circle_big_dark.getAttribute('d')}, "+=1");
                    TweenLite.to(square_light, 0.3, {morphSVG: circle_light.getAttribute('d')}, "+=1");
                }
                morph = (morph) ? false: true;

            //Update de la date
                actualize();
            //Gestion graphique
                TweenLite.to(square_dark, 0, {scale:0, transformOrigin:"50% 50%", top: -50});
                TweenLite.to(square_dark, 1.2, {scale:1, transformOrigin:"50% 50%", top: 0, ease: Elastic.easeOut.config( 1, 0.5)});
                tls.to(secondesSVG, 0, {rotation:0, transformOrigin:"70% 33%"});
                tlm.to(minutesSVG, 0, {rotation:0, transformOrigin:"5% 55%"});
                tlh.to(hoursSVG, 0, {rotation:0, transformOrigin:"86% 86%"});
                tls.to(secondesSVG, 0.5, {rotation:rotateSecondes, transformOrigin:"70% 33%", scaleX:1});
                tlm.to(minutesSVG, 0.8, {rotation:rotateMinutes, transformOrigin:"5% 55%", scaleX:1});
                tlh.to(hoursSVG, 1, {rotation:rotateHours, transformOrigin:"86% 86%", scaleX:1});
        });

    //upadte time and pointer
        function actualize(){
            var date = new Date();
                rotateSecondes = 495  + date.getSeconds()*ratio;
                rotateMinutes = 270 + date.getMinutes()*ratio;
                rotateHours = 405 + date.getHours()*360/12;
                secondsCount = date.getSeconds();
                minutesCount = date.getMinutes();
            //Temps actuel en log
                console.log("heure actualisé -> " + date.getHours() + "h : "  + date.getMinutes()+ "m : "  + date.getSeconds() +"s");
        }
});
