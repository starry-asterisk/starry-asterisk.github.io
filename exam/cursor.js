function getRandom(n) {
    return Math.floor(Math.random() * n);
}

function getParticle() {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.setProperty('--direction', `${getRandom(360)}deg`);
    particle.style.setProperty('--rotate', `${getRandom(360)}deg`);
    particle.style.transform = 'rotate(var(--direction)) translate(1.4em) scale(0.2)';
    particle.animate({
        transform: ['rotate(var(--direction)) translate(1.4em) scale(0.2)', 'rotate(var(--direction)) translate(2.1em) scale(1)', 'rotate(var(--direction)) translate(2.7em) scale(0.2)', 'rotate(var(--direction)) translate(2.7em) scale(0.2)'],
        opacity: [0.9, 0.4, 0.9, 0.2, 0.9, 0],
        offset: [0, 0.2, 0.4, 0.6, 0.8],
        easing: ["ease-in", "ease-out"],
    }, {
        delay: 50,
        duration: 700,
        iterations: 1,
    });
    return particle;
}

window.onmousedown = e => {
    let cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
    let mainCircle_a = document.createElement('div');
    mainCircle_a.classList.add('mainCircle');
    mainCircle_a.classList.add('a');
    cursor.appendChild(mainCircle_a);
    let mainCircle_b = document.createElement('div');
    mainCircle_b.classList.add('mainCircle');
    mainCircle_b.classList.add('b');
    cursor.appendChild(mainCircle_b);
    let mainCircle_c = document.createElement('div');
    mainCircle_c.classList.add('mainCircle');
    mainCircle_c.classList.add('c');
    cursor.appendChild(mainCircle_c);
    document.body.appendChild(cursor);
    cursor.appendChild(getParticle());
    cursor.appendChild(getParticle());
    cursor.appendChild(getParticle());
    cursor.appendChild(getParticle());
    cursor.appendChild(getParticle());
    setTimeout(() => {
        cursor.remove();
    }, 650);
}