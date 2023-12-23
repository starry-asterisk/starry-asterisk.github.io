class Scene {
    skipable = true;
    filter = null;
    filter_scope = null;

    dialog = null;
    choice = [];

    background = null;
    object = [];

    bgm = null;
    se = [];

    constructor() {
    }
}

class Dialog {
    name;
    team;
    contents;

    window_mode;
    dialog_mode;

    speed;
    hide;

    constructor() {
    }
}
class Choice {
    flag;
    order;
    contents;
    constructor() {
    }
}

class Background {
    filename;
    cutout_animation;
    animation;
    constructor() {
    }
}
class Object {
    id;
    name;
    type;
    order;
    isBehind = false;
    horizontal_invert = false;
    vertical_invert = false;
    destroy = false;
    animation = null;
    base_x;
    base_y;
    scale = 1.0;
    constructor() {
    }
}

class Bgm {
    filename;
    start_time = 0;
    speed = 1.0;
    iteration = 0;
    stop = false;
    constructor() {
    }
}
class Se {
    filename;
    duration = -1;/*=auto*/
    speed = 1.0;
    constructor() {
    }
}



//dialog mode
const 회상 = 2;
const 나레이션 = 1;
const 대사 = 0;
















const Player = {
    app_container: null,
    object_container: null,
    choice_container: null,
    el_dialog: null,
    el_name: null,
    el_team: null,
    el_contents: null,
    _flags: [],
    _scene_oder: 0,
    init: function() {
        this.app_container = document.querySelector('.container');
        this.object_container = document.querySelector('.container__object');
        this.choice_container = document.querySelector('.container__choice');
        this.el_dialog = document.querySelector('.dialog');
        this.el_name = document.querySelector('.dialog__title__name');
        this.el_team = document.querySelector('.dialog__title__team');
        this.el_contents = document.querySelector('.dialog__contents');
        //load media info json
    },
    start: function(){
        const routes = script[this._scene_oder];
        if (routes) {
            let route_type = -1;
            /*
            
            some route choice algorith
            
            */
           route_type = 0;
           let scene = routes[route_type];
            let skipHandlers = frameHandler(scene[0]);
            let index = 1;
            document.body.onclick = () => {
                //동작완료 애님에ㅣ션에 경우 stop등을 사용하면 오류가 나서 try catch로 임시조치함
                for(let skipHandler of skipHandlers) {try {skipHandler();}catch{}}
                if(scene[index] == null){
                    Player._scene_oder++;
                    document.body.onclick = null;
                    Player.start();
                }else{
                    skipHandlers = frameHandler(scene[index]);
                    index++;
                }
            }; 
        } else {
            //end..
        }
    },
    load: () => {
        //load flags...
        //load scene order...
    },
    save: () => {

    },
    close: () => {

    },
}

let _objects = [];

function frameHandler(frame){
    let stopable_arr = [];
    for (s_prop in frame) {
        let options = frame[s_prop];
        switch (s_prop) {
            case 'skipable':
                break;
            case 'filter':
                break;
            case 'dialog':
                if(options.hide){
                    Player.el_dialog.style.display = 'none';
                }else{
                    Player.el_dialog.style.display = 'block';
                    if(options.dialog_mode == 나레이션){
                        Player.el_name.style.display = 'none';
                        Player.el_team.style.display = 'none';
                    } else {
                        Player.el_name.style.removeProperty('display');
                        Player.el_team.style.removeProperty('display');
                    }
                    Player.el_name.innerHTML = options.name;
                    Player.el_team.innerHTML = options.team;
                    Player.el_contents.innerHTML = '';
                    if(options.contents || options.contents === ''){
                        let contents_arr = options.contents.split('');
                        let interver = setInterval(()=>{
                            if(contents_arr.length < 1) return clearInterval(interver);
                            Player.el_contents.innerHTML += contents_arr.shift();
                        },80);
                        stopable_arr.push(()=>clearInterval(interver));
                    } 
                }
                break;
            case 'choice':
                for(let option of options){
                    let button = document.createElement('button');
                    button.innerHTML = `<span>${option.contents}</span>`;
                    button.style.order = option.order;
                    button.onclick = () => Player._flags.push(option.flag);
                    Player.choice_container.appendChild(button);
                }
                break;
            case 'background':
                if(options.filename) Player.app_container.style.backgroundImage = `url("./resource/bg/${options.filename}")`;
                if(options.cutout_animation){}
                if(options.animation){}
                break;
            case 'object':
                for(let option of options){
                    let object = _objects[option.id];
                    if(object == null){
                        _objects[option.id] = object = {
                            id: option.id,
                            name: option.name,
                            type: option.type,
                            _instance: document.createElement('div'),
                            _img: document.createElement('img')
                        };
                        object._img.src = `./resource/imageSet/${option.name}/${option.type}.png`;
                        object._instance.setProperty('--mask', `url(./resource/imageSet/${option.name}/${option.type}.png)`);   
                        object._instance.appendChild(object._img);
                        Player.object_container.appendChild(object._instance);
                    }else{
                        option = {...object, ...option};
                        object._img.src = `./resource/imageSet/${option.name}/${option.type}.png`;
                        object._instance.setProperty('--mask', `url(./resource/imageSet/${option.name}/${option.type}.png)`);            
                    }

                    if(option.horizontal_invert===true)object._instance.classList.add('horizontal_invert');
                    else if(option.horizontal_invert===false)object._instance.classList.remove('horizontal_invert');
                    
                    if(option.vertical_invert===true)object._instance.classList.add('vertical_invert');
                    else if(option.vertical_invert===false)object._instance.classList.remove('vertical_invert');

                    if(option.isBehind === true) object._instance.classList.add('behind');
                    else if(option.isBehind === false) object._instance.classList.remove('behind');

                    if(option.scale) object._instance.style.zoom = option.scale;
                    if(option.order) object._instance.style.zIndex = option.order;
                    if(option.animation) stopable_arr.push(object._img.animate(option.animation.keyframes, option.animation.option).finish);
                    if(option.base_x) object._instance.style.left = option.base_x;
                    if(option.base_y) object._instance.style.top = option.base_y;
                    if(option.destroy) object._instance.remove();
                }
                break;
            case 'bgm':
                break;
            case 'se':
                break;
        }
    }
    return stopable_arr;
}



function startDialog() {
    dialog.style.display = 'block';
    name.innerHTML = scene.name;
    team.innerHTML = scene.team;
    contents.innerHTML = scene.text;


    let start_t = new Date();

}