document.addEventListener('DOMContentLoaded', function() {
    const billInput = document.getElementById('bill');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const tips = document.querySelectorAll('.tips');
    const customTip = document.querySelector('.custom');
    const resetButton = document.getElementById('reset-btn');

    let billValue = 0.00;
    let tipPercentage = 0;
    let colors = [];

    function tipandtotal() {
        const tipAmount = (billValue * tipPercentage) / 100;
        const totalAmount = billValue + tipAmount;

        tipAmountDisplay.textContent = `€${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `€${totalAmount.toFixed(2)}`;
    }

    billInput.addEventListener('input', function(e) {
        billValue = parseFloat(e.target.value) || 0.00;
        tipandtotal();
    });

    tips.forEach(tip => {
        tip.addEventListener('click', function() {
            tips.forEach(tip => tip.classList.remove('active'));
            this.classList.add('active');

            tipPercentage = parseInt(this.textContent.replace('%', '')) || 0;
            customTip.value = '';
            tipandtotal();
        });
    });

    customTip.addEventListener('input', function(e) {
        tipPercentage = parseFloat(e.target.value) || 0;
        tips.forEach(tip => tip.classList.remove('active'));
        tipandtotal();
    });

    resetButton.addEventListener('click', function() {
        billInput.value = '';
        customTip.value = '';
        billValue = 0.00;
        tipPercentage = 0;
        tipAmountDisplay.textContent = '€0.00';
        totalAmountDisplay.textContent = '€0.00';
        drawWheel([]);  // Clear the wheel
    });

    //wheel
    const loser =document.getElementById("loser");

    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function generateColors(names) {
        colors = names.map(() => randomColor());
    }

    function drawWheel(names) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;
        const anglePerSlice = (2 * Math.PI) / names.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        names.forEach((name, i) => {
            const angleStart = i * anglePerSlice;
            const angleEnd = (i + 1) * anglePerSlice;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angleStart + anglePerSlice / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#000';
            ctx.font = '20px Arial';
            ctx.fillText(name, radius - 10, 10);
            ctx.restore();
        });
    }

    function animateWheel(rotationAngle, names) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotationAngle);
        ctx.translate(-centerX, -centerY);
        drawWheel(names);
        ctx.restore();
    }

    function spinWheel() {
        let rotationAngle = 0;
        let currentSpeed = 30 + Math.random() * 100; // Initial random speed
        const decelerationRate = 0.97; // Rate at which the wheel slows down
        const minSpeed = 0.5; // Minimum speed before stopping

        const names = document.querySelector('textarea').value.trim().split('\n').filter(name => name);

        function rotateWheel() {
            if (currentSpeed > minSpeed) {
                rotationAngle += currentSpeed;
                currentSpeed *= decelerationRate;
                animateWheel(rotationAngle * Math.PI / 180, names);
                requestAnimationFrame(rotateWheel);
            } else {
                // Determine the winning segment
                const totalRotation = rotationAngle / 360;
                const winningIndex = Math.floor((totalRotation % 1) * names.length);
                // alert(`The winner is: ${names[winningIndex]}`);
                loser.textContent = `${names[winningIndex]}`;
            }
        }

        requestAnimationFrame(rotateWheel);
    }

    document.querySelector('.center-circle').addEventListener('click', spinWheel);
    
    document.querySelector('textarea').addEventListener('input', function() {
        const names = this.value.trim().split('\n').filter(name => name);
        generateColors(names);
        drawWheel(names);
    });

    const initialNames = document.querySelector('textarea').value.trim().split('\n').filter(name => name);
    generateColors(initialNames);
    drawWheel(initialNames); // Initial draw
});
