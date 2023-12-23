/*
const EXAMPLE_KEYFRAME = {
    //css...
    offset: [0, 0.2, 0.4, 0.6, 0.8],//how far each frame, last one can be skip
    easing: ["ease-in", "ease-out"],//timing-function
};
const EXAMPLE_KEYFRAME2 = [
    {
        //0%
        //css...
        offset: 0,
        easing: 'ease-in'//adjust from here -> next
    },
    {
        //50%
        //css...
        offset: 0.5,
        easing: 'ease-out'//adjust from here -> next
    },
    {
        //00%
        //css...
        offset: 1
    }
];
const EXAMPLE_OPTIONS = {
    delay: 0,
    duration: 1000,// =1s
    iteration: 1
};
*/

const keyframes = {
    fadeIn: {
        opacity: [0, 100],
        offset: [0, 1],
        easing: ['ease-in-out']
    },
    knockOut: {
        transform: [
            'rotate(0deg)',
            'rotate(-10deg)',
            'rotate(5deg)',
            'rotate(5deg)',
            'rotate(0deg) translateY(50vw)'
        ],
        transformOrigin: 'bottom',
        offset: [0, 0.4, 0.6, 0.8, 1],
        easing: ['ease-out','ease-out','ease-in']
    }
};


const animate_option = {
    fadeIn: {
        duration: 500,
        fill: "forwards"
    },
    knockOut: {
        duration: 1000,
        fill: "forwards"
    }
};

const script = [
    //제 1장
    [
        //공통 루트 1
        {
            0: {
                dialog: {
                    contents: '20XX년 7월 8일 오전...',
                    dialog_mode: 나레이션
                },
                background: {
                    filename: 'backcg_01.jpg'
                }
            },
            1: {
                dialog: {
                    contents: '비가 오고있다...',
                    dialog_mode: 나레이션
                },
                bgm: {
                    filename: 'bgm_groomy_01.wav',
                },
                se: [
                    {filename: 'shoose.se'}
                ]
            },
            2: {
                object: [
                    {
                        id: 'asterisk',
                        name: 'asterisk',
                        type: 'normal',
                        scale: 0.6,
                        base_y: '40%',
                        animation: {
                            keyframes: keyframes.fadeIn,
                            option: animate_option.fadeIn
                        }
                    }
                ],
                dialog: {
                    name: '별이',
                    team: '???',
                    contents: '오늘은.... 아직인가',
                }
            },
            3: {
                object: [
                    {
                        id: 'natsu',
                        name: 'natsu',
                        type: 'normal',
                        scale: 0.6,
                        base_y: '40%',
                        order: 3,
                        animation: {
                            keyframes: keyframes.fadeIn,
                            option: animate_option.fadeIn
                        }
                    },
                    {
                        id: 'asterisk',
                        isBehind: true,
                        order: 2,
                        animation: {
                            keyframes: {
                                left: ['50%', '80%']
                            },
                            option: animate_option.fadeIn
                        }
                    }
                ],
                dialog: {
                    name: '나츠',
                    team: '???',
                    contents: '[ 테스트2 ]',
                }
            },
            4: {
                choice: [
                    {
                        flag: 'route_a',
                        order: 1,
                        contents: '(기다린다)'
                    },
                    {
                        flag: 'route_b',
                        order: 2,
                        contents: '(천천히 다가간다)'
                    }
                ]
            },
        }
    ]    
];