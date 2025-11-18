function initStarfield() {

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    const canvas = document.getElementById("universe");
    const ctx = canvas.getContext("2d");
    let winWidth, winHeight;
    let starCount;
    const speedBase = 0.05;
    const colors = {
        giant: "180,184,240",
        normal: "226,225,142",
        comet: "226,225,224"
    };
    let stars = [];
    let allowComets = false;
    let animationFrameId = null;

    function resizeCanvas() {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        starCount = Math.floor(0.216 * winWidth);
        canvas.width = winWidth;
        canvas.height = winHeight;
    }

    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.isGiant = this.randomChance(3);
            this.isComet = !this.isGiant && allowComets && this.randomChance(10);

            this.x = this.randomRange(0, winWidth);
            this.y = this.randomRange(0, winHeight);
            this.size = this.isGiant ? 2 : (this.isComet ? 1.5 : this.randomRange(1.1, 2.6));

            const speedMultiplier = this.isComet ? this.randomRange(50, 120) : 1;
            this.dx = speedBase * (this.randomRange(1, 6) + speedMultiplier) + 2 * speedBase;
            this.dy = -speedBase * (this.randomRange(1, 6) + speedMultiplier);

            this.opacity = 0;
            this.opacityMax = this.randomRange(0.2, 1 - (this.isComet ? 0.4 : 0));
            this.opacityStep = this.randomRange(0.0005, 0.002) + (this.isComet ? 0.001 : 0);
            this.fadingIn = true;
            this.fadingOut = false;
        }


        randomChance(rate) {
            return Math.floor(Math.random() * 1000) + 1 < 10 * rate;
        }


        randomRange(min, max) {
            return Math.random() * (max - min) + min;
        }


        fadeIn() {
            if (this.fadingIn) {
                this.opacity += this.opacityStep;
                this.fadingIn = this.opacity <= this.opacityMax;
            }
        }


        fadeOut() {
            if (this.fadingOut) {
                this.opacity -= this.opacityStep / 2;

                if (this.x > winWidth || this.y < 0 || this.opacity < 0) {
                    this.fadingOut = false;
                    this.reset();
                }
            }
        }


        draw() {
            ctx.beginPath();

            if (this.isGiant) {
                ctx.fillStyle = `rgba(${colors.giant}, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            } else if (this.isComet) {

                ctx.fillStyle = `rgba(${colors.comet}, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();

                for (let i = 0; i < 30; i++) {
                    const tailOpacity = this.opacity - (this.opacity / 20) * i;
                    if (tailOpacity <= 0) break;
                    ctx.fillStyle = `rgba(${colors.comet}, ${tailOpacity})`;
                    ctx.rect(
                        this.x - (this.dx / 4) * i,
                        this.y - (this.dy / 4) * i - 2,
                        2, 2
                    );
                    ctx.fill();
                }
            } else {
                ctx.fillStyle = `rgba(${colors.normal}, ${this.opacity})`;
                ctx.rect(this.x, this.y, this.size, this.size);
            }

            ctx.closePath();
            ctx.fill();
        }

        move() {
            this.x += this.dx;
            this.y += this.dy;


            if (this.x > winWidth - winWidth / 4 || this.y < 0) {
                this.fadingOut = true;
            }
        }
    }


    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, winWidth, winHeight);

        stars.forEach(star => {
            star.move();
            star.fadeIn();
            star.fadeOut();
            star.draw();
        });

        animationFrameId = window.requestAnimationFrame(animate);
    }


    // 启动动画
    function startAnimation() {
        if (!animationFrameId) {
            // 防止重复启动
            resizeCanvas();
            initStars();
            animate();
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            ctx.clearRect(0, 0, winWidth, winHeight);
        }
    }

    function handleThemeChange() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }

    handleThemeChange();

    window.addEventListener("resize", () => {
        if (document.body.classList.contains('dark-mode')) {
            resizeCanvas();
            initStars();
        }
    });

    setTimeout(() => {
        allowComets = true;

        if (document.body.classList.contains('dark-mode')) {
            initStars();
        }
    }, 50);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                handleThemeChange();
            }
        });
    });

    observer.observe(document.body, { attributes: true });
}
initStarfield();