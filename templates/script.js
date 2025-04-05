document.addEventListener("DOMContentLoaded", () => {
    const inputs = Array.from(document.querySelectorAll(".inputs input"));
    const popup = document.getElementById("pinPopup");
    const mainContent = document.getElementById("mainContent");
    const correctPin = "1495";
    const successSound = document.getElementById("successSound");
    const errorSound = document.getElementById("errorSound");
  
    inputs.forEach((input, idx) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
  
        const enteredPin = inputs.map(inp => inp.value).join("");
        if (enteredPin.length === 4) {
          if (enteredPin === correctPin) {
            navigator.vibrate?.(200);
            successSound.play();
            popup.classList.add("hide");
            setTimeout(() => {
              popup.style.display = "none";
              mainContent.style.display = "block";
            }, 600);
          } else {
            navigator.vibrate?.([100, 50, 100]);
            errorSound.play();
            inputs.forEach(inp => inp.value = "");
            inputs[0].focus();
          }
        }
      });
  
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && idx > 0) {
          inputs[idx - 1].focus();
        }
      });
    });
  
    inputs[0].focus();
  });
