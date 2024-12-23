document.getElementById("nameInput").addEventListener("input",generateSignature);
document.getElementById("fontSelector").addEventListener("change",generateSignature);
document.getElementById("downloadButton").addEventListener("click",generateSignature);

function generateSignature(){
    const name = document.getElementById("nameInput").value;
    const font = document.getElementById("fontSelector").value;
    const signature = document.getElementById("signature");
    signature.style.fontFamily = font;
    signature.textContent = name || "Your Signature will display here";

}

function downloadSignature() {
    const signature = document.getElementById("signature");
    const canvas = document.createElement("canvas");
    canvas.width = signature.offsetWidth;
    canvas.height = signature.offsetHeight;
    const ctx = canvas.getContext("2d");
    
    // Setting font style and size for the canvas
    const computedStyle = window.getComputedStyle(signature);
    ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    ctx.fillStyle = "#2b2b2b";
    ctx.fillText(signature.textContent, 10, 40);
    
    // Creating download link
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL();
    link.click();
  }