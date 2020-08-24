'use strict'
$(function() {

    var opvangZak = $('#opvangzak'),
        container = $('#container'),
        hond = $('.hond'),
        drollen = $('.drol'),
        drol1 = $('#eersteDrol'),
        drol2 = $('#tweedeDrol'),
        drol3 = $('#derdeDrol'),
        drol4 = $('#vierdeDrol'),
        restart = $('#restart'),
        opvangzak_width = opvangZak.width(),
        opvangzak_height = opvangZak.height(),
        hond_height = hond.height(),
        container_height = container.height(),
        drollen_height = drollen.height(),
        drollen_initial_position = parseInt(drollen.css('top')),
        score_span = $('#score'),
        leven_span = $('#leven'),
        score = 0,
        leven = 4,
        counter = 0,
        score_updated = false,
        dog_poop, anim_id, drollen_current_position;
    
    leven_span.text(leven);

    dog_poop = function() {
        counter++;
        
        // Drollen die naar beneden vallen
        if (counter > 10)
            drollen_down(drol1);
        if (counter > 80)
            drollen_down(drol2);
        if (counter > 30)
            drollen_down(drol3);
        if (counter > 60)
            drollen_down(drol4);

        //Nakijken of de drollen in de opvangzak vallen
        if (check_catch(drol1)) {
            update_score(drol1);
        }
        if (check_catch(drol2)) {
            update_score(drol2);
        }
        if (check_catch(drol3)) {
            update_score(drol3);
        }
        
        if (check_catch(drol4)) {
            update_score(drol4);
        }
        
        //Nakijken of de drollen uit de container vallen
        if (parseInt(drol1.css('top')) >= container_height - drollen_height) {
            set_drollen_to_initial_position(drol1);
        }
        if (parseInt(drol2.css('top')) >= container_height - drollen_height) {
            set_drollen_to_initial_position(drol2);
        }
        if (parseInt(drol3.css('top')) >= container_height - drollen_height) {
            set_drollen_to_initial_position(drol3);
        }
        if (parseInt(drol4.css('top')) >= container_height - drollen_height) {
            set_drollen_to_initial_position(drol4);
        }

        if (leven) {
            anim_id = requestAnimationFrame(dog_poop); //Gevonden via een tutorial.
        } else {
            stop_dog_poop();
        }
        
    };

    anim_id = requestAnimationFrame(dog_poop); //Gevonden via een tutorial.
    
    restart.click(function() {
        location.reload();
    });
    
    //Ervoor zorgen dat de opvangzak de muis volgt.
     $(document).mousemove(function(volgMuis) {
        opvangZak.css('left', volgMuis.pageX - opvangzak_width / 2);
    });

    //Zort ervoor dat de drollen naar beneden vallen.
    function drollen_down(drollen) {
        drollen_current_position = parseInt(drollen.css('top'));
        drollen.css('top', drollen_current_position + 3);
    }

    //Kijkt na of de drollen 'botsen' tegen de opvangzak.
    //Er wordt dan verwezen naar de collision detection script om dan zo na te gaan of het 'in de zak valt'
    function check_catch(drollen) {
        if (collision(drollen, opvangZak) && (parseInt(drollen.css('top')) >= parseInt(container_height - opvangzak_height - drollen_height)) && (parseInt(drollen.css('top')) <= parseInt(container_height - opvangzak_height)))
            return true
        return false;
    }

    //Score updaten na opvangen van een drol.
    function update_score(drollen) {
        set_drollen_to_initial_position(drollen, false);
        score = score + 1;
        score_span.text(score);
        if (score % 5 === 0)
            leven = leven + 1;
    }

    //De drol terug laten vallen wanneer die opgevangen is, en het functie leven oproepen.
    function set_drollen_to_initial_position(drollen, update_life_flag = true) {
        if (update_life_flag) {
            update_life();
        }
        drollen.css('top', drollen_initial_position);
    }

    //Functie leven, als er een drol uit de container valt -1 leven.
    function update_life() {
        leven = leven - 1;
        if (leven < 0) {
            leven = 0;
        } else {
            leven_span.text(leven);
        }
    }

    //Als er geen levens niet meer zijn, dan stop de animatie en komt er een 'restart' button tevoorschijn.
    function stop_dog_poop() {
        cancelAnimationFrame(anim_id);
        $('#restart').slideDown();
    }
});