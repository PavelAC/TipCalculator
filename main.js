document.addEventListener('DOMContentLoaded', function(){
    const billInput = document.getElementById('bill');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const tips = document.querySelectorAll('.tips');
    const customTip = document.querySelector('.custom')

    let billValue=0.00;
    let tipPercentage = 0;


    function tipandtotal(){
        const tipAmount=(billValue * tipPercentage) / 100;
        const totalAmount = billValue+tipAmount;

        tipAmountDisplay.textContent =`$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent=`$${totalAmount.toFixed(2)}`
    }

    billInput.addEventListener('input',function(e){
        billValue=parseFloat(e.target.value) ||0.00;
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
    
});